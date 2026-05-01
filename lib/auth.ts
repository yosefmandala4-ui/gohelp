import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function checkAdminAuth() {
  const cookieStore = cookies();
  const authCookie = cookieStore.get('admin_auth');
  if (!authCookie || authCookie.value !== process.env.ADMIN_SECRET) {
    redirect('/login');
  }
}
