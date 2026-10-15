# Durga Bhavani Seva Samiti - Dodlapahad

A modern, responsive, secure web application and administrative archive portal for the **Durga Bhavani Seva Samiti, Dodlapahad**.

This platform preserves and celebrates the annual history, Navaratri festival celebrations, photo & video albums, upcoming & past events, committee announcements, and community service activities of the temple.

**Current Status:** 🟢 **Phase 1 (Public Website UI) Complete** — All 10 public pages, cultural design system, mobile drawer, photo lightbox, search, and responsive layouts are implemented and verified.

---

## 🏛️ Project Highlights

- **Cultural & Modern Visual Design**: Traditional Indian temple aesthetic (deep maroon, vibrant saffron, warm cream, restrained gold accents) paired with a clean, responsive interface.
- **Mobile-First Experience**: Tested across viewports from 320px to 1440px+, with touch-friendly navigation, accessible lightbox image viewing, and drawer menus.
- **Public Showcase**:
  - **Home**: Banner, welcome message, latest year celebration, featured albums, announcements, and events.
  - **About & History**: Temple history, community origins, editable chronological milestones.
  - **Year Archive & Details**: Browse celebrations year-by-year (`/years`, `/years/:year`).
  - **Photo Albums & Lightbox**: High-resolution image galleries with captions and photographer credits.
  - **Events & Announcements**: Filter upcoming vs. past events and review festival notices.
  - **Unified Search**: Search across milestones, albums, events, and announcements.
  - **Contact**: Temple location, map embed, and secure message form.
- **Protected Committee Admin Portal**:
  - Secure email/password authentication with HTTP-only cookies and rate limiting.
  - Role-based permissions (**Super Administrator**, **Editor**, **Media Manager**).
  - Complete CMS for Years, Albums, Media, Events, Announcements, History, and Site Settings.
  - Audit logging for administrative transparency.
  - Safe media library powered by Cloudinary with reference checking prior to deletion.
  - Non-destructive Google Drive media migration workflow.

---

## 💻 Tech Stack & Zero-Cost Architecture

Designed entirely around free-tier, open-source technologies:

| Component | Technology | Free Tier Details |
|---|---|---|
| **Frontend** | React 19, TypeScript, Vite, React Router | Hosted on **Vercel** (Hobby plan: 100GB bandwidth/mo, unlimited builds) |
| **Backend** | Node.js, Express, TypeScript, Zod | Hosted on **Render** (Free Web Service: 750 free instance hrs/mo) |
| **Database** | MongoDB Atlas & Mongoose | **MongoDB Atlas M0 Cluster** (512MB free storage, automated backups) |
| **Media Storage** | Cloudinary | **Free Plan** (25 monthly credits: ~25GB storage or bandwidth) |
| **Video** | YouTube Embeds | Free, high-speed streaming without backend storage limits |

---

## 📂 Repository Directory Structure

```
durga-bhavani-seva-samiti/
├── frontend/                     # React + Vite + TypeScript application
│   ├── public/                   # Static assets (favicons, manifest)
│   ├── src/
│   │   ├── assets/               # Local icons and SVGs
│   │   ├── components/           # Reusable UI components (Navbar, Footer, Modal, Lightbox)
│   │   ├── context/              # Authentication and Theme contexts
│   │   ├── pages/                # Public and Admin route views
│   │   ├── services/             # API client utilities (fetch wrappers)
│   │   ├── styles/               # CSS custom properties and design system
│   │   ├── types/                # Shared TypeScript models
│   │   ├── App.tsx               # Route declarations
│   │   └── main.tsx              # Application entry point
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
├── backend/                      # Node.js + Express + TypeScript REST API
│   ├── src/
│   │   ├── config/               # Environment variables (Zod validated) & DB setup
│   │   ├── controllers/          # Request handling logic
│   │   ├── middleware/           # Auth, RBAC, Rate-limiting, Error handlers
│   │   ├── models/               # Mongoose database schemas
│   │   ├── routes/               # API route definitions (/api/v1)
│   │   ├── services/             # Business logic (Cloudinary, Drive import, Auth)
│   │   ├── types/                # Backend TypeScript types
│   │   ├── app.ts                # Express application setup
│   │   └── index.ts              # Server startup and graceful shutdown
│   ├── package.json
│   └── tsconfig.json
├── docs/                         # Technical documentation
│   ├── ARCHITECTURE.md           # System design & data flow
│   ├── API_CONTRACTS.md          # REST API specifications
│   ├── DATABASE_SCHEMA.md        # Mongoose collections & indexes
│   └── DESIGN_SYSTEM.md          # Visual tokens, palette & responsive rules
├── scripts/                      # Utility scripts (admin seeding, verify setup)
│   ├── seed-admin.ts             # Secure initial super-administrator generator
│   └── verify-setup.js           # Environment & workspace validator
├── .env.example                  # Environment variable reference template
├── .gitignore                    # Git ignore definitions
├── DEPLOYMENT.md                 # Production deployment guide
├── IMPLEMENTATION_PLAN.md        # Step-by-step implementation tracking
├── SECURITY.md                   # Security guidelines & vulnerability reporting
└── README.md                     # Project overview and instructions
```

---

## 🚀 Beginner-Friendly Quick Start

### 1. Prerequisites
Ensure you have the following installed on your computer:
- **Node.js** (v18 or newer; v24 recommended)
- **Git**

Verify your versions in your terminal:
```bash
node -v
npm -v
git --version
```

### 2. Clone and Setup Dependencies
From the project root folder:
```bash
# Install dependencies for both frontend and backend
npm run install:all
```

### 3. Configure Environment Variables
Copy `.env.example` to `.env` in both `frontend` and `backend`:
```bash
# Windows PowerShell
copy frontend\.env.example frontend\.env
copy backend\.env.example backend\.env
```

### 4. Run Development Servers
Open two terminal windows:

**Terminal 1 (Backend API):**
```bash
npm run dev:backend
# Server runs on: http://localhost:5000
# Health check: http://localhost:5000/api/v1/health
```

**Terminal 2 (Frontend App):**
```bash
npm run dev:frontend
# App runs on: http://localhost:5173
```

### 5. Verify Setup
Run the automated verification script:
```bash
node scripts/verify-setup.js
```

---

## 📜 Available Scripts

| Command | Action |
|---|---|
| `npm run install:all` | Installs dependencies in both `frontend/` and `backend/` |
| `npm run dev:frontend` | Starts the Vite development server for the user interface |
| `npm run dev:backend` | Starts the Express TypeScript server with auto-reload |
| `npm run build` | Compiles both frontend and backend for production |
| `npm run typecheck` | Validates TypeScript types across frontend and backend |

---

## 🛡️ License & Attribution
Maintained by the **Durga Bhavani Seva Samiti, Dodlapahad**. Distributed under the ISC License.
