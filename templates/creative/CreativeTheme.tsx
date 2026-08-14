'use client';

import React from 'react';
import { PortfolioData } from '@/types/portfolio';
import { Sparkles, ArrowUpRight, Github, Linkedin, Mail, Star, Heart, CheckCircle2, GraduationCap, Code, Flame } from 'lucide-react';

export default function CreativeTheme({ data }: { data: PortfolioData }) {
  const { personal, about, skills, experience, projects, education, sectionVisibility } = data;

  return (
    <div className="min-h-screen bg-[#faf8f5] text-slate-900 font-sans selection:bg-purple-300 selection:text-slate-950">
      {/* Navigation Header */}
      <nav className="max-w-6xl mx-auto px-6 py-6 flex justify-between items-center border-b-2 border-slate-950 bg-[#faf8f5]/90 sticky top-0 backdrop-blur-md z-30">
        <span className="font-black text-2xl tracking-tighter text-slate-950 flex items-center gap-2">
          <span className="w-8 h-8 rounded-xl bg-purple-600 text-white flex items-center justify-center font-mono text-sm shadow-[3px_3px_0px_0px_rgba(15,23,42,1)]">
            {personal.name.charAt(0)}
          </span>
          {personal.name}
        </span>
        <div className="flex items-center gap-4 font-bold text-xs">
          {personal.socials.github && (
            <a href={personal.socials.github} target="_blank" rel="noopener noreferrer" className="hover:text-purple-600 transition hidden sm:inline">
              GitHub
            </a>
          )}
          {personal.socials.linkedin && (
            <a href={personal.socials.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-purple-600 transition hidden sm:inline">
              LinkedIn
            </a>
          )}
          <a
            href={`mailto:${personal.email}`}
            className="px-5 py-2.5 bg-slate-950 text-white rounded-xl hover:bg-purple-700 transition shadow-[4px_4px_0px_0px_rgba(147,51,234,1)] flex items-center gap-2"
          >
            <Mail className="w-4 h-4 text-purple-300" /> Get In Touch
          </a>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-12 space-y-20">
        {/* Bold Creative Neo-Brutalist Hero */}
        <section className="p-8 sm:p-12 rounded-3xl border-3 border-slate-950 bg-gradient-to-br from-purple-100 via-yellow-50 to-pink-100 shadow-[10px_10px_0px_0px_rgba(15,23,42,1)] relative overflow-hidden space-y-8">
          <div className="space-y-6 max-w-4xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white border-2 border-slate-950 rounded-full text-xs font-black text-slate-900 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)]">
              <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
              CREATIVE DEVELOPER & PROBLEM SOLVER
            </div>

            <h1 className="text-5xl sm:text-7xl font-black tracking-tight leading-none text-slate-950 uppercase">
              HELLO, I'M <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600">
                {personal.name}
              </span>
            </h1>

            <p className="text-xl sm:text-2xl font-bold text-slate-700">{personal.title}</p>
            <p className="text-base text-slate-800 leading-relaxed max-w-2xl font-medium">{about.summary}</p>

            {/* Highlights Grid */}
            {about.highlights && about.highlights.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {about.highlights.map((h, idx) => (
                  <div key={idx} className="p-3.5 bg-white border-2 border-slate-950 rounded-xl text-xs font-bold text-slate-900 flex items-start gap-2.5 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)]">
                    <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Selected Work / Projects */}
        {sectionVisibility.projects && projects.length > 0 && (
          <section className="space-y-8">
            <div className="flex justify-between items-end border-b-4 border-slate-950 pb-4">
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-950 uppercase flex items-center gap-3">
                <Code className="w-8 h-8 text-purple-600" /> Selected Projects
              </h2>
              <span className="text-xs font-black bg-purple-200 text-purple-900 px-3 py-1.5 rounded-full border-2 border-slate-950 font-mono">
                ({projects.length} FEATURED)
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projects.map((proj, idx) => (
                <div
                  key={proj.id}
                  className={`p-8 rounded-3xl border-3 border-slate-950 space-y-6 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] transition transform hover:-translate-y-1 ${
                    idx % 2 === 0 ? 'bg-purple-50' : 'bg-yellow-50'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <h3 className="text-2xl font-black text-slate-950 leading-snug">{proj.name}</h3>
                    {proj.githubUrl && (
                      <a
                        href={proj.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 bg-white rounded-xl border-2 border-slate-950 hover:bg-slate-950 hover:text-white transition shadow-[3px_3px_0px_0px_rgba(15,23,42,1)]"
                      >
                        <ArrowUpRight className="w-5 h-5" />
                      </a>
                    )}
                  </div>

                  <p className="text-sm font-medium text-slate-800 leading-relaxed">{proj.description}</p>

                  {proj.features && proj.features.length > 0 && (
                    <ul className="space-y-1.5 text-xs font-semibold text-slate-700">
                      {proj.features.map((feat, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-purple-600 font-bold">✓</span>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  <div className="flex flex-wrap gap-2 pt-3 border-t-2 border-slate-950/20">
                    {proj.technologies.map((tech, i) => (
                      <span key={i} className="text-xs font-black bg-white text-slate-950 px-3 py-1 rounded-lg border-2 border-slate-950 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills & Tools */}
        {sectionVisibility.skills && skills.length > 0 && (
          <section className="space-y-8">
            <div className="border-b-4 border-slate-950 pb-4">
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-950 uppercase flex items-center gap-3">
                <Sparkles className="w-8 h-8 text-pink-600" /> Skills & Mastery
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {skills.map((cat) => (
                <div key={cat.id} className="p-6 bg-white rounded-2xl border-3 border-slate-950 space-y-4 shadow-[6px_6px_0px_0px_rgba(15,23,42,1)]">
                  <h3 className="font-black text-slate-950 text-base uppercase tracking-wide border-b-2 border-slate-200 pb-2">{cat.category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map((s, i) => (
                      <span key={i} className="text-xs font-bold bg-slate-100 text-slate-900 px-3 py-1.5 rounded-lg border-2 border-slate-950">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education & Academics */}
        {sectionVisibility.education && education.length > 0 && (
          <section className="space-y-8">
            <div className="border-b-4 border-slate-950 pb-4">
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-950 uppercase flex items-center gap-3">
                <GraduationCap className="w-8 h-8 text-amber-500" /> Education & Academics
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {education.map((edu) => (
                <div key={edu.id} className="p-6 bg-white rounded-2xl border-3 border-slate-950 space-y-3 shadow-[6px_6px_0px_0px_rgba(15,23,42,1)]">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-black text-slate-950 text-xl">{edu.institution}</h3>
                      <p className="text-sm font-bold text-purple-600">{edu.degree} — {edu.field}</p>
                    </div>
                    {edu.gpa && (
                      <span className="px-3 py-1 bg-yellow-300 text-slate-950 text-xs font-black rounded-lg border-2 border-slate-950 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">
                        {edu.gpa}
                      </span>
                    )}
                  </div>
                  <p className="text-xs font-mono font-bold text-slate-600">{edu.startDate} – {edu.current ? 'Present' : edu.endDate}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      <footer className="max-w-6xl mx-auto px-6 py-12 text-center border-t-3 border-slate-950 text-xs font-black text-slate-700">
        © {new Date().getFullYear()} {personal.name}. Powered by Portify AI.
      </footer>
    </div>
  );
}
