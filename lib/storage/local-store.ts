import { PortfolioData } from "@/types/portfolio";
import {
  UserProfile,
  DeploymentRecord,
  ContactMessageRecord,
} from "@/types/database";

// DEFAULT GUEST PROFILE
export const DEFAULT_USER: UserProfile = {
  id: "usr_guest_demo",
  name: "Portfolio User",
  email: "user@example.com",
  avatar_url:
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
  role: "user",
  status: "active",
  created_at: new Date().toISOString(),
  last_login: new Date().toISOString(),
};

// INITIAL PORTFOLIO SPECIFIC TO SAMPLE DEMO
export const INITIAL_PORTFOLIO: PortfolioData = {
  id: "port_demo_sample_01",
  userId: "usr_satyam_demo_01",
  title: "Sample Developer — AI & Full Stack Portfolio",
  slug: "sample-portfolio",
  isPublished: true,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  sectionOrder: [
    "hero",
    "about",
    "skills",
    "experience",
    "projects",
    "education",
    "certifications",
    "achievements",
    "contact",
  ],
  personal: {
    name: "Sample Developer",
    title: "Full Stack & AI Systems Engineer",
    email: "developer@example.com",
    location: "Global",
    tagline:
      "Building next-gen web applications & modern software architectures",
    avatarUrl:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    socials: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
    },
  },
  about: {
    summary:
      "Passionate Full-Stack Engineer experienced in building distributed web services, real-time analytics engines, and AI applications.",
    highlights: [
      "Architected web platforms serving active users worldwide",
      "Specialized in Next.js, React, TypeScript, & Node.js",
      "Passionate open-source contributor and technical builder",
    ],
    openToWork: true,
    yearsOfExperience: 3,
  },
  skills: [
    {
      id: "sk_1",
      category: "Languages",
      skills: ["TypeScript", "JavaScript", "Python", "SQL", "HTML5/CSS3"],
    },
    {
      id: "sk_2",
      category: "Frameworks & Frontend",
      skills: ["React", "Next.js", "Tailwind CSS", "Framer Motion"],
    },
    {
      id: "sk_3",
      category: "Backend & Cloud",
      skills: [
        "Node.js",
        "Express",
        "PostgreSQL",
        "Supabase",
        "Docker",
        "Vercel",
      ],
    },
  ],
  experience: [],
  projects: [],
  education: [],
  certifications: [],
  achievements: [],
  customization: {
    theme: "glass",
    primaryColor: "#0c8ee9",
    accentColor: "#8b5cf6",
    fontFamily: "inter",
    borderRadius: "lg",
    animationsEnabled: true,
    animationIntensity: "normal",
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

const IS_BROWSER = typeof window !== "undefined";

export function isUserLoggedIn(): boolean {
  if (!IS_BROWSER) return false;
  if ((window as any).__portify_auth === true) return true;
  try {
    if (localStorage.getItem("portify_is_authenticated") === "true") return true;
  } catch (e) {}
  try {
    if (sessionStorage.getItem("portify_is_authenticated") === "true") return true;
  } catch (e) {}
  try {
    if (document.cookie.includes("portify_is_authenticated=true")) return true;
  } catch (e) {}
  return false;
}

export function getStoredUser(): UserProfile {
  if (!IS_BROWSER) return DEFAULT_USER;
  if ((window as any).__portify_user) return (window as any).__portify_user;
  try {
    const raw = localStorage.getItem("portify_user");
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  try {
    const raw = sessionStorage.getItem("portify_user");
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  try {
    const match = document.cookie.match(/portify_user=([^;]+)/);
    if (match && match[1]) {
      return JSON.parse(decodeURIComponent(match[1]));
    }
  } catch (e) {}
  return DEFAULT_USER;
}

export function setStoredUser(user: UserProfile): void {
  if (!IS_BROWSER) return;
  (window as any).__portify_user = user;
  try {
    localStorage.setItem("portify_user", JSON.stringify(user));
  } catch (e) {}
  try {
    sessionStorage.setItem("portify_user", JSON.stringify(user));
  } catch (e) {}
  try {
    document.cookie = `portify_user=${encodeURIComponent(JSON.stringify(user))}; path=/; max-age=31536000; SameSite=Lax`;
  } catch (e) {}
}

export function setUserLoggedIn(status: boolean, user?: UserProfile): void {
  if (!IS_BROWSER) return;
  (window as any).__portify_auth = status;
  if (user) {
    (window as any).__portify_user = user;
  }

  try {
    localStorage.setItem("portify_is_authenticated", status ? "true" : "false");
    if (user) {
      localStorage.setItem("portify_user", JSON.stringify(user));
    }
  } catch (e) {}

  try {
    sessionStorage.setItem("portify_is_authenticated", status ? "true" : "false");
    if (user) {
      sessionStorage.setItem("portify_user", JSON.stringify(user));
    }
  } catch (e) {}

  try {
    if (status) {
      document.cookie = "portify_is_authenticated=true; path=/; max-age=31536000; SameSite=Lax";
      if (user) {
        document.cookie = `portify_user=${encodeURIComponent(JSON.stringify(user))}; path=/; max-age=31536000; SameSite=Lax`;
      }
    } else {
      document.cookie = "portify_is_authenticated=false; path=/; max-age=0; SameSite=Lax";
      document.cookie = "portify_user=; path=/; max-age=0; SameSite=Lax";
    }
  } catch (e) {}
}

export function logoutUser(): void {
  if (!IS_BROWSER) return;
  (window as any).__portify_auth = false;
  delete (window as any).__portify_user;

  try {
    localStorage.setItem("portify_is_authenticated", "false");
    localStorage.removeItem("portify_user");
  } catch (e) {}
  try {
    sessionStorage.setItem("portify_is_authenticated", "false");
    sessionStorage.removeItem("portify_user");
  } catch (e) {}
  try {
    document.cookie = "portify_is_authenticated=false; path=/; max-age=0; SameSite=Lax";
    document.cookie = "portify_user=; path=/; max-age=0; SameSite=Lax";
  } catch (e) {}
}

export function getAllPortfolios(): PortfolioData[] {
  if (!IS_BROWSER) return [];
  try {
    const raw = localStorage.getItem("portify_portfolios");
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function getStoredPortfolios(): PortfolioData[] {
  if (!IS_BROWSER) return [];
  const currentUser = getStoredUser();
  const all = getAllPortfolios();

  // Return portfolios matching the logged in user's ID
  const userPortfolios = all.filter((p) => p.userId === currentUser.id);

  return userPortfolios;
}

export function getStoredPortfolio(id?: string): PortfolioData | null {
  if (!IS_BROWSER) return null;
  const all = getAllPortfolios();
  if (id) {
    const match = all.find((p) => p.id === id || p.slug === id);
    if (match) return match;
  }
  const userPortfolios = getStoredPortfolios();
  return userPortfolios.length > 0 ? userPortfolios[0] : null;
}

export function saveStoredPortfolio(portfolio: PortfolioData): void {
  if (!IS_BROWSER) return;
  const currentUser = getStoredUser();

  // Attach user ID
  if (!portfolio.userId) {
    portfolio.userId = currentUser.id;
  }

  const all = getAllPortfolios();
  const index = all.findIndex(
    (p) =>
      p.id === portfolio.id ||
      (p.slug === portfolio.slug && p.userId === currentUser.id),
  );
  portfolio.updatedAt = new Date().toISOString();

  if (index >= 0) {
    all[index] = portfolio;
  } else {
    all.unshift(portfolio);
  }

  localStorage.setItem("portify_portfolios", JSON.stringify(all));
}

export function deleteStoredPortfolio(id: string): void {
  if (!IS_BROWSER) return;
  const all = getAllPortfolios();
  const filtered = all.filter((p) => p.id !== id);
  localStorage.setItem("portify_portfolios", JSON.stringify(filtered));
}

export function getStoredDeployments(): DeploymentRecord[] {
  if (!IS_BROWSER) return [];
  try {
    const raw = localStorage.getItem("portify_deployments");
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
  localStorage.setItem("portify_deployments", JSON.stringify(current));
}

export function getStoredMessages(): ContactMessageRecord[] {
  if (!IS_BROWSER) return [];
  try {
    const raw = localStorage.getItem("portify_contact_messages");
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveStoredMessage(msg: ContactMessageRecord): void {
  if (!IS_BROWSER) return;
  const current = getStoredMessages();
  current.unshift(msg);
  localStorage.setItem("portify_contact_messages", JSON.stringify(current));
}

export function markMessageRead(id: string): void {
  if (!IS_BROWSER) return;
  const current = getStoredMessages();
  const updated = current.map((m) => (m.id === id ? { ...m, read: true } : m));
  localStorage.setItem("portify_contact_messages", JSON.stringify(updated));
}

export function deleteStoredMessage(id: string): void {
  if (!IS_BROWSER) return;
  const current = getStoredMessages();
  const filtered = current.filter((m) => m.id !== id);
  localStorage.setItem("portify_contact_messages", JSON.stringify(filtered));
}
