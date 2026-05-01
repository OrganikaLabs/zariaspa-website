// src/pages/jobs/JobsList.tsx
import React, { useState } from 'react'
import PublicLayout from '@/components/templates/PublicLayout'
import { SEO } from '@/components/SEO'
import { useGet } from '@/hooks/useApi'
import { useSearchParams } from 'react-router-dom'
import { JobCard, type Job } from '@/components/molecules/JobCard'
import { useBookmarks } from '@/hooks/useBookmarks'
import { SearchBar } from '@/components/molecules/SearchBar'
import { Icon } from '@/components/atoms/Icon'
import { Badge } from '@/components/atoms/Badge'
import { Button } from '@/components/atoms/Button'

const JobsList = () => {
  const { data: jobs = [] } = useGet<Job[]>(['jobs'], '/jobs')
  const { bookmarks, toggleBookmark, isBookmarked } = useBookmarks()
  const [params, setSearchParams] = useSearchParams()
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])
  
  const searchQuery = params.get('q')?.toLowerCase() || ''
  const locationFilter = params.get('location')?.toLowerCase() || ''
  
  // Filter jobs based on search parameters
  const filteredJobs = jobs.filter(job => {
    const titleMatch = job.title.toLowerCase().includes(searchQuery)
    const descriptionMatch = job.description.toLowerCase().includes(searchQuery)
    const locationMatch = !locationFilter || job.location.toLowerCase().includes(locationFilter)
    const companyMatch = job.company.name.toLowerCase().includes(searchQuery)
    
    return (titleMatch || descriptionMatch || companyMatch) && locationMatch
  })

  const handleSearch = (query: string) => {
    if (query) {
      setSearchParams(prev => {
        prev.set('q', query)
        return prev
      })
    } else {
      setSearchParams(prev => {
        prev.delete('q')
        return prev
      })
    }
  }

  const handleApply = (jobId: string) => {
    // Handle job application
    console.log('Apply to job:', jobId)
  }

  // Get unique values for filters
  const uniqueLocations = [...new Set(jobs.map(job => job.location))]
  const uniqueCompanies = [...new Set(jobs.map(job => job.company.name))]
  const uniqueTags = [...new Set(jobs.flatMap(job => job.tags || []))]

  return (
    <PublicLayout>
      <SEO 
        title="Jobs — Crextio" 
        description="Browse open positions and find the right role for you. Discover opportunities at top companies." 
        canonicalPath="/jobs" 
      />
      
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Find Your Dream Job
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Discover {jobs.length} open positions from top companies
            </p>
          </div>

          {/* Search and Filters */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-8 shadow-sm">
            <div className="flex flex-col lg:flex-row gap-4 mb-4">
              <div className="flex-1">
                <SearchBar
                  placeholder="Search jobs, companies, or skills..."
                  onChange={handleSearch}
                  className="w-full"
                />
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm">
                  <Icon name="filter" size={16} className="mr-2" />
                  Filters
                </Button>
                <Button variant="ghost" size="sm">
                  <Icon name="settings" size={16} className="mr-2" />
                  Sort
                </Button>
              </div>
            </div>

            {/* Quick Filters */}
            <div className="flex flex-wrap gap-2">
              <Badge 
                variant="outline" 
                className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
              >
                Remote
              </Badge>
              <Badge 
                variant="outline" 
                className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
              >
                Full-time
              </Badge>
              <Badge 
                variant="outline" 
                className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
              >
                Senior Level
              </Badge>
              <Badge 
                variant="outline" 
                className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
              >
                Tech
              </Badge>
            </div>
          </div>

          {/* Results Summary */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-gray-600 dark:text-gray-400">
              Showing {filteredJobs.length} of {jobs.length} jobs
              {searchQuery && (
                <span> for "<span className="font-medium text-gray-900 dark:text-white">{searchQuery}</span>"</span>
              )}
            </p>
            
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>Sort by:</span>
              <select className="border border-gray-200 dark:border-gray-700 rounded-md px-2 py-1 text-sm bg-white dark:bg-gray-800">
                <option>Relevance</option>
                <option>Date Posted</option>
                <option>Salary (High to Low)</option>
                <option>Salary (Low to High)</option>
                <option>Company Name</option>
              </select>
            </div>
          </div>

          {/* Job Cards Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                isBookmarked={isBookmarked(job.id)}
                onBookmarkToggle={toggleBookmark}
                onApply={handleApply}
                className="h-full"
              />
            ))}
          </div>

          {/* Empty State */}
          {filteredJobs.length === 0 && (
            <div className="text-center py-12">
              <div className="mb-4">
                <Icon name="search" size={48} className="mx-auto text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No jobs found
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Try adjusting your search criteria or browse all available positions.
              </p>
              <Button 
                variant="ghost" 
                onClick={() => {
                  setSearchParams({})
                }}
              >
                Clear filters
              </Button>
            </div>
          )}

          {/* Load More */}
          {filteredJobs.length > 0 && filteredJobs.length % 12 === 0 && (
            <div className="text-center mt-8">
              <Button variant="outline">
                Load More Jobs
              </Button>
            </div>
          )}
        </div>
      </div>
    </PublicLayout>
  )
}

export default JobsList
