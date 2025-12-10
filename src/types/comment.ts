// src/types/comment.ts
// Comment type definition for Mazhar Dergisi v2

export interface CommentAuthor {
  name: string
  email: string
  avatar?: string
}

export interface Comment {
  id: string
  articleId: string
  author: CommentAuthor
  content: string
  createdAt: string // ISO date
  likes: number
  replies?: Comment[]
  parentId?: string
  isEdited?: boolean
  editedAt?: string
}

export interface CommentInput {
  name: string
  email: string
  content: string
}

export interface CommentWithReplies extends Comment {
  replies: Comment[]
  replyCount: number
}

// Generate avatar from initials
export function getCommentAvatarUrl(name: string): string {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
  
  // Use UI Avatars service or return initials
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=facc15&color=000&bold=true`
}

// Time ago helper
export function getTimeAgo(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000)
  
  const intervals = {
    yıl: 31536000,
    ay: 2592000,
    hafta: 604800,
    gün: 86400,
    saat: 3600,
    dakika: 60,
  }
  
  for (const [unit, secondsInUnit] of Object.entries(intervals)) {
    const interval = Math.floor(seconds / secondsInUnit)
    if (interval >= 1) {
      return `${interval} ${unit}${interval > 1 ? '' : ''} önce`
    }
  }
  
  return 'Az önce'
}
