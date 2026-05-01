import { checkAdminAuth } from '@/lib/auth';
import { createAdminClient } from '@/lib/supabase/server';
import CoinForm from './CoinForm';

export const dynamic = 'force-dynamic';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

async function getData() {
  try {
    const supabase = createAdminClient();
    const [usersRes, historyRes] = await Promise.all([
      supabase.from('profiles').select('id, full_name, email, coins').order('full_name'),
      supabase.from('coin_transactions')
        .select('id, amount, type, description, created_at, profiles(full_name)')
        .order('created_at', { ascending: false })
        .limit(30)
        .catch(() => ({ data: [] })),
    ]);
    return { users: usersRes.data ?? [], history: (historyRes as any).data ?? [] };
  } catch (e) {
    console.error('Coins fetch error:', e);
    return { users: [], history: [] };
  }
}

export default async function CoinsPage() {
  await checkAdminAuth();
  const { users, history } = await getData();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Manajemen Koin</h1>
        <p className="text-gray-500 text-sm">Grant atau kurangi koin user</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Coin grant form */}
        <div className="lg:col-span-2 card p-6 self-start">
          <h2 className="font-semibold text-gray-900 mb-4">Grant / Kurangi Koin</h2>
          <CoinForm users={users} />
        </div>

        {/* History */}
        <div className="lg:col-span-3 card overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-900">Riwayat Transaksi Koin</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left px-6 py-3 font-semibold text-gray-500 text-xs uppercase">User</th>
                  <th className="text-left px-6 py-3 font-semibold text-gray-500 text-xs uppercase">Jumlah</th>
                  <th className="text-left px-6 py-3 font-semibold text-gray-500 text-xs uppercase">Deskripsi</th>
                  <th className="text-left px-6 py-3 font-semibold text-gray-500 text-xs uppercase">Tanggal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {history.map((tx: any) => (
                  <tr key={tx.id} className="hover:bg-gray-50/50">
                    <td className="px-6 py-3 font-medium">{(tx.profiles as any)?.full_name ?? '-'}</td>
                    <td className="px-6 py-3">
                      <span className={`font-bold ${tx.amount > 0 ? 'text-green-600' : 'text-red-500'}`}>
                        {tx.amount > 0 ? '+' : ''}{tx.amount} 🪙
                      </span>
                    </td>
                    <td className="px-6 py-3 text-gray-500">{tx.description || tx.type}</td>
                    <td className="px-6 py-3 text-gray-400 text-xs">
                      {format(new Date(tx.created_at), 'd MMM yyyy HH:mm', { locale: id })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
