'use client';
import { useState } from 'react';

export default function SettingsForm({ settings }: { settings: Record<string, string> }) {
  const [values, setValues] = useState(settings);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  const fields = [
    { key: 'app_name', label: 'Nama Aplikasi', type: 'text' },
    { key: 'default_search_radius_km', label: 'Radius Pencarian Default (km)', type: 'number' },
    { key: 'registration_coin_bonus', label: 'Bonus Koin Saat Daftar', type: 'number' },
    { key: 'daily_coin_reward', label: 'Koin Check-in Harian', type: 'number' },
    { key: 'onesignal_app_id', label: 'OneSignal App ID', type: 'text' },
  ];

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true); setSuccess('');
    await fetch('/api/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    });
    setSuccess('Pengaturan berhasil disimpan!');
    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {fields.map(f => (
        <div key={f.key}>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">{f.label}</label>
          <input
            type={f.type}
            value={values[f.key] ?? ''}
            onChange={e => setValues(prev => ({ ...prev, [f.key]: e.target.value }))}
            className="input"
          />
        </div>
      ))}
      {success && <div className="bg-green-50 text-green-700 px-4 py-2.5 rounded-xl text-sm">{success}</div>}
      <button type="submit" disabled={loading} className="btn-primary py-2.5">
        {loading ? 'Menyimpan...' : 'Simpan Pengaturan'}
      </button>
    </form>
  );
}
