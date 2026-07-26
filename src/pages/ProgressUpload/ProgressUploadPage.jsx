import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../../store/useAppStore';
import { Camera, MapPin, Check, ArrowLeft, Image, Upload, HardHat, Navigation, RefreshCw } from 'lucide-react';

export function ProgressUploadPage() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const { projects, addProgressLog, currentUser } = useAppStore();

  const [selectedProjectId, setSelectedProjectId] = useState(projects[0].id);
  const [workCategory, setWorkCategory] = useState("Pengecoran Plat Lantai 3");
  const [progressPercent, setProgressPercent] = useState("45");
  const [notes, setNotes] = useState("");
  const [photoPreview, setPhotoPreview] = useState("https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&auto=format&fit=crop&q=80");
  const [isSaved, setIsSaved] = useState(false);
  
  // Realtime Geolocation State
  const [geoCoords, setGeoCoords] = useState("Mendeteksi GPS Realtime...");
  const [isLocating, setIsLocating] = useState(false);

  const selectedProj = projects.find(p => p.id === selectedProjectId);

  // Realtime HTML5 Geolocation API Fetcher
  const fetchRealtimeGPS = () => {
    if ('geolocation' in navigator) {
      setIsLocating(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setGeoCoords(`${latitude.toFixed(4)}° S, ${longitude.toFixed(4)}° E`);
          setIsLocating(false);
        },
        (error) => {
          // Fallback to project default location if permission blocked or unavailable
          setGeoCoords(`${selectedProj?.location || "Area Proyek"} (-6.3021, 106.6522)`);
          setIsLocating(false);
        },
        { enableHighAccuracy: true, timeout: 8000 }
      );
    } else {
      setGeoCoords(`${selectedProj?.location || "Area Proyek"}`);
    }
  };

  useEffect(() => {
    fetchRealtimeGPS();
  }, [selectedProjectId]);

  // Auto metadata timestamp
  const now = new Date();
  const dateStr = now.toISOString().split('T')[0];
  const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')} WIB`;

  const samplePhotos = [
    { label: "Pengecoran Beton", url: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&auto=format&fit=crop&q=80" },
    { label: "Pembesian Kolom", url: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&auto=format&fit=crop&q=80" },
    { label: "Waterproofing Pool", url: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=800&auto=format&fit=crop&q=80" },
    { label: "Atap Galvalum", url: "https://images.unsplash.com/photo-1590069261209-f8e9b8642343?w=800&auto=format&fit=crop&q=80" }
  ];

  // Handle Real Camera Capture & File Picker
  const handleFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPhotoPreview(event.target.result);
      };
      reader.readAsDataURL(file);
      // Re-trigger GPS capture when a new photo is taken
      fetchRealtimeGPS();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addProgressLog({
      projectId: selectedProjectId,
      workCategory,
      progressPercent: Number(progressPercent),
      notes: notes || "Pekerjaan berjalan sesuai standar spesifikasi dan K3.",
      photo: photoPreview,
      geoCoords: geoCoords,
      location: `${selectedProj?.location || "Area Proyek"}`
    });

    setIsSaved(true);
    setTimeout(() => {
      navigate(`/proyek/${selectedProjectId}`);
    }, 1200);
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.25rem', paddingBottom: '4rem' }}>
      
      {/* Hidden File Input for Native Camera / Gallery Upload */}
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        capture="environment"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <button onClick={() => navigate(-1)} className="btn btn-outline btn-sm">
          <ArrowLeft size={16} /> Kembali
        </button>
        <div>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 800 }}>Upload Progress Lapangan</h2>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Form khusus Mandor / Staff untuk update foto real-time</p>
        </div>
      </div>

      {isSaved ? (
        <div className="card glass-panel" style={{ textAlign: 'center', padding: '3rem 1.5rem', borderColor: 'var(--status-success)' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: 'var(--status-success-bg)', color: 'var(--status-success)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
            <Check size={32} />
          </div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Progress Berhasil Disimpan!</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
            Stempel waktu & lokasi GPS realtime ({geoCoords}) disematkan pada foto. Mengalihkan ke detail proyek...
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="card glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', padding: '1.5rem' }}>
          
          {/* Step 1: Select Project */}
          <div className="form-group">
            <label className="form-label" style={{ color: 'var(--accent-amber)' }}>1. PILIH PROYEK</label>
            <select
              value={selectedProjectId}
              onChange={(e) => setSelectedProjectId(e.target.value)}
              className="form-select"
              style={{ fontSize: '1rem', fontWeight: 700, padding: '0.75rem' }}
            >
              {projects.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.location})
                </option>
              ))}
            </select>
          </div>

          {/* Step 2: Native Camera / Photo File Upload */}
          <div className="form-group">
            <label className="form-label" style={{ color: 'var(--accent-amber)' }}>2. AMBIL FOTO KAMERA / UPLOAD LAPANGAN</label>
            
            {/* Prominent Camera Trigger Button */}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="btn btn-primary amber-glow"
              style={{ width: '100%', padding: '0.875rem', fontSize: '0.95rem', marginBottom: '0.75rem' }}
            >
              <Camera size={22} /> Ambil Foto (Kamera HP) / Upload File
            </button>

            {/* Photo Preview Frame with Stamped Realtime Metadata Overlay */}
            <div
              onClick={() => fileInputRef.current?.click()}
              style={{
                position: 'relative',
                width: '100%',
                height: '240px',
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                border: '2px dashed var(--border-accent)',
                backgroundColor: 'var(--bg-input)',
                cursor: 'pointer'
              }}
            >
              <img src={photoPreview} alt="Preview Progress" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              
              {/* Automatic Camera Watermark Stamp with Live GPS */}
              <div style={{
                position: 'absolute',
                bottom: '10px',
                left: '10px',
                right: '10px',
                backgroundColor: 'rgba(11, 13, 18, 0.9)',
                backdropFilter: 'blur(6px)',
                borderRadius: 'var(--radius-sm)',
                padding: '0.625rem 0.875rem',
                fontSize: '0.75rem',
                color: 'var(--text-primary)',
                display: 'flex',
                alignItems: 'center',
                justify: 'space-between',
                border: '1px solid var(--border-medium)'
              }}>
                <div>
                  <div style={{ fontWeight: 700, color: 'var(--accent-amber)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Navigation size={12} className={isLocating ? 'animate-spin' : ''} /> GPS REALTIME GEOTAG
                  </div>
                  <div style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: '0.75rem', marginTop: '2px' }}>
                    {geoCoords}
                  </div>
                  <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>{selectedProj?.location}</div>
                </div>
                <div style={{ textAlign: 'right', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                  <div>{dateStr} {timeStr}</div>
                  <div>Mandor: <strong style={{ color: 'var(--text-primary)' }}>{currentUser.name}</strong></div>
                  
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); fetchRealtimeGPS(); }}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--accent-amber)',
                      fontSize: '0.65rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '2px',
                      marginTop: '4px'
                    }}
                  >
                    <RefreshCw size={10} /> Re-sync GPS
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Preset Sample Photos */}
            <div style={{ marginTop: '0.75rem' }}>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
                Atau pilih contoh foto cepat:
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.25rem' }}>
                {samplePhotos.map((s, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setPhotoPreview(s.url)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      backgroundColor: photoPreview === s.url ? 'var(--accent-amber-light)' : 'var(--bg-input)',
                      border: photoPreview === s.url ? '1px solid var(--accent-amber)' : '1px solid var(--border-subtle)',
                      color: 'var(--text-primary)',
                      fontSize: '0.72rem',
                      cursor: 'pointer',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    <Image size={12} /> {s.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Step 3: Work Category & Progress Percentage */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label" style={{ color: 'var(--accent-amber)' }}>3. KATEGORI PEKERJAAN</label>
              <input
                type="text"
                required
                value={workCategory}
                onChange={(e) => setWorkCategory(e.target.value)}
                placeholder="Pemasangan Dinding Herbel"
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label className="form-label" style={{ color: 'var(--accent-amber)' }}>4. ESTIMASI PROGRESS FISIK (%)</label>
              <input
                type="number"
                min="0"
                max="100"
                required
                value={progressPercent}
                onChange={(e) => setProgressPercent(e.target.value)}
                className="form-input"
                style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--accent-amber)' }}
              />
            </div>
          </div>

          {/* Step 4: Notes */}
          <div className="form-group">
            <label className="form-label" style={{ color: 'var(--accent-amber)' }}>5. CATATAN & KONDISI LAPANGAN</label>
            <textarea
              rows={3}
              required
              placeholder="Catat penggunaan material, jumlah tukang yang bekerja, dan kendala cuaca jika ada..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="form-textarea"
            />
          </div>

          {/* Save Button */}
          <button
            type="submit"
            className="btn btn-primary btn-lg amber-glow"
            style={{ width: '100%', marginTop: '0.5rem' }}
          >
            <Check size={20} />
            Simpan Laporan Progress Lapangan
          </button>

        </form>
      )}

    </div>
  );
}
