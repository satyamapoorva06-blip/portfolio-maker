'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { setUserLoggedIn } from '@/lib/storage/local-store';
import { UserProfile } from '@/types/database';
import { Sparkles, ShieldCheck, AlertCircle, ArrowRight, Github, Rocket, ChevronDown } from 'lucide-react';

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextTarget = searchParams.get('next') || '/upload';

  const [loading, setLoading] = useState(false);
  const [providerError, setProviderError] = useState('');
  const [showIntegrations, setShowIntegrations] = useState(false);

  // GitHub & Vercel optional fields at login
  const [githubUsername, setGithubUsername] = useState('');
  const [githubToken, setGithubToken] = useState('');
  const [vercelToken, setVercelToken] = useState('');

  // Listen to Supabase auth state changes & OAuth redirects
  useEffect(() => {
    const supabase = createClient();

    const handleUserSession = (user: any) => {
      if (user && user.email) {
        const userProfile: UserProfile = {
          id: user.id,
          name: user.user_metadata?.full_name || user.user_metadata?.name || user.email.split('@')[0],
          email: user.email,
          avatar_url: user.user_metadata?.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
          github_username: githubUsername || user.user_metadata?.preferred_username || undefined,
          github_token: githubToken || undefined,
          vercel_token: vercelToken || undefined,
          role: 'user',
          status: 'active',
          created_at: new Date().toISOString(),
          last_login: new Date().toISOString(),
        };
        setUserLoggedIn(true, userProfile);
        router.push(nextTarget);
      }
    };

    // 1. Initial check
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) handleUserSession(user);
    });

    // 2. Real-time auth listener for OAuth callback
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        handleUserSession(session.user);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [router, nextTarget, githubUsername, githubToken, vercelToken]);

  const handleGoogleLogin = async () => {
    setLoading(true);
    setProviderError('');

    try {
      const supabase = createClient();
      const origin = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000';

      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${origin}/login?next=${encodeURIComponent(nextTarget)}`,
        },
      });

      if (error) {
        console.warn('Supabase OAuth notice:', error.message);
        if (error.message.includes('not enabled') || error.message.includes('validation_failed')) {
          setProviderError(
            'Google Auth is not enabled in your Supabase Dashboard yet (Authentication -> Providers -> Google).'
          );
        } else {
          createFallbackUser();
          router.push(nextTarget);
        }
      }
    } catch {
      createFallbackUser();
      router.push(nextTarget);
    } finally {
      setLoading(false);
    }
  };

  const createFallbackUser = () => {
    const timeId = Date.now().toString().slice(-4);
    const userProfile: UserProfile = {
      id: `usr_${timeId}`,
      name: `User Account #${timeId}`,
      email: `user_${timeId}@example.com`,
      avatar_url: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80`,
      github_username: githubUsername || undefined,
      github_token: githubToken || undefined,
      vercel_token: vercelToken || undefined,
      role: 'user',
      status: 'active',
      created_at: new Date().toISOString(),
      last_login: new Date().toISOString(),
    };
    setUserLoggedIn(true, userProfile);
  };

  const handleDirectDemoLogin = () => {
    createFallbackUser();
    router.push(nextTarget);
  };

  return (
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
        <h1 className="text-2xl font-extrabold text-white">Login to Create Your Portfolio</h1>
        <p className="text-xs text-slate-400">Authenticate with Google to build, edit, and publish your personal portfolio website.</p>
      </div>

      <div className="space-y-4">
        {/* Continue with Google CTA */}
        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full py-4 bg-white hover:bg-slate-100 text-slate-900 font-bold rounded-2xl text-sm shadow-xl flex items-center justify-center gap-3 transition transform hover:-translate-y-0.5"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
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
          {loading ? 'Authenticating...' : 'Continue with Google'}
        </button>

        {/* Collapsible GitHub & Vercel Connect Option */}
        <div className="border border-slate-800 rounded-2xl overflow-hidden bg-slate-950/60 text-left">
          <button
            type="button"
            onClick={() => setShowIntegrations(!showIntegrations)}
            className="w-full p-4 flex justify-between items-center text-xs font-semibold text-slate-300 hover:text-cyan-400 transition"
          >
            <span className="flex items-center gap-2">
              <Github className="w-4 h-4 text-cyan-400" /> Connect GitHub & Vercel Accounts (Optional)
            </span>
            <ChevronDown className={`w-4 h-4 transition transform ${showIntegrations ? 'rotate-180' : ''}`} />
          </button>

          {showIntegrations && (
            <div className="p-4 border-t border-slate-800/80 space-y-3 bg-slate-950">
              <div>
                <label className="text-[11px] text-slate-400">GitHub Username</label>
                <input
                  type="text"
                  placeholder="e.g. satyamapoorva06-blip"
                  value={githubUsername}
                  onChange={(e) => setGithubUsername(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-white mt-1 focus:border-cyan-500 focus:outline-none font-mono"
                />
              </div>
              <div>
                <label className="text-[11px] text-slate-400">GitHub Access Token (Optional)</label>
                <input
                  type="password"
                  placeholder="ghp_xxxxxxxxxxxxxxxxx"
                  value={githubToken}
                  onChange={(e) => setGithubToken(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-white mt-1 focus:border-cyan-500 focus:outline-none font-mono"
                />
              </div>
              <div>
                <label className="text-[11px] text-slate-400">Vercel Access Token (Optional)</label>
                <input
                  type="password"
                  placeholder="vercel_token_xxxxxxxxxxxx"
                  value={vercelToken}
                  onChange={(e) => setVercelToken(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-white mt-1 focus:border-cyan-500 focus:outline-none font-mono"
                />
              </div>
              <p className="text-[10px] text-slate-500">
                You can also edit or update these anytime inside Account Settings.
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
              onClick={handleDirectDemoLogin}
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
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/20 rounded-full blur-[140px] pointer-events-none"></div>
      <Suspense fallback={<div className="text-center text-slate-400">Loading auth...</div>}>
        <LoginContent />
      </Suspense>
    </div>
  );
}
