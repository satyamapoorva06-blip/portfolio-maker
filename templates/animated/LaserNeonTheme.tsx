'use client';

import React from 'react';
import { PortfolioData } from '@/types/portfolio';
import { Zap, ExternalLink, Github, Mail, Radio } from 'lucide-react';

export default function LaserNeonTheme({ data }: { data: PortfolioData }) {
  const { personal, about, projects, skills } = data;

  return (
    <div className="min-h-screen bg-[#030308] text-slate-100 font-sans p-6 sm:p-12 relative overflow-x-hidden">
      {/* Cyber Laser Sweeping Line Background FX */}
      <div className="fixed inset-0 pointer-events-none opacity-40">
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#00f0ff] to-transparent animate-bounce"></div>
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#ff0055] to-transparent animate-pulse"></div>
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-[#ff0055]/10 rounded-full blur-[180px]"></div>
        <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-[#00f0ff]/10 rounded-full blur-[180px]"></div>
      </div>

      <div className="max-w-5xl mx-auto space-y-16 relative z-10">
        {/* Laser Header */}
        <header className="p-8 bg-[#080814]/90 border border-[#00f0ff]/40 rounded-3xl space-y-6 shadow-2xl backdrop-blur-xl">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#ff0055]/30 pb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#ff0055] to-[#00f0ff] text-black font-black flex items-center justify-center text-xl shadow-lg shadow-[#00f0ff]/30 animate-pulse">
                ⚡
              </div>
              <div>
                <h1 className="text-3xl font-black text-white tracking-tight leading-none drop-shadow-[0_0_10px_#00f0ff]">
                  {personal.name}
                </h1>
                <p className="text-xs font-mono text-[#00f0ff] font-semibold mt-1">{personal.title}</p>
              </div>
            </div>

            <span className="px-3.5 py-1.5 bg-[#ff0055]/10 border border-[#ff0055]/40 text-[#ff0055] text-xs font-mono rounded-full flex items-center gap-1.5 shadow-[0_0_10px_#ff0055]">
              <Radio className="w-3.5 h-3.5 animate-pulse" /> LASER NEON ACTIVE
            </span>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed font-light">{about.summary}</p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            {personal.email && (
              <a
                href={`mailto:${personal.email}`}
                className="px-5 py-2.5 bg-gradient-to-r from-[#ff0055] to-[#00f0ff] text-black font-black text-xs rounded-xl shadow-[0_0_15px_#00f0ff] hover:opacity-90 transition"
              >
                <Mail className="w-4 h-4 inline mr-1.5" /> CONTACT NEON DEV
              </a>
            )}
            {personal.socials.github && (
              <a
                href={personal.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-[#0f0f26] text-[#00f0ff] font-mono text-xs rounded-xl border border-[#00f0ff]/40 hover:bg-[#00f0ff] hover:text-black transition"
              >
                <Github className="w-4 h-4 inline mr-1.5" /> GITHUB REPOS
              </a>
            )}
          </div>
        </header>

        {/* Laser Projects */}
        {projects && projects.length > 0 && (
          <section className="space-y-6">
            <h2 className="text-xl font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
              <Zap className="w-5 h-5 text-[#ff0055]" /> LASER POWERED PROJECTS
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((proj) => (
                <div
                  key={proj.id}
                  className="p-6 bg-[#080814]/90 border border-[#00f0ff]/30 hover:border-[#ff0055] rounded-3xl space-y-4 transition duration-300 group hover:shadow-[0_0_20px_#ff0055]"
                >
                  <div className="flex justify-between items-start">
                    <h3 className="font-extrabold text-white text-base group-hover:text-[#00f0ff] transition">{proj.name}</h3>
                    {proj.liveUrl && (
                      <a href={proj.liveUrl} target="_blank" rel="noopener noreferrer" className="p-2 text-[#00f0ff] hover:text-white rounded-xl transition">
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed font-light">{proj.description}</p>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {proj.technologies.map((t, i) => (
                      <span key={i} className="text-[10px] bg-[#ff0055]/10 text-[#ff0055] px-2.5 py-0.5 rounded-lg border border-[#ff0055]/30 font-mono">
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
            <h2 className="text-xl font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
              <Zap className="w-5 h-5 text-[#00f0ff]" /> TECH MATRIX & LASER STACK
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {skills.map((cat) => (
                <div key={cat.id} className="p-6 bg-[#080814]/90 border border-[#00f0ff]/30 rounded-3xl space-y-3">
                  <h3 className="text-xs font-bold text-[#00f0ff] font-mono uppercase">{cat.category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map((s, i) => (
                      <span key={i} className="text-xs bg-[#0f0f26] text-slate-200 px-3 py-1 rounded-xl border border-[#00f0ff]/20 font-mono">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        <footer className="pt-8 border-t border-[#00f0ff]/30 text-center text-xs font-mono text-slate-500">
          © {new Date().getFullYear()} {personal.name}. Powered by Portify AI Laser Neon Engine.
        </footer>
      </div>
    </div>
  );
}
