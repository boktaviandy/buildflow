import React, { useState } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { ROLE_CONFIG } from '../../utils/formatters';
import { Modal } from '../../components/ui/Modal';
import { UserCog, Plus, Shield, Phone, Mail, CheckCircle2 } from 'lucide-react';

export function UsersPage() {
  const { users, currentUser } = useAppStore();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', paddingBottom: '3rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Manajemen User Internal & Hak Akses</h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            Kelola staff internal perusahaan berdasarkan 4 struktur peran (Owner, PM, Mandor, Admin)
          </p>
        </div>

        <button onClick={() => setIsAddModalOpen(true)} className="btn btn-primary amber-glow">
          <Plus size={18} /> + Tambah User Internal
        </button>
      </div>

      {/* Role Structure Breakdown Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
        {Object.entries(ROLE_CONFIG).map(([roleKey, cfg]) => {
          const userCount = users.filter(u => u.role === roleKey).length;
          return (
            <div key={roleKey} className="card" style={{ borderLeft: `4px solid ${cfg.color}` }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: cfg.color, textTransform: 'uppercase' }}>
                {roleKey.toUpperCase()}
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginTop: '2px' }}>{cfg.label}</h3>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px' }}>{cfg.description}</p>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: '0.75rem' }}>
                {userCount} Pengguna Terdaftar
              </div>
            </div>
          );
        })}
      </div>

      {/* Users List Table */}
      <div className="card" style={{ padding: 0, overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
          <thead>
            <tr style={{ backgroundColor: 'var(--bg-surface)', borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-muted)' }}>
              <th style={{ padding: '0.875rem 1rem' }}>Nama & Jabatan</th>
              <th style={{ padding: '0.875rem 1rem' }}>Email Login</th>
              <th style={{ padding: '0.875rem 1rem' }}>Struktur Peran (Role)</th>
              <th style={{ padding: '0.875rem 1rem' }}>Nomor Telepon</th>
              <th style={{ padding: '0.875rem 1rem' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => {
              const cfg = ROLE_CONFIG[u.role];
              return (
                <tr key={u.id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                  <td style={{ padding: '0.875rem 1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <img src={u.avatar} alt={u.name} style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }} />
                      <div>
                        <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{u.name}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{u.title}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '0.875rem 1rem', color: 'var(--text-secondary)' }}>{u.email}</td>
                  <td style={{ padding: '0.875rem 1rem' }}>
                    <span className={`badge ${cfg.badgeClass}`}>{cfg.label}</span>
                  </td>
                  <td style={{ padding: '0.875rem 1rem', color: 'var(--text-secondary)' }}>{u.phone}</td>
                  <td style={{ padding: '0.875rem 1rem' }}>
                    <span className="badge badge-success">Aktif</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Modal Add User */}
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Tambah Pengguna Internal Baru">
        <div style={{ padding: '1rem', textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
          Formulir penambahan user internal perusahaan. Password sementara akan dikirim via Email internal.
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
          <button onClick={() => setIsAddModalOpen(false)} className="btn btn-primary">Tutup</button>
        </div>
      </Modal>
    </div>
  );
}
