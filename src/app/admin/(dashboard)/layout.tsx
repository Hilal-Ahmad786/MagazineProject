import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { ToastProvider } from "@/context/ToastContext";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getServerSession();

    if (!session) {
        redirect("/admin/login");
    }

    return (
        <ToastProvider>
            <div className="flex h-screen bg-neutral-950 text-white overflow-hidden font-sans selection:bg-amber-500/30">
                {/* Background Gradients */}
                <div className="fixed inset-0 z-0 pointer-events-none">
                    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/20 rounded-full blur-[100px]" />
                    <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-amber-900/10 rounded-full blur-[100px]" />
                </div>

                {/* Responsive Sidebar */}
                <AdminSidebar user={{ name: session.user?.name, email: session.user?.email }} />

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto z-10 relative scrollbar-thin scrollbar-thumb-neutral-800 scrollbar-track-transparent pt-16 md:pt-0">
                    <div className="p-4 md:p-8 max-w-7xl mx-auto">
                        {children}
                    </div>
                </main>
            </div>
        </ToastProvider>
    );
}
