import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../../store/useAppStore';
import { ROLE_CONFIG } from '../../utils/formatters';
import { Shield, UserCheck, ChevronRight } from 'lucide-react';

export function RoleSwitcher() {
  const { currentUser, users, setRole } = useAppStore();
  const navigate = useNavigate();

  const handleSwitchRole = (roleKey) => {
    setRole(roleKey);
    if (roleKey === 'mandor') {
      navigate('/upload-progress');
    }
  };

  return (
    <div style={{
      backgroundColor: '#161922',
      borderBottom: '1px solid var(--border-subtle)',
      padding: '0.4rem 1.25rem',
      display: 'flex',
      alignItems: 'center',
      justify: 'space-between',
      fontSize: '0.8rem',
      position: 'relative',
      zIndex: 100
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)' }}>
        <Shield size={14} color="var(--accent-amber)" />
        <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Simulasi Peran User (Role Switcher):</span>
        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }} className="desktop-only">
          Klik role di samping untuk menguji hak akses & tampilan UI
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', flexWrap: 'wrap' }}>
        {Object.entries(ROLE_CONFIG).map(([roleKey, config]) => {
          const isActive = currentUser.role === roleKey;
          return (
            <button
              key={roleKey}
              onClick={() => handleSwitchRole(roleKey)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                padding: '0.25rem 0.625rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.75rem',
                fontWeight: 600,
                border: isActive ? `1px solid ${config.color}` : '1px solid var(--border-subtle)',
                backgroundColor: isActive ? `${config.color}22` : 'transparent',
                color: isActive ? config.color : 'var(--text-secondary)',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              <span style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: config.color,
                display: 'inline-block'
              }} />
              {roleKey.toUpperCase()}
              {isActive && <UserCheck size={12} />}
            </button>
          );
        })}
      </div>
    </div>
  );
}
