'use client';

import React from 'react';
import { PortfolioData } from '@/types/portfolio';
import { Sparkles, Zap, Shield, ExternalLink, Github, Mail, Eye, Box } from 'lucide-react';

export default function Futuristic2025Theme({ data }: { data: PortfolioData }) {
  const { personal, about, projects, skills } = data;

  return (
    <div className="min-h-screen bg-[#04050a] text-slate-100 font-sans p-6 sm:p-12 relative overflow-x-hidden">
      {/* Futuristic Holographic Mesh Orbs */}
      <div className="fixed top-1/4 left-1/3 w-[600px] h-[600px] bg-cyan-500/15 rounded-full blur-[180px] pointer-events-none"></div>
      <div className="fixed bottom-1/4 right-1/3 w-[600px] h-[600px] bg-purple-600/15 rounded-full blur-[180px] pointer-events-none"></div>

      <div className="max-w-5xl mx-auto space-y-16 relative z-10">
        {/* HUD Frame Header */}
        <header className="p-8 bg-[#0b0d18]/80 border border-cyan-500/40 rounded-3xl space-y-6 backdrop-blur-2xl shadow-2xl">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-cyan-900/40 pb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 via-purple-600 to-pink-500 text-white flex items-center justify-center text-xl shadow-lg shadow-cyan-500/25">
                <Box className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-white">{personal.name}</h1>
                <span className="text-xs font-mono text-cyan-300 font-semibold">{personal.title}</span>
              </div>
            </div>

            <span className="px-3.5 py-1.5 bg-cyan-950/80 border border-cyan-700 text-cyan-300 text-xs font-mono rounded-full flex items-center gap-1.5 shadow-inner">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin" /> EDITION 2026 // HUD INTERFACE
            </span>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed font-light">{about.summary}</p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            {personal.email && (
              <a
                href={`mailto:${personal.email}`}
                className="px-5 py-2.5 bg-gradient-to-r from-cyan-500 via-purple-600 to-pink-500 hover:opacity-90 text-white font-extrabold text-xs rounded-xl shadow-lg flex items-center gap-2 transition"
              >
                <Mail className="w-4 h-4" /> Transmit Signal
              </a>
            )}
            {personal.socials.github && (
              <a
                href={personal.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-[#121526] hover:bg-[#1a1e36] text-slate-200 text-xs font-medium rounded-xl border border-cyan-500/30 flex items-center gap-2 transition"
              >
                <Github className="w-4 h-4 text-cyan-400" /> GitHub Core
              </a>
            )}
          </div>
        </header>

        {/* Holographic Projects */}
        {projects && projects.length > 0 && (
          <section className="space-y-6">
            <h2 className="text-xl font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Eye className="w-5 h-5 text-cyan-400" /> Holographic Showcase & Systems
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((proj) => (
                <div
                  key={proj.id}
                  className="p-6 bg-[#0b0d18]/70 border border-cyan-500/30 hover:border-purple-500/60 rounded-3xl space-y-4 backdrop-blur-xl transition duration-300 group hover:shadow-xl hover:shadow-cyan-500/10"
                >
                  <div className="flex justify-between items-start">
                    <h3 className="font-extrabold text-white text-base group-hover:text-cyan-300 transition">{proj.name}</h3>
                    {proj.liveUrl && (
                      <a href={proj.liveUrl} target="_blank" rel="noopener noreferrer" className="p-2 text-cyan-400 hover:text-white rounded-xl transition">
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed font-light">{proj.description}</p>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {proj.technologies.map((t, i) => (
                      <span key={i} className="text-[10px] bg-cyan-950/90 text-cyan-300 px-2.5 py-0.5 rounded-lg border border-cyan-800 font-mono">
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
          <section className="space-y-6">
            <h2 className="text-xl font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Zap className="w-5 h-5 text-purple-400" /> Matrix Capabilities
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {skills.map((cat) => (
                <div key={cat.id} className="p-6 bg-[#0b0d18]/70 border border-cyan-500/30 rounded-3xl space-y-3 backdrop-blur-xl">
                  <h3 className="text-xs font-bold text-purple-300 font-mono uppercase">{cat.category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map((s, i) => (
                      <span key={i} className="text-xs bg-[#121526] text-slate-200 px-3 py-1 rounded-xl border border-cyan-500/20 font-mono">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        <footer className="pt-8 border-t border-cyan-900/40 text-center text-xs text-slate-500 font-mono">
          © {new Date().getFullYear()} {personal.name}. Powered by Portify AI 2026 Holographic Engine.
        </footer>
      </div>
    </div>
  );
}
