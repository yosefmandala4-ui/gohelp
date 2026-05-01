import { checkAdminAuth } from '@/lib/auth';
import { createAdminClient } from '@/lib/supabase/server';
import BannerForm from './BannerForm';
import { Newspaper, Image as ImageIcon, Trash2, ExternalLink } from 'lucide-react';

async function getBanners() {
  const supabase = createAdminClient();
  const { data } = await supabase.from('banners').select('*').order('display_order');
  return data ?? [];
}

export default async function BannersPage() {
  await checkAdminAuth();
  const banners = await getBanners();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-2xl bg-gold-500/10 flex items-center justify-center border border-gold-500/20">
          <ImageIcon className="text-gold-500" size={24} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">Manajemen Banner</h1>
          <p className="text-gray-400 text-sm">Kelola banner yang tampil di aplikasi</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 card p-6 self-start border-gold-500/10">
          <h2 className="font-semibold text-white mb-4">Tambah Banner Baru</h2>
          <BannerForm />
        </div>

        <div className="lg:col-span-2 space-y-4">
          {banners.length === 0 ? (
            <div className="card p-12 text-center text-gray-500 border-dashed">
              <ImageIcon size={48} className="mx-auto mb-3 opacity-20" />
              <p className="text-lg font-medium text-white">Belum ada banner</p>
              <p className="text-sm">Tambahkan banner pertama di form kiri</p>
            </div>
          ) : (
            banners.map((banner: any) => (
              <div key={banner.id} className="card p-4 flex items-center gap-4 hover:border-gold-500/30 transition-all group">
                <div className="relative">
                  <img src={banner.image_url} alt={banner.title} className="w-32 h-18 object-cover rounded-xl border border-white/5" />
                  {!banner.is_active && (
                    <div className="absolute inset-0 bg-black/60 rounded-xl flex items-center justify-center text-[10px] text-white font-bold uppercase tracking-wider">
                      Draft
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-white group-hover:text-gold-500 transition-colors">{banner.title || 'Tanpa Judul'}</p>
                  {banner.link_url && (
                    <div className="flex items-center gap-1 text-[10px] text-gray-500 mt-1 truncate">
                      <ExternalLink size={10} />
                      {banner.link_url}
                    </div>
                  )}
                  <div className="flex items-center gap-2 mt-2">
                    <span className={`badge text-[10px] ${banner.is_active ? 'bg-gold-500/10 text-gold-500' : 'bg-white/5 text-gray-500'}`}>
                      {banner.is_active ? 'Aktif' : 'Nonaktif'}
                    </span>
                    <span className="text-[10px] text-gray-500">Urutan: {banner.display_order}</span>
                  </div>
                </div>
                <BannerDeleteBtn bannerId={banner.id} />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

function BannerDeleteBtn({ bannerId }: { bannerId: string }) {
  return (
    <form action={`/api/banners/${bannerId}/delete`} method="POST">
      <button type="submit" className="btn-danger text-xs">Hapus</button>
    </form>
  );
}
