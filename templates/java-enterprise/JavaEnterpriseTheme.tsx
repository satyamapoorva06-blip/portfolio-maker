'use client';

import React from 'react';
import { PortfolioData } from '@/types/portfolio';
import { Server, Database, Shield, ExternalLink, Github, Linkedin, Mail, CheckCircle2, Code2 } from 'lucide-react';

export default function JavaEnterpriseTheme({ data }: { data: PortfolioData }) {
  const { personal, about, projects, skills } = data;

  return (
    <div className="min-h-screen bg-[#080d14] text-slate-100 font-sans p-6 sm:p-12 relative overflow-x-hidden">
      <div className="max-w-5xl mx-auto space-y-16 relative z-10">
        {/* Corporate Executive Java Banner */}
        <header className="p-8 bg-[#0f1726] border border-slate-800 rounded-3xl space-y-6 shadow-2xl">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800 pb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-600 to-red-600 text-white font-black flex items-center justify-center text-xl shadow-lg">
                ☕
              </div>
              <div>
                <h1 className="text-2xl font-black text-white">{personal.name}</h1>
                <span className="text-xs font-mono text-amber-400 font-semibold">{personal.title}</span>
              </div>
            </div>

            <span className="px-3 py-1 bg-amber-950/80 border border-amber-800 text-amber-300 text-xs font-mono rounded-full flex items-center gap-1.5">
              Java • Spring Boot • Microservices • SQL
            </span>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed font-light">{about.summary}</p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            {personal.email && (
              <a
                href={`mailto:${personal.email}`}
                className="px-4 py-2 bg-gradient-to-r from-amber-600 to-red-600 hover:from-amber-500 hover:to-red-500 text-white font-bold text-xs rounded-xl shadow-lg flex items-center gap-1.5 transition"
              >
                <Mail className="w-4 h-4" /> Contact Backend Engineer
              </a>
            )}
            {personal.socials.github && (
              <a
                href={personal.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-medium rounded-xl border border-slate-700 flex items-center gap-1.5 transition"
              >
                <Github className="w-4 h-4 text-amber-400" /> GitHub Repos
              </a>
            )}
          </div>
        </header>

        {/* System Architecture Projects */}
        {projects && projects.length > 0 && (
          <section className="space-y-6">
            <h2 className="text-xl font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Server className="w-5 h-5 text-amber-400" /> Enterprise Systems & Microservices
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((proj) => (
                <div
                  key={proj.id}
                  className="p-6 bg-[#0f1726] border border-slate-800 hover:border-amber-500/50 rounded-3xl space-y-4 transition duration-300 group hover:shadow-xl hover:shadow-amber-500/10"
                >
                  <div className="flex justify-between items-start">
                    <h3 className="font-extrabold text-white text-base group-hover:text-amber-400 transition">{proj.name}</h3>
                    {proj.liveUrl && (
                      <a
                        href={proj.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-amber-400 hover:text-white rounded-xl transition"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed font-light">{proj.description}</p>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {proj.technologies.map((t, i) => (
                      <span key={i} className="text-[10px] bg-amber-950/80 text-amber-300 px-2.5 py-0.5 rounded-lg border border-amber-800 font-mono">
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
              <Database className="w-5 h-5 text-amber-400" /> Backend Stack & Databases
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {skills.map((cat) => (
                <div key={cat.id} className="p-6 bg-[#0f1726] border border-slate-800 rounded-3xl space-y-3">
                  <h3 className="text-xs font-bold text-amber-400 font-mono uppercase">{cat.category}</h3>
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
          © {new Date().getFullYear()} {personal.name}. Powered by Portify AI Java Enterprise Engine.
        </footer>
      </div>
    </div>
  );
}
