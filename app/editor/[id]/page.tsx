'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { PortfolioData } from '@/types/portfolio';
import { getStoredPortfolios, saveStoredPortfolio, saveStoredDeployment, getStoredUser, setStoredUser, INITIAL_PORTFOLIO } from '@/lib/storage/local-store';
import EditorTabs from '@/components/editor/EditorTabs';
import LivePreviewFrame from '@/components/editor/LivePreviewFrame';
import { UserProfile } from '@/types/database';
import { ArrowLeft, Save, Rocket, Github, CheckCircle2, Eye, Sparkles, X, ExternalLink, Copy, Loader2, Globe, AlertCircle, ArrowRight } from 'lucide-react';

export default function EditorPage() {
  const router = useRouter();
  const params = useParams();
  const portfolioId = params?.id as string;

  const [portfolio, setPortfolio] = useState<PortfolioData>(INITIAL_PORTFOLIO);
  const [savedStatus, setSavedStatus] = useState<string>('Saved');
  const [isSaving, setIsSaving] = useState(false);
  const [user, setUser] = useState<UserProfile>(getStoredUser());

  // Deployment Pipeline State
  const [showDeployModal, setShowDeployModal] = useState(false);
  const [deployStep, setDeployStep] = useState<1 | 2 | 3>(1);
  const [deployLoading, setDeployLoading] = useState(false);
  const [deployStatus, setDeployStatus] = useState('');
  const [createdGithubRepo, setCreatedGithubRepo] = useState<{ url: string; fullName: string } | null>(null);
  const [vercelLiveUrl, setVercelLiveUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // User input credentials
  const [inputGithubUser, setInputGithubUser] = useState('');
  const [inputGithubToken, setInputGithubToken] = useState('');
  const [inputVercelToken, setInputVercelToken] = useState('');

  // Load portfolio from storage
  useEffect(() => {
    const list = getStoredPortfolios();
    const found = list.find((p) => p.id === portfolioId || p.slug === portfolioId);
    if (found) {
      setPortfolio(found);
    }
    const currentUser = getStoredUser();
    setUser(currentUser);
    if (currentUser.github_username) setInputGithubUser(currentUser.github_username);
    if (currentUser.github_token) setInputGithubToken(currentUser.github_token);
    if (currentUser.vercel_token) setInputVercelToken(currentUser.vercel_token);
  }, [portfolioId]);

  const handleDataChange = (updated: PortfolioData) => {
    setPortfolio(updated);
    setSavedStatus('Unsaved changes...');
    setIsSaving(true);
    saveStoredPortfolio(updated);
    setTimeout(() => {
      setSavedStatus('All changes saved');
      setIsSaving(false);
    }, 600);
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

  // STEP 1: Create GitHub Repo First
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

  // STEP 2: Deploy to Vercel via GitHub Repo
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

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const vercelImportUrl = createdGithubRepo
    ? `https://vercel.com/new/clone?repository-url=${encodeURIComponent(createdGithubRepo.url)}`
    : `https://vercel.com/new/clone?repository-url=https://github.com/${inputGithubUser || 'satyamapoorva06-blip'}/${portfolio.slug}-portfolio`;

  return (
    <div className="h-screen flex flex-col bg-slate-950 text-slate-100 overflow-hidden font-sans relative">
      {/* Editor Top Navigation Bar */}
      <header className="h-16 bg-slate-900 border-b border-slate-800 px-6 flex justify-between items-center shrink-0">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push('/dashboard')}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition flex items-center gap-1.5 text-xs font-medium"
          >
            <ArrowLeft className="w-4 h-4" /> Dashboard
          </button>

          <div className="h-4 w-px bg-slate-800"></div>

          <div className="flex items-center gap-2">
            <input
              type="text"
              value={portfolio.title}
              onChange={(e) => handleDataChange({ ...portfolio, title: e.target.value })}
              className="bg-slate-950 border border-slate-800 hover:border-slate-700 focus:border-cyan-500 rounded-lg px-3 py-1 text-sm font-semibold text-white focus:outline-none transition"
            />
            <span className="text-[11px] bg-cyan-500/10 text-cyan-400 px-2.5 py-0.5 rounded-full border border-cyan-500/20 capitalize font-mono">
              {portfolio.customization.theme} theme
            </span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-4">
          <div className="text-xs text-slate-400 flex items-center gap-1.5 font-mono">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>{savedStatus}</span>
          </div>

          <button
            onClick={() => router.push(`/u/${portfolio.slug}`)}
            className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-xl border border-slate-700 flex items-center gap-1.5 transition"
          >
            <Eye className="w-3.5 h-3.5" /> Preview Public
          </button>

          <button
            onClick={() => {
              setShowDeployModal(true);
              setDeployStep(1);
              setCreatedGithubRepo(null);
              setVercelLiveUrl(null);
            }}
            className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs rounded-xl flex items-center gap-2 shadow-lg shadow-cyan-500/20 transition transform hover:-translate-y-0.5"
          >
            <Rocket className="w-4 h-4" /> Deploy via GitHub & Vercel
          </button>
        </div>
      </header>

      {/* Main Split Screen Area */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
        {/* Left Form Controls (5 Columns) */}
        <div className="lg:col-span-5 h-full overflow-hidden">
          <EditorTabs data={portfolio} onChange={handleDataChange} />
        </div>

        {/* Right Live Preview Canvas (7 Columns) */}
        <div className="lg:col-span-7 h-full overflow-hidden">
          <LivePreviewFrame data={portfolio} />
        </div>
      </div>

      {/* Strict 2-Step Deployment Modal */}
      {showDeployModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-6">
          <div className="max-w-lg w-full bg-slate-900 border border-slate-800 rounded-3xl p-8 space-y-6 shadow-2xl relative overflow-y-auto max-h-[90vh]">
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
              <h2 className="text-2xl font-extrabold text-white">GitHub → Vercel Deployment Pipeline</h2>
              <p className="text-xs text-slate-400">
                Pushes your code to GitHub first, then deploys to Vercel through your GitHub repository.
              </p>
            </div>

            {/* Step Progress Tracker */}
            <div className="grid grid-cols-2 gap-3 text-xs text-center font-bold">
              <div className={`p-3 rounded-xl border transition ${deployStep >= 1 ? 'bg-cyan-950/40 border-cyan-500 text-cyan-300' : 'bg-slate-950 border-slate-800 text-slate-500'}`}>
                1. Push to GitHub Repo
              </div>
              <div className={`p-3 rounded-xl border transition ${deployStep >= 2 ? 'bg-cyan-950/40 border-cyan-500 text-cyan-300' : 'bg-slate-950 border-slate-800 text-slate-500'}`}>
                2. Deploy to Vercel
              </div>
            </div>

            {/* STEP 1: GitHub Creation */}
            {deployStep === 1 && (
              <div className="space-y-4">
                <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-200 border-b border-slate-800 pb-2">
                    <Github className="w-4 h-4 text-cyan-400" /> Enter Your GitHub Details
                  </div>

                  <div>
                    <label className="text-[11px] text-slate-400">Your GitHub Username (Required)</label>
                    <input
                      type="text"
                      placeholder="e.g. satyamapoorva06-blip"
                      value={inputGithubUser}
                      onChange={(e) => setInputGithubUser(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-white mt-1 focus:border-cyan-500 focus:outline-none font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-slate-400">GitHub Personal Access Token (Optional)</label>
                    <input
                      type="password"
                      placeholder="ghp_xxxxxxxxxxxxxxxxx"
                      value={inputGithubToken}
                      onChange={(e) => setInputGithubToken(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-white mt-1 focus:border-cyan-500 focus:outline-none font-mono"
                    />
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
              <div className="space-y-4">
                <div className="p-4 bg-slate-950 border border-emerald-500/40 rounded-2xl space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" /> GitHub Repository Live!
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
                  <p className="text-xs text-slate-300 font-mono truncate">{createdGithubRepo.url}</p>
                </div>

                <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-200 border-b border-slate-800 pb-2">
                    <Rocket className="w-4 h-4 text-emerald-400" /> Deploy to Vercel from GitHub Repo
                  </div>

                  <div>
                    <label className="text-[11px] text-slate-400">Vercel Access Token (Optional)</label>
                    <input
                      type="password"
                      placeholder="vercel_token_xxxxxxxxxxxx"
                      value={inputVercelToken}
                      onChange={(e) => setInputVercelToken(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-white mt-1 focus:border-cyan-500 focus:outline-none font-mono"
                    />
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

                  <a
                    href={vercelImportUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 bg-white hover:bg-slate-100 text-slate-900 font-extrabold text-xs rounded-2xl flex items-center justify-center gap-2 transition shadow-md"
                  >
                    <Rocket className="w-4 h-4 text-black" /> Deploy via Official Vercel Account Import →
                  </a>
                </div>
              </div>
            )}

            {/* STEP 3: Complete Success Summary */}
            {deployStep === 3 && (
              <div className="space-y-4 p-6 bg-slate-950 border border-emerald-500/40 rounded-2xl">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                  <CheckCircle2 className="w-4 h-4" /> Both GitHub & Vercel Deployments Complete!
                </div>

                {createdGithubRepo && (
                  <div className="space-y-1">
                    <span className="text-[11px] text-slate-400 font-mono">1. GitHub Repository</span>
                    <a
                      href={createdGithubRepo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-xs font-mono text-cyan-400 hover:underline truncate"
                    >
                      {createdGithubRepo.url}
                    </a>
                  </div>
                )}

                {vercelLiveUrl && (
                  <div className="space-y-1 pt-2 border-t border-slate-900">
                    <span className="text-[11px] text-slate-400 font-mono">2. Vercel Live Website</span>
                    <a
                      href={vercelLiveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-sm font-bold text-emerald-400 hover:underline truncate"
                    >
                      {vercelLiveUrl}
                    </a>
                  </div>
                )}

                <div className="flex gap-2 pt-2">
                  <a
                    href={vercelLiveUrl || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition"
                  >
                    <Globe className="w-4 h-4" /> Visit Live Site
                  </a>
                  <button
                    onClick={() => copyToClipboard(vercelLiveUrl || '')}
                    className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl border border-slate-700 flex items-center gap-2 transition"
                  >
                    <Copy className="w-4 h-4" /> {copied ? 'Copied!' : 'Copy Link'}
                  </button>
                </div>
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
    </div>
  );
}
