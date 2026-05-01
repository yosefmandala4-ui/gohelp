'use client';
import { useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, UserX, AlertTriangle, CheckCircle } from 'lucide-react';

export default function DeleteAccountPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-black text-white font-[family-name:var(--font-inter)] py-20">
      <div className="container mx-auto px-6 max-w-2xl">
        <Link href="/" className="inline-flex items-center gap-2 text-gold-500 mb-12 hover:gap-3 transition-all font-bold text-sm uppercase tracking-widest">
          <ChevronLeft size={16} /> Kembali ke Beranda
        </Link>
        
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 rounded-2xl bg-red-500/10 flex items-center justify-center border border-red-500/20">
            <UserX className="text-red-500" size={24} />
          </div>
          <h1 className="text-4xl font-black outfit tracking-tight">Penghapusan Akun</h1>
        </div>

        <div className="card p-8 md:p-12">
          {!submitted ? (
            <>
              <div className="bg-red-500/10 border border-red-500/20 p-6 rounded-2xl mb-8 flex gap-4">
                <AlertTriangle className="text-red-500 flex-shrink-0" />
                <div className="text-sm text-gray-300">
                  <p className="font-bold text-white mb-1">Peringatan Penting</p>
                  Penghapusan akun bersifat permanen. Semua data Anda, termasuk riwayat jasa, saldo koin, dan percakapan akan dihapus selamanya.
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest">Email Terdaftar</label>
                  <input 
                    type="email" 
                    required 
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500/50 transition-all"
                    placeholder="nama@email.com"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest">Alasan Penghapusan (Opsional)</label>
                  <textarea 
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500/50 transition-all min-h-[120px] resize-none"
                    placeholder="Mengapa Anda ingin meninggalkan kami?"
                  />
                </div>
                <div className="flex items-start gap-3 py-2">
                  <input type="checkbox" required className="mt-1 accent-red-500" id="confirm" />
                  <label htmlFor="confirm" className="text-xs text-gray-400 leading-relaxed cursor-pointer">
                    Saya mengerti bahwa tindakan ini tidak dapat dibatalkan dan semua data saya akan dihapus secara permanen.
                  </label>
                </div>
                <button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white font-black py-4 rounded-xl transition-all shadow-lg shadow-red-600/20 uppercase tracking-widest">
                  Kirim Permintaan Hapus
                </button>
              </form>
            </>
          ) : (
            <div className="text-center py-10">
              <div className="w-20 h-20 bg-green-500/10 border border-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="text-green-500" size={40} />
              </div>
              <h2 className="text-2xl font-black outfit mb-4 text-white">Permintaan Terkirim</h2>
              <p className="text-gray-400 mb-8 leading-relaxed">
                Permintaan penghapusan akun Anda sedang diproses. Tim kami akan melakukan verifikasi dan menghapus data Anda dalam waktu 7-14 hari kerja.
              </p>
              <Link href="/" className="gold-gradient px-8 py-3 rounded-xl text-black font-bold inline-block shadow-lg shadow-gold-500/20">
                Kembali ke Beranda
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
