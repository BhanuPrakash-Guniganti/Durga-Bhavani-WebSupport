import React, { useState } from 'react';
import { Calendar, Image as ImageIcon, Sparkles } from 'lucide-react';
import { sampleHistoryMilestones } from '../data/sampleData';
import { Lightbox } from '../components/common/Lightbox';
import { useAppLanguage } from '../i18n';
import type { MediaPhoto } from '../types';

export const HistoryPage: React.FC = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const { t, getLocalized } = useAppLanguage();

  // Convert milestone images into MediaPhoto format for lightbox viewer
  const milestonePhotos: MediaPhoto[] = sampleHistoryMilestones
    .filter((m) => !!m.imageUrl)
    .map((m) => {
      const localizedTitle = getLocalized(m.title);
      const localizedYear = getLocalized(m.yearOrDate);
      const displayCaption = localizedTitle.includes(localizedYear)
        ? localizedTitle
        : `${localizedTitle} (${localizedYear})`;

      return {
        id: m.id,
        url: m.imageUrl!,
        caption: displayCaption,
        altText: localizedTitle,
        photographerCredit: t('albums.photoCredit', { name: 'Utsav Committee Archives' }),
        isSample: true
      };
    });

  const handleOpenPhoto = (imageUrl: string) => {
    const idx = milestonePhotos.findIndex((p) => p.url === imageUrl);
    if (idx !== -1) {
      setActivePhotoIndex(idx);
      setLightboxOpen(true);
    }
  };

  return (
    <div className="section">
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <span className="sub-heading">{t('history.sub')}</span>
          <h1>{t('history.title')}</h1>
          <p>{t('history.desc')}</p>
        </div>

        {/* Historical Introduction Banner */}
        <div className="card card-cultural-top" style={{ padding: 'var(--space-6)', maxWidth: '900px', margin: '0 auto var(--space-12) auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: 'var(--space-2)' }}>
            <Sparkles size={20} color="var(--color-gold-primary)" />
            <h2 style={{ fontSize: 'var(--font-size-xl)', margin: 0 }}>
              {t('history.bannerTitle')}
            </h2>
          </div>
          <p>{t('history.bannerDesc')}</p>
          <p style={{ margin: 0, fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)' }}>
            <em>{t('history.bannerNote')}</em>
          </p>
        </div>

        {/* Chronological Timeline */}
        <div className="timeline">
          {sampleHistoryMilestones.map((item) => {
            const itemTitle = getLocalized(item.title);
            const itemYear = getLocalized(item.yearOrDate);
            const itemDesc = getLocalized(item.description);

            return (
              <div key={item.id} className="timeline-item">
                <div className="timeline-dot" aria-hidden="true" />
                <div className="card" style={{ padding: 'var(--space-5)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-2)' }}>
                    <span className="badge badge-gold" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                      <Calendar size={12} />
                      <span>{itemYear}</span>
                    </span>
                  </div>

                  <h3 style={{ fontSize: 'var(--font-size-lg)', marginBottom: 'var(--space-2)' }}>
                    {itemTitle}
                  </h3>

                  <p style={{ fontSize: 'var(--font-size-sm)', marginBottom: item.imageUrl ? 'var(--space-3)' : 0 }}>
                    {itemDesc}
                  </p>

                  {item.imageUrl && (
                    <div
                      style={{ position: 'relative', cursor: 'pointer', borderRadius: 'var(--radius-md)', overflow: 'hidden', maxHeight: '180px' }}
                      onClick={() => handleOpenPhoto(item.imageUrl!)}
                      title={t('history.clickToEnlarge')}
                    >
                      <img
                        src={item.imageUrl}
                        alt={itemTitle}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        loading="lazy"
                      />
                      <div
                        style={{
                          position: 'absolute',
                          bottom: 0,
                          insetInline: 0,
                          padding: '4px 8px',
                          background: 'rgba(0,0,0,0.6)',
                          color: '#FFF',
                          fontSize: '0.72rem',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between'
                        }}
                      >
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                          <ImageIcon size={12} /> {t('history.clickToEnlarge')}
                        </span>
                        <span>{t('history.samplePhoto')}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Accessible Photo Lightbox */}
      <Lightbox
        photos={milestonePhotos}
        currentIndex={activePhotoIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNavigate={(newIdx) => setActivePhotoIndex(newIdx)}
      />
    </div>
  );
};
