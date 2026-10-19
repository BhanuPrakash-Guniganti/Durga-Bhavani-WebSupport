import React from 'react';
import { Link } from 'react-router-dom';
import { Target, Compass, Users, ShieldCheck, Heart, Award, ArrowRight, Sparkles, MapPin, Mail, Phone } from 'lucide-react';
import { sampleSiteSettings } from '../data/sampleData';
import { useAppLanguage } from '../i18n';

export const AboutPage: React.FC = () => {
  const { t, getLocalized } = useAppLanguage();

  return (
    <div className="section">
      <div className="container">
        {/* Page Header */}
        <div className="section-header">
          <span className="sub-heading">{t('about.sub')}</span>
          <h1>{t('about.title')}</h1>
          <p>{t('about.intro')}</p>
        </div>

        {/* 1. Our Journey Since 2024 (Devotional Chronological Story) */}
        <div className="card card-cultural-top" style={{ padding: 'clamp(var(--space-6), 4vw, var(--space-10))', marginBottom: 'var(--space-12)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: 'var(--space-4)', borderBottom: '2px solid var(--color-gold-primary)', paddingBottom: 'var(--space-3)' }}>
            <span style={{ fontSize: '1.8rem' }}>🪔</span>
            <h2 style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2rem)', margin: 0, color: 'var(--color-maroon-dark)' }}>
              {t('about.journeyTitle')}
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', fontSize: 'var(--font-size-base)', lineHeight: 1.8, color: 'var(--color-text-primary)' }}>
            <p style={{ margin: 0 }}>
              {t('about.journeyP1')}
            </p>
            <p style={{ margin: 0 }}>
              {t('about.journeyP2')}
            </p>
            <p style={{ margin: 0 }}>
              {t('about.journeyP3')}
            </p>
            <p style={{ margin: 0 }}>
              {t('about.journeyP4')}
            </p>
            <p style={{ margin: 0 }}>
              {t('about.journeyP5')}
            </p>
            <p style={{ margin: 0 }}>
              {t('about.journeyP6')}
            </p>
          </div>

          {/* Guiding Spirit Highlight Banner */}
          <div
            style={{
              marginTop: 'var(--space-8)',
              padding: 'var(--space-6)',
              borderRadius: 'var(--radius-lg)',
              background: 'linear-gradient(135deg, rgba(255, 248, 235, 0.95) 0%, rgba(254, 243, 199, 0.8) 100%)',
              border: '1px solid var(--color-gold-primary)',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: 'var(--space-2)' }}>
              <Sparkles size={22} color="var(--color-gold-dark)" style={{ flexShrink: 0 }} />
              <h3 style={{ margin: 0, fontSize: 'var(--font-size-lg)', color: 'var(--color-maroon-dark)', fontWeight: 700 }}>
                {t('about.guidingSpiritTitle')}
              </h3>
            </div>
            <p style={{ margin: 0, fontSize: 'var(--font-size-base)', fontWeight: 600, color: 'var(--color-maroon-primary)', fontStyle: 'italic', lineHeight: 1.6 }}>
              &ldquo;{t('about.guidingSpiritText')}&rdquo;
            </p>
          </div>
        </div>

        {/* 2. Purpose & Core Responsibilities */}
        <div className="grid-2" style={{ alignItems: 'center', gap: 'var(--space-10)', marginBottom: 'var(--space-12)' }}>
          <div>
            <h2 style={{ fontSize: 'var(--font-size-2xl)', color: 'var(--color-maroon-dark)', marginBottom: 'var(--space-4)' }}>
              {t('about.purposeTitle')}
            </h2>
            <p style={{ lineHeight: 1.7 }}>{t('about.purposeP1')}</p>
            <p style={{ lineHeight: 1.7 }}>{t('about.purposeP2')}</p>
            <p style={{ lineHeight: 1.7 }}>{t('about.purposeP3')}</p>
          </div>

          <div className="card card-cultural-top" style={{ padding: 'var(--space-6)' }}>
            <h3 style={{ borderBottom: '2px solid var(--color-gold-primary)', paddingBottom: 'var(--space-2)', marginBottom: 'var(--space-4)' }}>
              {t('about.responsibilities')}
            </h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              <li style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <ShieldCheck size={20} color="var(--color-maroon-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>{t('about.resp1')}</span>
              </li>
              <li style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <Heart size={20} color="var(--color-saffron-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>{t('about.resp2')}</span>
              </li>
              <li style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <Users size={20} color="var(--color-gold-dark)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>{t('about.resp3')}</span>
              </li>
              <li style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <Award size={20} color="var(--color-maroon-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>{t('about.resp4')}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* 3. Mission and Vision Grid */}
        <div className="grid-2" style={{ gap: 'var(--space-8)', marginBottom: 'var(--space-12)' }}>
          <div className="card" style={{ padding: 'var(--space-6)', borderLeft: '4px solid var(--color-maroon-primary)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: 'var(--space-3)' }}>
              <div className="state-icon-wrapper" style={{ width: '44px', height: '44px', margin: 0, color: 'var(--color-maroon-primary)' }}>
                <Target size={22} />
              </div>
              <h3 style={{ margin: 0 }}>{t('about.mission')}</h3>
            </div>
            <p style={{ margin: 0, lineHeight: 1.7 }}>
              {getLocalized(sampleSiteSettings.mission)}
            </p>
          </div>

          <div className="card" style={{ padding: 'var(--space-6)', borderLeft: '4px solid var(--color-saffron-primary)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: 'var(--space-3)' }}>
              <div className="state-icon-wrapper" style={{ width: '44px', height: '44px', margin: 0, color: 'var(--color-saffron-primary)' }}>
                <Compass size={22} />
              </div>
              <h3 style={{ margin: 0 }}>{t('about.vision')}</h3>
            </div>
            <p style={{ margin: 0, lineHeight: 1.7 }}>
              {getLocalized(sampleSiteSettings.vision)}
            </p>
          </div>
        </div>

        {/* 4. Mandapam Location & Committee Contact Details */}
        <div className="card" style={{ padding: 'clamp(var(--space-6), 3vw, var(--space-8))', backgroundColor: 'var(--color-cream-alt)', border: '1px solid var(--color-border-subtle)' }}>
          <h3 style={{ fontSize: 'var(--font-size-xl)', marginBottom: 'var(--space-2)', textAlign: 'center', color: 'var(--color-maroon-dark)' }}>
            {t('about.membersTitle')}
          </h3>
          <p style={{ maxWidth: '700px', margin: '0 auto var(--space-6) auto', fontSize: 'var(--font-size-sm)', textAlign: 'center' }}>
            {t('about.membersDesc')}
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
            {/* Address */}
            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', padding: 'var(--space-4)', background: '#FFFFFF', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border-subtle)' }}>
              <MapPin size={22} color="var(--color-maroon-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <strong style={{ display: 'block', color: 'var(--color-maroon-dark)', fontSize: 'var(--font-size-sm)' }}>
                  {t('about.mandapamAddressLabel')}:
                </strong>
                <span style={{ fontSize: 'var(--font-size-sm)', lineHeight: 1.6 }}>
                  {getLocalized(sampleSiteSettings.locationAddress)}
                </span>
              </div>
            </div>

            {/* Email & Phone Links */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', padding: 'var(--space-4)', background: '#FFFFFF', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border-subtle)' }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <Mail size={18} color="var(--color-maroon-primary)" style={{ flexShrink: 0 }} />
                <div style={{ fontSize: 'var(--font-size-sm)' }}>
                  <span style={{ color: 'var(--color-text-muted)', display: 'block' }}>{t('contact.emailTitle')}:</span>
                  <a
                    href={`mailto:${sampleSiteSettings.contactEmail}`}
                    style={{ color: 'var(--color-maroon-primary)', fontWeight: 600, wordBreak: 'break-all' }}
                  >
                    {sampleSiteSettings.contactEmail}
                  </a>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <Phone size={18} color="var(--color-maroon-primary)" style={{ flexShrink: 0 }} />
                <div style={{ fontSize: 'var(--font-size-sm)' }}>
                  <span style={{ color: 'var(--color-text-muted)', display: 'block' }}>{t('about.phoneNumbersLabel')}:</span>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 14px', marginTop: '2px' }}>
                    <a href="tel:9491377750" style={{ color: 'var(--color-maroon-primary)', fontWeight: 600 }}>
                      9491377750
                    </a>
                    <span style={{ color: 'var(--color-border)' }}>|</span>
                    <a href="tel:9440790378" style={{ color: 'var(--color-maroon-primary)', fontWeight: 600 }}>
                      94407 90378
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
            <Link to="/contact" className="btn btn-primary btn-sm">
              <span>{t('about.contactCommittee')}</span>
              <ArrowRight size={14} />
            </Link>
            <Link to="/history" className="btn btn-secondary btn-sm">
              <span>{t('about.viewMilestones')}</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
