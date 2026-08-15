'use client';

import React from 'react';
import Link from 'next/link';
import { Upload, Sparkles, Palette, Share2, Check, ArrowRight } from 'lucide-react';

interface ProgressStepperProps {
  currentStep: 1 | 2 | 3 | 4;
}

const STEPS = [
  { step: 1, label: 'Upload Resume', path: '/upload', icon: Upload },
  { step: 2, label: 'AI Review & Edit', path: '/parse', icon: Sparkles },
  { step: 3, label: 'Theme & Style', path: '/customize', icon: Palette },
  { step: 4, label: 'Publish & Share', path: '/publish', icon: Share2 },
];

export default function ProgressStepper({ currentStep }: ProgressStepperProps) {
  return (
    <div className="w-full bg-[#0a0a0f] border-b border-slate-800/80 px-4 py-3 shadow-md">
      <div className="max-w-5xl mx-auto flex items-center justify-between overflow-x-auto gap-2 scrollbar-none">
        {STEPS.map((s, idx) => {
          const IconComp = s.icon;
          const isCompleted = currentStep > s.step;
          const isCurrent = currentStep === s.step;

          return (
            <React.Fragment key={s.step}>
              <Link
                href={s.path}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono font-bold transition shrink-0 ${
                  isCurrent
                    ? 'bg-[#e50914] text-white shadow-lg shadow-[#e50914]/30'
                    : isCompleted
                    ? 'bg-slate-900 text-emerald-400 border border-emerald-500/40 hover:border-emerald-400'
                    : 'bg-slate-900/60 text-slate-500 border border-slate-800 hover:text-slate-300'
                }`}
              >
                <span
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                    isCurrent
                      ? 'bg-white text-[#e50914] font-black'
                      : isCompleted
                      ? 'bg-emerald-500/20 text-emerald-400'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {isCompleted ? <Check className="w-3 h-3 stroke-[3]" /> : s.step}
                </span>
                <span className="flex items-center gap-1">
                  <IconComp className="w-3.5 h-3.5" />
                  {s.label}
                </span>
              </Link>

              {idx < STEPS.length - 1 && (
                <div
                  className={`h-0.5 w-6 sm:w-10 rounded-full shrink-0 ${
                    currentStep > s.step ? 'bg-emerald-500/50' : 'bg-slate-800'
                  }`}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
