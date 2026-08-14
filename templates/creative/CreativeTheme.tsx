'use client';

import React from 'react';
import { PortfolioData } from '@/types/portfolio';
import { Sparkles, ArrowUpRight, Github, Linkedin, Mail, Star, Heart } from 'lucide-react';

export default function CreativeTheme({ data }: { data: PortfolioData }) {
  const { personal, about, skills, experience, projects, education, customization, sectionVisibility } = data;
  const primaryColor = customization.primaryColor || '#8b5cf6';
  const accentColor = customization.accentColor || '#f43f5e';

  return (
    <div className="min-h-screen bg-amber-50/40 text-slate-900 font-sans selection:bg-purple-200">
      {/* Navigation */}
      <nav className="max-w-6xl mx-auto px-6 py-8 flex justify-between items-center">
        <span className="font-extrabold text-2xl tracking-tight text-slate-900 flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-purple-600 animate-spin" style={{ animationDuration: '8s' }} />
          {personal.name}
        </span>
        <div className="flex gap-4 font-medium text-sm text-slate-700">
          {personal.socials.github && (
            <a href={personal.socials.github} target="_blank" rel="noopener noreferrer" className="hover:text-purple-600 transition">GitHub</a>
          )}
          {personal.socials.linkedin && (
            <a href={personal.socials.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-purple-600 transition">LinkedIn</a>
          )}
          <a href={`mailto:${personal.email}`} className="px-4 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition shadow-sm">Get in Touch</a>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-12 space-y-24">
        {/* Bold Creative Hero */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-8 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold">
              <Star className="w-3.5 h-3.5 fill-purple-600 text-purple-600" />
              Available for Select Projects & Leadership Roles
            </div>
            <h1 className="text-5xl sm:text-7xl font-black tracking-tight leading-none text-slate-950">
              HELL0, I'M <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-rose-500 to-amber-500">{personal.name.toUpperCase()}</span>
            </h1>
            <p className="text-2xl font-light text-slate-600">{personal.title}</p>
            <p className="text-lg text-slate-700 max-w-2xl leading-relaxed">{about.summary}</p>
          </div>
          {personal.avatarUrl && (
            <div className="md:col-span-4 flex justify-center">
              <div className="relative">
                <div className="w-64 h-64 rounded-3xl bg-gradient-to-tr from-purple-500 to-rose-400 rotate-3 absolute inset-0 blur-xl opacity-40"></div>
                <img src={personal.avatarUrl} alt={personal.name} className="w-64 h-64 rounded-3xl object-cover relative z-10 border-4 border-white shadow-xl -rotate-2 hover:rotate-0 transition duration-300" />
              </div>
            </div>
          )}
        </section>

        {/* Featured Projects Showcase */}
        {sectionVisibility.projects && projects.length > 0 && (
          <section className="space-y-8">
            <div className="flex justify-between items-end border-b-2 border-slate-900 pb-4">
              <h2 className="text-3xl font-black tracking-tight text-slate-900 uppercase">Selected Work</h2>
              <span className="text-sm font-bold text-purple-600 font-mono">({projects.length} PROJECTS)</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projects.map((proj, idx) => (
                <div key={proj.id} className={`p-8 rounded-3xl border-2 border-slate-900 space-y-4 shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] ${idx % 2 === 0 ? 'bg-purple-50' : 'bg-rose-50'}`}>
                  <div className="flex justify-between items-start">
                    <h3 className="text-2xl font-black text-slate-950">{proj.name}</h3>
                    {proj.githubUrl && (
                      <a href={proj.githubUrl} target="_blank" rel="noopener noreferrer" className="p-2 bg-white rounded-full border border-slate-900 hover:bg-slate-900 hover:text-white transition">
                        <ArrowUpRight className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed">{proj.description}</p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {proj.technologies.map((tech, i) => (
                      <span key={i} className="text-xs font-semibold bg-white text-slate-900 px-3 py-1 rounded-full border border-slate-900">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Creative Skills */}
        {sectionVisibility.skills && skills.length > 0 && (
          <section className="space-y-8">
            <div className="border-b-2 border-slate-900 pb-4">
              <h2 className="text-3xl font-black tracking-tight text-slate-900 uppercase">Skills & Mastery</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {skills.map((cat) => (
                <div key={cat.id} className="p-6 bg-white rounded-2xl border-2 border-slate-900 space-y-4 shadow-sm">
                  <h3 className="font-extrabold text-slate-900 text-lg">{cat.category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map((s, i) => (
                      <span key={i} className="text-xs font-bold bg-slate-100 text-slate-800 px-3 py-1.5 rounded-lg border border-slate-200">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Work Experience */}
        {sectionVisibility.experience && experience.length > 0 && (
          <section className="space-y-8">
            <div className="border-b-2 border-slate-900 pb-4">
              <h2 className="text-3xl font-black tracking-tight text-slate-900 uppercase">Experience</h2>
            </div>
            <div className="space-y-6">
              {experience.map((exp) => (
                <div key={exp.id} className="p-6 bg-white rounded-2xl border-2 border-slate-900 flex flex-col md:flex-row justify-between items-start gap-4">
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-slate-950">{exp.role}</h3>
                    <p className="text-sm font-semibold text-purple-600">{exp.company} — {exp.location}</p>
                    <p className="text-sm text-slate-700 leading-relaxed max-w-2xl">{exp.description}</p>
                  </div>
                  <span className="text-xs font-mono font-bold bg-amber-100 text-amber-900 px-3 py-1 rounded-full border border-amber-300 shrink-0">
                    {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      <footer className="max-w-6xl mx-auto px-6 py-12 text-center border-t-2 border-slate-900 text-sm font-semibold text-slate-600">
        Created with <Heart className="w-4 h-4 text-rose-500 inline mx-1 fill-rose-500" /> on Portify AI
      </footer>
    </div>
  );
}
