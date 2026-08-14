import { UserProfile, DeploymentRecord } from './database';
import { PortfolioData } from './portfolio';

export interface AdminDashboardMetrics {
  totalUsers: number;
  activeUsers: number;
  totalPortfolios: number;
  publishedPortfolios: number;
  githubConnectionsCount: number;
  vercelDeploymentsCount: number;
  netlifyDeploymentsCount: number;
  totalPortfolioViews: number;
}

export interface AdminUserListItem extends UserProfile {
  portfolioCount: number;
  publishedCount: number;
}

export interface AdminAnalyticsChartPoint {
  date: string;
  users: number;
  portfolios: number;
  published: number;
  views: number;
}
