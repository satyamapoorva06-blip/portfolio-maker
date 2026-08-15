'use client';

import React from 'react';
import { PortfolioData } from '@/types/portfolio';
import { ArrowUpRight, Github, Linkedin, Mail, Globe, Sparkles } from 'lucide-react';

export default function OneHourDigitalTheme({ data }: { data: PortfolioData }) {
  const p = data.personal;
  const a = data.about;

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 font-sans selection:bg-rose-500 selection:text-white">
      {/* Top Navbar */}
      <header className="border-b border-zinc-900 bg-[#09090b]/80 backdrop-blur sticky top-0 z-50 px-8 py-5 flex justify-between items-center">
        <div className="flex items-center gap-2 font-bold text-base tracking-tighter">
          <span className="w-3 h-3 rounded-full bg-rose-500"></span>
          <span>{p.name || 'Creative Developer'}</span>
        </div>
        <div className="flex gap-4 text-xs font-mono text-zinc-400">
          <span>ONEHOUR DIGITAL SHOWCASE</span>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-8 py-16 space-y-20">
        {/* Fullscreen Editorial Hero */}
        <section className="space-y-8 max-w-4xl">
          <span className="px-3.5 py-1 rounded-full bg-rose-950/80 border border-rose-800 text-rose-300 text-xs font-mono font-semibold inline-block">
            CREATIVE DIGITAL ARCHITECT
          </span>
          <h1 className="text-5xl sm:text-7xl font-black text-white tracking-tight leading-[1.05]">
            Crafting <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-amber-300">Modern Digital</span> Experiences.
          </h1>
          <p className="text-lg text-zinc-300 font-light leading-relaxed">{a.summary}</p>
        </section>

        {/* Selected Work Grid */}
        {data.projects && data.projects.length > 0 && (
          <section className="space-y-8">
            <h2 className="text-xs font-mono uppercase tracking-widest text-rose-400 font-bold border-b border-zinc-900 pb-3">
              SELECTED PROJECTS ({data.projects.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {data.projects.map((proj) => (
                <div key={proj.id} className="p-8 bg-zinc-900/60 border border-zinc-800/80 rounded-3xl space-y-4 hover:border-rose-500/50 transition group">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-white text-2xl group-hover:text-rose-400 transition">{proj.name}</h3>
                    <ArrowUpRight className="w-5 h-5 text-rose-400 opacity-60 group-hover:opacity-100 transition" />
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed font-light">{proj.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {data.skills && data.skills.length > 0 && (
          <section className="space-y-8">
            <h2 className="text-xs font-mono uppercase tracking-widest text-rose-400 font-bold border-b border-zinc-900 pb-3">
              EXPERTISE & STACK
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {data.skills.map((grp) => (
                <div key={grp.id} className="p-6 bg-zinc-900/60 border border-zinc-800/80 rounded-2xl space-y-4">
                  <h3 className="text-xs font-bold text-rose-300 font-mono uppercase">{grp.category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {grp.skills.map((sk, idx) => (
                      <span key={idx} className="px-3 py-1 bg-zinc-950 border border-zinc-800 text-zinc-300 text-xs font-mono rounded-lg">
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

      <footer className="border-t border-zinc-900 py-10 text-center text-xs text-zinc-600 font-mono">
        © {new Date().getFullYear()} {p.name}. OneHour Digital Showcase.
      </footer>
    </div>
  );
}
