'use client';

import React from 'react';
import { PortfolioData } from '@/types/portfolio';
import { Zap, ExternalLink, Github, Mail, Activity, ArrowUpRight } from 'lucide-react';

export default function ElasticCardsTheme({ data }: { data: PortfolioData }) {
  const { personal, about, projects, skills } = data;

  return (
    <div className="min-h-screen bg-[#080c14] text-slate-100 font-sans p-6 sm:p-12 relative overflow-x-hidden">
      <div className="max-w-5xl mx-auto space-y-16 relative z-10">
        <header className="p-8 bg-[#0f172a] border border-orange-500/40 rounded-3xl space-y-6 shadow-2xl transition duration-500 transform hover:-translate-y-2 hover:shadow-orange-500/20">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800 pb-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-orange-500 to-blue-600 text-white font-extrabold text-2xl flex items-center justify-center shadow-lg shadow-orange-500/30 animate-bounce">
                🚀
              </div>
              <div>
                <h1 className="text-3xl font-black text-white">{personal.name}</h1>
                <p className="text-xs font-mono text-orange-400 font-bold mt-1">{personal.title}</p>
              </div>
            </div>

            <span className="px-3.5 py-1.5 bg-orange-950/80 border border-orange-700 text-orange-300 text-xs font-mono rounded-full flex items-center gap-1.5 shadow-inner">
              <Zap className="w-3.5 h-3.5 text-orange-400 animate-pulse" /> ELASTIC PHYSICS ACTIVE
            </span>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed font-light">{about.summary}</p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            {personal.email && (
              <a
                href={`mailto:${personal.email}`}
                className="px-5 py-2.5 bg-gradient-to-r from-orange-500 to-blue-600 text-white font-extrabold text-xs rounded-xl shadow-lg hover:opacity-90 transition transform hover:scale-105"
              >
                <Mail className="w-4 h-4 inline mr-1.5" /> CONTACT ELASTIC DEV
              </a>
            )}
            {personal.socials.github && (
              <a
                href={personal.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-slate-900 text-orange-300 text-xs font-medium rounded-xl border border-slate-700 hover:bg-slate-800 transition transform hover:scale-105"
              >
                <Github className="w-4 h-4 inline mr-1.5" /> GITHUB REPOS
              </a>
            )}
          </div>
        </header>

        {projects && projects.length > 0 && (
          <section className="space-y-6">
            <h2 className="text-xl font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Zap className="w-5 h-5 text-orange-400" /> ELASTIC HOVER PROJECTS
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((proj) => (
                <div
                  key={proj.id}
                  className="p-6 bg-[#0f172a] border border-slate-800 hover:border-orange-500 rounded-3xl space-y-4 transition-all duration-300 transform hover:-translate-y-3 hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/20 group"
                >
                  <div className="flex justify-between items-start">
                    <h3 className="font-extrabold text-white text-base group-hover:text-orange-400 transition">{proj.name}</h3>
                    {proj.liveUrl && (
                      <a href={proj.liveUrl} target="_blank" rel="noopener noreferrer" className="p-2 text-orange-400 hover:text-white rounded-xl transition">
                        <ArrowUpRight className="w-4 h-4" />
                      </a>
                    )}
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed font-light">{proj.description}</p>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {proj.technologies.map((t, i) => (
                      <span key={i} className="text-[10px] bg-orange-950/80 text-orange-300 px-2.5 py-0.5 rounded-lg border border-orange-800 font-mono">
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
              <Activity className="w-5 h-5 text-blue-400" /> ELASTIC SKILL MATRIX
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {skills.map((cat) => (
                <div key={cat.id} className="p-6 bg-[#0f172a] border border-slate-800 rounded-3xl space-y-3">
                  <h3 className="text-xs font-bold text-orange-400 font-mono uppercase">{cat.category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map((s, i) => (
                      <span key={i} className="text-xs bg-slate-900 text-slate-200 px-3 py-1.5 rounded-xl border border-slate-700 font-mono transform hover:scale-110 transition">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        <footer className="pt-8 border-t border-slate-800 text-center text-xs font-mono text-slate-500">
          © {new Date().getFullYear()} {personal.name}. Powered by Portify AI Elastic Physics Engine.
        </footer>
      </div>
    </div>
  );
}
