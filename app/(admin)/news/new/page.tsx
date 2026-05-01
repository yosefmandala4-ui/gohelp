'use client';

import { useState } from 'react';
import { Newspaper, ChevronLeft, Save, Loader2 } from 'lucide-react';
import Link from 'next/link';
import ImageUpload from '@/components/ImageUpload';
import { createNews } from '@/lib/actions/news';

export default function NewNewsPage() {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    // Server actions handle redirection and validation
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20">
      <div className="flex items-center gap-4">
        <Link href="/news" className="p-2 hover:bg-white/5 rounded-xl text-gray-400 transition-colors">
          <ChevronLeft size={24} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-white">Buat Berita Baru</h1>
          <p className="text-gray-400 text-sm">Publikasikan informasi baru untuk pengguna</p>
        </div>
      </div>

      <form action={createNews} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div className="card p-6 space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-400">Judul Berita</label>
              <input 
                name="title" 
                type="text" 
                required 
                placeholder="Masukkan judul berita..." 
                className="input text-lg font-semibold"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-400">Konten Berita</label>
              <textarea 
                name="content" 
                required 
                rows={12}
                placeholder="Tulis isi berita di sini..." 
                className="input resize-none"
              ></textarea>
            </div>
          </div>
        </div>

        <div className="md:col-span-1 space-y-6">
          <div className="card p-6 space-y-6">
            <ImageUpload 
              label="Gambar Utama" 
              value={imageUrl} 
              onUpload={setImageUrl} 
            />
            <input type="hidden" name="image_url" value={imageUrl} />

            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-400">Kategori</label>
              <select name="category" className="input">
                <option value="promo">Promo</option>
                <option value="info">Info</option>
                <option value="update">Update</option>
                <option value="event">Event</option>
              </select>
            </div>

            <hr className="border-white/5" />

            <button 
              type="submit" 
              disabled={loading}
              className="btn-primary w-full flex items-center justify-center gap-2 py-3"
            >
              {loading ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
              Simpan & Publish
            </button>
            <p className="text-[10px] text-gray-500 text-center">
              Berita akan langsung terlihat oleh semua pengguna aplikasi GoHelp.
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
