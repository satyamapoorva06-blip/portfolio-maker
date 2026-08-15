'use client';

import React from 'react';
import { PortfolioData } from '@/types/portfolio';
import { Zap, Layers, Cpu, Github, Linkedin } from 'lucide-react';

export default function MernNeonTheme({ data }: { data: PortfolioData }) {
  const p = data.personal;
  const a = data.about;

  return (
    <div className="min-h-screen bg-[#07040d] text-purple-100 font-sans selection:bg-pink-500 selection:text-white">
      <div className="bg-gradient-to-r from-purple-600 via-pink-500 to-cyan-500 text-black text-xs font-black py-2 px-6 text-center uppercase tracking-widest">
        ⚡ MERN STACK NEON & FULLSTACK DEVELOPER PORTFOLIO
      </div>

      <main className="max-w-6xl mx-auto px-6 py-12 space-y-16">
        <section className="bg-[#0f091c] border-2 border-purple-500/40 rounded-3xl p-8 sm:p-12 space-y-6 shadow-2xl">
          <div className="flex flex-wrap justify-between items-center gap-4">
            <h1 className="text-5xl sm:text-6xl font-black text-white">{p.name}</h1>
            <div className="flex gap-3">
              {p.socials?.github && (
                <a href={p.socials.github} target="_blank" rel="noopener noreferrer" className="p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-purple-300 hover:text-cyan-400 transition">
                  <Github className="w-5 h-5" />
                </a>
              )}
              {p.socials?.linkedin && (
                <a href={p.socials.linkedin} target="_blank" rel="noopener noreferrer" className="p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-purple-300 hover:text-cyan-400 transition">
                  <Linkedin className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>

          <p className="text-xl text-purple-300 font-bold font-mono">{p.title || 'MERN Stack Developer'}</p>
          <p className="text-slate-300 text-sm leading-relaxed max-w-3xl font-light">{a.summary}</p>
        </section>

        {data.skills && data.skills.length > 0 && (
          <section className="space-y-6">
            <h2 className="text-2xl font-black text-white flex items-center gap-2 border-b border-purple-950 pb-3">
              <Zap className="w-6 h-6 text-purple-400" /> MERN Tech Stack
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {data.skills.map((grp) => (
                <div key={grp.id} className="p-6 bg-[#0f091c] border border-purple-900/60 rounded-2xl space-y-4">
                  <h3 className="text-sm font-bold text-purple-300 font-mono uppercase">{grp.category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {grp.skills.map((sk, idx) => (
                      <span key={idx} className="px-3 py-1 bg-purple-950 text-purple-300 text-xs font-bold font-mono rounded-lg border border-purple-800">
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

      <footer className="border-t border-purple-950 py-8 text-center text-xs text-slate-500 font-mono">
        © {new Date().getFullYear()} {p.name}. MERN Stack Neon Portfolio.
      </footer>
    </div>
  );
}
