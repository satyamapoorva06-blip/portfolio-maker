'use client';

import React from 'react';
import { PortfolioData } from '@/types/portfolio';
import { Terminal, Github, Linkedin, Mail, Code2, GitBranch, Cpu, Database, Server, ExternalLink, Sparkles, FolderGit2, GraduationCap, Award, MapPin, CheckCircle2 } from 'lucide-react';

export default function DeveloperTheme({ data }: { data: PortfolioData }) {
  const { personal, about, skills, experience, projects, education, sectionVisibility } = data;

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 font-mono selection:bg-cyan-500 selection:text-slate-950">
      {/* IDE Top Bar */}
      <div className="border-b border-cyan-900/30 bg-[#0d1322]/90 px-4 py-2.5 flex items-center justify-between sticky top-0 backdrop-blur-md z-30 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-rose-500/90 shadow-sm"></span>
            <span className="w-3 h-3 rounded-full bg-amber-500/90 shadow-sm"></span>
            <span className="w-3 h-3 rounded-full bg-emerald-500/90 shadow-sm"></span>
          </div>
          <span className="text-xs text-cyan-300/80 pl-3 border-l border-slate-800 flex items-center gap-2">
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            {personal.name.toLowerCase().replace(/\s+/g, '-')}.dev.ts
          </span>
        </div>
        <div className="flex items-center gap-4 text-xs text-slate-400">
          <span className="flex items-center gap-1.5 text-emerald-400 font-bold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/80">
            <GitBranch className="w-3.5 h-3.5" /> main*
          </span>
          <span className="hidden sm:inline text-slate-500">UTF-8</span>
          <span className="text-cyan-400 font-semibold">TypeScript</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12 space-y-16">
        {/* Terminal Hero Section */}
        <section className="bg-gradient-to-b from-[#0e172a] to-[#0b101d] border border-cyan-500/30 rounded-2xl p-8 shadow-2xl shadow-cyan-950/50 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5 text-cyan-400 pointer-events-none">
            <Code2 className="w-72 h-72" />
          </div>

          <div className="space-y-6 relative z-10">
            {/* Header Badge */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-950/80 text-emerald-400 text-xs font-bold rounded-full border border-emerald-500/40">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                OPEN TO OPPORTUNITIES & INTERNSHIPS
              </div>
              {personal.location && (
                <div className="text-xs text-slate-400 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400" /> {personal.location}
                </div>
              )}
            </div>

            {/* Code Declaration Block */}
            <div className="space-y-2 font-mono text-sm sm:text-base bg-[#070a12] p-5 rounded-xl border border-slate-800">
              <div className="text-slate-500 text-xs">// Developer Profile Object Initialization</div>
              <div>
                <span className="text-cyan-400">const</span> <span className="text-amber-300 font-bold">developer</span> = <span className="text-emerald-400">{'{'}</span>
              </div>
              <div className="pl-6 space-y-1.5 text-xs sm:text-sm">
                <div>
                  <span className="text-slate-400">name:</span> <span className="text-emerald-300 font-bold">"{personal.name}"</span>,
                </div>
                <div>
                  <span className="text-slate-400">role:</span> <span className="text-cyan-300 font-semibold">"{personal.title}"</span>,
                </div>
                <div>
                  <span className="text-slate-400">status:</span> <span className="text-amber-300">"Building Next-Gen Web & Backend Systems"</span>,
                </div>
                <div>
                  <span className="text-slate-400">tagline:</span> <span className="text-slate-300">"{personal.tagline}"</span>
                </div>
              </div>
              <div>
                <span className="text-emerald-400">{'}'}</span>;
              </div>
            </div>

            {/* About Summary */}
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans pt-2">
              {about.summary}
            </p>

            {/* Key Achievements Badges */}
            {about.highlights && about.highlights.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 font-sans">
                {about.highlights.map((h, idx) => (
                  <div key={idx} className="p-3 bg-slate-900/80 border border-slate-800 rounded-xl text-xs text-slate-200 flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Contact CTA buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-slate-800/80">
              <a
                href={`mailto:${personal.email}`}
                className="px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-sans font-bold text-xs rounded-xl shadow-lg shadow-cyan-500/20 flex items-center gap-2 transition transform hover:-translate-y-0.5"
              >
                <Mail className="w-4 h-4" /> Get In Touch
              </a>
              {personal.socials.github && (
                <a
                  href={personal.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-cyan-300 text-xs font-semibold rounded-xl border border-slate-700 flex items-center gap-2 transition"
                >
                  <Github className="w-4 h-4" /> GitHub
                </a>
              )}
              {personal.socials.linkedin && (
                <a
                  href={personal.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-cyan-300 text-xs font-semibold rounded-xl border border-slate-700 flex items-center gap-2 transition"
                >
                  <Linkedin className="w-4 h-4" /> LinkedIn
                </a>
              )}
            </div>
          </div>
        </section>

        {/* Technical Stack / Skills */}
        {sectionVisibility.skills && skills.length > 0 && (
          <section className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="text-base font-bold text-cyan-400 flex items-center gap-2">
                <Cpu className="w-5 h-5 text-cyan-400" /> // TECH_STACK_MATRIX
              </h2>
              <span className="text-xs text-slate-500 font-mono">01 // SKILLS</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {skills.map((cat) => (
                <div key={cat.id} className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4 hover:border-cyan-500/40 transition shadow-lg">
                  <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    {cat.category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map((s, idx) => (
                      <span key={idx} className="text-xs bg-slate-950 text-cyan-300 font-mono px-3 py-1.5 rounded-lg border border-cyan-900/40 hover:border-cyan-500/60 transition">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Featured Projects Grid */}
        {sectionVisibility.projects && projects.length > 0 && (
          <section className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="text-base font-bold text-cyan-400 flex items-center gap-2">
                <FolderGit2 className="w-5 h-5 text-emerald-400" /> // FEATURED_PROJECTS
              </h2>
              <span className="text-xs text-slate-500 font-mono">02 // PROJECTS</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((proj) => (
                <div key={proj.id} className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-5 flex flex-col justify-between hover:border-cyan-500/50 hover:shadow-cyan-950/40 hover:shadow-xl transition duration-300">
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold text-emerald-400 text-lg leading-snug font-sans">{proj.name}</h3>
                      {proj.githubUrl && (
                        <a
                          href={proj.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-slate-800 hover:bg-slate-700 text-cyan-400 rounded-lg transition"
                          title="View Repository"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>

                    <p className="text-xs text-slate-300 font-sans leading-relaxed">{proj.description}</p>

                    {/* Features list */}
                    {proj.features && proj.features.length > 0 && (
                      <ul className="space-y-1 font-sans text-xs text-slate-400 pt-1">
                        {proj.features.map((feat, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-cyan-400 font-bold">›</span>
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2 pt-3 border-t border-slate-800">
                    {proj.technologies.map((tech, idx) => (
                      <span key={idx} className="text-[11px] font-mono bg-cyan-950/80 text-cyan-300 px-2.5 py-1 rounded-md border border-cyan-800/60">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education Section */}
        {sectionVisibility.education && education.length > 0 && (
          <section className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="text-base font-bold text-cyan-400 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-amber-400" /> // EDUCATION_&_ACADEMICS
              </h2>
              <span className="text-xs text-slate-500 font-mono">03 // EDUCATION</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {education.map((edu) => (
                <div key={edu.id} className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-3 font-sans">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-white text-base">{edu.institution}</h3>
                      <p className="text-xs text-cyan-400 font-medium">{edu.degree} — {edu.field}</p>
                    </div>
                    {edu.gpa && (
                      <span className="px-2.5 py-1 bg-amber-950 text-amber-300 text-xs font-mono font-bold rounded-lg border border-amber-800/80">
                        {edu.gpa}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 font-mono">{edu.startDate} – {edu.current ? 'Present' : edu.endDate}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Footer */}
        <footer className="pt-12 border-t border-slate-800 text-center text-xs text-slate-500 space-y-2">
          <p>© {new Date().getFullYear()} {personal.name}. Built with Portify AI.</p>
        </footer>
      </div>
    </div>
  );
}
