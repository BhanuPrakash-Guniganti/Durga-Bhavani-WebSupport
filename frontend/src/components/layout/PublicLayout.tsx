import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { ErrorBoundary } from '../common/ErrorBoundary';

export const PublicLayout: React.FC = () => {
  const { pathname } = useLocation();

  // Scroll to top upon navigating to a new route without forced synchronous reflow
  useEffect(() => {
    const frameId = requestAnimationFrame(() => {
      try {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      } catch {
        window.scrollTo(0, 0);
      }
    });
    return () => cancelAnimationFrame(frameId);
  }, [pathname]);

  return (
    <div id="top" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Main Navigation */}
      <Navbar />

      {/* Main Content Area guarded by Error Boundary */}
      <main id="main-content" className="page-wrapper" tabIndex={-1}>
        <ErrorBoundary sectionName="Public Layout">
          <Outlet />
        </ErrorBoundary>
      </main>

      {/* Site Footer */}
      <Footer />
    </div>
  );
};

export default PublicLayout;
