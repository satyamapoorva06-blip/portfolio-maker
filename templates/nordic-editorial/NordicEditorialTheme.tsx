'use client';

import React from 'react';
import { PortfolioData } from '@/types/portfolio';
import { ArrowUpRight, Mail, Github, Linkedin, Compass, Sparkles, Layers } from 'lucide-react';

export default function NordicEditorialTheme({ data }: { data: PortfolioData }) {
  const { personal, about, projects, skills, experience } = data;

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-white selection:text-black relative">
      {/* Minimal Scandinavian Top Header */}
      <header className="fixed top-0 left-0 right-0 z-50 p-6 sm:p-10 flex justify-between items-center backdrop-blur-md bg-black/40 border-b border-zinc-900">
        <div>
          <h1 className="text-sm font-bold tracking-widest uppercase text-white font-serif">{personal.name}</h1>
          <span className="text-[11px] text-zinc-500 tracking-wider uppercase font-mono block">{personal.title}</span>
        </div>

        <div className="flex items-center gap-4 text-xs tracking-wider uppercase font-mono">
          {personal.email && (
            <a href={`mailto:${personal.email}`} className="text-zinc-400 hover:text-white transition">
              Contact
            </a>
          )}
          {personal.socials.github && (
            <a href={personal.socials.github} target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-white transition">
              GitHub
            </a>
          )}
        </div>
      </header>

      {/* Main Full-Height Editorial Sections */}
      <main className="pt-32 px-6 sm:px-16 max-w-6xl mx-auto space-y-32 pb-24">
        {/* Editorial Hero Statement */}
        <section className="min-h-[60vh] flex flex-col justify-center space-y-8 border-b border-zinc-900 pb-20">
          <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">Selected Works & Systems</span>

          <h2 className="text-4xl sm:text-7xl font-serif leading-tight font-normal text-zinc-100 max-w-4xl">
            {about.summary || `${personal.name} is a ${personal.title} crafting digital systems and interactive web experiences.`}
          </h2>

          <div className="flex items-center gap-6 pt-4">
            <span className="text-xs text-zinc-400 font-mono flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span> {personal.location}
            </span>
          </div>
        </section>

        {/* Editorial Projects Grid */}
        {projects && projects.length > 0 && (
          <section className="space-y-16">
            <div className="flex justify-between items-end border-b border-zinc-900 pb-4">
              <h3 className="text-xs font-mono uppercase tracking-widest text-zinc-400">01 / Index of Projects</h3>
              <span className="text-xs font-mono text-zinc-600">{projects.length} Works</span>
            </div>

            <div className="space-y-24">
              {projects.map((proj, idx) => (
                <div key={proj.id} className="group border-b border-zinc-900 pb-16 space-y-6">
                  <div className="flex justify-between items-baseline">
                    <span className="text-xs font-mono text-zinc-600">({String(idx + 1).padStart(2, '0')})</span>
                    {proj.liveUrl && (
                      <a
                        href={proj.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-mono text-zinc-400 hover:text-white flex items-center gap-1 transition"
                      >
                        Visit Project <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>

                  <h4 className="text-3xl sm:text-5xl font-serif text-white group-hover:text-zinc-300 transition duration-300">
                    {proj.name}
                  </h4>

                  <p className="text-sm text-zinc-400 max-w-2xl leading-relaxed font-light">{proj.description}</p>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {proj.technologies.map((t, i) => (
                      <span key={i} className="text-[11px] font-mono text-zinc-400 border border-zinc-800 px-3 py-1 rounded-full">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills & Capability Matrix */}
        {skills && skills.length > 0 && (
          <section className="space-y-12">
            <div className="border-b border-zinc-900 pb-4">
              <h3 className="text-xs font-mono uppercase tracking-widest text-zinc-400">02 / Discipline & Capabilities</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {skills.map((cat) => (
                <div key={cat.id} className="space-y-4">
                  <h4 className="text-sm font-serif font-semibold text-white tracking-wide">{cat.category}</h4>
                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map((s, i) => (
                      <span key={i} className="text-xs font-mono text-zinc-300 border-b border-zinc-800 pb-1">
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
        <footer className="pt-20 border-t border-zinc-900 flex flex-col sm:flex-row justify-between items-center text-xs font-mono text-zinc-600 gap-4">
          <span>© {new Date().getFullYear()} {personal.name}</span>
          <span>Designed with Portify AI</span>
        </footer>
      </main>
    </div>
  );
}
