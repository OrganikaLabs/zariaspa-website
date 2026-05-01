import React from 'react'
import { cn } from '@/lib/utils'

export interface AvatarProps {
  src?: string
  alt?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  fallback?: string
  online?: boolean
}

const sizeClasses = {
  sm: 'w-8 h-8 text-xs',
  md: 'w-12 h-12 text-sm',
  lg: 'w-16 h-16 text-base',
  xl: 'w-20 h-20 text-lg'
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = '',
  size = 'md',
  className,
  fallback,
  online,
  ...props
}) => {
  const [imageError, setImageError] = React.useState(false)
  const [imageLoaded, setImageLoaded] = React.useState(false)

  const handleImageError = () => {
    setImageError(true)
  }

  const handleImageLoad = () => {
    setImageLoaded(true)
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  const showFallback = !src || imageError || !imageLoaded

  return (
    <div className={cn('relative inline-block', className)}>
      <div
        className={cn(
          'rounded-full overflow-hidden bg-gray-100 dark:bg-gray-800 flex items-center justify-center font-medium text-gray-600 dark:text-gray-400 border-2 border-white dark:border-gray-700 shadow-sm',
          sizeClasses[size]
        )}
        {...props}
      >
        {!showFallback ? (
          <img
            src={src}
            alt={alt}
            onError={handleImageError}
            onLoad={handleImageLoad}
            className="w-full h-full object-cover"
          />
        ) : (
          <span>
            {fallback ? getInitials(fallback) : alt ? getInitials(alt) : '??'}
          </span>
        )}
      </div>
      
      {online !== undefined && (
        <div
          className={cn(
            'absolute bottom-0 right-0 rounded-full border-2 border-white dark:border-gray-800',
            size === 'sm' && 'w-2.5 h-2.5',
            size === 'md' && 'w-3 h-3',
            size === 'lg' && 'w-4 h-4',
            size === 'xl' && 'w-5 h-5',
            online ? 'bg-green-500' : 'bg-gray-400'
          )}
        />
      )}
    </div>
  )
}