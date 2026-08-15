'use client';

import React from 'react';
import { PortfolioData } from '@/types/portfolio';
import { Zap, Layers, Cpu, Rocket, Github, Linkedin, Globe } from 'lucide-react';

export default function HighimpactMernTheme({ data }: { data: PortfolioData }) {
  const p = data.personal;
  const a = data.about;

  return (
    <div className="min-h-screen bg-[#06120d] text-slate-100 font-sans selection:bg-emerald-400 selection:text-black">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-black text-xs font-black py-2 px-6 text-center uppercase tracking-widest">
        ⚡ HIGH-IMPACT MERN STACK & FULLSTACK ARCHITECT PORTFOLIO
      </div>

      <main className="max-w-6xl mx-auto px-6 py-12 space-y-16">
        {/* MERN Hero Section */}
        <section className="bg-[#091f16] border-2 border-emerald-500/40 rounded-3xl p-8 sm:p-12 space-y-6 shadow-2xl relative">
          <div className="flex flex-wrap justify-between items-center gap-4">
            <span className="px-3.5 py-1.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-700 text-xs font-bold font-mono">
              MONGO • EXPRESS • REACT • NODE
            </span>
            <div className="flex gap-3">
              {p.socials?.github && (
                <a href={p.socials.github} target="_blank" rel="noopener noreferrer" className="p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-emerald-400 hover:bg-emerald-500 hover:text-black transition">
                  <Github className="w-5 h-5" />
                </a>
              )}
              {p.socials?.linkedin && (
                <a href={p.socials.linkedin} target="_blank" rel="noopener noreferrer" className="p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-emerald-400 hover:bg-emerald-500 hover:text-black transition">
                  <Linkedin className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>

          <div className="space-y-3">
            <h1 className="text-5xl sm:text-6xl font-black text-white tracking-tight leading-tight">
              {p.name}
            </h1>
            <p className="text-xl text-emerald-400 font-bold font-mono">{p.title || 'MERN Stack Developer'}</p>
          </div>

          <p className="text-slate-300 leading-relaxed text-sm sm:text-base max-w-3xl font-light">{a.summary}</p>
        </section>

        {/* Skills */}
        {data.skills && data.skills.length > 0 && (
          <section className="space-y-6">
            <h2 className="text-2xl font-black text-white flex items-center gap-2 border-b border-emerald-950 pb-3">
              <Zap className="w-6 h-6 text-emerald-400" /> MERN Ecosystem & Database Stack
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {data.skills.map((grp) => (
                <div key={grp.id} className="p-6 bg-[#091f16] border border-emerald-900/60 rounded-2xl space-y-4">
                  <h3 className="text-sm font-bold text-emerald-300 font-mono uppercase">{grp.category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {grp.skills.map((sk, idx) => (
                      <span key={idx} className="px-3 py-1 bg-emerald-950 text-emerald-300 text-xs font-bold font-mono rounded-lg border border-emerald-800">
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
            <h2 className="text-2xl font-black text-white flex items-center gap-2 border-b border-emerald-950 pb-3">
              <Rocket className="w-6 h-6 text-emerald-400" /> MERN Web Applications
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data.projects.map((proj) => (
                <div key={proj.id} className="p-6 bg-[#091f16] border border-emerald-900/60 rounded-2xl space-y-4 hover:border-emerald-400 transition">
                  <h3 className="font-bold text-white text-xl">{proj.name}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">{proj.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      <footer className="border-t border-emerald-950 py-8 text-center text-xs text-slate-500 font-mono">
        © {new Date().getFullYear()} {p.name}. High-Impact MERN Portfolio.
      </footer>
    </div>
  );
}
