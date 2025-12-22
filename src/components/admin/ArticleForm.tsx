"use client";

import { useState, useEffect } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { Plus, Trash2, MoveUp, MoveDown, Save, ArrowLeft } from "lucide-react";
import Link from "next/link";

// Zod Schema
const blockSchema = z.object({
    type: z.enum(["paragraph", "image", "heading"]),
    content: z.string().optional(),
    src: z.string().optional(),
    alt: z.string().optional(),
    caption: z.string().optional(),
});

const articleSchema = z.object({
    title: z.string().min(1, "Başlık gereklidir"),
    slug: z.string().optional(),
    excerpt: z.string().optional(),
    authorId: z.string().min(1, "Yazar seçilmelidir"),
    date: z.string().optional(),
    readTime: z.coerce.number().min(1),
    category: z.string().optional(),
    status: z.enum(["draft", "published"]),
    featured: z.boolean().optional(),
    image: z.string().optional(), // Cover image
    // Content can be string (HTML) or array of blocks
    contentBlocks: z.array(blockSchema).optional(),
    contentHtml: z.string().optional(), // For legacy HTML content
    isBlockMode: z.boolean(),
});

type FormData = z.infer<typeof articleSchema>;

interface Author {
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
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Initialize form
    const defaultIsBlockMode = Array.isArray(initialData?.content) || !initialData;

    const { control, register, handleSubmit, watch, setValue, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(articleSchema),
        defaultValues: {
            title: initialData?.title || "",
            slug: initialData?.slug || "",
            excerpt: initialData?.excerpt || "",
            authorId: initialData?.authorId || initialData?.author?.id || "",
            date: initialData?.date || initialData?.publishDate || new Date().toISOString().split("T")[0],
            readTime: initialData?.readTime || 5,
            category: initialData?.category || "",
            status: initialData?.status || "draft",
            featured: initialData?.featured || false,
            image: initialData?.image || "",
            isBlockMode: defaultIsBlockMode,
            contentHtml: typeof initialData?.content === 'string' ? initialData.content : "",
            contentBlocks: Array.isArray(initialData?.content) ? initialData.content : [],
        },
    });

    const { fields, append, remove, move } = useFieldArray({
        control,
        name: "contentBlocks",
    });

    const isBlockMode = watch("isBlockMode");

    useEffect(() => {
        // Fetch authors
        fetch("/api/admin/authors")
            .then((res) => res.json())
            .then((data) => setAuthors(data))
            .catch((err) => console.error(err));
    }, []);

    const onSubmit = async (data: FormData) => {
        setIsSubmitting(true);
        try {
            const payload = {
                ...data,
                content: data.isBlockMode ? data.contentBlocks : data.contentHtml,
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
                router.push(`/admin/issues/${issueId}/articles`);
                router.refresh();
            } else {
                alert("Kaydetme başarısız.");
            }
        } catch (error) {
            console.error(error);
            alert("Hata oluştu.");
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
                            <label className="font-semibold text-lg text-white">İçerik</label>
                            <div className="flex items-center gap-2 text-sm text-neutral-400">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        {...register("isBlockMode")}
                                        className="rounded border-neutral-700 bg-neutral-800 text-amber-500 focus:ring-amber-500/50"
                                    />
                                    <span>Blok Editörü Kullan</span>
                                </label>
                            </div>
                        </div>

                        {isBlockMode ? (
                            <div className="space-y-4">
                                {fields.map((field, index) => (
                                    <div key={field.id} className="relative group bg-neutral-800/50 p-4 rounded-lg border border-white/5 hover:border-white/10 transition-colors">
                                        {/* Block Controls */}
                                        <div className="absolute right-2 top-2 hidden group-hover:flex gap-1">
                                            <button type="button" onClick={() => move(index, index - 1)} disabled={index === 0} className="p-1 hover:bg-neutral-700 rounded text-neutral-400 hover:text-white transition-colors"><MoveUp size={14} /></button>
                                            <button type="button" onClick={() => move(index, index + 1)} disabled={index === fields.length - 1} className="p-1 hover:bg-neutral-700 rounded text-neutral-400 hover:text-white transition-colors"><MoveDown size={14} /></button>
                                            <button type="button" onClick={() => remove(index)} className="p-1 hover:bg-red-900/30 text-red-400 rounded transition-colors"><Trash2 size={14} /></button>
                                        </div>

                                        <div className="mb-3">
                                            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                                                {watch(`contentBlocks.${index}.type`)}
                                            </span>
                                        </div>

                                        {/* Paragraph */}
                                        {watch(`contentBlocks.${index}.type`) === 'paragraph' && (
                                            <textarea
                                                {...register(`contentBlocks.${index}.content`)}
                                                placeholder="Paragraf metni..."
                                                rows={4}
                                                className="w-full rounded-lg bg-neutral-900 border border-white/10 text-neutral-200 text-sm p-3 focus:ring-1 focus:ring-amber-500 focus:border-amber-500 transition-all placeholder:text-neutral-600"
                                            />
                                        )}

                                        {/* Heading */}
                                        {watch(`contentBlocks.${index}.type`) === 'heading' && (
                                            <input
                                                type="text"
                                                {...register(`contentBlocks.${index}.content`)}
                                                placeholder="Başlık metni..."
                                                className="w-full rounded-lg bg-neutral-900 border border-white/10 text-white font-bold text-lg p-3 focus:ring-1 focus:ring-amber-500 focus:border-amber-500 transition-all placeholder:text-neutral-600"
                                            />
                                        )}

                                        {/* Image */}
                                        {watch(`contentBlocks.${index}.type`) === 'image' && (
                                            <div className="space-y-3">
                                                <input
                                                    type="text"
                                                    {...register(`contentBlocks.${index}.src`)}
                                                    placeholder="Resim URL (/images/...)"
                                                    className="w-full rounded-lg bg-neutral-900 border border-white/10 text-sm p-3 text-neutral-300 focus:ring-1 focus:ring-amber-500 focus:border-amber-500 placeholder:text-neutral-600"
                                                />
                                                <div className="grid grid-cols-2 gap-3">
                                                    <input
                                                        type="text"
                                                        {...register(`contentBlocks.${index}.alt`)}
                                                        placeholder="Alt metin (SEO)"
                                                        className="w-full rounded-lg bg-neutral-900 border border-white/10 text-sm p-3 text-neutral-300 focus:ring-1 focus:ring-amber-500 placeholder:text-neutral-600"
                                                    />
                                                    <input
                                                        type="text"
                                                        {...register(`contentBlocks.${index}.caption`)}
                                                        placeholder="Altyazı (opsiyonel)"
                                                        className="w-full rounded-lg bg-neutral-900 border border-white/10 text-sm p-3 text-neutral-300 focus:ring-1 focus:ring-amber-500 placeholder:text-neutral-600"
                                                    />
                                                </div>
                                                {watch(`contentBlocks.${index}.src`) && (
                                                    <div className="relative aspect-video rounded-lg overflow-hidden border border-white/10 bg-black/50 mt-2">
                                                        <img src={watch(`contentBlocks.${index}.src`)} alt="Preview" className="w-full h-full object-contain" />
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                ))}

                                <div className="flex gap-3 justify-center py-6 border-t border-dashed border-white/10 mt-6">
                                    <button type="button" onClick={() => append({ type: "paragraph", content: "" })} className="px-4 py-2 bg-neutral-800 border border-white/5 rounded-lg text-sm text-neutral-300 hover:bg-neutral-700 hover:text-white hover:border-white/20 flex items-center gap-2 transition-all"><Plus size={16} /> Paragraf</button>
                                    <button type="button" onClick={() => append({ type: "heading", content: "" })} className="px-4 py-2 bg-neutral-800 border border-white/5 rounded-lg text-sm text-neutral-300 hover:bg-neutral-700 hover:text-white hover:border-white/20 flex items-center gap-2 transition-all"><Plus size={16} /> Başlık</button>
                                    <button type="button" onClick={() => append({ type: "image", src: "" })} className="px-4 py-2 bg-neutral-800 border border-white/5 rounded-lg text-sm text-neutral-300 hover:bg-neutral-700 hover:text-white hover:border-white/20 flex items-center gap-2 transition-all"><Plus size={16} /> Resim</button>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <div className="text-sm text-amber-500 bg-amber-900/20 border border-amber-500/20 p-3 rounded-lg">
                                    HTML Modu (Eski yazılar için). Yeni yazılar için Blok Modunu kullanın.
                                </div>
                                <textarea
                                    {...register("contentHtml")}
                                    rows={20}
                                    className="w-full font-mono text-sm bg-neutral-900 border-white/10 rounded-lg text-neutral-300 p-4 focus:ring-1 focus:ring-amber-500 focus:border-amber-500"
                                    placeholder="<p>İçerik...</p>"
                                />
                            </div>
                        )}
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
                                    <span className="text-xs text-neutral-500">Ana sayfa slider'da gösterilir</span>
                                </div>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}
