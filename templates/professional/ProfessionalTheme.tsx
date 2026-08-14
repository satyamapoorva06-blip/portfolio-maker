'use client';

import React from 'react';
import { PortfolioData } from '@/types/portfolio';
import { Mail, Phone, MapPin, Linkedin, Github, Globe, Briefcase, GraduationCap, Award, CheckCircle } from 'lucide-react';

export default function ProfessionalTheme({ data }: { data: PortfolioData }) {
  const { personal, about, skills, experience, projects, education, certifications, achievements, customization, sectionVisibility } = data;

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 font-sans py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto bg-white rounded-xl border border-slate-200 shadow-xl overflow-hidden">
        {/* Top Corporate Banner Header */}
        <div className="bg-slate-900 text-white p-8 sm:p-12 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">{personal.name}</h1>
            <p className="text-lg text-blue-400 font-medium">{personal.title}</p>
            {personal.location && (
              <p className="text-xs text-slate-400 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" /> {personal.location}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-2 text-xs text-slate-300">
            <a href={`mailto:${personal.email}`} className="flex items-center gap-2 hover:text-white transition">
              <Mail className="w-4 h-4 text-blue-400" /> {personal.email}
            </a>
            {personal.phone && (
              <span className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-blue-400" /> {personal.phone}
              </span>
            )}
            {personal.socials.linkedin && (
              <a href={personal.socials.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white transition">
                <Linkedin className="w-4 h-4 text-blue-400" /> LinkedIn Profile
              </a>
            )}
            {personal.socials.github && (
              <a href={personal.socials.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white transition">
                <Github className="w-4 h-4 text-blue-400" /> GitHub Profile
              </a>
            )}
          </div>
        </div>

        {/* Content Body */}
        <div className="p-8 sm:p-12 space-y-10">
          {/* Executive Summary */}
          {about.summary && (
            <section className="space-y-3">
              <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-200 pb-1">Executive Profile</h2>
              <p className="text-sm text-slate-700 leading-relaxed">{about.summary}</p>
            </section>
          )}

          {/* Professional Experience */}
          {sectionVisibility.experience && experience.length > 0 && (
            <section className="space-y-6">
              <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-200 pb-1 flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-slate-600" /> Professional Experience
              </h2>
              <div className="space-y-6">
                {experience.map((exp) => (
                  <div key={exp.id} className="space-y-2">
                    <div className="flex flex-col sm:flex-row justify-between sm:items-baseline">
                      <h3 className="text-base font-bold text-slate-900">{exp.role} — <span className="text-blue-600">{exp.company}</span></h3>
                      <span className="text-xs font-mono text-slate-500">{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">{exp.description}</p>
                    {exp.achievements && exp.achievements.length > 0 && (
                      <ul className="list-disc list-inside text-xs text-slate-700 space-y-1">
                        {exp.achievements.map((ach, idx) => (
                          <li key={idx}>{ach}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Key Projects */}
          {sectionVisibility.projects && projects.length > 0 && (
            <section className="space-y-6">
              <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-200 pb-1">Key Projects & Deliverables</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {projects.map((proj) => (
                  <div key={proj.id} className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-2">
                    <h3 className="font-bold text-slate-900 text-sm">{proj.name}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{proj.description}</p>
                    <div className="flex flex-wrap gap-1 pt-1">
                      {proj.technologies.map((tech, idx) => (
                        <span key={idx} className="text-[10px] bg-white text-slate-700 px-2 py-0.5 rounded border border-slate-200 font-mono">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Core Competencies / Skills */}
          {sectionVisibility.skills && skills.length > 0 && (
            <section className="space-y-4">
              <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-200 pb-1">Technical Skills & Competencies</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {skills.map((cat) => (
                  <div key={cat.id} className="space-y-1">
                    <h3 className="text-xs font-semibold text-slate-800">{cat.category}:</h3>
                    <p className="text-xs text-slate-600 leading-normal">{cat.skills.join(', ')}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {sectionVisibility.education && education.length > 0 && (
            <section className="space-y-4">
              <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-200 pb-1 flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-slate-600" /> Education
              </h2>
              <div className="space-y-3">
                {education.map((edu) => (
                  <div key={edu.id} className="flex justify-between items-baseline text-xs">
                    <div>
                      <p className="font-bold text-slate-900">{edu.degree} — {edu.field}</p>
                      <p className="text-slate-600">{edu.institution}</p>
                    </div>
                    <span className="font-mono text-slate-500">{edu.startDate} – {edu.endDate}</span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-8 py-4 border-t border-slate-200 text-center text-xs text-slate-400">
          Generated via Portify AI Recruiter Platform
        </div>
      </div>
    </div>
  );
}
