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
  Bot,
  Search,
  Rocket,
  Quote,
  Trophy,
  CheckCircle,
  Download
} from 'lucide-react';

export default function Top1PremierTheme({ data }: { data: PortfolioData }) {
  const { personal, about, projects, skills, experience, education, certifications, achievements } = data;

  // Terminal CLI state
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

  // Terminal submit handler
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
          text: `guest@${personal.name?.toLowerCase().replace(/\s+/g, '') || 'user'} — SDE Recruiter / Fellow Engineer`
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

  // AI Chat handler
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

  const marqueeItems = [
    'Software Engineering', 'Data Structures & Algorithms', 'Full Stack Development',
    'React.js', 'Node.js', 'Python', 'AI & ML', 'LeetCode Active Solver',
    'MongoDB', 'REST APIs', 'Cloud Computing'
  ];

  const processSteps = [
    { num: '01', title: 'Problem Analysis', desc: 'Deconstruct requirements, identify edge cases, and define clear input/output specifications.', icon: Search },
    { num: '02', title: 'Algorithm & Architecture', desc: 'Select optimal data structures, design clean modular architecture, and plan system flow.', icon: Cpu },
    { num: '03', title: 'Clean Implementation', desc: 'Develop maintainable, production-ready code using React, Node.js, Python, and SQL.', icon: Code2 },
    { num: '04', title: 'Testing & Optimization', desc: 'Perform thorough debugging, test API contracts, and optimize memory and execution runtime.', icon: ShieldCheck },
    { num: '05', title: 'Deployment & Launch', desc: 'Build CI/CD pipelines, deploy to cloud hosts (Vercel/Netlify), and verify live stability.', icon: Rocket },
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-[#ffffff] font-sans selection:bg-[#e50914] selection:text-white relative overflow-x-hidden">
      {/* Dynamic Keyframe Style Injector */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&family=Outfit:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500&display=swap');

        .font-script { font-family: 'Caveat', cursive; }
        .font-display { font-family: 'Outfit', 'Inter', sans-serif; }
        .font-mono { font-family: 'JetBrains Mono', monospace; }

        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          width: max-content;
          animation: marquee 30s linear infinite;
        }
        .animate-marquee:hover { animation-play-state: paused; }

        @keyframes pulseGlow {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.05); }
        }
        .animate-pulse-glow { animation: pulseGlow 4s ease-in-out infinite; }

        .glass-card {
          background: rgba(255, 255, 255, 0.025);
          border: 1px solid rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-radius: 1.25rem;
        }
        .glass-card:hover {
          border-color: rgba(229, 9, 20, 0.45);
        }

        .mask-fade-x {
          mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
        }
      `}</style>

      {/* Watermark Background Text */}
      <div className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none opacity-[0.03] z-0">
        <span className="font-display text-[26vw] font-bold tracking-tighter text-white uppercase">
          {personal.name?.split(' ')[0] || 'FLAGSHIP'}
        </span>
      </div>

      {/* Background Red Ambient Glow Halos */}
      <div className="pointer-events-none fixed top-1/4 left-1/2 -translate-x-1/2 h-[500px] w-[500px] rounded-full bg-[#e50914]/20 blur-[160px] animate-pulse-glow z-0" />
      <div className="pointer-events-none fixed bottom-10 right-10 h-[450px] w-[450px] rounded-full bg-purple-600/10 blur-[180px] z-0" />

      {/* Sticky Header Navigation */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#050505]/90 backdrop-blur-md px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="h-2.5 w-2.5 rounded-full bg-[#e50914] animate-ping" />
            <span className="font-display font-extrabold text-white text-base tracking-tight">{personal.name}</span>
            <span className="hidden sm:inline-block px-3 py-1 bg-[#e50914]/20 border border-[#e50914]/50 text-[#e50914] text-[10px] font-mono font-bold rounded-full">
              👑 TOP 1 PREMIER
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsAiModalOpen(true)}
              className="px-4 py-2 bg-[#e50914] hover:bg-[#ff1f2d] text-white text-xs font-bold rounded-full shadow-lg shadow-[#e50914]/30 flex items-center gap-1.5 transition transform hover:scale-105"
            >
              <Bot className="w-4 h-4" /> Ask AI Assistant
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12 space-y-24 relative z-10">

        {/* HERO SECTION */}
        <section id="top" className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center pt-6">
          <div className="flex flex-col items-start space-y-6">
            
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#e50914]/10 border border-[#e50914]/30 text-[#e50914] text-xs font-mono font-bold">
              <span className="h-2 w-2 rounded-full bg-[#e50914] animate-ping" />
              <span>Available for SDE Roles & Internships 2026</span>
            </div>

            <p className="font-script text-3xl sm:text-4xl text-[#e50914] font-medium">
              Hello, I'm {personal.name} 👋
            </p>

            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight text-white">
              Building software with <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff3b47] via-[#e50914] to-[#990000]">precision</span> & AI intelligence
            </h1>

            <p className="text-base sm:text-lg text-white/60 leading-relaxed max-w-xl font-light">
              {about.summary}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#projects"
                className="group inline-flex items-center gap-2 rounded-full bg-[#e50914] px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#e50914]/30 transition-all duration-300 hover:bg-[#ff1f2d] hover:scale-105"
              >
                Explore Projects <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              {personal.email && (
                <a
                  href={`mailto:${personal.email}`}
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:border-white/40 hover:bg-white/10"
                >
                  <Mail className="h-4 w-4 text-[#e50914]" /> Contact Me
                </a>
              )}
            </div>

            {/* Social Connect Bar */}
            <div className="mt-8 flex items-center gap-6 pt-6 border-t border-white/10 w-full max-w-lg">
              <span className="text-xs uppercase tracking-widest font-semibold text-white/40">Connect</span>
              <div className="flex items-center gap-3">
                {personal.socials?.github && (
                  <a
                    href={personal.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.02] text-white/70 transition-all hover:border-[#e50914] hover:bg-[#e50914]/10 hover:text-white"
                  >
                    <Github className="h-5 w-5" />
                  </a>
                )}
                {personal.socials?.linkedin && (
                  <a
                    href={personal.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.02] text-white/70 transition-all hover:border-[#e50914] hover:bg-[#e50914]/10 hover:text-white"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                )}
              </div>

              <div className="ml-auto flex items-center gap-1.5 text-xs text-white/50">
                <MapPin className="h-3.5 w-3.5 text-[#e50914]" /> {personal.location || 'Mathura, India'}
              </div>
            </div>

          </div>

          {/* Right Executive Portrait Card */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md">
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-[#e50914] via-red-500 to-[#990000] opacity-40 blur-xl animate-pulse-glow" />
              <div className="glass-card relative overflow-hidden rounded-3xl p-3 border border-white/15 shadow-2xl">
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-zinc-900">
                  <img
                    src={personal.avatarUrl || 'https://avatars.githubusercontent.com/u/231909239?v=4'}
                    alt={personal.name}
                    className="h-full w-full object-cover object-top transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-4 left-4 right-4 rounded-xl border border-white/10 bg-[#050505]/80 p-4 backdrop-blur-md flex items-center justify-between">
                    <div>
                      <p className="font-display text-lg font-bold text-white">{personal.name}</p>
                      <p className="text-xs text-white/60">{personal.title || 'B.Tech AI & ML Undergraduate'}</p>
                    </div>
                    <span className="grid h-10 w-10 place-items-center rounded-full bg-[#e50914]/20 text-[#e50914] border border-[#e50914]/30">
                      <Sparkles className="h-5 w-5" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* STATS OVERVIEW COUNTER GRID */}
        <section className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 glass-card shadow-xl">
          <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl space-y-1">
            <span className="text-[10px] font-mono text-white/50 uppercase tracking-widest">DS & ALGORITHMS</span>
            <div className="text-2xl font-black text-white font-mono flex items-center gap-1">
              500+ <span className="text-xs text-[#e50914]">Solved</span>
            </div>
            <span className="text-[10px] text-white/40">LeetCode & Codeforces</span>
          </div>

          <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl space-y-1">
            <span className="text-[10px] font-mono text-white/50 uppercase tracking-widest">PROJECTS DEPLOYED</span>
            <div className="text-2xl font-black text-white font-mono flex items-center gap-1">
              {projects.length || '25'}+ <span className="text-xs text-emerald-400">Live</span>
            </div>
            <span className="text-[10px] text-white/40">Full Stack & AI Apps</span>
          </div>

          <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl space-y-1">
            <span className="text-[10px] font-mono text-white/50 uppercase tracking-widest">DEGREE & ACADEMICS</span>
            <div className="text-xl font-black text-white font-mono">
              B.Tech AI/ML
            </div>
            <span className="text-[10px] text-white/40">GLA University</span>
          </div>

          <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl space-y-1">
            <span className="text-[10px] font-mono text-white/50 uppercase tracking-widest">AVAILABILITY</span>
            <div className="text-xs font-bold text-emerald-400 flex items-center gap-1.5 pt-1 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span> OPEN FOR SDE
            </div>
            <span className="text-[10px] text-white/40">Fulltime & Internship</span>
          </div>
        </section>

        {/* TECH STACK & INFINITE MARQUEE TICKER */}
        {skills && skills.length > 0 && (
          <section id="tech" className="space-y-8">
            <div>
              <div className="eyebrow flex items-center gap-2">
                <span className="h-px w-8 bg-[#e50914]" /> Tech Stack
              </div>
              <h2 className="mt-4 font-display text-4xl sm:text-5xl font-bold tracking-tight text-white">
                Tools & technologies I build with.
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {skills.map((cat, idx) => (
                <div
                  key={idx}
                  className="group glass-card relative overflow-hidden p-6 transition-all duration-300 hover:border-[#e50914]/40"
                >
                  <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-[#e50914]/15 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="mb-4 flex items-center gap-3">
                    <span className="h-8 w-1 rounded-full bg-gradient-to-b from-[#e50914] to-[#990000]" />
                    <h3 className="font-display text-lg font-bold text-white">{cat.category}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="rounded-lg border border-white/[0.06] bg-white/[0.02] px-2.5 py-1.5 text-xs text-white/70 font-mono transition-colors group-hover:border-white/10 group-hover:text-white"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Animated Infinite Horizontal Marquee */}
            <div className="mt-12 overflow-hidden mask-fade-x py-4">
              <div className="flex animate-marquee py-3">
                {[...marqueeItems, ...marqueeItems].map((item, idx) => (
                  <span key={idx} className="flex items-center gap-6 whitespace-nowrap px-4">
                    <span className="font-display text-2xl font-bold uppercase tracking-tight text-white/20 sm:text-4xl">
                      {item}
                    </span>
                    <span className="text-[#e50914] text-xl">✦</span>
                  </span>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* SOFTWARE DEVELOPMENT PROCESS */}
        <section id="process" className="space-y-8">
          <div>
            <div className="eyebrow flex items-center gap-2">
              <span className="h-px w-8 bg-[#e50914]" /> How I Work
            </div>
            <h2 className="mt-4 font-display text-4xl sm:text-5xl font-bold tracking-tight text-white">
              Software Development Process
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.55fr_1fr]">
            <div className="relative">
              <div className="absolute left-[27px] top-4 h-[calc(100%-2rem)] w-px bg-gradient-to-b from-[#e50914] via-white/10 to-transparent" />
              <div className="space-y-3">
                {processSteps.map((step, idx) => {
                  const IconComp = step.icon;
                  return (
                    <div key={idx} className="group flex items-start gap-5 rounded-2xl p-3 transition-colors hover:bg-white/[0.02]">
                      <span className="relative z-10 grid h-14 w-14 shrink-0 place-items-center rounded-full border border-white/10 bg-[#0c0c0e] text-[#e50914] transition-all duration-300 group-hover:border-[#e50914] group-hover:shadow-lg group-hover:shadow-[#e50914]/20">
                        <IconComp className="h-5 w-5" />
                      </span>
                      <div className="pt-1.5">
                        <div className="flex items-center gap-3">
                          <span className="font-display text-sm font-bold text-[#e50914]">{step.num}</span>
                          <h3 className="font-display text-lg font-bold uppercase tracking-wide text-white">{step.title}</h3>
                        </div>
                        <p className="mt-1 max-w-md text-sm leading-relaxed text-white/50">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div>
              <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-3xl bg-gradient-to-br from-[#990000] via-[#70040a] to-[#400206] p-8 shadow-2xl shadow-[#e50914]/20">
                <Quote className="h-16 w-16 text-white/20" />
                <p className="mt-4 font-display text-2xl font-bold leading-snug text-white sm:text-3xl">
                  “Clean code and optimal algorithms aren't just details — they are the foundation of great software.”
                </p>
                <div className="mt-8">
                  <p className="font-script text-3xl text-white">{personal.name}</p>
                  <p className="mt-2 text-xs font-mono uppercase tracking-[0.2em] text-white/70">
                    Software Development Engineer Aspirant
                  </p>
                  <span className="mt-3 inline-block text-2xl text-white/80">✦</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PROJECTS SHOWCASE */}
        {projects && projects.length > 0 && (
          <section id="projects" className="space-y-8">
            <div>
              <div className="eyebrow flex items-center gap-2">
                <span className="h-px w-8 bg-[#e50914]" /> Portfolio Work
              </div>
              <h2 className="mt-4 font-display text-4xl sm:text-5xl font-bold tracking-tight text-white">
                Featured Software Projects
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((proj) => (
                <div
                  key={proj.id}
                  className="glass-card p-7 space-y-5 transition duration-300 group hover:border-[#e50914]/60 hover:-translate-y-1"
                >
                  <div className="flex justify-between items-start">
                    <h3 className="font-display font-bold text-white text-xl group-hover:text-[#e50914] transition">{proj.name}</h3>
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

                  <p className="text-xs text-white/70 leading-relaxed font-light">{proj.description}</p>

                  {proj.technologies && proj.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-2 border-t border-white/5">
                      {proj.technologies.map((tech, i) => (
                        <span key={i} className="text-[10px] font-mono font-bold bg-white/5 text-white/80 px-3 py-1 rounded-lg border border-white/10">
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

        {/* INTERACTIVE CLI TERMINAL */}
        <section id="terminal" className="space-y-6">
          <div>
            <div className="eyebrow flex items-center gap-2">
              <span className="h-px w-8 bg-[#e50914]" /> Interactive Shell
            </div>
            <h2 className="mt-4 font-display text-4xl sm:text-5xl font-bold tracking-tight text-white">
              Developer CLI Terminal
            </h2>
          </div>

          <div className="mx-auto max-w-4xl overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0c] shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.03] px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
                <span className="h-3 w-3 rounded-full bg-[#28c840]" />
                <span className="ml-3 font-mono text-xs text-white/50 flex items-center gap-1.5">
                  <TerminalIcon className="h-3.5 w-3.5 text-[#e50914]" /> {personal.name?.toLowerCase().replace(/\s+/g, '') || 'user'}@portfolio — zsh
                </span>
              </div>
              <span className="text-[10px] font-mono text-white/30 uppercase">Interactive Terminal</span>
            </div>

            <div className="h-[300px] overflow-y-auto p-4 font-mono text-xs sm:text-sm leading-relaxed space-y-2">
              {termHistory.map((item, idx) => (
                <div key={idx}>
                  {item.type === 'input' ? (
                    <div className="flex items-center gap-2 text-white">
                      <span className="text-[#e50914]">➜</span>
                      <span className="text-sky-400">~</span>
                      <span>{item.text}</span>
                    </div>
                  ) : (
                    <div className="whitespace-pre-wrap text-white/70">
                      {item.text}
                    </div>
                  )}
                </div>
              ))}
              <div ref={termBottomRef} />

              <form onSubmit={handleTerminalSubmit} className="mt-2 flex items-center gap-2">
                <span className="text-[#e50914]">➜</span>
                <span className="text-sky-400">~</span>
                <input
                  type="text"
                  value={termInput}
                  onChange={(e) => setTermInput(e.target.value)}
                  placeholder="type 'help'..."
                  spellCheck="false"
                  autoComplete="off"
                  className="flex-1 bg-transparent text-white caret-[#e50914] outline-none placeholder:text-white/20"
                />
              </form>
            </div>
          </div>
        </section>

        {/* WORK EXPERIENCE */}
        {experience && experience.length > 0 && (
          <section id="experience" className="space-y-8">
            <div>
              <div className="eyebrow flex items-center gap-2">
                <span className="h-px w-8 bg-[#e50914]" /> Career Timeline
              </div>
              <h2 className="mt-4 font-display text-4xl sm:text-5xl font-bold tracking-tight text-white">
                Engineering Experience
              </h2>
            </div>

            <div className="space-y-4">
              {experience.map((exp) => (
                <div key={exp.id} className="glass-card p-6 space-y-3">
                  <div className="flex flex-wrap justify-between items-center gap-2">
                    <div>
                      <h3 className="font-display font-bold text-white text-lg">{exp.role}</h3>
                      <p className="text-xs text-[#e50914] font-mono font-semibold">{exp.company} • {exp.location || 'Remote'}</p>
                    </div>
                    <span className="text-xs font-mono bg-[#e50914]/10 text-[#e50914] px-3.5 py-1 rounded-full border border-[#e50914]/30 font-bold">
                      {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  {exp.description && <p className="text-xs text-white/70 leading-relaxed font-light">{exp.description}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* EDUCATION & CREDENTIALS */}
        {education && education.length > 0 && (
          <section id="education" className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <div className="eyebrow flex items-center gap-2">
                  <span className="h-px w-8 bg-[#e50914]" /> Academics
                </div>
                <h2 className="mt-4 font-display text-4xl font-bold text-white">Education</h2>
              </div>

              {education.map((edu) => (
                <div key={edu.id} className="glass-card p-7 space-y-4">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="h-6 w-6 text-[#e50914]" />
                    <h3 className="font-display text-2xl font-bold text-white">{edu.institution}</h3>
                  </div>
                  <p className="text-sm text-white/70">{edu.degree} in {edu.field}</p>
                  {edu.gpa && (
                    <div className="inline-flex items-center gap-2 rounded-lg border border-[#e50914]/30 bg-[#e50914]/10 px-3.5 py-1.5 text-sm font-semibold text-[#e50914]">
                      Cumulative CGPA: {edu.gpa}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="space-y-6">
              <div>
                <div className="eyebrow flex items-center gap-2">
                  <span className="h-px w-8 bg-[#e50914]" /> Competencies
                </div>
                <h2 className="mt-4 font-display text-4xl font-bold text-white">Key Skills</h2>
              </div>

              <div className="glass-card p-7 space-y-4">
                <h3 className="font-display text-lg font-bold text-white">Driven by clean architecture & performance.</h3>
                <p className="text-sm leading-relaxed text-white/60">
                  Continuously deepening knowledge in Data Structures, Algorithms, system design, and AI integrations. I focus on writing performant code and delivering full-stack solutions.
                </p>
              </div>
            </div>
          </section>
        )}

        {/* FOOTER */}
        <footer className="pt-12 border-t border-white/10 text-center text-xs text-white/50 font-mono space-y-3">
          <div className="flex justify-center gap-6 text-white/70">
            {personal.socials?.github && <a href={personal.socials.github} target="_blank" rel="noopener noreferrer" className="hover:text-[#e50914]">GitHub</a>}
            {personal.socials?.linkedin && <a href={personal.socials.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-[#e50914]">LinkedIn</a>}
            {personal.email && <a href={`mailto:${personal.email}`} className="hover:text-[#e50914]">Email</a>}
          </div>
          <p>© {new Date().getFullYear()} {personal.name}. Top 1 Premier Flagship Portfolio.</p>
        </footer>

      </main>

      {/* AI CHAT ASSISTANT MODAL */}
      {isAiModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-lg bg-[#0d0d12] border border-[#e50914]/50 rounded-3xl shadow-2xl overflow-hidden flex flex-col h-[520px]">
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
                className="p-1.5 text-white/40 hover:text-white rounded-lg transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

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

            <form onSubmit={handleAiSubmit} className="p-3 bg-[#14141d] border-t border-white/10 flex gap-2">
              <input
                type="text"
                value={aiInput}
                onChange={(e) => setAiInput(e.target.value)}
                placeholder="Ask about skills, projects, contact info..."
                className="flex-1 px-4 py-2.5 bg-[#0a0a0e] text-white text-xs rounded-xl border border-white/10 outline-none focus:border-[#e50914] placeholder:text-white/30"
              />
              <button
                type="submit"
                className="px-4 py-2.5 bg-[#e50914] hover:bg-[#ff1f2d] text-white font-bold text-xs rounded-xl transition flex items-center justify-center"
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
