import React, { useState, useEffect } from 'react'
import { Button } from '@/components/atoms/Button'
import { Icon } from '@/components/atoms/Icon'
import { Badge } from '@/components/atoms/Badge'
import { useGet } from '@/hooks/useApi'
import { api } from '@/services/api'
import { cn } from '@/lib/utils'

export interface Notification {
  id: string
  userId: string
  type: string
  title: string
  message: string
  read: boolean
  createdAt: string
  actionUrl?: string
  priority: 'low' | 'medium' | 'high'
}

export interface NotificationCenterProps {
  isOpen: boolean
  onClose: () => void
  className?: string
}

export const NotificationCenter: React.FC<NotificationCenterProps> = ({
  isOpen,
  onClose,
  className
}) => {
  const { data: notifications = [] } = useGet<Notification[]>(['notifications'], '/notifications')
  const [loading, setLoading] = useState(false)

  const unreadCount = notifications.filter(n => !n.read).length

  const markAsRead = async (notificationId: string) => {
    setLoading(true)
    try {
      await api.patch(`/notifications/${notificationId}/read`)
      // Notification will be updated on next fetch
    } catch (error) {
      console.error('Failed to mark notification as read:', error)
    } finally {
      setLoading(false)
    }
  }

  const markAllAsRead = async () => {
    setLoading(true)
    try {
      const unreadNotifications = notifications.filter(n => !n.read)
      await Promise.all(
        unreadNotifications.map(n => api.patch(`/notifications/${n.id}/read`))
      )
      // Notifications will be updated on next fetch
    } catch (error) {
      console.error('Failed to mark all notifications as read:', error)
    } finally {
      setLoading(false)
    }
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'leave_approved':
      case 'leave_request':
        return 'calendar'
      case 'performance_review':
        return 'star'
      case 'job_match':
        return 'briefcase'
      case 'message':
        return 'mail'
      default:
        return 'bell'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'danger'
      case 'medium':
        return 'warning'
      case 'low':
        return 'info'
      default:
        return 'neutral'
    }
  }

  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffMinutes = Math.ceil(diffTime / (1000 * 60))
    const diffHours = Math.ceil(diffTime / (1000 * 60 * 60))
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffMinutes < 60) return `${diffMinutes}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    return `${diffDays}d ago`
  }

  if (!isOpen) return null

  return (
    <div className={cn('fixed inset-0 z-50', className)}>
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/20 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="absolute right-4 top-16 w-96 max-w-[calc(100vw-2rem)] bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-2">
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Notifications
            </h3>
            {unreadCount > 0 && (
              <Badge variant="danger" size="sm">
                {unreadCount}
              </Badge>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            {unreadCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={markAllAsRead}
                disabled={loading}
                className="text-xs"
              >
                Mark all read
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0"
            >
              <Icon name="close" size={16} />
            </Button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="max-h-96 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="p-8 text-center">
              <Icon name="bell" size={32} className="mx-auto text-gray-400 mb-2" />
              <p className="text-gray-500 dark:text-gray-400">
                No notifications yet
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100 dark:divide-gray-700">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={cn(
                    'p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer',
                    !notification.read && 'bg-blue-50/50 dark:bg-blue-900/10'
                  )}
                  onClick={() => {
                    if (!notification.read) {
                      markAsRead(notification.id)
                    }
                    if (notification.actionUrl) {
                      // Navigate to action URL
                      window.location.href = notification.actionUrl
                    }
                  }}
                >
                  <div className="flex items-start space-x-3">
                    <div className={cn(
                      'flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center',
                      !notification.read ? 'bg-blue-100 dark:bg-blue-900/30' : 'bg-gray-100 dark:bg-gray-700'
                    )}>
                      <Icon 
                        name={getNotificationIcon(notification.type)} 
                        size={14} 
                        className={cn(
                          !notification.read ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500'
                        )}
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className={cn(
                          'text-sm font-medium',
                          !notification.read ? 'text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'
                        )}>
                          {notification.title}
                        </p>
                        
                        <div className="flex items-center space-x-2">
                          {notification.priority !== 'low' && (
                            <Badge 
                              variant={getPriorityColor(notification.priority)} 
                              size="sm"
                            >
                              {notification.priority}
                            </Badge>
                          )}
                          {!notification.read && (
                            <div className="w-2 h-2 bg-blue-600 rounded-full" />
                          )}
                        </div>
                      </div>
                      
                      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                        {notification.message}
                      </p>
                      
                      <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                        {formatTime(notification.createdAt)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {notifications.length > 0 && (
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <Button variant="ghost" size="sm" className="w-full">
              View All Notifications
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}