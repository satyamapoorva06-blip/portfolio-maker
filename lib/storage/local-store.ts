import { PortfolioData } from '@/types/portfolio';
import { UserProfile, DeploymentRecord } from '@/types/database';

// DEFAULT GUEST / ADMIN PROFILE
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

// INITIAL PORTFOLIO SPECIFIC TO SATYAM DEMO ACCOUNT
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
  ],
  projects: [
    {
      id: 'proj_1',
      name: 'Portify AI',
      description: 'AI-powered SaaS portfolio generator converting resumes into live custom websites.',
      technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Supabase', 'Gemini API', 'Vercel API'],
      features: [
        'Multi-theme rendering engine (Minimal, Developer, Creative, 3D, Professional, Glass)',
        'Visual live preview editor with section hover controls',
        'Automated GitHub repository generation & deployment pipeline',
      ],
      githubUrl: 'https://github.com/satyam-dev/portify-ai',
      liveUrl: 'https://portify-ai.vercel.app',
      featured: true,
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
    },
  ],
  certifications: [],
  achievements: [],
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

export function isUserLoggedIn(): boolean {
  if (!IS_BROWSER) return false;
  try {
    return localStorage.getItem('portify_is_authenticated') === 'true';
  } catch {
    return false;
  }
}

export function getStoredUser(): UserProfile {
  if (!IS_BROWSER) return DEFAULT_USER;
  try {
    const raw = localStorage.getItem('portify_user');
    if (raw) return JSON.parse(raw);
    return DEFAULT_USER;
  } catch {
    return DEFAULT_USER;
  }
}

export function setStoredUser(user: UserProfile): void {
  if (!IS_BROWSER) return;
  localStorage.setItem('portify_user', JSON.stringify(user));
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
  localStorage.removeItem('portify_user');
}

export function getAllPortfolios(): PortfolioData[] {
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

export function getStoredPortfolios(): PortfolioData[] {
  if (!IS_BROWSER) return [];
  const currentUser = getStoredUser();
  const all = getAllPortfolios();
  
  // Return portfolios matching the logged in user's ID
  const userPortfolios = all.filter((p) => p.userId === currentUser.id);
  
  // Fallback for admin demo account
  if (userPortfolios.length === 0 && currentUser.id === DEFAULT_USER.id) {
    return [INITIAL_PORTFOLIO];
  }
  
  return userPortfolios;
}

export function getStoredPortfolio(id?: string): PortfolioData | null {
  if (!IS_BROWSER) return INITIAL_PORTFOLIO;
  const all = getAllPortfolios();
  if (id) {
    return all.find((p) => p.id === id || p.slug === id) || null;
  }
  return all.length > 0 ? all[0] : null;
}

export function saveStoredPortfolio(portfolio: PortfolioData): void {
  if (!IS_BROWSER) return;
  const currentUser = getStoredUser();
  
  // Attach user ID
  if (!portfolio.userId) {
    portfolio.userId = currentUser.id;
  }

  const all = getAllPortfolios();
  const index = all.findIndex((p) => p.id === portfolio.id || (p.slug === portfolio.slug && p.userId === currentUser.id));
  portfolio.updatedAt = new Date().toISOString();
  
  if (index >= 0) {
    all[index] = portfolio;
  } else {
    all.unshift(portfolio);
  }
  
  localStorage.setItem('portify_portfolios', JSON.stringify(all));
}

export function deleteStoredPortfolio(id: string): void {
  if (!IS_BROWSER) return;
  const all = getAllPortfolios();
  const filtered = all.filter((p) => p.id !== id);
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
