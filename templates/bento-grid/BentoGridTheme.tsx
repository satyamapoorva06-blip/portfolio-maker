'use client';

import React from 'react';
import { PortfolioData } from '@/types/portfolio';
import { LayoutGrid, ExternalLink, Github, Linkedin, Mail, Sparkles, Code2, Award, Globe, ArrowUpRight } from 'lucide-react';

export default function BentoGridTheme({ data }: { data: PortfolioData }) {
  const { personal, about, projects, skills, experience } = data;

  return (
    <div className="min-h-screen bg-[#090a0f] text-slate-100 font-sans p-6 sm:p-12 relative overflow-x-hidden">
      {/* Glow background mesh */}
      <div className="fixed top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-blue-600/10 rounded-full blur-[180px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto space-y-8 relative z-10">
        {/* Top Header */}
        <header className="flex justify-between items-center bg-[#11131c] border border-slate-800 rounded-3xl p-6 shadow-2xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-500 text-white font-extrabold text-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
              {personal.name.charAt(0)}
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-white tracking-tight">{personal.name}</h1>
              <p className="text-xs text-cyan-400 font-mono">{personal.title}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {personal.email && (
              <a
                href={`mailto:${personal.email}`}
                className="px-4 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-xs rounded-2xl shadow-lg shadow-blue-500/25 flex items-center gap-2 transition"
              >
                <Mail className="w-4 h-4" /> Contact Me
              </a>
            )}
          </div>
        </header>

        {/* Bento Grid Layout Container */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main Hero Bento Card (Spans 2 cols) */}
          <div className="md:col-span-2 p-8 bg-[#11131c] border border-slate-800 hover:border-slate-700 rounded-3xl space-y-6 flex flex-col justify-between transition shadow-xl">
            <div className="space-y-4">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-400/20 text-xs font-semibold text-blue-300">
                <Sparkles className="w-3.5 h-3.5 text-blue-400" /> BENTO GRID PORTFOLIO
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
                Architecting modern web applications & scalable cloud systems.
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">{about.summary}</p>
            </div>

            <div className="flex items-center gap-4 pt-4 border-t border-slate-800">
              <span className="text-xs font-mono text-slate-400 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span> Available for Hire
              </span>
              <span className="text-xs font-mono text-slate-400">• {personal.location}</span>
            </div>
          </div>

          {/* Social Connections Bento Card */}
          <div className="p-8 bg-[#11131c] border border-slate-800 rounded-3xl space-y-6 flex flex-col justify-between shadow-xl">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">Connect & Links</h3>
            <div className="space-y-3">
              {personal.socials.github && (
                <a
                  href={personal.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-2xl flex items-center justify-between text-xs font-medium text-slate-200 transition"
                >
                  <span className="flex items-center gap-2">
                    <Github className="w-4 h-4 text-cyan-400" /> GitHub Repository
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-slate-500" />
                </a>
              )}
              {personal.socials.linkedin && (
                <a
                  href={personal.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-2xl flex items-center justify-between text-xs font-medium text-slate-200 transition"
                >
                  <span className="flex items-center gap-2">
                    <Linkedin className="w-4 h-4 text-blue-400" /> LinkedIn Profile
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-slate-500" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Projects Bento Showcase */}
        {projects && projects.length > 0 && (
          <section className="space-y-6">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono flex items-center gap-2">
              <LayoutGrid className="w-4 h-4 text-cyan-400" /> Featured Projects
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {projects.map((proj, idx) => (
                <div
                  key={proj.id}
                  className={`p-6 bg-[#11131c] border border-slate-800 hover:border-cyan-500/50 rounded-3xl space-y-4 transition duration-300 flex flex-col justify-between shadow-xl ${
                    idx === 0 ? 'md:col-span-2' : ''
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <h4 className="font-extrabold text-white text-base">{proj.name}</h4>
                      {proj.liveUrl && (
                        <a
                          href={proj.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-slate-900 hover:bg-slate-800 rounded-xl text-cyan-400 transition"
                        >
                          <ArrowUpRight className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed font-light">{proj.description}</p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {proj.technologies.map((t, i) => (
                      <span key={i} className="text-[10px] bg-slate-900 text-cyan-300 px-2.5 py-1 rounded-xl border border-slate-800 font-mono">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Tech Stack Bento Grid */}
        {skills && skills.length > 0 && (
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {skills.map((cat) => (
              <div key={cat.id} className="p-6 bg-[#11131c] border border-slate-800 rounded-3xl space-y-3">
                <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider font-mono">{cat.category}</h4>
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((s, i) => (
                    <span key={i} className="text-xs bg-slate-900 text-slate-200 px-3 py-1.5 rounded-2xl border border-slate-800 font-mono">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </section>
        )}

        {/* Footer */}
        <footer className="pt-8 border-t border-slate-800 text-center text-xs text-slate-500 font-mono">
          © {new Date().getFullYear()} {personal.name}. Powered by Portify AI Bento Grid.
        </footer>
      </div>
    </div>
  );
}
