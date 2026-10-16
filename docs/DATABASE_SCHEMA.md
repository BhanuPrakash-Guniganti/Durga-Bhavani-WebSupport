# Database Schema Documentation: Durga Bhavani Seva Samiti - Dodlapahad

Engine: **MongoDB (Mongoose ODM)**

---

## 1. Bilingual Data Model Standard

To satisfy mandatory bilingual support across English and Telugu, all administrator-managed public textual content uses structured localized fields. No duplicate documents are created.

```typescript
export interface ILocalizedString {
  en: string; // English text
  te: string; // Telugu text (తెలుగు)
}

export interface ILocalizedArray {
  en: string[]; // English array items
  te: string[]; // Telugu array items
}

export type TranslationStatus = 'complete' | 'en-only' | 'te-only' | 'untranslated';
```

### Fallback & Publication Rules:
1. **Fallback Sequence**: When client requests Telugu content and `te` is empty, system falls back to `en` with a fallback flag, avoiding broken UI.
2. **Admin Visibility**: Missing translations are flagged with status badges (`EN + TE Complete`, `Telugu Missing`, `English Missing`) so administrators never inadvertently publish incomplete language content.
3. **Draft & Publication Workflow**: Editors can keep an item in `draft` until both language versions are verified by the organizing committee.

---

## 2. Collections & Data Models

### 2.1 `User`
Stores authenticated committee members and administrators.
```typescript
interface IUser {
  name: string;
  email: string; // Lowercase, trimmed, unique
  passwordHash: string; // bcrypt hash
  role: 'super-admin' | 'editor' | 'media-manager';
  active: boolean; // default: true
  lastLoginAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}
```
**Indexes**:
- `{ email: 1 }` (unique)
- `{ role: 1 }`

---

### 2.2 `Year`
Represents an annual Navaratri festival / celebration year.
```typescript
interface IYear {
  year: number; // e.g. 2024 (unique)
  title: ILocalizedString; // e.g. { en: "Navaratri Celebrations 2024", te: "2024 నవరాత్రి ఉత్సవాలు" }
  slug: string; // e.g. "2024" (unique)
  description: ILocalizedString;
  highlights?: ILocalizedArray; // Array of key rituals and milestones
  coverMediaId?: Types.ObjectId; // Ref: Media
  startDate?: Date;
  endDate?: Date;
  status: 'draft' | 'published' | 'archived'; // default: 'draft'
  createdBy: Types.ObjectId; // Ref: User
  updatedBy: Types.ObjectId; // Ref: User
  createdAt: Date;
  updatedAt: Date;
}
```
**Indexes**:
- `{ year: 1 }` (unique)
- `{ slug: 1 }` (unique)
- `{ status: 1 }`

---

### 2.3 `Album`
Photo and video albums associated with celebration years.
```typescript
interface IAlbum {
  title: ILocalizedString;
  slug: string; // e.g. "dussehra-shobha-yatra-2024" (unique)
  description?: ILocalizedString;
  yearId: Types.ObjectId; // Ref: Year
  coverMediaId?: Types.ObjectId; // Ref: Media
  status: 'draft' | 'published' | 'archived'; // default: 'draft'
  sortOrder: number; // default: 0
  createdBy: Types.ObjectId; // Ref: User
  updatedBy: Types.ObjectId; // Ref: User
  createdAt: Date;
  updatedAt: Date;
}
```
**Indexes**:
- `{ slug: 1 }` (unique)
- `{ yearId: 1, status: 1 }`
- `{ sortOrder: 1 }`

---

### 2.4 `Media`
Stores metadata for photos and videos hosted on Cloudinary or YouTube.
```typescript
interface IMedia {
  title?: ILocalizedString;
  caption?: ILocalizedString;
  altText: ILocalizedString; // Required for accessibility in both languages
  yearId?: Types.ObjectId; // Ref: Year
  albumId?: Types.ObjectId; // Ref: Album
  mediaType: 'image' | 'video'; // default: 'image'
  storageProvider: 'cloudinary' | 'youtube' | 'external';
  storageAssetId?: string; // Cloudinary public_id or YouTube video ID
  url: string; // Delivery URL
  mimeType?: string;
  sizeBytes?: number;
  width?: number;
  height?: number;
  sourceReference?: string; // Original filename, photographer name, or Drive ID
  status: 'draft' | 'published' | 'archived'; // default: 'draft'
  sortOrder: number; // default: 0
  uploadedBy: Types.ObjectId; // Ref: User
  createdAt: Date;
  updatedAt: Date;
}
```
**Indexes**:
- `{ albumId: 1, status: 1 }`
- `{ yearId: 1, status: 1 }`
- `{ storageAssetId: 1 }`

---

### 2.5 `Event`
Temple celebrations, poojas, community meetings, and rituals.
```typescript
interface IEvent {
  title: ILocalizedString;
  slug: string;
  description: ILocalizedString;
  startDate: Date;
  endDate?: Date;
  time?: string;
  location: ILocalizedString; // e.g., { en: "Dodlapahad Temple Premises", te: "దొడ్లపహాడ్ ఆలయ ప్రాంగణం" }
  posterMediaId?: Types.ObjectId; // Ref: Media
  status: 'draft' | 'published' | 'archived';
  createdBy: Types.ObjectId;
  updatedBy: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
```
**Indexes**:
- `{ slug: 1 }` (unique)
- `{ startDate: 1, status: 1 }`

---

### 2.6 `Announcement`
Notice board items, festival updates, circulars.
```typescript
interface IAnnouncement {
  title: ILocalizedString;
  slug: string;
  content: ILocalizedString; // Rich text / markdown in both languages
  imageUrl?: string;
  imageMediaId?: Types.ObjectId; // Ref: Media
  publishedAt: Date;
  expiresAt?: Date; // Optional expiration date
  status: 'draft' | 'published' | 'archived';
  featured: boolean; // default: false
  createdBy: Types.ObjectId;
  updatedBy: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
```
**Indexes**:
- `{ publishedAt: -1, status: 1 }`
- `{ featured: 1 }`

---

### 2.7 `HistoricalMilestone`
Editable timeline entries of celebration history and sacred milestones.
Celebrations began in 2024; 2026 is the third year.
```typescript
interface IHistoricalMilestone {
  title: ILocalizedString;
  yearOrDate: string; // e.g. "2024" or "2026"
  description: ILocalizedString;
  imageMediaId?: Types.ObjectId; // Ref: Media
  imageUrl?: string;
  sortOrder: number; // default: 0
  status: 'draft' | 'published' | 'archived';
  createdBy: Types.ObjectId;
  updatedBy: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
```
**Indexes**:
- `{ sortOrder: 1, status: 1 }`

---

### 2.8 `SiteSetting`
Global key-value configuration for temple contact info, banner, and social links.
```typescript
interface ISiteSetting {
  organizationName: ILocalizedString; // { en: "Durga Bhavani Seva Samiti - Dodlapahad", te: "శ్రీ దుర్గాభవాని సేవా సమితి - దొడ్లపహాడ్" }
  logoMediaId?: Types.ObjectId;
  bannerMediaId?: Types.ObjectId;
  aboutText: ILocalizedString;
  missionText: ILocalizedString;
  visionText: ILocalizedString;
  contactEmail?: string;
  contactPhone?: string;
  locationAddress: ILocalizedString;
  googleMapsEmbedUrl?: string;
  socialLinks: {
    youtube?: string;
    facebook?: string;
    whatsapp?: string;
  };
  footerNotice?: ILocalizedString;
  updatedBy: Types.ObjectId;
  updatedAt: Date;
}
```

---

### 2.9 `AuditLog`
Audit trails of administrative actions. Never stores passwords or secrets.
```typescript
interface IAuditLog {
  actorUserId: Types.ObjectId; // Ref: User
  action: 'create' | 'update' | 'delete' | 'publish' | 'unpublish' | 'import';
  resourceType: 'Year' | 'Album' | 'Media' | 'Event' | 'Announcement' | 'History' | 'User' | 'Setting';
  resourceId?: string;
  timestamp: Date;
  outcome: 'success' | 'failure';
  metadata?: Record<string, unknown>; // Safe metadata only
}
```
**Indexes**:
- `{ timestamp: -1 }`
- `{ resourceType: 1 }`
- `{ actorUserId: 1 }`

---

## 3. Integrity & Deletion Rules

1. **Year Deletion**: Cannot be deleted if albums or events are linked to the year. Must either reassign or delete sub-records first.
2. **Album Deletion**: Cannot be deleted until media is unlinked or confirmed for deletion.
3. **Media Deletion**: A media record cannot be deleted if set as `coverMediaId` for a Year or Album, or `posterMediaId` for an Event, without explicit confirmation.

