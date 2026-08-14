'use client';

import React from 'react';
import { PortfolioData } from '@/types/portfolio';
import { Sparkles, ExternalLink, Github, Mail, Layers } from 'lucide-react';

export default function PrismRefractionTheme({ data }: { data: PortfolioData }) {
  const { personal, about, projects, skills } = data;

  return (
    <div className="min-h-screen bg-[#05060f] text-slate-100 font-sans p-6 sm:p-12 relative overflow-x-hidden">
      {/* Holographic Prism Rainbow Mesh Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-35">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-gradient-to-tr from-cyan-400 via-pink-500 to-yellow-400 rounded-full blur-[180px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-gradient-to-tr from-purple-500 via-emerald-400 to-cyan-400 rounded-full blur-[180px] animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-5xl mx-auto space-y-16 relative z-10">
        <header className="p-8 bg-[#0c0e1e]/80 border border-transparent bg-clip-padding rounded-3xl space-y-6 shadow-2xl backdrop-blur-2xl relative overflow-hidden group">
          {/* Shimmer Rainbow Border Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-pink-500 to-yellow-400 opacity-30 rounded-3xl -z-10 blur-sm"></div>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/10 pb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-400 via-pink-500 to-yellow-400 text-black font-black flex items-center justify-center text-xl shadow-lg shadow-pink-500/25">
                💎
              </div>
              <div>
                <h1 className="text-3xl font-black text-white tracking-tight">{personal.name}</h1>
                <p className="text-xs font-mono text-cyan-300 font-semibold">{personal.title}</p>
              </div>
            </div>

            <span className="px-3.5 py-1.5 bg-white/10 border border-white/20 text-slate-200 text-xs font-mono rounded-full flex items-center gap-1.5 backdrop-blur-xl">
              <Sparkles className="w-3.5 h-3.5 text-pink-400 animate-spin" /> HOLOGRAPHIC PRISM
            </span>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed font-light">{about.summary}</p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            {personal.email && (
              <a
                href={`mailto:${personal.email}`}
                className="px-5 py-2.5 bg-gradient-to-r from-cyan-400 via-pink-500 to-yellow-400 text-black font-extrabold text-xs rounded-xl shadow-lg hover:opacity-90 transition"
              >
                <Mail className="w-4 h-4 inline mr-1.5" /> HOLOGRAPHIC CONTACT
              </a>
            )}
            {personal.socials.github && (
              <a
                href={personal.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-white/10 text-slate-200 text-xs font-medium rounded-xl border border-white/20 hover:bg-white/20 transition"
              >
                <Github className="w-4 h-4 inline mr-1.5" /> GITHUB CODE
              </a>
            )}
          </div>
        </header>

        {projects && projects.length > 0 && (
          <section className="space-y-6">
            <h2 className="text-xl font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Layers className="w-5 h-5 text-pink-400" /> PRISM REFRACTION WORKS
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((proj) => (
                <div
                  key={proj.id}
                  className="p-6 bg-[#0c0e1e]/80 border border-white/10 hover:border-pink-400/60 rounded-3xl space-y-4 backdrop-blur-xl transition duration-300 group hover:shadow-2xl hover:shadow-pink-500/10"
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
                      <span key={i} className="text-[10px] bg-white/10 text-pink-300 px-2.5 py-0.5 rounded-lg border border-white/20 font-mono">
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
              <Sparkles className="w-5 h-5 text-cyan-400" /> PRISM SKILL MATRIX
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {skills.map((cat) => (
                <div key={cat.id} className="p-6 bg-[#0c0e1e]/80 border border-white/10 rounded-3xl space-y-3 backdrop-blur-xl">
                  <h3 className="text-xs font-bold text-pink-400 font-mono uppercase">{cat.category}</h3>
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

        <footer className="pt-8 border-t border-white/10 text-center text-xs font-mono text-slate-500">
          © {new Date().getFullYear()} {personal.name}. Powered by Portify AI Prism Refraction Engine.
        </footer>
      </div>
    </div>
  );
}
