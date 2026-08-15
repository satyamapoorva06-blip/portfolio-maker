'use client';

import React from 'react';
import { PortfolioData } from '@/types/portfolio';
import {
  Crown,
  Sparkles,
  Code2,
  Cpu,
  Terminal,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  Zap,
  Briefcase,
  GraduationCap,
  ArrowUpRight,
  ShieldCheck,
  Flame,
  Award,
  ChevronRight,
  Globe,
  Database
} from 'lucide-react';

export default function Top1PremierTheme({ data }: { data: PortfolioData }) {
  const { personal, about, projects, skills, experience, education, achievements } = data;

  return (
    <div className="min-h-screen bg-[#050505] text-slate-100 font-sans p-4 sm:p-10 relative overflow-x-hidden selection:bg-[#e50914] selection:text-white">
      {/* Netflix Crimson Red & Cyber Ambient Background Glows */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[700px] h-[450px] bg-[#e50914]/15 rounded-full blur-[220px] pointer-events-none z-0"></div>
      <div className="fixed bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[200px] pointer-events-none z-0"></div>

      <div className="max-w-6xl mx-auto space-y-12 relative z-10">
        {/* Top 1 Premier Crown Banner */}
        <div className="flex justify-between items-center bg-[#0d0d0d] border border-[#e50914]/40 rounded-2xl px-5 py-3 shadow-xl shadow-[#e50914]/5">
          <div className="flex items-center gap-2.5">
            <Crown className="w-5 h-5 text-[#e50914] animate-bounce" />
            <span className="text-xs font-mono font-extrabold tracking-widest text-white uppercase">
              👑 TOP 1 PREMIER PORTFOLIO THEME
            </span>
          </div>
          <span className="hidden sm:inline-block px-3 py-1 bg-[#e50914]/20 border border-[#e50914]/50 text-[#e50914] text-[11px] font-mono font-bold rounded-full">
            FLAGSHIP EDITION
          </span>
        </div>

        {/* Hero Banner Section */}
        <header className="p-8 sm:p-12 bg-[#0c0c0e]/90 border border-slate-800/80 rounded-3xl space-y-8 shadow-2xl backdrop-blur-xl relative overflow-hidden group hover:border-[#e50914]/60 transition duration-500">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 border-b border-slate-800/80 pb-8">
            <div className="space-y-4 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#17171c] border border-slate-800 text-[#e50914] text-xs font-mono font-bold rounded-full">
                <Flame className="w-3.5 h-3.5 fill-[#e50914]" /> {personal.title || 'Senior Software Developer & AI Architect'}
              </div>
              <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-tight">
                Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-[#e50914]">{personal.name}</span>
              </h1>
              <p className="text-base text-slate-300 leading-relaxed font-light">{about.summary}</p>
            </div>

            {/* Quick Action Contact Cards */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full lg:w-auto shrink-0">
              {personal.email && (
                <a
                  href={`mailto:${personal.email}`}
                  className="px-6 py-3.5 bg-[#e50914] hover:bg-[#ff1e27] text-white font-extrabold text-xs rounded-2xl shadow-xl shadow-[#e50914]/30 flex items-center justify-center gap-2.5 transition transform hover:-translate-y-0.5"
                >
                  <Mail className="w-4 h-4" /> Get In Touch <ArrowUpRight className="w-4 h-4" />
                </a>
              )}
              <div className="flex gap-2">
                {personal.socials?.github && (
                  <a
                    href={personal.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3 px-4 bg-[#141418] hover:bg-[#1c1c22] text-slate-200 text-xs font-bold rounded-xl border border-slate-800 flex items-center justify-center gap-2 transition"
                  >
                    <Github className="w-4 h-4 text-[#e50914]" /> GitHub
                  </a>
                )}
                {personal.socials?.linkedin && (
                  <a
                    href={personal.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3 px-4 bg-[#141418] hover:bg-[#1c1c22] text-slate-200 text-xs font-bold rounded-xl border border-slate-800 flex items-center justify-center gap-2 transition"
                  >
                    <Linkedin className="w-4 h-4 text-blue-400" /> LinkedIn
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Quick Metrics Counter Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
            <div className="p-4 bg-[#141418] border border-slate-800/80 rounded-2xl space-y-1">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">DS & ALGORITHMS</span>
              <div className="text-2xl font-black text-white font-mono flex items-center gap-1">
                500+ <span className="text-xs text-[#e50914]">Solved</span>
              </div>
              <span className="text-[10px] text-slate-500">LeetCode / Codeforces</span>
            </div>

            <div className="p-4 bg-[#141418] border border-slate-800/80 rounded-2xl space-y-1">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">FULL STACK APPS</span>
              <div className="text-2xl font-black text-white font-mono flex items-center gap-1">
                25+ <span className="text-xs text-emerald-400">Deployed</span>
              </div>
              <span className="text-[10px] text-slate-500">Next.js, Node, MERN</span>
            </div>

            <div className="p-4 bg-[#141418] border border-slate-800/80 rounded-2xl space-y-1">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">AI AGENT ENGINE</span>
              <div className="text-2xl font-black text-white font-mono flex items-center gap-1">
                LLM & RAG
              </div>
              <span className="text-[10px] text-slate-500">Gemini, PyTorch, OCR</span>
            </div>

            <div className="p-4 bg-[#141418] border border-slate-800/80 rounded-2xl space-y-1">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">SYSTEM STATUS</span>
              <div className="text-sm font-bold text-emerald-400 flex items-center gap-2 pt-1">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span> OPEN FOR OFFERS
              </div>
              <span className="text-[10px] text-slate-500">SDE & AI Roles</span>
            </div>
          </div>
        </header>

        {/* Featured Projects Grid */}
        {projects && projects.length > 0 && (
          <section className="space-y-6">
            <div className="flex justify-between items-end border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-mono font-bold text-[#e50914] uppercase tracking-widest">PORTFOLIO WORK</span>
                <h2 className="text-2xl font-black text-white flex items-center gap-2">
                  <Code2 className="w-6 h-6 text-[#e50914]" /> Featured Software Projects
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((proj) => (
                <div
                  key={proj.id}
                  className="p-7 bg-[#0c0c0e] border border-slate-800/80 hover:border-[#e50914]/80 rounded-3xl space-y-5 transition duration-300 group hover:shadow-2xl hover:shadow-[#e50914]/10 transform hover:-translate-y-1 relative"
                >
                  <div className="flex justify-between items-start">
                    <h3 className="font-black text-white text-lg group-hover:text-[#e50914] transition">{proj.name}</h3>
                    {proj.liveUrl && (
                      <a
                        href={proj.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 bg-[#17171c] text-[#e50914] hover:bg-[#e50914] hover:text-white rounded-xl transition"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed font-light">{proj.description}</p>

                  {proj.technologies && proj.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-800/60">
                      {proj.technologies.map((tech, i) => (
                        <span key={i} className="text-[10px] font-mono font-bold bg-[#17171c] text-slate-300 px-3 py-1 rounded-lg border border-slate-800">
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Technical Skills Stack */}
        {skills && skills.length > 0 && (
          <section className="space-y-6">
            <div className="border-b border-slate-800 pb-4">
              <span className="text-xs font-mono font-bold text-[#e50914] uppercase tracking-widest">TECHNICAL COMPETENCIES</span>
              <h2 className="text-2xl font-black text-white flex items-center gap-2">
                <Cpu className="w-6 h-6 text-[#e50914]" /> Engineering & Technology Stack
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {skills.map((grp) => (
                <div key={grp.id} className="p-6 bg-[#0c0c0e] border border-slate-800/80 rounded-3xl space-y-4 hover:border-slate-700 transition">
                  <h3 className="text-xs font-bold font-mono text-[#e50914] uppercase tracking-wider border-b border-slate-800 pb-2 flex items-center justify-between">
                    {grp.category} <ChevronRight className="w-4 h-4 text-slate-600" />
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {grp.skills.map((sk, idx) => (
                      <span key={idx} className="text-xs font-mono bg-[#16161b] text-slate-200 px-3 py-1 rounded-xl border border-slate-800">
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Work Experience */}
        {experience && experience.length > 0 && (
          <section className="space-y-6">
            <div className="border-b border-slate-800 pb-4">
              <span className="text-xs font-mono font-bold text-[#e50914] uppercase tracking-widest">CAREER TIMELINE</span>
              <h2 className="text-2xl font-black text-white flex items-center gap-2">
                <Briefcase className="w-6 h-6 text-[#e50914]" /> Professional Engineering Experience
              </h2>
            </div>

            <div className="space-y-4">
              {experience.map((exp) => (
                <div key={exp.id} className="p-6 bg-[#0c0c0e] border border-slate-800/80 rounded-3xl space-y-3 relative overflow-hidden">
                  <div className="flex flex-wrap justify-between items-center gap-2">
                    <div>
                      <h3 className="font-extrabold text-white text-base">{exp.role}</h3>
                      <p className="text-xs text-[#e50914] font-mono font-bold">{exp.company} • {exp.location || 'Remote'}</p>
                    </div>
                    <span className="text-[11px] font-mono bg-[#1a1416] text-[#e50914] px-3 py-1 rounded-full border border-[#e50914]/40 font-bold">
                      {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  {exp.description && <p className="text-xs text-slate-300 leading-relaxed font-light">{exp.description}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education Credentials */}
        {education && education.length > 0 && (
          <section className="space-y-6">
            <div className="border-b border-slate-800 pb-4">
              <span className="text-xs font-mono font-bold text-[#e50914] uppercase tracking-widest">ACADEMICS</span>
              <h2 className="text-2xl font-black text-white flex items-center gap-2">
                <GraduationCap className="w-6 h-6 text-[#e50914]" /> Education & Degrees
              </h2>
            </div>

            <div className="space-y-4">
              {education.map((edu) => (
                <div key={edu.id} className="p-6 bg-[#0c0c0e] border border-slate-800/80 rounded-3xl flex flex-wrap justify-between items-center gap-4">
                  <div>
                    <h3 className="font-extrabold text-white text-base">{edu.degree}</h3>
                    <p className="text-xs text-slate-400 font-mono">{edu.institution} • {edu.field}</p>
                  </div>
                  {edu.gpa && (
                    <span className="px-3.5 py-1 bg-[#17171c] text-[#e50914] border border-[#e50914]/40 rounded-full text-xs font-mono font-bold">
                      GPA {edu.gpa}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Footer */}
        <footer className="pt-10 border-t border-slate-800 text-center text-xs text-slate-500 font-mono space-y-2">
          <p>© {new Date().getFullYear()} {personal.name}. Top 1 Premier Portfolio Flagship.</p>
          <p className="text-[11px] text-slate-600">Built with Next.js, React & Portify AI Engine.</p>
        </footer>
      </div>
    </div>
  );
}
