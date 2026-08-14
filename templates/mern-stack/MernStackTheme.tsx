'use client';

import React from 'react';
import { PortfolioData } from '@/types/portfolio';
import { Code, ExternalLink, Github, Linkedin, Mail, Database, Layers, Sparkles } from 'lucide-react';

export default function MernStackTheme({ data }: { data: PortfolioData }) {
  const { personal, about, projects, skills } = data;

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-slate-100 font-sans p-6 sm:p-12 relative overflow-x-hidden">
      {/* Neon Cyan & Emerald Glow Orbs */}
      <div className="fixed top-0 right-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[180px] pointer-events-none"></div>
      <div className="fixed bottom-0 left-1/4 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[180px] pointer-events-none"></div>

      <div className="max-w-5xl mx-auto space-y-16 relative z-10">
        {/* Header */}
        <header className="p-8 bg-[#11111a] border border-cyan-500/30 rounded-3xl space-y-6 shadow-2xl">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800 pb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 to-emerald-400 text-black font-black flex items-center justify-center shadow-lg shadow-cyan-500/20 text-xl">
                ⚛️
              </div>
              <div>
                <h1 className="text-2xl font-black text-white tracking-tight">{personal.name}</h1>
                <span className="text-xs font-mono text-cyan-400 font-semibold">{personal.title}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-cyan-950 text-cyan-300 border border-cyan-800 text-xs font-mono rounded-full flex items-center gap-1">
                MongoDB • Express • React • Node
              </span>
            </div>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed font-light">{about.summary}</p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            {personal.email && (
              <a
                href={`mailto:${personal.email}`}
                className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-black font-extrabold text-xs rounded-xl shadow-lg flex items-center gap-1.5 transition"
              >
                <Mail className="w-4 h-4" /> Contact Developer
              </a>
            )}
            {personal.socials.github && (
              <a
                href={personal.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-medium rounded-xl border border-slate-700 flex items-center gap-1.5 transition"
              >
                <Github className="w-4 h-4 text-cyan-400" /> GitHub Repos
              </a>
            )}
          </div>
        </header>

        {/* Projects */}
        {projects && projects.length > 0 && (
          <section className="space-y-6">
            <h2 className="text-xl font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Code className="w-5 h-5 text-cyan-400" /> Full Stack Applications
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((proj) => (
                <div
                  key={proj.id}
                  className="p-6 bg-[#11111a] border border-slate-800 hover:border-cyan-500/50 rounded-3xl space-y-4 transition duration-300 group hover:shadow-xl hover:shadow-cyan-500/10"
                >
                  <div className="flex justify-between items-start">
                    <h3 className="font-extrabold text-white text-base group-hover:text-cyan-400 transition">{proj.name}</h3>
                    {proj.liveUrl && (
                      <a
                        href={proj.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-cyan-400 hover:text-white rounded-xl transition"
                      >
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

        {/* Skills */}
        {skills && skills.length > 0 && (
          <section className="space-y-6">
            <h2 className="text-xl font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Layers className="w-5 h-5 text-emerald-400" /> Tech Stack & Tools
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {skills.map((cat) => (
                <div key={cat.id} className="p-6 bg-[#11111a] border border-slate-800 rounded-3xl space-y-3">
                  <h3 className="text-xs font-bold text-cyan-400 font-mono uppercase">{cat.category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map((s, i) => (
                      <span key={i} className="text-xs bg-slate-900 text-slate-200 px-3 py-1 rounded-xl border border-slate-700 font-mono">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        <footer className="pt-8 border-t border-slate-800 text-center text-xs text-slate-500 font-mono">
          © {new Date().getFullYear()} {personal.name}. Powered by Portify AI MERN Engine.
        </footer>
      </div>
    </div>
  );
}
