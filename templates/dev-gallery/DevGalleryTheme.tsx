'use client';

import React, { useState } from 'react';
import { PortfolioData } from '@/types/portfolio';
import { ExternalLink, Github, Mail, Search, Code, Sparkles, Filter, Terminal, Layers } from 'lucide-react';

export default function DevGalleryTheme({ data }: { data: PortfolioData }) {
  const { personal, about, projects, skills, experience } = data;
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const allTechs = Array.from(new Set(projects.flatMap((p) => p.technologies)));

  const filteredProjects =
    selectedCategory === 'all'
      ? projects
      : projects.filter((p) => p.technologies.some((t) => t.toLowerCase().includes(selectedCategory.toLowerCase())));

  return (
    <div className="min-h-screen bg-[#101010] text-zinc-100 font-sans p-6 sm:p-12 relative">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Gallery Top Navigation Header */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-[#202020] pb-6 gap-4">
          <div>
            <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest bg-cyan-950/80 px-2.5 py-1 rounded border border-cyan-800">
              Dev Gallery Showcase
            </span>
            <h1 className="text-3xl font-black text-white uppercase tracking-tight mt-1">{personal.name}</h1>
            <p className="text-xs text-zinc-400 font-mono">{personal.title}</p>
          </div>

          <div className="flex items-center gap-3">
            {personal.socials.github && (
              <a
                href={personal.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-[#1f1f1f] hover:bg-[#2a2a2a] text-white text-xs font-bold rounded-lg border border-[#2a2a2a] flex items-center gap-1.5 transition"
              >
                <Github className="w-4 h-4" /> GitHub
              </a>
            )}
            {personal.email && (
              <a
                href={`mailto:${personal.email}`}
                className="px-4 py-2 bg-white hover:bg-zinc-200 text-black text-xs font-extrabold rounded-lg flex items-center gap-1.5 transition shadow-lg"
              >
                <Mail className="w-4 h-4" /> Contact
              </a>
            )}
          </div>
        </header>

        {/* Bio Summary Section */}
        <section className="p-6 bg-[#1a1a1a] border border-[#262626] rounded-2xl space-y-3">
          <h2 className="text-xs font-bold text-zinc-400 font-mono uppercase tracking-wider">About Engineering</h2>
          <p className="text-sm text-zinc-300 leading-relaxed font-light">{about.summary}</p>
        </section>

        {/* Filter Ribbon Bar (Scraped from DevPortfolios.dev) */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-white font-mono uppercase tracking-wider flex items-center gap-2">
              <Filter className="w-4 h-4 text-cyan-400" /> Filter Works by Technology
            </h3>
            <span className="text-xs text-zinc-500 font-mono">{filteredProjects.length} Projects Displayed</span>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold font-mono transition uppercase ${
                selectedCategory === 'all'
                  ? 'bg-white text-black border border-white'
                  : 'bg-[#1a1a1a] text-zinc-400 border border-[#262626] hover:bg-[#262626]'
              }`}
            >
              All ({projects.length})
            </button>
            {allTechs.map((tech, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedCategory(tech)}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold font-mono transition uppercase whitespace-nowrap ${
                  selectedCategory === tech
                    ? 'bg-white text-black border border-white'
                    : 'bg-[#1a1a1a] text-zinc-400 border border-[#262626] hover:bg-[#262626]'
                }`}
              >
                {tech}
              </button>
            ))}
          </div>
        </section>

        {/* Project Card Grid (DevPortfolios Style) */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((proj) => (
            <div
              key={proj.id}
              className="flex flex-col bg-[#1a1a1a] border border-[#262626] rounded-xl overflow-hidden group hover:border-zinc-500 transition duration-300"
            >
              <div className="p-5 flex-1 space-y-3">
                <div className="flex justify-between items-start">
                  <h4 className="font-extrabold text-white text-base group-hover:text-cyan-400 transition">{proj.name}</h4>
                  {proj.liveUrl && (
                    <a
                      href={proj.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>

                <p className="text-xs text-zinc-400 leading-relaxed font-light">{proj.description}</p>
              </div>

              <div className="p-3 bg-[#202020] border-t border-[#262626] flex items-center justify-between">
                <div className="flex flex-wrap gap-1">
                  {proj.technologies.slice(0, 3).map((t, idx) => (
                    <span key={idx} className="text-[10px] bg-[#101010] text-zinc-300 font-mono px-2 py-0.5 rounded border border-[#303030]">
                      {t}
                    </span>
                  ))}
                </div>
                {proj.liveUrl && (
                  <a
                    href={proj.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] font-bold text-white bg-[#101010] px-3 py-1 rounded border border-zinc-700 hover:bg-white hover:text-black transition font-mono"
                  >
                    Visit →
                  </a>
                )}
              </div>
            </div>
          ))}
        </section>

        {/* Skills Section */}
        {skills && skills.length > 0 && (
          <section className="space-y-4 pt-6 border-t border-[#202020]">
            <h3 className="text-xs font-bold text-white font-mono uppercase tracking-wider flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-400" /> Technical Ecosystem
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {skills.map((cat) => (
                <div key={cat.id} className="p-4 bg-[#1a1a1a] border border-[#262626] rounded-xl space-y-2">
                  <h4 className="text-xs font-bold text-cyan-400 font-mono uppercase">{cat.category}</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {cat.skills.map((s, idx) => (
                      <span key={idx} className="text-xs bg-[#202020] text-zinc-300 px-2.5 py-1 rounded font-mono">
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
        <footer className="pt-8 border-t border-[#202020] text-center text-xs text-zinc-500 font-mono">
          © {new Date().getFullYear()} {personal.name}. Powered by Portify AI Dev Gallery.
        </footer>
      </div>
    </div>
  );
}
