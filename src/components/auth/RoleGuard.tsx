// src/components/auth/RoleGuard.tsx
import React from 'react'
import { useAuth } from '@/hooks/useAuth'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ShieldX, UserX } from 'lucide-react'
import type { Role } from '@/services/permissions'

interface RoleGuardProps {
  children: React.ReactNode
  requiredRole?: Role
  requiredRoles?: Role[]
  requiredPermission?: {
    resource: string
    action: 'C' | 'R' | 'U' | 'D'
    target?: any
  }
  fallback?: React.ReactNode
  showFallback?: boolean
  inline?: boolean
}

const DefaultFallback: React.FC<{ 
  reason: string
  inline?: boolean 
}> = ({ reason, inline = false }) => {
  if (inline) {
    return (
      <Alert variant="destructive">
        <ShieldX className="h-4 w-4" />
        <AlertDescription>{reason}</AlertDescription>
      </Alert>
    )
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <div className="mx-auto w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-4">
          <UserX className="w-6 h-6 text-red-600 dark:text-red-400" />
        </div>
        <CardTitle className="text-lg text-red-800 dark:text-red-200">Access Restricted</CardTitle>
        <CardDescription className="text-gray-600 dark:text-gray-400">
          {reason}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Alert>
          <AlertDescription>
            This content is restricted based on your current role and permissions. 
            Contact your administrator if you need access.
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  )
}

export const RoleGuard: React.FC<RoleGuardProps> = ({
  children,
  requiredRole,
  requiredRoles,
  requiredPermission,
  fallback,
  showFallback = true,
  inline = false
}) => {
  const { user, hasPermission } = useAuth()

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

  // Role check failed
  if (!hasRequiredRole()) {
    if (!showFallback) return null
    
    if (fallback) return <>{fallback}</>
    
    const roleNames = requiredRoles ? requiredRoles.join(', ') : requiredRole
    return (
      <DefaultFallback 
        reason={`This content requires ${roleNames} role access.`}
        inline={inline}
      />
    )
  }

  // Permission check failed
  if (!hasRequiredPermission()) {
    if (!showFallback) return null
    
    if (fallback) return <>{fallback}</>
    
    return (
      <DefaultFallback 
        reason="You don't have permission to access this content."
        inline={inline}
      />
    )
  }

  return <>{children}</>
}

// Component for conditional rendering based on roles
export const ConditionalRender: React.FC<{
  condition: () => boolean
  children: React.ReactNode
  fallback?: React.ReactNode
}> = ({ condition, children, fallback = null }) => {
  return condition() ? <>{children}</> : <>{fallback}</>
}

// HOC for role-based component wrapping
export const withRoleGuard = <P extends object>(
  Component: React.ComponentType<P>,
  requiredRole?: Role,
  requiredRoles?: Role[],
  requiredPermission?: {
    resource: string
    action: 'C' | 'R' | 'U' | 'D'
    target?: any
  }
) => {
  return (props: P) => (
    <RoleGuard
      requiredRole={requiredRole}
      requiredRoles={requiredRoles}
      requiredPermission={requiredPermission}
    >
      <Component {...props} />
    </RoleGuard>
  )
}

// Hook for role-based logic in components
export const useRoleCheck = () => {
  const { user, hasPermission } = useAuth()

  const hasRole = (role: Role) => {
    return user?.roles.includes(role) || false
  }

  const hasAnyRole = (roles: Role[]) => {
    return roles.some(role => user?.roles.includes(role)) || false
  }

  const hasAllRoles = (roles: Role[]) => {
    return roles.every(role => user?.roles.includes(role)) || false
  }

  const can = (resource: string, action: 'C' | 'R' | 'U' | 'D', target?: any) => {
    return hasPermission(resource, action, target)
  }

  const isAdmin = () => {
    return hasAnyRole(['super_admin', 'hr_admin'])
  }

  const isManager = () => {
    return hasRole('manager') || isAdmin()
  }

  const isEmployee = () => {
    return hasRole('employee')
  }

  const canManage = (targetUser: { managerId?: string; departmentId?: string }) => {
    if (isAdmin()) return true
    if (!isManager()) return false
    
    // Managers can manage their direct reports
    return targetUser.managerId === user?.id
  }

  return {
    user,
    hasRole,
    hasAnyRole,
    hasAllRoles,
    can,
    isAdmin,
    isManager,
    isEmployee,
    canManage
  }
}