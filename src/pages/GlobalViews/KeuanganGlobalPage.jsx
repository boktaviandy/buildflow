import React from 'react';
import { useAppStore } from '../../store/useAppStore';
import { FinanceTab } from '../Projects/tabs/FinanceTab';

export function KeuanganGlobalPage() {
  const { projects, selectedProjectId } = useAppStore();
  const proj = projects.find(p => p.id === selectedProjectId) || projects[0];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', paddingBottom: '3rem' }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Keuangan & Budgeting Perusahaan</h2>
      <FinanceTab project={proj} />
    </div>
  );
}
