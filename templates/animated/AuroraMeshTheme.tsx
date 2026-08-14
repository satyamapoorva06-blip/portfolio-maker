'use client';

import React from 'react';
import { PortfolioData } from '@/types/portfolio';
import { Sparkles, ExternalLink, Github, Mail, Layers } from 'lucide-react';

export default function AuroraMeshTheme({ data }: { data: PortfolioData }) {
  const { personal, about, projects, skills } = data;

  return (
    <div className="min-h-screen bg-[#070510] text-slate-100 font-sans p-6 sm:p-12 relative overflow-x-hidden">
      {/* Living Aurora Gradient Mesh Background */}
      <div className="fixed inset-0 pointer-events-none opacity-40">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-tr from-teal-500 via-purple-600 to-pink-500 rounded-full blur-[180px] animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-gradient-to-tr from-indigo-500 via-pink-600 to-teal-400 rounded-full blur-[180px] animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-5xl mx-auto space-y-16 relative z-10">
        <header className="p-8 bg-[#110d24]/70 border border-teal-500/30 rounded-3xl space-y-6 backdrop-blur-2xl shadow-2xl">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-purple-900/30 pb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-teal-400 via-purple-500 to-pink-500 text-white font-extrabold text-xl flex items-center justify-center shadow-lg shadow-teal-500/20">
                ✨
              </div>
              <div>
                <h1 className="text-3xl font-black text-white">{personal.name}</h1>
                <p className="text-xs font-mono text-teal-300 font-semibold">{personal.title}</p>
              </div>
            </div>

            <span className="px-3.5 py-1.5 bg-teal-950/80 border border-teal-700 text-teal-300 text-xs font-mono rounded-full flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-pink-400 animate-spin" /> AURORA MESH
            </span>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed font-light">{about.summary}</p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            {personal.email && (
              <a
                href={`mailto:${personal.email}`}
                className="px-5 py-2.5 bg-gradient-to-r from-teal-400 via-purple-500 to-pink-500 text-white font-bold text-xs rounded-xl shadow-lg hover:opacity-90 transition"
              >
                <Mail className="w-4 h-4 inline mr-1.5" /> CONTACT AURORA DEV
              </a>
            )}
            {personal.socials.github && (
              <a
                href={personal.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-[#1a1436] text-teal-200 text-xs font-medium rounded-xl border border-teal-500/30 hover:bg-[#231b4a] transition"
              >
                <Github className="w-4 h-4 inline mr-1.5" /> GITHUB CODE
              </a>
            )}
          </div>
        </header>

        {projects && projects.length > 0 && (
          <section className="space-y-6">
            <h2 className="text-xl font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Layers className="w-5 h-5 text-teal-400" /> AURORA FEATURED WORKS
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((proj) => (
                <div
                  key={proj.id}
                  className="p-6 bg-[#110d24]/70 border border-teal-500/30 hover:border-pink-500/60 rounded-3xl space-y-4 backdrop-blur-xl transition duration-300 group hover:shadow-xl hover:shadow-teal-500/10"
                >
                  <div className="flex justify-between items-start">
                    <h3 className="font-extrabold text-white text-base group-hover:text-teal-300 transition">{proj.name}</h3>
                    {proj.liveUrl && (
                      <a href={proj.liveUrl} target="_blank" rel="noopener noreferrer" className="p-2 text-teal-300 hover:text-white rounded-xl transition">
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed font-light">{proj.description}</p>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {proj.technologies.map((t, i) => (
                      <span key={i} className="text-[10px] bg-purple-950/80 text-pink-300 px-2.5 py-0.5 rounded-lg border border-purple-800 font-mono">
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
              <Sparkles className="w-5 h-5 text-pink-400" /> AURORA SKILL MATRIX
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {skills.map((cat) => (
                <div key={cat.id} className="p-6 bg-[#110d24]/70 border border-teal-500/30 rounded-3xl space-y-3 backdrop-blur-xl">
                  <h3 className="text-xs font-bold text-teal-300 font-mono uppercase">{cat.category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map((s, i) => (
                      <span key={i} className="text-xs bg-[#1a1436] text-slate-200 px-3 py-1 rounded-xl border border-teal-500/20 font-mono">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        <footer className="pt-8 border-t border-purple-900/30 text-center text-xs font-mono text-slate-500">
          © {new Date().getFullYear()} {personal.name}. Powered by Portify AI Living Aurora Engine.
        </footer>
      </div>
    </div>
  );
}
