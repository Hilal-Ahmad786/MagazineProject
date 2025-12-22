"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const schema = z.object({
    title: z.string().min(2, "Başlık gereklidir"),
    number: z.coerce.number().min(1, "Sayı numarası gereklidir"),
    publishMonth: z.string().min(2, "Yayın ayı gereklidir"),
    date: z.string(),
    coverImage: z.string().optional(),
    status: z.enum(["draft", "published"]),
    slug: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export default function EditIssuePage({ params }: { params: { id: string } }) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    useEffect(() => {
        fetchIssue();
    }, []);

    async function fetchIssue() {
        try {
            const res = await fetch(`/api/admin/issues/${params.id}`);
            if (res.ok) {
                const issue = await res.json();
                setValue("title", issue.title);
                setValue("number", issue.number);
                setValue("publishMonth", issue.publishMonth);
                setValue("date", issue.date);
                setValue("coverImage", issue.coverImage);
                setValue("status", issue.status || "draft");
                setValue("slug", issue.slug);
            } else {
                alert("Sayı bulunamadı");
                router.push("/admin/issues");
            }
        } catch (error) {
            console.error("Failed to fetch issue", error);
        } finally {
            setIsLoading(false);
        }
    }

    const onSubmit = async (data: FormData) => {
        try {
            const res = await fetch(`/api/admin/issues/${params.id}`, {
                method: "PUT",
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

    if (isLoading) return <div className="p-8">Yükleniyor...</div>;

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <div className="flex items-center gap-4 border-b border-white/5 pb-4">
                <Link href="/admin/issues" className="text-neutral-400 hover:text-white transition-colors">
                    <ArrowLeft size={24} />
                </Link>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-transparent">Sayıyı Düzenle</h1>
            </div>

            <div className="bg-neutral-900/50 backdrop-blur-xl rounded-xl border border-white/5 p-8 shadow-2xl">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Sayı Başlığı</label>
                            <input
                                {...register("title")}
                                className="w-full rounded-lg bg-neutral-800 border border-white/10 text-white p-3 focus:ring-amber-500 focus:border-amber-500"
                            />
                            {errors.title && <p className="text-red-400 text-xs">{errors.title.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Sayı Numarası</label>
                            <input
                                type="number"
                                {...register("number")}
                                className="w-full rounded-lg bg-neutral-800 border border-white/10 text-white p-3 focus:ring-amber-500 focus:border-amber-500"
                            />
                            {errors.number && <p className="text-red-400 text-xs">{errors.number.message}</p>}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Yayın Ayı</label>
                            <input
                                {...register("publishMonth")}
                                className="w-full rounded-lg bg-neutral-800 border border-white/10 text-white p-3 focus:ring-amber-500 focus:border-amber-500"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Tarih</label>
                            <input
                                type="date"
                                {...register("date")}
                                className="w-full rounded-lg bg-neutral-800 border border-white/10 text-white p-3 focus:ring-amber-500 focus:border-amber-500"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Kapak Resmi URL</label>
                        <input
                            {...register("coverImage")}
                            className="w-full rounded-lg bg-neutral-800 border border-white/10 text-white p-3 focus:ring-amber-500 focus:border-amber-500"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Durum</label>
                        <select
                            {...register("status")}
                            className="w-full rounded-lg bg-neutral-800 border border-white/10 text-white p-3 focus:ring-amber-500 focus:border-amber-500"
                        >
                            <option value="draft">Taslak</option>
                            <option value="published">Yayında</option>
                        </select>
                    </div>

                    <div className="pt-6 border-t border-white/5 flex justify-end">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="bg-gradient-to-r from-amber-600 to-amber-700 text-white px-8 py-3 rounded-lg hover:from-amber-500 hover:to-amber-600 shadow-lg shadow-amber-900/20 disabled:opacity-50 transition-all font-medium"
                        >
                            {isSubmitting ? "Güncelleniyor..." : "Değişiklikleri Kaydet"}
                        </button>
                    </div>
                </form>

                <div className="mt-12 border-t border-white/5 pt-8">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-bold bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-transparent">Bu Sayıdaki Yazılar</h2>
                        <Link
                            href={`/admin/issues/${params.id}/articles`}
                            className="bg-neutral-800 border border-white/10 text-white px-6 py-2 rounded-lg hover:bg-neutral-700 hover:border-white/20 transition-all text-sm font-medium"
                        >
                            Yazıları Yönet
                        </Link>
                    </div>
                    <p className="text-neutral-500 text-sm">
                        Bu sayıya ait yazıları listelemek, düzenlemek veya yeni yazı eklemek için yukarıdaki butona tıklayın.
                    </p>
                </div>
            </div>
        </div>
    );
}
