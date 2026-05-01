'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ password }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (res.ok) {
      router.push('/dashboard');
    } else {
      setError('Password salah. Coba lagi.');
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-gold-500/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-gold-500/10 rounded-full blur-[120px]" />

      <div className="card p-10 w-full max-w-md relative z-10 border-gold-500/10 shadow-gold-500/5">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gold-500 rounded-3xl mb-6 shadow-2xl shadow-gold-500/30">
            <span className="text-4xl">🤝</span>
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight">Go Help</h1>
          <p className="text-gold-500 text-[10px] font-bold uppercase tracking-[0.2em] mt-2">Admin Dashboard</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider">Password Admin</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="input py-4 bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:ring-gold-500 focus:border-gold-500"
              placeholder="Masukkan password admin"
              required
            />
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-500 px-4 py-3 rounded-xl text-xs font-medium animate-pulse">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary py-4 text-sm font-bold uppercase tracking-widest disabled:opacity-50 shadow-lg shadow-gold-500/10"
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                <span>Memproses...</span>
              </div>
            ) : 'Masuk Sekarang'}
          </button>
        </form>

        <p className="mt-8 text-center text-gray-600 text-[10px] uppercase tracking-widest">
          &copy; 2026 Go Help Indonesia
        </p>
      </div>
    </div>
  );
}
