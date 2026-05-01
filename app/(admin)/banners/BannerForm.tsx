'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function BannerForm() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [linkUrl, setLinkUrl] = useState('');
  const [order, setOrder] = useState('0');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!imageUrl) return;
    setLoading(true);
    setSuccess(''); setError('');
    const res = await fetch('/api/banners', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, image_url: imageUrl, link_url: linkUrl, display_order: parseInt(order) }),
    });
    if (res.ok) {
      setSuccess('Banner berhasil ditambahkan!');
      setTitle(''); setImageUrl(''); setLinkUrl(''); setOrder('0');
      router.refresh();
    } else {
      setError('Gagal menambahkan banner');
    }
    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-2">
        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider">URL Gambar Banner *</label>
        <input value={imageUrl} onChange={e => setImageUrl(e.target.value)} className="input" placeholder="https://..." required />
        <p className="text-[10px] text-gray-500 mt-1 uppercase tracking-tight">Upload ke Supabase Storage, lalu paste URL-nya</p>
      </div>
      {imageUrl && (
        <div className="relative group">
          <img src={imageUrl} alt="Preview" className="w-full h-32 object-cover rounded-xl border border-white/10" />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-xl">
            <span className="text-[10px] font-bold text-white uppercase tracking-widest">Preview</span>
          </div>
        </div>
      )}
      <div className="space-y-2">
        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider">Judul</label>
        <input value={title} onChange={e => setTitle(e.target.value)} className="input" placeholder="Judul banner (opsional)" />
      </div>
      <div className="space-y-2">
        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider">Link URL</label>
        <input value={linkUrl} onChange={e => setLinkUrl(e.target.value)} className="input" placeholder="https://... (opsional)" />
      </div>
      <div className="space-y-2">
        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider">Urutan Tampil</label>
        <input type="number" value={order} onChange={e => setOrder(e.target.value)} className="input" min="0" />
      </div>
      {success && <div className="bg-gold-500/10 border border-gold-500/20 text-gold-500 px-4 py-2.5 rounded-xl text-xs">{success}</div>}
      {error && <div className="bg-red-500/10 border border-red-500/20 text-red-500 px-4 py-2.5 rounded-xl text-xs">{error}</div>}
      <button type="submit" disabled={loading} className="btn-primary w-full py-3.5 font-bold uppercase tracking-widest shadow-lg shadow-gold-500/10">
        {loading ? 'Menyimpan...' : '+ Tambah Banner'}
      </button>
    </form>
  );
}
