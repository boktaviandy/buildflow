import React from 'react';
import { useAppStore } from '../../store/useAppStore';
import { MaterialTab } from '../Projects/tabs/MaterialTab';

export function MaterialGlobalPage() {
  const { selectedProjectId } = useAppStore();
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', paddingBottom: '3rem' }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Manajemen Material & Stok Seluruh Proyek</h2>
      <MaterialTab projectId={selectedProjectId} />
    </div>
  );
}
