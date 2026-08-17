'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Navbar from '@/components/landing/Navbar';
import ProgressStepper from '@/components/navigation/ProgressStepper';
import { getStoredPortfolio, saveStoredDeployment, getStoredUser, setStoredUser } from '@/lib/storage/local-store';
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
  Share2,
  Sparkles,
  Rocket,
  ShieldCheck,
  Github,
  X,
  Loader2,
  Key,
  HelpCircle,
  Zap,
} from 'lucide-react';

export default function PublishPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  const [portfolio, setPortfolio] = useState<PortfolioData | null>(null);
  const [user, setUser] = useState<UserProfile>(getStoredUser());
  const [copied, setCopied] = useState(false);
  const [publicUrl, setPublicUrl] = useState('');

  // Deploy Modal State
  const [showDeployModal, setShowDeployModal] = useState(false);
  const [deployStep, setDeployStep] = useState<1 | 2 | 3>(1);
  const [deployLoading, setDeployLoading] = useState(false);
  const [deployStatus, setDeployStatus] = useState('');
  const [createdGithubRepo, setCreatedGithubRepo] = useState<{ url: string; fullName: string } | null>(null);
  const [vercelLiveUrl, setVercelLiveUrl] = useState<string | null>(null);

  const [inputGithubUser, setInputGithubUser] = useState('');
  const [inputGithubToken, setInputGithubToken] = useState('');
  const [inputVercelToken, setInputVercelToken] = useState('');

  useEffect(() => {
    const p = getStoredPortfolio(id || undefined);
    if (p) {
      setPortfolio(p);
      const origin = typeof window !== 'undefined' ? window.location.origin : '';
      setPublicUrl(`${origin}/u/${p.slug}`);
    } else {
      router.push('/upload');
    }
    const currentUser = getStoredUser();
    setUser(currentUser);
    if (currentUser.github_username) setInputGithubUser(currentUser.github_username);
    if (currentUser.github_token) setInputGithubToken(currentUser.github_token);
    if (currentUser.vercel_token) setInputVercelToken(currentUser.vercel_token);
  }, [id, router]);

  if (!portfolio) return null;

  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(
    vercelLiveUrl || publicUrl
  )}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(vercelLiveUrl || publicUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadQr = () => {
    const a = document.createElement('a');
    a.href = qrImageUrl;
    a.download = `${portfolio.slug}-qr-code.png`;
    a.target = '_blank';
    a.click();
  };

  const handlePrintPdf = () => {
    window.open(`/u/${portfolio.slug}`, '_blank');
  };

  const handleSaveCredentials = () => {
    const updatedUser: UserProfile = {
      ...user,
      github_username: inputGithubUser || undefined,
      github_token: inputGithubToken || undefined,
      vercel_token: inputVercelToken || undefined,
    };
    setStoredUser(updatedUser);
    setUser(updatedUser);
  };

  const handleCreateGithubRepo = async () => {
    if (!inputGithubUser) {
      setDeployStatus('Please enter your GitHub Username to create your repository.');
      return;
    }

    handleSaveCredentials();
    setDeployLoading(true);
    setDeployStatus('Creating GitHub repository on @' + inputGithubUser + ' and pushing portfolio code...');

    try {
      const cleanSlug = portfolio.slug.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      const repoSlug = cleanSlug.endsWith('-portfolio') ? cleanSlug : `${cleanSlug}-portfolio`;

      const repoRes = await fetch('/api/github/create-repo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          repoName: repoSlug,
          isPrivate: false,
          portfolio,
          githubUsername: inputGithubUser,
          token: inputGithubToken,
        }),
      });

      const repoJson = await repoRes.json();
      if (!repoRes.ok) throw new Error(repoJson.error || 'Failed to create GitHub repository');

      setCreatedGithubRepo({
        url: repoJson.repoUrl,
        fullName: repoJson.fullName,
      });

      setDeployStep(2);
      setDeployStatus('✓ Step 1 Complete: Portfolio source code successfully pushed to GitHub!');
    } catch (err: any) {
      setDeployStatus(`Error creating GitHub repo: ${err.message}`);
    } finally {
      setDeployLoading(false);
    }
  };

  const handleDeployToVercel = async () => {
    if (!createdGithubRepo) return;

    setDeployLoading(true);
    setDeployStatus('Deploying GitHub repository (' + createdGithubRepo.fullName + ') to Vercel...');

    try {
      const vercelRes = await fetch('/api/vercel/deploy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          portfolio,
          repoFullName: createdGithubRepo.fullName,
          token: inputVercelToken,
        }),
      });

      const vercelJson = await vercelRes.json();

      const finalUrl = vercelJson.deploymentUrl || vercelJson.instantPublicUrl;
      setVercelLiveUrl(finalUrl);
      setDeployStep(3);

      saveStoredDeployment({
        id: `dep_${Date.now()}`,
        portfolio_id: portfolio.id,
        user_id: portfolio.userId || user.id,
        provider: 'vercel',
        repository_url: createdGithubRepo.url,
        deployment_url: finalUrl,
        status: 'live',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });

      setDeployStatus('✓ Step 2 Complete: Live Portfolio Published on Vercel!');
    } catch (err: any) {
      setDeployStatus(`Error deploying to Vercel: ${err.message}`);
    } finally {
      setDeployLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      <Navbar />
      <ProgressStepper currentStep={4} />

      <main className="max-w-4xl mx-auto px-6 py-12 space-y-10">
        {/* Step Header */}
        <div className="text-center space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold bg-emerald-950 px-3.5 py-1 rounded-full border border-emerald-800 flex items-center gap-1.5 w-fit mx-auto">
            <ShieldCheck className="w-3.5 h-3.5" /> Step 4 of 4 — Portfolio Published!
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white">Your Portfolio is Published & Live!</h1>
          <p className="text-slate-400 text-base max-w-xl mx-auto font-light">
            Scan your live scannable QR code, copy your URL, or push to GitHub & Vercel.
          </p>
        </div>

        {/* Live Public URL Card */}
        <div className="p-8 bg-slate-900/90 border border-emerald-500/40 rounded-3xl space-y-6 shadow-2xl shadow-emerald-500/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
                {vercelLiveUrl ? 'LIVE VERCEL & GITHUB SITE' : 'HOSTED PORTFOLIO LINK'}
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
              value={vercelLiveUrl || publicUrl}
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
                href={vercelLiveUrl || publicUrl}
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
              onClick={() => {
                setShowDeployModal(true);
                setDeployStep(1);
              }}
              className="px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-extrabold text-xs rounded-xl shadow-lg flex items-center gap-2 transition"
            >
              <Rocket className="w-4 h-4" /> Deploy to GitHub & Vercel Account
            </button>
          </div>
        </div>

        {/* 2-Column Grid: Visible QR Code & PDF Export */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* VISIBLE LIVE SCANNABLE QR CODE CARD */}
          <div className="p-8 bg-slate-900/90 border border-slate-800 rounded-3xl space-y-6 flex flex-col justify-between items-center text-center">
            <div className="space-y-3 w-full">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center mx-auto">
                <QrCode className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-lg">Resume Scannable QR Code</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Scan with any phone camera to instantly view your live portfolio website.
              </p>

              {/* Real Visible Image Canvas */}
              <div className="p-4 bg-white rounded-2xl border border-slate-800 inline-block shadow-xl my-2">
                <img
                  src={qrImageUrl}
                  alt={`${portfolio.personal.name} Portfolio QR Code`}
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

          {/* PDF EXPORT CARD */}
          <div className="p-8 bg-slate-900/90 border border-slate-800 rounded-3xl space-y-6 flex flex-col justify-between items-center text-center">
            <div className="space-y-4 w-full">
              <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center mx-auto">
                <Printer className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-lg">High-Res PDF Export</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Print or export your customized portfolio layout as a clean PDF file for recruiter applications.
              </p>

              <div className="p-8 bg-slate-950 rounded-2xl border border-slate-800 space-y-2 my-2">
                <p className="text-xs font-mono text-emerald-400 font-bold">1-Click PDF Generation Ready</p>
                <p className="text-[11px] text-slate-500">Supports print layout styling & custom themes</p>
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
            onClick={() => window.open(vercelLiveUrl || publicUrl, '_blank')}
            className="px-8 py-3.5 bg-[#e50914] hover:bg-[#ff1f2d] text-white text-xs font-extrabold rounded-2xl shadow-xl shadow-[#e50914]/25 flex items-center gap-2 transition transform hover:-translate-y-0.5"
          >
            View Live Portfolio <ExternalLink className="w-4 h-4" />
          </button>
        </div>

        {/* GitHub / Vercel Deploy Modal */}
        {showDeployModal && (
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-6">
            <div className="max-w-2xl w-full bg-slate-900 border border-slate-800 rounded-3xl p-8 space-y-6 shadow-2xl relative overflow-y-auto max-h-[90vh]">
              <button
                onClick={() => setShowDeployModal(false)}
                className="absolute top-6 right-6 p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-2 text-center">
                <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center mx-auto">
                  <Rocket className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-extrabold text-white">GitHub → Vercel Pipeline</h2>
                <p className="text-xs text-slate-400">
                  Creates a public repository on your GitHub account and deploys it to Vercel.
                </p>
              </div>

              {/* STEP 1: GitHub Creation */}
              {deployStep === 1 && (
                <div className="space-y-5">
                  <div className="p-5 bg-slate-950 border border-slate-800 rounded-2xl space-y-4">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-200 border-b border-slate-800 pb-3">
                      <Github className="w-4 h-4 text-cyan-400" /> Enter Your GitHub Details
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-semibold text-slate-300">GitHub Username</label>
                        <input
                          type="text"
                          placeholder="e.g. satyamapoorva06-blip"
                          value={inputGithubUser}
                          onChange={(e) => {
                            const raw = e.target.value;
                            const cleaned = raw.trim().replace(/^https?:\/\/(www\.)?github\.com\//i, '').replace(/\/.*$/, '').replace(/^@/, '');
                            setInputGithubUser(cleaned);
                          }}
                          className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-white mt-1.5 focus:border-cyan-500 focus:outline-none font-mono"
                        />
                        <p className="text-[11px] text-slate-500 mt-1">Your official GitHub handle for automated repository creation.</p>
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-slate-300">GitHub Personal Access Token (Optional)</label>
                        <input
                          type="password"
                          placeholder="ghp_xxxxxxxxxxxxxxxxx"
                          value={inputGithubToken}
                          onChange={(e) => setInputGithubToken(e.target.value.trim())}
                          className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-white mt-1.5 focus:border-cyan-500 focus:outline-none font-mono"
                        />
                        <p className="text-[11px] text-slate-500 mt-1">Used to commit source code directly to your GitHub account.</p>
                      </div>
                    </div>

                    {/* 🔑 GitHub 3-Step Token Guide Card (Matches Screenshot 100%) */}
                    <div className="p-4 bg-[#0b141d] border border-cyan-500/30 rounded-2xl space-y-3 text-xs">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 font-bold text-cyan-400">
                        <span className="flex items-center gap-2">
                          <HelpCircle className="w-4 h-4 text-cyan-400 shrink-0" /> How to get your GitHub Access Token (3 Quick Steps):
                        </span>
                        <a
                          href="https://github.com/settings/tokens/new?description=Portify%20AI%20Token&scopes=repo,workflow"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-cyan-400 hover:underline font-bold text-xs flex items-center gap-1 shrink-0"
                        >
                          Open GitHub Token Generator ↗
                        </a>
                      </div>
                      <ol className="list-decimal list-inside text-xs text-slate-300 space-y-1.5 font-sans leading-relaxed">
                        <li>
                          Click <strong className="text-white">Open GitHub Token Generator</strong> above (or go to{' '}
                          <a href="https://github.com/settings/tokens" target="_blank" rel="noopener noreferrer" className="text-cyan-400 font-mono underline">
                            github.com/settings/tokens
                          </a>
                          ).
                        </li>
                        <li>
                          Set Token Name to <strong className="text-white">"Portify AI"</strong> and check the{' '}
                          <span className="bg-emerald-500/20 text-emerald-400 font-mono px-1.5 py-0.5 rounded border border-emerald-500/40 text-[11px] font-bold">
                            repo
                          </span>{' '}
                          scope (Full control of repositories).
                        </li>
                        <li>
                          Click <strong className="text-white">Generate token</strong> at the bottom and copy your token starting with{' '}
                          <span className="bg-cyan-500/20 text-cyan-300 font-mono px-1.5 py-0.5 rounded border border-cyan-500/40 text-[11px] font-bold">
                            ghp_...
                          </span>{' '}
                          into the box above!
                        </li>
                      </ol>
                    </div>
                  </div>

                  <button
                    onClick={handleCreateGithubRepo}
                    disabled={deployLoading}
                    className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-extrabold rounded-2xl text-sm shadow-xl flex items-center justify-center gap-2 transition"
                  >
                    {deployLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Github className="w-4 h-4" />}
                    {deployLoading ? 'Creating GitHub Repo & Pushing Code...' : 'Step 1: Create GitHub Repository & Push Code'}
                  </button>
                </div>
              )}

              {/* STEP 2: Vercel Deployment */}
              {deployStep === 2 && createdGithubRepo && (
                <div className="space-y-5">
                  <div className="p-4 bg-slate-950 border border-emerald-500/40 rounded-2xl space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                        <Check className="w-4 h-4" /> GitHub Repository Live!
                      </span>
                      <a
                        href={createdGithubRepo.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-cyan-400 hover:underline flex items-center gap-1 font-mono"
                      >
                        Open Repo <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>

                  <div className="p-5 bg-slate-950 border border-slate-800 rounded-2xl space-y-4">
                    <div className="flex items-center gap-2 text-sm font-bold text-white border-b border-slate-800 pb-3">
                      <Zap className="w-4 h-4 text-emerald-400" /> Vercel Deployment Integration
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-300">Vercel Personal Access Token (Optional)</label>
                      <input
                        type="password"
                        placeholder="vercel_token_xxxxxxxxxxxx"
                        value={inputVercelToken}
                        onChange={(e) => setInputVercelToken(e.target.value.trim())}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-white mt-1.5 focus:border-emerald-500 focus:outline-none font-mono"
                      />
                      <p className="text-[11px] text-slate-500 mt-1">Enables 1-Click live deployments to your Vercel cloud dashboard.</p>
                    </div>

                    {/* 🚀 Vercel 3-Step Token Guide Card (Matches Screenshot 100%) */}
                    <div className="p-4 bg-[#0b1d16] border border-emerald-500/30 rounded-2xl space-y-3 text-xs">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 font-bold text-emerald-400">
                        <span className="flex items-center gap-2">
                          <HelpCircle className="w-4 h-4 text-emerald-400 shrink-0" /> How to get your Vercel Access Token (3 Quick Steps):
                        </span>
                        <a
                          href="https://vercel.com/account/tokens"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-emerald-400 hover:underline font-bold text-xs flex items-center gap-1 shrink-0"
                        >
                          Open Vercel Token Page ↗
                        </a>
                      </div>
                      <ol className="list-decimal list-inside text-xs text-slate-300 space-y-1.5 font-sans leading-relaxed">
                        <li>
                          Click <strong className="text-white">Open Vercel Token Page</strong> above (or go to{' '}
                          <a href="https://vercel.com/account/tokens" target="_blank" rel="noopener noreferrer" className="text-emerald-400 font-mono underline">
                            vercel.com/account/tokens
                          </a>
                          ).
                        </li>
                        <li>
                          Click <strong className="text-white">Create Token</strong>, enter Name <strong className="text-white">"Portify AI"</strong>, and select Scope:{' '}
                          <span className="bg-emerald-500/20 text-emerald-400 font-mono px-1.5 py-0.5 rounded border border-emerald-500/40 text-[11px] font-bold">
                            Full Account
                          </span>.
                        </li>
                        <li>
                          Click <strong className="text-white">Create</strong> and copy your generated Vercel token starting with{' '}
                          <span className="bg-emerald-500/20 text-emerald-300 font-mono px-1.5 py-0.5 rounded border border-emerald-500/40 text-[11px] font-bold">
                            vercel_...
                          </span>{' '}
                          into the box above!
                        </li>
                      </ol>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <button
                      onClick={handleDeployToVercel}
                      disabled={deployLoading}
                      className="w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-extrabold rounded-2xl text-sm shadow-xl flex items-center justify-center gap-2 transition"
                    >
                      {deployLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Rocket className="w-4 h-4" />}
                      {deployLoading ? 'Deploying to Vercel...' : 'Step 2: Deploy to Vercel Cloud'}
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: Complete */}
              {deployStep === 3 && (
                <div className="space-y-4 p-6 bg-slate-950 border border-emerald-500/40 rounded-2xl text-center">
                  <div className="text-xs font-bold text-emerald-400 flex items-center justify-center gap-2">
                    <Check className="w-4 h-4" /> GitHub & Vercel Deployments Live!
                  </div>
                  {vercelLiveUrl && (
                    <a
                      href={vercelLiveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-sm font-bold text-emerald-400 hover:underline"
                    >
                      {vercelLiveUrl}
                    </a>
                  )}
                  <button
                    onClick={() => setShowDeployModal(false)}
                    className="w-full py-3 bg-[#e50914] text-white font-bold text-xs rounded-xl"
                  >
                    Done & Close
                  </button>
                </div>
              )}

              {deployStatus && (
                <p className="text-xs text-cyan-300 bg-cyan-950/80 p-3 rounded-xl border border-cyan-800 text-center font-mono">
                  {deployStatus}
                </p>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
