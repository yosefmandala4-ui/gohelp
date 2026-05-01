'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  Zap, 
  Clock, 
  Star, 
  Download, 
  Menu, 
  X,
  LayoutDashboard
} from 'lucide-react';
import Link from 'next/link';

export default function LandingPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white font-[family-name:var(--font-inter)]">
      {/* Navbar */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'glass py-4' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl gold-gradient flex items-center justify-center shadow-lg shadow-gold-500/20">
              <Zap className="text-black fill-current" size={20} />
            </div>
            <span className="text-2xl font-black tracking-tighter outfit gold-text-gradient">GO HELP</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            {['Tentang', 'Fitur', 'Cara Kerja'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-medium text-gray-400 hover:text-gold-400 transition-colors">
                {item}
              </a>
            ))}
            <Link href="/dashboard" className="text-sm font-medium text-gray-400 hover:text-gold-400 flex items-center gap-2">
              <LayoutDashboard size={16} /> Admin
            </Link>
            <button className="gold-gradient px-6 py-2.5 rounded-full text-black text-sm font-bold shadow-lg shadow-gold-500/20 hover:scale-105 transition-transform">
              Download App
            </button>
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gold-500/10 blur-[120px] rounded-full -z-10" />
        
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-gold-400 mb-6 tracking-widest uppercase">
              <Star size={12} className="fill-current" /> Solusi Jasa #1 di Bali
            </div>
            <h1 className="text-5xl md:text-7xl font-black leading-tight outfit mb-6">
              Cari Jasa Apapun <br />
              <span className="gold-text-gradient">Sekali Klik.</span>
            </h1>
            <p className="text-lg text-gray-400 mb-10 max-w-lg leading-relaxed">
              Hubungkan diri Anda dengan ribuan penyedia jasa terverifikasi di sekitarmu. Dari kebersihan hingga perbaikan, Go Help hadir untuk mempermudah hidup Anda.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="gold-gradient px-8 py-4 rounded-2xl text-black font-bold flex items-center gap-3 shadow-xl shadow-gold-500/20 hover:translate-y-[-2px] transition-all">
                <Download size={20} /> Mulai Sekarang
              </button>
              <button className="px-8 py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 transition-all">
                Lihat Semua Jasa
              </button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative"
          >
            <div className="animate-float relative z-10">
              {/* Mockup Placeholder */}
              <div className="w-[300px] md:w-[380px] h-[600px] md:h-[760px] mx-auto bg-gradient-to-b from-[#1A1A1A] to-black rounded-[40px] border-[8px] border-[#2C2C2C] shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 w-full h-8 flex justify-center items-center">
                  <div className="w-20 h-4 bg-black rounded-b-2xl" />
                </div>
                {/* Content mockup */}
                <div className="p-6 pt-12">
                  <div className="h-4 w-24 bg-white/5 rounded mb-4" />
                  <div className="h-8 w-40 bg-gold-500/20 rounded mb-8" />
                  <div className="grid grid-cols-4 gap-4 mb-8">
                    {[1,2,3,4].map(i => <div key={i} className="aspect-square bg-white/5 rounded-xl border border-white/10" />)}
                  </div>
                  <div className="space-y-4">
                    {[1,2,3].map(i => (
                      <div key={i} className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                        <div className="flex gap-3">
                          <div className="w-10 h-10 rounded-full bg-gold-500/10" />
                          <div className="flex-1 space-y-2">
                            <div className="h-3 w-20 bg-white/10 rounded" />
                            <div className="h-2 w-full bg-white/5 rounded" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="fitur" className="py-24 bg-[#050505]">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <h2 className="text-4xl font-black outfit mb-6">Mengapa Pilih <span className="gold-text-gradient">Go Help?</span></h2>
            <p className="text-gray-400">Kami menghadirkan standar baru dalam ekosistem jasa, memastikan keamanan, kecepatan, dan kenyamanan bagi setiap pengguna.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Shield, title: 'Terverifikasi', desc: 'Semua mitra jasa kami telah melewati proses verifikasi ketat untuk menjamin keamanan Anda.' },
              { icon: Zap, title: 'Respon Cepat', desc: 'Sistem cerdas kami menghubungkan Anda dengan penyedia jasa terdekat dalam hitungan detik.' },
              { icon: Clock, title: 'Transparan', desc: 'Harga dan durasi pengerjaan yang jelas sejak awal. Tidak ada biaya tersembunyi.' },
            ].map((feature, i) => (
              <motion.div 
                key={i}
                whileHover={{ translateY: -10 }}
                className="card p-10 rounded-[32px]"
              >
                <div className="w-16 h-16 rounded-2xl bg-gold-500/10 flex items-center justify-center mb-8 border border-gold-500/20">
                  <feature.icon className="text-gold-500" size={32} />
                </div>
                <h3 className="text-2xl font-bold mb-4 outfit">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-white/5 bg-[#050505]">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-20">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-8">
                <div className="w-8 h-8 rounded-lg gold-gradient flex items-center justify-center">
                  <Zap className="text-black fill-current" size={16} />
                </div>
                <span className="text-2xl font-black outfit tracking-tighter">GO HELP</span>
              </div>
              <p className="text-gray-400 max-w-sm mb-8 leading-relaxed">
                Platform revolusioner untuk menghubungkan Anda dengan jasa terbaik di sekitar. Kami berkomitmen untuk memberdayakan ekonomi lokal melalui teknologi.
              </p>
              <div className="flex gap-4">
                {['Instagram', 'Facebook', 'Twitter'].map(social => (
                  <div key={social} className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:border-gold-500/50 hover:text-gold-500 transition-all cursor-pointer">
                    <span className="sr-only">{social}</span>
                    <div className="w-4 h-4 bg-current rounded-sm opacity-50" />
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-white uppercase text-xs tracking-widest">Layanan</h4>
              <ul className="space-y-4 text-sm text-gray-400">
                <li><a href="#" className="hover:text-gold-500 transition-colors">Cari Jasa</a></li>
                <li><a href="#" className="hover:text-gold-500 transition-colors">Jadi Mitra</a></li>
                <li><a href="#" className="hover:text-gold-500 transition-colors">Bantuan</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-white uppercase text-xs tracking-widest">Legal & Dukungan</h4>
              <ul className="space-y-4 text-sm text-gray-400">
                <li><Link href="/privacy" className="hover:text-gold-500 transition-colors">Kebijakan Privasi</Link></li>
                <li><Link href="/terms" className="hover:text-gold-500 transition-colors">Kebijakan Penggunaan</Link></li>
                <li><Link href="/delete-account" className="hover:text-gold-500 transition-colors">Penghapusan Akun</Link></li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-10 border-t border-white/5 text-[10px] text-gray-600 font-bold uppercase tracking-widest">
            <p>© 2024 GO HELP. DIBUAT DENGAN ❤️ DI BALI.</p>
            <div className="flex gap-8">
              <span>Semua Hak Dilindungi.</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
