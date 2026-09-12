"use client";

import React from "react";
import Navbar from "@/components/landing/Navbar";
import { FileText, CheckCircle2, ShieldAlert } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      <Navbar />

      <main className="max-w-4xl mx-auto px-6 py-12 space-y-8">
        <div className="space-y-2 text-center max-w-2xl mx-auto">
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold bg-cyan-950 px-3 py-1 rounded-full border border-cyan-800">
            Terms of Service
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
            Terms of Service & Usage
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Guidelines and legal agreement for building, hosting, and deploying
            portfolio websites with Portify AI.
          </p>
        </div>

        <div className="p-8 bg-slate-900 border border-slate-800 rounded-3xl space-y-6 text-sm text-slate-300 leading-relaxed shadow-xl">
          <div className="space-y-2">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-cyan-400" /> 1. Acceptable Usage
              Policy
            </h2>
            <p className="text-xs text-slate-400">
              Portify AI provides SaaS tools for building, customizing, and
              hosting professional portfolio websites. Users agree to represent
              their genuine career experience and technical projects truthfully.
            </p>
          </div>

          <div className="space-y-2 pt-4 border-t border-slate-800">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-amber-400" /> 2. Content &
              Intellectual Property
            </h2>
            <p className="text-xs text-slate-400">
              Users retain all intellectual property rights to their uploaded
              portfolio contents, projects, and personal graphics. Portify AI
              retains rights to platform templates, source architecture, and
              brand assets.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
