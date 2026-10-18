import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  FolderKanban,
  Flower2,
  Trophy,
  HeartHandshake,
  FileText,
  Globe,
  ExternalLink,
  ShieldCheck,
  Menu,
  X,
  LogOut,
  UserCheck,
  Database,
  CloudOff
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { useAppLanguage } from '../../i18n';

export const AdminLayout: React.FC = () => {
  const { user, logout } = useAuth();
  const { isBackendConnected } = useData();
  const { currentLang, toggleLanguage } = useAppLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileDrawerOpen(false);
  }, [location.pathname]);

  // Handle Escape key to close mobile drawer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileDrawerOpen) {
        setMobileDrawerOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileDrawerOpen]);

  // Lock body scroll when drawer is open on mobile
  useEffect(() => {
    if (mobileDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileDrawerOpen]);

  const navItems = [
    {
      to: '/admin',
      label: currentLang === 'te' ? 'డాష్‌బోర్డ్' : 'Dashboard',
      icon: <LayoutDashboard size={18} />,
      exact: true
    },
    {
      to: '/admin/albums',
      label: currentLang === 'te' ? '2025 ఆల్బమ్‌లు' : '2025 Albums',
      icon: <FolderKanban size={18} />
    },
    {
      to: '/admin/avatars',
      label: currentLang === 'te' ? 'అమ్మవారి అలంకరణలు' : 'Devi Alankaranalu',
      icon: <Flower2 size={18} />
    },
    {
      to: '/admin/auctions',
      label: currentLang === 'te' ? 'వేలం పాట రికార్డులు' : 'Auction Winners',
      icon: <Trophy size={18} />
    },
    {
      to: '/admin/donors',
      label: currentLang === 'te' ? 'దాతలు & స్పాన్సర్లు' : 'Donors & Sponsors',
      icon: <HeartHandshake size={18} />
    },
    {
      to: '/admin/audit-logs',
      label: currentLang === 'te' ? 'ఆడిట్ లాగ్స్' : 'Audit Logs',
      icon: <FileText size={18} />
    }
  ];

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  const renderNavLinks = (onItemClick?: () => void) => (
    <nav style={{ flex: 1, padding: 'var(--space-3) 0', overflowY: 'auto' }}>
      {navItems.map((item) => {
        const isActive = item.exact
          ? location.pathname === item.to
          : location.pathname.startsWith(item.to);
        return (
          <Link
            key={item.to}
            to={item.to}
            onClick={onItemClick}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 20px',
              color: isActive ? '#FFE082' : '#E0D6C8',
              background: isActive ? 'rgba(212, 175, 55, 0.18)' : 'transparent',
              borderLeft: isActive ? '4px solid var(--color-gold-primary)' : '4px solid transparent',
              textDecoration: 'none',
              fontSize: 'var(--font-size-sm)',
              fontWeight: isActive ? 600 : 400,
              transition: 'all 0.15s ease'
            }}
          >
            {item.icon}
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--color-cream-bg)', position: 'relative' }}>
      {/* 1. DESKTOP STICKY SIDEBAR (Hidden on screens <= 900px) */}
      <aside
        style={{
          width: '260px',
          background: 'var(--color-maroon-dark)',
          color: '#FFF',
          display: 'flex',
          flexDirection: 'column',
          borderRight: '2px solid var(--color-gold-dark)',
          position: 'sticky',
          top: 0,
          height: '100vh',
          zIndex: 40
        }}
        className="hide-mobile"
      >
        {/* Brand */}
        <div style={{ padding: 'var(--space-6)', borderBottom: '1px solid rgba(212, 175, 55, 0.3)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: 'var(--radius-full)',
                background: 'var(--color-gold-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-maroon-dark)',
                fontWeight: 700
              }}
            >
              🔱
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 'var(--font-size-sm)', color: '#FFE082' }}>
                {currentLang === 'te' ? 'ఆలయ అడ్మిన్ పోర్టల్' : 'Temple Admin Portal'}
              </div>
              <div style={{ fontSize: '11px', color: '#E0D6C8' }}>Dodlapahad Samiti</div>
            </div>
          </div>
        </div>

        {/* User Card */}
        <div style={{ padding: 'var(--space-3) var(--space-6)', background: 'rgba(0, 0, 0, 0.25)', borderBottom: '1px solid rgba(212, 175, 55, 0.2)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <ShieldCheck size={16} color="var(--color-gold-primary)" />
            <span style={{ fontSize: 'var(--font-size-xs)', fontWeight: 600, color: '#FFF' }}>
              {user?.name || user?.email}
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span className="badge" style={{ background: 'var(--color-maroon-primary)', color: '#FFF', fontSize: '10px', padding: '2px 6px' }}>
              {user?.role.toUpperCase()}
            </span>
            {isBackendConnected ? (
              <span title="Backend connected & shared across devices" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '10px', color: '#81C784' }}>
                <Database size={12} /> Live
              </span>
            ) : (
              <span title="Operating with local cache" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '10px', color: '#FFB74D' }}>
                <CloudOff size={12} /> Cache
              </span>
            )}
          </div>
        </div>

        {/* Desktop Nav Links */}
        {renderNavLinks()}

        {/* Bottom Actions */}
        <div style={{ padding: 'var(--space-4) var(--space-6)', borderTop: '1px solid rgba(212, 175, 55, 0.2)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <button
            type="button"
            onClick={toggleLanguage}
            className="btn btn-secondary btn-sm"
            style={{ width: '100%', justifyContent: 'center', gap: '6px', fontSize: '12px', padding: '6px 12px' }}
          >
            <Globe size={14} />
            <span>{currentLang === 'en' ? 'తెలుగులోకి మార్చండి' : 'Switch to English'}</span>
          </button>

          <Link
            to="/years/2025"
            target="_blank"
            className="btn btn-secondary btn-sm"
            style={{ width: '100%', justifyContent: 'center', gap: '6px', fontSize: '12px', padding: '6px 12px' }}
          >
            <ExternalLink size={14} />
            <span>{currentLang === 'te' ? '2025 పబ్లిక్ సైట్' : 'Public 2025 Site'}</span>
          </Link>

          <button
            type="button"
            onClick={handleLogout}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#FF8A80',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              fontSize: '12px',
              cursor: 'pointer',
              padding: '6px 0'
            }}
          >
            <LogOut size={14} />
            <span>{currentLang === 'te' ? 'లాగ్ అవుట్' : 'Log Out'}</span>
          </button>
        </div>
      </aside>

      {/* 2. MOBILE DRAWER OVERLAY & SLIDING DRAWER */}
      {mobileDrawerOpen && (
        <div
          className="admin-drawer-backdrop show-mobile"
          onClick={() => setMobileDrawerOpen(false)}
          aria-hidden="true"
        />
      )}

      {mobileDrawerOpen && (
        <aside
          className="admin-drawer show-mobile"
          role="dialog"
          aria-modal="true"
          aria-label={currentLang === 'te' ? 'నిర్వాహక నావిగేషన్ మెను' : 'Admin navigation menu'}
        >
          {/* Drawer Header with Close Button */}
          <div
            style={{
              padding: 'var(--space-4) var(--space-5)',
              borderBottom: '1px solid rgba(212, 175, 55, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: 'var(--radius-full)',
                  background: 'var(--color-gold-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-maroon-dark)',
                  fontWeight: 700
                }}
              >
                🔱
              </div>
              <div style={{ fontWeight: 700, fontSize: 'var(--font-size-sm)', color: '#FFE082' }}>
                {currentLang === 'te' ? 'అడ్మిన్ మెను' : 'Admin Menu'}
              </div>
            </div>

            {/* Clearly Visible Close Button */}
            <button
              type="button"
              onClick={() => setMobileDrawerOpen(false)}
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(212, 175, 55, 0.4)',
                borderRadius: 'var(--radius-md)',
                color: '#FFE082',
                cursor: 'pointer',
                padding: '6px 10px',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '12px'
              }}
              aria-label="Close navigation menu"
            >
              <X size={18} />
              <span>{currentLang === 'te' ? 'మూసివేయి' : 'Close'}</span>
            </button>
          </div>

          {/* User Badge */}
          <div style={{ padding: 'var(--space-3) var(--space-5)', background: 'rgba(0,0,0,0.25)', borderBottom: '1px solid rgba(212, 175, 55, 0.15)' }}>
            <div style={{ fontSize: 'var(--font-size-xs)', fontWeight: 600, color: '#FFF', marginBottom: '2px' }}>
              {user?.name || user?.email}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span className="badge" style={{ background: 'var(--color-maroon-primary)', color: '#FFF', fontSize: '10px', padding: '1px 6px' }}>
                {user?.role.toUpperCase()}
              </span>
              <span style={{ fontSize: '10px', color: isBackendConnected ? '#81C784' : '#FFB74D' }}>
                {isBackendConnected ? '● Online' : '○ Offline Cache'}
              </span>
            </div>
          </div>

          {/* Navigation Links inside Mobile Drawer */}
          {renderNavLinks(() => setMobileDrawerOpen(false))}

          {/* Drawer Footer Actions */}
          <div style={{ padding: 'var(--space-4) var(--space-5)', borderTop: '1px solid rgba(212, 175, 55, 0.2)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <button
              type="button"
              onClick={toggleLanguage}
              className="btn btn-secondary btn-sm"
              style={{ width: '100%', justifyContent: 'center', gap: '6px', fontSize: '12px', padding: '8px' }}
            >
              <Globe size={14} />
              <span>{currentLang === 'en' ? 'తెలుగులోకి మార్చండి' : 'Switch to English'}</span>
            </button>

            <Link
              to="/years/2025"
              target="_blank"
              onClick={() => setMobileDrawerOpen(false)}
              className="btn btn-gold btn-sm"
              style={{ width: '100%', justifyContent: 'center', gap: '6px', fontSize: '12px', padding: '8px' }}
            >
              <ExternalLink size={14} />
              <span>{currentLang === 'te' ? '2025 పబ్లిక్ సైట్' : 'Public 2025 Site'}</span>
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              style={{
                background: 'rgba(255, 82, 82, 0.15)',
                border: '1px solid #FF5252',
                borderRadius: 'var(--radius-md)',
                color: '#FF8A80',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                fontSize: '12px',
                cursor: 'pointer',
                padding: '8px'
              }}
            >
              <LogOut size={14} />
              <span>{currentLang === 'te' ? 'లాగ్ అవుట్' : 'Log Out'}</span>
            </button>
          </div>
        </aside>
      )}

      {/* 3. MAIN CONTENT VIEWPORT */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, width: '100%', overflowX: 'hidden' }}>
        {/* Top Navbar */}
        <header
          style={{
            height: '60px',
            background: 'var(--color-surface)',
            borderBottom: '1px solid var(--color-border-subtle)',
            padding: '0 var(--space-4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'sticky',
            top: 0,
            zIndex: 30
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {/* Mobile Menu Toggle Button with clear visual icon & tap area */}
            <button
              type="button"
              className="show-mobile"
              onClick={() => setMobileDrawerOpen(true)}
              style={{
                background: 'rgba(128, 0, 32, 0.08)',
                border: '1px solid var(--color-gold-dark)',
                borderRadius: 'var(--radius-md)',
                cursor: 'pointer',
                color: 'var(--color-maroon-primary)',
                padding: '8px 10px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                minHeight: '40px'
              }}
              aria-label="Open navigation menu"
              aria-expanded={mobileDrawerOpen}
            >
              <Menu size={20} />
              <span style={{ fontSize: '12px', fontWeight: 600 }}>
                {currentLang === 'te' ? 'మెను' : 'Menu'}
              </span>
            </button>

            <h1
              style={{
                fontSize: 'clamp(0.85rem, 3vw, 1.05rem)',
                margin: 0,
                fontWeight: 700,
                color: 'var(--color-maroon-primary)',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}
            >
              {currentLang === 'te' ? 'అడ్మిన్ పోర్టల్' : 'Admin Portal'}
            </h1>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              className="badge hide-mobile"
              style={{
                background: user?.role === 'super-admin' ? 'var(--color-maroon-primary)' : 'var(--color-gold-dark)',
                color: '#FFF',
                fontSize: '11px',
                padding: '4px 8px'
              }}
            >
              <UserCheck size={12} style={{ display: 'inline', marginRight: '4px' }} />
              {user?.role.toUpperCase()}
            </span>

            <button
              type="button"
              onClick={toggleLanguage}
              className="btn btn-secondary btn-sm"
              style={{ padding: '4px 10px', fontSize: '12px' }}
            >
              <Globe size={14} />
              <span>{currentLang === 'en' ? 'తెలుగు' : 'EN'}</span>
            </button>
          </div>
        </header>

        {/* Main Content Body - Responsive Padding across 320px to Desktop */}
        <main
          style={{
            flex: 1,
            padding: 'clamp(12px, 3vw, 32px)',
            maxWidth: '1400px',
            width: '100%',
            margin: '0 auto',
            boxSizing: 'border-box'
          }}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};
