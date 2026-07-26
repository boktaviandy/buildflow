import React from 'react';
import { useAppStore } from '../../store/useAppStore';
import { DokumentasiTab } from '../Projects/tabs/DokumentasiTab';

export function DokumentasiGlobalPage() {
  const { selectedProjectId } = useAppStore();
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', paddingBottom: '3rem' }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Pusat Dokumentasi & Berkas Perusahaan</h2>
      <DokumentasiTab projectId={selectedProjectId} />
    </div>
  );
}
