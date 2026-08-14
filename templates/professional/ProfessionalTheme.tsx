'use client';

import React from 'react';
import { PortfolioData } from '@/types/portfolio';
import { Mail, Phone, MapPin, Linkedin, Github, Briefcase, GraduationCap, Code, CheckCircle2, ArrowUpRight } from 'lucide-react';

export default function ProfessionalTheme({ data }: { data: PortfolioData }) {
  const { personal, about, skills, experience, projects, education, sectionVisibility } = data;

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 font-sans py-12 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden">
        {/* Top Corporate Banner Header */}
        <div className="bg-slate-950 text-white p-8 sm:p-12 space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400 bg-cyan-950 px-3 py-1 rounded-full border border-cyan-800">
                Professional Portfolio
              </span>
              <h1 className="text-4xl sm:text-5xl font-black tracking-tight">{personal.name}</h1>
              <p className="text-xl text-cyan-400 font-bold">{personal.title}</p>
              {personal.location && (
                <p className="text-xs text-slate-400 flex items-center gap-1.5 font-mono">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400" /> {personal.location}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2.5 text-xs text-slate-300">
              <a href={`mailto:${personal.email}`} className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold rounded-xl shadow-md flex items-center gap-2 transition">
                <Mail className="w-4 h-4" /> {personal.email}
              </a>
              {personal.socials.github && (
                <a href={personal.socials.github} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-cyan-300 rounded-xl border border-slate-800 flex items-center gap-2 transition">
                  <Github className="w-4 h-4" /> GitHub Profile
                </a>
              )}
              {personal.socials.linkedin && (
                <a href={personal.socials.linkedin} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-cyan-300 rounded-xl border border-slate-800 flex items-center gap-2 transition">
                  <Linkedin className="w-4 h-4" /> LinkedIn Profile
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-8 sm:p-12 space-y-12">
          {/* Executive Summary */}
          {about.summary && (
            <section className="space-y-4">
              <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-200 pb-2">Executive Summary</h2>
              <p className="text-base text-slate-700 leading-relaxed font-light">{about.summary}</p>
              {about.highlights && about.highlights.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {about.highlights.map((h, idx) => (
                    <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              )}
            </section>
          )}

          {/* Key Deliverables / Projects */}
          {sectionVisibility.projects && projects.length > 0 && (
            <section className="space-y-6">
              <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <Code className="w-4 h-4 text-slate-800" /> Key Projects & Technical Deliverables
                </h2>
                <span className="text-xs font-mono font-bold text-slate-500">{projects.length} PROJECTS</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects.map((proj) => (
                  <div key={proj.id} className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-4 flex flex-col justify-between hover:border-slate-400 transition">
                    <div className="space-y-2">
                      <div className="flex justify-between items-start">
                        <h3 className="font-bold text-slate-900 text-lg leading-snug">{proj.name}</h3>
                        {proj.githubUrl && (
                          <a href={proj.githubUrl} target="_blank" rel="noopener noreferrer" className="p-2 bg-white rounded-lg border border-slate-200 text-slate-700 hover:text-cyan-600 transition">
                            <ArrowUpRight className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">{proj.description}</p>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-200">
                      {proj.technologies.map((tech, idx) => (
                        <span key={idx} className="text-[11px] font-mono bg-white text-slate-700 px-2.5 py-0.5 rounded border border-slate-200">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Professional Experience */}
          {sectionVisibility.experience && experience.length > 0 && (
            <section className="space-y-6">
              <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-200 pb-2 flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-slate-800" /> Professional Experience
              </h2>
              <div className="space-y-6">
                {experience.map((exp) => (
                  <div key={exp.id} className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                    <div className="flex flex-col sm:flex-row justify-between sm:items-baseline">
                      <h3 className="text-base font-bold text-slate-900">{exp.role} <span className="text-cyan-600">@ {exp.company}</span></h3>
                      <span className="text-xs font-mono text-slate-500">{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">{exp.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Core Competencies / Skills */}
          {sectionVisibility.skills && skills.length > 0 && (
            <section className="space-y-6">
              <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-200 pb-2">Technical Skills & Competencies</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {skills.map((cat) => (
                  <div key={cat.id} className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                    <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">{cat.category}</h3>
                    <div className="flex flex-wrap gap-1.5">
                      {cat.skills.map((s, idx) => (
                        <span key={idx} className="text-xs bg-white text-slate-800 font-mono px-2.5 py-1 rounded border border-slate-200">
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
            <section className="space-y-6">
              <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-200 pb-2 flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-slate-800" /> Education & Qualifications
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {education.map((edu) => (
                  <div key={edu.id} className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                    <h3 className="font-bold text-slate-900 text-base">{edu.institution}</h3>
                    <p className="text-xs text-cyan-600 font-semibold">{edu.degree} — {edu.field}</p>
                    <p className="text-xs text-slate-500 font-mono">{edu.startDate} – {edu.endDate} {edu.gpa ? `• ${edu.gpa}` : ''}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-8 py-6 border-t border-slate-200 text-center text-xs text-slate-500 font-mono">
          © {new Date().getFullYear()} {personal.name}. Powered by Portify AI.
        </div>
      </div>
    </div>
  );
}
