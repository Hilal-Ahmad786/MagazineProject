"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { ArrowLeft, Save, User, AtSign, AlignLeft, Image as ImageIcon, Briefcase } from "lucide-react";

const schema = z.object({
    name: z.string().min(2, "İsim en az 2 karakter olmalıdır"),
    slug: z.string().min(2, "Slug en az 2 karakter olmalıdır").regex(/^[a-z0-9-]+$/, "Slug sadece küçük harf, rakam ve tire içerebilir"),
    role: z.string(),
    title: z.string().optional(),
    bio: z.string().optional(),
    avatar: z.string().url("Geçerli bir URL giriniz").or(z.literal("")),
    email: z.string().email().optional().or(z.literal("")),
});

type FormData = z.infer<typeof schema>;

export default function NewAuthorPage() {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            role: "guest",
            avatar: "/images/authors/default.jpg" // Placeholder default
        }
    });

    const name = watch("name");

    // Auto-generate slug from name
    useEffect(() => {
        if (name) {
            const slug = name
                .toLowerCase()
                .replace(/ /g, "-")
                .replace(/[^\w-]+/g, "")
                .replace(/--+/g, "-");
            setValue("slug", slug);
        }
    }, [name, setValue]);

    const onSubmit = async (data: FormData) => {
        try {
            const res = await fetch("/api/admin/authors", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
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

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex items-center gap-4 border-b border-white/5 pb-6">
                <Link
                    href="/admin/authors"
                    className="p-2 rounded-full hover:bg-white/5 text-neutral-400 hover:text-white transition-all"
                >
                    <ArrowLeft size={24} />
                </Link>
                <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-transparent">
                        Yeni Yazar Ekle
                    </h1>
                    <p className="text-neutral-400 mt-1">Sisteme yeni bir yazar ekleyin.</p>
                </div>
            </div>

            <div className="bg-neutral-900/50 backdrop-blur-xl rounded-xl border border-white/5 shadow-2xl p-8">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                    {/* Basic Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                            <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider flex items-center gap-2">
                                <User size={14} /> İsim Soyisim
                            </label>
                            <input
                                {...register("name")}
                                className="w-full rounded-lg bg-neutral-800 border border-white/10 text-white px-4 py-3 placeholder:text-neutral-600 focus:ring-amber-500 focus:border-amber-500 transition-all"
                                placeholder="Örn: Ahmet Yılmaz"
                            />
                            {errors.name && <p className="text-red-500 text-xs font-medium">{errors.name.message}</p>}
                        </div>

                        <div className="space-y-3">
                            <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider flex items-center gap-2">
                                <AtSign size={14} /> URL Slug (Otomatik)
                            </label>
                            <input
                                {...register("slug")}
                                className="w-full rounded-lg bg-neutral-950/50 border border-white/5 text-neutral-400 px-4 py-3 font-mono text-sm cursor-not-allowed"
                                readOnly
                            />
                            {errors.slug && <p className="text-red-500 text-xs font-medium">{errors.slug.message}</p>}
                        </div>
                    </div>

                    {/* Role & Title */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                            <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider flex items-center gap-2">
                                <Briefcase size={14} /> Rol
                            </label>
                            <div className="relative">
                                <select
                                    {...register("role")}
                                    className="w-full rounded-lg bg-neutral-800 border border-white/10 text-white px-4 py-3 appearance-none focus:ring-amber-500 focus:border-amber-500 transition-all cursor-pointer"
                                >
                                    <option value="guest">Konuk Yazar</option>
                                    <option value="editor">Editör</option>
                                    <option value="writer">Yazar</option>
                                    <option value="founder">Kurucu</option>
                                </select>
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-400">
                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider flex items-center gap-2">
                                <User size={14} /> Unvan (Görünen)
                            </label>
                            <input
                                {...register("title")}
                                className="w-full rounded-lg bg-neutral-800 border border-white/10 text-white px-4 py-3 placeholder:text-neutral-600 focus:ring-amber-500 focus:border-amber-500 transition-all"
                                placeholder="Örn: Misafir Kalem"
                            />
                        </div>
                    </div>

                    <div className="space-y-3">
                        <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider flex items-center gap-2">
                            <MailIcon size={14} /> Email
                        </label>
                        <input
                            {...register("email")}
                            type="email"
                            className="w-full rounded-lg bg-neutral-800 border border-white/10 text-white px-4 py-3 placeholder:text-neutral-600 focus:ring-amber-500 focus:border-amber-500 transition-all"
                            placeholder="iletisim@ornek.com"
                        />
                        {errors.email && <p className="text-red-500 text-xs font-medium">{errors.email.message}</p>}
                    </div>

                    <div className="space-y-3">
                        <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider flex items-center gap-2">
                            <AlignLeft size={14} /> Biyografi
                        </label>
                        <textarea
                            {...register("bio")}
                            rows={4}
                            className="w-full rounded-lg bg-neutral-800 border border-white/10 text-white px-4 py-3 placeholder:text-neutral-600 focus:ring-amber-500 focus:border-amber-500 transition-all resize-none"
                            placeholder="Yazar hakkında kısa bir biyografi..."
                        />
                    </div>

                    <div className="space-y-3">
                        <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider flex items-center gap-2">
                            <ImageIcon size={14} /> Avatar URL
                        </label>
                        <input
                            {...register("avatar")}
                            className="w-full rounded-lg bg-neutral-800 border border-white/10 text-white px-4 py-3 placeholder:text-neutral-600 focus:ring-amber-500 focus:border-amber-500 transition-all"
                            placeholder="/images/authors/..."
                        />
                        <p className="text-xs text-neutral-500 flex items-center gap-1">
                            <span className="w-1 h-1 rounded-full bg-amber-500"></span>
                            Şimdilik manuel URL girişi. Medya kütüphanesinden link kopyalayabilirsiniz.
                        </p>
                        {errors.avatar && <p className="text-red-500 text-xs font-medium">{errors.avatar.message}</p>}
                    </div>

                    <div className="pt-8 border-t border-white/5 flex justify-end">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex items-center gap-2 bg-gradient-to-r from-amber-600 to-amber-700 text-white px-8 py-3 rounded-lg hover:from-amber-500 hover:to-amber-600 shadow-lg shadow-amber-900/20 font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02]"
                        >
                            <Save size={18} />
                            {isSubmitting ? "Kaydediliyor..." : "Kaydet ve Oluştur"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

function MailIcon({ size }: { size: number }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
    )
}
