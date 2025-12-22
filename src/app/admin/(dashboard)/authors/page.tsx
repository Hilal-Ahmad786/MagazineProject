"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Edit2, Trash2, Users, Search } from "lucide-react";

interface Author {
    id: string;
    name: string;
    slug: string;
    role: string;
    avatar: string;
    articleCount?: number;
}

export default function AuthorsPage() {
    const [authors, setAuthors] = useState<Author[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        fetchAuthors();
    }, []);

    async function fetchAuthors() {
        try {
            const res = await fetch("/api/admin/authors");
            if (res.ok) {
                const data = await res.json();
                setAuthors(data);
            }
        } catch (error) {
            console.error("Failed to fetch authors", error);
        } finally {
            setIsLoading(false);
        }
    }

    async function deleteAuthor(id: string) {
        if (!confirm("Bu yazarı silmek istediğinize emin misiniz?")) return;

        try {
            const res = await fetch(`/api/admin/authors/${id}`, {
                method: "DELETE",
            });

            if (res.ok) {
                setAuthors(authors.filter((a) => a.id !== id));
            } else {
                alert("Silme işlemi başarısız oldu.");
            }
        } catch (error) {
            console.error("Failed to delete author", error);
        }
    }

    const filteredAuthors = authors.filter(author =>
        author.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        author.role.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (isLoading) return <div className="p-8 text-white">Yükleniyor...</div>;

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-6">
                <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-transparent flex items-center gap-3">
                        <Users className="text-white" />
                        Yazarlar
                    </h1>
                    <p className="text-neutral-400 mt-2">Yazarları yönetin, düzenleyin veya yeni yazar ekleyin.</p>
                </div>
                <Link
                    href="/admin/authors/new"
                    className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-amber-600 to-amber-700 text-white px-6 py-2.5 font-medium hover:from-amber-500 hover:to-amber-600 shadow-lg shadow-amber-900/20 transition-all"
                >
                    <Plus size={18} />
                    Yeni Yazar Ekle
                </Link>
            </div>

            {/* Search */}
            <div className="bg-neutral-900/50 backdrop-blur-xl p-4 rounded-xl border border-white/5 flex items-center gap-3">
                <Search className="text-neutral-500" size={20} />
                <input
                    type="text"
                    placeholder="Yazar ara..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-transparent border-none outline-none text-white placeholder:text-neutral-600 w-full"
                />
            </div>

            <div className="bg-neutral-900/50 backdrop-blur-xl rounded-xl border border-white/5 shadow-2xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-neutral-800/50 border-b border-white/5">
                                <th className="px-6 py-4 text-xs font-bold text-neutral-400 uppercase tracking-wider">Profil</th>
                                <th className="px-6 py-4 text-xs font-bold text-neutral-400 uppercase tracking-wider">İsim / URL</th>
                                <th className="px-6 py-4 text-xs font-bold text-neutral-400 uppercase tracking-wider">Rol</th>
                                <th className="px-6 py-4 text-xs font-bold text-neutral-400 uppercase tracking-wider text-right">İşlemler</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {filteredAuthors.map((author) => (
                                <tr key={author.id} className="hover:bg-white/5 transition-colors group">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="h-12 w-12 overflow-hidden rounded-full border border-white/10 p-0.5 bg-neutral-800">
                                            <img
                                                src={author.avatar || "/images/avatars/default.png"}
                                                alt={author.name}
                                                className="h-full w-full object-cover rounded-full"
                                            />
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-bold text-white group-hover:text-amber-500 transition-colors">
                                            {author.name}
                                        </div>
                                        <div className="text-xs text-neutral-500 font-mono mt-1">{author.slug}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider border ${author.role === 'founder' ? 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30' :
                                                author.role === 'editor' ? 'bg-purple-500/20 text-purple-400 border-purple-500/30' :
                                                    'bg-neutral-500/20 text-neutral-400 border-neutral-500/30'
                                            }`}>
                                            {author.role}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <div className="flex justify-end gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
                                            <Link
                                                href={`/admin/authors/${author.id}`}
                                                className="p-2 text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors"
                                                title="Düzenle"
                                            >
                                                <Edit2 size={16} />
                                            </Link>
                                            <button
                                                onClick={() => deleteAuthor(author.id)}
                                                className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                                                title="Sil"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="text-xs text-neutral-500 text-center font-medium">
                Toplam {filteredAuthors.length} yazar listeleniyor.
            </div>
        </div>
    );
}
