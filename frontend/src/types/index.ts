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

export type AlbumType = 'general' | 'avatars' | 'auction' | 'donors';

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
  albumType?: AlbumType;
  videoUrl?: string;
}

export interface AvatarRecord {
  id: string;
  albumSlug: string;
  year: number;
  dayNumber: number; // 1 to 10 or editable order
  name: LocalizedString; // Telugu and English names
  description?: LocalizedString;
  photos: MediaPhoto[];
  sortOrder: number;
  status: PublicationStatus;
  isSample?: boolean;
}

export interface AuctionItemRecord {
  id: string;
  albumSlug: string;
  year: number;
  itemName: LocalizedString;
  avatarId?: string; // Linked avatar id when applicable
  avatarName?: LocalizedString; // Associated avatar name in Telugu and English
  winnerName?: LocalizedString | string; // Winner's name (Telugu, English, or bilingual where available)
  fatherName?: LocalizedString | string; // Father's name if provided, empty string if not supplied
  winningAmount?: number; // In Indian rupees, non-negative number
  photoUrl?: string;
  notes?: LocalizedString | string;
  itemType: 'saree' | 'special_item';
  status: PublicationStatus;
  isComplete: boolean; // false for draft/unfilled records like laddu, mukku pudaka, kalasham, lakshmi maala
  sortOrder: number;
  isSample?: boolean;
}

export interface DonorRecord {
  id: string;
  albumSlug: string;
  year: number;
  name: LocalizedString; // Person or organization name in Telugu and English
  contributionType: LocalizedString;
  amount?: number; // Optional contribution amount in INR
  photoOrLogoUrl?: string;
  notes?: LocalizedString | string;
  status: PublicationStatus;
  sortOrder: number;
  isSample?: boolean;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'super-admin' | 'editor' | 'media-manager';
  active: boolean;
}

export interface AuditLogRecord {
  id: string;
  actorName: string;
  actorRole: string;
  action: 'create' | 'update' | 'delete' | 'publish' | 'unpublish' | 'upload';
  resourceType: 'Album' | 'Avatar' | 'Auction' | 'Donor' | 'Media' | 'Year';
  resourceId?: string;
  resourceTitle?: string;
  timestamp: string;
  details?: string;
}

/**
 * Format numeric amount as Indian Rupees (e.g. ₹25,000, ₹5,116).
 * Returns empty string if amount is undefined, null, or NaN.
 */
export function formatRupees(amount?: number | null): string {
  if (amount === undefined || amount === null || isNaN(amount)) {
    return '';
  }
  const formatted = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
  return formatted.endsWith('/-') ? formatted : `${formatted}/-`;
}

export interface YearRecord {
  year: number;
  title: LocalizedString | string;
  slug: string;
  description: LocalizedString | string;
  coverImage: string;
  startDate?: string;
  endDate?: string;
  dateRangeFormatted?: LocalizedString;
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
  contactPhoneSecondary?: string;
  contactPhones?: string[];
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
