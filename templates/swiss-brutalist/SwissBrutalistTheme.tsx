'use client';

import React from 'react';
import { PortfolioData } from '@/types/portfolio';
import { Github, Linkedin, Mail, ExternalLink, ArrowRight } from 'lucide-react';

export default function SwissBrutalistTheme({ data }: { data: PortfolioData }) {
  const p = data.personal;
  const a = data.about;

  return (
    <div className="min-h-screen bg-[#facc15] text-black font-sans selection:bg-black selection:text-yellow-400 p-4 sm:p-8">
      <div className="max-w-6xl mx-auto border-4 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 sm:p-12 space-y-12">
        {/* Poster Header */}
        <header className="border-b-4 border-black pb-8 space-y-6">
          <div className="flex flex-wrap justify-between items-center gap-4">
            <span className="px-4 py-1.5 bg-black text-yellow-400 text-xs font-black uppercase tracking-widest border-2 border-black shadow-[3px_3px_0px_0px_rgba(250,204,21,1)]">
              SWISS NEO-BRUTALIST EDITION
            </span>
            <div className="flex gap-3">
              {p.socials?.github && (
                <a href={p.socials.github} target="_blank" rel="noopener noreferrer" className="p-2.5 bg-yellow-400 border-2 border-black text-black font-bold shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition">
                  <Github className="w-5 h-5" />
                </a>
              )}
              {p.socials?.linkedin && (
                <a href={p.socials.linkedin} target="_blank" rel="noopener noreferrer" className="p-2.5 bg-yellow-400 border-2 border-black text-black font-bold shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition">
                  <Linkedin className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <h1 className="text-5xl sm:text-7xl font-black uppercase tracking-tighter leading-none text-black">
              {p.name}
            </h1>
            <p className="text-xl sm:text-2xl font-bold bg-yellow-400 inline-block px-3 py-1 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              {p.title || 'Neo-Brutalist Web Engineer'}
            </p>
          </div>

          <p className="text-base font-medium leading-relaxed max-w-3xl border-l-4 border-black pl-4">
            {a.summary}
          </p>
        </header>

        {/* Skills */}
        {data.skills && data.skills.length > 0 && (
          <section className="space-y-6">
            <h2 className="text-3xl font-black uppercase border-b-4 border-black pb-2 tracking-tight">
              SKILLS & CAPABILITIES
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {data.skills.map((grp) => (
                <div key={grp.id} className="p-6 bg-yellow-300 border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] space-y-4">
                  <h3 className="font-black text-sm uppercase">{grp.category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {grp.skills.map((sk, idx) => (
                      <span key={idx} className="px-3 py-1 bg-white border-2 border-black text-xs font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
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
            <h2 className="text-3xl font-black uppercase border-b-4 border-black pb-2 tracking-tight">
              PROJECT ARCHIVE
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data.projects.map((proj) => (
                <div key={proj.id} className="p-6 bg-white border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] space-y-4">
                  <h3 className="font-black text-xl uppercase">{proj.name}</h3>
                  <p className="text-xs font-medium leading-relaxed">{proj.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        <footer className="border-t-4 border-black pt-8 text-center text-xs font-black uppercase">
          © {new Date().getFullYear()} {p.name} • SWISS NEO-BRUTALIST PORTFOLIO
        </footer>
      </div>
    </div>
  );
}
