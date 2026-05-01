// src/types/components/index.ts
// Component-specific types

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'link';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export interface InputProps {
  type?: 'text' | 'email' | 'password' | 'search' | 'number' | 'tel' | 'url';
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  label?: string;
  helperText?: string;
}

export interface JobCardProps {
  job: Job;
  isBookmarked?: boolean;
  onBookmarkToggle?: (jobId: string) => void;
  onApply?: (jobId: string) => void;
  className?: string;
  showCompanyInfo?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showCloseButton?: boolean;
}

export interface DataTableProps<T> {
  data: T[];
  columns: TableColumn<T>[];
  isLoading?: boolean;
  pagination?: PaginationConfig;
  sorting?: SortingConfig;
  filtering?: FilteringConfig;
  selection?: SelectionConfig<T>;
  actions?: TableAction<T>[];
}

export interface TableColumn<T> {
  key: keyof T;
  title: string;
  sortable?: boolean;
  filterable?: boolean;
  render?: (value: any, record: T) => React.ReactNode;
  width?: string;
}

export interface PaginationConfig {
  page: number;
  limit: number;
  total: number;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
}

export interface SortingConfig {
  field?: string;
  direction?: 'asc' | 'desc';
  onSort: (field: string, direction: 'asc' | 'desc') => void;
}

export interface FilteringConfig {
  filters: Record<string, any>;
  onFilterChange: (filters: Record<string, any>) => void;
}

export interface SelectionConfig<T> {
  selectedItems: T[];
  onSelectionChange: (items: T[]) => void;
  selectable?: (record: T) => boolean;
}

export interface TableAction<T> {
  label: string;
  icon?: string;
  onClick: (record: T) => void;
  disabled?: (record: T) => boolean;
  variant?: 'primary' | 'secondary' | 'danger';
}

export interface NotificationProps {
  notification: Notification;
  onRead?: (id: string) => void;
  onAction?: (actionUrl: string) => void;
  className?: string;
}

export interface AvatarProps {
  src?: string;
  alt?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  fallback?: string;
  online?: boolean;
  className?: string;
}

export interface BadgeProps {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
  pulse?: boolean;
}

export interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit?: (value: string) => void;
  placeholder?: string;
  suggestions?: string[];
  recentSearches?: string[];
  className?: string;
  autoFocus?: boolean;
}

// Import types from API
import type { Job, Notification } from '../api';