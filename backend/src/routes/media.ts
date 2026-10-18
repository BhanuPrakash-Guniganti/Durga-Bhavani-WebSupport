import { Router, Request, Response } from 'express';
import multer from 'multer';
import { requireAuth } from '../middleware/auth.js';
import {
  isCloudinaryConfigured,
  uploadImageBuffer,
  deleteCloudinaryImage
} from '../services/cloudinary.js';

const router = Router();

// Configure multer memory storage with strict validation
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5 MB max limit
  },
  fileFilter: (_req, file, cb) => {
    const allowedMimes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file format. Only JPEG, PNG, and WebP images are allowed.'));
    }
  }
});

// ============================================================================
// 1. GET MEDIA STORAGE STATUS
// ============================================================================
router.get('/status', requireAuth, (_req: Request, res: Response): void => {
  res.status(200).json({
    success: true,
    data: {
      provider: 'cloudinary',
      configured: isCloudinaryConfigured()
    }
  });
});

// ============================================================================
// 2. UPLOAD IMAGE (Multipart File)
// ============================================================================
router.post(
  '/upload',
  requireAuth,
  upload.single('image'),
  async (req: Request, res: Response): Promise<void> => {
    try {
      if (!req.file) {
        res.status(400).json({
          success: false,
          error: { code: 'FILE_MISSING', message: 'No image file uploaded.' }
        });
        return;
      }

      if (!isCloudinaryConfigured()) {
        res.status(503).json({
          success: false,
          error: {
            code: 'STORAGE_NOT_CONFIGURED',
            message:
              'Cloudinary online storage is not configured yet. Please configure CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET in backend environment variables to enable shared cross-device uploads.'
          }
        });
        return;
      }

      const folder = (req.body.folder as string) || 'durga-bhavani/celebrations';
      const result = await uploadImageBuffer(req.file.buffer, folder);

      res.status(200).json({
        success: true,
        data: {
          url: result.url,
          publicId: result.publicId,
          width: result.width,
          height: result.height,
          format: result.format,
          bytes: result.bytes
        }
      });
    } catch (err: unknown) {
      console.error('[Media] Upload failed:', err);
      res.status(500).json({
        success: false,
        error: {
          code: 'UPLOAD_FAILED',
          message: err instanceof Error ? err.message : 'Image upload failed. Please try again.'
        }
      });
    }
  }
);

// ============================================================================
// 3. DELETE/REPLACE MEDIA ASSET
// ============================================================================
router.delete('/:publicId(*)', requireAuth, async (req: Request, res: Response): Promise<void> => {
  try {
    const publicId = req.params.publicId;
    if (!publicId) {
      res.status(400).json({ success: false, error: { code: 'MISSING_ID', message: 'Public ID is required.' } });
      return;
    }
    const success = await deleteCloudinaryImage(publicId);
    res.status(200).json({ success, message: success ? 'Asset deleted from Cloudinary' : 'Asset not found or skipped' });
  } catch (err) {
    res.status(500).json({ success: false, error: { code: 'DELETE_ERROR', message: 'Failed to delete asset' } });
  }
});

export default router;
