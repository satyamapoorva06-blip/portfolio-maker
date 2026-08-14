'use client';

import React from 'react';
import { PortfolioData } from '@/types/portfolio';
import { Terminal, Github, Linkedin, Mail, Code, GitBranch, Cpu, Database, Server, ExternalLink } from 'lucide-react';

export default function DeveloperTheme({ data }: { data: PortfolioData }) {
  const { personal, about, skills, experience, projects, education, customization, sectionVisibility } = data;
  const primaryColor = customization.primaryColor || '#06b6d4';

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-mono selection:bg-cyan-500 selection:text-slate-950">
      {/* IDE Terminal Bar */}
      <div className="border-b border-slate-800 bg-slate-900/80 px-4 py-2 flex items-center justify-between sticky top-0 backdrop-blur z-20">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-rose-500/80"></span>
            <span className="w-3 h-3 rounded-full bg-amber-500/80"></span>
            <span className="w-3 h-3 rounded-full bg-emerald-500/80"></span>
          </div>
          <span className="text-xs text-slate-400 pl-3 border-l border-slate-700 flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            {personal.name.toLowerCase().replace(/\s+/g, '-')}.dev.ts
          </span>
        </div>
        <div className="flex items-center gap-4 text-xs text-slate-400">
          <span className="flex items-center gap-1 text-emerald-400">
            <GitBranch className="w-3.5 h-3.5" /> main*
          </span>
          <span>UTF-8</span>
          <span>TypeScript</span>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12 space-y-16">
        {/* Terminal Hero Header */}
        <section className="bg-slate-900 border border-slate-800 rounded-lg p-6 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10 text-cyan-400">
            <Code className="w-40 h-40" />
          </div>
          <div className="space-y-4 relative z-10">
            <div className="text-xs text-slate-500 flex items-center gap-2">
              <span className="text-cyan-400">const</span> developer = <span className="text-amber-400">{'{'}</span>
            </div>

            <div className="pl-6 space-y-2 text-sm sm:text-base">
              <div>
                <span className="text-slate-400">name:</span> <span className="text-emerald-400">"{personal.name}"</span>,
              </div>
              <div>
                <span className="text-slate-400">title:</span> <span className="text-cyan-300">"{personal.title}"</span>,
              </div>
              <div>
                <span className="text-slate-400">location:</span> <span className="text-amber-300">"{personal.location}"</span>,
              </div>
              <div>
                <span className="text-slate-400">status:</span> <span className="text-emerald-400">"Open for Opportunities"</span>,
              </div>
            </div>

            <div className="text-xs text-slate-500">
              <span className="text-amber-400">{'}'}</span>;
            </div>

            <p className="text-sm text-slate-300 leading-relaxed font-sans pt-2 border-t border-slate-800/80">
              {about.summary}
            </p>

            {/* Quick Links */}
            <div className="flex flex-wrap gap-4 pt-2 text-xs">
              {personal.socials.github && (
                <a href={personal.socials.github} target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-cyan-400 rounded border border-slate-700 flex items-center gap-2 transition">
                  <Github className="w-4 h-4" /> github.com
                </a>
              )}
              {personal.socials.linkedin && (
                <a href={personal.socials.linkedin} target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-cyan-400 rounded border border-slate-700 flex items-center gap-2 transition">
                  <Linkedin className="w-4 h-4" /> linkedin.com
                </a>
              )}
              <a href={`mailto:${personal.email}`} className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded border border-slate-700 flex items-center gap-2 transition">
                <Mail className="w-4 h-4 text-emerald-400" /> {personal.email}
              </a>
            </div>
          </div>
        </section>

        {/* Technical Stack / Skills */}
        {sectionVisibility.skills && skills.length > 0 && (
          <section className="space-y-6">
            <h2 className="text-sm font-semibold text-cyan-400 flex items-center gap-2">
              <Cpu className="w-4 h-4" /> // TECH_STACK_MATRIX
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {skills.map((cat) => (
                <div key={cat.id} className="bg-slate-900/60 border border-slate-800 rounded p-4 space-y-3">
                  <h3 className="text-xs font-semibold text-amber-400 uppercase tracking-wider">{cat.category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map((s, idx) => (
                      <span key={idx} className="text-xs bg-slate-800 text-cyan-300 px-2 py-1 rounded border border-slate-700">
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
            <h2 className="text-sm font-semibold text-cyan-400 flex items-center gap-2">
              <Server className="w-4 h-4" /> // CAREER_TIMELINE
            </h2>
            <div className="space-y-6 border-l-2 border-slate-800 pl-4 ml-2">
              {experience.map((exp) => (
                <div key={exp.id} className="relative space-y-2">
                  <div className="absolute -left-[23px] top-1.5 w-3 h-3 rounded-full bg-cyan-500 border-2 border-slate-950"></div>
                  <div className="flex flex-col sm:flex-row justify-between sm:items-baseline">
                    <h3 className="text-base font-semibold text-slate-100">{exp.role} @ <span className="text-emerald-400">{exp.company}</span></h3>
                    <span className="text-xs text-slate-500">{exp.startDate} → {exp.current ? 'PRESENT' : exp.endDate}</span>
                  </div>
                  <p className="text-xs text-slate-400 font-sans leading-relaxed">{exp.description}</p>
                  {exp.achievements && (
                    <ul className="text-xs text-slate-300 space-y-1 font-sans list-disc list-inside">
                      {exp.achievements.map((ach, idx) => (
                        <li key={idx}>{ach}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Code Repositories / Projects */}
        {sectionVisibility.projects && projects.length > 0 && (
          <section className="space-y-6">
            <h2 className="text-sm font-semibold text-cyan-400 flex items-center gap-2">
              <Database className="w-4 h-4" /> // REPOSITORIES & PROJECTS
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {projects.map((proj) => (
                <div key={proj.id} className="bg-slate-900 border border-slate-800 rounded p-5 space-y-3 hover:border-cyan-500/50 transition">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-emerald-400 text-sm">{proj.name}</h3>
                    {proj.githubUrl && (
                      <a href={proj.githubUrl} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-cyan-400 transition">
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                  <p className="text-xs text-slate-300 font-sans leading-relaxed">{proj.description}</p>
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {proj.technologies.map((t, idx) => (
                      <span key={idx} className="text-[10px] bg-slate-950 text-slate-400 px-2 py-0.5 rounded border border-slate-800">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
