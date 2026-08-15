'use client';

import React from 'react';
import Link from 'next/link';
import { Palette, ArrowUpRight, Sparkles, Zap } from 'lucide-react';

const ANIMATED_THEME_LIST = [
  { id: 'animated-kinetic-type', name: 'Kinetic Marquee Motion', tagline: 'Spinning Ticker & Slide Motion', badge: 'Animated ⚡', gradient: 'from-[#facc15] via-amber-600 to-black' },
  { id: 'animated-laser-neon', name: 'Cyber Laser Particle Rain', tagline: 'Laser Beams & Glowing Particles', badge: 'Animated ⚡', gradient: 'from-[#ff0055] via-[#00f0ff] to-black' },
  { id: 'animated-3d-orbs', name: '3D Spatial Floating Orbs', tagline: '3D Perspective & Spatial Depth', badge: 'Animated ⚡', gradient: 'from-violet-950 via-pink-950 to-[#030712]' },
  { id: 'animated-glitch-hacker', name: 'Cyberpunk Matrix Glitch', tagline: 'CRT Scanlines & Text Glitch FX', badge: 'Animated ⚡', gradient: 'from-emerald-950 via-red-950 to-[#050505]' },
  { id: 'animated-aurora-mesh', name: 'Living Aurora Borealis', tagline: 'Morphing Liquid Aurora Gradient', badge: 'Animated ⚡', gradient: 'from-teal-950 via-purple-950 to-[#070510]' },
  { id: 'animated-elastic-cards', name: 'Elastic Physics Hover', tagline: 'Spring Physics Micro-Interactions', badge: 'Animated ⚡', gradient: 'from-orange-950 via-blue-950 to-[#080c14]' },
  { id: 'animated-particle-constellation', name: 'Node Constellation', tagline: 'Pulsating Star Network Lines', badge: 'Animated ⚡', gradient: 'from-sky-950 via-indigo-950 to-[#0b0f19]' },
  { id: 'animated-liquid-glass', name: 'Liquid Glass Bubbles', tagline: 'Floating Glass Bubble Blur', badge: 'Animated ⚡', gradient: 'from-cyan-950 via-blue-950 to-[#040814]' },
  { id: 'animated-synthwave-retro', name: '8-Bit Retro Synthwave', tagline: '80s Moving Grid & Retro Sunset', badge: 'Animated ⚡', gradient: 'from-purple-950 via-rose-950 to-[#0d021a]' },
  { id: 'animated-prism-refraction', name: 'Holographic Prism Glow', tagline: 'Iridescent Rainbow Shimmer Sweep', badge: 'Animated ⚡', gradient: 'from-cyan-950 via-pink-950 to-[#05060f]' },
];

const SHOWCASE_THEME_LIST = [
  { id: 'kuber-ai-creative', name: '1. Neural Spectrum AI', tagline: 'AI / Creative Studio', badge: 'AI Creative', gradient: 'from-purple-900 via-pink-950 to-slate-950' },
  { id: 'tvnskm-aiml-fullstack', name: '2. Quantum FullStack Matrix', tagline: 'AI/ML + Full Stack', badge: 'AI Matrix', gradient: 'from-cyan-950 via-purple-950 to-black' },
  { id: 'priyanshu-creative', name: '3. Generative Canvas AI', tagline: 'AI/ML + Creative', badge: 'Generative AI', gradient: 'from-[#06070c] to-purple-950' },
  { id: 'kirti-aiml', name: '4. Glassmorphic LLM Studio', tagline: 'AI/ML Engineer', badge: 'Lovable Glass', gradient: 'from-blue-950 to-purple-950' },
  { id: 'harsh-aiml-mern', name: '5. Cyberpunk MERN Stack', tagline: 'AIML + MERN', badge: 'Cyberpunk', gradient: 'from-zinc-950 to-red-950' },
  { id: 'hari-aiml', name: '6. Deep Learning Intelligence', tagline: 'AI/ML Neural', badge: 'Neural Net', gradient: 'from-[#06070c] to-[#11111a]' },
  { id: 'nishil-cloud', name: '7. Cloud DevOps Architect', tagline: 'AI/ML + Cloud', badge: 'Cloud Architect', gradient: 'from-[#080d1a] to-blue-950' },
  { id: 'prince-ai', name: '8. Dark Obsidian Minimalist', tagline: 'AI Developer', badge: 'Dark Minimal', gradient: 'from-[#050505] to-zinc-900' },
  { id: 'sahil-aiml-student', name: '9. Academic AI Scholar', tagline: 'AI/ML Student', badge: 'Academic', gradient: 'from-[#070b12] to-indigo-950' },
  { id: 'suraj-agentic-ai', name: '10. Agentic AI Workflows', tagline: 'Agentic AI', badge: 'LLM Agents', gradient: 'from-purple-950 to-cyan-950' },
  { id: 'srikhanth-arvr', name: '11. Vision OS Spatial 3D', tagline: 'AI/ML + AR/VR', badge: 'Spatial 3D', gradient: 'from-[#07050d] to-pink-950' },
  { id: 'abhinav-cv-ml', name: '12. Computer Vision Studio', tagline: 'ML + Computer Vision', badge: 'Vision ML', gradient: 'from-[#06070c] to-[#0d0f18]' },
  { id: 'sahil-sahu-ai', name: '13. Minimalist CS Dark', tagline: 'AI/ML Student', badge: 'Clean Dark', gradient: 'from-slate-950 to-slate-900' },
  { id: 'shreya-datascience', name: '14. Data Science Analytics', tagline: 'AI/ML + Data Science', badge: 'Analytics', gradient: 'from-purple-950 to-slate-950' },
  { id: 'aman-genai', name: '15. GenAI RAG Systems', tagline: 'AI/ML + GenAI', badge: 'RAG Prompt', gradient: 'from-[#06070c] to-[#141724]' },
  { id: 'nikhil-fullstack', name: '16. Full Stack Reactive AI', tagline: 'AI/ML + Full Stack', badge: 'Full Stack', gradient: 'from-[#0a0a0f] to-cyan-950' },
  { id: 'abhay-cs-ai', name: '17. CS Algorithm Systems', tagline: 'CS + AI', badge: 'CS Algorithms', gradient: 'from-[#070b12] to-blue-950' },
  { id: 'saad-fullstack', name: '18. Vibrant Web Engineer', tagline: 'Full Stack Web', badge: 'Vibrant Web', gradient: 'from-[#0a0a0f] to-emerald-950' },
  { id: 'prashant-cse-aiml', name: '19. CSE Research Studio', tagline: 'CSE + AI/ML', badge: 'CSE Research', gradient: 'from-[#070b12] to-indigo-950' },
  { id: 'anmol-creative-sys', name: '20. Creative Systems DevOps', tagline: 'Creative / Systems', badge: 'DevOps Sys', gradient: 'from-[#080d1a] to-[#0f172a]' },
  { id: 'abhishek-beginner', name: '21. Beginner CS Scholar', tagline: 'CS Learner Student', badge: 'Beginner CS', gradient: 'from-[#070b12] to-slate-900' },
  { id: 'harsh-cs-student', name: '22. Minimal CS Developer', tagline: 'CS Student', badge: 'Minimal CS', gradient: 'from-[#070b12] to-slate-950' },
  { id: 'dheeraj-mern', name: '23. MERN Stack Neon', tagline: 'MERN / Full Stack', badge: 'React Node', gradient: 'from-[#0a0a0f] to-[#11111a]' },
  { id: 'rishav-java-backend', name: '24. Spring Boot Enterprise', tagline: 'Java Backend', badge: 'Spring Boot', gradient: 'from-[#080d14] to-amber-950' },
  { id: 'adil-java-microservices', name: '25. Java Microservices Architect', tagline: 'Java Microservices', badge: 'Enterprise Java', gradient: 'from-[#080d14] to-red-950' },
  { id: 'megha-mern', name: '26. CS MERN Stack', tagline: 'CS + MERN', badge: 'CS MERN', gradient: 'from-[#0a0a0f] to-[#141724]' },
  { id: 'harsh-backend-ai', name: '27. Python FastAPI AI', tagline: 'Backend + AI', badge: 'Python FastAPI', gradient: 'from-[#06070c] to-[#0d0f18]' },
  { id: 'karan-webdev', name: '28. Responsive Web Architect', tagline: 'Web Developer', badge: 'Web Stack', gradient: 'from-[#0a0a0f] to-slate-900' },
  { id: 'shashank-fullstack', name: '29. Full Stack SDE Studio', tagline: 'Full Stack SDE', badge: 'Full Stack', gradient: 'from-[#0a0a0f] to-cyan-950' },
  { id: 'suraj-mern', name: '30. High-Impact MERN', tagline: 'MERN Studio', badge: 'MERN Full', gradient: 'from-[#0a0a0f] to-emerald-950' },
  { id: 'abdulhussain-uiux', name: '31. Figma UI/UX Design', tagline: 'UI/UX + Web', badge: 'Figma Design', gradient: 'from-black to-zinc-950' },
  { id: 'sakesh-fullstack', name: '32. Modern Full Stack', tagline: 'Full Stack Architect', badge: 'Full Stack', gradient: 'from-[#0a0a0f] to-blue-950' },
  { id: 'arun-fullstack', name: '33. Personal Dev Showcase', tagline: 'Personal Portfolio', badge: 'Developer', gradient: 'from-[#0a0a0f] to-slate-900' },
  { id: 'ritik-cybersec', name: '34. Cyber Security Sentinel', tagline: 'Web + Cybersecurity', badge: 'Cyber Sec', gradient: 'from-[#060a08] to-emerald-950' },
  { id: 'shivam-frontend', name: '35. React & Tailwind UI', tagline: 'Frontend Engineer', badge: 'React CSS', gradient: 'from-[#0a0a0f] to-cyan-950' },
  { id: 'vinay-java-fullstack', name: '36. Java Full Stack Enterprise', tagline: 'Java Full Stack', badge: 'Java React', gradient: 'from-[#080d14] to-amber-950' },
  { id: 'subhadeep-fullstack', name: '37. Clean Full Stack', tagline: 'Full Stack Engineer', badge: 'Full Stack', gradient: 'from-[#0a0a0f] to-slate-950' },
  { id: 'wasif-cs-student', name: '38. Minimalist CS Student', tagline: 'CS Student Simple', badge: 'Student', gradient: 'from-[#070b12] to-slate-900' },
  { id: 'prince-shah-learning', name: '39. Student Learner Studio', tagline: 'Student Learner', badge: 'Learner', gradient: 'from-[#070b12] to-zinc-900' },
  { id: 'dhanaraj-frontend-ai', name: '40. Next.js & AI Tools', tagline: 'Frontend + AI', badge: 'Next AI', gradient: 'from-[#06070c] to-cyan-950' },
  { id: 'ayush-iot-creative', name: '41. IoT Hardware Telemetry', tagline: 'IoT + Creative', badge: 'Hardware IoT', gradient: 'from-[#0d0d09] to-amber-950' },
  { id: 'priyank-fullstack', name: '42. Full Stack Software', tagline: 'Full Stack', badge: 'Web Engineer', gradient: 'from-[#0a0a0f] to-slate-950' },
  { id: 'aadi-neobrutalist', name: '43. Swiss Neo-Brutalist Poster', tagline: 'Neo-Brutalist', badge: 'Swiss Poster', gradient: 'from-black to-zinc-900' },
  { id: 'cs-student-collection', name: '44. CS Academic Collection', tagline: 'Academic Research & Degree', badge: 'Academic Paper', gradient: 'from-[#070b12] to-indigo-950' },
  { id: 'emma-bostian-curated', name: '45. Star Portfolio Collection', tagline: '⭐ 1,800+ Portfolios', badge: 'Starred Collection', gradient: 'from-[#101010] to-[#1a1a1a]' },
  { id: 'github-topic-student', name: '46. Open Source Student', tagline: 'GitHub 52-Week Commit Heatmap', badge: 'GitHub Heatmap', gradient: 'from-[#070b12] to-[#0e1626]' },
  { id: 'sitesplaced-examples', name: '47. SitesPlaced Engineer Examples', tagline: 'Systems SLA 99.999% Architecture', badge: 'System SLA', gradient: 'from-[#0a0a0f] to-[#11111a]' },
  { id: 'nikola-janjic-2025', name: '48. 2025 Edition Collection', tagline: 'Futuristic HUD Glass Interface', badge: 'HUD 2026', gradient: 'from-[#0a0a0f] to-cyan-950' },
  { id: 'gist-inspiration', name: '49. Gist Inspiration Grid', tagline: '1,300+ Inspiration', badge: 'Gist Collection', gradient: 'from-[#101010] to-[#202020]' },
  { id: 'onehour-digital', name: '50. OneHour Creative Showcase', tagline: 'Frontend Creative', badge: 'OneHour Showcase', gradient: 'from-[#050505] to-zinc-950' },
];

export default function ThemeShowcase() {
  return (
    <section id="themes" className="py-24 bg-slate-950 relative">
      <div className="max-w-7xl mx-auto px-6 space-y-16">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-400/20 text-xs font-semibold text-purple-300">
            <Palette className="w-4 h-4 text-purple-400" />
            60 HANDCRAFTED PORTFOLIO THEMES
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
            60 Professional Developer Themes
          </h2>
          <p className="text-slate-400 text-base">
            Choose from 10 Brand-New Animated Kinetic Themes and 50 Professional Specialized Showcase Designs.
          </p>
        </div>

        {/* Animated Themes Section */}
        <div className="space-y-6">
          <h3 className="text-xl font-extrabold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
            <Zap className="w-5 h-5 text-yellow-400 animate-pulse" /> 10 Animated Portfolio Themes
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {ANIMATED_THEME_LIST.map((t) => (
              <div
                key={t.id}
                className="bg-slate-900 border border-cyan-500/30 rounded-2xl p-4 space-y-3 flex flex-col justify-between hover:border-cyan-400 transition group shadow-xl"
              >
                <div className="space-y-2">
                  <div className={`h-24 rounded-xl bg-gradient-to-tr ${t.gradient} p-2.5 border border-white/10 flex flex-col justify-between relative overflow-hidden`}>
                    <div className="flex justify-between items-center">
                      <span className="text-[9px] font-bold uppercase tracking-wider bg-black/60 px-2 py-0.5 rounded-full text-cyan-300 backdrop-blur">
                        {t.badge}
                      </span>
                      <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
                    </div>
                    <div className="text-white font-bold text-xs tracking-tight truncate group-hover:text-cyan-300 transition">
                      {t.name}
                    </div>
                  </div>

                  <div className="space-y-0.5">
                    <h4 className="text-xs font-bold text-white truncate">{t.name}</h4>
                    <p className="text-[10px] font-medium text-cyan-400 font-mono truncate">{t.tagline}</p>
                  </div>
                </div>

                <Link
                  href="/upload"
                  className="w-full py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-[11px] font-bold rounded-lg flex items-center justify-center gap-1 transition"
                >
                  Use Animated <ArrowUpRight className="w-3 h-3" />
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* 50 Professional Showcase Themes Section */}
        <div className="space-y-6 pt-10 border-t border-slate-800">
          <h3 className="text-xl font-extrabold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
            <Palette className="w-5 h-5 text-purple-400" /> 50 Professional Showcase Themes
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {SHOWCASE_THEME_LIST.map((t) => (
              <div
                key={t.id}
                className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-4 flex flex-col justify-between hover:border-purple-500/40 transition group shadow-xl"
              >
                <div className="space-y-3">
                  <div className={`h-28 rounded-2xl bg-gradient-to-tr ${t.gradient} p-3 border border-white/10 flex flex-col justify-between relative overflow-hidden`}>
                    <div className="flex justify-between items-center">
                      <span className="text-[9px] font-bold uppercase tracking-wider bg-black/50 px-2 py-0.5 rounded-full text-white backdrop-blur">
                        {t.badge}
                      </span>
                      <Sparkles className="w-3.5 h-3.5 text-purple-400 opacity-60" />
                    </div>
                    <div className="text-white font-bold text-sm tracking-tight truncate group-hover:text-purple-300 transition">
                      {t.name}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-sm font-bold text-white truncate">{t.name}</h3>
                    <p className="text-[11px] font-medium text-cyan-400 font-mono truncate">{t.tagline}</p>
                  </div>
                </div>

                <Link
                  href="/upload"
                  className="w-full py-2.5 bg-slate-800 hover:bg-purple-600 text-slate-200 hover:text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition"
                >
                  Use Theme <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
