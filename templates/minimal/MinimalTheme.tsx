'use client';

import React from 'react';
import { PortfolioData } from '@/types/portfolio';
import { Mail, Github, Linkedin, Twitter, Globe, MapPin, ArrowUpRight, CheckCircle, Briefcase, GraduationCap, Award } from 'lucide-react';

export default function MinimalTheme({ data }: { data: PortfolioData }) {
  const { personal, about, skills, experience, projects, education, certifications, achievements, customization, sectionVisibility } = data;

  const fontClass = customization.fontFamily === 'jetbrains' ? 'font-mono' : customization.fontFamily === 'playfair' ? 'font-serif' : 'font-sans';
  const primaryColor = customization.primaryColor || '#0c8ee9';

  return (
    <div className={`min-h-screen bg-slate-50 text-slate-900 ${fontClass} selection:bg-slate-200`}>
      {/* Header Navigation */}
      <header className="max-w-4xl mx-auto px-6 py-8 flex justify-between items-center border-b border-slate-200/60">
        <span className="font-semibold text-lg tracking-tight hover:opacity-80 transition">{personal.name}</span>
        <div className="flex gap-4 text-slate-600 text-sm">
          {personal.socials.github && (
            <a href={personal.socials.github} target="_blank" rel="noopener noreferrer" className="hover:text-slate-900 transition flex items-center gap-1">
              <Github className="w-4 h-4" /> GitHub
            </a>
          )}
          {personal.socials.linkedin && (
            <a href={personal.socials.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-slate-900 transition flex items-center gap-1">
              <Linkedin className="w-4 h-4" /> LinkedIn
            </a>
          )}
          <a href={`mailto:${personal.email}`} className="hover:text-slate-900 transition flex items-center gap-1">
            <Mail className="w-4 h-4" /> Email
          </a>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-16 space-y-24">
        {/* Hero Section */}
        <section className="space-y-6">
          {personal.avatarUrl && (
            <img src={personal.avatarUrl} alt={personal.name} className="w-24 h-24 rounded-full object-cover shadow-sm border border-slate-200" />
          )}
          <div className="space-y-2">
            <h1 className="text-4xl sm:text-5xl font-light tracking-tight text-slate-900">{personal.name}</h1>
            <p className="text-xl text-slate-600 font-normal" style={{ color: primaryColor }}>{personal.title}</p>
          </div>
          {personal.location && (
            <p className="text-sm text-slate-500 flex items-center gap-1">
              <MapPin className="w-4 h-4" /> {personal.location}
            </p>
          )}
          <p className="text-lg text-slate-700 leading-relaxed max-w-2xl">{about.summary}</p>
        </section>

        {/* About Highlights */}
        {sectionVisibility.about && about.highlights && about.highlights.length > 0 && (
          <section className="space-y-4 pt-4 border-t border-slate-200/60">
            <h2 className="text-xs uppercase tracking-widest text-slate-400 font-semibold">Core Strengths</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {about.highlights.map((h, i) => (
                <div key={i} className="flex items-start gap-2 text-sm text-slate-700">
                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{h}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Experience Section */}
        {sectionVisibility.experience && experience.length > 0 && (
          <section className="space-y-8 pt-4 border-t border-slate-200/60">
            <h2 className="text-xs uppercase tracking-widest text-slate-400 font-semibold">Work Experience</h2>
            <div className="space-y-8">
              {experience.map((exp) => (
                <div key={exp.id} className="space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                    <h3 className="text-lg font-medium text-slate-900">{exp.role} <span className="text-slate-400 font-normal">at {exp.company}</span></h3>
                    <span className="text-xs text-slate-500 font-mono">{exp.startDate} — {exp.current ? 'Present' : exp.endDate}</span>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed">{exp.description}</p>
                  {exp.achievements && exp.achievements.length > 0 && (
                    <ul className="list-disc list-inside text-sm text-slate-600 space-y-1 pl-1">
                      {exp.achievements.map((ach, idx) => (
                        <li key={idx}>{ach}</li>
                      ))}
                    </ul>
                  )}
                  {exp.technologies && (
                    <div className="flex flex-wrap gap-2 pt-2">
                      {exp.technologies.map((t, idx) => (
                        <span key={idx} className="text-xs bg-slate-200/60 text-slate-700 px-2 py-0.5 rounded">
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

        {/* Projects Section */}
        {sectionVisibility.projects && projects.length > 0 && (
          <section className="space-y-8 pt-4 border-t border-slate-200/60">
            <h2 className="text-xs uppercase tracking-widest text-slate-400 font-semibold">Featured Projects</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {projects.map((proj) => (
                <div key={proj.id} className="p-5 bg-white rounded-xl border border-slate-200/80 hover:border-slate-300 transition space-y-3 shadow-xs">
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium text-slate-900 text-base">{proj.name}</h3>
                    {proj.githubUrl && (
                      <a href={proj.githubUrl} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-slate-800 transition">
                        <ArrowUpRight className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{proj.description}</p>
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {proj.technologies.map((tech, idx) => (
                      <span key={idx} className="text-[11px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills Section */}
        {sectionVisibility.skills && skills.length > 0 && (
          <section className="space-y-6 pt-4 border-t border-slate-200/60">
            <h2 className="text-xs uppercase tracking-widest text-slate-400 font-semibold">Technical Expertise</h2>
            <div className="space-y-4">
              {skills.map((cat) => (
                <div key={cat.id} className="space-y-2">
                  <h3 className="text-xs font-semibold text-slate-500 uppercase">{cat.category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map((skill, idx) => (
                      <span key={idx} className="text-xs bg-slate-100 text-slate-800 px-2.5 py-1 rounded-md border border-slate-200/60">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education & Certifications */}
        {sectionVisibility.education && education.length > 0 && (
          <section className="space-y-6 pt-4 border-t border-slate-200/60">
            <h2 className="text-xs uppercase tracking-widest text-slate-400 font-semibold">Education</h2>
            <div className="space-y-4">
              {education.map((edu) => (
                <div key={edu.id} className="flex justify-between items-baseline">
                  <div>
                    <h3 className="text-sm font-medium text-slate-900">{edu.degree} in {edu.field}</h3>
                    <p className="text-xs text-slate-500">{edu.institution}</p>
                  </div>
                  <span className="text-xs text-slate-400 font-mono">{edu.startDate} — {edu.endDate}</span>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="max-w-4xl mx-auto px-6 py-12 border-t border-slate-200/60 text-center text-xs text-slate-400">
        <p>© {new Date().getFullYear()} {personal.name}. Built with Portify AI.</p>
      </footer>
    </div>
  );
}
