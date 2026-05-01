// src/pages/employees/EmployeeDirectory.tsx
import React from 'react'
import DashboardLayout from '@/components/templates/DashboardLayout'
import { SEO } from '@/components/SEO'
import { useGet } from '@/hooks/useApi'

const EmployeeDirectory = () => {
  const { data } = useGet<any[]>(['employees'], '/employees')
  return (
    <DashboardLayout>
      <SEO title="Employees — Crextio" description="Browse and manage employees." canonicalPath="/admin/employees" />
      <h1 className="text-2xl font-semibold mb-4">Employees</h1>
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <div className="bg-secondary px-6 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Directory</div>
        <ul>
          {(data ?? []).map(emp => (
            <li key={emp.id} className="px-6 py-4 border-b last:border-0">
              <div className="font-medium">{emp.firstName ?? ''} {emp.lastName ?? ''} <span className="text-sm text-muted-foreground">• {emp.jobTitle ?? 'Employee'}</span></div>
              <div className="text-sm text-muted-foreground">{emp.email}</div>
            </li>
          ))}
        </ul>
      </div>
    </DashboardLayout>
  )
}

export default EmployeeDirectory
