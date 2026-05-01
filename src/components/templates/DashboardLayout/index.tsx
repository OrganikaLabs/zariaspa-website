// src/components/templates/DashboardLayout/index.tsx
import React from 'react'
import { Header } from '@/components/organisms/Header'

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container py-6">{children}</main>
    </div>
  )
}

export default DashboardLayout
