'use client';

import React from 'react';
import { PortfolioData } from '@/types/portfolio';
import { Activity, Server, Cpu, Layers, Github, Linkedin, ExternalLink, Globe, Shield } from 'lucide-react';

export default function ReactiveFullstackTheme({ data }: { data: PortfolioData }) {
  const p = data.personal;
  const a = data.about;

  return (
    <div className="min-h-screen bg-[#070e17] text-slate-100 font-sans selection:bg-cyan-500 selection:text-black">
      {/* Top Status Header */}
      <nav className="border-b border-cyan-950 bg-[#091524]/90 backdrop-blur sticky top-0 z-50 px-6 py-3.5">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping"></span>
            <span className="font-bold text-white text-sm tracking-tight">{p.name || 'Fullstack Developer'}</span>
          </div>
          <div className="flex items-center gap-3 text-xs font-mono">
            <span className="px-2.5 py-0.5 rounded bg-cyan-950 border border-cyan-800 text-cyan-300 font-semibold">
              API STATUS: 200 OK
            </span>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-12 space-y-12">
        {/* Reactive Hero Header */}
        <section className="p-8 bg-[#0b1b2e] border border-cyan-500/30 rounded-3xl space-y-6 shadow-2xl relative overflow-hidden">
          <div className="flex flex-wrap justify-between items-start gap-4 border-b border-cyan-900/50 pb-6">
            <div className="space-y-2">
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-widest flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-cyan-400" /> FULLSTACK REACTIVE SYSTEM ARCHITECT
              </span>
              <h1 className="text-4xl sm:text-5xl font-black text-white">{p.name}</h1>
              <p className="text-base text-cyan-300 font-mono">{p.title || 'Full Stack Web Developer'}</p>
            </div>
            <div className="flex gap-3">
              {p.socials?.github && (
                <a href={p.socials.github} target="_blank" rel="noopener noreferrer" className="p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-300 hover:text-cyan-400 transition">
                  <Github className="w-5 h-5" />
                </a>
              )}
              {p.socials?.linkedin && (
                <a href={p.socials.linkedin} target="_blank" rel="noopener noreferrer" className="p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-300 hover:text-cyan-400 transition">
                  <Linkedin className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>

          <p className="text-slate-300 text-sm leading-relaxed max-w-3xl font-light">{a.summary}</p>
        </section>

        {/* Tech Stack Skills */}
        {data.skills && data.skills.length > 0 && (
          <section className="space-y-6">
            <h2 className="text-xl font-extrabold text-white flex items-center gap-2 border-b border-cyan-950 pb-3">
              <Server className="w-5 h-5 text-cyan-400" /> Reactive Tech Stack & Infrastructure
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {data.skills.map((grp) => (
                <div key={grp.id} className="p-6 bg-[#0b1b2e] border border-cyan-900/50 rounded-2xl space-y-4">
                  <h3 className="text-sm font-bold text-cyan-300 font-mono">{grp.category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {grp.skills.map((sk, idx) => (
                      <span key={idx} className="px-3 py-1 bg-cyan-950/80 border border-cyan-800/80 text-cyan-200 text-xs font-mono rounded-lg">
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {data.projects && data.projects.length > 0 && (
          <section className="space-y-6">
            <h2 className="text-xl font-extrabold text-white flex items-center gap-2 border-b border-cyan-950 pb-3">
              <Layers className="w-5 h-5 text-cyan-400" /> Web Applications & Fullstack Services
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data.projects.map((proj) => (
                <div key={proj.id} className="p-6 bg-[#0b1b2e] border border-cyan-900/50 rounded-2xl space-y-4 hover:border-cyan-400 transition">
                  <h3 className="font-bold text-white text-lg">{proj.name}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">{proj.description}</p>
                  {proj.technologies && proj.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {proj.technologies.map((t, idx) => (
                        <span key={idx} className="text-[10px] bg-black text-cyan-300 px-2.5 py-1 rounded font-mono border border-cyan-950">
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      <footer className="border-t border-cyan-950 py-8 text-center text-xs text-slate-500 font-mono">
        © {new Date().getFullYear()} {p.name}. Fullstack Reactive Portfolio.
      </footer>
    </div>
  );
}
