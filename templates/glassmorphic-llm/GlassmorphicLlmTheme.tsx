'use client';

import React from 'react';
import { PortfolioData } from '@/types/portfolio';
import { Sparkles, Layers, Cpu, Github, Linkedin, ExternalLink } from 'lucide-react';

export default function GlassmorphicLlmTheme({ data }: { data: PortfolioData }) {
  const p = data.personal;
  const a = data.about;

  return (
    <div className="min-h-screen bg-[#050711] text-indigo-100 font-sans selection:bg-blue-500 selection:text-white">
      <header className="border-b border-indigo-900/50 bg-[#080d21]/80 backdrop-blur-xl sticky top-0 z-50 px-6 py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2 font-mono text-sm text-indigo-400">
            <Sparkles className="w-5 h-5 text-indigo-400" />
            <span className="font-bold text-white tracking-wider">{p.name || 'LLM Architect'}</span>
          </div>
          <span className="px-3 py-1 bg-indigo-950/80 text-indigo-300 border border-indigo-800 rounded-full text-xs font-mono font-bold backdrop-blur">
            GLASSMORPHIC LLM STUDIO
          </span>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12 space-y-12">
        <section className="p-8 bg-[#0c132f]/80 backdrop-blur-2xl border border-indigo-400/30 rounded-3xl space-y-6 shadow-2xl">
          <div className="flex flex-wrap justify-between items-start gap-4 border-b border-indigo-900/50 pb-6">
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl font-black text-white">{p.name}</h1>
              <p className="text-base text-indigo-300 font-mono">{p.title || 'LLM & AI Engineer'}</p>
            </div>
            <div className="flex gap-3">
              {p.socials?.github && (
                <a href={p.socials.github} target="_blank" rel="noopener noreferrer" className="p-2.5 bg-slate-900/80 border border-slate-800 rounded-xl text-slate-300 hover:text-indigo-400 transition">
                  <Github className="w-5 h-5" />
                </a>
              )}
              {p.socials?.linkedin && (
                <a href={p.socials.linkedin} target="_blank" rel="noopener noreferrer" className="p-2.5 bg-slate-900/80 border border-slate-800 rounded-xl text-slate-300 hover:text-indigo-400 transition">
                  <Linkedin className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>

          <p className="text-slate-300 text-sm leading-relaxed max-w-3xl font-light">{a.summary}</p>
        </section>

        {data.skills && data.skills.length > 0 && (
          <section className="space-y-6">
            <h2 className="text-xl font-extrabold text-white flex items-center gap-2 border-b border-indigo-950 pb-3">
              <Cpu className="w-5 h-5 text-indigo-400" /> LLM Architecture Stack
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {data.skills.map((grp) => (
                <div key={grp.id} className="p-6 bg-[#0c132f]/80 backdrop-blur-xl border border-indigo-900/50 rounded-2xl space-y-4">
                  <h3 className="text-sm font-bold text-indigo-300 font-mono uppercase">{grp.category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {grp.skills.map((sk, idx) => (
                      <span key={idx} className="px-3 py-1 bg-indigo-950/80 text-indigo-200 text-xs font-mono rounded-lg border border-indigo-800">
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {data.projects && data.projects.length > 0 && (
          <section className="space-y-6">
            <h2 className="text-xl font-extrabold text-white flex items-center gap-2 border-b border-indigo-950 pb-3">
              <Layers className="w-5 h-5 text-indigo-400" /> Glassmorphic LLM Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data.projects.map((proj) => (
                <div key={proj.id} className="p-6 bg-[#0c132f]/80 backdrop-blur-xl border border-indigo-900/50 rounded-2xl space-y-4 hover:border-indigo-400 transition">
                  <h3 className="font-bold text-white text-lg">{proj.name}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">{proj.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      <footer className="border-t border-indigo-950 py-8 text-center text-xs text-slate-500 font-mono">
        © {new Date().getFullYear()} {p.name}. Glassmorphic LLM Studio Portfolio.
      </footer>
    </div>
  );
}
