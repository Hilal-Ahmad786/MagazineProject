'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'

import { useToast } from "@/context/ToastContext";

interface Article {
    title: string
    slug: string
    issue: {
        number: string
    } | null
}

interface Comment {
    id: string
    articleId: string
    parentId: string | null
    name: string
    email: string
    content: string
    status: string
    createdAt: string
    article: Article
}

export default function CommentsPage() {
    const [comments, setComments] = useState<Comment[]>([])
    const [loading, setLoading] = useState(true)
    const [replyingTo, setReplyingTo] = useState<string | null>(null)
    const [replyContent, setReplyContent] = useState('')
    const [submitting, setSubmitting] = useState(false)
    const router = useRouter()
    const { showToast } = useToast()

    interface Comment {
        id: string
        articleId: string
        parentId: string | null
        name: string
        email: string
        content: string
        status: string
        createdAt: string
        article: Article
    }

    export default function CommentsPage() {
        const [comments, setComments] = useState<Comment[]>([])
        const [loading, setLoading] = useState(true)
        const [replyingTo, setReplyingTo] = useState<string | null>(null)
        const [replyContent, setReplyContent] = useState('')
        const [submitting, setSubmitting] = useState(false)
        const router = useRouter()

        useEffect(() => {
            fetchComments()
        }, [])

        const fetchComments = async () => {
            try {
                const res = await fetch('/api/admin/comments')
                if (res.ok) {
                    const data = await res.json()
                    setComments(data)
                }
            } catch (error) {
                console.error('Failed to fetch comments', error)
            } finally {
                setLoading(false)
            }
        }

        const handleDelete = async (id: string) => {
            if (!confirm('Bu yorumu silmek istediğinize emin misiniz?')) return

            try {
                const res = await fetch(`/api/admin/comments/${id}`, {
                    method: 'DELETE'
                })

                if (res.ok) {
                    setComments(prev => prev.filter(c => c.id !== id))
                }
            } catch (error) {
                console.error('Failed to delete comment', error)
            }
        }

        const handleReplySubmit = async (e: React.FormEvent, parentComment: Comment) => {
            e.preventDefault()
            if (!replyContent.trim()) return

            setSubmitting(true)
            try {
                const res = await fetch('/api/admin/comments/reply', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        articleId: parentComment.articleId,
                        parentId: parentComment.id,
                        content: replyContent
                    })
                })

                if (res.ok) {
                    setReplyingTo(null)
                    setReplyContent('')
                    fetchComments() // Refresh to show new reply (though it might be nested, table view is flat usually)
                    showToast('Yanıt gönderildi', 'success')
                }
            } catch (error) {
                console.error('Failed to reply', error)
            } finally {
                setSubmitting(false)
            }
        }

        if (loading) {
            return <div className="p-8 text-center text-zinc-400">Yükleniyor...</div>
        }

        return (
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-white">Yorumlar</h1>
                    <div className="text-sm text-zinc-400">
                        Toplam {comments.length} yorum
                    </div>
                </div>

                <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-zinc-950 border-b border-zinc-800 text-zinc-400 uppercase font-medium">
                                <tr>
                                    <th className="px-6 py-4">Yazar</th>
                                    <th className="px-6 py-4">Yorum</th>
                                    <th className="px-6 py-4">Makale</th>
                                    <th className="px-6 py-4">Tarih</th>
                                    <th className="px-6 py-4 text-right">İşlemler</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-800">
                                {comments.map((comment) => (
                                    <tr key={comment.id} className="hover:bg-zinc-800/50 transition-colors">
                                        <td className="px-6 py-4 align-top">
                                            <div className="font-medium text-white">{comment.name}</div>
                                            <div className="text-xs text-zinc-500">{comment.email}</div>
                                        </td>
                                        <td className="px-6 py-4 align-top max-w-md">
                                            <div className="text-zinc-300 whitespace-pre-wrap">{comment.content}</div>

                                            {/* Inline Reply Form */}
                                            {replyingTo === comment.id && (
                                                <form onSubmit={(e) => handleReplySubmit(e, comment)} className="mt-4 p-4 bg-zinc-950 rounded-lg border border-zinc-800">
                                                    <textarea
                                                        value={replyContent}
                                                        onChange={(e) => setReplyContent(e.target.value)}
                                                        placeholder="Yanıtınız..."
                                                        className="w-full bg-zinc-900 border border-zinc-700 rounded p-2 text-white text-sm mb-2 focus:border-primary outline-none"
                                                        rows={3}
                                                        autoFocus
                                                    />
                                                    <div className="flex justify-end gap-2">
                                                        <button
                                                            type="button"
                                                            onClick={() => setReplyingTo(null)}
                                                            className="px-3 py-1.5 text-xs text-zinc-400 hover:text-white"
                                                        >
                                                            İptal
                                                        </button>
                                                        <button
                                                            type="submit"
                                                            disabled={submitting}
                                                            className="px-3 py-1.5 text-xs bg-primary text-black font-medium rounded hover:bg-primary/90 disabled:opacity-50"
                                                        >
                                                            {submitting ? 'Gönderiliyor...' : 'Yanıtla'}
                                                        </button>
                                                    </div>
                                                </form>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 align-top">
                                            {comment.article ? (
                                                <Link
                                                    href={`/yazilar/${comment.article.slug}`}
                                                    target="_blank"
                                                    className="text-primary hover:underline block truncate max-w-[150px]"
                                                >
                                                    {comment.article.title}
                                                </Link>
                                            ) : (
                                                <span className="text-zinc-500">Silinmiş Makale</span>
                                            )}
                                            {comment.article?.issue && (
                                                <span className="text-xs text-zinc-500">Sayı #{comment.article.issue.number}</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 align-top text-zinc-500 whitespace-nowrap">
                                            {new Date(comment.createdAt).toLocaleDateString('tr-TR', {
                                                day: 'numeric',
                                                month: 'short',
                                                year: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })}
                                        </td>
                                        <td className="px-6 py-4 align-top text-right">
                                            <div className="flex justify-end gap-2">
                                                <button
                                                    onClick={() => {
                                                        setReplyingTo(comment.id === replyingTo ? null : comment.id)
                                                        setReplyContent('')
                                                    }}
                                                    className="text-zinc-400 hover:text-primary transition-colors"
                                                    title="Yanıtla"
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                                                    </svg>
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(comment.id)}
                                                    className="text-zinc-400 hover:text-red-500 transition-colors"
                                                    title="Sil"
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}

                                {comments.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-12 text-center text-zinc-500">
                                            Henüz hiç yorum yapılmamış.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
