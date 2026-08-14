'use client';

import React from 'react';
import { PortfolioData } from '@/types/portfolio';
import { GraduationCap, Award, BookOpen, ExternalLink, Github, Linkedin, Mail, Code2, Sparkles } from 'lucide-react';

export default function CsStudentTheme({ data }: { data: PortfolioData }) {
  const { personal, about, projects, skills, education, achievements } = data;

  return (
    <div className="min-h-screen bg-[#070b12] text-slate-100 font-sans p-6 sm:p-12 relative overflow-x-hidden">
      <div className="max-w-5xl mx-auto space-y-16 relative z-10">
        {/* CS Academic Banner */}
        <header className="p-8 bg-[#0e1626] border border-blue-500/30 rounded-3xl space-y-6 shadow-2xl">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800 pb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 text-white flex items-center justify-center shadow-lg shadow-blue-500/20 text-xl">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl font-extrabold text-white">{personal.name}</h1>
                <span className="text-xs font-mono text-blue-400 font-semibold">{personal.title}</span>
              </div>
            </div>

            <span className="px-3 py-1 bg-blue-950 text-blue-300 border border-blue-800 text-xs font-mono rounded-full flex items-center gap-1.5">
              CS & Engineering Student
            </span>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed font-light">{about.summary}</p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            {personal.email && (
              <a
                href={`mailto:${personal.email}`}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-lg flex items-center gap-1.5 transition"
              >
                <Mail className="w-4 h-4" /> Contact Student
              </a>
            )}
            {personal.socials.github && (
              <a
                href={personal.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-medium rounded-xl border border-slate-700 flex items-center gap-1.5 transition"
              >
                <Github className="w-4 h-4 text-blue-400" /> GitHub Profile
              </a>
            )}
          </div>
        </header>

        {/* Education & Academic Credentials */}
        {education && education.length > 0 && (
          <section className="space-y-6">
            <h2 className="text-xl font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-blue-400" /> Education & Academic Background
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {education.map((edu) => (
                <div key={edu.id} className="p-6 bg-[#0e1626] border border-slate-800 rounded-3xl space-y-2">
                  <span className="text-[11px] text-blue-400 font-mono">{edu.startDate} — {edu.endDate}</span>
                  <h3 className="font-extrabold text-white text-base">{edu.degree} in {edu.field}</h3>
                  <p className="text-xs text-slate-300 font-medium">{edu.institution}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {projects && projects.length > 0 && (
          <section className="space-y-6">
            <h2 className="text-xl font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Code2 className="w-5 h-5 text-indigo-400" /> Coursework & Academic Projects
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((proj) => (
                <div
                  key={proj.id}
                  className="p-6 bg-[#0e1626] border border-slate-800 hover:border-blue-500/50 rounded-3xl space-y-4 transition duration-300 group hover:shadow-xl hover:shadow-blue-500/10"
                >
                  <div className="flex justify-between items-start">
                    <h3 className="font-extrabold text-white text-base group-hover:text-blue-400 transition">{proj.name}</h3>
                    {proj.liveUrl && (
                      <a
                        href={proj.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-blue-400 hover:text-white rounded-xl transition"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed font-light">{proj.description}</p>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {proj.technologies.map((t, i) => (
                      <span key={i} className="text-[10px] bg-blue-950/80 text-blue-300 px-2.5 py-0.5 rounded-lg border border-blue-800 font-mono">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {skills && skills.length > 0 && (
          <section className="space-y-6">
            <h2 className="text-xl font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-400" /> Core CS Subjects & Skills
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {skills.map((cat) => (
                <div key={cat.id} className="p-6 bg-[#0e1626] border border-slate-800 rounded-3xl space-y-3">
                  <h3 className="text-xs font-bold text-blue-400 font-mono uppercase">{cat.category}</h3>
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

        <footer className="pt-8 border-t border-slate-800 text-center text-xs text-slate-500 font-mono">
          © {new Date().getFullYear()} {personal.name}. Powered by Portify AI CS Student Engine.
        </footer>
      </div>
    </div>
  );
}
