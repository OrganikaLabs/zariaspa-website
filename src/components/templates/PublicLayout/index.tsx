// src/components/templates/PublicLayout/index.tsx
import React from 'react'
import { Header } from '@/components/organisms/Header'

const PublicLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-hero-gradient">
      <Header />
      <main className="flex-1">{children}</main>
      <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground">© {new Date().getFullYear()} Crextio</footer>
    </div>
  )
}

export default PublicLayout
