'use client';

import React, { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Navbar from '@/components/landing/Navbar';
import ProgressStepper from '@/components/navigation/ProgressStepper';
import { getStoredPortfolios, getStoredPortfolio } from '@/lib/storage/local-store';

function CustomizeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  useEffect(() => {
    const p = getStoredPortfolio(id || undefined);
    if (p) {
      router.push(`/editor/${p.id}`);
    } else {
      const list = getStoredPortfolios();
      if (list.length > 0) {
        router.push(`/editor/${list[0].id}`);
      } else {
        router.push('/upload');
      }
    }
  }, [id, router]);

  return (
    <div className="flex items-center justify-center p-24 text-slate-400 text-sm font-mono">
      Loading Theme Customizer & Live Preview...
    </div>
  );
}

export default function CustomizePage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      <Navbar />
      <ProgressStepper currentStep={3} />
      <Suspense fallback={<div className="p-12 text-center text-slate-400 font-mono">Loading...</div>}>
        <CustomizeContent />
      </Suspense>
    </div>
  );
}
