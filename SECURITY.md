# Security Policy: Durga Bhavani Seva Samiti - Dodlapahad

## 1. Security Architecture Principles

This application manages public temple records and a private administrative portal. Security is implemented through defense-in-depth across the following layers:

### A. Authentication & Session Management
- **Password Storage**: Passwords are never stored in plaintext. They are salted and hashed using `bcryptjs` with a cost factor of 12.
- **Session Tokens**: Authentication tokens (JWT) are transported in **HTTP-only**, **Secure** (in production), **SameSite=Strict** cookies. This protects against Cross-Site Scripting (XSS) token theft.
- **No Public Administrator Registration**: Administrative accounts can only be created by an active `super-admin` or via the controlled backend setup CLI script (`scripts/seed-admin.ts`).
- **Brute Force Protection**: Express rate limiting is enforced on `/api/v1/auth/login` (maximum 5 attempts per 15 minutes per IP).

### B. Role-Based Access Control (RBAC)
All administrative endpoints verify authorization at the backend controller level:
- **`super-admin`**: Full system access, user management, site settings, destructive operations, audit logs.
- **`editor`**: CRUD access for years, albums, events, announcements, and history records. Cannot modify users, global security settings, or system configuration.
- **`media-manager`**: Upload, tag, and caption images/videos. Cannot alter administrative user accounts or publish structural site changes.

Frontend route guards provide visual UX convenience, but **all security checks are strictly enforced on the server**.

### C. Data Validation & Injection Prevention
- **Schema Validation**: All inbound payloads are validated using strict `Zod` schemas before touching controllers or databases.
- **NoSQL Injection Defense**: Input sanitization prevents Mongo operator injection (`$gt`, `$ne`, etc.). Mongoose casting ensures typed fields.
- **Safe Output Filtering**: Public endpoints exclude internal fields, hashes (`passwordHash`), draft flags, and user identifiers. Stack traces are suppressed in production mode (`NODE_ENV=production`).

### D. Media & Storage Security
- **No Direct Binary Uploads to MongoDB**: Images and videos are stored in Cloudinary; MongoDB only retains asset identifiers and metadata.
- **Signed Upload Requests**: Upload permissions are generated dynamically via backend signed parameters with short expiration windows. Cloudinary API secrets are never delivered to the client.
- **MIME & Content Verification**: File uploads validate supported MIME types (JPEG, PNG, WebP) and enforce size restrictions (max 10MB per image).
- **Safe Deletion**: Deleting media triggers reference checks across albums, years, and events to prevent broken links or orphaned content.

### E. Infrastructure Security
- **HTTP Security Headers**: `helmet` is enabled to enforce HSTS, clickjacking prevention (`X-Frame-Options: DENY`), and content security headers.
- **CORS Protection**: Restricted to the designated `FRONTEND_ORIGIN` (e.g. `http://localhost:5173` locally, or custom domain on Vercel).
- **Audit Logging**: Sensitive administrative actions (user modifications, content deletions, settings updates) write immutable records to the `AuditLog` collection.

---

## 2. Secrets Management & Environment Isolation

- **Never Commit Secrets**: `.env` files are ignored via `.gitignore`.
- **Validation**: At boot, the backend validates environment variables via `backend/src/config/env.ts` and will refuse to start if essential secrets are missing.
- **Separation of Concerns**: Frontend code only accesses variables prefixed with `VITE_` and never receives database connection strings or Cloudinary secrets.

---

## 3. Reporting a Vulnerability

If you discover a security vulnerability in this project, please notify the technical committee:
- **Email**: `security@durgabhavani-dodlapahad.org` (or contact project maintainer directly)
- Please allow 48 hours for an initial response before public disclosure.
- Include reproduction steps and environment details.
