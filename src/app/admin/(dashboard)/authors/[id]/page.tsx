"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface Author {
    id: string;
    name: string;
    slug: string;
    role: string;
    title?: string;
    bio?: string;
    avatar?: string;
    email?: string;
}

const schema = z.object({
    name: z.string().min(2, "İsim en az 2 karakter olmalıdır"),
    slug: z.string().min(2).regex(/^[a-z0-9-]+$/),
    role: z.string(),
    title: z.string().optional(),
    bio: z.string().optional(),
    avatar: z.string().optional(),
    email: z.string().email().optional().or(z.literal("")),
    joinedAt: z.string().optional(),
    twitter: z.string().optional(),
    instagram: z.string().optional(),
    linkedin: z.string().optional(),
    website: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export default function EditAuthorPage({ params }: { params: { id: string } }) {
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

    const fetchAuthor = useCallback(async () => {
        try {
            const res = await fetch("/api/admin/authors");
            if (res.ok) {
                const authors: any[] = await res.json();
                const author = authors.find(a => a.id === params.id);
                if (author) {
                    setValue("name", author.name);
                    setValue("slug", author.slug);
                    setValue("role", author.role);
                    setValue("title", author.title || "");
                    setValue("bio", author.bio || "");
                    setValue("avatar", author.avatar || "");
                    setValue("email", author.email || "");

                    if (author.joinedAt) {
                        setValue("joinedAt", new Date(author.joinedAt).toISOString().split('T')[0]);
                    }

                    // Handle Social
                    const social = author.social || {};
                    // Check if social is string (sometimes Prisma returns string if not typed well or from raw query, but findMany returns object usually)
                    // If it is an object as expected:
                    const socialObj = typeof social === 'string' ? JSON.parse(social) : social;

                    setValue("twitter", socialObj.twitter || "");
                    setValue("instagram", socialObj.instagram || "");
                    setValue("linkedin", socialObj.linkedin || "");
                    setValue("website", socialObj.website || "");

                } else {
                    alert("Yazar bulunamadı");
                    router.push("/admin/authors");
                }
            }
        } catch (error) {
            console.error("Failed to fetch author", error);
        } finally {
            setIsLoading(false);
        }
    }, [params.id, router, setValue]);

    useEffect(() => {
        fetchAuthor();
    }, [fetchAuthor]);


    const onSubmit = async (data: FormData) => {
        try {
            // Construct payload
            const payload = {
                name: data.name,
                slug: data.slug,
                role: data.role,
                title: data.title,
                bio: data.bio,
                avatar: data.avatar,
                email: data.email,
                joinedAt: data.joinedAt ? new Date(data.joinedAt).toISOString() : null,
                social: {
                    twitter: data.twitter,
                    instagram: data.instagram,
                    linkedin: data.linkedin,
                    website: data.website
                }
            };

            const res = await fetch(`/api/admin/authors/${params.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (res.ok) {
                router.push("/admin/authors");
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
                <Link href="/admin/authors" className="text-neutral-400 hover:text-white transition-colors">
                    <ArrowLeft size={24} />
                </Link>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-transparent">Yazarı Düzenle</h1>
            </div>

            <div className="bg-neutral-900/50 backdrop-blur-xl rounded-xl border border-white/5 p-8 shadow-2xl">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Basic Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">İsim Soyisim</label>
                            <input
                                {...register("name")}
                                className="w-full rounded-lg bg-neutral-800 border border-white/10 text-white p-3 focus:ring-amber-500 focus:border-amber-500"
                            />
                            {errors.name && <p className="text-red-400 text-xs">{errors.name.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">URL Slug</label>
                            <input
                                {...register("slug")}
                                className="w-full rounded-lg bg-neutral-800 border border-white/10 text-neutral-300 p-3 focus:ring-amber-500 focus:border-amber-500 bg-neutral-800/50"
                            />
                            {errors.slug && <p className="text-red-400 text-xs">{errors.slug.message}</p>}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Rol</label>
                            <select
                                {...register("role")}
                                className="w-full rounded-lg bg-neutral-800 border border-white/10 text-white p-3 focus:ring-amber-500 focus:border-amber-500"
                            >
                                <option value="guest">Konuk Yazar</option>
                                <option value="editor">Editör</option>
                                <option value="founder">Kurucu</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Unvan</label>
                            <input
                                {...register("title")}
                                className="w-full rounded-lg bg-neutral-800 border border-white/10 text-white p-3 focus:ring-amber-500 focus:border-amber-500"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Katılma Tarihi</label>
                        <input
                            type="date"
                            {...register("joinedAt")}
                            className="w-full rounded-lg bg-neutral-800 border border-white/10 text-white p-3 focus:ring-amber-500 focus:border-amber-500"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Email</label>
                        <input
                            {...register("email")}
                            type="email"
                            className="w-full rounded-lg bg-neutral-800 border border-white/10 text-white p-3 focus:ring-amber-500 focus:border-amber-500"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Biyografi</label>
                        <textarea
                            {...register("bio")}
                            rows={4}
                            className="w-full rounded-lg bg-neutral-800 border border-white/10 text-white p-3 focus:ring-amber-500 focus:border-amber-500"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Avatar URL</label>
                        <input
                            {...register("avatar")}
                            className="w-full rounded-lg bg-neutral-800 border border-white/10 text-white p-3 focus:ring-amber-500 focus:border-amber-500"
                        />
                    </div>

                    {/* Social Media Section */}
                    <div className="pt-6 border-t border-white/10">
                        <h3 className="text-lg font-bold text-white mb-4">Sosyal Medya</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Twitter (X) Kullanıcı Adı</label>
                                <div className="relative">
                                    <span className="absolute left-3 top-3 text-neutral-500">@</span>
                                    <input
                                        {...register("twitter")}
                                        className="w-full rounded-lg bg-neutral-800 border border-white/10 text-white p-3 pl-8 focus:ring-amber-500 focus:border-amber-500"
                                        placeholder="username"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Instagram Kullanıcı Adı</label>
                                <div className="relative">
                                    <span className="absolute left-3 top-3 text-neutral-500">@</span>
                                    <input
                                        {...register("instagram")}
                                        className="w-full rounded-lg bg-neutral-800 border border-white/10 text-white p-3 pl-8 focus:ring-amber-500 focus:border-amber-500"
                                        placeholder="username"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">LinkedIn Kullanıcı Adı</label>
                                <input
                                    {...register("linkedin")}
                                    className="w-full rounded-lg bg-neutral-800 border border-white/10 text-white p-3 focus:ring-amber-500 focus:border-amber-500"
                                    placeholder="username veya url"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Website URL</label>
                                <input
                                    {...register("website")}
                                    className="w-full rounded-lg bg-neutral-800 border border-white/10 text-white p-3 focus:ring-amber-500 focus:border-amber-500"
                                    placeholder="https://..."
                                />
                            </div>
                        </div>
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
            </div>
        </div>
    );
}
