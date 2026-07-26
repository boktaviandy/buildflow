import React from 'react';
import { useAppStore } from '../../store/useAppStore';
import { WorkforceTab } from '../Projects/tabs/WorkforceTab';

export function TenagaKerjaGlobalPage() {
  const { selectedProjectId } = useAppStore();
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', paddingBottom: '3rem' }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Manajemen Tenaga Kerja & Absensi</h2>
      <WorkforceTab projectId={selectedProjectId} />
    </div>
  );
}
