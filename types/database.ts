export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar_url?: string;
  github_username?: string;
  github_token?: string;
  vercel_token?: string;
  role: 'user' | 'admin';
  status: 'active' | 'disabled';
  created_at: string;
  last_login?: string;
}

export interface PortfolioRecord {
  id: string;
  user_id: string;
  title: string;
  slug: string;
  theme: string;
  data: Record<string, any>;
  is_published: boolean;
  views_count?: number;
  created_at: string;
  updated_at: string;
}

export interface PortfolioVersionRecord {
  id: string;
  portfolio_id: string;
  data: Record<string, any>;
  created_at: string;
}

export interface GithubConnectionRecord {
  id: string;
  user_id: string;
  provider_user_id?: string;
  username: string;
  access_token?: string;
  created_at: string;
}

export interface DeploymentRecord {
  id: string;
  portfolio_id: string;
  user_id: string;
  provider: 'vercel' | 'netlify';
  repository_url?: string;
  deployment_url: string;
  status: 'pending' | 'building' | 'live' | 'failed';
  created_at: string;
  updated_at: string;
}

export interface PortfolioViewRecord {
  id: string;
  portfolio_id: string;
  viewed_at: string;
  device?: string;
  referrer?: string;
}
