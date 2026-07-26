import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../../store/useAppStore';
import { KPICard } from '../../components/ui/KPICard';
import { ProjectCard } from '../../components/ui/ProjectCard';
import { formatRupiahCompact, formatDateIndo, ROLE_CONFIG } from '../../utils/formatters';
import {
  Building2,
  CheckCircle2,
  AlertTriangle,
  Wallet,
  Camera,
  Boxes,
  ArrowRight,
  Plus,
  HardHat,
  TrendingUp,
  Clock
} from 'lucide-react';

export function DashboardPage() {
  const navigate = useNavigate();
  const { projects, progressLogs, materials, currentUser } = useAppStore();

  // Metrics calculations
  const activeProjects = projects.filter(p => p.status === 'aktif');
  const finishedProjects = projects.filter(p => p.status === 'selesai');
  const delayedProjects = projects.filter(p => p.status === 'terlambat');

  const totalBudget = projects.reduce((acc, p) => acc + p.budget, 0);
  const totalSpent = projects.reduce((acc, p) => acc + p.spent, 0);
  const spentPercentage = Math.round((totalSpent / totalBudget) * 100);

  const lowStockMaterials = materials.filter(m => m.status === 'Kritis');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', paddingBottom: '3rem' }}>
      
      {/* Welcome Banner */}
      <div className="card glass-panel" style={{
        background: 'linear-gradient(135deg, rgba(26,30,41,0.9) 0%, rgba(245,158,11,0.06) 100%)',
        borderColor: 'var(--border-accent)',
        display: 'flex',
        alignItems: 'center',
        justify: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem',
        padding: '1.25rem 1.5rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            style={{ width: '48px', height: '48px', borderRadius: '50%', border: '2px solid var(--accent-amber)', objectFit: 'cover' }}
          />
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <h2 style={{ fontSize: '1.35rem', fontWeight: 800 }}>
                Selamat datang kembali, {currentUser.name}!
              </h2>
              <span className={`badge ${ROLE_CONFIG[currentUser.role].badgeClass}`}>
                {ROLE_CONFIG[currentUser.role].label}
              </span>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
              Ringkasan operasional seluruh proyek konstruksi aktif per hari ini.
            </p>
          </div>
        </div>

        {/* Quick Action Button based on Role */}
        {(currentUser.role === 'mandor' || currentUser.role === 'pm') && (
          <button
            onClick={() => navigate('/upload-progress')}
            className="btn btn-primary amber-glow"
          >
            <Camera size={18} />
            + Laporkan Progress Harian
          </button>
        )}
      </div>

      {/* KPI Summary Cards Row (4 cards - terbaca dalam 3 detik) */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
        gap: '1rem'
      }}>
        <KPICard
          title="Proyek Aktif"
          value={activeProjects.length}
          subtext="dalam pengerjaan"
          icon={Building2}
          color="var(--accent-amber)"
          onClick={() => navigate('/proyek')}
        />
        <KPICard
          title="Proyek Terlambat"
          value={delayedProjects.length}
          subtext="butuh perhatian khusus"
          icon={AlertTriangle}
          color="var(--status-danger)"
          onClick={() => navigate('/proyek')}
        />
        <KPICard
          title="Proyek Selesai"
          value={finishedProjects.length}
          subtext="siap serah terima"
          icon={CheckCircle2}
          color="var(--status-success)"
          onClick={() => navigate('/proyek')}
        />
        <KPICard
          title="Budget Terpakai"
          value={formatRupiahCompact(totalSpent)}
          subtext={`${spentPercentage}% dari ${formatRupiahCompact(totalBudget)}`}
          icon={Wallet}
          color="var(--accent-blue)"
        />
      </div>

      {/* Mid Section Grid: Activity Feed + Material Alerts */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '1.25rem'
      }}>
        
        {/* Update Progress Hari Ini (Activity Feed) */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Camera size={18} color="var(--accent-amber)" />
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>Progress Hari Ini</h3>
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Realtime Feed</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
            {progressLogs.slice(0, 3).map((log) => {
              const proj = projects.find(p => p.id === log.projectId);
              return (
                <div
                  key={log.id}
                  style={{
                    padding: '0.875rem',
                    backgroundColor: 'var(--bg-surface)',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-subtle)',
                    display: 'flex',
                    gap: '0.875rem'
                  }}
                >
                  <img
                    src={log.photo}
                    alt={log.workCategory}
                    style={{ width: '64px', height: '64px', borderRadius: 'var(--radius-sm)', objectFit: 'cover', flexShrink: 0 }}
                  />
                  <div style={{ flex: 1, overflow: 'hidden' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2px' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-amber)' }}>
                        {proj?.name || "Proyek"}
                      </span>
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{log.time}</span>
                    </div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                      {log.workCategory}
                    </div>
                    <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginTop: '2px' }}>
                      "{log.notes}"
                    </p>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '4px', display: 'flex', gap: '0.5rem' }}>
                      <span>Oleh: {log.uploader} ({log.role})</span>
                      <span>•</span>
                      <span>{log.location}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Material Hampir Habis & Alert Notifikasi */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Boxes size={18} color="var(--status-danger)" />
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>Material Kritis / Logistik Alert</h3>
            </div>
            <span className="badge badge-danger" style={{ fontSize: '0.7rem' }}>
              {lowStockMaterials.length} Item Kritis
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {lowStockMaterials.map((mat) => {
              const proj = projects.find(p => p.id === mat.projectId);
              return (
                <div
                  key={mat.id}
                  style={{
                    padding: '0.875rem',
                    backgroundColor: 'var(--status-danger-bg)',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <div>
                    <div style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                      {mat.name}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                      Proyek: {proj?.name} • Supplier: {mat.supplier}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--status-danger)' }}>
                      {mat.currentStock} {mat.unit}
                    </div>
                    <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                      Min: {mat.minStock} {mat.unit}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Quick Access Proyek Terbaru */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Ringkasan Proyek Utama</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Klik kartu proyek untuk melihat detail lengkap</p>
          </div>
          <button
            onClick={() => navigate('/proyek')}
            className="btn btn-outline btn-sm"
          >
            Lihat Semua Proyek ({projects.length}) <ArrowRight size={14} />
          </button>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.25rem'
        }}>
          {projects.map((proj) => (
            <ProjectCard key={proj.id} project={proj} />
          ))}
        </div>
      </div>

    </div>
  );
}
