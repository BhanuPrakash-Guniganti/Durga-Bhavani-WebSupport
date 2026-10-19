import React from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  Image,
  ArrowRight,
  MapPin,
  Clock,
  Sparkles,
  Users,
  Heart,
  ChevronRight
} from 'lucide-react';
import {
  sampleYears,
  sampleAlbums,
  sampleEvents,
  sampleAnnouncements
} from '../data/sampleData';
import { useAppLanguage } from '../i18n';

export const HomePage: React.FC = () => {
  const { t, getLocalized } = useAppLanguage();
  const latestYear = sampleYears[0];
  const featuredAlbums = sampleAlbums.slice(0, 3);
  const featuredAnnouncements = sampleAnnouncements.slice(0, 4);
  const upcomingEvents = sampleEvents.slice(0, 2);

  return (
    <>
      {/* 1. Hero Section */}
      <section className="hero-section" aria-labelledby="hero-heading">
        <div className="hero-ornament-bg" />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="hero-diya-badge">
            <span>🪔</span>
            <span>{t('nav.portalSubtitle')}</span>
          </div>

          <h1 id="hero-heading" className="hero-title">
            {t('nav.portalTitle')}
          </h1>

          <p className="hero-subtitle">
            {t('home.heroSub')}
          </p>

          <div className="hero-actions">
            <Link to="/years" className="btn btn-gold">
              <Calendar size={18} />
              <span>{t('home.exploreYears')}</span>
            </Link>
            <Link to="/about" className="btn btn-outline-gold">
              <span>{t('home.aboutSamiti')}</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Welcome & Introduction Section */}
      <section className="section" aria-labelledby="intro-heading">
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'center', gap: 'var(--space-10)' }}>
            <div>
              <div className="section-header" style={{ textAlign: 'left', marginBottom: 'var(--space-4)' }}>
                <span className="sub-heading">{t('home.legacySub')}</span>
                <h2 id="intro-heading">{t('home.sacredTradition')}</h2>
              </div>
              <p>
                {t('home.samitiIntro1')}
              </p>
              <p>
                {t('home.samitiIntro2')}
              </p>
              <div style={{ marginTop: 'var(--space-6)', display: 'flex', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
                <Link to="/history" className="btn btn-primary">
                  <Clock size={16} />
                  <span>{t('home.viewTimeline')}</span>
                </Link>
                <Link to="/contact" className="btn btn-secondary">
                  <MapPin size={16} />
                  <span>{t('home.visitingInfo')}</span>
                </Link>
              </div>
            </div>

            {/* Cultural Card */}
            <div className="card card-cultural-top">
              <div className="card-media">
                <img
                  src={latestYear.coverImage}
                  alt={getLocalized(latestYear.title)}
                  loading="lazy"
                  onError={(e) => {
                    const target = e.currentTarget as HTMLImageElement;
                    if (!target.src.includes('cover-devi-alankaranalu')) {
                      target.src = '/images/covers/cover-devi-alankaranalu.webp';
                    }
                  }}
                />
              </div>
              <div className="card-body">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-2)' }}>
                  <span className="badge badge-saffron">{t('home.latestPublishedYear')}</span>
                </div>
                <h3>{getLocalized(latestYear.title)}</h3>
                <p style={{ fontSize: 'var(--font-size-sm)' }}>
                  {getLocalized(latestYear.description)}
                </p>
                <Link
                  to={`/years/${latestYear.year}`}
                  className="btn btn-secondary btn-sm"
                  style={{ alignSelf: 'flex-start', marginTop: 'auto' }}
                >
                  <span>{t('home.browseFestivalContent', { year: latestYear.year })}</span>
                  <ChevronRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Featured Photo Albums Section */}
      <section className="section section-alt" aria-labelledby="albums-heading">
        <div className="container">
          <div className="section-header">
            <span className="sub-heading">{t('home.visualMemories')}</span>
            <h2 id="albums-heading">{t('home.selectedAlbums')}</h2>
            <p>{t('home.selectedAlbumsDesc')}</p>
          </div>

          <div className="grid-3">
            {featuredAlbums.map((album) => {
              const albumTitle = getLocalized(album.title);
              const albumDesc = getLocalized(album.description);

              return (
                <article key={album.id} className="card card-gold-top">
                  <div className="card-media">
                    <img
                      src={album.coverImage}
                      alt={albumTitle}
                      loading="lazy"
                      onError={(e) => {
                        const target = e.currentTarget as HTMLImageElement;
                        if (!target.src.includes('cover-devi-alankaranalu')) {
                          target.src = '/images/covers/cover-devi-alankaranalu.webp';
                        }
                      }}
                    />
                  </div>
                  <div className="card-body">
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span className="badge badge-maroon">{t('years.yearCardBadge', { year: album.year })}</span>
                      <span className="badge badge-gold">{t('years.albumsCount', { count: album.photoCount })}</span>
                    </div>
                    <h3>{albumTitle}</h3>
                    <p style={{ fontSize: 'var(--font-size-sm)', flex: 1 }}>
                      {albumDesc}
                    </p>
                  </div>
                  <div className="card-footer" style={{ justifyContent: 'flex-end' }}>
                    <Link to={`/albums/${album.slug}`} className="btn btn-primary btn-sm">
                      <Image size={14} />
                      <span>{t('home.viewAlbum')}</span>
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>

          <div style={{ textAlign: 'center', marginTop: 'var(--space-8)' }}>
            <Link to="/years" className="btn btn-secondary">
              <span>{t('home.viewAllAlbums')}</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Announcements & Upcoming Events Grid */}
      <section className="section" aria-labelledby="updates-heading">
        <div className="container">
          <div className="grid-2" style={{ gap: 'var(--space-10)' }}>
            {/* Left: Recent Announcements */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-4)' }}>
                <div>
                  <span className="sub-heading" style={{ fontSize: 'var(--font-size-xs)' }}>{t('home.officialNotices')}</span>
                  <h2 id="updates-heading" style={{ fontSize: 'var(--font-size-2xl)', margin: 0 }}>
                    {t('home.recentAnnouncements')}
                  </h2>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                {featuredAnnouncements.map((item) => {
                  const annTitle = getLocalized(item.title);
                  const annContent = getLocalized(item.content);

                  return (
                    <div key={item.id} className="card" style={{ padding: 'var(--space-4)', borderLeft: '4px solid var(--color-saffron-primary)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-2)' }}>
                        <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>
                          {t('announcements.publishedOn', { date: item.publishedAt })}
                        </span>
                        {item.featured && <span className="badge badge-saffron">{t('announcements.featuredBadge')}</span>}
                      </div>
                      <h3 style={{ fontSize: 'var(--font-size-lg)', marginBottom: 'var(--space-2)' }}>
                        {annTitle}
                      </h3>
                      <p style={{ fontSize: 'var(--font-size-sm)', margin: 0, lineHeight: 1.6 }}>
                        {annContent}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right: Upcoming Events */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-4)' }}>
                <div>
                  <span className="sub-heading" style={{ fontSize: 'var(--font-size-xs)' }}>{t('home.templeCalendar')}</span>
                  <h2 style={{ fontSize: 'var(--font-size-2xl)', margin: 0 }}>
                    {t('home.upcomingEvents')}
                  </h2>
                </div>
                <Link to="/years" className="btn btn-secondary btn-sm">
                  <span>{t('home.exploreYears')}</span>
                  <ArrowRight size={14} />
                </Link>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                {upcomingEvents.map((evt) => {
                  const evtTitle = getLocalized(evt.title);
                  const evtDesc = getLocalized(evt.description);
                  const evtLocation = getLocalized(evt.location);

                  return (
                    <div key={evt.id} className="card" style={{ padding: 'var(--space-4)', borderLeft: '4px solid var(--color-gold-primary)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-2)' }}>
                        <span className="badge badge-gold">
                          {evt.status === 'upcoming' ? t('events.statusUpcoming') : t('events.statusPast')}
                        </span>
                      </div>
                      <h3 style={{ fontSize: 'var(--font-size-lg)', marginBottom: 'var(--space-2)' }}>
                        {evtTitle}
                      </h3>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-2)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <Calendar size={13} color="var(--color-maroon-primary)" />
                          <span>{t('events.date')}: {evt.startDate}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <MapPin size={13} color="var(--color-maroon-primary)" />
                          <span>{t('events.location')}: {evtLocation}</span>
                        </div>
                      </div>
                      <p style={{ fontSize: 'var(--font-size-sm)', margin: 0 }}>
                        {evtDesc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Community Seva & Values Section */}
      <section className="section section-alt" aria-labelledby="seva-heading">
        <div className="container">
          <div className="section-header">
            <span className="sub-heading">{t('home.sevaSub')}</span>
            <h2 id="seva-heading">{t('home.sevaHeading')}</h2>
            <p>{t('home.sevaDesc')}</p>
          </div>

          <div className="grid-3">
            <div className="card" style={{ padding: 'var(--space-6)', textAlign: 'center' }}>
              <div className="state-icon-wrapper" style={{ margin: '0 auto var(--space-4) auto', color: 'var(--color-saffron-primary)' }}>
                <Heart size={28} />
              </div>
              <h3 style={{ fontSize: 'var(--font-size-lg)' }}>{t('home.annadanamTitle')}</h3>
              <p style={{ fontSize: 'var(--font-size-sm)' }}>
                {t('home.annadanamDesc')}
              </p>
            </div>

            <div className="card" style={{ padding: 'var(--space-6)', textAlign: 'center' }}>
              <div className="state-icon-wrapper" style={{ margin: '0 auto var(--space-4) auto', color: 'var(--color-maroon-primary)' }}>
                <Users size={28} />
              </div>
              <h3 style={{ fontSize: 'var(--font-size-lg)' }}>{t('home.youthTitle')}</h3>
              <p style={{ fontSize: 'var(--font-size-sm)' }}>
                {t('home.youthDesc')}
              </p>
            </div>

            <div className="card" style={{ padding: 'var(--space-6)', textAlign: 'center' }}>
              <div className="state-icon-wrapper" style={{ margin: '0 auto var(--space-4) auto', color: 'var(--color-gold-dark)' }}>
                <Sparkles size={28} />
              </div>
              <h3 style={{ fontSize: 'var(--font-size-lg)' }}>{t('home.cultureTitle')}</h3>
              <p style={{ fontSize: 'var(--font-size-sm)' }}>
                {t('home.cultureDesc')}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
