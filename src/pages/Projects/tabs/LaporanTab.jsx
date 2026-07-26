import React, { useState } from 'react';
import { formatRupiah, formatDateIndo, downloadImage } from '../../../utils/formatters';
import { Modal } from '../../../components/ui/Modal';
import { FileText, Download, Printer, CheckCircle2, FileSpreadsheet, Eye, MapPin, Camera, Image } from 'lucide-react';

export function LaporanTab({ project, progressLogs, materials, workforce }) {
  const [reportPeriod, setReportPeriod] = useState('mingguan'); // mingguan / bulanan
  const [selectedPhotoModal, setSelectedPhotoModal] = useState(null);

  const projectLogs = progressLogs.filter(l => l.projectId === project.id);

  const handleExportPDF = () => {
    alert(`Mengeksport Laporan ${reportPeriod.toUpperCase()} Proyek ${project.name} ke format PDF!`);
  };

  const handleExportExcel = () => {
    alert(`Mengeksport Laporan ${reportPeriod.toUpperCase()} Proyek ${project.name} ke format Excel (.xlsx)!`);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Export Laporan Proyek</h3>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
            Cetak laporan resmi progress fisik, penggunaan budget, dan dokumentasi foto Mandor untuk Owner & Klien
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button onClick={handleExportExcel} className="btn btn-outline">
            <FileSpreadsheet size={16} /> Export Excel
          </button>
          <button onClick={handleExportPDF} className="btn btn-primary amber-glow">
            <Download size={16} /> Export PDF Laporan
          </button>
        </div>
      </div>

      {/* Report Preview Document Card */}
      <div className="card glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', backgroundColor: '#141720' }}>
        
        {/* Document Header */}
        <div style={{ borderBottom: '2px solid var(--accent-amber)', paddingBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 800 }}>LAPORAN EXECUTIVE PROGRESS PROYEK</h2>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>PT BUILDFLOW KONTRAKTOR INDONESIA</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <span className="badge badge-warning" style={{ fontSize: '0.8rem' }}>PERIODE: JULI 2026</span>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>Generated: {formatDateIndo(new Date())}</div>
          </div>
        </div>

        {/* Report Summary Details */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', backgroundColor: 'var(--bg-surface)', padding: '1rem', borderRadius: 'var(--radius-sm)' }}>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>PROYEK:</div>
            <strong style={{ fontSize: '0.9rem', color: 'var(--text-primary)' }}>{project.name}</strong>
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>KODE PROYEK:</div>
            <strong style={{ fontSize: '0.9rem', color: 'var(--accent-amber)' }}>{project.code}</strong>
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>PROJECT MANAGER:</div>
            <strong style={{ fontSize: '0.9rem', color: 'var(--text-primary)' }}>{project.pm}</strong>
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>PROGRESS FISIK:</div>
            <strong style={{ fontSize: '0.9rem', color: 'var(--status-success)' }}>{project.progress}% Selesai</strong>
          </div>
        </div>

        {/* Section 1: Financial & Budget Execution */}
        <div>
          <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--accent-amber)', marginBottom: '0.5rem' }}>
            1. REALISASI PENYERAPAN ANGGARAN (BUDGET)
          </h4>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            - Anggaran Awal Proyek: <strong>{formatRupiah(project.budget)}</strong><br />
            - Total Realisasi Biaya: <strong>{formatRupiah(project.spent)}</strong> ({Math.round((project.spent/project.budget)*100)}% dari Anggaran)<br />
            - Sisa Saldo Anggaran: <strong>{formatRupiah(project.budget - project.spent)}</strong>
          </div>
        </div>

        {/* Section 2: Progress Updates & Workforce */}
        <div>
          <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--accent-amber)', marginBottom: '0.5rem' }}>
            2. CATATAN OPERASIONAL & K3 LAPANGAN
          </h4>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            - Total Laporan Progress Harian diunggah: <strong>{projectLogs.length} catatan foto</strong><br />
            - Tingkat Kehadiran Tenaga Kerja: <strong>{workforce.filter(w => w.projectId === project.id && w.status === 'Hadir').length} / {workforce.filter(w => w.projectId === project.id).length} pekerja aktif</strong><br />
            - Zero Accident K3 tercapai selama periode berjalan.
          </div>
        </div>

        {/* Section 3: Lampiran Foto Progress Lapangan Mandor (Bisa Lihat & Download) */}
        <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--accent-amber)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Camera size={18} /> 3. LAMPIRAN DOKUMENTASI FOTO PROGRESS MANDOR ({projectLogs.length} FOTO)
            </h4>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Klik foto untuk perbesar / download HD</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1rem' }}>
            {projectLogs.map((log) => (
              <div
                key={log.id}
                style={{
                  backgroundColor: 'var(--bg-surface)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-sm)',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                {/* Photo Container */}
                <div style={{ position: 'relative', height: '160px', width: '100%', cursor: 'pointer' }} onClick={() => setSelectedPhotoModal(log)}>
                  <img src={log.photo} alt={log.workCategory} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  
                  {/* Hover Quick Action overlay buttons */}
                  <div style={{
                    position: 'absolute',
                    top: '8px',
                    right: '8px',
                    display: 'flex',
                    gap: '4px'
                  }}>
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); setSelectedPhotoModal(log); }}
                      className="btn btn-secondary btn-icon btn-sm"
                      title="Lihat Fullscreen"
                      style={{ backgroundColor: 'rgba(0,0,0,0.75)', color: 'white', border: 'none' }}
                    >
                      <Eye size={14} />
                    </button>
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); downloadImage(log.photo, `Foto-Progress-${log.workCategory}.jpg`); }}
                      className="btn btn-primary btn-icon btn-sm"
                      title="Download Foto HD"
                      style={{ border: 'none' }}
                    >
                      <Download size={14} />
                    </button>
                  </div>

                  {/* Stamp info */}
                  <div style={{
                    position: 'absolute',
                    bottom: '6px',
                    left: '6px',
                    right: '6px',
                    backgroundColor: 'rgba(15, 17, 23, 0.88)',
                    padding: '4px 6px',
                    borderRadius: '4px',
                    fontSize: '0.68rem',
                    color: 'var(--text-primary)',
                    display: 'flex',
                    justify: 'space-between'
                  }}>
                    <span>{log.date}</span>
                    <span>{log.geoCoords || log.location}</span>
                  </div>
                </div>

                {/* Photo metadata footer */}
                <div style={{ padding: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                  <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-primary)' }}>{log.workCategory}</div>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontStyle: 'italic' }}>"{log.notes}"</p>
                  
                  <div style={{ marginTop: '0.5rem', paddingTop: '0.5rem', borderTop: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Oleh: {log.uploader}</span>
                    <button
                      onClick={() => downloadImage(log.photo, `Foto-Progress-${log.workCategory}.jpg`)}
                      className="btn btn-outline btn-sm"
                      style={{ fontSize: '0.7rem', padding: '2px 8px', gap: '4px' }}
                    >
                      <Download size={12} /> Download
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>

      </div>

      {/* Modal Fullscreen Preview Photo */}
      <Modal
        isOpen={!!selectedPhotoModal}
        onClose={() => setSelectedPhotoModal(null)}
        title={`Dokumentasi Lapangan: ${selectedPhotoModal?.workCategory || ''}`}
        maxWidth="720px"
      >
        {selectedPhotoModal && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ position: 'relative', width: '100%', height: '400px', borderRadius: 'var(--radius-md)', overflow: 'hidden', backgroundColor: 'black' }}>
              <img src={selectedPhotoModal.photo} alt={selectedPhotoModal.workCategory} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </div>

            <div style={{ padding: '1rem', backgroundColor: 'var(--bg-input)', borderRadius: 'var(--radius-sm)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <strong style={{ fontSize: '1rem', color: 'var(--accent-amber)' }}>{selectedPhotoModal.workCategory}</strong>
                <span className="badge badge-success">Progress {selectedPhotoModal.progressPercent || 45}%</span>
              </div>

              <p style={{ fontSize: '0.875rem', color: 'var(--text-primary)' }}>"{selectedPhotoModal.notes}"</p>

              <div style={{ display: 'flex', gap: '1rem', fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.5rem', flexWrap: 'wrap' }}>
                <span>Tanggal: {selectedPhotoModal.date} ({selectedPhotoModal.time})</span>
                <span>Mandor: {selectedPhotoModal.uploader}</span>
                <span>GPS: {selectedPhotoModal.geoCoords || selectedPhotoModal.location}</span>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
              <button onClick={() => setSelectedPhotoModal(null)} className="btn btn-secondary">Tutup</button>
              <button
                onClick={() => downloadImage(selectedPhotoModal.photo, `Foto-Progress-${selectedPhotoModal.workCategory}.jpg`)}
                className="btn btn-primary amber-glow"
              >
                <Download size={16} /> Download Foto Asli (HD)
              </button>
            </div>
          </div>
        )}
      </Modal>

    </div>
  );
}
