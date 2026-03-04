// ============================================================================
// DATA MODELS & CONSTANTS
// ============================================================================

export const USER_PROFILE = {
    name: "Thalari Koushik", title: "Aspiring Associate Product Manager (APM)",
    email: "tkjs.koushik@gmail.com", linkedin: "linkedin.com/in/tkoushik",
    website: "thalarikoushik.in", location: "Kurnool, Andhra Pradesh (Remote Only)",
    resumeSkills: [
        "Agile", "Scrum", "PRD Writing", "OKRs", "RICE Framework", "Kano Analysis", "User Research",
        "GTM Strategy", "Notion", "Google Analytics", "A/B Testing", "Roadmap Planning",
        "Stakeholder Management", "Design Thinking", "SQL", "Claude AI", "Manus AI",
        "Backlog Prioritization", "Sprint Planning", "User Stories", "KPI Tracking",
        "Funnel Analysis", "Data Visualization", "MECE Framework", "Competitive Intelligence",
        "UX Research", "User Personas", "Customer Journey Mapping", "NLP", "Web Scraping",
        "OpenAI APIs", "Python", "Figma", "Google Sheets", "PowerPoint", "MS Teams"
    ],
    certifications: ["McKinsey Forward Program 2025 – Product Strategy", "Product Management: Building a Product Strategy – LinkedIn Learning"],
    education: "BCA – Sunstone Bangalore – CGPA 8.56 – 2025",
    achievements: [
        "Selected from 10,000+ global applicants for McKinsey Forward", "Delivered 15+ executive presentations",
        "Built RIYA AI – emotionally intelligent AI companion", "Eliminated 80% manual research time via AI automation"
    ],
    targetRoles: [
        "APM", "Associate Product Manager", "Product Analyst",
        "Product Operations Analyst", "Product Research Intern",
        "Product Strategy Intern", "AI Product Intern",
        "Project Coordinator", "Program Coordinator",
        "Delivery Coordinator", "Agile Coordinator",
        "Operations Coordinator", "Project Analyst",
        "Business Analyst", "Strategy Analyst",
        "Market Research Analyst", "Business Operations Analyst",
        "Competitive Intelligence Analyst", "Management Trainee",
        "Reporting Analyst", "BI Analyst", "Insights Analyst",
        "Dashboard Analyst", "KPI Analyst", "Data Operations Analyst",
        "UX Researcher", "User Researcher", "Market Analyst",
        "Research Analyst", "Research Intern",
        "AI Research Analyst", "Prompt Analyst", "AI Strategy Intern",
        "No-Code Automation Analyst", "AI Tools Specialist",
        "Customer Success Analyst", "Client Success Intern",
        "Onboarding Specialist", "Technical Writer",
        "Knowledge Base Manager", "UX Writer"
    ],
    blockedKeywords: [
        "BPO", "Sales", "Telecaller", "Customer Support",
        "Insurance", "Field Sales", "Voice Process",
        "Marketing Executive", "Collection", "Outbound",
        "Software Engineer", "Developer", "Designer",
        "Telemarketing", "Telesales", "Coding", "Programming"
    ]
};

export const ROLE_GROUPS = {
    "Product Track": {
        color: "blue", icon: "📦",
        keywords: [
            "associate product manager", "apm", "product intern",
            "product analyst", "product operations", "product research",
            "product strategy intern", "product specialist",
            "junior product manager", "product coordinator",
            "ai product", "product operations analyst"
        ]
    },
    "Project Track": {
        color: "purple", icon: "🏗️",
        keywords: [
            "project coordinator", "project analyst", "project intern",
            "program coordinator", "delivery coordinator",
            "agile coordinator", "operations coordinator",
            "it coordinator", "sprint coordinator"
        ]
    },
    "Business & Strategy Track": {
        color: "indigo", icon: "📊",
        keywords: [
            "business analyst", "strategy analyst", "strategy intern",
            "market research analyst", "business operations analyst",
            "competitive intelligence analyst", "management trainee",
            "business research analyst", "corporate strategy",
            "management consultant intern"
        ]
    },
    "Data Track": {
        color: "green", icon: "📈",
        keywords: [
            "reporting analyst", "bi analyst", "insights analyst",
            "dashboard analyst", "kpi analyst", "data operations",
            "data operations analyst", "analytics intern",
            "data research analyst", "metrics analyst"
        ]
    },
    "Research & UX Track": {
        color: "pink", icon: "🔬",
        keywords: [
            "ux researcher", "user researcher", "market analyst",
            "consumer research analyst", "research analyst",
            "research intern", "usability researcher",
            "product research analyst", "growth analyst"
        ]
    },
    "AI & Ops Track": {
        color: "orange", icon: "🤖",
        keywords: [
            "ai research analyst", "prompt analyst", "ai strategy intern",
            "no-code automation analyst", "ai tools specialist",
            "ai operations analyst", "ai product researcher",
            "llm researcher", "automation analyst", "ai coordinator"
        ]
    },
    "Customer Success Track": {
        color: "teal", icon: "🤝",
        keywords: [
            "customer success analyst", "client success intern",
            "onboarding specialist", "product success analyst",
            "customer operations analyst", "implementation analyst"
        ]
    },
    "Content & Docs Track": {
        color: "yellow", icon: "✍️",
        keywords: [
            "technical writer", "product documentation",
            "knowledge base manager", "ux writer",
            "documentation specialist", "product writer",
            "content analyst", "documentation analyst"
        ]
    }
};

export const BLOCKED_KEYWORDS = [
    // Sales & Marketing
    "sales executive", "sales representative", "field sales",
    "field executive", "inside sales", "cold calling",
    "lead generation executive", "business development executive",
    "bd executive", "sales associate", "marketing executive",
    "social media executive", "seo executive",
    "digital marketing executive", "content writer",

    // Telecaller & BPO
    "telecaller", "bpo", "voice process", "inbound calls",
    "outbound calls", "call center", "customer care executive",
    "helpdesk executive", "technical support executive",
    "chat support", "email support agent", "telesales",
    "telemarketing",

    // Finance & Insurance
    "insurance advisor", "insurance agent", "loan officer",
    "collection agent", "recovery agent", "financial advisor",

    // Coding & Development
    "software engineer", "software developer", "frontend developer",
    "backend developer", "full stack developer", "web developer",
    "android developer", "ios developer", "react developer",
    "node developer", "python developer", "java developer",
    "devops engineer", "data engineer", "ml engineer",
    "deep learning", "blockchain developer",

    // Design
    "ui designer", "ux designer", "graphic designer",
    "visual designer", "motion designer", "product designer",
    "web designer", "logo designer", "figma designer",
    "ui/ux designer"
];

export const MOCK_JOBS = [
    { id: 'm1', title: 'APM Intern', company: 'NovaTech AI', location: 'Remote', salary: '₹10K/mo', skills: ['Agile', 'PRD', 'User Research', 'Notion'], applicantCount: 6, isEasyApply: true, source: 'Company Direct', postedHoursAgo: 2, description: 'Join our product team to help define and ship features for our AI-powered analytics platform. You\'ll work directly with the founding PM.' },
    { id: 'm2', title: 'Data Analyst (Fresher)', company: 'LoopStack', location: 'Remote', salary: '₹18K/mo', skills: ['Google Analytics', 'Excel', 'A/B Testing', 'SQL'], applicantCount: 43, isVerified: true, source: 'LinkedIn', postedHoursAgo: 12, description: 'Analyze product metrics and build dashboards to drive data-informed decisions across the organization.' },
    { id: 'm3', title: 'Business Analyst Intern', company: 'BuildSpace', location: 'Remote', salary: '₹15K/mo', skills: ['SWOT Analysis', 'Excel', 'Stakeholder Mgmt', 'Scrum'], applicantCount: 8, isEasyApply: true, source: 'LinkedIn', postedHoursAgo: 5, description: 'Support cross-functional teams with business requirements gathering, process mapping, and strategic analysis.' },
    { id: 'm4', title: 'Project Coordinator', company: 'CloudNine', location: 'Remote', salary: '₹12K/mo', skills: ['Notion', 'Agile', 'Sprint Planning', 'MS Teams'], applicantCount: 15, source: 'Naukri', postedHoursAgo: 20, description: 'Coordinate sprints, manage backlogs, and ensure smooth delivery across our engineering pods.' },
    { id: 'm5', title: 'UX Researcher Intern', company: 'Zeta Labs', location: 'Remote', salary: '₹12K/mo', skills: ['User Interviews', 'Personas', 'JTBD', 'Usability Testing'], applicantCount: 5, isVerified: true, source: 'Company Direct', postedHoursAgo: 1, description: 'Conduct user research studies, synthesize insights, and present findings to improve our product experience.' },
    { id: 'm6', title: 'Technical Writer', company: 'DocuMind', location: 'Remote', salary: '₹3.5 LPA', skills: ['Technical Docs', 'Notion', 'Markdown', 'Product Knowledge'], applicantCount: 22, source: 'WeWorkRemotely', postedHoursAgo: 48, description: 'Create and maintain technical documentation, API guides, and knowledge base articles.' },
    { id: 'm7', title: 'AI Research Analyst', company: 'AIFirst', location: 'Remote', salary: '₹14K/mo', skills: ['LLMs', 'NLP', 'Manus AI', 'Claude AI', 'Research'], applicantCount: 9, isEasyApply: true, source: 'AngelList', postedHoursAgo: 4, description: 'Research and evaluate AI/ML models, create benchmarks, and contribute to our AI strategy roadmap.' },
    { id: 'm8', title: 'Customer Success Analyst', company: 'SaaSTech', location: 'Remote', salary: '₹16K/mo', skills: ['Onboarding', 'KPI Tracking', 'Google Sheets', 'Communication'], applicantCount: 11, source: 'LinkedIn', postedHoursAgo: 8, description: 'Drive customer adoption and retention through data-driven success strategies and proactive outreach.' },
    { id: 'm9', title: 'Strategy Research Intern', company: 'GrowthLabs', location: 'Remote', salary: '₹10K/mo', skills: ['Market Research', 'Competitive Intel', 'GTM', 'MECE'], applicantCount: 7, isEasyApply: true, source: 'Company Direct', postedHoursAgo: 6, description: 'Research market trends, analyze competitive landscapes, and support GTM strategy development.' },
    { id: 'm10', title: 'Growth Analyst Intern', company: 'ScaleUp', location: 'Remote', salary: '₹12K/mo', skills: ['Funnel Analysis', 'Google Analytics', 'A/B Testing', 'OKRs'], applicantCount: 4, isVerified: true, source: 'Arbeitnow', postedHoursAgo: 15, description: 'Optimize growth funnels, run experiments, and track KPIs to drive user acquisition and retention.' },
];

export const COMPANIES = [
    { name: 'Razorpay', url: 'https://razorpay.com/jobs/', ats: 'Greenhouse', stage: 'Late Stage' },
    { name: 'Freshworks', url: 'https://www.freshworks.com/company/careers/', ats: 'Greenhouse', stage: 'Public' },
    { name: 'Zoho', url: 'https://www.zoho.com/careers.html', ats: 'Custom ATS', stage: 'Private' },
    { name: 'PhonePe', url: 'https://www.phonepe.com/careers/', ats: 'Lever', stage: 'Late Stage' },
    { name: 'Swiggy', url: 'https://careers.swiggy.com/', ats: 'Custom ATS', stage: 'Public' },
    { name: 'Groww', url: 'https://groww.in/careers', ats: 'Lever', stage: 'Series E' },
    { name: 'CRED', url: 'https://careers.cred.club/', ats: 'Greenhouse', stage: 'Series F' },
    { name: 'Meesho', url: 'https://meesho.com/careers', ats: 'Lever', stage: 'Series F' },
    { name: 'Notion', url: 'https://www.notion.so/careers', ats: 'Greenhouse', stage: 'Series C' },
    { name: 'Linear', url: 'https://linear.app/careers', ats: 'Ashby', stage: 'Series B' },
];

export const MOCK_HRS = [
    { id: 'h1', name: 'Priya Sharma', company: 'Razorpay', designation: 'Talent Acquisition Lead', email: 'priya.sharma@razorpay.com', phone: '+91-9876543210', linkedinUrl: 'https://linkedin.com/in/priyasharma', isVerified: true, avatarColor: '#3b82f6', roleHiring: 'Hiring APM Intern', lastActive: '2h ago' },
    { id: 'h2', name: 'Arjun Mehta', company: 'Freshworks', designation: 'HR Manager - Product Hiring', email: 'arjun.mehta@freshworks.com', phone: '+91-9123456789', linkedinUrl: 'https://linkedin.com/in/arjunmehta', isVerified: true, avatarColor: '#a855f7', roleHiring: 'Hiring Product Analyst', lastActive: '5h ago' },
    { id: 'h3', name: 'Neha Reddy', company: 'Groww', designation: 'People Ops Lead', email: 'neha.reddy@groww.in', phone: '', linkedinUrl: 'https://linkedin.com/in/nehareddy', isVerified: false, avatarColor: '#10b981', roleHiring: 'Hiring APM Fresher', lastActive: '1d ago' },
    { id: 'h4', name: 'Vikram Singh', company: 'CRED', designation: 'Head of Talent', email: 'vikram.s@cred.club', phone: '+91-9988776655', linkedinUrl: 'https://linkedin.com/in/vikramsingh', isVerified: true, avatarColor: '#f59e0b', roleHiring: 'Hiring Business Analyst', lastActive: '30m ago' },
    { id: 'h5', name: 'Anjali Desai', company: 'Swiggy', designation: 'Recruitment Lead', email: 'anjali.desai@swiggy.in', phone: '', linkedinUrl: 'https://linkedin.com/in/anjalidesai', isVerified: true, avatarColor: '#ec4899', roleHiring: 'Hiring Project Coordinator', lastActive: '3h ago' },
];

export const EMAIL_TEMPLATES = [
    { id: 't1', name: 'Cold Outreach — APM Role', subject: 'APM Application – {name} | McKinsey Forward | BCA 2025', body: 'Dear {hr_name},\n\nI hope this message finds you well. My name is {name}, and I am writing to express my interest in the {role} position at {company}.\n\nI recently completed the McKinsey Forward Program (selected from 10,000+ global applicants) and hold a BCA from Sunstone Bangalore (CGPA 8.56). My experience includes building AI-powered products and delivering 15+ executive presentations.\n\nI would love the opportunity to discuss how my skills in product strategy, user research, and agile methodologies can contribute to {company}\'s mission.\n\nBest regards,\n{name}' },
    { id: 't2', name: 'Follow-up After Application', subject: 'Following Up – {role} Application | {name}', body: 'Dear {hr_name},\n\nI recently applied for the {role} position at {company} and wanted to follow up on my application.\n\nI am very excited about this opportunity and believe my background in product management, data analysis, and AI tools makes me a strong fit.\n\nI would welcome the chance to discuss my qualifications further.\n\nThank you for your consideration.\n\nBest regards,\n{name}' },
    { id: 't3', name: 'LinkedIn Connection Request', subject: '', body: 'Hi {hr_name}, I\'m {name}, an aspiring APM with experience in product strategy (McKinsey Forward \'25) and AI product development. I\'d love to connect and learn about opportunities at {company}. Looking forward to connecting!' },
    { id: 't4', name: 'Referral Request', subject: 'Referral Request – {role} at {company}', body: 'Dear {hr_name},\n\nI came across the {role} opening at {company} and was immediately drawn to it. I am reaching out to see if you might be able to refer me for this position.\n\nA few highlights from my background:\n• McKinsey Forward Program 2025 (10,000+ applicants)\n• Built RIYA AI – emotionally intelligent AI companion\n• Strong skills in PRD writing, user research, and agile\n\nI\'ve attached my resume for your reference. I\'d be grateful for any guidance.\n\nWarm regards,\n{name}' },
];
