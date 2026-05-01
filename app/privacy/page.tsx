import Link from 'next/link';
import { ChevronLeft, Shield } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-black text-white font-[family-name:var(--font-inter)] py-20">
      <div className="container mx-auto px-6 max-w-4xl">
        <Link href="/" className="inline-flex items-center gap-2 text-gold-500 mb-12 hover:gap-3 transition-all font-bold text-sm uppercase tracking-widest">
          <ChevronLeft size={16} /> Kembali ke Beranda
        </Link>
        
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 rounded-2xl gold-gradient flex items-center justify-center">
            <Shield className="text-black" size={24} />
          </div>
          <h1 className="text-4xl font-black outfit tracking-tight">Kebijakan Privasi</h1>
        </div>

        <div className="card p-8 md:p-12 space-y-8 text-gray-300 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-white mb-4">1. Informasi yang Kami Kumpulkan</h2>
            <p>Go Help mengumpulkan informasi untuk menyediakan layanan yang lebih baik kepada semua pengguna kami. Ini termasuk informasi yang Anda berikan kepada kami (seperti nama, alamat email, dan nomor telepon) serta informasi yang kami dapatkan dari penggunaan layanan Anda (seperti data lokasi).</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">2. Cara Kami Menggunakan Informasi</h2>
            <p>Kami menggunakan informasi yang kami kumpulkan dari semua layanan kami untuk menyediakan, memelihara, melindungi, dan meningkatkan layanan tersebut, untuk mengembangkan layanan baru, serta untuk melindungi Go Help dan pengguna kami.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">3. Keamanan Informasi</h2>
            <p>Kami bekerja keras untuk melindungi Go Help dan pengguna kami dari akses tanpa izin ke atau pengubahan, pengungkapan, atau penghancuran tanpa izin atas informasi yang kami pegang.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">4. Perubahan</h2>
            <p>Kebijakan Privasi kami dapat berubah dari waktu ke waktu. Kami tidak akan mengurangi hak Anda berdasarkan Kebijakan Privasi ini tanpa persetujuan eksplisit dari Anda.</p>
          </section>

          <div className="pt-8 border-t border-white/5 text-sm text-gray-500 italic">
            Terakhir diperbarui: 1 Mei 2024
          </div>
        </div>
      </div>
    </div>
  );
}
