'use client';

import React from 'react';
import { PortfolioData } from '@/types/portfolio';
import { BookOpen, GraduationCap, Github, Linkedin } from 'lucide-react';

export default function SimpleStudentTheme({ data }: { data: PortfolioData }) {
  const p = data.personal;
  const a = data.about;

  return (
    <div className="min-h-screen bg-[#070a10] text-slate-200 font-sans selection:bg-slate-700 selection:text-white">
      <main className="max-w-4xl mx-auto px-6 py-16 space-y-12">
        <section className="space-y-4 border-b border-slate-800 pb-8">
          <span className="px-3 py-1 bg-slate-900 text-slate-300 border border-slate-700 rounded-full text-xs font-mono font-bold">
            CS STUDENT SHOWCASE
          </span>
          <h1 className="text-4xl font-extrabold text-white">{p.name}</h1>
          <p className="text-sm font-mono text-slate-400">{p.title || 'Minimalist CS Student'}</p>
          <p className="text-xs text-slate-400 leading-relaxed font-light">{a.summary}</p>
          <div className="flex gap-4 text-xs font-mono pt-2">
            {p.socials?.github && <a href={p.socials.github} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white underline">github</a>}
            {p.socials?.linkedin && <a href={p.socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white underline">linkedin</a>}
          </div>
        </section>

        {data.education && data.education.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-xs font-mono text-slate-500 uppercase font-bold tracking-widest">EDUCATION</h2>
            <div className="grid grid-cols-1 gap-4">
              {data.education.map((edu) => (
                <div key={edu.id} className="p-4 bg-slate-900/50 border border-slate-800 rounded-xl flex justify-between items-center">
                  <div>
                    <h3 className="font-bold text-white text-sm">{edu.degree}</h3>
                    <p className="text-xs text-slate-400 font-mono">{edu.institution} • {edu.field}</p>
                  </div>
                  {edu.gpa && <span className="text-xs font-mono bg-slate-950 px-2 py-0.5 rounded border border-slate-800">{edu.gpa}</span>}
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      <footer className="border-t border-slate-800 py-8 text-center text-xs text-slate-600 font-mono">
        © {new Date().getFullYear()} {p.name}. Minimalist CS Student Portfolio.
      </footer>
    </div>
  );
}
