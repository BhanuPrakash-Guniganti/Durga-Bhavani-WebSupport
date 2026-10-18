import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Calendar,
  Image as ImageIcon,
  ArrowLeft,
  CheckCircle,
  Video,
  Sparkles
} from 'lucide-react';
import { sampleEvents } from '../data/sampleData';
import { useData } from '../context/DataContext';
import { EmptyState } from '../components/common/EmptyState';
import { useAppLanguage, getLocalized, getLocalizedArray } from '../i18n';

export const YearDetailPage: React.FC = () => {
  const { year } = useParams<{ year: string }>();
  const yearNumber = parseInt(year || '2024', 10);
  const { t } = useTranslation();
  const { currentLang } = useAppLanguage();
  const { albums, years, avatars } = useData();

  const yearRecord = years.find((y) => y.year === yearNumber);
  const yearAlbums = albums.filter((a) => a.year === yearNumber && a.status === 'published');
  const yearEvents = sampleEvents.filter((e) => e.year === yearNumber);

  if (!yearRecord) {
    return (
      <div className="section">
        <div className="container">
          <EmptyState
            title={t('yearDetail.notFoundTitle', { year: year || '' })}
            description={t('yearDetail.notFoundDesc')}
            actionLabel={t('yearDetail.backToYears')}
            actionLink="/years"
          />
        </div>
      </div>
    );
  }

  const localizedTitle = getLocalized(yearRecord.title, currentLang);
  const localizedDesc = getLocalized(yearRecord.description, currentLang);
  const highlights = getLocalizedArray(yearRecord.highlights, currentLang);

  return (
    <div className="section">
      <div className="container">
        {/* Breadcrumb / Back Link */}
        <div style={{ marginBottom: 'var(--space-6)' }}>
          <Link to="/years" className="btn btn-secondary btn-sm" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <ArrowLeft size={16} />
            <span>{t('yearDetail.backToYears')}</span>
          </Link>
        </div>

        {/* Year Banner Card */}
        <div className="card card-cultural-top" style={{ padding: 'var(--space-8)', marginBottom: 'var(--space-10)' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '8px', marginBottom: 'var(--space-3)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="badge badge-maroon" style={{ fontSize: 'var(--font-size-base)', padding: '4px 12px' }}>
                {t('yearDetail.festivalYear', { year: yearRecord.year })}
              </span>
              <span className="badge badge-gold">{t('yearDetail.publishedArchive')}</span>
            </div>
          </div>

          <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', marginBottom: 'var(--space-3)' }}>
            {localizedTitle}
          </h1>

          <p style={{ fontSize: 'var(--font-size-base)', maxWidth: '900px', lineHeight: 1.7, marginBottom: 'var(--space-4)' }}>
            {localizedDesc}
          </p>

          {yearRecord.startDate && (
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', background: 'var(--color-cream-alt)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border-subtle)', fontSize: 'var(--font-size-sm)' }}>
              <Calendar size={16} color="var(--color-maroon-primary)" />
              <span>
                <strong>{currentLang === 'te' ? 'ఉత్సవ తేదీలు:' : 'Celebration Dates:'}</strong> {yearRecord.startDate} {currentLang === 'te' ? 'నుండి' : 'to'} {yearRecord.endDate}
              </span>
            </div>
          )}
        </div>

        {/* Festival Highlights */}
        {highlights && highlights.length > 0 && (
          <div className="card" style={{ padding: 'var(--space-6)', marginBottom: 'var(--space-10)', borderLeft: '4px solid var(--color-gold-primary)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: 'var(--space-3)' }}>
              <Sparkles size={20} color="var(--color-gold-dark)" />
              <h2 style={{ fontSize: 'var(--font-size-xl)', margin: 0 }}>
                {t('yearDetail.keyHighlights')}
              </h2>
            </div>
            <ul style={{ listStyle: 'none', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-3)' }}>
              {highlights.map((highlight, index) => (
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
              <span className="sub-heading" style={{ fontSize: 'var(--font-size-xs)' }}>
                {currentLang === 'te' ? 'ఛాయాచిత్రాలు' : 'Galleries'}
              </span>
              <h2 style={{ margin: 0 }}>{t('yearDetail.albumsHeading', { count: yearAlbums.length })}</h2>
            </div>
          </div>

          {yearAlbums.length === 0 ? (
            <div className="card" style={{ padding: 'var(--space-6)', textAlign: 'center' }}>
              <p style={{ margin: 0 }}>{t('yearDetail.noAlbums')}</p>
            </div>
          ) : (
            <div className="grid-3">
              {yearAlbums.map((album) => {
                const albumTitle = getLocalized(album.title, currentLang);
                const albumDesc = getLocalized(album.description, currentLang);
                const albumAvatarCount = avatars.filter(
                  (av) => av.albumSlug === album.slug || (!av.albumSlug && av.year === album.year)
                ).length || (album.year === 2025 ? 11 : 10);

                return (
                  <article key={album.id} className="card card-gold-top">
                    <div className="card-media">
                      <img src={album.coverImage} alt={albumTitle} loading="lazy" />
                    </div>
                    <div className="card-body">
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <span className="badge badge-gold">
                          {album.albumType === 'avatars'
                            ? (currentLang === 'te' ? `${albumAvatarCount} అమ్మవారి అవతారాలు` : `${albumAvatarCount} Daily Avatars`)
                            : album.albumType === 'auction'
                            ? (currentLang === 'te' ? 'వేలం పాట విజేతలు' : 'Auction Winners')
                            : album.albumType === 'donors'
                            ? (currentLang === 'te' ? 'దాతలు & స్పాన్సర్లు' : 'Donors & Sponsors')
                            : t('years.albumsCount', { count: album.photoCount })}
                        </span>
                      </div>
                      <h3>{albumTitle}</h3>
                      <p style={{ fontSize: 'var(--font-size-sm)', flex: 1 }}>
                        {albumDesc}
                      </p>
                    </div>
                    <div className="card-footer">
                      <Link to={`/albums/${album.slug}`} className="btn btn-primary btn-sm">
                        <ImageIcon size={14} />
                        <span>{t('home.viewAlbum')}</span>
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>

        {/* Approved Video Embed Showcase */}
        <div style={{ marginBottom: 'var(--space-10)' }}>
          <div className="section-header" style={{ textAlign: 'left', marginBottom: 'var(--space-4)' }}>
            <span className="sub-heading">{currentLang === 'te' ? 'వీడియో విశేషాలు' : 'Video Highlights'}</span>
            <h2>{currentLang === 'te' ? 'ఉత్సవ వీడియో ప్రదర్శన' : 'Festival Video Presentation'}</h2>
            <p>
              {currentLang === 'te'
                ? 'అధికారిక ఉత్సవ వీడియో రికార్డింగ్‌ల ప్రదర్శన.'
                : 'Official video player showcase for public festival recordings.'}
            </p>
          </div>

          <div className="card" style={{ padding: 'var(--space-5)', background: 'var(--color-maroon-dark)', color: '#FFF' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: 'var(--space-3)' }}>
              <Video size={18} color="var(--color-gold-light)" />
              <span style={{ fontWeight: 600, fontSize: 'var(--font-size-sm)', color: 'var(--color-gold-light)' }}>
                {currentLang === 'te'
                  ? `దొడ్లపహాడ్ శోభాయాత్ర ${yearRecord.year} ఉత్సవ వీడియో`
                  : `Video Showcase: Dodlapahad Shobha Yatra ${yearRecord.year}`}
              </span>
            </div>
            <div style={{ position: 'relative', width: '100%', aspectRatio: '16 / 9', background: '#1A0202', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--color-gold-border)' }}>
              <div style={{ textAlign: 'center', padding: 'var(--space-4)' }}>
                <span style={{ fontSize: '3rem', display: 'block', marginBottom: '8px' }}>▶️</span>
                <p style={{ margin: 0, fontWeight: 600, color: '#FFE082' }}>
                  {currentLang === 'te' ? 'యూట్యూబ్ వీడియో ప్రసారం' : 'YouTube Video Stream'}
                </p>
                <p style={{ fontSize: 'var(--font-size-xs)', color: '#D6C8B8', margin: '4px 0 0 0' }}>
                  {currentLang === 'te'
                    ? 'అధికారిక ఉత్సవ వీడియోలు సర్వర్ బ్యాండ్‌విడ్త్‌పై భారం పడకుండా ఇక్కడ ప్రసారం చేయబడతాయి.'
                    : 'Official festival video embeds will be streamed here without loading backend server bandwidth.'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Associated Year Events */}
        {yearEvents.length > 0 && (
          <div>
            <h2 style={{ marginBottom: 'var(--space-4)' }}>{t('yearDetail.eventsHeading', { year: yearRecord.year })}</h2>
            <div className="grid-2">
              {yearEvents.map((evt) => {
                const evtTitle = getLocalized(evt.title, currentLang);
                const evtDesc = getLocalized(evt.description, currentLang);
                const evtLoc = getLocalized(evt.location, currentLang);
                const isUpcoming = evt.status === 'upcoming';
                return (
                  <div key={evt.id} className="card" style={{ padding: 'var(--space-5)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}>
                      <span className="badge badge-maroon">
                        {isUpcoming ? t('events.statusUpcoming') : t('events.statusPast')}
                      </span>
                    </div>
                    <h3>{evtTitle}</h3>
                    <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)' }}>
                      📍 {evtLoc} · 🗓️ {evt.startDate}
                    </p>
                    <p style={{ fontSize: 'var(--font-size-sm)', margin: 0 }}>
                      {evtDesc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

