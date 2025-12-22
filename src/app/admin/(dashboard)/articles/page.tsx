"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Search, FileText, Edit, Trash2, ExternalLink } from "lucide-react";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/Skeleton";

interface Article {
    id: string;
    title: string;
    slug: string;
    status: string;
    createdAt: string;
    issueId: string;
    author?: { name: string };
    issue?: { number: number; title: string };
    category?: { name: string };
}

export default function GlobalArticlesPage() {
    const [articles, setArticles] = useState<Article[]>([]);
    const [search, setSearch] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const params = new URLSearchParams();
                if (search) params.append("search", search);

                const res = await fetch(`/api/admin/articles?${params.toString()}`);
                if (res.ok) {
                    const data = await res.json();
                    setArticles(data);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };

        // Debounce search
        const timeoutId = setTimeout(() => {
            fetchArticles();
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [search]);

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-6">
                <div>
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-transparent">
                        Tüm Yazılar
                    </h1>
                    <p className="text-sm text-neutral-500 mt-1">
                        Sayılar arası tüm yazıların listesi
                    </p>
                </div>
            </div>

            {/* Search */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" size={20} />
                <input
                    type="text"
                    placeholder="Yazı, yazar veya içerik ara..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full bg-neutral-900/50 border border-white/5 rounded-xl py-3 pl-10 pr-4 text-white focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500/50 transition-all placeholder:text-neutral-600"
                />
            </div>

            <div className="bg-neutral-900/50 backdrop-blur-xl rounded-xl border border-white/5 overflow-hidden shadow-2xl">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-white/5 bg-white/5">
                                <th className="text-left py-4 px-6 text-xs font-bold text-neutral-400 uppercase tracking-wider">
                                    Başlık
                                </th>
                                <th className="text-left py-4 px-6 text-xs font-bold text-neutral-400 uppercase tracking-wider">
                                    Yazar
                                </th>
                                <th className="text-left py-4 px-6 text-xs font-bold text-neutral-400 uppercase tracking-wider">
                                    Sayı & Kategori
                                </th>
                                <th className="text-left py-4 px-6 text-xs font-bold text-neutral-400 uppercase tracking-wider">
                                    Durum
                                </th>
                                <th className="text-right py-4 px-6 text-xs font-bold text-neutral-400 uppercase tracking-wider">
                                    İşlemler
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {articles.map((article) => (
                                <tr
                                    key={article.id}
                                    className="group hover:bg-white/5 transition-colors"
                                >
                                    <td className="py-4 px-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-neutral-800 flex items-center justify-center shrink-0">
                                                <FileText size={14} className="text-neutral-400" />
                                            </div>
                                            <div>
                                                <div className="font-medium text-white group-hover:text-amber-500 transition-colors line-clamp-1">
                                                    {article.title}
                                                </div>
                                                <div className="text-xs text-neutral-500 font-mono">
                                                    {article.slug}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6 text-neutral-300 text-sm">
                                        {article.author?.name || "-"}
                                    </td>
                                    <td className="py-4 px-6">
                                        <div className="flex flex-col gap-1">
                                            {article.issue ? (
                                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-neutral-800 text-neutral-300 border border-white/5 w-fit">
                                                    Sayı {article.issue.number}
                                                </span>
                                            ) : (
                                                <span className="text-xs text-neutral-500">-</span>
                                            )}
                                            {article.category && (
                                                <span className="text-xs text-amber-500/80">
                                                    {article.category.name}
                                                </span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="py-4 px-6">
                                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${article.status === 'published'
                                            ? 'bg-green-500/10 text-green-400 border-green-500/20'
                                            : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                                            }`}>
                                            {article.status === 'published' ? 'Yayında' : 'Taslak'}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6">
                                        <div className="flex items-center justify-end gap-2">
                                            <a
                                                href={`/yazilar/${article.slug}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="p-2 text-neutral-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                                                title="Sitede Gör"
                                            >
                                                <ExternalLink size={16} />
                                            </a>
                                            {article.issueId && (
                                                <Link
                                                    href={`/admin/issues/${article.issueId}/articles/${article.id}`}
                                                    className="p-2 text-neutral-400 hover:text-amber-500 hover:bg-amber-500/10 rounded-lg transition-colors"
                                                    title="Düzenle"
                                                >
                                                    <Edit size={16} />
                                                </Link>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {!isLoading && articles.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="py-12 text-center text-neutral-500">
                                        Yazı bulunamadı.
                                    </td>
                                </tr>
                            )}
                            {isLoading && (
                                [...Array(5)].map((_, i) => (
                                    <tr key={i}>
                                        <td className="py-4 px-6"><Skeleton className="h-8 w-48 bg-neutral-800" /></td>
                                        <td className="py-4 px-6"><Skeleton className="h-4 w-24 bg-neutral-800" /></td>
                                        <td className="py-4 px-6"><Skeleton className="h-4 w-32 bg-neutral-800" /></td>
                                        <td className="py-4 px-6"><Skeleton className="h-6 w-16 rounded-full bg-neutral-800" /></td>
                                        <td className="py-4 px-6"><Skeleton className="h-8 w-20 ml-auto bg-neutral-800" /></td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
