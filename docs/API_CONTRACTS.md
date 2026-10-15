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

## 1. Public Endpoints (Read-Only)

All public endpoints only return items where `status === 'published'`.

| Method | Endpoint | Description | Query Parameters |
|---|---|---|---|
| `GET` | `/health` | Server health check | None |
| `GET` | `/settings/public` | Public site configuration (name, logo, banner, contact, social) | None |
| `GET` | `/history` | Chronological list of published historical milestones | `sort` (asc/desc) |
| `GET` | `/years` | List of all published celebration years | `page`, `limit` |
| `GET` | `/years/:year` | Detailed year record by 4-digit year, including highlights, albums, and videos | None |
| `GET` | `/albums` | List of published albums | `year`, `page`, `limit` |
| `GET` | `/albums/:slug` | Specific album with photo list, cover image, and credits | None |
| `GET` | `/media` | Direct media query (filtered to published) | `albumId`, `yearId`, `page`, `limit` |
| `GET` | `/events` | List of published events | `status` (upcoming, past, all), `year` |
| `GET` | `/announcements` | Active announcements | `featured` (true/false), `includeExpired` (false by default) |
| `GET` | `/search` | Global search across years, albums, events, announcements, and milestones | `q`, `category`, `page`, `limit` |
| `POST` | `/contact` | Rate-limited public feedback/inquiry submission | Body: `name`, `email`, `phone`, `message` |

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

### Year Management
- `POST /admin/years` (Roles: `super-admin`, `editor`): Create new year record.
- `GET /admin/years` (Roles: `super-admin`, `editor`, `media-manager`): List all years (draft, published, archived).
- `GET /admin/years/:id` (Roles: `super-admin`, `editor`): Get year by ID.
- `PATCH /admin/years/:id` (Roles: `super-admin`, `editor`): Update year info, dates, status.
- `DELETE /admin/years/:id` (Roles: `super-admin` only): Delete empty year (safety check prevents deleting year with albums).

### Album Management
- `POST /admin/albums` (Roles: `super-admin`, `editor`): Create album.
- `GET /admin/albums` (Roles: `super-admin`, `editor`, `media-manager`): List all albums.
- `GET /admin/albums/:id` (Roles: `super-admin`, `editor`, `media-manager`): Get album by ID.
- `PATCH /admin/albums/:id` (Roles: `super-admin`, `editor`): Update title, description, cover, status, sortOrder.
- `DELETE /admin/albums/:id` (Roles: `super-admin` only): Delete album with reference check.

### Media Management
- `POST /admin/media/upload-signature` (Roles: `super-admin`, `editor`, `media-manager`): Generates signed parameters for direct Cloudinary upload.
- `POST /admin/media` (Roles: `super-admin`, `editor`, `media-manager`): Save uploaded media metadata in MongoDB.
- `GET /admin/media` (Roles: `super-admin`, `editor`, `media-manager`): Query media with filters.
- `PATCH /admin/media/:id` (Roles: `super-admin`, `editor`, `media-manager`): Update caption, alt-text, album, status.
- `DELETE /admin/media/:id` (Roles: `super-admin`, `editor`): Delete media record and Cloudinary asset (verifies no dependency).

### Event Management
- `POST /admin/events` (Roles: `super-admin`, `editor`): Create event.
- `GET /admin/events` (Roles: `super-admin`, `editor`): List events.
- `PATCH /admin/events/:id` (Roles: `super-admin`, `editor`): Update event.
- `DELETE /admin/events/:id` (Roles: `super-admin` only): Delete event.

### Announcement Management
- `POST /admin/announcements` (Roles: `super-admin`, `editor`): Create announcement.
- `GET /admin/announcements` (Roles: `super-admin`, `editor`): List announcements.
- `PATCH /admin/announcements/:id` (Roles: `super-admin`, `editor`): Update announcement.
- `DELETE /admin/announcements/:id` (Roles: `super-admin` only): Delete announcement.

### History Milestones
- `POST /admin/history` (Roles: `super-admin`, `editor`): Create milestone.
- `PATCH /admin/history/:id` (Roles: `super-admin`, `editor`): Update milestone.
- `DELETE /admin/history/:id` (Roles: `super-admin` only): Delete milestone.
- `POST /admin/history/reorder` (Roles: `super-admin`, `editor`): Update sort order.

### User Management (`super-admin` only)
- `GET /admin/users`: List all administrative users.
- `POST /admin/users`: Create new user (`editor` or `media-manager`).
- `PATCH /admin/users/:id`: Update user role or active status.
- `DELETE /admin/users/:id`: Deactivate/delete user account.

### Site Settings (`super-admin` only)
- `GET /admin/settings`: Retrieve all editable site settings.
- `PUT /admin/settings`: Update settings (organization name, contact, links, hero banner).

### Audit Logs (`super-admin` only)
- `GET /admin/audit-logs`: Paginated audit log of system actions.

### Google Drive Migration
- `POST /admin/import/drive/preview`: Preview contents of folder.
- `POST /admin/import/drive/start`: Initiate migration job to target Year/Album.
- `GET /admin/import/jobs/:jobId`: Check status of import job.
