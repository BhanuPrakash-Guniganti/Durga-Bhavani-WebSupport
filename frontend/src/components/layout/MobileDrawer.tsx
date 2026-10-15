import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import {
  X,
  Home,
  Info,
  Clock,
  Calendar,
  Bell,
  Search,
  MapPin
} from 'lucide-react';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileDrawer: React.FC<MobileDrawerProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const navLinks = [
    { to: '/', label: 'Home', icon: <Home size={18} /> },
    { to: '/about', label: 'About Samiti', icon: <Info size={18} /> },
    { to: '/history', label: 'History & Timeline', icon: <Clock size={18} /> },
    { to: '/years', label: 'Year Archives', icon: <Calendar size={18} /> },
    { to: '/events', label: 'Events & Poojas', icon: <Calendar size={18} /> },
    { to: '/announcements', label: 'Announcements', icon: <Bell size={18} /> },
    { to: '/search', label: 'Search Archives', icon: <Search size={18} /> },
    { to: '/contact', label: 'Contact & Location', icon: <MapPin size={18} /> }
  ];

  return (
    <>
      <div
        className="drawer-backdrop"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className="drawer-panel"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation Drawer"
      >
        <div className="drawer-header">
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '0.95rem', color: '#FFF' }}>
              Durga Bhavani
            </span>
            <span style={{ fontSize: '0.72rem', color: 'var(--color-gold-primary)', letterSpacing: '0.06em' }}>
              Seva Samiti - Dodlapahad
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="drawer-close-btn"
            aria-label="Close navigation menu"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="drawer-nav">
          {navLinks.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onClose}
              className={({ isActive }) =>
                `drawer-link ${isActive ? 'active' : ''}`
              }
              end={item.to === '/'}
            >
              {item.icon}
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div style={{ marginTop: 'auto', padding: 'var(--space-4)', borderTop: '1px solid rgba(212, 175, 55, 0.2)' }}>
          <div style={{ padding: 'var(--space-3)', background: 'rgba(0,0,0,0.3)', borderRadius: 'var(--radius-md)', fontSize: 'var(--font-size-xs)', color: '#D6C8B8' }}>
            <p style={{ margin: 0, fontWeight: 500 }}>
              🏛️ Dedicated to Sri Durga Bhavani Temple, Dodlapahad.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
