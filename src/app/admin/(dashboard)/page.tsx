"use client";

import { useEffect, useState } from "react";
import { LayoutDashboard, BookOpen, FileText, Users, Mail, Activity } from "lucide-react";
import Link from "next/link";

interface DashboardStats {
    issues: number;
    articles: number;
    authors: number;
    subscribers: number;
}

interface ActivityItem {
    id: string;
    action: string;
    createdAt: string;
}

export default function AdminDashboardPage() {
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [activity, setActivity] = useState<ActivityItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await fetch("/api/admin/stats");
                if (res.ok) {
                    const data = await res.json();
                    setStats(data.stats);
                    setActivity(data.activity || []);
                }
            } catch (error) {
                console.error("Failed to load dashboard stats", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    if (loading) {
        return <div className="p-8 text-center text-neutral-500">Yükleniyor...</div>;
    }

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between border-b border-white/5 pb-6">
                <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-transparent flex items-center gap-3">
                        <LayoutDashboard className="text-white" />
                        Genel Bakış
                    </h1>
                    <p className="text-neutral-400 mt-2">Mazhar Dergisi yönetim paneline hoşgeldiniz.</p>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Toplam Sayı"
                    value={stats?.issues.toString() || "0"}
                    icon={<BookOpen size={24} className="text-blue-400" />}
                    trend="Güncel"
                    bgColor="bg-blue-500/10"
                    borderColor="border-blue-500/20"
                />
                <StatCard
                    title="Toplam Makale"
                    value={stats?.articles.toString() || "0"}
                    icon={<FileText size={24} className="text-emerald-400" />}
                    trend="Aktif"
                    bgColor="bg-emerald-500/10"
                    borderColor="border-emerald-500/20"
                />
                <StatCard
                    title="Toplam Yazar"
                    value={stats?.authors.toString() || "0"}
                    icon={<Users size={24} className="text-purple-400" />}
                    trend="Yazarlar"
                    bgColor="bg-purple-500/10"
                    borderColor="border-purple-500/20"
                />
                <StatCard
                    title="Aboneler"
                    value={stats?.subscribers.toString() || "0"}
                    icon={<Mail size={24} className="text-amber-400" />}
                    trend="Okuyucular"
                    bgColor="bg-amber-500/10"
                    borderColor="border-amber-500/20"
                />
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Welcome Card */}
                <div className="bg-neutral-900/50 backdrop-blur-xl p-8 rounded-xl border border-white/5 shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-32 bg-amber-500/10 blur-3xl rounded-full -mt-16 -mr-16 group-hover:bg-amber-500/20 transition-all duration-700"></div>
                    <div className="relative z-10">
                        <h2 className="text-xl font-bold text-white mb-4">Hızlı Başlangıç</h2>
                        <p className="text-neutral-400 mb-6 leading-relaxed">
                            Yeni bir sayı yayınlamak veya mevcut içeriği düzenlemek için menüyü kullanabilirsiniz.
                        </p>
                        <div className="flex gap-4">
                            <Link
                                href="/admin/issues"
                                className="bg-white text-neutral-900 px-4 py-2 rounded-lg font-medium hover:bg-neutral-200 transition-colors"
                            >
                                Sayıları Yönet
                            </Link>
                            <Link
                                href="/admin/media"
                                className="bg-neutral-800 text-white border border-white/10 px-4 py-2 rounded-lg font-medium hover:bg-neutral-700 transition-colors"
                            >
                                Görsel Yükle
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-neutral-900/50 backdrop-blur-xl p-8 rounded-xl border border-white/5 shadow-2xl">
                    <h2 className="text-xl font-bold text-white mb-4 flex items-center justify-between">
                        <span>Son Aktiviteler</span>
                        <Activity size={18} className="text-neutral-500" />
                    </h2>
                    <div className="space-y-4">
                        {activity.length > 0 ? (
                            activity.map((item) => (
                                <div key={item.id} className="flex items-center gap-4 p-3 rounded-lg bg-neutral-800/50 border border-white/5">
                                    <div className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center">
                                        <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                                    </div>
                                    <div>
                                        <div className="text-sm text-white font-medium">{item.action}</div>
                                        <div className="text-xs text-neutral-500">{new Date(item.createdAt).toLocaleDateString("tr-TR")}</div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-sm text-neutral-500 text-center py-4">
                                Henüz bir aktivite kaydı yok.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

function StatCard({
    title,
    value,
    icon,
    trend,
    bgColor = "bg-neutral-900",
    borderColor = "border-white/5"
}: {
    title: string;
    value: string;
    icon: React.ReactNode;
    trend: string;
    bgColor?: string;
    borderColor?: string;
}) {
    return (
        <div className={`${bgColor} p-6 rounded-xl shadow-lg border ${borderColor} backdrop-blur-sm hover:scale-105 transition-transform duration-300 group`}>
            <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-white/5 rounded-lg group-hover:bg-white/10 transition-colors">
                    {icon}
                </div>
                <span className="text-xs font-bold text-neutral-500 bg-black/20 px-2 py-1 rounded-full">{trend}</span>
            </div>
            <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1">{title}</h3>
            <p className="text-3xl font-black text-white">{value}</p>
        </div>
    )
}
