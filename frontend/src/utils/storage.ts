import type {
  AlbumRecord,
  AvatarRecord,
  AuctionItemRecord,
  DonorRecord,
  YearRecord,
  MediaPhoto
} from '../types';

/**
 * Prefix for all Durga Bhavani application storage keys.
 * Crucial: Only keys with this prefix are touched during cache cleanup.
 * Unrelated websites or user storage will NEVER be touched.
 */
export const APP_STORAGE_PREFIX = 'durga_bhavani_';

export const STORAGE_KEYS = {
  LANGUAGE: 'durga_bhavani_language',
  AUTH_TOKEN: 'durga_bhavani_admin_token',
  AUTH_USER: 'durga_bhavani_admin_user',
  // Bounded offline metadata cache keys (lean summaries, never storing base64 blobs)
  ALBUMS_META: 'durga_bhavani_albums_meta_v2',
  AVATARS_META: 'durga_bhavani_avatars_meta_v1',
  AUCTIONS_META: 'durga_bhavani_auctions_meta_v2',
  DONORS_META: 'durga_bhavani_donors_meta_v1',
  YEARS_META: 'durga_bhavani_years_meta_v1'
} as const;

/**
 * Checks if localStorage is available and writable in the current runtime environment.
 */
export const isStorageAvailable = (): boolean => {
  if (typeof window === 'undefined' || !window.localStorage) {
    return false;
  }
  try {
    const testKey = '__db_storage_canary__';
    window.localStorage.setItem(testKey, '1');
    window.localStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
};

/**
 * Tests if a string is a base64 data URL (e.g. data:image/png;base64,...).
 */
export const isBase64DataUrl = (str?: string | null): boolean => {
  if (!str || typeof str !== 'string') return false;
  return str.startsWith('data:image/') || str.startsWith('data:application/');
};

/**
 * Safely strips any base64 data URLs from photo objects to avoid blowing up memory/cache.
 */
export const stripBase64FromPhotos = (photos?: MediaPhoto[]): MediaPhoto[] => {
  if (!Array.isArray(photos)) return [];
  return photos
    .filter((p) => p && typeof p === 'object' && p.url && !isBase64DataUrl(p.url))
    .map((p) => ({
      ...p,
      caption: p.caption || '',
      altText: p.altText || ''
    }));
};

/**
 * Resolves safe cover images for albums without base64 blobs.
 */
export const resolveCoverImage = (a: Partial<AlbumRecord>): string => {
  if (a.coverImage && !isBase64DataUrl(a.coverImage) && a.coverImage.trim() !== '') {
    return a.coverImage;
  }
  const slug = a.slug || '';
  const type = a.albumType;
  if (slug.includes('alankaranalu') || type === 'avatars') {
    return '/images/covers/cover-devi-alankaranalu.webp';
  }
  if (slug.includes('auction') || type === 'auction') {
    return '/images/covers/cover-auction-winners.webp';
  }
  if (slug.includes('donor') || type === 'donors') {
    return '/images/covers/cover-donors-sponsors.webp';
  }
  if (slug.includes('annadanam')) {
    return '/images/covers/cover-annadanam-seva.webp';
  }
  if (slug.includes('shobha-yatra') || slug.includes('recap') || slug.includes('navaratri-utsav-2024')) {
    return '/images/covers/cover-shobha-yatra.webp';
  }
  if (slug.includes('chandi-homam')) {
    return '/images/covers/cover-chandi-homam.webp';
  }
  if (slug.includes('utsav-celebrations') || slug.includes('utsav-2026')) {
    return '/images/covers/cover-utsav-highlights.webp';
  }
  return '/images/covers/cover-devi-alankaranalu.webp';
};

/**
 * Resolves safe cover images for festival years without base64 blobs.
 */
export const resolveYearCover = (y: Partial<YearRecord>): string => {
  if (y.coverImage && !isBase64DataUrl(y.coverImage) && y.coverImage.trim() !== '') {
    return y.coverImage;
  }
  if (y.year === 2026) return '/images/covers/cover-utsav-highlights.webp';
  if (y.year === 2025) return '/images/covers/cover-devi-alankaranalu.webp';
  if (y.year === 2024) return '/images/covers/cover-shobha-yatra.webp';
  return '/images/covers/cover-devi-alankaranalu.webp';
};

/**
 * Sanitize an array of avatar records:
 * - Guarantees photos is an array without base64 blobs.
 * - Guarantees non-null bilingual name and description objects.
 * - Guarantees valid numeric dayNumber and sortOrder.
 */
export const sanitizeAvatars = (list?: AvatarRecord[] | null): AvatarRecord[] => {
  if (!Array.isArray(list)) return [];
  return list.map((a, idx) => {
    const dayNumber = typeof a.dayNumber === 'number' && !isNaN(a.dayNumber) ? a.dayNumber : idx + 1;
    const sortOrder = typeof a.sortOrder === 'number' && !isNaN(a.sortOrder) ? a.sortOrder : dayNumber;
    return {
      id: a.id || `avatar-${a.year || 2025}-${String(dayNumber).padStart(2, '0')}`,
      albumSlug: a.albumSlug || 'devi-alankaranalu-2025',
      year: a.year || 2025,
      dayNumber,
      sortOrder,
      status: a.status || 'published',
      isSample: Boolean(a.isSample),
      name: {
        en: (typeof a.name === 'object' && a.name?.en) ? a.name.en : (typeof a.name === 'string' ? a.name : `Avatar ${dayNumber}`),
        te: (typeof a.name === 'object' && a.name?.te) ? a.name.te : (typeof a.name === 'string' ? a.name : `అవతారం ${dayNumber}`)
      },
      description: {
        en: (typeof a.description === 'object' && a.description?.en) ? a.description.en : '',
        te: (typeof a.description === 'object' && a.description?.te) ? a.description.te : ''
      },
      photos: stripBase64FromPhotos(a.photos)
    };
  });
};

/**
 * Sanitize an array of album records:
 * - Guarantees photos is an array without base64 blobs.
 * - Guarantees resolved coverImage.
 * - Guarantees albumType.
 */
export const sanitizeAlbums = (list?: AlbumRecord[] | null): AlbumRecord[] => {
  if (!Array.isArray(list)) return [];
  return list
    .filter((a) => a && a.id !== 'alb-2024-02' && a.slug !== 'chandi-homam-rituals-2024')
    .map((a) => {
      const albumType =
        a.albumType ||
        (a.slug?.includes('auction')
          ? 'auction'
          : a.slug?.includes('alankaranalu') || a.slug?.includes('avatar')
          ? 'avatars'
          : a.slug?.includes('donor')
          ? 'donors'
          : 'general');
      return {
        ...a,
        albumType,
        coverImage: resolveCoverImage({ ...a, albumType }),
        photos: stripBase64FromPhotos(a.photos),
        videoUrl: a.videoUrl || (a.id === 'alb-2024-01' ? 'https://youtu.be/dpYr12ArtVY' : undefined)
      };
    });
};

/**
 * Sanitize an array of auction records:
 * - Guarantees safe numeric amounts and strings.
 * - Strips any base64 photoUrl.
 */
export const sanitizeAuctions = (list?: AuctionItemRecord[] | null): AuctionItemRecord[] => {
  if (!Array.isArray(list)) return [];
  return list.map((item, idx) => ({
    ...item,
    sortOrder: typeof item.sortOrder === 'number' ? item.sortOrder : idx + 1,
    status: item.status || 'published',
    isComplete: Boolean(item.isComplete),
    photoUrl: isBase64DataUrl(item.photoUrl) ? undefined : item.photoUrl,
    itemName: {
      en: typeof item.itemName === 'object' && item.itemName?.en ? item.itemName.en : 'Festival Offering',
      te: typeof item.itemName === 'object' && item.itemName?.te ? item.itemName.te : 'ఉత్సవ సమర్పణ'
    }
  }));
};

/**
 * Sanitize an array of donor records:
 * - Strips any base64 photoOrLogoUrl.
 */
export const sanitizeDonors = (list?: DonorRecord[] | null): DonorRecord[] => {
  if (!Array.isArray(list)) return [];
  return list.map((d, idx) => ({
    ...d,
    sortOrder: typeof d.sortOrder === 'number' ? d.sortOrder : idx + 1,
    status: d.status || 'published',
    photoOrLogoUrl: isBase64DataUrl(d.photoOrLogoUrl) ? undefined : d.photoOrLogoUrl,
    name: {
      en: typeof d.name === 'object' && d.name?.en ? d.name.en : 'Devotee / Donor',
      te: typeof d.name === 'object' && d.name?.te ? d.name.te : 'భక్తుడు / దాత'
    }
  }));
};

/**
 * Sanitize an array of year records:
 * - Guarantees resolved coverImage.
 */
export const sanitizeYears = (list?: YearRecord[] | null): YearRecord[] => {
  if (!Array.isArray(list)) return [];
  return list.map((y) => ({
    ...y,
    coverImage: resolveYearCover(y)
  }));
};

/**
 * Obsolete and dangerous cache entry cleanup.
 *
 * Rules:
 * 1. ONLY inspects keys starting with 'durga_bhavani_'. Never touches foreign data.
 * 2. Preserves active essential user preferences (language, auth).
 * 3. Removes the oversized 'durga_bhavani_avatars_v4' key or any key containing base64 images
 *    or payloads exceeding size limits.
 * 4. Removes older legacy cache version keys (v1, v2, v3, v4, v5 old format).
 */
export const cleanupObsoleteCache = (forcePurgeCache = false): void => {
  if (typeof window === 'undefined' || !window.localStorage) return;

  const preservedKeys = new Set<string>([
    STORAGE_KEYS.LANGUAGE,
    STORAGE_KEYS.AUTH_TOKEN,
    STORAGE_KEYS.AUTH_USER
  ]);

  try {
    const keysToRemove: string[] = [];
    const storageLength = window.localStorage.length;

    for (let i = 0; i < storageLength; i++) {
      const key = window.localStorage.key(i);
      if (!key || !key.startsWith(APP_STORAGE_PREFIX)) continue;

      // Preserve auth and language preference
      if (preservedKeys.has(key)) continue;

      // Identify specifically problematic old keys
      const isLegacyFullCache =
        key === 'durga_bhavani_albums_meta_v1' ||
        key === 'durga_bhavani_auctions_meta_v1' ||
        key === 'durga_bhavani_avatars_v4' ||
        key === 'durga_bhavani_albums_v5' ||
        key === 'durga_bhavani_auctions_v4' ||
        key === 'durga_bhavani_donors_v4' ||
        key === 'durga_bhavani_audit_logs_v4' ||
        key === 'durga_bhavani_years_v5' ||
        /_v[1-3]($|_)/.test(key);

      if (isLegacyFullCache || forcePurgeCache) {
        keysToRemove.push(key);
        continue;
      }

      // Check for oversized payload or base64 inclusion
      try {
        const val = window.localStorage.getItem(key);
        if (val) {
          // If a key contains base64 image or is larger than 60KB, remove it
          if (val.includes('data:image') || val.length > 60000) {
            keysToRemove.push(key);
          }
        }
      } catch {
        keysToRemove.push(key);
      }
    }

    for (const k of keysToRemove) {
      try {
        window.localStorage.removeItem(k);
      } catch {
        // Ignore errors during removal
      }
    }

    if (keysToRemove.length > 0) {
      console.info(`[Storage] Safely cleaned up ${keysToRemove.length} obsolete/oversized application cache keys.`);
    }
  } catch (err) {
    console.warn('[Storage] Error during cache cleanup:', err);
  }
};

/**
 * Safe localStorage wrapper that guarantees:
 * 1. Writes will NEVER throw QuotaExceededError or crash rendering/navigation.
 * 2. Storage unavailability (e.g. Safari private browsing, disabled cookies) is handled gracefully.
 * 3. Automatically attempts self-healing cache eviction when quota is exceeded.
 */
export const safeStorage = {
  isAvailable: isStorageAvailable,

  getItem(key: string): string | null {
    if (typeof window === 'undefined' || !window.localStorage) return null;
    try {
      return window.localStorage.getItem(key);
    } catch (err) {
      console.warn(`[Storage] Failed to read key "${key}":`, err);
      return null;
    }
  },

  setItem(key: string, value: string): boolean {
    if (typeof window === 'undefined' || !window.localStorage) return false;

    // Hard safeguard: Never write values containing base64 images to localStorage
    if (value.includes('data:image')) {
      console.warn(`[Storage] Rejected setItem for "${key}": payload contains base64 image.`);
      return false;
    }

    // Hard safeguard: Reject any single key larger than 100KB to protect browser quota
    if (value.length > 100000) {
      console.warn(`[Storage] Rejected setItem for "${key}": payload size (${value.length} bytes) exceeds limit.`);
      return false;
    }

    try {
      window.localStorage.setItem(key, value);
      return true;
    } catch (err: unknown) {
      const isQuotaError =
        err instanceof DOMException &&
        (err.name === 'QuotaExceededError' ||
          err.name === 'NS_ERROR_DOM_QUOTA_REACHED' ||
          err.code === 22 ||
          err.code === 1014);

      if (isQuotaError) {
        console.warn(`[Storage] QuotaExceededError writing "${key}". Initiating emergency cache purge.`);
        try {
          cleanupObsoleteCache(true);
          // Try once more after purging non-essential cache
          window.localStorage.setItem(key, value);
          return true;
        } catch {
          console.warn(`[Storage] Second write attempt failed for "${key}". Continuing in-memory.`);
          return false;
        }
      }

      console.warn(`[Storage] Write failed for "${key}":`, err);
      return false;
    }
  },

  removeItem(key: string): void {
    if (typeof window === 'undefined' || !window.localStorage) return;
    try {
      window.localStorage.removeItem(key);
    } catch (err) {
      console.warn(`[Storage] Failed to remove key "${key}":`, err);
    }
  },

  getJson<T>(key: string, fallback: T): T {
    const raw = this.getItem(key);
    if (!raw) return fallback;
    try {
      return JSON.parse(raw) as T;
    } catch {
      return fallback;
    }
  },

  setJson<T>(key: string, value: T): boolean {
    try {
      const serialized = JSON.stringify(value);
      return this.setItem(key, serialized);
    } catch (err) {
      console.warn(`[Storage] Failed to serialize JSON for "${key}":`, err);
      return false;
    }
  }
};

// Run cache cleanup immediately on module evaluation
if (typeof window !== 'undefined') {
  cleanupObsoleteCache();
}
