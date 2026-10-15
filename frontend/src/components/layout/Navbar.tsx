import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, Search } from 'lucide-react';
import { MobileDrawer } from './MobileDrawer';

export const Navbar: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

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
              <span className="brand-title">Durga Bhavani</span>
              <span className="brand-subtitle">Seva Samiti · Dodlapahad</span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="nav-links-desktop" aria-label="Main Navigation">
            <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} end>
              Home
            </NavLink>
            <NavLink to="/about" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              About
            </NavLink>
            <NavLink to="/history" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              History
            </NavLink>
            <NavLink to="/years" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              Years
            </NavLink>
            <NavLink to="/events" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              Events
            </NavLink>
            <NavLink to="/announcements" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              Announcements
            </NavLink>
            <NavLink to="/contact" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              Contact
            </NavLink>
            <NavLink
              to="/search"
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              title="Search archives"
              aria-label="Search archives"
            >
              <Search size={16} />
            </NavLink>
          </nav>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="nav-toggle-btn"
            onClick={() => setDrawerOpen(true)}
            aria-label="Open mobile navigation menu"
            aria-expanded={drawerOpen}
          >
            <Menu size={22} />
          </button>
        </div>
      </header>

      {/* Slide-out Drawer for Mobile screens */}
      <MobileDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
};
