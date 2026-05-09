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
  const [category, setCategory] = useState('Jalanan');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const token = localStorage.getItem('token');
    
    try {
      // For simplicity, we'll send a dummy report if there's no actual file upload implemented here yet
      // In a real app, we would use FormData for the image
      const response = await fetch('http://localhost:3000/reports', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          title,
          description,
          category,
          location: 'Kecamatan Pusat', // Placeholder
        }),
      });

      if (!response.ok) throw new Error('Gagal mengirim laporan');

      onSuccess();
      onClose();
      setTitle('');
      setDescription('');
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

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
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

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Kategori</label>
            <select 
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 text-black appearance-none"
            >
              <option>Jalanan</option>
              <option>Penerangan</option>
              <option>Drainase</option>
              <option>Sampah</option>
              <option>Lainnya</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Deskripsi Masalah</label>
            <textarea 
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Ceritakan detail masalah yang Anda temukan..."
              rows={4}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 text-black"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="border-2 border-dashed border-gray-200 rounded-xl p-4 flex flex-col items-center justify-center text-gray-400 gap-2 cursor-pointer hover:border-primary-300 hover:text-primary-500 transition-all">
              <Camera size={24} />
              <span className="text-xs font-medium">Unggah Foto</span>
            </div>
            <div className="border-2 border-dashed border-gray-200 rounded-xl p-4 flex flex-col items-center justify-center text-gray-400 gap-2 cursor-pointer hover:border-primary-300 hover:text-primary-500 transition-all">
              <MapPin size={24} />
              <span className="text-xs font-medium">Titik Lokasi</span>
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
