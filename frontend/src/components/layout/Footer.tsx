import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Mail, Phone, Heart } from 'lucide-react';
import { sampleSiteSettings } from '../../data/sampleData';

export const Footer: React.FC = () => {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="container">
          <div className="footer-grid">
            {/* Col 1: About & Identity */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <span style={{ fontSize: '1.5rem' }}>🪔</span>
                <h3 className="footer-brand-title" style={{ margin: 0 }}>
                  Durga Bhavani Seva Samiti
                </h3>
              </div>
              <p className="footer-desc">
                Dodlapahad, Telangana. Dedicated to organizing the annual Navaratri Utsav celebrations,
                preserving village cultural heritage, and serving the community with devotion.
              </p>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: 'var(--color-gold-light)', background: 'rgba(212, 175, 55, 0.1)', padding: '4px 10px', borderRadius: '4px', border: '1px solid rgba(212, 175, 55, 0.3)' }}>
                <span>★ Sample Demonstration Portal</span>
              </div>
            </div>

            {/* Col 2: Quick Links */}
            <div>
              <h4 className="footer-heading">Celebrations</h4>
              <ul className="footer-links">
                <li><Link to="/years">Year Archives</Link></li>
                <li><Link to="/years/2024">Navaratri 2024 Highlights</Link></li>
                <li><Link to="/history">Utsav History & Timeline</Link></li>
                <li><Link to="/events">Events & Poojas</Link></li>
                <li><Link to="/announcements">Public Notices</Link></li>
              </ul>
            </div>

            {/* Col 3: About & Search */}
            <div>
              <h4 className="footer-heading">Organization</h4>
              <ul className="footer-links">
                <li><Link to="/about">About Samiti</Link></li>
                <li><Link to="/search">Search Archives</Link></li>
                <li><Link to="/contact">Contact Committee</Link></li>
                <li><a href="#top">Back to Top ↑</a></li>
              </ul>
            </div>

            {/* Col 4: Contact & Location */}
            <div>
              <h4 className="footer-heading">Temple Location</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: 'var(--font-size-sm)', color: '#E8DFD5' }}>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <MapPin size={18} color="var(--color-gold-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span>{sampleSiteSettings.locationAddress}</span>
                </div>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <Mail size={16} color="var(--color-gold-primary)" style={{ flexShrink: 0 }} />
                  <span>{sampleSiteSettings.contactEmail}</span>
                </div>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <Phone size={16} color="var(--color-gold-primary)" style={{ flexShrink: 0 }} />
                  <span>{sampleSiteSettings.contactPhone}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '8px' }}>
          <span>
            © {new Date().getFullYear()} Durga Bhavani Seva Samiti - Dodlapahad. All rights reserved.
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
            Preserving cultural memory with <Heart size={12} color="#FFA726" fill="#FFA726" /> for the village community.
          </span>
        </div>
      </div>
    </footer>
  );
};
