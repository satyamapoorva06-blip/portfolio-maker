"use client";

import React, { useState } from "react";
import {
  Sparkles,
  Loader2,
  Check,
  X,
  Wand2,
  ArrowRight,
  FileText,
  BarChart3,
  ShieldCheck,
  Zap,
} from "lucide-react";

interface AiAssistantProps {
  sectionName: string;
  currentContent: string;
  onApply: (improvedText: string) => void;
  onClose: () => void;
}

const PRESET_INSTRUCTIONS = [
  {
    label: "✨ STAR Action Bullets",
    prompt:
      "Generate 3 high-impact STAR-method resume bullet points with quantifiable metrics.",
  },
  {
    label: "📊 Inject Metrics & Impact",
    prompt:
      "Rewrite this content to highlight percentage growth, scale, and performance gains.",
  },
  {
    label: "⚡ Optimize for ATS Keywords",
    prompt:
      "Optimize text for Applicant Tracking Systems with high-demand industry keywords.",
  },
  {
    label: "🎯 Make Punchy & Professional",
    prompt: "Make this text concise, direct, and recruiter-ready.",
  },
];

export default function AiAssistant({
  sectionName,
  currentContent,
  onApply,
  onClose,
}: AiAssistantProps) {
  const [instruction, setInstruction] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  const handleGenerate = async (customPrompt?: string) => {
    const promptToUse = customPrompt || instruction;
    if (!promptToUse) return;

    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/ai/improve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sectionName,
          currentContent,
          instruction: promptToUse,
        }),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to improve text");
      setResult(json.improvedText);
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
      <div className="bg-slate-950 border border-slate-800 rounded-3xl max-w-2xl w-full p-6 space-y-6 shadow-2xl text-slate-100 relative overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2.5 text-cyan-400">
            <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white">
                Portify AI Writing Assistant
              </h3>
              <p className="text-xs text-slate-400">
                Targeting Section:{" "}
                <span className="text-cyan-300 font-medium">{sectionName}</span>
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

        {/* Preset Quick Actions */}
        <div className="space-y-2">
          <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Quick AI Optimizations:
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {PRESET_INSTRUCTIONS.map((preset, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setInstruction(preset.prompt);
                  handleGenerate(preset.prompt);
                }}
                className="text-xs bg-slate-900 hover:bg-slate-800 text-slate-200 p-3 rounded-xl border border-slate-800 hover:border-slate-700 transition text-left flex items-center justify-between"
              >
                <span className="font-semibold">{preset.label}</span>
                <Wand2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              </button>
            ))}
          </div>
        </div>

        {/* Custom Instruction Input */}
        <div className="space-y-2">
          <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Custom Prompt:
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={instruction}
              onChange={(e) => setInstruction(e.target.value)}
              placeholder="e.g. Highlight cloud architecture leadership and Kubernetes experience..."
              className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
            <button
              onClick={() => handleGenerate()}
              disabled={loading || !instruction.trim()}
              className="px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:opacity-50 text-white font-bold rounded-xl text-xs flex items-center gap-2 transition shrink-0 shadow-lg shadow-cyan-500/20"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Wand2 className="w-4 h-4" />
              )}{" "}
              Improve
            </button>
          </div>
        </div>

        {error && (
          <p className="text-xs text-rose-400 bg-rose-950/50 p-3 rounded-xl border border-rose-800">
            {error}
          </p>
        )}

        {/* Side-by-Side Diff Preview */}
        {result && (
          <div className="space-y-4 pt-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Original Content
                </span>
                <div className="p-3.5 bg-slate-900 rounded-2xl border border-slate-800 text-xs text-slate-400 max-h-40 overflow-y-auto leading-relaxed">
                  {currentContent || "(Empty content)"}
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" /> AI Recommendation
                </span>
                <div className="p-3.5 bg-slate-900 rounded-2xl border border-emerald-500/40 text-xs text-slate-100 max-h-40 overflow-y-auto leading-relaxed shadow-inner">
                  {result}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2 border-t border-slate-800">
              <button
                onClick={onClose}
                className="px-4 py-2.5 text-xs font-semibold text-slate-400 hover:text-white"
              >
                Discard
              </button>
              <button
                onClick={() => {
                  onApply(result);
                  onClose();
                }}
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 transition shadow-lg shadow-emerald-600/30"
              >
                <Check className="w-4 h-4" /> Apply Changes
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
