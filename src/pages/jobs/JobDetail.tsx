// src/pages/jobs/JobDetail.tsx
import React from 'react'
import PublicLayout from '@/components/templates/PublicLayout'
import { SEO } from '@/components/SEO'
import { useParams } from 'react-router-dom'
import { useGet } from '@/hooks/useApi'
import { Button } from '@/components/atoms/Button'

const JobDetail = () => {
  const { id } = useParams()
  const { data: job } = useGet<any>(['job', id!], `/jobs/${id}`)

  return (
    <PublicLayout>
      <SEO title={`${job?.title ?? 'Job'} — Crextio`} description={job?.description?.slice(0, 150)} canonicalPath={`/jobs/${id}`} />
      <section className="container py-10 grid lg:grid-cols-3 gap-6">
        <aside className="lg:col-span-1 space-y-2">
          <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
            <h3 className="font-semibold mb-2">Company</h3>
            <div className="flex items-center gap-3">
              <img src="/placeholder.svg" className="w-10 h-10 rounded" alt="Company logo" />
              <div>
                <div className="font-medium">TechCorp Inc.</div>
                <div className="text-sm text-muted-foreground">Rating 4.2 • 245 reviews</div>
              </div>
            </div>
          </div>
        </aside>
        <article className="lg:col-span-2 rounded-xl border border-border bg-card p-6 shadow-sm">
          <h1 className="text-2xl font-semibold">{job?.title}</h1>
          <div className="text-sm text-muted-foreground mt-1">{job?.location} • Posted {job?.postedDate}</div>
          <div className="mt-4 prose prose-sm max-w-none">
            <h3>Description</h3>
            <p>{job?.description}</p>
            <h3>Requirements</h3>
            <ul>
              {job?.requirements?.map((r: string) => <li key={r}>{r}</li>)}
            </ul>
            <h3>Benefits</h3>
            <ul>
              {job?.benefits?.map((b: string) => <li key={b}>{b}</li>)}
            </ul>
          </div>
          <Button className="mt-6">Apply now</Button>
        </article>
      </section>
    </PublicLayout>
  )
}

export default JobDetail
