"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/landing/Navbar";
import { getStoredPortfolio, getStoredUser } from "@/lib/storage/local-store";
import { PortfolioData } from "@/types/portfolio";
import {
  Download,
  FileText,
  Printer,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Eye,
  Settings,
  ShieldCheck,
} from "lucide-react";

export default function ResumeBuilderPage() {
  const [portfolio, setPortfolio] = useState<PortfolioData | null>(null);
  const [fontFamily, setFontFamily] = useState<"sans" | "serif" | "mono">(
    "sans",
  );
  const [fontSize, setFontSize] = useState<"sm" | "md" | "lg">("md");
  const [targetRole, setTargetRole] = useState("Full Stack Software Engineer");
  const [skillGapAnalysis, setSkillGapAnalysis] = useState<{
    matchedSkills: string[];
    recommendedSkills: string[];
    readinessScore: number;
  } | null>(null);

  useEffect(() => {
    const p = getStoredPortfolio();
    setPortfolio(p);

    if (p) {
      const skills = p.skills.flatMap((s) => s.skills);
      fetch("/api/ai/skill-gap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          targetRole: "Full Stack Engineer",
          currentSkills: skills,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) setSkillGapAnalysis(data.analysis);
        })
        .catch(() => {});
    }
  }, []);

  const handleExportPDF = () => {
    window.open("/resume/export", "_blank");
  };

  if (!portfolio) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="text-center space-y-4 max-w-md">
            <FileText className="w-12 h-12 text-slate-600 mx-auto" />
            <h2 className="text-xl font-bold">No Portfolio Data Found</h2>
            <p className="text-xs text-slate-400">
              Upload your resume to automatically populate your ATS resume
              document.
            </p>
            <Link
              href="/upload"
              className="inline-flex px-6 py-3 bg-cyan-500 text-slate-950 font-bold text-xs rounded-xl"
            >
              Upload Resume
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const {
    personal,
    about,
    skills,
    experience,
    projects,
    education,
    certifications,
    achievements,
  } = portfolio;

  const fontClasses = {
    sans: "font-sans",
    serif: "font-serif",
    mono: "font-mono",
  };

  const sizeClasses = {
    sm: "text-xs leading-relaxed space-y-3",
    md: "text-sm leading-relaxed space-y-4",
    lg: "text-base leading-relaxed space-y-5",
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8 flex flex-col lg:flex-row gap-8">
        {/* Left Settings Sidebar */}
        <aside className="w-full lg:w-80 space-y-6 flex-shrink-0">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6">
            <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
              <FileText className="w-5 h-5" /> ATS Resume Customizer
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs text-slate-400 font-medium">
                  Typography Style
                </label>
                <div className="grid grid-cols-3 gap-2 mt-1.5">
                  {(["sans", "serif", "mono"] as const).map((f) => (
                    <button
                      key={f}
                      onClick={() => setFontFamily(f)}
                      className={`py-2 rounded-xl text-xs capitalize font-semibold transition ${
                        fontFamily === f
                          ? "bg-cyan-500 text-slate-950 font-bold"
                          : "bg-slate-950 text-slate-400 border border-slate-800"
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-400 font-medium">
                  Document Spacing
                </label>
                <div className="grid grid-cols-3 gap-2 mt-1.5">
                  {(["sm", "md", "lg"] as const).map((s) => (
                    <button
                      key={s}
                      onClick={() => setFontSize(s)}
                      className={`py-2 rounded-xl text-xs uppercase font-semibold transition ${
                        fontSize === s
                          ? "bg-cyan-500 text-slate-950 font-bold"
                          : "bg-slate-950 text-slate-400 border border-slate-800"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={handleExportPDF}
              className="w-full py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs rounded-2xl shadow-xl flex items-center justify-center gap-2 transition"
            >
              <Download className="w-4 h-4" /> Export ATS PDF
            </button>
          </div>

          {/* AI Skill Gap Analysis Card */}
          {skillGapAnalysis && (
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" /> ATS Role Readiness
                </span>
                <span className="text-xs font-mono font-bold bg-cyan-950 text-cyan-300 px-2.5 py-1 rounded-full border border-cyan-800">
                  {skillGapAnalysis.readinessScore}% Match
                </span>
              </div>

              <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                <div
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${skillGapAnalysis.readinessScore}%` }}
                />
              </div>

              <div className="space-y-2 text-xs">
                <span className="font-semibold text-slate-400">
                  Target Role: {targetRole}
                </span>
                {skillGapAnalysis.recommendedSkills.length > 0 && (
                  <div>
                    <span className="text-[11px] text-amber-400 font-medium">
                      Recommended Keywords:
                    </span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {skillGapAnalysis.recommendedSkills
                        .slice(0, 5)
                        .map((sk, idx) => (
                          <span
                            key={idx}
                            className="bg-amber-950/60 text-amber-300 border border-amber-800 text-[10px] px-2 py-0.5 rounded-md"
                          >
                            + {sk}
                          </span>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </aside>

        {/* ATS Resume Preview Paper Container */}
        <div className="flex-1 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 flex flex-col items-center overflow-y-auto">
          {/* Printable ATS Document Sheet */}
          <div
            className={`w-full max-w-3xl bg-white text-slate-900 p-8 sm:p-12 shadow-2xl rounded-sm ${fontClasses[fontFamily]} ${sizeClasses[fontSize]}`}
          >
            {/* ATS Resume Header */}
            <div className="border-b-2 border-slate-900 pb-4 text-center space-y-1">
              <h1 className="text-2xl font-bold uppercase tracking-tight text-slate-900">
                {personal.name}
              </h1>
              <p className="text-xs font-semibold text-slate-700 uppercase tracking-widest">
                {personal.title}
              </p>
              <p className="text-[11px] text-slate-600 space-x-2">
                <span>{personal.email}</span>
                {personal.location && <span>• {personal.location}</span>}
                {personal.socials.linkedin && <span>• LinkedIn</span>}
                {personal.socials.github && <span>• GitHub</span>}
              </p>
            </div>

            {/* Summary */}
            {about.summary && (
              <div className="space-y-1">
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1">
                  Professional Summary
                </h2>
                <p className="text-xs text-slate-800 leading-relaxed">
                  {about.summary}
                </p>
              </div>
            )}

            {/* Technical Skills */}
            {skills.length > 0 && (
              <div className="space-y-1">
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1">
                  Technical Skills
                </h2>
                <div className="space-y-1 text-xs text-slate-800">
                  {skills.map((sk) => (
                    <div key={sk.id}>
                      <span className="font-bold">{sk.category}: </span>
                      <span>{sk.skills.join(", ")}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Experience */}
            {experience.length > 0 && (
              <div className="space-y-2">
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1">
                  Work Experience
                </h2>
                {experience.map((exp) => (
                  <div key={exp.id} className="space-y-1">
                    <div className="flex justify-between items-baseline text-xs font-bold text-slate-900">
                      <span>
                        {exp.role} —{" "}
                        <span className="font-semibold">{exp.company}</span>
                      </span>
                      <span className="text-[11px] text-slate-600 font-mono">
                        {exp.startDate} -{" "}
                        {exp.current ? "Present" : exp.endDate}
                      </span>
                    </div>
                    <p className="text-xs text-slate-800 leading-relaxed whitespace-pre-wrap">
                      {exp.description}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Projects */}
            {projects.length > 0 && (
              <div className="space-y-2">
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1">
                  Projects & Technical Work
                </h2>
                {projects.map((proj) => (
                  <div key={proj.id} className="space-y-1 text-xs">
                    <div className="flex justify-between items-baseline font-bold text-slate-900">
                      <span>{proj.name}</span>
                      <span className="text-[10px] text-slate-600 font-mono">
                        {proj.technologies.slice(0, 4).join(", ")}
                      </span>
                    </div>
                    <p className="text-slate-800 leading-relaxed">
                      {proj.description}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Education */}
            {education.length > 0 && (
              <div className="space-y-1">
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1">
                  Education
                </h2>
                {education.map((edu) => (
                  <div
                    key={edu.id}
                    className="flex justify-between items-baseline text-xs text-slate-800"
                  >
                    <div>
                      <span className="font-bold">{edu.institution}</span> —{" "}
                      {edu.degree}
                    </div>
                    <span className="text-[11px] text-slate-600 font-mono">
                      {edu.startDate} - {edu.endDate}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
