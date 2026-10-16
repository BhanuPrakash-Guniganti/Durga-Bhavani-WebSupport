import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Home, Search, Compass, Calendar } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="section" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center' }}>
      <div className="container" style={{ textAlign: 'center' }}>
        <div className="state-icon-wrapper" style={{ width: '80px', height: '80px', color: 'var(--color-maroon-primary)' }}>
          <Compass size={40} />
        </div>
        <span className="sub-heading">{t('common.pageNotFound')}</span>
        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: 'var(--color-maroon-dark)', marginBottom: 'var(--space-2)' }}>
          404 - {t('common.pageNotFound')}
        </h1>
        <p style={{ maxWidth: '500px', margin: '0 auto var(--space-8) auto', fontSize: 'var(--font-size-base)' }}>
          {t('common.pageNotFoundDesc')}
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 'var(--space-4)' }}>
          <Link to="/" className="btn btn-primary">
            <Home size={18} />
            <span>{t('common.returnHome')}</span>
          </Link>
          <Link to="/years" className="btn btn-secondary">
            <Calendar size={18} />
            <span>{t('nav.years')}</span>
          </Link>
          <Link to="/search" className="btn btn-secondary">
            <Search size={18} />
            <span>{t('nav.search')}</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

