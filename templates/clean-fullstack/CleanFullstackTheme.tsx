'use client';

import React from 'react';
import { PortfolioData } from '@/types/portfolio';
import { Code, Server, Layers, Github, Linkedin } from 'lucide-react';

export default function CleanFullstackTheme({ data }: { data: PortfolioData }) {
  const p = data.personal;
  const a = data.about;

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-200 font-sans selection:bg-slate-700 selection:text-white">
      <header className="border-b border-slate-800 bg-[#0b0e17]/90 backdrop-blur sticky top-0 z-50 px-6 py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2 font-mono text-sm text-slate-300">
            <Code className="w-5 h-5 text-slate-300" />
            <span className="font-bold text-white tracking-wider">{p.name || 'Fullstack Engineer'}</span>
          </div>
          <span className="px-3 py-1 bg-slate-900 text-slate-300 border border-slate-700 rounded-full text-xs font-mono font-bold">
            CLEAN FULL STACK
          </span>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12 space-y-12">
        <section className="p-8 bg-[#0f1422] border border-slate-700/50 rounded-3xl space-y-6 shadow-2xl">
          <div className="flex flex-wrap justify-between items-start gap-4 border-b border-slate-800 pb-6">
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl font-black text-white">{p.name}</h1>
              <p className="text-base text-slate-300 font-mono">{p.title || 'Clean Full Stack Engineer'}</p>
            </div>
            <div className="flex gap-3">
              {p.socials?.github && (
                <a href={p.socials.github} target="_blank" rel="noopener noreferrer" className="p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-300 hover:text-white transition">
                  <Github className="w-5 h-5" />
                </a>
              )}
              {p.socials?.linkedin && (
                <a href={p.socials.linkedin} target="_blank" rel="noopener noreferrer" className="p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-300 hover:text-white transition">
                  <Linkedin className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>

          <p className="text-slate-300 text-sm leading-relaxed max-w-3xl font-light">{a.summary}</p>
        </section>

        {data.skills && data.skills.length > 0 && (
          <section className="space-y-6">
            <h2 className="text-xl font-extrabold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
              <Server className="w-5 h-5 text-slate-300" /> Full Stack Tech Stack
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {data.skills.map((grp) => (
                <div key={grp.id} className="p-6 bg-[#0f1422] border border-slate-800 rounded-2xl space-y-4">
                  <h3 className="text-sm font-bold text-slate-300 font-mono uppercase">{grp.category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {grp.skills.map((sk, idx) => (
                      <span key={idx} className="px-3 py-1 bg-slate-900 text-slate-200 text-xs font-mono rounded-lg border border-slate-700">
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

      <footer className="border-t border-slate-800 py-8 text-center text-xs text-slate-500 font-mono">
        © {new Date().getFullYear()} {p.name}. Clean Full Stack Portfolio.
      </footer>
    </div>
  );
}
