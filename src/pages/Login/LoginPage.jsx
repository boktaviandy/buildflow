import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../../store/useAppStore';
import { ROLE_CONFIG } from '../../utils/formatters';
import { HardHat, ShieldCheck, ArrowRight, Lock, Mail } from 'lucide-react';

export function LoginPage() {
  const navigate = useNavigate();
  const { users, setCurrentUser } = useAppStore();
  const [selectedUserId, setSelectedUserId] = useState(users[1].id); // PM default
  const [password, setPassword] = useState("••••••••");

  const handleLogin = (e) => {
    e.preventDefault();
    setCurrentUser(selectedUserId);
    const user = users.find(u => u.id === selectedUserId);
    if (user && user.role === 'mandor') {
      navigate('/upload-progress');
    } else {
      navigate('/dashboard');
    }
  };

  const handleQuickLogin = (userId) => {
    setCurrentUser(userId);
    const user = users.find(u => u.id === userId);
    if (user && user.role === 'mandor') {
      navigate('/upload-progress');
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      width: '100%',
      backgroundColor: 'var(--bg-main)',
      backgroundImage: `radial-gradient(circle at 50% 30%, rgba(245, 158, 11, 0.08) 0%, transparent 60%), linear-gradient(180deg, #0B0D12 0%, #141720 100%)`,
      display: 'flex',
      alignItems: 'center',
      justify: 'center',
      padding: '1.5rem',
      position: 'relative'
    }}>
      {/* Background Subtle Blueprint Grid Lines (CSS) */}
      <div style={{
        position: 'absolute',
        inset: 0,
        opacity: 0.03,
        backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
        backgroundSize: '40px 40px',
        pointerEvents: 'none'
      }} />

      <div style={{ width: '100%', maxWidth: '440px', zIndex: 10 }}>
        
        {/* Brand Logo Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            width: '56px',
            height: '56px',
            borderRadius: 'var(--radius-lg)',
            background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#0F172A',
            boxShadow: 'var(--shadow-amber)',
            marginBottom: '1rem'
          }}>
            <HardHat size={32} strokeWidth={2.5} />
          </div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.03em' }}>
            Build<span style={{ color: 'var(--accent-amber)' }}>Flow</span>
          </h1>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
            Platform Manajemen Proyek Konstruksi Internal
          </p>
        </div>

        {/* Login Box Card */}
        <div className="card glass-panel" style={{ padding: '2rem', boxShadow: 'var(--shadow-lg)' }}>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label className="form-label">PILIH AKUN AKSI / ROLE</label>
              <div style={{ position: 'relative' }}>
                <select
                  value={selectedUserId}
                  onChange={(e) => setSelectedUserId(e.target.value)}
                  className="form-select"
                  style={{ paddingLeft: '2.5rem', fontWeight: 600 }}
                >
                  {users.map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.name} — ({ROLE_CONFIG[u.role].label})
                    </option>
                  ))}
                </select>
                <Mail size={18} color="var(--accent-amber)" style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)' }} />
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: '1.5rem' }}>
              <label className="form-label">PASSWORD</label>
              <div style={{ position: 'relative' }}>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-input"
                  style={{ paddingLeft: '2.5rem' }}
                  required
                />
                <Lock size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)' }} />
              </div>
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.875rem' }}>
              Masuk ke Aplikasi <ArrowRight size={18} />
            </button>
          </form>

          {/* Quick Role Tester Selector */}
          <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-subtle)' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textAlign: 'center', marginBottom: '0.75rem', letterSpacing: '0.05em' }}>
              ATAU MASUK LANGSUNG SEBAGAI (SIMULASI ROLE):
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
              {users.map((u) => {
                const config = ROLE_CONFIG[u.role];
                return (
                  <button
                    key={u.id}
                    onClick={() => handleQuickLogin(u.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.5rem 0.625rem',
                      borderRadius: 'var(--radius-sm)',
                      backgroundColor: 'var(--bg-input)',
                      border: `1px solid ${config.color}44`,
                      color: 'var(--text-primary)',
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <span style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      backgroundColor: config.color,
                      flexShrink: 0
                    }} />
                    <div style={{ overflow: 'hidden' }}>
                      <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{u.role.toUpperCase()}</div>
                      <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontWeight: 400 }}>{u.name.split(' ')[0]}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Security Footer Notice */}
        <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.35rem' }}>
          <ShieldCheck size={15} color="var(--status-success)" />
          Sistem Terenkripsi Perusahaan (Non-SaaS BuildFlow)
        </div>

      </div>
    </div>
  );
}
