'use client';

import React from 'react';
import { PortfolioData } from '@/types/portfolio';
import { Palette, Layout, Sparkles, Github, Linkedin } from 'lucide-react';

export default function FigmaUiuxTheme({ data }: { data: PortfolioData }) {
  const p = data.personal;
  const a = data.about;

  return (
    <div className="min-h-screen bg-[#070709] text-zinc-100 font-sans selection:bg-pink-500 selection:text-white">
      <header className="border-b border-zinc-800 bg-[#0c0c10]/90 backdrop-blur sticky top-0 z-50 px-6 py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2 font-mono text-sm text-pink-400">
            <Palette className="w-5 h-5 text-pink-400" />
            <span className="font-bold text-white tracking-wider">{p.name || 'UI/UX Designer'}</span>
          </div>
          <span className="px-3 py-1 bg-pink-950 text-pink-300 border border-pink-800 rounded-full text-xs font-mono font-bold">
            FIGMA UI/UX DESIGN
          </span>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12 space-y-12">
        <section className="p-8 bg-[#111116] border border-pink-500/30 rounded-3xl space-y-6 shadow-2xl">
          <div className="flex flex-wrap justify-between items-start gap-4 border-b border-zinc-800 pb-6">
            <div className="space-y-2">
              <span className="text-xs font-mono text-pink-400 font-bold uppercase tracking-widest flex items-center gap-1.5">
                <Layout className="w-4 h-4 text-pink-400" /> FIGMA & UI/UX SYSTEM ARCHITECT
              </span>
              <h1 className="text-4xl sm:text-5xl font-black text-white">{p.name}</h1>
              <p className="text-base text-pink-300 font-mono">{p.title || 'UI/UX & Web Designer'}</p>
            </div>
            <div className="flex gap-3">
              {p.socials?.github && (
                <a href={p.socials.github} target="_blank" rel="noopener noreferrer" className="p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-300 hover:text-pink-400 transition">
                  <Github className="w-5 h-5" />
                </a>
              )}
              {p.socials?.linkedin && (
                <a href={p.socials.linkedin} target="_blank" rel="noopener noreferrer" className="p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-300 hover:text-pink-400 transition">
                  <Linkedin className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>

          <p className="text-zinc-300 text-sm leading-relaxed max-w-3xl font-light">{a.summary}</p>
        </section>

        {data.skills && data.skills.length > 0 && (
          <section className="space-y-6">
            <h2 className="text-xl font-extrabold text-white flex items-center gap-2 border-b border-zinc-800 pb-3">
              <Sparkles className="w-5 h-5 text-pink-400" /> Figma & Interface Stack
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {data.skills.map((grp) => (
                <div key={grp.id} className="p-6 bg-[#111116] border border-zinc-800 rounded-2xl space-y-4">
                  <h3 className="text-sm font-bold text-pink-300 font-mono uppercase">{grp.category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {grp.skills.map((sk, idx) => (
                      <span key={idx} className="px-3 py-1 bg-pink-950 text-pink-200 text-xs font-mono rounded-lg border border-pink-800">
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      <footer className="border-t border-zinc-800 py-8 text-center text-xs text-zinc-500 font-mono">
        © {new Date().getFullYear()} {p.name}. Figma UI/UX Portfolio.
      </footer>
    </div>
  );
}
