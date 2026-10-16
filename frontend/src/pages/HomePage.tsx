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
import { SampleBadge } from '../components/common/SampleBadge';

export const HomePage: React.FC = () => {
  const latestYear = sampleYears[0];
  const featuredAlbums = sampleAlbums.slice(0, 3);
  const featuredAnnouncements = sampleAnnouncements.slice(0, 2);
  const upcomingEvents = sampleEvents.slice(0, 2);

  return (
    <>
      {/* 1. Hero Section */}
      <section className="hero-section" aria-labelledby="hero-heading">
        <div className="hero-ornament-bg" />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="hero-diya-badge">
            <span>🪔</span>
            <span>Sri Durga Bhavani Temple · Dodlapahad</span>
          </div>

          <h1 id="hero-heading" className="hero-title">
            Durga Bhavani Seva Samiti
          </h1>

          <p className="hero-subtitle">
            Preserving and presenting Dodlapahad's annual Sri Durga Bhavani Utsav celebrations, sacred traditions,
            photo & video archives, and community devotion.
          </p>

          <div className="hero-actions">
            <Link to="/years" className="btn btn-gold">
              <Calendar size={18} />
              <span>Explore Year Archives</span>
            </Link>
            <Link to="/about" className="btn btn-outline-gold">
              <span>About the Samiti</span>
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
                <span className="sub-heading">Cultural Legacy & Devotion</span>
                <h2 id="intro-heading">A Sacred Tradition of Dodlapahad</h2>
              </div>
              <p>
                The <strong>Durga Bhavani Seva Samiti, Dodlapahad</strong> was established to preserve,
                coordinate, and conduct the revered annual Sri Durga Bhavani Navaratri festival with devotion,
                unity, and community discipline.
              </p>
              <p>
                Each year, nine nights of divine worship, sacred Chandi Homams, cultural presentations, and
                community feeding (Annadanam) culminate in the grand Vijaya Dashami Shobha Yatra.
              </p>
              <div style={{ marginTop: 'var(--space-6)', display: 'flex', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
                <Link to="/history" className="btn btn-primary">
                  <Clock size={16} />
                  <span>View Utsav Timeline</span>
                </Link>
                <Link to="/contact" className="btn btn-secondary">
                  <MapPin size={16} />
                  <span>Visiting Info & Location</span>
                </Link>
              </div>
            </div>

            {/* Cultural Card */}
            <div className="card card-cultural-top">
              <div className="card-media">
                <img
                  src={latestYear.coverImage}
                  alt="Annual celebration representation"
                  loading="lazy"
                />
              </div>
              <div className="card-body">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-2)' }}>
                  <span className="badge badge-saffron">Latest Published Year</span>
                  <SampleBadge size="sm" />
                </div>
                <h3>{latestYear.title}</h3>
                <p style={{ fontSize: 'var(--font-size-sm)' }}>
                  {latestYear.description}
                </p>
                <Link
                  to={`/years/${latestYear.year}`}
                  className="btn btn-secondary btn-sm"
                  style={{ alignSelf: 'flex-start', marginTop: 'auto' }}
                >
                  <span>Browse {latestYear.year} Festival Content</span>
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
            <span className="sub-heading">Visual Memories</span>
            <h2 id="albums-heading">Selected Festival Photo Albums</h2>
            <p>
              Explore moments of joy, devotion, and community solidarity captured during our annual
              celebrations.
            </p>
          </div>

          <div className="grid-3">
            {featuredAlbums.map((album) => (
              <article key={album.id} className="card card-gold-top">
                <div className="card-media">
                  <img
                    src={album.coverImage}
                    alt={album.title}
                    loading="lazy"
                  />
                </div>
                <div className="card-body">
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span className="badge badge-maroon">Year {album.year}</span>
                    <span className="badge badge-gold">{album.photoCount} Photos</span>
                  </div>
                  <h3>{album.title}</h3>
                  <p style={{ fontSize: 'var(--font-size-sm)', flex: 1 }}>
                    {album.description}
                  </p>
                </div>
                <div className="card-footer">
                  <SampleBadge size="sm" />
                  <Link to={`/albums/${album.slug}`} className="btn btn-primary btn-sm">
                    <Image size={14} />
                    <span>View Album</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: 'var(--space-8)' }}>
            <Link to="/years" className="btn btn-secondary">
              <span>View All Albums by Year</span>
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
                  <span className="sub-heading" style={{ fontSize: 'var(--font-size-xs)' }}>Official Notices</span>
                  <h2 id="updates-heading" style={{ fontSize: 'var(--font-size-2xl)', margin: 0 }}>
                    Recent Announcements
                  </h2>
                </div>
                <Link to="/announcements" className="btn btn-secondary btn-sm">
                  <span>All Notices</span>
                  <ArrowRight size={14} />
                </Link>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                {featuredAnnouncements.map((item) => (
                  <div key={item.id} className="card" style={{ padding: 'var(--space-4)', borderLeft: '4px solid var(--color-saffron-primary)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-2)' }}>
                      <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>
                        Published: {item.publishedAt}
                      </span>
                      {item.featured && <span className="badge badge-saffron">Featured</span>}
                    </div>
                    <h3 style={{ fontSize: 'var(--font-size-lg)', marginBottom: 'var(--space-2)' }}>
                      {item.title}
                    </h3>
                    <p style={{ fontSize: 'var(--font-size-sm)', margin: 0 }}>
                      {item.content.slice(0, 140)}...
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Upcoming Events */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-4)' }}>
                <div>
                  <span className="sub-heading" style={{ fontSize: 'var(--font-size-xs)' }}>Temple Calendar</span>
                  <h2 style={{ fontSize: 'var(--font-size-2xl)', margin: 0 }}>
                    Upcoming & Recent Events
                  </h2>
                </div>
                <Link to="/events" className="btn btn-secondary btn-sm">
                  <span>View Calendar</span>
                  <ArrowRight size={14} />
                </Link>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                {upcomingEvents.map((evt) => (
                  <div key={evt.id} className="card" style={{ padding: 'var(--space-4)', borderLeft: '4px solid var(--color-gold-primary)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-2)' }}>
                      <span className="badge badge-gold">{evt.status.toUpperCase()}</span>
                      <SampleBadge size="sm" />
                    </div>
                    <h3 style={{ fontSize: 'var(--font-size-lg)', marginBottom: 'var(--space-2)' }}>
                      {evt.title}
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-2)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Calendar size={13} color="var(--color-maroon-primary)" />
                        <span>Date: {evt.startDate}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <MapPin size={13} color="var(--color-maroon-primary)" />
                        <span>Location: {evt.location}</span>
                      </div>
                    </div>
                    <p style={{ fontSize: 'var(--font-size-sm)', margin: 0 }}>
                      {evt.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Community Seva & Values Section */}
      <section className="section section-alt" aria-labelledby="seva-heading">
        <div className="container">
          <div className="section-header">
            <span className="sub-heading">Seva & Harmony</span>
            <h2 id="seva-heading">Community Activities & Social Harmony</h2>
            <p>
              Beyond ceremonial worship, Durga Bhavani Seva Samiti strives to strengthen fellowship,
              service, and cultural awareness in Dodlapahad.
            </p>
          </div>

          <div className="grid-3">
            <div className="card" style={{ padding: 'var(--space-6)', textAlign: 'center' }}>
              <div className="state-icon-wrapper" style={{ margin: '0 auto var(--space-4) auto', color: 'var(--color-saffron-primary)' }}>
                <Heart size={28} />
              </div>
              <h3 style={{ fontSize: 'var(--font-size-lg)' }}>Maha Annadanam</h3>
              <p style={{ fontSize: 'var(--font-size-sm)' }}>
                Providing wholesome consecrated meals to thousands of devotees and visitors during the
                nine sacred days of Navaratri without distinction.
              </p>
            </div>

            <div className="card" style={{ padding: 'var(--space-6)', textAlign: 'center' }}>
              <div className="state-icon-wrapper" style={{ margin: '0 auto var(--space-4) auto', color: 'var(--color-maroon-primary)' }}>
                <Users size={28} />
              </div>
              <h3 style={{ fontSize: 'var(--font-size-lg)' }}>Youth Volunteerism</h3>
              <p style={{ fontSize: 'var(--font-size-sm)' }}>
                Engaging local youth in cultural performances, palanquin coordination, crowd management,
                and digital media preservation.
              </p>
            </div>

            <div className="card" style={{ padding: 'var(--space-6)', textAlign: 'center' }}>
              <div className="state-icon-wrapper" style={{ margin: '0 auto var(--space-4) auto', color: 'var(--color-gold-dark)' }}>
                <Sparkles size={28} />
              </div>
              <h3 style={{ fontSize: 'var(--font-size-lg)' }}>Cultural Continuity</h3>
              <p style={{ fontSize: 'var(--font-size-sm)' }}>
                Encouraging traditional music, Kolatam folk dance, Vedic recitation, and festive ornamentation
                so village arts flourish for future generations.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
