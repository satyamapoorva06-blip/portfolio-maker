'use client';

import React from 'react';
import { PortfolioData } from '@/types/portfolio';
import { Mail, Github, Linkedin, MapPin, ArrowUpRight, CheckCircle2, GraduationCap, Briefcase, Code, Sparkles } from 'lucide-react';

export default function MinimalTheme({ data }: { data: PortfolioData }) {
  const { personal, about, skills, experience, projects, education, sectionVisibility } = data;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-slate-800 selection:text-white">
      {/* Header Navigation */}
      <header className="max-w-5xl mx-auto px-6 py-8 flex justify-between items-center border-b border-slate-800/80 sticky top-0 bg-slate-950/90 backdrop-blur-md z-30">
        <span className="font-bold text-xl tracking-tight text-white flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-cyan-400"></span>
          {personal.name}
        </span>
        <div className="flex items-center gap-4 text-xs font-semibold text-slate-400">
          {personal.socials.github && (
            <a href={personal.socials.github} target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition">
              GitHub
            </a>
          )}
          {personal.socials.linkedin && (
            <a href={personal.socials.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition">
              LinkedIn
            </a>
          )}
          <a
            href={`mailto:${personal.email}`}
            className="px-4 py-2 bg-slate-100 text-slate-950 font-bold rounded-full hover:bg-cyan-400 transition"
          >
            Get In Touch
          </a>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-16 space-y-24">
        {/* Apple-Style Minimal Hero */}
        <section className="space-y-8 py-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-slate-900 border border-slate-800 rounded-full text-xs font-mono text-cyan-400">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
            AVAILABLE FOR NEW ROLES & PROJECTS
          </div>

          <div className="space-y-4">
            <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight text-white leading-tight">
              {personal.name}
            </h1>
            <p className="text-2xl sm:text-3xl font-medium text-slate-400">{personal.title}</p>
          </div>

          {personal.location && (
            <p className="text-xs text-slate-500 flex items-center gap-1.5 font-mono">
              <MapPin className="w-4 h-4 text-cyan-400" /> {personal.location}
            </p>
          )}

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl font-light">{about.summary}</p>

          {/* Highlights */}
          {about.highlights && about.highlights.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 max-w-3xl">
              {about.highlights.map((h, i) => (
                <div key={i} className="p-3.5 bg-slate-900/80 border border-slate-800 rounded-2xl text-xs text-slate-200 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>{h}</span>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Featured Projects Grid */}
        {sectionVisibility.projects && projects.length > 0 && (
          <section className="space-y-8 border-t border-slate-800/80 pt-12">
            <div className="flex justify-between items-end">
              <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                <Code className="w-6 h-6 text-cyan-400" /> Featured Projects
              </h2>
              <span className="text-xs font-mono text-slate-500">{projects.length} PROJECTS</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {projects.map((proj) => (
                <div
                  key={proj.id}
                  className="p-8 bg-slate-900/60 border border-slate-800 rounded-3xl space-y-6 flex flex-col justify-between hover:border-cyan-500/50 hover:bg-slate-900 transition duration-300"
                >
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold text-white text-xl">{proj.name}</h3>
                      {proj.githubUrl && (
                        <a
                          href={proj.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-slate-800 hover:bg-cyan-500 hover:text-slate-950 rounded-xl text-slate-300 transition"
                        >
                          <ArrowUpRight className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed font-light">{proj.description}</p>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {proj.technologies.map((tech, idx) => (
                      <span key={idx} className="text-[11px] font-mono bg-slate-950 text-cyan-300 px-3 py-1 rounded-lg border border-slate-800">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills Section */}
        {sectionVisibility.skills && skills.length > 0 && (
          <section className="space-y-8 border-t border-slate-800/80 pt-12">
            <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-cyan-400" /> Skills & Technical Matrix
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {skills.map((cat) => (
                <div key={cat.id} className="p-6 bg-slate-900/60 border border-slate-800 rounded-3xl space-y-4">
                  <h3 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">{cat.category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map((skill, idx) => (
                      <span key={idx} className="text-xs bg-slate-950 text-slate-200 font-mono px-3 py-1.5 rounded-xl border border-slate-800">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Experience Section */}
        {sectionVisibility.experience && experience.length > 0 && (
          <section className="space-y-8 border-t border-slate-800/80 pt-12">
            <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              <Briefcase className="w-6 h-6 text-cyan-400" /> Career & Experience
            </h2>
            <div className="space-y-6">
              {experience.map((exp) => (
                <div key={exp.id} className="p-6 bg-slate-900/60 border border-slate-800 rounded-3xl space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                    <h3 className="text-lg font-bold text-white">
                      {exp.role} <span className="text-cyan-400">@ {exp.company}</span>
                    </h3>
                    <span className="text-xs font-mono text-slate-500">{exp.startDate} — {exp.current ? 'Present' : exp.endDate}</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {sectionVisibility.education && education.length > 0 && (
          <section className="space-y-6 border-t border-slate-800/80 pt-12">
            <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              <GraduationCap className="w-6 h-6 text-cyan-400" /> Education
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {education.map((edu) => (
                <div key={edu.id} className="p-6 bg-slate-900/60 border border-slate-800 rounded-3xl space-y-2">
                  <h3 className="text-base font-bold text-white">{edu.institution}</h3>
                  <p className="text-xs text-cyan-400 font-semibold">{edu.degree} in {edu.field}</p>
                  <p className="text-xs text-slate-500 font-mono">{edu.startDate} — {edu.endDate} {edu.gpa ? `• ${edu.gpa}` : ''}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="max-w-5xl mx-auto px-6 py-12 border-t border-slate-800/80 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} {personal.name}. Powered by Portify AI.
      </footer>
    </div>
  );
}
