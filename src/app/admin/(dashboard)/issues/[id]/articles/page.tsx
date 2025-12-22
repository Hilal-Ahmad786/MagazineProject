"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Plus, Edit2, Trash2, FileText, User, CheckCircle, Circle, Star } from "lucide-react";
import { useRouter } from "next/navigation";

interface Article {
    id: string;
    title: string;
    author: {
        name: string;
    } | null;
    authorId?: string;
    status: string;
    slug: string;
    featured: boolean;
}

export default function ArticlesListPage({ params }: { params: { id: string } }) {
    const router = useRouter();
    const [articles, setArticles] = useState<Article[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchArticles();
    }, []);

    async function fetchArticles() {
        try {
            const res = await fetch(`/api/admin/issues/${params.id}/articles`);
            if (res.ok) {
                const data = await res.json();
                setArticles(Array.isArray(data) ? data : []);
            }
        } catch (error) {
            console.error("Failed to fetch articles", error);
        } finally {
            setIsLoading(false);
        }
    }

    const handleDelete = async (articleId: string) => {
        if (!confirm("Bu yazıyı silmek istediğinize emin misiniz?")) return;

        try {
            const res = await fetch(`/api/admin/issues/${params.id}/articles/${articleId}`, {
                method: "DELETE",
            });

            if (res.ok) {
                setArticles(articles.filter((a) => a.id !== articleId));
            } else {
                alert("Silme işlemi başarısız");
            }
        } catch (error) {
            console.error("Failed to delete article", error);
            alert("Bir hata oluştu");
        }
    };

    const handleToggleFeatured = async (article: Article) => {
        // Optimistic update
        const newFeaturedStatus = !article.featured;
        const previousArticles = [...articles];

        setArticles(articles.map(a =>
            a.id === article.id ? { ...a, featured: newFeaturedStatus } : a
        ));

        try {
            const res = await fetch(`/api/admin/issues/${params.id}/articles/${article.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ featured: newFeaturedStatus }),
            });

            if (!res.ok) {
                // Revert on failure
                setArticles(previousArticles);
                alert("Güncelleme başarısız");
            }
        } catch (error) {
            console.error("Failed to update featured status", error);
            setArticles(previousArticles);
            alert("Bir hata oluştu");
        }
    };

    if (isLoading) return <div className="p-8 text-white">Yükleniyor...</div>;

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-6">
                <div className="flex items-center gap-4">
                    <Link
                        href={`/admin/issues/${params.id}`}
                        className="p-2 rounded-full hover:bg-white/5 text-neutral-400 hover:text-white transition-all"
                        title="Sayı detaylarına dön"
                    >
                        <ArrowLeft size={24} />
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-transparent flex items-center gap-3">
                            <FileText className="text-white" />
                            Yazılar
                        </h1>
                        <p className="text-neutral-400 mt-1 flex items-center gap-2">
                            <span className="bg-neutral-800 px-2 py-0.5 rounded text-xs text-neutral-300 font-mono">{params.id}</span>
                            <span>sayısına ait içerikler listeleniyor.</span>
                        </p>
                    </div>
                </div>
                <Link
                    href={`/admin/issues/${params.id}/articles/new`}
                    className="flex items-center gap-2 bg-gradient-to-r from-amber-600 to-amber-700 text-white px-6 py-2.5 rounded-lg hover:from-amber-500 hover:to-amber-600 shadow-lg shadow-amber-900/20 font-medium transition-all"
                >
                    <Plus size={20} />
                    <span>Yeni Yazı Ekle</span>
                </Link>
            </div>

            <div className="bg-neutral-900/50 backdrop-blur-xl rounded-xl border border-white/5 shadow-2xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-neutral-800/50 border-b border-white/5">
                                <th className="px-6 py-4 text-xs font-bold text-neutral-400 uppercase tracking-wider">Başlık</th>
                                <th className="px-6 py-4 text-xs font-bold text-neutral-400 uppercase tracking-wider">Yazar</th>
                                <th className="px-6 py-4 text-xs font-bold text-neutral-400 uppercase tracking-wider">Durum</th>
                                <th className="px-6 py-4 text-xs font-bold text-neutral-400 uppercase tracking-wider text-center">Öne Çıkan</th>
                                <th className="px-6 py-4 text-xs font-bold text-neutral-400 uppercase tracking-wider text-right">İşlemler</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {articles.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-neutral-500">
                                        <div className="flex flex-col items-center gap-2">
                                            <FileText size={48} className="opacity-20" />
                                            <span>Henüz yazı eklenmemiş.</span>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                articles.map((article) => (
                                    <tr key={article.id} className="hover:bg-white/5 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="font-bold text-white group-hover:text-amber-500 transition-colors">{article.title}</div>
                                            <div className="text-xs text-neutral-500 font-mono mt-1">{article.slug}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2 text-sm text-neutral-300">
                                                <User size={14} className="text-neutral-500" />
                                                <span>{article.author?.name || article.authorId || "Unknown"}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border shadow-sm ${article.status === 'published'
                                                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                                                : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                                                }`}>
                                                {article.status === 'published' ? <CheckCircle size={10} /> : <Circle size={10} />}
                                                {article.status === 'published' ? 'Yayında' : 'Taslak'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <button
                                                onClick={() => handleToggleFeatured(article)}
                                                className={`p-2 rounded-full transition-all ${article.featured
                                                    ? 'text-yellow-400 hover:text-yellow-300 hover:bg-yellow-400/10'
                                                    : 'text-neutral-600 hover:text-neutral-400 hover:bg-white/5'
                                                    }`}
                                                title={article.featured ? "Öne çıkarılanı kaldır" : "Öne çıkar"}
                                            >
                                                <Star size={18} fill={article.featured ? "currentColor" : "none"} />
                                            </button>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
                                                <Link
                                                    href={`/admin/issues/${params.id}/articles/${article.id}`}
                                                    className="p-2 text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors"
                                                    title="Düzenle"
                                                >
                                                    <Edit2 size={16} />
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(article.id)}
                                                    className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                                                    title="Sil"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="text-xs text-neutral-500 text-center font-medium">
                Toplam {articles.length} yazı listeleniyor.
            </div>
        </div>
    );
}
