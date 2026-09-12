"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/landing/Navbar";
import ThemeRenderer from "@/components/portfolio/ThemeRenderer";
import { PortfolioData, ThemeType } from "@/types/portfolio";
import {
  getStoredPortfolios,
  saveStoredPortfolio,
  INITIAL_PORTFOLIO,
} from "@/lib/storage/local-store";
import {
  Palette,
  ArrowRight,
  Sparkles,
  Eye,
  X,
  Monitor,
  Smartphone,
  CheckCircle2,
  Search,
  Filter,
} from "lucide-react";

export interface ThemeCardItem {
  id: ThemeType;
  name: string;
  category:
    | "flagship"
    | "animated"
    | "aiml"
    | "developer"
    | "student"
    | "creative"
    | "minimal"
    | "threed"
    | "cyber";
  tag: string;
  desc: string;
  gradient: string;
}

const COMPLETE_61_THEME_CATALOG: ThemeCardItem[] = [
  // 1 FLAGSHIP
  {
    id: "top1-premier",
    name: "👑 Top-1 Premier Flagship",
    category: "flagship",
    tag: "Flagship AI Theme",
    desc: "Ultimate high-impact portfolio layout designed for Senior AI/ML & Full-Stack Engineers.",
    gradient: "from-black via-[#0d0d0d] to-[#e50914]",
  },
  // 10 ANIMATED
  {
    id: "animated-kinetic-type",
    name: "Kinetic Marquee Motion",
    category: "animated",
    tag: "Animated ⚡",
    desc: "Spinning Ticker & Slide Motion",
    gradient: "from-[#facc15] via-amber-600 to-black",
  },
  {
    id: "animated-laser-neon",
    name: "Cyber Laser Particle Rain",
    category: "animated",
    tag: "Animated ⚡",
    desc: "Laser Beams & Glowing Particles",
    gradient: "from-[#ff0055] via-[#00f0ff] to-black",
  },
  {
    id: "animated-3d-orbs",
    name: "3D Spatial Floating Orbs",
    category: "animated",
    tag: "Animated ⚡",
    desc: "3D Perspective & Spatial Depth",
    gradient: "from-violet-950 via-pink-950 to-[#030712]",
  },
  {
    id: "animated-glitch-hacker",
    name: "Cyberpunk Matrix Glitch",
    category: "animated",
    tag: "Animated ⚡",
    desc: "CRT Scanlines & Text Glitch FX",
    gradient: "from-emerald-950 via-red-950 to-[#050505]",
  },
  {
    id: "animated-aurora-mesh",
    name: "Living Aurora Borealis",
    category: "animated",
    tag: "Animated ⚡",
    desc: "Morphing Liquid Aurora Gradient",
    gradient: "from-teal-950 via-purple-950 to-[#070510]",
  },
  {
    id: "animated-elastic-cards",
    name: "Elastic Physics Hover",
    category: "animated",
    tag: "Animated ⚡",
    desc: "Spring Physics Micro-Interactions",
    gradient: "from-orange-950 via-blue-950 to-[#080c14]",
  },
  {
    id: "animated-particle-constellation",
    name: "Node Constellation",
    category: "animated",
    tag: "Animated ⚡",
    desc: "Pulsating Star Network Lines",
    gradient: "from-sky-950 via-indigo-950 to-[#0b0f19]",
  },
  {
    id: "animated-liquid-glass",
    name: "Liquid Glass Bubbles",
    category: "animated",
    tag: "Animated ⚡",
    desc: "Floating Glass Bubble Blur",
    gradient: "from-cyan-950 via-blue-950 to-[#040814]",
  },
  {
    id: "animated-synthwave-retro",
    name: "8-Bit Retro Synthwave",
    category: "animated",
    tag: "Animated ⚡",
    desc: "80s Moving Grid & Retro Sunset",
    gradient: "from-purple-950 via-rose-950 to-[#0d021a]",
  },
  {
    id: "animated-prism-refraction",
    name: "Holographic Prism Glow",
    category: "animated",
    tag: "Animated ⚡",
    desc: "Iridescent Rainbow Shimmer Sweep",
    gradient: "from-cyan-950 via-pink-950 to-[#05060f]",
  },

  // 50 SPECIALIZED SHOWCASE THEMES
  {
    id: "kuber-ai-creative",
    name: "Neural Spectrum AI",
    category: "aiml",
    tag: "AI Creative",
    desc: "AI / Creative Studio & Agentic Workflows",
    gradient: "from-purple-900 via-pink-950 to-slate-950",
  },
  {
    id: "tvnskm-aiml-fullstack",
    name: "Quantum FullStack Matrix",
    category: "aiml",
    tag: "AI Matrix",
    desc: "AI/ML + Full Stack Engineering",
    gradient: "from-cyan-950 via-purple-950 to-black",
  },
  {
    id: "priyanshu-creative",
    name: "Generative Canvas AI",
    category: "aiml",
    tag: "Generative AI",
    desc: "AI/ML + Generative Art & Models",
    gradient: "from-[#06070c] to-purple-950",
  },
  {
    id: "kirti-aiml",
    name: "Glassmorphic LLM Studio",
    category: "aiml",
    tag: "Lovable Glass",
    desc: "LLM & Machine Learning Research Studio",
    gradient: "from-blue-950 to-purple-950",
  },
  {
    id: "harsh-aiml-mern",
    name: "Cyberpunk MERN Stack",
    category: "developer",
    tag: "Cyberpunk",
    desc: "AIML + MERN Full Stack Developer",
    gradient: "from-zinc-950 to-red-950",
  },
  {
    id: "hari-aiml",
    name: "Deep Learning Intelligence",
    category: "aiml",
    tag: "Neural Net",
    desc: "Deep Neural Network & PyTorch Specialist",
    gradient: "from-[#06070c] to-[#11111a]",
  },
  {
    id: "nishil-cloud",
    name: "Cloud DevOps Architect",
    category: "developer",
    tag: "Cloud Architect",
    desc: "AI/ML + Cloud Infrastructure & K8s",
    gradient: "from-[#080d1a] to-blue-950",
  },
  {
    id: "prince-ai",
    name: "Dark Obsidian Minimalist",
    category: "minimal",
    tag: "Dark Minimal",
    desc: "Sleek Dark Mode Portfolio for AI Devs",
    gradient: "from-[#050505] to-zinc-900",
  },
  {
    id: "sahil-aiml-student",
    name: "Academic AI Scholar",
    category: "student",
    tag: "Academic",
    desc: "AI/ML Student & Paper Publications",
    gradient: "from-[#070b12] to-indigo-950",
  },
  {
    id: "suraj-agentic-ai",
    name: "Agentic AI Workflows",
    category: "aiml",
    tag: "LLM Agents",
    desc: "Autonomous AI Agents & RAG Architecture",
    gradient: "from-purple-950 to-cyan-950",
  },
  {
    id: "srikhanth-arvr",
    name: "Vision OS Spatial 3D",
    category: "threed",
    tag: "Spatial 3D",
    desc: "AI/ML + AR/VR Spatial Interfaces",
    gradient: "from-[#07050d] to-pink-950",
  },
  {
    id: "abhinav-cv-ml",
    name: "Computer Vision Studio",
    category: "aiml",
    tag: "Vision ML",
    desc: "ML + Computer Vision & Image Processing",
    gradient: "from-[#06070c] to-[#0d0f18]",
  },
  {
    id: "sahil-sahu-ai",
    name: "Minimalist CS Dark",
    category: "minimal",
    tag: "Clean Dark",
    desc: "Clean Computer Science Developer Layout",
    gradient: "from-slate-950 to-slate-900",
  },
  {
    id: "shreya-datascience",
    name: "Data Science Analytics",
    category: "aiml",
    tag: "Analytics",
    desc: "AI/ML Data Pipelines & Visualization",
    gradient: "from-purple-950 to-slate-950",
  },
  {
    id: "aman-genai",
    name: "GenAI RAG Systems",
    category: "aiml",
    tag: "RAG Prompt",
    desc: "Generative AI & LLM Embeddings",
    gradient: "from-[#06070c] to-[#141724]",
  },
  {
    id: "nikhil-fullstack",
    name: "Full Stack Reactive AI",
    category: "developer",
    tag: "Full Stack",
    desc: "Next.js & Microservices Engineer",
    gradient: "from-[#0a0a0f] to-cyan-950",
  },
  {
    id: "abhay-cs-ai",
    name: "CS Algorithm Systems",
    category: "student",
    tag: "CS Algorithms",
    desc: "Algorithms & Data Structures Portfolio",
    gradient: "from-[#070b12] to-blue-950",
  },
  {
    id: "saad-fullstack",
    name: "Vibrant Web Engineer",
    category: "developer",
    tag: "Vibrant Web",
    desc: "High-Impact Full Stack Web Applications",
    gradient: "from-[#0a0a0f] to-emerald-950",
  },
  {
    id: "prashant-cse-aiml",
    name: "CSE Research Studio",
    category: "student",
    tag: "CSE Research",
    desc: "Computer Science Research Projects",
    gradient: "from-[#070b12] to-indigo-950",
  },
  {
    id: "anmol-creative-sys",
    name: "Creative Systems DevOps",
    category: "creative",
    tag: "DevOps Sys",
    desc: "Creative Front-end & Systems Engineering",
    gradient: "from-[#080d1a] to-[#0f172a]",
  },
  {
    id: "abhishek-beginner",
    name: "Beginner CS Scholar",
    category: "student",
    tag: "Beginner CS",
    desc: "Clean Academic Portfolio for Students",
    gradient: "from-[#070b12] to-slate-900",
  },
  {
    id: "harsh-cs-student",
    name: "Minimal CS Developer",
    category: "student",
    tag: "Minimal CS",
    desc: "Coursework & Projects Highlight Layout",
    gradient: "from-[#070b12] to-slate-950",
  },
  {
    id: "dheeraj-mern",
    name: "MERN Stack Neon",
    category: "developer",
    tag: "React Node",
    desc: "Full Stack MERN Developer Showcase",
    gradient: "from-[#0a0a0f] to-[#11111a]",
  },
  {
    id: "rishav-java-backend",
    name: "Spring Boot Enterprise",
    category: "developer",
    tag: "Spring Boot",
    desc: "Java Backend & Distributed Systems",
    gradient: "from-[#080d14] to-amber-950",
  },
  {
    id: "adil-java-microservices",
    name: "Java Microservices Architect",
    category: "developer",
    tag: "Enterprise Java",
    desc: "Microservices & High Scalability Layout",
    gradient: "from-[#080d14] to-red-950",
  },
  {
    id: "megha-mern",
    name: "CS MERN Stack",
    category: "developer",
    tag: "CS MERN",
    desc: "Full Stack JavaScript Development",
    gradient: "from-[#0a0a0f] to-[#141724]",
  },
  {
    id: "harsh-backend-ai",
    name: "Python FastAPI AI",
    category: "aiml",
    tag: "Python FastAPI",
    desc: "Python API Server & ML Model Serving",
    gradient: "from-[#06070c] to-[#0d0f18]",
  },
  {
    id: "karan-webdev",
    name: "Responsive Web Architect",
    category: "developer",
    tag: "Web Stack",
    desc: "Modern Responsive Web Applications",
    gradient: "from-[#0a0a0f] to-slate-900",
  },
  {
    id: "shashank-fullstack",
    name: "Full Stack SDE Studio",
    category: "developer",
    tag: "Full Stack",
    desc: "Production-ready Software Engineer Portfolio",
    gradient: "from-[#0a0a0f] to-cyan-950",
  },
  {
    id: "suraj-mern",
    name: "High-Impact MERN",
    category: "developer",
    tag: "MERN Full",
    desc: "MongoDB, Express, React & Node Specialist",
    gradient: "from-[#0a0a0f] to-emerald-950",
  },
  {
    id: "abdulhussain-uiux",
    name: "Figma UI/UX Design",
    category: "creative",
    tag: "Figma Design",
    desc: "UI/UX Design Systems & Interfaces",
    gradient: "from-black to-zinc-950",
  },
  {
    id: "sakesh-fullstack",
    name: "Modern Full Stack",
    category: "developer",
    tag: "Full Stack",
    desc: "Full Stack Software Architecture",
    gradient: "from-[#0a0a0f] to-blue-950",
  },
  {
    id: "arun-fullstack",
    name: "Personal Dev Showcase",
    category: "developer",
    tag: "Developer",
    desc: "Personal Engineering Projects",
    gradient: "from-[#0a0a0f] to-slate-900",
  },
  {
    id: "ritik-cybersec",
    name: "Cyber Security Sentinel",
    category: "cyber",
    tag: "Cyber Sec",
    desc: "Ethical Hacking, CTF & Security Audits",
    gradient: "from-[#060a08] to-emerald-950",
  },
  {
    id: "shivam-frontend",
    name: "React & Tailwind UI",
    category: "creative",
    tag: "React CSS",
    desc: "Component Libraries & Design Systems",
    gradient: "from-[#0a0a0f] to-cyan-950",
  },
  {
    id: "vinay-java-fullstack",
    name: "Java Full Stack Enterprise",
    category: "developer",
    tag: "Java React",
    desc: "Enterprise Web & Java Ecosystem",
    gradient: "from-[#080d14] to-amber-950",
  },
  {
    id: "subhadeep-fullstack",
    name: "Clean Full Stack",
    category: "developer",
    tag: "Full Stack",
    desc: "Clean Modular Architecture",
    gradient: "from-[#0a0a0f] to-slate-950",
  },
  {
    id: "wasif-cs-student",
    name: "Minimalist CS Student",
    category: "student",
    tag: "Student",
    desc: "Simple Student Resume & Projects",
    gradient: "from-[#070b12] to-slate-900",
  },
  {
    id: "prince-shah-learning",
    name: "Student Learner Studio",
    category: "student",
    tag: "Learner",
    desc: "Student Growth & Learning Tracker",
    gradient: "from-[#070b12] to-zinc-900",
  },
  {
    id: "dhanaraj-frontend-ai",
    name: "Next.js & AI Tools",
    category: "developer",
    tag: "Next AI",
    desc: "Next.js 14 App Router & AI Integrations",
    gradient: "from-[#06070c] to-cyan-950",
  },
  {
    id: "ayush-iot-creative",
    name: "IoT Hardware Telemetry",
    category: "creative",
    tag: "Hardware IoT",
    desc: "Embedded Systems & Telemetry Dashboards",
    gradient: "from-[#0d0d09] to-amber-950",
  },
  {
    id: "priyank-fullstack",
    name: "Full Stack Software",
    category: "developer",
    tag: "Web Engineer",
    desc: "Software Development & API Engineering",
    gradient: "from-[#0a0a0f] to-slate-950",
  },
  {
    id: "aadi-neobrutalist",
    name: "Swiss Neo-Brutalist Poster",
    category: "creative",
    tag: "Swiss Poster",
    desc: "High-Contrast Neo-Brutalist Typography",
    gradient: "from-black to-zinc-900",
  },
  {
    id: "cs-student-collection",
    name: "CS Academic Collection",
    category: "student",
    tag: "Academic Paper",
    desc: "Degree Coursework & Academic Research",
    gradient: "from-[#070b12] to-indigo-950",
  },
  {
    id: "emma-bostian-curated",
    name: "Star Portfolio Collection",
    category: "creative",
    tag: "Starred Collection",
    desc: "Curated Star Developer Portfolio Layout",
    gradient: "from-[#101010] to-[#1a1a1a]",
  },
  {
    id: "github-topic-student",
    name: "Open Source Student",
    category: "student",
    tag: "GitHub Heatmap",
    desc: "GitHub 52-Week Commit Heatmap & OS Work",
    gradient: "from-[#070b12] to-[#0e1626]",
  },
  {
    id: "sitesplaced-examples",
    name: "SitesPlaced Engineer Examples",
    category: "developer",
    tag: "System SLA",
    desc: "High-Availability Distributed Systems",
    gradient: "from-[#0a0a0f] to-[#11111a]",
  },
  {
    id: "nikola-janjic-2025",
    name: "2026 Edition Collection",
    category: "threed",
    tag: "HUD 2026",
    desc: "Futuristic HUD Glass Interface Design",
    gradient: "from-[#0a0a0f] to-cyan-950",
  },
  {
    id: "gist-inspiration",
    name: "Gist Inspiration Grid",
    category: "developer",
    tag: "Gist Collection",
    desc: "Gist Layout Architecture for Developers",
    gradient: "from-[#101010] to-[#202020]",
  },
  {
    id: "onehour-digital",
    name: "OneHour Creative Showcase",
    category: "creative",
    tag: "OneHour Showcase",
    desc: "Fast-loading Creative Digital Showcase",
    gradient: "from-[#050505] to-zinc-950",
  },
];

function ThemesContent() {
  const router = useRouter();
  const [portfolio, setPortfolio] = useState<PortfolioData>(INITIAL_PORTFOLIO);
  const [selectedTheme, setSelectedTheme] = useState<ThemeType>("minimal");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [previewTheme, setPreviewTheme] = useState<ThemeCardItem | null>(null);
  const [previewDevice, setPreviewDevice] = useState<"desktop" | "mobile">(
    "desktop",
  );

  useEffect(() => {
    let portfolioId = INITIAL_PORTFOLIO.id;
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const id = params.get("id");
      if (id) portfolioId = id;
    }
    const list = getStoredPortfolios();
    const found = list.find((p) => p.id === portfolioId);
    if (found) {
      setPortfolio(found);
      setSelectedTheme(found.customization?.theme || "minimal");
    }
  }, []);

  const filteredThemes = COMPLETE_61_THEME_CATALOG.filter((t) => {
    const matchesCategory =
      categoryFilter === "all" || t.category === categoryFilter;
    const matchesSearch =
      searchQuery.trim() === "" ||
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.tag.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleUseTheme = (themeId: ThemeType) => {
    const updated: PortfolioData = {
      ...portfolio,
      customization: {
        ...portfolio.customization,
        theme: themeId,
      },
    };
    saveStoredPortfolio(updated);
    router.push(`/editor/${updated.id}`);
  };

  const samplePreviewData: PortfolioData = {
    ...portfolio,
    customization: {
      ...portfolio.customization,
      theme: previewTheme?.id || selectedTheme,
    },
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-10">
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold bg-cyan-950/80 px-3.5 py-1.5 rounded-full border border-cyan-800">
          Official 61 Theme Gallery
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white">
          Explore All 61 Handcrafted Themes
        </h1>
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          Featuring 1 Premier Flagship Theme, 10 Animated Kinetic Designs, and
          50 Specialized Developer Themes. 100% data preservation when switching
          themes.
        </p>
      </div>

      {/* Search and Category Filters */}
      <div className="space-y-6 max-w-5xl mx-auto">
        <div className="relative max-w-md mx-auto">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search all 61 themes by name, skill, or style..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-slate-900 border border-slate-800 rounded-2xl text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition shadow-inner"
          />
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 pb-4 border-b border-slate-800">
          {[
            {
              id: "all",
              label: `All Themes (${COMPLETE_61_THEME_CATALOG.length})`,
            },
            { id: "flagship", label: "👑 Flagship" },
            { id: "animated", label: "⚡ Animated (10)" },
            { id: "aiml", label: "🤖 AI & ML" },
            { id: "developer", label: "💻 Developer" },
            { id: "student", label: "🎓 CS Student" },
            { id: "creative", label: "🎨 Creative" },
            { id: "minimal", label: "✨ Minimal & Glass" },
            { id: "threed", label: "🌌 3D & Spatial" },
            { id: "cyber", label: "🛡️ Cybersecurity" },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategoryFilter(cat.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition ${
                categoryFilter === cat.id
                  ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20"
                  : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Theme Count & Search Feedback */}
      <div className="flex justify-between items-center text-xs text-slate-400 font-mono">
        <span>Showing {filteredThemes.length} of 61 themes</span>
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="text-cyan-400 hover:underline"
          >
            Clear search filter
          </button>
        )}
      </div>

      {/* Theme Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredThemes.map((t) => {
          const isSelected = selectedTheme === t.id;
          return (
            <div
              key={t.id}
              className={`p-6 bg-slate-900 border rounded-3xl transition flex flex-col justify-between space-y-6 shadow-xl ${
                isSelected
                  ? "border-cyan-400 bg-cyan-950/20 shadow-cyan-500/20"
                  : "border-slate-800 hover:border-slate-700"
              }`}
            >
              <div className="space-y-4">
                <div
                  className={`h-44 rounded-2xl bg-gradient-to-tr ${t.gradient} p-5 border border-white/10 flex flex-col justify-between relative overflow-hidden group`}
                >
                  <div className="flex justify-between items-center z-10">
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-black/60 px-3 py-1 rounded-full text-white backdrop-blur border border-white/10">
                      {t.tag}
                    </span>
                    {isSelected && (
                      <CheckCircle2 className="w-5 h-5 text-cyan-400" />
                    )}
                  </div>

                  <button
                    onClick={() => setPreviewTheme(t)}
                    className="self-center z-10 px-4 py-2 bg-black/60 hover:bg-black/80 backdrop-blur text-white text-xs font-semibold rounded-xl border border-white/20 flex items-center gap-1.5 transition transform group-hover:scale-105"
                  >
                    <Eye className="w-3.5 h-3.5 text-cyan-400" /> Live
                    Interactive Preview
                  </button>
                </div>

                <div>
                  <h3 className="font-bold text-white text-lg">{t.name}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed mt-1">
                    {t.desc}
                  </p>
                </div>
              </div>

              <div className="flex gap-2 pt-2 border-t border-slate-800">
                <button
                  onClick={() => setPreviewTheme(t)}
                  className="px-3 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700 flex items-center gap-1 transition"
                >
                  <Eye className="w-3.5 h-3.5" /> Preview
                </button>

                <button
                  onClick={() => handleUseTheme(t.id)}
                  className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                    isSelected
                      ? "bg-cyan-500 text-slate-950"
                      : "bg-blue-600 hover:bg-blue-500 text-white"
                  }`}
                >
                  {isSelected ? "Currently Selected" : "Use Theme"}{" "}
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* LIVE PREVIEW MODAL DRAWER */}
      {previewTheme && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-in fade-in">
          <div className="bg-slate-950 border border-slate-800 rounded-3xl w-full max-w-5xl h-[90vh] flex flex-col overflow-hidden shadow-2xl relative">
            <div className="p-4 bg-slate-900 border-b border-slate-800 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold text-white">
                  {previewTheme.name} — Live Interactive Preview
                </span>
                <span className="text-[10px] font-mono uppercase bg-cyan-950 text-cyan-300 px-2.5 py-0.5 rounded-full border border-cyan-800">
                  {previewTheme.tag}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex bg-slate-950 p-1 rounded-lg border border-slate-800 gap-1 text-xs">
                  <button
                    onClick={() => setPreviewDevice("desktop")}
                    className={`px-3 py-1 rounded transition flex items-center gap-1 ${
                      previewDevice === "desktop"
                        ? "bg-blue-600 text-white font-medium"
                        : "text-slate-400"
                    }`}
                  >
                    <Monitor className="w-3.5 h-3.5" /> Desktop
                  </button>
                  <button
                    onClick={() => setPreviewDevice("mobile")}
                    className={`px-3 py-1 rounded transition flex items-center gap-1 ${
                      previewDevice === "mobile"
                        ? "bg-blue-600 text-white font-medium"
                        : "text-slate-400"
                    }`}
                  >
                    <Smartphone className="w-3.5 h-3.5" /> Mobile
                  </button>
                </div>

                <button
                  onClick={() => handleUseTheme(previewTheme.id)}
                  className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-xs rounded-xl shadow transition"
                >
                  Use Theme Now
                </button>

                <button
                  onClick={() => setPreviewTheme(null)}
                  className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="flex-1 bg-slate-900 overflow-y-auto flex justify-center p-4">
              <div
                className={`transition-all duration-300 ${
                  previewDevice === "mobile"
                    ? "w-[375px] my-4 rounded-3xl border-8 border-slate-800 shadow-2xl overflow-hidden"
                    : "w-full"
                }`}
              >
                <ThemeRenderer data={samplePreviewData} />
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default function ThemesPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col">
      <Navbar />
      <div className="flex-1">
        <ThemesContent />
      </div>
    </div>
  );
}
