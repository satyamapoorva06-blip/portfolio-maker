'use client';

import React from 'react';
import { PortfolioData } from '@/types/portfolio';
import { BookOpen, GraduationCap, Award, Github, Linkedin } from 'lucide-react';

export default function AcademicScholarTheme({ data }: { data: PortfolioData }) {
  const p = data.personal;
  const a = data.about;

  return (
    <div className="min-h-screen bg-[#060b14] text-slate-100 font-sans selection:bg-indigo-500 selection:text-white">
      <header className="border-b border-indigo-900/50 bg-[#091120]/90 backdrop-blur sticky top-0 z-50 px-6 py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2 font-mono text-sm text-indigo-400">
            <GraduationCap className="w-5 h-5 text-indigo-400" />
            <span className="font-bold text-white tracking-wider">{p.name || 'AI Scholar'}</span>
          </div>
          <span className="px-3 py-1 bg-indigo-950 text-indigo-300 border border-indigo-800 rounded-full text-xs font-mono font-bold">
            ACADEMIC AI SCHOLAR
          </span>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12 space-y-12">
        <section className="p-8 bg-[#0b162a] border border-indigo-500/30 rounded-3xl space-y-6 shadow-2xl">
          <div className="flex flex-wrap justify-between items-start gap-4 border-b border-indigo-900/50 pb-6">
            <div className="space-y-2">
              <span className="text-xs font-mono text-indigo-400 font-bold uppercase tracking-widest flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-indigo-400" /> ACADEMIC AI SCHOLAR & RESEARCHER
              </span>
              <h1 className="text-4xl sm:text-5xl font-black text-white">{p.name}</h1>
              <p className="text-base text-indigo-300 font-mono">{p.title || 'Academic AI Scholar'}</p>
            </div>
            <div className="flex gap-3">
              {p.socials?.github && (
                <a href={p.socials.github} target="_blank" rel="noopener noreferrer" className="p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-300 hover:text-indigo-400 transition">
                  <Github className="w-5 h-5" />
                </a>
              )}
              {p.socials?.linkedin && (
                <a href={p.socials.linkedin} target="_blank" rel="noopener noreferrer" className="p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-300 hover:text-indigo-400 transition">
                  <Linkedin className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>

          <p className="text-slate-300 text-sm leading-relaxed max-w-3xl font-light">{a.summary}</p>
        </section>

        {data.education && data.education.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-xl font-extrabold text-white flex items-center gap-2 border-b border-indigo-950 pb-3">
              <GraduationCap className="w-5 h-5 text-indigo-400" /> Academic Degree & University
            </h2>
            <div className="grid grid-cols-1 gap-4">
              {data.education.map((edu) => (
                <div key={edu.id} className="p-6 bg-[#0b162a] border border-indigo-900/50 rounded-2xl flex flex-wrap justify-between items-center gap-4">
                  <div>
                    <h3 className="font-bold text-white text-base">{edu.degree}</h3>
                    <p className="text-xs text-indigo-300 font-mono">{edu.institution} • {edu.field}</p>
                  </div>
                  {edu.gpa && (
                    <span className="px-3 py-1 bg-indigo-950 text-indigo-300 border border-indigo-800 rounded-lg text-xs font-mono font-bold">
                      {edu.gpa}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      <footer className="border-t border-indigo-950 py-8 text-center text-xs text-slate-500 font-mono">
        © {new Date().getFullYear()} {p.name}. Academic AI Scholar Portfolio.
      </footer>
    </div>
  );
}
