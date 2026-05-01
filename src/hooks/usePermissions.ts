// src/hooks/usePermissions.ts
import { useAuth } from './useAuth'
import { hasPermission as checkPermission, type Role } from '@/services/permissions'

export interface PermissionHookReturn {
  can: (resource: string, action: 'C' | 'R' | 'U' | 'D', target?: any) => boolean
  hasRole: (role: Role) => boolean
  hasAnyRole: (roles: Role[]) => boolean
  hasAllRoles: (roles: Role[]) => boolean
  isAdmin: boolean
  isManager: boolean
  isEmployee: boolean
  isSuperAdmin: boolean
  isHRAdmin: boolean
  isExternalVerifier: boolean
  canManage: (targetUser: { managerId?: string; departmentId?: string }) => boolean
  canView: (resource: string, target?: any) => boolean
  canCreate: (resource: string, target?: any) => boolean
  canUpdate: (resource: string, target?: any) => boolean
  canDelete: (resource: string, target?: any) => boolean
}

export const usePermissions = (): PermissionHookReturn => {
  const { user } = useAuth()

  const can = (resource: string, action: 'C' | 'R' | 'U' | 'D', target?: any): boolean => {
    return checkPermission(user, { resource, action, target })
  }

  const hasRole = (role: Role): boolean => {
    return user?.roles.includes(role) || false
  }

  const hasAnyRole = (roles: Role[]): boolean => {
    return roles.some(role => user?.roles.includes(role)) || false
  }

  const hasAllRoles = (roles: Role[]): boolean => {
    return roles.every(role => user?.roles.includes(role)) || false
  }

  const isAdmin = hasAnyRole(['super_admin', 'hr_admin'])
  const isManager = hasRole('manager') || isAdmin
  const isEmployee = hasRole('employee')
  const isSuperAdmin = hasRole('super_admin')
  const isHRAdmin = hasRole('hr_admin')
  const isExternalVerifier = hasRole('external_verifier')

  const canManage = (targetUser: { managerId?: string; departmentId?: string }): boolean => {
    if (isAdmin) return true
    if (!isManager) return false
    
    // Managers can manage their direct reports
    return targetUser.managerId === user?.id
  }

  const canView = (resource: string, target?: any): boolean => {
    return can(resource, 'R', target)
  }

  const canCreate = (resource: string, target?: any): boolean => {
    return can(resource, 'C', target)
  }

  const canUpdate = (resource: string, target?: any): boolean => {
    return can(resource, 'U', target)
  }

  const canDelete = (resource: string, target?: any): boolean => {
    return can(resource, 'D', target)
  }

  return {
    can,
    hasRole,
    hasAnyRole,
    hasAllRoles,
    isAdmin,
    isManager,
    isEmployee,
    isSuperAdmin,
    isHRAdmin,
    isExternalVerifier,
    canManage,
    canView,
    canCreate,
    canUpdate,
    canDelete
  }
}

// Specific permission hooks for common use cases
export const useEmployeePermissions = () => {
  const permissions = usePermissions()
  const { user } = useAuth()
  
  return {
    ...permissions,
    canViewOwnProfile: () => permissions.canView('employees', { id: user?.id }),
    canUpdateOwnProfile: () => permissions.canUpdate('employees', { id: user?.id }),
    canViewTeamDirectory: () => permissions.canView('employees'),
    canApplyToJobs: () => permissions.canCreate('applications'),
    canRequestLeave: () => permissions.canCreate('leaves'),
    canViewOwnLeaves: () => permissions.canView('leaves', { employeeId: user?.id }),
  }
}

export const useManagerPermissions = () => {
  const permissions = usePermissions()
  
  return {
    ...permissions,
    canApproveLeaves: () => permissions.canUpdate('leaves'),
    canViewTeamLeaves: () => permissions.canView('leaves'),
    canManageDirectReports: () => permissions.canUpdate('employees'),
    canViewTeamPerformance: () => permissions.canView('performance'),
    canCreatePerformanceReviews: () => permissions.canCreate('performance'),
  }
}

export const useHRPermissions = () => {
  const permissions = usePermissions()
  
  return {
    ...permissions,
    canManageAllEmployees: () => permissions.canUpdate('employees'),
    canCreateJobs: () => permissions.canCreate('jobs'),
    canManageJobPostings: () => permissions.canUpdate('jobs'),
    canViewAllLeaves: () => permissions.canView('leaves'),
    canOverrideLeaveApprovals: () => permissions.canUpdate('leaves'),
    canAccessReports: () => permissions.canView('reports'),
    canManageSystemSettings: () => permissions.canUpdate('settings'),
  }
}