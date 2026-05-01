// src/components/auth/AuthGuard.tsx
import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { RoleGuard } from './RoleGuard'
import type { Role } from '@/services/permissions'

interface AuthGuardProps {
  children: React.ReactNode
  requireAuth?: boolean
  requiredRole?: Role
  requiredRoles?: Role[]
  requiredPermission?: {
    resource: string
    action: 'C' | 'R' | 'U' | 'D'
    target?: any
  }
  redirectTo?: string
  publicOnly?: boolean // Only allow unauthenticated users
}

export const AuthGuard: React.FC<AuthGuardProps> = ({
  children,
  requireAuth = true,
  requiredRole,
  requiredRoles,
  requiredPermission,
  redirectTo,
  publicOnly = false
}) => {
  const { isAuthenticated, isLoading, getRedirectPath } = useAuth()
  const location = useLocation()

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  // Public only routes (login, register, etc.)
  if (publicOnly && isAuthenticated) {
    const redirect = getRedirectPath()
    return <Navigate to={redirect} replace />
  }

  // Protected routes
  if (requireAuth && !isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  // If authenticated and has role/permission requirements
  if (isAuthenticated && (requiredRole || requiredRoles || requiredPermission)) {
    return (
      <RoleGuard
        requiredRole={requiredRole}
        requiredRoles={requiredRoles}
        requiredPermission={requiredPermission}
      >
        {children}
      </RoleGuard>
    )
  }

  return <>{children}</>
}

// Pre-configured guards for common scenarios
export const AdminGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <AuthGuard requiredRoles={['super_admin', 'hr_admin']}>
    {children}
  </AuthGuard>
)

export const ManagerGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <AuthGuard requiredRoles={['manager', 'hr_admin', 'super_admin']}>
    {children}
  </AuthGuard>
)

export const EmployeeGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <AuthGuard requiredRole="employee">
    {children}
  </AuthGuard>
)

export const PublicOnlyGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <AuthGuard requireAuth={false} publicOnly>
    {children}
  </AuthGuard>
)