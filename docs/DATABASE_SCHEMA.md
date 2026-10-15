# Database Schema Documentation: Durga Bhavani Seva Samiti - Dodlapahad

Engine: **MongoDB (Mongoose ODM)**

---

## 1. Collections & Data Models

### 1.1 `User`
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

### 1.2 `Year`
Represents an annual Navaratri festival / celebration year.
```typescript
interface IYear {
  year: number; // e.g. 2024 (unique)
  title: string; // e.g. "Navaratri Celebrations 2024"
  slug: string; // e.g. "2024" (unique)
  description: string;
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

### 1.3 `Album`
Photo and video albums associated with celebration years.
```typescript
interface IAlbum {
  title: string;
  slug: string; // e.g. "dussehra-shobha-yatra-2024" (unique)
  description?: string;
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

### 1.4 `Media`
Stores metadata for photos and videos hosted on Cloudinary or YouTube.
```typescript
interface IMedia {
  title?: string;
  caption?: string;
  altText: string; // Required for accessibility
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

### 1.5 `Event`
Temple celebrations, poojas, community meetings, and rituals.
```typescript
interface IEvent {
  title: string;
  slug: string;
  description: string;
  startDate: Date;
  endDate?: Date;
  location: string; // e.g., "Dodlapahad Temple Premises"
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

### 1.6 `Announcement`
Notice board items, festival updates, circulars.
```typescript
interface IAnnouncement {
  title: string;
  slug: string;
  content: string; // Markdown or rich text
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

### 1.7 `HistoricalMilestone`
Editable timeline entries of temple origins and key community developments.
```typescript
interface IHistoricalMilestone {
  title: string;
  yearOrDate: string; // e.g. "1998" or "October 2005"
  description: string;
  imageMediaId?: Types.ObjectId; // Ref: Media
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

### 1.8 `SiteSetting`
Global key-value configuration for temple contact info, banner, and social links.
```typescript
interface ISiteSetting {
  organizationName: string; // Default: "Durga Bhavani Seva Samiti - Dodlapahad"
  logoMediaId?: Types.ObjectId;
  bannerMediaId?: Types.ObjectId;
  aboutText: string;
  contactEmail?: string;
  contactPhone?: string;
  locationAddress: string;
  googleMapsEmbedUrl?: string;
  socialLinks: {
    youtube?: string;
    facebook?: string;
    whatsapp?: string;
  };
  footerNotice?: string;
  updatedBy: Types.ObjectId;
  updatedAt: Date;
}
```

---

### 1.9 `AuditLog`
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

## 2. Integrity & Deletion Rules

1. **Year Deletion**: Cannot be deleted if albums or events are linked to the year. Must either reassign or delete sub-records first.
2. **Album Deletion**: Cannot be deleted until media is unlinked or confirmed for deletion.
3. **Media Deletion**: A media record cannot be deleted if set as `coverMediaId` for a Year or Album, or `posterMediaId` for an Event, without explicit confirmation.
