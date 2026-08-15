'use client';

import React from 'react';
import { PortfolioData } from '@/types/portfolio';
import { Code, Terminal, Github, Linkedin } from 'lucide-react';

export default function MinimalDarkCsTheme({ data }: { data: PortfolioData }) {
  const p = data.personal;
  const a = data.about;

  return (
    <div className="min-h-screen bg-[#030303] text-slate-300 font-sans selection:bg-slate-700 selection:text-white">
      <main className="max-w-4xl mx-auto px-6 py-16 space-y-12">
        <section className="space-y-4 border-b border-slate-800 pb-8">
          <h1 className="text-4xl font-extrabold text-white">{p.name}</h1>
          <p className="text-sm font-mono text-slate-400">{p.title || 'Minimalist CS Developer'}</p>
          <p className="text-xs text-slate-400 leading-relaxed font-light">{a.summary}</p>
          <div className="flex gap-4 text-xs font-mono pt-2">
            {p.socials?.github && <a href={p.socials.github} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white underline">github</a>}
            {p.socials?.linkedin && <a href={p.socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white underline">linkedin</a>}
          </div>
        </section>

        {data.skills && data.skills.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-xs font-mono text-slate-500 uppercase font-bold tracking-widest">SKILLS</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {data.skills.map((grp) => (
                <div key={grp.id} className="p-4 bg-slate-900/50 border border-slate-800/80 rounded-xl space-y-2">
                  <h3 className="text-xs font-bold text-slate-300">{grp.category}</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {grp.skills.map((sk, idx) => (
                      <span key={idx} className="text-xs bg-slate-950 text-slate-300 px-2 py-0.5 rounded border border-slate-800 font-mono">
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

      <footer className="border-t border-slate-900 py-8 text-center text-xs text-slate-600 font-mono">
        © {new Date().getFullYear()} {p.name}. Minimalist CS Dark Portfolio.
      </footer>
    </div>
  );
}
