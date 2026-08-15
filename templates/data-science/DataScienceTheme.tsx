'use client';

import React from 'react';
import { PortfolioData } from '@/types/portfolio';
import { Database, LineChart, Cpu, Terminal, GitBranch, Mail, MapPin, ExternalLink, Github, Linkedin, Award, BookOpen, Layers } from 'lucide-react';

export default function DataScienceTheme({ data }: { data: PortfolioData }) {
  const p = data.personal;
  const a = data.about;
  const username = data.slug || 'developer';

  return (
    <div className="min-h-screen bg-[#070c14] text-slate-200 font-sans selection:bg-teal-500 selection:text-black">
      {/* Header Bar */}
      <header className="border-b border-teal-900/40 bg-[#0a111f]/90 backdrop-blur sticky top-0 z-50 px-6 py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2 font-mono text-sm text-teal-400">
            <LineChart className="w-4 h-4 text-teal-400" />
            <span className="font-bold text-white tracking-wider">{p.name || 'Data Scientist'}</span>
            <span className="text-xs text-slate-500">/ ds-analytics.ipynb</span>
          </div>
          <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
            <span className="px-2.5 py-1 rounded bg-teal-950/80 border border-teal-800 text-teal-300 font-semibold">
              R² ACCURACY: 98.4%
            </span>
            <a href={`tel:${p.phone || ''}`} className="hover:text-teal-400 transition hidden sm:inline">{p.phone}</a>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12 space-y-16">
        {/* Jupyter Notebook Notebook Cell Header */}
        <section className="bg-[#0b1628] border border-teal-500/20 rounded-2xl p-8 space-y-6 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="flex flex-wrap justify-between items-start gap-4 border-b border-teal-900/40 pb-6">
            <div className="space-y-2">
              <span className="text-xs font-mono text-teal-400 uppercase tracking-widest font-semibold flex items-center gap-1.5">
                <Database className="w-4 h-4 text-teal-400" /> DATA SCIENCE & ANALYTICS ARCHITECT
              </span>
              <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">{p.name}</h1>
              <p className="text-base text-teal-300 font-mono">{p.title || 'Data Science & Machine Learning Specialist'}</p>
            </div>
            <div className="flex gap-3">
              {p.socials?.github && (
                <a href={p.socials.github} target="_blank" rel="noopener noreferrer" className="p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-300 hover:text-teal-400 hover:border-teal-500 transition">
                  <Github className="w-5 h-5" />
                </a>
              )}
              {p.socials?.linkedin && (
                <a href={p.socials.linkedin} target="_blank" rel="noopener noreferrer" className="p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-300 hover:text-teal-400 hover:border-teal-500 transition">
                  <Linkedin className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>

          <p className="text-slate-300 leading-relaxed text-sm max-w-3xl font-light">{a.summary}</p>

          {/* Model Performance Gauges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
            {[
              { label: 'Feature Pipeline', val: 'Scikit-Learn & Pandas' },
              { label: 'Deep Learning', val: 'PyTorch / TensorFlow' },
              { label: 'Query Engine', val: 'SQL & BigQuery' },
              { label: 'Model Deployment', val: 'FastAPI & Docker' },
            ].map((m, idx) => (
              <div key={idx} className="p-3 bg-[#070d17] border border-teal-900/50 rounded-xl space-y-1">
                <p className="text-[10px] font-mono text-slate-400 uppercase">{m.label}</p>
                <p className="text-xs font-bold text-teal-300 font-mono truncate">{m.val}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Skills & Data Tools */}
        {data.skills && data.skills.length > 0 && (
          <section className="space-y-6">
            <h2 className="text-xl font-extrabold text-white flex items-center gap-2 border-b border-teal-900/40 pb-3">
              <Cpu className="w-5 h-5 text-teal-400" /> Data Science Stack & Analytical Tools
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {data.skills.map((grp) => (
                <div key={grp.id} className="p-6 bg-[#0b1628] border border-teal-900/40 rounded-2xl space-y-4">
                  <h3 className="text-sm font-bold text-teal-300 font-mono">{grp.category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {grp.skills.map((sk, idx) => (
                      <span key={idx} className="px-3 py-1 bg-teal-950/60 border border-teal-800/60 text-slate-200 text-xs font-mono rounded-lg">
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects / Experiments */}
        {data.projects && data.projects.length > 0 && (
          <section className="space-y-6">
            <h2 className="text-xl font-extrabold text-white flex items-center gap-2 border-b border-teal-900/40 pb-3">
              <Layers className="w-5 h-5 text-teal-400" /> Analytical Projects & Models
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data.projects.map((proj) => (
                <div key={proj.id} className="p-6 bg-[#0b1628] border border-teal-900/40 rounded-2xl space-y-4 hover:border-teal-500/50 transition group">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-white text-lg group-hover:text-teal-400 transition">{proj.name}</h3>
                    <span className="text-[10px] font-mono bg-teal-950 text-teal-300 border border-teal-800 px-2 py-0.5 rounded font-bold">
                      MODEL
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">{proj.description}</p>
                  {proj.technologies && proj.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {proj.technologies.map((t, idx) => (
                        <span key={idx} className="text-[10px] bg-slate-900 text-teal-400 px-2.5 py-1 rounded font-mono border border-slate-800">
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

        {/* Academic & Experience */}
        {data.education && data.education.length > 0 && (
          <section className="space-y-6">
            <h2 className="text-xl font-extrabold text-white flex items-center gap-2 border-b border-teal-900/40 pb-3">
              <BookOpen className="w-5 h-5 text-teal-400" /> Education & Credentials
            </h2>
            <div className="grid grid-cols-1 gap-4">
              {data.education.map((edu) => (
                <div key={edu.id} className="p-6 bg-[#0b1628] border border-teal-900/40 rounded-2xl flex flex-wrap justify-between items-center gap-4">
                  <div>
                    <h3 className="font-bold text-white text-base">{edu.degree}</h3>
                    <p className="text-xs text-teal-400 font-mono">{edu.institution} • {edu.field}</p>
                  </div>
                  {edu.gpa && (
                    <span className="px-3 py-1 bg-teal-950 text-teal-300 border border-teal-800 rounded-lg text-xs font-mono font-bold">
                      {edu.gpa}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      <footer className="border-t border-teal-900/40 py-8 text-center text-xs font-mono text-slate-500">
        © {new Date().getFullYear()} {p.name}. Data Science Portfolio built with Portify AI.
      </footer>
    </div>
  );
}
