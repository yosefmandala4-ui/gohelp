import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/server';

export async function POST(req: NextRequest) {
  const values = await req.json();
  const supabase = createAdminClient();

  const updates = Object.entries(values).map(([key, value]) =>
    supabase.from('app_settings').upsert({ key, value: String(value), updated_at: new Date().toISOString() }, { onConflict: 'key' })
  );

  await Promise.all(updates);
  return NextResponse.json({ ok: true });
}
