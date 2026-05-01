// src/pages/auth/Login.tsx
import React from 'react'
import { useLocation, Navigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { LoginForm } from '@/components/auth/LoginForm'
import { SEO } from '@/components/SEO'
import { Card, CardContent } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Info } from 'lucide-react'

const Login = () => {
  const { isAuthenticated, isLoading } = useAuth()
  const location = useLocation()
  
  // Get the intended destination from navigation state
  const from = location.state?.from?.pathname || '/dashboard'
  
  // Show loading spinner while checking auth state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  // Redirect if already authenticated
  if (isAuthenticated) {
    return <Navigate to={from} replace />
  }

  const handleLoginSuccess = () => {
    // Navigation is handled by the auth provider
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <SEO 
        title="Sign in — Crextio HRMS" 
        description="Secure sign in with multi-factor authentication to access your Crextio HRMS dashboard." 
        canonicalPath="/login" 
      />
      
      <div className="w-full max-w-md space-y-6">
        {/* System Status Alert */}
        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription>
            This is a demo environment. All data is simulated for demonstration purposes.
          </AlertDescription>
        </Alert>

        {/* Login Form */}
        <LoginForm onSuccess={handleLoginSuccess} />

        {/* Additional Help */}
        <Card>
          <CardContent className="pt-6">
            <div className="text-center space-y-2">
              <h3 className="font-medium text-sm">Need Help?</h3>
              <div className="text-xs text-muted-foreground space-y-1">
                <p>Contact your system administrator</p>
                <p>or email support@crextio.com</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Login
