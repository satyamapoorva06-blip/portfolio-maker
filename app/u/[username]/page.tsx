import React from 'react';
import Metadata from 'next';
import { getStoredPortfolios, INITIAL_PORTFOLIO } from '@/lib/storage/local-store';
import ThemeRenderer from '@/components/portfolio/ThemeRenderer';
import { PortfolioData } from '@/types/portfolio';

export async function generateMetadata({ params }: { params: { username: string } }) {
  const username = params.username;
  return {
    title: `${username} — Portfolio | Portify AI`,
    description: `Explore ${username}'s professional portfolio powered by Portify AI.`,
    openGraph: {
      title: `${username} — Professional Portfolio`,
      description: `Interactive online portfolio built with Portify AI.`,
    },
  };
}

export default function PublicPortfolioPage({ params }: { params: { username: string } }) {
  const username = params.username;
  const list = getStoredPortfolios();
  const found = list.find((p) => p.slug === username || p.id === username) || INITIAL_PORTFOLIO;

  return <ThemeRenderer data={found} />;
}
