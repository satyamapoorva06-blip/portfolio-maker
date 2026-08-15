'use client';

import React from 'react';
import { PortfolioData } from '@/types/portfolio';
import { Code, ExternalLink, Github, Linkedin, Mail, Database, Layers, Sparkles, Briefcase, GraduationCap, ArrowUpRight } from 'lucide-react';

export default function MernStackTheme({ data }: { data: PortfolioData }) {
  const { personal, about, projects, skills, experience, education } = data;

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-slate-100 font-sans p-6 sm:p-12 relative overflow-x-hidden">
      {/* Neon Cyan & Emerald Glow Orbs */}
      <div className="fixed top-0 right-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[180px] pointer-events-none"></div>
      <div className="fixed bottom-0 left-1/4 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[180px] pointer-events-none"></div>

      <div className="max-w-5xl mx-auto space-y-16 relative z-10">
        {/* Header */}
        <header className="p-8 bg-[#11111a]/95 border border-cyan-500/30 rounded-3xl space-y-6 shadow-2xl backdrop-blur">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800 pb-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-500 to-emerald-400 text-black font-black flex items-center justify-center shadow-lg shadow-cyan-500/20 text-2xl border border-white/20">
                ⚛️
              </div>
              <div>
                <h1 className="text-3xl font-black text-white tracking-tight">{personal.name}</h1>
                <span className="text-xs font-mono text-cyan-400 font-bold">{personal.title || 'MERN Stack & Fullstack Engineer'}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-3.5 py-1.5 bg-cyan-950/80 text-cyan-300 border border-cyan-800 text-xs font-mono rounded-full flex items-center gap-1.5 font-bold">
                MongoDB • Express • React • Node
              </span>
            </div>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed font-light">{about.summary}</p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            {personal.email && (
              <a
                href={`mailto:${personal.email}`}
                className="px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-black font-extrabold text-xs rounded-xl shadow-lg shadow-cyan-500/20 flex items-center gap-2 transition transform hover:-translate-y-0.5"
              >
                <Mail className="w-4 h-4" /> Contact Developer
              </a>
            )}
            {personal.socials?.github && (
              <a
                href={personal.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-medium rounded-xl border border-slate-700 flex items-center gap-1.5 transition"
              >
                <Github className="w-4 h-4 text-cyan-400" /> GitHub Repos <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
              </a>
            )}
            {personal.socials?.linkedin && (
              <a
                href={personal.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-medium rounded-xl border border-slate-700 flex items-center gap-1.5 transition"
              >
                <Linkedin className="w-4 h-4 text-emerald-400" /> LinkedIn Profile <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
              </a>
            )}
          </div>
        </header>

        {/* Projects */}
        {projects && projects.length > 0 && (
          <section className="space-y-6">
            <h2 className="text-xl font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Code className="w-5 h-5 text-cyan-400" /> Full Stack Applications
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((proj) => (
                <div
                  key={proj.id}
                  className="p-6 bg-[#11111a] border border-slate-800 hover:border-cyan-500/80 rounded-3xl space-y-4 transition duration-300 group hover:shadow-xl hover:shadow-cyan-500/10 transform hover:-translate-y-1"
                >
                  <div className="flex justify-between items-start">
                    <h3 className="font-extrabold text-white text-base group-hover:text-cyan-400 transition">{proj.name}</h3>
                    {proj.liveUrl && (
                      <a
                        href={proj.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-cyan-400 hover:text-white rounded-xl transition"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed font-light">{proj.description}</p>

                  {proj.technologies && proj.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {proj.technologies.map((t, i) => (
                        <span key={i} className="text-[10px] bg-cyan-950/80 text-cyan-300 px-2.5 py-0.5 rounded-lg border border-cyan-800 font-mono">
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

        {/* Skills */}
        {skills && skills.length > 0 && (
          <section className="space-y-6">
            <h2 className="text-xl font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Layers className="w-5 h-5 text-emerald-400" /> Tech Stack & Tools
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {skills.map((cat) => (
                <div key={cat.id} className="p-6 bg-[#11111a] border border-slate-800 rounded-3xl space-y-3">
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

        {/* Experience */}
        {experience && experience.length > 0 && (
          <section className="space-y-6">
            <h2 className="text-xl font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-cyan-400" /> Work History & Experience
            </h2>

            <div className="space-y-4">
              {experience.map((exp) => (
                <div key={exp.id} className="p-6 bg-[#11111a] border border-slate-800 rounded-3xl space-y-3">
                  <div className="flex flex-wrap justify-between items-center gap-2">
                    <div>
                      <h3 className="font-bold text-white text-base">{exp.role}</h3>
                      <p className="text-xs text-cyan-400 font-mono">{exp.company} • {exp.location || 'Remote'}</p>
                    </div>
                    <span className="text-[11px] font-mono bg-cyan-950/80 text-cyan-300 px-3 py-1 rounded-full border border-cyan-800">
                      {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  {exp.description && <p className="text-xs text-slate-300 leading-relaxed font-light">{exp.description}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {education && education.length > 0 && (
          <section className="space-y-6">
            <h2 className="text-xl font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-emerald-400" /> Education & Qualifications
            </h2>

            <div className="space-y-4">
              {education.map((edu) => (
                <div key={edu.id} className="p-6 bg-[#11111a] border border-slate-800 rounded-3xl flex flex-wrap justify-between items-center gap-4">
                  <div>
                    <h3 className="font-bold text-white text-base">{edu.degree}</h3>
                    <p className="text-xs text-cyan-400 font-mono">{edu.institution} • {edu.field}</p>
                  </div>
                  {edu.gpa && (
                    <span className="px-3 py-1 bg-cyan-950 text-cyan-300 border border-cyan-800 rounded-full text-xs font-mono font-bold">
                      {edu.gpa}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        <footer className="pt-8 border-t border-slate-800 text-center text-xs text-slate-500 font-mono">
          © {new Date().getFullYear()} {personal.name}. Powered by Portify AI MERN Engine.
        </footer>
      </div>
    </div>
  );
}
