'use client';

import React, { useState, useEffect } from 'react';
import { PortfolioData } from '@/types/portfolio';
import { Sparkles, Code2, ExternalLink, Github, Linkedin, Mail, Zap, Play, Radio, Cpu, Layers } from 'lucide-react';

interface AnimatedThemeProps {
  data: PortfolioData;
  variant?: 'marquee' | 'laser' | 'tilt' | 'glitch' | 'aurora' | 'elastic' | 'constellation' | 'liquid' | 'synthwave' | 'prism';
}

export default function AnimatedTheme({ data, variant = 'aurora' }: AnimatedThemeProps) {
  const { personal, about, projects, skills } = data;
  const [pulse, setPulse] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setPulse((p) => (p + 1) % 100), 50);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#05060b] text-slate-100 font-sans p-6 sm:p-12 relative overflow-x-hidden select-none">
      {/* Dynamic Animated Ambient Background Layer */}
      {variant === 'aurora' && (
        <div className="fixed inset-0 pointer-events-none opacity-40">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-tr from-cyan-500 via-purple-600 to-pink-500 rounded-full blur-[160px] animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-gradient-to-tr from-emerald-500 via-blue-600 to-indigo-500 rounded-full blur-[160px] animate-pulse delay-1000"></div>
        </div>
      )}

      {variant === 'laser' && (
        <div className="fixed inset-0 pointer-events-none opacity-30">
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-bounce"></div>
          <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-purple-500 to-transparent animate-pulse"></div>
        </div>
      )}

      {variant === 'synthwave' && (
        <div className="fixed inset-0 pointer-events-none opacity-25 bg-[radial-gradient(#ec4899_1px,transparent_1px)] [background-size:24px_24px]"></div>
      )}

      <div className="max-w-5xl mx-auto space-y-16 relative z-10">
        {/* Infinite Rotating Animated Marquee Banner */}
        <div className="w-full overflow-hidden bg-gradient-to-r from-purple-900/60 via-cyan-900/60 to-purple-900/60 border border-purple-500/30 rounded-2xl py-2.5 px-4 backdrop-blur-md flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-xs font-mono font-bold text-cyan-400 shrink-0">
            <Sparkles className="w-4 h-4 text-cyan-400 animate-spin" /> ANIMATED PORTFOLIO MODE
          </span>
          <div className="flex gap-8 whitespace-nowrap animate-marquee text-xs font-mono text-slate-300">
            <span>🚀 LIVE INTERACTIVE PREVIEW</span>
            <span>⚡ MICRO-ANIMATIONS ACTIVE</span>
            <span>✨ {personal.title.toUpperCase()}</span>
            <span>🔥 AVAILABLE FOR HIRE 2026</span>
          </div>
        </div>

        {/* Hero Section with Interactive Card Tilt & Motion */}
        <header className="p-8 sm:p-10 bg-[#0d0f1a]/80 border border-slate-800 hover:border-cyan-500/50 rounded-3xl space-y-6 shadow-2xl backdrop-blur-xl transition duration-500 transform hover:-translate-y-1">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 border-b border-slate-800 pb-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-500 via-purple-600 to-pink-500 text-white font-extrabold text-2xl flex items-center justify-center shadow-lg shadow-cyan-500/25 animate-bounce">
                {personal.name.charAt(0)}
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-purple-300">
                  {personal.name}
                </h1>
                <p className="text-xs font-mono text-cyan-400 font-semibold mt-1 flex items-center gap-2">
                  <Zap className="w-3.5 h-3.5 text-yellow-400 animate-pulse" /> {personal.title}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-3.5 py-1.5 bg-cyan-950/80 border border-cyan-800 text-cyan-300 text-xs font-mono rounded-full flex items-center gap-2 shadow-inner">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span> Live Interactive Motion
              </span>
            </div>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed font-light">{about.summary}</p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            {personal.email && (
              <a
                href={`mailto:${personal.email}`}
                className="px-5 py-2.5 bg-gradient-to-r from-cyan-500 via-purple-600 to-pink-500 hover:opacity-90 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-cyan-500/20 flex items-center gap-2 transition transform hover:scale-105"
              >
                <Mail className="w-4 h-4" /> Get In Touch
              </a>
            )}
            {personal.socials.github && (
              <a
                href={personal.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-medium rounded-xl border border-slate-700 flex items-center gap-2 transition transform hover:scale-105"
              >
                <Github className="w-4 h-4 text-cyan-400" /> GitHub
              </a>
            )}
          </div>
        </header>

        {/* Animated Projects Showcase */}
        {projects && projects.length > 0 && (
          <section className="space-y-6">
            <h2 className="text-xl font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
              <Code2 className="w-5 h-5 text-cyan-400" /> Animated Featured Projects
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((proj, idx) => (
                <div
                  key={proj.id}
                  className="p-6 bg-[#0d0f1a]/80 border border-slate-800 hover:border-cyan-400/60 rounded-3xl space-y-4 backdrop-blur-xl transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-cyan-500/10 group"
                >
                  <div className="flex justify-between items-start">
                    <h3 className="font-extrabold text-white text-base group-hover:text-cyan-400 transition">{proj.name}</h3>
                    {proj.liveUrl && (
                      <a
                        href={proj.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-cyan-400 hover:text-white rounded-xl transition transform group-hover:scale-110"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed font-light">{proj.description}</p>

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

        {/* Animated Skills */}
        {skills && skills.length > 0 && (
          <section className="space-y-6">
            <h2 className="text-xl font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
              <Layers className="w-5 h-5 text-purple-400" /> Animated Skill Matrix
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {skills.map((cat) => (
                <div key={cat.id} className="p-6 bg-[#0d0f1a]/80 border border-slate-800 rounded-3xl space-y-3 backdrop-blur-xl">
                  <h3 className="text-xs font-bold text-cyan-400 font-mono uppercase">{cat.category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map((s, i) => (
                      <span key={i} className="text-xs bg-slate-900 text-slate-200 px-3 py-1.5 rounded-xl border border-slate-800 font-mono transform hover:scale-105 transition">
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
          © {new Date().getFullYear()} {personal.name}. Powered by Portify AI Kinetic Animation Engine.
        </footer>
      </div>
    </div>
  );
}
