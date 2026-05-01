// src/types/api/index.ts
// Core API Types for HRMS

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  personalEmail?: string;
  phone?: string;
  avatar?: string;
  roles: Role[];
  preferences: UserPreferences;
  lastActive: string;
  timezone: string;
}

export interface Employee extends User {
  address: Address;
  dateOfBirth: string;
  ssn: string;
  hireDate: string;
  jobTitle: string;
  departmentId: string;
  managerId?: string;
  employmentStatus: EmploymentStatus;
  salary: number;
  benefitsEnrollment: string[];
  skills: string[];
  digitalCredentials: string[];
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  notifications: NotificationPreferences;
}

export interface NotificationPreferences {
  email: boolean;
  push: boolean;
  sms: boolean;
}

export type Role = 'employee' | 'manager' | 'hr_admin' | 'super_admin' | 'external_verifier';
export type EmploymentStatus = 'active' | 'inactive' | 'terminated' | 'on_leave';

export interface Job {
  id: string;
  title: string;
  description: string;
  requirements: string[];
  location: string;
  departmentId: string;
  postedDate: string;
  status: JobStatus;
  salaryRange: SalaryRange;
  companyId: string;
  benefits: string[];
  isSponsored: boolean;
  isFeatured: boolean;
  viewCount: number;
  applicationCount: number;
  tags: string[];
  urgency: 'low' | 'medium' | 'high';
  applicationDeadline: string;
  workType: 'remote' | 'on-site' | 'hybrid';
  experienceLevel: 'entry' | 'mid' | 'senior' | 'executive';
  employment_type: 'full_time' | 'part_time' | 'contract' | 'intern';
  matchPercentage?: number;
  company: Company;
}

export interface Company {
  id?: string;
  name: string;
  logo: string;
  rating: number;
  reviewCount?: number;
  size?: string;
  type?: string;
  industry?: string;
  founded?: number;
  revenue?: string;
  description?: string;
  culture?: string;
  benefits?: string[];
  locations?: string[];
  website?: string;
}

export interface SalaryRange {
  min: number;
  max: number;
}

export type JobStatus = 'open' | 'closed' | 'draft' | 'paused';

export interface Bookmark {
  id: string;
  userId: string;
  jobId: string;
  bookmarkedAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  actionUrl?: string;
  priority: 'low' | 'medium' | 'high';
}

export type NotificationType = 
  | 'leave_approved' 
  | 'leave_rejected' 
  | 'performance_review' 
  | 'job_match' 
  | 'system_update'
  | 'document_required'
  | 'training_due';

export interface Activity {
  id: string;
  type: ActivityType;
  actor: {
    id: string;
    name: string;
    avatar?: string;
  };
  description: string;
  timestamp: string;
  department?: string;
}

export type ActivityType = 
  | 'employee_joined'
  | 'leave_approved'
  | 'performance_review_completed'
  | 'credential_verified'
  | 'training_completed';

export interface Leave {
  id: string;
  employeeId: string;
  type: LeaveType;
  startDate: string;
  endDate: string;
  reason: string;
  status: LeaveStatus;
  approvedBy?: string;
  appliedDate: string;
  days: number;
}

export type LeaveType = 'vacation' | 'sick' | 'personal' | 'maternity' | 'paternity' | 'bereavement';
export type LeaveStatus = 'pending' | 'approved' | 'rejected' | 'cancelled';

export interface Department {
  id: string;
  name: string;
  description: string;
  managerId?: string;
  employeeCount: number;
}

export interface Credential {
  id: string;
  employeeId: string;
  name: string;
  issuingBody: string;
  issueDate: string;
  expirationDate?: string;
  credentialType: 'certification' | 'license' | 'degree' | 'training';
  verificationUrl?: string;
  verified: boolean;
}

export interface PerformanceReview {
  id: string;
  employeeId: string;
  reviewerId: string;
  reviewPeriod: string;
  goals: Goal[];
  feedback: string;
  rating: number;
  status: ReviewStatus;
  reviewDate: string;
}

export interface Goal {
  goal: string;
  status: 'not_started' | 'in_progress' | 'achieved' | 'exceeded';
  completion?: number;
}

export type ReviewStatus = 'pending' | 'in_progress' | 'completed' | 'overdue';

// API Response Types
export interface ApiResponse<T> {
  data: T;
  message?: string;
  status: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  totalCount: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

export interface JobSearchResponse {
  jobs: Job[];
  totalCount: number;
  facets: {
    companies: { name: string; count: number }[];
    locations: { name: string; count: number }[];
    skills: { name: string; count: number }[];
  };
}

export interface AuthResponse {
  token?: string;
  mfaRequired?: boolean;
  tempToken?: string;
  user?: User;
  success: boolean;
  message?: string;
}

export interface DashboardAnalytics {
  totalEmployees: number;
  newHiresThisMonth: number;
  openPositions: number;
  averageSalary: number;
  turnoverRate: number;
  engagementScore: number;
}

export interface CalendarEvent {
  id: string;
  title: string;
  start: string;
  end: string;
  type: 'meeting' | 'interview' | 'training' | 'leave' | 'holiday';
  attendees?: string[];
  location?: string;
  description?: string;
}