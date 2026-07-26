import React from 'react';
import { useNavigate } from 'react-router-dom';
import { formatRupiahCompact, getProjectStatusBadge, formatDateIndo } from '../../utils/formatters';
import { MapPin, Calendar, UserCheck, HardHat, ChevronRight } from 'lucide-react';

export function ProjectCard({ project }) {
  const navigate = useNavigate();
  const statusInfo = getProjectStatusBadge(project.status);

  // Budget calculations
  const spentPercent = Math.round((project.spent / project.budget) * 100);

  return (
    <div
      onClick={() => navigate(`/proyek/${project.id}`)}
      className="card card-interactive"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        cursor: 'pointer',
        padding: 0,
        overflow: 'hidden'
      }}
    >
      {/* Cover Image & Header Badges */}
      <div style={{ position: 'relative', height: '140px', width: '100%', overflow: 'hidden' }}>
        <img
          src={project.coverImage}
          alt={project.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s ease' }}
        />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(26,30,41,1) 0%, rgba(26,30,41,0.2) 60%, rgba(0,0,0,0.4) 100%)'
        }} />
        
        {/* Top Badges */}
        <div style={{ position: 'absolute', top: '10px', left: '10px', right: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '0.7rem', fontWeight: 700, background: 'rgba(0,0,0,0.6)', color: 'var(--text-secondary)', padding: '2px 8px', borderRadius: '4px', backdropFilter: 'blur(4px)' }}>
            {project.code}
          </span>
          <span className={`badge ${statusInfo.class}`}>
            {statusInfo.label}
          </span>
        </div>

        {/* Floating Progress Percentage */}
        <div style={{ position: 'absolute', bottom: '10px', right: '12px', background: 'var(--bg-surface)', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-sm)', padding: '2px 8px', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Progress:</span>
          <span style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--accent-amber)' }}>{project.progress}%</span>
        </div>
      </div>

      {/* Card Content Body */}
      <div style={{ padding: '0 1.25rem 1.25rem 1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', flex: 1 }}>
        <div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
            {project.name}
          </h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
            <MapPin size={13} color="var(--accent-amber)" />
            <span>{project.location}</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
            <span>Fisik Proyek</span>
            <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{project.progress}%</span>
          </div>
          <div style={{ width: '100%', height: '7px', backgroundColor: 'var(--bg-input)', borderRadius: '4px', overflow: 'hidden' }}>
            <div style={{
              width: `${project.progress}%`,
              height: '100%',
              background: project.status === 'terlambat' ? 'linear-gradient(90deg, #F59E0B 0%, #EF4444 100%)' : 'linear-gradient(90deg, #F59E0B 0%, #10B981 100%)',
              borderRadius: '4px'
            }} />
          </div>
        </div>

        {/* Key Info Metadata Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '0.5rem',
          padding: '0.625rem',
          backgroundColor: 'var(--bg-surface)',
          borderRadius: 'var(--radius-sm)',
          fontSize: '0.75rem'
        }}>
          <div>
            <span style={{ color: 'var(--text-muted)', display: 'block' }}>Nilai Budget</span>
            <strong style={{ color: 'var(--text-primary)', fontSize: '0.82rem' }}>{formatRupiahCompact(project.budget)}</strong>
          </div>
          <div>
            <span style={{ color: 'var(--text-muted)', display: 'block' }}>Terpakai ({spentPercent}%)</span>
            <strong style={{ color: spentPercent > 80 ? 'var(--status-warning)' : 'var(--text-secondary)', fontSize: '0.82rem' }}>
              {formatRupiahCompact(project.spent)}
            </strong>
          </div>
        </div>

        {/* Footer PM & Deadline */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '0.5rem', borderTop: '1px solid var(--border-subtle)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <HardHat size={14} color="var(--accent-amber)" />
            <span>PM: <strong style={{ color: 'var(--text-secondary)' }}>{project.pm}</strong></span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: project.status === 'terlambat' ? 'var(--status-danger)' : 'var(--text-muted)' }}>
            <Calendar size={13} />
            <span>{formatDateIndo(project.deadline)}</span>
          </div>
        </div>

      </div>
    </div>
  );
}
