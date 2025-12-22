"use client";

import { useEffect, useState } from "react";
import ArticleForm from "@/components/admin/ArticleForm";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/Skeleton";

export default function EditArticlePage({ params }: { params: { id: string, articleId: string } }) {
    const router = useRouter();
    const [article, setArticle] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const res = await fetch(`/api/admin/issues/${params.id}/articles/${params.articleId}`);
                if (res.ok) {
                    const data = await res.json();
                    setArticle(data);
                } else {
                    alert("Yazı bulunamadı");
                    router.push(`/admin/issues/${params.id}/articles`);
                }
            } catch (error) {
                console.error("Failed to fetch article", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchArticle();
    }, [params.id, params.articleId, router]);

    if (isLoading) {
        return (
            <div className="max-w-7xl mx-auto space-y-6 animate-in fade-in">
                <Skeleton className="h-12 w-full max-w-sm bg-neutral-800" />
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-4">
                        <Skeleton className="h-96 w-full rounded-xl bg-neutral-900" />
                    </div>
                    <div className="lg:col-span-1 space-y-4">
                        <Skeleton className="h-64 w-full rounded-xl bg-neutral-900" />
                    </div>
                </div>
            </div>
        )
    }
    if (!article) return null;

    return (
        <div className="max-w-7xl mx-auto">
            <ArticleForm issueId={params.id} initialData={article} isEditMode />
        </div>
    );
}
