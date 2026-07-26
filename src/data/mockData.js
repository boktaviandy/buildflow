// BuildFlow Mock Database for 1 Company (Non-SaaS)

export const MOCK_USERS = [
  {
    id: "u-1",
    name: "Budi Santoso",
    email: "owner@buildflow.co.id",
    role: "owner",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    phone: "0812-3456-7890",
    title: "Direktur Utama / Owner"
  },
  {
    id: "u-2",
    name: "Rian Hidayat",
    email: "pm@buildflow.co.id",
    role: "pm",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    phone: "0813-8899-1122",
    title: "Senior Project Manager"
  },
  {
    id: "u-3",
    name: "Pak Slamet",
    email: "mandor@buildflow.co.id",
    role: "mandor",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80",
    phone: "0857-1234-5678",
    title: "Mandor Lapangan"
  },
  {
    id: "u-4",
    name: "Dewi Lestari",
    email: "admin@buildflow.co.id",
    role: "admin",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    phone: "0811-9988-7766",
    title: "Admin Keuangan & Logistik"
  }
];

export const MOCK_PROJECTS = [
  {
    id: "prj-1",
    code: "PRJ-2026-001",
    name: "Gedung Office Park BSD",
    location: "BSD City, Tangerang Selatan",
    client: "PT Sinar Mas Land",
    startDate: "2026-01-15",
    deadline: "2026-11-30",
    status: "aktif", // aktif, selesai, terlambat, arsip
    progress: 42,
    budget: 4500000000,
    spent: 1890000000,
    pm: "Rian Hidayat",
    mandor: "Pak Slamet",
    description: "Pembangunan gedung perkantoran 4 lantai dengan konsep green building dan struktur beton bertulang.",
    coverImage: "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?w=800&auto=format&fit=crop&q=80"
  },
  {
    id: "prj-2",
    code: "PRJ-2026-002",
    name: "Renovasi Rumah Mewah Pondok Indah",
    location: "Pondok Indah, Jakarta Selatan",
    client: "Dr. Hendra Wijaya",
    startDate: "2026-03-01",
    deadline: "2026-08-15",
    status: "terlambat",
    progress: 68,
    budget: 1800000000,
    spent: 1420000000,
    pm: "Rian Hidayat",
    mandor: "Pak Joko",
    description: "Renovasi total interior dan eksterior hunian 2 lantai termasuk kolam renang outdoor dan lantai marmer.",
    coverImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80"
  },
  {
    id: "prj-3",
    code: "PRJ-2026-003",
    name: "Gudang Logistik Cikarang",
    location: "Kawasan Industri MM2100, Cikarang",
    client: "PT Express Cargo Indonesia",
    startDate: "2026-02-10",
    deadline: "2026-09-30",
    status: "aktif",
    progress: 75,
    budget: 6200000000,
    spent: 4650000000,
    pm: "Rian Hidayat",
    mandor: "Pak Slamet",
    description: "Konstruksi gudang rangka baja span 40m dengan lantai kehalusan tinggi (super flat floor).",
    coverImage: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&auto=format&fit=crop&q=80"
  },
  {
    id: "prj-4",
    code: "PRJ-2025-089",
    name: "Jembatan Penyeberangan PIK 2",
    location: "Pantai Indah Kapuk 2, Tangerang",
    client: "Agung Sedayu Group",
    startDate: "2025-08-01",
    deadline: "2026-02-28",
    status: "selesai",
    progress: 100,
    budget: 2400000000,
    spent: 2310000000,
    pm: "Rian Hidayat",
    mandor: "Pak Supri",
    description: "Pekerjaan jembatan penyeberangan pejalan kaki berpenerangan estetis dan lantai kayu komposit.",
    coverImage: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&auto=format&fit=crop&q=80"
  }
];

export const MOCK_PROGRESS_LOGS = [
  {
    id: "log-101",
    projectId: "prj-1",
    date: "2026-07-26",
    time: "15:30 WIB",
    uploader: "Pak Slamet",
    role: "Mandor",
    location: "Lantai 3 - BSD Office Park",
    geoCoords: "-6.3021, 106.6522",
    workCategory: "Pengecoran Plat Lantai",
    progressPercent: 42,
    notes: "Pengecoran plat lantai 3 selesai 80%. Pengiriman beton ready-mix dari Holcim tepat waktu 4 truck. Cuaca cerah.",
    photo: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&auto=format&fit=crop&q=80",
    status: "Berjalan"
  },
  {
    id: "log-102",
    projectId: "prj-1",
    date: "2026-07-25",
    time: "16:45 WIB",
    uploader: "Pak Slamet",
    role: "Mandor",
    location: "Lantai 3 - BSD Office Park",
    geoCoords: "-6.3021, 106.6522",
    workCategory: "Pemasangan Besi D16",
    progressPercent: 40,
    notes: "Rangka pembesian kolom lantai 3 sudah terpasang rapi dan telah diuji inspeksi oleh PM Rian.",
    photo: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&auto=format&fit=crop&q=80",
    status: "Berjalan"
  },
  {
    id: "log-103",
    projectId: "prj-2",
    date: "2026-07-26",
    time: "11:15 WIB",
    uploader: "Pak Joko",
    role: "Mandor",
    location: "Kolam Renang Area Belakang",
    geoCoords: "-6.2655, 106.7842",
    workCategory: "Pemasangan Keramik Pool & Waterproofing",
    progressPercent: 68,
    notes: "Waterproofing membrane tahap 2 selesai. Pengujian genangan air 2x24 jam dimulai hari ini.",
    photo: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=800&auto=format&fit=crop&q=80",
    status: "Berjalan"
  },
  {
    id: "log-104",
    projectId: "prj-3",
    date: "2026-07-26",
    time: "14:00 WIB",
    uploader: "Pak Slamet",
    role: "Mandor",
    location: "Zona A - Warehouse Cikarang",
    geoCoords: "-6.3112, 107.1205",
    workCategory: "Pemasangan Atap Galvalum",
    progressPercent: 75,
    notes: "Pemasangan lisplang dan lembar atap galvalum zona A rampung 90%. Pekerja menggunakan harness K3 lengkap.",
    photo: "https://images.unsplash.com/photo-1590069261209-f8e9b8642343?w=800&auto=format&fit=crop&q=80",
    status: "Berjalan"
  }
];

export const MOCK_MATERIALS = [
  {
    id: "mat-1",
    projectId: "prj-1",
    name: "Semen Tiga Roda 50kg",
    unit: "Sak",
    stockIn: 1200,
    stockOut: 980,
    currentStock: 220,
    minStock: 100,
    unitPrice: 72000,
    supplier: "PT Cipta Cement Nusantara",
    status: "Aman"
  },
  {
    id: "mat-2",
    projectId: "prj-1",
    name: "Besi Beton Polos 12mm x 12m",
    unit: "Batang",
    stockIn: 850,
    stockOut: 810,
    currentStock: 40,
    minStock: 80,
    unitPrice: 115000,
    supplier: "CV Baja Utama Tangerang",
    status: "Kritis" // Hampir habis!
  },
  {
    id: "mat-3",
    projectId: "prj-1",
    name: "Pasir Beton Bangka (Truck 7m³)",
    unit: "Truck",
    stockIn: 45,
    stockOut: 41,
    currentStock: 4,
    minStock: 5,
    unitPrice: 1850000,
    supplier: "UD Tambang Pasir Jaya",
    status: "Kritis"
  },
  {
    id: "mat-4",
    projectId: "prj-1",
    name: "Batu Split 2/3 (Truck 7m³)",
    unit: "Truck",
    stockIn: 30,
    stockOut: 22,
    currentStock: 8,
    minStock: 4,
    unitPrice: 1600000,
    supplier: "UD Batu Alam Merak",
    status: "Aman"
  },
  {
    id: "mat-5",
    projectId: "prj-1",
    name: "Triplek Cor 12mm 4x8ft",
    unit: "Lembar",
    stockIn: 300,
    stockOut: 260,
    currentStock: 40,
    minStock: 30,
    unitPrice: 165000,
    supplier: "TB Kayu Makmur",
    status: "Aman"
  }
];

export const MOCK_WORKFORCE = [
  {
    id: "wf-1",
    projectId: "prj-1",
    name: "Pak Slamet",
    role: "Mandor Utama",
    phone: "0857-1234-5678",
    dailyWage: 250000,
    status: "Hadir",
    assignedTask: "Pengawasan Pengecoran L3"
  },
  {
    id: "wf-2",
    projectId: "prj-1",
    name: "Ahmad Subagja",
    role: "Tukang Batu",
    phone: "0812-9900-1122",
    dailyWage: 180000,
    status: "Hadir",
    assignedTask: "Pemasangan Dinding Herbel L2"
  },
  {
    id: "wf-3",
    projectId: "prj-1",
    name: "Bambang Sugeno",
    role: "Tukang Besi",
    phone: "0878-3344-5566",
    dailyWage: 190000,
    status: "Hadir",
    assignedTask: "Rangkai Besi Kolom Utama"
  },
  {
    id: "wf-4",
    projectId: "prj-1",
    name: "Udin Saepullah",
    role: "Kenek / Pembantu Tukang",
    phone: "0896-1122-3344",
    dailyWage: 130000,
    status: "Hadir",
    assignedTask: "Adukan Semen & Mobilisasi Material"
  },
  {
    id: "wf-5",
    projectId: "prj-1",
    name: "Dede Sukarna",
    role: "Tukang Kayu / Bekisting",
    phone: "0813-7766-5544",
    dailyWage: 185000,
    status: "Izin",
    assignedTask: "Pemasangan Bekisting Plat L3"
  }
];

export const MOCK_FINANCE = [
  {
    id: "fin-1",
    projectId: "prj-1",
    category: "Material",
    description: "Pembelian Semen 500 Sak + Pasir 10 Truck",
    amount: 154000000,
    type: "pengeluaran",
    date: "2026-07-20",
    invoiceNo: "INV-2026-0789",
    status: "Lunas"
  },
  {
    id: "fin-2",
    projectId: "prj-1",
    category: "Tenaga Kerja",
    description: "Pembayaran Upah Mingguan Tukang & Mandor (Minggu 3)",
    amount: 42500000,
    type: "pengeluaran",
    date: "2026-07-22",
    invoiceNo: "PAY-2026-W3",
    status: "Lunas"
  },
  {
    id: "fin-3",
    projectId: "prj-1",
    category: "Termin Pembayaran",
    description: "Pencairan Termin 2 (Progress 40%) dari Client",
    amount: 1350000000,
    type: "pemasukan",
    date: "2026-07-24",
    invoiceNo: "TRM-2026-002",
    status: "Diterima"
  },
  {
    id: "fin-4",
    projectId: "prj-1",
    category: "Sewa Alat Berat",
    description: "Sewa Mobile Crane 25 Ton (3 Hari)",
    amount: 27000000,
    type: "pengeluaran",
    date: "2026-07-18",
    invoiceNo: "INV-CRANE-09",
    status: "Lunas"
  }
];

export const MOCK_DOCUMENTS = [
  {
    id: "doc-1",
    projectId: "prj-1",
    title: "Gambar Kerja Structure & Architecture L1-L4.pdf",
    category: "Gambar Kerja",
    fileSize: "24.5 MB",
    uploadedBy: "Rian Hidayat",
    date: "2026-01-18",
    type: "pdf"
  },
  {
    id: "doc-2",
    projectId: "prj-1",
    title: "RAB & BOQ Final Disetujui Owner.xlsx",
    category: "RAB / BOQ",
    fileSize: "4.2 MB",
    uploadedBy: "Dewi Lestari",
    date: "2026-01-20",
    type: "excel"
  },
  {
    id: "doc-3",
    projectId: "prj-1",
    title: "Kontrak Perjanjian Pemborongan Pekerjaan.pdf",
    category: "Kontrak",
    fileSize: "8.1 MB",
    uploadedBy: "Budi Santoso",
    date: "2026-01-15",
    type: "pdf"
  },
  {
    id: "doc-4",
    projectId: "prj-1",
    title: "Surat Jalan Holcim Ready Mix Batch 4.pdf",
    category: "Surat Jalan",
    fileSize: "1.2 MB",
    uploadedBy: "Pak Slamet",
    date: "2026-07-26",
    type: "pdf"
  }
];

export const MOCK_TIMELINE = [
  { id: "tm-1", projectId: "prj-1", task: "Pekerjaan Pondasi Bore Pile & Pile Cap", startDate: "2026-01-15", endDate: "2026-03-15", progress: 100, status: "Selesai" },
  { id: "tm-2", projectId: "prj-1", task: "Struktur Beton Lantai 1 & 2", startDate: "2026-03-16", endDate: "2026-05-30", progress: 100, status: "Selesai" },
  { id: "tm-3", projectId: "prj-1", task: "Struktur Beton Lantai 3 & 4", startDate: "2026-06-01", endDate: "2026-08-15", progress: 65, status: "Berjalan" },
  { id: "tm-4", projectId: "prj-1", task: "Pasangan Dinding & Plasteran", startDate: "2026-07-15", endDate: "2026-09-30", progress: 20, status: "Berjalan" },
  { id: "tm-5", projectId: "prj-1", task: "Instalasi MEP (Mekanikal, Elektrikal, Plumbing)", startDate: "2026-08-01", endDate: "2026-10-31", progress: 0, status: "Belum Mulai" },
  { id: "tm-6", projectId: "prj-1", task: "Finishing Architecture & Interior", startDate: "2026-09-15", endDate: "2026-11-25", progress: 0, status: "Belum Mulai" }
];
