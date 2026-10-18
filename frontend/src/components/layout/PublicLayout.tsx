import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
export const PublicLayout: React.FC = () => {
  const { pathname } = useLocation();

  // Scroll to top upon navigating to a new route
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div id="top" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

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
