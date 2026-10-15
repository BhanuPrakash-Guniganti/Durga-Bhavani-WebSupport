import React, { useState } from 'react';
import { Calendar, Image as ImageIcon, Sparkles } from 'lucide-react';
import { sampleHistoryMilestones } from '../data/sampleData';
import { SampleBadge } from '../components/common/SampleBadge';
import { Lightbox } from '../components/common/Lightbox';
import type { MediaPhoto } from '../types';

export const HistoryPage: React.FC = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);

  // Convert milestone images into MediaPhoto format for lightbox viewer
  const milestonePhotos: MediaPhoto[] = sampleHistoryMilestones
    .filter((m) => !!m.imageUrl)
    .map((m) => ({
      id: m.id,
      url: m.imageUrl!,
      caption: `${m.title} (${m.yearOrDate})`,
      altText: m.title,
      photographerCredit: 'Temple Committee Archives (Sample)',
      isSample: true
    }));

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
          <span className="sub-heading">Sacred Milestones</span>
          <h1>History of Sri Durga Bhavani Temple</h1>
          <p>
            Dodlapahad's cultural journey, temple foundations, and the evolution of our annual
            celebrations over the decades.
          </p>
          <div style={{ marginTop: 'var(--space-3)' }}>
            <SampleBadge label="Sample Historical Records - Awaiting Official Verification" />
          </div>
        </div>

        {/* Historical Introduction Banner */}
        <div className="card card-cultural-top" style={{ padding: 'var(--space-6)', maxWidth: '900px', margin: '0 auto var(--space-12) auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: 'var(--space-2)' }}>
            <Sparkles size={20} color="var(--color-gold-primary)" />
            <h2 style={{ fontSize: 'var(--font-size-xl)', margin: 0 }}>
              Preserving Our Heritage
            </h2>
          </div>
          <p>
            The worship of Sri Durga Bhavani has been central to the spiritual and communal life of Dodlapahad.
            Generations of villagers have contributed their time, resources, and reverence to keep these sacred
            traditions alive.
          </p>
          <p style={{ margin: 0, fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)' }}>
            <em>Note: The milestones below illustrate the interactive timeline layout. Exact founding dates, names of
            founding elders, and authentic historical documentation will be incorporated once verified by the organizing
            committee.</em>
          </p>
        </div>

        {/* Chronological Timeline */}
        <div className="timeline">
          {sampleHistoryMilestones.map((item) => (
            <div key={item.id} className="timeline-item">
              <div className="timeline-dot" aria-hidden="true" />
              <div className="card" style={{ padding: 'var(--space-5)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-2)' }}>
                  <span className="badge badge-gold" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    <Calendar size={12} />
                    <span>{item.yearOrDate}</span>
                  </span>
                  <SampleBadge size="sm" />
                </div>

                <h3 style={{ fontSize: 'var(--font-size-lg)', marginBottom: 'var(--space-2)' }}>
                  {item.title}
                </h3>

                <p style={{ fontSize: 'var(--font-size-sm)', marginBottom: item.imageUrl ? 'var(--space-3)' : 0 }}>
                  {item.description}
                </p>

                {item.imageUrl && (
                  <div
                    style={{ position: 'relative', cursor: 'pointer', borderRadius: 'var(--radius-md)', overflow: 'hidden', maxHeight: '180px' }}
                    onClick={() => handleOpenPhoto(item.imageUrl!)}
                    title="Click to view full photo in lightbox"
                  >
                    <img
                      src={item.imageUrl}
                      alt={item.title}
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
                        <ImageIcon size={12} /> Click to enlarge
                      </span>
                      <span>Sample Photo</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
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
