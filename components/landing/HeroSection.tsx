'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { isUserLoggedIn } from '@/lib/storage/local-store';
import { Sparkles, UploadCloud, Rocket, CheckCircle2 } from 'lucide-react';

export default function HeroSection() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    setLoggedIn(isUserLoggedIn());
  }, []);

  const createTarget = loggedIn ? '/upload' : '/login?next=/upload';

  return (
    <section className="relative pt-16 pb-24 overflow-hidden">
      {/* Glow Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-cyan-500/20 to-purple-600/20 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-5xl mx-auto px-6 text-center space-y-8 relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-xs font-semibold text-cyan-300">
          <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
          AI-POWERED PORTFOLIO SAAS PLATFORM
        </div>

        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08] max-w-4xl mx-auto">
          Turn Your Resume Into a <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-500">Stunning Portfolio</span>
        </h1>

        <p className="text-xl text-slate-300 font-light leading-relaxed max-w-2xl mx-auto">
          Upload your resume, choose a design, customize your portfolio, and publish it in minutes.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
          <Link
            href={createTarget}
            className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold rounded-2xl text-base shadow-xl shadow-cyan-500/30 flex items-center justify-center gap-3 transition transform hover:-translate-y-1"
          >
            <UploadCloud className="w-5 h-5" /> Create My Portfolio
          </Link>

          <a
            href="#themes"
            className="px-8 py-4 bg-slate-900 hover:bg-slate-800 text-slate-200 font-semibold rounded-2xl text-base border border-slate-800 flex items-center justify-center gap-2 transition"
          >
            Explore Themes
          </a>
        </div>

        {/* Social Proof */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-wrap items-center justify-center gap-8 text-xs text-slate-400">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Google OAuth Authentication</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>PDF & DOCX AI Resume Analysis</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>GitHub & Vercel Auto-Sync</span>
          </div>
        </div>
      </div>
    </section>
  );
}
