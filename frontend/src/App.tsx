import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import { PublicLayout } from './components/layout/PublicLayout';
import { AdminLayout } from './components/layout/AdminLayout';
import { ProtectedRoute } from './components/admin/ProtectedRoute';

// Public Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { HistoryPage } from './pages/HistoryPage';
import { YearsPage } from './pages/YearsPage';
import { YearDetailPage } from './pages/YearDetailPage';
import { AlbumDetailPage } from './pages/AlbumDetailPage';
import { SearchPage } from './pages/SearchPage';
import { ContactPage } from './pages/ContactPage';
import { NotFoundPage } from './pages/NotFoundPage';

// Admin Pages
import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { AdminAlbumsPage } from './pages/admin/AdminAlbumsPage';
import { AdminAvatarsPage } from './pages/admin/AdminAvatarsPage';
import { AdminAuctionsPage } from './pages/admin/AdminAuctionsPage';
import { AdminDonorsPage } from './pages/admin/AdminDonorsPage';
import { AdminAuditLogsPage } from './pages/admin/AdminAuditLogsPage';

import { ErrorBoundary } from './components/common/ErrorBoundary';

export const App: React.FC = () => {
  return (
    <ErrorBoundary sectionName="Application Root">
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
              <Route path="events" element={<Navigate to="/years" replace />} />
              <Route path="announcements" element={<Navigate to="/" replace />} />
              <Route path="search" element={<SearchPage />} />
              <Route path="contact" element={<ContactPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>

            {/* Admin Login Route (Publicly accessible to authenticating admins) */}
            <Route path="/admin/login" element={<AdminLoginPage />} />

            {/* Private Admin Management Routes (Protected by session verification) */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
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
  </ErrorBoundary>
  );
};

export default App;
