"use client";

import ArticleForm from "@/components/admin/ArticleForm";

export default function NewArticlePage({ params }: { params: { id: string } }) {
    return (
        <div className="max-w-7xl mx-auto">
            <ArticleForm issueId={params.id} />
        </div>
    );
}
