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
          <Link to="/" className="navbar-brand" aria-label="Durga Bhavani Seva Samiti Home">
            <div className="brand-icon-wrapper" aria-hidden="true">
              <span className="brand-diya-icon">🪔</span>
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
          </nav>

          {/* Single Header Actions: Language Switcher + Mobile Toggle */}
          <div className="navbar-actions">
            <LanguageSwitcher />
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
