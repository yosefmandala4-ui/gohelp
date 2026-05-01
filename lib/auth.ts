import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function checkAdminAuth() {
  const cookieStore = await cookies();
  const authCookie = cookieStore.get('admin_auth');
  const adminSecret = process.env.ADMIN_SECRET || 'gohelpadmin2024';
  
  if (!authCookie || authCookie.value !== adminSecret) {
    redirect('/login');
  }
}
