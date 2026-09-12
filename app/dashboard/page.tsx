"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/landing/Navbar";
import {
  getStoredPortfolios,
  getStoredUser,
  deleteStoredPortfolio,
  saveStoredPortfolio,
  getStoredMessages,
  markMessageRead,
  deleteStoredMessage,
} from "@/lib/storage/local-store";
import { PortfolioData } from "@/types/portfolio";
import { ContactMessageRecord } from "@/types/database";
import {
  Plus,
  Eye,
  Edit3,
  Trash2,
  Github,
  Rocket,
  Layers,
  CheckCircle2,
  Settings,
  FileText,
  ArrowRight,
  Inbox,
  Copy,
  BarChart3,
  Sparkles,
  Mail,
  Clock,
  ExternalLink,
  ShieldCheck,
  LayoutDashboard,
  Palette,
  Check,
  Globe,
} from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState(getStoredUser());
  const [portfolios, setPortfolios] = useState<PortfolioData[]>([]);
  const [messages, setMessages] = useState<ContactMessageRecord[]>([]);
  const [activeTab, setActiveTab] = useState<
    "portfolios" | "inbox" | "analytics"
  >("portfolios");
  const [selectedMessage, setSelectedMessage] =
    useState<ContactMessageRecord | null>(null);

  useEffect(() => {
    setUser(getStoredUser());
    setPortfolios(getStoredPortfolios());
    setMessages(getStoredMessages());
  }, []);

  const refreshData = () => {
    setPortfolios(getStoredPortfolios());
    setMessages(getStoredMessages());
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this portfolio?")) {
      deleteStoredPortfolio(id);
      refreshData();
    }
  };

  const handleDuplicate = (portfolio: PortfolioData) => {
    const copy: PortfolioData = {
      ...portfolio,
      id:
        "port_" + Date.now() + "_" + Math.random().toString(36).substring(2, 6),
      title: `${portfolio.title} (Copy)`,
      slug: `${portfolio.slug}-copy-${Math.floor(Math.random() * 1000)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    saveStoredPortfolio(copy);
    refreshData();
  };

  const handleTogglePublish = (portfolio: PortfolioData) => {
    const updated = {
      ...portfolio,
      isPublished: !portfolio.isPublished,
      updatedAt: new Date().toISOString(),
    };
    saveStoredPortfolio(updated);
    refreshData();
  };

  const handleOpenMessage = (msg: ContactMessageRecord) => {
    setSelectedMessage(msg);
    if (!msg.read) {
      markMessageRead(msg.id);
      refreshData();
    }
  };

  const handleDeleteMessage = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    deleteStoredMessage(id);
    if (selectedMessage?.id === id) {
      setSelectedMessage(null);
    }
    refreshData();
  };

  const unreadCount = messages.filter((m) => !m.read).length;
  const totalViews = portfolios.reduce((acc) => acc + 142, 0);
  const githubDisplay = user.github_username
    ? `@${user.github_username}`
    : "Not Connected";
  const vercelDisplay = user.vercel_token
    ? "Live on Vercel"
    : "Portify Host Active";

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col">
      <Navbar />

      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8 flex flex-col md:flex-row gap-8">
        {/* Sidebar Navigation */}
        <aside className="w-full md:w-64 space-y-6 flex-shrink-0">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
              <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-lg">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div className="overflow-hidden">
                <h3 className="text-sm font-bold text-white truncate">
                  {user.name}
                </h3>
                <p className="text-[11px] text-slate-400 truncate">
                  {user.email}
                </p>
              </div>
            </div>

            <nav className="space-y-1.5">
              <button
                onClick={() => setActiveTab("portfolios")}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-semibold transition ${
                  activeTab === "portfolios"
                    ? "bg-gradient-to-r from-cyan-500/20 to-blue-600/20 text-cyan-300 border border-cyan-500/30"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <LayoutDashboard className="w-4 h-4" /> My Portfolios
                </span>
                <span className="text-[10px] font-mono bg-slate-800 px-2 py-0.5 rounded-full text-slate-300">
                  {portfolios.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab("inbox")}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-semibold transition ${
                  activeTab === "inbox"
                    ? "bg-gradient-to-r from-cyan-500/20 to-blue-600/20 text-cyan-300 border border-cyan-500/30"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <Inbox className="w-4 h-4" /> Recruiter Inbox
                </span>
                {unreadCount > 0 ? (
                  <span className="text-[10px] font-bold bg-rose-500 text-white px-2 py-0.5 rounded-full animate-pulse">
                    {unreadCount}
                  </span>
                ) : (
                  <span className="text-[10px] font-mono bg-slate-800 px-2 py-0.5 rounded-full text-slate-300">
                    {messages.length}
                  </span>
                )}
              </button>

              <button
                onClick={() => setActiveTab("analytics")}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-semibold transition ${
                  activeTab === "analytics"
                    ? "bg-gradient-to-r from-cyan-500/20 to-blue-600/20 text-cyan-300 border border-cyan-500/30"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <BarChart3 className="w-4 h-4" /> Analytics
                </span>
              </button>

              <Link
                href="/themes"
                className="w-full flex items-center gap-2.5 px-4 py-3 rounded-2xl text-xs font-semibold text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 transition"
              >
                <Palette className="w-4 h-4" /> Theme Gallery
              </Link>

              <Link
                href="/upload"
                className="w-full flex items-center gap-2.5 px-4 py-3 rounded-2xl text-xs font-semibold text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 transition"
              >
                <FileText className="w-4 h-4" /> Resume Upload
              </Link>

              <Link
                href="/settings"
                className="w-full flex items-center gap-2.5 px-4 py-3 rounded-2xl text-xs font-semibold text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 transition"
              >
                <Settings className="w-4 h-4" /> Settings
              </Link>
            </nav>
          </div>

          <div className="p-5 bg-gradient-to-br from-cyan-950/60 to-slate-900 border border-cyan-900/40 rounded-3xl space-y-3">
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4" /> AI Resume Optimizer
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Auto-generate portfolio bullet points, custom skills & bio with
              Portify AI.
            </p>
            <Link
              href="/upload"
              className="inline-flex w-full justify-center py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-xl transition"
            >
              Upload New Resume
            </Link>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 space-y-8 min-w-0">
          {/* Welcome Header */}
          <div className="p-6 sm:p-8 bg-gradient-to-r from-slate-900 via-cyan-950/60 to-slate-900 border border-slate-800 rounded-3xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 shadow-2xl relative overflow-hidden">
            <div className="space-y-1 relative z-10">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                Welcome back, {user.name} 👋
              </h1>
              <p className="text-slate-400 text-xs sm:text-sm">
                Manage your SaaS portfolio websites, analytics, and recruiter
                contacts.
              </p>
            </div>

            <div className="flex gap-3 relative z-10 w-full sm:w-auto">
              <Link
                href="/upload"
                className="flex-1 sm:flex-initial px-5 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-bold rounded-xl shadow-lg flex items-center justify-center gap-2 transition transform hover:-translate-y-0.5"
              >
                <Plus className="w-4 h-4" /> Create Portfolio
              </Link>
            </div>
          </div>

          {/* Metrics Overview Bar */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl space-y-1">
              <div className="flex justify-between items-center text-xs text-slate-400">
                <span>Total Portfolios</span>
                <Layers className="w-4 h-4 text-cyan-400" />
              </div>
              <div className="text-2xl font-bold text-white font-mono">
                {portfolios.length}
              </div>
            </div>

            <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl space-y-1">
              <div className="flex justify-between items-center text-xs text-slate-400">
                <span>Published Live</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-2xl font-bold text-emerald-400 font-mono">
                {portfolios.filter((p) => p.isPublished).length}
              </div>
            </div>

            <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl space-y-1">
              <div className="flex justify-between items-center text-xs text-slate-400">
                <span>Total Views</span>
                <Eye className="w-4 h-4 text-purple-400" />
              </div>
              <div className="text-2xl font-bold text-white font-mono">
                {totalViews}
              </div>
            </div>

            <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl space-y-1">
              <div className="flex justify-between items-center text-xs text-slate-400">
                <span>Recruiter Messages</span>
                <Inbox className="w-4 h-4 text-rose-400" />
              </div>
              <div className="text-2xl font-bold text-rose-300 font-mono">
                {messages.length}
              </div>
            </div>
          </div>

          {/* TAB 1: PORTFOLIOS */}
          {activeTab === "portfolios" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <LayoutDashboard className="w-5 h-5 text-cyan-400" /> Your
                  Active Portfolios
                </h2>
                <Link
                  href="/upload"
                  className="text-xs text-cyan-400 hover:underline flex items-center gap-1"
                >
                  <Plus className="w-4 h-4" /> Create New
                </Link>
              </div>

              {portfolios.length === 0 ? (
                <div className="p-12 bg-slate-900/60 border border-dashed border-slate-800 rounded-3xl text-center space-y-6 max-w-xl mx-auto">
                  <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center mx-auto">
                    <FileText className="w-8 h-8" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-white">
                      No Portfolios Found
                    </h3>
                    <p className="text-slate-400 text-xs leading-relaxed">
                      You haven’t created a portfolio yet. Upload your PDF or
                      DOCX resume, and Portify AI will generate your portfolio
                      automatically!
                    </p>
                  </div>
                  <Link
                    href="/upload"
                    className="inline-flex px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-2xl text-xs shadow-lg items-center gap-2 transition"
                  >
                    Upload Resume & Build Portfolio{" "}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {portfolios.map((p) => (
                    <div
                      key={p.id}
                      className="p-6 bg-slate-900 border border-slate-800 rounded-3xl space-y-5 flex flex-col justify-between hover:border-slate-700 transition shadow-xl"
                    >
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] font-bold uppercase tracking-wider bg-cyan-950/80 text-cyan-300 px-3 py-1 rounded-full border border-cyan-800/80">
                            {p.customization.theme} theme
                          </span>
                          <button
                            onClick={() => handleTogglePublish(p)}
                            className={`px-3 py-1 rounded-full text-[10px] font-bold transition flex items-center gap-1.5 border ${
                              p.isPublished
                                ? "bg-emerald-950 text-emerald-300 border-emerald-800/80 hover:bg-emerald-900"
                                : "bg-amber-950 text-amber-300 border-amber-800/80 hover:bg-amber-900"
                            }`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${p.isPublished ? "bg-emerald-400" : "bg-amber-400"}`}
                            />
                            {p.isPublished ? "Published" : "Draft"}
                          </button>
                        </div>

                        <div>
                          <h3 className="font-bold text-white text-lg leading-snug">
                            {p.title}
                          </h3>
                          <p className="text-xs text-slate-400 font-mono mt-1 flex items-center gap-1">
                            <Globe className="w-3.5 h-3.5 text-slate-500" /> /u/
                            {p.slug}
                          </p>
                        </div>

                        <p className="text-xs text-slate-400 line-clamp-2">
                          {p.about?.summary || p.personal?.tagline}
                        </p>

                        <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-800/60 flex justify-between">
                          <span>
                            Updated:{" "}
                            {new Date(p.updatedAt).toLocaleDateString()}
                          </span>
                          <span>
                            Sections:{" "}
                            {
                              Object.values(p.sectionVisibility).filter(Boolean)
                                .length
                            }{" "}
                            Active
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 pt-3 border-t border-slate-800">
                        <Link
                          href={`/editor/${p.id}`}
                          className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs rounded-xl flex items-center justify-center gap-1.5 transition"
                        >
                          <Edit3 className="w-3.5 h-3.5" /> Edit
                        </Link>

                        <Link
                          href={`/u/${p.slug}`}
                          target="_blank"
                          className="py-2.5 px-3 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-xl border border-slate-700 flex items-center justify-center gap-1 transition"
                          title="Preview Portfolio"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </Link>

                        <button
                          onClick={() => handleDuplicate(p)}
                          className="py-2.5 px-3 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-xl border border-slate-700 flex items-center justify-center transition"
                          title="Duplicate Portfolio"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => handleDelete(p.id)}
                          className="py-2.5 px-3 bg-rose-950/60 hover:bg-rose-900 text-rose-300 text-xs font-medium rounded-xl border border-rose-800/80 flex items-center justify-center transition"
                          title="Delete Portfolio"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: RECRUITER INBOX */}
          {activeTab === "inbox" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <Inbox className="w-5 h-5 text-rose-400" /> Recruiter &
                    Visitor Inbox
                  </h2>
                  <p className="text-xs text-slate-400">
                    Incoming messages submitted through your portfolio contact
                    forms.
                  </p>
                </div>
              </div>

              {messages.length === 0 ? (
                <div className="p-12 bg-slate-900/60 border border-dashed border-slate-800 rounded-3xl text-center space-y-4 max-w-xl mx-auto">
                  <Mail className="w-12 h-12 text-slate-600 mx-auto" />
                  <div className="space-y-1">
                    <h3 className="text-lg font-bold text-white">
                      No Messages Received Yet
                    </h3>
                    <p className="text-xs text-slate-400">
                      When recruiters or clients send inquiries via your contact
                      form, they will display right here in real time.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                  {/* Message List */}
                  <div className="md:col-span-5 space-y-2">
                    {messages.map((msg) => (
                      <div
                        key={msg.id}
                        onClick={() => handleOpenMessage(msg)}
                        className={`p-4 rounded-2xl border cursor-pointer transition space-y-2 ${
                          selectedMessage?.id === msg.id
                            ? "bg-slate-800 border-cyan-500/50 shadow-md"
                            : msg.read
                              ? "bg-slate-900/60 border-slate-800 hover:bg-slate-900"
                              : "bg-slate-900 border-cyan-900/80 hover:bg-slate-900"
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex items-center gap-2">
                            {!msg.read && (
                              <span className="w-2 h-2 rounded-full bg-cyan-400 flex-shrink-0" />
                            )}
                            <h4 className="text-xs font-bold text-white truncate">
                              {msg.name}
                            </h4>
                          </div>
                          <span className="text-[10px] text-slate-500 font-mono">
                            {new Date(msg.created_at).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-xs font-medium text-slate-300 truncate">
                          {msg.subject || "No Subject"}
                        </p>
                        <p className="text-[11px] text-slate-400 line-clamp-1">
                          {msg.message}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Message Details Preview */}
                  <div className="md:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-6 min-h-[320px] flex flex-col justify-between">
                    {selectedMessage ? (
                      <div className="space-y-6">
                        <div className="flex justify-between items-start pb-4 border-b border-slate-800">
                          <div>
                            <h3 className="text-base font-bold text-white">
                              {selectedMessage.name}
                            </h3>
                            <p className="text-xs text-cyan-400 font-mono">
                              {selectedMessage.email}
                            </p>
                            <p className="text-[11px] text-slate-500 mt-1 flex items-center gap-1">
                              <Clock className="w-3 h-3" /> Submitted on{" "}
                              {new Date(
                                selectedMessage.created_at,
                              ).toLocaleString()}
                            </p>
                          </div>

                          <button
                            onClick={(e) =>
                              handleDeleteMessage(selectedMessage.id, e)
                            }
                            className="p-2 text-rose-400 hover:bg-rose-950/60 hover:border hover:border-rose-800 rounded-xl transition"
                            title="Delete Message"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="space-y-2">
                          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                            Subject
                          </span>
                          <p className="text-sm font-bold text-slate-200">
                            {selectedMessage.subject ||
                              "Portfolio Contact Inquiry"}
                          </p>
                        </div>

                        <div className="space-y-2">
                          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                            Message Content
                          </span>
                          <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl text-xs text-slate-300 leading-relaxed whitespace-pre-wrap font-sans">
                            {selectedMessage.message}
                          </div>
                        </div>

                        <div className="pt-4 border-t border-slate-800 flex gap-3">
                          <a
                            href={`mailto:${selectedMessage.email}?subject=Re: ${encodeURIComponent(selectedMessage.subject || "")}`}
                            className="px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-xs rounded-xl flex items-center gap-2 transition shadow-md"
                          >
                            <Mail className="w-3.5 h-3.5" /> Reply via Email
                          </a>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center my-auto text-center space-y-3 text-slate-500">
                        <Inbox className="w-10 h-10 stroke-1" />
                        <p className="text-xs">
                          Select a message from the left list to read the full
                          inquiry.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: ANALYTICS */}
          {activeTab === "analytics" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-purple-400" /> Portfolio
                    Performance & Analytics
                  </h2>
                  <p className="text-xs text-slate-400">
                    Track portfolio traffic, engagement, and recruiter
                    conversions.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl space-y-2">
                  <span className="text-xs text-slate-400 font-semibold">
                    Total Unique Visitors
                  </span>
                  <div className="text-3xl font-extrabold text-white font-mono">
                    {totalViews}
                  </div>
                  <p className="text-[11px] text-emerald-400 font-medium">
                    ↑ +18% from last week
                  </p>
                </div>

                <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl space-y-2">
                  <span className="text-xs text-slate-400 font-semibold">
                    Recruiter Inquiries
                  </span>
                  <div className="text-3xl font-extrabold text-cyan-400 font-mono">
                    {messages.length}
                  </div>
                  <p className="text-[11px] text-cyan-400 font-medium">
                    Form submission conversion rate ~ 3.4%
                  </p>
                </div>

                <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl space-y-2">
                  <span className="text-xs text-slate-400 font-semibold">
                    Active Portfolios
                  </span>
                  <div className="text-3xl font-extrabold text-emerald-400 font-mono">
                    {portfolios.filter((p) => p.isPublished).length} /{" "}
                    {portfolios.length}
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Ready for recruiter sharing
                  </p>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
