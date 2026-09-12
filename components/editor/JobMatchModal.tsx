"use client";

import React, { useState } from "react";
import { PortfolioData } from "@/types/portfolio";
import {
  Target,
  Sparkles,
  Loader2,
  Check,
  X,
  Wand2,
  ShieldCheck,
  AlertCircle,
} from "lucide-react";

interface JobMatchModalProps {
  portfolio: PortfolioData;
  onApplyOptimization: (updatedPortfolio: PortfolioData) => void;
  onClose: () => void;
}

export default function JobMatchModal({
  portfolio,
  onApplyOptimization,
  onClose,
}: JobMatchModalProps) {
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);
  const [error, setError] = useState("");

  const handleAnalyzeJob = async () => {
    if (!jobDescription.trim()) return;

    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/ai/job-match", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobDescription,
          portfolio,
        }),
      });

      const json = await res.json();
      if (!res.ok)
        throw new Error(json.error || "Failed to analyze job description");
      setAnalysis(json);
    } catch (err: any) {
      setError(err.message || "An error occurred during analysis");
    } finally {
      setLoading(false);
    }
  };

  const handleApply = () => {
    if (!analysis) return;

    const updated: PortfolioData = {
      ...portfolio,
      personal: {
        ...portfolio.personal,
        title: analysis.suggestedHeadline || portfolio.personal.title,
      },
      about: {
        ...portfolio.about,
        summary: analysis.suggestedSummary || portfolio.about.summary,
      },
    };

    onApplyOptimization(updated);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
      <div className="bg-slate-950 border border-slate-800 rounded-3xl max-w-2xl w-full p-6 space-y-6 shadow-2xl text-slate-100 relative overflow-hidden">
        <div className="flex justify-between items-center border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2.5 text-cyan-400">
            <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
              <Target className="w-4 h-4 text-cyan-400" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white">
                Match Portfolio To Job Description
              </h3>
              <p className="text-xs text-slate-400">
                Paste job requirements to analyze ATS match score &
                auto-optimize wording.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-2 rounded-xl hover:bg-slate-900 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Input Box */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Target Job Description:
          </label>
          <textarea
            rows={5}
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste complete job description requirements here..."
            className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-3 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 leading-relaxed font-sans"
          />
        </div>

        <button
          onClick={handleAnalyzeJob}
          disabled={loading || !jobDescription.trim()}
          className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:opacity-50 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition shadow-lg shadow-cyan-500/20"
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Wand2 className="w-4 h-4" />
          )}{" "}
          Analyze & Match Job Requirements
        </button>

        {error && (
          <p className="text-xs text-rose-400 bg-rose-950/50 p-3 rounded-xl border border-rose-800">
            {error}
          </p>
        )}

        {/* Analysis Results Drawer */}
        {analysis && (
          <div className="space-y-4 pt-2 border-t border-slate-800">
            <div className="flex items-center justify-between p-4 bg-slate-900 border border-slate-800 rounded-2xl">
              <div>
                <span className="text-xs text-slate-400 font-semibold">
                  Job Match Compatibility
                </span>
                <h4 className="text-2xl font-extrabold text-cyan-400 font-mono">
                  {analysis.matchScore}% Match
                </h4>
              </div>
              <div className="w-12 h-12 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center font-bold text-cyan-400 text-sm">
                {analysis.matchScore}%
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Keyword Match Breakdown:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {analysis.matchedKeywords.map((k: string, idx: number) => (
                  <span
                    key={idx}
                    className="bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px] px-2.5 py-0.5 rounded-full font-mono"
                  >
                    ✓ {k}
                  </span>
                ))}
                {analysis.missingKeywords.map((k: string, idx: number) => (
                  <span
                    key={idx}
                    className="bg-amber-950 text-amber-300 border border-amber-800 text-[10px] px-2.5 py-0.5 rounded-full font-mono"
                  >
                    ⚠ Missing: {k}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> Suggested Tailored Bio
                Summary:
              </span>
              <div className="p-3.5 bg-slate-900 border border-cyan-900/60 rounded-xl text-xs text-slate-200 leading-relaxed font-sans">
                {analysis.suggestedSummary}
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleApply}
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 transition shadow-lg shadow-emerald-600/30"
              >
                <Check className="w-4 h-4" /> Apply AI Optimization To Portfolio
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
