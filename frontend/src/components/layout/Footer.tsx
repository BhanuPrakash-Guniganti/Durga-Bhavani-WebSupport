import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Mail, Phone, Heart } from 'lucide-react';
import { sampleSiteSettings } from '../../data/sampleData';
import { useAppLanguage } from '../../i18n';

export const Footer: React.FC = () => {
  const { t, getLocalized, isTelugu } = useAppLanguage();

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
                  {t('nav.portalTitle')}
                </h3>
              </div>
              <p className="footer-desc">
                {isTelugu
                  ? 'దొడ్లపహాడ్, తెలంగాణ. వార్షిక నవరాత్రి ఉత్సవాలను నిర్వహించడానికి, గ్రామీణ సాంస్కృతిక వారసత్వాన్ని కాపాడటానికి మరియు భక్తితో సమాజ సేవ చేయడానికి అంకితమైన సంస్థ.'
                  : "Dodlapahad, Telangana. Dedicated to organizing the annual Navaratri Utsav celebrations, preserving village cultural heritage, and serving the community with devotion."}
              </p>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: 'var(--color-gold-light)', background: 'rgba(212, 175, 55, 0.1)', padding: '4px 10px', borderRadius: '4px', border: '1px solid rgba(212, 175, 55, 0.3)' }}>
                <span>{t('common.badgeDemonstration')}</span>
              </div>
            </div>

            {/* Col 2: Quick Links */}
            <div>
              <h4 className="footer-heading">{t('common.celebrations')}</h4>
              <ul className="footer-links">
                <li><Link to="/years">{t('nav.years')}</Link></li>
                <li><Link to="/years/2024">{isTelugu ? 'ఉత్సవం 2024 విశేషాలు' : 'Navaratri 2024 Highlights'}</Link></li>
                <li><Link to="/history">{t('nav.history')}</Link></li>
                <li><Link to="/events">{t('nav.events')}</Link></li>
                <li><Link to="/announcements">{t('nav.announcements')}</Link></li>
              </ul>
            </div>

            {/* Col 3: About & Search */}
            <div>
              <h4 className="footer-heading">{t('common.organization')}</h4>
              <ul className="footer-links">
                <li><Link to="/about">{t('nav.about')}</Link></li>
                <li><Link to="/search">{t('nav.search')}</Link></li>
                <li><Link to="/contact">{t('nav.contact')}</Link></li>
                <li><a href="#top">{t('common.backToTop')}</a></li>
              </ul>
            </div>

            {/* Col 4: Contact & Location */}
            <div>
              <h4 className="footer-heading">{t('common.templeLocation')}</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: 'var(--font-size-sm)', color: '#E8DFD5' }}>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <MapPin size={18} color="var(--color-gold-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span>{getLocalized(sampleSiteSettings.locationAddress)}</span>
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
            © {new Date().getFullYear()} {getLocalized(sampleSiteSettings.organizationName)}. {t('common.rightsReserved')}
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
            {isTelugu
              ? 'గ్రామ ప్రజల మరియు భక్తజనుల సేవలో'
              : 'Preserving cultural memory with'}{' '}
            <Heart size={12} color="#FFA726" fill="#FFA726" />
          </span>
        </div>
      </div>
    </footer>
  );
};
