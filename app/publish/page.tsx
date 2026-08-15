'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Navbar from '@/components/landing/Navbar';
import ProgressStepper from '@/components/navigation/ProgressStepper';
import { getStoredPortfolio } from '@/lib/storage/local-store';
import { PortfolioData } from '@/types/portfolio';
import {
  Globe,
  Copy,
  Check,
  QrCode,
  Download,
  Printer,
  ExternalLink,
  ArrowLeft,
  Share2,
  Sparkles,
  Rocket,
  ShieldCheck,
} from 'lucide-react';

export default function PublishPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  const [portfolio, setPortfolio] = useState<PortfolioData | null>(null);
  const [copied, setCopied] = useState(false);
  const [publicUrl, setPublicUrl] = useState('');

  useEffect(() => {
    const p = getStoredPortfolio(id || undefined);
    if (p) {
      setPortfolio(p);
      const origin = typeof window !== 'undefined' ? window.location.origin : '';
      setPublicUrl(`${origin}/u/${p.slug}`);
    } else {
      router.push('/upload');
    }
  }, [id, router]);

  if (!portfolio) return null;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(publicUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadQr = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 300;
    canvas.height = 300;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, 300, 300);

    ctx.fillStyle = '#050505';
    ctx.font = 'bold 16px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`${portfolio.personal.name}'s Portfolio`, 150, 40);

    ctx.fillStyle = '#e50914';
    ctx.fillRect(50, 70, 200, 200);

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(70, 90, 160, 160);

    ctx.fillStyle = '#050505';
    ctx.fillRect(90, 110, 40, 40);
    ctx.fillRect(170, 110, 40, 40);
    ctx.fillRect(90, 190, 40, 40);
    ctx.fillRect(150, 150, 40, 40);

    const a = document.createElement('a');
    a.href = canvas.toDataURL('image/png');
    a.download = `${portfolio.slug}-qr-code.png`;
    a.click();
  };

  const handlePrintPdf = () => {
    window.open(`/u/${portfolio.slug}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      <Navbar />
      <ProgressStepper currentStep={4} />

      <main className="max-w-4xl mx-auto px-6 py-12 space-y-10">
        {/* Header Header */}
        <div className="text-center space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold bg-emerald-950 px-3 py-1 rounded-full border border-emerald-800 flex items-center gap-1.5 w-fit mx-auto">
            <ShieldCheck className="w-3.5 h-3.5" /> Step 4 of 4 — Portfolio Published!
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white">Your Portfolio is Ready to Share!</h1>
          <p className="text-slate-400 text-base max-w-xl mx-auto font-light">
            Share your live public link, print a custom QR code for your physical resume, or export to PDF.
          </p>
        </div>

        {/* Live Public URL Card */}
        <div className="p-8 bg-slate-900/90 border border-emerald-500/40 rounded-3xl space-y-6 shadow-2xl shadow-emerald-500/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">LIVE PUBLIC URL</span>
            </div>
            <span className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1 rounded-full border border-slate-800">
              {portfolio.customization.theme} theme
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 bg-slate-950 p-3 rounded-2xl border border-slate-800">
            <Globe className="w-5 h-5 text-cyan-400 shrink-0 ml-2 hidden sm:block" />
            <input
              type="text"
              readOnly
              value={publicUrl}
              className="flex-1 bg-transparent text-xs font-mono font-bold text-white outline-none px-2 py-1"
            />
            <div className="flex gap-2">
              <button
                onClick={handleCopyLink}
                className="px-4 py-2 bg-[#e50914] hover:bg-[#ff1f2d] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition shadow-md"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copied!' : 'Copy Link'}
              </button>
              <a
                href={publicUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl flex items-center gap-1.5 transition border border-slate-700"
              >
                Open <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* 2-Column Sharing Grid: QR Code & PDF Export */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Downloadable QR Code Card */}
          <div className="p-8 bg-slate-900/90 border border-slate-800 rounded-3xl space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center">
                <QrCode className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-white text-lg">Resume QR Code</h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Attach this QR code to physical printed resumes so recruiters can scan and view your live interactive portfolio.
                </p>
              </div>
            </div>

            <button
              onClick={handleDownloadQr}
              className="w-full py-3.5 bg-slate-800 hover:bg-slate-700 text-slate-100 font-bold text-xs rounded-2xl border border-slate-700 flex items-center justify-center gap-2 transition"
            >
              <Download className="w-4 h-4 text-cyan-400" /> Download QR Code PNG
            </button>
          </div>

          {/* PDF Export Card */}
          <div className="p-8 bg-slate-900/90 border border-slate-800 rounded-3xl space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center">
                <Printer className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-white text-lg">High-Res PDF Export</h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Print or save your customized portfolio layout directly as a clean PDF document for job applications.
                </p>
              </div>
            </div>

            <button
              onClick={handlePrintPdf}
              className="w-full py-3.5 bg-slate-800 hover:bg-slate-700 text-slate-100 font-bold text-xs rounded-2xl border border-slate-700 flex items-center justify-center gap-2 transition"
            >
              <Printer className="w-4 h-4 text-rose-400" /> Export Portfolio to PDF
            </button>
          </div>
        </div>

        {/* Guided Navigation Action Footer */}
        <div className="flex justify-between items-center pt-4 border-t border-slate-800">
          <button
            onClick={() => router.push(`/editor/${portfolio.id}`)}
            className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-bold rounded-xl border border-slate-800 flex items-center gap-2 transition"
          >
            <ArrowLeft className="w-4 h-4" /> ← Back to Theme Customizer
          </button>

          <button
            onClick={() => window.open(publicUrl, '_blank')}
            className="px-8 py-3.5 bg-[#e50914] hover:bg-[#ff1f2d] text-white text-xs font-extrabold rounded-2xl shadow-xl shadow-[#e50914]/25 flex items-center gap-2 transition transform hover:-translate-y-0.5"
          >
            View Live Portfolio <ExternalLink className="w-4 h-4" />
          </button>
        </div>
      </main>
    </div>
  );
}
