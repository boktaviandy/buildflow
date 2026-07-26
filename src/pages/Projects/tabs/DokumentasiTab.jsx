import React, { useState } from 'react';
import { useAppStore } from '../../../store/useAppStore';
import { Modal } from '../../../components/ui/Modal';
import { FileText, Download, UploadCloud, Plus, FileSpreadsheet, Image } from 'lucide-react';

export function DokumentasiTab({ projectId }) {
  const { documents, addDocument } = useAppStore();
  const projectDocs = documents.filter(d => d.projectId === projectId);
  
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newDoc, setNewDoc] = useState({
    title: "",
    category: "Gambar Kerja",
    fileSize: "5.4 MB",
    type: "pdf"
  });

  const handleUploadDoc = (e) => {
    e.preventDefault();
    addDocument({
      projectId,
      ...newDoc
    });
    setIsAddModalOpen(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Dokumentasi & Berkas Proyek</h3>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
            Pusat penyimpanan gambar kerja, RAB, BOQ, kontrak, dan surat jalan
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="btn btn-primary amber-glow"
        >
          <UploadCloud size={18} />
          + Upload Berkas Baru
        </button>
      </div>

      {/* Grid of Documents */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem' }}>
        {projectDocs.map((doc) => (
          <div key={doc.id} className="card card-interactive" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: doc.type === 'excel' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
              color: doc.type === 'excel' ? 'var(--status-success)' : 'var(--status-danger)',
              display: 'flex',
              alignItems: 'center',
              justify: 'center',
              flexShrink: 0
            }}>
              {doc.type === 'excel' ? <FileSpreadsheet size={24} /> : <FileText size={24} />}
            </div>

            <div style={{ overflow: 'hidden', flex: 1 }}>
              <div style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {doc.title}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                {doc.category} • {doc.fileSize}
              </div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                Diunggah oleh: {doc.uploadedBy} ({doc.date})
              </div>
            </div>

            <button
              onClick={() => alert(`Mengunduh file berkas: ${doc.title}`)}
              className="btn btn-outline btn-icon"
              title="Unduh Berkas"
            >
              <Download size={16} />
            </button>
          </div>
        ))}
      </div>

      {/* Modal Upload Document */}
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Upload Berkas Proyek Baru">
        <form onSubmit={handleUploadDoc}>
          <div className="form-group">
            <label className="form-label">JUDUL / NAMA FILE</label>
            <input type="text" required placeholder="Gambar_Kerja_Arsitektur_L1.pdf" value={newDoc.title} onChange={e => setNewDoc({ ...newDoc, title: e.target.value })} className="form-input" />
          </div>
          <div className="form-group">
            <label className="form-label">KATEGORI DOKUMEN</label>
            <select value={newDoc.category} onChange={e => setNewDoc({ ...newDoc, category: e.target.value })} className="form-select">
              <option value="Gambar Kerja">Gambar Kerja / Blueprint</option>
              <option value="RAB / BOQ">RAB / BOQ (Rencana Anggaran Biaya)</option>
              <option value="Kontrak">Kontrak Perjanjian & Adendum</option>
              <option value="Surat Jalan">Surat Jalan / Pengiriman Material</option>
              <option value="Foto Progress">Foto Progress Lapangan</option>
            </select>
          </div>
          
          {/* Simulated File Drag Drop Area */}
          <div style={{
            border: '2px dashed var(--border-medium)',
            borderRadius: 'var(--radius-md)',
            padding: '2rem',
            textAlign: 'center',
            backgroundColor: 'var(--bg-input)',
            margin: '1rem 0'
          }}>
            <UploadCloud size={36} color="var(--accent-amber)" style={{ margin: '0 auto 0.5rem auto' }} />
            <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)' }}>Klik untuk memilih file PDF / Excel / Foto</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Maksimal ukuran file 50 MB</div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
            <button type="button" onClick={() => setIsAddModalOpen(false)} className="btn btn-secondary">Batal</button>
            <button type="submit" className="btn btn-primary">Simpan Document</button>
          </div>
        </form>
      </Modal>

    </div>
  );
}
