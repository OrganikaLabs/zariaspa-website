// src/components/auth/LoginForm.tsx
import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Separator } from '@/components/ui/separator'
import { Eye, EyeOff, Building2, Mail, Lock, Shield, AlertCircle, CheckCircle2 } from 'lucide-react'
import { toast } from 'sonner'

const loginSchema = z.object({
  companyCode: z.string().min(1, 'Company code is required'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

const mfaSchema = z.object({
  code: z.string().length(6, 'MFA code must be 6 digits'),
})

type LoginFormData = z.infer<typeof loginSchema>
type MfaFormData = z.infer<typeof mfaSchema>

interface LoginFormProps {
  onSuccess?: () => void
  redirectPath?: string
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSuccess }) => {
  const { login, verifyMfa, mfaRequired, isLoading, user } = useAuth()
  const [showPassword, setShowPassword] = React.useState(false)
  const [loginAttempts, setLoginAttempts] = React.useState(0)
  const [isBlocked, setIsBlocked] = React.useState(false)

  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      companyCode: 'CREXTIO',
      email: 'john.doe@example.com',
      password: 'password123'
    }
  })

  const mfaForm = useForm<MfaFormData>({
    resolver: zodResolver(mfaSchema),
    defaultValues: {
      code: ''
    }
  })

  // Block login attempts after 5 failed attempts
  React.useEffect(() => {
    if (loginAttempts >= 5) {
      setIsBlocked(true)
      setTimeout(() => {
        setIsBlocked(false)
        setLoginAttempts(0)
      }, 15 * 60 * 1000) // 15 minutes
    }
  }, [loginAttempts])

  const handleLogin = async (data: LoginFormData) => {
    if (isBlocked) {
      toast.error('Too many failed attempts. Please try again later.')
      return
    }

    try {
      const result = await login(data.email, data.password, data.companyCode)
      
      if (!result.mfaRequired) {
        onSuccess?.()
        toast.success('Welcome back!')
      }
    } catch (error: any) {
      setLoginAttempts(prev => prev + 1)
      
      // Specific error handling
      if (error?.response?.status === 429) {
        toast.error('Too many login attempts. Please try again later.')
        setIsBlocked(true)
      } else if (error?.response?.status === 401) {
        toast.error('Invalid credentials. Please check your email and password.')
      } else if (error?.response?.status === 403) {
        toast.error('Account is locked. Please contact your administrator.')
      } else {
        toast.error('Login failed. Please try again.')
      }
    }
  }

  const handleMfaVerification = async (data: MfaFormData) => {
    try {
      await verifyMfa(data.code)
      onSuccess?.()
      toast.success('Successfully authenticated!')
    } catch (error: any) {
      if (error?.response?.status === 401) {
        toast.error('Invalid MFA code. Please try again.')
      } else if (error?.response?.status === 410) {
        toast.error('MFA code expired. Please log in again.')
        // Reset to login form
        window.location.reload()
      } else {
        toast.error('MFA verification failed. Please try again.')
      }
    }
  }

  const handleResendMfa = async () => {
    try {
      // Implement resend MFA logic
      toast.success('New MFA code sent!')
    } catch (error) {
      toast.error('Failed to resend MFA code.')
    }
  }

  if (mfaRequired) {
    return (
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mb-4">
            <Shield className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <CardTitle className="text-2xl">Verify Your Identity</CardTitle>
          <CardDescription>
            Hi {user?.firstName || 'there'}! Enter the 6-digit code from your authenticator app
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={mfaForm.handleSubmit(handleMfaVerification)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="code">MFA Code</Label>
              <Input
                id="code"
                {...mfaForm.register('code')}
                placeholder="123456"
                className="text-center text-lg tracking-widest"
                maxLength={6}
                autoComplete="one-time-code"
                autoFocus
              />
              {mfaForm.formState.errors.code && (
                <p className="text-sm text-red-600 dark:text-red-400">
                  {mfaForm.formState.errors.code.message}
                </p>
              )}
            </div>

            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Verifying...
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Verify & Continue
                </>
              )}
            </Button>

            <div className="text-center">
              <Button
                type="button"
                variant="link"
                onClick={handleResendMfa}
                className="text-sm"
              >
                Didn't receive a code? Resend
              </Button>
            </div>
          </form>

          <Alert className="mt-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              For demo purposes, use code: <strong>123456</strong>
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Welcome Back</CardTitle>
        <CardDescription>
          Sign in to your HRMS account to continue
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-4">
          {/* Company Code */}
          <div className="space-y-2">
            <Label htmlFor="companyCode">Company Code</Label>
            <div className="relative">
              <Building2 className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="companyCode"
                {...loginForm.register('companyCode')}
                placeholder="Enter company code"
                className="pl-10"
                autoComplete="organization"
              />
            </div>
            {loginForm.formState.errors.companyCode && (
              <p className="text-sm text-red-600 dark:text-red-400">
                {loginForm.formState.errors.companyCode.message}
              </p>
            )}
          </div>

          <Separator />

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="email"
                type="email"
                {...loginForm.register('email')}
                placeholder="Enter your email"
                className="pl-10"
                autoComplete="email"
              />
            </div>
            {loginForm.formState.errors.email && (
              <p className="text-sm text-red-600 dark:text-red-400">
                {loginForm.formState.errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                {...loginForm.register('password')}
                placeholder="Enter your password"
                className="pl-10 pr-10"
                autoComplete="current-password"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-gray-400" />
                ) : (
                  <Eye className="h-4 w-4 text-gray-400" />
                )}
              </Button>
            </div>
            {loginForm.formState.errors.password && (
              <p className="text-sm text-red-600 dark:text-red-400">
                {loginForm.formState.errors.password.message}
              </p>
            )}
          </div>

          {/* Security Warning */}
          {loginAttempts > 2 && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                {5 - loginAttempts} attempts remaining before account is temporarily locked.
              </AlertDescription>
            </Alert>
          )}

          {/* Submit Button */}
          <Button 
            type="submit" 
            className="w-full" 
            disabled={isLoading || isBlocked}
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                Signing in...
              </>
            ) : isBlocked ? (
              'Account temporarily locked'
            ) : (
              'Sign In'
            )}
          </Button>

          {/* Help Links */}
          <div className="flex justify-between text-sm">
            <Button variant="link" className="p-0 h-auto text-sm">
              Forgot password?
            </Button>
            <Button variant="link" className="p-0 h-auto text-sm">
              Need help?
            </Button>
          </div>
        </form>

        {/* Demo Credentials */}
        <Alert className="mt-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            <strong>Demo Credentials:</strong><br />
            Email: john.doe@example.com<br />
            Password: password123<br />
            MFA Code: 123456
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  )
}