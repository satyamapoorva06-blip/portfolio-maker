'use client';

import React, { useState } from 'react';
import { PortfolioData } from '@/types/portfolio';
import { Terminal, Shield, Cpu, Code2, ExternalLink, Github, Linkedin, Mail, Zap } from 'lucide-react';

export default function CyberMatrixTheme({ data }: { data: PortfolioData }) {
  const { personal, about, projects, skills, experience } = data;
  const [activeTab, setActiveTab] = useState<'all' | 'system' | 'projects'>('all');

  return (
    <div className="min-h-screen bg-[#070a0d] text-[#00ff66] font-mono selection:bg-[#00ff66] selection:text-black p-6 sm:p-12 relative overflow-x-hidden">
      {/* Background Matrix Glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#00ff66]/5 rounded-full blur-[180px] pointer-events-none"></div>

      <div className="max-w-5xl mx-auto space-y-12 relative z-10">
        {/* Terminal Header Window */}
        <header className="bg-[#0b1017] border border-[#00ff66]/40 rounded-2xl p-6 shadow-2xl space-y-6">
          <div className="flex items-center justify-between border-b border-[#00ff66]/20 pb-4">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500"></span>
              <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
              <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
              <span className="text-xs text-[#00ff66]/70 ml-2 font-mono">user@{data.slug || 'developer'}:~</span>
            </div>

            <div className="flex items-center gap-2 text-xs font-bold text-[#00ff66] bg-[#00ff66]/10 px-3 py-1 rounded-md border border-[#00ff66]/30">
              <Shield className="w-3.5 h-3.5" /> SYSTEM ENCRYPTED // ONLINE
            </div>
          </div>

          {/* ASCII Banner & Info */}
          <div className="space-y-4">
            <div className="text-xs text-[#00ff66]/80 leading-relaxed font-mono">
              <pre className="text-[9px] sm:text-xs text-[#00ff66] leading-none select-none overflow-x-auto">
{`
 _____   ____   _____  _______ _____ _____ __   __
|  __ \\ / __ \\ |  __ \\|__   __|_   _/ ____|\\ \\ / /
| |__) | |  | || |__) |  | |    | || |      \\ V / 
|  ___/| |  | ||  _  /   | |    | || |       > <  
| |    | |__| || | \\ \\   | |   _| || |____  / . \\ 
|_|     \\____/ |_|  \\_\\  |_|  |_____\\_____|/_/ \\_\\
`}
              </pre>
            </div>

            <div className="space-y-2 pt-2">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white uppercase tracking-tight">
                {personal.name} <span className="text-[#00ff66] text-sm">[{personal.title}]</span>
              </h1>
              <p className="text-xs text-[#00ff66]/80 leading-relaxed max-w-3xl">{about.summary}</p>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              {personal.socials.github && (
                <a
                  href={personal.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 bg-[#00ff66]/10 hover:bg-[#00ff66] hover:text-black text-[#00ff66] border border-[#00ff66]/50 text-xs font-bold rounded-lg transition flex items-center gap-1.5"
                >
                  <Github className="w-4 h-4" /> GITHUB_TERMINAL
                </a>
              )}
              {personal.email && (
                <a
                  href={`mailto:${personal.email}`}
                  className="px-3.5 py-1.5 bg-[#00ff66]/10 hover:bg-[#00ff66] hover:text-black text-[#00ff66] border border-[#00ff66]/50 text-xs font-bold rounded-lg transition flex items-center gap-1.5"
                >
                  <Mail className="w-4 h-4" /> SEND_TRANSMISSION
                </a>
              )}
            </div>
          </div>
        </header>

        {/* Live Command Line Prompt Showcase */}
        <section className="bg-[#0b1017] border border-[#00ff66]/30 rounded-2xl p-4 text-xs space-y-2">
          <div className="flex items-center gap-2 text-zinc-400">
            <Terminal className="w-4 h-4 text-[#00ff66]" />
            <span>sys_status --info</span>
          </div>
          <div className="text-emerald-400 font-mono space-y-1">
            <p>&gt; Target: {personal.name}</p>
            <p>&gt; Location: {personal.location}</p>
            <p>&gt; Status: AVAILABLE FOR HIGH-IMPACT SDE & AI ROLES</p>
          </div>
        </section>

        {/* Matrix Project Grid */}
        {projects && projects.length > 0 && (
          <section className="space-y-6">
            <h2 className="text-xl font-bold text-white uppercase tracking-wider flex items-center gap-2 border-b border-[#00ff66]/30 pb-3">
              <Code2 className="w-5 h-5 text-[#00ff66]" /> // REPOSITORIES_AND_PAYLOADS
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((proj) => (
                <div
                  key={proj.id}
                  className="bg-[#0b1017] border border-[#00ff66]/30 hover:border-[#00ff66] p-6 rounded-2xl space-y-4 transition duration-300 group hover:shadow-xl hover:shadow-[#00ff66]/10"
                >
                  <div className="flex justify-between items-start">
                    <h3 className="font-extrabold text-white text-base group-hover:text-[#00ff66] transition">{proj.name}</h3>
                    {proj.liveUrl && (
                      <a
                        href={proj.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 text-[#00ff66] hover:bg-[#00ff66]/20 rounded-md transition"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>

                  <p className="text-xs text-zinc-300 leading-relaxed font-sans">{proj.description}</p>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {proj.technologies.map((t, idx) => (
                      <span key={idx} className="text-[10px] bg-[#00ff66]/10 text-[#00ff66] border border-[#00ff66]/30 px-2.5 py-0.5 rounded">
                        [{t}]
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Tech Ecosystem Matrix */}
        {skills && skills.length > 0 && (
          <section className="space-y-6">
            <h2 className="text-xl font-bold text-white uppercase tracking-wider flex items-center gap-2 border-b border-[#00ff66]/30 pb-3">
              <Cpu className="w-5 h-5 text-[#00ff66]" /> // CORE_MODULES_AND_SKILLS
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {skills.map((cat) => (
                <div key={cat.id} className="bg-[#0b1017] border border-[#00ff66]/30 p-5 rounded-2xl space-y-3">
                  <h3 className="text-xs font-bold text-[#00ff66] uppercase tracking-wider">[ {cat.category} ]</h3>
                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map((s, idx) => (
                      <span key={idx} className="text-xs bg-[#070a0d] text-emerald-300 border border-[#00ff66]/20 px-3 py-1 rounded-md">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Footer */}
        <footer className="pt-8 border-t border-[#00ff66]/20 text-center text-xs text-[#00ff66]/60">
          © {new Date().getFullYear()} {personal.name} // PORTIFY_AI_MATRIX_THEME
        </footer>
      </div>
    </div>
  );
}
