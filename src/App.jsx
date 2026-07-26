import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { RoleSwitcher } from './components/layout/RoleSwitcher';
import { Sidebar } from './components/layout/Sidebar';
import { Topbar } from './components/layout/Topbar';
import { BottomNav } from './components/layout/BottomNav';

import { LoginPage } from './pages/Login/LoginPage';
import { DashboardPage } from './pages/Dashboard/DashboardPage';
import { ProjectListPage } from './pages/Projects/ProjectListPage';
import { ProjectDetailPage } from './pages/Projects/ProjectDetailPage';
import { ProgressUploadPage } from './pages/ProgressUpload/ProgressUploadPage';
import { UsersPage } from './pages/Users/UsersPage';
import { SettingsPage } from './pages/Settings/SettingsPage';

import { MaterialGlobalPage } from './pages/GlobalViews/MaterialGlobalPage';
import { TenagaKerjaGlobalPage } from './pages/GlobalViews/TenagaKerjaGlobalPage';
import { KeuanganGlobalPage } from './pages/GlobalViews/KeuanganGlobalPage';
import { DokumentasiGlobalPage } from './pages/GlobalViews/DokumentasiGlobalPage';
import { LaporanGlobalPage } from './pages/GlobalViews/LaporanGlobalPage';

function AppLayout({ children }) {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  if (isLoginPage) {
    return <>{children}</>;
  }

  // Derive breadcrumbs based on route
  const pathParts = location.pathname.split('/').filter(Boolean);
  const breadcrumb = pathParts.map(p => p.charAt(0).toUpperCase() + p.slice(1));

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-main)' }}>
      
      {/* Dynamic Role Switcher Bar */}
      <RoleSwitcher />

      {/* Main Container Layout */}
      <div style={{ display: 'flex', flex: 1 }}>
        
        {/* Fixed Desktop Sidebar */}
        <Sidebar />

        {/* Right Content Area */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
          <Topbar title={breadcrumb[0] || "Dashboard"} breadcrumb={breadcrumb} />
          
          <main style={{ flex: 1, padding: '1.5rem', width: '100%', maxWidth: '1400px', margin: '0 auto' }}>
            {children}
          </main>
        </div>
      </div>

      {/* Mobile Bottom Navigation (Visible on screen <= 768px) */}
      <BottomNav />

    </div>
  );
}

export function App() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/proyek" element={<ProjectListPage />} />
          <Route path="/proyek/:id" element={<ProjectDetailPage />} />
          <Route path="/upload-progress" element={<ProgressUploadPage />} />
          
          {/* Global Management Views */}
          <Route path="/material-global" element={<MaterialGlobalPage />} />
          <Route path="/tenaga-kerja-global" element={<TenagaKerjaGlobalPage />} />
          <Route path="/keuangan-global" element={<KeuanganGlobalPage />} />
          <Route path="/dokumentasi-global" element={<DokumentasiGlobalPage />} />
          <Route path="/laporan-global" element={<LaporanGlobalPage />} />

          {/* Admin & System Views */}
          <Route path="/pengguna" element={<UsersPage />} />
          <Route path="/pengaturan" element={<SettingsPage />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}

export default App;
