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

const syncDatabaseSchemas = async () => {
  try {
    // 1. Sync Albums: Ensure all 2024, 2025, 2026 albums exist and have correct titles/types
    for (const initAlb of initialAlbums) {
      const existing = await AlbumModel.findOne({ $or: [{ id: initAlb.id }, { slug: initAlb.slug }] });
      if (existing) {
        await AlbumModel.updateOne(
          { _id: existing._id },
          {
            $set: {
              title: initAlb.title,
              description: initAlb.description,
              albumType: initAlb.albumType,
              coverImage: initAlb.coverImage,
              photoCount: initAlb.photoCount,
              year: initAlb.year,
              status: initAlb.status,
              sortOrder: initAlb.sortOrder
            }
          }
        );
      } else {
        await AlbumModel.create(initAlb);
      }
    }

    // 2. Sync Avatars: Ensure all 31 avatars (11 for 2025, 10 for 2024, 10 for 2026) exist and are published
    for (const initAv of initialAvatars) {
      try {
        const existing = await AvatarModel.findOne({ id: initAv.id });
        if (existing) {
          await AvatarModel.updateOne(
            { id: initAv.id },
            {
              $set: {
                name: initAv.name,
                sortOrder: initAv.sortOrder,
                dayNumber: initAv.dayNumber,
                albumSlug: initAv.albumSlug,
                year: initAv.year,
                description: initAv.description,
                status: 'published'
              }
            }
          );
        } else {
          await AvatarModel.create({
            ...initAv,
            status: 'published'
          });
        }
      } catch (avErr) {
        console.warn(`[Database] Notice syncing avatar ${initAv.id}:`, avErr);
      }
    }

    // 3. Sync Auctions: Ensure exactly the 14 2025 auction records, preserving any uploaded photoUrl
    const validAucIds = initialAuctionItems.map((a) => a.id);
    for (const initAuc of initialAuctionItems) {
      const existing = await AuctionItemModel.findOne({ id: initAuc.id });
      if (existing) {
        await AuctionItemModel.updateOne(
          { id: initAuc.id },
          {
            $set: {
              itemName: initAuc.itemName,
              avatarId: initAuc.avatarId,
              avatarName: initAuc.avatarName,
              winnerName: initAuc.winnerName,
              fatherName: initAuc.fatherName,
              winningAmount: initAuc.winningAmount,
              itemType: initAuc.itemType,
              status: 'published',
              isComplete: true,
              sortOrder: initAuc.sortOrder,
              year: initAuc.year,
              albumSlug: initAuc.albumSlug
            }
          }
        );
      } else {
        await AuctionItemModel.create(initAuc);
      }
    }
    // Remove obsolete 2025 auction records not in the final 14
    await AuctionItemModel.deleteMany({
      year: 2025,
      albumSlug: 'auction-winners-2025',
      id: { $nin: validAucIds }
    });

    // 4. Sync Donors: Ensure the 4 final sponsors exist with published status
    const validDonorIds = initialDonors.map((d) => d.id);
    for (const initDon of initialDonors) {
      const existing = await DonorModel.findOne({ id: initDon.id });
      if (existing) {
        await DonorModel.updateOne(
          { id: initDon.id },
          {
            $set: {
              name: initDon.name,
              contributionType: initDon.contributionType,
              albumSlug: initDon.albumSlug,
              year: initDon.year,
              status: 'published',
              sortOrder: initDon.sortOrder
            }
          }
        );
      } else {
        await DonorModel.create(initDon);
      }
    }
    // Remove obsolete 2025 donors not in the 4 final sponsors
    await DonorModel.deleteMany({
      year: 2025,
      albumSlug: 'donors-and-sponsors-2025',
      id: { $nin: validDonorIds }
    });

    // 5. Update Years album counts
    for (const yr of [2024, 2025, 2026]) {
      const publishedCount = await AlbumModel.countDocuments({ year: yr, status: 'published' });
      await YearModel.updateOne({ year: yr }, { $set: { albumCount: publishedCount } });
    }

    // 6. Purge outdated 2025 announcements if collection exists in MongoDB
    if (mongoose.connection.db) {
      const collections = await mongoose.connection.db.listCollections({ name: 'announcements' }).toArray();
      if (collections.length > 0) {
        await mongoose.connection.db.collection('announcements').deleteMany({
          $or: [
            { id: { $in: ['ann-1', 'ann-2'] } },
            { slug: { $in: ['welcome-to-new-portal-announcement', 'photo-submission-invitation'] } },
            { 'title.en': { $in: ['Official Launch of Durga Bhavani Seva Samiti Digital Archive', 'Invitation to Devotees to Submit Festival Photographs'] } }
          ]
        });
        console.log('[Database] Cleaned up outdated announcement records from MongoDB.');
      }
    }

    console.log('[Database] Content and schema synchronization completed.');
  } catch (err) {
    console.warn('[Database] Schema synchronization notice:', err);
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
    const connectOptions: mongoose.ConnectOptions = {
      serverSelectionTimeoutMS: 5000 // Timeout fast if offline
    };
    await mongoose.connect(env.MONGODB_URI, connectOptions);
    dbConnected = true;
    console.log(`[Database] Successfully connected to MongoDB database.`);
    await seedInitialDataIfEmpty();
    await syncDatabaseSchemas();
    return true;
  } catch (error) {
    dbConnected = false;
    console.warn(
      `[Database] Could not connect to MongoDB (${(error as Error).message}). Operating with in-memory fallback store.`
    );
    return false;
  }
};
