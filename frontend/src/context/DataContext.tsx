import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type {
  AlbumRecord,
  AvatarRecord,
  AuctionItemRecord,
  DonorRecord,
  AuditLogRecord,
  YearRecord,
  MediaPhoto
} from '../types';
import {
  sampleAlbums,
  sampleAvatars,
  sampleAuctionItems,
  sampleDonors,
  sampleAuditLogs,
  sampleYears
} from '../data/sampleData';
import { useAuth } from './AuthContext';
import { api } from '../services/api';
import {
  safeStorage,
  sanitizeAvatars,
  sanitizeAlbums,
  sanitizeAuctions,
  sanitizeDonors,
  sanitizeYears,
  cleanupObsoleteCache,
  isBase64DataUrl,
  STORAGE_KEYS
} from '../utils/storage';

interface DataContextType {
  albums: AlbumRecord[];
  avatars: AvatarRecord[];
  auctions: AuctionItemRecord[];
  donors: DonorRecord[];
  auditLogs: AuditLogRecord[];
  years: YearRecord[];
  isLoadingData: boolean;
  isBackendConnected: boolean;

  // Album operations
  saveAlbum: (album: AlbumRecord) => Promise<void>;
  deleteAlbum: (id: string) => Promise<boolean>;
  toggleAlbumStatus: (id: string) => Promise<void>;

  // Avatar operations
  saveAvatar: (avatar: AvatarRecord) => Promise<void>;
  deleteAvatar: (id: string) => Promise<void>;
  reorderAvatars: (avatars: AvatarRecord[]) => Promise<void>;
  addAvatarPhoto: (avatarId: string, photo: MediaPhoto) => Promise<void>;
  deleteAvatarPhoto: (avatarId: string, photoId: string) => Promise<void>;

  // Auction operations
  saveAuctionItem: (item: AuctionItemRecord) => Promise<void>;
  deleteAuctionItem: (id: string) => Promise<void>;
  toggleAuctionStatus: (id: string) => Promise<void>;

  // Donor operations
  saveDonor: (donor: DonorRecord) => Promise<void>;
  deleteDonor: (id: string) => Promise<void>;
  toggleDonorStatus: (id: string) => Promise<void>;

  // Audit operations
  addAuditLog: (entry: Omit<AuditLogRecord, 'id' | 'timestamp'>) => void;
  resetToInitial: () => void;
  refreshData: () => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const DELETED_AUCTIONS_KEY = 'durga_bhavani_deleted_auction_ids';

const getDeletedAuctionIds = (): Set<string> => {
  const list = safeStorage.getJson<string[]>(DELETED_AUCTIONS_KEY, []);
  return new Set(Array.isArray(list) ? list : []);
};

const recordDeletedAuctionId = (id: string) => {
  const current = getDeletedAuctionIds();
  current.add(id);
  safeStorage.setJson(DELETED_AUCTIONS_KEY, Array.from(current));
};

const clearDeletedAuctionIds = () => {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.removeItem(DELETED_AUCTIONS_KEY);
    }
  } catch {
    // Ignore error
  }
};

/**
 * Merge loaded auctions with canonical defaults (2024 & 2025).
 * Ensures all 14 records for 2024 and 14 records for 2025 are always loaded,
 * while preserving custom edits, amounts, winner photos, and newly created items.
 */
const mergeAuctionsWithDefaults = (items?: AuctionItemRecord[] | null): AuctionItemRecord[] => {
  const map = new Map<string, AuctionItemRecord>();
  const deletedIds = getDeletedAuctionIds();

  // 1. Seed canonical records (all 14 for 2024 and all 14 for 2025)
  for (const seed of sampleAuctionItems) {
    if (!deletedIds.has(seed.id)) {
      map.set(seed.id, seed);
    }
  }

  // 2. Overlay any cached or backend records (preserving updates, custom amounts, winner photos)
  if (items && Array.isArray(items)) {
    for (const item of items) {
      if (!item || !item.id || deletedIds.has(item.id)) continue;
      const existing = map.get(item.id);
      if (existing) {
        map.set(item.id, {
          ...existing,
          ...item,
          year: item.year || existing.year,
          itemName: item.itemName?.en || item.itemName?.te ? item.itemName : existing.itemName,
          winningAmount: item.winningAmount !== undefined ? item.winningAmount : existing.winningAmount,
          photoUrl: item.photoUrl || existing.photoUrl
        });
      } else {
        map.set(item.id, item);
      }
    }
  }

  const merged = Array.from(map.values()).sort((a, b) => {
    if ((a.year ?? 0) !== (b.year ?? 0)) return (b.year ?? 0) - (a.year ?? 0);
    return (a.sortOrder ?? 0) - (b.sortOrder ?? 0);
  });
  return sanitizeAuctions(merged);
};

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const [isLoadingData, setIsLoadingData] = useState<boolean>(true);
  const [isBackendConnected, setIsBackendConnected] = useState<boolean>(false);

  // Run safe cache cleanup on initialization: removes obsolete/oversized application cache keys
  useEffect(() => {
    cleanupObsoleteCache();
  }, []);

  // Initialize from clean, sanitized sample data for immediate fast first-paint
  const [albums, setAlbums] = useState<AlbumRecord[]>(() => {
    const cached = safeStorage.getJson<AlbumRecord[] | null>(STORAGE_KEYS.ALBUMS_META, null);
    if (cached && Array.isArray(cached) && cached.length > 0) {
      return sanitizeAlbums(cached);
    }
    return sanitizeAlbums(sampleAlbums);
  });

  const [avatars, setAvatars] = useState<AvatarRecord[]>(() => {
    const cached = safeStorage.getJson<AvatarRecord[] | null>(STORAGE_KEYS.AVATARS_META, null);
    if (cached && Array.isArray(cached) && cached.length > 0) {
      return sanitizeAvatars(cached);
    }
    return sanitizeAvatars(sampleAvatars);
  });

  const [auctions, setAuctions] = useState<AuctionItemRecord[]>(() => {
    const cached = safeStorage.getJson<AuctionItemRecord[] | null>(STORAGE_KEYS.AUCTIONS_META, null);
    return mergeAuctionsWithDefaults(cached);
  });

  const [donors, setDonors] = useState<DonorRecord[]>(() => {
    const cached = safeStorage.getJson<DonorRecord[] | null>(STORAGE_KEYS.DONORS_META, null);
    if (cached && Array.isArray(cached) && cached.length > 0) {
      return sanitizeDonors(cached);
    }
    return sanitizeDonors(sampleDonors);
  });

  const [auditLogs, setAuditLogs] = useState<AuditLogRecord[]>(() => sampleAuditLogs);

  const [years, setYears] = useState<YearRecord[]>(() => {
    const cached = safeStorage.getJson<YearRecord[] | null>(STORAGE_KEYS.YEARS_META, null);
    if (cached && Array.isArray(cached) && cached.length > 0) {
      return sanitizeYears(cached);
    }
    return sanitizeYears(sampleYears);
  });

  // Safe bounded metadata caching:
  // Instead of storing multi-megabyte payloads with raw image data, store bounded metadata
  // using safeStorage.setJson which catches QuotaExceededError and never throws to React.
  useEffect(() => {
    // Only cache lean metadata summaries (without heavy photos/blobs)
    const leanAvatars = avatars.map((a) => ({
      id: a.id,
      albumSlug: a.albumSlug,
      year: a.year,
      dayNumber: a.dayNumber,
      name: a.name,
      description: a.description,
      photos: (a.photos || []).slice(0, 2), // Keep at most 2 external photo references
      sortOrder: a.sortOrder,
      status: a.status
    }));
    safeStorage.setJson(STORAGE_KEYS.AVATARS_META, leanAvatars);
  }, [avatars]);

  useEffect(() => {
    const leanAlbums = albums.map((a) => ({
      id: a.id,
      slug: a.slug,
      title: a.title,
      description: a.description,
      year: a.year,
      coverImage: a.coverImage,
      photoCount: a.photoCount,
      photos: (a.photos || []).slice(0, 2),
      status: a.status,
      isSample: a.isSample,
      albumType: a.albumType
    }));
    safeStorage.setJson(STORAGE_KEYS.ALBUMS_META, leanAlbums);
  }, [albums]);

  useEffect(() => {
    safeStorage.setJson(STORAGE_KEYS.AUCTIONS_META, auctions);
  }, [auctions]);

  useEffect(() => {
    safeStorage.setJson(STORAGE_KEYS.DONORS_META, donors);
  }, [donors]);

  useEffect(() => {
    safeStorage.setJson(STORAGE_KEYS.YEARS_META, years);
  }, [years]);

  // Fetch shared central data from Backend API (MongoDB is the source of truth)
  const refreshData = useCallback(async () => {
    setIsLoadingData(true);

    // Timeout guard: 9 seconds so Render free-tier cold starts never block UI indefinitely
    const timeoutPromise = new Promise<{ isTimeout: true }>((resolve) => {
      setTimeout(() => resolve({ isTimeout: true }), 9000);
    });

    try {
      if (isAuthenticated) {
        // Authenticated admin: load full records including drafts
        const fetchPromise = Promise.all([
          api.getAdminAlbums().catch(() => null),
          api.getAdminAvatars().catch(() => null),
          api.getAdminAuctions().catch(() => null),
          api.getAdminDonors().catch(() => null),
          api.getAdminAuditLogs().catch(() => null)
        ]);

        const result = await Promise.race([fetchPromise, timeoutPromise]);

        if ('isTimeout' in result) {
          console.warn('[Data] Backend API request timed out, continuing with cached/sample data.');
          setIsBackendConnected(false);
          return;
        }

        const [albData, avData, aucData, donData, logs] = result;

        if (albData && albData.length > 0) setAlbums(sanitizeAlbums(albData));
        if (avData && avData.length > 0) setAvatars(sanitizeAvatars(avData));
        if (aucData && aucData.length > 0) setAuctions(mergeAuctionsWithDefaults(aucData));
        if (donData && donData.length > 0) setDonors(sanitizeDonors(donData));
        if (logs && logs.length > 0) setAuditLogs(logs);

        setIsBackendConnected(Boolean(albData || avData || aucData));
      } else {
        // Public visitor: load strictly published records
        const fetchPromise = Promise.all([
          api.getAlbums().catch(() => null),
          api.getAvatars().catch(() => null),
          api.getAuctions().catch(() => null),
          api.getDonors().catch(() => null),
          api.getYears().catch(() => null)
        ]);

        const result = await Promise.race([fetchPromise, timeoutPromise]);

        if ('isTimeout' in result) {
          console.warn('[Data] Backend API request timed out, continuing with cached/sample data.');
          setIsBackendConnected(false);
          return;
        }

        const [albData, avData, aucData, donData, yrsData] = result;

        if (albData && albData.length > 0) setAlbums(sanitizeAlbums(albData));
        if (avData && avData.length > 0) setAvatars(sanitizeAvatars(avData));
        if (aucData && aucData.length > 0) setAuctions(mergeAuctionsWithDefaults(aucData));
        if (donData && donData.length > 0) setDonors(sanitizeDonors(donData));
        if (yrsData && yrsData.length > 0) setYears(sanitizeYears(yrsData));

        setIsBackendConnected(Boolean(albData || avData || aucData));
      }
    } catch (err) {
      console.warn('[Data] Failed to connect to backend API, using local offline cache:', err);
      setIsBackendConnected(false);
    } finally {
      setIsLoadingData(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  const addAuditLog = (entry: Omit<AuditLogRecord, 'id' | 'timestamp'>) => {
    const newLog: AuditLogRecord = {
      ...entry,
      id: `audit-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      timestamp: new Date().toISOString()
    };
    setAuditLogs((prev) => [newLog, ...prev]);
  };

  // --- ALBUM OPERATIONS ---
  const saveAlbum = async (album: AlbumRecord) => {
    const sanitized = sanitizeAlbums([album])[0];
    setAlbums((prev) => {
      const idx = prev.findIndex((a) => a.id === sanitized.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = sanitized;
        return next;
      }
      return [...prev, sanitized];
    });

    addAuditLog({
      actorName: user?.name || 'Administrator',
      actorRole: user?.role || 'super-admin',
      action: 'update',
      resourceType: 'Album',
      resourceId: sanitized.id,
      resourceTitle: typeof sanitized.title === 'string' ? sanitized.title : sanitized.title.en,
      details: `Saved album "${typeof sanitized.title === 'string' ? sanitized.title : sanitized.title.en}" (Status: ${sanitized.status}).`
    });

    try {
      await api.saveAdminAlbum(sanitized);
      refreshData();
    } catch (err) {
      console.warn('[Data] Failed to sync album to backend:', err);
    }
  };

  const deleteAlbum = async (id: string): Promise<boolean> => {
    const target = albums.find((a) => a.id === id);
    if (!target) return false;

    setAlbums((prev) => prev.filter((a) => a.id !== id));
    addAuditLog({
      actorName: user?.name || 'Administrator',
      actorRole: user?.role || 'super-admin',
      action: 'delete',
      resourceType: 'Album',
      resourceId: id,
      resourceTitle: typeof target.title === 'string' ? target.title : target.title.en,
      details: `Deleted album "${typeof target.title === 'string' ? target.title : target.title.en}".`
    });

    try {
      await api.deleteAdminAlbum(id);
    } catch (err) {
      console.warn('[Data] Failed to delete album on backend:', err);
    }
    return true;
  };

  const toggleAlbumStatus = async (id: string) => {
    const target = albums.find((a) => a.id === id);
    if (!target) return;
    const nextStatus = target.status === 'published' ? 'draft' : 'published';
    const updated: AlbumRecord = { ...target, status: nextStatus };

    setAlbums((prev) => prev.map((a) => (a.id === id ? updated : a)));
    addAuditLog({
      actorName: user?.name || 'Administrator',
      actorRole: user?.role || 'super-admin',
      action: nextStatus === 'published' ? 'publish' : 'unpublish',
      resourceType: 'Album',
      resourceId: target.id,
      resourceTitle: typeof target.title === 'string' ? target.title : target.title.en,
      details: `Toggled album status to ${nextStatus}.`
    });

    try {
      await api.saveAdminAlbum(updated);
    } catch (err) {
      console.warn('[Data] Failed to update album status on backend:', err);
    }
  };

  // --- AVATAR OPERATIONS ---
  const saveAvatar = async (avatar: AvatarRecord) => {
    const sanitized = sanitizeAvatars([avatar])[0];
    setAvatars((prev) => {
      const idx = prev.findIndex((a) => a.id === sanitized.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = sanitized;
        return next;
      }
      return [...prev, sanitized];
    });

    addAuditLog({
      actorName: user?.name || 'Administrator',
      actorRole: user?.role || 'super-admin',
      action: 'update',
      resourceType: 'Avatar',
      resourceId: sanitized.id,
      resourceTitle: sanitized.name.en,
      details: `Updated Day ${sanitized.dayNumber} avatar "${sanitized.name.en}".`
    });

    try {
      await api.saveAdminAvatar(sanitized);
      refreshData();
    } catch (err) {
      console.warn('[Data] Failed to sync avatar to backend:', err);
    }
  };

  const deleteAvatar = async (id: string) => {
    const target = avatars.find((a) => a.id === id);
    setAvatars((prev) => prev.filter((a) => a.id !== id));
    if (target) {
      addAuditLog({
        actorName: user?.name || 'Administrator',
        actorRole: user?.role || 'super-admin',
        action: 'delete',
        resourceType: 'Avatar',
        resourceId: id,
        resourceTitle: target.name.en,
        details: `Deleted avatar "${target.name.en}".`
      });
    }

    try {
      await api.deleteAdminAvatar(id);
    } catch (err) {
      console.warn('[Data] Failed to delete avatar on backend:', err);
    }
  };

  const reorderAvatars = async (newOrder: AvatarRecord[]) => {
    const sanitized = sanitizeAvatars(
      newOrder.map((av, index) => ({
        ...av,
        sortOrder: index + 1
      }))
    );
    setAvatars(sanitized);

    addAuditLog({
      actorName: user?.name || 'Administrator',
      actorRole: user?.role || 'super-admin',
      action: 'update',
      resourceType: 'Avatar',
      details: `Reordered avatars sequence (${sanitized.length} items).`
    });

    try {
      await Promise.all(sanitized.map((av) => api.saveAdminAvatar({ id: av.id, sortOrder: av.sortOrder })));
    } catch (err) {
      console.warn('[Data] Failed to sync reordered avatars to backend:', err);
    }
  };

  const addAvatarPhoto = async (avatarId: string, photo: MediaPhoto) => {
    if (isBase64DataUrl(photo.url)) {
      console.warn('[Data] Rejected photo: Base64 data URLs must not be stored in avatar records. Upload to Cloudinary or use a hosted URL.');
      return;
    }

    let updatedAvatar: AvatarRecord | undefined;
    setAvatars((prev) =>
      prev.map((a) => {
        if (a.id === avatarId) {
          const currentPhotos = a.photos || [];
          updatedAvatar = { ...a, photos: [...currentPhotos, photo] };
          return updatedAvatar;
        }
        return a;
      })
    );

    addAuditLog({
      actorName: user?.name || 'Administrator',
      actorRole: user?.role || 'super-admin',
      action: 'upload',
      resourceType: 'Media',
      resourceId: photo.id,
      details: `Uploaded new photo to avatar ${avatarId}.`
    });

    if (updatedAvatar) {
      try {
        await api.saveAdminAvatar(updatedAvatar);
      } catch (err) {
        console.warn('[Data] Failed to sync avatar photo to backend:', err);
      }
    }
  };

  const deleteAvatarPhoto = async (avatarId: string, photoId: string) => {
    let updatedAvatar: AvatarRecord | undefined;
    setAvatars((prev) =>
      prev.map((a) => {
        if (a.id === avatarId) {
          const currentPhotos = a.photos || [];
          updatedAvatar = { ...a, photos: currentPhotos.filter((p) => p.id !== photoId) };
          return updatedAvatar;
        }
        return a;
      })
    );

    addAuditLog({
      actorName: user?.name || 'Administrator',
      actorRole: user?.role || 'super-admin',
      action: 'delete',
      resourceType: 'Media',
      resourceId: photoId,
      details: `Removed photo ${photoId} from avatar ${avatarId}.`
    });

    if (updatedAvatar) {
      try {
        await api.saveAdminAvatar(updatedAvatar);
      } catch (err) {
        console.warn('[Data] Failed to sync avatar photo removal to backend:', err);
      }
    }
  };

  // --- AUCTION OPERATIONS ---
  const saveAuctionItem = async (item: AuctionItemRecord) => {
    const sanitized = sanitizeAuctions([item])[0];
    setAuctions((prev) => {
      const idx = prev.findIndex((a) => a.id === sanitized.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = sanitized;
        return next;
      }
      return [...prev, sanitized];
    });

    const winnerStr = typeof sanitized.winnerName === 'object' ? sanitized.winnerName.en : (sanitized.winnerName || 'N/A');
    addAuditLog({
      actorName: user?.name || 'Administrator',
      actorRole: user?.role || 'super-admin',
      action: 'update',
      resourceType: 'Auction',
      resourceId: sanitized.id,
      resourceTitle: sanitized.itemName.en,
      details: `Saved auction record "${sanitized.itemName.en}" (Winner: ${winnerStr}, Amount: ₹${sanitized.winningAmount ?? 'N/A'}).`
    });

    try {
      await api.saveAdminAuction(sanitized);
      refreshData();
    } catch (err) {
      console.warn('[Data] Failed to sync auction item to backend:', err);
    }
  };

  const deleteAuctionItem = async (id: string) => {
    recordDeletedAuctionId(id);
    const target = auctions.find((a) => a.id === id);
    setAuctions((prev) => prev.filter((a) => a.id !== id));
    if (target) {
      addAuditLog({
        actorName: user?.name || 'Administrator',
        actorRole: user?.role || 'super-admin',
        action: 'delete',
        resourceType: 'Auction',
        resourceId: id,
        resourceTitle: target.itemName.en,
        details: `Deleted auction item "${target.itemName.en}".`
      });
    }

    try {
      await api.deleteAdminAuction(id);
    } catch (err) {
      console.warn('[Data] Failed to delete auction item on backend:', err);
    }
  };

  const toggleAuctionStatus = async (id: string) => {
    const target = auctions.find((a) => a.id === id);
    if (!target) return;
    const nextStatus = target.status === 'published' ? 'draft' : 'published';
    const updated = { ...target, status: nextStatus as 'draft' | 'published' };

    setAuctions((prev) => prev.map((a) => (a.id === id ? updated : a)));
    addAuditLog({
      actorName: user?.name || 'Administrator',
      actorRole: user?.role || 'super-admin',
      action: nextStatus === 'published' ? 'publish' : 'unpublish',
      resourceType: 'Auction',
      resourceId: target.id,
      resourceTitle: target.itemName.en,
      details: `Toggled auction item status to ${nextStatus}.`
    });

    try {
      await api.saveAdminAuction(updated);
    } catch (err) {
      console.warn('[Data] Failed to update auction status on backend:', err);
    }
  };

  // --- DONOR OPERATIONS ---
  const saveDonor = async (donor: DonorRecord) => {
    const sanitized = sanitizeDonors([donor])[0];
    setDonors((prev) => {
      const idx = prev.findIndex((d) => d.id === sanitized.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = sanitized;
        return next;
      }
      return [...prev, sanitized];
    });

    addAuditLog({
      actorName: user?.name || 'Administrator',
      actorRole: user?.role || 'super-admin',
      action: 'update',
      resourceType: 'Donor',
      resourceId: sanitized.id,
      resourceTitle: sanitized.name.en,
      details: `Saved donor record "${sanitized.name.en}".`
    });

    try {
      await api.saveAdminDonor(sanitized);
    } catch (err) {
      console.warn('[Data] Failed to sync donor to backend:', err);
    }
  };

  const deleteDonor = async (id: string) => {
    const target = donors.find((d) => d.id === id);
    setDonors((prev) => prev.filter((d) => d.id !== id));
    if (target) {
      addAuditLog({
        actorName: user?.name || 'Administrator',
        actorRole: user?.role || 'super-admin',
        action: 'delete',
        resourceType: 'Donor',
        resourceId: id,
        resourceTitle: target.name.en,
        details: `Deleted donor record "${target.name.en}".`
      });
    }

    try {
      await api.deleteAdminDonor(id);
    } catch (err) {
      console.warn('[Data] Failed to delete donor on backend:', err);
    }
  };

  const toggleDonorStatus = async (id: string) => {
    const target = donors.find((d) => d.id === id);
    if (!target) return;
    const nextStatus = target.status === 'published' ? 'draft' : 'published';
    const updated = { ...target, status: nextStatus as 'draft' | 'published' };

    setDonors((prev) => prev.map((d) => (d.id === id ? updated : d)));
    addAuditLog({
      actorName: user?.name || 'Administrator',
      actorRole: user?.role || 'super-admin',
      action: nextStatus === 'published' ? 'publish' : 'unpublish',
      resourceType: 'Donor',
      resourceId: target.id,
      resourceTitle: target.name.en,
      details: `Toggled donor record status to ${nextStatus}.`
    });

    try {
      await api.saveAdminDonor(updated);
    } catch (err) {
      console.warn('[Data] Failed to update donor status on backend:', err);
    }
  };

  const resetToInitial = () => {
    clearDeletedAuctionIds();
    setAlbums(sanitizeAlbums(sampleAlbums));
    setAvatars(sanitizeAvatars(sampleAvatars));
    setAuctions(mergeAuctionsWithDefaults(sampleAuctionItems));
    setDonors(sanitizeDonors(sampleDonors));
    setAuditLogs(sampleAuditLogs);
    setYears(sanitizeYears(sampleYears));

    cleanupObsoleteCache(true);
  };

  return (
    <DataContext.Provider
      value={{
        albums,
        avatars,
        auctions,
        donors,
        auditLogs,
        years,
        isLoadingData,
        isBackendConnected,
        saveAlbum,
        deleteAlbum,
        toggleAlbumStatus,
        saveAvatar,
        deleteAvatar,
        reorderAvatars,
        addAvatarPhoto,
        deleteAvatarPhoto,
        saveAuctionItem,
        deleteAuctionItem,
        toggleAuctionStatus,
        saveDonor,
        deleteDonor,
        toggleDonorStatus,
        addAuditLog,
        resetToInitial,
        refreshData
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = (): DataContextType => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
