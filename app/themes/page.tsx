'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Navbar from '@/components/landing/Navbar';
import { PortfolioData, ThemeType } from '@/types/portfolio';
import { getStoredPortfolios, saveStoredPortfolio, INITIAL_PORTFOLIO } from '@/lib/storage/local-store';
import { Palette, Check, ArrowRight, Sparkles } from 'lucide-react';

const THEMES: { id: ThemeType; name: string; tag: string; desc: string; gradient: string }[] = [
  {
    id: 'minimal',
    name: 'Minimal',
    tag: 'Apple-Inspired',
    desc: 'Clean typography, generous whitespace, subtle animations.',
    gradient: 'from-slate-800 to-slate-900',
  },
  {
    id: 'developer',
    name: 'Developer',
    tag: 'Technical & Code',
    desc: 'Dark theme, IDE terminal bar, monospaced code stack.',
    gradient: 'from-slate-950 via-cyan-950 to-slate-900',
  },
  {
    id: 'creative',
    name: 'Creative',
    tag: 'Bold Typography',
    desc: 'High-impact headline titles, vibrant cards, bold badges.',
    gradient: 'from-purple-900 to-rose-950',
  },
  {
    id: 'three-d',
    name: '3D Spatial',
    tag: 'Cinematic Depth',
    desc: '3D perspective tilt cards, particle background, neon glows.',
    gradient: 'from-cyan-950 to-violet-950',
  },
  {
    id: 'professional',
    name: 'Professional',
    tag: 'Corporate Recruiter',
    desc: 'Executive corporate layout, work history timeline, PDF ready.',
    gradient: 'from-blue-950 to-slate-900',
  },
  {
    id: 'glass',
    name: 'Glassmorphism',
    tag: 'Frosted Glass',
    desc: 'Backdrop blur panels, ambient mesh gradient blur, modern feel.',
    gradient: 'from-slate-900 via-blue-950 to-slate-950',
  },
];

function ThemesContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const portfolioId = searchParams.get('id') || INITIAL_PORTFOLIO.id;

  const [portfolio, setPortfolio] = useState<PortfolioData>(INITIAL_PORTFOLIO);
  const [selectedTheme, setSelectedTheme] = useState<ThemeType>('minimal');

  useEffect(() => {
    const list = getStoredPortfolios();
    const found = list.find((p) => p.id === portfolioId);
    if (found) {
      setPortfolio(found);
      setSelectedTheme(found.customization?.theme || 'minimal');
    }
  }, [portfolioId]);

  const handleSelectTheme = (theme: ThemeType) => {
    setSelectedTheme(theme);
  };

  const handleContinue = () => {
    const updated: PortfolioData = {
      ...portfolio,
      customization: {
        ...portfolio.customization,
        theme: selectedTheme,
      },
    };
    saveStoredPortfolio(updated);
    router.push(`/editor/${updated.id}`);
  };

  return (
    <main className="max-w-6xl mx-auto px-6 py-16 space-y-12">
      <div className="text-center space-y-4">
        <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold bg-cyan-950 px-3 py-1 rounded-full border border-cyan-800">
          Step 03 of 05 — Choose Theme
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white">Select Your Portfolio Theme</h1>
        <p className="text-slate-400 text-base max-w-xl mx-auto">
          Changing themes formats your resume data instantly without losing any content.
        </p>
      </div>

      {/* Theme Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {THEMES.map((t) => {
          const isSelected = selectedTheme === t.id;
          return (
            <div
              key={t.id}
              onClick={() => handleSelectTheme(t.id)}
              className={`p-6 bg-slate-900 border rounded-3xl cursor-pointer transition flex flex-col justify-between space-y-6 ${
                isSelected ? 'border-cyan-400 bg-cyan-950/20 shadow-2xl shadow-cyan-500/20' : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="space-y-4">
                <div className={`h-40 rounded-2xl bg-gradient-to-tr ${t.gradient} p-4 border border-white/10 flex flex-col justify-between relative`}>
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-black/40 px-2.5 py-1 rounded-full text-white backdrop-blur">
                      {t.tag}
                    </span>
                    {isSelected && <Check className="w-5 h-5 text-cyan-400" />}
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-white text-lg">{t.name}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed mt-1">{t.desc}</p>
                </div>
              </div>

              <button
                onClick={() => handleSelectTheme(t.id)}
                className={`w-full py-3 rounded-xl text-xs font-semibold transition ${
                  isSelected ? 'bg-cyan-500 text-slate-950 font-bold' : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                }`}
              >
                {isSelected ? 'Theme Selected' : 'Select Theme'}
              </button>
            </div>
          );
        })}
      </div>

      {/* Continue to Editor CTA */}
      <div className="flex justify-center pt-6">
        <button
          onClick={handleContinue}
          className="px-10 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold rounded-2xl text-base shadow-xl shadow-cyan-500/30 flex items-center gap-3 transition transform hover:-translate-y-0.5"
        >
          Customize in Visual Editor <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </main>
  );
}

export default function ThemesPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      <Navbar />
      <Suspense fallback={<div className="p-12 text-center text-slate-400">Loading themes...</div>}>
        <ThemesContent />
      </Suspense>
    </div>
  );
}
