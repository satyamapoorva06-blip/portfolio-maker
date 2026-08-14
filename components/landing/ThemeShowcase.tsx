'use client';

import React from 'react';
import Link from 'next/link';
import { Palette, ArrowUpRight, Check, Sparkles } from 'lucide-react';

const THEME_LIST = [
  {
    id: 'minimal',
    name: 'Theme 1 — Minimal',
    tagline: 'Apple-Inspired & Clean',
    description: 'Generous whitespace, elegant typography, and subtle slide transitions.',
    badge: 'Popular',
    gradient: 'from-slate-800 to-slate-900',
  },
  {
    id: 'developer',
    name: 'Theme 2 — Developer',
    tagline: 'Dark & Monospaced Code',
    description: 'IDE terminal headers, command prompts, and monospaced tech matrix.',
    badge: 'Developer Favorite',
    gradient: 'from-slate-950 via-cyan-950 to-slate-900',
  },
  {
    id: 'creative',
    name: 'Theme 3 — Creative',
    tagline: 'Bold & Vibrant Layouts',
    description: 'High-impact headline typography, vibrant cards, and playful badges.',
    badge: 'Bold Design',
    gradient: 'from-purple-900 to-rose-950',
  },
  {
    id: 'three-d',
    name: 'Theme 4 — 3D Spatial',
    tagline: 'Cinematic Depth & Neon Glows',
    description: '3D perspective tilt cards, spatial depth effects, and neon glows.',
    badge: 'Cinematic',
    gradient: 'from-cyan-950 to-violet-950',
  },
  {
    id: 'professional',
    name: 'Theme 5 — Professional',
    tagline: 'Recruiter-Friendly Corporate',
    description: 'Executive corporate layout, structured work timeline, and PDF print ready.',
    badge: 'Corporate',
    gradient: 'from-blue-950 to-slate-900',
  },
  {
    id: 'glass',
    name: 'Theme 6 — Glassmorphism',
    tagline: 'Frosted Glass & Mesh Glow',
    description: 'Backdrop blur panels, ambient mesh gradient blur, and sleek micro-interactions.',
    badge: 'SaaS Modern',
    gradient: 'from-slate-900 via-blue-950 to-slate-950',
  },
];

export default function ThemeShowcase() {
  return (
    <section id="themes" className="py-24 bg-slate-950 relative">
      <div className="max-w-7xl mx-auto px-6 space-y-16">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-400/20 text-xs font-semibold text-purple-300">
            <Palette className="w-4 h-4 text-purple-400" />
            6 HANDCRAFTED THEMES
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
            Choose a Design That Fits Your Brand
          </h2>
          <p className="text-slate-400 text-base">
            Every theme automatically formats your structured resume data into responsive, high-converting portfolios.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {THEME_LIST.map((t) => (
            <div
              key={t.id}
              className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6 flex flex-col justify-between hover:border-cyan-500/40 transition group shadow-xl"
            >
              <div className="space-y-4">
                <div className={`h-40 rounded-2xl bg-gradient-to-tr ${t.gradient} p-4 border border-white/10 flex flex-col justify-between relative overflow-hidden`}>
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-black/40 px-2.5 py-1 rounded-full text-white backdrop-blur">
                      {t.badge}
                    </span>
                    <Sparkles className="w-4 h-4 text-cyan-400 opacity-60" />
                  </div>
                  <div className="text-white font-bold text-lg tracking-tight group-hover:text-cyan-400 transition">
                    {t.name}
                  </div>
                </div>

                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-white">{t.name}</h3>
                  <p className="text-xs font-medium text-cyan-400">{t.tagline}</p>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed">{t.description}</p>
              </div>

              <Link
                href="/upload"
                className="w-full py-3 bg-slate-800 hover:bg-cyan-600 text-slate-200 hover:text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition"
              >
                Use This Theme <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
