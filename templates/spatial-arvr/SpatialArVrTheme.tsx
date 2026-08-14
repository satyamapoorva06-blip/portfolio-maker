'use client';

import React from 'react';
import { PortfolioData } from '@/types/portfolio';
import { Sparkles, Layers, Box, ExternalLink, Github, Linkedin, Mail, Eye } from 'lucide-react';

export default function SpatialArVrTheme({ data }: { data: PortfolioData }) {
  const { personal, about, projects, skills } = data;

  return (
    <div className="min-h-screen bg-[#07050d] text-slate-100 font-sans p-6 sm:p-12 relative overflow-x-hidden">
      {/* Iridescent Spatial Glass Blur Mesh */}
      <div className="fixed top-1/4 left-1/4 w-[600px] h-[600px] bg-purple-600/15 rounded-full blur-[180px] pointer-events-none"></div>
      <div className="fixed bottom-1/4 right-1/4 w-[600px] h-[600px] bg-pink-600/15 rounded-full blur-[180px] pointer-events-none"></div>

      <div className="max-w-5xl mx-auto space-y-16 relative z-10">
        {/* Spatial Glass Header */}
        <header className="p-8 bg-[#110d1f]/70 border border-purple-500/40 rounded-3xl space-y-6 backdrop-blur-2xl shadow-2xl">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-purple-900/30 pb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-500 via-pink-500 to-cyan-400 text-white flex items-center justify-center shadow-lg shadow-purple-500/25">
                <Box className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl font-black text-white">{personal.name}</h1>
                <span className="text-xs font-mono text-purple-300 font-semibold">{personal.title}</span>
              </div>
            </div>

            <span className="px-3 py-1 bg-purple-950/80 border border-purple-700 text-purple-300 text-xs font-mono rounded-full flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5 text-pink-400" /> AR/VR & 3D Spatial Computing
            </span>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed font-light">{about.summary}</p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            {personal.email && (
              <a
                href={`mailto:${personal.email}`}
                className="px-4 py-2 bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-500 hover:opacity-90 text-white font-bold text-xs rounded-xl shadow-lg flex items-center gap-1.5 transition"
              >
                <Mail className="w-4 h-4" /> Spatial Experience Inquiry
              </a>
            )}
            {personal.socials.github && (
              <a
                href={personal.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-[#17112b] hover:bg-[#20183b] text-slate-200 text-xs font-medium rounded-xl border border-purple-500/30 flex items-center gap-1.5 transition"
              >
                <Github className="w-4 h-4 text-purple-400" /> 3D Code & GitHub
              </a>
            )}
          </div>
        </header>

        {/* Spatial Projects */}
        {projects && projects.length > 0 && (
          <section className="space-y-6">
            <h2 className="text-xl font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Layers className="w-5 h-5 text-pink-400" /> 3D Spatial Projects & Immersive Demos
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((proj) => (
                <div
                  key={proj.id}
                  className="p-6 bg-[#110d1f]/60 border border-purple-500/30 hover:border-pink-500/60 rounded-3xl space-y-4 backdrop-blur-xl transition duration-300 group hover:shadow-xl hover:shadow-purple-500/10"
                >
                  <div className="flex justify-between items-start">
                    <h3 className="font-extrabold text-white text-base group-hover:text-pink-400 transition">{proj.name}</h3>
                    {proj.liveUrl && (
                      <a
                        href={proj.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-purple-300 hover:text-white rounded-xl transition"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed font-light">{proj.description}</p>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {proj.technologies.map((t, i) => (
                      <span key={i} className="text-[10px] bg-purple-950/90 text-pink-300 px-2.5 py-0.5 rounded-lg border border-purple-800 font-mono">
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
            <h2 className="text-xl font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-400" /> WebGL & Spatial Stack
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {skills.map((cat) => (
                <div key={cat.id} className="p-6 bg-[#110d1f]/60 border border-purple-500/30 rounded-3xl space-y-3 backdrop-blur-xl">
                  <h3 className="text-xs font-bold text-pink-400 font-mono uppercase">{cat.category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map((s, i) => (
                      <span key={i} className="text-xs bg-[#17112b] text-slate-200 px-3 py-1 rounded-xl border border-purple-500/20 font-mono">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        <footer className="pt-8 border-t border-purple-900/30 text-center text-xs text-slate-500 font-mono">
          © {new Date().getFullYear()} {personal.name}. Powered by Portify AI Spatial Engine.
        </footer>
      </div>
    </div>
  );
}
