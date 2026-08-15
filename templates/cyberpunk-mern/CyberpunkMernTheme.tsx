'use client';

import React from 'react';
import { PortfolioData } from '@/types/portfolio';
import { Terminal, Zap, ShieldAlert, Github, Linkedin, ExternalLink } from 'lucide-react';

export default function CyberpunkMernTheme({ data }: { data: PortfolioData }) {
  const p = data.personal;
  const a = data.about;

  return (
    <div className="min-h-screen bg-[#0d0408] text-rose-100 font-mono selection:bg-rose-500 selection:text-black">
      <div className="bg-rose-950 border-b border-rose-800 text-rose-300 text-xs font-bold py-2 px-6 text-center tracking-widest uppercase flex items-center justify-center gap-2">
        <ShieldAlert className="w-4 h-4 text-rose-400 animate-pulse" /> CYBERPUNK MERN STACK & FULLSTACK ARCHITECT
      </div>

      <main className="max-w-6xl mx-auto px-6 py-12 space-y-12">
        <section className="p-8 bg-[#18070e] border-2 border-rose-500/50 rounded-3xl space-y-6 shadow-2xl relative">
          <div className="flex flex-wrap justify-between items-center gap-4">
            <h1 className="text-4xl sm:text-5xl font-black text-white">{p.name}</h1>
            <div className="flex gap-3">
              {p.socials?.github && (
                <a href={p.socials.github} target="_blank" rel="noopener noreferrer" className="p-2.5 bg-black border border-rose-900 rounded-xl text-rose-400 hover:bg-rose-500 hover:text-black transition">
                  <Github className="w-5 h-5" />
                </a>
              )}
              {p.socials?.linkedin && (
                <a href={p.socials.linkedin} target="_blank" rel="noopener noreferrer" className="p-2.5 bg-black border border-rose-900 rounded-xl text-rose-400 hover:bg-rose-500 hover:text-black transition">
                  <Linkedin className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>

          <p className="text-rose-400 font-bold text-base">{p.title || 'Cyberpunk MERN Engineer'}</p>
          <p className="text-slate-300 text-xs leading-relaxed max-w-3xl font-sans">{a.summary}</p>
        </section>

        {data.skills && data.skills.length > 0 && (
          <section className="space-y-6">
            <h2 className="text-xl font-extrabold text-white flex items-center gap-2 border-b border-rose-900 pb-3">
              <Zap className="w-5 h-5 text-rose-400" /> Cyberpunk MERN Stack
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {data.skills.map((grp) => (
                <div key={grp.id} className="p-6 bg-[#18070e] border border-rose-900/60 rounded-2xl space-y-4">
                  <h3 className="text-xs font-bold text-rose-300 uppercase">{grp.category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {grp.skills.map((sk, idx) => (
                      <span key={idx} className="px-3 py-1 bg-black text-rose-300 text-xs font-bold rounded border border-rose-800">
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
            <h2 className="text-xl font-extrabold text-white flex items-center gap-2 border-b border-rose-900 pb-3">
              <Terminal className="w-5 h-5 text-rose-400" /> Cyber Matrix Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data.projects.map((proj) => (
                <div key={proj.id} className="p-6 bg-[#18070e] border border-rose-900/60 rounded-2xl space-y-4 hover:border-rose-400 transition">
                  <h3 className="font-bold text-white text-lg">{proj.name}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed font-sans">{proj.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      <footer className="border-t border-rose-900 py-8 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} {p.name}. Cyberpunk MERN Portfolio.
      </footer>
    </div>
  );
}
