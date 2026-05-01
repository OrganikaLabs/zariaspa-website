// src/pages/admin/AdminPanel.tsx
import React from 'react'
import DashboardLayout from '@/components/templates/DashboardLayout'
import { SEO } from '@/components/SEO'
import { Link } from 'react-router-dom'

const AdminPanel = () => {
  return (
    <DashboardLayout>
      <SEO title="Admin — Crextio" description="HR Admin panel for managing employees and jobs." canonicalPath="/admin" />
      <h1 className="text-2xl font-semibold mb-6">Admin Panel</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Link to="/admin/employees" className="rounded-xl border border-border bg-card p-5 shadow-sm hover:shadow-md transition">
          <div className="text-lg font-semibold">Employee Management</div>
          <div className="text-sm text-muted-foreground">Directory, bulk actions</div>
        </Link>
        <Link to="/jobs" className="rounded-xl border border-border bg-card p-5 shadow-sm hover:shadow-md transition">
          <div className="text-lg font-semibold">Job Postings</div>
          <div className="text-sm text-muted-foreground">Create and manage jobs</div>
        </Link>
      </div>
    </DashboardLayout>
  )
}

export default AdminPanel
