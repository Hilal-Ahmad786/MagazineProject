"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Copy, Upload, Image as ImageIcon, Search, FileText } from "lucide-react";
import { useToast } from "@/context/ToastContext";

interface MediaFile {
    name: string;
    path: string;
    url: string;
}

export default function MediaPage() {
    const [files, setFiles] = useState<MediaFile[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isUploading, setIsUploading] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const { showToast } = useToast();

    useEffect(() => {
        fetchMedia();
    }, []);

    const fetchMedia = async () => {
        try {
            const res = await fetch("/api/admin/media");
            if (res.ok) {
                const data = await res.json();
                setFiles(data);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files?.length) return;

        setIsUploading(true);
        const file = e.target.files[0];

        try {
            // Import dynamically to avoid SSR issues with client modules if any
            const { upload } = await import('@vercel/blob/client');

            const newBlob = await upload(file.name, file, {
                access: 'public',
                handleUploadUrl: '/api/admin/media/upload',
            });

            fetchMedia(); // Refresh list
            showToast("Dosya başarıyla yüklendi", "success");
        } catch (error) {
            console.error(error);
            showToast("Yükleme başarısız", "error");
        } finally {
            setIsUploading(false);
            // Reset input
            e.target.value = '';
        }
    };

    const copyToClipboard = (url: string) => {
        navigator.clipboard.writeText(url);
        showToast("URL kopyalandı!", "success");
    };

    const [filterType, setFilterType] = useState<'all' | 'image' | 'pdf'>('all');

    const filteredFiles = files.filter(file => {
        const matchesSearch = file.name.toLowerCase().includes(searchQuery.toLowerCase());
        const isPdf = file.name.toLowerCase().endsWith('.pdf');

        if (filterType === 'image') return matchesSearch && !isPdf;
        if (filterType === 'pdf') return matchesSearch && isPdf;
        return matchesSearch;
    });

    if (isLoading) return <div className="p-8 text-white">Yükleniyor...</div>;

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-6">
                <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-transparent flex items-center gap-3">
                        <ImageIcon className="text-white" />
                        Medya Kütüphanesi
                    </h1>
                    <p className="text-neutral-400 mt-2">Görsel ve PDF dosyalarınızı yükleyin ve yönetin.</p>
                </div>
                <div className="flex gap-4">
                    {/* Image Upload */}
                    <div className="relative">
                        <input
                            type="file"
                            id="image-upload"
                            className="hidden"
                            onChange={handleUpload}
                            accept="image/*"
                            disabled={isUploading}
                        />
                        <label
                            htmlFor="image-upload"
                            className={`flex items-center gap-2 bg-gradient-to-r from-amber-600 to-amber-700 text-white px-6 py-2.5 rounded-lg cursor-pointer hover:from-amber-500 hover:to-amber-600 shadow-lg shadow-amber-900/20 font-medium transition-all ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            <ImageIcon size={20} />
                            <span>{isUploading ? "Yükleniyor..." : "Görsel Yükle"}</span>
                        </label>
                    </div>

                    {/* PDF Upload */}
                    <div className="relative">
                        <input
                            type="file"
                            id="pdf-upload"
                            className="hidden"
                            onChange={handleUpload}
                            accept="application/pdf"
                            disabled={isUploading}
                        />
                        <label
                            htmlFor="pdf-upload"
                            className={`flex items-center gap-2 bg-neutral-800 text-neutral-300 border border-white/10 px-6 py-2.5 rounded-lg cursor-pointer hover:bg-neutral-700 hover:text-white font-medium transition-all ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            <Upload size={20} />
                            <span>{isUploading ? "Yükleniyor..." : "PDF Yükle"}</span>
                        </label>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Search Sidebar */}
                <div className="lg:col-span-1 space-y-4">
                    <div className="bg-neutral-900/50 backdrop-blur-xl p-6 rounded-xl border border-white/5 shadow-2xl sticky top-24">
                        <h2 className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-4">Filtrele</h2>

                        {/* Type Filters */}
                        <div className="flex gap-2 mb-4 p-1 bg-neutral-800 rounded-lg">
                            <button
                                onClick={() => setFilterType('all')}
                                className={`flex-1 py-1.5 px-3 rounded-md text-xs font-medium transition-all ${filterType === 'all' ? 'bg-neutral-700 text-white shadow-sm' : 'text-neutral-400 hover:text-white'}`}
                            >
                                Tümü
                            </button>
                            <button
                                onClick={() => setFilterType('image')}
                                className={`flex-1 py-1.5 px-3 rounded-md text-xs font-medium transition-all ${filterType === 'image' ? 'bg-amber-600 text-white shadow-sm' : 'text-neutral-400 hover:text-white'}`}
                            >
                                Görsel
                            </button>
                            <button
                                onClick={() => setFilterType('pdf')}
                                className={`flex-1 py-1.5 px-3 rounded-md text-xs font-medium transition-all ${filterType === 'pdf' ? 'bg-red-600 text-white shadow-sm' : 'text-neutral-400 hover:text-white'}`}
                            >
                                PDF
                            </button>
                        </div>

                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" size={18} />
                            <input
                                type="text"
                                placeholder="Dosya adı ara..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 rounded-lg bg-neutral-800 border border-white/10 px-4 py-2.5 text-white placeholder:text-neutral-600 focus:ring-amber-500 focus:border-amber-500 transition-all"
                            />
                        </div>
                        <div className="mt-4 pt-4 border-t border-white/5">
                            <div className="text-xs text-neutral-500 flex justify-between">
                                <span>Toplam Dosya</span>
                                <span className="text-white font-medium">{filteredFiles.length}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Media Grid */}
                <div className="lg:col-span-3">
                    <div className="bg-neutral-900/50 backdrop-blur-xl p-6 rounded-xl border border-white/5 shadow-2xl min-h-[500px]">
                        {filteredFiles.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-full text-neutral-500 py-20">
                                <ImageIcon size={48} className="mb-4 opacity-20" />
                                <p>{searchQuery || filterType !== 'all' ? "Aranan kriterlere uygun dosya bulunamadı." : "Henüz dosya bulunmuyor."}</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                                {filteredFiles.map((file, idx) => {
                                    const isPdf = file.name.toLowerCase().endsWith('.pdf');
                                    return (
                                        <div key={idx} className="group relative aspect-square rounded-lg overflow-hidden border border-white/5 bg-neutral-800 hover:border-amber-500/50 transition-all shadow-sm hover:shadow-xl hover:shadow-black/50">
                                            {isPdf ? (
                                                <div className="w-full h-full flex flex-col items-center justify-center bg-neutral-800 text-neutral-400 p-4">
                                                    <FileText size={48} className="mb-2 text-red-500" />
                                                    <span className="text-xs text-center break-all font-medium">{file.name}</span>
                                                </div>
                                            ) : (
                                                <Image
                                                    src={file.url}
                                                    alt={file.name}
                                                    fill
                                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                                />
                                            )}

                                            {/* Overlay Actions */}
                                            <div className="absolute inset-0 bg-neutral-950/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center gap-2 backdrop-blur-sm p-4 text-center">
                                                <p className="text-xs text-white font-medium truncate w-full mb-2 px-2">{file.name}</p>
                                                <button
                                                    onClick={() => copyToClipboard(file.url)}
                                                    className="flex items-center gap-2 px-3 py-1.5 bg-white text-black rounded-full text-xs font-bold hover:bg-amber-400 hover:scale-105 transition-all"
                                                    title="Link kopyala"
                                                >
                                                    <Copy size={14} />
                                                    <span>Kopyala</span>
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
