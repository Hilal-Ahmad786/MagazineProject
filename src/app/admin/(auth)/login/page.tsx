"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lock, Mail, ArrowRight } from "lucide-react";

const schema = z.object({
    email: z.string().email("Geçerli bir email adresi giriniz"),
    password: z.string().min(1, "Şifre zorunludur"),
});

type FormData = z.infer<typeof schema>;

export default function AdminLoginPage() {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    const onSubmit = async (data: FormData) => {
        setError(null);
        const result = await signIn("credentials", {
            email: data.email,
            password: data.password,
            redirect: false,
        });

        if (result?.error) {
            setError("Giriş başarısız. Lütfen bilgilerinizi kontrol edin.");
        } else {
            router.push("/admin");
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-neutral-950 p-4 font-sans selection:bg-amber-500/30 overflow-hidden relative">
            {/* Background Gradients */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/20 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-amber-900/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="w-full max-w-md space-y-8 rounded-2xl bg-neutral-900/50 backdrop-blur-xl border border-white/5 p-10 shadow-2xl relative z-10">
                <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-600 to-purple-600 flex items-center justify-center text-3xl font-bold text-white shadow-lg shadow-amber-900/20 mb-6">
                        M
                    </div>
                    <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-transparent">
                        Mazhar Admin
                    </h2>
                    <p className="text-neutral-500 mt-2 text-sm">
                        Yönetim paneline erişmek için giriş yapın
                    </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label htmlFor="email" className="text-xs font-bold text-neutral-500 uppercase tracking-wider ml-1">
                                Email
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-500">
                                    <Mail size={18} />
                                </div>
                                <input
                                    id="email"
                                    type="email"
                                    {...register("email")}
                                    className="block w-full pl-10 rounded-lg bg-neutral-800 border border-white/10 text-white placeholder-neutral-600 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all py-3 sm:text-sm"
                                    placeholder="iletisim@mazhardergisi.com"
                                />
                            </div>
                            {errors.email && (
                                <p className="text-xs text-red-500 font-medium ml-1">{errors.email.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="password" className="text-xs font-bold text-neutral-500 uppercase tracking-wider ml-1">
                                Şifre
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-500">
                                    <Lock size={18} />
                                </div>
                                <input
                                    id="password"
                                    type="password"
                                    {...register("password")}
                                    className="block w-full pl-10 rounded-lg bg-neutral-800 border border-white/10 text-white placeholder-neutral-600 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all py-3 sm:text-sm"
                                    placeholder="••••••••"
                                />
                            </div>
                            {errors.password && (
                                <p className="text-xs text-red-500 font-medium ml-1">{errors.password.message}</p>
                            )}
                        </div>
                    </div>

                    {error && (
                        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center font-medium">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="group w-full flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-amber-600 to-amber-700 px-4 py-3 text-white font-bold hover:from-amber-500 hover:to-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-neutral-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-amber-900/20 hover:scale-[1.02]"
                    >
                        {isSubmitting ? (
                            "Giriş Yapılıyor..."
                        ) : (
                            <>
                                Giriş Yap
                                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </>
                        )}
                    </button>

                    <div className="text-center">
                        <p className="text-xs text-neutral-600">
                            © 2024 Mazhar Dergisi. Tüm hakları saklıdır.
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}
