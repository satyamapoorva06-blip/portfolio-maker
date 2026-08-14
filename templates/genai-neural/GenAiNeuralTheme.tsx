'use client';

import React from 'react';
import { PortfolioData } from '@/types/portfolio';
import { Bot, Sparkles, Cpu, ExternalLink, Github, Linkedin, Mail, Zap, BrainCircuit, Network } from 'lucide-react';

export default function GenAiNeuralTheme({ data }: { data: PortfolioData }) {
  const { personal, about, projects, skills } = data;

  return (
    <div className="min-h-screen bg-[#06070c] text-slate-100 font-sans p-6 sm:p-12 relative overflow-x-hidden">
      {/* Magenta & Cyan Neural Blur Orbs */}
      <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-magenta-500/10 bg-purple-600/15 rounded-full blur-[180px] pointer-events-none"></div>
      <div className="fixed bottom-0 right-1/4 w-[500px] h-[500px] bg-cyan-500/15 rounded-full blur-[180px] pointer-events-none"></div>

      <div className="max-w-5xl mx-auto space-y-16 relative z-10">
        {/* GenAI Top Bar */}
        <header className="p-8 bg-[#0d0f18]/90 border border-purple-500/30 rounded-3xl space-y-6 shadow-2xl backdrop-blur-md">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 to-cyan-400 text-white flex items-center justify-center shadow-lg shadow-purple-500/20">
                <BrainCircuit className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl font-black text-white">{personal.name}</h1>
                <span className="text-xs font-mono text-cyan-400 font-semibold">{personal.title}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-purple-950/80 border border-purple-800 text-purple-300 text-xs font-mono rounded-full flex items-center gap-1.5">
                <Bot className="w-3.5 h-3.5 text-cyan-400" /> Agentic AI & LLM Systems
              </span>
            </div>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed font-light">{about.summary}</p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            {personal.email && (
              <a
                href={`mailto:${personal.email}`}
                className="px-4 py-2 bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white font-bold text-xs rounded-xl shadow-lg flex items-center gap-1.5 transition"
              >
                <Mail className="w-4 h-4" /> Connect AI Engineer
              </a>
            )}
            {personal.socials.github && (
              <a
                href={personal.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-[#141724] hover:bg-[#1a1e30] text-slate-200 text-xs font-medium rounded-xl border border-purple-500/20 flex items-center gap-1.5 transition"
              >
                <Github className="w-4 h-4 text-purple-400" /> HuggingFace / GitHub
              </a>
            )}
          </div>
        </header>

        {/* AI & Agentic Model Metrics Bar */}
        <section className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 bg-[#0d0f18] border border-cyan-500/30 rounded-3xl">
          <div className="space-y-1">
            <span className="text-[11px] text-slate-400 font-mono uppercase">Model Architecture</span>
            <div className="text-xl font-extrabold text-cyan-400 font-mono">LLM & RAG</div>
            <span className="text-[10px] text-slate-500">LangChain / Vector DBs</span>
          </div>

          <div className="space-y-1">
            <span className="text-[11px] text-slate-400 font-mono uppercase">Agent Workflows</span>
            <div className="text-xl font-extrabold text-purple-400 font-mono">Autonomous</div>
            <span className="text-[10px] text-slate-500">Multi-Agent Systems</span>
          </div>

          <div className="space-y-1">
            <span className="text-[11px] text-slate-400 font-mono uppercase">Inference Speed</span>
            <div className="text-xl font-extrabold text-emerald-400 font-mono">&lt; 45ms</div>
            <span className="text-[10px] text-slate-500">Edge & GPU Optimized</span>
          </div>

          <div className="space-y-1">
            <span className="text-[11px] text-slate-400 font-mono uppercase">Status</span>
            <div className="text-sm font-bold text-cyan-400 flex items-center gap-1.5 pt-1">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span> Active Research
            </div>
            <span className="text-[10px] text-slate-500">GenAI & ML Systems</span>
          </div>
        </section>

        {/* AI Projects */}
        {projects && projects.length > 0 && (
          <section className="space-y-6">
            <h2 className="text-xl font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Network className="w-5 h-5 text-purple-400" /> AI Models & Agentic Deployments
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((proj) => (
                <div
                  key={proj.id}
                  className="p-6 bg-[#0d0f18] border border-purple-500/30 hover:border-cyan-400/50 rounded-3xl space-y-4 transition duration-300 group hover:shadow-xl hover:shadow-purple-500/10"
                >
                  <div className="flex justify-between items-start">
                    <h3 className="font-extrabold text-white text-base group-hover:text-cyan-400 transition">{proj.name}</h3>
                    {proj.liveUrl && (
                      <a
                        href={proj.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-purple-400 hover:text-white rounded-xl transition"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed font-light">{proj.description}</p>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {proj.technologies.map((t, i) => (
                      <span key={i} className="text-[10px] bg-purple-950/80 text-purple-300 px-2.5 py-0.5 rounded-lg border border-purple-800 font-mono">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* AI Skills */}
        {skills && skills.length > 0 && (
          <section className="space-y-6">
            <h2 className="text-xl font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Cpu className="w-5 h-5 text-cyan-400" /> Neural & Data Stack
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {skills.map((cat) => (
                <div key={cat.id} className="p-6 bg-[#0d0f18] border border-slate-800 rounded-3xl space-y-3">
                  <h3 className="text-xs font-bold text-cyan-400 font-mono uppercase">{cat.category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map((s, i) => (
                      <span key={i} className="text-xs bg-[#141724] text-slate-200 px-3 py-1 rounded-xl border border-purple-500/20 font-mono">
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
        <footer className="pt-8 border-t border-slate-800 text-center text-xs text-slate-500 font-mono">
          © {new Date().getFullYear()} {personal.name}. Powered by Portify AI GenAI Neural Engine.
        </footer>
      </div>
    </div>
  );
}
