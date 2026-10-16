import React, { createContext, useContext, useState, useEffect } from 'react';
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

interface DataContextType {
  albums: AlbumRecord[];
  avatars: AvatarRecord[];
  auctions: AuctionItemRecord[];
  donors: DonorRecord[];
  auditLogs: AuditLogRecord[];
  years: YearRecord[];
  
  // Album operations
  saveAlbum: (album: AlbumRecord) => void;
  deleteAlbum: (id: string) => boolean;
  toggleAlbumStatus: (id: string) => void;

  // Avatar operations
  saveAvatar: (avatar: AvatarRecord) => void;
  deleteAvatar: (id: string) => void;
  reorderAvatars: (avatars: AvatarRecord[]) => void;
  addAvatarPhoto: (avatarId: string, photo: MediaPhoto) => void;
  deleteAvatarPhoto: (avatarId: string, photoId: string) => void;

  // Auction operations
  saveAuctionItem: (item: AuctionItemRecord) => void;
  deleteAuctionItem: (id: string) => void;
  toggleAuctionStatus: (id: string) => void;

  // Donor operations
  saveDonor: (donor: DonorRecord) => void;
  deleteDonor: (id: string) => void;
  toggleDonorStatus: (id: string) => void;

  // Audit operations
  addAuditLog: (entry: Omit<AuditLogRecord, 'id' | 'timestamp'>) => void;
  resetToInitial: () => void;
}

const STORAGE_KEYS = {
  ALBUMS: 'durga_bhavani_albums',
  AVATARS: 'durga_bhavani_avatars',
  AUCTIONS: 'durga_bhavani_auctions',
  DONORS: 'durga_bhavani_donors',
  AUDIT: 'durga_bhavani_audit_logs',
  YEARS: 'durga_bhavani_years'
};

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();

  const [albums, setAlbums] = useState<AlbumRecord[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEYS.ALBUMS);
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          // fallback
        }
      }
    }
    return sampleAlbums;
  });

  const [avatars, setAvatars] = useState<AvatarRecord[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEYS.AVATARS);
      if (saved) {
        try {
          const parsed: AvatarRecord[] = JSON.parse(saved);
          return parsed.map((av) => {
            if (av.id === 'avatar-2025-07' && av.name?.te === 'శ్రీ సరస్వతీ దేవి - మూలా నక్షత్రం') {
              return { ...av, name: { ...av.name, te: 'శ్రీ సరస్వతీ దేవి' } };
            }
            return av;
          });
        } catch {
          // fallback
        }
      }
    }
    return sampleAvatars;
  });

  const [auctions, setAuctions] = useState<AuctionItemRecord[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEYS.AUCTIONS);
      if (saved) {
        try {
          const parsed: AuctionItemRecord[] = JSON.parse(saved);
          return parsed.map((auc) => {
            const initial = sampleAuctionItems.find((s) => s.id === auc.id);
            let updated = auc;
            if (auc.id === 'auc-2025-07' && auc.avatarName && auc.avatarName.te === 'శ్రీ సరస్వతీ దేవి - మూలా నక్షత్రం') {
              updated = { ...updated, avatarName: { en: auc.avatarName.en, te: 'శ్రీ సరస్వతీ దేవి' } };
            }
            if (updated.photoUrl === undefined && initial?.photoUrl) {
              updated = { ...updated, photoUrl: initial.photoUrl };
            }
            return updated;
          });
        } catch {
          // fallback
        }
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
        } catch {
          // fallback
        }
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
        } catch {
          // fallback
        }
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
        } catch {
          // fallback
        }
      }
    }
    return sampleYears;
  });

  // Sync to localStorage
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

  const addAuditLog = (entry: Omit<AuditLogRecord, 'id' | 'timestamp'>) => {
    const newLog: AuditLogRecord = {
      ...entry,
      id: `audit-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      timestamp: new Date().toISOString()
    };
    setAuditLogs((prev) => [newLog, ...prev]);
  };

  // Album operations
  const saveAlbum = (album: AlbumRecord) => {
    setAlbums((prev) => {
      const index = prev.findIndex((a) => a.id === album.id);
      if (index >= 0) {
        const next = [...prev];
        next[index] = album;
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
      details: `Saved album "${typeof album.title === 'string' ? album.title : album.title.en}" with status ${album.status}.`
    });
  };

  const deleteAlbum = (id: string): boolean => {
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
    return true;
  };

  const toggleAlbumStatus = (id: string) => {
    setAlbums((prev) =>
      prev.map((a) => {
        if (a.id === id) {
          const newStatus = a.status === 'published' ? 'draft' : 'published';
          addAuditLog({
            actorName: user?.name || 'Administrator',
            actorRole: user?.role || 'super-admin',
            action: newStatus === 'published' ? 'publish' : 'unpublish',
            resourceType: 'Album',
            resourceId: a.id,
            resourceTitle: typeof a.title === 'string' ? a.title : a.title.en,
            details: `Changed album status to ${newStatus}.`
          });
          return { ...a, status: newStatus };
        }
        return a;
      })
    );
  };

  // Avatar operations
  const saveAvatar = (avatar: AvatarRecord) => {
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
  };

  const deleteAvatar = (id: string) => {
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
  };

  const reorderAvatars = (newOrder: AvatarRecord[]) => {
    setAvatars(newOrder);
    addAuditLog({
      actorName: user?.name || 'Administrator',
      actorRole: user?.role || 'super-admin',
      action: 'update',
      resourceType: 'Avatar',
      details: 'Reordered daily avatars sequence.'
    });
  };

  const addAvatarPhoto = (avatarId: string, photo: MediaPhoto) => {
    setAvatars((prev) =>
      prev.map((a) => {
        if (a.id === avatarId) {
          return {
            ...a,
            photos: [...a.photos, photo]
          };
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
  };

  const deleteAvatarPhoto = (avatarId: string, photoId: string) => {
    setAvatars((prev) =>
      prev.map((a) => {
        if (a.id === avatarId) {
          return {
            ...a,
            photos: a.photos.filter((p) => p.id !== photoId)
          };
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
  };

  // Auction operations
  const saveAuctionItem = (item: AuctionItemRecord) => {
    setAuctions((prev) => {
      const idx = prev.findIndex((a) => a.id === item.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = item;
        return next;
      }
      return [...prev, item];
    });

    addAuditLog({
      actorName: user?.name || 'Administrator',
      actorRole: user?.role || 'super-admin',
      action: 'update',
      resourceType: 'Auction',
      resourceId: item.id,
      resourceTitle: item.itemName.en,
      details: `Saved auction record "${item.itemName.en}" (Winner: ${item.winnerName || 'N/A'}, Amount: ₹${item.winningAmount ?? 'N/A'}).`
    });
  };

  const deleteAuctionItem = (id: string) => {
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
  };

  const toggleAuctionStatus = (id: string) => {
    setAuctions((prev) =>
      prev.map((a) => {
        if (a.id === id) {
          const nextStatus = a.status === 'published' ? 'draft' : 'published';
          addAuditLog({
            actorName: user?.name || 'Administrator',
            actorRole: user?.role || 'super-admin',
            action: nextStatus === 'published' ? 'publish' : 'unpublish',
            resourceType: 'Auction',
            resourceId: a.id,
            resourceTitle: a.itemName.en,
            details: `Toggled auction item status to ${nextStatus}.`
          });
          return { ...a, status: nextStatus };
        }
        return a;
      })
    );
  };

  // Donor operations
  const saveDonor = (donor: DonorRecord) => {
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
  };

  const deleteDonor = (id: string) => {
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
  };

  const toggleDonorStatus = (id: string) => {
    setDonors((prev) =>
      prev.map((d) => {
        if (d.id === id) {
          const nextStatus = d.status === 'published' ? 'draft' : 'published';
          addAuditLog({
            actorName: user?.name || 'Administrator',
            actorRole: user?.role || 'super-admin',
            action: nextStatus === 'published' ? 'publish' : 'unpublish',
            resourceType: 'Donor',
            resourceId: d.id,
            resourceTitle: d.name.en,
            details: `Toggled donor status to ${nextStatus}.`
          });
          return { ...d, status: nextStatus };
        }
        return d;
      })
    );
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
        resetToInitial
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
