// src/components/SEO.tsx
import { useEffect } from 'react'

interface SEOProps {
  title: string
  description?: string
  canonicalPath?: string
}

export const SEO = ({ title, description, canonicalPath = '/' }: SEOProps) => {
  useEffect(() => {
    document.title = title
    if (description) {
      let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null
      if (!meta) {
        meta = document.createElement('meta')
        meta.setAttribute('name', 'description')
        document.head.appendChild(meta)
      }
      meta.setAttribute('content', description)
    }
    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null
    if (!link) {
      link = document.createElement('link')
      link.setAttribute('rel', 'canonical')
      document.head.appendChild(link)
    }
    link.setAttribute('href', canonicalPath)
  }, [title, description, canonicalPath])

  return null
}
