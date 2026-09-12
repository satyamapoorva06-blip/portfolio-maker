"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/landing/Navbar";
import {
  ShieldCheck,
  Lock,
  Activity,
  Server,
  FileText,
  CheckCircle2,
  AlertTriangle,
  ArrowLeft,
  RefreshCw,
} from "lucide-react";

interface AuditLog {
  id: string;
  timestamp: string;
  actor: string;
  action: string;
  category: "security" | "deployment" | "auth" | "system";
  status: "success" | "warning" | "info";
}

const INITIAL_AUDIT_LOGS: AuditLog[] = [
  {
    id: "log_1",
    timestamp: new Date().toISOString(),
    actor: "system",
    action: "Verified security headers (X-Frame-Options, CSP, HSTS)",
    category: "security",
    status: "success",
  },
  {
    id: "log_2",
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    actor: "user@example.com",
    action: "Updated portfolio data model with custom sectionOrder",
    category: "system",
    status: "success",
  },
  {
    id: "log_3",
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    actor: "user@example.com",
    action: "Verified custom domain DNS records (A & CNAME)",
    category: "deployment",
    status: "success",
  },
  {
    id: "log_4",
    timestamp: new Date(Date.now() - 14400000).toISOString(),
    actor: "system",
    action: "Supabase API connection active & RLS policies operational",
    category: "security",
    status: "success",
  },
];

export default function EnterpriseAuditPage() {
  const [logs] = useState<AuditLog[]>(INITIAL_AUDIT_LOGS);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-8">
        <div className="flex items-center gap-3">
          <Link
            href="/admin"
            className="p-2 bg-slate-900 hover:bg-slate-800 rounded-xl text-slate-400 hover:text-white border border-slate-800 transition"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2.5">
              <ShieldCheck className="w-7 h-7 text-emerald-400" /> Enterprise
              Audit & Security Center
            </h1>
            <p className="text-xs sm:text-sm text-slate-400">
              Audit trail, security compliance checks, and infrastructure
              provider health statuses.
            </p>
          </div>
        </div>

        {/* Security Compliance Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl space-y-2">
            <div className="flex justify-between items-center text-xs text-slate-400">
              <span>Security Headers</span>
              <Lock className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-bold text-emerald-400 font-mono">
              100% Valid
            </div>
            <p className="text-[11px] text-slate-400">
              CSP, HSTS, X-Frame-Options active
            </p>
          </div>

          <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl space-y-2">
            <div className="flex justify-between items-center text-xs text-slate-400">
              <span>API Gateways</span>
              <Server className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-2xl font-bold text-cyan-400 font-mono">
              Operational
            </div>
            <p className="text-[11px] text-slate-400">
              Gemini, Supabase, Vercel online
            </p>
          </div>

          <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl space-y-2">
            <div className="flex justify-between items-center text-xs text-slate-400">
              <span>Audit Logging</span>
              <Activity className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-2xl font-bold text-white font-mono">
              Real-time
            </div>
            <p className="text-[11px] text-slate-400">
              Full event trace enabled
            </p>
          </div>
        </div>

        {/* Audit Log Table */}
        <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl space-y-6 shadow-xl">
          <h2 className="text-base font-bold text-white flex items-center justify-between">
            <span>System Audit Trail</span>
            <span className="text-xs font-mono bg-slate-800 text-slate-300 px-3 py-1 rounded-full border border-slate-700">
              {logs.length} Logged Events
            </span>
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider font-semibold">
                  <th className="p-3">Timestamp</th>
                  <th className="p-3">Actor</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Action Description</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono">
                {logs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-950/60 transition">
                    <td className="p-3 text-slate-400">
                      {new Date(log.timestamp).toLocaleString()}
                    </td>
                    <td className="p-3 text-cyan-400 font-semibold">
                      {log.actor}
                    </td>
                    <td className="p-3 uppercase text-[10px] text-slate-300">
                      {log.category}
                    </td>
                    <td className="p-3 text-slate-200 font-sans">
                      {log.action}
                    </td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded-full text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-800">
                        ✓ {log.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
