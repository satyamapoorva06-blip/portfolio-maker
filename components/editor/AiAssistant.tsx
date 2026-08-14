'use client';

import React, { useState } from 'react';
import { Sparkles, Loader2, Check, X, Wand2 } from 'lucide-react';

interface AiAssistantProps {
  sectionName: string;
  currentContent: string;
  onApply: (improvedText: string) => void;
  onClose: () => void;
}

const PRESET_INSTRUCTIONS = [
  'Make this section more professional and recruiter-friendly.',
  'Make this text concise and punchy.',
  'Highlight leadership and technical achievements.',
  'Optimize for an AI/ML and Senior Developer role.',
];

export default function AiAssistant({ sectionName, currentContent, onApply, onClose }: AiAssistantProps) {
  const [instruction, setInstruction] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  const handleGenerate = async (customPrompt?: string) => {
    const promptToUse = customPrompt || instruction;
    if (!promptToUse) return;

    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/ai/improve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sectionName,
          currentContent,
          instruction: promptToUse,
        }),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Failed to improve text');
      setResult(json.improvedText);
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-6 shadow-2xl text-slate-100">
        {/* Header */}
        <div className="flex justify-between items-center border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2 text-cyan-400">
            <Sparkles className="w-5 h-5 animate-pulse" />
            <h3 className="font-bold text-base">Portify AI Writing Assistant</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Preset Prompt Pills */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Quick Presets:</label>
          <div className="flex flex-wrap gap-2">
            {PRESET_INSTRUCTIONS.map((preset, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setInstruction(preset);
                  handleGenerate(preset);
                }}
                className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-lg border border-slate-700 transition text-left"
              >
                {preset}
              </button>
            ))}
          </div>
        </div>

        {/* Custom Instruction Input */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Custom Prompt:</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={instruction}
              onChange={(e) => setInstruction(e.target.value)}
              placeholder="e.g. Make this more confident, or shorten to 2 sentences..."
              className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
            <button
              onClick={() => handleGenerate()}
              disabled={loading || !instruction.trim()}
              className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:opacity-50 text-white font-medium rounded-xl text-sm flex items-center gap-2 transition shrink-0"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Wand2 className="w-4 h-4" />} Improve
            </button>
          </div>
        </div>

        {error && <p className="text-xs text-rose-400 bg-rose-950/50 p-3 rounded-lg border border-rose-800">{error}</p>}

        {/* Output Preview */}
        {result && (
          <div className="space-y-3 pt-2">
            <label className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">AI Recommendation:</label>
            <div className="p-4 bg-slate-950 rounded-xl border border-emerald-500/30 text-sm text-slate-200 leading-relaxed max-h-48 overflow-y-auto">
              {result}
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <button onClick={onClose} className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white">
                Discard
              </button>
              <button
                onClick={() => {
                  onApply(result);
                  onClose();
                }}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs rounded-xl flex items-center gap-1.5 transition"
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
