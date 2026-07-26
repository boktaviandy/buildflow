import React from 'react';
import { useAppStore } from '../../store/useAppStore';
import { Settings, Building, ShieldCheck, HardHat, Save } from 'lucide-react';

export function SettingsPage() {
  const { currentUser } = useAppStore();

  return (
    <div style={{ maxWidth: '720px', display: 'flex', flexDirection: 'column', gap: '1.5rem', paddingBottom: '3rem' }}>
      <div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Pengaturan Perusahaan & Platform</h2>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
          Profil internal perusahaan kontraktor & konfigurasi aplikasi non-SaaS
        </p>
      </div>

      <div className="card glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Building size={18} color="var(--accent-amber)" /> Profil Perusahaan
        </h3>

        <div className="form-group">
          <label className="form-label">NAMA PERUSAHAAN / KONTRAKTOR</label>
          <input type="text" defaultValue="PT BUILDFLOW KONTRAKTOR INDONESIA" className="form-input" />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div className="form-group">
            <label className="form-label">NO. IZIN USAHAKONSTRUKSI (IUJK)</label>
            <input type="text" defaultValue="912000348123-IUJK" className="form-input" />
          </div>
          <div className="form-group">
            <label className="form-label">ALAMAT KANTOR PUSAT</label>
            <input type="text" defaultValue="Gedung Cyber Tower L12, Jakarta Selatan" className="form-input" />
          </div>
        </div>

        <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '1rem' }}>
          <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
            Info Lisensi & Mode Aplikasi
          </h4>
          <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '4px', backgroundColor: 'var(--bg-surface)', padding: '0.875rem', borderRadius: 'var(--radius-sm)' }}>
            <div>Tipe Aplikasi: <strong>BuildFlow Internal Non-SaaS</strong></div>
            <div>Batas Proyek / User: <strong>Unrestricted (Internal Company Only)</strong></div>
            <div>Status Sistem: <strong style={{ color: 'var(--status-success)' }}>Offline-Ready Local Database Connected</strong></div>
          </div>
        </div>

        <button className="btn btn-primary amber-glow" style={{ alignSelf: 'flex-start' }}>
          <Save size={16} /> Simpan Pengaturan
        </button>

      </div>
    </div>
  );
}
