"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/landing/Navbar";
import {
  Users,
  UserPlus,
  Shield,
  Mail,
  CheckCircle2,
  Trash2,
  ArrowLeft,
  Key,
  Sparkles,
} from "lucide-react";

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: "owner" | "editor" | "viewer";
  status: "active" | "pending";
  joinedAt: string;
}

export default function TeamSettingsPage() {
  const [members, setMembers] = useState<TeamMember[]>([
    {
      id: "mem_1",
      name: "Satyam Apoorva",
      email: "satyam@portify.ai",
      role: "owner",
      status: "active",
      joinedAt: "2026-01-15",
    },
    {
      id: "mem_2",
      name: "Alex Rivera",
      email: "alex@company.com",
      role: "editor",
      status: "active",
      joinedAt: "2026-02-10",
    },
  ]);

  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState<"editor" | "viewer">("editor");
  const [statusMsg, setStatusMsg] = useState("");

  const handleInvite = () => {
    if (!inviteEmail.trim()) return;

    const newMember: TeamMember = {
      id: "mem_" + Date.now(),
      name: inviteEmail.split("@")[0],
      email: inviteEmail.trim(),
      role: inviteRole,
      status: "pending",
      joinedAt: new Date().toISOString().split("T")[0],
    };

    setMembers([...members, newMember]);
    setInviteEmail("");
    setStatusMsg(`✓ Invitation sent to ${newMember.email}!`);
    setTimeout(() => setStatusMsg(""), 3000);
  };

  const handleRemoveMember = (id: string) => {
    if (confirm("Are you sure you want to remove this team member?")) {
      setMembers(members.filter((m) => m.id !== id));
    }
  };

  const handleChangeRole = (
    id: string,
    role: "owner" | "editor" | "viewer",
  ) => {
    setMembers(members.map((m) => (m.id === id ? { ...m, role } : m)));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-8">
        <div className="flex items-center gap-3">
          <Link
            href="/settings"
            className="p-2 bg-slate-900 hover:bg-slate-800 rounded-xl text-slate-400 hover:text-white border border-slate-800 transition"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2.5">
              <Users className="w-7 h-7 text-cyan-400" /> Team & Workspace
              Collaboration
            </h1>
            <p className="text-xs sm:text-sm text-slate-400">
              Invite collaborators, manage team permissions, and assign
              portfolio access roles.
            </p>
          </div>
        </div>

        {/* Invite Team Member Box */}
        <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl space-y-6 shadow-xl">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <UserPlus className="w-5 h-5 text-cyan-400" /> Invite New Team
            Member
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
            <div className="sm:col-span-6">
              <label className="text-xs text-slate-400 font-medium">
                Email Address
              </label>
              <input
                type="email"
                placeholder="colleague@company.com"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white mt-1 focus:border-cyan-500 focus:outline-none"
              />
            </div>

            <div className="sm:col-span-3">
              <label className="text-xs text-slate-400 font-medium">
                Access Role
              </label>
              <select
                value={inviteRole}
                onChange={(e) => setInviteRole(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 mt-1 focus:border-cyan-500 focus:outline-none"
              >
                <option value="editor">Editor (Full Edit)</option>
                <option value="viewer">Viewer (Read Only)</option>
              </select>
            </div>

            <div className="sm:col-span-3 flex items-end">
              <button
                onClick={handleInvite}
                disabled={!inviteEmail.trim()}
                className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-lg transition flex items-center justify-center gap-1.5"
              >
                <Mail className="w-4 h-4" /> Send Invite
              </button>
            </div>
          </div>

          {statusMsg && (
            <p className="text-xs text-emerald-400 bg-emerald-950/60 p-3 rounded-xl border border-emerald-800 font-mono">
              {statusMsg}
            </p>
          )}
        </div>

        {/* Team Members List */}
        <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl space-y-6 shadow-xl">
          <h2 className="text-base font-bold text-white flex items-center justify-between">
            <span>Active Team Members ({members.length})</span>
          </h2>

          <div className="space-y-3">
            {members.map((m) => (
              <div
                key={m.id}
                className="p-4 bg-slate-950 border border-slate-800 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold">
                    {m.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">{m.name}</h3>
                    <p className="text-xs text-slate-400">{m.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                  <select
                    value={m.role}
                    disabled={m.role === "owner"}
                    onChange={(e) =>
                      handleChangeRole(m.id, e.target.value as any)
                    }
                    className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-cyan-300 font-semibold focus:outline-none"
                  >
                    <option value="owner">Owner</option>
                    <option value="editor">Editor</option>
                    <option value="viewer">Viewer</option>
                  </select>

                  {m.role !== "owner" && (
                    <button
                      onClick={() => handleRemoveMember(m.id)}
                      className="p-2 text-rose-400 hover:bg-rose-950/60 rounded-xl border border-rose-900/60 transition"
                      title="Remove Member"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
