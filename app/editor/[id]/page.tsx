'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { PortfolioData } from '@/types/portfolio';
import { UserProfile } from '@/types/database';
import {
  getStoredPortfolios,
  saveStoredPortfolio,
  getStoredUser,
  INITIAL_PORTFOLIO,
} from '@/lib/storage/local-store';
import EditorTabs from '@/components/editor/EditorTabs';
import LivePreviewFrame from '@/components/editor/LivePreviewFrame';
import ProgressStepper from '@/components/navigation/ProgressStepper';
import DeployModal from '@/components/modals/DeployModal';
import { ArrowLeft, CheckCircle2, Eye, ArrowRight } from 'lucide-react';

export default function EditorPage() {
  const router = useRouter();
  const params = useParams();
  const portfolioId = params?.id as string;

  const [portfolio, setPortfolio] = useState<PortfolioData>(INITIAL_PORTFOLIO);
  const [savedStatus, setSavedStatus] = useState<string>('Saved');
  const [user, setUser] = useState<UserProfile>(getStoredUser());
  const [showDeployModal, setShowDeployModal] = useState(false);

  useEffect(() => {
    const list = getStoredPortfolios();
    const found = list.find((p) => p.id === portfolioId || p.slug === portfolioId);
    if (found) {
      setPortfolio(found);
    }
    setUser(getStoredUser());
  }, [portfolioId]);

  const handleDataChange = (updated: PortfolioData) => {
    setPortfolio(updated);
    setSavedStatus('Unsaved changes...');
    saveStoredPortfolio(updated);
    setTimeout(() => {
      setSavedStatus('All changes saved');
    }, 600);
  };

  return (
    <div className="h-screen flex flex-col bg-slate-950 text-slate-100 overflow-hidden font-sans relative">
      <ProgressStepper currentStep={3} />

      {/* Editor Header */}
      <header className="h-16 bg-slate-900 border-b border-slate-800 px-6 flex justify-between items-center shrink-0">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push(`/parse?id=${portfolio.id}`)}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition flex items-center gap-1.5 text-xs font-medium"
          >
            <ArrowLeft className="w-4 h-4" /> ← Back to AI Review
          </button>

          <div className="h-4 w-px bg-slate-800" />

          <div className="flex items-center gap-2">
            <input
              type="text"
              value={portfolio.title}
              onChange={(e) => handleDataChange({ ...portfolio, title: e.target.value })}
              className="bg-slate-950 border border-slate-800 hover:border-slate-700 focus:border-cyan-500 rounded-lg px-3 py-1 text-sm font-semibold text-white focus:outline-none transition"
            />
            <span className="text-[11px] bg-[#e50914]/20 text-[#e50914] px-2.5 py-0.5 rounded-full border border-[#e50914]/40 capitalize font-mono font-bold">
              {portfolio.customization.theme} theme
            </span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-4">
          <div className="text-xs text-slate-400 flex items-center gap-1.5 font-mono">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>{savedStatus}</span>
          </div>

          <button
            onClick={() => router.push(`/u/${portfolio.slug}`)}
            className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-xl border border-slate-700 flex items-center gap-1.5 transition"
          >
            <Eye className="w-3.5 h-3.5" /> Preview Public
          </button>

          <button
            onClick={() => router.push(`/publish?id=${portfolio.id}`)}
            className="px-5 py-2 bg-[#e50914] hover:bg-[#ff1f2d] text-white font-extrabold text-xs rounded-xl flex items-center gap-2 shadow-lg shadow-[#e50914]/30 transition transform hover:-translate-y-0.5"
          >
            Next: Publish & Share ➔ <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Split-Screen Workspace */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
        <div className="lg:col-span-5 h-full overflow-hidden">
          <EditorTabs data={portfolio} onChange={handleDataChange} />
        </div>
        <div className="lg:col-span-7 h-full overflow-hidden">
          <LivePreviewFrame data={portfolio} />
        </div>
      </div>

      <DeployModal
        portfolio={portfolio}
        user={user}
        isOpen={showDeployModal}
        onClose={() => setShowDeployModal(false)}
      />
    </div>
  );
}
