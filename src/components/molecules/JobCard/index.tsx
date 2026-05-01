import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/atoms/Button'
import { Badge } from '@/components/atoms/Badge'
import { Icon } from '@/components/atoms/Icon'
import { Avatar } from '@/components/atoms/Avatar'
import { Tooltip } from '@/components/atoms/Tooltip'
import { cn } from '@/lib/utils'
import { useAuth } from '@/hooks/useAuth'

export interface Job {
  id: string
  title: string
  description: string
  location: string
  salaryRange: {
    min: number
    max: number
  }
  company: {
    name: string
    logo: string
    rating: number
  }
  postedDate: string
  isSponsored?: boolean
  isFeatured?: boolean
  urgency?: 'low' | 'medium' | 'high'
  workType: string
  employment_type: string
  matchPercentage?: number
  viewCount?: number
  applicationCount?: number
  tags?: string[]
  applicationDeadline?: string
}

export interface JobCardProps {
  job: Job
  isBookmarked?: boolean
  onBookmarkToggle?: (jobId: string) => void
  onApply?: (jobId: string) => void
  className?: string
  variant?: 'default' | 'compact'
}

export const JobCard: React.FC<JobCardProps> = ({
  job,
  isBookmarked = false,
  onBookmarkToggle,
  onApply,
  className,
  variant = 'default'
}) => {
  const { isAuthenticated } = useAuth()
  const [bookmarked, setBookmarked] = useState(isBookmarked)
  const [isHovering, setIsHovering] = useState(false)

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (!isAuthenticated) return
    
    setBookmarked(!bookmarked)
    onBookmarkToggle?.(job.id)
  }

  const formatSalary = (min: number, max: number) => {
    return `$${(min / 1000).toFixed(0)}k - $${(max / 1000).toFixed(0)}k`
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays === 1) return '1 day ago'
    if (diffDays < 7) return `${diffDays} days ago`
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`
    return `${Math.ceil(diffDays / 30)} months ago`
  }

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'danger'
      case 'medium': return 'warning'
      case 'low': return 'info'
      default: return 'neutral'
    }
  }

  return (
    <div
      className={cn(
        'group relative bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 transition-all duration-200 hover:shadow-lg hover:shadow-gray-900/5 hover:-translate-y-1',
        variant === 'compact' && 'p-4',
        className
      )}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-start space-x-3 flex-1">
          <Avatar 
            src={job.company.logo} 
            alt={job.company.name}
            size={variant === 'compact' ? 'sm' : 'md'}
            fallback={job.company.name}
          />
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg text-gray-900 dark:text-white line-clamp-2 mb-1">
              <Link 
                to={`/jobs/${job.id}`}
                className="hover:text-primary transition-colors"
              >
                {job.title}
              </Link>
            </h3>
            <div className="flex items-center space-x-2">
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {job.company.name}
              </p>
              {job.company.rating && (
                <div className="flex items-center text-xs text-gray-500">
                  <Icon name="star" size={12} className="mr-1 fill-yellow-400 text-yellow-400" />
                  {job.company.rating}
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex items-center space-x-2 ml-2">
          {/* Match Percentage */}
          {job.matchPercentage && isAuthenticated && (
            <Tooltip content="Job match percentage based on your profile">
              <Badge 
                variant={job.matchPercentage >= 80 ? 'success' : job.matchPercentage >= 60 ? 'warning' : 'neutral'}
                size="sm"
              >
                {job.matchPercentage}% match
              </Badge>
            </Tooltip>
          )}
          
          {/* Bookmark Toggle */}
          {isAuthenticated && (
            <Tooltip content={bookmarked ? "Remove from bookmarks" : "Bookmark job"}>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBookmarkClick}
                className={cn(
                  'h-8 w-8 p-0 transition-all duration-200',
                  bookmarked ? 'text-red-500 hover:text-red-600' : 'text-gray-400 hover:text-red-500'
                )}
              >
                <Icon 
                  name={bookmarked ? "heart" : "heart"} 
                  size={16}
                  filled={bookmarked}
                  className="transition-all duration-200"
                />
              </Button>
            </Tooltip>
          )}
        </div>
      </div>

      {/* Status Indicators */}
      <div className="flex items-center space-x-2 mb-4 flex-wrap gap-1">
        {job.isSponsored && (
          <Badge variant="info" size="sm">
            <Icon name="megaphone" size={12} className="mr-1" />
            Sponsored
          </Badge>
        )}
        
        {job.isFeatured && (
          <Badge variant="warning" size="sm">
            <Icon name="star" size={12} className="mr-1" />
            Featured
          </Badge>
        )}
        
        {job.urgency && job.urgency !== 'low' && (
          <Badge variant={getUrgencyColor(job.urgency)} size="sm">
            <Icon name="clock" size={12} className="mr-1" />
            {job.urgency === 'high' ? 'Urgent' : 'Priority'}
          </Badge>
        )}
      </div>

      {/* Job Details */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
          <Icon name="map-pin" size={14} className="mr-2 flex-shrink-0" />
          <span className="truncate">{job.location}</span>
          <span className="mx-2">•</span>
          <span className="text-xs capitalize">{job.workType}</span>
        </div>
        
        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
          <Icon name="dollar-sign" size={14} className="mr-2 flex-shrink-0" />
          <span>{formatSalary(job.salaryRange.min, job.salaryRange.max)}</span>
        </div>
        
        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
          <Icon name="briefcase" size={14} className="mr-2 flex-shrink-0" />
          <span className="capitalize">{job.employment_type.replace('_', ' ')}</span>
          <span className="mx-2">•</span>
          <span className="text-xs">{formatDate(job.postedDate)}</span>
        </div>
      </div>

      {/* Description */}
      {variant !== 'compact' && (
        <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2 mb-4">
          {job.description}
        </p>
      )}

      {/* Tags */}
      {job.tags && job.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-4">
          {job.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="outline" size="sm">
              {tag}
            </Badge>
          ))}
          {job.tags.length > 3 && (
            <Badge variant="outline" size="sm">
              +{job.tags.length - 3} more
            </Badge>
          )}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
        <div className="flex items-center space-x-4 text-xs text-gray-500">
          {job.viewCount && (
            <div className="flex items-center">
              <Icon name="eye" size={12} className="mr-1" />
              {job.viewCount.toLocaleString()} views
            </div>
          )}
          {job.applicationCount && (
            <div className="flex items-center">
              <Icon name="users" size={12} className="mr-1" />
              {job.applicationCount} applicants
            </div>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" asChild>
            <Link to={`/jobs/${job.id}`}>
              View Details
            </Link>
          </Button>
          
          {isAuthenticated && (
            <Button 
              size="sm"
              onClick={() => onApply?.(job.id)}
              className="shadow-sm"
            >
              Apply Now
            </Button>
          )}
        </div>
      </div>

      {/* Application Deadline */}
      {job.applicationDeadline && (
        <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
          <div className="flex items-center text-xs text-orange-600 dark:text-orange-400">
            <Icon name="clock" size={12} className="mr-1" />
            Application deadline: {new Date(job.applicationDeadline).toLocaleDateString()}
          </div>
        </div>
      )}
    </div>
  )
}