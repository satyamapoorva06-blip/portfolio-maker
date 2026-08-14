'use client';

import React from 'react';
import { PortfolioData } from '@/types/portfolio';
import { Network, ExternalLink, Github, Mail, Sparkles, Activity } from 'lucide-react';

export default function ParticleConstellationTheme({ data }: { data: PortfolioData }) {
  const { personal, about, projects, skills } = data;

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 font-mono p-6 sm:p-12 relative overflow-x-hidden">
      {/* Node Constellation Glowing Starfield FX */}
      <div className="fixed inset-0 pointer-events-none opacity-30">
        <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-sky-400 rounded-full animate-ping"></div>
        <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-cyan-300 rounded-full animate-ping delay-500"></div>
        <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-indigo-400 rounded-full animate-ping delay-1000"></div>
      </div>

      <div className="max-w-5xl mx-auto space-y-16 relative z-10">
        <header className="p-8 bg-[#111827] border border-sky-500/30 rounded-3xl space-y-6 shadow-2xl">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800 pb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-sky-500 text-black font-black flex items-center justify-center text-xl shadow-lg shadow-sky-500/20">
                <Network className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-3xl font-extrabold text-white">{personal.name}</h1>
                <p className="text-xs text-sky-400 font-semibold">{personal.title}</p>
              </div>
            </div>

            <span className="px-3.5 py-1.5 bg-sky-950 border border-sky-800 text-sky-300 text-xs rounded-full flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-sky-400 animate-pulse" /> CONSTELLATION NODES
            </span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed font-sans">{about.summary}</p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            {personal.email && (
              <a
                href={`mailto:${personal.email}`}
                className="px-5 py-2.5 bg-sky-500 hover:bg-sky-400 text-black font-extrabold text-xs rounded-xl shadow-lg transition"
              >
                <Mail className="w-4 h-4 inline mr-1.5" /> CONNECT NODE
              </a>
            )}
            {personal.socials.github && (
              <a
                href={personal.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-slate-900 text-sky-300 text-xs font-medium rounded-xl border border-slate-700 hover:bg-slate-800 transition"
              >
                <Github className="w-4 h-4 inline mr-1.5" /> GITHUB REPOS
              </a>
            )}
          </div>
        </header>

        {projects && projects.length > 0 && (
          <section className="space-y-6">
            <h2 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2 border-b border-slate-800 pb-3">
              <Sparkles className="w-4 h-4 text-sky-400" /> CONSTELLATION NETWORK PROJECTS
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((proj) => (
                <div
                  key={proj.id}
                  className="p-6 bg-[#111827] border border-slate-800 hover:border-sky-500 rounded-3xl space-y-4 transition duration-300 group shadow-xl"
                >
                  <div className="flex justify-between items-start">
                    <h3 className="font-extrabold text-white text-base group-hover:text-sky-400 transition">{proj.name}</h3>
                    {proj.liveUrl && (
                      <a href={proj.liveUrl} target="_blank" rel="noopener noreferrer" className="p-2 text-sky-400 hover:text-white rounded-xl transition">
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed font-sans">{proj.description}</p>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {proj.technologies.map((t, i) => (
                      <span key={i} className="text-[10px] bg-sky-950 text-sky-300 px-2.5 py-0.5 rounded-lg border border-sky-800">
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
            <h2 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2 border-b border-slate-800 pb-3">
              <Network className="w-4 h-4 text-sky-400" /> CONSTELLATION SKILL NODES
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {skills.map((cat) => (
                <div key={cat.id} className="p-6 bg-[#111827] border border-slate-800 rounded-3xl space-y-3">
                  <h3 className="text-xs font-bold text-sky-400 uppercase">{cat.category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map((s, i) => (
                      <span key={i} className="text-xs bg-slate-900 text-slate-200 px-3 py-1 rounded-xl border border-slate-700">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        <footer className="pt-8 border-t border-slate-800 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} {personal.name}. Powered by Portify AI Node Constellation Engine.
        </footer>
      </div>
    </div>
  );
}
