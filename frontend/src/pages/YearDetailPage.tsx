import React from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Calendar,
  Image as ImageIcon,
  ArrowLeft,
  CheckCircle,
  Video,
  Sparkles
} from 'lucide-react';
import { sampleYears, sampleAlbums, sampleEvents } from '../data/sampleData';
import { SampleBadge } from '../components/common/SampleBadge';
import { EmptyState } from '../components/common/EmptyState';

export const YearDetailPage: React.FC = () => {
  const { year } = useParams<{ year: string }>();
  const yearNumber = parseInt(year || '2024', 10);

  const yearRecord = sampleYears.find((y) => y.year === yearNumber);
  const yearAlbums = sampleAlbums.filter((a) => a.year === yearNumber);
  const yearEvents = sampleEvents.filter((e) => e.year === yearNumber);

  if (!yearRecord) {
    return (
      <div className="section">
        <div className="container">
          <EmptyState
            title={`Year ${year} not found`}
            description="We could not find any published archives for this celebration year."
            actionLabel="Return to Year Archives"
            actionLink="/years"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="section">
      <div className="container">
        {/* Breadcrumb / Back Link */}
        <div style={{ marginBottom: 'var(--space-6)' }}>
          <Link to="/years" className="btn btn-secondary btn-sm" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <ArrowLeft size={16} />
            <span>Back to All Years</span>
          </Link>
        </div>

        {/* Year Banner Card */}
        <div className="card card-cultural-top" style={{ padding: 'var(--space-8)', marginBottom: 'var(--space-10)' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '8px', marginBottom: 'var(--space-3)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="badge badge-maroon" style={{ fontSize: 'var(--font-size-base)', padding: '4px 12px' }}>
                Navaratri Festival {yearRecord.year}
              </span>
              <span className="badge badge-gold">Published Archive</span>
            </div>
            <SampleBadge />
          </div>

          <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', marginBottom: 'var(--space-3)' }}>
            {yearRecord.title}
          </h1>

          <p style={{ fontSize: 'var(--font-size-base)', maxWidth: '900px', lineHeight: 1.7, marginBottom: 'var(--space-4)' }}>
            {yearRecord.description}
          </p>

          {yearRecord.startDate && (
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', background: 'var(--color-cream-alt)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border-subtle)', fontSize: 'var(--font-size-sm)' }}>
              <Calendar size={16} color="var(--color-maroon-primary)" />
              <span>
                <strong>Celebration Dates:</strong> {yearRecord.startDate} to {yearRecord.endDate}
              </span>
            </div>
          )}
        </div>

        {/* Festival Highlights */}
        {yearRecord.highlights && yearRecord.highlights.length > 0 && (
          <div className="card" style={{ padding: 'var(--space-6)', marginBottom: 'var(--space-10)', borderLeft: '4px solid var(--color-gold-primary)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: 'var(--space-3)' }}>
              <Sparkles size={20} color="var(--color-gold-dark)" />
              <h2 style={{ fontSize: 'var(--font-size-xl)', margin: 0 }}>
                Festival Highlights & Rituals
              </h2>
            </div>
            <ul style={{ listStyle: 'none', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-3)' }}>
              {yearRecord.highlights.map((highlight, index) => (
                <li key={index} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', fontSize: 'var(--font-size-sm)' }}>
                  <CheckCircle size={18} color="var(--color-maroon-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Photo Albums for this Year */}
        <div style={{ marginBottom: 'var(--space-12)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-6)' }}>
            <div>
              <span className="sub-heading" style={{ fontSize: 'var(--font-size-xs)' }}>Galleries</span>
              <h2 style={{ margin: 0 }}>Photo Albums ({yearAlbums.length})</h2>
            </div>
          </div>

          {yearAlbums.length === 0 ? (
            <div className="card" style={{ padding: 'var(--space-6)', textAlign: 'center' }}>
              <p style={{ margin: 0 }}>No photo albums currently associated with {yearRecord.year}.</p>
            </div>
          ) : (
            <div className="grid-3">
              {yearAlbums.map((album) => (
                <article key={album.id} className="card card-gold-top">
                  <div className="card-media">
                    <img src={album.coverImage} alt={album.title} loading="lazy" />
                  </div>
                  <div className="card-body">
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span className="badge badge-gold">{album.photoCount} Photos</span>
                      <SampleBadge size="sm" />
                    </div>
                    <h3>{album.title}</h3>
                    <p style={{ fontSize: 'var(--font-size-sm)', flex: 1 }}>
                      {album.description}
                    </p>
                  </div>
                  <div className="card-footer">
                    <Link to={`/albums/${album.slug}`} className="btn btn-primary btn-sm">
                      <ImageIcon size={14} />
                      <span>Open Album</span>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>

        {/* Approved Video Embed Showcase */}
        <div style={{ marginBottom: 'var(--space-10)' }}>
          <div className="section-header" style={{ textAlign: 'left', marginBottom: 'var(--space-4)' }}>
            <span className="sub-heading">Video Highlights</span>
            <h2>Festival Video Presentation</h2>
            <p>
              Sample video player demonstration for approved public festival recordings.
            </p>
          </div>

          <div className="card" style={{ padding: 'var(--space-5)', background: 'var(--color-maroon-dark)', color: '#FFF' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: 'var(--space-3)' }}>
              <Video size={18} color="var(--color-gold-light)" />
              <span style={{ fontWeight: 600, fontSize: 'var(--font-size-sm)', color: 'var(--color-gold-light)' }}>
                Sample Video Showcase: Dodlapahad Shobha Yatra {yearRecord.year}
              </span>
            </div>
            <div style={{ position: 'relative', width: '100%', aspectRatio: '16 / 9', background: '#1A0202', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--color-gold-border)' }}>
              <div style={{ textAlign: 'center', padding: 'var(--space-4)' }}>
                <span style={{ fontSize: '3rem', display: 'block', marginBottom: '8px' }}>▶️</span>
                <p style={{ margin: 0, fontWeight: 600, color: '#FFE082' }}>
                  YouTube Video Integration Demonstration
                </p>
                <p style={{ fontSize: 'var(--font-size-xs)', color: '#D6C8B8', margin: '4px 0 0 0' }}>
                  Official festival video embeds will be streamed here without loading backend server bandwidth.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Associated Year Events */}
        {yearEvents.length > 0 && (
          <div>
            <h2 style={{ marginBottom: 'var(--space-4)' }}>Events Conducted in {yearRecord.year}</h2>
            <div className="grid-2">
              {yearEvents.map((evt) => (
                <div key={evt.id} className="card" style={{ padding: 'var(--space-5)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}>
                    <span className="badge badge-maroon">{evt.status.toUpperCase()}</span>
                    <SampleBadge size="sm" />
                  </div>
                  <h3>{evt.title}</h3>
                  <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)' }}>
                    📍 {evt.location} · 🗓️ {evt.startDate}
                  </p>
                  <p style={{ fontSize: 'var(--font-size-sm)', margin: 0 }}>
                    {evt.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
