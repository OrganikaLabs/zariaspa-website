// src/pages/dashboard/EmployeeDashboard.tsx
import DashboardLayout from '@/components/templates/DashboardLayout'
import { SEO } from '@/components/SEO'
import { useGet } from '@/hooks/useApi'
import { Button } from '@/components/atoms/Button'
import { Link } from 'react-router-dom'

const StatCard = ({ title, value }: { title: string; value: string | number }) => (
  <div className="rounded-xl border border-border bg-card p-5 shadow-sm text-center">
    <div className="text-sm text-muted-foreground">{title}</div>
    <div className="text-2xl font-semibold mt-1">{value}</div>
  </div>
)

const EmployeeDashboard = () => {
  const { data: leaves } = useGet<any[]>(['leaves'], '/leaves')
  const { data: jobs } = useGet<any[]>(['jobs'], '/jobs')

  return (
    <DashboardLayout>
      <SEO title="Dashboard — Crextio" description="Your personalized employee dashboard with quick actions and insights." canonicalPath="/dashboard" />
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to Crextio</p>
      </div>
      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        <StatCard title="Upcoming Leaves" value={leaves?.length ?? 0} />
        <StatCard title="Open Jobs" value={jobs?.length ?? 0} />
        <StatCard title="Tasks Due" value={2} />
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
          <h2 className="text-lg font-semibold mb-3">Quick Actions</h2>
          <div className="flex gap-3 flex-wrap">
            <Button asChild><Link to="/leaves/request">Request Leave</Link></Button>
            <Button variant="secondary" asChild><Link to="/benefits">View Benefits</Link></Button>
            <Button variant="secondary" asChild><Link to="/learning">Access Learning</Link></Button>
          </div>
        </div>
        <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
          <h2 className="text-lg font-semibold mb-3">Recommended Jobs</h2>
          <ul className="space-y-2">
            {jobs?.slice(0, 3).map((j) => (
              <li key={j.id} className="flex items-center justify-between py-2 border-b last:border-0">
                <div>
                  <div className="font-medium">{j.title}</div>
                  <div className="text-sm text-muted-foreground">{j.location} • {j.postedDate}</div>
                </div>
                <Button asChild><Link to={`/jobs/${j.id}`}>View</Link></Button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default EmployeeDashboard
