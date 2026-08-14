'use client';

import React from 'react';
import Link from 'next/link';
import { Palette, ArrowUpRight, Sparkles } from 'lucide-react';

const THEME_LIST = [
  {
    id: 'minimal',
    name: 'Theme 1 — Minimal',
    tagline: 'Apple-Inspired & Clean',
    description: 'Generous whitespace, elegant typography, and subtle slide transitions.',
    badge: 'Popular',
    gradient: 'from-slate-800 to-slate-900',
  },
  {
    id: 'developer',
    name: 'Theme 2 — Developer',
    tagline: 'Dark & Monospaced Code',
    description: 'IDE terminal headers, command prompts, and monospaced tech matrix.',
    badge: 'Developer Favorite',
    gradient: 'from-slate-950 via-cyan-950 to-slate-900',
  },
  {
    id: 'creative',
    name: 'Theme 3 — Creative',
    tagline: 'Bold & Vibrant Layouts',
    description: 'High-impact headline typography, vibrant cards, and playful badges.',
    badge: 'Bold Design',
    gradient: 'from-purple-900 to-rose-950',
  },
  {
    id: 'three-d',
    name: 'Theme 4 — 3D Spatial',
    tagline: 'Cinematic Depth & Neon Glows',
    description: '3D perspective tilt cards, spatial depth effects, and neon glows.',
    badge: 'Cinematic',
    gradient: 'from-cyan-950 to-violet-950',
  },
  {
    id: 'professional',
    name: 'Theme 5 — Professional',
    tagline: 'Recruiter-Friendly Corporate',
    description: 'Executive corporate layout, structured work timeline, and PDF print ready.',
    badge: 'Corporate',
    gradient: 'from-blue-950 to-slate-900',
  },
  {
    id: 'glass',
    name: 'Theme 6 — Glassmorphism',
    tagline: 'Frosted Glass & Mesh Glow',
    description: 'Backdrop blur panels, ambient mesh gradient blur, and sleek micro-interactions.',
    badge: 'SaaS Modern',
    gradient: 'from-slate-900 via-blue-950 to-slate-950',
  },
  {
    id: 'obsidian-red',
    name: 'Theme 7 — Obsidian Red',
    tagline: 'High-Contrast Red & LeetCode Stats',
    description: 'Scraped from top SDE portfolios: Obsidian dark mode, Netflix Red highlights, and LeetCode problem-solving badges.',
    badge: 'New 🔥',
    gradient: 'from-zinc-950 via-red-950 to-[#050505]',
  },
  {
    id: 'nordic-editorial',
    name: 'Theme 8 — Nordic Editorial',
    tagline: 'Scandinavian Luxury Serif',
    description: 'Scraped from Andreas Antonsson: Full-viewport project sections, Dahlia serif typography, and minimal index tracking.',
    badge: 'Luxury Editorial ✨',
    gradient: 'from-zinc-900 via-black to-zinc-950',
  },
  {
    id: 'dev-gallery',
    name: 'Theme 9 — Dev Gallery Grid',
    tagline: 'Curated Tech Showcase',
    description: 'Scraped from DevPortfolios.dev: Interactive technology category filters (React, Next.js, AI) and thumbnail card grid.',
    badge: 'Showcase Grid 🚀',
    gradient: 'from-zinc-900 to-cyan-950',
  },
  {
    id: 'cyber-matrix',
    name: 'Theme 10 — Cyber Matrix',
    tagline: 'Hacker Terminal Rain',
    description: 'Neon matrix green accents (#00ff66), retro ASCII art headers, live command terminal prompt, and system status badges.',
    badge: 'Hacker Terminal ⚡',
    gradient: 'from-emerald-950 via-black to-zinc-950',
  },
  {
    id: 'bento-grid',
    name: 'Theme 11 — Bento Grid',
    tagline: 'Apple / Figma Asymmetric Boxes',
    description: 'Modern asymmetrical Bento Grid layout, real-time status pills, project highlight cards, and interactive hover depth.',
    badge: 'Modern Bento 🍱',
    gradient: 'from-[#090a0f] via-blue-950 to-slate-950',
  },
  {
    id: 'kinetic-poster',
    name: 'Theme 12 — Kinetic Poster',
    tagline: 'Swiss Poster & Canary Yellow',
    description: 'High-fashion editorial Swiss typography, massive oversized headlines, high contrast monochrome, and canary yellow accents.',
    badge: 'Swiss Poster 🎨',
    gradient: 'from-black via-zinc-950 to-amber-950',
  },
  {
    id: 'genai-neural',
    name: 'Theme 13 — GenAI Neural',
    tagline: 'LLM & Agentic AI Specialist',
    description: 'Inspired by Kuber Mehta, Kirti AI & Suraj Agentic AI: Neural network mesh, model benchmark metrics, and LangChain cards.',
    badge: 'GenAI & LLM 🤖',
    gradient: 'from-[#06070c] via-purple-950 to-cyan-950',
  },
  {
    id: 'cloud-architect',
    name: 'Theme 14 — Cloud Architect',
    tagline: 'DevOps & Systems Architecture',
    description: 'Inspired by Nishil Pathak Cloud: AWS/GCP infrastructure node cards, Docker/K8s pod status, and automated CI/CD pipeline flow.',
    badge: 'Cloud & DevOps ☁️',
    gradient: 'from-[#080d1a] via-blue-950 to-slate-950',
  },
  {
    id: 'mern-stack',
    name: 'Theme 15 — MERN Stack Neon',
    tagline: 'Full Stack React & Node',
    description: 'Inspired by Harsh & Dheeraj MERN: Vibrant neon cyan & emerald accents, REST API query cards, and interactive stack grid.',
    badge: 'MERN Full-Stack ⚛️',
    gradient: 'from-[#0a0a0f] via-cyan-950 to-emerald-950',
  },
  {
    id: 'iot-hardware',
    name: 'Theme 16 — IoT & Systems',
    tagline: 'Hardware & Microcontrollers',
    description: 'Inspired by Ayush Srivastava IoT: Circuit board background, micro-controller pinouts (ESP32, RPi, STM32) and telemetry metrics.',
    badge: 'IoT & Embedded 🔌',
    gradient: 'from-[#0d0d09] via-amber-950 to-zinc-950',
  },
  {
    id: 'java-enterprise',
    name: 'Theme 17 — Java Enterprise',
    tagline: 'Spring Boot & Microservices',
    description: 'Inspired by Rishav Choudhary & Adil Iqbal: Corporate backend layout, JVM metrics, SQL database schema cards, and Java theme.',
    badge: 'Java Backend ☕',
    gradient: 'from-[#080d14] via-amber-950 to-red-950',
  },
  {
    id: 'cs-student',
    name: 'Theme 18 — CS Academic Student',
    tagline: 'University Coursework & GPA',
    description: 'Inspired by Sahil Bhayre & Shreya Saxena CS Students: University coursework highlights, GPA badges, and DSA problem stats.',
    badge: 'CS Academic 🎓',
    gradient: 'from-[#070b12] via-blue-950 to-indigo-950',
  },
  {
    id: 'spatial-arvr',
    name: 'Theme 19 — AR/VR Spatial 3D',
    tagline: 'Vision OS Spatial Glass',
    description: 'Inspired by Srikhanth AR/VR: Spatial OS glassmorphism panels, WebGL & Three.js showcase, and iridescent violet/cyan glows.',
    badge: 'AR/VR 3D 🔮',
    gradient: 'from-[#07050d] via-purple-950 to-pink-950',
  },
  {
    id: 'cyber-sentinel',
    name: 'Theme 20 — Cyber Security',
    tagline: 'Penetration Testing & Sentinel',
    description: 'Inspired by Ritik Tiwari Security: Vulnerability log cards, CTF achievement badges, red/green terminal status, and security payload cards.',
    badge: 'Cyber Security 🛡️',
    gradient: 'from-[#060a08] via-emerald-950 to-black',
  },
];

export default function ThemeShowcase() {
  return (
    <section id="themes" className="py-24 bg-slate-950 relative">
      <div className="max-w-7xl mx-auto px-6 space-y-16">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-400/20 text-xs font-semibold text-purple-300">
            <Palette className="w-4 h-4 text-purple-400" />
            20 HANDCRAFTED PORTFOLIO THEMES
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
            20 Specialized Developer Portfolio Themes
          </h2>
          <p className="text-slate-400 text-base">
            From GenAI & Agentic AI to Cloud DevOps, MERN Full Stack, IoT, Java Enterprise, CS Students, and Cyber Security—Portify AI includes 20 world-class themes tailored to your specific field.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {THEME_LIST.map((t) => (
            <div
              key={t.id}
              className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6 flex flex-col justify-between hover:border-cyan-500/40 transition group shadow-xl"
            >
              <div className="space-y-4">
                <div className={`h-40 rounded-2xl bg-gradient-to-tr ${t.gradient} p-4 border border-white/10 flex flex-col justify-between relative overflow-hidden`}>
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-black/40 px-2.5 py-1 rounded-full text-white backdrop-blur">
                      {t.badge}
                    </span>
                    <Sparkles className="w-4 h-4 text-cyan-400 opacity-60" />
                  </div>
                  <div className="text-white font-bold text-lg tracking-tight group-hover:text-cyan-400 transition">
                    {t.name}
                  </div>
                </div>

                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-white">{t.name}</h3>
                  <p className="text-xs font-medium text-cyan-400">{t.tagline}</p>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed">{t.description}</p>
              </div>

              <Link
                href="/upload"
                className="w-full py-3 bg-slate-800 hover:bg-cyan-600 text-slate-200 hover:text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition"
              >
                Use This Theme <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
