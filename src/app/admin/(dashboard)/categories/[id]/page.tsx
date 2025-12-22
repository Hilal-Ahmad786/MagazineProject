"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Skeleton } from "@/components/ui/Skeleton";

const schema = z.object({
    name: z.string().min(2, "İsim en az 2 karakter olmalıdır"),
    slug: z.string().min(2).regex(/^[a-z0-9-]+$/),
    description: z.string().optional(),
    color: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export default function EditCategoryPage({ params }: { params: { id: string } }) {
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
        const fetchCategory = async () => {
            try {
                const res = await fetch(`/api/admin/categories/${params.id}`);
                if (res.ok) {
                    const data = await res.json();
                    setValue("name", data.name);
                    setValue("slug", data.slug);
                    setValue("description", data.description || "");
                    setValue("color", data.color || "");
                } else {
                    alert("Kategori bulunamadı");
                    router.push("/admin/categories");
                }
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCategory();
    }, [params.id, router, setValue]);

    const onSubmit = async (data: FormData) => {
        try {
            const res = await fetch(`/api/admin/categories/${params.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (res.ok) {
                router.push("/admin/categories");
            } else {
                const error = await res.json();
                alert(`Hata: ${error.error}`);
            }
        } catch (error) {
            console.error(error);
            alert("Bir hata oluştu.");
        }
    };

    if (isLoading) {
        return (
            <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in">
                <div className="flex items-center gap-4 border-b border-white/5 pb-4">
                    <Skeleton className="h-8 w-8 rounded-full bg-neutral-800" />
                    <Skeleton className="h-8 w-48 bg-neutral-800" />
                </div>
                <div className="bg-neutral-900/50 backdrop-blur-xl rounded-xl border border-white/5 p-8 shadow-2xl space-y-6">
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-24 bg-neutral-800" />
                        <Skeleton className="h-10 w-full rounded-lg bg-neutral-800" />
                    </div>
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-24 bg-neutral-800" />
                        <Skeleton className="h-10 w-full rounded-lg bg-neutral-800" />
                    </div>
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-24 bg-neutral-800" />
                        <Skeleton className="h-24 w-full rounded-lg bg-neutral-800" />
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <div className="flex items-center gap-4 border-b border-white/5 pb-4">
                <Link href="/admin/categories" className="text-neutral-400 hover:text-white transition-colors">
                    <ArrowLeft size={24} />
                </Link>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-transparent">
                    Kategoriyi Düzenle
                </h1>
            </div>

            <div className="bg-neutral-900/50 backdrop-blur-xl rounded-xl border border-white/5 p-8 shadow-2xl">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Kategori İsmi</label>
                        <input
                            {...register("name")}
                            className="w-full rounded-lg bg-neutral-800 border border-white/10 text-white p-3 focus:ring-amber-500 focus:border-amber-500"
                        />
                        {errors.name && <p className="text-red-400 text-xs">{errors.name.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Slug (URL)</label>
                        <input
                            {...register("slug")}
                            className="w-full rounded-lg bg-neutral-800 border border-white/10 text-neutral-300 p-3 focus:ring-amber-500 focus:border-amber-500 font-mono text-sm"
                        />
                        {errors.slug && <p className="text-red-400 text-xs">{errors.slug.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Açıklama</label>
                        <textarea
                            {...register("description")}
                            rows={3}
                            className="w-full rounded-lg bg-neutral-800 border border-white/10 text-white p-3 focus:ring-amber-500 focus:border-amber-500"
                        />
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
