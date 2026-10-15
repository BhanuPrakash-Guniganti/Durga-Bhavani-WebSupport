# Master Implementation Plan: Durga Bhavani Seva Samiti - Dodlapahad

## Project Overview
- **Application Name**: Durga Bhavani Seva Samiti - Dodlapahad
- **Target Audience**: Dodlapahad community members, devotees, and the organizing committee.
- **Purpose**: Preserve and present the temple's annual history, Navaratri festival celebrations, photo & video archives, upcoming/past events, official announcements, and community activities with a dedicated role-based administrative portal.
- **Status**: **Phase 0 (Planning & Repository Setup) Complete**

---

## Architecture & Technology Stack
| Layer | Technology | Rationale & Free-Tier Plan |
|---|---|---|
| **Frontend** | React 19, TypeScript, Vite, React Router 7 | Fast build times, type safety, modular component architecture. |
| **Styling** | Vanilla CSS Design System (CSS Custom Properties) | Zero runtime overhead, deep cultural palette (Maroon, Saffron, Cream, Gold), mobile-first responsive utilities. |
| **Backend** | Node.js (v24), Express, TypeScript, Zod | Mature REST API standard, runtime type validation, lightweight. |
| **Database** | MongoDB Atlas (Free M0 Cluster) / Mongoose | Flexible document model for annual archives, nested media, and audit trails; 512MB free storage. |
| **Media Storage** | Cloudinary (Free Tier) | 25 monthly credits (~25GB storage/bandwidth), auto-optimization, secure uploads, responsive image transforms. |
| **Video Delivery** | YouTube Embeds | Free unlimited streaming for public festival videos without backend bandwidth strain. |
| **Deployment** | Vercel (Frontend) + Render (Backend) | Generous zero-cost tiers with automated GitHub CI/CD deployments. |

---

## Phase Breakdown & Tracking

### Phase 0: Planning and Repository Setup 🟢 COMPLETED
- [x] Workspace inspection and tooling verification (Node v24, npm v11, Git).
- [x] Git repository initialization with comprehensive `.gitignore`.
- [x] Create project structure (`frontend/`, `backend/`, `docs/`, `scripts/`).
- [x] Root and subproject package configurations (`package.json`, `tsconfig.json`).
- [x] Root and subproject environment variable templates (`.env.example`).
- [x] Backend Express + TypeScript skeleton with health check (`/api/v1/health`), security middleware (Helmet, CORS, Rate Limiting), and centralized error handling.
- [x] Frontend Vite + React + TypeScript skeleton with React Router.
- [x] Core documentation: `IMPLEMENTATION_PLAN.md`, `README.md`, `SECURITY.md`, `DEPLOYMENT.md`.
- [x] Technical specifications: `docs/ARCHITECTURE.md`, `docs/API_CONTRACTS.md`, `docs/DATABASE_SCHEMA.md`, `docs/DESIGN_SYSTEM.md`.
- [x] Project verification script (`scripts/verify-setup.js`).

---

## Status: **Phase 1 (Public Website UI) Complete**

---

### Phase 1: Public Website UI 🟢 COMPLETED
- [x] Implement cultural design system in CSS tokens (Deep Maroon `#7A0C0C`, Saffron `#E65100`, Warm Cream `#FAF7F2`, Gold `#D4AF37`).
- [x] Accessible, mobile-first responsive navigation bar with mobile drawer and footer with configurable contact info.
- [x] Build **Home Page** (`/`):
  - Hero banner with temple architecture accents and configurable headline.
  - Welcome introduction to Durga Bhavani Seva Samiti, Dodlapahad.
  - Featured latest celebration year showcase.
  - Selected photo album preview grid.
  - Recent announcements ticker/cards.
  - Upcoming & recent festival events list.
  - Community service section.
- [x] Build **About Page** (`/about`):
  - Purpose of the Samiti, history of community organizing, mission and vision.
- [x] Build **History Page** (`/history`):
  - Historical introduction, verified milestones timeline, archival photographs with captions.
- [x] Build **Year Archive Page** (`/years`):
  - Grid of published celebration years, cover image, album counts, year cards.
- [x] Build **Year Detail Page** (`/years/:year`):
  - Year theme, festival dates, highlights, associated albums, videos, reports.
- [x] Build **Album Page** (`/albums/:slug`):
  - Responsive photo grid, accessible modal lightbox with prev/next navigation, caption and photographer credit.
- [x] Build **Events Page** (`/events`):
  - Filterable upcoming and past events, event dates/times, venue, posters.
- [x] Build **Announcements Page** (`/announcements`):
  - Active notices, festival schedules, PDF/image notices, filter for active vs. archived.
- [x] Build **Search Page** (`/search`):
  - Keyword search across years, albums, events, announcements, and milestones.
- [x] Build **Contact Page** (`/contact`):
  - Location details, Google Maps embed link, validated rate-limited contact form, committee public email/phone.
- [x] Build **Not Found (404)** and **Error Pages**.
- [x] **Mobile-First Validation**: Tested across 320px, 375px, 425px, 768px, 1024px, 1440px with zero horizontal overflow.

---

### Phase 2: Database and Public Backend ⚪ PENDING
- [ ] Configure MongoDB connection with Mongoose and retry logic.
- [ ] Implement Mongoose models with validation and indexes:
  - `User`, `Year`, `Album`, `Media`, `Event`, `Announcement`, `HistoricalMilestone`, `SiteSetting`, `AuditLog`.
- [ ] Implement public read-only REST controllers and routes:
  - `GET /api/v1/settings/public`
  - `GET /api/v1/history`
  - `GET /api/v1/years`
  - `GET /api/v1/years/:year`
  - `GET /api/v1/albums`
  - `GET /api/v1/albums/:slug`
  - `GET /api/v1/media`
  - `GET /api/v1/events`
  - `GET /api/v1/announcements`
  - `GET /api/v1/search`
- [ ] Enforce strict publication status filter (`status: 'published'`) so draft/archived records are never exposed to public APIs.
- [ ] Connect frontend to live backend endpoints with loading and empty states.

---

### Phase 3: Authentication and Admin Foundation ⚪ PENDING
- [ ] Implement secure authentication:
  - Secure bcrypt password hashing (12 rounds).
  - HTTP-only, secure, SameSite cookies for JWT session tokens.
  - Dedicated rate limiter on `/api/v1/auth/login`.
  - Session revocation and logout endpoint.
- [ ] Role-Based Access Control (RBAC) middleware:
  - `super-admin`: Full access (users, settings, audit logs, all content).
  - `editor`: Years, albums, history, events, announcements management.
  - `media-manager`: Media library uploads, captions, alt-text, album tagging.
- [ ] CLI seed script (`scripts/seed-admin.ts`) for safe initial super-administrator bootstrapping.
- [ ] Protected admin frontend layout with collapsible sidebar / mobile drawer.
- [ ] Admin Dashboard (`/admin/dashboard`):
  - Real-time database metrics (published years, albums, photos, upcoming events, draft items).

---

### Phase 4: Content Management ⚪ PENDING
- [ ] Year CRUD (`/admin/years`): Form validation, unique year checks, slug auto-generation, status toggles (Draft, Published, Archived).
- [ ] Album CRUD (`/admin/albums`): Year association, slug generation, cover selector, reordering.
- [ ] History Management (`/admin/history`): Milestone timeline, sort order, verified media attachments.
- [ ] Event CRUD (`/admin/events`): Date range validation, location, poster attachment, upcoming/past calculation.
- [ ] Announcement CRUD (`/admin/announcements`): Expiry date validation, rich text/content, featured toggle.
- [ ] Audit log generation for all write/update/delete operations.

---

### Phase 5: Media Library ⚪ PENDING
- [ ] Cloudinary integration with backend signed upload authorization (no secrets in browser).
- [ ] Media Library UI (`/admin/media`):
  - Grid and list views, search, filter by year/album/status.
  - Image preview, caption, alt-text, tags.
  - Safe deletion with reference check across albums, years, and events.
- [ ] YouTube video URL validation and safe embed generation.
- [ ] Full upload-to-publication workflow test.

---

### Phase 6: Google Drive Import ⚪ PENDING
- [ ] Google Drive migration utility / service:
  - Preview folder files without modifying source files.
  - Duplicate detection by filename and checksum.
  - Association with selected destination Year and Album.
  - Import progress tracking, error logging, and retry without duplicating records.
  - Default to 'draft' status so administrators can inspect before publishing.

---

### Phase 7: Search and Refinements ⚪ PENDING
- [ ] Server-side search across all published collections with text indices.
- [ ] Pagination and progressive image loading.
- [ ] Accessibility audit: ARIA landmarks, keyboard navigation, image alt-texts, form label associations.
- [ ] Mobile responsive polishing across all breakpoints.

---

### Phase 8: Security, Testing, and Recovery ⚪ PENDING
- [ ] Security audit: Header check (Helmet), CORS, CSRF, NoSQL injection prevention, sensitive data exposure checks.
- [ ] Automated integration tests for RBAC, public isolation, and authentication.
- [ ] Database backup and disaster recovery guide.

---

### Phase 9: Deployment ⚪ PENDING
- [ ] Deploy backend to Render (free Web Service).
- [ ] Deploy frontend to Vercel (free Hobby tier).
- [ ] Configure MongoDB Atlas network access and environment variables.
- [ ] End-to-end smoke test on live deployment URL.

---

### Phase 10: Handover & Documentation ⚪ PENDING
- [ ] User guide for temple committee members (how to add years, upload photos, post announcements).
- [ ] Complete API reference and operational runbook.

---

## Responsive Viewport Verification Matrix

| Viewport Width | Device Target | Public Pages Tested | Admin Pages Tested | Result |
|---|---|---|---|---|
| **320px** | Small Mobile (iPhone SE) | Passed (10 Pages) | Pending Phase 3 | ✅ Pass - zero horizontal overflow, touch targets $\ge 44px$ |
| **375px** | Standard Mobile (iPhone) | Passed (10 Pages) | Pending Phase 3 | ✅ Pass - responsive single-column, drawer navigation |
| **425px** | Large Mobile (Pixel / Galaxy) | Passed (10 Pages) | Pending Phase 3 | ✅ Pass - fluid cards, readable typography |
| **768px** | Tablet (iPad Portrait) | Passed (10 Pages) | Pending Phase 3 | ✅ Pass - adaptive 2-column grids |
| **1024px** | Small Desktop / Tablet Landscape | Passed (10 Pages) | Pending Phase 3 | ✅ Pass - horizontal navbar, multi-column cards |
| **1440px** | Standard Desktop Display | Passed (10 Pages) | Pending Phase 3 | ✅ Pass - max container centered (1240px), rich hover states |
