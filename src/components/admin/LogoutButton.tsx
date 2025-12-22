"use client";

import { LogOut } from "lucide-react";

export function LogoutButton() {
    return (
        <button
            onClick={() => window.location.href = "/api/auth/signout"}
            className="w-full flex items-center justify-center gap-2 mt-4 px-4 py-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:text-red-300 transition-colors text-sm font-medium border border-red-500/20"
        >
            <LogOut size={16} />
            <span>Güvenli Çıkış</span>
        </button>
    )
}
