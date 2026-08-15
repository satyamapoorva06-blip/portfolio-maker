'use client';

import React from 'react';
import { PortfolioData } from '@/types/portfolio';
import { Server, Layers, Cpu, Github, Linkedin } from 'lucide-react';

export default function JavaMicroservicesTheme({ data }: { data: PortfolioData }) {
  const p = data.personal;
  const a = data.about;

  return (
    <div className="min-h-screen bg-[#0d0607] text-rose-100 font-sans selection:bg-rose-500 selection:text-white">
      <header className="border-b border-rose-900/50 bg-[#160a0b]/90 backdrop-blur sticky top-0 z-50 px-6 py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2 font-mono text-sm text-rose-400">
            <Server className="w-5 h-5 text-rose-400" />
            <span className="font-bold text-white tracking-wider">{p.name || 'Microservices Architect'}</span>
          </div>
          <span className="px-3 py-1 bg-rose-950 text-rose-300 border border-rose-800 rounded-full text-xs font-mono font-bold">
            JAVA MICROSERVICES ARCHITECT
          </span>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12 space-y-12">
        <section className="p-8 bg-[#1e0e0f] border border-rose-500/30 rounded-3xl space-y-6 shadow-2xl">
          <div className="flex flex-wrap justify-between items-start gap-4 border-b border-rose-900/50 pb-6">
            <div className="space-y-2">
              <span className="text-xs font-mono text-rose-400 font-bold uppercase tracking-widest flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-rose-400" /> DISTRIBUTED MICROSERVICES & KAFKA ARCHITECT
              </span>
              <h1 className="text-4xl sm:text-5xl font-black text-white">{p.name}</h1>
              <p className="text-base text-rose-300 font-mono">{p.title || 'Java Microservices Architect'}</p>
            </div>
            <div className="flex gap-3">
              {p.socials?.github && (
                <a href={p.socials.github} target="_blank" rel="noopener noreferrer" className="p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-300 hover:text-rose-400 transition">
                  <Github className="w-5 h-5" />
                </a>
              )}
              {p.socials?.linkedin && (
                <a href={p.socials.linkedin} target="_blank" rel="noopener noreferrer" className="p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-300 hover:text-rose-400 transition">
                  <Linkedin className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>

          <p className="text-slate-300 text-sm leading-relaxed max-w-3xl font-light">{a.summary}</p>
        </section>

        {data.skills && data.skills.length > 0 && (
          <section className="space-y-6">
            <h2 className="text-xl font-extrabold text-white flex items-center gap-2 border-b border-rose-950 pb-3">
              <Cpu className="w-5 h-5 text-rose-400" /> Microservices & Distributed Stack
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {data.skills.map((grp) => (
                <div key={grp.id} className="p-6 bg-[#1e0e0f] border border-rose-900/50 rounded-2xl space-y-4">
                  <h3 className="text-sm font-bold text-rose-300 font-mono uppercase">{grp.category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {grp.skills.map((sk, idx) => (
                      <span key={idx} className="px-3 py-1 bg-rose-950 text-rose-200 text-xs font-mono rounded-lg border border-rose-800">
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

      <footer className="border-t border-rose-950 py-8 text-center text-xs text-slate-500 font-mono">
        © {new Date().getFullYear()} {p.name}. Java Microservices Architect.
      </footer>
    </div>
  );
}
