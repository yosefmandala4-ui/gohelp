import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/server';

export async function POST(req: NextRequest) {
  const { userId, amount, description } = await req.json();
  if (!userId || !amount) return NextResponse.json({ error: 'Missing params' }, { status: 400 });

  const supabase = createAdminClient();

  // Insert transaction
  await supabase.from('coin_transactions').insert({
    user_id: userId,
    amount,
    type: amount > 0 ? 'admin_grant' : 'admin_deduct',
    description: description || (amount > 0 ? 'Grant koin dari admin' : 'Pengurangan koin oleh admin'),
  });

  // Update user balance
  const { data: profile } = await supabase.from('profiles').select('coins').eq('id', userId).single();
  if (!profile) return NextResponse.json({ error: 'User not found' }, { status: 404 });

  const newCoins = Math.max(0, (profile.coins || 0) + amount);
  await supabase.from('profiles').update({ coins: newCoins }).eq('id', userId);

  return NextResponse.json({ ok: true, newCoins });
}
