// src/services/permissions.ts
export type Role = 'employee' | 'manager' | 'hr_admin' | 'super_admin' | 'external_verifier'

export interface UserLike {
  id: string
  roles: Role[]
  departmentId?: string
  managerId?: string
}

export interface PermissionRequest {
  resource: string
  action: 'C' | 'R' | 'U' | 'D'
  target?: any
}

export const hasPermission = (user: UserLike | null, perm?: PermissionRequest, requiredRole?: Role) => {
  if (!user) return false
  if (requiredRole && !user.roles.includes(requiredRole)) return false
  if (!perm) return true

  const is = (r: Role) => user.roles.includes(r)

  // Simple RBAC with limited ABAC examples
  switch (perm.resource) {
    case 'dashboard':
      return is('employee') || is('manager') || is('hr_admin') || is('super_admin')
    case 'employees':
      if (perm.action === 'R') {
        return is('manager') || is('hr_admin') || is('super_admin')
      }
      if (perm.action === 'U' || perm.action === 'D' || perm.action === 'C') {
        return is('hr_admin') || is('super_admin')
      }
      return false
    case 'jobs':
      // Public read
      if (perm.action === 'R') return true
      // Create/update by HR/Admin
      return is('hr_admin') || is('super_admin')
    case 'leaves':
      if (perm.action === 'C') return is('employee') || is('manager') || is('hr_admin')
      if (perm.action === 'U') return is('manager') || is('hr_admin')
      if (perm.action === 'R') return is('employee') || is('manager') || is('hr_admin')
      return false
    default:
      return false
  }
}
