import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../../../store/useAppStore';
import { downloadImage } from '../../../utils/formatters';
import { Modal } from '../../../components/ui/Modal';
import { Camera, MapPin, Clock, Calendar, UserCheck, Plus, Download, Eye } from 'lucide-react';

export function ProgressTab({ projectId }) {
  const navigate = useNavigate();
  const { progressLogs, currentUser } = useAppStore();
  const [selectedPhotoModal, setSelectedPhotoModal] = useState(null);

  const projectLogs = progressLogs.filter(l => l.projectId === projectId);
  const canUpload = currentUser.role === 'mandor' || currentUser.role === 'pm';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Laporan Progress Harian Lapangan</h3>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
            Dokumentasi foto real-time, geotagging, dan catatan pekerjaan harian mandor (dapat dilihat & diunduh)
          </p>
        </div>

        {canUpload && (
          <button
            onClick={() => navigate('/upload-progress')}
            className="btn btn-primary amber-glow"
          >
            <Camera size={18} />
            + Tambah Progress Foto
          </button>
        )}
      </div>

      {/* Grid of Progress Log Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.25rem' }}>
        {projectLogs.map((log) => (
          <div key={log.id} className="card" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div style={{ position: 'relative', height: '200px', width: '100%', cursor: 'pointer' }} onClick={() => setSelectedPhotoModal(log)}>
              <img src={log.photo} alt={log.workCategory} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              
              {/* Floating Action Buttons for View & Download */}
              <div style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                display: 'flex',
                gap: '6px'
              }}>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); setSelectedPhotoModal(log); }}
                  className="btn btn-secondary btn-sm btn-icon"
                  title="Lihat Perbesar"
                  style={{ backgroundColor: 'rgba(15, 17, 23, 0.85)', color: 'white', border: 'none' }}
                >
                  <Eye size={16} />
                </button>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); downloadImage(log.photo, `Foto-Progress-${log.workCategory}.jpg`); }}
                  className="btn btn-primary btn-sm btn-icon amber-glow"
                  title="Download Foto HD"
                  style={{ border: 'none' }}
                >
                  <Download size={16} />
                </button>
              </div>

              {/* Geotag & Time Overlay Stamp */}
              <div style={{
                position: 'absolute',
                bottom: '8px',
                left: '8px',
                right: '8px',
                backgroundColor: 'rgba(15, 17, 23, 0.88)',
                backdropFilter: 'blur(4px)',
                borderRadius: 'var(--radius-sm)',
                padding: '6px 10px',
                fontSize: '0.7rem',
                color: 'var(--text-primary)',
                display: 'flex',
                alignItems: 'center',
                justify: 'space-between',
                border: '1px solid var(--border-subtle)'
              }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600, color: 'var(--accent-amber)' }}>
                  <MapPin size={12} /> {log.geoCoords || log.location}
                </span>
                <span>{log.date} {log.time}</span>
              </div>
            </div>

            <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  {log.workCategory}
                </div>
                <span className="badge badge-success">Progress {log.progressPercent || 42}%</span>
              </div>

              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', fontStyle: 'italic' }}>
                "{log.notes}"
              </p>
              
              <div style={{ marginTop: 'auto', paddingTop: '0.75rem', borderTop: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                <span>Mandor: <strong style={{ color: 'var(--text-primary)' }}>{log.uploader}</strong></span>
                <button
                  type="button"
                  onClick={() => downloadImage(log.photo, `Foto-Progress-${log.workCategory}.jpg`)}
                  className="btn btn-outline btn-sm"
                  style={{ fontSize: '0.75rem', padding: '3px 10px', gap: '4px' }}
                >
                  <Download size={13} /> Unduh Foto HD
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Fullscreen Preview */}
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
                <span>GPS Geotag: {selectedPhotoModal.geoCoords || selectedPhotoModal.location}</span>
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
