'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { PortfolioData } from '@/types/portfolio';
import { getStoredPortfolios, saveStoredPortfolio, INITIAL_PORTFOLIO } from '@/lib/storage/local-store';
import EditorTabs from '@/components/editor/EditorTabs';
import LivePreviewFrame from '@/components/editor/LivePreviewFrame';
import { ArrowLeft, Save, Rocket, Github, CheckCircle2, Eye, Sparkles } from 'lucide-react';

export default function EditorPage() {
  const router = useRouter();
  const params = useParams();
  const portfolioId = params?.id as string;

  const [portfolio, setPortfolio] = useState<PortfolioData>(INITIAL_PORTFOLIO);
  const [savedStatus, setSavedStatus] = useState<string>('Saved');
  const [isSaving, setIsSaving] = useState(false);

  // Load portfolio from storage
  useEffect(() => {
    const list = getStoredPortfolios();
    const found = list.find((p) => p.id === portfolioId || p.slug === portfolioId);
    if (found) {
      setPortfolio(found);
    }
  }, [portfolioId]);

  const handleDataChange = (updated: PortfolioData) => {
    setPortfolio(updated);
    setSavedStatus('Unsaved changes...');
    // Auto-save debounced
    setIsSaving(true);
    saveStoredPortfolio(updated);
    setTimeout(() => {
      setSavedStatus('All changes saved');
      setIsSaving(false);
    }, 600);
  };

  return (
    <div className="h-screen flex flex-col bg-slate-950 text-slate-100 overflow-hidden font-sans">
      {/* Editor Top Navigation Bar */}
      <header className="h-16 bg-slate-900 border-b border-slate-800 px-6 flex justify-between items-center shrink-0">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push('/dashboard')}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition flex items-center gap-1.5 text-xs font-medium"
          >
            <ArrowLeft className="w-4 h-4" /> Dashboard
          </button>

          <div className="h-4 w-px bg-slate-800"></div>

          <div className="flex items-center gap-2">
            <input
              type="text"
              value={portfolio.title}
              onChange={(e) => handleDataChange({ ...portfolio, title: e.target.value })}
              className="bg-slate-950 border border-slate-800 hover:border-slate-700 focus:border-blue-500 rounded-lg px-3 py-1 text-sm font-semibold text-white focus:outline-none transition"
            />
            <span className="text-[11px] bg-blue-500/10 text-blue-400 px-2.5 py-0.5 rounded-full border border-blue-500/20 capitalize">
              {portfolio.customization.theme} theme
            </span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-4">
          <div className="text-xs text-slate-400 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>{savedStatus}</span>
          </div>

          <button
            onClick={() => router.push(`/u/${portfolio.slug}`)}
            className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-lg border border-slate-700 flex items-center gap-1.5 transition"
          >
            <Eye className="w-3.5 h-3.5" /> Preview Public
          </button>

          <button
            onClick={() => router.push('/dashboard/deployments')}
            className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-medium text-xs rounded-xl flex items-center gap-2 shadow-md transition"
          >
            <Rocket className="w-4 h-4" /> Deploy Live
          </button>
        </div>
      </header>

      {/* Main Split Screen Area */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
        {/* Left Form Controls (5 Columns) */}
        <div className="lg:col-span-5 h-full overflow-hidden">
          <EditorTabs data={portfolio} onChange={handleDataChange} />
        </div>

        {/* Right Live Preview Canvas (7 Columns) */}
        <div className="lg:col-span-7 h-full overflow-hidden">
          <LivePreviewFrame data={portfolio} />
        </div>
      </div>
    </div>
  );
}
