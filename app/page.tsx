'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, 
  Zap, 
  Clock, 
  Star, 
  Download, 
  Menu, 
  X,
  LayoutDashboard,
  ChevronRight,
  Play,
  Users,
  Briefcase,
  CheckCircle2,
  MapPin,
  MessageCircle,
  ChevronLeft
} from 'lucide-react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';

export default function LandingPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [banners, setBanners] = useState<any[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const supabase = createClient();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    fetchBanners();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fetchBanners = async () => {
    const { data, error } = await supabase
      .from('banners')
      .select('*')
      .eq('is_active', true)
      .order('display_order');
    
    if (data && data.length > 0) {
      setBanners(data);
    } else {
      setBanners([
        { image_url: 'https://images.unsplash.com/photo-1621905238291-0881816350d6?w=1200&q=80', title: 'Solusi Jasa Terpercaya di Indonesia' },
        { image_url: 'https://images.unsplash.com/photo-1581578731548-c64695ce6958?w=1200&q=80', title: 'Layanan Cepat, Aman, & Transparan' }
      ]);
    }
  };

  useEffect(() => {
    if (banners.length === 0) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [banners]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % banners.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);

  return (
    <div className="min-h-screen bg-black text-white font-[family-name:var(--font-inter)] selection:bg-gold-500/30">
      {/* Navbar */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'glass py-4 shadow-2xl' : 'bg-transparent py-8'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl gold-gradient flex items-center justify-center shadow-lg shadow-gold-500/40">
              <Zap className="text-black fill-current" size={22} />
            </div>
            <span className="text-2xl font-black tracking-tighter outfit gold-text-gradient">GO HELP</span>
          </div>

          <div className="hidden md:flex items-center gap-10">
            {['Tentang', 'Fitur', 'Cara Kerja'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-bold text-gray-400 hover:text-gold-400 transition-colors uppercase tracking-widest">
                {item}
              </a>
            ))}
            <Link href="/login" className="text-sm font-bold text-gray-400 hover:text-gold-400 flex items-center gap-2 uppercase tracking-widest">
              <LayoutDashboard size={16} /> Admin
            </Link>
            <button className="gold-gradient px-8 py-3 rounded-2xl text-black text-sm font-black shadow-xl shadow-gold-500/30 hover:scale-105 transition-transform">
              DOWNLOAD
            </button>
          </div>

          <button className="md:hidden text-gold-500" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>
      </nav>

      {/* Hero Section with Large Pure Banner */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-5 gap-12 items-center">
            {/* Left Content */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-2"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-500/10 border border-gold-500/20 text-xs font-black text-gold-400 mb-8 tracking-[0.2em] uppercase">
                <Star size={14} className="fill-current" /> Indonesia's Most Trusted App
              </div>
              <h1 className="text-5xl md:text-7xl font-black leading-[0.9] outfit mb-8">
                Jasa Apapun, <br />
                <span className="gold-text-gradient italic">Sekali Klik.</span>
              </h1>
              <p className="text-lg text-gray-400 mb-10 leading-relaxed font-medium">
                Solusi satu pintu untuk semua kebutuhan jasa Anda di Indonesia. Profesional terverifikasi siap membantu Anda kapan saja.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="gold-gradient px-8 py-4 rounded-2xl text-black font-black flex items-center gap-3 shadow-2xl shadow-gold-500/40 hover:translate-y-[-4px] transition-all">
                  <Download size={22} /> Download
                </button>
                <button className="px-8 py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-black hover:bg-white/10 transition-all flex items-center gap-3">
                  <Play size={18} className="fill-current text-gold-500" /> Demo
                </button>
              </div>
            </motion.div>

            {/* Large Pure Banner Slider */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="lg:col-span-3 relative group"
            >
              <div className="relative aspect-[16/10] md:aspect-[16/9] w-full rounded-[40px] overflow-hidden border border-white/10 shadow-[0_40px_100px_-20px_rgba(212,175,55,0.2)] bg-gray-900">
                <AnimatePresence mode="wait">
                  {banners.length > 0 && (
                    <motion.div
                      key={currentSlide}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.8 }}
                      className="absolute inset-0"
                    >
                      <img 
                        src={banners[currentSlide].image_url} 
                        alt="banner"
                        className="w-full h-full object-cover"
                      />
                      {/* Dark overlay for text readability */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-10 md:p-16">
                        <motion.h3 
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.3 }}
                          className="text-3xl md:text-5xl font-black outfit gold-text-gradient mb-4 drop-shadow-2xl"
                        >
                          {banners[currentSlide].title}
                        </motion.h3>
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: 100 }}
                          transition={{ delay: 0.5, duration: 0.8 }}
                          className="h-1.5 gold-gradient rounded-full" 
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Slider Navigation Buttons */}
                <button 
                  onClick={prevSlide}
                  className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 border border-white/10 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-gold-500 hover:text-black"
                >
                  <ChevronLeft size={24} />
                </button>
                <button 
                  onClick={nextSlide}
                  className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 border border-white/10 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-gold-500 hover:text-black"
                >
                  <ChevronRight size={24} />
                </button>

                {/* Progress Indicators */}
                <div className="absolute top-10 right-10 flex gap-2">
                  {banners.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentSlide(i)}
                      className={`h-1.5 transition-all duration-500 rounded-full ${currentSlide === i ? 'w-12 gold-gradient' : 'w-3 bg-white/20 hover:bg-white/40'}`}
                    />
                  ))}
                </div>
              </div>

              {/* Floating Stat Card */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -bottom-8 -left-8 glass p-6 rounded-3xl border border-white/10 shadow-2xl hidden md:block"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl gold-gradient flex items-center justify-center">
                    <Users className="text-black" size={28} />
                  </div>
                  <div>
                    <p className="text-2xl font-black outfit">10,000+</p>
                    <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">Happy Users</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Stats Section */}
      <section className="py-20 border-y border-white/5 bg-[#050505]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: 'Mitra Aktif', value: '500+', icon: Briefcase },
              { label: 'Layanan', value: '50+', icon: Zap },
              { label: 'Rating', value: '4.9/5', icon: Star },
              { label: 'Verified', value: '100%', icon: Shield },
            ].map((item, i) => (
              <div key={i} className="text-center group">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <item.icon className="text-gold-500" size={24} />
                </div>
                <p className="text-3xl font-black outfit mb-1">{item.value}</p>
                <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="fitur" className="py-32 relative">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-5xl font-black outfit mb-6 italic">Keunggulan <span className="gold-text-gradient">Go Help.</span></h2>
          <div className="w-24 h-1.5 gold-gradient mx-auto mb-20 rounded-full" />

          <div className="grid md:grid-cols-3 gap-10">
            {[
              { icon: Shield, title: 'Keamanan Utama', desc: 'Sistem verifikasi ketat untuk menjamin keamanan setiap transaksi dan layanan.' },
              { icon: Zap, title: 'Super Cepat', desc: 'Algoritma cerdas yang menghubungkan Anda dengan mitra terdekat dalam hitungan detik.' },
              { icon: Clock, title: 'Transparansi', desc: 'Harga jujur dan jelas sejak awal tanpa ada biaya siluman di akhir layanan.' },
            ].map((feature, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="card p-12 rounded-[50px] text-left border border-white/5 hover:border-gold-500/30 transition-all duration-500"
              >
                <div className="w-20 h-20 rounded-3xl bg-gold-500/10 flex items-center justify-center mb-10 border border-gold-500/20">
                  <feature.icon className="text-gold-500" size={40} />
                </div>
                <h3 className="text-2xl font-black mb-6 outfit">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed font-medium text-lg">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-24 border-t border-white/5 bg-black">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-16 mb-24">
            <div className="col-span-2">
              <div className="flex items-center gap-3 mb-10">
                <Zap className="text-gold-500 fill-current" size={32} />
                <span className="text-4xl font-black outfit tracking-tighter">GO HELP</span>
              </div>
              <p className="text-gray-400 max-w-md mb-12 leading-relaxed text-xl font-medium">
                Pionir ekosistem jasa digital yang menghubungkan Anda dengan profesional terbaik di seluruh Indonesia.
              </p>
              <div className="flex gap-6">
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 hover:border-gold-500/50 flex items-center justify-center text-gray-500 hover:text-gold-500 transition-all cursor-pointer">
                    <Star size={20} />
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-black mb-10 text-gold-500 uppercase tracking-widest text-sm">Informasi</h4>
              <ul className="space-y-4 text-sm text-gray-400 font-bold">
                <li><Link href="/privacy" className="hover:text-white transition-colors">Kebijakan Privasi</Link></li>
                <li><Link href="/terms" className="hover:text-white transition-colors">Syarat & Ketentuan</Link></li>
                <li><Link href="/delete-account" className="hover:text-white transition-colors text-red-500/80">Penghapusan Akun</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-black mb-10 text-gold-500 uppercase tracking-widest text-sm">Hubungi Kami</h4>
              <ul className="space-y-6 text-gray-400 font-bold">
                <li className="flex items-center gap-3"><MessageCircle size={18} className="text-gold-500" /> support@gohelp.id</li>
                <li className="flex items-center gap-3"><MapPin size={18} className="text-gold-500" /> Jakarta, Indonesia</li>
              </ul>
            </div>
          </div>
          <div className="pt-12 border-t border-white/5 text-[11px] text-gray-600 font-black uppercase tracking-[0.3em] flex flex-col md:flex-row justify-between items-center gap-6">
            <p>© 2024 GO HELP INDONESIA. SELURUH HAK DILINDUNGI.</p>
            <p className="gold-text-gradient">MELAYANI DENGAN SEPENUH HATI</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
