'use client';

import React from 'react';
import { PortfolioData } from '@/types/portfolio';
import { ShieldAlert, Terminal, Lock, ExternalLink, Github, Linkedin, Mail, CheckCircle2, Shield } from 'lucide-react';

export default function CyberSentinelTheme({ data }: { data: PortfolioData }) {
  const { personal, about, projects, skills } = data;

  return (
    <div className="min-h-screen bg-[#060a08] text-emerald-400 font-mono selection:bg-emerald-500 selection:text-black p-6 sm:p-12 relative overflow-x-hidden">
      {/* Background Matrix Glow */}
      <div className="fixed top-0 left-1/3 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[180px] pointer-events-none"></div>

      <div className="max-w-5xl mx-auto space-y-16 relative z-10">
        {/* Security Sentinel Header */}
        <header className="p-8 bg-[#0b120f] border border-emerald-500/40 rounded-3xl space-y-6 shadow-2xl">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-emerald-900/50 pb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-black font-black flex items-center justify-center text-xl shadow-lg shadow-emerald-500/20">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl font-black text-white">{personal.name}</h1>
                <span className="text-xs text-emerald-400 font-semibold">{personal.title}</span>
              </div>
            </div>

            <span className="px-3 py-1 bg-emerald-950 text-emerald-300 border border-emerald-800 text-xs rounded-full flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-emerald-400" /> Cybersecurity & Ethical Hacking
            </span>
          </div>

          <p className="text-xs text-emerald-200/80 leading-relaxed font-sans">{about.summary}</p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            {personal.email && (
              <a
                href={`mailto:${personal.email}`}
                className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs rounded-xl shadow-lg flex items-center gap-1.5 transition"
              >
                <Mail className="w-4 h-4" /> Secure Transmission
              </a>
            )}
            {personal.socials.github && (
              <a
                href={personal.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-[#121c17] hover:bg-[#18261f] text-emerald-200 text-xs font-medium rounded-xl border border-emerald-900/60 flex items-center gap-1.5 transition"
              >
                <Github className="w-4 h-4 text-emerald-400" /> Exploits & GitHub
              </a>
            )}
          </div>
        </header>

        {/* Security Audit Projects */}
        {projects && projects.length > 0 && (
          <section className="space-y-6">
            <h2 className="text-xl font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Lock className="w-5 h-5 text-emerald-400" /> Penetration Testing & Security Tools
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((proj) => (
                <div
                  key={proj.id}
                  className="p-6 bg-[#0b120f] border border-emerald-900/60 hover:border-emerald-500 rounded-3xl space-y-4 transition duration-300 group hover:shadow-xl hover:shadow-emerald-500/10"
                >
                  <div className="flex justify-between items-start">
                    <h3 className="font-extrabold text-white text-base group-hover:text-emerald-400 transition">{proj.name}</h3>
                    {proj.liveUrl && (
                      <a
                        href={proj.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-emerald-400 hover:text-white rounded-xl transition"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>

                  <p className="text-xs text-emerald-200/80 leading-relaxed font-sans">{proj.description}</p>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {proj.technologies.map((t, i) => (
                      <span key={i} className="text-[10px] bg-emerald-950/80 text-emerald-300 px-2.5 py-0.5 rounded-lg border border-emerald-800">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Security Arsenal */}
        {skills && skills.length > 0 && (
          <section className="space-y-6">
            <h2 className="text-xl font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Terminal className="w-5 h-5 text-emerald-400" /> Security Arsenal & Tools
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {skills.map((cat) => (
                <div key={cat.id} className="p-6 bg-[#0b120f] border border-emerald-900/60 rounded-3xl space-y-3">
                  <h3 className="text-xs font-bold text-emerald-400 uppercase">[ {cat.category} ]</h3>
                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map((s, i) => (
                      <span key={i} className="text-xs bg-[#121c17] text-emerald-200 px-3 py-1 rounded-xl border border-emerald-900/50">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        <footer className="pt-8 border-t border-emerald-900/40 text-center text-xs text-emerald-500/70">
          © {new Date().getFullYear()} {personal.name}. Powered by Portify AI Cyber Sentinel Engine.
        </footer>
      </div>
    </div>
  );
}
