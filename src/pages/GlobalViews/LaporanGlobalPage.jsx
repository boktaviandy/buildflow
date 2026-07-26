import React from 'react';
import { useAppStore } from '../../store/useAppStore';
import { LaporanTab } from '../Projects/tabs/LaporanTab';

export function LaporanGlobalPage() {
  const { projects, progressLogs, materials, workforce, selectedProjectId } = useAppStore();
  const proj = projects.find(p => p.id === selectedProjectId) || projects[0];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', paddingBottom: '3rem' }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Pusat Laporan & Export Data</h2>
      <LaporanTab project={proj} progressLogs={progressLogs} materials={materials} workforce={workforce} />
    </div>
  );
}
