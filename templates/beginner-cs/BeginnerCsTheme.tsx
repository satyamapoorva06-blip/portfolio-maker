'use client';

import React from 'react';
import { PortfolioData } from '@/types/portfolio';
import { BookOpen, GraduationCap, Code2, Cpu, Award, Github, Linkedin, ExternalLink } from 'lucide-react';

export default function BeginnerCsTheme({ data }: { data: PortfolioData }) {
  const p = data.personal;
  const a = data.about;

  return (
    <div className="min-h-screen bg-[#070e1b] text-slate-200 font-sans selection:bg-blue-500 selection:text-white">
      {/* Header */}
      <header className="border-b border-blue-900/40 bg-[#0a1529]/90 backdrop-blur sticky top-0 z-50 px-6 py-4">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2 font-mono text-sm text-blue-400">
            <GraduationCap className="w-5 h-5 text-blue-400" />
            <span className="font-bold text-white">{p.name || 'CS Student'}</span>
          </div>
          <span className="px-3 py-1 bg-blue-950 text-blue-300 border border-blue-800 rounded-full text-xs font-mono font-bold">
            CS SCHOLAR
          </span>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-12 space-y-12">
        {/* Scholar Banner */}
        <section className="p-8 bg-[#0c1a30] border border-blue-500/30 rounded-3xl space-y-6 shadow-2xl">
          <div className="flex flex-wrap justify-between items-start gap-4">
            <div className="space-y-2">
              <span className="text-xs font-mono text-blue-400 uppercase tracking-widest font-semibold flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-blue-400" /> COMPUTER SCIENCE & ENGINEERING SCHOLAR
              </span>
              <h1 className="text-4xl sm:text-5xl font-black text-white">{p.name}</h1>
              <p className="text-sm font-mono text-blue-300">{p.title || 'CS Student & Developer'}</p>
            </div>
            <div className="flex gap-3">
              {p.socials?.github && (
                <a href={p.socials.github} target="_blank" rel="noopener noreferrer" className="p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-300 hover:text-blue-400 transition">
                  <Github className="w-5 h-5" />
                </a>
              )}
              {p.socials?.linkedin && (
                <a href={p.socials.linkedin} target="_blank" rel="noopener noreferrer" className="p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-300 hover:text-blue-400 transition">
                  <Linkedin className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>

          <p className="text-slate-300 text-sm leading-relaxed max-w-3xl font-light">{a.summary}</p>
        </section>

        {/* Education & Academic Credentials */}
        {data.education && data.education.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-xl font-extrabold text-white flex items-center gap-2 border-b border-blue-900/50 pb-3">
              <GraduationCap className="w-5 h-5 text-blue-400" /> Academic Degree & Institution
            </h2>
            <div className="grid grid-cols-1 gap-4">
              {data.education.map((edu) => (
                <div key={edu.id} className="p-6 bg-[#0c1a30] border border-blue-900/50 rounded-2xl flex flex-wrap justify-between items-center gap-4">
                  <div>
                    <h3 className="font-bold text-white text-base">{edu.degree}</h3>
                    <p className="text-xs text-blue-300 font-mono">{edu.institution} • {edu.field}</p>
                  </div>
                  {edu.gpa && (
                    <span className="px-3 py-1 bg-blue-950 text-blue-300 border border-blue-800 rounded-lg text-xs font-mono font-bold">
                      {edu.gpa}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Programming Fundamentals & Skills */}
        {data.skills && data.skills.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-xl font-extrabold text-white flex items-center gap-2 border-b border-blue-900/50 pb-3">
              <Code2 className="w-5 h-5 text-blue-400" /> Programming Fundamentals & Technical Stack
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {data.skills.map((grp) => (
                <div key={grp.id} className="p-6 bg-[#0c1a30] border border-blue-900/50 rounded-2xl space-y-3">
                  <h3 className="text-xs font-bold text-blue-300 font-mono uppercase">{grp.category}</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {grp.skills.map((sk, idx) => (
                      <span key={idx} className="px-2.5 py-1 bg-blue-950 text-blue-200 text-xs font-mono rounded-lg border border-blue-800">
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Academic Projects */}
        {data.projects && data.projects.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-xl font-extrabold text-white flex items-center gap-2 border-b border-blue-900/50 pb-3">
              <Cpu className="w-5 h-5 text-blue-400" /> Coursework & Engineering Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data.projects.map((proj) => (
                <div key={proj.id} className="p-6 bg-[#0c1a30] border border-blue-900/50 rounded-2xl space-y-3">
                  <h3 className="font-bold text-white text-base">{proj.name}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">{proj.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      <footer className="border-t border-blue-900/50 py-8 text-center text-xs text-slate-500 font-mono">
        © {new Date().getFullYear()} {p.name}. Beginner CS Scholar Portfolio.
      </footer>
    </div>
  );
}
