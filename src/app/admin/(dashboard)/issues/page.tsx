"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Edit2, Trash2, CheckCircle, Circle, BookOpen } from "lucide-react";
import Image from "next/image";

interface Issue {
    id: string;
    title: string;
    slug: string;
    coverImage: string;
    publishMonth: string;
    status: string;
    number: number;
}

export default function IssuesPage() {
    const [issues, setIssues] = useState<Issue[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchIssues();
    }, []);

    async function fetchIssues() {
        try {
            const res = await fetch("/api/admin/issues");
            if (res.ok) {
                const data = await res.json();
                if (Array.isArray(data)) {
                    setIssues(data);
                } else {
                    console.error("Values is not an array", data);
                    setIssues([]);
                }
            }
        } catch (error) {
            console.error("Failed to fetch issues", error);
        } finally {
            setIsLoading(false);
        }
    }

    async function deleteIssue(id: string) {
        if (!confirm("Bu sayıyı ve içindeki tüm yazıları silmek istediğinize emin misiniz? Bu işlem geri alınamaz!")) return;

        try {
            const res = await fetch(`/api/admin/issues/${id}`, {
                method: "DELETE",
            });

            if (res.ok) {
                setIssues(issues.filter((i) => i.id !== id));
            } else {
                alert("Silme işlemi başarısız oldu.");
            }
        } catch (error) {
            console.error("Failed to delete issue", error);
        }
    }

    if (isLoading) return <div className="p-8 text-white">Yükleniyor...</div>;

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between border-b border-white/5 pb-6">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-transparent flex items-center gap-3">
                    <BookOpen className="text-white" />
                    Sayılar
                </h1>
                <Link
                    href="/admin/issues/new"
                    className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-amber-600 to-amber-700 text-white px-6 py-2.5 font-medium hover:from-amber-500 hover:to-amber-600 shadow-lg shadow-amber-900/20 transition-all"
                >
                    <Plus size={18} />
                    Yeni Sayı Ekle
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {issues.map((issue) => (
                    <div key={issue.id} className="group relative bg-neutral-900/50 backdrop-blur-xl rounded-xl border border-white/5 overflow-hidden hover:shadow-2xl hover:border-amber-500/30 transition-all duration-300">
                        {/* Cover Image Container */}
                        <div className="aspect-[3/4] relative bg-neutral-800 border-b border-white/5 overflow-hidden">
                            {issue.coverImage ? (
                                <Image
                                    src={issue.coverImage}
                                    alt={issue.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                            ) : (
                                <div className="flex flex-col items-center justify-center h-full text-neutral-600">
                                    <BookOpen size={48} className="opacity-20 mb-2" />
                                    <span>Kapak Yok</span>
                                </div>
                            )}

                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent opacity-60" />

                            {/* Status Badge */}
                            <div className="absolute top-3 right-3">
                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider border shadow-sm backdrop-blur-md ${issue.status === 'published'
                                    ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                                    : 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                                    }`}>
                                    {issue.status === 'published' ? <CheckCircle size={10} /> : <Circle size={10} />}
                                    {issue.status === 'published' ? 'Yayında' : 'Taslak'}
                                </span>
                            </div>

                            {/* Issue Number Badge */}
                            <div className="absolute top-3 left-3 bg-white/10 backdrop-blur-md border border-white/20 text-white font-black text-xs px-2 py-1 rounded-md">
                                #{issue.number}
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-5">
                            <div className="mb-4">
                                <h3 className="font-bold text-lg text-white mb-1 line-clamp-1 group-hover:text-amber-500 transition-colors">{issue.title}</h3>
                                <p className="text-xs text-neutral-400 font-medium uppercase tracking-wider">{issue.publishMonth}</p>
                            </div>

                            <div className="flex items-center justify-between pt-4 border-t border-white/5">
                                <Link
                                    href={`/admin/issues/${issue.id}/articles`}
                                    className="text-xs font-bold text-white hover:text-amber-500 flex items-center gap-1 transition-colors group/link"
                                >
                                    Yazıları Yönet
                                    <span className="group-hover/link:translate-x-1 transition-transform">&rarr;</span>
                                </Link>
                                <div className="flex gap-2">
                                    <Link
                                        href={`/admin/issues/${issue.id}`}
                                        className="p-2 text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors"
                                        title="Düzenle"
                                    >
                                        <Edit2 size={16} />
                                    </Link>
                                    <button
                                        onClick={() => deleteIssue(issue.id)}
                                        className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                                        title="Sil"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                {/* New Issue Card Placeholder */}
                <Link
                    href="/admin/issues/new"
                    className="group border border-dashed border-white/10 rounded-xl flex flex-col items-center justify-center p-8 bg-neutral-900/30 hover:bg-neutral-900/60 hover:border-amber-500/50 transition-all gap-4"
                >
                    <div className="w-16 h-16 rounded-full bg-neutral-800 flex items-center justify-center text-neutral-500 group-hover:bg-amber-500 group-hover:text-white transition-all shadow-lg">
                        <Plus size={32} />
                    </div>
                    <span className="font-medium text-neutral-400 group-hover:text-white transition-colors">Yeni Sayı Oluştur</span>
                </Link>
            </div>
        </div>
    );
}
