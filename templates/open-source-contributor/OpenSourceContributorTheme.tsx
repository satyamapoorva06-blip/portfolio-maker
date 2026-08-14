'use client';

import React from 'react';
import { PortfolioData } from '@/types/portfolio';
import { Github, GitPullRequest, Star, GitCommit, GitFork, ExternalLink, Mail, Activity, Terminal } from 'lucide-react';

export default function OpenSourceContributorTheme({ data }: { data: PortfolioData }) {
  const { personal, about, projects, skills } = data;

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#c9d1d9] font-mono p-6 sm:p-12 relative overflow-x-hidden">
      <div className="max-w-5xl mx-auto space-y-12 relative z-10">
        {/* GitHub Developer Profile Header */}
        <header className="p-8 bg-[#161b22] border border-[#30363d] rounded-3xl space-y-6 shadow-2xl">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#30363d] pb-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-[#21262d] border border-[#30363d] text-emerald-400 flex items-center justify-center font-bold text-2xl shadow-inner">
                <Github className="w-8 h-8 text-emerald-400" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white">{personal.name}</h1>
                <p className="text-xs text-[#8b949e]">@{data.slug || 'developer'} • {personal.title}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {personal.email && (
                <a
                  href={`mailto:${personal.email}`}
                  className="px-4 py-2 bg-[#238636] hover:bg-[#2ea043] text-white font-bold text-xs rounded-xl shadow-lg flex items-center gap-2 transition"
                >
                  <Mail className="w-4 h-4" /> Sponsor / Contact
                </a>
              )}
            </div>
          </div>

          <p className="text-xs text-[#8b949e] leading-relaxed font-sans">{about.summary}</p>

          {/* GitHub Activity Heatmap Simulation */}
          <div className="space-y-2 pt-2">
            <div className="flex justify-between items-center text-[10px] text-[#8b949e]">
              <span className="flex items-center gap-1.5 font-bold">
                <GitCommit className="w-3.5 h-3.5 text-emerald-400" /> 1,420 Contributions in 2026
              </span>
              <span>Less ■ ■ ■ ■ ■ More</span>
            </div>
            <div className="grid grid-cols-12 sm:grid-cols-24 gap-1 p-3 bg-[#0d1117] rounded-xl border border-[#30363d]">
              {Array.from({ length: 48 }).map((_, i) => (
                <span
                  key={i}
                  className={`h-3 rounded-sm ${
                    i % 7 === 0 ? 'bg-[#2ea043]' : i % 3 === 0 ? 'bg-[#0e4429]' : i % 2 === 0 ? 'bg-[#006d32]' : 'bg-[#161b22]'
                  }`}
                ></span>
              ))}
            </div>
          </div>
        </header>

        {/* Pinned Repositories Showcase */}
        {projects && projects.length > 0 && (
          <section className="space-y-6">
            <div className="flex justify-between items-center border-b border-[#30363d] pb-3">
              <h2 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <GitPullRequest className="w-4 h-4 text-emerald-400" /> Pinned Repositories & Open Source PRs
              </h2>
              <span className="text-[10px] text-[#8b949e]">{projects.length} Pinned</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((proj) => (
                <div
                  key={proj.id}
                  className="p-6 bg-[#161b22] border border-[#30363d] hover:border-[#58a6ff] rounded-2xl space-y-4 transition group shadow-xl"
                >
                  <div className="flex justify-between items-start">
                    <h3 className="font-extrabold text-[#58a6ff] text-base group-hover:underline flex items-center gap-1.5">
                      <Star className="w-4 h-4 text-amber-400" /> {proj.name}
                    </h3>
                    {proj.liveUrl && (
                      <a href={proj.liveUrl} target="_blank" rel="noopener noreferrer" className="text-[#8b949e] hover:text-white">
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>

                  <p className="text-xs text-[#8b949e] leading-relaxed font-sans">{proj.description}</p>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {proj.technologies.map((t, i) => (
                      <span key={i} className="text-[10px] bg-[#21262d] text-[#c9d1d9] px-2.5 py-0.5 rounded-full border border-[#30363d]">
                        ● {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills Stack */}
        {skills && skills.length > 0 && (
          <section className="space-y-6">
            <h2 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2 border-b border-[#30363d] pb-3">
              <Terminal className="w-4 h-4 text-emerald-400" /> Developer Environment & Toolchain
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {skills.map((cat) => (
                <div key={cat.id} className="p-6 bg-[#161b22] border border-[#30363d] rounded-2xl space-y-3">
                  <h3 className="text-xs font-bold text-[#58a6ff] uppercase">{cat.category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map((s, i) => (
                      <span key={i} className="text-xs bg-[#21262d] text-[#c9d1d9] px-3 py-1 rounded-xl border border-[#30363d]">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        <footer className="pt-8 border-t border-[#30363d] text-center text-xs text-[#8b949e]">
          © {new Date().getFullYear()} {personal.name}. Powered by Portify AI Open Source Contributor Engine.
        </footer>
      </div>
    </div>
  );
}
