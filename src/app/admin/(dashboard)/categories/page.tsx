"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Edit, Trash2, Search, Folder } from "lucide-react";

interface Category {
    id: string;
    name: string;
    slug: string;
    description?: string;
    color?: string;
    _count?: {
        articles: number;
    };
}

export default function CategoriesPage() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [search, setSearch] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const res = await fetch("/api/admin/categories");
            if (res.ok) {
                const data = await res.json();
                setCategories(data);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const deleteCategory = async (id: string) => {
        if (!confirm("Bu kategoriyi silmek istediğinize emin misiniz?")) return;

        try {
            const res = await fetch(`/api/admin/categories/${id}`, {
                method: "DELETE",
            });
            if (res.ok) {
                setCategories(categories.filter((c) => c.id !== id));
            } else {
                alert("Silinemedi");
            }
        } catch (error) {
            console.error(error);
        }
    };

    const filteredCategories = categories.filter((c) =>
        c.name.toLowerCase().includes(search.toLowerCase())
    );

    if (isLoading) return <div className="p-8">Yükleniyor...</div>;

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-6">
                <div>
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-transparent">
                        Kategoriler
                    </h1>
                    <p className="text-sm text-neutral-500 mt-1">
                        Toplam {categories.length} kategori
                    </p>
                </div>
                <Link
                    href="/admin/categories/new"
                    className="flex items-center gap-2 bg-gradient-to-r from-amber-600 to-amber-700 text-white px-4 py-2 rounded-lg hover:from-amber-500 hover:to-amber-600 shadow-lg shadow-amber-900/20 transition-all font-medium"
                >
                    <Plus size={18} />
                    Yeni Kategori
                </Link>
            </div>

            {/* Search */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" size={20} />
                <input
                    type="text"
                    placeholder="Kategori ara..."
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
                                    Kategori İsmi
                                </th>
                                <th className="text-left py-4 px-6 text-xs font-bold text-neutral-400 uppercase tracking-wider">
                                    Slug
                                </th>
                                <th className="text-left py-4 px-6 text-xs font-bold text-neutral-400 uppercase tracking-wider">
                                    Yazı Sayısı
                                </th>
                                <th className="text-right py-4 px-6 text-xs font-bold text-neutral-400 uppercase tracking-wider">
                                    İşlemler
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {filteredCategories.map((category) => (
                                <tr
                                    key={category.id}
                                    className="group hover:bg-white/5 transition-colors"
                                >
                                    <td className="py-4 px-6">
                                        <div className="flex items-center gap-3">
                                            <div
                                                className={`w-8 h-8 rounded-lg flex items-center justify-center bg-gradient-to-br ${category.color || "from-neutral-700 to-neutral-800"}`}
                                            >
                                                <Folder size={14} className="text-white" />
                                            </div>
                                            <div className="font-medium text-white group-hover:text-amber-500 transition-colors">
                                                {category.name}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6 text-neutral-400 font-mono text-xs">
                                        {category.slug}
                                    </td>
                                    <td className="py-4 px-6">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-neutral-800 text-neutral-300 border border-white/5">
                                            {category._count?.articles || 0}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link
                                                href={`/admin/categories/${category.id}`}
                                                className="p-2 text-neutral-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                                            >
                                                <Edit size={16} />
                                            </Link>
                                            <button
                                                onClick={() => deleteCategory(category.id)}
                                                className="p-2 text-neutral-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {filteredCategories.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="py-12 text-center text-neutral-500">
                                        Kategori bulunamadı.
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
