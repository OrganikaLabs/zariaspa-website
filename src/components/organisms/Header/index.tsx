// src/components/organisms/Header/index.tsx
import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/atoms/Button'

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'bg-foreground text-background' : 'text-muted-foreground hover:bg-secondary hover:text-foreground'}`

export const Header = () => {
  const { user, isAuthenticated, logout } = useAuth()
  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-border">
      <div className="container flex items-center justify-between h-16">
        <Link to="/" className="font-semibold tracking-tight text-lg">Crextio</Link>
        <nav className="hidden md:flex items-center gap-1">
          <NavLink to="/jobs" className={navLinkClass}>Jobs</NavLink>
          <NavLink to="/companies" className={navLinkClass}>Companies</NavLink>
          {isAuthenticated && <NavLink to="/dashboard" className={navLinkClass}>Dashboard</NavLink>}
        </nav>
        <div className="flex items-center gap-2">
          {!isAuthenticated ? (
            <Button asChild>
              <Link to="/login">Sign in</Link>
            </Button>
          ) : (
            <>
              <span className="text-sm text-muted-foreground hidden sm:inline">Hi, {user?.firstName ?? user?.email}</span>
              <Button variant="secondary" onClick={logout}>Logout</Button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
