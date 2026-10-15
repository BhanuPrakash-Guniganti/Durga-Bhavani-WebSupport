# Deployment Guide: Durga Bhavani Seva Samiti - Dodlapahad

This guide explains how to deploy the application completely within **free-tier services** without incurring unexpected costs.

---

## 🏗️ Deployment Topology Overview

| Component | Provider | Free Tier Limits | Cost |
|---|---|---|---|
| **Database** | MongoDB Atlas (M0 Sandbox) | 512 MB storage, shared RAM, auto-backups | Free forever |
| **Media Storage** | Cloudinary | 25 monthly transformation/storage credits (~25GB) | Free forever |
| **Backend API** | Render (Web Service) | 750 instance hours/month, 512MB RAM (spins down after 15m idle) | Free forever |
| **Frontend UI** | Vercel (Hobby Tier) | 100 GB bandwidth/month, unlimited automated deploys | Free forever |

---

## 📋 Step 1: Create Free Accounts

1. **GitHub**: Create a private or public repository and push your project code.
2. **MongoDB Atlas** ([mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)):
   - Sign up for a free account.
   - Create a **Shared (M0)** free cluster.
   - Under **Database Access**, create a database user (e.g., `durga_app_user`) with a strong password.
   - Under **Network Access**, add IP Address `0.0.0.0/0` (allows Render to connect).
   - Click **Connect** -> **Connect your application** (Driver: Node.js) and copy the connection string.
3. **Cloudinary** ([cloudinary.com](https://cloudinary.com)):
   - Sign up for a free plan.
   - From your Cloudinary Dashboard, copy:
     - Cloud Name
     - API Key
     - API Secret
4. **Render** ([render.com](https://render.com)):
   - Sign up with your GitHub account.
5. **Vercel** ([vercel.com](https://vercel.com)):
   - Sign up with your GitHub account.

---

## ⚙️ Step 2: Deploy Backend to Render

1. Log into **Render** and click **New +** -> **Web Service**.
2. Connect your GitHub repository.
3. Configure settings:
   - **Name**: `durga-bhavani-backend`
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Plan Type**: `Free`
4. Add **Environment Variables**:
   | Key | Value | Notes |
   |---|---|---|
   | `NODE_ENV` | `production` | Enables production security & logging |
   | `PORT` | `10000` | Standard Render port |
   | `MONGODB_URI` | `mongodb+srv://<user>:<password>@cluster0.xxx.mongodb.net/durga_bhavani_prod?retryWrites=true&w=majority` | From MongoDB Atlas |
   | `JWT_SECRET` | *(64-character random string)* | Generates session security keys |
   | `CLOUDINARY_CLOUD_NAME` | `your_cloud_name` | From Cloudinary Dashboard |
   | `CLOUDINARY_API_KEY` | `your_api_key` | From Cloudinary Dashboard |
   | `CLOUDINARY_API_SECRET` | `your_api_secret` | From Cloudinary Dashboard |
   | `FRONTEND_ORIGIN` | `https://durga-bhavani-dodlapahad.vercel.app` | (Update after deploying frontend) |
5. Click **Create Web Service**.
6. When deployment finishes, copy your backend URL (e.g., `https://durga-bhavani-backend.onrender.com`).
7. Test the health check in your browser: `https://durga-bhavani-backend.onrender.com/api/v1/health`.

---

## 🌐 Step 3: Deploy Frontend to Vercel

1. Log into **Vercel** and click **Add New...** -> **Project**.
2. Select your repository.
3. In project settings:
   - **Framework Preset**: `Vite`
   - **Root Directory**: Click edit and select `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. In **Environment Variables**, add:
   | Key | Value |
   |---|---|
   | `VITE_API_BASE_URL` | `https://durga-bhavani-backend.onrender.com/api/v1` |
5. Click **Deploy**.
6. Once deployed, copy your live frontend domain (e.g., `https://durga-bhavani-dodlapahad.vercel.app`).
7. Return to **Render** -> Environment Variables -> update `FRONTEND_ORIGIN` to match your exact Vercel URL.

---

## 🔑 Step 4: Initialize the First Super Administrator

Never ship hardcoded passwords. Run the seed script directly from your terminal connected to your database:

```bash
# In backend directory with production MONGODB_URI set
npm run seed:admin
```
Or run the script via Render's Shell tab in the dashboard.

---

## ⚠️ Free-Tier Limitations & Best Practices

1. **Render Free Tier Spin-Down**:
   - Free Web Services spin down after 15 minutes of inactivity. The first request after idle can take ~30-50 seconds to wake up.
   - For a community temple website, this is completely normal and costs $0.
2. **MongoDB Atlas 512MB Limit**:
   - MongoDB only stores text metadata, records, and references.
   - Photos and videos are stored in Cloudinary and YouTube, so 512MB is sufficient for thousands of articles, albums, and announcements.
3. **Cloudinary 25 Monthly Credits**:
   - Cloudinary automatically compresses and optimizes images.
   - For normal temple operations (several hundred festival photos per year), the free plan is more than adequate.
