import React from 'react';

export function KPICard({ title, value, subtext, icon: Icon, color = "var(--accent-amber)", trend, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`card ${onClick ? 'card-interactive' : ''}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        overflow: 'hidden',
        cursor: onClick ? 'pointer' : 'default'
      }}
    >
      {/* Background Accent Soft Glow */}
      <div style={{
        position: 'absolute',
        top: '-15px',
        right: '-15px',
        width: '70px',
        height: '70px',
        borderRadius: '50%',
        background: color,
        opacity: 0.12,
        blur: '15px'
      }} />

      {/* Top Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
        <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
          {title}
        </span>
        {Icon && (
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: 'var(--radius-sm)',
            backgroundColor: `${color}18`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: color
          }}>
            <Icon size={20} />
          </div>
        )}
      </div>

      {/* Big Value */}
      <div style={{ fontSize: '1.75rem', fontWeight: 800, fontFamily: 'var(--font-heading)', color: 'var(--text-primary)', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
        {value}
      </div>

      {/* Footer Subtext / Trend */}
      {(subtext || trend) && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.625rem', fontSize: '0.75rem' }}>
          {trend && (
            <span style={{
              fontWeight: 700,
              color: trend.startsWith('+') ? 'var(--status-success)' : trend.startsWith('-') ? 'var(--status-danger)' : 'var(--text-muted)'
            }}>
              {trend}
            </span>
          )}
          {subtext && <span style={{ color: 'var(--text-muted)' }}>{subtext}</span>}
        </div>
      )}
    </div>
  );
}
