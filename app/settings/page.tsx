'use client';

import React, { useState } from 'react';
import Navbar from '@/components/landing/Navbar';
import { getStoredUser, setStoredUser } from '@/lib/storage/local-store';
import { UserProfile } from '@/types/database';
import { User, Mail, Shield, Github, Rocket, Trash2, CheckCircle2, Save } from 'lucide-react';

export default function SettingsPage() {
  const [user, setUser] = useState<UserProfile>(getStoredUser());
  const [savedMsg, setSavedMsg] = useState('');

  const handleSave = () => {
    setStoredUser(user);
    setSavedMsg('Profile updated successfully!');
    setTimeout(() => setSavedMsg(''), 2500);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      <Navbar />

      <main className="max-w-4xl mx-auto px-6 py-12 space-y-10">
        <div className="space-y-2">
          <h1 className="text-3xl font-extrabold text-white">Account Settings</h1>
          <p className="text-sm text-slate-400">Manage your profile metadata, connected OAuth integrations, and preferences.</p>
        </div>

        {/* Profile Card */}
        <div className="p-8 bg-slate-900 border border-slate-800 rounded-3xl space-y-6">
          <h2 className="font-bold text-lg text-white border-b border-slate-800 pb-3 flex items-center gap-2">
            <User className="w-5 h-5 text-cyan-400" /> User Profile Information
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

          <div className="flex items-center justify-between pt-4">
            <span className="text-xs text-emerald-400">{savedMsg}</span>
            <button
              onClick={handleSave}
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl text-xs flex items-center gap-2 transition"
            >
              <Save className="w-4 h-4" /> Save Settings
            </button>
          </div>
        </div>

        {/* OAuth Integrations */}
        <div className="p-8 bg-slate-900 border border-slate-800 rounded-3xl space-y-6">
          <h2 className="font-bold text-lg text-white border-b border-slate-800 pb-3 flex items-center gap-2">
            <Github className="w-5 h-5 text-cyan-400" /> Connected Integrations
          </h2>

          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-slate-950 border border-slate-800 rounded-2xl">
              <div className="flex items-center gap-3">
                <Github className="w-6 h-6 text-white" />
                <div>
                  <h3 className="font-bold text-sm text-white">GitHub Account</h3>
                  <p className="text-xs text-slate-400">Connected as @satyam-dev</p>
                </div>
              </div>
              <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> Connected
              </span>
            </div>

            <div className="flex justify-between items-center p-4 bg-slate-950 border border-slate-800 rounded-2xl">
              <div className="flex items-center gap-3">
                <Rocket className="w-6 h-6 text-emerald-400" />
                <div>
                  <h3 className="font-bold text-sm text-white">Vercel Deployment Host</h3>
                  <p className="text-xs text-slate-400">Authorized for live automatic deployments</p>
                </div>
              </div>
              <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> Connected
              </span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
