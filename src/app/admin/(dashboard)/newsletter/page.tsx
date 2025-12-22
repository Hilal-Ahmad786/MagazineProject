"use client";

import { useState, useEffect } from "react";
import { Trash2, Mail, Plus, Download, Search } from "lucide-react";

interface Subscriber {
    id: string;
    email: string;
    status: string;
    createdAt: string;
}

export default function NewsletterPage() {
    const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [newEmail, setNewEmail] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        fetchSubscribers();
    }, []);

    const fetchSubscribers = async () => {
        try {
            const res = await fetch("/api/admin/newsletter");
            if (res.ok) {
                const data = await res.json();
                setSubscribers(data);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newEmail) return;

        try {
            const res = await fetch("/api/admin/newsletter", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: newEmail }),
            });

            if (res.ok) {
                setNewEmail("");
                fetchSubscribers();
            } else {
                const err = await res.json();
                alert(err.error || "Hata oluştu");
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Bu aboneyi silmek istediğinize emin misiniz?")) return;
        try {
            const res = await fetch(`/api/admin/newsletter?id=${id}`, {
                method: "DELETE",
            });
            if (res.ok) {
                setSubscribers(subscribers.filter(s => s.id !== id));
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleExport = () => {
        const csvContent = "data:text/csv;charset=utf-8,"
            + "Email,Status,Date\n"
            + subscribers.map(s => `${s.email},${s.status},${s.createdAt}`).join("\n");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "subscribers.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const filteredSubscribers = subscribers.filter(sub =>
        sub.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (isLoading) return <div className="p-8 text-white">Yükleniyor...</div>;

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-6">
                <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-transparent flex items-center gap-3">
                        <Mail className="text-white" />
                        Bülten Aboneleri
                    </h1>
                    <p className="text-neutral-400 mt-2">Bülten abonelerini yönetin ve dışa aktarın.</p>
                </div>
                <button
                    onClick={handleExport}
                    className="flex items-center gap-2 bg-neutral-800 text-white border border-white/10 px-4 py-2 rounded-lg hover:bg-neutral-700 hover:border-white/20 transition-all text-sm font-medium shadow-lg shadow-black/20"
                >
                    <Download size={18} />
                    <span>CSV İndir</span>
                </button>
            </div>

            {/* Actions Bar */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Add New Subscriber */}
                <div className="lg:col-span-2 bg-neutral-900/50 backdrop-blur-xl p-6 rounded-xl border border-white/5 shadow-2xl">
                    <h2 className="text-sm font-bold text-neutral-500 uppercase tracking-wider mb-4">Yeni Abone Ekle</h2>
                    <form onSubmit={handleAdd} className="flex gap-4">
                        <input
                            type="email"
                            placeholder="ornek@email.com"
                            value={newEmail}
                            onChange={(e) => setNewEmail(e.target.value)}
                            className="flex-1 rounded-lg bg-neutral-800 border border-white/10 px-4 py-2.5 text-white placeholder:text-neutral-600 focus:ring-amber-500 focus:border-amber-500 transition-all"
                            required
                        />
                        <button
                            type="submit"
                            className="bg-gradient-to-r from-amber-600 to-amber-700 text-white px-6 py-2.5 rounded-lg hover:from-amber-500 hover:to-amber-600 flex items-center gap-2 shadow-lg shadow-amber-900/20 font-medium transition-all"
                        >
                            <Plus size={18} />
                            Ekle
                        </button>
                    </form>
                </div>

                {/* Search */}
                <div className="bg-neutral-900/50 backdrop-blur-xl p-6 rounded-xl border border-white/5 shadow-2xl">
                    <h2 className="text-sm font-bold text-neutral-500 uppercase tracking-wider mb-4">Ara</h2>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" size={18} />
                        <input
                            type="text"
                            placeholder="Email ara..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 rounded-lg bg-neutral-800 border border-white/10 px-4 py-2.5 text-white placeholder:text-neutral-600 focus:ring-amber-500 focus:border-amber-500 transition-all"
                        />
                    </div>
                </div>
            </div>

            {/* List */}
            <div className="bg-neutral-900/50 backdrop-blur-xl rounded-xl border border-white/5 shadow-2xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-neutral-800/50 border-b border-white/5">
                                <th className="px-6 py-4 text-xs font-bold text-neutral-400 uppercase tracking-wider">Email</th>
                                <th className="px-6 py-4 text-xs font-bold text-neutral-400 uppercase tracking-wider">Durum</th>
                                <th className="px-6 py-4 text-xs font-bold text-neutral-400 uppercase tracking-wider">Kayıt Tarihi</th>
                                <th className="px-6 py-4 text-xs font-bold text-neutral-400 uppercase tracking-wider text-right">İşlemler</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {filteredSubscribers.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="px-6 py-12 text-center text-neutral-500">
                                        {searchQuery ? "Aranan kriterlere uygun abone bulunamadı." : "Henüz abone bulunmuyor."}
                                    </td>
                                </tr>
                            ) : (
                                filteredSubscribers.map((sub) => (
                                    <tr key={sub.id} className="hover:bg-white/5 transition-colors group">
                                        <td className="px-6 py-4 font-medium text-white">{sub.email}</td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                                                {sub.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-neutral-400">
                                            {new Date(sub.createdAt).toLocaleDateString("tr-TR")}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button
                                                onClick={() => handleDelete(sub.id)}
                                                className="p-2 bg-red-500/10 text-red-500 rounded-lg opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500 hover:text-white"
                                                title="Sil"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="text-xs text-neutral-500 text-center font-medium">
                Toplam {filteredSubscribers.length} abone gösteriliyor.
            </div>
        </div>
    );
}
