// src/mock-api/handlers.ts
import { http, HttpResponse } from 'msw'
import { employees, jobs, leaves, credentials, performanceReviews, companies, departments, bookmarks, notifications, activities } from './data'

// In-memory stores (allow simple mutation during session)
let EMPLOYEES = [...employees]
let JOBS = [...jobs]
let LEAVES = [...leaves]
let CREDENTIALS = [...credentials]
let PERFORMANCE = [...performanceReviews]
let COMPANIES = [...companies]
let DEPARTMENTS = [...departments]
let BOOKMARKS = [...bookmarks]
let NOTIFICATIONS = [...notifications]
let ACTIVITIES = [...activities]

const json = (data: any, init?: any) => HttpResponse.json(data, init)

export const handlers = [
  // Auth (mocked)
  http.post('/api/auth/login', async ({ request }) => {
    const body = await request.json() as any
    const user = EMPLOYEES.find(e => e.email === body.email)
    if (!user) {
      return json({ message: 'Invalid credentials' }, { status: 401 })
    }
    return json({ mfaRequired: true, tempToken: 'temp-token', user: { ...user } })
  }),
  http.post('/api/auth/mfa/verify', async ({ request }) => {
    const body = await request.json() as any
    if (!body?.code || String(body.code) !== '123456') {
      return json({ message: 'Invalid MFA code' }, { status: 401 })
    }
    // In a real app, tempToken validation would be required.
    return json({ token: 'session-token', success: true })
  }),

  // Employees
  http.get('/api/employees', () => json(EMPLOYEES)),
  http.get('/api/employees/:id', ({ params }) => {
    const emp = EMPLOYEES.find(e => e.id === params.id)
    if (!emp) return json({ message: 'Not found' }, { status: 404 })
    return json(emp)
  }),
  http.post('/api/employees', async ({ request }) => {
    const body = await request.json() as any
    const newEmp = { id: `uuid${Date.now()}`, ...body }
    EMPLOYEES.push(newEmp)
    return json(newEmp, { status: 201 })
  }),
  http.put('/api/employees/:id', async ({ params, request }) => {
    const body = await request.json() as any
    const idx = EMPLOYEES.findIndex(e => e.id === params.id)
    if (idx === -1) return json({ message: 'Not found' }, { status: 404 })
    EMPLOYEES[idx] = { ...EMPLOYEES[idx], ...body }
    return json(EMPLOYEES[idx])
  }),

  // Jobs
  http.get('/api/jobs', () => json(JOBS)),
  http.get('/api/jobs/:id', ({ params }) => {
    const job = JOBS.find(j => j.id === params.id)
    if (!job) return json({ message: 'Not found' }, { status: 404 })
    return json(job)
  }),
  http.post('/api/jobs', async ({ request }) => {
    const body = await request.json() as any
    const newJob = { id: `job${Date.now()}`, ...body }
    JOBS.push(newJob)
    return json(newJob, { status: 201 })
  }),

  // Leaves
  http.get('/api/leaves', () => json(LEAVES)),
  http.post('/api/leaves', async ({ request }) => {
    const body = await request.json() as any
    const newLeave = { id: `leave${Date.now()}`, ...body }
    LEAVES.push(newLeave)
    return json(newLeave, { status: 201 })
  }),
  http.put('/api/leaves/:id', async ({ params, request }) => {
    const body = await request.json() as any
    const idx = LEAVES.findIndex(l => l.id === params.id)
    if (idx === -1) return json({ message: 'Not found' }, { status: 404 })
    LEAVES[idx] = { ...LEAVES[idx], ...body }
    return json(LEAVES[idx])
  }),

  // Credentials
  http.get('/api/credentials', () => json(CREDENTIALS)),
  http.post('/api/credentials', async ({ request }) => {
    const body = await request.json() as any
    const newCred = { id: `cred${Date.now()}`, ...body }
    CREDENTIALS.push(newCred)
    return json(newCred, { status: 201 })
  }),

  // Performance reviews
  http.get('/api/performance-reviews', () => json(PERFORMANCE)),
  http.post('/api/performance-reviews', async ({ request }) => {
    const body = await request.json() as any
    const newPr = { id: `pr${Date.now()}`, ...body }
    PERFORMANCE.push(newPr)
    return json(newPr, { status: 201 })
  }),

  // Companies
  http.get('/api/companies', () => json(COMPANIES)),

  // Departments
  http.get('/api/departments', () => json(DEPARTMENTS)),

  // Bookmarks
  http.get('/api/jobs/bookmarks', ({ request }) => {
    const url = new URL(request.url)
    const userId = url.searchParams.get('userId') || 'uuid1' // Default for demo
    const userBookmarks = BOOKMARKS.filter(b => b.userId === userId)
    return json(userBookmarks)
  }),
  http.post('/api/jobs/bookmarks', async ({ request }) => {
    const body = await request.json() as any
    const newBookmark = { 
      id: `bookmark${Date.now()}`, 
      userId: 'uuid1', // Default for demo
      jobId: body.jobId,
      bookmarkedAt: new Date().toISOString()
    }
    BOOKMARKS.push(newBookmark)
    return json(newBookmark, { status: 201 })
  }),
  http.delete('/api/jobs/bookmarks/:id', ({ params }) => {
    const idx = BOOKMARKS.findIndex(b => b.id === params.id)
    if (idx === -1) return json({ message: 'Not found' }, { status: 404 })
    BOOKMARKS.splice(idx, 1)
    return json({ message: 'Bookmark removed successfully' })
  }),

  // Notifications
  http.get('/api/notifications', ({ request }) => {
    const url = new URL(request.url)
    const userId = url.searchParams.get('userId') || 'uuid1'
    const userNotifications = NOTIFICATIONS.filter(n => n.userId === userId)
    return json(userNotifications)
  }),
  http.patch('/api/notifications/:id/read', ({ params }) => {
    const idx = NOTIFICATIONS.findIndex(n => n.id === params.id)
    if (idx === -1) return json({ message: 'Not found' }, { status: 404 })
    NOTIFICATIONS[idx].read = true
    return json(NOTIFICATIONS[idx])
  }),

  // Activities
  http.get('/api/activities/feed', ({ request }) => {
    const url = new URL(request.url)
    const limit = parseInt(url.searchParams.get('limit') || '10')
    const offset = parseInt(url.searchParams.get('offset') || '0')
    const paginatedActivities = ACTIVITIES.slice(offset, offset + limit)
    return json(paginatedActivities)
  }),

  // Enhanced job search
  http.get('/api/jobs/search', ({ request }) => {
    const url = new URL(request.url)
    const query = url.searchParams.get('q')?.toLowerCase() || ''
    const location = url.searchParams.get('location')?.toLowerCase() || ''
    const salaryMin = parseInt(url.searchParams.get('salary_min') || '0')
    const salaryMax = parseInt(url.searchParams.get('salary_max') || '999999')
    
    let filteredJobs = JOBS.filter(job => {
      const titleMatch = job.title.toLowerCase().includes(query)
      const descMatch = job.description.toLowerCase().includes(query)
      const locationMatch = job.location.toLowerCase().includes(location)
      const salaryMatch = job.salaryRange.min >= salaryMin && job.salaryRange.max <= salaryMax
      
      return (titleMatch || descMatch) && locationMatch && salaryMatch
    })
    
    // Add facets for filtering
    const facets = {
      companies: [...new Set(filteredJobs.map(j => j.company.name))].map(name => ({
        name,
        count: filteredJobs.filter(j => j.company.name === name).length
      })),
      locations: [...new Set(filteredJobs.map(j => j.location))].map(location => ({
        name: location,
        count: filteredJobs.filter(j => j.location === location).length
      })),
      skills: [...new Set(filteredJobs.flatMap(j => j.tags))].map(skill => ({
        name: skill,
        count: filteredJobs.filter(j => j.tags.includes(skill)).length
      }))
    }
    
    return json({
      jobs: filteredJobs,
      totalCount: filteredJobs.length,
      facets
    })
  }),
]
