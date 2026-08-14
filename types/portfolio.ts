export type ThemeType =
  | 'minimal'
  | 'developer'
  | 'creative'
  | 'three-d'
  | 'professional'
  | 'glass'
  | 'obsidian-red'
  | 'nordic-editorial'
  | 'dev-gallery'
  | 'cyber-matrix'
  | 'bento-grid'
  | 'kinetic-poster'
  | 'genai-neural'
  | 'cloud-architect'
  | 'mern-stack'
  | 'iot-hardware'
  | 'java-enterprise'
  | 'cs-student'
  | 'spatial-arvr'
  | 'cyber-sentinel'
  | 'kuber-ai-creative'
  | 'tvnskm-aiml-fullstack'
  | 'priyanshu-creative'
  | 'kirti-aiml'
  | 'harsh-aiml-mern'
  | 'hari-aiml'
  | 'nishil-cloud'
  | 'prince-ai'
  | 'sahil-aiml-student'
  | 'suraj-agentic-ai'
  | 'srikhanth-arvr'
  | 'abhinav-cv-ml'
  | 'sahil-sahu-ai'
  | 'shreya-datascience'
  | 'aman-genai'
  | 'nikhil-fullstack'
  | 'abhay-cs-ai'
  | 'saad-fullstack'
  | 'prashant-cse-aiml'
  | 'anmol-creative-sys'
  | 'abhishek-beginner'
  | 'harsh-cs-student'
  | 'dheeraj-mern'
  | 'rishav-java-backend'
  | 'adil-java-microservices'
  | 'megha-mern'
  | 'harsh-backend-ai'
  | 'karan-webdev'
  | 'shashank-fullstack'
  | 'suraj-mern'
  | 'abdulhussain-uiux'
  | 'sakesh-fullstack'
  | 'arun-fullstack'
  | 'ritik-cybersec'
  | 'shivam-frontend'
  | 'vinay-java-fullstack'
  | 'subhadeep-fullstack'
  | 'wasif-cs-student'
  | 'prince-shah-learning'
  | 'dhanaraj-frontend-ai'
  | 'ayush-iot-creative'
  | 'priyank-fullstack'
  | 'aadi-neobrutalist'
  | 'cs-student-collection'
  | 'emma-bostian-curated'
  | 'github-topic-student'
  | 'sitesplaced-examples'
  | 'nikola-janjic-2025'
  | 'gist-inspiration'
  | 'onehour-digital'
  | string;

export interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  phone?: string;
  location: string;
  avatarUrl?: string;
  bio?: string;
  tagline?: string;
  socials: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    website?: string;
    youtube?: string;
    instagram?: string;
    devto?: string;
  };
}

export interface AboutInfo {
  summary: string;
  highlights?: string[];
  openToWork?: boolean;
  yearsOfExperience?: number;
}

export interface SkillCategory {
  id: string;
  category: string;
  skills: string[];
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  location?: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  achievements?: string[];
  technologies?: string[];
}

export interface ProjectItem {
  id: string;
  name: string;
  description: string;
  longDescription?: string;
  technologies: string[];
  features?: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
  imageUrl?: string;
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  current?: boolean;
  gpa?: string;
  honors?: string[];
}

export interface CertificationItem {
  id: string;
  name: string;
  organization: string;
  issueDate: string;
  expirationDate?: string;
  credentialUrl?: string;
  credentialId?: string;
}

export interface AchievementItem {
  id: string;
  title: string;
  organization?: string;
  date?: string;
  description?: string;
  awardUrl?: string;
}

export interface VisualCustomization {
  theme: ThemeType;
  primaryColor: string;
  accentColor: string;
  backgroundColor?: string;
  textColor?: string;
  fontFamily: 'inter' | 'jetbrains' | 'playfair' | 'system';
  borderRadius: 'none' | 'sm' | 'md' | 'lg' | 'full';
  animationsEnabled: boolean;
  animationIntensity: 'subtle' | 'normal' | 'expressive';
}

export interface SectionVisibility {
  about: boolean;
  skills: boolean;
  experience: boolean;
  projects: boolean;
  education: boolean;
  certifications: boolean;
  achievements: boolean;
  contact: boolean;
}

export interface PortfolioData {
  id: string;
  userId?: string;
  title: string;
  slug: string;
  personal: PersonalInfo;
  about: AboutInfo;
  skills: SkillCategory[];
  experience: ExperienceItem[];
  projects: ProjectItem[];
  education: EducationItem[];
  certifications: CertificationItem[];
  achievements: AchievementItem[];
  customization: VisualCustomization;
  sectionVisibility: SectionVisibility;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}
