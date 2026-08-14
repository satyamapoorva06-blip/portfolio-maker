'use client';

import React from 'react';
import { VisualCustomization, ThemeType } from '@/types/portfolio';
import { Palette, Type, Layout, Sparkles, Check } from 'lucide-react';

interface StyleCustomizerProps {
  customization: VisualCustomization;
  onChange: (customization: VisualCustomization) => void;
}

const THEMES: { id: ThemeType; name: string; desc: string }[] = [
  { id: 'minimal', name: 'Minimal', desc: 'Apple-inspired clean & whitespace focused' },
  { id: 'developer', name: 'Developer', desc: 'Dark terminal & monospaced code theme' },
  { id: 'creative', name: 'Creative', desc: 'Bold typography & vibrant card grids' },
  { id: 'three-d', name: '3D Spatial', desc: 'Cinematic depth & glowing neon panels' },
  { id: 'professional', name: 'Professional', desc: 'Recruiter-friendly executive layout' },
  { id: 'glass', name: 'Glassmorphism', desc: 'Frosted glass & ambient gradient mesh' },
];

const COLOR_PRESETS = [
  { primary: '#0c8ee9', accent: '#8b5cf6', name: 'Ocean Cyan & Violet' },
  { primary: '#10b981', accent: '#06b6d4', name: 'Emerald & Teal' },
  { primary: '#8b5cf6', accent: '#f43f5e', name: 'Purple & Rose' },
  { primary: '#f59e0b', accent: '#ef4444', name: 'Amber & Flame' },
  { primary: '#3b82f6', accent: '#10b981', name: 'Royal Blue & Emerald' },
];

export default function StyleCustomizer({ customization, onChange }: StyleCustomizerProps) {
  return (
    <div className="space-y-8 text-slate-200 text-sm p-4">
      {/* Theme Selector */}
      <div className="space-y-4">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
          <Palette className="w-4 h-4 text-cyan-400" /> Select Portfolio Theme
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {THEMES.map((t) => (
            <button
              key={t.id}
              onClick={() => onChange({ ...customization, theme: t.id })}
              className={`p-4 rounded-xl border text-left transition flex flex-col justify-between space-y-2 ${
                customization.theme === t.id
                  ? 'bg-blue-600/20 border-blue-500 text-white shadow-lg'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-white'
              }`}
            >
              <div className="flex justify-between items-center w-full">
                <span className="font-bold text-sm text-slate-100">{t.name}</span>
                {customization.theme === t.id && <Check className="w-4 h-4 text-blue-400" />}
              </div>
              <span className="text-xs text-slate-400 leading-normal">{t.desc}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Color Palette Tokens */}
      <div className="space-y-4 pt-4 border-t border-slate-800">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-purple-400" /> Color Accent Presets
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {COLOR_PRESETS.map((cp, idx) => (
            <button
              key={idx}
              onClick={() => onChange({ ...customization, primaryColor: cp.primary, accentColor: cp.accent })}
              className="p-3 bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-xl flex items-center gap-3 transition"
            >
              <div className="flex gap-1.5 shrink-0">
                <span className="w-5 h-5 rounded-full border border-white/20" style={{ backgroundColor: cp.primary }}></span>
                <span className="w-5 h-5 rounded-full border border-white/20" style={{ backgroundColor: cp.accent }}></span>
              </div>
              <span className="text-xs font-medium text-slate-300">{cp.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Typography */}
      <div className="space-y-4 pt-4 border-t border-slate-800">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
          <Type className="w-4 h-4 text-emerald-400" /> Font Style
        </h3>
        <div className="flex gap-3">
          {[
            { id: 'inter', label: 'Inter (Sans)' },
            { id: 'jetbrains', label: 'JetBrains (Mono)' },
            { id: 'playfair', label: 'Playfair (Serif)' },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => onChange({ ...customization, fontFamily: f.id as any })}
              className={`flex-1 py-2.5 px-3 rounded-xl border text-xs font-medium transition ${
                customization.fontFamily === f.id
                  ? 'bg-emerald-600/20 border-emerald-500 text-emerald-300'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Border Radius */}
      <div className="space-y-4 pt-4 border-t border-slate-800">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
          <Layout className="w-4 h-4 text-amber-400" /> Corner Radius
        </h3>
        <div className="flex gap-2">
          {['none', 'sm', 'md', 'lg', 'full'].map((r) => (
            <button
              key={r}
              onClick={() => onChange({ ...customization, borderRadius: r as any })}
              className={`flex-1 py-2 rounded-lg border text-xs capitalize transition ${
                customization.borderRadius === r
                  ? 'bg-amber-500/20 border-amber-500 text-amber-300 font-semibold'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
