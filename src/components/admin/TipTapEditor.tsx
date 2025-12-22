'use client'

import React from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import Youtube from '@tiptap/extension-youtube'
import Placeholder from '@tiptap/extension-placeholder'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import {
    Bold, Italic, Underline as UnderlineIcon, Strikethrough,
    Heading1, Heading2, Heading3, List, ListOrdered,
    Quote, Link as LinkIcon, Image as ImageIcon,
    AlignLeft, AlignCenter, AlignRight, Undo, Redo, Eraser
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { InputModal } from './InputModal'

interface TipTapEditorProps {
    content: string
    onChange: (html: string) => void
    editable?: boolean
}

const MenuButton = ({
    onClick,
    isActive = false,
    disabled = false,
    children,
    title
}: {
    onClick: () => void
    isActive?: boolean
    disabled?: boolean
    children: React.ReactNode
    title?: string
}) => (
    <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        title={title}
        className={cn(
            "p-2 rounded-lg transition-all text-neutral-400 hover:text-white hover:bg-neutral-800",
            isActive && "bg-amber-500/10 text-amber-500 border border-amber-500/20",
            disabled && "opacity-50 cursor-not-allowed"
        )}
    >
        {children}
    </button>
)

export function TipTapEditor({ content, onChange, editable = true }: TipTapEditorProps) {
    const editor = useEditor({
        immediatelyRender: false,
        extensions: [
            StarterKit,
            Underline,
            Image.configure({
                inline: true,
                allowBase64: true,
            }),
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    class: 'text-amber-500 hover:underline',
                },
            }),
            Youtube.configure({
                controls: false,
            }),
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
            Placeholder.configure({
                placeholder: 'Yazmaya başlayın...'
            })
        ],
        content,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML())
        },
        editable,
        editorProps: {
            attributes: {
                class: cn(
                    "prose prose-invert max-w-none focus:outline-none min-h-[400px] p-6",
                    "prose-headings:font-bold prose-headings:text-white",
                    "prose-p:text-neutral-300 prose-p:leading-relaxed",
                    "prose-a:text-amber-500 prose-a:no-underline hover:prose-a:underline",
                    "prose-strong:text-white prose-strong:font-bold",
                    "prose-blockquote:border-l-4 prose-blockquote:border-amber-500 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-neutral-400",
                    "prose-ul:list-disc prose-ul:pl-6 prose-ol:list-decimal prose-ol:pl-6",
                    "prose-img:rounded-xl prose-img:border prose-img:border-neutral-800"
                )
            }
        }
    })

    const [modal, setModal] = React.useState<{
        isOpen: boolean;
        type: 'image' | 'link' | null;
        initialValue: string;
    }>({
        isOpen: false,
        type: null,
        initialValue: ''
    });

    if (!editor) {
        return null
    }

    const openImageModal = () => {
        setModal({
            isOpen: true,
            type: 'image',
            initialValue: ''
        });
    }

    const openLinkModal = () => {
        const previousUrl = editor.getAttributes('link').href || '';
        setModal({
            isOpen: true,
            type: 'link',
            initialValue: previousUrl
        });
    }

    const handleModalSubmit = (value: string) => {
        if (modal.type === 'image') {
            if (value) {
                editor.chain().focus().setImage({ src: value }).run();
            }
        } else if (modal.type === 'link') {
            if (value === '') {
                editor.chain().focus().extendMarkRange('link').unsetLink().run();
            } else {
                editor.chain().focus().extendMarkRange('link').setLink({ href: value }).run();
            }
        }
    }

    return (
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden shadow-2xl relative">
            <InputModal
                isOpen={modal.isOpen}
                onClose={() => setModal({ ...modal, isOpen: false })}
                onSubmit={handleModalSubmit}
                title={modal.type === 'image' ? "Görsel Ekle" : "Link Ekle"}
                description={modal.type === 'image' ? "Görselin URL adresini giriniz." : "Linkin yönlendirileceği URL adresini giriniz."}
                initialValue={modal.initialValue}
                placeholder="https://..."
            />

            {/* Toolbar */}
            <div className="border-b border-neutral-800 bg-neutral-900/50 backdrop-blur-sm p-2 flex flex-wrap items-center gap-1 sticky top-0 z-10">
                <div className="flex items-center gap-1 pr-2 border-r border-neutral-800">
                    <MenuButton onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()} title="Geri Al">
                        <Undo size={16} />
                    </MenuButton>
                    <MenuButton onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()} title="İleri Al">
                        <Redo size={16} />
                    </MenuButton>
                </div>

                <div className="flex items-center gap-1 pr-2 border-r border-neutral-800">
                    <MenuButton onClick={() => editor.chain().focus().toggleBold().run()} isActive={editor.isActive('bold')} title="Kalın">
                        <Bold size={16} />
                    </MenuButton>
                    <MenuButton onClick={() => editor.chain().focus().toggleItalic().run()} isActive={editor.isActive('italic')} title="İtalik">
                        <Italic size={16} />
                    </MenuButton>
                    <MenuButton onClick={() => editor.chain().focus().toggleUnderline().run()} isActive={editor.isActive('underline')} title="Altı Çizili">
                        <UnderlineIcon size={16} />
                    </MenuButton>
                    <MenuButton onClick={() => editor.chain().focus().toggleStrike().run()} isActive={editor.isActive('strike')} title="Üstü Çizili">
                        <Strikethrough size={16} />
                    </MenuButton>
                </div>

                <div className="flex items-center gap-1 pr-2 border-r border-neutral-800">
                    <MenuButton onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} isActive={editor.isActive('heading', { level: 1 })} title="Başlık 1">
                        <Heading1 size={16} />
                    </MenuButton>
                    <MenuButton onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} isActive={editor.isActive('heading', { level: 2 })} title="Başlık 2">
                        <Heading2 size={16} />
                    </MenuButton>
                    <MenuButton onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} isActive={editor.isActive('heading', { level: 3 })} title="Başlık 3">
                        <Heading3 size={16} />
                    </MenuButton>
                </div>

                <div className="flex items-center gap-1 pr-2 border-r border-neutral-800">
                    <MenuButton onClick={() => editor.chain().focus().setTextAlign('left').run()} isActive={editor.isActive({ textAlign: 'left' })} title="Sola Hizala">
                        <AlignLeft size={16} />
                    </MenuButton>
                    <MenuButton onClick={() => editor.chain().focus().setTextAlign('center').run()} isActive={editor.isActive({ textAlign: 'center' })} title="Ortala">
                        <AlignCenter size={16} />
                    </MenuButton>
                    <MenuButton onClick={() => editor.chain().focus().setTextAlign('right').run()} isActive={editor.isActive({ textAlign: 'right' })} title="Sağa Hizala">
                        <AlignRight size={16} />
                    </MenuButton>
                </div>

                <div className="flex items-center gap-1 pr-2 border-r border-neutral-800">
                    <MenuButton onClick={() => editor.chain().focus().toggleBulletList().run()} isActive={editor.isActive('bulletList')} title="Liste">
                        <List size={16} />
                    </MenuButton>
                    <MenuButton onClick={() => editor.chain().focus().toggleOrderedList().run()} isActive={editor.isActive('orderedList')} title="Sıralı Liste">
                        <ListOrdered size={16} />
                    </MenuButton>
                    <MenuButton onClick={() => editor.chain().focus().toggleBlockquote().run()} isActive={editor.isActive('blockquote')} title="Alıntı">
                        <Quote size={16} />
                    </MenuButton>
                </div>

                <div className="flex items-center gap-1">
                    <MenuButton onClick={openLinkModal} isActive={editor.isActive('link')} title="Link Ekle">
                        <LinkIcon size={16} />
                    </MenuButton>
                    <MenuButton onClick={openImageModal} title="Görsel Ekle">
                        <ImageIcon size={16} />
                    </MenuButton>
                    <MenuButton onClick={() => editor.chain().focus().unsetAllMarks().run()} title="Biçimlendirmeyi Temizle">
                        <Eraser size={16} />
                    </MenuButton>
                </div>
            </div>

            {/* Editor Content */}
            <EditorContent editor={editor} className="min-h-[500px]" />

            {/* Editor Footer */}
            <div className="p-2 border-t border-neutral-800 text-xs text-neutral-500 flex justify-between px-4">
                <span>{editor.storage.characterCount?.words?.() || 0} kelime</span>
                <span className={cn(editor.isFocused ? "text-amber-500" : "")}>
                    {editor.isFocused ? "Düzenleniyor" : "Hazır"}
                </span>
            </div>
        </div>
    )
}
