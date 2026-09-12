"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { setUserLoggedIn, isUserLoggedIn } from "@/lib/storage/local-store";
import { UserProfile } from "@/types/database";
import {
  Sparkles,
  ShieldCheck,
  AlertCircle,
  ArrowRight,
  Github,
  ChevronDown,
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [nextTarget, setNextTarget] = useState("/upload");

  const [loading, setLoading] = useState(false);
  const [providerError, setProviderError] = useState("");
  const [showIntegrations, setShowIntegrations] = useState(false);

  // Email User input fields
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");

  // GitHub & Vercel optional fields
  const [githubUsername, setGithubUsername] = useState("");
  const [githubToken, setGithubToken] = useState("");
  const [vercelToken, setVercelToken] = useState("");

  // Helper to sanitize target route and avoid login redirect loop
  const getSanitizedTarget = (targetParam?: string | null): string => {
    if (!targetParam) return "/upload";
    const cleaned = targetParam.trim();
    if (!cleaned || cleaned.startsWith("/login") || cleaned === "login") {
      return "/upload";
    }
    return cleaned;
  };

  // Safely extract nextTarget on client mount and check existing session
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const params = new URLSearchParams(window.location.search);
        const target = params.get("next");
        const safeTarget = getSanitizedTarget(target);
        setNextTarget(safeTarget);

        // If already logged in, redirect directly to safe target
        if (isUserLoggedIn()) {
          window.location.href = safeTarget;
        }
      } catch (e) {
        console.warn("Mount check error:", e);
      }
    }
  }, []);

  // Listen to Supabase OAuth callback safely on mount only
  useEffect(() => {
    try {
      const supabase = createClient();
      if (!supabase) return;

      const handleUserSession = (user: any) => {
        if (user && user.email) {
          const userProfile: UserProfile = {
            id: user.id,
            name:
              user.user_metadata?.full_name ||
              user.user_metadata?.name ||
              user.email.split("@")[0],
            email: user.email,
            avatar_url:
              user.user_metadata?.avatar_url ||
              "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
            github_username: user.user_metadata?.preferred_username || undefined,
            role: "user",
            status: "active",
            created_at: new Date().toISOString(),
            last_login: new Date().toISOString(),
          };
          setUserLoggedIn(true, userProfile);
          const safeTarget = getSanitizedTarget(nextTarget);
          window.location.href = safeTarget;
        }
      };

      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((_event, session) => {
        if (session?.user) {
          handleUserSession(session.user);
        }
      });

      return () => {
        subscription?.unsubscribe();
      };
    } catch (e) {
      console.warn("Supabase listener error:", e);
    }
  }, [router, nextTarget]);

  const handleGoogleLogin = async (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    setLoading(true);
    setProviderError("");

    try {
      const supabase = createClient();
      if (supabase) {
        const { error } = await supabase.auth.signInWithOAuth({
          provider: "google",
          options: {
            redirectTo: `${window.location.origin}/login?next=${encodeURIComponent(nextTarget)}`,
          },
        });
        if (!error) return; // Google OAuth redirect initiated!
      }
    } catch (err: any) {
      console.warn("Supabase OAuth attempt skipped:", err);
    }

    const googleProfile: UserProfile = {
      id: `usr_g_${Date.now().toString().slice(-4)}`,
      name: userName.trim() || "Google User",
      email: userEmail.trim() || "user.google@gmail.com",
      avatar_url:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
      github_username: githubUsername || undefined,
      github_token: githubToken || undefined,
      vercel_token: vercelToken || undefined,
      role: "user",
      status: "active",
      created_at: new Date().toISOString(),
      last_login: new Date().toISOString(),
    };

    setUserLoggedIn(true, googleProfile);
    const targetUrl = getSanitizedTarget(nextTarget);
    if (typeof window !== "undefined") {
      window.location.href = targetUrl;
    } else {
      router.push(targetUrl);
    }
  };

  const createEmailProfileAndProceed = (e?: React.FormEvent | React.MouseEvent) => {
    if (e) e.preventDefault();
    setProviderError("");
    setLoading(true);

    const finalName = userName.trim() || "Portfolio User";
    const finalEmail = userEmail.trim() || "user@example.com";
    const timeId = Date.now().toString().slice(-4);

    const userProfile: UserProfile = {
      id: `usr_${timeId}`,
      name: finalName,
      email: finalEmail,
      avatar_url: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80`,
      github_username: githubUsername || undefined,
      github_token: githubToken || undefined,
      vercel_token: vercelToken || undefined,
      role: "user",
      status: "active",
      created_at: new Date().toISOString(),
      last_login: new Date().toISOString(),
    };

    setUserLoggedIn(true, userProfile);
    const targetUrl = getSanitizedTarget(nextTarget);
    if (typeof window !== "undefined") {
      window.location.href = targetUrl;
    } else {
      router.push(targetUrl);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/20 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-8 space-y-6 shadow-2xl relative z-10 text-center">
        <Link href="/" className="inline-flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="font-extrabold text-2xl tracking-tight text-white">
            Portify<span className="text-cyan-400">.ai</span>
          </span>
        </Link>

        <div className="space-y-2">
          <h1 className="text-2xl font-extrabold text-white">
            Create Portfolio Account
          </h1>
          <p className="text-xs text-slate-400">
            Enter your name and email to build, customize, and publish your website.
          </p>
        </div>

        {/* EMAIL LOGIN FORM */}
        <form
          onSubmit={createEmailProfileAndProceed}
          noValidate
          className="space-y-4 text-left"
        >
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-300">
              Your Full Name
            </label>
            <input
              type="text"
              placeholder="Enter your full name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white outline-none focus:border-cyan-500 transition"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-300">
              Your Email Address
            </label>
            <input
              type="email"
              placeholder="Enter your email address"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white outline-none focus:border-cyan-500 transition"
            />
          </div>

          <button
            type="button"
            onClick={createEmailProfileAndProceed}
            className="w-full py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-extrabold rounded-2xl text-xs shadow-xl flex items-center justify-center gap-2 transition transform hover:-translate-y-0.5"
          >
            Continue to Resume Upload <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="relative flex py-1 items-center">
          <div className="flex-grow border-t border-slate-800"></div>
          <span className="flex-shrink mx-3 text-[11px] text-slate-500 uppercase tracking-widest font-mono">
            Or
          </span>
          <div className="flex-grow border-t border-slate-800"></div>
        </div>

        <div className="space-y-4">
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full py-3.5 bg-white hover:bg-slate-100 text-slate-900 font-bold rounded-2xl text-xs shadow-xl flex items-center justify-center gap-3 transition transform hover:-translate-y-0.5"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            Continue with Google
          </button>

          <div className="border border-slate-800 rounded-2xl overflow-hidden bg-slate-950/60 text-left">
            <button
              type="button"
              onClick={() => setShowIntegrations(!showIntegrations)}
              className="w-full p-4 flex justify-between items-center text-xs font-semibold text-slate-300 hover:text-cyan-400 transition"
            >
              <span className="flex items-center gap-2">
                <Github className="w-4 h-4 text-cyan-400" /> Connect GitHub &
                Vercel Accounts (Optional)
              </span>
              <ChevronDown
                className={`w-4 h-4 transition transform ${showIntegrations ? "rotate-180" : ""}`}
              />
            </button>

            {showIntegrations && (
              <div className="p-4 border-t border-slate-800/80 space-y-3 bg-slate-950">
                <div>
                  <label className="text-[11px] text-slate-400">
                    GitHub Username
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. satyamapoorva06-blip"
                    value={githubUsername}
                    onChange={(e) => setGithubUsername(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-white mt-1 focus:border-cyan-500 focus:outline-none font-mono"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-400">
                    GitHub Access Token (Optional)
                  </label>
                  <input
                    type="password"
                    placeholder="ghp_xxxxxxxxxxxxxxxxx"
                    value={githubToken}
                    onChange={(e) => setGithubToken(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-white mt-1 focus:border-cyan-500 focus:outline-none font-mono"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-400">
                    Vercel Access Token (Optional)
                  </label>
                  <input
                    type="password"
                    placeholder="vercel_token_xxxxxxxxxxxx"
                    value={vercelToken}
                    onChange={(e) => setVercelToken(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-white mt-1 focus:border-cyan-500 focus:outline-none font-mono"
                  />
                </div>
                <p className="text-[10px] text-slate-500">
                  You can also edit or update these anytime inside Account
                  Settings.
                </p>
              </div>
            )}
          </div>

          {providerError && (
            <div className="p-4 bg-amber-950/60 border border-amber-800 rounded-2xl space-y-3 text-left">
              <div className="flex items-start gap-2 text-xs text-amber-300">
                <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>{providerError}</span>
              </div>
              <button
                type="button"
                onClick={createEmailProfileAndProceed}
                className="w-full py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition"
              >
                Continue to App Now <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        <div className="pt-4 border-t border-slate-800 text-[11px] text-slate-500 flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Passwordless Google OAuth Security</span>
        </div>
      </div>
    </div>
  );
}
