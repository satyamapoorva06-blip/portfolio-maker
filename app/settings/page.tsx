'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/landing/Navbar';
import { getStoredUser, setStoredUser } from '@/lib/storage/local-store';
import { UserProfile } from '@/types/database';
import { User, Mail, Shield, Github, Rocket, Trash2, CheckCircle2, Save, Key, ExternalLink } from 'lucide-react';

export default function SettingsPage() {
  const [user, setUser] = useState<UserProfile>(getStoredUser());
  const [savedMsg, setSavedMsg] = useState('');

  useEffect(() => {
    setUser(getStoredUser());
  }, []);

  const handleSave = () => {
    setStoredUser(user);
    setSavedMsg('Account settings & integrations updated successfully!');
    setTimeout(() => setSavedMsg(''), 3000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      <Navbar />

      <main className="max-w-4xl mx-auto px-6 py-12 space-y-10">
        <div className="space-y-2">
          <h1 className="text-3xl font-extrabold text-white">Account & Integration Settings</h1>
          <p className="text-sm text-slate-400">
            Manage your personal profile, connected GitHub account, and Vercel cloud deployment tokens.
          </p>
        </div>

        {/* Profile Card */}
        <div className="p-8 bg-slate-900 border border-slate-800 rounded-3xl space-y-6 shadow-xl">
          <h2 className="font-bold text-lg text-white border-b border-slate-800 pb-3 flex items-center gap-2">
            <User className="w-5 h-5 text-cyan-400" /> Personal Profile Information
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="text-xs text-slate-400">Full Name</label>
              <input
                type="text"
                value={user.name}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white mt-1 focus:border-cyan-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs text-slate-400">Email Address</label>
              <input
                type="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white mt-1 focus:border-cyan-500 focus:outline-none"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="text-xs text-slate-400">Avatar Image URL</label>
              <input
                type="text"
                value={user.avatar_url || ''}
                onChange={(e) => setUser({ ...user, avatar_url: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white mt-1 focus:border-cyan-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* GitHub Integration Card */}
        <div className="p-8 bg-slate-900 border border-slate-800 rounded-3xl space-y-6 shadow-xl">
          <div className="flex justify-between items-center border-b border-slate-800 pb-3">
            <h2 className="font-bold text-lg text-white flex items-center gap-2">
              <Github className="w-5 h-5 text-cyan-400" /> GitHub Account Integration
            </h2>
            {user.github_username && (
              <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> Connected
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="text-xs text-slate-400">GitHub Username</label>
              <input
                type="text"
                placeholder="e.g. satyamapoorva06-blip"
                value={user.github_username || ''}
                onChange={(e) => setUser({ ...user, github_username: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white mt-1 focus:border-cyan-500 focus:outline-none font-mono"
              />
              <p className="text-[11px] text-slate-500 mt-1">Your official GitHub handle for automated repository creation.</p>
            </div>

            <div>
              <label className="text-xs text-slate-400">GitHub Personal Access Token (Optional)</label>
              <input
                type="password"
                placeholder="ghp_xxxxxxxxxxxxxxxxx"
                value={user.github_token || ''}
                onChange={(e) => setUser({ ...user, github_token: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white mt-1 focus:border-cyan-500 focus:outline-none font-mono"
              />
              <p className="text-[11px] text-slate-500 mt-1">Used to commit source code to your GitHub account.</p>
            </div>
          </div>
        </div>

        {/* Vercel Cloud Integration Card */}
        <div className="p-8 bg-slate-900 border border-slate-800 rounded-3xl space-y-6 shadow-xl">
          <div className="flex justify-between items-center border-b border-slate-800 pb-3">
            <h2 className="font-bold text-lg text-white flex items-center gap-2">
              <Rocket className="w-5 h-5 text-emerald-400" /> Vercel Deployment Integration
            </h2>
            {user.vercel_token && (
              <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> Token Set
              </span>
            )}
          </div>

          <div>
            <label className="text-xs text-slate-400">Vercel Personal Access Token (Optional)</label>
            <input
              type="password"
              placeholder="vercel_token_xxxxxxxxxxxxxxxxx"
              value={user.vercel_token || ''}
              onChange={(e) => setUser({ ...user, vercel_token: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white mt-1 focus:border-cyan-500 focus:outline-none font-mono"
            />
            <p className="text-[11px] text-slate-500 mt-1">
              Enables 1-Click live deployments to your Vercel cloud dashboard.
            </p>
          </div>
        </div>

        {/* Save Bar */}
        <div className="flex items-center justify-between p-6 bg-slate-900 border border-slate-800 rounded-2xl">
          <span className="text-xs text-emerald-400 font-medium">{savedMsg}</span>
          <button
            onClick={handleSave}
            className="px-8 py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold rounded-xl text-xs shadow-lg shadow-cyan-500/20 flex items-center gap-2 transition transform hover:-translate-y-0.5"
          >
            <Save className="w-4 h-4" /> Save Account & Integration Settings
          </button>
        </div>
      </main>
    </div>
  );
}
