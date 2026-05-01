// src/components/auth/SessionManager.tsx
import React from 'react'
import { useAuth } from '@/hooks/useAuth'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Clock, AlertTriangle } from 'lucide-react'
import { toast } from 'sonner'

interface SessionManagerProps {
  children: React.ReactNode
}

export const SessionManager: React.FC<SessionManagerProps> = ({ children }) => {
  const { isAuthenticated, refreshToken, logout } = useAuth()
  const [showWarning, setShowWarning] = React.useState(false)
  const [timeRemaining, setTimeRemaining] = React.useState(0)
  const [sessionExpiry, setSessionExpiry] = React.useState<number | null>(null)
  
  // Monitor session expiry
  React.useEffect(() => {
    if (!isAuthenticated) return

    const checkSession = () => {
      const stored = localStorage.getItem('hrms_session_expiry')
      if (stored) {
        const expiry = parseInt(stored)
        const now = Date.now()
        const remaining = expiry - now
        
        setSessionExpiry(expiry)
        setTimeRemaining(remaining)
        
        // Show warning 5 minutes before expiry
        if (remaining <= 5 * 60 * 1000 && remaining > 0) {
          setShowWarning(true)
        }
        
        // Auto logout when expired
        if (remaining <= 0) {
          logout()
          toast.error('Session expired. Please log in again.')
        }
      }
    }

    // Check immediately
    checkSession()
    
    // Check every minute
    const interval = setInterval(checkSession, 60 * 1000)
    
    return () => clearInterval(interval)
  }, [isAuthenticated, logout])

  const handleExtendSession = async () => {
    try {
      await refreshToken()
      setShowWarning(false)
      toast.success('Session extended successfully')
    } catch (error) {
      toast.error('Failed to extend session')
    }
  }

  const handleLogout = () => {
    logout()
    setShowWarning(false)
  }

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / (1000 * 60))
    const seconds = Math.floor((ms % (1000 * 60)) / 1000)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  return (
    <>
      {children}
      
      <Dialog open={showWarning} onOpenChange={setShowWarning}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="mx-auto w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center mb-4">
              <Clock className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>
            <DialogTitle className="text-center">Session Expiring Soon</DialogTitle>
            <DialogDescription className="text-center">
              Your session will expire in {formatTime(timeRemaining)}
            </DialogDescription>
          </DialogHeader>
          
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              To continue working, please extend your session or you will be automatically logged out.
            </AlertDescription>
          </Alert>
          
          <DialogFooter className="sm:justify-center">
            <Button variant="outline" onClick={handleLogout}>
              Logout Now
            </Button>
            <Button onClick={handleExtendSession}>
              Extend Session
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

// Hook for tracking user activity
export const useActivityTracker = () => {
  const [lastActivity, setLastActivity] = React.useState(Date.now())
  const [isIdle, setIsIdle] = React.useState(false)
  
  const IDLE_TIMEOUT = 30 * 60 * 1000 // 30 minutes

  React.useEffect(() => {
    const updateActivity = () => {
      setLastActivity(Date.now())
      setIsIdle(false)
    }

    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click']
    
    events.forEach(event => {
      document.addEventListener(event, updateActivity, { passive: true })
    })

    const checkIdleStatus = () => {
      const idleTime = Date.now() - lastActivity
      if (idleTime > IDLE_TIMEOUT) {
        setIsIdle(true)
      }
    }

    const interval = setInterval(checkIdleStatus, 60000) // Check every minute

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, updateActivity)
      })
      clearInterval(interval)
    }
  }, [lastActivity])

  return { lastActivity, isIdle }
}