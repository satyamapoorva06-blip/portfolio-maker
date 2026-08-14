'use client';

import React from 'react';
import { PortfolioData } from '@/types/portfolio';
import { Sparkles, Layers, Box, Globe, ExternalLink, Github, Linkedin, Mail, ShieldCheck } from 'lucide-react';

export default function ThreeDTheme({ data }: { data: PortfolioData }) {
  const { personal, about, skills, experience, projects, education, customization, sectionVisibility } = data;

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 font-sans selection:bg-cyan-500 selection:text-slate-900 overflow-x-hidden">
      {/* Background Glows */}
      <div className="fixed top-10 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="fixed bottom-10 right-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Header */}
      <nav className="max-w-6xl mx-auto px-6 py-8 flex justify-between items-center relative z-10">
        <span className="text-xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-400 flex items-center gap-2">
          <Box className="w-5 h-5 text-cyan-400 animate-pulse" />
          {personal.name.toUpperCase()}
        </span>
        <div className="flex gap-4 text-xs font-semibold text-slate-300">
          {personal.socials.github && (
            <a href={personal.socials.github} target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition flex items-center gap-1">
              <Github className="w-4 h-4" /> GitHub
            </a>
          )}
          {personal.socials.linkedin && (
            <a href={personal.socials.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition flex items-center gap-1">
              <Linkedin className="w-4 h-4" /> LinkedIn
            </a>
          )}
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-12 space-y-24 relative z-10">
        {/* 3D Cinematic Hero */}
        <section className="text-center space-y-8 py-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/80 border border-slate-800 text-xs text-cyan-400 backdrop-blur shadow-inner">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            3D SPATIAL INTERACTIVE PORTFOLIO
          </div>

          <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-none">
            CREATING DIGITAL <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-violet-500">DIMENSIONS</span>
          </h1>

          <p className="text-xl text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">{personal.title}</p>
          <p className="text-sm text-slate-300 max-w-xl mx-auto font-normal leading-relaxed">{about.summary}</p>

          {/* 3D Tilt Experience Cards Banner */}
          <div className="pt-8 flex justify-center gap-6">
            <a href={`mailto:${personal.email}`} className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl hover:shadow-[0_0_25px_rgba(6,182,212,0.5)] transition duration-300 transform hover:-translate-y-1">
              Connect With Me
            </a>
          </div>
        </section>

        {/* Projects 3D Grid */}
        {sectionVisibility.projects && projects.length > 0 && (
          <section className="space-y-8">
            <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-3">
              <Layers className="w-6 h-6 text-cyan-400" />
              Interactive Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projects.map((proj) => (
                <div
                  key={proj.id}
                  className="group relative bg-slate-900/70 border border-slate-800 rounded-2xl p-6 transition duration-500 hover:border-cyan-500/50 hover:shadow-[0_10px_30px_rgba(6,182,212,0.15)] transform hover:-translate-y-2 backdrop-blur"
                >
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition">{proj.name}</h3>
                      {proj.githubUrl && (
                        <a href={proj.githubUrl} target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-800 rounded-lg text-slate-400 hover:text-white transition">
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                    <p className="text-sm text-slate-400 leading-relaxed">{proj.description}</p>
                    <div className="flex flex-wrap gap-2 pt-2">
                      {proj.technologies.map((t, idx) => (
                        <span key={idx} className="text-xs bg-slate-800/80 text-cyan-300 px-3 py-1 rounded-md border border-slate-700">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills 3D Cubes Matrix */}
        {sectionVisibility.skills && skills.length > 0 && (
          <section className="space-y-8">
            <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-3">
              <Box className="w-6 h-6 text-violet-400" />
              Technical Capabilities
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {skills.map((cat) => (
                <div key={cat.id} className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-4 backdrop-blur">
                  <h3 className="text-sm font-semibold text-violet-400 uppercase tracking-wider">{cat.category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map((s, idx) => (
                      <span key={idx} className="text-xs bg-slate-800 text-slate-200 px-3 py-1.5 rounded-lg border border-slate-700/80 hover:border-cyan-400 hover:text-cyan-300 transition">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Work Experience */}
        {sectionVisibility.experience && experience.length > 0 && (
          <section className="space-y-8">
            <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-teal-400" />
              Experience & Achievements
            </h2>
            <div className="space-y-6">
              {experience.map((exp) => (
                <div key={exp.id} className="bg-slate-900/50 border border-slate-800/80 rounded-2xl p-6 space-y-3">
                  <div className="flex flex-col sm:flex-row justify-between sm:items-baseline">
                    <h3 className="text-lg font-bold text-white">{exp.role} <span className="text-teal-400">@ {exp.company}</span></h3>
                    <span className="text-xs font-mono text-slate-400">{exp.startDate} — {exp.current ? 'Present' : exp.endDate}</span>
                  </div>
                  <p className="text-sm text-slate-400 leading-relaxed">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      <footer className="max-w-6xl mx-auto px-6 py-12 text-center text-xs text-slate-500 border-t border-slate-900">
        © {new Date().getFullYear()} {personal.name} — Portify AI 3D Theme
      </footer>
    </div>
  );
}
