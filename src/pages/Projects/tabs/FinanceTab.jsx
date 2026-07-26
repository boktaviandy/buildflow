import React, { useState } from 'react';
import { useAppStore } from '../../../store/useAppStore';
import { formatRupiah, formatRupiahCompact } from '../../../utils/formatters';
import { Modal } from '../../../components/ui/Modal';
import { Wallet, Plus, ArrowDownRight, ArrowUpRight, DollarSign, PieChart } from 'lucide-react';

export function FinanceTab({ project }) {
  const { finance, addTransaction, currentUser } = useAppStore();
  const projectTx = finance.filter(f => f.projectId === project.id);
  
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newTx, setNewTx] = useState({
    type: "pengeluaran", // pengeluaran / pemasukan
    category: "Material",
    description: "",
    amount: "",
    invoiceNo: `INV-2026-${Math.floor(1000 + Math.random() * 9000)}`
  });

  const canEdit = currentUser.role === 'admin' || currentUser.role === 'owner';

  const handleAddTx = (e) => {
    e.preventDefault();
    addTransaction({
      projectId: project.id,
      ...newTx
    });
    setIsAddModalOpen(false);
  };

  const totalIn = projectTx.filter(t => t.type === 'pemasukan').reduce((acc, t) => acc + t.amount, 0);
  const totalOut = projectTx.filter(t => t.type === 'pengeluaran').reduce((acc, t) => acc + t.amount, 0);
  const sisaBudget = project.budget - project.spent;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Keuangan & Budget Tracking</h3>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
            Pantau arus kas masuk (termin), pengeluaran material & upah, serta sisa sisa budget
          </p>
        </div>

        {canEdit && (
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="btn btn-primary amber-glow"
          >
            <Plus size={18} />
            + Catat Transaksi Keuangan
          </button>
        )}
      </div>

      {/* Financial Overview Metrics Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
        <div className="card">
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>BUDGET AWAL PROYEK</div>
          <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '4px' }}>{formatRupiahCompact(project.budget)}</div>
        </div>
        <div className="card">
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>TOTAL PENGELUARAN</div>
          <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--status-danger)', marginTop: '4px' }}>{formatRupiahCompact(project.spent)}</div>
        </div>
        <div className="card">
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>SISA BUDGET PROYEK</div>
          <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--status-success)', marginTop: '4px' }}>{formatRupiahCompact(sisaBudget)}</div>
        </div>
        <div className="card">
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>TERMIN CAIR (PEMASUKAN)</div>
          <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--accent-blue)', marginTop: '4px' }}>{formatRupiahCompact(totalIn)}</div>
        </div>
      </div>

      {/* Transaction History Table */}
      <div className="card" style={{ padding: 0, overflowX: 'auto' }}>
        <div style={{ padding: '1rem', borderBottom: '1px solid var(--border-subtle)', fontWeight: 700 }}>
          Riwayat Transaksi Keuangan
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
          <thead>
            <tr style={{ backgroundColor: 'var(--bg-surface)', borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-muted)' }}>
              <th style={{ padding: '0.875rem 1rem' }}>No. Invoice / Ref</th>
              <th style={{ padding: '0.875rem 1rem' }}>Tanggal</th>
              <th style={{ padding: '0.875rem 1rem' }}>Kategori</th>
              <th style={{ padding: '0.875rem 1rem' }}>Keterangan</th>
              <th style={{ padding: '0.875rem 1rem' }}>Tipe</th>
              <th style={{ padding: '0.875rem 1rem', textAlign: 'right' }}>Jumlah Nominal</th>
            </tr>
          </thead>
          <tbody>
            {projectTx.map((tx) => {
              const isOut = tx.type === 'pengeluaran';
              return (
                <tr key={tx.id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                  <td style={{ padding: '0.875rem 1rem', fontWeight: 700, color: 'var(--accent-amber)' }}>
                    {tx.invoiceNo}
                  </td>
                  <td style={{ padding: '0.875rem 1rem', color: 'var(--text-muted)' }}>{tx.date}</td>
                  <td style={{ padding: '0.875rem 1rem', color: 'var(--text-secondary)' }}>{tx.category}</td>
                  <td style={{ padding: '0.875rem 1rem', color: 'var(--text-primary)' }}>{tx.description}</td>
                  <td style={{ padding: '0.875rem 1rem' }}>
                    <span className={`badge ${isOut ? 'badge-danger' : 'badge-success'}`}>
                      {isOut ? 'Pengeluaran' : 'Pemasukan'}
                    </span>
                  </td>
                  <td style={{ padding: '0.875rem 1rem', textAlign: 'right', fontWeight: 800, color: isOut ? 'var(--status-danger)' : 'var(--status-success)' }}>
                    {isOut ? '-' : '+'}{formatRupiah(tx.amount)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Add Transaction Modal */}
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Catat Transaksi Keuangan">
        <form onSubmit={handleAddTx}>
          <div className="form-group">
            <label className="form-label">TIPE TRANSAKSI</label>
            <select value={newTx.type} onChange={e => setNewTx({ ...newTx, type: e.target.value })} className="form-select">
              <option value="pengeluaran">Pengeluaran (Biaya Material/Upah/Sewa)</option>
              <option value="pemasukan">Pemasukan (Termin Pembayaran Klien)</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">KATEGORI</label>
            <select value={newTx.category} onChange={e => setNewTx({ ...newTx, category: e.target.value })} className="form-select">
              <option value="Material">Material & Peralatan</option>
              <option value="Tenaga Kerja">Upah Tenaga Kerja & Mandor</option>
              <option value="Sewa Alat Berat">Sewa Alat Berat & Mobilisasi</option>
              <option value="Termin Pembayaran">Termin Pembayaran Klien</option>
              <option value="Lain-Lain">Lain-Lain</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">NOMINAL TRANSAKSI (RP)</label>
            <input type="number" required placeholder="50000000" value={newTx.amount} onChange={e => setNewTx({ ...newTx, amount: e.target.value })} className="form-input" />
          </div>
          <div className="form-group">
            <label className="form-label">KETERANGAN DETIL</label>
            <input type="text" required placeholder="Rincian pembayaran..." value={newTx.description} onChange={e => setNewTx({ ...newTx, description: e.target.value })} className="form-input" />
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1rem' }}>
            <button type="button" onClick={() => setIsAddModalOpen(false)} className="btn btn-secondary">Batal</button>
            <button type="submit" className="btn btn-primary">Simpan Transaksi</button>
          </div>
        </form>
      </Modal>

    </div>
  );
}
