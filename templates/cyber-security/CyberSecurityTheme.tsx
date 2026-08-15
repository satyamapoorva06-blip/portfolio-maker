'use client';

import React from 'react';
import { PortfolioData } from '@/types/portfolio';
import { ShieldCheck, Lock, Terminal, Cpu, Github, Linkedin } from 'lucide-react';

export default function CyberSecurityTheme({ data }: { data: PortfolioData }) {
  const p = data.personal;
  const a = data.about;

  return (
    <div className="min-h-screen bg-[#030a06] text-emerald-100 font-mono selection:bg-emerald-500 selection:text-black">
      <div className="bg-emerald-950 border-b border-emerald-800 text-emerald-300 text-xs font-bold py-2 px-6 text-center tracking-widest uppercase flex items-center justify-center gap-2">
        <ShieldCheck className="w-4 h-4 text-emerald-400" /> CYBER SECURITY SENTINEL & SECURE SYSTEMS
      </div>

      <main className="max-w-6xl mx-auto px-6 py-12 space-y-12">
        <section className="p-8 bg-[#07140c] border border-emerald-500/40 rounded-3xl space-y-6 shadow-2xl">
          <div className="flex flex-wrap justify-between items-start gap-4 border-b border-emerald-900/50 pb-6">
            <div className="space-y-2">
              <span className="text-xs text-emerald-400 font-bold uppercase tracking-widest flex items-center gap-1.5">
                <Lock className="w-4 h-4 text-emerald-400" /> CYBER SECURITY SENTINEL ARCHITECT
              </span>
              <h1 className="text-4xl sm:text-5xl font-black text-white">{p.name}</h1>
              <p className="text-base text-emerald-300">{p.title || 'Cyber Security Specialist'}</p>
            </div>
            <div className="flex gap-3">
              {p.socials?.github && (
                <a href={p.socials.github} target="_blank" rel="noopener noreferrer" className="p-2.5 bg-black border border-emerald-900 rounded-xl text-emerald-400 hover:bg-emerald-500 hover:text-black transition">
                  <Github className="w-5 h-5" />
                </a>
              )}
              {p.socials?.linkedin && (
                <a href={p.socials.linkedin} target="_blank" rel="noopener noreferrer" className="p-2.5 bg-black border border-emerald-900 rounded-xl text-emerald-400 hover:bg-emerald-500 hover:text-black transition">
                  <Linkedin className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>

          <p className="text-slate-300 text-sm leading-relaxed max-w-3xl font-sans">{a.summary}</p>
        </section>

        {data.skills && data.skills.length > 0 && (
          <section className="space-y-6">
            <h2 className="text-xl font-extrabold text-white flex items-center gap-2 border-b border-emerald-950 pb-3">
              <Cpu className="w-5 h-5 text-emerald-400" /> Cybersecurity Stack & Defense Systems
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {data.skills.map((grp) => (
                <div key={grp.id} className="p-6 bg-[#07140c] border border-emerald-900/50 rounded-2xl space-y-4">
                  <h3 className="text-xs font-bold text-emerald-300 uppercase">{grp.category}</h3>
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

      <footer className="border-t border-emerald-950 py-8 text-center text-xs text-slate-500 font-mono">
        © {new Date().getFullYear()} {p.name}. Cyber Security Sentinel Portfolio.
      </footer>
    </div>
  );
}
