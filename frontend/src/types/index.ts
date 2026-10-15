export type PublicationStatus = 'draft' | 'published' | 'archived';

export interface MediaPhoto {
  id: string;
  url: string;
  caption: string;
  altText: string;
  photographerCredit?: string;
  year?: number;
  albumSlug?: string;
  isSample: boolean;
}

export interface AlbumRecord {
  id: string;
  slug: string;
  title: string;
  description: string;
  year: number;
  coverImage: string;
  photoCount: number;
  photos: MediaPhoto[];
  status: PublicationStatus;
  isSample: boolean;
}

export interface YearRecord {
  year: number;
  title: string;
  slug: string;
  description: string;
  coverImage: string;
  startDate?: string;
  endDate?: string;
  status: PublicationStatus;
  albumCount: number;
  highlights: string[];
  isSample: boolean;
}

export interface EventRecord {
  id: string;
  slug: string;
  title: string;
  description: string;
  startDate: string;
  endDate?: string;
  time?: string;
  location: string;
  posterUrl?: string;
  status: 'upcoming' | 'past';
  year: number;
  isSample: boolean;
}

export interface AnnouncementRecord {
  id: string;
  slug: string;
  title: string;
  content: string;
  publishedAt: string;
  expiresAt?: string;
  imageUrl?: string;
  featured: boolean;
  isSample: boolean;
}

export interface HistoricalMilestoneRecord {
  id: string;
  title: string;
  yearOrDate: string;
  description: string;
  imageUrl?: string;
  sortOrder: number;
  status: PublicationStatus;
  isSample: boolean;
}

export interface SiteSettingsRecord {
  organizationName: string;
  tagline: string;
  aboutText: string;
  mission: string;
  vision: string;
  contactEmail: string;
  contactPhone: string;
  locationAddress: string;
  googleMapsEmbedUrl: string;
  socialLinks: {
    youtube?: string;
    facebook?: string;
    whatsapp?: string;
  };
  footerNotice: string;
}
