'use client';

import React from 'react';
import { PortfolioData } from '@/types/portfolio';
import { ArrowUpRight, Mail, Github, Linkedin, Sparkles, Terminal } from 'lucide-react';

export default function KineticPosterTheme({ data }: { data: PortfolioData }) {
  const { personal, about, projects, skills } = data;

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-[#facc15] selection:text-black p-6 sm:p-16 relative">
      {/* Swiss Editorial Poster Layout Container */}
      <div className="max-w-6xl mx-auto space-y-24 relative z-10">
        {/* Header Ribbon */}
        <header className="flex justify-between items-start border-b border-zinc-800 pb-8">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#facc15] font-bold">VOL. 2026 // POSTER EDITION</span>
            <h1 className="text-4xl sm:text-7xl font-black uppercase tracking-tighter text-white leading-none mt-2">
              {personal.name}
            </h1>
            <p className="text-sm font-mono text-zinc-400 uppercase tracking-wide mt-2">{personal.title}</p>
          </div>

          <div className="flex items-center gap-3">
            {personal.email && (
              <a
                href={`mailto:${personal.email}`}
                className="px-5 py-3 bg-[#facc15] hover:bg-yellow-300 text-black font-black text-xs uppercase tracking-wider rounded-none flex items-center gap-2 transition"
              >
                <Mail className="w-4 h-4" /> Contact
              </a>
            )}
          </div>
        </header>

        {/* Oversized Kinetic Headline */}
        <section className="space-y-6">
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight leading-tight text-zinc-200">
            {about.summary}
          </h2>

          <div className="flex flex-wrap gap-4 pt-4">
            {personal.socials.github && (
              <a
                href={personal.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 border border-white text-white font-mono text-xs hover:bg-white hover:text-black transition"
              >
                GITHUB →
              </a>
            )}
            {personal.socials.linkedin && (
              <a
                href={personal.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 border border-white text-white font-mono text-xs hover:bg-white hover:text-black transition"
              >
                LINKEDIN →
              </a>
            )}
          </div>
        </section>

        {/* Kinetic Poster Projects Showcase */}
        {projects && projects.length > 0 && (
          <section className="space-y-12">
            <div className="border-b border-[#facc15] pb-4 flex justify-between items-center">
              <h3 className="text-xs font-mono uppercase tracking-widest text-[#facc15] font-bold">PROJECT ARCHIVE</h3>
              <span className="text-xs font-mono text-zinc-500">{projects.length} WORKS</span>
            </div>

            <div className="space-y-12">
              {projects.map((proj, idx) => (
                <div key={proj.id} className="border-b border-zinc-800 pb-10 space-y-4 group">
                  <div className="flex justify-between items-baseline">
                    <span className="text-xs font-mono text-[#facc15]">NO. 0{idx + 1}</span>
                    {proj.liveUrl && (
                      <a
                        href={proj.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-mono text-zinc-400 hover:text-[#facc15] flex items-center gap-1 transition"
                      >
                        EXPLORE <ArrowUpRight className="w-4 h-4" />
                      </a>
                    )}
                  </div>

                  <h4 className="text-3xl sm:text-5xl font-black uppercase text-white group-hover:text-[#facc15] transition duration-300">
                    {proj.name}
                  </h4>

                  <p className="text-sm text-zinc-400 max-w-3xl leading-relaxed font-light">{proj.description}</p>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {proj.technologies.map((t, i) => (
                      <span key={i} className="text-xs font-mono bg-zinc-900 text-zinc-300 px-3 py-1 border border-zinc-800 uppercase">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {skills && skills.length > 0 && (
          <section className="space-y-8">
            <div className="border-b border-zinc-800 pb-4">
              <h3 className="text-xs font-mono uppercase tracking-widest text-[#facc15] font-bold">CAPABILITY MATRIX</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {skills.map((cat) => (
                <div key={cat.id} className="space-y-3">
                  <h4 className="text-xs font-mono font-bold text-white uppercase">{cat.category}</h4>
                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map((s, i) => (
                      <span key={i} className="text-xs font-mono text-zinc-300 border-b border-[#facc15]/40 pb-1">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Footer */}
        <footer className="pt-16 border-t border-zinc-800 text-center text-xs font-mono text-zinc-500">
          © {new Date().getFullYear()} {personal.name} // PORTIFY AI KINETIC POSTER
        </footer>
      </div>
    </div>
  );
}
