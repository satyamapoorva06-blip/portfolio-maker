'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { PortfolioData } from '@/types/portfolio';
import { getStoredPortfolios, saveStoredPortfolio, saveStoredDeployment, getStoredUser, setStoredUser, INITIAL_PORTFOLIO } from '@/lib/storage/local-store';
import EditorTabs from '@/components/editor/EditorTabs';
import LivePreviewFrame from '@/components/editor/LivePreviewFrame';
import { UserProfile } from '@/types/database';
import { ArrowLeft, Save, Rocket, Github, CheckCircle2, Eye, Sparkles, X, ExternalLink, Copy, Loader2, Globe, AlertCircle } from 'lucide-react';

export default function EditorPage() {
  const router = useRouter();
  const params = useParams();
  const portfolioId = params?.id as string;

  const [portfolio, setPortfolio] = useState<PortfolioData>(INITIAL_PORTFOLIO);
  const [savedStatus, setSavedStatus] = useState<string>('Saved');
  const [isSaving, setIsSaving] = useState(false);
  const [user, setUser] = useState<UserProfile>(getStoredUser());

  // One-Click Deploy Modal State
  const [showDeployModal, setShowDeployModal] = useState(false);
  const [deployLoading, setDeployLoading] = useState(false);
  const [deployStatus, setDeployStatus] = useState('');
  const [deployedUrls, setDeployedUrls] = useState<{ repoUrl?: string; liveUrl?: string } | null>(null);
  const [copied, setCopied] = useState(false);

  // Credentials input for inline connection
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

  const handleOneClickDeploy = async () => {
    if (!inputGithubUser) {
      setDeployStatus('Please enter your GitHub Username to create your repository.');
      return;
    }

    handleSaveCredentials();

    setDeployLoading(true);
    setDeployStatus('1. Creating GitHub repository on @' + inputGithubUser + '...');

    try {
      // Step 1: Create GitHub Repo
      const repoRes = await fetch('/api/github/create-repo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          repoName: `${portfolio.slug}-portfolio`,
          isPrivate: false,
          portfolio,
          githubUsername: inputGithubUser,
          token: inputGithubToken,
        }),
      });

      const repoJson = await repoRes.json();
      if (!repoRes.ok) throw new Error(repoJson.error || 'Failed to create GitHub repo');

      // Step 2: Deploy to Vercel
      setDeployStatus('2. Deploying live website to Vercel Cloud Edge...');
      const vercelRes = await fetch('/api/vercel/deploy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          portfolio,
          repoFullName: repoJson.fullName,
          token: inputVercelToken,
        }),
      });

      const vercelJson = await vercelRes.json();

      setDeployedUrls({
        repoUrl: repoJson.repoUrl,
        liveUrl: vercelJson.deploymentUrl || vercelJson.instantPublicUrl,
      });

      // Save deployment record
      saveStoredDeployment({
        id: `dep_${Date.now()}`,
        portfolio_id: portfolio.id,
        user_id: portfolio.userId || user.id,
        provider: 'vercel',
        repository_url: repoJson.repoUrl,
        deployment_url: vercelJson.deploymentUrl,
        status: 'live',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });

      setDeployStatus('✓ Live Portfolio Successfully Published!');
    } catch (err: any) {
      setDeployStatus(`Error: ${err.message}`);
    } finally {
      setDeployLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const vercelImportUrl = `https://vercel.com/new/clone?repository-url=https://github.com/${inputGithubUser || user.github_username || 'satyamapoorva06-blip'}/${portfolio.slug}-portfolio`;

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
            onClick={() => setShowDeployModal(true)}
            className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs rounded-xl flex items-center gap-2 shadow-lg shadow-cyan-500/20 transition transform hover:-translate-y-0.5"
          >
            <Rocket className="w-4 h-4" /> 1-Click Deploy Live
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

      {/* 1-Click Deploy Modal */}
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
              <h2 className="text-2xl font-extrabold text-white">Deploy to Your Personal Vercel Account</h2>
              <p className="text-xs text-slate-400">
                Pushes source code to GitHub and imports directly into your personal Vercel dashboard.
              </p>
            </div>

            {deployedUrls ? (
              <div className="space-y-4 p-5 bg-slate-950 border border-emerald-500/40 rounded-2xl">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                  <CheckCircle2 className="w-4 h-4" /> Live Deployment Success!
                </div>

                <div className="space-y-1">
                  <span className="text-[11px] text-slate-400 font-mono">Live Website URL</span>
                  <a
                    href={deployedUrls.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-sm font-bold text-cyan-400 hover:underline truncate"
                  >
                    {deployedUrls.liveUrl}
                  </a>
                </div>

                <div className="flex flex-col gap-2 pt-2">
                  <a
                    href={deployedUrls.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition"
                  >
                    <Globe className="w-4 h-4" /> Visit Live Site
                  </a>

                  <a
                    href={vercelImportUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 bg-white hover:bg-slate-100 text-slate-900 font-extrabold text-xs rounded-xl flex items-center justify-center gap-2 transition shadow-md"
                  >
                    <Rocket className="w-4 h-4 text-black" /> Deploy Directly into My Personal Vercel Account
                  </a>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {/* User Integration Input Card */}
                <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-200 border-b border-slate-800 pb-2">
                    <Github className="w-4 h-4 text-cyan-400" /> Enter Your GitHub Handle & Vercel Token
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
                    <label className="text-[11px] text-slate-400">GitHub Access Token (Optional)</label>
                    <input
                      type="password"
                      placeholder="ghp_xxxxxxxxxxxxxxxxx"
                      value={inputGithubToken}
                      onChange={(e) => setInputGithubToken(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-white mt-1 focus:border-cyan-500 focus:outline-none font-mono"
                    />
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

                <button
                  onClick={handleOneClickDeploy}
                  disabled={deployLoading}
                  className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-extrabold rounded-2xl text-sm shadow-xl flex items-center justify-center gap-2 transition transform hover:-translate-y-0.5"
                >
                  {deployLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Rocket className="w-4 h-4" />}
                  {deployLoading ? 'Deploying...' : '🚀 1-Click Deploy Live'}
                </button>

                <div className="pt-2 text-center">
                  <a
                    href={vercelImportUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-slate-300 hover:text-white underline font-semibold"
                  >
                    Or Deploy directly using Vercel Official Account Import →
                  </a>
                </div>

                {deployStatus && (
                  <p className="text-xs text-cyan-300 bg-cyan-950/80 p-3 rounded-xl border border-cyan-800 text-center font-mono">
                    {deployStatus}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
