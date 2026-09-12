"use client";

import React, { useEffect, useState } from "react";
import { getStoredPortfolio } from "@/lib/storage/local-store";
import { PortfolioData } from "@/types/portfolio";

export default function ExportPdfPage() {
  const [portfolio, setPortfolio] = useState<PortfolioData | null>(null);

  useEffect(() => {
    const p = getStoredPortfolio();
    setPortfolio(p);

    const timer = setTimeout(() => {
      window.print();
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  if (!portfolio) {
    return (
      <div className="p-8 text-center text-slate-500 font-sans">
        Loading resume export document...
      </div>
    );
  }

  const { personal, about, skills, experience, projects, education } =
    portfolio;

  return (
    <div className="bg-white text-slate-900 font-sans min-h-screen p-8 sm:p-12 max-w-4xl mx-auto space-y-5 text-sm leading-relaxed border border-slate-200">
      {/* ATS Header */}
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
          {personal.socials.linkedin && (
            <span>• LinkedIn: {personal.socials.linkedin}</span>
          )}
          {personal.socials.github && (
            <span>• GitHub: {personal.socials.github}</span>
          )}
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

      {/* Skills */}
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
                  {exp.startDate} - {exp.current ? "Present" : exp.endDate}
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
  );
}
