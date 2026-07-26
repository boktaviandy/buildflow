import React, { useState } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { ROLE_CONFIG } from '../../utils/formatters';
import { Bell, Search, HardHat, CheckCircle2, AlertTriangle, X } from 'lucide-react';

export function Topbar({ title = "Dashboard", breadcrumb = [] }) {
  const { currentUser, materials } = useAppStore();
  const [showNotifs, setShowNotifs] = useState(false);

  const lowStockMaterials = materials.filter(m => m.status === 'Kritis');
  const roleConfig = ROLE_CONFIG[currentUser.role] || ROLE_CONFIG.pm;

  return (
    <header style={{
      height: '64px',
      backgroundColor: 'var(--bg-surface)',
      borderBottom: '1px solid var(--border-subtle)',
      display: 'flex',
      alignItems: 'center',
      justify: 'space-between',
      padding: '0 1.5rem',
      position: 'sticky',
      top: 0,
      zIndex: 40
    }}>
      {/* Title & Breadcrumb */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          <span>BuildFlow</span>
          {breadcrumb.map((b, i) => (
            <React.Fragment key={i}>
              <span>/</span>
              <span style={{ color: i === breadcrumb.length - 1 ? 'var(--text-primary)' : 'var(--text-muted)' }}>{b}</span>
            </React.Fragment>
          ))}
        </div>
        <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: '2px' }}>
          {title}
        </h2>
      </div>

      {/* Right Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        
        {/* Search Bar (Desktop) */}
        <div className="desktop-only" style={{ position: 'relative', width: '240px' }}>
          <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            placeholder="Cari proyek, material..."
            style={{
              width: '100%',
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-full)',
              padding: '0.4rem 0.75rem 0.4rem 2.25rem',
              fontSize: '0.82rem',
              color: 'var(--text-primary)',
              outline: 'none'
            }}
          />
        </div>

        {/* Notifications Icon & Drawer Toggle */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setShowNotifs(!showNotifs)}
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              position: 'relative'
            }}
          >
            <Bell size={18} />
            {lowStockMaterials.length > 0 && (
              <span style={{
                position: 'absolute',
                top: '4px',
                right: '4px',
                width: '14px',
                height: '14px',
                backgroundColor: 'var(--status-danger)',
                color: 'white',
                fontSize: '0.65rem',
                fontWeight: 700,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {lowStockMaterials.length}
              </span>
            )}
          </button>

          {/* Notifications Dropdown Panel */}
          {showNotifs && (
            <div style={{
              position: 'absolute',
              right: 0,
              top: '46px',
              width: '320px',
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border-medium)',
              borderRadius: 'var(--radius-md)',
              boxShadow: 'var(--shadow-lg)',
              padding: '1rem',
              zIndex: 100
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <span style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary)' }}>Notifikasi Operasional</span>
                <button onClick={() => setShowNotifs(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                  <X size={16} />
                </button>
              </div>

              {lowStockMaterials.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {lowStockMaterials.map(m => (
                    <div key={m.id} style={{
                      padding: '0.625rem',
                      borderRadius: 'var(--radius-sm)',
                      backgroundColor: 'var(--status-danger-bg)',
                      border: '1px solid rgba(239,68,68,0.3)',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.5rem'
                    }}>
                      <AlertTriangle size={16} color="var(--status-danger)" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <div>
                        <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                          Stok Material Kritis!
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                          {m.name} sisa <strong>{m.currentStock} {m.unit}</strong> (min. {m.minStock})
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: '1rem', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                  <CheckCircle2 size={24} color="var(--status-success)" style={{ margin: '0 auto 0.5rem auto' }} />
                  Semua stok material & operasional normal.
                </div>
              )}
            </div>
          )}
        </div>

        {/* User Profile Pill */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.625rem',
          padding: '0.35rem 0.75rem',
          borderRadius: 'var(--radius-full)',
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border-subtle)'
        }}>
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover' }}
          />
          <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-primary)' }} className="desktop-only">
            {currentUser.name}
          </div>
          <span className={`badge ${roleConfig.badgeClass}`} style={{ fontSize: '0.6rem', padding: '0.1rem 0.35rem' }}>
            {currentUser.role.toUpperCase()}
          </span>
        </div>

      </div>
    </header>
  );
}
