import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  ArrowLeft,
  Calendar,
  Image as ImageIcon,
  User,
  Share2,
  Check,
  Maximize2
} from 'lucide-react';
import { sampleAlbums } from '../data/sampleData';
import { Lightbox } from '../components/common/Lightbox';
import { SampleBadge } from '../components/common/SampleBadge';
import { EmptyState } from '../components/common/EmptyState';
import { useAppLanguage, getLocalized } from '../i18n';

export const AlbumDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const { t } = useTranslation();
  const { currentLang } = useAppLanguage();

  const album = sampleAlbums.find((a) => a.slug === slug);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  if (!album) {
    return (
      <div className="section">
        <div className="container">
          <EmptyState
            title={t('albums.notFoundTitle')}
            description={t('albums.notFoundDesc')}
            actionLabel={t('yearDetail.backToYears')}
            actionLink="/years"
          />
        </div>
      </div>
    );
  }

  const localizedTitle = getLocalized(album.title, currentLang);
  const localizedDesc = getLocalized(album.description, currentLang);

  return (
    <div className="section">
      <div className="container">
        {/* Navigation Breadcrumbs */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-6)', flexWrap: 'wrap', gap: '8px' }}>
          <Link to={`/years/${album.year}`} className="btn btn-secondary btn-sm" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <ArrowLeft size={16} />
            <span>{t('albums.backToYear', { year: album.year })}</span>
          </Link>

          <button
            type="button"
            onClick={handleShare}
            className="btn btn-secondary btn-sm"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
            title={currentLang === 'te' ? 'ఆల్బమ్ లింక్ కాపీ చేయండి' : 'Copy album share link'}
          >
            {copied ? <Check size={16} color="var(--color-success)" /> : <Share2 size={16} />}
            <span>
              {copied
                ? (currentLang === 'te' ? 'లింక్ కాపీ అయ్యింది!' : 'Link Copied!')
                : (currentLang === 'te' ? 'షేర్ చేయండి' : 'Share Album')}
            </span>
          </button>
        </div>

        {/* Album Header Banner */}
        <div className="card card-cultural-top" style={{ padding: 'var(--space-8)', marginBottom: 'var(--space-10)' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '8px', marginBottom: 'var(--space-3)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Link to={`/years/${album.year}`} className="badge badge-maroon" style={{ textDecoration: 'none' }}>
                <Calendar size={12} />
                <span>{t('yearDetail.festivalYear', { year: album.year })}</span>
              </Link>
              <span className="badge badge-gold">
                <ImageIcon size={12} />
                <span>{t('albums.allPhotos', { count: album.photos.length })}</span>
              </span>
            </div>
            <SampleBadge />
          </div>

          <h1 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', marginBottom: 'var(--space-3)' }}>
            {localizedTitle}
          </h1>

          <p style={{ fontSize: 'var(--font-size-base)', maxWidth: '850px', lineHeight: 1.7, margin: 0 }}>
            {localizedDesc}
          </p>
        </div>

        {/* Photo Gallery Grid */}
        <div style={{ marginBottom: 'var(--space-10)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
            <h2 style={{ fontSize: 'var(--font-size-2xl)', margin: 0 }}>
              {currentLang === 'te' ? 'ఉత్సవ ఛాయాచిత్రాలు' : 'Photographs'}
            </h2>
            <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>
              {t('albums.openPhoto')}
            </span>
          </div>

          <div className="grid-3" role="region" aria-label={localizedTitle}>
            {album.photos.map((photo, index) => {
              const photoCaption = getLocalized(photo.caption, currentLang);
              const photoAlt = getLocalized(photo.altText, currentLang) || photoCaption;
              return (
                <div
                  key={photo.id}
                  className="card card-hover"
                  style={{ cursor: 'pointer', overflow: 'hidden' }}
                  onClick={() => {
                    setActivePhotoIndex(index);
                    setLightboxOpen(true);
                  }}
                  tabIndex={0}
                  role="button"
                  aria-label={`${photoCaption} (${index + 1}/${album.photos.length})`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setActivePhotoIndex(index);
                      setLightboxOpen(true);
                    }
                  }}
                >
                  <div className="card-media" style={{ position: 'relative' }}>
                    <img src={photo.url} alt={photoAlt} loading="lazy" />
                    <div
                      style={{
                        position: 'absolute',
                        top: '8px',
                        right: '8px',
                        width: '32px',
                        height: '32px',
                        borderRadius: 'var(--radius-full)',
                        background: 'rgba(0,0,0,0.5)',
                        color: '#FFF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <Maximize2 size={16} />
                    </div>
                  </div>

                  <div className="card-body" style={{ padding: 'var(--space-4)' }}>
                    <p style={{ fontSize: 'var(--font-size-sm)', fontWeight: 500, color: 'var(--color-text-primary)', marginBottom: 'var(--space-2)' }}>
                      {photoCaption}
                    </p>

                    {photo.photographerCredit && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)' }}>
                        <User size={12} color="var(--color-maroon-primary)" />
                        <span>{t('albums.photoCredit', { name: photo.photographerCredit })}</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Lightbox Modal */}
        <Lightbox
          photos={album.photos}
          currentIndex={activePhotoIndex}
          isOpen={lightboxOpen}
          onClose={() => setLightboxOpen(false)}
          onNavigate={(newIdx) => setActivePhotoIndex(newIdx)}
        />
      </div>
    </div>
  );
};

