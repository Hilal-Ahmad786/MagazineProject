"use client";

import { useEffect } from "react";
import { X, AlertTriangle } from "lucide-react";

interface ConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    description: string;
    confirmText?: string;
    cancelText?: string;
    loading?: boolean;
    variant?: 'danger' | 'warning' | 'info';
}

export function ConfirmModal({
    isOpen,
    onClose,
    onConfirm,
    title,
    description,
    confirmText = "Onayla",
    cancelText = "İptal",
    loading = false,
    variant = 'danger',
}: ConfirmModalProps) {

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="relative w-full max-w-sm bg-neutral-900 border border-neutral-800 rounded-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between p-4 border-b border-neutral-800">
                    <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                        {variant === 'danger' && <AlertTriangle className="text-red-500" size={20} />}
                        {title}
                    </h3>
                    <button
                        onClick={onClose}
                        className="p-1 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
                    >
                        <X size={18} />
                    </button>
                </div>

                <div className="p-6">
                    <p className="text-neutral-300 leading-relaxed">
                        {description}
                    </p>
                </div>

                <div className="flex justify-end gap-3 p-4 bg-neutral-900/50 border-t border-neutral-800">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors"
                    >
                        {cancelText}
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            onConfirm();
                            onClose();
                        }}
                        disabled={loading}
                        className={`px-4 py-2 text-sm font-medium text-white rounded-lg shadow-lg transition-all disabled:opacity-50 ${variant === 'danger'
                                ? 'bg-red-600 hover:bg-red-500 shadow-red-900/20'
                                : 'bg-amber-600 hover:bg-amber-500 shadow-amber-900/20'
                            }`}
                    >
                        {loading ? "İşleniyor..." : confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
}
