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

const router = Router();

// In-memory data store initialized with 2025 celebration records
let albumsStore: IAlbum[] = [...initialAlbums];
let avatarsStore: IAvatar[] = [...initialAvatars];
let auctionsStore: IAuctionItem[] = [...initialAuctionItems];
let donorsStore: IDonor[] = [...initialDonors];
let auditLogsStore: IAuditLog[] = [...initialAuditLogs];

const addAudit = (action: IAuditLog['action'], resourceType: string, id?: string, title?: string, details?: string) => {
  const log: IAuditLog = {
    id: `audit-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    actorName: 'Admin Committee',
    actorRole: 'super-admin',
    action,
    resourceType,
    resourceId: id,
    resourceTitle: title,
    timestamp: new Date().toISOString(),
    details
  };
  auditLogsStore = [log, ...auditLogsStore];
};

// ============================================================================
// 1. PUBLIC ENDPOINTS (Read-Only, Published Status Enforced)
// ============================================================================

// GET /years
router.get('/years', (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    data: [
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
        albumCount: albumsStore.filter((a) => a.year === 2025 && a.status === 'published').length,
        status: 'published'
      },
      {
        year: 2024,
        title: { en: 'Sri Durga Bhavani Utsav Celebrations 2024', te: 'శ్రీ దుర్గాభవాని ఉత్సవాలు 2024 (మొదటి సంవత్సరం)' },
        slug: '2024',
        albumCount: 2,
        status: 'published'
      }
    ]
  });
});

// GET /albums (Public)
router.get('/albums', (req: Request, res: Response) => {
  const { year } = req.query;
  let result = albumsStore.filter((a) => a.status === 'published');
  if (year) {
    result = result.filter((a) => a.year === parseInt(year as string, 10));
  }
  res.status(200).json({
    success: true,
    data: result
  });
});

// GET /albums/:slug (Public)
router.get('/albums/:slug', (req: Request, res: Response) => {
  const album = albumsStore.find((a) => a.slug === req.params.slug && a.status === 'published');
  if (!album) {
    res.status(404).json({
      success: false,
      error: { code: 'ALBUM_NOT_FOUND', message: 'Album not found or not published.' }
    });
    return;
  }
  res.status(200).json({
    success: true,
    data: album
  });
});

// GET /avatars (Public: 10 daily avatars)
router.get('/avatars', (req: Request, res: Response) => {
  const { year, albumSlug } = req.query;
  let result = avatarsStore.filter((av) => av.status === 'published');
  if (year) {
    result = result.filter((av) => av.year === parseInt(year as string, 10));
  }
  if (albumSlug) {
    result = result.filter((av) => av.albumSlug === albumSlug);
  }
  result.sort((a, b) => a.sortOrder - b.sortOrder);
  res.status(200).json({
    success: true,
    data: result
  });
});

// GET /avatars/:id
router.get('/avatars/:id', (req: Request, res: Response) => {
  const avatar = avatarsStore.find((av) => av.id === req.params.id && av.status === 'published');
  if (!avatar) {
    res.status(404).json({
      success: false,
      error: { code: 'AVATAR_NOT_FOUND', message: 'Avatar not found.' }
    });
    return;
  }
  res.status(200).json({
    success: true,
    data: avatar
  });
});

// GET /auctions (Public: ONLY confirmed published records returned!)
router.get('/auctions', (req: Request, res: Response) => {
  const { year, albumSlug } = req.query;
  // Enforce rule: Do not display incomplete records as confirmed winners on the public website.
  let result = auctionsStore.filter((auc) => auc.status === 'published' && auc.isComplete);
  if (year) {
    result = result.filter((auc) => auc.year === parseInt(year as string, 10));
  }
  if (albumSlug) {
    result = result.filter((auc) => auc.albumSlug === albumSlug);
  }
  result.sort((a, b) => a.sortOrder - b.sortOrder);
  res.status(200).json({
    success: true,
    data: result
  });
});

// GET /donors (Public)
router.get('/donors', (req: Request, res: Response) => {
  const { year } = req.query;
  let result = donorsStore.filter((d) => d.status === 'published');
  if (year) {
    result = result.filter((d) => d.year === parseInt(year as string, 10));
  }
  result.sort((a, b) => a.sortOrder - b.sortOrder);
  res.status(200).json({
    success: true,
    data: result
  });
});

// ============================================================================
// 2. AUTHENTICATION ENDPOINTS
// ============================================================================

router.post('/auth/login', (req: Request, res: Response) => {
  const { email, password } = req.body;
  // Standard development / preview auth validation
  if (email && (password === 'DurgaBhavani@2025' || password === 'admin123' || !password)) {
    res.status(200).json({
      success: true,
      data: {
        user: {
          id: 'usr-admin-01',
          name: 'Temple Committee Admin',
          email: email || 'admin@dodlapahad.org',
          role: 'super-admin'
        },
        token: 'mock_jwt_session_token_durga_bhavani_2025'
      }
    });
    return;
  }
  res.status(401).json({
    success: false,
    error: { code: 'INVALID_CREDENTIALS', message: 'Invalid admin credentials.' }
  });
});

// ============================================================================
// 3. ADMIN ENDPOINTS (Full CRUD, Draft Visibility, Audit Logging)
// ============================================================================

// GET /admin/albums
router.get('/admin/albums', (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    data: albumsStore
  });
});

// POST /admin/albums
router.post('/admin/albums', (req: Request, res: Response) => {
  const newAlbum: IAlbum = {
    ...req.body,
    id: `alb-${Date.now()}`
  };
  albumsStore.push(newAlbum);
  addAudit('create', 'Album', newAlbum.id, newAlbum.title.en, `Created album "${newAlbum.title.en}".`);
  res.status(201).json({ success: true, data: newAlbum });
});

// PATCH /admin/albums/:id
router.patch('/admin/albums/:id', (req: Request, res: Response) => {
  const idx = albumsStore.findIndex((a) => a.id === req.params.id);
  if (idx < 0) {
    res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Album not found' } });
    return;
  }
  albumsStore[idx] = { ...albumsStore[idx], ...req.body };
  addAudit('update', 'Album', req.params.id, albumsStore[idx].title.en, `Updated album "${albumsStore[idx].title.en}".`);
  res.status(200).json({ success: true, data: albumsStore[idx] });
});

// DELETE /admin/albums/:id
router.delete('/admin/albums/:id', (req: Request, res: Response) => {
  const target = albumsStore.find((a) => a.id === req.params.id);
  albumsStore = albumsStore.filter((a) => a.id !== req.params.id);
  if (target) {
    addAudit('delete', 'Album', req.params.id, target.title.en, `Deleted album "${target.title.en}".`);
  }
  res.status(200).json({ success: true, message: 'Album deleted successfully.' });
});

// GET /admin/avatars (Admin gets all 10 avatars)
router.get('/admin/avatars', (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    data: avatarsStore
  });
});

// POST /admin/avatars
router.post('/admin/avatars', (req: Request, res: Response) => {
  const newAvatar: IAvatar = {
    ...req.body,
    id: `avatar-2025-${Date.now()}`,
    photos: req.body.photos || []
  };
  avatarsStore.push(newAvatar);
  addAudit('create', 'Avatar', newAvatar.id, newAvatar.name.en, `Created avatar "${newAvatar.name.en}".`);
  res.status(201).json({ success: true, data: newAvatar });
});

// PATCH /admin/avatars/:id
router.patch('/admin/avatars/:id', (req: Request, res: Response) => {
  const idx = avatarsStore.findIndex((a) => a.id === req.params.id);
  if (idx < 0) {
    res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Avatar not found' } });
    return;
  }
  avatarsStore[idx] = { ...avatarsStore[idx], ...req.body };
  addAudit('update', 'Avatar', req.params.id, avatarsStore[idx].name.en, `Updated Day ${avatarsStore[idx].dayNumber} avatar "${avatarsStore[idx].name.en}".`);
  res.status(200).json({ success: true, data: avatarsStore[idx] });
});

// DELETE /admin/avatars/:id
router.delete('/admin/avatars/:id', (req: Request, res: Response) => {
  const target = avatarsStore.find((a) => a.id === req.params.id);
  avatarsStore = avatarsStore.filter((a) => a.id !== req.params.id);
  if (target) {
    addAudit('delete', 'Avatar', req.params.id, target.name.en, `Deleted avatar "${target.name.en}".`);
  }
  res.status(200).json({ success: true, message: 'Avatar deleted successfully.' });
});

// GET /admin/auctions (Admin gets all 15 auction items with draft status)
router.get('/admin/auctions', (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    data: auctionsStore
  });
});

// POST /admin/auctions
router.post('/admin/auctions', (req: Request, res: Response) => {
  const newItem: IAuctionItem = {
    ...req.body,
    id: `auc-2025-${Date.now()}`
  };
  auctionsStore.push(newItem);
  addAudit('create', 'Auction', newItem.id, newItem.itemName.en, `Created auction record "${newItem.itemName.en}".`);
  res.status(201).json({ success: true, data: newItem });
});

// PATCH /admin/auctions/:id
router.patch('/admin/auctions/:id', (req: Request, res: Response) => {
  const idx = auctionsStore.findIndex((a) => a.id === req.params.id);
  if (idx < 0) {
    res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Auction record not found' } });
    return;
  }
  auctionsStore[idx] = { ...auctionsStore[idx], ...req.body };
  addAudit('update', 'Auction', req.params.id, auctionsStore[idx].itemName.en, `Updated auction record "${auctionsStore[idx].itemName.en}".`);
  res.status(200).json({ success: true, data: auctionsStore[idx] });
});

// DELETE /admin/auctions/:id
router.delete('/admin/auctions/:id', (req: Request, res: Response) => {
  const target = auctionsStore.find((a) => a.id === req.params.id);
  auctionsStore = auctionsStore.filter((a) => a.id !== req.params.id);
  if (target) {
    addAudit('delete', 'Auction', req.params.id, target.itemName.en, `Deleted auction record "${target.itemName.en}".`);
  }
  res.status(200).json({ success: true, message: 'Auction record deleted successfully.' });
});

// GET /admin/donors
router.get('/admin/donors', (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    data: donorsStore
  });
});

// POST /admin/donors
router.post('/admin/donors', (req: Request, res: Response) => {
  const newDonor: IDonor = {
    ...req.body,
    id: `donor-2025-${Date.now()}`
  };
  donorsStore.push(newDonor);
  addAudit('create', 'Donor', newDonor.id, newDonor.name.en, `Created donor record "${newDonor.name.en}".`);
  res.status(201).json({ success: true, data: newDonor });
});

// GET /admin/audit-logs
router.get('/admin/audit-logs', (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    data: auditLogsStore
  });
});

export default router;
