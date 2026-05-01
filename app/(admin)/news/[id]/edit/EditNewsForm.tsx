'use client';

import { useState } from 'react';
import { Save, Loader2 } from 'lucide-react';
import ImageUpload from '@/components/ImageUpload';
import { updateNews } from '@/lib/actions/news';

export default function EditNewsForm({ news }: { news: any }) {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(news.image_url || '');

  const updateNewsWithId = updateNews.bind(null, news.id);

  return (
    <form action={updateNewsWithId} onSubmit={() => setLoading(true)} className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2 space-y-6">
        <div className="card p-6 space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-medium text-gray-400">Judul Berita</label>
            <input 
              name="title" 
              type="text" 
              required 
              defaultValue={news.title}
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
              defaultValue={news.content}
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
            <select name="category" defaultValue={news.category || 'info'} className="input">
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
            Simpan Perubahan
          </button>
        </div>
      </div>
    </form>
  );
}
