"use client";

import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { Save, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { TipTapEditor } from "./TipTapEditor";
import { useToast } from "@/context/ToastContext";

// Zod Schema
const articleSchema = z.object({
    title: z.string().min(1, "Başlık gereklidir"),
    slug: z.string().optional(),
    excerpt: z.string().optional(),
    authorId: z.string().min(1, "Yazar seçilmelidir"),
    date: z.string().optional(),
    readTime: z.coerce.number().min(1),
    categoryId: z.string().optional(),
    status: z.enum(["draft", "published"]),
    featured: z.boolean().optional(),
    image: z.string().optional(), // Cover image
    contentHtml: z.string().optional(),
});

type FormData = z.infer<typeof articleSchema>;

interface Author {
    id: string;
    name: string;
}

interface Category {
    id: string;
    name: string;
}

interface ArticleFormProps {
    issueId: string;
    initialData?: any;
    isEditMode?: boolean;
}

export default function ArticleForm({ issueId, initialData, isEditMode = false }: ArticleFormProps) {
    const router = useRouter();
    const [authors, setAuthors] = useState<Author[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { showToast } = useToast();

    // Helper to get HTML content from potentially legacy block data
    const getInitialContent = () => {
        if (!initialData) return "";
        if (typeof initialData.content === 'string') return initialData.content;

        // If legacy blocks, try to convert (simplified) or just return empty if too complex
        // Ideally we would run a migration script, but for now we look for 'content' string
        return "";
    };

    const { control, register, handleSubmit, watch, setValue, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(articleSchema),
        defaultValues: {
            title: initialData?.title || "",
            slug: initialData?.slug || "",
            excerpt: initialData?.excerpt || "",
            authorId: initialData?.authorId || initialData?.author?.id || "",
            date: initialData?.date || initialData?.publishDate || new Date().toISOString().split("T")[0],
            readTime: initialData?.readTime || 5,
            categoryId: initialData?.categoryId || initialData?.category?.id || "",
            status: initialData?.status || "draft",
            featured: initialData?.featured || false,
            image: initialData?.image || "",
            contentHtml: getInitialContent(),
        },
    });

    useEffect(() => {
        // Fetch authors
        fetch("/api/admin/authors")
            .then((res) => res.json())
            .then((data) => setAuthors(data))
            .catch((err) => console.error(err));

        // Fetch categories
        fetch("/api/admin/categories")
            .then((res) => res.json())
            .then((data) => setCategories(data))
            .catch((err) => console.error(err));
    }, []);

    const onSubmit = async (data: FormData) => {
        setIsSubmitting(true);
        try {
            const payload = {
                ...data,
                content: data.contentHtml, // Save HTML strictly
            };

            const url = isEditMode
                ? `/api/admin/issues/${issueId}/articles/${initialData.id}`
                : `/api/admin/issues/${issueId}/articles`;

            const method = isEditMode ? "PUT" : "POST";

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (res.ok) {
                showToast("Yazı başarıyla kaydedildi", "success");
                router.push(`/admin/issues/${issueId}/articles`);
                router.refresh();
            } else {
                showToast("Kaydetme başarısız.", "error");
            }
        } catch (error) {
            console.error(error);
            showToast("Hata oluştu.", "error");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 pb-20">
            {/* Header */}
            <div className="flex items-center justify-between sticky top-0 bg-neutral-950/80 backdrop-blur-xl z-20 py-4 border-b border-white/5 -mx-8 px-8">
                <div className="flex items-center gap-4">
                    <Link href={`/admin/issues/${issueId}/articles`} className="text-neutral-400 hover:text-white transition-colors">
                        <ArrowLeft size={24} />
                    </Link>
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-transparent">
                        {isEditMode ? "Yazıyı Düzenle" : "Yeni Yazı Ekle"}
                    </h1>
                </div>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex items-center gap-2 bg-gradient-to-r from-amber-600 to-amber-700 text-white px-6 py-2 rounded-lg hover:from-amber-500 hover:to-amber-600 shadow-lg shadow-amber-900/20 disabled:opacity-50 transition-all font-medium"
                >
                    <Save size={20} />
                    <span>{isSubmitting ? "Kaydediliyor..." : "Kaydet"}</span>
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content (Editor) */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-neutral-900/50 backdrop-blur-sm p-6 rounded-xl border border-white/5 shadow-2xl">
                        <div className="mb-6 flex items-center justify-between border-b border-white/5 pb-4">
                            <label className="font-semibold text-lg text-white">İçerik Editörü</label>
                        </div>

                        <Controller
                            control={control}
                            name="contentHtml"
                            render={({ field }) => (
                                <TipTapEditor
                                    content={field.value || ""}
                                    onChange={field.onChange}
                                />
                            )}
                        />
                    </div>
                </div>

                {/* Sidebar (Metadata) */}
                <div className="space-y-6">
                    <div className="bg-neutral-900/50 backdrop-blur-sm p-6 rounded-xl border border-white/5 shadow-2xl space-y-5 sticky top-24">
                        <h2 className="font-semibold text-lg border-b border-white/5 pb-3 text-white">Yazı Ayarları</h2>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Başlık</label>
                            <input {...register("title")} className="w-full rounded-lg bg-neutral-800 border border-white/10 text-white text-sm p-2.5 focus:ring-amber-500 focus:border-amber-500" />
                            {errors.title && <p className="text-red-400 text-xs">{errors.title.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Slug (URL)</label>
                            <input {...register("slug")} className="w-full rounded-lg bg-neutral-800 border border-white/10 text-neutral-300 text-sm p-2.5 focus:ring-amber-500 focus:border-amber-500 placeholder:text-neutral-700" placeholder="Otomatik oluşturulur" />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Kısa Açıklama</label>
                            <textarea {...register("excerpt")} rows={3} className="w-full rounded-lg bg-neutral-800 border border-white/10 text-neutral-300 text-sm p-2.5 focus:ring-amber-500 focus:border-amber-500" />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Yazar</label>
                            <select {...register("authorId")} className="w-full rounded-lg bg-neutral-800 border border-white/10 text-white text-sm p-2.5 focus:ring-amber-500 focus:border-amber-500">
                                <option value="">Seçiniz...</option>
                                {authors.map(author => (
                                    <option key={author.id} value={author.id}>{author.name}</option>
                                ))}
                            </select>
                            {errors.authorId && <p className="text-red-400 text-xs">{errors.authorId.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Kategori</label>
                            <select {...register("categoryId")} className="w-full rounded-lg bg-neutral-800 border border-white/10 text-white text-sm p-2.5 focus:ring-amber-500 focus:border-amber-500">
                                <option value="">Kategori Seçiniz...</option>
                                {categories.map(category => (
                                    <option key={category.id} value={category.id}>{category.name}</option>
                                ))}
                            </select>
                            {errors.categoryId && <p className="text-red-400 text-xs">{errors.categoryId.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Kapak Resmi</label>
                            <input {...register("image")} className="w-full rounded-lg bg-neutral-800 border border-white/10 text-neutral-300 text-sm p-2.5 focus:ring-amber-500 focus:border-amber-500" placeholder="/images/covers/..." />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Tarih</label>
                                <input type="date" {...register("date")} className="w-full rounded-lg bg-neutral-800 border border-white/10 text-white text-sm p-2.5 focus:ring-amber-500 focus:border-amber-500" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Süre (dk)</label>
                                <input type="number" {...register("readTime")} className="w-full rounded-lg bg-neutral-800 border border-white/10 text-white text-sm p-2.5 focus:ring-amber-500 focus:border-amber-500" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Durum</label>
                            <select {...register("status")} className="w-full rounded-lg bg-neutral-800 border border-white/10 text-white text-sm p-2.5 focus:ring-amber-500 focus:border-amber-500">
                                <option value="draft">Taslak</option>
                                <option value="published">Yayında</option>
                            </select>
                        </div>

                        <div className="pt-2 border-t border-white/5">
                            <label className="flex items-center gap-3 p-3 rounded-lg bg-neutral-800/50 border border-white/5 cursor-pointer hover:bg-neutral-800 transition-colors group">
                                <input
                                    type="checkbox"
                                    {...register("featured")}
                                    className="rounded border-neutral-600 bg-neutral-700 text-amber-500 focus:ring-amber-500 focus:ring-offset-0 focus:ring-offset-transparent w-5 h-5 group-hover:border-amber-500/50 transition-colors"
                                />
                                <div className="flex flex-col">
                                    <span className="font-medium text-white text-sm">Öne Çıkan Yazı</span>
                                    <span className="text-xs text-neutral-500">Ana sayfa slider&apos;da gösterilir</span>
                                </div>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}
