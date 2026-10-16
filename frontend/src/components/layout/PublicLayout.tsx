import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { AlertCircle } from 'lucide-react';
import { useAppLanguage } from '../../i18n';

export const PublicLayout: React.FC = () => {
  const { pathname } = useLocation();
  const { t } = useAppLanguage();

  // Scroll to top upon navigating to a new route
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div id="top" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Prominent Sample Data Disclaimer Banner */}
      <aside className="sample-data-banner" role="complementary" aria-label="Development Sample Notice">
        <AlertCircle size={15} color="var(--color-gold-light)" />
        <span>{t('nav.sampleBadge')}</span>
      </aside>

      {/* Main Navigation */}
      <Navbar />

      {/* Main Content Area */}
      <main id="main-content" className="page-wrapper" tabIndex={-1}>
        <Outlet />
      </main>

      {/* Site Footer */}
      <Footer />
    </div>
  );
};
