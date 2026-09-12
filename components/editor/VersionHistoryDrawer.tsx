"use client";

import React, { useState, useEffect } from "react";
import { PortfolioData } from "@/types/portfolio";
import { PortfolioVersionRecord } from "@/types/database";
import { getStoredVersions } from "@/lib/storage/versioning";
import { History, RotateCcw, Clock, X, Eye, CheckCircle2 } from "lucide-react";

interface VersionHistoryDrawerProps {
  portfolio: PortfolioData;
  onRestoreVersion: (restoredData: PortfolioData) => void;
  onClose: () => void;
}

export default function VersionHistoryDrawer({
  portfolio,
  onRestoreVersion,
  onClose,
}: VersionHistoryDrawerProps) {
  const [versions, setVersions] = useState<PortfolioVersionRecord[]>([]);

  useEffect(() => {
    const list = getStoredVersions(portfolio.id);
    setVersions(list);
  }, [portfolio.id]);

  const handleRestore = (ver: PortfolioVersionRecord) => {
    if (
      confirm(
        `Restore portfolio version created at ${new Date(ver.created_at).toLocaleString()}?`,
      )
    ) {
      onRestoreVersion(ver.data as PortfolioData);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
      <div className="bg-slate-950 border border-slate-800 rounded-3xl max-w-xl w-full p-6 space-y-6 shadow-2xl text-slate-100 relative overflow-hidden">
        <div className="flex justify-between items-center border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2.5 text-cyan-400">
            <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
              <History className="w-4 h-4 text-cyan-400" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white">
                Portfolio Version History
              </h3>
              <p className="text-xs text-slate-400">
                Preview & restore past revision snapshots of your portfolio.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-2 rounded-xl hover:bg-slate-900 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Versions Timeline List */}
        {versions.length === 0 ? (
          <div className="p-8 text-center text-slate-500 text-xs border border-dashed border-slate-800 rounded-2xl space-y-2">
            <Clock className="w-8 h-8 mx-auto text-slate-600" />
            <p>
              No revision snapshots saved yet. Edit and click Save to create
              versions!
            </p>
          </div>
        ) : (
          <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
            {versions.map((ver, idx) => (
              <div
                key={ver.id}
                className="p-4 bg-slate-900 border border-slate-800 rounded-2xl flex items-center justify-between transition hover:border-slate-700"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white font-mono">
                      Revision #{versions.length - idx}
                    </span>
                    {idx === 0 && (
                      <span className="text-[10px] bg-cyan-950 text-cyan-300 px-2 py-0.5 rounded-full border border-cyan-800 font-mono">
                        Current Live
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-500" />{" "}
                    {new Date(ver.created_at).toLocaleString()}
                  </p>
                </div>

                <button
                  onClick={() => handleRestore(ver)}
                  className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-cyan-300 font-semibold text-xs rounded-xl border border-slate-700 flex items-center gap-1.5 transition"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Restore
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
