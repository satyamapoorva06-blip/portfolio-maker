"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import ThemeShowcase from "@/components/landing/ThemeShowcase";
import { isUserLoggedIn } from "@/lib/storage/local-store";
import {
  Sparkles,
  FileText,
  Palette,
  Edit3,
  Wand2,
  Github,
  Rocket,
  ArrowRight,
  ChevronDown,
  CheckCircle2,
  Phone,
  Mail,
  Linkedin,
  UserCheck,
  Target,
  BarChart3,
  Cpu,
  Layers,
  ShieldCheck,
  Check,
} from "lucide-react";

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    setLoggedIn(isUserLoggedIn());
  }, []);

  const createTarget = loggedIn ? "/upload" : "/login?next=/upload";

  const faqs = [
    {
      q: "Do I need coding skills to use Portify AI?",
      a: "Not at all! Portify AI automatically parses your resume, creates structured JSON career data, applies your chosen theme, and deploys it live for you.",
    },
    {
      q: "Does AI invent fake jobs or hallucinate experience?",
      a: "Never. Portify AI enforces strict schema boundaries to parse only verified details from your uploaded resume or manually entered profile.",
    },
    {
      q: "Can I edit my portfolio after deployment?",
      a: "Yes! Any updates made in our Visual Editor can be synced to GitHub and re-deployed live with one click.",
    },
    {
      q: "What file formats are supported for resume parsing?",
      a: "We support standard PDF (.pdf) and Microsoft Word (.docx) documents up to 10MB.",
    },
    {
      q: "Which deployment hosts are supported?",
      a: "Portify AI integrates natively with both Vercel and Netlify via official API integrations for one-click publishing.",
    },
    {
      q: "How many themes are available?",
      a: "Portify AI includes 61 handcrafted themes, including 1 Flagship Premier Theme, 10 Animated Motion Themes, and 50 Specialized Developer Designs.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500 selection:text-slate-950">
      <Navbar />

      {/* 1. HERO SECTION */}
      <HeroSection />

      {/* 2. HOW IT WORKS TIMELINE */}
      <section
        id="how-it-works"
        className="py-20 bg-slate-900/60 border-y border-slate-800"
      >
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold">
              Simple Workflow
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              How Portify AI Works
            </h2>
            <p className="text-slate-400 text-sm">
              5 simple steps from resume to published portfolio website.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {[
              {
                num: "01",
                title: "Upload Resume",
                desc: "Drag & drop PDF or DOCX file.",
              },
              {
                num: "02",
                title: "AI Extraction",
                desc: "Factual extraction of skills & experience.",
              },
              {
                num: "03",
                title: "Select Theme",
                desc: "Choose from 61 responsive designs.",
              },
              {
                num: "04",
                title: "Visual Editor",
                desc: "Fine-tune text & styling live.",
              },
              {
                num: "05",
                title: "Publish Live",
                desc: "1-click deployment to Vercel/Netlify.",
              },
            ].map((step, idx) => (
              <div
                key={idx}
                className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-3 relative hover:border-cyan-500/40 transition"
              >
                <span className="text-3xl font-black text-cyan-400 font-mono">
                  {step.num}
                </span>
                <h3 className="font-bold text-white text-base">{step.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. AI RESUME ANALYSIS */}
      <section className="py-20 bg-slate-950">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-xs font-semibold text-cyan-300">
              <FileText className="w-4 h-4 text-cyan-400" /> AI RESUME
              INTELLIGENCE
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Instant PDF & DOCX Parsing With Zero Hallucinations
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              Our AI engine parses complex multi-page resumes into structured
              JSON data models. It extracts work history, technologies,
              education, certifications, and project links without fabricating
              missing metrics or inventing jobs.
            </p>

            <ul className="space-y-3 text-xs text-slate-300 font-medium">
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />{" "}
                Supported Formats: PDF & DOCX files up to 10MB
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />{" "}
                Factual Guardrails: Enforces verified resume data schemas
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />{" "}
                STAR Method Enhancer: Generates Situation-Task-Action-Result
                bullets
              </li>
            </ul>

            <Link
              href={createTarget}
              className="inline-flex px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-xl items-center gap-2 transition"
            >
              Parse Resume Now <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl space-y-4 shadow-2xl font-mono text-xs text-slate-300">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-cyan-400 font-bold flex items-center gap-2">
                <Cpu className="w-4 h-4 text-cyan-400" /> Extracted Career
                Schema
              </span>
              <span className="text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-800 px-2 py-0.5 rounded-full">
                100% Factually Verified
              </span>
            </div>
            <pre className="bg-slate-950 p-4 rounded-xl text-slate-300 overflow-x-auto text-[11px] leading-relaxed">
              {`{
  "personal": {
    "name": "Satyam Kumar",
    "title": "Lead Software Engineer",
    "skills": ["Next.js", "TypeScript", "AI/ML", "Python"]
  },
  "experience": [
    {
      "role": "Lead Developer",
      "achievements": [
        "Architected AI resume analysis engine processing 100+ schemas"
      ]
    }
  ]
}`}
            </pre>
          </div>
        </div>
      </section>

      {/* 4. CAREER PROFILE INTELLIGENCE */}
      <section className="py-20 bg-slate-900/60 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <span className="text-xs font-mono uppercase tracking-widest text-purple-400 font-bold">
              Structured Career Graph
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Complete Career Profile Management
            </h2>
            <p className="text-slate-400 text-sm">
              Manage projects, skills, education, certifications, and
              publications in one centralized dashboard.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-8 bg-slate-900 border border-slate-800 rounded-3xl space-y-4">
              <Layers className="w-8 h-8 text-purple-400" />
              <h3 className="text-lg font-bold text-white">
                Categorized Skill Trees
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Group your technical skills into frontend, backend, AI/ML,
                DevOps, and database categories with proficiency badges.
              </p>
            </div>

            <div className="p-8 bg-slate-900 border border-slate-800 rounded-3xl space-y-4">
              <FileText className="w-8 h-8 text-cyan-400" />
              <h3 className="text-lg font-bold text-white">
                Experience & Accomplishments
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Highlight company roles, key deliverables, and technologies used
                with structured bullet points.
              </p>
            </div>

            <div className="p-8 bg-slate-900 border border-slate-800 rounded-3xl space-y-4">
              <ShieldCheck className="w-8 h-8 text-emerald-400" />
              <h3 className="text-lg font-bold text-white">
                Certifications & Papers
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Display verified AWS, GCP, or security certifications alongside
                research paper citations and publications.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. GITHUB INTELLIGENCE */}
      <section className="py-20 bg-slate-950 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="p-8 bg-slate-900 border border-slate-800 rounded-3xl space-y-6 shadow-2xl">
            <div className="flex items-center gap-3">
              <Github className="w-8 h-8 text-cyan-400" />
              <div>
                <h3 className="text-xl font-bold text-white">
                  GitHub Integration & Repo Sync
                </h3>
                <p className="text-xs text-slate-400 font-mono">
                  github.com/api/sync
                </p>
              </div>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Connect your GitHub account to automatically discover pinned
              repositories, star counts, top language ratios, and generate
              standalone Next.js portfolio source repositories.
            </p>
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl flex justify-between items-center text-xs font-mono">
              <span className="text-slate-400">Auto Sync Commit Status</span>
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Synced to Main Branch
              </span>
            </div>
          </div>

          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-xs font-semibold text-cyan-300">
              <Github className="w-4 h-4 text-cyan-400" /> REPOSITORY DISCOVERY
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Turn Code Repositories Into Rich Visual Project Cards
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              Portify AI fetches repository READMEs, technology tags, and live
              demo links directly from your public GitHub profile to populate
              project showcases automatically.
            </p>
          </div>
        </div>
      </section>

      {/* 6. VISUAL SPLIT EDITOR */}
      <section className="py-20 bg-slate-900/60 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <span className="text-xs font-mono uppercase tracking-widest text-blue-400 font-bold">
              Real-Time Canvas
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Visual Split Editor & Device Preview
            </h2>
            <p className="text-slate-400 text-sm">
              Drag and drop sections, tweak color accents, and preview
              responsive rendering for desktop, tablet, and mobile screens live.
            </p>
          </div>

          <div className="p-8 bg-slate-900 border border-slate-800 rounded-3xl grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="p-6 bg-slate-950 rounded-2xl space-y-2 border border-slate-800">
              <Edit3 className="w-6 h-6 text-cyan-400 mx-auto" />
              <h4 className="font-bold text-white text-sm">
                Inline Text & Section Reordering
              </h4>
              <p className="text-xs text-slate-400">
                Reorder work experience and project cards seamlessly.
              </p>
            </div>
            <div className="p-6 bg-slate-950 rounded-2xl space-y-2 border border-slate-800">
              <Palette className="w-6 h-6 text-purple-400 mx-auto" />
              <h4 className="font-bold text-white text-sm">
                Custom Fonts & Color Tokens
              </h4>
              <p className="text-xs text-slate-400">
                Switch between Inter, JetBrains Mono, and custom brand accents.
              </p>
            </div>
            <div className="p-6 bg-slate-950 rounded-2xl space-y-2 border border-slate-800">
              <Rocket className="w-6 h-6 text-emerald-400 mx-auto" />
              <h4 className="font-bold text-white text-sm">
                1-Click Live Update Sync
              </h4>
              <p className="text-xs text-slate-400">
                Push changes instantly without manually rebuilding code.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. AI PORTFOLIO COPILOT & WRITING ASSISTANT */}
      <section className="py-20 bg-slate-950 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-500/10 border border-purple-400/20 text-xs font-semibold text-purple-300">
              <Wand2 className="w-4 h-4 text-purple-400" /> AI COPILOT & STAR
              BUILDER
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Polished Wording & Recruiter Keyword Optimization
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              Use our built-in AI Copilot drawer to rewrite experience
              descriptions into impact-focused STAR statements, shorten lengthy
              bios, or align wording with targeted tech job descriptions.
            </p>
          </div>

          <div className="p-6 bg-slate-900 border border-purple-500/30 rounded-3xl space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <span className="text-xs font-bold text-purple-300 flex items-center gap-2">
                <Wand2 className="w-4 h-4 text-purple-400" /> Side-by-Side Diff
                Preview
              </span>
              <span className="text-[10px] bg-purple-950 text-purple-300 px-2 py-0.5 rounded-full border border-purple-800">
                STAR Format
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="p-3 bg-slate-950 rounded-xl space-y-1">
                <span className="text-[10px] text-slate-500 font-mono">
                  Original Text
                </span>
                <p className="text-slate-400">
                  Created a web application with React and Node.js for managing
                  tasks.
                </p>
              </div>
              <div className="p-3 bg-purple-950/40 border border-purple-800/50 rounded-xl space-y-1">
                <span className="text-[10px] text-purple-300 font-mono">
                  AI Optimized STAR Statement
                </span>
                <p className="text-slate-200">
                  Architected scalable MERN stack task management app, reducing
                  API latency by 35% across 5,000+ operations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. RECRUITER SCORE & JOB MATCHING */}
      <section className="py-20 bg-slate-900/60 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold">
              Recruiter Optimization
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              AI Skill Gap & Job Description Matcher
            </h2>
            <p className="text-slate-400 text-sm">
              Paste any target job description to analyze keyword coverage and
              match scores instantly.
            </p>
          </div>

          <div className="p-8 bg-slate-900 border border-slate-800 rounded-3xl max-w-3xl mx-auto space-y-6 shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-800 pb-4">
              <div>
                <h4 className="font-bold text-white text-base">
                  Target Job Match Analysis
                </h4>
                <p className="text-xs text-slate-400">
                  Senior Full-Stack & AI Engineer
                </p>
              </div>
              <div className="text-right">
                <span className="text-3xl font-black text-emerald-400 font-mono">
                  92%
                </span>
                <p className="text-[10px] text-slate-400 font-mono">
                  Match Score
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs font-mono">
              <div className="p-4 bg-emerald-950/30 border border-emerald-800/50 rounded-2xl space-y-2">
                <span className="text-emerald-300 font-bold">
                  ✓ Matched Keywords
                </span>
                <p className="text-slate-300">
                  Next.js, TypeScript, AI/ML, Python, Cloud Architecture
                </p>
              </div>
              <div className="p-4 bg-amber-950/30 border border-amber-800/50 rounded-2xl space-y-2">
                <span className="text-amber-300 font-bold">
                  ⚡ Suggested Skill Gaps
                </span>
                <p className="text-slate-300">
                  GraphQL, Docker Container Security
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. FEATURED THEMES SHOWCASE (Requirement B: 6-8 Featured Themes + View All 61 Themes) */}
      <ThemeShowcase />

      {/* 10. PORTFOLIO ANALYTICS */}
      <section className="py-20 bg-slate-900/60 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold">
              Visitor Insights
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Real-Time Portfolio Analytics
            </h2>
            <p className="text-slate-400 text-sm">
              Track views, unique recruiter sessions, and referral source
              metrics.
            </p>
          </div>

          <div className="p-8 bg-slate-900 border border-slate-800 rounded-3xl max-w-4xl mx-auto space-y-6 shadow-2xl">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center font-mono">
              <div className="p-6 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                <BarChart3 className="w-5 h-5 text-cyan-400 mx-auto mb-2" />
                <span className="text-2xl font-black text-white">
                  View Tracking
                </span>
                <p className="text-[11px] text-slate-400">
                  Total Page Impressions
                </p>
              </div>
              <div className="p-6 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                <UserCheck className="w-5 h-5 text-emerald-400 mx-auto mb-2" />
                <span className="text-2xl font-black text-white">
                  Recruiter Visits
                </span>
                <p className="text-[11px] text-slate-400">
                  Unique Recruiter Outreaches
                </p>
              </div>
              <div className="p-6 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                <Rocket className="w-5 h-5 text-purple-400 mx-auto mb-2" />
                <span className="text-2xl font-black text-white">
                  Referral Sources
                </span>
                <p className="text-[11px] text-slate-400">
                  LinkedIn & Direct Link Clicks
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 11. PRICING & ACCESS */}
      <section className="py-20 bg-slate-950 border-t border-slate-800">
        <div className="max-w-5xl mx-auto px-6 space-y-12">
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold">
              Transparent Access
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Simple & Transparent Pricing
            </h2>
            <p className="text-slate-400 text-sm">
              Start building your portfolio instantly with no hidden costs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 bg-slate-900 border border-slate-800 rounded-3xl space-y-6">
              <div>
                <h3 className="text-xl font-bold text-white">
                  Free Starter Tier
                </h3>
                <div className="text-3xl font-extrabold text-cyan-400 font-mono mt-2">
                  $0
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Perfect for students and early developers.
                </p>
              </div>
              <ul className="space-y-3 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-cyan-400" /> Access to 61
                  Handcrafted Themes
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-cyan-400" /> PDF & DOCX Resume
                  AI Parsing
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-cyan-400" /> Public Hosted
                  Portfolio Link
                </li>
              </ul>
              <Link
                href={createTarget}
                className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition"
              >
                Get Started Free
              </Link>
            </div>

            <div className="p-8 bg-slate-900 border-2 border-cyan-500/50 rounded-3xl space-y-6 relative shadow-2xl">
              <span className="absolute -top-3 right-6 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-mono text-[10px] font-bold px-3 py-1 rounded-full uppercase">
                RECOMMENDED FOR SDEs
              </span>
              <div>
                <h3 className="text-xl font-bold text-white">
                  Pro Career Tier
                </h3>
                <div className="text-3xl font-extrabold text-white font-mono mt-2">
                  $12{" "}
                  <span className="text-xs font-normal text-slate-400">
                    / month
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Full AI suite & custom domain hosting.
                </p>
              </div>
              <ul className="space-y-3 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-cyan-400" /> Custom Domain
                  Integration (DNS Manager)
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-cyan-400" /> AI Job Description
                  Matcher & STAR Assistant
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-cyan-400" /> Automated GitHub &
                  Vercel Auto-Sync
                </li>
              </ul>
              <Link
                href={createTarget}
                className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition shadow-lg"
              >
                Upgrade to Pro
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 12. FAQ ACCORDION */}
      <section
        id="faq"
        className="py-20 bg-slate-900/60 border-t border-slate-800"
      >
        <div className="max-w-4xl mx-auto px-6 space-y-10">
          <div className="text-center space-y-3">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-6 text-left font-bold text-slate-100 flex justify-between items-center"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 transition transform ${openFaq === idx ? "rotate-180 text-cyan-400" : "text-slate-500"}`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="px-6 pb-6 text-sm text-slate-400 leading-relaxed border-t border-slate-800/60 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 13. DEVELOPER PROFILE ACCURACY (Satyam Kumar — Creator & Lead Developer) */}
      <section className="py-20 bg-slate-950 border-t border-slate-800">
        <div className="max-w-5xl mx-auto px-6">
          <div className="p-8 sm:p-10 bg-slate-900 border border-cyan-500/30 rounded-3xl space-y-8 shadow-2xl relative overflow-hidden">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 border-b border-slate-800 pb-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-purple-600 text-white font-extrabold text-2xl flex items-center justify-center shadow-lg shadow-cyan-500/20 border-2 border-cyan-400/40">
                  SK
                </div>
                <div>
                  <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-widest font-bold flex items-center gap-1.5">
                    <UserCheck className="w-3.5 h-3.5 text-cyan-400" /> CREATOR
                    & LEAD DEVELOPER
                  </span>
                  <h3 className="text-3xl font-extrabold text-white tracking-tight">
                    Satyam Kumar
                  </h3>
                  <p className="text-sm font-mono text-slate-400">
                    Creator & Lead Software Engineer
                  </p>
                </div>
              </div>

              <span className="px-4 py-1.5 bg-cyan-950/80 border border-cyan-800 text-cyan-300 text-xs font-mono rounded-full font-semibold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />{" "}
                Lead Software Developer
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-400 uppercase font-mono tracking-wider">
                  About The Project Creator
                </h4>
                <p className="text-sm text-slate-300 leading-relaxed font-light">
                  Creator & Lead Developer of Portify AI—engineering automated
                  AI resume analysis, dynamic 61-theme rendering engines, and
                  1-click cloud deployment workflows on Next.js 14 and Google
                  Cloud infrastructure.
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-400 uppercase font-mono tracking-wider">
                  Developer Contact & Profiles
                </h4>
                <div className="space-y-2.5 text-xs font-mono">
                  <a
                    href="tel:+919608672661"
                    className="flex items-center gap-2.5 text-slate-300 hover:text-cyan-400 transition"
                  >
                    <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>+91 9608672661</span>
                  </a>
                  <a
                    href="mailto:amansatyam408@gmail.com"
                    className="flex items-center gap-2.5 text-slate-300 hover:text-cyan-400 transition"
                  >
                    <Mail className="w-4 h-4 text-purple-400 shrink-0" />
                    <span>amansatyam408@gmail.com</span>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/satyam-kumar-512b03350/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 text-slate-300 hover:text-cyan-400 transition"
                  >
                    <Linkedin className="w-4 h-4 text-blue-400 shrink-0" />
                    <span>linkedin.com/in/satyam-kumar-512b03350</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 14. FINAL CTA & FOOTER */}
      <section className="py-24 bg-gradient-to-b from-slate-950 to-cyan-950 border-t border-slate-800">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-8">
          <h2 className="text-5xl font-extrabold text-white">
            Build Your Portfolio Today
          </h2>
          <p className="text-slate-300 text-lg">
            Turn your resume into a live website in under 3 minutes.
          </p>
          <Link
            href={createTarget}
            className="inline-flex px-10 py-5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold rounded-2xl text-lg shadow-2xl shadow-cyan-500/40 items-center gap-3 transition transform hover:-translate-y-1"
          >
            Build My Portfolio <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      <footer className="py-12 bg-slate-950 border-t border-slate-900 text-center text-xs text-slate-500 space-y-2">
        <p>
          © {new Date().getFullYear()} Portify AI. Designed & Developed by{" "}
          <strong className="text-slate-300">Satyam Kumar</strong> (Creator &
          Lead Developer).
        </p>
        <p className="text-[11px] text-slate-600 font-mono">
          Contact: amansatyam408@gmail.com | +91 9608672661
        </p>
      </footer>
    </div>
  );
}
