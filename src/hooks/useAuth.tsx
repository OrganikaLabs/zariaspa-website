// src/hooks/useAuth.ts
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { apiClient } from '@/services/api/client'
import { api, setAuthToken } from '@/services/api'
import { hasPermission, type PermissionRequest, type Role } from '@/services/permissions'
import { STORAGE_KEYS } from '@/config/api'
import { toast } from 'sonner'

export interface User {
  id: string
  email: string
  firstName?: string
  lastName?: string
  roles: Role[]
  departmentId?: string
  managerId?: string
  avatar?: string
  preferences?: {
    theme: 'light' | 'dark' | 'system'
    notifications: {
      email: boolean
      push: boolean
      sms: boolean
    }
  }
  lastActive: string
  timezone: string
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  mfaRequired: boolean
  tempToken: string | null
  sessionExpiry: number | null
}

interface AuthContext extends AuthState {
  login: (email: string, password: string, companyCode?: string) => Promise<{ mfaRequired: boolean }>
  verifyMfa: (code: string) => Promise<void>
  logout: () => Promise<void>
  refreshToken: () => Promise<void>
  hasPermission: (resource: string, action: PermissionRequest['action'], target?: any) => boolean
  updateProfile: (data: Partial<User>) => Promise<void>
  changePassword: (currentPassword: string, newPassword: string) => Promise<void>
  resetPassword: (email: string) => Promise<void>
  getRedirectPath: () => string
}

const AuthCtx = React.createContext<AuthContext | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = React.useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    mfaRequired: false,
    tempToken: null,
    sessionExpiry: null
  })
  
  const navigate = useNavigate()

  // Initialize authentication state
  React.useEffect(() => {
    initializeAuth()
  }, [])

  // Session expiry monitoring
  React.useEffect(() => {
    if (authState.sessionExpiry) {
      const timeToExpiry = authState.sessionExpiry - Date.now()
      if (timeToExpiry > 0) {
        // Warn user 5 minutes before expiry
        const warningTime = Math.max(0, timeToExpiry - 5 * 60 * 1000)
        setTimeout(() => {
          toast.warning('Your session will expire in 5 minutes', {
            action: {
              label: 'Extend Session',
              onClick: refreshToken
            }
          })
        }, warningTime)
        
        // Auto logout at expiry
        setTimeout(() => {
          logout()
          toast.error('Session expired. Please log in again.')
        }, timeToExpiry)
      }
    }
  }, [authState.sessionExpiry])

  const initializeAuth = async () => {
    try {
      const storedSession = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN)
      if (storedSession) {
        // Verify token is still valid
        const userResponse = await apiClient.get<User>('/auth/me')
        const userData = userResponse
        
        setAuthState(prev => ({
          ...prev,
          user: userData,
          isAuthenticated: true,
          isLoading: false,
          sessionExpiry: Date.now() + 8 * 60 * 60 * 1000 // 8 hours default
        }))
        
        setAuthToken(storedSession)
      } else {
        setAuthState(prev => ({ ...prev, isLoading: false }))
      }
    } catch (error) {
      // Token invalid, clear storage
      apiClient.clearAuthData()
      setAuthState(prev => ({ ...prev, isLoading: false }))
    }
  }

  const login = async (email: string, password: string, companyCode?: string) => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true }))
      
      const response = await api.post('/auth/login', { 
        email, 
        password, 
        companyCode 
      })
      
      const { data } = response
      
      if (data.mfaRequired) {
        setAuthState(prev => ({
          ...prev,
          mfaRequired: true,
          tempToken: data.tempToken,
          user: data.userPreview,
          isLoading: false
        }))
        return { mfaRequired: true }
      } else {
        // Direct login without MFA
        handleSuccessfulAuth(data)
        return { mfaRequired: false }
      }
    } catch (error: any) {
      setAuthState(prev => ({ ...prev, isLoading: false }))
      const message = error?.response?.data?.message || 'Login failed'
      toast.error(message)
      throw error
    }
  }

  const verifyMfa = async (code: string) => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true }))
      
      const response = await api.post('/auth/mfa/verify', { 
        code, 
        tempToken: authState.tempToken 
      })
      
      handleSuccessfulAuth(response.data)
      toast.success('Successfully authenticated!')
    } catch (error: any) {
      setAuthState(prev => ({ ...prev, isLoading: false }))
      const message = error?.response?.data?.message || 'MFA verification failed'
      toast.error(message)
      throw error
    }
  }

  const handleSuccessfulAuth = (data: any) => {
    const { token, refreshToken: refresh, user, expiresIn } = data
    const sessionExpiry = Date.now() + (expiresIn * 1000)
    
    // Store tokens
    apiClient.setAuthToken(token)
    localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refresh)
    localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(user))
    
    setAuthState({
      user,
      isAuthenticated: true,
      isLoading: false,
      mfaRequired: false,
      tempToken: null,
      sessionExpiry
    })
    
    // Navigate to appropriate dashboard
    const redirectPath = getRedirectPath(user.roles)
    navigate(redirectPath)
  }

  const logout = async () => {
    try {
      // Notify server of logout
      await api.post('/auth/logout')
    } catch (error) {
      // Continue with logout even if server call fails
    } finally {
      // Clear all auth data
      apiClient.clearAuthData()
      setAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        mfaRequired: false,
        tempToken: null,
        sessionExpiry: null
      })
      navigate('/login')
      toast.success('Successfully logged out')
    }
  }

  const refreshToken = async () => {
    try {
      const refreshToken = localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN)
      if (!refreshToken) throw new Error('No refresh token available')
      
      const response = await api.post('/auth/refresh', { refreshToken })
      const { token, expiresIn } = response.data
      
      apiClient.setAuthToken(token)
      setAuthState(prev => ({
        ...prev,
        sessionExpiry: Date.now() + (expiresIn * 1000)
      }))
    } catch (error) {
      logout()
      throw error
    }
  }

  const updateProfile = async (profileData: Partial<User>) => {
    try {
      const response = await apiClient.put<User>('/auth/profile', profileData)
      setAuthState(prev => ({
        ...prev,
        user: prev.user ? { ...prev.user, ...response } : null
      }))
      localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(authState.user))
      toast.success('Profile updated successfully')
    } catch (error: any) {
      const message = error?.response?.data?.message || 'Failed to update profile'
      toast.error(message)
      throw error
    }
  }

  const changePassword = async (currentPassword: string, newPassword: string) => {
    try {
      await apiClient.post('/auth/change-password', {
        currentPassword,
        newPassword
      })
      toast.success('Password changed successfully')
    } catch (error: any) {
      const message = error?.response?.data?.message || 'Failed to change password'
      toast.error(message)
      throw error
    }
  }

  const resetPassword = async (email: string) => {
    try {
      await api.post('/auth/forgot-password', { email })
      toast.success('Password reset instructions sent to your email')
    } catch (error: any) {
      const message = error?.response?.data?.message || 'Failed to send reset email'
      toast.error(message)
      throw error
    }
  }

  const getRedirectPath = (roles?: Role[]) => {
    if (!roles || roles.length === 0) return '/dashboard'
    
    // Redirect based on highest privilege role
    if (roles.includes('super_admin')) return '/admin'
    if (roles.includes('hr_admin')) return '/hr-dashboard'
    if (roles.includes('manager')) return '/manager-dashboard'
    if (roles.includes('external_verifier')) return '/verifier-portal'
    return '/dashboard'
  }

  const hasPerm = (resource: string, action: PermissionRequest['action'], target?: any) =>
    hasPermission(authState.user, { resource, action, target })

  const contextValue: AuthContext = {
    ...authState,
    login,
    verifyMfa,
    logout,
    refreshToken,
    hasPermission: hasPerm,
    updateProfile,
    changePassword,
    resetPassword,
    getRedirectPath
  }

  return (
    <AuthCtx.Provider value={contextValue}>
      {children}
    </AuthCtx.Provider>
  )
}

export const useAuth = () => {
  const ctx = React.useContext(AuthCtx)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
