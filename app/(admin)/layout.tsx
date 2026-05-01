'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard, Users, Coins, ImageIcon,
  Bell, Settings, LogOut, Menu, X, Newspaper
} from 'lucide-react';
import { useState } from 'react';

const navItems = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/users', icon: Users, label: 'Manajemen User' },
  { href: '/news', icon: Newspaper, label: 'Data News' },
  { href: '/coins', icon: Coins, label: 'Manajemen Koin' },
  { href: '/banners', icon: ImageIcon, label: 'Banner' },
  { href: '/notifications', icon: Bell, label: 'Notifikasi' },
  { href: '/settings', icon: Settings, label: 'Pengaturan' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
  }

  const Sidebar = () => (
    <aside className="flex flex-col h-full bg-[#121212] border-r border-white/5 w-64">
      <div className="flex items-center gap-3 px-6 py-6 border-b border-white/5">
        <div className="w-10 h-10 bg-gold-500 rounded-xl flex items-center justify-center text-xl shadow-lg shadow-gold-500/20">🤝</div>
        <div>
          <div className="font-bold text-white text-sm">Go Help</div>
          <div className="text-[10px] text-gold-500 font-bold uppercase tracking-widest">Admin Panel</div>
        </div>
      </div>
      <nav className="flex-1 px-3 py-6 space-y-1">
        {navItems.map(({ href, icon: Icon, label }) => (
          <Link
            key={href}
            href={href}
            className={`sidebar-link ${pathname === href || pathname.startsWith(href + '/') ? 'active' : ''}`}
            onClick={() => setSidebarOpen(false)}
          >
            <Icon size={18} />
            {label}
          </Link>
        ))}
      </nav>
      <div className="px-3 pb-6">
        <button onClick={handleLogout} className="sidebar-link w-full text-red-500 hover:bg-red-500/10 hover:text-red-500">
          <LogOut size={18} />
          Keluar
        </button>
      </div>
    </aside>
  );

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Desktop sidebar */}
      <div className="hidden md:flex flex-shrink-0">
        <Sidebar />
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
          <div className="absolute left-0 top-0 h-full">
            <Sidebar />
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top bar */}
        <header className="bg-black border-b border-white/5 px-6 py-4 flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="md:hidden p-2 rounded-lg hover:bg-white/5 text-white"
          >
            <Menu size={20} />
          </button>
          <div className="flex-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              {navItems.find(n => pathname.startsWith(n.href))?.label ?? 'Dashboard'}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm font-medium text-white bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl">
            <div className="w-6 h-6 bg-gold-500 rounded-full flex items-center justify-center text-black text-[10px] font-black">A</div>
            Admin
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
