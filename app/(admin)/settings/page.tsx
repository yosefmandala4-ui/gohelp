import { checkAdminAuth } from '@/lib/auth';
import { createAdminClient } from '@/lib/supabase/server';
import SettingsForm from './SettingsForm';

export const dynamic = 'force-dynamic';

async function getSettings() {
  const supabase = createAdminClient();
  const { data } = await supabase.from('app_settings').select('*');
  const map: Record<string, string> = {};
  (data ?? []).forEach((s: any) => (map[s.key] = s.value));
  return map;
}

export default async function SettingsPage() {
  await checkAdminAuth();
  const settings = await getSettings();

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Pengaturan Aplikasi</h1>
        <p className="text-gray-500 text-sm">Konfigurasi global aplikasi Gohelp Jasa</p>
      </div>
      <div className="card p-6">
        <SettingsForm settings={settings} />
      </div>
    </div>
  );
}
