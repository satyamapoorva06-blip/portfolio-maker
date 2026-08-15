'use client';

import React, { useState, useEffect, useRef } from 'react';
import { PortfolioData } from '@/types/portfolio';
import {
  Crown,
  Sparkles,
  Code2,
  Cpu,
  Terminal as TerminalIcon,
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
  Database,
  MapPin,
  FileText,
  Clock,
  CheckCircle2,
  FolderGit2,
  Star,
  GitFork,
  MessageSquare,
  X,
  Send,
  User,
  Bot
} from 'lucide-react';

export default function Top1PremierTheme({ data }: { data: PortfolioData }) {
  const { personal, about, projects, skills, experience, education, certifications, achievements } = data;

  // Terminal state
  const [termInput, setTermInput] = useState('');
  const [termHistory, setTermHistory] = useState<Array<{ type: 'input' | 'output'; text: string }>>([
    { type: 'output', text: `Welcome to ${personal.name?.toLowerCase().replace(/\s+/g, '') || 'user'}@portfolio ~ % Type "help" to list available commands.` }
  ]);
  const termBottomRef = useRef<HTMLDivElement>(null);

  // AI Modal state
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [aiInput, setAiInput] = useState('');
  const [aiMessages, setAiMessages] = useState<Array<{ role: 'user' | 'assistant'; content: string }>>([
    {
      role: 'assistant',
      content: `Hello! I am ${personal.name}'s AI Assistant. Ask me anything about ${personal.name}'s skills, projects, experience, or contact information!`
    }
  ]);
  const aiBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    termBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [termHistory]);

  useEffect(() => {
    aiBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [aiMessages]);

  // Handle Terminal CLI command execution
  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = termInput.trim().toLowerCase();
    if (!cmd) return;

    const newHistory = [...termHistory, { type: 'input' as const, text: cmd }];

    switch (cmd) {
      case 'help':
        newHistory.push({
          type: 'output',
          text: `Available Commands:
  - about       : Brief overview of ${personal.name}
  - skills      : Technical skills & languages stack
  - projects    : Featured software projects & URLs
  - experience  : Professional engineering timeline
  - education   : Academic degree & university
  - contact     : Email, location & social links
  - cat resume  : Print summary resume
  - whoami      : Current user session status
  - clear       : Clear terminal screen`
        });
        break;

      case 'about':
        newHistory.push({
          type: 'output',
          text: `${personal.name} — ${personal.title || 'Software Development Engineer'}.\n${about.summary}`
        });
        break;

      case 'skills':
        const skillsText = skills && skills.length > 0
          ? skills.map(s => `${s.category}: ${s.skills.join(', ')}`).join('\n')
          : 'Fullstack Web, Python, Data Structures & Algorithms, React, Node.js';
        newHistory.push({ type: 'output', text: skillsText });
        break;

      case 'projects':
        const projectsText = projects && projects.length > 0
          ? projects.map((p, i) => `${i + 1}. ${p.name} -> ${p.description} (Tech: ${p.technologies.join(', ')})`).join('\n')
          : 'Projects loaded on page showcase.';
        newHistory.push({ type: 'output', text: projectsText });
        break;

      case 'experience':
        const expText = experience && experience.length > 0
          ? experience.map((e, i) => `${i + 1}. ${e.role} @ ${e.company} (${e.startDate} - ${e.current ? 'Present' : e.endDate})`).join('\n')
          : 'Experience loaded on timeline.';
        newHistory.push({ type: 'output', text: expText });
        break;

      case 'education':
        const eduText = education && education.length > 0
          ? education.map(ed => `${ed.degree} in ${ed.field} @ ${ed.institution}`).join('\n')
          : 'Education loaded on academic section.';
        newHistory.push({ type: 'output', text: eduText });
        break;

      case 'contact':
        newHistory.push({
          type: 'output',
          text: `Email: ${personal.email || 'N/A'}\nLocation: ${personal.location || 'Remote'}\nGitHub: ${personal.socials?.github || 'N/A'}\nLinkedIn: ${personal.socials?.linkedin || 'N/A'}`
        });
        break;

      case 'cat resume':
      case 'resume':
        newHistory.push({
          type: 'output',
          text: `RESUME SUMMARY: ${personal.name}\nRole: ${personal.title}\nBio: ${about.summary}\nLocation: ${personal.location}`
        });
        break;

      case 'whoami':
        newHistory.push({
          type: 'output',
          text: `guest@${personal.name?.toLowerCase().replace(/\s+/g, '') || 'user'} — SDE Recruiter / Engineer`
        });
        break;

      case 'clear':
        setTermHistory([]);
        setTermInput('');
        return;

      default:
        newHistory.push({
          type: 'output',
          text: `zsh: command not found: ${cmd}. Type "help" for available commands.`
        });
        break;
    }

    setTermHistory(newHistory);
    setTermInput('');
  };

  // Handle AI Chat Assistant response
  const handleAiSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = aiInput.trim();
    if (!q) return;

    const userMsg = { role: 'user' as const, content: q };
    setAiMessages(prev => [...prev, userMsg]);
    setAiInput('');

    setTimeout(() => {
      let ans = `${personal.name} is a skilled ${personal.title || 'Developer'} specializing in building scalable web applications and software systems.`;
      const qLower = q.toLowerCase();

      if (qLower.includes('skill') || qLower.includes('tech') || qLower.includes('stack')) {
        ans = `${personal.name}'s key technical skills include: ${skills.map(s => s.skills.join(', ')).join(', ')}.`;
      } else if (qLower.includes('project') || qLower.includes('work') || qLower.includes('built')) {
        ans = `${personal.name} has built projects such as: ${projects.map(p => p.name).join(', ')}.`;
      } else if (qLower.includes('contact') || qLower.includes('email') || qLower.includes('reach') || qLower.includes('hire')) {
        ans = `You can reach ${personal.name} directly via email at ${personal.email || 'the contact section below'}.`;
      } else if (qLower.includes('experience') || qLower.includes('job') || qLower.includes('intern')) {
        ans = `${personal.name} has experience working as: ${experience.map(e => `${e.role} at ${e.company}`).join('; ')}.`;
      }

      setAiMessages(prev => [...prev, { role: 'assistant', content: ans }]);
    }, 400);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#f3f4f6] font-sans selection:bg-[#e50914] selection:text-white relative overflow-x-hidden">
      {/* Background Watermark & Red Ambient Glows */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none opacity-[0.03] z-0">
        <span className="font-extrabold text-[24vw] tracking-tighter text-white uppercase">
          {personal.name?.split(' ')[0] || 'TOP 1'}
        </span>
      </div>

      <div className="pointer-events-none fixed top-0 left-1/2 -translate-x-1/2 h-[600px] w-[700px] rounded-full bg-[#e50914]/15 blur-[220px] z-0" />
      <div className="pointer-events-none fixed bottom-0 right-1/4 h-[500px] w-[500px] rounded-full bg-purple-600/10 blur-[200px] z-0" />

      {/* Top Fixed Header Navigation */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#050505]/90 backdrop-blur-md px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="h-2.5 w-2.5 rounded-full bg-[#e50914] animate-ping" />
            <span className="font-extrabold text-white text-base tracking-tight">{personal.name}</span>
            <span className="hidden sm:inline-block px-2.5 py-0.5 bg-[#e50914]/20 border border-[#e50914]/50 text-[#e50914] text-[10px] font-mono font-bold rounded-full">
              👑 TOP 1 PREMIER
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsAiModalOpen(true)}
              className="px-4 py-2 bg-[#e50914] hover:bg-[#ff1e27] text-white text-xs font-bold rounded-full shadow-lg shadow-[#e50914]/20 flex items-center gap-1.5 transition transform hover:scale-105"
            >
              <Bot className="w-4 h-4" /> Ask AI Assistant
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-6 py-12 space-y-20 relative z-10">
        
        {/* HERO SECTION */}
        <section id="top" className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center pt-6">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#e50914]/15 border border-[#e50914]/40 text-[#e50914] text-xs font-mono font-bold">
              <span className="h-2 w-2 rounded-full bg-[#e50914] animate-ping" />
              <span>Available for SDE Roles & Internships 2026</span>
            </div>

            <p className="text-xl sm:text-2xl font-semibold text-[#e50914]">
              Hello, I'm {personal.name} 👋
            </p>

            <h1 className="text-4xl sm:text-6xl font-black text-white leading-tight tracking-tight">
              Building software with <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e50914] via-rose-500 to-white">precision</span> & AI intelligence
            </h1>

            <p className="text-base text-slate-300 leading-relaxed font-light max-w-xl">
              {about.summary}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#projects"
                className="px-7 py-3.5 bg-[#e50914] hover:bg-[#ff1e27] text-white font-extrabold text-xs rounded-full shadow-xl shadow-[#e50914]/30 flex items-center gap-2 transition transform hover:scale-105"
              >
                Explore Projects <ArrowUpRight className="w-4 h-4" />
              </a>

              {personal.email && (
                <a
                  href={`mailto:${personal.email}`}
                  className="px-7 py-3.5 bg-white/5 hover:bg-white/10 text-white border border-white/20 font-bold text-xs rounded-full flex items-center gap-2 transition"
                >
                  <Mail className="w-4 h-4 text-[#e50914]" /> Contact Me
                </a>
              )}
            </div>

            {/* Social Connect Quick Bar */}
            <div className="flex items-center gap-6 pt-6 border-t border-white/10">
              <span className="text-xs uppercase tracking-widest font-mono text-slate-400 font-bold">Connect</span>
              <div className="flex items-center gap-3">
                {personal.socials?.github && (
                  <a
                    href={personal.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 bg-white/5 hover:bg-[#e50914]/20 border border-white/10 hover:border-[#e50914] rounded-full text-slate-200 hover:text-white transition"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                )}
                {personal.socials?.linkedin && (
                  <a
                    href={personal.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 bg-white/5 hover:bg-[#e50914]/20 border border-white/10 hover:border-[#e50914] rounded-full text-slate-200 hover:text-white transition"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                )}
              </div>
              <div className="ml-auto flex items-center gap-1.5 text-xs font-mono text-slate-400">
                <MapPin className="w-3.5 h-3.5 text-[#e50914]" /> {personal.location || 'Mathura, India'}
              </div>
            </div>
          </div>

          {/* Right Portrait Showcase Card */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md">
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-[#e50914] via-rose-500 to-[#e50914] opacity-40 blur-xl animate-pulse" />
              <div className="relative bg-[#0c0c0e] border border-white/15 rounded-3xl p-4 shadow-2xl space-y-4">
                <div className="aspect-[3/4] w-full rounded-2xl bg-zinc-900 overflow-hidden relative border border-white/10">
                  <img
                    src={personal.avatarUrl || 'https://avatars.githubusercontent.com/u/231909239?v=4'}
                    alt={personal.name}
                    className="w-full h-full object-cover object-top transition duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-4 left-4 right-4 bg-[#050505]/90 backdrop-blur-md border border-white/10 rounded-2xl p-4 flex justify-between items-center">
                    <div>
                      <p className="font-bold text-white text-base">{personal.name}</p>
                      <p className="text-xs font-mono text-[#e50914]">{personal.title || 'SDE & AI Developer'}</p>
                    </div>
                    <div className="w-9 h-9 rounded-full bg-[#e50914]/20 border border-[#e50914]/40 flex items-center justify-center text-[#e50914]">
                      <Sparkles className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* STATS METRICS COUNTER BAR */}
        <section className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 bg-[#0c0c0e] border border-white/10 rounded-3xl shadow-xl">
          <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl space-y-1">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">DS & ALGORITHMS</span>
            <div className="text-2xl font-black text-white font-mono flex items-center gap-1">
              500+ <span className="text-xs text-[#e50914]">Solved</span>
            </div>
            <span className="text-[10px] text-slate-500">LeetCode & Codeforces</span>
          </div>

          <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl space-y-1">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">PROJECTS DEPLOYED</span>
            <div className="text-2xl font-black text-white font-mono flex items-center gap-1">
              {projects.length || '25'}+ <span className="text-xs text-emerald-400">Live</span>
            </div>
            <span className="text-[10px] text-slate-500">Full Stack & AI Apps</span>
          </div>

          <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl space-y-1">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">DEGREE & ACADEMICS</span>
            <div className="text-xl font-black text-white font-mono">
              B.Tech AI/ML
            </div>
            <span className="text-[10px] text-slate-500">GLA University</span>
          </div>

          <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl space-y-1">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">AVAILABILITY</span>
            <div className="text-xs font-bold text-emerald-400 flex items-center gap-1.5 pt-1 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span> OPEN FOR SDE
            </div>
            <span className="text-[10px] text-slate-500">Fulltime & Internship</span>
          </div>
        </section>

        {/* PROJECTS SHOWCASE */}
        {projects && projects.length > 0 && (
          <section id="projects" className="space-y-6">
            <div className="border-b border-white/10 pb-4">
              <span className="text-xs font-mono font-bold text-[#e50914] uppercase tracking-widest">FEATURED WORK</span>
              <h2 className="text-3xl font-black text-white flex items-center gap-2">
                <Code2 className="w-6 h-6 text-[#e50914]" /> Software & AI Projects
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((proj) => (
                <div
                  key={proj.id}
                  className="p-7 bg-[#0c0c0e] border border-white/10 hover:border-[#e50914]/80 rounded-3xl space-y-5 transition duration-300 group hover:shadow-2xl hover:shadow-[#e50914]/10 transform hover:-translate-y-1"
                >
                  <div className="flex justify-between items-start">
                    <h3 className="font-black text-white text-lg group-hover:text-[#e50914] transition">{proj.name}</h3>
                    {proj.liveUrl && (
                      <a
                        href={proj.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 bg-white/5 text-[#e50914] hover:bg-[#e50914] hover:text-white rounded-xl transition"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed font-light">{proj.description}</p>

                  {proj.technologies && proj.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-2 border-t border-white/5">
                      {proj.technologies.map((tech, i) => (
                        <span key={i} className="text-[10px] font-mono font-bold bg-white/5 text-slate-300 px-3 py-1 rounded-lg border border-white/10">
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

        {/* TECHNICAL STACK MATRIX */}
        {skills && skills.length > 0 && (
          <section id="skills" className="space-y-6">
            <div className="border-b border-white/10 pb-4">
              <span className="text-xs font-mono font-bold text-[#e50914] uppercase tracking-widest">SKILLS MATRIX</span>
              <h2 className="text-3xl font-black text-white flex items-center gap-2">
                <Cpu className="w-6 h-6 text-[#e50914]" /> Technical Skills & Tools
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {skills.map((grp) => (
                <div key={grp.id} className="p-6 bg-[#0c0c0e] border border-white/10 rounded-3xl space-y-4 hover:border-slate-700 transition">
                  <h3 className="text-xs font-bold font-mono text-[#e50914] uppercase tracking-wider border-b border-white/10 pb-2 flex items-center justify-between">
                    {grp.category} <ChevronRight className="w-4 h-4 text-slate-600" />
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {grp.skills.map((sk, idx) => (
                      <span key={idx} className="text-xs font-mono bg-white/5 text-slate-200 px-3 py-1 rounded-xl border border-white/10">
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* INTERACTIVE CLI TERMINAL WIDGET */}
        <section id="terminal" className="space-y-6">
          <div className="border-b border-white/10 pb-4">
            <span className="text-xs font-mono font-bold text-[#e50914] uppercase tracking-widest">INTERACTIVE SHELL</span>
            <h2 className="text-3xl font-black text-white flex items-center gap-2">
              <TerminalIcon className="w-6 h-6 text-[#e50914]" /> Developer CLI Terminal
            </h2>
          </div>

          <div className="mx-auto max-w-4xl overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0c] shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.03] px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
                <span className="h-3 w-3 rounded-full bg-[#28c840]" />
                <span className="ml-3 font-mono text-xs text-slate-400 flex items-center gap-1.5">
                  <TerminalIcon className="h-3.5 w-3.5 text-[#e50914]" /> {personal.name?.toLowerCase().replace(/\s+/g, '') || 'user'}@portfolio — zsh
                </span>
              </div>
              <span className="text-[10px] font-mono text-slate-500 uppercase">Interactive Terminal</span>
            </div>

            <div className="h-[300px] overflow-y-auto p-4 font-mono text-xs sm:text-sm leading-relaxed space-y-2">
              {termHistory.map((item, idx) => (
                <div key={idx}>
                  {item.type === 'input' ? (
                    <div className="flex items-center gap-2 text-white">
                      <span className="text-[#e50914]">➜</span>
                      <span className="text-cyan-400">~</span>
                      <span>{item.text}</span>
                    </div>
                  ) : (
                    <div className="whitespace-pre-wrap text-slate-300">
                      {item.text}
                    </div>
                  )}
                </div>
              ))}
              <div ref={termBottomRef} />

              <form onSubmit={handleTerminalSubmit} className="mt-2 flex items-center gap-2">
                <span className="text-[#e50914]">➜</span>
                <span className="text-cyan-400">~</span>
                <input
                  type="text"
                  value={termInput}
                  onChange={(e) => setTermInput(e.target.value)}
                  placeholder="type 'help'..."
                  spellCheck="false"
                  autoComplete="off"
                  className="flex-1 bg-transparent text-white caret-[#e50914] outline-none placeholder:text-slate-600"
                />
              </form>
            </div>
          </div>
        </section>

        {/* WORK EXPERIENCE */}
        {experience && experience.length > 0 && (
          <section id="experience" className="space-y-6">
            <div className="border-b border-white/10 pb-4">
              <span className="text-xs font-mono font-bold text-[#e50914] uppercase tracking-widest">TIMELINE</span>
              <h2 className="text-3xl font-black text-white flex items-center gap-2">
                <Briefcase className="w-6 h-6 text-[#e50914]" /> Experience & Engineering Roles
              </h2>
            </div>

            <div className="space-y-4">
              {experience.map((exp) => (
                <div key={exp.id} className="p-6 bg-[#0c0c0e] border border-white/10 rounded-3xl space-y-3">
                  <div className="flex flex-wrap justify-between items-center gap-2">
                    <div>
                      <h3 className="font-black text-white text-base">{exp.role}</h3>
                      <p className="text-xs text-[#e50914] font-mono font-bold">{exp.company} • {exp.location || 'Remote'}</p>
                    </div>
                    <span className="text-[11px] font-mono bg-[#e50914]/10 text-[#e50914] px-3 py-1 rounded-full border border-[#e50914]/30 font-bold">
                      {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  {exp.description && <p className="text-xs text-slate-300 leading-relaxed font-light">{exp.description}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* EDUCATION & DEGREES */}
        {education && education.length > 0 && (
          <section id="education" className="space-y-6">
            <div className="border-b border-white/10 pb-4">
              <span className="text-xs font-mono font-bold text-[#e50914] uppercase tracking-widest">ACADEMICS</span>
              <h2 className="text-3xl font-black text-white flex items-center gap-2">
                <GraduationCap className="w-6 h-6 text-[#e50914]" /> Education & Qualifications
              </h2>
            </div>

            <div className="space-y-4">
              {education.map((edu) => (
                <div key={edu.id} className="p-6 bg-[#0c0c0e] border border-white/10 rounded-3xl flex flex-wrap justify-between items-center gap-4">
                  <div>
                    <h3 className="font-black text-white text-base">{edu.degree}</h3>
                    <p className="text-xs text-slate-400 font-mono">{edu.institution} • {edu.field}</p>
                  </div>
                  {edu.gpa && (
                    <span className="px-3.5 py-1 bg-[#e50914]/15 text-[#e50914] border border-[#e50914]/30 rounded-full text-xs font-mono font-bold">
                      GPA {edu.gpa}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* FOOTER */}
        <footer className="pt-12 border-t border-white/10 text-center text-xs text-slate-500 font-mono space-y-3">
          <div className="flex justify-center gap-4 text-slate-400">
            {personal.socials?.github && <a href={personal.socials.github} target="_blank" rel="noopener noreferrer" className="hover:text-[#e50914]">GitHub</a>}
            {personal.socials?.linkedin && <a href={personal.socials.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-[#e50914]">LinkedIn</a>}
            {personal.email && <a href={`mailto:${personal.email}`} className="hover:text-[#e50914]">Email</a>}
          </div>
          <p>© {new Date().getFullYear()} {personal.name}. Top 1 Premier Flagship Theme.</p>
        </footer>
      </main>

      {/* AI ASSISTANT MODAL */}
      {isAiModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-lg bg-[#0d0d12] border border-[#e50914]/50 rounded-3xl shadow-2xl overflow-hidden flex flex-col h-[520px]">
            {/* Modal Header */}
            <div className="p-4 bg-[#14141d] border-b border-white/10 flex justify-between items-center">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#e50914] text-white flex items-center justify-center font-bold">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">{personal.name}'s AI Assistant</h3>
                  <span className="text-[10px] text-emerald-400 font-mono">ONLINE • Powered by Gemini AI</span>
                </div>
              </div>
              <button
                onClick={() => setIsAiModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Body */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 font-sans text-xs">
              {aiMessages.map((m, idx) => (
                <div
                  key={idx}
                  className={`flex gap-2.5 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {m.role === 'assistant' && (
                    <div className="w-6 h-6 rounded-full bg-[#e50914]/20 border border-[#e50914] text-[#e50914] flex items-center justify-center shrink-0 mt-0.5">
                      <Bot className="w-3.5 h-3.5" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl leading-relaxed ${
                      m.role === 'user'
                        ? 'bg-[#e50914] text-white font-medium rounded-tr-none'
                        : 'bg-[#181820] text-slate-200 border border-white/10 rounded-tl-none'
                    }`}
                  >
                    {m.content}
                  </div>
                  {m.role === 'user' && (
                    <div className="w-6 h-6 rounded-full bg-slate-800 text-slate-300 flex items-center justify-center shrink-0 mt-0.5">
                      <User className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
              ))}
              <div ref={aiBottomRef} />
            </div>

            {/* Input Footer */}
            <form onSubmit={handleAiSubmit} className="p-3 bg-[#14141d] border-t border-white/10 flex gap-2">
              <input
                type="text"
                value={aiInput}
                onChange={(e) => setAiInput(e.target.value)}
                placeholder="Ask about skills, projects, contact info..."
                className="flex-1 px-4 py-2.5 bg-[#0a0a0e] text-white text-xs rounded-xl border border-white/10 outline-none focus:border-[#e50914] placeholder:text-slate-500"
              />
              <button
                type="submit"
                className="px-4 py-2.5 bg-[#e50914] hover:bg-[#ff1e27] text-white font-bold text-xs rounded-xl transition flex items-center justify-center"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
