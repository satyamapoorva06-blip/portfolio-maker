'use client';

import React from 'react';
import { PortfolioData } from '@/types/portfolio';
import { Terminal, Cpu, Zap, Code2, Layers, GitBranch, Github, Linkedin, Sparkles, Server, CheckCircle2 } from 'lucide-react';

export default function RagPromptTheme({ data }: { data: PortfolioData }) {
  const p = data.personal;
  const a = data.about;

  return (
    <div className="min-h-screen bg-[#05080c] text-emerald-100 font-mono selection:bg-emerald-500 selection:text-black">
      {/* Top Terminal Bar */}
      <div className="bg-[#080e17] border-b border-emerald-900/60 px-6 py-3 flex justify-between items-center text-xs">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-rose-500/80"></span>
            <span className="w-3 h-3 rounded-full bg-amber-500/80"></span>
            <span className="w-3 h-3 rounded-full bg-emerald-500/80"></span>
          </div>
          <span className="text-slate-400 font-bold">rag-system-prompt --active</span>
        </div>
        <span className="text-emerald-400 bg-emerald-950 px-2.5 py-0.5 rounded border border-emerald-800 text-[10px] font-bold">
          LATENCY: 14ms | GEMINI FLASH
        </span>
      </div>

      <main className="max-w-5xl mx-auto px-6 py-12 space-y-12">
        {/* Terminal Main Hero */}
        <section className="bg-[#09121e] border border-emerald-500/30 rounded-2xl p-8 space-y-6 shadow-2xl relative">
          <div className="text-xs text-emerald-400/70">$ cat system_profile.json</div>
          
          <div className="space-y-3 border-l-2 border-emerald-500 pl-4">
            <h1 className="text-4xl sm:text-5xl font-black text-white">{p.name}</h1>
            <p className="text-base text-emerald-400 font-bold">{p.title || 'GenAI & RAG Prompt Architect'}</p>
            <p className="text-xs text-slate-400">{p.location || 'Remote / Global'}</p>
          </div>

          <div className="p-4 bg-[#05080c] rounded-xl border border-emerald-900/60 text-xs text-slate-300 leading-relaxed space-y-2">
            <span className="text-emerald-400 font-bold">&gt; SYSTEM PROMPT INSTRUCTION:</span>
            <p className="text-slate-300 font-sans">{a.summary}</p>
          </div>

          <div className="flex flex-wrap gap-4 pt-2 text-xs">
            {p.socials?.github && (
              <a href={p.socials.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-emerald-400 hover:underline">
                <Github className="w-4 h-4" /> github_profile
              </a>
            )}
            {p.socials?.linkedin && (
              <a href={p.socials.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-emerald-400 hover:underline">
                <Linkedin className="w-4 h-4" /> linkedin_profile
              </a>
            )}
            {p.email && (
              <span className="text-slate-400">email: {p.email}</span>
            )}
          </div>
        </section>

        {/* Vector Embedding Pipeline Skills */}
        {data.skills && data.skills.length > 0 && (
          <section className="space-y-4">
            <div className="text-xs text-emerald-400">$ list_vector_embeddings --categories</div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {data.skills.map((grp) => (
                <div key={grp.id} className="p-5 bg-[#09121e] border border-emerald-900/50 rounded-xl space-y-3">
                  <h3 className="text-xs font-bold text-emerald-300 uppercase tracking-wider">{grp.category}</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {grp.skills.map((sk, idx) => (
                      <span key={idx} className="px-2 py-0.5 bg-emerald-950/80 border border-emerald-800/80 text-emerald-300 text-xs rounded font-mono">
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* LLM & RAG Projects */}
        {data.projects && data.projects.length > 0 && (
          <section className="space-y-4">
            <div className="text-xs text-emerald-400">$ fetch_rag_projects --list</div>
            <div className="space-y-4">
              {data.projects.map((proj) => (
                <div key={proj.id} className="p-6 bg-[#09121e] border border-emerald-900/50 rounded-2xl space-y-3">
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold text-white text-lg">{proj.name}</h3>
                    <span className="text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-800 px-2 py-0.5 rounded font-bold">
                      VECTOR RAG
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 font-sans leading-relaxed">{proj.description}</p>
                  {proj.technologies && proj.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {proj.technologies.map((t, idx) => (
                        <span key={idx} className="text-[10px] bg-black text-emerald-400 px-2 py-0.5 rounded border border-emerald-900">
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      <footer className="border-t border-emerald-900/60 py-6 text-center text-xs text-slate-500">
        // GenAI RAG Systems Portfolio • Built with Portify AI
      </footer>
    </div>
  );
}
