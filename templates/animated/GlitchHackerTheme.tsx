'use client';

import React from 'react';
import { PortfolioData } from '@/types/portfolio';
import { Terminal, ShieldAlert, ExternalLink, Github, Mail, Activity } from 'lucide-react';

export default function GlitchHackerTheme({ data }: { data: PortfolioData }) {
  const { personal, about, projects, skills } = data;

  return (
    <div className="min-h-screen bg-[#050505] text-[#00ff66] font-mono selection:bg-[#00ff66] selection:text-black p-6 sm:p-12 relative overflow-x-hidden">
      {/* CRT Scanline Overlay Effect */}
      <div className="fixed inset-0 pointer-events-none opacity-20 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px]"></div>

      <div className="max-w-5xl mx-auto space-y-16 relative z-10">
        {/* Terminal Header */}
        <header className="p-8 bg-[#0a0f0d] border border-[#00ff66]/40 rounded-3xl space-y-6 shadow-2xl">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#00ff66]/30 pb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#00ff66] text-black font-black flex items-center justify-center text-xl shadow-lg shadow-[#00ff66]/20">
                <Terminal className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-3xl font-black text-white tracking-widest uppercase animate-pulse">
                  {personal.name}
                </h1>
                <p className="text-xs text-[#00ff66]/80 font-bold mt-1">root@{data.slug || 'hacker'}:~# {personal.title}</p>
              </div>
            </div>

            <span className="px-3.5 py-1.5 bg-[#00ff66]/10 border border-[#00ff66]/40 text-[#00ff66] text-xs rounded-full flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-[#00ff66] animate-ping" /> CRT SCANLINE ACTIVE
            </span>
          </div>

          <p className="text-xs text-[#00ff66]/90 leading-relaxed font-mono">{about.summary}</p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            {personal.email && (
              <a
                href={`mailto:${personal.email}`}
                className="px-5 py-2.5 bg-[#00ff66] hover:bg-emerald-400 text-black font-black text-xs rounded-xl shadow-lg shadow-[#00ff66]/20 transition"
              >
                <Mail className="w-4 h-4 inline mr-1.5" /> EXECUTE CONTACT
              </a>
            )}
            {personal.socials.github && (
              <a
                href={personal.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-[#0f1713] hover:bg-[#15241d] text-[#00ff66] text-xs font-bold rounded-xl border border-[#00ff66]/30 transition"
              >
                <Github className="w-4 h-4 inline mr-1.5" /> REPO PAYLOADS
              </a>
            )}
          </div>
        </header>

        {/* Glitch Projects */}
        {projects && projects.length > 0 && (
          <section className="space-y-6">
            <h2 className="text-xs font-bold text-white uppercase tracking-widest border-b border-[#00ff66]/30 pb-3 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-[#ff0055]" /> [ DEPLOYED EXPLOITS & PROJECTS ]
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((proj) => (
                <div
                  key={proj.id}
                  className="p-6 bg-[#0a0f0d] border border-[#00ff66]/30 hover:border-[#ff0055] rounded-3xl space-y-4 transition duration-300 group hover:shadow-[0_0_15px_#ff0055]"
                >
                  <div className="flex justify-between items-start">
                    <h3 className="font-extrabold text-white text-base group-hover:text-[#ff0055] transition">{proj.name}</h3>
                    {proj.liveUrl && (
                      <a href={proj.liveUrl} target="_blank" rel="noopener noreferrer" className="p-2 text-[#00ff66] hover:text-white rounded-xl transition">
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>

                  <p className="text-xs text-[#00ff66]/80 leading-relaxed font-sans">{proj.description}</p>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {proj.technologies.map((t, i) => (
                      <span key={i} className="text-[10px] bg-[#00ff66]/10 text-[#00ff66] px-2.5 py-0.5 rounded-md border border-[#00ff66]/30">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {skills && skills.length > 0 && (
          <section className="space-y-6">
            <h2 className="text-xs font-bold text-white uppercase tracking-widest border-b border-[#00ff66]/30 pb-3 flex items-center gap-2">
              <Terminal className="w-4 h-4 text-[#00ff66]" /> [ SYSTEM ARSENAL & TOOLCHAIN ]
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {skills.map((cat) => (
                <div key={cat.id} className="p-6 bg-[#0a0f0d] border border-[#00ff66]/30 rounded-3xl space-y-3">
                  <h3 className="text-xs font-bold text-[#00ff66] uppercase">[ {cat.category} ]</h3>
                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map((s, i) => (
                      <span key={i} className="text-xs bg-[#0f1713] text-[#00ff66] px-3 py-1 rounded-lg border border-[#00ff66]/20">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        <footer className="pt-8 border-t border-[#00ff66]/30 text-center text-xs text-[#00ff66]/60">
          © {new Date().getFullYear()} {personal.name} // GLITCH HACKER EDITION
        </footer>
      </div>
    </div>
  );
}
