import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, Search, ShieldCheck } from 'lucide-react';
import { MobileDrawer } from './MobileDrawer';
import { LanguageSwitcher } from '../common/LanguageSwitcher';
import { useAppLanguage } from '../../i18n';

export const Navbar: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { t } = useAppLanguage();

  return (
    <>
      <header className="navbar">
        <div className="navbar-inner">
          {/* Brand Logo & Title */}
          <Link to="/" className="navbar-brand">
            <div className="brand-icon-wrapper" aria-hidden="true">
              <span style={{ fontSize: '1.25rem' }}>🪔</span>
            </div>
            <div className="brand-text">
              <span className="brand-title">{t('nav.portalTitle')}</span>
              <span className="brand-subtitle">{t('nav.portalSubtitle')}</span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="nav-links-desktop" aria-label="Main Navigation">
            <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} end>
              {t('nav.home')}
            </NavLink>
            <NavLink to="/about" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              {t('nav.about')}
            </NavLink>
            <NavLink to="/history" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              {t('nav.history')}
            </NavLink>
            <NavLink to="/years" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              {t('nav.years')}
            </NavLink>
            <NavLink to="/events" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              {t('nav.events')}
            </NavLink>
            <NavLink to="/announcements" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              {t('nav.announcements')}
            </NavLink>
            <NavLink to="/contact" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              {t('nav.contact')}
            </NavLink>
            <NavLink
              to="/search"
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              title={t('nav.search')}
              aria-label={t('nav.search')}
            >
              <Search size={16} />
            </NavLink>
            <NavLink
              to="/admin"
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              title={t('admin.portalTitle')}
              aria-label={t('admin.portalTitle')}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}
            >
              <ShieldCheck size={16} />
              <span>Admin</span>
            </NavLink>
            {/* Desktop Language Switcher */}
            <div style={{ marginLeft: 'var(--space-2)' }}>
              <LanguageSwitcher />
            </div>
          </nav>

          {/* Header Mobile Actions: Language Switcher + Menu Toggle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ display: 'flex' }} className="mobile-header-lang">
              <LanguageSwitcher showIcon={false} />
            </div>
            <button
              type="button"
              className="nav-toggle-btn"
              onClick={() => setDrawerOpen(true)}
              aria-label={t('nav.menu')}
              aria-expanded={drawerOpen}
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>

      {/* Slide-out Drawer for Mobile screens */}
      <MobileDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
};
