import React, { useState } from 'react';
import { useAppStore } from '../../../store/useAppStore';
import { formatRupiah } from '../../../utils/formatters';
import { Modal } from '../../../components/ui/Modal';
import { Boxes, Plus, AlertTriangle, ArrowDown, ArrowUp } from 'lucide-react';

export function MaterialTab({ projectId }) {
  const { materials, addMaterial, updateMaterialStock, currentUser } = useAppStore();
  const projectMaterials = materials.filter(m => m.projectId === projectId);
  
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedMatForUpdate, setSelectedMatForUpdate] = useState(null);
  const [stockInAdd, setStockInAdd] = useState(0);
  const [stockOutAdd, setStockOutAdd] = useState(0);

  const [newMat, setNewMat] = useState({
    name: "",
    unit: "Sak",
    stockIn: 100,
    stockOut: 0,
    minStock: 20,
    unitPrice: 75000,
    supplier: ""
  });

  const canEdit = currentUser.role === 'admin' || currentUser.role === 'pm';

  const handleAddMaterial = (e) => {
    e.preventDefault();
    addMaterial({
      projectId,
      ...newMat,
      stockIn: Number(newMat.stockIn),
      stockOut: Number(newMat.stockOut),
      minStock: Number(newMat.minStock),
      unitPrice: Number(newMat.unitPrice)
    });
    setIsAddModalOpen(false);
  };

  const handleUpdateStock = (e) => {
    e.preventDefault();
    if (selectedMatForUpdate) {
      updateMaterialStock(selectedMatForUpdate.id, stockInAdd, stockOutAdd);
      setSelectedMatForUpdate(null);
      setStockInAdd(0);
      setStockOutAdd(0);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Inventaris & Stok Material</h3>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
            Monitoring masuk/keluar material konstruksi dan peringatan stok kritis
          </p>
        </div>

        {canEdit && (
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="btn btn-primary amber-glow"
          >
            <Plus size={18} />
            + Tambah Material
          </button>
        )}
      </div>

      {/* Table Material Inventory */}
      <div className="card" style={{ padding: 0, overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
          <thead>
            <tr style={{ backgroundColor: 'var(--bg-surface)', borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-muted)' }}>
              <th style={{ padding: '0.875rem 1rem' }}>Nama Material</th>
              <th style={{ padding: '0.875rem 1rem' }}>Stok Masuk</th>
              <th style={{ padding: '0.875rem 1rem' }}>Stok Keluar</th>
              <th style={{ padding: '0.875rem 1rem' }}>Sisa Stok</th>
              <th style={{ padding: '0.875rem 1rem' }}>Supplier</th>
              <th style={{ padding: '0.875rem 1rem' }}>Harga / Satuan</th>
              <th style={{ padding: '0.875rem 1rem' }}>Status</th>
              {canEdit && <th style={{ padding: '0.875rem 1rem', textAlign: 'right' }}>Aksi</th>}
            </tr>
          </thead>
          <tbody>
            {projectMaterials.map((mat) => (
              <tr key={mat.id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                <td style={{ padding: '0.875rem 1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  {mat.name}
                </td>
                <td style={{ padding: '0.875rem 1rem', color: 'var(--status-success)' }}>
                  +{mat.stockIn} {mat.unit}
                </td>
                <td style={{ padding: '0.875rem 1rem', color: 'var(--status-danger)' }}>
                  -{mat.stockOut} {mat.unit}
                </td>
                <td style={{ padding: '0.875rem 1rem', fontWeight: 800, fontSize: '0.95rem' }}>
                  {mat.currentStock} {mat.unit}
                </td>
                <td style={{ padding: '0.875rem 1rem', color: 'var(--text-secondary)' }}>
                  {mat.supplier}
                </td>
                <td style={{ padding: '0.875rem 1rem' }}>
                  {formatRupiah(mat.unitPrice)} / {mat.unit}
                </td>
                <td style={{ padding: '0.875rem 1rem' }}>
                  <span className={`badge ${mat.status === 'Kritis' ? 'badge-danger' : 'badge-success'}`}>
                    {mat.status}
                  </span>
                </td>
                {canEdit && (
                  <td style={{ padding: '0.875rem 1rem', textAlign: 'right' }}>
                    <button
                      onClick={() => setSelectedMatForUpdate(mat)}
                      className="btn btn-outline btn-sm"
                    >
                      Update Stok
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Add Material */}
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Input Material Baru">
        <form onSubmit={handleAddMaterial}>
          <div className="form-group">
            <label className="form-label">NAMA MATERIAL</label>
            <input type="text" required placeholder="Contoh: Semen Gresik 50kg" value={newMat.name} onChange={e => setNewMat({ ...newMat, name: e.target.value })} className="form-input" />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">SATUAN</label>
              <input type="text" required placeholder="Sak / Batang / m3 / Truck" value={newMat.unit} onChange={e => setNewMat({ ...newMat, unit: e.target.value })} className="form-input" />
            </div>
            <div className="form-group">
              <label className="form-label">STOK MASUK AWAL</label>
              <input type="number" required value={newMat.stockIn} onChange={e => setNewMat({ ...newMat, stockIn: e.target.value })} className="form-input" />
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">MINIMUM STOK AMAN</label>
              <input type="number" required value={newMat.minStock} onChange={e => setNewMat({ ...newMat, minStock: e.target.value })} className="form-input" />
            </div>
            <div className="form-group">
              <label className="form-label">HARGA SATUAN (RP)</label>
              <input type="number" required value={newMat.unitPrice} onChange={e => setNewMat({ ...newMat, unitPrice: e.target.value })} className="form-input" />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">SUPPLIER</label>
            <input type="text" required placeholder="PT / UD / Toko Bangunan" value={newMat.supplier} onChange={e => setNewMat({ ...newMat, supplier: e.target.value })} className="form-input" />
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1rem' }}>
            <button type="button" onClick={() => setIsAddModalOpen(false)} className="btn btn-secondary">Batal</button>
            <button type="submit" className="btn btn-primary">Simpan Material</button>
          </div>
        </form>
      </Modal>

      {/* Modal Update Stock */}
      <Modal isOpen={!!selectedMatForUpdate} onClose={() => setSelectedMatForUpdate(null)} title={`Update Stok: ${selectedMatForUpdate?.name}`}>
        <form onSubmit={handleUpdateStock}>
          <div className="form-group">
            <label className="form-label">TAMBAH STOK MASUK (+)</label>
            <input type="number" value={stockInAdd} onChange={e => setStockInAdd(e.target.value)} className="form-input" />
          </div>
          <div className="form-group">
            <label className="form-label">CATAT STOK KELUAR (-)</label>
            <input type="number" value={stockOutAdd} onChange={e => setStockOutAdd(e.target.value)} className="form-input" />
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1rem' }}>
            <button type="button" onClick={() => setSelectedMatForUpdate(null)} className="btn btn-secondary">Batal</button>
            <button type="submit" className="btn btn-primary">Update Stok</button>
          </div>
        </form>
      </Modal>

    </div>
  );
}
