import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/server';

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const supabase = createAdminClient();
  const { data: user } = await supabase.from('profiles').select('is_active').eq('id', params.id).single();
  if (!user) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  await supabase.from('profiles').update({ is_active: !user.is_active }).eq('id', params.id);
  return NextResponse.json({ ok: true });
}
