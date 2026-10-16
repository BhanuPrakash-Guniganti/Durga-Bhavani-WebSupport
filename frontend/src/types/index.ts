export type PublicationStatus = 'draft' | 'published' | 'archived';
export type SupportedLanguage = 'en' | 'te';

/**
 * Standard bilingual localized string container.
 * Supports both English ('en') and Telugu ('te') translations.
 */
export interface LocalizedString {
  en: string;
  te: string;
}

/**
 * Standard bilingual localized string array container.
 */
export interface LocalizedArray {
  en: string[];
  te: string[];
}

export type Localizable<T = string> = LocalizedString | T;

export interface MediaPhoto {
  id: string;
  url: string;
  caption: LocalizedString | string;
  altText: LocalizedString | string;
  photographerCredit?: LocalizedString | string;
  year?: number;
  albumSlug?: string;
  isSample: boolean;
}

export interface AlbumRecord {
  id: string;
  slug: string;
  title: LocalizedString | string;
  description: LocalizedString | string;
  year: number;
  coverImage: string;
  photoCount: number;
  photos: MediaPhoto[];
  status: PublicationStatus;
  isSample: boolean;
}

export interface YearRecord {
  year: number;
  title: LocalizedString | string;
  slug: string;
  description: LocalizedString | string;
  coverImage: string;
  startDate?: string;
  endDate?: string;
  status: PublicationStatus;
  albumCount: number;
  highlights: LocalizedArray | string[];
  isSample: boolean;
}

export interface EventRecord {
  id: string;
  slug: string;
  title: LocalizedString | string;
  description: LocalizedString | string;
  startDate: string;
  endDate?: string;
  time?: LocalizedString | string;
  location: LocalizedString | string;
  posterUrl?: string;
  status: 'upcoming' | 'past';
  year: number;
  isSample: boolean;
}

export interface AnnouncementRecord {
  id: string;
  slug: string;
  title: LocalizedString | string;
  content: LocalizedString | string;
  publishedAt: string;
  expiresAt?: string;
  imageUrl?: string;
  featured: boolean;
  isSample: boolean;
}

export interface HistoricalMilestoneRecord {
  id: string;
  title: LocalizedString | string;
  yearOrDate: LocalizedString | string;
  description: LocalizedString | string;
  imageUrl?: string;
  sortOrder: number;
  status: PublicationStatus;
  isSample: boolean;
}

export interface SiteSettingsRecord {
  organizationName: LocalizedString | string;
  tagline: LocalizedString | string;
  aboutText: LocalizedString | string;
  mission: LocalizedString | string;
  vision: LocalizedString | string;
  contactEmail: string;
  contactPhone: string;
  locationAddress: LocalizedString | string;
  googleMapsEmbedUrl: string;
  socialLinks: {
    youtube?: string;
    facebook?: string;
    whatsapp?: string;
  };
  celebrationHistoryTitle?: LocalizedString | string;
  footerNotice: LocalizedString | string;
}
