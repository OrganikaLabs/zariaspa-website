import { useState, useEffect } from 'react'
import { api } from '@/services/api'
import { useAuth } from './useAuth'

export interface Bookmark {
  id: string
  userId: string
  jobId: string
  bookmarkedAt: string
}

export const useBookmarks = () => {
  const { user, isAuthenticated } = useAuth()
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([])
  const [loading, setLoading] = useState(false)

  const fetchBookmarks = async () => {
    if (!isAuthenticated || !user) return
    
    setLoading(true)
    try {
      const { data } = await api.get<Bookmark[]>(`/jobs/bookmarks?userId=${user.id}`)
      setBookmarks(data)
    } catch (error) {
      console.error('Failed to fetch bookmarks:', error)
    } finally {
      setLoading(false)
    }
  }

  const addBookmark = async (jobId: string) => {
    if (!isAuthenticated) return
    
    try {
      const { data } = await api.post<Bookmark>('/jobs/bookmarks', { jobId })
      setBookmarks(prev => [...prev, data])
    } catch (error) {
      console.error('Failed to add bookmark:', error)
    }
  }

  const removeBookmark = async (jobId: string) => {
    if (!isAuthenticated) return
    
    const bookmark = bookmarks.find(b => b.jobId === jobId)
    if (!bookmark) return

    try {
      await api.delete(`/jobs/bookmarks/${bookmark.id}`)
      setBookmarks(prev => prev.filter(b => b.jobId !== jobId))
    } catch (error) {
      console.error('Failed to remove bookmark:', error)
    }
  }

  const toggleBookmark = async (jobId: string) => {
    const isBookmarked = bookmarks.some(b => b.jobId === jobId)
    
    if (isBookmarked) {
      await removeBookmark(jobId)
    } else {
      await addBookmark(jobId)
    }
  }

  const isBookmarked = (jobId: string) => {
    return bookmarks.some(b => b.jobId === jobId)
  }

  useEffect(() => {
    fetchBookmarks()
  }, [isAuthenticated, user?.id])

  return {
    bookmarks,
    loading,
    addBookmark,
    removeBookmark,
    toggleBookmark,
    isBookmarked,
    refetch: fetchBookmarks
  }
}