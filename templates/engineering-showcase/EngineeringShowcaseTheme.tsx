'use client';

import React from 'react';
import { PortfolioData } from '@/types/portfolio';
import { Server, Activity, ShieldCheck, Cpu, ExternalLink, Github, Mail, Layers, CheckCircle } from 'lucide-react';

export default function EngineeringShowcaseTheme({ data }: { data: PortfolioData }) {
  const { personal, about, projects, skills } = data;

  return (
    <div className="min-h-screen bg-[#090b10] text-slate-100 font-sans p-6 sm:p-12 relative overflow-x-hidden">
      <div className="max-w-5xl mx-auto space-y-16 relative z-10">
        {/* Systems Engineering Header */}
        <header className="p-8 bg-[#111520] border border-cyan-500/30 rounded-3xl space-y-6 shadow-2xl">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800 pb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500 text-black font-extrabold flex items-center justify-center text-xl shadow-lg shadow-cyan-500/20">
                ⚙️
              </div>
              <div>
                <h1 className="text-2xl font-extrabold text-white">{personal.name}</h1>
                <span className="text-xs font-mono text-cyan-400 font-semibold">{personal.title}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-3.5 py-1.5 bg-emerald-950 text-emerald-300 border border-emerald-800 text-xs font-mono rounded-full flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> System SLA 99.999%
              </span>
            </div>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed font-light">{about.summary}</p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            {personal.email && (
              <a
                href={`mailto:${personal.email}`}
                className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs rounded-xl shadow-lg flex items-center gap-1.5 transition"
              >
                <Mail className="w-4 h-4" /> Systems Engineering Contact
              </a>
            )}
            {personal.socials.github && (
              <a
                href={personal.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-medium rounded-xl border border-slate-700 flex items-center gap-1.5 transition"
              >
                <Github className="w-4 h-4 text-cyan-400" /> Code Base
              </a>
            )}
          </div>
        </header>

        {/* System Architecture Projects */}
        {projects && projects.length > 0 && (
          <section className="space-y-6">
            <h2 className="text-xl font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Server className="w-5 h-5 text-cyan-400" /> Software Systems & Engineering Projects
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((proj) => (
                <div
                  key={proj.id}
                  className="p-6 bg-[#111520] border border-slate-800 hover:border-cyan-500/50 rounded-3xl space-y-4 transition duration-300 group hover:shadow-xl hover:shadow-cyan-500/10"
                >
                  <div className="flex justify-between items-start">
                    <h3 className="font-extrabold text-white text-base group-hover:text-cyan-400 transition">{proj.name}</h3>
                    {proj.liveUrl && (
                      <a href={proj.liveUrl} target="_blank" rel="noopener noreferrer" className="p-2 text-cyan-400 hover:text-white rounded-xl transition">
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
              <Cpu className="w-5 h-5 text-cyan-400" /> Technical Competencies Matrix
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {skills.map((cat) => (
                <div key={cat.id} className="p-6 bg-[#111520] border border-slate-800 rounded-3xl space-y-3">
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
          © {new Date().getFullYear()} {personal.name}. Powered by Portify AI Engineering Showcase Engine.
        </footer>
      </div>
    </div>
  );
}
