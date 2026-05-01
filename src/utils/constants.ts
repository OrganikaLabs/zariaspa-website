// src/utils/constants.ts
// Application constants and enums

export const APP_NAME = 'HRMS Pro';
export const APP_VERSION = '1.0.0';
export const APP_DESCRIPTION = 'Advanced Human Resources Management System';

// User roles
export const USER_ROLES = {
  EMPLOYEE: 'employee',
  MANAGER: 'manager',
  HR_ADMIN: 'hr_admin',
  SUPER_ADMIN: 'super_admin',
  EXTERNAL_VERIFIER: 'external_verifier',
} as const;

// Employment status
export const EMPLOYMENT_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  TERMINATED: 'terminated',
  ON_LEAVE: 'on_leave',
} as const;

// Job status
export const JOB_STATUS = {
  OPEN: 'open',
  CLOSED: 'closed',
  DRAFT: 'draft',
  PAUSED: 'paused',
} as const;

// Work types
export const WORK_TYPES = {
  REMOTE: 'remote',
  ON_SITE: 'on-site',
  HYBRID: 'hybrid',
} as const;

// Employment types
export const EMPLOYMENT_TYPES = {
  FULL_TIME: 'full_time',
  PART_TIME: 'part_time',
  CONTRACT: 'contract',
  INTERN: 'intern',
} as const;

// Experience levels
export const EXPERIENCE_LEVELS = {
  ENTRY: 'entry',
  MID: 'mid',
  SENIOR: 'senior',
  EXECUTIVE: 'executive',
} as const;

// Leave types
export const LEAVE_TYPES = {
  VACATION: 'vacation',
  SICK: 'sick',
  PERSONAL: 'personal',
  MATERNITY: 'maternity',
  PATERNITY: 'paternity',
  BEREAVEMENT: 'bereavement',
} as const;

// Leave status
export const LEAVE_STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  CANCELLED: 'cancelled',
} as const;

// Notification types
export const NOTIFICATION_TYPES = {
  LEAVE_APPROVED: 'leave_approved',
  LEAVE_REJECTED: 'leave_rejected',
  PERFORMANCE_REVIEW: 'performance_review',
  JOB_MATCH: 'job_match',
  SYSTEM_UPDATE: 'system_update',
  DOCUMENT_REQUIRED: 'document_required',
  TRAINING_DUE: 'training_due',
} as const;

// Priority levels
export const PRIORITY_LEVELS = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
} as const;

// Activity types
export const ACTIVITY_TYPES = {
  EMPLOYEE_JOINED: 'employee_joined',
  LEAVE_APPROVED: 'leave_approved',
  PERFORMANCE_REVIEW_COMPLETED: 'performance_review_completed',
  CREDENTIAL_VERIFIED: 'credential_verified',
  TRAINING_COMPLETED: 'training_completed',
} as const;

// Credential types
export const CREDENTIAL_TYPES = {
  CERTIFICATION: 'certification',
  LICENSE: 'license',
  DEGREE: 'degree',
  TRAINING: 'training',
} as const;

// Performance review status
export const REVIEW_STATUS = {
  PENDING: 'pending',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  OVERDUE: 'overdue',
} as const;

// Goal status
export const GOAL_STATUS = {
  NOT_STARTED: 'not_started',
  IN_PROGRESS: 'in_progress',
  ACHIEVED: 'achieved',
  EXCEEDED: 'exceeded',
} as const;

// Theme options
export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system',
} as const;

// Component sizes
export const SIZES = {
  XS: 'xs',
  SM: 'sm',
  MD: 'md',
  LG: 'lg',
  XL: 'xl',
} as const;

// Button variants
export const BUTTON_VARIANTS = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  DANGER: 'danger',
  GHOST: 'ghost',
  LINK: 'link',
} as const;

// Badge variants
export const BADGE_VARIANTS = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  SUCCESS: 'success',
  WARNING: 'warning',
  DANGER: 'danger',
  INFO: 'info',
} as const;

// Calendar event types
export const CALENDAR_EVENT_TYPES = {
  MEETING: 'meeting',
  INTERVIEW: 'interview',
  TRAINING: 'training',
  LEAVE: 'leave',
  HOLIDAY: 'holiday',
} as const;

// File upload constraints
export const FILE_UPLOAD = {
  MAX_SIZE: 10 * 1024 * 1024, // 10MB
  ALLOWED_TYPES: {
    IMAGES: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
    DOCUMENTS: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
    SPREADSHEETS: ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'],
  },
} as const;

// Pagination defaults
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 20,
  MAX_LIMIT: 100,
  PAGE_SIZE_OPTIONS: [10, 20, 50, 100],
} as const;

// Time zones (common ones)
export const TIMEZONES = [
  { value: 'America/Los_Angeles', label: 'Pacific Time (PT)' },
  { value: 'America/Denver', label: 'Mountain Time (MT)' },
  { value: 'America/Chicago', label: 'Central Time (CT)' },
  { value: 'America/New_York', label: 'Eastern Time (ET)' },
  { value: 'Europe/London', label: 'Greenwich Mean Time (GMT)' },
  { value: 'Europe/Paris', label: 'Central European Time (CET)' },
  { value: 'Asia/Tokyo', label: 'Japan Standard Time (JST)' },
  { value: 'Asia/Shanghai', label: 'China Standard Time (CST)' },
  { value: 'Australia/Sydney', label: 'Australian Eastern Time (AET)' },
] as const;

// Countries (subset for demo)
export const COUNTRIES = [
  { value: 'US', label: 'United States' },
  { value: 'CA', label: 'Canada' },
  { value: 'GB', label: 'United Kingdom' },
  { value: 'DE', label: 'Germany' },
  { value: 'FR', label: 'France' },
  { value: 'JP', label: 'Japan' },
  { value: 'AU', label: 'Australia' },
  { value: 'IN', label: 'India' },
] as const;

// US States
export const US_STATES = [
  { value: 'AL', label: 'Alabama' },
  { value: 'AK', label: 'Alaska' },
  { value: 'AZ', label: 'Arizona' },
  { value: 'AR', label: 'Arkansas' },
  { value: 'CA', label: 'California' },
  { value: 'CO', label: 'Colorado' },
  { value: 'CT', label: 'Connecticut' },
  { value: 'DE', label: 'Delaware' },
  { value: 'FL', label: 'Florida' },
  { value: 'GA', label: 'Georgia' },
  { value: 'HI', label: 'Hawaii' },
  { value: 'ID', label: 'Idaho' },
  { value: 'IL', label: 'Illinois' },
  { value: 'IN', label: 'Indiana' },
  { value: 'IA', label: 'Iowa' },
  { value: 'KS', label: 'Kansas' },
  { value: 'KY', label: 'Kentucky' },
  { value: 'LA', label: 'Louisiana' },
  { value: 'ME', label: 'Maine' },
  { value: 'MD', label: 'Maryland' },
  { value: 'MA', label: 'Massachusetts' },
  { value: 'MI', label: 'Michigan' },
  { value: 'MN', label: 'Minnesota' },
  { value: 'MS', label: 'Mississippi' },
  { value: 'MO', label: 'Missouri' },
  { value: 'MT', label: 'Montana' },
  { value: 'NE', label: 'Nebraska' },
  { value: 'NV', label: 'Nevada' },
  { value: 'NH', label: 'New Hampshire' },
  { value: 'NJ', label: 'New Jersey' },
  { value: 'NM', label: 'New Mexico' },
  { value: 'NY', label: 'New York' },
  { value: 'NC', label: 'North Carolina' },
  { value: 'ND', label: 'North Dakota' },
  { value: 'OH', label: 'Ohio' },
  { value: 'OK', label: 'Oklahoma' },
  { value: 'OR', label: 'Oregon' },
  { value: 'PA', label: 'Pennsylvania' },
  { value: 'RI', label: 'Rhode Island' },
  { value: 'SC', label: 'South Carolina' },
  { value: 'SD', label: 'South Dakota' },
  { value: 'TN', label: 'Tennessee' },
  { value: 'TX', label: 'Texas' },
  { value: 'UT', label: 'Utah' },
  { value: 'VT', label: 'Vermont' },
  { value: 'VA', label: 'Virginia' },
  { value: 'WA', label: 'Washington' },
  { value: 'WV', label: 'West Virginia' },
  { value: 'WI', label: 'Wisconsin' },
  { value: 'WY', label: 'Wyoming' },
] as const;

// Skills categories
export const SKILL_CATEGORIES = {
  TECHNICAL: 'Technical',
  SOFT_SKILLS: 'Soft Skills',
  LANGUAGES: 'Languages',
  CERTIFICATIONS: 'Certifications',
  TOOLS: 'Tools & Software',
} as const;

// Common skills
export const COMMON_SKILLS = [
  // Technical
  'JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'Java', 'C++', 'Go', 'Rust',
  'HTML', 'CSS', 'SQL', 'MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'GraphQL', 'REST APIs',
  'AWS', 'Azure', 'Google Cloud', 'Docker', 'Kubernetes', 'CI/CD', 'Git', 'Linux',
  
  // Soft Skills
  'Leadership', 'Communication', 'Problem Solving', 'Teamwork', 'Project Management',
  'Time Management', 'Critical Thinking', 'Adaptability', 'Creativity', 'Mentoring',
  
  // Languages
  'English', 'Spanish', 'French', 'German', 'Chinese', 'Japanese', 'Portuguese', 'Italian',
  
  // Tools
  'Figma', 'Adobe Creative Suite', 'Sketch', 'InVision', 'Slack', 'Jira', 'Confluence',
  'Microsoft Office', 'Google Workspace', 'Salesforce', 'HubSpot',
] as const;

// Validation patterns
export const VALIDATION_PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^\+?[\d\s\-\(\)]+$/,
  SSN: /^\d{3}-\d{2}-\d{4}$/,
  ZIP_CODE: /^\d{5}(-\d{4})?$/,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
} as const;

// Error messages
export const ERROR_MESSAGES = {
  REQUIRED: 'This field is required',
  INVALID_EMAIL: 'Please enter a valid email address',
  INVALID_PHONE: 'Please enter a valid phone number',
  INVALID_PASSWORD: 'Password must be at least 8 characters with uppercase, lowercase, number, and special character',
  PASSWORD_MISMATCH: 'Passwords do not match',
  UNAUTHORIZED: 'You are not authorized to perform this action',
  NETWORK_ERROR: 'Network error. Please check your connection and try again.',
  UNKNOWN_ERROR: 'An unexpected error occurred. Please try again.',
} as const;

// Success messages
export const SUCCESS_MESSAGES = {
  PROFILE_UPDATED: 'Profile updated successfully',
  LEAVE_SUBMITTED: 'Leave request submitted successfully',
  BOOKMARK_ADDED: 'Job bookmarked successfully',
  BOOKMARK_REMOVED: 'Bookmark removed successfully',
  APPLICATION_SUBMITTED: 'Application submitted successfully',
  NOTIFICATION_MARKED_READ: 'Notification marked as read',
} as const;