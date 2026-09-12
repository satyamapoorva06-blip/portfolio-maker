"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { isUserLoggedIn } from "@/lib/storage/local-store";
import {
  Sparkles,
  UploadCloud,
  Layers,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Cpu,
  BarChart3,
  Rocket,
} from "lucide-react";

export default function HeroSection() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    setLoggedIn(isUserLoggedIn());
  }, []);

  const createTarget = loggedIn ? "/upload" : "/login?next=/upload";

  return (
    <section className="relative pt-16 pb-24 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[750px] h-[380px] bg-gradient-to-tr from-cyan-500/20 via-purple-600/20 to-blue-600/20 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-5xl mx-auto px-6 text-center space-y-8 relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-xs font-semibold text-cyan-300">
          <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
          AI CAREER PLATFORM FOR DEVELOPERS
        </div>

        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08] max-w-4xl mx-auto">
          Build, Optimize, Deploy & Analyze Your{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-500">
            AI Portfolio
          </span>
        </h1>

        <p className="text-lg sm:text-xl text-slate-300 font-light leading-relaxed max-w-3xl mx-auto">
          An AI career platform that converts your resume, GitHub repositories,
          and work history into a recruiter-optimized, high-impact live
          portfolio with real-time analytics.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
          <Link
            href={createTarget}
            className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold rounded-2xl text-base shadow-xl shadow-cyan-500/30 flex items-center justify-center gap-3 transition transform hover:-translate-y-1"
          >
            <UploadCloud className="w-5 h-5" /> Build My Portfolio{" "}
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href="/themes"
            className="px-8 py-4 bg-slate-900 hover:bg-slate-800 text-slate-200 font-semibold rounded-2xl text-base border border-slate-800 flex items-center justify-center gap-2 transition"
          >
            <Layers className="w-5 h-5 text-purple-400" /> Browse 61 Themes
          </Link>
        </div>

        {/* Core Product Capabilities Matrix Badges (Requirement I) */}
        <div className="pt-10 border-t border-slate-800/80 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-300">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800">
            <Cpu className="w-4 h-4 text-cyan-400" />
            <span>AI Resume Intelligence</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>GitHub Project Discovery</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span>AI Portfolio Copilot</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800">
            <Rocket className="w-4 h-4 text-blue-400" />
            <span>One-Click Cloud Deploy</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800">
            <BarChart3 className="w-4 h-4 text-amber-400" />
            <span>Recruiter Analytics</span>
          </div>
        </div>
      </div>
    </section>
  );
}
