// src/mock-api/data.ts
// Mock data aligned to the API contract
export const employees = [
  {
    id: "uuid1",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    personalEmail: "john.personal@gmail.com",
    phone: "123-456-7890",
    avatar: "/placeholder.svg",
    address: {
      street: "123 Main St",
      city: "Anytown",
      state: "CA",
      zip: "90210",
      country: "USA",
    },
    dateOfBirth: "1990-05-15",
    ssn: "encrypted_ssn_hash",
    hireDate: "2020-01-10",
    jobTitle: "Software Engineer",
    departmentId: "dept1",
    managerId: "uuid5",
    employmentStatus: "active",
    salary: 85000,
    benefitsEnrollment: ["benefit1", "benefit2"],
    skills: ["JavaScript", "React", "Node.js", "TypeScript", "AWS"],
    digitalCredentials: ["cred1", "cred2"],
    roles: ["employee"],
    preferences: {
      theme: "light",
      notifications: {
        email: true,
        push: true,
        sms: false
      }
    },
    timezone: "America/Los_Angeles",
    lastActive: "2024-08-12T10:30:00Z"
  },
  {
    id: "uuid2",
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@example.com",
    personalEmail: "jane.smith.personal@gmail.com",
    phone: "555-987-6543",
    avatar: "/placeholder.svg",
    address: {
      street: "456 Oak Ave",
      city: "Springfield",
      state: "IL",
      zip: "62701",
      country: "USA",
    },
    dateOfBirth: "1988-03-22",
    ssn: "encrypted_ssn_hash_2",
    hireDate: "2019-06-15",
    jobTitle: "HR Coordinator",
    departmentId: "dept2",
    managerId: "uuid6",
    employmentStatus: "active",
    salary: 65000,
    benefitsEnrollment: ["benefit1", "benefit3"],
    skills: ["HR Management", "Recruitment", "Employee Relations", "HRIS"],
    digitalCredentials: ["cred3"],
    roles: ["hr_admin"],
    preferences: {
      theme: "dark",
      notifications: {
        email: true,
        push: false,
        sms: true
      }
    },
    timezone: "America/Chicago",
    lastActive: "2024-08-12T09:15:00Z"
  },
  {
    id: "uuid3",
    firstName: "Mike",
    lastName: "Johnson",
    email: "mike.johnson@example.com",
    personalEmail: "mike.j@gmail.com",
    phone: "555-234-5678",
    avatar: "/placeholder.svg",
    address: {
      street: "789 Pine St",
      city: "Austin",
      state: "TX",
      zip: "73301",
      country: "USA",
    },
    dateOfBirth: "1985-11-08",
    ssn: "encrypted_ssn_hash_3",
    hireDate: "2018-02-01",
    jobTitle: "Engineering Manager",
    departmentId: "dept1",
    managerId: null,
    employmentStatus: "active",
    salary: 120000,
    benefitsEnrollment: ["benefit1", "benefit2", "benefit4"],
    skills: ["Team Leadership", "Software Architecture", "Agile", "React", "Node.js"],
    digitalCredentials: ["cred4", "cred5"],
    roles: ["manager"],
    preferences: {
      theme: "system",
      notifications: {
        email: true,
        push: true,
        sms: false
      }
    },
    timezone: "America/Chicago",
    lastActive: "2024-08-12T11:45:00Z"
  },
  {
    id: "uuid4",
    firstName: "Sarah",
    lastName: "Davis",
    email: "sarah.davis@example.com",
    personalEmail: "sarah.d.personal@gmail.com",
    phone: "555-345-6789",
    avatar: "/placeholder.svg",
    address: {
      street: "321 Elm St",
      city: "Seattle",
      state: "WA",
      zip: "98101",
      country: "USA",
    },
    dateOfBirth: "1992-07-14",
    ssn: "encrypted_ssn_hash_4",
    hireDate: "2021-03-15",
    jobTitle: "UX Designer",
    departmentId: "dept3",
    managerId: "uuid7",
    employmentStatus: "active",
    salary: 78000,
    benefitsEnrollment: ["benefit1", "benefit2"],
    skills: ["UI/UX Design", "Figma", "User Research", "Prototyping", "Design Systems"],
    digitalCredentials: ["cred6"],
    roles: ["employee"],
    preferences: {
      theme: "light",
      notifications: {
        email: true,
        push: true,
        sms: false
      }
    },
    timezone: "America/Los_Angeles",
    lastActive: "2024-08-12T10:00:00Z"
  },
  {
    id: "uuid5",
    firstName: "David",
    lastName: "Wilson",
    email: "david.wilson@example.com",
    personalEmail: "dwilson@yahoo.com",
    phone: "555-456-7890",
    avatar: "/placeholder.svg",
    address: {
      street: "654 Maple Dr",
      city: "Denver",
      state: "CO",
      zip: "80201",
      country: "USA",
    },
    dateOfBirth: "1980-01-30",
    ssn: "encrypted_ssn_hash_5",
    hireDate: "2015-09-01",
    jobTitle: "Chief Technology Officer",
    departmentId: "dept1",
    managerId: null,
    employmentStatus: "active",
    salary: 180000,
    benefitsEnrollment: ["benefit1", "benefit2", "benefit4", "benefit5"],
    skills: ["Executive Leadership", "Technology Strategy", "Software Architecture", "Team Management"],
    digitalCredentials: ["cred7", "cred8"],
    roles: ["super_admin"],
    preferences: {
      theme: "dark",
      notifications: {
        email: true,
        push: true,
        sms: true
      }
    },
    timezone: "America/Denver",
    lastActive: "2024-08-12T12:00:00Z"
  }
];

export const jobs = [
  {
    id: "job1",
    title: "Senior Frontend Developer",
    description: "We are seeking an experienced frontend developer to join our growing team. You'll work on cutting-edge applications using React, TypeScript, and modern web technologies. This role offers excellent growth opportunities and the chance to work with a talented team on innovative projects.",
    requirements: ["5+ years React", "TypeScript", "Team leadership", "GraphQL", "Testing", "CI/CD"],
    location: "Remote",
    departmentId: "dept1",
    postedDate: "2024-06-01",
    status: "open",
    salaryRange: { min: 90000, max: 120000 },
    companyId: "comp1",
    benefits: ["Health Insurance", "401k", "Flexible PTO", "Stock Options", "Learning Budget"],
    isSponsored: false,
    isFeatured: true,
    viewCount: 1247,
    applicationCount: 42,
    tags: ["Frontend", "React", "TypeScript", "Remote"],
    urgency: "high",
    applicationDeadline: "2024-09-01",
    workType: "remote",
    experienceLevel: "senior",
    employment_type: "full_time",
    matchPercentage: 85,
    company: {
      id: "comp1",
      name: "TechCorp Inc.",
      logo: "/placeholder.svg",
      rating: 4.2,
      reviewCount: 245,
      size: "1000-5000",
      industry: "Technology"
    }
  },
  {
    id: "job2",
    title: "HR Specialist",
    description: "Join our HR team and help scale our people operations. Focus on talent acquisition, employee engagement, and policy development.",
    requirements: ["HR degree", "3+ years experience", "SHRM certification", "ATS experience"],
    location: "San Francisco, CA",
    departmentId: "dept2",
    postedDate: "2024-06-15",
    status: "open",
    salaryRange: { min: 55000, max: 70000 },
    companyId: "comp1",
    benefits: ["Health Insurance", "401k", "Remote Work", "Professional Development"],
    isSponsored: true,
    isFeatured: false,
    viewCount: 823,
    applicationCount: 28,
    tags: ["HR", "Recruitment", "Employee Relations"],
    urgency: "medium",
    applicationDeadline: "2024-08-30",
    workType: "hybrid",
    experienceLevel: "mid",
    employment_type: "full_time",
    matchPercentage: 72,
    company: {
      name: "TechCorp Inc.",
      logo: "/placeholder.svg",
      rating: 4.2
    }
  },
  {
    id: "job3",
    title: "UX Designer",
    description: "Create exceptional user experiences for our enterprise applications. Work closely with product and engineering teams.",
    requirements: ["3+ years UX design", "Figma", "User research", "Prototyping"],
    location: "Austin, TX",
    departmentId: "dept3",
    postedDate: "2024-07-01",
    status: "open",
    salaryRange: { min: 70000, max: 95000 },
    companyId: "comp1",
    benefits: ["Health Insurance", "401k", "Flexible PTO", "Design Budget"],
    isSponsored: false,
    isFeatured: true,
    viewCount: 956,
    applicationCount: 35,
    tags: ["UX", "Design", "Research"],
    urgency: "low",
    applicationDeadline: "2024-09-15",
    workType: "on-site",
    experienceLevel: "mid",
    employment_type: "full_time",
    matchPercentage: 90,
    company: {
      name: "TechCorp Inc.",
      logo: "/placeholder.svg",
      rating: 4.2
    }
  },
  {
    id: "job4",
    title: "DevOps Engineer",
    description: "Build and maintain our cloud infrastructure. Focus on automation, monitoring, and scalability.",
    requirements: ["AWS/Azure", "Kubernetes", "CI/CD", "Infrastructure as Code", "5+ years experience"],
    location: "Remote",
    departmentId: "dept1",
    postedDate: "2024-07-10",
    status: "open",
    salaryRange: { min: 95000, max: 130000 },
    companyId: "comp1",
    benefits: ["Health Insurance", "401k", "Flexible PTO", "Home Office Stipend"],
    isSponsored: true,
    isFeatured: true,
    viewCount: 1456,
    applicationCount: 67,
    tags: ["DevOps", "AWS", "Kubernetes"],
    urgency: "high",
    applicationDeadline: "2024-08-25",
    workType: "remote",
    experienceLevel: "senior",
    employment_type: "full_time",
    matchPercentage: 78,
    company: {
      name: "TechCorp Inc.",
      logo: "/placeholder.svg",
      rating: 4.2
    }
  }
];

export const leaves = [
  {
    id: "leave1",
    employeeId: "uuid1",
    type: "vacation",
    startDate: "2024-07-25",
    endDate: "2024-07-26",
    reason: "Family vacation",
    status: "approved",
    approvedBy: "uuid5",
    appliedDate: "2024-07-01",
  },
  {
    id: "leave2",
    employeeId: "uuid2",
    type: "sick",
    startDate: "2024-07-20",
    endDate: "2024-07-20",
    reason: "Flu",
    status: "pending",
    appliedDate: "2024-07-18",
  },
];

export const credentials = [
  {
    id: "cred1",
    employeeId: "uuid1",
    name: "AWS Solutions Architect",
    issuingBody: "Amazon",
    issueDate: "2024-03-15",
    credentialType: "Certification",
    verificationUrl: "https://aws.amazon.com/certification/verify/",
    verified: true,
  },
  {
    id: "cred2",
    employeeId: "uuid2",
    name: "Cloud Security Expert",
    issuingBody: "CloudCert",
    issueDate: "2024-05-10",
    credentialType: "Application",
    verificationUrl: "https://cloudcert.com/security-jane-smith",
    verified: false,
  },
];

export const performanceReviews = [
  {
    id: "pr1",
    employeeId: "uuid1",
    reviewerId: "uuid5",
    reviewPeriod: "Q1 2024",
    goals: [
      { goal: "Complete React migration", status: "achieved" },
      { goal: "Mentor 2 junior developers", status: "in_progress" },
    ],
    feedback: "Excellent technical leadership and mentoring skills.",
    rating: 4.5,
    status: "completed",
    reviewDate: "2024-04-15",
  },
];

export const companies = [
  {
    id: "comp1",
    name: "TechCorp Inc.",
    logo: "/placeholder.svg",
    rating: 4.2,
    reviewCount: 245,
    size: "1000-5000",
    type: "Public",
    industry: "Technology",
    founded: 2010,
    revenue: "$500M-$1B",
    description: "Leading technology solutions provider...",
    culture: "Innovation-focused with work-life balance",
    benefits: ["Health Insurance", "401k", "Flexible PTO", "Remote Work"],
    locations: ["San Francisco, CA", "Austin, TX", "Remote"],
    website: "https://techcorp.com",
  },
];

export const departments = [
  {
    id: "dept1",
    name: "Engineering",
    description: "Software development and technical operations",
    managerId: "uuid5",
    employeeCount: 45,
  },
  {
    id: "dept2",
    name: "Human Resources",
    description: "Talent acquisition and employee relations",
    managerId: "uuid6",
    employeeCount: 12,
  },
  {
    id: "dept3",
    name: "Design",
    description: "User experience and visual design",
    managerId: "uuid7",
    employeeCount: 8,
  },
];

// New data structures for enhanced features
export const bookmarks = [
  {
    id: "bookmark1",
    userId: "uuid1",
    jobId: "job1",
    bookmarkedAt: "2024-08-10T15:30:00Z"
  },
  {
    id: "bookmark2",
    userId: "uuid1",
    jobId: "job3",
    bookmarkedAt: "2024-08-11T09:15:00Z"
  }
];

export const notifications = [
  {
    id: "notif1",
    userId: "uuid1",
    type: "leave_approved",
    title: "Leave Request Approved",
    message: "Your vacation request for July 25-26 has been approved.",
    read: false,
    createdAt: "2024-08-12T09:00:00Z",
    actionUrl: "/leaves/leave1",
    priority: "medium"
  },
  {
    id: "notif2",
    userId: "uuid1",
    type: "performance_review",
    title: "Performance Review Due",
    message: "Your Q2 performance review is due by August 15th.",
    read: false,
    createdAt: "2024-08-11T14:30:00Z",
    actionUrl: "/performance/review",
    priority: "high"
  },
  {
    id: "notif3",
    userId: "uuid1",
    type: "job_match",
    title: "New Job Match",
    message: "We found 3 new jobs that match your profile.",
    read: true,
    createdAt: "2024-08-10T11:00:00Z",
    actionUrl: "/jobs",
    priority: "low"
  }
];

export const activities = [
  {
    id: "activity1",
    type: "employee_joined",
    actor: { id: "uuid2", name: "Jane Smith", avatar: "/placeholder.svg" },
    description: "joined the Engineering team",
    timestamp: "2024-08-12T08:00:00Z",
    department: "Engineering"
  },
  {
    id: "activity2",
    type: "leave_approved",
    actor: { id: "uuid5", name: "Mike Johnson", avatar: "/placeholder.svg" },
    description: "approved leave request for John Doe",
    timestamp: "2024-08-11T16:30:00Z",
    department: "Engineering"
  },
  {
    id: "activity3",
    type: "performance_review_completed",
    actor: { id: "uuid1", name: "John Doe", avatar: "/placeholder.svg" },
    description: "completed Q2 performance review",
    timestamp: "2024-08-10T14:15:00Z",
    department: "Engineering"
  }
];
