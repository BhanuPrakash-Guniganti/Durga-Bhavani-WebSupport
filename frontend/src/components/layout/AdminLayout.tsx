import React, { useState } from 'react';
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
  UserCheck
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useAppLanguage } from '../../i18n';
import type { AdminUser } from '../../types';

export const AdminLayout: React.FC = () => {
  const { user, logout, login } = useAuth();
  const { currentLang, toggleLanguage } = useAppLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  const handleRoleChange = (role: AdminUser['role']) => {
    login(user?.email || 'admin@dodlapahad.org', role, user?.name);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--color-cream-bg)' }}>
      {/* Sidebar for Desktop */}
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

        {/* User Card & Role Switcher */}
        <div style={{ padding: 'var(--space-4) var(--space-6)', background: 'rgba(0, 0, 0, 0.25)', borderBottom: '1px solid rgba(212, 175, 55, 0.2)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <ShieldCheck size={16} color="var(--color-gold-primary)" />
            <span style={{ fontSize: 'var(--font-size-xs)', fontWeight: 600, color: '#FFF' }}>
              {user?.name || 'Admin User'}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '11px', color: '#D6C8B8' }}>Role:</span>
            <select
              value={user?.role || 'super-admin'}
              onChange={(e) => handleRoleChange(e.target.value as AdminUser['role'])}
              style={{
                fontSize: '11px',
                padding: '2px 6px',
                borderRadius: '4px',
                background: '#2B0404',
                color: '#FFE082',
                border: '1px solid var(--color-gold-dark)'
              }}
              title="Switch role for testing permissions"
            >
              <option value="super-admin">Super Admin</option>
              <option value="editor">Editor</option>
              <option value="media-manager">Media Manager</option>
            </select>
          </div>
        </div>

        {/* Nav Links */}
        <nav style={{ flex: 1, padding: 'var(--space-4) 0', overflowY: 'auto' }}>
          {navItems.map((item) => {
            const isActive = item.exact
              ? location.pathname === item.to
              : location.pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 24px',
                  color: isActive ? '#FFE082' : '#E0D6C8',
                  background: isActive ? 'rgba(212, 175, 55, 0.15)' : 'transparent',
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

      {/* Main Content Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {/* Top Navbar */}
        <header
          style={{
            height: '64px',
            background: 'var(--color-surface)',
            borderBottom: '1px solid var(--color-border-subtle)',
            padding: '0 var(--space-6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'sticky',
            top: 0,
            zIndex: 30
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              type="button"
              className="show-mobile"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--color-maroon-primary)'
              }}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <h1 style={{ fontSize: 'var(--font-size-base)', margin: 0, fontWeight: 700, color: 'var(--color-maroon-primary)' }}>
              {currentLang === 'te' ? 'శ్రీ దుర్గాభవాని సేవా సమితి - అడ్మిన్ డ్యాష్‌బోర్డ్' : 'Durga Bhavani Seva Samiti - Admin Dashboard'}
            </h1>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span
              className="badge"
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

        {/* Mobile Drawer Menu */}
        {mobileMenuOpen && (
          <div
            className="show-mobile"
            style={{
              position: 'fixed',
              top: '64px',
              left: 0,
              right: 0,
              bottom: 0,
              background: 'var(--color-maroon-dark)',
              zIndex: 50,
              padding: 'var(--space-6)',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-4)'
            }}
          >
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 16px',
                  color: '#FFE082',
                  textDecoration: 'none',
                  fontSize: 'var(--font-size-base)',
                  borderBottom: '1px solid rgba(212, 175, 55, 0.2)'
                }}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}

            <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <Link
                to="/years/2025"
                onClick={() => setMobileMenuOpen(false)}
                className="btn btn-gold btn-sm"
                style={{ justifyContent: 'center' }}
              >
                {currentLang === 'te' ? 'పబ్లిక్ 2025 సైట్ చూడండి' : 'View Public 2025 Site'}
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className="btn btn-secondary btn-sm"
                style={{ justifyContent: 'center' }}
              >
                {currentLang === 'te' ? 'లాగ్ అవుట్' : 'Log Out'}
              </button>
            </div>
          </div>
        )}

        {/* Main Content Body */}
        <main style={{ flex: 1, padding: 'var(--space-8)', maxWidth: '1400px', width: '100%', margin: '0 auto' }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};
