import { createAdminClient } from '@/lib/supabase/server';
import EditNewsForm from './EditNewsForm';
import { Newspaper, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function EditNewsPage({ params }: { params: { id: string } }) {
  const supabase = createAdminClient();
  const { data: news } = await supabase
    .from('news')
    .select('*')
    .eq('id', params.id)
    .single();

  if (!news) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20">
      <div className="flex items-center gap-4">
        <Link href="/news" className="p-2 hover:bg-white/5 rounded-xl text-gray-400 transition-colors">
          <ChevronLeft size={24} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-white">Edit Berita</h1>
          <p className="text-gray-400 text-sm">Perbarui informasi artikel berita</p>
        </div>
      </div>

      <EditNewsForm news={news} />
    </div>
  );
}
