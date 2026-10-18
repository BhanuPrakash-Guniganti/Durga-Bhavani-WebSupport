import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import { env } from '../config/env.js';

// Configure Cloudinary SDK
if (env.CLOUDINARY_CLOUD_NAME && env.CLOUDINARY_API_KEY && env.CLOUDINARY_API_SECRET) {
  cloudinary.config({
    cloud_name: env.CLOUDINARY_CLOUD_NAME,
    api_key: env.CLOUDINARY_API_KEY,
    api_secret: env.CLOUDINARY_API_SECRET,
    secure: true
  });
}

export const isCloudinaryConfigured = (): boolean => {
  return Boolean(
    env.CLOUDINARY_CLOUD_NAME &&
    env.CLOUDINARY_API_KEY &&
    env.CLOUDINARY_API_SECRET
  );
};

export interface UploadResult {
  url: string;
  publicId: string;
  width?: number;
  height?: number;
  format?: string;
  bytes?: number;
}

/**
 * Uploads an image buffer directly to Cloudinary without writing temporary files to disk.
 */
export const uploadImageBuffer = (
  buffer: Buffer,
  folder = 'durga-bhavani-dodlapahad'
): Promise<UploadResult> => {
  return new Promise((resolve, reject) => {
    if (!isCloudinaryConfigured()) {
      return reject(
        new Error(
          'Cloudinary is not configured. Please add CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET to your backend environment variables.'
        )
      );
    }

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: 'image',
        allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
        transformation: [{ quality: 'auto', fetch_format: 'auto' }]
      },
      (error: unknown, result?: UploadApiResponse) => {
        if (error || !result) {
          return reject(error || new Error('Cloudinary upload returned empty response.'));
        }
        resolve({
          url: result.secure_url,
          publicId: result.public_id,
          width: result.width,
          height: result.height,
          format: result.format,
          bytes: result.bytes
        });
      }
    );

    uploadStream.end(buffer);
  });
};

/**
 * Delete an image asset from Cloudinary by its public ID.
 */
export const deleteCloudinaryImage = async (publicId: string): Promise<boolean> => {
  if (!isCloudinaryConfigured() || !publicId) return false;
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result.result === 'ok';
  } catch (err) {
    console.warn(`[Cloudinary] Failed to delete asset ${publicId}:`, err);
    return false;
  }
};
