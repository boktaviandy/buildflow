import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../../store/useAppStore';
import { ProjectCard } from '../../components/ui/ProjectCard';
import { Modal } from '../../components/ui/Modal';
import { formatRupiahCompact, getProjectStatusBadge, formatDateIndo } from '../../utils/formatters';
import {
  Building2,
  Plus,
  Search,
  Filter,
  Grid,
  List,
  MapPin,
  Calendar,
  DollarSign
} from 'lucide-react';

export function ProjectListPage() {
  const navigate = useNavigate();
  const { projects, addProject, currentUser } = useAppStore();
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("grid"); // grid or list
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New project form state
  const [newProj, setNewProj] = useState({
    name: "",
    location: "",
    client: "",
    startDate: "",
    deadline: "",
    budget: "",
    pm: currentUser.name,
    mandor: "Pak Slamet",
    description: "",
    coverImage: "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?w=800&auto=format&fit=crop&q=80"
  });

  // Filtered projects
  const filteredProjects = projects.filter(p => {
    const matchesStatus = filterStatus === 'all' || p.status === filterStatus;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.client.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleCreateProject = (e) => {
    e.preventDefault();
    addProject({
      ...newProj,
      budget: Number(newProj.budget)
    });
    setIsAddModalOpen(false);
    setNewProj({
      name: "",
      location: "",
      client: "",
      startDate: "",
      deadline: "",
      budget: "",
      pm: currentUser.name,
      mandor: "Pak Slamet",
      description: "",
      coverImage: "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?w=800&auto=format&fit=crop&q=80"
    });
  };

  const canAddProject = currentUser.role === 'admin' || currentUser.role === 'pm';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', paddingBottom: '3rem' }}>
      
      {/* Header Bar & Actions */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Daftar Proyek Konstruksi</h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            Kelola dan pantau seluruh portofolio proyek internal perusahaan
          </p>
        </div>

        {canAddProject && (
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="btn btn-primary amber-glow"
          >
            <Plus size={18} />
            + Tambah Proyek Baru
          </button>
        )}
      </div>

      {/* Filter Bar */}
      <div className="card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', padding: '0.875rem 1.25rem' }}>
        
        {/* Filter Pills */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Filter size={14} /> Status:
          </span>
          {['all', 'aktif', 'terlambat', 'selesai', 'arsip'].map((statusKey) => (
            <button
              key={statusKey}
              onClick={() => setFilterStatus(statusKey)}
              className={`btn btn-sm ${filterStatus === statusKey ? 'btn-primary' : 'btn-secondary'}`}
              style={{ textTransform: 'capitalize' }}
            >
              {statusKey === 'all' ? 'Semua Status' : statusKey}
            </button>
          ))}
        </div>

        {/* Right Search & View Mode Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ position: 'relative', width: '220px' }}>
            <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder="Cari proyek..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="form-input"
              style={{ paddingLeft: '2.25rem', fontSize: '0.8rem', padding: '0.375rem 0.75rem 0.375rem 2.25rem' }}
            />
          </div>

          <div style={{ display: 'flex', backgroundColor: 'var(--bg-input)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)', padding: '2px' }}>
            <button
              onClick={() => setViewMode('grid')}
              style={{
                background: viewMode === 'grid' ? 'var(--bg-elevated)' : 'transparent',
                border: 'none',
                color: viewMode === 'grid' ? 'var(--accent-amber)' : 'var(--text-muted)',
                padding: '4px 8px',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              <Grid size={16} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              style={{
                background: viewMode === 'list' ? 'var(--bg-elevated)' : 'transparent',
                border: 'none',
                color: viewMode === 'list' ? 'var(--accent-amber)' : 'var(--text-muted)',
                padding: '4px 8px',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              <List size={16} />
            </button>
          </div>
        </div>

      </div>

      {/* Projects Grid or List View */}
      {viewMode === 'grid' ? (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '1.25rem'
        }}>
          {filteredProjects.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      ) : (
        <div className="card" style={{ padding: 0, overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
            <thead>
              <tr style={{ backgroundColor: 'var(--bg-surface)', borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-muted)' }}>
                <th style={{ padding: '0.875rem 1rem' }}>Kode & Nama Proyek</th>
                <th style={{ padding: '0.875rem 1rem' }}>Lokasi</th>
                <th style={{ padding: '0.875rem 1rem' }}>PM / Mandor</th>
                <th style={{ padding: '0.875rem 1rem' }}>Progress</th>
                <th style={{ padding: '0.875rem 1rem' }}>Budget / Terpakai</th>
                <th style={{ padding: '0.875rem 1rem' }}>Status</th>
                <th style={{ padding: '0.875rem 1rem', textAlign: 'right' }}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredProjects.map((p) => {
                const statusInfo = getProjectStatusBadge(p.status);
                return (
                  <tr key={p.id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                    <td style={{ padding: '0.875rem 1rem' }}>
                      <div style={{ fontSize: '0.75rem', color: 'var(--accent-amber)', fontWeight: 700 }}>{p.code}</div>
                      <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{p.name}</div>
                    </td>
                    <td style={{ padding: '0.875rem 1rem', color: 'var(--text-secondary)' }}>{p.location}</td>
                    <td style={{ padding: '0.875rem 1rem', color: 'var(--text-secondary)' }}>{p.pm} / {p.mandor}</td>
                    <td style={{ padding: '0.875rem 1rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <div style={{ width: '80px', height: '6px', backgroundColor: 'var(--bg-input)', borderRadius: '3px' }}>
                          <div style={{ width: `${p.progress}%`, height: '100%', backgroundColor: 'var(--accent-amber)', borderRadius: '3px' }} />
                        </div>
                        <span style={{ fontWeight: 700 }}>{p.progress}%</span>
                      </div>
                    </td>
                    <td style={{ padding: '0.875rem 1rem' }}>
                      <div>{formatRupiahCompact(p.budget)}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Spent: {formatRupiahCompact(p.spent)}</div>
                    </td>
                    <td style={{ padding: '0.875rem 1rem' }}>
                      <span className={`badge ${statusInfo.class}`}>{statusInfo.label}</span>
                    </td>
                    <td style={{ padding: '0.875rem 1rem', textAlign: 'right' }}>
                      <button
                        onClick={() => navigate(`/proyek/${p.id}`)}
                        className="btn btn-outline btn-sm"
                      >
                        Detail
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal Add Project */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Tambah Proyek Konstruksi Baru"
      >
        <form onSubmit={handleCreateProject}>
          <div className="form-group">
            <label className="form-label">NAMA PROYEK</label>
            <input
              type="text"
              required
              placeholder="Contoh: Pembangunan Mall Serpong"
              value={newProj.name}
              onChange={(e) => setNewProj({ ...newProj, name: e.target.value })}
              className="form-input"
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">LOKASI</label>
              <input
                type="text"
                required
                placeholder="Kota / Alamat"
                value={newProj.location}
                onChange={(e) => setNewProj({ ...newProj, location: e.target.value })}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label className="form-label">NAMA CLIENT</label>
              <input
                type="text"
                required
                placeholder="PT / Pemilik"
                value={newProj.client}
                onChange={(e) => setNewProj({ ...newProj, client: e.target.value })}
                className="form-input"
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">TANGGAL MULAI</label>
              <input
                type="date"
                required
                value={newProj.startDate}
                onChange={(e) => setNewProj({ ...newProj, startDate: e.target.value })}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label className="form-label">DEADLINE</label>
              <input
                type="date"
                required
                value={newProj.deadline}
                onChange={(e) => setNewProj({ ...newProj, deadline: e.target.value })}
                className="form-input"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">NILAI BUDGET (RP)</label>
            <input
              type="number"
              required
              placeholder="4500000000"
              value={newProj.budget}
              onChange={(e) => setNewProj({ ...newProj, budget: e.target.value })}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">DESKRIPSI PENDEK PROYEK</label>
            <textarea
              rows={3}
              placeholder="Rincian lingkup pekerjaan proyek..."
              value={newProj.description}
              onChange={(e) => setNewProj({ ...newProj, description: e.target.value })}
              className="form-textarea"
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
            <button type="button" onClick={() => setIsAddModalOpen(false)} className="btn btn-secondary">
              Batal
            </button>
            <button type="submit" className="btn btn-primary">
              Simpan Proyek
            </button>
          </div>
        </form>
      </Modal>

    </div>
  );
}
