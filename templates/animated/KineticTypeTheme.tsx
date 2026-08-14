'use client';

import React from 'react';
import { PortfolioData } from '@/types/portfolio';
import { Sparkles, ArrowUpRight, Github, Mail, ExternalLink, Zap } from 'lucide-react';

export default function KineticTypeTheme({ data }: { data: PortfolioData }) {
  const { personal, about, projects, skills } = data;

  return (
    <div className="min-h-screen bg-black text-[#facc15] font-mono selection:bg-[#facc15] selection:text-black p-6 sm:p-16 relative overflow-x-hidden">
      {/* Infinite Rotating Kinetic Ticker Marquee */}
      <div className="w-full bg-[#facc15] text-black font-black text-xs uppercase tracking-widest py-3 overflow-hidden mb-12 rounded-xl flex items-center">
        <div className="flex gap-8 whitespace-nowrap animate-marquee">
          <span>⚡ KINETIC MARQUEE EDITION</span>
          <span>•</span>
          <span>{personal.name.toUpperCase()}</span>
          <span>•</span>
          <span>{personal.title.toUpperCase()}</span>
          <span>•</span>
          <span>READY FOR 2026 PROJECTS</span>
          <span>•</span>
        </div>
      </div>

      <div className="max-w-5xl mx-auto space-y-20 relative z-10">
        {/* Kinetic Header */}
        <header className="border-b border-[#facc15]/30 pb-12 space-y-6">
          <div className="flex justify-between items-start">
            <span className="text-xs font-bold text-[#facc15] uppercase tracking-widest border border-[#facc15] px-3 py-1">
              VOL. 01 // KINETIC MOTION
            </span>
            <span className="w-3 h-3 rounded-full bg-[#facc15] animate-ping"></span>
          </div>

          <h1 className="text-5xl sm:text-8xl font-black uppercase text-white tracking-tighter leading-none hover:text-[#facc15] transition duration-300">
            {personal.name}
          </h1>

          <p className="text-xl font-sans text-zinc-300 font-light max-w-3xl leading-relaxed">{about.summary}</p>

          <div className="flex flex-wrap gap-4 pt-4 font-mono text-xs">
            {personal.email && (
              <a
                href={`mailto:${personal.email}`}
                className="px-6 py-3 bg-[#facc15] text-black font-black uppercase hover:bg-white transition"
              >
                INITIATE CONTACT →
              </a>
            )}
            {personal.socials.github && (
              <a
                href={personal.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 border border-[#facc15] text-[#facc15] hover:bg-[#facc15] hover:text-black transition"
              >
                GITHUB REPOS
              </a>
            )}
          </div>
        </header>

        {/* Kinetic Projects */}
        {projects && projects.length > 0 && (
          <section className="space-y-12">
            <h2 className="text-xs font-bold text-[#facc15] uppercase tracking-widest border-b border-[#facc15]/30 pb-4">
              [ FEATURED KINETIC WORKS ]
            </h2>

            <div className="space-y-12">
              {projects.map((proj, idx) => (
                <div key={proj.id} className="border-b border-zinc-800 pb-10 space-y-4 group">
                  <div className="flex justify-between items-baseline text-xs">
                    <span className="text-[#facc15]">NO. 0{idx + 1}</span>
                    {proj.liveUrl && (
                      <a href={proj.liveUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white flex items-center gap-1">
                        LIVE DEMO <ArrowUpRight className="w-4 h-4" />
                      </a>
                    )}
                  </div>

                  <h3 className="text-3xl sm:text-5xl font-black uppercase text-white group-hover:text-[#facc15] transition duration-300">
                    {proj.name}
                  </h3>

                  <p className="text-sm font-sans text-zinc-400 max-w-3xl leading-relaxed">{proj.description}</p>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {proj.technologies.map((t, i) => (
                      <span key={i} className="text-xs bg-zinc-900 text-zinc-300 px-3 py-1 border border-zinc-800 uppercase">
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
            <h2 className="text-xs font-bold text-[#facc15] uppercase tracking-widest border-b border-[#facc15]/30 pb-4">
              [ TECHNICAL CAPABILITY MATRIX ]
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {skills.map((cat) => (
                <div key={cat.id} className="space-y-3">
                  <h3 className="text-xs font-bold text-white uppercase">{cat.category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map((s, i) => (
                      <span key={i} className="text-xs text-zinc-400 border-b border-[#facc15]/50 pb-1">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        <footer className="pt-16 border-t border-zinc-900 text-center text-xs text-zinc-600">
          © {new Date().getFullYear()} {personal.name} // KINETIC MARQUEE EDITION
        </footer>
      </div>
    </div>
  );
}
