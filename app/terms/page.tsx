import Link from 'next/link';
import { ChevronLeft, FileText } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-black text-white font-[family-name:var(--font-inter)] py-20">
      <div className="container mx-auto px-6 max-w-4xl">
        <Link href="/" className="inline-flex items-center gap-2 text-gold-500 mb-12 hover:gap-3 transition-all font-bold text-sm uppercase tracking-widest">
          <ChevronLeft size={16} /> Kembali ke Beranda
        </Link>
        
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 rounded-2xl gold-gradient flex items-center justify-center">
            <FileText className="text-black" size={24} />
          </div>
          <h1 className="text-4xl font-black outfit tracking-tight">Kebijakan Penggunaan</h1>
        </div>

        <div className="card p-8 md:p-12 space-y-8 text-gray-300 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-white mb-4">1. Penerimaan Ketentuan</h2>
            <p>Dengan mengakses atau menggunakan aplikasi Go Help, Anda setuju untuk terikat oleh Ketentuan Layanan ini dan semua hukum serta peraturan yang berlaku.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">2. Lisensi Penggunaan</h2>
            <p>Izin diberikan untuk mengunduh sementara satu salinan materi di aplikasi Go Help hanya untuk dilihat secara pribadi dan non-komersial.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">3. Batasan</h2>
            <p>Dalam keadaan apa pun Go Help atau pemasoknya tidak akan bertanggung jawab atas kerusakan apa pun yang timbul dari penggunaan atau ketidakmampuan untuk menggunakan materi di aplikasi Go Help.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">4. Akun Pengguna</h2>
            <p>Anda bertanggung jawab untuk menjaga kerahasiaan akun dan kata sandi Anda serta untuk membatasi akses ke perangkat Anda guna mencegah akses yang tidak sah ke akun Anda.</p>
          </section>

          <div className="pt-8 border-t border-white/5 text-sm text-gray-500 italic">
            Terakhir diperbarui: 1 Mei 2024
          </div>
        </div>
      </div>
    </div>
  );
}
