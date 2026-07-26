// Format currency to Indonesian Rupiah (Rp)
export function formatRupiah(amount) {
  if (amount === undefined || amount === null || isNaN(amount)) return "Rp 0";
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0
  }).format(amount);
}

// Compact currency formatting (e.g. 4.5 Milyar, 180 Juta)
export function formatRupiahCompact(amount) {
  if (!amount || isNaN(amount)) return "Rp 0";
  if (amount >= 1000000000) {
    return `Rp ${(amount / 1000000000).toFixed(1)} M`;
  }
  if (amount >= 1000000) {
    return `Rp ${(amount / 1000000).toFixed(0)} Jt`;
  }
  return formatRupiah(amount);
}

// Format date to Indonesian standard string (e.g. 26 Juli 2026)
export function formatDateIndo(dateString) {
  if (!dateString) return "-";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric"
  }).format(date);
}

// Helper to trigger direct download of a photo image (supports URL or Base64)
export function downloadImage(photoUrl, filename = 'foto-progress-buildflow.jpg') {
  if (!photoUrl) return;
  const link = document.createElement('a');
  link.href = photoUrl;
  link.download = filename;
  link.target = '_blank';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Role Helper Functions
export const ROLE_CONFIG = {
  owner: {
    label: "Owner / Direktur",
    color: "#F59E0B", // Amber
    badgeClass: "badge-warning",
    description: "Akses penuh monitoring dashboard, budget, & laporan"
  },
  pm: {
    label: "Project Manager",
    color: "#3B82F6", // Blue
    badgeClass: "badge-info",
    description: "Kelola timeline, progress, tim, & operasional proyek"
  },
  mandor: {
    label: "Mandor Lapangan",
    color: "#10B981", // Green
    badgeClass: "badge-success",
    description: "Upload foto progress harian & catat absensi pekerja"
  },
  admin: {
    label: "Admin & Logistik",
    color: "#8B5CF6", // Purple
    badgeClass: "badge-neutral",
    description: "Input material, transaksi keuangan, & dokumen"
  }
};

// Project Status Helper
export function getProjectStatusBadge(status) {
  switch (status) {
    case "aktif":
      return { label: "Aktif", class: "badge-success" };
    case "terlambat":
      return { label: "Terlambat", class: "badge-danger" };
    case "selesai":
      return { label: "Selesai", class: "badge-info" };
    case "arsip":
      return { label: "Arsip", class: "badge-neutral" };
    default:
      return { label: status, class: "badge-neutral" };
  }
}
