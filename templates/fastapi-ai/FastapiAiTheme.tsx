'use client';

import React from 'react';
import { PortfolioData } from '@/types/portfolio';
import { Terminal, Cpu, Zap, Github, Linkedin } from 'lucide-react';

export default function FastapiAiTheme({ data }: { data: PortfolioData }) {
  const p = data.personal;
  const a = data.about;

  return (
    <div className="min-h-screen bg-[#050b07] text-emerald-100 font-mono selection:bg-emerald-500 selection:text-black">
      <header className="border-b border-emerald-900/50 bg-[#08130c]/90 backdrop-blur sticky top-0 z-50 px-6 py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2 text-sm text-emerald-400">
            <Terminal className="w-5 h-5 text-emerald-400" />
            <span className="font-bold text-white tracking-wider">{p.name || 'Python AI Engineer'}</span>
          </div>
          <span className="px-3 py-1 bg-emerald-950 text-emerald-300 border border-emerald-800 rounded-full text-xs font-bold">
            PYTHON FASTAPI AI
          </span>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12 space-y-12">
        <section className="p-8 bg-[#0b1b11] border border-emerald-500/30 rounded-3xl space-y-6 shadow-2xl">
          <div className="flex flex-wrap justify-between items-start gap-4 border-b border-emerald-900/50 pb-6">
            <div className="space-y-2">
              <span className="text-xs text-emerald-400 font-bold uppercase tracking-widest flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-emerald-400" /> FASTAPI ASYNC BACKEND & AI MODEL ARCHITECT
              </span>
              <h1 className="text-4xl sm:text-5xl font-black text-white">{p.name}</h1>
              <p className="text-base text-emerald-300">{p.title || 'Python FastAPI AI Developer'}</p>
            </div>
            <div className="flex gap-3">
              {p.socials?.github && (
                <a href={p.socials.github} target="_blank" rel="noopener noreferrer" className="p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-300 hover:text-emerald-400 transition">
                  <Github className="w-5 h-5" />
                </a>
              )}
              {p.socials?.linkedin && (
                <a href={p.socials.linkedin} target="_blank" rel="noopener noreferrer" className="p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-300 hover:text-emerald-400 transition">
                  <Linkedin className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>

          <p className="text-slate-300 text-sm leading-relaxed max-w-3xl font-light font-sans">{a.summary}</p>
        </section>

        {data.skills && data.skills.length > 0 && (
          <section className="space-y-6">
            <h2 className="text-xl font-extrabold text-white flex items-center gap-2 border-b border-emerald-950 pb-3">
              <Cpu className="w-5 h-5 text-emerald-400" /> Python, FastAPI & AI Inference Stack
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {data.skills.map((grp) => (
                <div key={grp.id} className="p-6 bg-[#0b1b11] border border-emerald-900/50 rounded-2xl space-y-4">
                  <h3 className="text-sm font-bold text-emerald-300 uppercase">{grp.category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {grp.skills.map((sk, idx) => (
                      <span key={idx} className="px-3 py-1 bg-emerald-950 text-emerald-200 text-xs rounded-lg border border-emerald-800">
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

      <footer className="border-t border-emerald-950 py-8 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} {p.name}. Python FastAPI AI Portfolio.
      </footer>
    </div>
  );
}
