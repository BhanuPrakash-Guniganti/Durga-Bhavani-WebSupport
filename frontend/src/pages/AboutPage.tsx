import React from 'react';
import { Link } from 'react-router-dom';
import { Target, Compass, Users, ShieldCheck, Heart, Award, ArrowRight } from 'lucide-react';
import { sampleSiteSettings } from '../data/sampleData';
import { SampleBadge } from '../components/common/SampleBadge';
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
          <div style={{ marginTop: 'var(--space-3)' }}>
            <SampleBadge label={t('about.sub')} />
          </div>
        </div>

        {/* Purpose & Overview */}
        <div className="grid-2" style={{ alignItems: 'center', gap: 'var(--space-10)', marginBottom: 'var(--space-12)' }}>
          <div>
            <h2>{t('about.purposeTitle')}</h2>
            <p>{t('about.purposeP1')}</p>
            <p>{t('about.purposeP2')}</p>
            <p>{t('about.purposeP3')}</p>
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

        {/* Mission and Vision Grid */}
        <div className="grid-2" style={{ gap: 'var(--space-8)', marginBottom: 'var(--space-12)' }}>
          <div className="card" style={{ padding: 'var(--space-6)', borderLeft: '4px solid var(--color-maroon-primary)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: 'var(--space-3)' }}>
              <div className="state-icon-wrapper" style={{ width: '44px', height: '44px', margin: 0, color: 'var(--color-maroon-primary)' }}>
                <Target size={22} />
              </div>
              <h3 style={{ margin: 0 }}>{t('about.mission')}</h3>
            </div>
            <p style={{ margin: 0 }}>
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
            <p style={{ margin: 0 }}>
              {getLocalized(sampleSiteSettings.vision)}
            </p>
          </div>
        </div>

        {/* Committee Transparency Note */}
        <div className="card" style={{ padding: 'var(--space-6)', backgroundColor: 'var(--color-cream-alt)', textAlign: 'center' }}>
          <h3 style={{ fontSize: 'var(--font-size-xl)', marginBottom: 'var(--space-2)' }}>
            {t('about.membersTitle')}
          </h3>
          <p style={{ maxWidth: '700px', margin: '0 auto var(--space-4) auto', fontSize: 'var(--font-size-sm)' }}>
            {t('about.membersDesc')}
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--space-4)' }}>
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
