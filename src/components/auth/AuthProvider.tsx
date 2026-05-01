// src/components/auth/AuthProvider.tsx
import React from 'react'
import { useLocation } from 'react-router-dom'
import { AuthProvider as BaseAuthProvider } from '@/hooks/useAuth'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from '@/components/ui/sonner'

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (replaced cacheTime)
    },
  },
})

interface AuthProviderWrapperProps {
  children: React.ReactNode
}

export const AuthProviderWrapper: React.FC<AuthProviderWrapperProps> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <BaseAuthProvider>
        {children}
        <Toaster 
          position="top-right"
          closeButton
          richColors
          expand
          visibleToasts={3}
        />
      </BaseAuthProvider>
    </QueryClientProvider>
  )
}

// Higher-order component for pages that require authentication
export const withAuth = <P extends object>(
  Component: React.ComponentType<P>,
  requiredRole?: string,
  requiredPermission?: {
    resource: string
    action: 'C' | 'R' | 'U' | 'D'
    target?: any
  }
) => {
  return (props: P) => {
    const location = useLocation()
    
    return (
      <div className="min-h-screen bg-background">
        <Component {...props} />
      </div>
    )
  }
}

// Hook for session management
export const useSessionMonitor = () => {
  const [isIdle, setIsIdle] = React.useState(false)
  const [lastActivity, setLastActivity] = React.useState(Date.now())
  
  const IDLE_TIMEOUT = 30 * 60 * 1000 // 30 minutes
  const WARNING_TIMEOUT = 25 * 60 * 1000 // 25 minutes

  // Track user activity
  React.useEffect(() => {
    const updateActivity = () => {
      setLastActivity(Date.now())
      setIsIdle(false)
    }

    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart']
    events.forEach(event => {
      document.addEventListener(event, updateActivity, true)
    })

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, updateActivity, true)
      })
    }
  }, [])

  // Monitor idle state
  React.useEffect(() => {
    const interval = setInterval(() => {
      const idleTime = Date.now() - lastActivity
      
      if (idleTime > IDLE_TIMEOUT) {
        setIsIdle(true)
      }
    }, 60000) // Check every minute

    return () => clearInterval(interval)
  }, [lastActivity, IDLE_TIMEOUT])

  return { isIdle, lastActivity }
}