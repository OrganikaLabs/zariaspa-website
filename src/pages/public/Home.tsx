// src/pages/public/Home.tsx
import PublicLayout from '@/components/templates/PublicLayout'
import { SEO } from '@/components/SEO'
import { SearchBar } from '@/components/molecules/SearchBar'
import { Button } from '@/components/atoms/Button'
import { Link, useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()
  return (
    <PublicLayout>
      <SEO title="Find your ideal job — Crextio" description="Discover jobs, explore companies, and manage your career with Crextio — an AI-powered HR platform." canonicalPath="/" />
      <section className="container py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-light leading-tight">Find your ideal job</h1>
            <p className="mt-4 text-muted-foreground text-base md:text-lg max-w-prose">A future-proof HRMS for job seekers, employees, managers, and HR admins. Secure, scalable, and delightful.</p>
            <div className="mt-6">
              <SearchBar onSearch={(q) => navigate(`/jobs?q=${encodeURIComponent(q)}`)} />
              <div className="mt-4 flex gap-3">
                <Button asChild><Link to="/jobs">Find a Job</Link></Button>
                <Button variant="secondary" asChild><Link to="/admin">Post a Job</Link></Button>
              </div>
            </div>
            <div className="mt-8 grid grid-cols-3 gap-6 text-center">
              <div className="p-4 rounded-lg border border-border bg-card"><div className="text-2xl font-semibold">8M+</div><div className="text-sm text-muted-foreground">Jobs</div></div>
              <div className="p-4 rounded-lg border border-border bg-card"><div className="text-2xl font-semibold">100K+</div><div className="text-sm text-muted-foreground">Companies</div></div>
              <div className="p-4 rounded-lg border border-border bg-card"><div className="text-2xl font-semibold">10M+</div><div className="text-sm text-muted-foreground">Candidates</div></div>
            </div>
          </div>
          <div className="rounded-2xl bg-card border border-border p-6 shadow-sm">
            <img src="/placeholder.svg" alt="HRMS dashboard preview" className="w-full h-auto rounded-lg" loading="lazy" />
          </div>
        </div>
      </section>
    </PublicLayout>
  )
}

export default Home
