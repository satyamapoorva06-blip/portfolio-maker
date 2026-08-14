'use client';

import React from 'react';
import { PortfolioData } from '@/types/portfolio';
import { Cloud, Server, ShieldCheck, Cpu, ExternalLink, Github, Linkedin, Mail, Activity, Terminal } from 'lucide-react';

export default function CloudArchitectTheme({ data }: { data: PortfolioData }) {
  const { personal, about, projects, skills } = data;

  return (
    <div className="min-h-screen bg-[#080d1a] text-slate-100 font-sans p-6 sm:p-12 relative overflow-x-hidden">
      {/* Cloud Blue Gradient Glow */}
      <div className="fixed top-0 left-1/3 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[180px] pointer-events-none"></div>

      <div className="max-w-5xl mx-auto space-y-16 relative z-10">
        {/* Cloud Header Banner */}
        <header className="p-8 bg-[#0f172a] border border-blue-500/30 rounded-3xl space-y-6 shadow-2xl">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800 pb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/20">
                <Cloud className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl font-extrabold text-white">{personal.name}</h1>
                <span className="text-xs font-mono text-blue-400 font-semibold">{personal.title}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-emerald-950 text-emerald-400 border border-emerald-800 text-xs font-mono rounded-full flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5" /> Uptime 99.99% // Active
              </span>
            </div>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed font-light">{about.summary}</p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            {personal.email && (
              <a
                href={`mailto:${personal.email}`}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-lg flex items-center gap-1.5 transition"
              >
                <Mail className="w-4 h-4" /> Contact Cloud Engineer
              </a>
            )}
            {personal.socials.github && (
              <a
                href={personal.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-medium rounded-xl border border-slate-700 flex items-center gap-1.5 transition"
              >
                <Github className="w-4 h-4 text-blue-400" /> GitHub / Terraform
              </a>
            )}
          </div>
        </header>

        {/* Infrastructure Node Cards */}
        <section className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 bg-[#0f172a] border border-blue-500/20 rounded-3xl">
          <div className="space-y-1">
            <span className="text-[11px] text-slate-400 font-mono uppercase">Cloud Providers</span>
            <div className="text-xl font-extrabold text-blue-400 font-mono">AWS & GCP</div>
            <span className="text-[10px] text-slate-500">EC2, S3, Cloud Run</span>
          </div>

          <div className="space-y-1">
            <span className="text-[11px] text-slate-400 font-mono uppercase">Containers</span>
            <div className="text-xl font-extrabold text-cyan-400 font-mono">Kubernetes</div>
            <span className="text-[10px] text-slate-500">Docker & K8s Pods</span>
          </div>

          <div className="space-y-1">
            <span className="text-[11px] text-slate-400 font-mono uppercase">CI/CD Pipeline</span>
            <div className="text-xl font-extrabold text-indigo-400 font-mono">Automated</div>
            <span className="text-[10px] text-slate-500">GitHub Actions & Terraform</span>
          </div>

          <div className="space-y-1">
            <span className="text-[11px] text-slate-400 font-mono uppercase">Security</span>
            <div className="text-sm font-bold text-emerald-400 flex items-center gap-1.5 pt-1">
              <ShieldCheck className="w-4 h-4" /> Zero-Trust Auth
            </div>
            <span className="text-[10px] text-slate-500">IAM & Cloud Shield</span>
          </div>
        </section>

        {/* Infrastructure Projects */}
        {projects && projects.length > 0 && (
          <section className="space-y-6">
            <h2 className="text-xl font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Server className="w-5 h-5 text-blue-400" /> Infrastructure & System Architecture
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((proj) => (
                <div
                  key={proj.id}
                  className="p-6 bg-[#0f172a] border border-slate-800 hover:border-blue-500/50 rounded-3xl space-y-4 transition duration-300 group hover:shadow-xl hover:shadow-blue-500/10"
                >
                  <div className="flex justify-between items-start">
                    <h3 className="font-extrabold text-white text-base group-hover:text-blue-400 transition">{proj.name}</h3>
                    {proj.liveUrl && (
                      <a
                        href={proj.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-blue-400 hover:text-white rounded-xl transition"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed font-light">{proj.description}</p>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {proj.technologies.map((t, i) => (
                      <span key={i} className="text-[10px] bg-blue-950/80 text-blue-300 px-2.5 py-0.5 rounded-lg border border-blue-800 font-mono">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* DevOps Stack */}
        {skills && skills.length > 0 && (
          <section className="space-y-6">
            <h2 className="text-xl font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Cpu className="w-5 h-5 text-cyan-400" /> DevOps & Systems Matrix
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {skills.map((cat) => (
                <div key={cat.id} className="p-6 bg-[#0f172a] border border-slate-800 rounded-3xl space-y-3">
                  <h3 className="text-xs font-bold text-blue-400 font-mono uppercase">{cat.category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map((s, i) => (
                      <span key={i} className="text-xs bg-slate-900 text-slate-200 px-3 py-1 rounded-xl border border-slate-700 font-mono">
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
          © {new Date().getFullYear()} {personal.name}. Powered by Portify AI Cloud Architect Engine.
        </footer>
      </div>
    </div>
  );
}
