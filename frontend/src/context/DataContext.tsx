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

const STORAGE_KEYS = {
  ALBUMS: 'durga_bhavani_albums_v4',
  AVATARS: 'durga_bhavani_avatars_v4',
  AUCTIONS: 'durga_bhavani_auctions_v4',
  DONORS: 'durga_bhavani_donors_v4',
  AUDIT: 'durga_bhavani_audit_logs_v4',
  YEARS: 'durga_bhavani_years_v4'
};

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const [isLoadingData, setIsLoadingData] = useState<boolean>(true);
  const [isBackendConnected, setIsBackendConnected] = useState<boolean>(false);

const sanitizeAlbums = (list: AlbumRecord[]): AlbumRecord[] => {
  return list.map((a) => ({
    ...a,
    albumType:
      a.albumType ||
      (a.slug?.includes('auction')
        ? 'auction'
        : a.slug?.includes('alankaranalu') || a.slug?.includes('avatar')
        ? 'avatars'
        : a.slug?.includes('donor')
        ? 'donors'
        : 'general'),
    photos: a.photos || []
  }));
};

  // Initialize from cache or sample data
  const [albums, setAlbums] = useState<AlbumRecord[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEYS.ALBUMS);
      if (saved) {
        try {
          return sanitizeAlbums(JSON.parse(saved));
        } catch {}
      }
    }
    return sanitizeAlbums(sampleAlbums);
  });

  const [avatars, setAvatars] = useState<AvatarRecord[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEYS.AVATARS);
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {}
      }
    }
    return sampleAvatars;
  });

  const [auctions, setAuctions] = useState<AuctionItemRecord[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEYS.AUCTIONS);
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {}
      }
    }
    return sampleAuctionItems;
  });

  const [donors, setDonors] = useState<DonorRecord[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEYS.DONORS);
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {}
      }
    }
    return sampleDonors;
  });

  const [auditLogs, setAuditLogs] = useState<AuditLogRecord[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEYS.AUDIT);
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {}
      }
    }
    return sampleAuditLogs;
  });

  const [years, setYears] = useState<YearRecord[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEYS.YEARS);
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {}
      }
    }
    return sampleYears;
  });

  // Sync state to local cache
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ALBUMS, JSON.stringify(albums));
  }, [albums]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.AVATARS, JSON.stringify(avatars));
  }, [avatars]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.AUCTIONS, JSON.stringify(auctions));
  }, [auctions]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.DONORS, JSON.stringify(donors));
  }, [donors]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.AUDIT, JSON.stringify(auditLogs));
  }, [auditLogs]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.YEARS, JSON.stringify(years));
  }, [years]);

  // Fetch shared central data from Backend API
  const refreshData = useCallback(async () => {
    setIsLoadingData(true);
    try {
      if (isAuthenticated) {
        // Authenticated admin: load full records including drafts
        const [albData, avData, aucData, donData, logs] = await Promise.all([
          api.getAdminAlbums().catch(() => null),
          api.getAdminAvatars().catch(() => null),
          api.getAdminAuctions().catch(() => null),
          api.getAdminDonors().catch(() => null),
          api.getAdminAuditLogs().catch(() => null)
        ]);

        if (albData && albData.length > 0) setAlbums(sanitizeAlbums(albData));
        if (avData && avData.length > 0) setAvatars(avData);
        if (aucData && aucData.length > 0) setAuctions(aucData);
        if (donData && donData.length > 0) setDonors(donData);
        if (logs && logs.length > 0) setAuditLogs(logs);

        setIsBackendConnected(Boolean(albData || avData || aucData));
      } else {
        // Public visitor: load strictly published records
        const [albData, avData, aucData, donData, yrsData] = await Promise.all([
          api.getAlbums().catch(() => null),
          api.getAvatars().catch(() => null),
          api.getAuctions().catch(() => null),
          api.getDonors().catch(() => null),
          api.getYears().catch(() => null)
        ]);

        if (albData && albData.length > 0) setAlbums(sanitizeAlbums(albData));
        if (avData && avData.length > 0) setAvatars(avData);
        if (aucData && aucData.length > 0) setAuctions(aucData);
        if (donData && donData.length > 0) setDonors(donData);
        if (yrsData && yrsData.length > 0) setYears(yrsData);

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
    setAlbums((prev) => {
      const idx = prev.findIndex((a) => a.id === album.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = album;
        return next;
      }
      return [...prev, album];
    });

    addAuditLog({
      actorName: user?.name || 'Administrator',
      actorRole: user?.role || 'super-admin',
      action: 'update',
      resourceType: 'Album',
      resourceId: album.id,
      resourceTitle: typeof album.title === 'string' ? album.title : album.title.en,
      details: `Saved album "${typeof album.title === 'string' ? album.title : album.title.en}" (Status: ${album.status}).`
    });

    // Send to central backend
    try {
      await api.saveAdminAlbum(album);
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
    const updated = { ...target, status: nextStatus as 'draft' | 'published' };

    setAlbums((prev) => prev.map((a) => (a.id === id ? updated : a)));
    addAuditLog({
      actorName: user?.name || 'Administrator',
      actorRole: user?.role || 'super-admin',
      action: nextStatus === 'published' ? 'publish' : 'unpublish',
      resourceType: 'Album',
      resourceId: target.id,
      resourceTitle: typeof target.title === 'string' ? target.title : target.title.en,
      details: `Changed album status to ${nextStatus}.`
    });

    try {
      await api.saveAdminAlbum(updated);
    } catch (err) {
      console.warn('[Data] Failed to update album status on backend:', err);
    }
  };

  // --- AVATAR OPERATIONS ---
  const saveAvatar = async (avatar: AvatarRecord) => {
    setAvatars((prev) => {
      const idx = prev.findIndex((a) => a.id === avatar.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = avatar;
        return next;
      }
      return [...prev, avatar];
    });

    addAuditLog({
      actorName: user?.name || 'Administrator',
      actorRole: user?.role || 'super-admin',
      action: 'update',
      resourceType: 'Avatar',
      resourceId: avatar.id,
      resourceTitle: avatar.name.en,
      details: `Updated Day ${avatar.dayNumber} avatar: "${avatar.name.en}".`
    });

    try {
      await api.saveAdminAvatar(avatar);
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
    setAvatars(newOrder);
    addAuditLog({
      actorName: user?.name || 'Administrator',
      actorRole: user?.role || 'super-admin',
      action: 'update',
      resourceType: 'Avatar',
      details: 'Reordered daily avatars sequence.'
    });

    try {
      await Promise.all(newOrder.map((av, index) => api.saveAdminAvatar({ id: av.id, sortOrder: index })));
    } catch (err) {
      console.warn('[Data] Failed to sync reordered avatars to backend:', err);
    }
  };

  const addAvatarPhoto = async (avatarId: string, photo: MediaPhoto) => {
    let updatedAvatar: AvatarRecord | undefined;
    setAvatars((prev) =>
      prev.map((a) => {
        if (a.id === avatarId) {
          updatedAvatar = { ...a, photos: [...a.photos, photo] };
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
          updatedAvatar = { ...a, photos: a.photos.filter((p) => p.id !== photoId) };
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
    setAuctions((prev) => {
      const idx = prev.findIndex((a) => a.id === item.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = item;
        return next;
      }
      return [...prev, item];
    });

    const winnerStr = typeof item.winnerName === 'object' ? item.winnerName.en : (item.winnerName || 'N/A');
    addAuditLog({
      actorName: user?.name || 'Administrator',
      actorRole: user?.role || 'super-admin',
      action: 'update',
      resourceType: 'Auction',
      resourceId: item.id,
      resourceTitle: item.itemName.en,
      details: `Saved auction record "${item.itemName.en}" (Winner: ${winnerStr}, Amount: ₹${item.winningAmount ?? 'N/A'}).`
    });

    try {
      await api.saveAdminAuction(item);
      refreshData();
    } catch (err) {
      console.warn('[Data] Failed to sync auction item to backend:', err);
    }
  };

  const deleteAuctionItem = async (id: string) => {
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
    setDonors((prev) => {
      const idx = prev.findIndex((d) => d.id === donor.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = donor;
        return next;
      }
      return [...prev, donor];
    });

    addAuditLog({
      actorName: user?.name || 'Administrator',
      actorRole: user?.role || 'super-admin',
      action: 'update',
      resourceType: 'Donor',
      resourceId: donor.id,
      resourceTitle: donor.name.en,
      details: `Saved donor record "${donor.name.en}".`
    });

    try {
      await api.saveAdminDonor(donor);
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
    setAlbums(sampleAlbums);
    setAvatars(sampleAvatars);
    setAuctions(sampleAuctionItems);
    setDonors(sampleDonors);
    setAuditLogs(sampleAuditLogs);
    setYears(sampleYears);

    localStorage.removeItem(STORAGE_KEYS.ALBUMS);
    localStorage.removeItem(STORAGE_KEYS.AVATARS);
    localStorage.removeItem(STORAGE_KEYS.AUCTIONS);
    localStorage.removeItem(STORAGE_KEYS.DONORS);
    localStorage.removeItem(STORAGE_KEYS.AUDIT);
    localStorage.removeItem(STORAGE_KEYS.YEARS);
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
