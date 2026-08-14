'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { isUserLoggedIn } from '@/lib/storage/local-store';
import { Sparkles, ArrowRight, User } from 'lucide-react';

export default function Navbar() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    setLoggedIn(isUserLoggedIn());
  }, []);

  const createTarget = loggedIn ? '/upload' : '/login?next=/upload';

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/80 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="font-extrabold text-xl tracking-tight text-white">
            Portify<span className="text-cyan-400">.ai</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <a href="#features" className="hover:text-cyan-400 transition">Features</a>
          <a href="#how-it-works" className="hover:text-cyan-400 transition">How It Works</a>
          <a href="#themes" className="hover:text-cyan-400 transition">Themes</a>
          <a href="#deployments" className="hover:text-cyan-400 transition">Deployments</a>
          <a href="#faq" className="hover:text-cyan-400 transition">FAQ</a>
        </nav>

        <div className="flex items-center gap-4">
          {loggedIn ? (
            <Link
              href="/dashboard"
              className="text-sm font-medium text-cyan-400 hover:text-cyan-300 px-4 py-2 transition flex items-center gap-1.5"
            >
              <User className="w-4 h-4" /> Dashboard
            </Link>
          ) : (
            <Link
              href="/login"
              className="text-sm font-medium text-slate-300 hover:text-white px-4 py-2 transition"
            >
              Log in
            </Link>
          )}

          <Link
            href={createTarget}
            className="px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold rounded-xl text-sm shadow-lg shadow-cyan-500/25 flex items-center gap-2 transition transform hover:-translate-y-0.5"
          >
            Create My Portfolio <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </header>
  );
}
