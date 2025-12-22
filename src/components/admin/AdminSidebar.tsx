"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, BookOpen, Users, Settings, LogOut, Image as ImageIcon, Mail as MailIcon, Menu, X, MessageCircle } from "lucide-react";
import { LogoutButton } from "@/components/admin/LogoutButton";

interface AdminSidebarProps {
    user: {
        name?: string | null;
        email?: string | null;
    };
}

export function AdminSidebar({ user }: AdminSidebarProps) {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    const toggleSidebar = () => setIsOpen(!isOpen);

    const isActive = (href: string) => pathname === href;

    return (
        <>
            {/* Mobile Header */}
            <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-neutral-950/80 backdrop-blur-xl border-b border-white/5 p-4 flex items-center justify-between">
                <span className="font-bold text-white tracking-tight">Mazhar Admin</span>
                <button onClick={toggleSidebar} className="text-white p-2">
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Backdrop for mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/80 z-40 md:hidden backdrop-blur-sm"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`
                fixed top-0 bottom-0 left-0 z-50 w-72 bg-neutral-900/95 backdrop-blur-xl border-r border-white/5 flex flex-col transition-transform duration-300 ease-in-out
                ${isOpen ? "translate-x-0" : "-translate-x-full"}
                md:static md:translate-x-0 md:bg-neutral-900/50
            `}>
                <div className="p-8 hidden md:block">
                    <h1 className="text-2xl font-bold tracking-tighter bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-transparent">
                        Mazhar Admin
                    </h1>
                    <p className="text-xs text-neutral-500 mt-1 uppercase tracking-widest font-medium">Yönetim Paneli</p>
                </div>

                <div className="p-8 md:hidden mt-16">
                    <h1 className="text-2xl font-bold tracking-tighter text-white">
                        Mazhar Admin
                    </h1>
                    <p className="text-xs text-neutral-500 mt-1 uppercase tracking-widest font-medium">Yönetim Paneli</p>
                </div>

                {/* Navigation with scroll */}
                <nav className="flex-1 px-4 space-y-1 overflow-y-auto scrollbar-thin scrollbar-thumb-neutral-800 scrollbar-track-transparent">
                    <NavItem href="/admin" icon={<LayoutDashboard size={18} />} label="Genel Bakış" active={isActive("/admin")} onClick={() => setIsOpen(false)} />

                    <div className="pt-6 pb-2 px-4 text-xs font-bold text-neutral-600 uppercase tracking-wider">İçerik</div>
                    <NavItem href="/admin/issues" icon={<BookOpen size={18} />} label="Sayılar" active={isActive("/admin/issues")} onClick={() => setIsOpen(false)} />
                    <NavItem href="/admin/authors" icon={<Users size={18} />} label="Yazarlar" active={isActive("/admin/authors")} onClick={() => setIsOpen(false)} />
                    <NavItem href="/admin/comments" icon={<MessageCircle size={18} />} label="Yorumlar" active={isActive("/admin/comments")} onClick={() => setIsOpen(false)} />

                    <div className="pt-6 pb-2 px-4 text-xs font-bold text-neutral-600 uppercase tracking-wider">Medya & İletişim</div>
                    <NavItem href="/admin/media" icon={<ImageIcon size={18} />} label="Medya Kütüphanesi" active={isActive("/admin/media")} onClick={() => setIsOpen(false)} />
                    <NavItem href="/admin/newsletter" icon={<MailIcon size={18} />} label="Bülten Aboneleri" active={isActive("/admin/newsletter")} onClick={() => setIsOpen(false)} />

                    <div className="pt-6 pb-2 px-4 text-xs font-bold text-neutral-600 uppercase tracking-wider">Sistem</div>
                    <NavItem href="/admin/settings" icon={<Settings size={18} />} label="Ayarlar" active={isActive("/admin/settings")} onClick={() => setIsOpen(false)} />

                    {/* Extra padding at bottom to prevent cutoff on small screens */}
                    <div className="h-8"></div>
                </nav>

                <div className="p-4 border-t border-white/5 bg-neutral-900/30 mt-auto">
                    <div className="flex items-center gap-3 px-2 mb-4">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-600 to-purple-600 flex items-center justify-center text-sm font-bold shadow-lg shadow-purple-900/20 text-white shrink-0">
                            {user?.name?.[0] || "A"}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm text-neutral-200 truncate">{user?.name}</p>
                            <p className="text-xs text-neutral-500 truncate">{user?.email}</p>
                        </div>
                    </div>
                    <LogoutButton />
                </div>
            </aside>
        </>
    );
}

function NavItem({ href, icon, label, active, onClick }: { href: string; icon: React.ReactNode; label: string; active?: boolean; onClick?: () => void }) {
    return (
        <Link
            href={href}
            onClick={onClick}
            className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 group ${active
                ? "bg-amber-500/10 text-amber-500 border border-amber-500/10 shadow-sm"
                : "text-neutral-400 hover:text-white hover:bg-white/5"
                }`}
        >
            <span className={`transition-transform duration-200 ${active ? "text-amber-500 scale-110" : "text-neutral-500 group-hover:text-amber-500 group-hover:scale-110"
                }`}>
                {icon}
            </span>
            <span className="font-medium">{label}</span>
        </Link>
    )
}
