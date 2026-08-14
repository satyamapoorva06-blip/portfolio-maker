'use client';

import React from 'react';
import { PortfolioData } from '@/types/portfolio';
import { Sparkles, Github, Linkedin, Mail, ArrowUpRight, Code, ShieldCheck, Award } from 'lucide-react';

export default function GlassTheme({ data }: { data: PortfolioData }) {
  const { personal, about, skills, experience, projects, education, customization, sectionVisibility } = data;
  const primaryColor = customization.primaryColor || '#0c8ee9';
  const accentColor = customization.accentColor || '#8b5cf6';

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans relative overflow-x-hidden selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Background Ambient Mesh Gradients */}
      <div className="fixed top-0 left-1/3 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="fixed bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Glass Header Navigation */}
      <header className="max-w-5xl mx-auto px-6 py-6 sticky top-4 z-30">
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-full px-6 py-3 flex justify-between items-center shadow-2xl">
          <span className="font-bold text-base tracking-tight text-white flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping"></span>
            {personal.name}
          </span>
          <div className="flex gap-4 text-xs text-slate-300 font-medium">
            {personal.socials.github && (
              <a href={personal.socials.github} target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition flex items-center gap-1">
                <Github className="w-3.5 h-3.5" /> GitHub
              </a>
            )}
            {personal.socials.linkedin && (
              <a href={personal.socials.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition flex items-center gap-1">
                <Linkedin className="w-3.5 h-3.5" /> LinkedIn
              </a>
            )}
            <a href={`mailto:${personal.email}`} className="hover:text-cyan-400 transition flex items-center gap-1">
              <Mail className="w-3.5 h-3.5" /> Contact
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-12 space-y-16 relative z-10">
        {/* Hero Glass Card */}
        <section className="backdrop-blur-2xl bg-white/[0.03] border border-white/10 rounded-3xl p-8 sm:p-12 space-y-6 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl"></div>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            {personal.avatarUrl && (
              <img src={personal.avatarUrl} alt={personal.name} className="w-24 h-24 rounded-2xl object-cover border-2 border-white/20 shadow-xl" />
            )}
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-xs text-cyan-300">
                <Sparkles className="w-3.5 h-3.5" /> Portify AI Glass Theme
              </div>
              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">{personal.name}</h1>
              <p className="text-xl text-cyan-400 font-medium">{personal.title}</p>
            </div>
          </div>

          <p className="text-base text-slate-300 leading-relaxed max-w-3xl font-light">{about.summary}</p>
        </section>

        {/* Projects Glass Grid */}
        {sectionVisibility.projects && projects.length > 0 && (
          <section className="space-y-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Code className="w-5 h-5 text-cyan-400" /> Featured Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((proj) => (
                <div key={proj.id} className="backdrop-blur-xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/10 rounded-2xl p-6 space-y-4 transition duration-300 hover:border-cyan-400/40 shadow-lg">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-white text-lg">{proj.name}</h3>
                    {proj.githubUrl && (
                      <a href={proj.githubUrl} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-slate-300 transition">
                        <ArrowUpRight className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed font-light">{proj.description}</p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {proj.technologies.map((t, idx) => (
                      <span key={idx} className="text-xs bg-cyan-500/10 text-cyan-300 px-3 py-1 rounded-full border border-cyan-500/20">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills Glass Grid */}
        {sectionVisibility.skills && skills.length > 0 && (
          <section className="space-y-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-400" /> Technical Ecosystem
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {skills.map((cat) => (
                <div key={cat.id} className="backdrop-blur-xl bg-white/[0.02] border border-white/10 rounded-2xl p-6 space-y-3">
                  <h3 className="text-xs font-semibold text-purple-400 uppercase tracking-widest">{cat.category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map((s, idx) => (
                      <span key={idx} className="text-xs bg-white/5 hover:bg-white/10 text-slate-200 px-3 py-1.5 rounded-lg border border-white/10 transition">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Experience Timeline */}
        {sectionVisibility.experience && experience.length > 0 && (
          <section className="space-y-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" /> Work History
            </h2>
            <div className="space-y-4">
              {experience.map((exp) => (
                <div key={exp.id} className="backdrop-blur-xl bg-white/[0.02] border border-white/10 rounded-2xl p-6 space-y-3">
                  <div className="flex flex-col sm:flex-row justify-between sm:items-baseline">
                    <h3 className="text-base font-bold text-white">{exp.role} <span className="text-cyan-400">@ {exp.company}</span></h3>
                    <span className="text-xs font-mono text-slate-400">{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed font-light">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      <footer className="max-w-5xl mx-auto px-6 py-12 text-center text-xs text-slate-500 border-t border-white/5">
        © {new Date().getFullYear()} {personal.name} — Portify AI Glass Theme
      </footer>
    </div>
  );
}
