'use client';

import React from 'react';
import { VisualCustomization, ThemeType } from '@/types/portfolio';
import { Palette, Type, Layout, Sparkles, Check, Zap, Crown } from 'lucide-react';

interface StyleCustomizerProps {
  customization: VisualCustomization;
  onChange: (customization: VisualCustomization) => void;
}

const TOP_1_THEME: { id: ThemeType; name: string; desc: string } = {
  id: 'top1-premier',
  name: '👑 TOP 1 PREMIER FLAGSHIP THEME',
  desc: 'Ultra-luxurious SDE & AI/ML Developer Flagship Portfolio (Satyam Kumar Edition)',
};

const ANIMATED_THEMES: { id: ThemeType; name: string; desc: string }[] = [
  { id: 'animated-kinetic-type', name: '⚡ Kinetic Marquee Motion', desc: 'Infinite spinning text banner & dynamic slide transitions' },
  { id: 'animated-laser-neon', name: '⚡ Cyber Laser Particle Rain', desc: 'Laser grid sweeps with glowing particle physics' },
  { id: 'animated-3d-orbs', name: '⚡ 3D Spatial Floating Orbs', desc: 'Interactive 3D depth tilt & floating spatial glow' },
  { id: 'animated-glitch-hacker', name: '⚡ Cyberpunk Matrix Glitch', desc: 'Real-time text glitch effect & CRT scanlines' },
  { id: 'animated-aurora-mesh', name: '⚡ Living Aurora Borealis', desc: 'Flowing interactive mesh gradient blur' },
  { id: 'animated-elastic-cards', name: '⚡ Elastic Physics Hover', desc: 'Spring physics micro-interactions & elastic cards' },
  { id: 'animated-particle-constellation', name: '⚡ Node Constellation', desc: 'Particle network nodes connecting on hover' },
  { id: 'animated-liquid-glass', name: '⚡ Liquid Glass Bubbles', desc: 'Floating glass bubble blur & organic motion' },
  { id: 'animated-synthwave-retro', name: '⚡ 8-Bit Retro Synthwave', desc: 'Neon grid horizon & retro synthwave sunset' },
  { id: 'animated-prism-refraction', name: '⚡ Holographic Prism Glow', desc: 'Prism rainbow refraction & iridescent cards' },
];

const SHOWCASE_THEMES: { id: ThemeType; name: string; desc: string }[] = [
  { id: 'kuber-ai-creative', name: '1. Neural Spectrum AI', desc: 'AI Spatial & Generative Creative Studio' },
  { id: 'tvnskm-aiml-fullstack', name: '2. Quantum FullStack Matrix', desc: 'Neural Network Matrix & Full Stack' },
  { id: 'priyanshu-creative', name: '3. Generative Canvas AI', desc: 'Generative AI & Interactive Visuals' },
  { id: 'kirti-aiml', name: '4. Glassmorphic LLM Studio', desc: 'Lovable Glass & Deep Learning Models' },
  { id: 'harsh-aiml-mern', name: '5. Cyberpunk MERN Stack', desc: 'MERN Stack & AI Cyberpunk' },
  { id: 'hari-aiml', name: '6. Deep Learning Intelligence', desc: 'AI Intelligence & Data Models' },
  { id: 'nishil-cloud', name: '7. Cloud DevOps Architect', desc: 'AWS/GCP Cloud Architecture & Terraform' },
  { id: 'prince-ai', name: '8. Dark Obsidian Minimalist', desc: 'Dark Minimalist AI Developer' },
  { id: 'sahil-aiml-student', name: '9. Academic AI Scholar', desc: 'University AI Student & Research' },
  { id: 'suraj-agentic-ai', name: '10. Agentic AI Workflows', desc: 'Autonomous LLM Agents & System Workflows' },
  { id: 'srikhanth-arvr', name: '11. Vision OS Spatial 3D', desc: 'Vision OS Spatial Glass & WebGL 3D' },
  { id: 'abhinav-cv-ml', name: '12. Computer Vision Studio', desc: 'PyTorch, OpenCV & Neural Vision' },
  { id: 'sahil-sahu-ai', name: '13. Minimalist CS Dark', desc: 'Clean Dark AI Student Showcase' },
  { id: 'shreya-datascience', name: '14. Data Science Analytics', desc: 'Pandas, Scikit & AI Data Analytics' },
  { id: 'aman-genai', name: '15. GenAI RAG Systems', desc: 'LLM Prompt Engineering & RAG Systems' },
  { id: 'nikhil-fullstack', name: '16. Full Stack Reactive AI', desc: 'React, Node.js & AI Integrations' },
  { id: 'abhay-cs-ai', name: '17. CS Algorithm Systems', desc: 'Computer Science & AI Algorithms' },
  { id: 'saad-fullstack', name: '18. Vibrant Web Engineer', desc: 'Vibrant Full Stack Web Developer' },
  { id: 'prashant-cse-aiml', name: '19. CSE Research Studio', desc: 'CSE Academic & Machine Learning' },
  { id: 'anmol-creative-sys', name: '20. Creative Systems DevOps', desc: 'Creative Systems & DevOps' },
  { id: 'abhishek-beginner', name: '21. Beginner CS Scholar', desc: 'Clean Beginner CS Student' },
  { id: 'harsh-cs-student', name: '22. Minimal CS Developer', desc: 'Minimal CS Student Showcase' },
  { id: 'dheeraj-mern', name: '23. MERN Stack Neon', desc: 'MongoDB, Express, React, Node' },
  { id: 'rishav-java-backend', name: '24. Spring Boot Enterprise', desc: 'Spring Boot & Microservices' },
  { id: 'adil-java-microservices', name: '25. Java Microservices Architect', desc: 'Enterprise Java & Database Systems' },
  { id: 'megha-mern', name: '26. CS MERN Stack', desc: 'MERN Stack & Computer Science' },
  { id: 'harsh-backend-ai', name: '27. Python FastAPI AI', desc: 'Python, FastAPI & AI Pipelines' },
  { id: 'karan-webdev', name: '28. Responsive Web Architect', desc: 'Responsive Web Developer' },
  { id: 'shashank-fullstack', name: '29. Full Stack SDE Studio', desc: 'Full Stack Software Engineer' },
  { id: 'suraj-mern', name: '30. High-Impact MERN', desc: 'High-Impact MERN Developer' },
  { id: 'abdulhussain-uiux', name: '31. Figma UI/UX Design', desc: 'Figma UI/UX & Web Design' },
  { id: 'sakesh-fullstack', name: '32. Modern Full Stack', desc: 'Modern Full Stack Architect' },
  { id: 'arun-fullstack', name: '33. Personal Dev Showcase', desc: 'Personal Developer Portfolio' },
  { id: 'ritik-cybersec', name: '34. Cyber Security Sentinel', desc: 'Penetration Testing & CTF Badges' },
  { id: 'shivam-frontend', name: '35. React & Tailwind UI', desc: 'React & Tailwind CSS Specialist' },
  { id: 'vinay-java-fullstack', name: '36. Java Full Stack Enterprise', desc: 'Java, Spring Boot & React' },
  { id: 'subhadeep-fullstack', name: '37. Clean Full Stack', desc: 'Clean Full Stack Showcase' },
  { id: 'wasif-cs-student', name: '38. Minimalist CS Student', desc: 'Minimalist Student Portfolio' },
  { id: 'prince-shah-learning', name: '39. Student Learner Studio', desc: 'Student Learner Portfolio' },
  { id: 'dhanaraj-frontend-ai', name: '40. Next.js & AI Tools', desc: 'Next.js, Tailwind & AI Tools' },
  { id: 'ayush-iot-creative', name: '41. IoT Hardware Telemetry', desc: 'Circuit Board & Hardware Telemetry' },
  { id: 'priyank-fullstack', name: '42. Full Stack Software', desc: 'Full Stack Web Software' },
  { id: 'aadi-neobrutalist', name: '43. Swiss Neo-Brutalist Poster', desc: 'Bold Swiss Neo-Brutalist Poster' },
  { id: 'cs-student-collection', name: '44. CS Academic Collection', desc: 'Academic University Coursework & GPA' },
  { id: 'emma-bostian-curated', name: '45. Star Portfolio Collection', desc: 'Top Starred Developer Collection' },
  { id: 'github-topic-student', name: '46. Open Source Student', desc: 'Open Source Student Showcase' },
  { id: 'sitesplaced-examples', name: '47. SitesPlaced Engineer Examples', desc: 'Curated Software Engineer Showcase' },
  { id: 'nikola-janjic-2025', name: '48. 2025 Edition Collection', desc: '1,000+ Developer Portfolio 2025' },
  { id: 'gist-inspiration', name: '49. Gist Inspiration Grid', desc: 'Curated Gist Developer Showcase' },
  { id: 'onehour-digital', name: '50. OneHour Creative Showcase', desc: 'High-Converting Frontend Showcase' },
];

const COLOR_PRESETS = [
  { primary: '#e50914', accent: '#dc2626', name: 'Crimson Red Flagship' },
  { primary: '#0c8ee9', accent: '#8b5cf6', name: 'Ocean Cyan & Violet' },
  { primary: '#00ff66', accent: '#10b981', name: 'Cyber Matrix Neon Green' },
  { primary: '#facc15', accent: '#f59e0b', name: 'Canary Yellow Poster' },
  { primary: '#8b5cf6', accent: '#f43f5e', name: 'Purple & Rose' },
];

export default function StyleCustomizer({ customization, onChange }: StyleCustomizerProps) {
  return (
    <div className="space-y-8 text-slate-200 text-sm p-4">
      {/* 👑 TOP 1 PREMIER PORTFOLIO THEME SECTION */}
      <div className="space-y-4">
        <h3 className="text-xs font-black text-[#e50914] uppercase tracking-wider flex items-center gap-2">
          <Crown className="w-4 h-4 text-[#e50914] animate-bounce" /> TOP 1 PREMIER PORTFOLIO THEME
        </h3>
        <button
          onClick={() => onChange({ ...customization, theme: TOP_1_THEME.id })}
          className={`w-full p-5 rounded-2xl border text-left transition flex flex-col justify-between space-y-3 relative overflow-hidden ${
            customization.theme === TOP_1_THEME.id
              ? 'bg-[#e50914]/20 border-[#e50914] text-white shadow-2xl shadow-[#e50914]/30 ring-2 ring-[#e50914]'
              : 'bg-[#0d0d12] border-[#e50914]/40 text-slate-200 hover:border-[#e50914] hover:bg-[#14141d]'
          }`}
        >
          <div className="flex justify-between items-center w-full">
            <span className="font-black text-sm text-[#e50914] flex items-center gap-2">
              <Crown className="w-4 h-4 text-amber-400" /> {TOP_1_THEME.name}
            </span>
            {customization.theme === TOP_1_THEME.id && <Check className="w-5 h-5 text-[#e50914] shrink-0" />}
          </div>
          <span className="text-xs text-slate-300 leading-relaxed font-light">{TOP_1_THEME.desc}</span>
          <div className="flex items-center gap-2 pt-1">
            <span className="px-2.5 py-0.5 bg-[#e50914]/20 border border-[#e50914]/50 text-[#e50914] text-[10px] font-mono font-bold rounded-full">
              SDE & AI/ML FLAGSHIP
            </span>
            <span className="px-2.5 py-0.5 bg-slate-900 border border-slate-800 text-slate-300 text-[10px] font-mono rounded-full">
              SATYAM KUMAR EDITION
            </span>
          </div>
        </button>
      </div>

      {/* ⚡ 10 ANIMATED PORTFOLIO THEMES SECTION */}
      <div className="space-y-4 pt-6 border-t border-slate-800">
        <h3 className="text-xs font-extrabold text-cyan-400 uppercase tracking-wider flex items-center gap-2">
          <Zap className="w-4 h-4 text-yellow-400 animate-pulse" /> 10 Animated Portfolio Themes
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {ANIMATED_THEMES.map((t) => (
            <button
              key={t.id}
              onClick={() => onChange({ ...customization, theme: t.id })}
              className={`p-4 rounded-xl border text-left transition flex flex-col justify-between space-y-2 ${
                customization.theme === t.id
                  ? 'bg-cyan-600/20 border-cyan-400 text-white shadow-lg shadow-cyan-500/20'
                  : 'bg-slate-900/90 border-cyan-500/30 text-slate-300 hover:border-cyan-400 hover:text-white'
              }`}
            >
              <div className="flex justify-between items-center w-full">
                <span className="font-extrabold text-xs text-cyan-300">{t.name}</span>
                {customization.theme === t.id && <Check className="w-4 h-4 text-cyan-400 shrink-0" />}
              </div>
              <span className="text-[11px] text-slate-400 leading-normal">{t.desc}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 🎨 50 SHOWCASE PORTFOLIO THEMES SECTION */}
      <div className="space-y-4 pt-6 border-t border-slate-800">
        <h3 className="text-xs font-extrabold text-purple-300 uppercase tracking-wider flex items-center gap-2">
          <Palette className="w-4 h-4 text-purple-400" /> 50 Showcase Portfolio Themes
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[420px] overflow-y-auto pr-1">
          {SHOWCASE_THEMES.map((t) => (
            <button
              key={t.id}
              onClick={() => onChange({ ...customization, theme: t.id })}
              className={`p-4 rounded-xl border text-left transition flex flex-col justify-between space-y-2 ${
                customization.theme === t.id
                  ? 'bg-purple-600/20 border-purple-500 text-white shadow-lg'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-white'
              }`}
            >
              <div className="flex justify-between items-center w-full">
                <span className="font-bold text-xs text-slate-100">{t.name}</span>
                {customization.theme === t.id && <Check className="w-4 h-4 text-purple-400 shrink-0" />}
              </div>
              <span className="text-[11px] text-slate-400 leading-normal">{t.desc}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Color Accent Presets */}
      <div className="space-y-4 pt-4 border-t border-slate-800">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-purple-400" /> Color Accent Presets
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {COLOR_PRESETS.map((cp, idx) => (
            <button
              key={idx}
              onClick={() => onChange({ ...customization, primaryColor: cp.primary, accentColor: cp.accent })}
              className="p-3 bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-xl flex items-center gap-3 transition"
            >
              <div className="flex gap-1.5 shrink-0">
                <span className="w-5 h-5 rounded-full border border-white/20" style={{ backgroundColor: cp.primary }}></span>
                <span className="w-5 h-5 rounded-full border border-white/20" style={{ backgroundColor: cp.accent }}></span>
              </div>
              <span className="text-xs font-medium text-slate-300">{cp.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Typography */}
      <div className="space-y-4 pt-4 border-t border-slate-800">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
          <Type className="w-4 h-4 text-emerald-400" /> Font Style
        </h3>
        <div className="flex gap-3">
          {[
            { id: 'inter', label: 'Inter (Sans)' },
            { id: 'jetbrains', label: 'JetBrains (Mono)' },
            { id: 'playfair', label: 'Playfair (Serif)' },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => onChange({ ...customization, fontFamily: f.id as any })}
              className={`flex-1 py-2.5 px-3 rounded-xl border text-xs font-medium transition ${
                customization.fontFamily === f.id
                  ? 'bg-emerald-600/20 border-emerald-500 text-emerald-300'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
