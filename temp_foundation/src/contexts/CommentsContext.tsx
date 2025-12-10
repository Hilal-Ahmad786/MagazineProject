// src/contexts/CommentsContext.tsx
// Comments context for article comments

'use client'

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from 'react'
import { STORAGE_KEYS } from '@/lib/constants'
import { generateId, safeJsonParse } from '@/lib/utils'
import type { Comment, CommentInput } from '@/types'

interface CommentsState {
  comments: Record<string, Comment[]> // articleId -> comments
}

interface CommentsContextValue {
  comments: Record<string, Comment[]>
  addComment: (articleId: string, input: CommentInput) => Comment
  addReply: (articleId: string, parentId: string, input: CommentInput) => Comment
  likeComment: (articleId: string, commentId: string) => void
  unlikeComment: (articleId: string, commentId: string) => void
  deleteComment: (articleId: string, commentId: string) => void
  editComment: (articleId: string, commentId: string, content: string) => void
  getComments: (articleId: string) => Comment[]
  getCommentCount: (articleId: string) => number
}

const CommentsContext = createContext<CommentsContextValue | undefined>(undefined)

interface CommentsProviderProps {
  children: ReactNode
}

export function CommentsProvider({ children }: CommentsProviderProps) {
  const [comments, setComments] = useState<Record<string, Comment[]>>({})
  const [mounted, setMounted] = useState(false)

  // Load comments from localStorage
  useEffect(() => {
    setMounted(true)
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.comments)
      if (stored) {
        setComments(safeJsonParse<Record<string, Comment[]>>(stored, {}))
      }
    } catch (e) {
      // localStorage not available
    }
  }, [])

  // Save to localStorage
  const saveToStorage = useCallback((newComments: Record<string, Comment[]>) => {
    try {
      localStorage.setItem(STORAGE_KEYS.comments, JSON.stringify(newComments))
    } catch (e) {
      // localStorage not available
    }
  }, [])

  // Add a new comment
  const addComment = useCallback(
    (articleId: string, input: CommentInput): Comment => {
      const newComment: Comment = {
        id: generateId(),
        articleId,
        author: {
          name: input.name,
          email: input.email,
        },
        content: input.content,
        createdAt: new Date().toISOString(),
        likes: 0,
        replies: [],
      }

      setComments((prev) => {
        const articleComments = prev[articleId] || []
        const updated = {
          ...prev,
          [articleId]: [...articleComments, newComment],
        }
        saveToStorage(updated)
        return updated
      })

      return newComment
    },
    [saveToStorage]
  )

  // Add a reply to a comment
  const addReply = useCallback(
    (articleId: string, parentId: string, input: CommentInput): Comment => {
      const newReply: Comment = {
        id: generateId(),
        articleId,
        author: {
          name: input.name,
          email: input.email,
        },
        content: input.content,
        createdAt: new Date().toISOString(),
        likes: 0,
        parentId,
      }

      setComments((prev) => {
        const articleComments = prev[articleId] || []
        
        const addReplyToComment = (comments: Comment[]): Comment[] => {
          return comments.map((comment) => {
            if (comment.id === parentId) {
              return {
                ...comment,
                replies: [...(comment.replies || []), newReply],
              }
            }
            if (comment.replies && comment.replies.length > 0) {
              return {
                ...comment,
                replies: addReplyToComment(comment.replies),
              }
            }
            return comment
          })
        }

        const updated = {
          ...prev,
          [articleId]: addReplyToComment(articleComments),
        }
        saveToStorage(updated)
        return updated
      })

      return newReply
    },
    [saveToStorage]
  )

  // Like a comment
  const likeComment = useCallback(
    (articleId: string, commentId: string) => {
      setComments((prev) => {
        const articleComments = prev[articleId] || []

        const updateLikes = (comments: Comment[]): Comment[] => {
          return comments.map((comment) => {
            if (comment.id === commentId) {
              return { ...comment, likes: comment.likes + 1 }
            }
            if (comment.replies && comment.replies.length > 0) {
              return { ...comment, replies: updateLikes(comment.replies) }
            }
            return comment
          })
        }

        const updated = {
          ...prev,
          [articleId]: updateLikes(articleComments),
        }
        saveToStorage(updated)
        return updated
      })
    },
    [saveToStorage]
  )

  // Unlike a comment
  const unlikeComment = useCallback(
    (articleId: string, commentId: string) => {
      setComments((prev) => {
        const articleComments = prev[articleId] || []

        const updateLikes = (comments: Comment[]): Comment[] => {
          return comments.map((comment) => {
            if (comment.id === commentId) {
              return { ...comment, likes: Math.max(0, comment.likes - 1) }
            }
            if (comment.replies && comment.replies.length > 0) {
              return { ...comment, replies: updateLikes(comment.replies) }
            }
            return comment
          })
        }

        const updated = {
          ...prev,
          [articleId]: updateLikes(articleComments),
        }
        saveToStorage(updated)
        return updated
      })
    },
    [saveToStorage]
  )

  // Delete a comment
  const deleteComment = useCallback(
    (articleId: string, commentId: string) => {
      setComments((prev) => {
        const articleComments = prev[articleId] || []

        const removeComment = (comments: Comment[]): Comment[] => {
          return comments
            .filter((comment) => comment.id !== commentId)
            .map((comment) => {
              if (comment.replies && comment.replies.length > 0) {
                return { ...comment, replies: removeComment(comment.replies) }
              }
              return comment
            })
        }

        const updated = {
          ...prev,
          [articleId]: removeComment(articleComments),
        }
        saveToStorage(updated)
        return updated
      })
    },
    [saveToStorage]
  )

  // Edit a comment
  const editComment = useCallback(
    (articleId: string, commentId: string, content: string) => {
      setComments((prev) => {
        const articleComments = prev[articleId] || []

        const updateContent = (comments: Comment[]): Comment[] => {
          return comments.map((comment) => {
            if (comment.id === commentId) {
              return {
                ...comment,
                content,
                isEdited: true,
                editedAt: new Date().toISOString(),
              }
            }
            if (comment.replies && comment.replies.length > 0) {
              return { ...comment, replies: updateContent(comment.replies) }
            }
            return comment
          })
        }

        const updated = {
          ...prev,
          [articleId]: updateContent(articleComments),
        }
        saveToStorage(updated)
        return updated
      })
    },
    [saveToStorage]
  )

  // Get comments for an article
  const getComments = useCallback(
    (articleId: string): Comment[] => {
      return comments[articleId] || []
    },
    [comments]
  )

  // Get comment count for an article (including replies)
  const getCommentCount = useCallback(
    (articleId: string): number => {
      const articleComments = comments[articleId] || []

      const countComments = (comments: Comment[]): number => {
        return comments.reduce((total, comment) => {
          return total + 1 + countComments(comment.replies || [])
        }, 0)
      }

      return countComments(articleComments)
    },
    [comments]
  )

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <CommentsContext.Provider
        value={{
          comments: {},
          addComment: () => ({} as Comment),
          addReply: () => ({} as Comment),
          likeComment: () => {},
          unlikeComment: () => {},
          deleteComment: () => {},
          editComment: () => {},
          getComments: () => [],
          getCommentCount: () => 0,
        }}
      >
        {children}
      </CommentsContext.Provider>
    )
  }

  return (
    <CommentsContext.Provider
      value={{
        comments,
        addComment,
        addReply,
        likeComment,
        unlikeComment,
        deleteComment,
        editComment,
        getComments,
        getCommentCount,
      }}
    >
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

export { CommentsContext }
