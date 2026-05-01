import React from 'react'
import { 
  Heart, 
  Megaphone, 
  Star, 
  Clock, 
  MapPin, 
  DollarSign, 
  Briefcase,
  Building2,
  Users,
  Calendar,
  Mail,
  Phone,
  Search,
  Filter,
  Bell,
  Settings,
  User,
  LogOut,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  Plus,
  Edit,
  Trash2,
  Eye,
  Download,
  Upload,
  Share2,
  Copy,
  Check,
  AlertCircle,
  Info,
  CheckCircle,
  XCircle,
  ArrowRight,
  ArrowLeft,
  ExternalLink,
  Bookmark,
  BookmarkCheck,
  type LucideIcon
} from 'lucide-react'
import { cn } from '@/lib/utils'

const iconMap = {
  'heart': Heart,
  'heart-filled': Heart,
  'megaphone': Megaphone,
  'star': Star,
  'clock': Clock,
  'map-pin': MapPin,
  'dollar-sign': DollarSign,
  'briefcase': Briefcase,
  'building': Building2,
  'users': Users,
  'calendar': Calendar,
  'mail': Mail,
  'phone': Phone,
  'search': Search,
  'filter': Filter,
  'bell': Bell,
  'settings': Settings,
  'user': User,
  'logout': LogOut,
  'menu': Menu,
  'close': X,
  'chevron-down': ChevronDown,
  'chevron-right': ChevronRight,
  'chevron-left': ChevronLeft,
  'plus': Plus,
  'edit': Edit,
  'trash': Trash2,
  'eye': Eye,
  'download': Download,
  'upload': Upload,
  'share': Share2,
  'copy': Copy,
  'check': Check,
  'alert': AlertCircle,
  'info': Info,
  'check-circle': CheckCircle,
  'x-circle': XCircle,
  'arrow-right': ArrowRight,
  'arrow-left': ArrowLeft,
  'external-link': ExternalLink,
  'bookmark': Bookmark,
  'bookmark-check': BookmarkCheck,
} as const

export type IconName = keyof typeof iconMap

export interface IconProps {
  name: IconName
  size?: number
  className?: string
  filled?: boolean
}

export const Icon: React.FC<IconProps> = ({ 
  name, 
  size = 20, 
  className,
  filled = false,
  ...props 
}) => {
  const IconComponent = iconMap[name] as LucideIcon
  
  if (!IconComponent) {
    console.warn(`Icon "${name}" not found`)
    return null
  }

  return (
    <IconComponent
      size={size}
      className={cn(
        'flex-shrink-0',
        filled && name === 'heart' && 'fill-current',
        filled && name === 'star' && 'fill-current',
        filled && name === 'bookmark' && 'fill-current',
        className
      )}
      {...props}
    />
  )
}