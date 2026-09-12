"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/landing/Navbar";
import {
  getStoredPortfolios,
  saveStoredPortfolio,
} from "@/lib/storage/local-store";
import { PortfolioData } from "@/types/portfolio";
import {
  Globe,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Loader2,
  ExternalLink,
  Plus,
  Trash2,
  ArrowLeft,
} from "lucide-react";

export default function CustomDomainsPage() {
  const [portfolios, setPortfolios] = useState<PortfolioData[]>([]);
  const [selectedPortfolioId, setSelectedPortfolioId] = useState<string>("");
  const [domainInput, setDomainInput] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<any>(null);
  const [attachedDomains, setAttachedDomains] = useState<
    {
      portfolioId: string;
      portfolioTitle: string;
      domain: string;
      status: "active" | "pending";
    }[]
  >([]);

  useEffect(() => {
    const list = getStoredPortfolios();
    setPortfolios(list);
    if (list.length > 0) {
      setSelectedPortfolioId(list[0].id);
    }

    const savedDomains = localStorage.getItem("portify_custom_domains");
    if (savedDomains) {
      try {
        setAttachedDomains(JSON.parse(savedDomains));
      } catch {}
    } else if (list.length > 0) {
      setAttachedDomains([
        {
          portfolioId: list[0].id,
          portfolioTitle: list[0].title,
          domain: `${list[0].slug}.dev`,
          status: "active",
        },
      ]);
    }
  }, []);

  const saveDomainsToStorage = (updated: any[]) => {
    setAttachedDomains(updated);
    localStorage.setItem("portify_custom_domains", JSON.stringify(updated));
  };

  const handleVerifyAndAttach = async () => {
    if (!domainInput.trim()) return;

    setVerifying(true);
    setVerificationResult(null);

    try {
      const res = await fetch("/api/domain/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ domain: domainInput.trim() }),
      });

      const json = await res.json();
      setVerificationResult(json);

      if (json.success && json.verified) {
        const targetPort =
          portfolios.find((p) => p.id === selectedPortfolioId) || portfolios[0];
        const newEntry = {
          portfolioId: targetPort.id,
          portfolioTitle: targetPort.title,
          domain: json.domain,
          status: "active" as const,
        };

        const updated = [
          newEntry,
          ...attachedDomains.filter((d) => d.domain !== json.domain),
        ];
        saveDomainsToStorage(updated);
      }
    } catch (err: any) {
      setVerificationResult({
        error: err.message || "Domain verification failed",
      });
    } finally {
      setVerifying(false);
    }
  };

  const handleDeleteDomain = (domainName: string) => {
    const updated = attachedDomains.filter((d) => d.domain !== domainName);
    saveDomainsToStorage(updated);
  };

  const activePortfolio =
    portfolios.find((p) => p.id === selectedPortfolioId) || portfolios[0];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-8">
        {/* Header Breadcrumb */}
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/deployments"
            className="p-2 bg-slate-900 hover:bg-slate-800 rounded-xl text-slate-400 hover:text-white border border-slate-800 transition"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2.5">
              <Globe className="w-7 h-7 text-cyan-400" /> Custom Domains Manager
            </h1>
            <p className="text-xs sm:text-sm text-slate-400">
              Connect your custom domain name (e.g. yourname.com) directly to
              your SaaS portfolio.
            </p>
          </div>
        </div>

        {/* Attached Domains List */}
        <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl space-y-6 shadow-xl">
          <h2 className="text-base font-bold text-white flex items-center justify-between">
            <span>Attached Domains</span>
            <span className="text-xs font-mono bg-cyan-950 text-cyan-300 px-3 py-1 rounded-full border border-cyan-800">
              {attachedDomains.length} Domains Connected
            </span>
          </h2>

          {attachedDomains.length === 0 ? (
            <p className="text-xs text-slate-500 italic">
              No custom domains attached yet.
            </p>
          ) : (
            <div className="space-y-3">
              {attachedDomains.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-slate-950 border border-slate-800 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-white font-mono">
                        {item.domain}
                      </span>
                      <span className="text-[10px] font-bold uppercase bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-800 flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3 text-emerald-400" /> SSL
                        Active
                      </span>
                    </div>
                    <p className="text-xs text-slate-400">
                      Attached to:{" "}
                      <span className="text-slate-200">
                        {item.portfolioTitle}
                      </span>
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href={`https://${item.domain}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700 flex items-center gap-1 transition"
                    >
                      <ExternalLink className="w-3.5 h-3.5" /> Visit Domain
                    </a>
                    <button
                      onClick={() => handleDeleteDomain(item.domain)}
                      className="p-2 text-rose-400 hover:bg-rose-950/60 rounded-xl border border-rose-900/60 transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Attach New Domain Form & DNS Guide */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-6 p-6 bg-slate-900 border border-slate-800 rounded-3xl space-y-6 shadow-xl">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Plus className="w-5 h-5 text-cyan-400" /> Add Custom Domain
            </h3>

            <div className="space-y-4">
              <div>
                <label className="text-xs text-slate-400 font-medium">
                  Select Portfolio
                </label>
                <select
                  value={selectedPortfolioId}
                  onChange={(e) => setSelectedPortfolioId(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 mt-1 focus:border-cyan-500 focus:outline-none"
                >
                  {portfolios.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.title} (/{p.slug})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs text-slate-400 font-medium">
                  Domain Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. satyamapoorva.dev"
                  value={domainInput}
                  onChange={(e) => setDomainInput(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white mt-1 focus:border-cyan-500 focus:outline-none font-mono"
                />
              </div>

              <button
                onClick={handleVerifyAndAttach}
                disabled={verifying || !domainInput.trim()}
                className="w-full py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-lg flex items-center justify-center gap-2 transition"
              >
                {verifying ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <RefreshCw className="w-4 h-4" />
                )}
                Verify & Attach Domain
              </button>
            </div>

            {verificationResult && (
              <div
                className={`p-4 rounded-2xl border text-xs font-mono space-y-2 ${
                  verificationResult.verified
                    ? "bg-emerald-950/60 border-emerald-800 text-emerald-300"
                    : "bg-amber-950/60 border-amber-800 text-amber-300"
                }`}
              >
                <p className="font-bold flex items-center gap-1.5">
                  {verificationResult.verified ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : (
                    <AlertCircle className="w-4 h-4" />
                  )}
                  {verificationResult.message || verificationResult.error}
                </p>
              </div>
            )}
          </div>

          {/* DNS Configuration Guide */}
          <div className="md:col-span-6 p-6 bg-slate-900 border border-slate-800 rounded-3xl space-y-6 shadow-xl">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" /> Required DNS
              Records
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              To connect your domain, log in to your DNS provider (Namecheap,
              GoDaddy, Cloudflare) and add the following records:
            </p>

            <div className="space-y-4">
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-2">
                <div className="flex justify-between text-xs font-bold text-slate-300">
                  <span>Type: A Record</span>
                  <span className="text-cyan-400 font-mono">Root Domain</span>
                </div>
                <div className="grid grid-cols-2 text-xs font-mono bg-slate-900 p-2.5 rounded-lg border border-slate-800 text-slate-200">
                  <div>
                    Name: <span className="text-cyan-300">@</span>
                  </div>
                  <div>
                    Value: <span className="text-emerald-400">76.76.21.21</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-2">
                <div className="flex justify-between text-xs font-bold text-slate-300">
                  <span>Type: CNAME Record</span>
                  <span className="text-cyan-400 font-mono">Subdomain</span>
                </div>
                <div className="grid grid-cols-2 text-xs font-mono bg-slate-900 p-2.5 rounded-lg border border-slate-800 text-slate-200">
                  <div>
                    Name: <span className="text-cyan-300">www</span>
                  </div>
                  <div>
                    Value:{" "}
                    <span className="text-emerald-400">
                      cname.vercel-dns.com
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
