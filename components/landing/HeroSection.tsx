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

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        {/* Hero Left Text */}
        <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-xs font-semibold text-cyan-300">
            <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
            AI-POWERED PORTFOLIO SAAS PLATFORM
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08]">
            Turn Your Resume Into a <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-500">Stunning Portfolio</span>
          </h1>

          <p className="text-xl text-slate-300 font-light leading-relaxed max-w-2xl mx-auto lg:mx-0">
            Upload your resume, choose a design, customize your portfolio, and publish it in minutes.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2">
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
          <div className="pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-400">
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

        {/* Hero Right Floating Preview Mockup */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="relative w-full max-w-md">
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500 to-purple-600 rounded-3xl blur-2xl opacity-30 transform rotate-3"></div>

            <div className="relative bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-6 backdrop-blur-xl">
              <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                <div className="flex gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500"></span>
                  <span className="w-3 h-3 rounded-full bg-amber-500"></span>
                  <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                </div>
                <span className="text-[11px] font-mono text-cyan-400 bg-cyan-950/80 px-3 py-0.5 rounded-full border border-cyan-800">
                  satyam.portify.app
                </span>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-purple-600 text-white font-extrabold text-2xl flex items-center justify-center shadow-lg shadow-cyan-500/20 border-2 border-cyan-400/40">
                    SK
                  </div>
                  <div>
                    <h3 className="font-extrabold text-white text-lg tracking-tight">Satyam Kumar</h3>
                    <p className="text-xs font-mono text-cyan-400 font-semibold">Senior AI & Systems Engineer</p>
                    <p className="text-[11px] text-slate-400">India</p>
                  </div>
                </div>

                <div className="p-3.5 bg-slate-950/80 rounded-xl border border-slate-800 text-xs text-slate-300 leading-relaxed font-light">
                  &quot;Architected autonomous AI workflows, microservices, and full-stack cloud applications.&quot;
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {['TypeScript', 'Next.js', 'Python', 'Supabase', 'Vercel'].map((t, idx) => (
                    <span key={idx} className="text-[10px] bg-slate-800 text-cyan-300 px-2.5 py-1 rounded-lg border border-slate-700 font-mono">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="p-3 bg-emerald-950/60 border border-emerald-500/30 rounded-xl flex items-center justify-between text-xs text-emerald-300">
                  <span className="flex items-center gap-2 font-medium">
                    <Rocket className="w-4 h-4 text-emerald-400" /> Published to Vercel
                  </span>
                  <span className="font-mono text-[10px] bg-emerald-900 px-2.5 py-0.5 rounded text-emerald-200 font-bold">
                    LIVE 200 OK
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
