'use client';

import React from 'react';
import { PortfolioData } from '@/types/portfolio';
import { Sparkles, ExternalLink, Github, Mail, Layers } from 'lucide-react';

export default function LiquidGlassTheme({ data }: { data: PortfolioData }) {
  const { personal, about, projects, skills } = data;

  return (
    <div className="min-h-screen bg-[#040814] text-slate-100 font-sans p-6 sm:p-12 relative overflow-x-hidden">
      {/* Liquid Glass Bubble Orbs Background */}
      <div className="fixed top-1/3 left-1/3 w-[500px] h-[500px] bg-cyan-400/15 rounded-full blur-[160px] animate-pulse pointer-events-none"></div>
      <div className="fixed bottom-1/3 right-1/3 w-[500px] h-[500px] bg-blue-600/15 rounded-full blur-[160px] animate-pulse delay-700 pointer-events-none"></div>

      <div className="max-w-5xl mx-auto space-y-16 relative z-10">
        <header className="p-8 bg-white/5 border border-white/20 rounded-3xl space-y-6 backdrop-blur-3xl shadow-2xl">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/10 pb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-400 to-blue-600 text-white font-extrabold text-xl flex items-center justify-center shadow-lg shadow-cyan-500/20">
                💧
              </div>
              <div>
                <h1 className="text-3xl font-black text-white tracking-tight">{personal.name}</h1>
                <p className="text-xs font-mono text-cyan-300 font-semibold">{personal.title}</p>
              </div>
            </div>

            <span className="px-3.5 py-1.5 bg-cyan-950/60 border border-cyan-400/40 text-cyan-200 text-xs font-mono rounded-full flex items-center gap-1.5 backdrop-blur-xl">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin" /> LIQUID GLASS BUBBLES
            </span>
          </div>

          <p className="text-sm text-slate-200 leading-relaxed font-light">{about.summary}</p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            {personal.email && (
              <a
                href={`mailto:${personal.email}`}
                className="px-5 py-2.5 bg-gradient-to-r from-cyan-400 to-blue-600 text-white font-bold text-xs rounded-xl shadow-lg hover:opacity-90 transition"
              >
                <Mail className="w-4 h-4 inline mr-1.5" /> LIQUID GLASS CONTACT
              </a>
            )}
            {personal.socials.github && (
              <a
                href={personal.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-white/10 text-cyan-200 text-xs font-medium rounded-xl border border-white/20 hover:bg-white/20 backdrop-blur-xl transition"
              >
                <Github className="w-4 h-4 inline mr-1.5" /> GITHUB REPOS
              </a>
            )}
          </div>
        </header>

        {projects && projects.length > 0 && (
          <section className="space-y-6">
            <h2 className="text-xl font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Layers className="w-5 h-5 text-cyan-400" /> FROSTED GLASS PROJECTS
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((proj) => (
                <div
                  key={proj.id}
                  className="p-6 bg-white/5 border border-white/15 hover:border-cyan-400/60 rounded-3xl space-y-4 backdrop-blur-2xl transition duration-300 group hover:shadow-2xl hover:shadow-cyan-500/10"
                >
                  <div className="flex justify-between items-start">
                    <h3 className="font-extrabold text-white text-base group-hover:text-cyan-300 transition">{proj.name}</h3>
                    {proj.liveUrl && (
                      <a href={proj.liveUrl} target="_blank" rel="noopener noreferrer" className="p-2 text-cyan-300 hover:text-white rounded-xl transition">
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed font-light">{proj.description}</p>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {proj.technologies.map((t, i) => (
                      <span key={i} className="text-[10px] bg-cyan-950/80 text-cyan-300 px-2.5 py-0.5 rounded-lg border border-cyan-800 font-mono">
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
              <Sparkles className="w-5 h-5 text-cyan-400" /> GLASS SKILL MATRIX
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {skills.map((cat) => (
                <div key={cat.id} className="p-6 bg-white/5 border border-white/15 rounded-3xl space-y-3 backdrop-blur-2xl">
                  <h3 className="text-xs font-bold text-cyan-300 font-mono uppercase">{cat.category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map((s, i) => (
                      <span key={i} className="text-xs bg-white/10 text-slate-200 px-3 py-1 rounded-xl border border-white/20 font-mono">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        <footer className="pt-8 border-t border-white/10 text-center text-xs font-mono text-slate-400">
          © {new Date().getFullYear()} {personal.name}. Powered by Portify AI Liquid Glass Engine.
        </footer>
      </div>
    </div>
  );
}
