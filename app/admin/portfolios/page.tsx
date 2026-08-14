'use client';

import React from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { getStoredPortfolios } from '@/lib/storage/local-store';
import { Eye, ExternalLink, Folders } from 'lucide-react';

export default function AdminPortfoliosPage() {
  const portfolios = getStoredPortfolios();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex font-sans">
      <AdminSidebar />

      <main className="flex-1 p-10 space-y-8 overflow-y-auto">
        <div className="space-y-2">
          <h1 className="text-3xl font-extrabold text-white">Platform Portfolios</h1>
          <p className="text-sm text-slate-400">Overview of all active portfolios built across the platform.</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 border-b border-slate-800 text-slate-400 font-semibold uppercase">
              <tr>
                <th className="px-6 py-4">Portfolio Title</th>
                <th className="px-6 py-4">Slug</th>
                <th className="px-6 py-4">Theme</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">View</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {portfolios.map((p) => (
                <tr key={p.id} className="hover:bg-slate-800/40 transition">
                  <td className="px-6 py-4 font-bold text-white">{p.title}</td>
                  <td className="px-6 py-4 font-mono text-cyan-400">/{p.slug}</td>
                  <td className="px-6 py-4 capitalize">{p.customization.theme}</td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-800">
                      Published
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <a
                      href={`/u/${p.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg border border-slate-700 inline-flex items-center gap-1"
                    >
                      <ExternalLink className="w-3.5 h-3.5" /> Preview
                    </a>
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
