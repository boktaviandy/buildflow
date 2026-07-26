import { create } from 'zustand';
import {
  MOCK_USERS,
  MOCK_PROJECTS,
  MOCK_PROGRESS_LOGS,
  MOCK_MATERIALS,
  MOCK_WORKFORCE,
  MOCK_FINANCE,
  MOCK_DOCUMENTS,
  MOCK_TIMELINE
} from '../data/mockData';

export const useAppStore = create((set, get) => ({
  // Auth state
  currentUser: MOCK_USERS[1], // Default to PM (Rian Hidayat)
  users: MOCK_USERS,
  
  setCurrentUser: (userId) => {
    const found = get().users.find(u => u.id === userId);
    if (found) {
      set({ currentUser: found });
    }
  },

  setRole: (roleName) => {
    const found = get().users.find(u => u.role === roleName);
    if (found) {
      set({ currentUser: found });
    }
  },

  // Projects
  projects: MOCK_PROJECTS,
  selectedProjectId: "prj-1",

  setSelectedProjectId: (id) => set({ selectedProjectId: id }),

  addProject: (newProj) => set((state) => ({
    projects: [
      {
        id: `prj-${Date.now()}`,
        code: `PRJ-2026-${String(state.projects.length + 1).padStart(3, '0')}`,
        status: 'aktif',
        progress: 0,
        spent: 0,
        ...newProj
      },
      ...state.projects
    ]
  })),

  updateProjectStatus: (id, status) => set((state) => ({
    projects: state.projects.map(p => p.id === id ? { ...p, status } : p)
  })),

  // Progress Logs
  progressLogs: MOCK_PROGRESS_LOGS,
  
  addProgressLog: (logData) => set((state) => {
    const now = new Date();
    const dateStr = now.toISOString().split('T')[0];
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')} WIB`;
    const currentUser = state.currentUser;

    const newLog = {
      id: `log-${Date.now()}`,
      date: dateStr,
      time: timeStr,
      uploader: currentUser.name,
      role: currentUser.role === 'mandor' ? 'Mandor' : currentUser.role === 'pm' ? 'Project Manager' : 'Staff',
      geoCoords: logData.geoCoords || "-6.3021, 106.6522",
      status: "Berjalan",
      ...logData
    };

    // Auto-update project overall progress percentage if provided
    const updatedProjects = state.projects.map(p => {
      if (p.id === logData.projectId && logData.progressPercent) {
        return { ...p, progress: Number(logData.progressPercent) };
      }
      return p;
    });

    return {
      progressLogs: [newLog, ...state.progressLogs],
      projects: updatedProjects
    };
  }),

  // Material Stock Management
  materials: MOCK_MATERIALS,

  addMaterial: (matData) => set((state) => {
    const currentStock = Number(matData.stockIn) - Number(matData.stockOut || 0);
    const minStock = Number(matData.minStock || 10);
    const status = currentStock <= minStock ? 'Kritis' : 'Aman';

    return {
      materials: [
        ...state.materials,
        {
          id: `mat-${Date.now()}`,
          currentStock,
          status,
          ...matData
        }
      ]
    };
  }),

  updateMaterialStock: (id, stockInAdd, stockOutAdd) => set((state) => {
    return {
      materials: state.materials.map(m => {
        if (m.id === id) {
          const newIn = m.stockIn + Number(stockInAdd || 0);
          const newOut = m.stockOut + Number(stockOutAdd || 0);
          const currentStock = newIn - newOut;
          const status = currentStock <= m.minStock ? 'Kritis' : 'Aman';
          return {
            ...m,
            stockIn: newIn,
            stockOut: newOut,
            currentStock,
            status
          };
        }
        return m;
      })
    };
  }),

  // Workforce Management
  workforce: MOCK_WORKFORCE,

  addWorker: (workerData) => set((state) => ({
    workforce: [
      ...state.workforce,
      {
        id: `wf-${Date.now()}`,
        status: 'Hadir',
        ...workerData
      }
    ]
  })),

  toggleAttendance: (id) => set((state) => ({
    workforce: state.workforce.map(w => {
      if (w.id === id) {
        const nextStatus = w.status === 'Hadir' ? 'Izin' : w.status === 'Izin' ? 'Alpha' : 'Hadir';
        return { ...w, status: nextStatus };
      }
      return w;
    })
  })),

  // Finance Transactions
  finance: MOCK_FINANCE,

  addTransaction: (txData) => set((state) => {
    const newTx = {
      id: `fin-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      status: txData.type === 'pemasukan' ? 'Diterima' : 'Lunas',
      ...txData,
      amount: Number(txData.amount)
    };

    // Update project spent if pengeluaran
    const updatedProjects = state.projects.map(p => {
      if (p.id === txData.projectId && txData.type === 'pengeluaran') {
        return { ...p, spent: p.spent + Number(txData.amount) };
      }
      return p;
    });

    return {
      finance: [newTx, ...state.finance],
      projects: updatedProjects
    };
  }),

  // Documents
  documents: MOCK_DOCUMENTS,

  addDocument: (docData) => set((state) => ({
    documents: [
      {
        id: `doc-${Date.now()}`,
        date: new Date().toISOString().split('T')[0],
        uploadedBy: state.currentUser.name,
        ...docData
      },
      ...state.documents
    ]
  })),

  // Timeline Tasks
  timeline: MOCK_TIMELINE,

  addTimelineTask: (taskData) => set((state) => ({
    timeline: [
      ...state.timeline,
      {
        id: `tm-${Date.now()}`,
        progress: 0,
        status: 'Belum Mulai',
        ...taskData
      }
    ]
  }))
}));
