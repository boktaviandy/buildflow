import React from 'react';
import { useAppStore } from '../../../store/useAppStore';
import { Calendar, CheckCircle2, Clock, PlayCircle } from 'lucide-react';

export function TimelineTab({ projectId }) {
  const { timeline } = useAppStore();
  const tasks = timeline.filter(t => t.projectId === projectId);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Timeline & Jadwal Urutan Pekerjaan</h3>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
            Pantau progress tiap tahap konstruksi dari fondasi hingga finishing
          </p>
        </div>
      </div>

      <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {tasks.map((task, idx) => {
          const isDone = task.status === 'Selesai';
          const inProgress = task.status === 'Berjalan';

          return (
            <div
              key={task.id}
              style={{
                padding: '1rem',
                backgroundColor: 'var(--bg-surface)',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-subtle)',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    backgroundColor: isDone ? 'var(--status-success-bg)' : inProgress ? 'var(--accent-amber-light)' : 'var(--bg-input)',
                    color: isDone ? 'var(--status-success)' : inProgress ? 'var(--accent-amber)' : 'var(--text-muted)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '0.8rem'
                  }}>
                    {idx + 1}
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)' }}>{task.task}</h4>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{task.startDate} s.d {task.endDate}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span className={`badge ${isDone ? 'badge-success' : inProgress ? 'badge-warning' : 'badge-neutral'}`}>
                    {task.status}
                  </span>
                  <span style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--accent-amber)' }}>
                    {task.progress}%
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div style={{ width: '100%', height: '8px', backgroundColor: 'var(--bg-input)', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{
                  width: `${task.progress}%`,
                  height: '100%',
                  backgroundColor: isDone ? 'var(--status-success)' : 'var(--accent-amber)',
                  borderRadius: '4px'
                }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
