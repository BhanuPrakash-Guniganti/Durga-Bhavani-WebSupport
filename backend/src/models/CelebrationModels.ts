import mongoose, { Schema, Document } from 'mongoose';

// Localized String sub-schema
const localizedStringSchema = new Schema(
  {
    en: { type: String, default: '' },
    te: { type: String, default: '' }
  },
  { _id: false }
);

// Photo sub-schema
const mediaPhotoSchema = new Schema(
  {
    id: { type: String, required: true },
    url: { type: String, required: true },
    caption: { type: localizedStringSchema },
    altText: { type: localizedStringSchema },
    publicId: { type: String }
  },
  { _id: false }
);

// 1. Year Model
export interface IYearDoc extends Document {
  year: number;
  title: { en: string; te: string };
  slug: string;
  albumCount: number;
  status: 'draft' | 'published';
}
const yearSchema = new Schema<IYearDoc>(
  {
    year: { type: Number, required: true, unique: true },
    title: { type: localizedStringSchema, required: true },
    slug: { type: String, required: true, unique: true },
    albumCount: { type: Number, default: 0 },
    status: { type: String, enum: ['draft', 'published'], default: 'published' }
  },
  { timestamps: true }
);
export const YearModel = mongoose.model<IYearDoc>('Year', yearSchema);

// 2. Album Model
export interface IAlbumDoc extends Document {
  id: string;
  slug: string;
  title: { en: string; te: string };
  description: { en: string; te: string };
  category: string;
  year: number;
  albumType?: 'avatars' | 'auction' | 'donors' | 'general';
  coverPhoto: { id: string; url: string; altText?: { en: string; te: string } };
  coverImage?: string;
  photoCount?: number;
  photos: Array<{ id: string; url: string; caption?: { en: string; te: string }; altText?: { en: string; te: string }; publicId?: string }>;
  sortOrder: number;
  status: 'draft' | 'published';
}
const albumSchema = new Schema<IAlbumDoc>(
  {
    id: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    title: { type: localizedStringSchema, required: true },
    description: { type: localizedStringSchema, default: () => ({ en: '', te: '' }) },
    category: { type: String, default: 'celebration' },
    year: { type: Number, required: true },
    albumType: { type: String, enum: ['avatars', 'auction', 'donors', 'general'], default: 'general' },
    coverPhoto: {
      id: { type: String, default: '' },
      url: { type: String, default: '' },
      altText: { type: localizedStringSchema }
    },
    coverImage: { type: String, default: '' },
    photoCount: { type: Number, default: 0 },
    photos: { type: [mediaPhotoSchema], default: [] },
    sortOrder: { type: Number, default: 0 },
    status: { type: String, enum: ['draft', 'published'], default: 'published' }
  },
  { timestamps: true, strict: false }
);
export const AlbumModel = mongoose.model<IAlbumDoc>('Album', albumSchema);

// 3. Avatar Model (Devi Alankaranalu)
export interface IAvatarDoc extends Document {
  id: string;
  dayNumber: number;
  date: string;
  tithi: { en: string; te: string };
  name: { en: string; te: string };
  description?: { en: string; te: string };
  color: string;
  sareeColor: { en: string; te: string };
  prasadam: { en: string; te: string };
  significance: { en: string; te: string };
  photos: Array<{ id: string; url: string; caption?: { en: string; te: string }; altText?: { en: string; te: string }; publicId?: string }>;
  year: number;
  albumSlug: string;
  sortOrder: number;
  status: 'draft' | 'published';
}
const avatarSchema = new Schema<IAvatarDoc>(
  {
    id: { type: String, required: true, unique: true },
    dayNumber: { type: Number, required: true },
    date: { type: String, default: '' },
    tithi: { type: localizedStringSchema, default: () => ({ en: '', te: '' }) },
    name: { type: localizedStringSchema, required: true },
    description: { type: localizedStringSchema, default: () => ({ en: '', te: '' }) },
    color: { type: String, default: '#800020' },
    sareeColor: { type: localizedStringSchema, default: () => ({ en: '', te: '' }) },
    prasadam: { type: localizedStringSchema, default: () => ({ en: '', te: '' }) },
    significance: { type: localizedStringSchema, default: () => ({ en: '', te: '' }) },
    photos: { type: [mediaPhotoSchema], default: [] },
    year: { type: Number, default: 2025 },
    albumSlug: { type: String, default: 'devi-alankaranalu-2025' },
    sortOrder: { type: Number, default: 0 },
    status: { type: String, enum: ['draft', 'published'], default: 'published' }
  },
  { timestamps: true, strict: false }
);
export const AvatarModel = mongoose.model<IAvatarDoc>('Avatar', avatarSchema);

// 4. Auction Item Model
export interface IAuctionItemDoc extends Document {
  id: string;
  itemName: { en: string; te: string };
  avatarId?: string;
  avatarName?: { en: string; te: string };
  winningAmount: number;
  winnerName: { en: string; te: string } | string;
  fatherName?: { en: string; te: string } | string;
  photoUrl?: string;
  photoPublicId?: string;
  year: number;
  albumSlug: string;
  itemType?: 'saree' | 'special_item';
  isComplete: boolean;
  sortOrder: number;
  status: 'draft' | 'published';
  notes?: { en: string; te: string };
}
const auctionItemSchema = new Schema<IAuctionItemDoc>(
  {
    id: { type: String, required: true, unique: true },
    itemName: { type: localizedStringSchema, required: true },
    avatarId: { type: String },
    avatarName: { type: localizedStringSchema },
    winningAmount: { type: Number, default: 0 },
    winnerName: { type: Schema.Types.Mixed, default: '' },
    fatherName: { type: Schema.Types.Mixed, default: '' },
    photoUrl: { type: String, default: '' },
    photoPublicId: { type: String, default: '' },
    year: { type: Number, default: 2025 },
    albumSlug: { type: String, default: 'auction-winners-2025' },
    itemType: { type: String, enum: ['saree', 'special_item'], default: 'saree' },
    isComplete: { type: Boolean, default: true },
    sortOrder: { type: Number, default: 0 },
    status: { type: String, enum: ['draft', 'published'], default: 'published' },
    notes: { type: localizedStringSchema }
  },
  { timestamps: true, strict: false }
);
export const AuctionItemModel = mongoose.model<IAuctionItemDoc>('AuctionItem', auctionItemSchema);

// 5. Donor Model
export interface IDonorDoc extends Document {
  id: string;
  name: { en: string; te: string };
  contributionType?: { en: string; te: string };
  amount?: number;
  category: string;
  year: number;
  albumSlug?: string;
  photoOrLogoUrl?: string;
  notes?: { en: string; te: string };
  sortOrder: number;
  status: 'draft' | 'published';
}
const donorSchema = new Schema<IDonorDoc>(
  {
    id: { type: String, required: true, unique: true },
    name: { type: localizedStringSchema, required: true },
    contributionType: { type: localizedStringSchema },
    amount: { type: Number },
    category: { type: String, default: 'general' },
    year: { type: Number, default: 2025 },
    albumSlug: { type: String, default: 'donors-and-sponsors-2025' },
    photoOrLogoUrl: { type: String, default: '' },
    notes: { type: localizedStringSchema },
    sortOrder: { type: Number, default: 0 },
    status: { type: String, enum: ['draft', 'published'], default: 'published' }
  },
  { timestamps: true, strict: false }
);
export const DonorModel = mongoose.model<IDonorDoc>('Donor', donorSchema);

// 6. Audit Log Model
export interface IAuditLogDoc extends Document {
  id: string;
  action: 'create' | 'update' | 'delete' | 'publish' | 'unpublish' | 'upload';
  resourceType: string;
  resourceId?: string;
  resourceTitle?: string;
  actorName: string;
  actorRole: string;
  timestamp: string;
  details?: string;
}
const auditLogSchema = new Schema<IAuditLogDoc>(
  {
    id: { type: String, required: true, unique: true },
    action: { type: String, required: true },
    resourceType: { type: String, required: true },
    resourceId: { type: String },
    resourceTitle: { type: String },
    actorName: { type: String, default: 'Admin' },
    actorRole: { type: String, default: 'super-admin' },
    timestamp: { type: String, required: true },
    details: { type: String }
  },
  { timestamps: true }
);
export const AuditLogModel = mongoose.model<IAuditLogDoc>('AuditLog', auditLogSchema);

// 7. Site Content Model (Editable Home, About, History, Contact sections)
export interface ISiteContentDoc extends Document {
  sectionKey: string;
  data: Record<string, unknown>;
  updatedBy?: string;
}
const siteContentSchema = new Schema<ISiteContentDoc>(
  {
    sectionKey: { type: String, required: true, unique: true },
    data: { type: Schema.Types.Mixed, default: {} },
    updatedBy: { type: String }
  },
  { timestamps: true }
);
export const SiteContentModel = mongoose.model<ISiteContentDoc>('SiteContent', siteContentSchema);
