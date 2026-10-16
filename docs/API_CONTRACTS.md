# REST API Specifications: Durga Bhavani Seva Samiti - Dodlapahad

Base URL: `/api/v1`

All responses follow a consistent JSON envelope:

### Standard Success Response:
```json
{
  "success": true,
  "data": { ... },
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 45,
    "totalPages": 3
  }
}
```

### Standard Error Response:
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid request parameters",
    "details": [ ... ]
  }
}
```

---

## 1. Bilingual Architecture & Public Endpoints (Read-Only)

All public endpoints only return items where `status === 'published'`.

### Language Negotiation:
- Clients can specify preferred language via `?lang=te` or `?lang=en` or header `Accept-Language`.
- When `?lang` is omitted, API returns full bilingual objects `{ en: "...", te: "..." }` allowing clients to render or switch without additional network requests.
- When `?lang=te` is specified, if Telugu text is missing, API falls back to English text with `"fallback": true` flag.

| Method | Endpoint | Description | Query Parameters |
|---|---|---|---|
| `GET` | `/health` | Server health check | None |
| `GET` | `/settings/public` | Public site configuration (name, logo, banner, contact, social) | `lang` (en/te) |
| `GET` | `/history` | Chronological list of published historical milestones (Celebrations began in 2024, 2026 is Third Year) | `lang`, `sort` (asc/desc) |
| `GET` | `/years` | List of all published celebration years | `lang`, `page`, `limit` |
| `GET` | `/years/:year` | Detailed year record by 4-digit year, including highlights, albums, and videos | `lang` |
| `GET` | `/albums` | List of published albums | `lang`, `year`, `page`, `limit` |
| `GET` | `/albums/:slug` | Specific album with photo list, cover image, and credits | `lang` |
| `GET` | `/media` | Direct media query (filtered to published) | `lang`, `albumId`, `yearId`, `page`, `limit` |
| `GET` | `/events` | List of published events | `lang`, `status` (upcoming, past, all), `year` |
| `GET` | `/announcements` | Active announcements | `lang`, `featured` (true/false), `includeExpired` (false by default) |
| `GET` | `/search` | Global search across both English and Telugu content (years, albums, events, announcements, milestones) | `q`, `category`, `lang`, `page`, `limit` |
| `POST` | `/contact` | Rate-limited public feedback/inquiry submission | Body: `name`, `email`, `phone`, `subject`, `message` |

---

## 2. Authentication Endpoints

| Method | Endpoint | Description | Access | Body Parameters |
|---|---|---|---|---|
| `POST` | `/auth/login` | Authenticates administrator and sets secure HTTP-only cookie | Public (rate-limited) | `{ "email": "...", "password": "..." }` |
| `POST` | `/auth/logout` | Clears authentication cookie | Authenticated | None |
| `GET` | `/auth/me` | Returns current user profile and role | Authenticated | None |

---

## 3. Protected Content Administration Endpoints

Protected by JWT authentication and Role-Based Access Control (RBAC).

All content creation and update requests accept bilingual objects:
```json
{
  "title": { "en": "Grand Shobha Yatra 2024", "te": "భవ్య శోభాయాత్ర 2024" },
  "description": { "en": "...", "te": "..." }
}
```

### Year Management
- `POST /admin/years` (Roles: `super-admin`, `editor`): Create new year record.
- `GET /admin/years` (Roles: `super-admin`, `editor`, `media-manager`): List all years (draft, published, archived) with translation status.
- `GET /admin/years/:id` (Roles: `super-admin`, `editor`): Get year by ID.
- `PATCH /admin/years/:id` (Roles: `super-admin`, `editor`): Update year info, bilingual titles, dates, status.
- `DELETE /admin/years/:id` (Roles: `super-admin` only): Delete empty year (safety check prevents deleting year with albums).

### Album Management
- `POST /admin/albums` (Roles: `super-admin`, `editor`): Create album with bilingual title & description.
- `GET /admin/albums` (Roles: `super-admin`, `editor`, `media-manager`): List all albums with translation status.
- `GET /admin/albums/:id` (Roles: `super-admin`, `editor`, `media-manager`): Get album by ID.
- `PATCH /admin/albums/:id` (Roles: `super-admin`, `editor`): Update title, description, cover, status, sortOrder.
- `DELETE /admin/albums/:id` (Roles: `super-admin` only): Delete album with reference check.

### Media Management
- `POST /admin/media/upload-signature` (Roles: `super-admin`, `editor`, `media-manager`): Generates signed parameters for direct Cloudinary upload.
- `POST /admin/media` (Roles: `super-admin`, `editor`, `media-manager`): Save uploaded media metadata in MongoDB with bilingual caption and altText.
- `GET /admin/media` (Roles: `super-admin`, `editor`, `media-manager`): Query media with filters.
- `PATCH /admin/media/:id` (Roles: `super-admin`, `editor`, `media-manager`): Update caption, alt-text, album, status.
- `DELETE /admin/media/:id` (Roles: `super-admin`, `editor`): Delete media record and Cloudinary asset (verifies no dependency).

### Event Management
- `POST /admin/events` (Roles: `super-admin`, `editor`): Create event with bilingual title, description, and location.
- `GET /admin/events` (Roles: `super-admin`, `editor`): List events.
- `PATCH /admin/events/:id` (Roles: `super-admin`, `editor`): Update event.
- `DELETE /admin/events/:id` (Roles: `super-admin` only): Delete event.

### Announcement Management
- `POST /admin/announcements` (Roles: `super-admin`, `editor`): Create announcement with bilingual title and content.
- `GET /admin/announcements` (Roles: `super-admin`, `editor`): List announcements.
- `PATCH /admin/announcements/:id` (Roles: `super-admin`, `editor`): Update announcement.
- `DELETE /admin/announcements/:id` (Roles: `super-admin` only): Delete announcement.

### History Milestones
- `POST /admin/history` (Roles: `super-admin`, `editor`): Create milestone with bilingual title and description.
- `PATCH /admin/history/:id` (Roles: `super-admin`, `editor`): Update milestone.
- `DELETE /admin/history/:id` (Roles: `super-admin` only): Delete milestone.
- `POST /admin/history/reorder` (Roles: `super-admin`, `editor`): Update sort order.

### User Management (`super-admin` only)
- `GET /admin/users`: List all administrative users.
- `POST /admin/users`: Create new user (`editor` or `media-manager`).
- `PATCH /admin/users/:id`: Update user role or active status.
- `DELETE /admin/users/:id`: Deactivate/delete user account.

### Site Settings (`super-admin` only)
- `GET /admin/settings`: Retrieve all editable site settings with bilingual fields.
- `PUT /admin/settings`: Update settings (organization name, contact, links, hero banner).

### Audit Logs (`super-admin` only)
- `GET /admin/audit-logs`: Paginated audit log of system actions.

### 2025 Celebrations Administration
- `GET /admin/avatars`: List all 10 avatars with photos, bilingual details, and sort orders.
- `POST /admin/avatars`: Create avatar record.
- `PATCH /admin/avatars/:id`: Update day assignment, bilingual names, captions, alt-text, photos, or status.
- `DELETE /admin/avatars/:id`: Remove avatar record.
- `GET /admin/auctions`: List all 15 auction items (including draft/incomplete records with `isComplete` flag).
- `POST /admin/auctions`: Create new auction record with Indian Rupee amount validation.
- `PATCH /admin/auctions/:id`: Update item name, winner name, father's name, winning amount, avatar link, or draft status.
- `DELETE /admin/auctions/:id`: Remove auction record.
- `GET /admin/donors`: List all sponsors/donors.
- `POST /admin/donors`: Create donor record with bilingual name/notes and optional INR contribution.
- `PATCH /admin/donors/:id`: Update donor information.
- `DELETE /admin/donors/:id`: Remove donor record.

### Google Drive Migration
- `POST /admin/import/drive/preview`: Preview contents of folder.
- `POST /admin/import/drive/start`: Initiate migration job to target Year/Album.
- `GET /admin/import/jobs/:jobId`: Check status of import job.


