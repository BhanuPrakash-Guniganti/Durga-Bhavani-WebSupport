# System Architecture: Durga Bhavani Seva Samiti - Dodlapahad

## 1. High-Level Architectural Diagram

```
+-----------------------------------------------------------------------------------+
|                                  CLIENT LAYER                                     |
|                                                                                   |
|  +-------------------------------------+   +------------------------------------+  |
|  |     Public Website (React 19)       |   |       Admin Portal (React 19)      |  |
|  |  - Home, History, Years, Albums     |   |  - Dashboard, CMS, Media Manager   |  |
|  |  - Events, Announcements, Search    |   |  - RBAC, Audit Logs, Site Settings |  |
|  |  - Mobile Drawer / Responsive Grid  |   |  - Lightbox, Upload Drag-and-Drop  |  |
|  +-------------------------------------+   +------------------------------------+  |
+------------------------------------------+----------------------------------------+
                                           | HTTPS / JSON
                                           v
+-----------------------------------------------------------------------------------+
|                               API GATEWAY & BACKEND                               |
|                                                                                   |
|  +-----------------------------------------------------------------------------+  |
|  | Express REST API (/api/v1) [Node.js + TypeScript]                           |  |
|  |                                                                             |  |
|  |  [Security Middleware]                                                      |  |
|  |   - Helmet Headers                                                          |  |
|  |   - CORS Validation                                                         |  |
|  |   - Rate Limiting                                                           |  |
|  |   - Cookie Parser / JWT Verification                                        |  |
|  |   - Role-Based Access Control (RBAC)                                        |  |
|  |   - Zod Payload Validation                                                  |  |
|  |                                                                             |  |
|  |  [Controllers & Services]                                                   |  |
|  |   - Public Read Controllers (strictly filter `status: 'published'`)         |  |
|  |   - Admin Content Controllers (Years, Albums, Events, Announcements, etc.)  |  |
|  |   - Cloudinary Upload Signing Service                                       |  |
|  |   - Google Drive Non-destructive Migration Service                          |  |
|  |   - Audit Logging Service                                                   |  |
|  +-----------------------------------------------------------------------------+  |
+------------------------+---------------------------------+------------------------+
                         |                                 |
                         v                                 v
+----------------------------------+    +----------------------------------+
|          DATABASE LAYER          |    |          STORAGE LAYER           |
|                                  |    |                                  |
|  MongoDB Atlas (M0 Free Cluster) |    |  Cloudinary (Free Tier)          |
|  - Users (hashed credentials)    |    |  - Original images & transforms  |
|  - Years, Albums, Media Meta     |    |  - Responsive WebP variations    |
|  - Events, Announcements         |    |                                  |
|  - Milestones, Settings, Logs    |    |  YouTube Video Platform          |
|                                  |    |  - Embedded festival footage     |
+----------------------------------+    +----------------------------------+
```

## 2. Key Data Flow Principles

1. **Zero Secret Exposure**:
   - The browser never receives Cloudinary API secrets or MongoDB URIs.
   - For file uploads, the client requests a signed upload token from `/api/v1/admin/media/upload-signature`. The browser then uploads directly to Cloudinary and registers the returned metadata with `/api/v1/admin/media`.
2. **Draft / Published Content Isolation**:
   - Public queries default to `{ status: 'published' }`.
   - Admin queries can filter across `draft`, `published`, and `archived` states.
3. **Session Management**:
   - On successful login, the backend issues an HTTP-only, SameSite JWT cookie.
   - Logout clears this cookie immediately.
   - Subsequent requests automatically transmit the cookie for verification.
4. **Resilient Error Handling**:
   - All errors pass through `errorHandler.ts`.
   - Internal error details and stack traces are suppressed in production mode to prevent information leakage.
