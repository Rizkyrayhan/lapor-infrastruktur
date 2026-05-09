'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { X, Camera, MapPin, Loader2 } from 'lucide-react';

interface CreateReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function CreateReportModal({ isOpen, onClose, onSuccess }: CreateReportModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [category, setCategory] = useState('Jalanan');
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
          setLocation(`Koordinat: ${position.coords.latitude}, ${position.coords.longitude}`);
        },
        (err) => {
          setError('Gagal mengambil lokasi. Pastikan GPS aktif.');
        }
      );
    } else {
      setError('Browser Anda tidak mendukung Geolocation.');
    }
  };

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('location', location);
    if (latitude) formData.append('latitude', latitude.toString());
    if (longitude) formData.append('longitude', longitude.toString());
    if (image) {
      formData.append('image', image);
    }
    
    try {
      const response = await fetch('http://localhost:3000/reports', {
        method: 'POST',
        headers: { 
          'Authorization': `Bearer ${token}`
        },
        body: formData,
      });

      if (!response.ok) throw new Error('Gagal mengirim laporan');

      onSuccess();
      onClose();
      // Reset state
      setTitle('');
      setDescription('');
      setLocation('');
      setImage(null);
      setImagePreview(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <h3 className="text-xl font-bold text-gray-900">Buat Laporan Baru</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
          {error && (
            <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Judul Laporan</label>
            <input 
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Contoh: Lampu jalan padam di Blok C"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 text-black"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Kategori</label>
              <select 
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 text-black appearance-none bg-white"
              >
                <option>Jalanan</option>
                <option>Penerangan</option>
                <option>Drainase</option>
                <option>Sampah</option>
                <option>Lainnya</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Lokasi (Alamat)</label>
              <div className="flex gap-2">
                <input 
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Nama jalan / wilayah"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 text-black"
                />
                <button 
                  type="button"
                  onClick={handleGetLocation}
                  title="Gunakan Lokasi GPS"
                  className="px-4 py-3 bg-primary-100 text-primary-900 rounded-xl hover:bg-primary-200 transition-all flex items-center justify-center shrink-0"
                >
                  <MapPin size={20} />
                </button>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Deskripsi Masalah</label>
            <textarea 
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Ceritakan detail masalah yang Anda temukan..."
              rows={3}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 text-black"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Unggah Foto Infrastruktur</label>
            <div className="relative border-2 border-dashed border-gray-200 rounded-xl p-4 flex flex-col items-center justify-center text-gray-400 gap-2 cursor-pointer hover:border-primary-300 hover:text-primary-500 transition-all overflow-hidden min-h-[120px]">
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" className="absolute inset-0 w-full h-full object-cover" />
              ) : (
                <>
                  <Camera size={24} />
                  <span className="text-xs font-medium">Klik untuk pilih foto</span>
                </>
              )}
              <input 
                type="file" 
                accept="image/*"
                onChange={handleFileChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </div>
          </div>

          <div className="pt-4 flex gap-3">
            <Button variant="outline" type="button" className="flex-1 py-3" onClick={onClose}>
              Batal
            </Button>
            <Button className="flex-1 py-3" type="submit" disabled={loading}>
              {loading ? <Loader2 className="animate-spin" size={20} /> : 'Kirim Laporan'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
