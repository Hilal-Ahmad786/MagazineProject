"use client";

import { useState, useEffect } from "react";
import { Settings, Save, Globe, Type, Image as ImageIcon, Link as LinkIcon, Facebook, Twitter, Instagram, UserCog } from "lucide-react";

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState("general");

    const renderContent = () => {
        switch (activeTab) {
            case "general":
                return <GeneralSettings />;
            case "seo":
                return <SeoSettings />;
            case "media":
                return <MediaSettings />;
            case "social":
                return <SocialSettings />;
            default:
                return <GeneralSettings />;
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between border-b border-white/5 pb-6">
                <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-transparent flex items-center gap-3">
                        <Settings className="text-white" />
                        Ayarlar
                    </h1>
                    <p className="text-neutral-400 mt-2">Site genel ayarlarını ve yapılandırmalarını yönetin.</p>
                </div>
                <button className="flex items-center gap-2 bg-gradient-to-r from-amber-600 to-amber-700 text-white px-6 py-2.5 rounded-lg hover:from-amber-500 hover:to-amber-600 shadow-lg shadow-amber-900/20 transition-all font-medium">
                    <Save size={18} />
                    <span>Kaydet</span>
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Navigation Sidebar */}
                <div className="space-y-2">
                    <NavItem
                        active={activeTab === "general"}
                        onClick={() => setActiveTab("general")}
                        icon={<Globe size={18} />}
                        label="Genel Ayarlar"
                    />
                    <NavItem
                        active={activeTab === "seo"}
                        onClick={() => setActiveTab("seo")}
                        icon={<Type size={18} />}
                        label="Görünüm & SEO"
                    />
                    <NavItem
                        active={activeTab === "media"}
                        onClick={() => setActiveTab("media")}
                        icon={<ImageIcon size={18} />}
                        label="Medya Ayarları"
                    />
                    <NavItem
                        active={activeTab === "social"}
                        onClick={() => setActiveTab("social")}
                        icon={<LinkIcon size={18} />}
                        label="Sosyal Medya"
                    />
                </div>

                {/* Main Content Area */}
                <div className="lg:col-span-2 space-y-6">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
}

function NavItem({ icon, label, active = false, onClick }: { icon: React.ReactNode, label: string, active?: boolean, onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all text-left ${active
                ? "bg-amber-500/10 text-amber-500 border border-amber-500/20 shadow-sm"
                : "text-neutral-400 hover:text-white hover:bg-white/5"
                }`}>
            <span className={active ? "text-amber-500" : "text-neutral-500"}>{icon}</span>
            {label}
        </button>
    )
}

function GeneralSettings() {
    return (
        <div className="space-y-6">
            <div className="bg-neutral-900/50 backdrop-blur-xl p-8 rounded-xl border border-white/5 shadow-2xl">
                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <Globe size={20} className="text-amber-500" />
                    Genel Site Bilgileri
                </h2>

                <div className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Site Başlığı</label>
                        <input
                            type="text"
                            defaultValue="Mazhar Dergisi"
                            className="w-full rounded-lg bg-neutral-800 border border-white/10 text-white p-3 focus:ring-amber-500 focus:border-amber-500 transition-all"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Site Açıklaması</label>
                        <textarea
                            rows={3}
                            defaultValue="Edebiyat, sanat ve kültür dergisi."
                            className="w-full rounded-lg bg-neutral-800 border border-white/10 text-white p-3 focus:ring-amber-500 focus:border-amber-500 transition-all"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">İletişim Email</label>
                        <input
                            type="email"
                            defaultValue="iletisim@mazhardergisi.com"
                            className="w-full rounded-lg bg-neutral-800 border border-white/10 text-white p-3 focus:ring-amber-500 focus:border-amber-500 transition-all"
                        />
                    </div>
                </div>
            </div>

            <AdminAccountSettings />
        </div>
    );
}

function SeoSettings() {
    return (
        <div className="bg-neutral-900/50 backdrop-blur-xl p-8 rounded-xl border border-white/5 shadow-2xl">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Type size={20} className="text-amber-500" />
                SEO ve Metadata
            </h2>

            <div className="space-y-6">
                <div className="space-y-2">
                    <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Homepage Meta Title</label>
                    <input
                        type="text"
                        defaultValue="Mazhar Dergisi - Edebiyat ve Sanat"
                        className="w-full rounded-lg bg-neutral-800 border border-white/10 text-white p-3 focus:ring-amber-500 focus:border-amber-500 transition-all"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Homepage Meta Description</label>
                    <textarea
                        rows={3}
                        defaultValue="Mazhar Dergisi; edebiyat, sanat, düşünce ve kültür üzerine özgün içerikler sunar."
                        className="w-full rounded-lg bg-neutral-800 border border-white/10 text-white p-3 focus:ring-amber-500 focus:border-amber-500 transition-all"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Open Graph Image URL</label>
                    <input
                        type="text"
                        defaultValue="https://mazhardergisi.com/og-image.jpg"
                        className="w-full rounded-lg bg-neutral-800 border border-white/10 text-white p-3 focus:ring-amber-500 focus:border-amber-500 transition-all"
                    />
                </div>
            </div>
        </div>
    );
}

function MediaSettings() {
    return (
        <div className="bg-neutral-900/50 backdrop-blur-xl p-8 rounded-xl border border-white/5 shadow-2xl">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <ImageIcon size={20} className="text-amber-500" />
                Medya ve Dosya Ayarları
            </h2>

            <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-neutral-800/50 rounded-lg border border-white/5">
                    <div>
                        <h3 className="text-white font-medium">Otomatik Sıkıştırma</h3>
                        <p className="text-xs text-neutral-500">Yüklenen görselleri otomatik olarak optimize et</p>
                    </div>
                    <div className="w-12 h-6 bg-amber-600 rounded-full relative cursor-pointer">
                        <div className="w-4 h-4 bg-white rounded-full absolute top-1 right-1 shadow-sm"></div>
                    </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-neutral-800/50 rounded-lg border border-white/5">
                    <div>
                        <h3 className="text-white font-medium">WebP Dönüştürme</h3>
                        <p className="text-xs text-neutral-500">Tüm görselleri WebP formatına çevir</p>
                    </div>
                    <div className="w-12 h-6 bg-amber-600 rounded-full relative cursor-pointer">
                        <div className="w-4 h-4 bg-white rounded-full absolute top-1 right-1 shadow-sm"></div>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Maksimum Yükleme Boyutu (MB)</label>
                    <input
                        type="number"
                        defaultValue="5"
                        className="w-full rounded-lg bg-neutral-800 border border-white/10 text-white p-3 focus:ring-amber-500 focus:border-amber-500 transition-all"
                    />
                </div>
            </div>
        </div>
    );
}

function SocialSettings() {
    return (
        <div className="bg-neutral-900/50 backdrop-blur-xl p-8 rounded-xl border border-white/5 shadow-2xl">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <LinkIcon size={20} className="text-amber-500" />
                Sosyal Medya Bağlantıları
            </h2>

            <div className="space-y-6">
                <div className="space-y-2">
                    <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider flex items-center gap-2">
                        <Twitter size={14} /> Twitter (X)
                    </label>
                    <input
                        type="text"
                        placeholder="https://twitter.com/..."
                        className="w-full rounded-lg bg-neutral-800 border border-white/10 text-white p-3 focus:ring-amber-500 focus:border-amber-500 transition-all"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider flex items-center gap-2">
                        <Instagram size={14} /> Instagram
                    </label>
                    <input
                        type="text"
                        placeholder="https://instagram.com/..."
                        className="w-full rounded-lg bg-neutral-800 border border-white/10 text-white p-3 focus:ring-amber-500 focus:border-amber-500 transition-all"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider flex items-center gap-2">
                        <Facebook size={14} /> Facebook
                    </label>
                    <input
                        type="text"
                        placeholder="https://facebook.com/..."
                        className="w-full rounded-lg bg-neutral-800 border border-white/10 text-white p-3 focus:ring-amber-500 focus:border-amber-500 transition-all"
                    />
                </div>
            </div>
        </div>
    );
}

function AdminAccountSettings() {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        currentPassword: "",
        newPassword: "",
    });

    useEffect(() => {
        // Fetch current admin info
        fetch("/api/admin/account")
            .then(res => res.json())
            .then(data => {
                if (data.email) {
                    setFormData(prev => ({ ...prev, email: data.email }));
                }
            })
            .catch(err => console.error(err));
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleUpdate = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/admin/account", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            const data = await res.json();

            if (res.ok) {
                alert("Yönetici bilgileri güncellendi!");
                setFormData(prev => ({ ...prev, currentPassword: "", newPassword: "" }));
            } else {
                alert("Hata: " + data.error);
            }
        } catch (error) {
            alert("Bir hata oluştu.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-neutral-900/50 backdrop-blur-xl p-8 rounded-xl border border-white/5 shadow-2xl">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <UserCog size={20} className="text-amber-500" />
                Yönetici Hesap Ayarları
            </h2>

            <div className="space-y-6">
                <p className="text-sm text-neutral-400">
                    Yönetim paneli giriş bilgilerinizi buradan güncelleyebilirsiniz.
                </p>

                <div className="space-y-2">
                    <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Admin Kullanıcı Adı (Email)</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full rounded-lg bg-neutral-800 border border-white/10 text-white p-3 focus:ring-amber-500 focus:border-amber-500 transition-all"
                        placeholder="admin@mazhardergisi.com"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Yeni Şifre</label>
                        <input
                            type="password"
                            name="newPassword"
                            value={formData.newPassword}
                            onChange={handleChange}
                            className="w-full rounded-lg bg-neutral-800 border border-white/10 text-white p-3 focus:ring-amber-500 focus:border-amber-500 transition-all"
                            placeholder="Yeni şifreniz"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Onay İçin Mevcut Şifre</label>
                        <input
                            type="password"
                            name="currentPassword"
                            value={formData.currentPassword}
                            onChange={handleChange}
                            className="w-full rounded-lg bg-neutral-800 border border-white/10 text-white p-3 focus:ring-amber-500 focus:border-amber-500 transition-all"
                            placeholder="Mevcut şifreniz (değişiklik için)"
                        />
                    </div>
                </div>

                <div className="pt-2 flex justify-end">
                    <button
                        onClick={handleUpdate}
                        disabled={loading}
                        className="bg-neutral-800 hover:bg-neutral-700 text-white px-4 py-2 rounded-lg border border-white/10 text-sm font-medium transition-colors disabled:opacity-50"
                    >
                        {loading ? "Güncelleniyor..." : "Hesap Bilgilerini Güncelle"}
                    </button>
                </div>
            </div>
        </div>
    );
}
