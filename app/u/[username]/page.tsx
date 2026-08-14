'use client';

import React, { useState, useEffect } from 'react';
import { getAllPortfolios, INITIAL_PORTFOLIO } from '@/lib/storage/local-store';
import ThemeRenderer from '@/components/portfolio/ThemeRenderer';
import { PortfolioData } from '@/types/portfolio';

export default function PublicPortfolioPage({ params }: { params: { username: string } }) {
  const username = params.username;
  const [portfolio, setPortfolio] = useState<PortfolioData | null>(null);

  useEffect(() => {
    const list = getAllPortfolios();
    const cleanTarget = username.toLowerCase().replace(/-portfolio$/, '');

    const found = list.find((p) => {
      const pSlug = p.slug.toLowerCase().replace(/-portfolio$/, '');
      return pSlug === cleanTarget || p.id === username || p.slug === username;
    });

    if (found) {
      setPortfolio(found);
    } else {
      // Fallback matching portfolio title or initial state
      const fallbackData: PortfolioData = {
        ...INITIAL_PORTFOLIO,
        personal: {
          ...INITIAL_PORTFOLIO.personal,
          name: username.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
        },
      };
      setPortfolio(fallbackData);
    }
  }, [username]);

  if (!portfolio) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-6 font-sans">
        <div className="text-center space-y-3">
          <div className="w-8 h-8 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin mx-auto"></div>
          <p className="text-sm text-slate-400 font-mono">Loading Portfolio Website...</p>
        </div>
      </div>
    );
  }

  return <ThemeRenderer data={portfolio} />;
}
