'use client';

import React from 'react';
import { PortfolioData } from '@/types/portfolio';
import { Zap, Sparkles, Code2, Rocket, Globe, Github, Linkedin, ArrowUpRight } from 'lucide-react';

export default function VibrantWebTheme({ data }: { data: PortfolioData }) {
  const p = data.personal;
  const a = data.about;

  return (
    <div className="min-h-screen bg-[#07130e] text-slate-100 font-sans selection:bg-emerald-400 selection:text-black">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-500 to-lime-500 text-black text-xs font-black py-2 px-6 text-center uppercase tracking-widest">
        ⚡ Vibrant High-Impact Web Developer Portfolio
      </div>

      <main className="max-w-6xl mx-auto px-6 py-12 space-y-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-[#0c2419] to-[#07130e] border-2 border-emerald-500/40 rounded-3xl p-8 sm:p-12 space-y-6 shadow-2xl relative">
          <div className="flex flex-wrap justify-between items-center gap-4">
            <span className="px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-bold font-mono">
              AVAILABLE FOR HIRE ⚡
            </span>
            <div className="flex gap-3">
              {p.socials?.github && (
                <a href={p.socials.github} target="_blank" rel="noopener noreferrer" className="p-2.5 bg-emerald-950 border border-emerald-800 rounded-xl text-emerald-300 hover:bg-emerald-500 hover:text-black transition">
                  <Github className="w-5 h-5" />
                </a>
              )}
              {p.socials?.linkedin && (
                <a href={p.socials.linkedin} target="_blank" rel="noopener noreferrer" className="p-2.5 bg-emerald-950 border border-emerald-800 rounded-xl text-emerald-300 hover:bg-emerald-500 hover:text-black transition">
                  <Linkedin className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>

          <div className="space-y-3">
            <h1 className="text-5xl sm:text-6xl font-black text-white tracking-tight leading-tight">
              Hi, I&apos;m <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-lime-400">{p.name}</span>
            </h1>
            <p className="text-xl text-emerald-300 font-semibold">{p.title || 'Full Stack Web Developer'}</p>
          </div>

          <p className="text-slate-300 leading-relaxed text-sm sm:text-base max-w-3xl font-light">{a.summary}</p>
        </section>

        {/* Skills */}
        {data.skills && data.skills.length > 0 && (
          <section className="space-y-6">
            <h2 className="text-2xl font-black text-white flex items-center gap-2 border-b border-emerald-900 pb-3">
              <Zap className="w-6 h-6 text-emerald-400" /> Technologies & Tools
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {data.skills.map((grp) => (
                <div key={grp.id} className="p-6 bg-[#0c2419] border border-emerald-900/60 rounded-2xl space-y-4">
                  <h3 className="text-sm font-bold text-emerald-300 font-mono uppercase">{grp.category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {grp.skills.map((sk, idx) => (
                      <span key={idx} className="px-3 py-1 bg-emerald-950 text-emerald-300 text-xs font-bold font-mono rounded-lg border border-emerald-800">
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {data.projects && data.projects.length > 0 && (
          <section className="space-y-6">
            <h2 className="text-2xl font-black text-white flex items-center gap-2 border-b border-emerald-900 pb-3">
              <Rocket className="w-6 h-6 text-emerald-400" /> Featured Web Apps
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data.projects.map((proj) => (
                <div key={proj.id} className="p-6 bg-[#0c2419] border border-emerald-900/60 rounded-2xl space-y-4 hover:border-emerald-400 transition">
                  <h3 className="font-bold text-white text-xl">{proj.name}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">{proj.description}</p>
                  {proj.technologies && proj.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {proj.technologies.map((t, idx) => (
                        <span key={idx} className="text-[10px] bg-black text-emerald-400 px-2.5 py-1 rounded font-mono border border-emerald-900">
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      <footer className="border-t border-emerald-900 py-8 text-center text-xs text-slate-500 font-mono">
        © {new Date().getFullYear()} {p.name}. Vibrant Web Developer Portfolio.
      </footer>
    </div>
  );
}
