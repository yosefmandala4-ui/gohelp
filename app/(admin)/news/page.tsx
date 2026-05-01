import { createAdminClient } from '@/lib/supabase/server';
import { Newspaper, Plus, Search, Edit2, Trash2, Calendar } from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';

export default async function NewsPage() {
  const supabase = createAdminClient();
  const { data: news, error } = await supabase
    .from('news')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gold-500/10 flex items-center justify-center border border-gold-500/20">
            <Newspaper className="text-gold-500" size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Data News</h1>
            <p className="text-gray-400 text-sm">Kelola artikel berita dan informasi aplikasi</p>
          </div>
        </div>
        <Link href="/news/new" className="btn-primary flex items-center gap-2">
          <Plus size={18} />
          Tambah Berita
        </Link>
      </div>

      <div className="card p-4">
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <input 
              type="text" 
              placeholder="Cari berita..." 
              className="input pl-11"
            />
          </div>
          <select className="input w-48">
            <option>Semua Kategori</option>
            <option>Promo</option>
            <option>Info</option>
            <option>Update</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 text-gray-500 text-sm">
                <th className="pb-4 font-medium pl-2">Berita</th>
                <th className="pb-4 font-medium">Kategori</th>
                <th className="pb-4 font-medium">Tanggal</th>
                <th className="pb-4 font-medium">Status</th>
                <th className="pb-4 font-medium text-right pr-2">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {news?.map((item) => (
                <tr key={item.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group">
                  <td className="py-4 pl-2">
                    <div className="flex items-center gap-3">
                      {item.image_url ? (
                        <img 
                          src={item.image_url} 
                          alt="" 
                          className="w-12 h-12 rounded-lg object-cover border border-white/5"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center">
                          <Newspaper size={18} className="text-gray-600" />
                        </div>
                      )}
                      <div>
                        <div className="font-semibold text-white group-hover:text-gold-500 transition-colors line-clamp-1">
                          {item.title}
                        </div>
                        <div className="text-gray-500 text-xs line-clamp-1">
                          {item.excerpt || item.content?.substring(0, 50)}...
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 text-gray-400 capitalize">{item.category || 'Info'}</td>
                  <td className="py-4 text-gray-400">
                    <div className="flex items-center gap-1.5">
                      <Calendar size={14} />
                      {format(new Date(item.created_at), 'dd MMM yyyy')}
                    </div>
                  </td>
                  <td className="py-4">
                    <span className="badge bg-green-500/10 text-green-500">
                      Published
                    </span>
                  </td>
                  <td className="py-4 text-right pr-2">
                    <div className="flex items-center justify-end gap-2">
                      <Link 
                        href={`/news/${item.id}/edit`}
                        className="p-2 hover:bg-white/5 rounded-lg text-gray-400 hover:text-white transition-colors"
                      >
                        <Edit2 size={16} />
                      </Link>
                      <button className="p-2 hover:bg-red-500/10 rounded-lg text-gray-500 hover:text-red-500 transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {(!news || news.length === 0) && (
                <tr>
                  <td colSpan={5} className="py-20 text-center">
                    <div className="flex flex-col items-center gap-2 text-gray-500">
                      <Newspaper size={48} className="opacity-20" />
                      <p>Belum ada data berita</p>
                      <Link href="/news/new" className="text-gold-500 hover:underline text-sm font-medium">
                        Buat berita pertama
                      </Link>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
