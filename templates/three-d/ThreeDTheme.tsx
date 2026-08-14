'use client';

import React from 'react';
import { PortfolioData } from '@/types/portfolio';
import { Sparkles, Layers, Box, ExternalLink, Github, Linkedin, Mail, ShieldCheck, GraduationCap, CheckCircle2, Cpu } from 'lucide-react';

export default function ThreeDTheme({ data }: { data: PortfolioData }) {
  const { personal, about, skills, experience, projects, education, sectionVisibility } = data;

  return (
    <div className="min-h-screen bg-[#080c16] text-slate-100 font-sans selection:bg-cyan-500 selection:text-slate-900 overflow-x-hidden relative">
      {/* Background Glowing Ambient Orbs */}
      <div className="fixed top-12 left-1/4 w-[500px] h-[500px] bg-cyan-500/15 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="fixed bottom-12 right-1/4 w-[500px] h-[500px] bg-purple-500/15 rounded-full blur-[140px] pointer-events-none"></div>

      {/* Glass Header */}
      <nav className="max-w-6xl mx-auto px-6 py-6 flex justify-between items-center relative z-20 border-b border-cyan-500/20 bg-[#080c16]/80 backdrop-blur-md sticky top-0">
        <span className="text-xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-purple-400 flex items-center gap-2 font-mono">
          <Box className="w-6 h-6 text-cyan-400 animate-pulse" />
          {personal.name.toUpperCase()}
        </span>
        <div className="flex items-center gap-4 text-xs font-bold">
          {personal.socials.github && (
            <a href={personal.socials.github} target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition flex items-center gap-1.5 text-slate-300">
              <Github className="w-4 h-4" /> GitHub
            </a>
          )}
          {personal.socials.linkedin && (
            <a href={personal.socials.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition flex items-center gap-1.5 text-slate-300">
              <Linkedin className="w-4 h-4" /> LinkedIn
            </a>
          )}
          <a
            href={`mailto:${personal.email}`}
            className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white rounded-xl shadow-lg shadow-cyan-500/20 flex items-center gap-2 transition"
          >
            <Mail className="w-4 h-4" /> Contact
          </a>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-12 space-y-24 relative z-10">
        {/* 3D Spatial Hero */}
        <section className="text-center space-y-8 py-10 relative">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-xs font-bold text-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.25)]">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            3D SPATIAL INTERACTIVE PORTFOLIO
          </div>

          <h1 className="text-5xl sm:text-7xl font-black tracking-tight text-white max-w-4xl mx-auto leading-none uppercase">
            CREATING DIGITAL <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-purple-400">
              EXPERIENCES & SYSTEMS
            </span>
          </h1>

          <p className="text-2xl font-bold text-cyan-300 max-w-2xl mx-auto">{personal.title}</p>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">{about.summary}</p>

          {/* Highlights Pills */}
          {about.highlights && about.highlights.length > 0 && (
            <div className="flex flex-wrap justify-center gap-3 pt-2 max-w-3xl mx-auto">
              {about.highlights.map((h, idx) => (
                <div key={idx} className="px-4 py-2 bg-slate-900/90 border border-slate-800 rounded-xl text-xs font-semibold text-slate-200 flex items-center gap-2 shadow-md">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                  <span>{h}</span>
                </div>
              ))}
            </div>
          )}

          {/* Action CTAs */}
          <div className="pt-6 flex justify-center gap-4">
            <a
              href={`mailto:${personal.email}`}
              className="px-8 py-4 bg-gradient-to-r from-cyan-500 via-teal-400 to-blue-600 text-slate-950 font-black text-sm rounded-2xl shadow-[0_0_30px_rgba(6,182,212,0.4)] hover:shadow-[0_0_40px_rgba(6,182,212,0.6)] transition transform hover:-translate-y-1"
            >
              Get In Touch
            </a>
          </div>
        </section>

        {/* Featured 3D Spatial Projects */}
        {sectionVisibility.projects && projects.length > 0 && (
          <section className="space-y-8">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h2 className="text-2xl font-black tracking-tight text-white flex items-center gap-3">
                <Layers className="w-7 h-7 text-cyan-400" />
                Featured Projects Showcase
              </h2>
              <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950 px-3 py-1 rounded-full border border-cyan-800">
                {projects.length} PROJECTS
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projects.map((proj) => (
                <div
                  key={proj.id}
                  className="group bg-gradient-to-b from-slate-900/90 to-[#0c1222] border border-cyan-500/30 rounded-3xl p-8 space-y-6 transition duration-500 hover:border-cyan-400 hover:shadow-[0_10px_40px_rgba(6,182,212,0.25)] transform hover:-translate-y-2 backdrop-blur-xl"
                >
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <h3 className="text-2xl font-extrabold text-white group-hover:text-cyan-300 transition leading-snug">{proj.name}</h3>
                      {proj.githubUrl && (
                        <a
                          href={proj.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2.5 bg-slate-800/80 hover:bg-cyan-500 hover:text-slate-950 rounded-xl text-slate-300 transition shadow-lg"
                        >
                          <ExternalLink className="w-5 h-5" />
                        </a>
                      )}
                    </div>

                    <p className="text-sm text-slate-300 leading-relaxed">{proj.description}</p>

                    {proj.features && proj.features.length > 0 && (
                      <ul className="space-y-1.5 text-xs text-slate-400">
                        {proj.features.map((feat, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-cyan-400 font-bold">›</span>
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-800">
                    {proj.technologies.map((t, idx) => (
                      <span key={idx} className="text-xs font-mono font-bold bg-cyan-950 text-cyan-300 px-3 py-1 rounded-lg border border-cyan-800">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Technical Capabilities Matrix */}
        {sectionVisibility.skills && skills.length > 0 && (
          <section className="space-y-8">
            <div className="border-b border-slate-800 pb-4">
              <h2 className="text-2xl font-black tracking-tight text-white flex items-center gap-3">
                <Cpu className="w-7 h-7 text-purple-400" />
                Technical Capabilities
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {skills.map((cat) => (
                <div key={cat.id} className="bg-slate-900/70 border border-slate-800 rounded-3xl p-6 space-y-4 backdrop-blur hover:border-purple-500/40 transition">
                  <h3 className="text-xs font-mono font-bold text-purple-400 uppercase tracking-wider">{cat.category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map((s, idx) => (
                      <span key={idx} className="text-xs bg-slate-950 text-slate-200 font-mono px-3 py-1.5 rounded-xl border border-slate-800 hover:border-cyan-400 hover:text-cyan-300 transition">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education & Academics */}
        {sectionVisibility.education && education.length > 0 && (
          <section className="space-y-8">
            <div className="border-b border-slate-800 pb-4">
              <h2 className="text-2xl font-black tracking-tight text-white flex items-center gap-3">
                <GraduationCap className="w-7 h-7 text-teal-400" />
                Education & Qualifications
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {education.map((edu) => (
                <div key={edu.id} className="bg-slate-900/70 border border-slate-800 rounded-3xl p-6 space-y-3 backdrop-blur">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-extrabold text-white">{edu.institution}</h3>
                      <p className="text-xs font-bold text-cyan-400">{edu.degree} — {edu.field}</p>
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

      <footer className="max-w-6xl mx-auto px-6 py-12 text-center text-xs text-slate-500 border-t border-slate-900 relative z-10">
        © {new Date().getFullYear()} {personal.name}. Powered by Portify AI 3D Engine.
      </footer>
    </div>
  );
}
