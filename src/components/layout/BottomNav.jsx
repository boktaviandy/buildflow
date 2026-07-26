import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAppStore } from '../../store/useAppStore';
import {
  LayoutDashboard,
  Building2,
  Camera,
  Boxes,
  User
} from 'lucide-react';

export function BottomNav() {
  const { currentUser } = useAppStore();
  const location = useLocation();

  const mobileNavs = [
    { label: "Home", path: "/dashboard", icon: LayoutDashboard },
    { label: "Proyek", path: "/proyek", icon: Building2 },
    { label: "+ Progress", path: "/upload-progress", icon: Camera, isPrimary: true },
    { label: "Material", path: "/material-global", icon: Boxes },
    { label: "Profil", path: "/pengaturan", icon: User },
  ];

  return (
    <nav style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: '#141722',
      borderTop: '1px solid var(--border-medium)',
      padding: '0.4rem 0.5rem 0.6rem 0.5rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around',
      zIndex: 999,
      boxShadow: '0 -4px 20px rgba(0,0,0,0.6)'
    }} className="mobile-only">
      {mobileNavs.map((item) => {
        const IconComponent = item.icon;
        const isActive = location.pathname === item.path;

        if (item.isPrimary) {
          return (
            <NavLink
              key={item.path}
              to={item.path}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textDecoration: 'none',
                marginTop: '-18px'
              }}
            >
              <div style={{
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#0F172A',
                boxShadow: 'var(--shadow-amber)',
                border: '3px solid #141722'
              }}>
                <Camera size={24} strokeWidth={2.5} />
              </div>
              <span style={{
                fontSize: '0.68rem',
                fontWeight: 700,
                color: 'var(--accent-amber)',
                marginTop: '2px'
              }}>
                {item.label}
              </span>
            </NavLink>
          );
        }

        return (
          <NavLink
            key={item.path}
            to={item.path}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textDecoration: 'none',
              color: isActive ? 'var(--accent-amber)' : 'var(--text-muted)',
              gap: '2px',
              flex: 1
            }}
          >
            <IconComponent size={20} />
            <span style={{ fontSize: '0.68rem', fontWeight: isActive ? 700 : 500 }}>
              {item.label}
            </span>
          </NavLink>
        );
      })}
    </nav>
  );
}
