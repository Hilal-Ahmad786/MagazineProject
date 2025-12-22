import { Skeleton } from "@/components/ui/Skeleton";

export default function DashboardLoading() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-white/5 pb-6">
                <div>
                    <Skeleton className="h-10 w-48 mb-2 bg-neutral-800" />
                    <Skeleton className="h-5 w-64 bg-neutral-900" />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[...Array(4)].map((_, i) => (
                    <Skeleton key={i} className="h-32 w-full rounded-xl bg-neutral-900" />
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Skeleton className="h-64 w-full rounded-xl bg-neutral-900" />
                <Skeleton className="h-64 w-full rounded-xl bg-neutral-900" />
            </div>
        </div>
    );
}
