'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function UserActions({ userId, isActive }: { userId: string; isActive: boolean }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function toggleStatus() {
    setLoading(true);
    await fetch(`/api/users/${userId}/toggle`, { method: 'POST' });
    router.refresh();
    setLoading(false);
  }

  return (
    <button
      onClick={toggleStatus}
      disabled={loading}
      className={`badge cursor-pointer transition-all ${isActive ? 'bg-red-50 text-red-600 hover:bg-red-100' : 'bg-green-50 text-green-700 hover:bg-green-100'} disabled:opacity-50`}
    >
      {loading ? '...' : isActive ? 'Nonaktifkan' : 'Aktifkan'}
    </button>
  );
}
