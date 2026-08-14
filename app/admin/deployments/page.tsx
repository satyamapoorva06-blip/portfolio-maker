'use client';

import React from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { Rocket, ExternalLink, Github } from 'lucide-react';

export default function AdminDeploymentsPage() {
  const deployments = [
    {
      id: 'dep_01',
      portfolio: 'Satyam Sharma — AI Developer',
      slug: 'satyam-sharma',
      provider: 'Vercel',
      repo: 'github.com/satyam-dev/satyam-portfolio',
      url: 'https://satyam-sharma.vercel.app',
      status: 'live',
      date: '2026-08-14',
    },
    {
      id: 'dep_02',
      portfolio: 'Alex Mercer — Full Stack Architect',
      slug: 'alex-mercer',
      provider: 'Netlify',
      repo: 'github.com/alex-mercer/alex-portfolio',
      url: 'https://alex-mercer.netlify.app',
      status: 'live',
      date: '2026-08-12',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex font-sans">
      <AdminSidebar />

      <main className="flex-1 p-10 space-y-8 overflow-y-auto">
        <div className="space-y-2">
          <h1 className="text-3xl font-extrabold text-white">Platform Deployments</h1>
          <p className="text-sm text-slate-400">Tracking Vercel and Netlify production deployments.</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 border-b border-slate-800 text-slate-400 font-semibold uppercase">
              <tr>
                <th className="px-6 py-4">Portfolio</th>
                <th className="px-6 py-4">Provider</th>
                <th className="px-6 py-4">Repository</th>
                <th className="px-6 py-4">Live URL</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {deployments.map((d) => (
                <tr key={d.id} className="hover:bg-slate-800/40 transition">
                  <td className="px-6 py-4 font-bold text-white">{d.portfolio}</td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] bg-blue-950 text-blue-300 border border-blue-800 font-semibold">
                      {d.provider}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-mono text-slate-400">{d.repo}</td>
                  <td className="px-6 py-4 font-mono text-emerald-400">
                    <a href={d.url} target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center gap-1">
                      {d.url} <ExternalLink className="w-3 h-3" />
                    </a>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-800 uppercase font-mono">
                      ✓ {d.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
