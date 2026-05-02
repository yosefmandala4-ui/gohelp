'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NotifForm({ users }: { users: any[] }) {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [userId, setUserId] = useState(''); // empty = broadcast
  const [isAlarm, setIsAlarm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title || !body) return;
    setLoading(true); setSuccess(''); setError('');
    const res = await fetch('/api/notifications/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, body, userId: userId || null, isAlarm }),
    });
    if (res.ok) {
      setSuccess('Notifikasi berhasil dikirim!');
      setTitle(''); setBody(''); setUserId('');
      router.refresh();
    } else {
      const err = await res.json();
      setError(err.error || 'Gagal mengirim notifikasi');
    }
    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider">Target Penerima</label>
        <select value={userId} onChange={e => setUserId(e.target.value)} className="input">
          <option value="">📢 Broadcast ke Semua User</option>
          {users.map(u => (
            <option key={u.id} value={u.id}>👤 {u.full_name}</option>
          ))}
        </select>
      </div>
      <div className="space-y-2">
        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider">Judul *</label>
        <input value={title} onChange={e => setTitle(e.target.value)} className="input" placeholder="Judul notifikasi" required />
      </div>
      <div className="space-y-2">
        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider">Pesan *</label>
        <textarea value={body} onChange={e => setBody(e.target.value)} className="input min-h-[100px] resize-none" placeholder="Isi pesan notifikasi..." required />
      </div>

      <div className="flex items-center gap-3 bg-white/5 p-4 rounded-2xl border border-white/10">
        <input 
          type="checkbox" 
          id="isAlarm" 
          checked={isAlarm} 
          onChange={e => setIsAlarm(e.target.checked)}
          className="w-5 h-5 accent-gold-500 rounded border-white/10"
        />
        <label htmlFor="isAlarm" className="text-sm font-medium text-white cursor-pointer select-none">
          🚨 Aktifkan Mode Alarm (Bunyi Terus-Menerus)
        </label>
      </div>
      {success && <div className="bg-gold-500/10 border border-gold-500/20 text-gold-500 px-4 py-2.5 rounded-xl text-sm">{success}</div>}
      {error && <div className="bg-red-500/10 border border-red-500/20 text-red-500 px-4 py-2.5 rounded-xl text-sm">{error}</div>}
      <button type="submit" disabled={loading} className="btn-primary w-full py-3.5 font-bold uppercase tracking-widest shadow-lg shadow-gold-500/10">
        {loading ? 'Mengirim...' : '🔔 Kirim Notifikasi'}
      </button>
    </form>
  );
}
