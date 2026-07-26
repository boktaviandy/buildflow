import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppStore } from '../../store/useAppStore';
import { getProjectStatusBadge, formatDateIndo } from '../../utils/formatters';
import { OverviewTab } from './tabs/OverviewTab';
import { TimelineTab } from './tabs/TimelineTab';
import { ProgressTab } from './tabs/ProgressTab';
import { MaterialTab } from './tabs/MaterialTab';
import { WorkforceTab } from './tabs/WorkforceTab';
import { FinanceTab } from './tabs/FinanceTab';
import { DokumentasiTab } from './tabs/DokumentasiTab';
import { LaporanTab } from './tabs/LaporanTab';
import {
  ArrowLeft,
  Building2,
  Calendar,
  MapPin,
  Activity,
  Clock,
  Boxes,
  Users,
  Wallet,
  FileText,
  PieChart,
  HardHat
} from 'lucide-react';

export function ProjectDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { projects, progressLogs, materials, workforce, currentUser } = useAppStore();

  const project = projects.find(p => p.id === id) || projects[0];
  const [activeTab, setActiveTab] = useState('overview'); // overview, timeline, progress, material, workforce, finance, docs, reports

  const statusInfo = getProjectStatusBadge(project.status);

  // Tab config & Role access filter
  const tabs = [
    { key: 'overview', label: 'Overview', icon: Building2, roles: ['owner', 'pm', 'mandor', 'admin'] },
    { key: 'timeline', label: 'Timeline Pekerjaan', icon: Clock, roles: ['owner', 'pm', 'mandor', 'admin'] },
    { key: 'progress', label: 'Progress Harian', icon: Activity, roles: ['owner', 'pm', 'mandor', 'admin'] },
    { key: 'material', label: 'Material & Stok', icon: Boxes, roles: ['owner', 'pm', 'admin'] },
    { key: 'workforce', label: 'Tenaga Kerja', icon: Users, roles: ['owner', 'pm', 'mandor', 'admin'] },
    { key: 'finance', label: 'Keuangan', icon: Wallet, roles: ['owner', 'pm', 'admin'] },
    { key: 'docs', label: 'Dokumentasi', icon: FileText, roles: ['owner', 'pm', 'mandor', 'admin'] },
    { key: 'reports', label: 'Laporan', icon: PieChart, roles: ['owner', 'pm'] },
  ];

  const allowedTabs = tabs.filter(t => t.roles.includes(currentUser.role));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', paddingBottom: '3rem' }}>
      
      {/* Top Navigation & Back Button */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button
          onClick={() => navigate('/proyek')}
          className="btn btn-outline btn-sm"
        >
          <ArrowLeft size={16} /> Kembali ke Daftar Proyek
        </button>

        <span className={`badge ${statusInfo.class}`}>
          Status: {statusInfo.label}
        </span>
      </div>

      {/* Project Banner Header */}
      <div className="card glass-panel" style={{
        position: 'relative',
        padding: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        overflow: 'hidden'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ fontSize: '0.78rem', color: 'var(--accent-amber)', fontWeight: 700, letterSpacing: '0.05em' }}>
              {project.code} • KLIEN: {project.client}
            </div>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '2px' }}>
              {project.name}
            </h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '6px', fontSize: '0.85rem', color: 'var(--text-secondary)', flexWrap: 'wrap' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <MapPin size={14} color="var(--accent-amber)" /> {project.location}
              </span>
              <span>•</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Calendar size={14} /> Deadline: {formatDateIndo(project.deadline)}
              </span>
              <span>•</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <HardHat size={14} color="var(--accent-blue)" /> PM: {project.pm}
              </span>
            </div>
          </div>

          {/* Large Progress Gauge Pill */}
          <div style={{
            padding: '0.75rem 1.25rem',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'var(--bg-surface)',
            border: '1px solid var(--border-medium)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600 }}>PROGRESS TOTAL</div>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--accent-amber)', lineHeight: 1.1 }}>
              {project.progress}%
            </div>
          </div>
        </div>
      </div>

      {/* Sub-Tab Navigation Bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        overflowX: 'auto',
        paddingBottom: '0.25rem',
        borderBottom: '1px solid var(--border-subtle)'
      }}>
        {allowedTabs.map((tab) => {
          const IconComp = tab.icon;
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.625rem 1rem',
                borderRadius: 'var(--radius-sm) var(--radius-sm) 0 0',
                fontSize: '0.875rem',
                fontWeight: isActive ? 700 : 500,
                color: isActive ? 'var(--accent-amber)' : 'var(--text-secondary)',
                backgroundColor: isActive ? 'var(--bg-card)' : 'transparent',
                border: 'none',
                borderBottom: isActive ? '3px solid var(--accent-amber)' : '3px solid transparent',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.15s ease'
              }}
            >
              <IconComp size={16} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Active Tab Content Area */}
      <div>
        {activeTab === 'overview' && (
          <OverviewTab project={project} progressLogs={progressLogs} materials={materials} workforce={workforce} />
        )}
        {activeTab === 'timeline' && (
          <TimelineTab projectId={project.id} />
        )}
        {activeTab === 'progress' && (
          <ProgressTab projectId={project.id} />
        )}
        {activeTab === 'material' && (
          <MaterialTab projectId={project.id} />
        )}
        {activeTab === 'workforce' && (
          <WorkforceTab projectId={project.id} />
        )}
        {activeTab === 'finance' && (
          <FinanceTab project={project} />
        )}
        {activeTab === 'docs' && (
          <DokumentasiTab projectId={project.id} />
        )}
        {activeTab === 'reports' && (
          <LaporanTab project={project} progressLogs={progressLogs} materials={materials} workforce={workforce} />
        )}
      </div>

    </div>
  );
}
