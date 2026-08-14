'use client';

import React from 'react';
import PublicPortfolioPage from '@/app/u/[username]/page';

export default function PortfolioSlugPage({ params }: { params: { slug: string } }) {
  return <PublicPortfolioPage params={{ username: params.slug }} />;
}
