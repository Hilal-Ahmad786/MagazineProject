'use client'

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react'

export interface Comment {
  id: string
  articleId: string
  author: string
  email: string
  content: string
  createdAt: string
  likes: number
  replies?: Comment[]
  parentId?: string
}

interface CommentsContextType {
  comments: Comment[]
  addComment: (articleId: string, author: string, email: string, content: string, parentId?: string) => void
  likeComment: (commentId: string) => void
  getCommentsByArticle: (articleId: string) => Comment[]
  commentCount: (articleId: string) => number
}

const CommentsContext = createContext<CommentsContextType | undefined>(undefined)

const STORAGE_KEY = 'mazhar_comments'

export function CommentsProvider({ children }: { children: ReactNode }) {
  const [comments, setComments] = useState<Comment[]>([])

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        setComments(JSON.parse(stored))
      } catch (e) {
        console.error('Failed to parse comments:', e)
      }
    }
  }, [])

  // Save to localStorage on change
  useEffect(() => {
    if (comments.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(comments))
    }
  }, [comments])

  const addComment = useCallback((
    articleId: string, 
    author: string, 
    email: string, 
    content: string,
    parentId?: string
  ) => {
    const newComment: Comment = {
      id: `comment_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      articleId,
      author,
      email,
      content,
      createdAt: new Date().toISOString(),
      likes: 0,
      parentId,
    }

    setComments(prev => [newComment, ...prev])
  }, [])

  const likeComment = useCallback((commentId: string) => {
    setComments(prev => 
      prev.map(comment => 
        comment.id === commentId 
          ? { ...comment, likes: comment.likes + 1 }
          : comment
      )
    )
  }, [])

  const getCommentsByArticle = useCallback((articleId: string) => {
    return comments
      .filter(c => c.articleId === articleId && !c.parentId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  }, [comments])

  const commentCount = useCallback((articleId: string) => {
    return comments.filter(c => c.articleId === articleId).length
  }, [comments])

  return (
    <CommentsContext.Provider value={{ 
      comments, 
      addComment, 
      likeComment, 
      getCommentsByArticle,
      commentCount 
    }}>
      {children}
    </CommentsContext.Provider>
  )
}

export function useComments() {
  const context = useContext(CommentsContext)
  if (context === undefined) {
    throw new Error('useComments must be used within a CommentsProvider')
  }
  return context
}
