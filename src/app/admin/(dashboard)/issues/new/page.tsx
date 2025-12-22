"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { ArrowLeft, Save, Calendar, FileText, Image as ImageIcon, Layout, RefreshCw } from "lucide-react";

const schema = z.object({
    title: z.string().min(2, "Başlık gereklidir"),
    number: z.coerce.number().min(1, "Sayı numarası gereklidir"),
    publishMonth: z.string().min(2, "Yayın ayı gereklidir (Örn: Ekim 2024)"),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Format: YYYY-AA-GG"),
    coverImage: z.string().optional(),
    status: z.enum(["draft", "published"]),
    slug: z.string().optional(),
    theme: z.string().min(2, "Sayı teması gereklidir") // Added theme field
});

type FormData = z.infer<typeof schema>;

export default function NewIssuePage() {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            status: "draft",
            date: new Date().toISOString().split('T')[0] // today
        }
    });

    const onSubmit = async (data: FormData) => {
        try {
            const res = await fetch("/api/admin/issues", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (res.ok) {
                router.push("/admin/issues");
            } else {
                const error = await res.json();
                alert(`Hata: ${error.error}`);
            }
        } catch (error) {
            console.error(error);
            alert("Bir hata oluştu.");
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link
                        href="/admin/issues"
                        className="p-2 rounded-lg bg-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-700 transition-all border border-white/5"
                    >
                        <ArrowLeft size={20} />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-transparent">
                            Yeni Sayı Ekle
                        </h1>
                        <p className="text-neutral-400 text-sm mt-1">
                            Yeni dergi sayısı oluşturun ve detaylarını girin
                        </p>
                    </div>
                </div>
            </div>

            <div className="bg-neutral-900/50 backdrop-blur-xl border border-white/5 rounded-xl p-8 shadow-2xl">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                    {/* Basic Info Section */}
                    <div className="space-y-6">
                        <h2 className="text-lg font-semibold text-white flex items-center gap-2 border-b border-white/5 pb-2">
                            <Layout size={18} className="text-amber-500" />
                            Temel Bilgiler
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Sayı Başlığı</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-500">
                                        <FileText size={18} />
                                    </div>
                                    <input
                                        {...register("title")}
                                        className="w-full pl-10 rounded-lg bg-neutral-800 border border-white/10 text-white p-3 focus:ring-amber-500 focus:border-amber-500 transition-all placeholder-neutral-600"
                                        placeholder="Örn: 10. Sayı"
                                    />
                                </div>
                                {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Sayı Teması</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-500">
                                        <FileText size={18} />
                                    </div>
                                    <input
                                        {...register("theme")}
                                        className="w-full pl-10 rounded-lg bg-neutral-800 border border-white/10 text-white p-3 focus:ring-amber-500 focus:border-amber-500 transition-all placeholder-neutral-600"
                                        placeholder="Örn: Estetik"
                                    />
                                </div>
                                {errors.theme && <p className="text-red-500 text-xs mt-1">{errors.theme.message}</p>}
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Sayı Numarası</label>
                                <input
                                    type="number"
                                    {...register("number")}
                                    className="w-full rounded-lg bg-neutral-800 border border-white/10 text-white p-3 focus:ring-amber-500 focus:border-amber-500 transition-all placeholder-neutral-600"
                                    placeholder="10"
                                />
                                {errors.number && <p className="text-red-500 text-xs mt-1">{errors.number.message}</p>}
                            </div>
                        </div>
                    </div>

                    {/* Publishing Details */}
                    <div className="space-y-6">
                        <h2 className="text-lg font-semibold text-white flex items-center gap-2 border-b border-white/5 pb-2">
                            <Calendar size={18} className="text-amber-500" />
                            Yayın Detayları
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Yayın Ayı (Görünen)</label>
                                <input
                                    {...register("publishMonth")}
                                    className="w-full rounded-lg bg-neutral-800 border border-white/10 text-white p-3 focus:ring-amber-500 focus:border-amber-500 transition-all placeholder-neutral-600"
                                    placeholder="Örn: Ekim 2024"
                                />
                                {errors.publishMonth && <p className="text-red-500 text-xs mt-1">{errors.publishMonth.message}</p>}
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Tarih (Sıralama için)</label>
                                <input
                                    type="date"
                                    {...register("date")}
                                    className="w-full rounded-lg bg-neutral-800 border border-white/10 text-white p-3 focus:ring-amber-500 focus:border-amber-500 transition-all"
                                />
                                {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date.message}</p>}
                            </div>
                        </div>
                    </div>

                    {/* Media & Status */}
                    <div className="space-y-6">
                        <h2 className="text-lg font-semibold text-white flex items-center gap-2 border-b border-white/5 pb-2">
                            <ImageIcon size={18} className="text-amber-500" />
                            Medya ve Durum
                        </h2>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Kapak Resmi URL</label>
                                <div className="flex gap-2">
                                    <input
                                        {...register("coverImage")}
                                        className="flex-1 rounded-lg bg-neutral-800 border border-white/10 text-white p-3 focus:ring-amber-500 focus:border-amber-500 transition-all placeholder-neutral-600"
                                        placeholder="/images/covers/..."
                                    />
                                    <button
                                        type="button"
                                        onClick={() => window.open('/admin/media', '_blank')}
                                        className="px-4 py-2 bg-neutral-700 text-white rounded-lg hover:bg-neutral-600 transition-colors border border-white/5 text-sm"
                                    >
                                        Medya Seç
                                    </button>
                                </div>
                                <p className="text-xs text-neutral-500">Kapak resmi için dosya yolunu girin.</p>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Durum</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-500">
                                        <RefreshCw size={18} />
                                    </div>
                                    <select
                                        {...register("status")}
                                        className="w-full pl-10 rounded-lg bg-neutral-800 border border-white/10 text-white p-3 focus:ring-amber-500 focus:border-amber-500 transition-all appearance-none cursor-pointer"
                                    >
                                        <option value="draft">Taslak</option>
                                        <option value="published">Yayında</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pt-6 flex justify-end border-t border-white/5">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="bg-gradient-to-r from-amber-600 to-amber-700 text-white px-8 py-3 rounded-lg hover:from-amber-500 hover:to-amber-600 shadow-lg shadow-amber-900/20 transition-all font-bold flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <Save size={18} />
                            {isSubmitting ? "Kaydediliyor..." : "Sayıyı Kaydet"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
