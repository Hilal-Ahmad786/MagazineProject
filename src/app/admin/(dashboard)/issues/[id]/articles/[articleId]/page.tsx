"use client";

import { useEffect, useState } from "react";
import ArticleForm from "@/components/admin/ArticleForm";
import { useRouter } from "next/navigation";

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

    if (isLoading) return <div className="p-8">Yükleniyor...</div>;
    if (!article) return null;

    return (
        <div className="max-w-7xl mx-auto">
            <ArticleForm issueId={params.id} initialData={article} isEditMode />
        </div>
    );
}
