import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import { PublicLayout } from './components/layout/PublicLayout';
import { AdminLayout } from './components/layout/AdminLayout';

// Public Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { HistoryPage } from './pages/HistoryPage';
import { YearsPage } from './pages/YearsPage';
import { YearDetailPage } from './pages/YearDetailPage';
import { AlbumDetailPage } from './pages/AlbumDetailPage';
import { EventsPage } from './pages/EventsPage';
import { AnnouncementsPage } from './pages/AnnouncementsPage';
import { SearchPage } from './pages/SearchPage';
import { ContactPage } from './pages/ContactPage';
import { NotFoundPage } from './pages/NotFoundPage';

// Admin Pages
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { AdminAlbumsPage } from './pages/admin/AdminAlbumsPage';
import { AdminAvatarsPage } from './pages/admin/AdminAvatarsPage';
import { AdminAuctionsPage } from './pages/admin/AdminAuctionsPage';
import { AdminDonorsPage } from './pages/admin/AdminDonorsPage';
import { AdminAuditLogsPage } from './pages/admin/AdminAuditLogsPage';

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <DataProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Website Routes */}
            <Route path="/" element={<PublicLayout />}>
              <Route index element={<HomePage />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="history" element={<HistoryPage />} />
              <Route path="years" element={<YearsPage />} />
              <Route path="years/:year" element={<YearDetailPage />} />
              <Route path="albums/:slug" element={<AlbumDetailPage />} />
              <Route path="events" element={<EventsPage />} />
              <Route path="announcements" element={<AnnouncementsPage />} />
              <Route path="search" element={<SearchPage />} />
              <Route path="contact" element={<ContactPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>

            {/* Admin Management Routes */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboardPage />} />
              <Route path="dashboard" element={<AdminDashboardPage />} />
              <Route path="albums" element={<AdminAlbumsPage />} />
              <Route path="avatars" element={<AdminAvatarsPage />} />
              <Route path="auctions" element={<AdminAuctionsPage />} />
              <Route path="donors" element={<AdminDonorsPage />} />
              <Route path="audit-logs" element={<AdminAuditLogsPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </DataProvider>
    </AuthProvider>
  );
};

export default App;
