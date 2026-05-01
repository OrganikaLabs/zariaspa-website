// src/components/routing/ProtectedRoute.tsx
import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ShieldX, ArrowLeft, Home } from 'lucide-react'
import type { Role } from '@/services/permissions'

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredRole?: Role
  requiredRoles?: Role[]
  requiredPermission?: {
    resource: string
    action: 'C' | 'R' | 'U' | 'D'
    target?: any
  }
  fallbackComponent?: React.ComponentType
  redirectTo?: string
}

const AccessDeniedCard: React.FC<{ 
  reason: string
  onGoBack: () => void
  onGoHome: () => void
}> = ({ reason, onGoBack, onGoHome }) => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <div className="mx-auto w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-4">
          <ShieldX className="w-6 h-6 text-red-600 dark:text-red-400" />
        </div>
        <CardTitle className="text-xl text-red-800 dark:text-red-200">Access Denied</CardTitle>
        <CardDescription className="text-gray-600 dark:text-gray-400">
          {reason}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <Alert>
          <AlertDescription>
            You don't have the required permissions to access this page. 
            Please contact your administrator if you believe this is an error.
          </AlertDescription>
        </Alert>
        <div className="flex gap-2">
          <Button onClick={onGoBack} variant="outline" className="flex-1">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
          <Button onClick={onGoHome} className="flex-1">
            <Home className="w-4 h-4 mr-2" />
            Home
          </Button>
        </div>
      </CardContent>
    </Card>
  </div>
)

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiredRole, 
  requiredRoles,
  requiredPermission,
  fallbackComponent: FallbackComponent,
  redirectTo
}) => {
  const { isAuthenticated, user, hasPermission, isLoading } = useAuth()
  const location = useLocation()
  
  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  // Not authenticated - redirect to login with return path
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  // Check role requirements
  const hasRequiredRole = () => {
    if (!user) return false
    
    if (requiredRole && !user.roles.includes(requiredRole)) return false
    
    if (requiredRoles && !requiredRoles.some(role => user.roles.includes(role))) return false
    
    return true
  }

  // Check permission requirements
  const hasRequiredPermission = () => {
    if (!requiredPermission) return true
    
    return hasPermission(
      requiredPermission.resource, 
      requiredPermission.action, 
      requiredPermission.target
    )
  }

  const handleGoBack = () => {
    window.history.back()
  }

  const handleGoHome = () => {
    window.location.href = '/'
  }

  // Role check failed
  if (!hasRequiredRole()) {
    if (redirectTo) {
      return <Navigate to={redirectTo} replace />
    }
    
    if (FallbackComponent) {
      return <FallbackComponent />
    }
    
    const roleNames = requiredRoles ? requiredRoles.join(', ') : requiredRole
    return (
      <AccessDeniedCard 
        reason={`This page requires ${roleNames} role access.`}
        onGoBack={handleGoBack}
        onGoHome={handleGoHome}
      />
    )
  }

  // Permission check failed
  if (!hasRequiredPermission()) {
    if (redirectTo) {
      return <Navigate to={redirectTo} replace />
    }
    
    if (FallbackComponent) {
      return <FallbackComponent />
    }
    
    return (
      <AccessDeniedCard 
        reason="You don't have permission to access this resource."
        onGoBack={handleGoBack}
        onGoHome={handleGoHome}
      />
    )
  }

  return <>{children}</>
}
