import { checkAdminAuth } from '@/lib/auth';
import { createAdminClient } from '@/lib/supabase/server';
import UserActions from './UserActions';

export const dynamic = 'force-dynamic';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

async function getUsers(search?: string) {
  try {
    const supabase = createAdminClient();
    let query = supabase
      .from('profiles')
      .select('id, full_name, email, phone, service_type, coins, is_active, created_at, location_lat, location_lng')
      .order('created_at', { ascending: false });

    if (search) {
      query = query.or(`full_name.ilike.%${search}%,email.ilike.%${search}%,service_type.ilike.%${search}%`);
    }

    const { data, error } = await query.limit(100);
    if (error) throw error;
    return data ?? [];
  } catch (e) {
    console.error('Users fetch error:', e);
    return [];
  }
}

import { Users, Search, Mail, Phone, Shield, Calendar, MoreHorizontal } from 'lucide-react';
import Link from 'next/link';

export default async function UsersPage({ searchParams }: { searchParams: { q?: string } }) {
  await checkAdminAuth();
  const users = await getUsers(searchParams.q);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-2xl bg-gold-500/10 flex items-center justify-center border border-gold-500/20">
          <Users className="text-gold-500" size={24} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">Manajemen User</h1>
          <p className="text-gray-400 text-sm">{users.length} user terdaftar</p>
        </div>
      </div>

      {/* Search */}
      <form className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
          <input
            name="q"
            defaultValue={searchParams.q}
            placeholder="Cari nama, email, atau jenis jasa..."
            className="input pl-11"
          />
        </div>
        <button type="submit" className="btn-primary">Cari</button>
        {searchParams.q && <Link href="/users" className="btn-secondary">Reset</Link>}
      </form>

      {/* Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="border-b border-white/5 text-gray-500 text-xs uppercase tracking-wider">
                <th className="px-6 py-4 font-semibold">User</th>
                <th className="px-6 py-4 font-semibold">Kontak</th>
                <th className="px-6 py-4 font-semibold">Jenis Jasa</th>
                <th className="px-6 py-4 font-semibold">Koin</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold">Bergabung</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {users.map((user: any) => (
                <tr key={user.id} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gold-500/10 rounded-xl flex items-center justify-center text-gold-500 font-bold text-sm border border-gold-500/20">
                        {(user.full_name || '?')[0].toUpperCase()}
                      </div>
                      <div>
                        <p className="font-semibold text-white group-hover:text-gold-500 transition-colors">{user.full_name}</p>
                        <p className="text-[10px] text-gray-500 font-mono tracking-tighter uppercase">{user.id.slice(0, 8)}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-1.5 text-gray-300">
                        <Mail size={12} className="text-gray-500" />
                        {user.email}
                      </div>
                      {user.phone && (
                        <div className="flex items-center gap-1.5 text-gray-500 text-xs">
                          <Phone size={12} />
                          {user.phone}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="badge bg-white/5 text-gray-300 border border-white/10">{user.service_type || 'Umum'}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1 font-bold text-gold-500">
                      <span className="text-sm">🪙</span>
                      {user.coins}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`badge ${user.is_active ? 'bg-gold-500/10 text-gold-500' : 'bg-red-500/10 text-red-500'}`}>
                      {user.is_active ? 'Aktif' : 'Nonaktif'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500 text-xs">
                    <div className="flex items-center gap-1.5">
                      <Calendar size={12} />
                      {format(new Date(user.created_at), 'd MMM yyyy', { locale: id })}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <UserActions userId={user.id} isActive={user.is_active} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {users.length === 0 && (
            <div className="text-center py-20 text-gray-500">
              <Users size={48} className="mx-auto mb-3 opacity-20" />
              <p className="text-lg font-medium text-white">Tidak ada user ditemukan</p>
              <p className="text-sm">Coba kata kunci pencarian lain</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
