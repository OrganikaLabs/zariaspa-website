// src/config/api.ts
// API configuration and constants

export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || '/api',
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000,
} as const;

export const API_ENDPOINTS = {
  // Authentication
  AUTH: {
    LOGIN: '/auth/login',
    MFA_VERIFY: '/auth/mfa/verify',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
  },
  
  // Users & Employees
  EMPLOYEES: {
    LIST: '/employees',
    BY_ID: (id: string) => `/employees/${id}`,
    CREATE: '/employees',
    UPDATE: (id: string) => `/employees/${id}`,
    DELETE: (id: string) => `/employees/${id}`,
    SEARCH: '/employees/search',
  },
  
  // Jobs
  JOBS: {
    LIST: '/jobs',
    BY_ID: (id: string) => `/jobs/${id}`,
    CREATE: '/jobs',
    UPDATE: (id: string) => `/jobs/${id}`,
    DELETE: (id: string) => `/jobs/${id}`,
    SEARCH: '/jobs/search',
    BOOKMARKS: '/jobs/bookmarks',
    BOOKMARK_BY_ID: (id: string) => `/jobs/bookmarks/${id}`,
    APPLY: (id: string) => `/jobs/${id}/apply`,
    APPLICATIONS: '/jobs/applications',
  },
  
  // Leaves
  LEAVES: {
    LIST: '/leaves',
    BY_ID: (id: string) => `/leaves/${id}`,
    CREATE: '/leaves',
    UPDATE: (id: string) => `/leaves/${id}`,
    APPROVE: (id: string) => `/leaves/${id}/approve`,
    REJECT: (id: string) => `/leaves/${id}/reject`,
  },
  
  // Performance
  PERFORMANCE: {
    REVIEWS: '/performance-reviews',
    BY_ID: (id: string) => `/performance-reviews/${id}`,
    CREATE: '/performance-reviews',
    UPDATE: (id: string) => `/performance-reviews/${id}`,
    GOALS: '/performance/goals',
    FEEDBACK: '/performance/feedback',
  },
  
  // Credentials
  CREDENTIALS: {
    LIST: '/credentials',
    BY_ID: (id: string) => `/credentials/${id}`,
    CREATE: '/credentials',
    VERIFY: (id: string) => `/credentials/${id}/verify`,
  },
  
  // Notifications
  NOTIFICATIONS: {
    LIST: '/notifications',
    BY_ID: (id: string) => `/notifications/${id}`,
    MARK_READ: (id: string) => `/notifications/${id}/read`,
    MARK_ALL_READ: '/notifications/read-all',
    DELETE: (id: string) => `/notifications/${id}`,
  },
  
  // Analytics & Dashboard
  ANALYTICS: {
    DASHBOARD: '/analytics/dashboard',
    REPORTS: '/analytics/reports',
    EMPLOYEE_METRICS: '/analytics/employees',
    JOB_METRICS: '/analytics/jobs',
  },
  
  // Activities
  ACTIVITIES: {
    FEED: '/activities/feed',
    BY_ID: (id: string) => `/activities/${id}`,
  },
  
  // Calendar
  CALENDAR: {
    EVENTS: '/calendar/events',
    CREATE_EVENT: '/calendar/events',
    UPDATE_EVENT: (id: string) => `/calendar/events/${id}`,
    DELETE_EVENT: (id: string) => `/calendar/events/${id}`,
  },
  
  // Organizations
  ORGANIZATIONS: {
    COMPANIES: '/companies',
    DEPARTMENTS: '/departments',
    ROLES: '/roles',
  },
  
  // System
  SYSTEM: {
    HEALTH: '/system/health',
    SETTINGS: '/system/settings',
    AUDIT_LOGS: '/system/audit',
  },
} as const;

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
} as const;

export const STORAGE_KEYS = {
  AUTH_TOKEN: 'hrms_auth_token',
  REFRESH_TOKEN: 'hrms_refresh_token',
  USER_DATA: 'hrms_user_data',
  THEME: 'hrms_theme',
  PREFERENCES: 'hrms_preferences',
} as const;

export const WEBSOCKET_EVENTS = {
  CONNECT: 'connect',
  DISCONNECT: 'disconnect',
  NOTIFICATION: 'notification',
  ACTIVITY: 'activity',
  MESSAGE: 'message',
  LEAVE_UPDATE: 'leave_update',
  JOB_UPDATE: 'job_update',
  USER_STATUS: 'user_status',
} as const;

export const QUERY_KEYS = {
  EMPLOYEES: 'employees',
  JOBS: 'jobs',
  BOOKMARKS: 'bookmarks',
  NOTIFICATIONS: 'notifications',
  ACTIVITIES: 'activities',
  LEAVES: 'leaves',
  PERFORMANCE: 'performance',
  CREDENTIALS: 'credentials',
  ANALYTICS: 'analytics',
  CALENDAR: 'calendar',
  CURRENT_USER: 'current_user',
} as const;

export const DEFAULT_PAGINATION = {
  page: 1,
  limit: 20,
  maxLimit: 100,
} as const;

export const CACHE_TIMES = {
  VERY_SHORT: 1 * 60 * 1000, // 1 minute
  SHORT: 5 * 60 * 1000, // 5 minutes
  MEDIUM: 15 * 60 * 1000, // 15 minutes
  LONG: 60 * 60 * 1000, // 1 hour
  VERY_LONG: 24 * 60 * 60 * 1000, // 24 hours
} as const;