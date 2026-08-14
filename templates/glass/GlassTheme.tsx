'use client';

import React from 'react';
import { PortfolioData } from '@/types/portfolio';
import { Sparkles, Github, Linkedin, Mail, ArrowUpRight, Code, ShieldCheck, GraduationCap, CheckCircle2 } from 'lucide-react';

export default function GlassTheme({ data }: { data: PortfolioData }) {
  const { personal, about, skills, experience, projects, education, sectionVisibility } = data;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans relative overflow-x-hidden selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Background Ambient Mesh Gradients */}
      <div className="fixed top-0 left-1/3 w-[600px] h-[600px] bg-cyan-600/15 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="fixed bottom-0 right-1/4 w-[600px] h-[600px] bg-purple-600/15 rounded-full blur-[140px] pointer-events-none"></div>

      {/* Glass Header Navigation */}
      <header className="max-w-6xl mx-auto px-6 py-6 sticky top-4 z-30">
        <div className="backdrop-blur-2xl bg-white/[0.05] border border-white/10 rounded-2xl px-6 py-3.5 flex justify-between items-center shadow-2xl">
          <span className="font-extrabold text-lg tracking-tight text-white flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-cyan-400 animate-ping"></span>
            {personal.name}
          </span>
          <div className="flex items-center gap-4 text-xs font-semibold text-slate-300">
            {personal.socials.github && (
              <a href={personal.socials.github} target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition flex items-center gap-1.5">
                <Github className="w-4 h-4" /> GitHub
              </a>
            )}
            {personal.socials.linkedin && (
              <a href={personal.socials.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition flex items-center gap-1.5">
                <Linkedin className="w-4 h-4" /> LinkedIn
              </a>
            )}
            <a
              href={`mailto:${personal.email}`}
              className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white rounded-xl shadow-lg shadow-cyan-500/20 transition flex items-center gap-1.5"
            >
              <Mail className="w-4 h-4" /> Contact Me
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12 space-y-20 relative z-10">
        {/* Hero Glass Card */}
        <section className="backdrop-blur-2xl bg-white/[0.04] border border-white/10 rounded-3xl p-8 sm:p-12 space-y-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-xs font-bold text-cyan-300">
              <Sparkles className="w-3.5 h-3.5" /> AMBIENT FROSTED GLASS PORTFOLIO
            </div>
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-tight">{personal.name}</h1>
            <p className="text-2xl text-cyan-400 font-bold">{personal.title}</p>
          </div>

          <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-3xl font-light">{about.summary}</p>

          {/* Highlights */}
          {about.highlights && about.highlights.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 max-w-3xl">
              {about.highlights.map((h, idx) => (
                <div key={idx} className="p-3.5 backdrop-blur-xl bg-white/[0.03] border border-white/10 rounded-2xl text-xs text-slate-200 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>{h}</span>
                </div>
              ))}
            </div>
          )}

          <div className="pt-4 flex flex-wrap gap-4">
            <a
              href={`mailto:${personal.email}`}
              className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-cyan-500/25 transition transform hover:-translate-y-0.5"
            >
              Get In Touch
            </a>
          </div>
        </section>

        {/* Projects Glass Showcase */}
        {sectionVisibility.projects && projects.length > 0 && (
          <section className="space-y-8">
            <div className="flex justify-between items-end border-b border-white/10 pb-4">
              <h2 className="text-2xl font-extrabold text-white flex items-center gap-3">
                <Code className="w-6 h-6 text-cyan-400" /> Featured Projects
              </h2>
              <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950 px-3 py-1 rounded-full border border-cyan-800">
                {projects.length} PROJECTS
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projects.map((proj) => (
                <div
                  key={proj.id}
                  className="backdrop-blur-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-cyan-400/40 rounded-3xl p-8 space-y-6 transition duration-300 shadow-xl"
                >
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <h3 className="font-extrabold text-white text-xl">{proj.name}</h3>
                      {proj.githubUrl && (
                        <a
                          href={proj.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2.5 bg-white/5 hover:bg-white/10 rounded-xl text-slate-300 transition"
                        >
                          <ArrowUpRight className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">{proj.description}</p>

                    {proj.features && proj.features.length > 0 && (
                      <ul className="space-y-1 text-xs text-slate-400 pt-1">
                        {proj.features.map((feat, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-cyan-400">›</span>
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2 pt-3 border-t border-white/10">
                    {proj.technologies.map((t, idx) => (
                      <span key={idx} className="text-xs bg-cyan-500/10 text-cyan-300 font-mono px-3 py-1 rounded-lg border border-cyan-500/20">
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
          <section className="space-y-8">
            <div className="border-b border-white/10 pb-4">
              <h2 className="text-2xl font-extrabold text-white flex items-center gap-3">
                <Sparkles className="w-6 h-6 text-purple-400" /> Technical Ecosystem
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {skills.map((cat) => (
                <div key={cat.id} className="backdrop-blur-xl bg-white/[0.03] border border-white/10 rounded-3xl p-6 space-y-4">
                  <h3 className="text-xs font-mono font-bold text-purple-400 uppercase tracking-widest">{cat.category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map((s, idx) => (
                      <span key={idx} className="text-xs bg-white/5 hover:bg-white/10 text-slate-200 font-mono px-3 py-1.5 rounded-xl border border-white/10 transition">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {sectionVisibility.education && education.length > 0 && (
          <section className="space-y-8">
            <div className="border-b border-white/10 pb-4">
              <h2 className="text-2xl font-extrabold text-white flex items-center gap-3">
                <GraduationCap className="w-6 h-6 text-emerald-400" /> Education & Qualifications
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {education.map((edu) => (
                <div key={edu.id} className="backdrop-blur-xl bg-white/[0.03] border border-white/10 rounded-3xl p-6 space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-bold text-white">{edu.institution}</h3>
                      <p className="text-xs text-cyan-400 font-semibold">{edu.degree} — {edu.field}</p>
                    </div>
                    {edu.gpa && (
                      <span className="px-3 py-1 bg-cyan-950 text-cyan-300 text-xs font-mono font-bold rounded-lg border border-cyan-800">
                        {edu.gpa}
                      </span>
                    )}
                  </div>
                  <p className="text-xs font-mono text-slate-400">{edu.startDate} – {edu.current ? 'Present' : edu.endDate}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      <footer className="max-w-6xl mx-auto px-6 py-12 text-center text-xs text-slate-500 border-t border-white/5">
        © {new Date().getFullYear()} {personal.name} — Portify AI Glass Theme
      </footer>
    </div>
  );
}
