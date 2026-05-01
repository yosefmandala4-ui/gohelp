'use server';

import { createAdminClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createNews(formData: FormData) {
  const supabase = createAdminClient();
  
  const title = formData.get('title') as string;
  const content = formData.get('content') as string;
  const category = formData.get('category') as string;
  const image_url = formData.get('image_url') as string;

  const { error } = await supabase.from('news').insert({
    title,
    content,
    category,
    image_url,
    created_at: new Date().toISOString(),
  });

  if (error) throw new Error(error.message);

  revalidatePath('/news');
  redirect('/news');
}

export async function updateNews(id: string, formData: FormData) {
  const supabase = createAdminClient();
  
  const title = formData.get('title') as string;
  const content = formData.get('content') as string;
  const category = formData.get('category') as string;
  const image_url = formData.get('image_url') as string;

  const { error } = await supabase.from('news').update({
    title,
    content,
    category,
    image_url,
  }).eq('id', id);

  if (error) throw new Error(error.message);

  revalidatePath('/news');
  redirect('/news');
}

export async function deleteNews(id: string) {
  const supabase = createAdminClient();
  const { error } = await supabase.from('news').delete().eq('id', id);

  if (error) throw new Error(error.message);

  revalidatePath('/news');
}
