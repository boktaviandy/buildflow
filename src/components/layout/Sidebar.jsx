import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAppStore } from '../../store/useAppStore';
import { ROLE_CONFIG } from '../../utils/formatters';
import {
  LayoutDashboard,
  Building2,
  Camera,
  Boxes,
  Users,
  Wallet,
  FileText,
  PieChart,
  UserCog,
  Settings,
  HardHat,
  ChevronRight,
  LogOut
} from 'lucide-react';

export function Sidebar() {
  const { currentUser, setRole } = useAppStore();
  const location = useLocation();

  // Navigation Items with Role Restrictions
  const navItems = [
    {
      title: "NAVIGASI UTAMA",
      items: [
        { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard, roles: ['owner', 'pm', 'mandor', 'admin'] },
        { label: "Daftar Proyek", path: "/proyek", icon: Building2, roles: ['owner', 'pm', 'mandor', 'admin'] },
        { label: "Upload Progress", path: "/upload-progress", icon: Camera, roles: ['mandor', 'pm'], highlight: true },
      ]
    },
    {
      title: "MANAJEMEN PROYEK",
      items: [
        { label: "Material & Stok", path: "/material-global", icon: Boxes, roles: ['owner', 'pm', 'admin'] },
        { label: "Tenaga Kerja", path: "/tenaga-kerja-global", icon: Users, roles: ['owner', 'pm', 'admin'] },
        { label: "Keuangan Proyek", path: "/keuangan-global", icon: Wallet, roles: ['owner', 'pm', 'admin'] },
        { label: "Dokumentasi", path: "/dokumentasi-global", icon: FileText, roles: ['owner', 'pm', 'mandor', 'admin'] },
        { label: "Laporan Proyek", path: "/laporan-global", icon: PieChart, roles: ['owner', 'pm'] },
      ]
    },
    {
      title: "SISTEM",
      items: [
        { label: "Manajemen User", path: "/pengguna", icon: UserCog, roles: ['owner', 'admin'] },
        { label: "Pengaturan", path: "/pengaturan", icon: Settings, roles: ['owner', 'admin'] },
      ]
    }
  ];

  const currentRoleConfig = ROLE_CONFIG[currentUser.role] || ROLE_CONFIG.pm;

  return (
    <aside style={{
      width: '260px',
      backgroundColor: 'var(--bg-surface)',
      borderRight: '1px solid var(--border-subtle)',
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      position: 'sticky',
      top: 0,
      zIndex: 50,
      flexShrink: 0
    }} className="desktop-only">
      
      {/* Brand Header */}
      <div style={{
        padding: '1.25rem 1.5rem',
        borderBottom: '1px solid var(--border-subtle)',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem'
      }}>
        <div style={{
          width: '38px',
          height: '38px',
          borderRadius: 'var(--radius-md)',
          background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#0F172A',
          boxShadow: 'var(--shadow-amber)'
        }}>
          <HardHat size={22} strokeWidth={2.5} />
        </div>
        <div>
          <h1 style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--text-primary)' }}>
            Build<span style={{ color: 'var(--accent-amber)' }}>Flow</span>
          </h1>
          <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 500 }}>
            INTERNAL PLATFORM
          </p>
        </div>
      </div>

      {/* User Role Card */}
      <div style={{
        margin: '1rem 1rem 0.5rem 1rem',
        padding: '0.875rem',
        borderRadius: 'var(--radius-md)',
        backgroundColor: 'var(--bg-card)',
        border: '1px solid var(--border-subtle)',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem'
      }}>
        <img
          src={currentUser.avatar}
          alt={currentUser.name}
          style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }}
        />
        <div style={{ overflow: 'hidden', flex: 1 }}>
          <div style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {currentUser.name}
          </div>
          <span className={`badge ${currentRoleConfig.badgeClass}`} style={{ fontSize: '0.65rem', padding: '0.15rem 0.4rem', marginTop: '2px' }}>
            {currentRoleConfig.label}
          </span>
        </div>
      </div>

      {/* Navigation Groups */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '0.75rem 1rem' }}>
        {navItems.map((group, groupIdx) => {
          // Filter items based on current role
          const visibleItems = group.items.filter(item => item.roles.includes(currentUser.role));
          if (visibleItems.length === 0) return null;

          return (
            <div key={groupIdx} style={{ marginBottom: '1.25rem' }}>
              <div style={{
                fontSize: '0.65rem',
                fontWeight: 700,
                color: 'var(--text-muted)',
                letterSpacing: '0.08em',
                padding: '0 0.5rem 0.5rem 0.5rem'
              }}>
                {group.title}
              </div>

              {visibleItems.map((item) => {
                const IconComponent = item.icon;
                const isActive = location.pathname === item.path || (item.path !== '/dashboard' && location.pathname.startsWith(item.path));

                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      padding: '0.625rem 0.75rem',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '0.875rem',
                      fontWeight: isActive ? 600 : 500,
                      color: isActive ? 'var(--accent-amber)' : 'var(--text-secondary)',
                      backgroundColor: isActive
                        ? 'var(--accent-amber-light)'
                        : item.highlight
                        ? 'rgba(245, 158, 11, 0.08)'
                        : 'transparent',
                      borderLeft: isActive ? '3px solid var(--accent-amber)' : '3px solid transparent',
                      marginBottom: '0.25rem',
                      textDecoration: 'none',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <IconComponent size={18} color={isActive ? 'var(--accent-amber)' : item.highlight ? 'var(--accent-amber)' : 'var(--text-muted)'} />
                    <span style={{ flex: 1 }}>{item.label}</span>
                    {item.highlight && !isActive && (
                      <span style={{ fontSize: '0.65rem', background: 'var(--accent-amber)', color: '#000', padding: '1px 5px', borderRadius: '4px', fontWeight: 700 }}>
                        HOT
                      </span>
                    )}
                  </NavLink>
                );
              })}
            </div>
          );
        })}
      </div>

      {/* Footer Info */}
      <div style={{
        padding: '1rem 1.25rem',
        borderTop: '1px solid var(--border-subtle)',
        fontSize: '0.75rem',
        color: 'var(--text-muted)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <span>BuildFlow v1.0 (Internal)</span>
        <NavLink to="/login" style={{ color: 'var(--status-danger)', display: 'flex', alignItems: 'center', gap: '0.25rem', textDecoration: 'none' }}>
          <LogOut size={14} /> Exit
        </NavLink>
      </div>
    </aside>
  );
}
