"use client";

import React from "react";
import Link from "next/link";
import {
  Palette,
  ArrowUpRight,
  Sparkles,
  Zap,
  Crown,
  Flame,
  ArrowRight,
  Layers,
} from "lucide-react";

const TOP_1_THEME_ITEM = {
  id: "top1-premier",
  name: "👑 TOP 1 PREMIER FLAGSHIP THEME",
  tagline:
    "Senior SDE & AI/ML Developer Flagship Portfolio (Satyam Kumar Edition)",
  badge: "👑 TOP 1 FLAGSHIP",
  gradient: "from-black via-[#0d0d0d] to-[#e50914]",
};

// 6 Featured Themes for Landing Page (representing the 61-theme catalog)
const FEATURED_LANDING_THEMES = [
  {
    id: "animated-laser-neon",
    name: "Cyber Laser Motion",
    tagline: "Laser Beams & Glowing Particles",
    badge: "Animated ⚡",
    gradient: "from-[#ff0055] via-[#00f0ff] to-black",
  },
  {
    id: "animated-3d-orbs",
    name: "3D Spatial Floating Orbs",
    tagline: "3D Perspective & Spatial Depth",
    badge: "Animated ⚡",
    gradient: "from-violet-950 via-pink-950 to-[#030712]",
  },
  {
    id: "kuber-ai-creative",
    name: "Neural Spectrum AI",
    tagline: "AI / Creative Agentic Studio",
    badge: "AI Creative",
    gradient: "from-purple-900 via-pink-950 to-slate-950",
  },
  {
    id: "tvnskm-aiml-fullstack",
    name: "Quantum FullStack Matrix",
    tagline: "AI/ML + Full Stack Engineer",
    badge: "AI Matrix",
    gradient: "from-cyan-950 via-purple-950 to-black",
  },
  {
    id: "nishil-cloud",
    name: "Cloud DevOps Architect",
    tagline: "AI/ML + Cloud Infrastructure",
    badge: "Cloud Architect",
    gradient: "from-[#080d1a] to-blue-950",
  },
  {
    id: "harsh-aiml-mern",
    name: "Cyberpunk MERN Stack",
    tagline: "AIML + MERN Full Stack",
    badge: "Cyberpunk",
    gradient: "from-zinc-950 to-red-950",
  },
];

export default function ThemeShowcase() {
  return (
    <section id="themes" className="py-24 bg-slate-950 relative">
      <div className="max-w-7xl mx-auto px-6 space-y-16">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-400/20 text-xs font-semibold text-purple-300">
            <Palette className="w-4 h-4 text-purple-400" />
            61 HANDCRAFTED PORTFOLIO THEMES
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
            61 Professional Developer Themes
          </h2>
          <p className="text-slate-400 text-base">
            Featuring 1 Premier Flagship Theme, 10 Animated Kinetic Themes, and
            50 Specialized Professional Designs.
          </p>
        </div>

        {/* TOP 1 PREMIER PORTFOLIO THEME SECTION */}
        <div className="space-y-6">
          <h3 className="text-xl font-black text-[#e50914] flex items-center gap-2 border-b border-[#e50914]/30 pb-3">
            <Crown className="w-6 h-6 text-[#e50914] animate-bounce" /> TOP 1
            PREMIER PORTFOLIO THEME
          </h3>
          <div className="p-8 bg-[#0a0a0e] border-2 border-[#e50914]/50 rounded-3xl space-y-6 shadow-2xl relative overflow-hidden group hover:border-[#e50914] transition duration-500">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div className="space-y-3 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#17171c] border border-[#e50914]/40 text-[#e50914] text-xs font-mono font-bold rounded-full">
                  <Flame className="w-3.5 h-3.5 fill-[#e50914]" /> FLAGSHIP
                  EDITION • SATYAM KUMAR
                </div>
                <h4 className="text-2xl sm:text-3xl font-black text-white">
                  {TOP_1_THEME_ITEM.name}
                </h4>
                <p className="text-sm text-slate-300 leading-relaxed font-light">
                  {TOP_1_THEME_ITEM.tagline}
                </p>
              </div>

              <Link
                href="/upload"
                className="px-6 py-3.5 bg-[#e50914] hover:bg-[#ff1e27] text-white font-extrabold text-xs rounded-2xl shadow-xl shadow-[#e50914]/30 flex items-center gap-2 transition transform hover:-translate-y-0.5 shrink-0"
              >
                Use Top 1 Premier Theme <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Featured Themes Grid */}
        <div className="space-y-6 pt-6 border-t border-slate-800">
          <div className="flex justify-between items-center border-b border-slate-800 pb-3">
            <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-cyan-400" /> Featured Themes
              Preview
            </h3>
            <Link
              href="/themes"
              className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
            >
              View Catalog <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURED_LANDING_THEMES.map((t) => (
              <div
                key={t.id}
                className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 flex flex-col justify-between hover:border-cyan-500/40 transition group shadow-xl"
              >
                <div className="space-y-3">
                  <div
                    className={`h-32 rounded-2xl bg-gradient-to-tr ${t.gradient} p-4 border border-white/10 flex flex-col justify-between relative overflow-hidden`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-black/60 px-2.5 py-1 rounded-full text-cyan-300 backdrop-blur">
                        {t.badge}
                      </span>
                      <Sparkles className="w-4 h-4 text-white/70" />
                    </div>
                    <div className="text-white font-bold text-sm tracking-tight truncate group-hover:text-cyan-300 transition">
                      {t.name}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-white truncate">
                      {t.name}
                    </h4>
                    <p className="text-xs font-medium text-slate-400 truncate">
                      {t.tagline}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <Link
                    href={`/themes?id=${t.id}`}
                    className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition"
                  >
                    Preview
                  </Link>
                  <Link
                    href="/upload"
                    className="flex-1 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition shadow"
                  >
                    Use Theme <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Prominent View All 61 Themes CTA Button (Requirement B) */}
        <div className="text-center pt-8">
          <Link
            href="/themes"
            className="inline-flex px-8 py-4 bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white font-extrabold rounded-2xl text-base shadow-xl shadow-purple-500/20 items-center gap-3 transition transform hover:-translate-y-1"
          >
            <Layers className="w-5 h-5" /> View All 61 Themes{" "}
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
