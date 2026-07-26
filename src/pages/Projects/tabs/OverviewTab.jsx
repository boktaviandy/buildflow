import React from 'react';
import { formatRupiah, formatRupiahCompact, formatDateIndo } from '../../../utils/formatters';
import { MapPin, Calendar, HardHat, UserCheck, DollarSign, Activity, FileText } from 'lucide-react';

export function OverviewTab({ project, progressLogs, materials, workforce }) {
  const spentPercentage = Math.round((project.spent / project.budget) * 100);
  const lowStockCount = materials.filter(m => m.projectId === project.id && m.status === 'Kritis').length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Overview Top Info Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '1.25rem'
      }}>
        
        {/* Project Card Info */}
        <div className="card glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
          <h4 style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            INFORMASI UTAMA PROYEK
          </h4>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>{project.name}</h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
              {project.description}
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <MapPin size={16} color="var(--accent-amber)" />
              <span>Lokasi: <strong>{project.location}</strong></span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <UserCheck size={16} color="var(--accent-blue)" />
              <span>Klien / Pemilik: <strong>{project.client}</strong></span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Calendar size={16} color="var(--status-success)" />
              <span>Durasi: {formatDateIndo(project.startDate)} — {formatDateIndo(project.deadline)}</span>
            </div>
          </div>
        </div>

        {/* Financial & Progress Gauge Card */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', justifyContent: 'center' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
              <span>Progress Fisik Proyek</span>
              <span style={{ color: 'var(--accent-amber)', fontWeight: 800, fontSize: '1rem' }}>{project.progress}%</span>
            </div>
            <div style={{ width: '100%', height: '10px', backgroundColor: 'var(--bg-input)', borderRadius: '6px', overflow: 'hidden' }}>
              <div style={{ width: `${project.progress}%`, height: '100%', background: 'linear-gradient(90deg, #F59E0B 0%, #10B981 100%)' }} />
            </div>
          </div>

          <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '0.875rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
              <span>Pengeluaran Budget ({spentPercentage}%)</span>
              <span style={{ color: 'var(--text-primary)', fontWeight: 700 }}>{formatRupiahCompact(project.spent)}</span>
            </div>
            <div style={{ width: '100%', height: '10px', backgroundColor: 'var(--bg-input)', borderRadius: '6px', overflow: 'hidden' }}>
              <div style={{ width: `${spentPercentage}%`, height: '100%', backgroundColor: spentPercentage > 85 ? 'var(--status-danger)' : 'var(--accent-blue)' }} />
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px', textAlign: 'right' }}>
              Sisa Budget: <strong>{formatRupiahCompact(project.budget - project.spent)}</strong>
            </div>
          </div>
        </div>

        {/* Team Leadership Card */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
          <h4 style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            TIM PENANGGUNG JAWAB
          </h4>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.625rem', backgroundColor: 'var(--bg-surface)', borderRadius: 'var(--radius-sm)' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'var(--accent-blue-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-blue)' }}>
              <HardHat size={20} />
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Project Manager</div>
              <strong style={{ fontSize: '0.9rem', color: 'var(--text-primary)' }}>{project.pm}</strong>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.625rem', backgroundColor: 'var(--bg-surface)', borderRadius: 'var(--radius-sm)' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'var(--accent-amber-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-amber)' }}>
              <HardHat size={20} />
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Mandor Utama Lapangan</div>
              <strong style={{ fontSize: '0.9rem', color: 'var(--text-primary)' }}>{project.mandor}</strong>
            </div>
          </div>
        </div>

      </div>

      {/* Recent Updates Feed inside Overview */}
      <div className="card">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Activity size={18} color="var(--accent-amber)" /> Catatan Updates Terakhir Lapangan
          </h3>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
          {progressLogs.filter(l => l.projectId === project.id).map(log => (
            <div key={log.id} style={{ display: 'flex', gap: '1rem', padding: '0.75rem', backgroundColor: 'var(--bg-surface)', borderRadius: 'var(--radius-sm)' }}>
              <img src={log.photo} alt={log.workCategory} style={{ width: '60px', height: '60px', borderRadius: 'var(--radius-sm)', objectFit: 'cover' }} />
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>{log.workCategory}</div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '2px' }}>"{log.notes}"</p>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                  {log.date} {log.time} • oleh {log.uploader} • Geo: {log.geoCoords}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
