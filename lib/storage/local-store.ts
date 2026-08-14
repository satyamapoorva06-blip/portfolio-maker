import { PortfolioData } from '@/types/portfolio';
import { UserProfile, DeploymentRecord, GithubConnectionRecord } from '@/types/database';

// DEFAULT DEMO / INITIAL USER PROFILE
export const DEFAULT_USER: UserProfile = {
  id: 'usr_satyam_demo_01',
  name: 'Satyam Sharma',
  email: 'satyam@example.com',
  avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
  role: 'admin',
  status: 'active',
  created_at: new Date().toISOString(),
  last_login: new Date().toISOString(),
};

// SAMPLE INITIAL PORTFOLIO DATA FOR ZERO-STATE PREVIEW
export const INITIAL_PORTFOLIO: PortfolioData = {
  id: 'port_demo_sample_01',
  userId: 'usr_satyam_demo_01',
  title: 'Satyam Sharma — AI & Full Stack Developer',
  slug: 'satyam-sharma',
  isPublished: true,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  personal: {
    name: 'Satyam Sharma',
    title: 'Senior Full Stack & AI Systems Engineer',
    email: 'satyam.sharma@example.com',
    location: 'Bangalore, India',
    tagline: 'Building next-gen AI applications & cloud-native web architectures',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    socials: {
      github: 'https://github.com/satyam-dev',
      linkedin: 'https://linkedin.com/in/satyam-dev',
      twitter: 'https://twitter.com/satyam_ai',
      website: 'https://satyam.dev',
    },
  },
  about: {
    summary: 'Passionate AI & Full-Stack Engineer with 5+ years of experience building distributed web services, real-time analytics engines, and generative AI platform products.',
    highlights: [
      'Architected SaaS platforms serving 500k+ active monthly users',
      'Specialized in Next.js, React, Node.js, Python, & LLM integrations',
      'Passionate open-source contributor and Tech Speaker',
    ],
    openToWork: true,
    yearsOfExperience: 5,
  },
  skills: [
    {
      id: 'sk_1',
      category: 'Languages',
      skills: ['TypeScript', 'JavaScript', 'Python', 'Go', 'SQL', 'HTML5/CSS3'],
    },
    {
      id: 'sk_2',
      category: 'Frameworks & Frontend',
      skills: ['React', 'Next.js', 'Tailwind CSS', 'Framer Motion', 'Vue.js', 'Redux'],
    },
    {
      id: 'sk_3',
      category: 'Backend & Cloud',
      skills: ['Node.js', 'Express', 'FastAPI', 'PostgreSQL', 'Supabase', 'Redis', 'Docker', 'AWS', 'Vercel'],
    },
    {
      id: 'sk_4',
      category: 'AI & Engineering',
      skills: ['OpenAI API', 'Gemini API', 'LangChain', 'Vector DBs (Pinecone)', 'RAG Pipelines', 'Git/GitHub'],
    },
  ],
  experience: [
    {
      id: 'exp_1',
      company: 'Apex AI Labs',
      role: 'Lead Full Stack Architect',
      location: 'Bangalore / Remote',
      startDate: '2023-01',
      endDate: 'Present',
      current: true,
      description: 'Heading the web platform and generative AI tools team.',
      achievements: [
        'Built an AI copilot tool improving developer productivity by 40%',
        'Reduced server response latency from 320ms to 85ms with Next.js edge caching',
        'Managed a cross-functional team of 8 software engineers',
      ],
      technologies: ['Next.js', 'TypeScript', 'Supabase', 'Python', 'OpenAI API'],
    },
    {
      id: 'exp_2',
      company: 'InnovateX Solutions',
      role: 'Senior Frontend Developer',
      location: 'Remote',
      startDate: '2021-04',
      endDate: '2022-12',
      current: false,
      description: 'Developed modern web applications and interactive analytics dashboards.',
      achievements: [
        'Migrated legacy React SPA to Next.js App Router for optimal SEO performance',
        'Implemented custom real-time chart library processing 10k events/sec',
      ],
      technologies: ['React', 'TypeScript', 'Tailwind CSS', 'GraphQL', 'Jest'],
    },
  ],
  projects: [
    {
      id: 'proj_1',
      name: 'Portify AI',
      description: 'AI-powered SaaS portfolio generator converting resumes into live custom websites.',
      longDescription: 'Automated workflow that parses PDF/DOCX resumes with AI, extracts structured JSON data, renders 6 responsive themes, generates standalone Next.js source code, and deploys directly to Vercel/Netlify via GitHub API.',
      technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Supabase', 'Gemini API', 'Vercel API'],
      features: [
        'Multi-theme rendering engine (Minimal, Developer, Creative, 3D, Professional, Glass)',
        'Visual live preview editor with section hover controls',
        'Automated GitHub repository generation & deployment pipeline',
      ],
      githubUrl: 'https://github.com/satyam-dev/portify-ai',
      liveUrl: 'https://portify-ai.vercel.app',
      featured: true,
      imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'proj_2',
      name: 'NeuralDoc — Smart Document Q&A',
      description: 'RAG platform allowing users to chat with multi-page PDFs and medical records.',
      technologies: ['Python', 'FastAPI', 'Pinecone', 'LangChain', 'React', 'Tailwind CSS'],
      features: [
        'Semantic search across 500+ page technical manuals',
        'Citations and direct page snippet highlighting',
      ],
      githubUrl: 'https://github.com/satyam-dev/neural-doc',
      liveUrl: 'https://neuraldoc.dev',
      featured: true,
      imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80',
    },
  ],
  education: [
    {
      id: 'edu_1',
      institution: 'Indian Institute of Technology (IIT)',
      degree: 'Bachelor of Technology (B.Tech)',
      field: 'Computer Science and Engineering',
      startDate: '2017',
      endDate: '2021',
      current: false,
      gpa: '3.9 / 4.0',
      honors: ['Dean’s Honor List', '1st Rank in Hackathon 2020'],
    },
  ],
  certifications: [
    {
      id: 'cert_1',
      name: 'AWS Certified Solutions Architect — Associate',
      organization: 'Amazon Web Services',
      issueDate: '2023-05',
      credentialUrl: 'https://aws.amazon.com/verification',
    },
    {
      id: 'cert_2',
      name: 'Google Cloud Professional Cloud Architect',
      organization: 'Google Cloud',
      issueDate: '2022-11',
    },
  ],
  achievements: [
    {
      id: 'ach_1',
      title: 'Global Winner — Smart India Hackathon 2021',
      organization: 'Ministry of Education',
      date: '2021',
      description: 'Built a real-time remote telemetry & monitoring dashboard for rural healthcare centers.',
    },
  ],
  customization: {
    theme: 'glass',
    primaryColor: '#0c8ee9',
    accentColor: '#8b5cf6',
    fontFamily: 'inter',
    borderRadius: 'lg',
    animationsEnabled: true,
    animationIntensity: 'normal',
  },
  sectionVisibility: {
    about: true,
    skills: true,
    experience: true,
    projects: true,
    education: true,
    certifications: true,
    achievements: true,
    contact: true,
  },
};

const IS_BROWSER = typeof window !== 'undefined';

export function getStoredUser(): UserProfile {
  if (!IS_BROWSER) return DEFAULT_USER;
  try {
    const raw = localStorage.getItem('portify_user');
    return raw ? JSON.parse(raw) : DEFAULT_USER;
  } catch {
    return DEFAULT_USER;
  }
}

export function setStoredUser(user: UserProfile): void {
  if (!IS_BROWSER) return;
  localStorage.setItem('portify_user', JSON.stringify(user));
}

export function isUserLoggedIn(): boolean {
  if (!IS_BROWSER) return false;
  try {
    return localStorage.getItem('portify_is_authenticated') === 'true';
  } catch {
    return false;
  }
}

export function setUserLoggedIn(status: boolean, user?: UserProfile): void {
  if (!IS_BROWSER) return;
  localStorage.setItem('portify_is_authenticated', status ? 'true' : 'false');
  if (user) {
    localStorage.setItem('portify_user', JSON.stringify(user));
  }
}

export function logoutUser(): void {
  if (!IS_BROWSER) return;
  localStorage.setItem('portify_is_authenticated', 'false');
}



export function getStoredPortfolios(): PortfolioData[] {
  if (!IS_BROWSER) return [INITIAL_PORTFOLIO];
  try {
    const raw = localStorage.getItem('portify_portfolios');
    if (!raw) {
      localStorage.setItem('portify_portfolios', JSON.stringify([INITIAL_PORTFOLIO]));
      return [INITIAL_PORTFOLIO];
    }
    return JSON.parse(raw);
  } catch {
    return [INITIAL_PORTFOLIO];
  }
}

export function saveStoredPortfolio(portfolio: PortfolioData): void {
  if (!IS_BROWSER) return;
  const current = getStoredPortfolios();
  const index = current.findIndex((p) => p.id === portfolio.id || p.slug === portfolio.slug);
  portfolio.updatedAt = new Date().toISOString();
  if (index >= 0) {
    current[index] = portfolio;
  } else {
    current.unshift(portfolio);
  }
  localStorage.setItem('portify_portfolios', JSON.stringify(current));
}

export function deleteStoredPortfolio(id: string): void {
  if (!IS_BROWSER) return;
  const current = getStoredPortfolios();
  const filtered = current.filter((p) => p.id !== id);
  localStorage.setItem('portify_portfolios', JSON.stringify(filtered));
}

export function getStoredDeployments(): DeploymentRecord[] {
  if (!IS_BROWSER) return [];
  try {
    const raw = localStorage.getItem('portify_deployments');
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveStoredDeployment(dep: DeploymentRecord): void {
  if (!IS_BROWSER) return;
  const current = getStoredDeployments();
  const existingIndex = current.findIndex((d) => d.id === dep.id);
  if (existingIndex >= 0) {
    current[existingIndex] = dep;
  } else {
    current.unshift(dep);
  }
  localStorage.setItem('portify_deployments', JSON.stringify(current));
}
