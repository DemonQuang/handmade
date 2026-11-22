import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import { PublicView } from './pages/PublicView';
import { LoginPage } from './pages/LoginPage';
import { AdminPortal } from './pages/AdminPortal';
import { ProtectedRoute } from './components/auth/ProtectedRoute';

export function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Mobile-First Link-in-Bio Storefront */}
            <Route path="/" element={<PublicView />} />

            {/* Admin Login with Gmail */}
            <Route path="/login" element={<LoginPage />} />

            {/* Creator Studio & Admin Portal (Protected by Gmail Login) */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminPortal />
                </ProtectedRoute>
              }
            />

            {/* Fallback to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;
