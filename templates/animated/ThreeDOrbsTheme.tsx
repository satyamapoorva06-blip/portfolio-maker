'use client';

import React from 'react';
import { PortfolioData } from '@/types/portfolio';
import { Box, ExternalLink, Github, Mail, Sparkles, Layers } from 'lucide-react';

export default function ThreeDOrbsTheme({ data }: { data: PortfolioData }) {
  const { personal, about, projects, skills } = data;

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 font-sans p-6 sm:p-12 relative overflow-x-hidden">
      {/* 3D Floating Orbs Background Mesh */}
      <div className="fixed top-1/4 left-1/4 w-[600px] h-[600px] bg-gradient-to-tr from-violet-600/20 via-purple-600/20 to-pink-500/20 rounded-full blur-[180px] animate-pulse pointer-events-none"></div>
      <div className="fixed bottom-1/4 right-1/4 w-[600px] h-[600px] bg-gradient-to-tr from-cyan-500/20 via-indigo-600/20 to-purple-600/20 rounded-full blur-[180px] animate-pulse delay-1000 pointer-events-none"></div>

      <div className="max-w-5xl mx-auto space-y-16 relative z-10">
        <header className="p-8 bg-[#0b1329]/80 border border-violet-500/30 rounded-3xl space-y-6 shadow-2xl backdrop-blur-2xl transition duration-500 transform hover:-translate-y-1">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-violet-900/40 pb-6">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-violet-600 to-pink-500 text-white font-extrabold text-2xl flex items-center justify-center shadow-lg shadow-violet-500/30 animate-bounce">
                <Box className="w-7 h-7" />
              </div>
              <div>
                <h1 className="text-3xl font-black text-white">{personal.name}</h1>
                <p className="text-xs font-mono text-violet-400 font-semibold">{personal.title}</p>
              </div>
            </div>

            <span className="px-3.5 py-1.5 bg-violet-950/80 border border-violet-700 text-violet-300 text-xs font-mono rounded-full flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-pink-400 animate-spin" /> 3D SPATIAL ORBS
            </span>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed font-light">{about.summary}</p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            {personal.email && (
              <a
                href={`mailto:${personal.email}`}
                className="px-5 py-2.5 bg-gradient-to-r from-violet-600 via-purple-600 to-pink-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-violet-500/20 hover:opacity-90 transition transform hover:scale-105"
              >
                <Mail className="w-4 h-4 inline mr-1.5" /> 3D EXPERIENCE INQUIRY
              </a>
            )}
            {personal.socials.github && (
              <a
                href={personal.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-[#131d38] text-violet-200 text-xs font-medium rounded-xl border border-violet-500/30 hover:bg-[#1a284c] transition transform hover:scale-105"
              >
                <Github className="w-4 h-4 inline mr-1.5" /> GITHUB CODE
              </a>
            )}
          </div>
        </header>

        {projects && projects.length > 0 && (
          <section className="space-y-6">
            <h2 className="text-xl font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Layers className="w-5 h-5 text-pink-400" /> 3D SPATIAL PROJECTS
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((proj) => (
                <div
                  key={proj.id}
                  className="p-6 bg-[#0b1329]/80 border border-violet-500/30 hover:border-pink-500/60 rounded-3xl space-y-4 backdrop-blur-xl transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-violet-500/20 group"
                >
                  <div className="flex justify-between items-start">
                    <h3 className="font-extrabold text-white text-base group-hover:text-pink-400 transition">{proj.name}</h3>
                    {proj.liveUrl && (
                      <a href={proj.liveUrl} target="_blank" rel="noopener noreferrer" className="p-2 text-violet-400 hover:text-white rounded-xl transition">
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed font-light">{proj.description}</p>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {proj.technologies.map((t, i) => (
                      <span key={i} className="text-[10px] bg-violet-950/80 text-violet-300 px-2.5 py-0.5 rounded-lg border border-violet-800 font-mono">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {skills && skills.length > 0 && (
          <section className="space-y-6">
            <h2 className="text-xl font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-violet-400" /> SPATIAL & MATRIX STACK
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {skills.map((cat) => (
                <div key={cat.id} className="p-6 bg-[#0b1329]/80 border border-violet-500/30 rounded-3xl space-y-3 backdrop-blur-xl">
                  <h3 className="text-xs font-bold text-pink-400 font-mono uppercase">{cat.category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map((s, i) => (
                      <span key={i} className="text-xs bg-[#131d38] text-slate-200 px-3 py-1 rounded-xl border border-violet-500/20 font-mono transform hover:scale-105 transition">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        <footer className="pt-8 border-t border-violet-900/40 text-center text-xs font-mono text-slate-500">
          © {new Date().getFullYear()} {personal.name}. Powered by Portify AI 3D Orbs Engine.
        </footer>
      </div>
    </div>
  );
}
