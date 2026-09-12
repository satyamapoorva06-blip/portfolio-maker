"use client";

import React from "react";
import Navbar from "@/components/landing/Navbar";
import { ShieldCheck, Lock, Trash2, Eye, CheckCircle2 } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      <Navbar />

      <main className="max-w-4xl mx-auto px-6 py-12 space-y-8">
        <div className="space-y-2 text-center max-w-2xl mx-auto">
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold bg-cyan-950 px-3 py-1 rounded-full border border-cyan-800">
            Privacy & Data Security Policy
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
            Your Privacy Belongs To You
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Learn how Portify AI processes uploaded resumes, stores structured
            career profiles, and protects user data.
          </p>
        </div>

        <div className="p-8 bg-slate-900 border border-slate-800 rounded-3xl space-y-6 text-sm text-slate-300 leading-relaxed shadow-xl">
          <div className="space-y-2">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-cyan-400" /> 1. Zero AI Model
              Training Policy
            </h2>
            <p className="text-xs text-slate-400">
              Portify AI strictly processes uploaded resume documents (PDF,
              DOCX) for extracting career information for your portfolios.
              <strong className="text-white">
                {" "}
                We do NOT sell, license, or use your resume content or career
                data to train public AI models.
              </strong>
            </p>
          </div>

          <div className="space-y-2 pt-4 border-t border-slate-800">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Lock className="w-5 h-5 text-emerald-400" /> 2. Secure Data
              Storage & Encryption
            </h2>
            <p className="text-xs text-slate-400">
              All backend databases and local storage tokens utilize standard
              AES-256 encryption in transit and at rest. Your portfolio data is
              accessible exclusively to your authenticated user account.
            </p>
          </div>

          <div className="space-y-2 pt-4 border-t border-slate-800">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Trash2 className="w-5 h-5 text-rose-400" /> 3. Data Retention &
              One-Click Deletion
            </h2>
            <p className="text-xs text-slate-400">
              You retain full ownership of all portfolios and resumes. You can
              delete uploaded resume files, portfolio versions, or your entire
              account at any time from your Account Settings.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
