'use client';

import React from 'react';
import { PortfolioData } from '@/types/portfolio';
import { Cpu, Zap, Radio, ExternalLink, Github, Linkedin, Mail, Activity, Terminal } from 'lucide-react';

export default function IotHardwareTheme({ data }: { data: PortfolioData }) {
  const { personal, about, projects, skills } = data;

  return (
    <div className="min-h-screen bg-[#0d0d09] text-amber-100 font-mono selection:bg-amber-400 selection:text-black p-6 sm:p-12 relative overflow-x-hidden">
      {/* Electric Amber Glow Orbs */}
      <div className="fixed top-0 left-1/3 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[180px] pointer-events-none"></div>

      <div className="max-w-5xl mx-auto space-y-16 relative z-10">
        {/* Header */}
        <header className="p-8 bg-[#14140e] border border-amber-500/40 rounded-3xl space-y-6 shadow-2xl">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-amber-900/40 pb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-500 text-black font-black flex items-center justify-center text-xl shadow-lg shadow-amber-500/20">
                <Cpu className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl font-black text-white">{personal.name}</h1>
                <span className="text-xs text-amber-400 font-semibold">{personal.title}</span>
              </div>
            </div>

            <span className="px-3 py-1 bg-amber-950 text-amber-300 border border-amber-800 text-xs rounded-full flex items-center gap-1.5">
              <Radio className="w-3.5 h-3.5 text-amber-400 animate-pulse" /> IoT & Embedded Systems
            </span>
          </div>

          <p className="text-xs text-amber-200/80 leading-relaxed font-sans">{about.summary}</p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            {personal.email && (
              <a
                href={`mailto:${personal.email}`}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs rounded-xl shadow-lg flex items-center gap-1.5 transition"
              >
                <Mail className="w-4 h-4" /> Contact Hardware Developer
              </a>
            )}
            {personal.socials.github && (
              <a
                href={personal.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-[#1a1a12] hover:bg-[#24241a] text-amber-200 text-xs font-medium rounded-xl border border-amber-900/60 flex items-center gap-1.5 transition"
              >
                <Github className="w-4 h-4 text-amber-400" /> Firmware & GitHub
              </a>
            )}
          </div>
        </header>

        {/* Telemetry Hardware Metrics */}
        <section className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 bg-[#14140e] border border-amber-500/30 rounded-3xl">
          <div className="space-y-1">
            <span className="text-[11px] text-amber-400/70 font-mono uppercase">Microcontrollers</span>
            <div className="text-xl font-extrabold text-amber-400">ESP32 & STM32</div>
            <span className="text-[10px] text-amber-500/70">Raspberry Pi & Arduino</span>
          </div>

          <div className="space-y-1">
            <span className="text-[11px] text-amber-400/70 font-mono uppercase">Wireless Protocols</span>
            <div className="text-xl font-extrabold text-amber-300">BLE / MQTT</div>
            <span className="text-[10px] text-amber-500/70">LoRaWAN & Wi-Fi</span>
          </div>

          <div className="space-y-1">
            <span className="text-[11px] text-amber-400/70 font-mono uppercase">Sensors & PCB</span>
            <div className="text-xl font-extrabold text-amber-400">KiCAD Design</div>
            <span className="text-[10px] text-amber-500/70">I2C / SPI / UART</span>
          </div>

          <div className="space-y-1">
            <span className="text-[11px] text-amber-400/70 font-mono uppercase">Status</span>
            <div className="text-sm font-bold text-emerald-400 flex items-center gap-1.5 pt-1">
              <Zap className="w-4 h-4" /> System Online
            </div>
            <span className="text-[10px] text-amber-500/70">Hardware & Firmware</span>
          </div>
        </section>

        {/* Projects */}
        {projects && projects.length > 0 && (
          <section className="space-y-6">
            <h2 className="text-xl font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Cpu className="w-5 h-5 text-amber-400" /> IoT Hardware & Firmware Builds
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((proj) => (
                <div
                  key={proj.id}
                  className="p-6 bg-[#14140e] border border-amber-900/60 hover:border-amber-500 rounded-3xl space-y-4 transition duration-300 group hover:shadow-xl hover:shadow-amber-500/10"
                >
                  <div className="flex justify-between items-start">
                    <h3 className="font-extrabold text-white text-base group-hover:text-amber-400 transition">{proj.name}</h3>
                    {proj.liveUrl && (
                      <a
                        href={proj.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-amber-400 hover:text-white rounded-xl transition"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>

                  <p className="text-xs text-amber-200/80 leading-relaxed font-sans">{proj.description}</p>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {proj.technologies.map((t, i) => (
                      <span key={i} className="text-[10px] bg-amber-950/80 text-amber-300 px-2.5 py-0.5 rounded-lg border border-amber-800">
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
              <Terminal className="w-5 h-5 text-amber-400" /> Hardware & Software Matrix
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {skills.map((cat) => (
                <div key={cat.id} className="p-6 bg-[#14140e] border border-amber-900/60 rounded-3xl space-y-3">
                  <h3 className="text-xs font-bold text-amber-400 uppercase">[ {cat.category} ]</h3>
                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map((s, i) => (
                      <span key={i} className="text-xs bg-[#1a1a12] text-amber-200 px-3 py-1 rounded-xl border border-amber-900/50">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        <footer className="pt-8 border-t border-amber-900/40 text-center text-xs text-amber-500/70">
          © {new Date().getFullYear()} {personal.name}. Powered by Portify AI IoT Engine.
        </footer>
      </div>
    </div>
  );
}
