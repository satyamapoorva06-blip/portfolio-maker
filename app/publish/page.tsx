'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Navbar from '@/components/landing/Navbar';
import ProgressStepper from '@/components/navigation/ProgressStepper';
import DeployModal from '@/components/modals/DeployModal';
import { getStoredPortfolio, getStoredUser } from '@/lib/storage/local-store';
import { PortfolioData } from '@/types/portfolio';
import { UserProfile } from '@/types/database';
import {
  Globe,
  Copy,
  Check,
  QrCode,
  Download,
  Printer,
  ExternalLink,
  ArrowLeft,
  Rocket,
  ShieldCheck,
} from 'lucide-react';

function PublishContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  const [portfolio, setPortfolio] = useState<PortfolioData | null>(null);
  const [user, setUser] = useState<UserProfile>(getStoredUser());
  const [copied, setCopied] = useState(false);
  const [showDeployModal, setShowDeployModal] = useState(false);
  const [deployedUrl, setDeployedUrl] = useState<string | null>(null);

  useEffect(() => {
    const p = getStoredPortfolio(id || undefined);
    if (p) {
      setPortfolio(p);
    } else {
      router.push('/upload');
    }
    setUser(getStoredUser());
  }, [id, router]);

  if (!portfolio) {
    return <div className="p-12 text-center text-slate-400 font-mono">Loading portfolio details...</div>;
  }

  const publicUrl = deployedUrl || (typeof window !== 'undefined' ? `${window.location.origin}/u/${portfolio.slug}` : '');
  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(publicUrl)}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(publicUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadQr = () => {
    const link = document.createElement('a');
    link.href = qrImageUrl;
    link.download = `${portfolio.slug}-qr-code.png`;
    link.target = '_blank';
    link.click();
  };

  const handleExportPdf = () => {
    window.open(`/u/${portfolio.slug}`, '_blank');
  };

  return (
    <main className="max-w-4xl mx-auto px-6 py-12 space-y-10">
      {/* Header */}
      <div className="text-center space-y-3">
        <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold bg-emerald-950 px-3.5 py-1 rounded-full border border-emerald-800 flex items-center gap-1.5 w-fit mx-auto">
          <ShieldCheck className="w-3.5 h-3.5" /> Step 4 of 4 — Portfolio Published!
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white">Your Portfolio is Published & Live!</h1>
        <p className="text-slate-400 text-base max-w-xl mx-auto font-light">
          Scan your live QR code, copy your link, or deploy to GitHub & Vercel.
        </p>
      </div>

      {/* Live Link Box */}
      <div className="p-8 bg-slate-900/90 border border-emerald-500/40 rounded-3xl space-y-6 shadow-2xl shadow-emerald-500/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
              {deployedUrl ? 'LIVE VERCEL & GITHUB SITE' : 'HOSTED PORTFOLIO LINK'}
            </span>
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
              Open Live <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            onClick={() => setShowDeployModal(true)}
            className="px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-extrabold text-xs rounded-xl shadow-lg flex items-center gap-2 transition"
          >
            <Rocket className="w-4 h-4" /> Deploy to GitHub & Vercel Account
          </button>
        </div>
      </div>

      {/* Grid: QR Code & PDF Export */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* QR Code */}
        <div className="p-8 bg-slate-900/90 border border-slate-800 rounded-3xl space-y-6 flex flex-col justify-between items-center text-center">
          <div className="space-y-3 w-full">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center mx-auto">
              <QrCode className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-lg">Resume Scannable QR Code</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Scan with any phone camera to view your portfolio website.
            </p>

            <div className="p-4 bg-white rounded-2xl border border-slate-800 inline-block shadow-xl my-2">
              <img
                src={qrImageUrl}
                alt={`${portfolio.personal.name} QR Code`}
                className="w-44 h-44 object-contain mx-auto"
              />
            </div>
          </div>

          <button
            onClick={handleDownloadQr}
            className="w-full py-3.5 bg-slate-800 hover:bg-slate-700 text-slate-100 font-bold text-xs rounded-2xl border border-slate-700 flex items-center justify-center gap-2 transition"
          >
            <Download className="w-4 h-4 text-cyan-400" /> Download QR Code (PNG)
          </button>
        </div>

        {/* PDF Export */}
        <div className="p-8 bg-slate-900/90 border border-slate-800 rounded-3xl space-y-6 flex flex-col justify-between items-center text-center">
          <div className="space-y-4 w-full">
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center mx-auto">
              <Printer className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-lg">High-Res PDF Export</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Export your layout as a PDF file for recruiters.
            </p>

            <div className="p-8 bg-slate-950 rounded-2xl border border-slate-800 space-y-2 my-2">
              <p className="text-xs font-mono text-emerald-400 font-bold">PDF Generation Ready</p>
              <p className="text-[11px] text-slate-500">Supports print layout styling & themes</p>
            </div>
          </div>

          <button
            onClick={handleExportPdf}
            className="w-full py-3.5 bg-slate-800 hover:bg-slate-700 text-slate-100 font-bold text-xs rounded-2xl border border-slate-700 flex items-center justify-center gap-2 transition"
          >
            <Printer className="w-4 h-4 text-rose-400" /> Export Portfolio to PDF
          </button>
        </div>
      </div>

      {/* Footer Navigation */}
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

      <DeployModal
        portfolio={portfolio}
        user={user}
        isOpen={showDeployModal}
        onClose={() => setShowDeployModal(false)}
        onSuccess={(url) => setDeployedUrl(url)}
      />
    </main>
  );
}

export default function PublishPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      <Navbar />
      <ProgressStepper currentStep={4} />
      <Suspense fallback={<div className="p-12 text-center text-slate-400 font-mono">Loading...</div>}>
        <PublishContent />
      </Suspense>
    </div>
  );
}
