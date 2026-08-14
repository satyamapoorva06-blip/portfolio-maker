'use client';

import React from 'react';
import { PortfolioData } from '@/types/portfolio';
import { Radio, ExternalLink, Github, Mail, Zap } from 'lucide-react';

export default function SynthwaveRetroTheme({ data }: { data: PortfolioData }) {
  const { personal, about, projects, skills } = data;

  return (
    <div className="min-h-screen bg-[#0d021a] text-slate-100 font-mono p-6 sm:p-12 relative overflow-x-hidden">
      {/* Retro 80s Synthwave Grid Floor FX */}
      <div className="fixed inset-0 pointer-events-none opacity-20 bg-[radial-gradient(#f43f5e_1px,transparent_1px)] [background-size:24px_24px]"></div>
      <div className="fixed bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[#f43f5e]/20 via-[#7e22ce]/10 to-transparent pointer-events-none"></div>

      <div className="max-w-5xl mx-auto space-y-16 relative z-10">
        <header className="p-8 bg-[#180530]/90 border border-[#f43f5e]/40 rounded-3xl space-y-6 shadow-[0_0_30px_#7e22ce]">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#f43f5e]/30 pb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#f97316] via-[#f43f5e] to-[#7e22ce] text-black font-black flex items-center justify-center text-xl shadow-lg shadow-[#f43f5e]/40 animate-pulse">
                🕹️
              </div>
              <div>
                <h1 className="text-3xl font-black text-white tracking-widest uppercase drop-shadow-[0_0_10px_#f43f5e]">
                  {personal.name}
                </h1>
                <p className="text-xs text-[#f97316] font-extrabold mt-1">{personal.title}</p>
              </div>
            </div>

            <span className="px-3.5 py-1.5 bg-[#f43f5e]/20 border border-[#f43f5e]/60 text-[#f43f5e] text-xs rounded-full flex items-center gap-1.5 shadow-[0_0_10px_#f43f5e]">
              <Radio className="w-3.5 h-3.5 animate-pulse" /> SYNTHWAVE 80S ACTIVE
            </span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed font-sans">{about.summary}</p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            {personal.email && (
              <a
                href={`mailto:${personal.email}`}
                className="px-5 py-2.5 bg-gradient-to-r from-[#f97316] via-[#f43f5e] to-[#7e22ce] text-black font-black text-xs rounded-xl shadow-[0_0_20px_#f43f5e] hover:opacity-90 transition"
              >
                <Mail className="w-4 h-4 inline mr-1.5" /> RETRO TRANSMISSION
              </a>
            )}
            {personal.socials.github && (
              <a
                href={personal.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-[#25084a] text-[#f43f5e] text-xs font-bold rounded-xl border border-[#f43f5e]/40 hover:bg-[#f43f5e] hover:text-black transition"
              >
                <Github className="w-4 h-4 inline mr-1.5" /> RETRO REPOS
              </a>
            )}
          </div>
        </header>

        {projects && projects.length > 0 && (
          <section className="space-y-6">
            <h2 className="text-xs font-bold text-white uppercase tracking-widest border-b border-[#f43f5e]/30 pb-3 flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#f97316]" /> [ NEON SYNTHWAVE PROJECTS ]
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((proj) => (
                <div
                  key={proj.id}
                  className="p-6 bg-[#180530]/90 border border-[#f43f5e]/30 hover:border-[#f97316] rounded-3xl space-y-4 transition duration-300 group hover:shadow-[0_0_20px_#f43f5e]"
                >
                  <div className="flex justify-between items-start">
                    <h3 className="font-extrabold text-white text-base group-hover:text-[#f97316] transition">{proj.name}</h3>
                    {proj.liveUrl && (
                      <a href={proj.liveUrl} target="_blank" rel="noopener noreferrer" className="p-2 text-[#f43f5e] hover:text-white rounded-xl transition">
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed font-sans">{proj.description}</p>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {proj.technologies.map((t, i) => (
                      <span key={i} className="text-[10px] bg-[#f43f5e]/20 text-[#f43f5e] px-2.5 py-0.5 rounded-md border border-[#f43f5e]/40">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {skills && skills.length > 0 && (
          <section className="space-y-6">
            <h2 className="text-xs font-bold text-white uppercase tracking-widest border-b border-[#f43f5e]/30 pb-3 flex items-center gap-2">
              <Radio className="w-4 h-4 text-[#f43f5e]" /> [ RETRO ARCADE STACK ]
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {skills.map((cat) => (
                <div key={cat.id} className="p-6 bg-[#180530]/90 border border-[#f43f5e]/30 rounded-3xl space-y-3">
                  <h3 className="text-xs font-bold text-[#f97316] uppercase">[ {cat.category} ]</h3>
                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map((s, i) => (
                      <span key={i} className="text-xs bg-[#25084a] text-[#f43f5e] px-3 py-1 rounded-lg border border-[#f43f5e]/30">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        <footer className="pt-8 border-t border-[#f43f5e]/30 text-center text-xs text-[#f43f5e]/70">
          © {new Date().getFullYear()} {personal.name} // SYNTHWAVE 80S EDITION
        </footer>
      </div>
    </div>
  );
}
