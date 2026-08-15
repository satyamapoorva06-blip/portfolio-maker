'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/landing/Navbar';
import HeroSection from '@/components/landing/HeroSection';
import ThemeShowcase from '@/components/landing/ThemeShowcase';
import { isUserLoggedIn } from '@/lib/storage/local-store';
import { Sparkles, FileText, Palette, Edit3, Wand2, Github, Rocket, ArrowRight, ChevronDown, CheckCircle2, Phone, Mail, Linkedin, UserCheck } from 'lucide-react';

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    setLoggedIn(isUserLoggedIn());
  }, []);

  const createTarget = loggedIn ? '/upload' : '/login?next=/upload';

  const faqs = [
    {
      q: 'Do I need coding skills to use Portify AI?',
      a: 'Not at all! Portify AI automatically parses your resume, creates structured JSON data, applies your chosen theme, and deploys it live for you.',
    },
    {
      q: 'Does AI invent fake jobs or skills?',
      a: 'Never. Portify AI enforces strict schema boundaries to parse only verified details from your resume.',
    },
    {
      q: 'Can I edit my portfolio after deployment?',
      a: 'Yes! Any updates made in our Visual Editor can be synced to GitHub and re-deployed live with one click.',
    },
    {
      q: 'What file formats are supported for resume parsing?',
      a: 'We support standard PDF (.pdf) and Microsoft Word (.docx) documents up to 10MB.',
    },
    {
      q: 'Which deployment hosts are supported?',
      a: 'Portify AI integrates natively with both Vercel and Netlify via official API integrations.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500 selection:text-slate-950">
      <Navbar />
      <HeroSection />

      {/* Features Section */}
      <section id="features" className="py-24 bg-slate-900/60 border-y border-slate-800/80">
        <div className="max-w-7xl mx-auto px-6 space-y-16">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
              Everything You Need for a Production Portfolio
            </h2>
            <p className="text-slate-400 text-base">
              Powerful SaaS tools engineered to showcase your career experience with maximum visual impact.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: FileText, title: 'AI Resume Analysis', desc: 'Parses PDF & DOCX resumes into clean structured data models accurately.' },
              { icon: Palette, title: '60 Handcrafted Themes', desc: 'Minimal, Developer, Creative, 3D, Bento Grid, Kinetic Poster, and 10 Animated themes.' },
              { icon: Edit3, title: 'Visual Split Editor', desc: 'Real-time responsive preview with desktop, tablet, and mobile canvas switchers.' },
              { icon: Wand2, title: 'AI Writing Assistant', desc: 'Polishes text, shortens descriptions, and optimizes for recruiter keywords.' },
              { icon: Github, title: 'GitHub Code Generation', desc: 'Generates standalone Next.js source code repositories automatically.' },
              { icon: Rocket, title: 'One-Click Deployment', desc: 'Deploy directly to Vercel or Netlify with automated live update sync.' },
            ].map((f, idx) => {
              const Icon = f.icon;
              return (
                <div key={idx} className="p-8 bg-slate-900 border border-slate-800 rounded-3xl space-y-4 hover:border-cyan-500/40 transition">
                  <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-400/20 flex items-center justify-center text-cyan-400">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white">{f.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Timeline */}
      <section id="how-it-works" className="py-24 bg-slate-950">
        <div className="max-w-7xl mx-auto px-6 space-y-16">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
              How Portify AI Works
            </h2>
            <p className="text-slate-400 text-base">5 simple steps from resume to published website.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {[
              { num: '01', title: 'Upload Resume', desc: 'Drag & drop your PDF or DOCX file.' },
              { num: '02', title: 'AI Extraction', desc: 'AI extracts skills, experience & projects.' },
              { num: '03', title: 'Choose Theme', desc: 'Select from 60 responsive designs.' },
              { num: '04', title: 'Customize', desc: 'Fine-tune text & styling in visual editor.' },
              { num: '05', title: 'Publish', desc: 'One-click deployment to Vercel/Netlify.' },
            ].map((step, idx) => (
              <div key={idx} className="p-6 bg-slate-900/70 border border-slate-800 rounded-2xl space-y-3 relative">
                <span className="text-3xl font-black text-cyan-400 font-mono">{step.num}</span>
                <h3 className="font-bold text-white text-base">{step.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ThemeShowcase />

      {/* Deployment Showcase */}
      <section id="deployments" className="py-24 bg-slate-900/60 border-t border-slate-800">
        <div className="max-w-6xl mx-auto px-6 text-center space-y-12">
          <div className="space-y-4 max-w-2xl mx-auto">
            <h2 className="text-4xl font-extrabold text-white">Seamless Cloud Deployment Workflow</h2>
            <p className="text-slate-400 text-sm">
              GitHub Repository → Vercel / Netlify → Production Live URL
            </p>
          </div>

          <div className="p-8 bg-slate-950 border border-slate-800 rounded-3xl grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            <div className="space-y-2">
              <Github className="w-10 h-10 text-cyan-400 mx-auto" />
              <h3 className="font-bold text-white">GitHub Integration</h3>
              <p className="text-xs text-slate-400">Automated Next.js source code commits</p>
            </div>
            <div className="space-y-2">
              <Rocket className="w-10 h-10 text-emerald-400 mx-auto" />
              <h3 className="font-bold text-white">Vercel & Netlify</h3>
              <p className="text-xs text-slate-400">Instant SSL & global edge CDN distribution</p>
            </div>
            <div className="space-y-2">
              <CheckCircle2 className="w-10 h-10 text-blue-400 mx-auto" />
              <h3 className="font-bold text-white">Live Portfolio URL</h3>
              <p className="text-xs text-slate-400">Shareable public link & custom domain ready</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section id="faq" className="py-24 bg-slate-950">
        <div className="max-w-4xl mx-auto px-6 space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-extrabold text-white">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-6 text-left font-bold text-slate-100 flex justify-between items-center"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 transition transform ${openFaq === idx ? 'rotate-180 text-cyan-400' : 'text-slate-500'}`} />
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

      {/* Senior Developer & Creator Profile Showcase (Satyam Kumar) */}
      <section className="py-20 bg-slate-900/90 border-t border-slate-800">
        <div className="max-w-5xl mx-auto px-6">
          <div className="p-8 sm:p-10 bg-slate-950 border border-cyan-500/30 rounded-3xl space-y-8 shadow-2xl relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none"></div>

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 border-b border-slate-800 pb-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-purple-600 text-white font-extrabold text-2xl flex items-center justify-center shadow-lg shadow-cyan-500/20 border-2 border-cyan-400/40">
                  SK
                </div>
                <div>
                  <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-widest font-bold flex items-center gap-1.5">
                    <UserCheck className="w-3.5 h-3.5 text-cyan-400" /> LEAD ARCHITECT & CREATOR
                  </span>
                  <h3 className="text-3xl font-extrabold text-white tracking-tight">Satyam Kumar</h3>
                  <p className="text-sm font-mono text-slate-400">Senior AI Systems Architect & Full-Stack Engineer</p>
                </div>
              </div>

              <span className="px-4 py-1.5 bg-cyan-950/80 border border-cyan-800 text-cyan-300 text-xs font-mono rounded-full font-semibold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" /> Lead Software Developer
              </span>
            </div>

            {/* Senior Dev Bio & Direct Contact Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-400 uppercase font-mono tracking-wider">About The Developer</h4>
                <p className="text-sm text-slate-300 leading-relaxed font-light">
                  Architect of Portify AI—engineering automated AI resume analysis, dynamic 60-theme rendering engines, and 1-click cloud deployment workflows on Next.js 14 and Google Cloud infrastructure.
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-400 uppercase font-mono tracking-wider">Direct Developer Contact & Profiles</h4>
                <div className="space-y-2.5 text-xs font-mono">
                  <a href="tel:+919608672661" className="flex items-center gap-2.5 text-slate-300 hover:text-cyan-400 transition">
                    <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>+91 9608672661</span>
                  </a>
                  <a href="mailto:amansatyam408@gmail.com" className="flex items-center gap-2.5 text-slate-300 hover:text-cyan-400 transition">
                    <Mail className="w-4 h-4 text-purple-400 shrink-0" />
                    <span>amansatyam408@gmail.com</span>
                  </a>
                  <a href="https://www.linkedin.com/in/satyam-kumar-512b03350/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 text-slate-300 hover:text-cyan-400 transition">
                    <Linkedin className="w-4 h-4 text-blue-400 shrink-0" />
                    <span>linkedin.com/in/satyam-kumar-512b03350</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-gradient-to-b from-slate-950 to-cyan-950 border-t border-slate-800">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-8">
          <h2 className="text-5xl font-extrabold text-white">Build Your Portfolio Today</h2>
          <p className="text-slate-300 text-lg">Turn your resume into a live website in under 3 minutes.</p>
          <Link
            href={createTarget}
            className="inline-flex px-10 py-5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold rounded-2xl text-lg shadow-2xl shadow-cyan-500/40 items-center gap-3 transition transform hover:-translate-y-1"
          >
            Build My Portfolio <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-slate-950 border-t border-slate-900 text-center text-xs text-slate-500 space-y-2">
        <p>© {new Date().getFullYear()} Portify AI. Designed & Developed by <strong className="text-slate-300">Satyam Kumar</strong> (Senior AI Systems Architect).</p>
        <p className="text-[11px] text-slate-600 font-mono">Contact: amansatyam408@gmail.com | +91 9608672661</p>
      </footer>
    </div>
  );
}
