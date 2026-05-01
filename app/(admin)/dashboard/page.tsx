import { checkAdminAuth } from '@/lib/auth';
import { createAdminClient } from '@/lib/supabase/server';
import { Users, MessageSquare, Coins, TrendingUp, LayoutDashboard } from 'lucide-react';
import Link from 'next/link';
import DashboardChart from './DashboardChart';

async function getStats() {
  const supabase = createAdminClient();

  const [usersRes, messagesRes, coinsRes, newUsersRes] = await Promise.all([
    supabase.from('profiles').select('id', { count: 'exact', head: true }),
    supabase.from('messages').select('id', { count: 'exact', head: true }),
    supabase.from('profiles').select('coins').then(r => {
      const total = (r.data || []).reduce((sum: number, u: any) => sum + (u.coins || 0), 0);
      return { total };
    }),
    supabase.from('profiles').select('id', { count: 'exact', head: true })
      .gte('created_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()),
  ]);

  return {
    totalUsers: usersRes.count ?? 0,
    totalMessages: messagesRes.count ?? 0,
    totalCoins: coinsRes.total ?? 0,
    newUsers7d: newUsersRes.count ?? 0,
  };
}

async function getRecentUsers() {
  const supabase = createAdminClient();
  const { data } = await supabase
    .from('profiles')
    .select('id, full_name, email, service_type, coins, created_at')
    .order('created_at', { ascending: false })
    .limit(5);
  return data ?? [];
}

export default async function DashboardPage() {
  await checkAdminAuth();
  const [stats, recentUsers] = await Promise.all([getStats(), getRecentUsers()]);

  const cards = [
    { label: 'Total User', value: stats.totalUsers.toLocaleString(), icon: Users, color: 'gold' },
    { label: 'Total Pesan', value: stats.totalMessages.toLocaleString(), icon: MessageSquare, color: 'gold' },
    { label: 'Total Koin Beredar', value: stats.totalCoins.toLocaleString(), icon: Coins, color: 'gold' },
    { label: 'User Baru (7 hari)', value: stats.newUsers7d.toLocaleString(), icon: TrendingUp, color: 'gold' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-2xl bg-gold-500/10 flex items-center justify-center border border-gold-500/20">
          <LayoutDashboard className="text-gold-500" size={24} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard Overview</h1>
          <p className="text-gray-400 text-sm">Selamat datang di panel admin Go Help</p>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map(({ label, value, icon: Icon }) => (
          <div key={label} className="card p-6 border-white/5 hover:border-gold-500/30 transition-all group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{label}</p>
                <p className="text-2xl font-black text-white mt-1 group-hover:text-gold-500 transition-colors">{value}</p>
              </div>
              <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 group-hover:bg-gold-500/10 group-hover:border-gold-500/20 transition-all">
                <Icon size={22} className="text-gray-400 group-hover:text-gold-500 transition-colors" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart */}
        <div className="lg:col-span-2 card p-6 border-white/5">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-bold text-white">Statistik Pendaftaran</h2>
            <select className="bg-white/5 border border-white/10 text-[10px] text-gray-400 rounded-lg px-2 py-1 outline-none">
              <option>7 Hari Terakhir</option>
              <option>30 Hari Terakhir</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <DashboardChart />
          </div>
        </div>

        {/* Recent users */}
        <div className="card p-6 border-white/5">
          <h2 className="font-bold text-white mb-6">User Terbaru</h2>
          <div className="space-y-4">
            {recentUsers.map((user: any) => (
              <div key={user.id} className="flex items-center gap-3 group">
                <div className="w-10 h-10 bg-gold-500/10 rounded-xl flex items-center justify-center text-gold-500 font-bold text-sm border border-gold-500/20 group-hover:bg-gold-500 group-hover:text-black transition-all">
                  {(user.full_name || '?')[0].toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white truncate group-hover:text-gold-500 transition-colors">{user.full_name}</p>
                  <p className="text-[10px] text-gray-500 truncate uppercase tracking-tighter">{user.service_type || 'Jasa Umum'}</p>
                </div>
                <span className="text-xs font-bold text-gold-500 bg-gold-500/10 px-2 py-1 rounded-lg">
                  🪙 {user.coins}
                </span>
              </div>
            ))}
            <Link href="/users" className="block text-center text-[10px] font-bold text-gray-500 uppercase tracking-widest pt-4 hover:text-gold-500 transition-colors">
              Lihat Semua User
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
