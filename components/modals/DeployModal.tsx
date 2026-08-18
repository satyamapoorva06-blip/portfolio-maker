'use client';

import React, { useState } from 'react';
import { PortfolioData } from '@/types/portfolio';
import { UserProfile } from '@/types/database';
import { saveStoredDeployment, setStoredUser } from '@/lib/storage/local-store';
import {
  Rocket,
  Github,
  Check,
  ExternalLink,
  X,
  Loader2,
  HelpCircle,
  Zap,
} from 'lucide-react';

interface DeployModalProps {
  portfolio: PortfolioData;
  user: UserProfile;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (liveUrl: string) => void;
}

export default function DeployModal({
  portfolio,
  user,
  isOpen,
  onClose,
  onSuccess,
}: DeployModalProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');

  const [githubUser, setGithubUser] = useState(user.github_username || '');
  const [githubToken, setGithubToken] = useState(user.github_token || '');
  const [vercelToken, setVercelToken] = useState(user.vercel_token || '');

  const [createdRepo, setCreatedRepo] = useState<{ url: string; fullName: string } | null>(null);
  const [liveUrl, setLiveUrl] = useState<string | null>(null);

  if (!isOpen) return null;

  const saveCredentials = () => {
    setStoredUser({
      ...user,
      github_username: githubUser || undefined,
      github_token: githubToken || undefined,
      vercel_token: vercelToken || undefined,
    });
  };

  const handleCreateRepo = async () => {
    if (!githubUser.trim()) {
      setStatus('Please enter your GitHub username.');
      return;
    }

    saveCredentials();
    setLoading(true);
    setStatus(`Creating repository on @${githubUser}...`);

    try {
      const cleanSlug = portfolio.slug
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      const repoSlug = cleanSlug.endsWith('-portfolio') ? cleanSlug : `${cleanSlug}-portfolio`;

      const res = await fetch('/api/github/create-repo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          repoName: repoSlug,
          isPrivate: false,
          portfolio,
          githubUsername: githubUser,
          token: githubToken,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to create GitHub repository');

      setCreatedRepo({ url: data.repoUrl, fullName: data.fullName });
      setStep(2);
      setStatus('GitHub repository created successfully!');
    } catch (err: any) {
      setStatus(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDeployVercel = async () => {
    if (!createdRepo) return;

    setLoading(true);
    setStatus(`Deploying ${createdRepo.fullName} to Vercel...`);

    try {
      const res = await fetch('/api/vercel/deploy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          portfolio,
          repoFullName: createdRepo.fullName,
          token: vercelToken,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Vercel deployment failed');

      const finalUrl = data.deploymentUrl || data.instantPublicUrl;
      setLiveUrl(finalUrl);
      setStep(3);

      saveStoredDeployment({
        id: `dep_${Date.now()}`,
        portfolio_id: portfolio.id,
        user_id: portfolio.userId || user.id,
        provider: 'vercel',
        repository_url: createdRepo.url,
        deployment_url: finalUrl,
        status: 'live',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });

      if (onSuccess) onSuccess(finalUrl);
      setStatus('Deployment complete!');
    } catch (err: any) {
      setStatus(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const cleanUsername = (raw: string) =>
    raw
      .trim()
      .replace(/^https?:\/\/(www\.)?github\.com\//i, '')
      .replace(/\/.*$/, '')
      .replace(/^@/, '');

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-6">
      <div className="max-w-2xl w-full bg-slate-900 border border-slate-800 rounded-3xl p-8 space-y-6 shadow-2xl relative overflow-y-auto max-h-[90vh]">
        <button
          onClick={onClose}
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
            Creates a public repository on your GitHub account and deploys it directly to Vercel.
          </p>
        </div>

        {/* Step 1: GitHub Details */}
        {step === 1 && (
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
                    value={githubUser}
                    onChange={(e) => setGithubUser(cleanUsername(e.target.value))}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-white mt-1.5 focus:border-cyan-500 focus:outline-none font-mono"
                  />
                  <p className="text-[11px] text-slate-500 mt-1">
                    Your GitHub handle for automated repository creation.
                  </p>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300">
                    GitHub Personal Access Token (Optional)
                  </label>
                  <input
                    type="password"
                    placeholder="ghp_xxxxxxxxxxxxxxxxx"
                    value={githubToken}
                    onChange={(e) => setGithubToken(e.target.value.trim())}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-white mt-1.5 focus:border-cyan-500 focus:outline-none font-mono"
                  />
                  <p className="text-[11px] text-slate-500 mt-1">
                    Used to commit source code directly to your account.
                  </p>
                </div>
              </div>

              {/* Token Guide Box */}
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
                    <a
                      href="https://github.com/settings/tokens"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-400 font-mono underline"
                    >
                      github.com/settings/tokens
                    </a>
                    ).
                  </li>
                  <li>
                    Set Token Name to <strong className="text-white">"Portify AI"</strong> and check the{' '}
                    <span className="bg-emerald-500/20 text-emerald-400 font-mono px-1.5 py-0.5 rounded border border-emerald-500/40 text-[11px] font-bold">
                      repo
                    </span>{' '}
                    scope.
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
              onClick={handleCreateRepo}
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-extrabold rounded-2xl text-sm shadow-xl flex items-center justify-center gap-2 transition disabled:opacity-50"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Github className="w-4 h-4" />}
              {loading ? 'Creating GitHub Repo & Pushing Code...' : 'Step 1: Create GitHub Repository & Push Code'}
            </button>
          </div>
        )}

        {/* Step 2: Vercel Deployment */}
        {step === 2 && createdRepo && (
          <div className="space-y-5">
            <div className="p-4 bg-slate-950 border border-emerald-500/40 rounded-2xl space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                  <Check className="w-4 h-4" /> GitHub Repository Live!
                </span>
                <a
                  href={createdRepo.url}
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
                  value={vercelToken}
                  onChange={(e) => setVercelToken(e.target.value.trim())}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-white mt-1.5 focus:border-emerald-500 focus:outline-none font-mono"
                />
                <p className="text-[11px] text-slate-500 mt-1">
                  Enables 1-Click live deployments to your Vercel cloud dashboard.
                </p>
              </div>

              {/* Vercel Token Guide Box */}
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
                    <a
                      href="https://vercel.com/account/tokens"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-400 font-mono underline"
                    >
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

            <button
              onClick={handleDeployVercel}
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-extrabold rounded-2xl text-sm shadow-xl flex items-center justify-center gap-2 transition disabled:opacity-50"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Rocket className="w-4 h-4" />}
              {loading ? 'Deploying to Vercel...' : 'Step 2: Deploy to Vercel Cloud'}
            </button>
          </div>
        )}

        {/* Step 3: Deployment Success */}
        {step === 3 && (
          <div className="space-y-4 p-6 bg-slate-950 border border-emerald-500/40 rounded-2xl text-center">
            <div className="text-xs font-bold text-emerald-400 flex items-center justify-center gap-2">
              <Check className="w-4 h-4" /> GitHub & Vercel Deployments Live!
            </div>
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm font-bold text-emerald-400 hover:underline font-mono"
              >
                {liveUrl}
              </a>
            )}
            <button
              onClick={onClose}
              className="w-full py-3 bg-[#e50914] text-white font-bold text-xs rounded-xl hover:bg-[#ff1f2d] transition"
            >
              Done & Close
            </button>
          </div>
        )}

        {status && (
          <p className="text-xs text-cyan-300 bg-cyan-950/80 p-3 rounded-xl border border-cyan-800 text-center font-mono">
            {status}
          </p>
        )}
      </div>
    </div>
  );
}
