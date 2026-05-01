'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CoinForm({ users }: { users: any[] }) {
  const router = useRouter();
  const [userId, setUserId] = useState('');
  const [amount, setAmount] = useState('');
  const [desc, setDesc] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!userId || !amount) return;
    setLoading(true);
    setSuccess('');
    setError('');
    const res = await fetch('/api/coins/grant', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, amount: parseInt(amount), description: desc }),
    });
    if (res.ok) {
      setSuccess('Koin berhasil diperbarui!');
      setAmount('');
      setDesc('');
      router.refresh();
    } else {
      setError('Gagal memperbarui koin');
    }
    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Pilih User</label>
        <select value={userId} onChange={e => setUserId(e.target.value)} className="input" required>
          <option value="">-- Pilih User --</option>
          {users.map(u => (
            <option key={u.id} value={u.id}>{u.full_name} ({u.coins} koin)</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Jumlah Koin</label>
        <input
          type="number"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          className="input"
          placeholder="Positif = tambah, negatif = kurangi"
          required
        />
        <p className="text-xs text-gray-400 mt-1">Contoh: 50 (tambah), -10 (kurangi)</p>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Keterangan</label>
        <input
          type="text"
          value={desc}
          onChange={e => setDesc(e.target.value)}
          className="input"
          placeholder="Contoh: Bonus event, dll"
        />
      </div>
      {success && <div className="bg-green-50 text-green-700 px-4 py-2.5 rounded-xl text-sm">{success}</div>}
      {error && <div className="bg-red-50 text-red-600 px-4 py-2.5 rounded-xl text-sm">{error}</div>}
      <button type="submit" disabled={loading} className="btn-primary w-full py-2.5">
        {loading ? 'Memproses...' : 'Terapkan Koin'}
      </button>
    </form>
  );
}
