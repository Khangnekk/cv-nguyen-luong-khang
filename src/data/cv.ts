import type { IconKey } from '../icons/skills'

export type Role = {
  company: string
  position: string
  period: string
  context?: string
  bullets: string[]
}

export type Project = {
  name: string
  note: string
  description: string
}

export type SkillGroup = {
  label: string
  icon: IconKey
  items: { label: string; icon: IconKey }[]
}

export const profile = {
  name: 'Nguyen Luong Khang',
  title: 'Mid-level .NET / Full-stack Developer',
  contact: [
    { label: 'Phone', value: '+84 373 208 029', href: 'tel:+84373208029' },
    { label: 'Email', value: 'contact.khangfk@gmail.com', href: 'mailto:contact.khangfk@gmail.com' },
    { label: 'Location', value: 'Hanoi, Vietnam' },
  ],
  summary:
    "I have more than 2 years’ experience as a .NET developer with end-to-end web application exposure. Advancing toward a Solutions Architect path, I adapt quickly to new technologies and thrive in team environments where I can deliver impactful results, contribute to company growth, and learn from experienced peers.",
}

export const experience: Role[] = [
  {
    company: 'Add-On Development Co., Ltd',
    position: 'Full-stack Developer',
    period: 'Oct 2024 – Present',
    context: 'Team size 12 · Projects: Resource Central, Resource Finder, Clients-App',
    bullets: [
      'Developed .NET 8 microservices while modernising legacy systems (.NET Framework, ASP.NET MVC, jQuery).',
      'Designed SQL Server database schemas and integrated RabbitMQ for async messaging and data sync.',
      'Implemented multi-agent LangGraph / LangChain workflows to bring AI into Clients-App (an AOD product).',
      'Built custom ASPX / RDLC reporting modules to support business analytics.',
      'Refined requirements with foreign POs / BAs; provided direct live-site support for international clients.',
      'Built and managed Build & Release pipelines on Azure DevOps; desktop installers via InstallShield.',
    ],
  },
  {
    company: 'Ngonngon1970s',
    position: 'Full-stack Engineer (Freelance)',
    period: 'Sep 2025 – Dec 2025',
    context: 'Team size 2 · Koeln, Germany',
    bullets: [
      'Clarified raw client ideas into functional specs, selected the tech stack and designed the system.',
      'Built backend services on .NET 8 & SQL Server; responsive frontends with React (TypeScript / Vite).',
      'Configured Azure DevOps CI/CD: backend containers to a Linux VPS (Nginx), frontend on Cloudflare Pages.',
      'Developed scheduled background jobs with IHostedService (PeriodicTimer) for daily data cleanup.',
    ],
  },
  {
    company: 'FPT Software',
    position: 'Developer',
    period: 'Apr 2023 – Aug 2023',
    context: 'Project size ~130 · split into per-module sub-teams',
    bullets: [
      'Analysed a legacy C++ codebase and WinForms UI to modernise the POS into a C# Unity UI (MVVM) & C# / .NET backend.',
      'Built RESTful APIs with C# / .NET under strict senior code review, following enterprise design patterns.',
      'Built a custom WinForms barcode tool for dev / QA to baseline legacy behaviour and streamline testing.',
    ],
  },
]

export const projects: Project[] = [
  {
    name: 'Resource Central',
    note: 'Enterprise product',
    description:
      'Meeting & workspace management for Microsoft 365, Outlook and Exchange — plan, book and manage rooms in one integrated solution. Deployed on-site, on the customer’s own cloud, or as SaaS.',
  },
  {
    name: 'Resource Finder & Clients-App',
    note: 'Outlook add-ins',
    description:
      'Cross-platform Outlook add-ins connecting directly to the Resource Central backend: booking logic, Exchange sync, resource & order data — book rooms without leaving Outlook.',
  },
  {
    name: 'Ngonngon1970s',
    note: 'Koeln, Germany · Web + admin',
    description:
      'Cologne restaurant app — dynamic menus, online orders, reservations, PayPal, email notifications, loyalty program; admin manages hours, promotions, staff, delivery and sales reports.',
  },
  {
    name: '7-Eleven POS System',
    note: 'Enterprise platform',
    description:
      'Enterprise POS for 7-Eleven: self-checkout kiosk (cash, card, QR/barcode, change dispenser) + back office for real-time inventory, multi-store catalog, promotions and secure sync.',
  },
]

export const skills: SkillGroup[] = [
  {
    label: 'Backend',
    icon: 'dotnet',
    items: [
      { label: 'C#', icon: 'csharp' },
      { label: '.NET 8', icon: 'dotnet' },
      { label: '.NET Framework', icon: 'dotnet' },
      { label: 'ASP.NET MVC', icon: 'dotnet' },
      { label: 'Entity Framework Core', icon: 'efcore' },
      { label: 'LINQ', icon: 'dotnet' },
    ],
  },
  {
    label: 'Frontend',
    icon: 'react',
    items: [
      { label: 'React', icon: 'react' },
      { label: 'TypeScript', icon: 'typescript' },
      { label: 'Vite', icon: 'vite' },
      { label: 'Unity / MVVM', icon: 'unity' },
      { label: 'WinForms', icon: 'windows' },
      { label: 'REST APIs', icon: 'openapi' },
    ],
  },
  {
    label: 'Data',
    icon: 'sqlserver',
    items: [
      { label: 'SQL Server', icon: 'sqlserver' },
      { label: 'PostgreSQL', icon: 'postgresql' },
      { label: 'MongoDB', icon: 'mongodb' },
      { label: 'Schema & indexing', icon: 'schema' },
    ],
  },
  {
    label: 'Architecture',
    icon: 'microservices',
    items: [
      { label: 'Microservices', icon: 'microservices' },
      { label: 'CQRS', icon: 'cqrs' },
      { label: 'Clean Architecture', icon: 'clean' },
      { label: 'SOLID', icon: 'solid' },
      { label: 'Design patterns', icon: 'patterns' },
    ],
  },
  {
    label: 'Infrastructure',
    icon: 'docker',
    items: [
      { label: 'RabbitMQ', icon: 'rabbitmq' },
      { label: 'Redis', icon: 'redis' },
      { label: 'Docker', icon: 'docker' },
      { label: 'Azure DevOps', icon: 'azuredevops' },
      { label: 'CI/CD', icon: 'cicd' },
      { label: 'IIS', icon: 'iis' },
      { label: 'Linux / VPS', icon: 'linux' },
      { label: 'AWS', icon: 'aws' },
    ],
  },
  {
    label: 'AI & tooling',
    icon: 'langgraph',
    items: [
      { label: 'LangGraph', icon: 'langgraph' },
      { label: 'LangChain', icon: 'langchain' },
      { label: 'Claude Code', icon: 'claudecode' },
      { label: 'Harness', icon: 'harness' },
      { label: 'Git', icon: 'git' },
    ],
  },
]

export const softSkills = ['Communication', 'Teamwork', 'Work under high pressure']

export const education = [
  {
    school: 'FPT University',
    degree: 'Software Engineering',
    period: '2020 – 2024',
    note: 'Honorable Student of Semester, Spring 2022',
  },
]

export const certifications = [
  {
    name: 'Project Management Principles and Practices',
    issuer: 'Coursera',
    date: '04 / 2024',
    url: 'https://coursera.org/share/0d2119bd46b8cdaa7b85b9406f039e18',
  },
  {
    name: 'Certified Ethical Emerging Technologist',
    issuer: 'Coursera',
    date: '03 / 2023',
    url: 'https://coursera.org/share/ccdc5da16f40ebc1fccdbb93c3e3b3f0',
  },
  {
    name: 'Software Development Lifecycle',
    issuer: 'Coursera',
    date: '10 / 2022',
    url: 'https://coursera.org/share/b9e525b761b2c0a92d6427a7d771bc9e',
  },
]

export const languages = [
  {
    name: 'English',
    level: 'Upper-Intermediate / B2',
    note: 'Good command of technical speaking, listening, reading & writing',
  },
  { name: 'Japanese', level: 'Beginner Level' },
]
