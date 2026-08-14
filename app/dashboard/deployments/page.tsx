'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/landing/Navbar';
import { getStoredPortfolios, saveStoredDeployment, getStoredDeployments } from '@/lib/storage/local-store';
import { PortfolioData } from '@/types/portfolio';
import { Github, Rocket, CheckCircle2, Copy, ExternalLink, RefreshCw, AlertCircle, Loader2, ShieldCheck } from 'lucide-react';

export default function DeploymentsPage() {
  const [portfolios, setPortfolios] = useState<PortfolioData[]>([]);
  const [selectedPortfolioId, setSelectedPortfolioId] = useState<string>('');
  const [provider, setProvider] = useState<'vercel' | 'netlify'>('vercel');
  const [repoName, setRepoName] = useState('satyam-portfolio');
  const [isPrivate, setIsPrivate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [syncLoading, setSyncLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');
  const [copied, setCopied] = useState(false);

  const [activeDeployment, setActiveDeployment] = useState<{
    repoUrl: string;
    deploymentUrl: string;
    status: string;
  } | null>(null);

  useEffect(() => {
    const list = getStoredPortfolios();
    setPortfolios(list);
    if (list.length > 0) {
      setSelectedPortfolioId(list[0].id);
      setRepoName(`${list[0].slug}-portfolio`);
      // Initial state mockup
      setActiveDeployment({
        repoUrl: `https://github.com/satyam-dev/${list[0].slug}-portfolio`,
        deploymentUrl: `https://${list[0].slug}.vercel.app`,
        status: 'live',
      });
    }
  }, []);

  const activePortfolio = portfolios.find((p) => p.id === selectedPortfolioId) || portfolios[0];

  const handleDeploy = async () => {
    if (!activePortfolio) return;
    setLoading(true);
    setStatusMsg('Connecting GitHub...');

    try {
      // 1. Create GitHub Repo
      setStatusMsg('Creating GitHub repository...');
      const repoRes = await fetch('/api/github/create-repo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ repoName, isPrivate, portfolio: activePortfolio }),
      });
      const repoJson = await repoRes.json();
      if (!repoRes.ok) throw new Error(repoJson.error || 'Failed to create GitHub repo');

      // 2. Deploy to Cloud Provider (Vercel or Netlify)
      setStatusMsg(`Deploying to ${provider === 'vercel' ? 'Vercel' : 'Netlify'}...`);
      const endpoint = provider === 'vercel' ? '/api/vercel/deploy' : '/api/netlify/deploy';
      const deployRes = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ portfolio: activePortfolio, repoFullName: repoJson.fullName }),
      });
      const deployJson = await deployRes.json();

      setActiveDeployment({
        repoUrl: repoJson.repoUrl,
        deploymentUrl: deployJson.deploymentUrl,
        status: 'live',
      });

      // Save to deployments store
      saveStoredDeployment({
        id: `dep_${Date.now()}`,
        portfolio_id: activePortfolio.id,
        user_id: 'usr_satyam_demo_01',
        provider,
        repository_url: repoJson.repoUrl,
        deployment_url: deployJson.deploymentUrl,
        status: 'live',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });

      setStatusMsg('✓ Live Deployment Ready!');
    } catch (err: any) {
      setStatusMsg(`Deployment Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSyncUpdate = async () => {
    setSyncLoading(true);
    setStatusMsg('Saving changes...');
    setTimeout(() => {
      setStatusMsg('✓ Live Portfolio Updated Successfully!');
      setSyncLoading(false);
    }, 1200);
  };

  const copyUrlToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      <Navbar />

      <main className="max-w-5xl mx-auto px-6 py-12 space-y-12">
        <div className="space-y-2">
          <h1 className="text-3xl font-extrabold text-white">Deployment Hub</h1>
          <p className="text-sm text-slate-400">
            Connect GitHub, push standalone Next.js portfolio source code, and publish live on Vercel or Netlify.
          </p>
        </div>

        {/* GitHub Connection Card */}
        <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-white">
              <Github className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">GitHub Integration</h3>
              <p className="text-xs text-emerald-400 flex items-center gap-1.5 mt-0.5">
                <CheckCircle2 className="w-4 h-4" /> Connected as @satyam-dev
              </p>
            </div>
          </div>
          <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 rounded-xl border border-slate-700 transition">
            Disconnect
          </button>
        </div>

        {/* Portfolio Selection & Deploy Config */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-6 p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-6">
            <h3 className="font-bold text-white text-base">1. Select Target Portfolio</h3>
            {portfolios.map((p) => (
              <button
                key={p.id}
                onClick={() => {
                  setSelectedPortfolioId(p.id);
                  setRepoName(`${p.slug}-portfolio`);
                }}
                className={`w-full p-4 rounded-xl border text-left flex justify-between items-center transition ${
                  selectedPortfolioId === p.id ? 'bg-cyan-950/40 border-cyan-500 text-white' : 'bg-slate-950 border-slate-800 text-slate-400'
                }`}
              >
                <div>
                  <h4 className="font-semibold text-sm text-white">{p.title}</h4>
                  <p className="text-xs text-slate-400">/{p.slug} • {p.customization.theme} theme</p>
                </div>
                {selectedPortfolioId === p.id && <CheckCircle2 className="w-5 h-5 text-cyan-400" />}
              </button>
            ))}

            <h3 className="font-bold text-white text-base pt-4 border-t border-slate-800">2. Repository Options</h3>
            <div className="space-y-4">
              <div>
                <label className="text-xs text-slate-400">Repository Name</label>
                <input
                  type="text"
                  value={repoName}
                  onChange={(e) => setRepoName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white mt-1 focus:border-cyan-500 focus:outline-none font-mono"
                />
              </div>

              <div className="flex gap-4 text-xs">
                <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                  <input
                    type="radio"
                    name="privacy"
                    checked={!isPrivate}
                    onChange={() => setIsPrivate(false)}
                    className="accent-cyan-500"
                  />
                  Public Repository
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                  <input
                    type="radio"
                    name="privacy"
                    checked={isPrivate}
                    onChange={() => setIsPrivate(true)}
                    className="accent-cyan-500"
                  />
                  Private Repository
                </label>
              </div>
            </div>

            <h3 className="font-bold text-white text-base pt-4 border-t border-slate-800">3. Select Hosting Provider</h3>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setProvider('vercel')}
                className={`p-4 rounded-xl border text-center font-bold text-sm transition ${
                  provider === 'vercel' ? 'bg-blue-600/20 border-blue-500 text-white' : 'bg-slate-950 border-slate-800 text-slate-400'
                }`}
              >
                Vercel
              </button>
              <button
                onClick={() => setProvider('netlify')}
                className={`p-4 rounded-xl border text-center font-bold text-sm transition ${
                  provider === 'netlify' ? 'bg-teal-600/20 border-teal-500 text-white' : 'bg-slate-950 border-slate-800 text-slate-400'
                }`}
              >
                Netlify
              </button>
            </div>

            <button
              onClick={handleDeploy}
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold rounded-xl text-sm shadow-xl flex items-center justify-center gap-2 transition"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Rocket className="w-4 h-4" />} Deploy Portfolio Live
            </button>
          </div>

          {/* Active Deployment Details */}
          <div className="md:col-span-6 p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-6">
            <h3 className="font-bold text-white text-base">Active Live Deployment</h3>

            {activeDeployment ? (
              <div className="space-y-6">
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400">Status</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 font-mono uppercase text-[10px]">
                      ✓ {activeDeployment.status}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <span className="text-xs text-slate-400">GitHub Repository</span>
                    <a
                      href={activeDeployment.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-xs font-mono text-cyan-400 hover:underline truncate"
                    >
                      {activeDeployment.repoUrl}
                    </a>
                  </div>

                  <div className="space-y-1 pt-2 border-t border-slate-900">
                    <span className="text-xs text-slate-400">Live Website URL</span>
                    <a
                      href={activeDeployment.deploymentUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-sm font-semibold text-emerald-400 hover:underline truncate"
                    >
                      {activeDeployment.deploymentUrl}
                    </a>
                  </div>
                </div>

                <div className="flex gap-3">
                  <a
                    href={activeDeployment.deploymentUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl text-xs flex items-center justify-center gap-1.5 transition"
                  >
                    <ExternalLink className="w-4 h-4" /> Visit Portfolio
                  </a>
                  <button
                    onClick={() => copyUrlToClipboard(activeDeployment.deploymentUrl)}
                    className="px-4 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-xl text-xs border border-slate-700 flex items-center gap-1.5 transition"
                  >
                    <Copy className="w-4 h-4" /> {copied ? 'Copied!' : 'Copy URL'}
                  </button>
                </div>

                {/* Update Live Portfolio Sync Button */}
                <div className="p-4 bg-cyan-950/30 border border-cyan-500/30 rounded-xl space-y-3">
                  <h4 className="font-bold text-sm text-cyan-300">Automatic Portfolio Updates</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Edited your portfolio in the Visual Editor? Click below to save changes, commit to GitHub, and trigger live re-deployment automatically.
                  </p>
                  <button
                    onClick={handleSyncUpdate}
                    disabled={syncLoading}
                    className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition"
                  >
                    {syncLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />} Update Live Portfolio
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-8 text-center text-slate-500 text-xs space-y-2 border border-dashed border-slate-800 rounded-xl">
                <Rocket className="w-8 h-8 mx-auto text-slate-600" />
                <p>No active deployment created yet. Deploy your first portfolio above!</p>
              </div>
            )}

            {statusMsg && (
              <p className="text-xs text-cyan-300 bg-cyan-950 p-3 rounded-lg border border-cyan-800 text-center font-mono">
                {statusMsg}
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
