'use client';

import React from 'react';
import { PortfolioData } from '@/types/portfolio';
import { Terminal, Github, Linkedin, Mail } from 'lucide-react';

export default function MinimalCsTheme({ data }: { data: PortfolioData }) {
  const p = data.personal;
  const a = data.about;

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-300 font-mono selection:bg-zinc-200 selection:text-black">
      {/* Top Monospaced Header */}
      <div className="border-b border-zinc-900 px-6 py-4 flex justify-between items-center text-xs text-zinc-500">
        <span>$ cat /home/{p.name ? p.name.toLowerCase().replace(/\s+/g, '_') : 'user'}/portfolio.sh</span>
        <span className="text-emerald-500">[STATUS: READY]</span>
      </div>

      <main className="max-w-4xl mx-auto px-6 py-16 space-y-16">
        {/* Terminal Header */}
        <section className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">{p.name}</h1>
            <p className="text-sm text-zinc-400 font-semibold">{p.title || 'Computer Science & Software Developer'}</p>
          </div>

          <div className="p-4 bg-zinc-950 border border-zinc-900 rounded-lg text-xs leading-relaxed text-zinc-400 space-y-1">
            <p className="text-zinc-500"># SUMMARY_INFO</p>
            <p className="text-zinc-200">{a.summary}</p>
          </div>

          <div className="flex gap-4 text-xs">
            {p.socials?.github && (
              <a href={p.socials.github} target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-white underline">
                github
              </a>
            )}
            {p.socials?.linkedin && (
              <a href={p.socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-white underline">
                linkedin
              </a>
            )}
            {p.email && <span className="text-zinc-500">email: {p.email}</span>}
          </div>
        </section>

        {/* Skills */}
        {data.skills && data.skills.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-xs font-bold text-zinc-500 uppercase tracking-widest">// TECHNICAL_SKILLS</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.skills.map((grp) => (
                <div key={grp.id} className="p-4 bg-zinc-950 border border-zinc-900 rounded-lg space-y-2">
                  <span className="text-xs text-zinc-400 font-bold">{grp.category}</span>
                  <div className="flex flex-wrap gap-1.5">
                    {grp.skills.map((sk, idx) => (
                      <span key={idx} className="text-xs bg-zinc-900 border border-zinc-800 text-zinc-300 px-2 py-0.5 rounded">
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
          <section className="space-y-4">
            <h2 className="text-xs font-bold text-zinc-500 uppercase tracking-widest">// FEATURED_PROJECTS</h2>
            <div className="space-y-4">
              {data.projects.map((proj) => (
                <div key={proj.id} className="p-5 bg-zinc-950 border border-zinc-900 rounded-lg space-y-2">
                  <h3 className="font-bold text-white text-sm">{proj.name}</h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">{proj.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      <footer className="border-t border-zinc-900 py-8 text-center text-xs text-zinc-600">
        // Minimal CS Developer Terminal
      </footer>
    </div>
  );
}
