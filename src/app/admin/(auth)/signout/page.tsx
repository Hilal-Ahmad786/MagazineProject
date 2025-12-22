"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { LogOut, ArrowRight, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function SignOutPage() {
    const router = useRouter();

    const handleSignOut = async () => {
        await signOut({ callbackUrl: "/" });
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-neutral-950 p-4 font-sans selection:bg-amber-500/30 overflow-hidden relative">
            {/* Background Gradients */}
            <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-900/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-amber-900/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="w-full max-w-md space-y-8 rounded-2xl bg-neutral-900/50 backdrop-blur-xl border border-white/5 p-10 shadow-2xl relative z-10 text-center">
                <div className="flex justify-center">
                    <div className="w-20 h-20 rounded-2xl bg-neutral-800/50 border border-white/5 flex items-center justify-center text-amber-500 shadow-lg shadow-amber-900/10 mb-2">
                        <LogOut size={32} />
                    </div>
                </div>

                <div>
                    <h2 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-transparent">
                        Çıkış Yap
                    </h2>
                    <p className="text-neutral-500 mt-2 text-sm">
                        Yönetim panelinden çıkış yapmak üzeresiniz.
                    </p>
                </div>

                <div className="space-y-4 pt-4">
                    <button
                        onClick={handleSignOut}
                        className="group w-full flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-red-600 to-red-700 px-4 py-3 text-white font-bold hover:from-red-500 hover:to-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-neutral-900 transition-all shadow-lg shadow-red-900/20 hover:scale-[1.02]"
                    >
                        Çıkış Yap
                        <LogOut size={18} className="text-white/80" />
                    </button>

                    <Link
                        href="/admin"
                        className="group w-full flex items-center justify-center gap-2 rounded-lg bg-neutral-800 px-4 py-3 text-neutral-300 font-medium hover:bg-neutral-700 hover:text-white transition-all border border-white/5"
                    >
                        <ArrowLeft size={18} />
                        İptal ve Geri Dön
                    </Link>
                </div>

                <div className="text-center pt-4">
                    <p className="text-xs text-neutral-600">
                        © 2024 Mazhar Dergisi
                    </p>
                </div>
            </div>
        </div>
    );
}
