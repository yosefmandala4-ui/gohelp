import { createBrowserClient } from '@supabase/ssr';

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://nmfsjcbhyriyzshcnwbm.supabase.co',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5tZnNqY2JoeXJpeXpzaGNud2JtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc0MzI0MTAsImV4cCI6MjA5MzAwODQxMH0.zXr_yTPhlCefqrgpKz7ZeP0MkoLMBD16Ip6MBo4Dbi4'
  );
}
