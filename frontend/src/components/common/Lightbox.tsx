import React, { useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, User, Image as ImageIcon } from 'lucide-react';
import type { MediaPhoto } from '../../types';

interface LightboxProps {
  photos: MediaPhoto[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (newIndex: number) => void;
}

export const Lightbox: React.FC<LightboxProps> = ({
  photos,
  currentIndex,
  isOpen,
  onClose,
  onNavigate
}) => {
  const currentPhoto = photos[currentIndex];

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      onNavigate(currentIndex - 1);
    } else {
      onNavigate(photos.length - 1); // Wrap to end
    }
  }, [currentIndex, photos.length, onNavigate]);

  const handleNext = useCallback(() => {
    if (currentIndex < photos.length - 1) {
      onNavigate(currentIndex + 1);
    } else {
      onNavigate(0); // Wrap to start
    }
  }, [currentIndex, photos.length, onNavigate]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose, handlePrev, handleNext]);

  if (!isOpen || !currentPhoto) return null;

  return (
    <div
      className="lightbox-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Photo Lightbox Viewer"
    >
      <div className="lightbox-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ImageIcon size={18} color="var(--color-gold-light)" />
          <span style={{ fontSize: 'var(--font-size-sm)', fontWeight: 600 }}>
            Photo {currentIndex + 1} of {photos.length}
          </span>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="drawer-close-btn"
          aria-label="Close Lightbox (Esc)"
        >
          <X size={20} />
        </button>
      </div>

      <div className="lightbox-content">
        {photos.length > 1 && (
          <button
            type="button"
            onClick={handlePrev}
            className="lightbox-nav-btn lightbox-nav-prev"
            aria-label="Previous photograph"
          >
            <ChevronLeft size={28} />
          </button>
        )}

        <img
          src={currentPhoto.url}
          alt={currentPhoto.altText || currentPhoto.caption}
          className="lightbox-image"
        />

        {photos.length > 1 && (
          <button
            type="button"
            onClick={handleNext}
            className="lightbox-nav-btn lightbox-nav-next"
            aria-label="Next photograph"
          >
            <ChevronRight size={28} />
          </button>
        )}
      </div>

      <div className="lightbox-footer">
        <p className="lightbox-caption">{currentPhoto.caption}</p>
        {currentPhoto.photographerCredit && (
          <p className="lightbox-credit" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
            <User size={12} />
            <span>Credit: {currentPhoto.photographerCredit}</span>
          </p>
        )}
      </div>
    </div>
  );
};
