import React, { useState } from 'react';
import { useAppStore } from '../../../store/useAppStore';
import { formatRupiah } from '../../../utils/formatters';
import { Modal } from '../../../components/ui/Modal';
import { Users, Plus, CheckCircle2, UserX, Phone, HardHat } from 'lucide-react';

export function WorkforceTab({ projectId }) {
  const { workforce, toggleAttendance, addWorker, currentUser } = useAppStore();
  const projectWorkers = workforce.filter(w => w.projectId === projectId);
  
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newWorker, setNewWorker] = useState({
    name: "",
    role: "Tukang Batu",
    phone: "",
    dailyWage: 180000,
    assignedTask: ""
  });

  const canEdit = currentUser.role === 'admin' || currentUser.role === 'pm' || currentUser.role === 'mandor';

  const handleAddWorker = (e) => {
    e.preventDefault();
    addWorker({
      projectId,
      ...newWorker,
      dailyWage: Number(newWorker.dailyWage)
    });
    setIsAddModalOpen(false);
  };

  const presentCount = projectWorkers.filter(w => w.status === 'Hadir').length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Tenaga Kerja & Absensi Lapangan</h3>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
            Total Pekerja: {projectWorkers.length} orang • Hadir hari ini: <strong style={{ color: 'var(--status-success)' }}>{presentCount} orang</strong>
          </p>
        </div>

        {canEdit && (
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="btn btn-primary amber-glow"
          >
            <Plus size={18} />
            + Tambah Pekerja Baru
          </button>
        )}
      </div>

      {/* Workforce Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem' }}>
        {projectWorkers.map((w) => {
          const isHadir = w.status === 'Hadir';
          return (
            <div key={w.id} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <HardHat size={20} color="var(--accent-amber)" />
                  <div>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)' }}>{w.name}</h4>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{w.role}</span>
                  </div>
                </div>

                <button
                  onClick={() => canEdit && toggleAttendance(w.id)}
                  className={`badge ${isHadir ? 'badge-success' : 'badge-danger'}`}
                  style={{ border: 'none', cursor: canEdit ? 'pointer' : 'default' }}
                >
                  {w.status}
                </button>
              </div>

              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '4px', backgroundColor: 'var(--bg-surface)', padding: '0.625rem', borderRadius: 'var(--radius-sm)' }}>
                <div>Tugas: <strong>{w.assignedTask || "Pekerjaan Umum"}</strong></div>
                <div>Upah Harian: <strong>{formatRupiah(w.dailyWage)} / hari</strong></div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-muted)' }}>
                  <Phone size={12} /> {w.phone}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Worker Modal */}
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Tambah Data Pekerja">
        <form onSubmit={handleAddWorker}>
          <div className="form-group">
            <label className="form-label">NAMA PEKERJA</label>
            <input type="text" required placeholder="Nama lengkap" value={newWorker.name} onChange={e => setNewWorker({ ...newWorker, name: e.target.value })} className="form-input" />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">JABATAN / PERAN</label>
              <select value={newWorker.role} onChange={e => setNewWorker({ ...newWorker, role: e.target.value })} className="form-select">
                <option value="Mandor Utama">Mandor Utama</option>
                <option value="Tukang Batu">Tukang Batu</option>
                <option value="Tukang Kayu">Tukang Kayu</option>
                <option value="Tukang Besi">Tukang Besi</option>
                <option value="Tukang Cat">Tukang Cat</option>
                <option value="Kenek / Pembantu">Kenek / Pembantu</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">UPAH HARIAN (RP)</label>
              <input type="number" required value={newWorker.dailyWage} onChange={e => setNewWorker({ ...newWorker, dailyWage: e.target.value })} className="form-input" />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">NOMOR HP</label>
            <input type="text" required placeholder="0812-xxxx-xxxx" value={newWorker.phone} onChange={e => setNewWorker({ ...newWorker, phone: e.target.value })} className="form-input" />
          </div>
          <div className="form-group">
            <label className="form-label">TUGAS YANG DIBERIKAN</label>
            <input type="text" placeholder="Contoh: Pengecoran Plat Lantai 3" value={newWorker.assignedTask} onChange={e => setNewWorker({ ...newWorker, assignedTask: e.target.value })} className="form-input" />
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1rem' }}>
            <button type="button" onClick={() => setIsAddModalOpen(false)} className="btn btn-secondary">Batal</button>
            <button type="submit" className="btn btn-primary">Simpan Pekerja</button>
          </div>
        </form>
      </Modal>

    </div>
  );
}
