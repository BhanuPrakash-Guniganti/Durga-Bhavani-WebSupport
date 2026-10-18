import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { env } from './env.js';
import { UserModel } from '../models/User.js';
import {
  YearModel,
  AlbumModel,
  AvatarModel,
  AuctionItemModel,
  DonorModel,
  AuditLogModel
} from '../models/CelebrationModels.js';
import {
  initialAlbums,
  initialAvatars,
  initialAuctionItems,
  initialDonors,
  initialAuditLogs
} from '../data/celebrations2025.js';

let dbConnected = false;

export const isDbConnected = (): boolean => dbConnected;

const seedInitialDataIfEmpty = async () => {
  try {
    // 1. Seed Initial Administrator if no users exist
    const userCount = await UserModel.countDocuments();
    if (userCount === 0) {
      const passwordHash = await bcrypt.hash(env.INITIAL_ADMIN_PASSWORD, 10);
      await UserModel.create({
        name: env.INITIAL_ADMIN_NAME,
        email: env.INITIAL_ADMIN_EMAIL.toLowerCase().trim(),
        passwordHash,
        role: 'super-admin',
        active: true
      });
      console.log(`[Database] Seeded initial super-admin: ${env.INITIAL_ADMIN_EMAIL}`);
    }

    // 2. Seed Years if empty
    const yearCount = await YearModel.countDocuments();
    if (yearCount === 0) {
      await YearModel.create([
        {
          year: 2026,
          title: { en: 'Sri Durga Bhavani Utsav Celebrations 2026', te: 'శ్రీ దుర్గాభవాని ఉత్సవాలు 2026 (మూడవ సంవత్సరం)' },
          slug: '2026',
          albumCount: 1,
          status: 'published'
        },
        {
          year: 2025,
          title: { en: 'Sri Durga Bhavani Utsav Celebrations 2025', te: 'శ్రీ దుర్గాభవాని ఉత్సవాలు 2025 (రెండవ సంవత్సరం)' },
          slug: '2025',
          albumCount: initialAlbums.filter((a) => a.year === 2025 && a.status === 'published').length,
          status: 'published'
        },
        {
          year: 2024,
          title: { en: 'Sri Durga Bhavani Utsav Celebrations 2024', te: 'శ్రీ దుర్గాభవాని ఉత్సవాలు 2024 (మొదటి సంవత్సరం)' },
          slug: '2024',
          albumCount: 2,
          status: 'published'
        }
      ]);
      console.log('[Database] Seeded festival years (2024, 2025, 2026).');
    }

    // 3. Seed Albums if empty
    const albumCount = await AlbumModel.countDocuments();
    if (albumCount === 0) {
      await AlbumModel.insertMany(initialAlbums);
      console.log(`[Database] Seeded ${initialAlbums.length} celebration albums.`);
    }

    // 4. Seed Avatars if empty
    const avatarCount = await AvatarModel.countDocuments();
    if (avatarCount === 0) {
      await AvatarModel.insertMany(initialAvatars);
      console.log(`[Database] Seeded ${initialAvatars.length} Devi Alankaranalu avatars.`);
    }

    // 5. Seed Auctions if empty
    const auctionCount = await AuctionItemModel.countDocuments();
    if (auctionCount === 0) {
      await AuctionItemModel.insertMany(initialAuctionItems);
      console.log(`[Database] Seeded ${initialAuctionItems.length} auction records.`);
    }

    // 6. Seed Donors if empty
    const donorCount = await DonorModel.countDocuments();
    if (donorCount === 0) {
      await DonorModel.insertMany(initialDonors);
      console.log(`[Database] Seeded ${initialDonors.length} donor records.`);
    }

    // 7. Seed Audit Logs if empty
    const auditCount = await AuditLogModel.countDocuments();
    if (auditCount === 0) {
      await AuditLogModel.insertMany(initialAuditLogs);
    }
  } catch (err) {
    console.error('[Database] Seeding check encountered an error:', err);
  }
};

export const connectDatabase = async (): Promise<boolean> => {
  if (!env.MONGODB_URI) {
    console.warn('[Database] MONGODB_URI not provided. Running in in-memory fallback mode.');
    dbConnected = false;
    return false;
  }

  try {
    mongoose.set('strictQuery', true);
    await mongoose.connect(env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000 // Timeout fast if offline
    });
    dbConnected = true;
    console.log(`[Database] Successfully connected to MongoDB database.`);
    await seedInitialDataIfEmpty();
    return true;
  } catch (error) {
    dbConnected = false;
    console.warn(
      `[Database] Could not connect to MongoDB (${(error as Error).message}). Operating with in-memory fallback store.`
    );
    return false;
  }
};
