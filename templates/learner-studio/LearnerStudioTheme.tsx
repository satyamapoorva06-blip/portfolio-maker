'use client';

import React from 'react';
import { PortfolioData } from '@/types/portfolio';
import { BookOpen, GraduationCap, Github, Linkedin } from 'lucide-react';

export default function LearnerStudioTheme({ data }: { data: PortfolioData }) {
  const p = data.personal;
  const a = data.about;

  return (
    <div className="min-h-screen bg-[#07070a] text-zinc-200 font-sans selection:bg-zinc-700 selection:text-white">
      <main className="max-w-4xl mx-auto px-6 py-16 space-y-12">
        <section className="space-y-4 border-b border-zinc-800 pb-8">
          <span className="px-3 py-1 bg-zinc-900 text-zinc-300 border border-zinc-800 rounded-full text-xs font-mono font-bold">
            STUDENT LEARNER STUDIO
          </span>
          <h1 className="text-4xl font-extrabold text-white">{p.name}</h1>
          <p className="text-sm font-mono text-zinc-400">{p.title || 'Student Learner Developer'}</p>
          <p className="text-xs text-zinc-400 leading-relaxed font-light">{a.summary}</p>
        </section>

        {data.skills && data.skills.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-xs font-mono text-zinc-500 uppercase font-bold tracking-widest">LEARNING STACK</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {data.skills.map((grp) => (
                <div key={grp.id} className="p-4 bg-zinc-900/50 border border-zinc-800 rounded-xl space-y-2">
                  <h3 className="text-xs font-bold text-zinc-300">{grp.category}</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {grp.skills.map((sk, idx) => (
                      <span key={idx} className="text-xs bg-zinc-950 text-zinc-300 px-2 py-0.5 rounded border border-zinc-800 font-mono">
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      <footer className="border-t border-zinc-800 py-8 text-center text-xs text-zinc-600 font-mono">
        © {new Date().getFullYear()} {p.name}. Student Learner Studio.
      </footer>
    </div>
  );
}
