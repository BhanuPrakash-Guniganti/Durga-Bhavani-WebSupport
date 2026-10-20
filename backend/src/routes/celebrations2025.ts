import { Router, Request, Response } from 'express';
import {
  initialAlbums,
  initialAvatars,
  initialAuctionItems,
  initialDonors,
  initialAuditLogs,
  type IAlbum,
  type IAvatar,
  type IAuctionItem,
  type IDonor,
  type IAuditLog
} from '../data/celebrations2025.js';
import { isDbConnected } from '../config/db.js';
import {
  YearModel,
  AlbumModel,
  AvatarModel,
  AuctionItemModel,
  DonorModel,
  AuditLogModel,
  SiteContentModel
} from '../models/CelebrationModels.js';
import { requireAuth, requirePublisher } from '../middleware/auth.js';

const router = Router();

// In-memory fallback data store initialized with 2025 celebration records
let albumsStore: IAlbum[] = [...initialAlbums];
let avatarsStore: IAvatar[] = [...initialAvatars];
let auctionsStore: IAuctionItem[] = [...initialAuctionItems];
let donorsStore: IDonor[] = [...initialDonors];
let auditLogsStore: IAuditLog[] = [...initialAuditLogs];

const addAudit = async (
  req: Request,
  action: IAuditLog['action'],
  resourceType: string,
  id?: string,
  title?: string,
  details?: string
) => {
  const actorName = req.user?.name || 'Temple Committee Admin';
  const actorRole = req.user?.role || 'super-admin';
  const log: IAuditLog = {
    id: `audit-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    actorName,
    actorRole,
    action,
    resourceType,
    resourceId: id,
    resourceTitle: title,
    timestamp: new Date().toISOString(),
    details
  };
  auditLogsStore = [log, ...auditLogsStore];

  if (isDbConnected()) {
    try {
      await AuditLogModel.create(log);
    } catch (err) {
      console.warn('[AuditLog] Failed to persist log entry to DB:', err);
    }
  }
};

// ============================================================================
// 1. PUBLIC ENDPOINTS (Read-Only, Strictly Published Status Enforced)
// ============================================================================

// GET /years
router.get('/years', async (_req: Request, res: Response) => {
  if (isDbConnected()) {
    try {
      const years = await YearModel.find({ status: 'published' }).sort({ year: -1 }).lean();
      if (years.length > 0) {
        res.status(200).json({ success: true, data: years });
        return;
      }
    } catch {
      // fallback to memory
    }
  }

  res.status(200).json({
    success: true,
    data: [
      {
        year: 2026,
        title: { en: 'Sri Durga Bhavani Utsav Celebrations 2026', te: 'శ్రీ దుర్గాభవాని ఉత్సవాలు 2026 (మూడవ సంవత్సరం)' },
        slug: '2026',
        coverImage: '/images/covers/cover-utsav-highlights.webp',
        albumCount: albumsStore.filter((a) => a.year === 2026 && a.status === 'published').length,
        status: 'published',
        startDate: '2026-10-11',
        endDate: '2026-10-20',
        dateRangeFormatted: {
          en: 'Sunday, October 11, 2026 – Tuesday, October 20, 2026',
          te: 'ఆదివారం, అక్టోబర్ 11, 2026 – మంగళవారం, అక్టోబర్ 20, 2026'
        }
      },
      {
        year: 2025,
        title: { en: 'Sri Durga Bhavani Utsav Celebrations 2025', te: 'శ్రీ దుర్గాభవాని ఉత్సవాలు 2025 (రెండవ సంవత్సరం)' },
        slug: '2025',
        coverImage: '/images/covers/cover-devi-alankaranalu.webp',
        albumCount: albumsStore.filter((a) => a.year === 2025 && a.status === 'published').length,
        status: 'published',
        startDate: '2025-09-22',
        endDate: '2025-10-01',
        dateRangeFormatted: {
          en: 'Monday, September 22, 2025 – Wednesday, October 1, 2025',
          te: 'సోమవారం, సెప్టెంబర్ 22, 2025 – బుధవారం, అక్టోబర్ 1, 2025'
        }
      },
      {
        year: 2024,
        title: { en: 'Sri Durga Bhavani Utsav Celebrations 2024', te: 'శ్రీ దుర్గాభవాని ఉత్సవాలు 2024 (మొదటి సంవత్సరం)' },
        slug: '2024',
        coverImage: '/images/covers/cover-shobha-yatra.webp',
        albumCount: albumsStore.filter((a) => a.year === 2024 && a.status === 'published').length,
        status: 'published',
        startDate: '2024-10-03',
        endDate: '2024-10-12',
        dateRangeFormatted: {
          en: 'Thursday, October 3, 2024 – Saturday, October 12, 2024',
          te: 'గురువారం, అక్టోబర్ 3, 2024 – శనివారం, అక్టోబర్ 12, 2024'
        }
      }
    ]
  });
});

const ensureAlbumType = <T extends { slug?: string; albumType?: string; coverImage?: string }>(alb: T): T => {
  if (!alb.albumType && alb.slug) {
    alb.albumType =
      alb.slug.includes('auction') ? 'auction' :
      alb.slug.includes('alankaranalu') || alb.slug.includes('avatar') ? 'avatars' :
      alb.slug.includes('donor') ? 'donors' : 'general';
  }
  if (!alb.coverImage || alb.coverImage.startsWith('data:image') || alb.coverImage === '') {
    const slug = alb.slug || '';
    if (slug.includes('alankaranalu') || alb.albumType === 'avatars') {
      alb.coverImage = '/images/covers/cover-devi-alankaranalu.webp';
    } else if (slug.includes('auction') || alb.albumType === 'auction') {
      alb.coverImage = '/images/covers/cover-auction-winners.webp';
    } else if (slug.includes('donor') || alb.albumType === 'donors') {
      alb.coverImage = '/images/covers/cover-donors-sponsors.webp';
    } else if (slug.includes('annadanam')) {
      alb.coverImage = '/images/covers/cover-annadanam-seva.webp';
    } else if (slug.includes('shobha-yatra')) {
      alb.coverImage = '/images/covers/cover-shobha-yatra.webp';
    } else if (slug.includes('chandi-homam')) {
      alb.coverImage = '/images/covers/cover-chandi-homam.webp';
    } else if (slug.includes('utsav-celebrations') || slug.includes('utsav-2026')) {
      alb.coverImage = '/images/covers/cover-utsav-highlights.webp';
    } else {
      alb.coverImage = '/images/covers/cover-devi-alankaranalu.webp';
    }
  }
  return alb;
};

// GET /albums (Public)
router.get('/albums', async (req: Request, res: Response) => {
  const { year } = req.query;
  const parsedYear = year ? parseInt(year as string, 10) : undefined;

  if (isDbConnected()) {
    try {
      const filter: Record<string, unknown> = { status: 'published' };
      if (parsedYear) filter.year = parsedYear;
      const albums = await AlbumModel.find(filter).sort({ sortOrder: 1 }).lean();
      res.status(200).json({ success: true, data: albums.map(ensureAlbumType) });
      return;
    } catch {
      // fallback to memory
    }
  }

  let result = albumsStore.filter((a) => a.status === 'published').map(ensureAlbumType);
  if (parsedYear) {
    result = result.filter((a) => a.year === parsedYear);
  }
  result.sort((a, b) => a.sortOrder - b.sortOrder);
  res.status(200).json({ success: true, data: result });
});

// GET /albums/:slug (Public)
router.get('/albums/:slug', async (req: Request, res: Response) => {
  if (isDbConnected()) {
    try {
      const album = await AlbumModel.findOne({ slug: req.params.slug, status: 'published' }).lean();
      if (album) {
        res.status(200).json({ success: true, data: ensureAlbumType(album) });
        return;
      }
    } catch {
      // fallback to memory
    }
  }

  const album = albumsStore.find((a) => a.slug === req.params.slug && a.status === 'published');
  if (!album) {
    res.status(404).json({
      success: false,
      error: { code: 'ALBUM_NOT_FOUND', message: 'Album not found or not published.' }
    });
    return;
  }
  res.status(200).json({ success: true, data: ensureAlbumType(album) });
});

// GET /avatars (Public: 10 daily avatars)
router.get('/avatars', async (req: Request, res: Response) => {
  const { year, albumSlug } = req.query;
  const parsedYear = year ? parseInt(year as string, 10) : undefined;

  if (isDbConnected()) {
    try {
      const filter: Record<string, unknown> = { status: 'published' };
      if (parsedYear) filter.year = parsedYear;
      if (albumSlug) filter.albumSlug = albumSlug;
      const avatars = await AvatarModel.find(filter).sort({ sortOrder: 1 }).lean();
      res.status(200).json({ success: true, data: avatars });
      return;
    } catch {
      // fallback
    }
  }

  let result = avatarsStore.filter((av) => av.status === 'published');
  if (parsedYear) {
    result = result.filter((av) => av.year === parsedYear);
  }
  if (albumSlug) {
    result = result.filter((av) => av.albumSlug === albumSlug);
  }
  result.sort((a, b) => a.sortOrder - b.sortOrder);
  res.status(200).json({ success: true, data: result });
});

// GET /avatars/:id
router.get('/avatars/:id', async (req: Request, res: Response) => {
  if (isDbConnected()) {
    try {
      const avatar = await AvatarModel.findOne({ id: req.params.id, status: 'published' }).lean();
      if (avatar) {
        res.status(200).json({ success: true, data: avatar });
        return;
      }
    } catch {
      // fallback
    }
  }

  const avatar = avatarsStore.find((av) => av.id === req.params.id && av.status === 'published');
  if (!avatar) {
    res.status(404).json({
      success: false,
      error: { code: 'AVATAR_NOT_FOUND', message: 'Avatar not found.' }
    });
    return;
  }
  res.status(200).json({ success: true, data: avatar });
});

// GET /auctions (Public: ONLY confirmed published records returned!)
router.get('/auctions', async (req: Request, res: Response) => {
  const { year, albumSlug } = req.query;
  const parsedYear = year ? parseInt(year as string, 10) : undefined;

  if (isDbConnected()) {
    try {
      const filter: Record<string, unknown> = { status: 'published', isComplete: true };
      if (parsedYear) filter.year = parsedYear;
      if (albumSlug) filter.albumSlug = albumSlug;
      const auctions = await AuctionItemModel.find(filter).sort({ sortOrder: 1 }).lean();
      const sanitized = auctions.map((auc) => {
        if (!auc.avatarId) {
          const match = initialAuctionItems.find((init) => init.id === auc.id);
          if (match?.avatarId) {
            auc.avatarId = match.avatarId;
            auc.itemType = match.itemType;
          }
        }
        return auc;
      });
      res.status(200).json({ success: true, data: sanitized });
      return;
    } catch {
      // fallback
    }
  }

  let result = auctionsStore.filter((auc) => auc.status === 'published' && auc.isComplete);
  if (parsedYear) {
    result = result.filter((auc) => auc.year === parsedYear);
  }
  if (albumSlug) {
    result = result.filter((auc) => auc.albumSlug === albumSlug);
  }
  result.sort((a, b) => a.sortOrder - b.sortOrder);
  res.status(200).json({ success: true, data: result });
});

// GET /donors (Public)
router.get('/donors', async (req: Request, res: Response) => {
  const { year } = req.query;
  const parsedYear = year ? parseInt(year as string, 10) : undefined;

  if (isDbConnected()) {
    try {
      const filter: Record<string, unknown> = { status: 'published' };
      if (parsedYear) filter.year = parsedYear;
      const donors = await DonorModel.find(filter).sort({ sortOrder: 1 }).lean();
      res.status(200).json({ success: true, data: donors });
      return;
    } catch {
      // fallback
    }
  }

  let result = donorsStore.filter((d) => d.status === 'published');
  if (parsedYear) {
    result = result.filter((d) => d.year === parsedYear);
  }
  result.sort((a, b) => a.sortOrder - b.sortOrder);
  res.status(200).json({ success: true, data: result });
});

// GET /content/:sectionKey (Public site content)
router.get('/content/:sectionKey', async (req: Request, res: Response) => {
  if (isDbConnected()) {
    try {
      const content = await SiteContentModel.findOne({ sectionKey: req.params.sectionKey }).lean();
      if (content) {
        res.status(200).json({ success: true, data: content.data });
        return;
      }
    } catch {
      // fallback
    }
  }
  res.status(200).json({ success: true, data: null });
});

// ============================================================================
// 2. ADMIN ENDPOINTS (Protected with requireAuth & Role Permissions)
// ============================================================================

// --- ALBUMS ---
router.get('/admin/albums', requireAuth, async (_req: Request, res: Response) => {
  if (isDbConnected()) {
    try {
      const albums = await AlbumModel.find({}).sort({ sortOrder: 1 }).lean();
      res.status(200).json({ success: true, data: albums.map(ensureAlbumType) });
      return;
    } catch {
      // fallback
    }
  }
  res.status(200).json({ success: true, data: albumsStore.map(ensureAlbumType) });
});

router.post('/admin/albums', requireAuth, requirePublisher, async (req: Request, res: Response) => {
  const newAlbum: IAlbum = {
    ...req.body,
    id: req.body.id || `alb-${Date.now()}`
  };
  albumsStore.push(newAlbum);

  if (isDbConnected()) {
    try {
      await AlbumModel.create(newAlbum);
    } catch (err) {
      console.error('[DB] Failed to save album:', err);
    }
  }

  await addAudit(req, 'create', 'Album', newAlbum.id, newAlbum.title?.en, `Created album "${newAlbum.title?.en}".`);
  res.status(201).json({ success: true, data: newAlbum });
});

router.patch('/admin/albums/:id', requireAuth, requirePublisher, async (req: Request, res: Response) => {
  const idx = albumsStore.findIndex((a) => a.id === req.params.id);
  if (idx >= 0) {
    albumsStore[idx] = { ...albumsStore[idx], ...req.body };
  }

  let updatedRecord: IAlbum | null = idx >= 0 ? albumsStore[idx] : null;

  if (isDbConnected()) {
    try {
      const doc = await AlbumModel.findOneAndUpdate(
        { id: req.params.id },
        { $set: req.body },
        { new: true, upsert: true }
      ).lean();
      if (doc) updatedRecord = doc as unknown as IAlbum;
    } catch (err) {
      console.error('[DB] Failed to update album:', err);
    }
  }

  if (!updatedRecord) {
    res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Album not found.' } });
    return;
  }

  await addAudit(req, 'update', 'Album', req.params.id, updatedRecord.title?.en, `Updated album "${updatedRecord.title?.en}".`);
  res.status(200).json({ success: true, data: updatedRecord });
});

router.delete('/admin/albums/:id', requireAuth, requirePublisher, async (req: Request, res: Response) => {
  const target = albumsStore.find((a) => a.id === req.params.id);
  albumsStore = albumsStore.filter((a) => a.id !== req.params.id);

  if (isDbConnected()) {
    try {
      await AlbumModel.deleteOne({ id: req.params.id });
    } catch (err) {
      console.error('[DB] Failed to delete album:', err);
    }
  }

  if (target) {
    await addAudit(req, 'delete', 'Album', req.params.id, target.title?.en, `Deleted album "${target.title?.en}".`);
  }
  res.status(200).json({ success: true, message: 'Album deleted successfully.' });
});

// --- AVATARS (Devi Alankaranalu) ---
router.get('/admin/avatars', requireAuth, async (_req: Request, res: Response) => {
  if (isDbConnected()) {
    try {
      const avatars = await AvatarModel.find({}).sort({ sortOrder: 1 }).lean();
      res.status(200).json({ success: true, data: avatars });
      return;
    } catch {
      // fallback
    }
  }
  res.status(200).json({ success: true, data: avatarsStore });
});

router.post('/admin/avatars', requireAuth, requirePublisher, async (req: Request, res: Response) => {
  const newAvatar: IAvatar = {
    ...req.body,
    id: req.body.id || `avatar-2025-${Date.now()}`,
    photos: req.body.photos || []
  };
  avatarsStore.push(newAvatar);

  if (isDbConnected()) {
    try {
      await AvatarModel.create(newAvatar);
    } catch (err) {
      console.error('[DB] Failed to save avatar:', err);
    }
  }

  await addAudit(req, 'create', 'Avatar', newAvatar.id, newAvatar.name?.en, `Created avatar "${newAvatar.name?.en}".`);
  res.status(201).json({ success: true, data: newAvatar });
});

router.patch('/admin/avatars/:id', requireAuth, requirePublisher, async (req: Request, res: Response) => {
  const idx = avatarsStore.findIndex((a) => a.id === req.params.id);
  if (idx >= 0) {
    avatarsStore[idx] = { ...avatarsStore[idx], ...req.body };
  }

  let updatedRecord: IAvatar | null = idx >= 0 ? avatarsStore[idx] : null;

  if (isDbConnected()) {
    try {
      const doc = await AvatarModel.findOneAndUpdate(
        { id: req.params.id },
        { $set: req.body },
        { new: true, upsert: true }
      ).lean();
      if (doc) updatedRecord = doc as unknown as IAvatar;
    } catch (err) {
      console.error('[DB] Failed to update avatar:', err);
    }
  }

  if (!updatedRecord) {
    res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Avatar not found.' } });
    return;
  }

  await addAudit(
    req,
    'update',
    'Avatar',
    req.params.id,
    updatedRecord.name?.en,
    `Updated Day ${updatedRecord.dayNumber} avatar "${updatedRecord.name?.en}".`
  );
  res.status(200).json({ success: true, data: updatedRecord });
});

router.delete('/admin/avatars/:id', requireAuth, requirePublisher, async (req: Request, res: Response) => {
  const target = avatarsStore.find((a) => a.id === req.params.id);
  avatarsStore = avatarsStore.filter((a) => a.id !== req.params.id);

  if (isDbConnected()) {
    try {
      await AvatarModel.deleteOne({ id: req.params.id });
    } catch (err) {
      console.error('[DB] Failed to delete avatar:', err);
    }
  }

  if (target) {
    await addAudit(req, 'delete', 'Avatar', req.params.id, target.name?.en, `Deleted avatar "${target.name?.en}".`);
  }
  res.status(200).json({ success: true, message: 'Avatar deleted successfully.' });
});

// --- AUCTIONS (Auction Winners) ---
router.get('/admin/auctions', requireAuth, async (_req: Request, res: Response) => {
  if (isDbConnected()) {
    try {
      const auctions = await AuctionItemModel.find({}).sort({ sortOrder: 1 }).lean();
      res.status(200).json({ success: true, data: auctions });
      return;
    } catch {
      // fallback
    }
  }
  res.status(200).json({ success: true, data: auctionsStore });
});

router.post('/admin/auctions', requireAuth, requirePublisher, async (req: Request, res: Response) => {
  const yr = req.body.year || 2024;
  const newItem: IAuctionItem = {
    ...req.body,
    id: req.body.id || `auc-${yr}-${Date.now()}`
  };
  auctionsStore.push(newItem);

  if (isDbConnected()) {
    try {
      await AuctionItemModel.create(newItem);
    } catch (err) {
      console.error('[DB] Failed to save auction:', err);
    }
  }

  await addAudit(req, 'create', 'Auction', newItem.id, newItem.itemName?.en, `Created auction record "${newItem.itemName?.en}".`);
  res.status(201).json({ success: true, data: newItem });
});

router.patch('/admin/auctions/:id', requireAuth, requirePublisher, async (req: Request, res: Response) => {
  const idx = auctionsStore.findIndex((a) => a.id === req.params.id);
  if (idx >= 0) {
    auctionsStore[idx] = { ...auctionsStore[idx], ...req.body };
  }

  let updatedRecord: IAuctionItem | null = idx >= 0 ? auctionsStore[idx] : null;

  if (isDbConnected()) {
    try {
      const doc = await AuctionItemModel.findOneAndUpdate(
        { id: req.params.id },
        { $set: req.body },
        { new: true, upsert: true }
      ).lean();
      if (doc) updatedRecord = doc as unknown as IAuctionItem;
    } catch (err) {
      console.error('[DB] Failed to update auction:', err);
    }
  }

  if (!updatedRecord) {
    res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Auction record not found.' } });
    return;
  }

  await addAudit(
    req,
    'update',
    'Auction',
    req.params.id,
    updatedRecord.itemName?.en,
    `Updated auction record "${updatedRecord.itemName?.en}".`
  );
  res.status(200).json({ success: true, data: updatedRecord });
});

router.delete('/admin/auctions/:id', requireAuth, requirePublisher, async (req: Request, res: Response) => {
  const target = auctionsStore.find((a) => a.id === req.params.id);
  auctionsStore = auctionsStore.filter((a) => a.id !== req.params.id);

  if (isDbConnected()) {
    try {
      await AuctionItemModel.deleteOne({ id: req.params.id });
    } catch (err) {
      console.error('[DB] Failed to delete auction:', err);
    }
  }

  if (target) {
    await addAudit(req, 'delete', 'Auction', req.params.id, target.itemName?.en, `Deleted auction record "${target.itemName?.en}".`);
  }
  res.status(200).json({ success: true, message: 'Auction record deleted successfully.' });
});

// --- DONORS ---
router.get('/admin/donors', requireAuth, async (_req: Request, res: Response) => {
  if (isDbConnected()) {
    try {
      const donors = await DonorModel.find({}).sort({ sortOrder: 1 }).lean();
      res.status(200).json({ success: true, data: donors });
      return;
    } catch {
      // fallback
    }
  }
  res.status(200).json({ success: true, data: donorsStore });
});

router.post('/admin/donors', requireAuth, requirePublisher, async (req: Request, res: Response) => {
  const newDonor: IDonor = {
    ...req.body,
    id: req.body.id || `donor-2025-${Date.now()}`
  };
  donorsStore.push(newDonor);

  if (isDbConnected()) {
    try {
      await DonorModel.create(newDonor);
    } catch (err) {
      console.error('[DB] Failed to save donor:', err);
    }
  }

  await addAudit(req, 'create', 'Donor', newDonor.id, newDonor.name?.en, `Created donor record "${newDonor.name?.en}".`);
  res.status(201).json({ success: true, data: newDonor });
});

router.patch('/admin/donors/:id', requireAuth, requirePublisher, async (req: Request, res: Response) => {
  const idx = donorsStore.findIndex((d) => d.id === req.params.id);
  if (idx >= 0) {
    donorsStore[idx] = { ...donorsStore[idx], ...req.body };
  }

  let updatedRecord: IDonor | null = idx >= 0 ? donorsStore[idx] : null;

  if (isDbConnected()) {
    try {
      const doc = await DonorModel.findOneAndUpdate(
        { id: req.params.id },
        { $set: req.body },
        { new: true, upsert: true }
      ).lean();
      if (doc) updatedRecord = doc as unknown as IDonor;
    } catch (err) {
      console.error('[DB] Failed to update donor:', err);
    }
  }

  if (!updatedRecord) {
    res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Donor record not found.' } });
    return;
  }

  await addAudit(req, 'update', 'Donor', req.params.id, updatedRecord.name?.en, `Updated donor record "${updatedRecord.name?.en}".`);
  res.status(200).json({ success: true, data: updatedRecord });
});

router.delete('/admin/donors/:id', requireAuth, requirePublisher, async (req: Request, res: Response) => {
  const target = donorsStore.find((d) => d.id === req.params.id);
  donorsStore = donorsStore.filter((d) => d.id !== req.params.id);

  if (isDbConnected()) {
    try {
      await DonorModel.deleteOne({ id: req.params.id });
    } catch (err) {
      console.error('[DB] Failed to delete donor:', err);
    }
  }

  if (target) {
    await addAudit(req, 'delete', 'Donor', req.params.id, target.name?.en, `Deleted donor record "${target.name?.en}".`);
  }
  res.status(200).json({ success: true, message: 'Donor record deleted successfully.' });
});

// --- EDITABLE SITE CONTENT (Home, About, History, Contact) ---
router.get('/admin/content/:sectionKey', requireAuth, async (req: Request, res: Response) => {
  if (isDbConnected()) {
    try {
      const content = await SiteContentModel.findOne({ sectionKey: req.params.sectionKey }).lean();
      if (content) {
        res.status(200).json({ success: true, data: content.data });
        return;
      }
    } catch {
      // fallback
    }
  }
  res.status(200).json({ success: true, data: null });
});

router.post('/admin/content/:sectionKey', requireAuth, requirePublisher, async (req: Request, res: Response) => {
  const { data } = req.body;
  if (isDbConnected()) {
    try {
      await SiteContentModel.findOneAndUpdate(
        { sectionKey: req.params.sectionKey },
        { sectionKey: req.params.sectionKey, data, updatedBy: req.user?.email },
        { upsert: true, new: true }
      );
    } catch (err) {
      console.error('[DB] Failed to save site content:', err);
    }
  }
  await addAudit(req, 'update', 'Content', req.params.sectionKey, req.params.sectionKey, `Updated website content section "${req.params.sectionKey}".`);
  res.status(200).json({ success: true, message: 'Content updated successfully.' });
});

// --- AUDIT LOGS ---
router.get('/admin/audit-logs', requireAuth, async (_req: Request, res: Response) => {
  if (isDbConnected()) {
    try {
      const logs = await AuditLogModel.find({}).sort({ timestamp: -1 }).limit(100).lean();
      res.status(200).json({ success: true, data: logs });
      return;
    } catch {
      // fallback
    }
  }
  res.status(200).json({ success: true, data: auditLogsStore });
});

export default router;
