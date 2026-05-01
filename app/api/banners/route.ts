import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/server';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const supabase = createAdminClient();
  const { error } = await supabase.from('banners').insert({
    title: body.title,
    image_url: body.image_url,
    link_url: body.link_url,
    display_order: body.display_order ?? 0,
    is_active: true,
  });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
