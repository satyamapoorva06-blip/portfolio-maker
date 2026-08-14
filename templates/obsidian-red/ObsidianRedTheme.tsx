'use client';

import React from 'react';
import { PortfolioData } from '@/types/portfolio';
import { Mail, Github, Linkedin, ExternalLink, Code2, Flame, Award, Terminal, CheckCircle2, Sparkles, Trophy, BookOpen } from 'lucide-react';

export default function ObsidianRedTheme({ data }: { data: PortfolioData }) {
  const { personal, about, projects, skills, experience, education, certifications } = data;

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-[#e50914] selection:text-white relative overflow-x-hidden p-6 sm:p-12">
      {/* Background Red Glow Orbs */}
      <div className="fixed top-0 right-1/4 w-[500px] h-[500px] bg-[#e50914]/10 rounded-full blur-[160px] pointer-events-none"></div>
      <div className="fixed bottom-0 left-1/4 w-[450px] h-[450px] bg-red-900/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-5xl mx-auto space-y-20 relative z-10">
        {/* Navigation Bar */}
        <header className="flex justify-between items-center border-b border-zinc-800/80 pb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#e50914] text-white font-black flex items-center justify-center text-lg shadow-lg shadow-[#e50914]/30">
              {personal.name.charAt(0)}
            </div>
            <div>
              <span className="text-base font-extrabold text-white tracking-wide block">{personal.name}</span>
              <span className="text-xs text-zinc-400 font-mono">{personal.title}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {personal.email && (
              <a
                href={`mailto:${personal.email}`}
                className="px-4 py-2 bg-[#e50914] hover:bg-red-600 text-white font-bold text-xs rounded-xl shadow-lg shadow-[#e50914]/25 flex items-center gap-1.5 transition transform hover:-translate-y-0.5"
              >
                <Mail className="w-3.5 h-3.5" /> Get In Touch
              </a>
            )}
          </div>
        </header>

        {/* Hero Banner Section */}
        <section className="space-y-6 pt-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-semibold text-red-400 font-mono">
            <Flame className="w-4 h-4 text-[#e50914] animate-pulse" /> SDE & AI/ML Developer Portfolio
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-none uppercase">
            Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e50914] to-red-400">{personal.name}</span>
          </h1>

          <p className="text-lg text-zinc-300 max-w-3xl leading-relaxed font-light">{about.summary}</p>

          {/* Social Links & Resume Download */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            {personal.socials.github && (
              <a
                href={personal.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-200 font-medium text-xs rounded-xl border border-zinc-800 flex items-center gap-2 transition"
              >
                <Github className="w-4 h-4 text-red-500" /> GitHub Profile
              </a>
            )}
            {personal.socials.linkedin && (
              <a
                href={personal.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-200 font-medium text-xs rounded-xl border border-zinc-800 flex items-center gap-2 transition"
              >
                <Linkedin className="w-4 h-4 text-red-500" /> LinkedIn
              </a>
            )}
          </div>
        </section>

        {/* LeetCode & Problem Solving Metrics Bar */}
        <section className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 bg-zinc-900/60 border border-zinc-800 rounded-3xl backdrop-blur-md">
          <div className="space-y-1">
            <span className="text-[11px] text-zinc-400 font-mono uppercase">Problem Solving</span>
            <div className="text-2xl font-black text-white font-mono flex items-center gap-2">
              <Code2 className="w-5 h-5 text-[#e50914]" /> 500+
            </div>
            <span className="text-[10px] text-zinc-500">LeetCode & Algo Problems</span>
          </div>

          <div className="space-y-1">
            <span className="text-[11px] text-zinc-400 font-mono uppercase">Experience</span>
            <div className="text-2xl font-black text-white font-mono flex items-center gap-2">
              <Trophy className="w-5 h-5 text-red-400" /> {about.yearsOfExperience || 3}+ Yrs
            </div>
            <span className="text-[10px] text-zinc-500">Software Engineering</span>
          </div>

          <div className="space-y-1">
            <span className="text-[11px] text-zinc-400 font-mono uppercase">Projects Built</span>
            <div className="text-2xl font-black text-white font-mono flex items-center gap-2">
              <Terminal className="w-5 h-5 text-[#e50914]" /> {projects.length}+
            </div>
            <span className="text-[10px] text-zinc-500">Full Stack & AI Apps</span>
          </div>

          <div className="space-y-1">
            <span className="text-[11px] text-zinc-400 font-mono uppercase">Status</span>
            <div className="text-sm font-bold text-emerald-400 flex items-center gap-1.5 pt-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span> Available for Work
            </div>
            <span className="text-[10px] text-zinc-500">Full-Time / Contract</span>
          </div>
        </section>

        {/* Featured Projects Grid */}
        {projects && projects.length > 0 && (
          <section className="space-y-8">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
              <h2 className="text-2xl font-extrabold text-white flex items-center gap-2 uppercase tracking-wide">
                <Flame className="w-6 h-6 text-[#e50914]" /> Featured Projects
              </h2>
              <span className="text-xs text-zinc-500 font-mono">{projects.length} Repositories</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((proj) => (
                <div
                  key={proj.id}
                  className="p-6 bg-zinc-900/80 border border-zinc-800 hover:border-[#e50914]/50 rounded-3xl space-y-4 transition duration-300 group hover:shadow-2xl hover:shadow-[#e50914]/10"
                >
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-bold text-white group-hover:text-red-400 transition">{proj.name}</h3>
                    {proj.liveUrl && (
                      <a
                        href={proj.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-xl transition"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>

                  <p className="text-xs text-zinc-300 leading-relaxed font-light">{proj.description}</p>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {proj.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] bg-zinc-950 text-red-400 border border-red-900/40 px-2.5 py-1 rounded-lg font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Technical Skills Matrix */}
        {skills && skills.length > 0 && (
          <section className="space-y-6">
            <h2 className="text-2xl font-extrabold text-white flex items-center gap-2 uppercase tracking-wide">
              <Terminal className="w-6 h-6 text-[#e50914]" /> Core Tech Stack
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {skills.map((cat) => (
                <div key={cat.id} className="p-6 bg-zinc-900/60 border border-zinc-800 rounded-3xl space-y-3">
                  <h3 className="text-xs font-bold text-red-400 uppercase font-mono tracking-wider">{cat.category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="text-xs bg-zinc-950 text-zinc-200 border border-zinc-800 px-3 py-1.5 rounded-xl font-mono"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Experience Timeline */}
        {experience && experience.length > 0 && (
          <section className="space-y-6">
            <h2 className="text-2xl font-extrabold text-white flex items-center gap-2 uppercase tracking-wide">
              <Award className="w-6 h-6 text-[#e50914]" /> Work Experience
            </h2>

            <div className="space-y-4">
              {experience.map((exp) => (
                <div key={exp.id} className="p-6 bg-zinc-900/60 border border-zinc-800 rounded-3xl space-y-2">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                    <div>
                      <h3 className="font-extrabold text-white text-base">{exp.role}</h3>
                      <span className="text-xs text-red-400 font-mono">{exp.company}</span>
                    </div>
                    <span className="text-[11px] text-zinc-500 font-mono mt-1 sm:mt-0">
                      {exp.startDate} — {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-300 leading-relaxed font-light pt-1">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Footer */}
        <footer className="pt-12 border-t border-zinc-800/80 text-center text-xs text-zinc-500 font-mono">
          © {new Date().getFullYear()} {personal.name}. Built with Portify AI.
        </footer>
      </div>
    </div>
  );
}
