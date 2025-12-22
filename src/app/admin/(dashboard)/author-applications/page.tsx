'use client'

import { useState, useEffect, useCallback } from 'react'
import { Check, X, Clock, Eye, Trash } from 'lucide-react'
import { useToast } from '@/context/ToastContext'
import { ConfirmModal } from '@/components/admin/ConfirmModal'

interface Application {
    id: string
    name: string
    email: string
    status: 'pending' | 'accepted' | 'rejected'
    createdAt: string
    [key: string]: any
}

export default function ApplicationsPage() {
    const { showToast } = useToast()
    const [applications, setApplications] = useState<Application[]>([])
    const [loading, setLoading] = useState(true)
    const [selectedApp, setSelectedApp] = useState<Application | null>(null)
    const [deleteId, setDeleteId] = useState<string | null>(null)

    const fetchApplications = useCallback(async () => {
        try {
            const res = await fetch('/api/admin/author-applications')
            if (res.ok) {
                const data = await res.json()
                setApplications(data)
            }
        } catch (error) {
            console.error('Failed to fetch applications', error)
            showToast('Başvurular yüklenirken hata oluştu', 'error')
        } finally {
            setLoading(false)
        }
    }, [showToast])

    useEffect(() => {
        fetchApplications()
    }, [fetchApplications])

    const handleUpdateStatus = async (id: string, newStatus: string) => {
        try {
            const res = await fetch(`/api/admin/author-applications/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus }),
            })

            if (res.ok) {
                showToast(`Durum güncellendi: ${newStatus}`, 'success')
                fetchApplications() // Refresh list
                if (selectedApp?.id === id) {
                    setSelectedApp(prev => prev ? { ...prev, status: newStatus as any } : null)
                }
            } else {
                showToast('Güncelleme başarısız', 'error')
            }
        } catch (error) {
            showToast('Hata oluştu', 'error')
        }
    }

    const handleDeleteClick = (id: string) => {
        setDeleteId(id)
    }

    const handleConfirmDelete = async () => {
        if (!deleteId) return

        try {
            const res = await fetch(`/api/admin/author-applications/${deleteId}`, {
                method: 'DELETE',
            })

            if (res.ok) {
                showToast('Başvuru silindi', 'success')
                setSelectedApp(null)
                fetchApplications() // Refresh list
            } else {
                showToast('Silme işlemi başarısız', 'error')
            }
        } catch (error) {
            showToast('Hata oluştu', 'error')
        } finally {
            setDeleteId(null)
        }
    }

    if (loading) return <div className="p-8 text-center text-gray-400">Yükleniyor...</div>

    return (
        <div className="p-8">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold text-white">Yazar Başvuruları</h1>
                <div className="text-sm text-gray-500">
                    Toplam: {applications.length}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* List */}
                <div className="lg:col-span-1 space-y-4">
                    {applications.map((app) => (
                        <div
                            key={app.id}
                            onClick={() => setSelectedApp(app)}
                            className={`p-4 rounded-xl border cursor-pointer transition-all ${selectedApp?.id === app.id
                                ? 'bg-yellow-500/10 border-yellow-500/50'
                                : 'bg-neutral-900 border-neutral-800 hover:border-neutral-700'
                                }`}
                        >
                            <div className="flex justify-between items-start mb-2">
                                <span className={`px-2 py-0.5 text-xs rounded-full uppercase font-bold tracking-wider ${app.status === 'pending' ? 'bg-yellow-500/20 text-yellow-500' :
                                    app.status === 'accepted' ? 'bg-green-500/20 text-green-500' :
                                        'bg-red-500/20 text-red-500'
                                    }`}>
                                    {app.status === 'pending' ? 'Bekliyor' : app.status === 'accepted' ? 'Onaylandı' : 'Reddedildi'}
                                </span>
                                <span className="text-xs text-neutral-500">
                                    {new Date(app.createdAt).toLocaleDateString()}
                                </span>
                            </div>
                            <h3 className="font-bold text-white">{app.name}</h3>
                            <p className="text-sm text-neutral-400">{app.email}</p>
                        </div>
                    ))}
                    {applications.length === 0 && (
                        <div className="text-center py-10 text-neutral-500">Henüz başvuru yok.</div>
                    )}
                </div>

                {/* Detail View */}
                <div className="lg:col-span-2">
                    {selectedApp ? (
                        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8 sticky top-8">
                            <div className="flex justify-between items-start mb-8">
                                <div>
                                    <h2 className="text-2xl font-bold text-white mb-1">{selectedApp.name}</h2>
                                    <p className="text-neutral-400">{selectedApp.email}</p>
                                    {selectedApp.phone && <p className="text-neutral-500 text-sm mt-1">{selectedApp.phone}</p>}
                                </div>

                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleUpdateStatus(selectedApp.id, 'accepted')}
                                        className="p-2 bg-green-500/10 text-green-500 hover:bg-green-500/20 rounded-lg transition-colors border border-green-500/20"
                                        title="Onayla"
                                    >
                                        <Check size={20} />
                                    </button>
                                    <button
                                        onClick={() => handleUpdateStatus(selectedApp.id, 'rejected')}
                                        className="p-2 bg-red-500/10 text-red-500 hover:bg-red-500/20 rounded-lg transition-colors border border-red-500/20"
                                        title="Reddet"
                                    >
                                        <X size={20} />
                                    </button>
                                    <button
                                        onClick={() => handleUpdateStatus(selectedApp.id, 'pending')}
                                        className="p-2 bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20 rounded-lg transition-colors border border-yellow-500/20"
                                        title="Beklemeye Al"
                                    >
                                        <Clock size={20} />
                                    </button>
                                    <button
                                        onClick={() => handleDeleteClick(selectedApp.id)}
                                        className="p-2 bg-neutral-800 text-neutral-400 hover:bg-red-900/20 hover:text-red-500 hover:border-red-500/20 rounded-lg transition-colors border border-neutral-700"
                                        title="Sil"
                                    >
                                        <Trash size={20} />
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider block mb-2">Biyografi</label>
                                    <p className="text-neutral-300 leading-relaxed font-serif whitespace-pre-wrap">{selectedApp.bio}</p>
                                </div>

                                <div>
                                    <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider block mb-2">İlgi Alanları</label>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedApp.topicsOfInterest?.map((topic: string) => (
                                            <span key={topic} className="px-3 py-1 bg-neutral-800 rounded-lg text-sm text-neutral-300">
                                                {topic}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider block mb-2">Örnek Yazı & Çalışma</label>
                                    <div className="p-6 bg-black/50 rounded-xl border border-neutral-800">
                                        <p className="text-neutral-300 font-serif whitespace-pre-wrap leading-relaxed">
                                            {selectedApp.sampleWork}
                                        </p>
                                    </div>
                                </div>

                                {(selectedApp.portfolioUrl || selectedApp.notes) && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {selectedApp.portfolioUrl && (
                                            <div>
                                                <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider block mb-2">Portfolyo</label>
                                                <a href={selectedApp.portfolioUrl} target="_blank" className="text-yellow-500 hover:underline break-all">
                                                    {selectedApp.portfolioUrl}
                                                </a>
                                            </div>
                                        )}
                                        {selectedApp.notes && (
                                            <div>
                                                <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider block mb-2">Notlar (Motivasyon)</label>
                                                <p className="text-neutral-400 text-sm whitespace-pre-wrap">{selectedApp.notes}</p>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="h-full min-h-[400px] flex items-center justify-center border border-dashed border-neutral-800 rounded-xl">
                            <div className="text-center text-neutral-500">
                                <p>Detayları görüntülemek için bir başvuru seçin</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <ConfirmModal
                isOpen={!!deleteId}
                onClose={() => setDeleteId(null)}
                onConfirm={handleConfirmDelete}
                title="Başvuruyu Sil"
                description="Bu başvuruyu silmek istediğinize emin misiniz? Bu işlem geri alınamaz."
                confirmText="Sil"
                variant="danger"
            />
        </div>
    )
}
