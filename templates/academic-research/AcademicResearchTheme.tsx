'use client';

import React from 'react';
import { PortfolioData } from '@/types/portfolio';
import { BookOpen, GraduationCap, FileText, ExternalLink, Github, Linkedin, Mail, Award, Landmark } from 'lucide-react';

export default function AcademicResearchTheme({ data }: { data: PortfolioData }) {
  const { personal, about, projects, skills, education } = data;

  return (
    <div className="min-h-screen bg-[#0a0d14] text-slate-100 font-serif p-6 sm:p-16 relative overflow-x-hidden">
      <div className="max-w-5xl mx-auto space-y-16 relative z-10">
        {/* Academic Header */}
        <header className="border-b border-slate-800 pb-8 space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-indigo-400 font-bold flex items-center gap-2">
                <Landmark className="w-4 h-4" /> ACADEMIC & COMPUTER SCIENCE RESEARCH PORTFOLIO
              </span>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight font-sans">{personal.name}</h1>
              <p className="text-sm font-mono text-slate-400">{personal.title} — {personal.location}</p>
            </div>

            <div className="flex items-center gap-3 font-sans">
              {personal.email && (
                <a
                  href={`mailto:${personal.email}`}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg flex items-center gap-2 transition"
                >
                  <Mail className="w-4 h-4" /> Academic Contact
                </a>
              )}
            </div>
          </div>

          <div className="p-6 bg-[#101524] border border-indigo-900/40 rounded-2xl space-y-3 font-sans">
            <h2 className="text-xs font-mono uppercase text-indigo-400 font-bold">RESEARCH SUMMARY & ABSTRACT</h2>
            <p className="text-sm text-slate-300 leading-relaxed font-light">{about.summary}</p>
          </div>
        </header>

        {/* Education & Degrees */}
        {education && education.length > 0 && (
          <section className="space-y-6 font-sans">
            <h2 className="text-lg font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2 border-b border-slate-800 pb-2">
              <GraduationCap className="w-5 h-5 text-indigo-400" /> Education & Academic Credentials
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {education.map((edu) => (
                <div key={edu.id} className="p-6 bg-[#101524] border border-slate-800 rounded-2xl space-y-2">
                  <span className="text-[11px] font-mono text-indigo-400">{edu.startDate} — {edu.endDate}</span>
                  <h3 className="font-extrabold text-white text-base">{edu.degree} in {edu.field}</h3>
                  <p className="text-xs text-slate-300">{edu.institution}</p>
                  {edu.gpa && <span className="text-[11px] font-mono text-emerald-400 block pt-1">GPA: {edu.gpa}</span>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Publications & Research Projects */}
        {projects && projects.length > 0 && (
          <section className="space-y-6 font-sans">
            <h2 className="text-lg font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2 border-b border-slate-800 pb-2">
              <FileText className="w-5 h-5 text-indigo-400" /> Research Publications & Technical Projects
            </h2>

            <div className="space-y-6">
              {projects.map((proj, idx) => (
                <div key={proj.id} className="p-6 bg-[#101524] border border-slate-800 hover:border-indigo-500/50 rounded-2xl space-y-3 transition">
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-mono text-indigo-400 font-bold">PAPER NO. 0{idx + 1}</span>
                    {proj.liveUrl && (
                      <a href={proj.liveUrl} target="_blank" rel="noopener noreferrer" className="text-xs font-mono text-indigo-400 hover:underline flex items-center gap-1">
                        VIEW PAPER <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>

                  <h3 className="text-xl font-extrabold text-white">{proj.name}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed font-light">{proj.description}</p>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {proj.technologies.map((t, i) => (
                      <span key={i} className="text-[10px] bg-slate-900 text-indigo-300 px-2.5 py-1 rounded-lg border border-slate-800 font-mono">
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
          <section className="space-y-6 font-sans">
            <h2 className="text-lg font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2 border-b border-slate-800 pb-2">
              <BookOpen className="w-5 h-5 text-indigo-400" /> Technical Domain Knowledge
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {skills.map((cat) => (
                <div key={cat.id} className="p-6 bg-[#101524] border border-slate-800 rounded-2xl space-y-3">
                  <h3 className="text-xs font-bold text-indigo-400 font-mono uppercase">{cat.category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map((s, i) => (
                      <span key={i} className="text-xs bg-slate-900 text-slate-200 px-3 py-1 rounded-xl border border-slate-800 font-mono">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        <footer className="pt-8 border-t border-slate-800 text-center text-xs font-mono text-slate-500">
          © {new Date().getFullYear()} {personal.name}. Powered by Portify AI Academic Research Engine.
        </footer>
      </div>
    </div>
  );
}
