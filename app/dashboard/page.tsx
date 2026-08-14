'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/landing/Navbar';
import { getStoredPortfolios, getStoredUser, deleteStoredPortfolio } from '@/lib/storage/local-store';
import { PortfolioData } from '@/types/portfolio';
import { Plus, Eye, Edit3, Trash2, Github, Rocket, Layers, CheckCircle2, Shield, Settings, Sparkles } from 'lucide-react';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState(getStoredUser());
  const [portfolios, setPortfolios] = useState<PortfolioData[]>([]);

  useEffect(() => {
    setUser(getStoredUser());
    setPortfolios(getStoredPortfolios());
  }, []);

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this portfolio?')) {
      deleteStoredPortfolio(id);
      setPortfolios(getStoredPortfolios());
    }
  };

  const totalViews = portfolios.reduce((acc) => acc + 142, 0);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-12 space-y-10">
        {/* Welcome Header Banner */}
        <div className="p-8 bg-gradient-to-r from-slate-900 via-cyan-950 to-slate-900 border border-slate-800 rounded-3xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 shadow-2xl relative overflow-hidden">
          <div className="space-y-2 relative z-10">
            <h1 className="text-3xl font-extrabold text-white">Welcome back, {user.name} 👋</h1>
            <p className="text-slate-300 text-sm">Create your professional portfolio in minutes.</p>
          </div>

          <div className="flex gap-3 relative z-10">
            <Link
              href="/settings"
              className="px-4 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700 flex items-center gap-2 transition"
            >
              <Settings className="w-4 h-4" /> Account Settings
            </Link>
            <Link
              href="/upload"
              className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-bold rounded-xl shadow-lg flex items-center gap-2 transition transform hover:-translate-y-0.5"
            >
              <Plus className="w-4 h-4" /> Create New Portfolio
            </Link>
          </div>
        </div>

        {/* Dashboard Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {[
            { label: 'Total Portfolios', value: portfolios.length, icon: Layers, color: 'text-cyan-400' },
            { label: 'Published Portfolios', value: portfolios.filter((p) => p.isPublished).length, icon: CheckCircle2, color: 'text-emerald-400' },
            { label: 'Total Views', value: totalViews, icon: Eye, color: 'text-purple-400' },
            { label: 'Connected GitHub', value: '@satyam-dev', icon: Github, color: 'text-blue-400' },
            { label: 'Deployment Status', value: 'Live on Vercel', icon: Rocket, color: 'text-teal-400' },
          ].map((m, idx) => {
            const Icon = m.icon;
            return (
              <div key={idx} className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-2">
                <div className="flex justify-between items-center text-xs text-slate-400">
                  <span>{m.label}</span>
                  <Icon className={`w-4 h-4 ${m.color}`} />
                </div>
                <div className="text-xl font-bold text-white font-mono">{m.value}</div>
              </div>
            );
          })}
        </div>

        {/* Portfolios Cards Grid */}
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-white">Your Portfolios</h2>
            <Link href="/upload" className="text-xs text-cyan-400 hover:underline flex items-center gap-1">
              <Plus className="w-4 h-4" /> Add Portfolio
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolios.map((p) => (
              <div key={p.id} className="p-6 bg-slate-900 border border-slate-800 rounded-3xl space-y-6 flex flex-col justify-between hover:border-slate-700 transition">
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-cyan-950 text-cyan-300 px-2.5 py-1 rounded-full border border-cyan-800">
                      {p.customization.theme} theme
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-emerald-950 text-emerald-300 border border-emerald-800">
                      Published
                    </span>
                  </div>

                  <h3 className="font-bold text-white text-lg leading-snug">{p.title}</h3>
                  <p className="text-xs text-slate-400 font-mono">/{p.slug}</p>
                  <p className="text-xs text-slate-500">Last updated: {new Date(p.updatedAt).toLocaleDateString()}</p>
                </div>

                <div className="flex gap-2 pt-2 border-t border-slate-800">
                  <Link
                    href={`/editor/${p.id}`}
                    className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs rounded-xl flex items-center justify-center gap-1.5 transition"
                  >
                    <Edit3 className="w-3.5 h-3.5" /> Edit
                  </Link>
                  <Link
                    href={`/u/${p.slug}`}
                    target="_blank"
                    className="py-2.5 px-3 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-xl border border-slate-700 flex items-center justify-center transition"
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </Link>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="py-2.5 px-3 bg-rose-950/60 hover:bg-rose-900 text-rose-300 text-xs font-medium rounded-xl border border-rose-800/80 flex items-center justify-center transition"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
