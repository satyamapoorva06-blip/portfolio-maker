'use client';

import React, { useState } from 'react';
import { PortfolioData } from '@/types/portfolio';
import ThemeRenderer from '@/components/portfolio/ThemeRenderer';
import { Monitor, Tablet, Smartphone, ExternalLink, RefreshCw } from 'lucide-react';

export default function LivePreviewFrame({ data }: { data: PortfolioData }) {
  const [device, setDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  const widthClasses = {
    desktop: 'w-full max-w-full',
    tablet: 'w-[768px] max-w-full shadow-2xl rounded-2xl border-4 border-slate-700 overflow-hidden my-4',
    mobile: 'w-[375px] max-w-full shadow-2xl rounded-3xl border-8 border-slate-800 overflow-hidden my-4',
  };

  return (
    <div className="flex flex-col h-full bg-slate-900 text-slate-100 overflow-hidden border-l border-slate-800">
      {/* Top Device Bar */}
      <div className="h-14 bg-slate-950 px-6 flex justify-between items-center border-b border-slate-800 shrink-0">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-xs font-semibold text-slate-300">Live Preview</span>
        </div>

        {/* Device Switcher */}
        <div className="flex items-center bg-slate-900 p-1 rounded-lg border border-slate-800 gap-1 text-xs">
          <button
            onClick={() => setDevice('desktop')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition ${device === 'desktop' ? 'bg-blue-600 text-white font-medium' : 'text-slate-400 hover:text-white'}`}
          >
            <Monitor className="w-3.5 h-3.5" /> Desktop
          </button>
          <button
            onClick={() => setDevice('tablet')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition ${device === 'tablet' ? 'bg-blue-600 text-white font-medium' : 'text-slate-400 hover:text-white'}`}
          >
            <Tablet className="w-3.5 h-3.5" /> Tablet
          </button>
          <button
            onClick={() => setDevice('mobile')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition ${device === 'mobile' ? 'bg-blue-600 text-white font-medium' : 'text-slate-400 hover:text-white'}`}
          >
            <Smartphone className="w-3.5 h-3.5" /> Mobile
          </button>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <a
            href={`/u/${data.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg border border-slate-700 transition"
          >
            <ExternalLink className="w-3.5 h-3.5 text-blue-400" /> Open Full Screen
          </a>
        </div>
      </div>

      {/* Responsive Canvas */}
      <div className="flex-1 bg-slate-950 overflow-y-auto flex justify-center p-4">
        <div className={`transition-all duration-300 ${widthClasses[device]}`}>
          <ThemeRenderer data={data} />
        </div>
      </div>
    </div>
  );
}
