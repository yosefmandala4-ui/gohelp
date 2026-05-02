import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/server';

export async function POST(req: NextRequest) {
  const { title, body, userId } = await req.json();

  if (!title || !body) {
    return NextResponse.json({ error: 'Title dan body wajib diisi' }, { status: 400 });
  }

  const supabase = createAdminClient();
  const oneSignalAppId = process.env.ONESIGNAL_APP_ID;
  const oneSignalKey = process.env.ONESIGNAL_REST_API_KEY;

  // Get OneSignal player IDs
  let playerIds: string[] = [];
  if (userId) {
    const { data } = await supabase
      .from('profiles')
      .select('onesignal_player_id')
      .eq('id', userId)
      .single();
    if (data?.onesignal_player_id) playerIds = [data.onesignal_player_id];
  } else {
    const { data } = await supabase
      .from('profiles')
      .select('onesignal_player_id')
      .not('onesignal_player_id', 'is', null);
    playerIds = (data || []).map((p: any) => p.onesignal_player_id).filter(Boolean);
  }

  // Send via OneSignal if configured
  let isSent = false;
  if (oneSignalAppId && oneSignalKey && playerIds.length > 0) {
    try {
      const notifPayload: any = {
        app_id: oneSignalAppId,
        headings: { en: title, id: title },
        contents: { en: body, id: body },
        android_sound: "loud_notification",
        ios_sound: "loud_notification.mp3",
        android_channel_id: "loud_notifications", // Optional: for channel-based sound
        data: { is_alarm: isAlarm || false }
      };

      if (userId) {
        notifPayload.include_player_ids = playerIds;
      } else {
        notifPayload.included_segments = ['All'];
      }

      const osRes = await fetch('https://onesignal.com/api/v1/notifications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${oneSignalKey}`,
        },
        body: JSON.stringify(notifPayload),
      });

      isSent = osRes.ok;
    } catch {
      isSent = false;
    }
  }

  // Save to DB
  await supabase.from('notifications').insert({
    user_id: userId || null,
    title,
    body,
    is_sent: isSent,
    sent_at: isSent ? new Date().toISOString() : null,
  });

  return NextResponse.json({ ok: true, isSent, playerCount: playerIds.length });
}
