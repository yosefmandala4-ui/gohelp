'use client';

import { useState } from 'react';
import { Upload, X, Loader2, Image as ImageIcon } from 'lucide-react';

interface ImageUploadProps {
  onUpload: (url: string) => void;
  value?: string;
  label?: string;
}

export default function ImageUpload({ onUpload, value, label }: ImageUploadProps) {
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    try {
      // For simplicity in this demo, we'll use an unsigned upload or a client-side signed one
      // In production, you'd get the signature from an API route
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'gohelp_preset');

      const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
      const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (data.secure_url) {
        onUpload(data.secure_url);
      }
    } catch (error) {
      console.error('Upload error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-2">
      {label && <label className="text-xs font-medium text-gray-400">{label}</label>}
      <div className="relative group">
        {value ? (
          <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10">
            <img src={value} alt="Preview" className="w-full h-full object-cover" />
            <button
              onClick={() => onUpload('')}
              className="absolute top-2 right-2 p-1.5 bg-black/60 hover:bg-red-500 text-white rounded-lg transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        ) : (
          <label className="flex flex-col items-center justify-center aspect-video rounded-xl border-2 border-dashed border-white/10 bg-white/5 hover:bg-white/[0.08] hover:border-gold-500/50 cursor-pointer transition-all">
            {loading ? (
              <Loader2 className="animate-spin text-gold-500" size={24} />
            ) : (
              <>
                <Upload className="text-gray-500 mb-2" size={24} />
                <span className="text-xs text-gray-500">Pilih gambar atau drop di sini</span>
              </>
            )}
            <input type="file" className="hidden" accept="image/*" onChange={handleUpload} disabled={loading} />
          </label>
        )}
      </div>
    </div>
  );
}
