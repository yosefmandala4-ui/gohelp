import { checkAdminAuth } from '@/lib/auth';
import { createAdminClient } from '@/lib/supabase/server';
import NotifForm from './NotifForm';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

async function getNotifications() {
  const supabase = createAdminClient();
  const { data } = await supabase
    .from('notifications')
    .select('id, title, body, is_sent, created_at, user_id')
    .order('created_at', { ascending: false })
    .limit(20);
  return data ?? [];
}

async function getUsers() {
  const supabase = createAdminClient();
  const { data } = await supabase.from('profiles').select('id, full_name').order('full_name');
  return data ?? [];
}

export default async function NotificationsPage() {
  await checkAdminAuth();
  const [notifications, users] = await Promise.all([getNotifications(), getUsers()]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Kirim Notifikasi</h1>
        <p className="text-gray-500 text-sm">Kirim notifikasi push ke user via OneSignal</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 card p-6 self-start">
          <h2 className="font-semibold text-gray-900 mb-4">Buat Notifikasi</h2>
          <NotifForm users={users} />
        </div>

        <div className="lg:col-span-2 card overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-900">Riwayat Notifikasi</h2>
          </div>
          <div className="divide-y divide-gray-50">
            {notifications.length === 0 ? (
              <div className="text-center py-12 text-gray-400">Belum ada notifikasi</div>
            ) : (
              notifications.map((n: any) => (
                <div key={n.id} className="px-6 py-4 flex items-start gap-4">
                  <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">🔔</div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 text-sm">{n.title}</p>
                    <p className="text-gray-500 text-xs mt-0.5">{n.body}</p>
                    <div className="flex items-center gap-3 mt-1.5">
                      <span className={`badge text-xs ${n.is_sent ? 'bg-green-50 text-green-700' : 'bg-yellow-50 text-yellow-700'}`}>
                        {n.is_sent ? 'Terkirim' : 'Pending'}
                      </span>
                      <span className="text-xs text-gray-400">
                        {n.user_id ? 'Personal' : 'Broadcast'}
                      </span>
                    </div>
                  </div>
                  <span className="text-xs text-gray-400 whitespace-nowrap">
                    {format(new Date(n.created_at), 'd MMM HH:mm', { locale: id })}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
