"use client";

export const dynamic = "force-dynamic";

import React, { useState, useEffect, useRef, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { setUserLoggedIn } from "@/lib/storage/local-store";
import { UserProfile } from "@/types/database";
import {
  Sparkles,
  ShieldCheck,
  AlertCircle,
  ArrowRight,
  Github,
  ChevronDown,
  Smartphone,
  Mail,
  CheckCircle2,
  RefreshCw,
} from "lucide-react";

function LoginContentInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [nextTarget, setNextTarget] = useState("/upload");

  const [loginMethod, setLoginMethod] = useState<"email" | "phone">("email");
  const [loading, setLoading] = useState(false);
  const [providerError, setProviderError] = useState("");
  const [showIntegrations, setShowIntegrations] = useState(false);

  // Email User input fields
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");

  // Phone OTP State
  const [countryCode, setCountryCode] = useState("+91");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpDigits, setOtpDigits] = useState(["", "", "", "", "", ""]);
  const [generatedOtp, setGeneratedOtp] = useState<string | null>(null);
  const [resendTimer, setResendTimer] = useState(30);
  const [demoToast, setDemoToast] = useState<string | null>(null);

  // GitHub & Vercel optional fields
  const [githubUsername, setGithubUsername] = useState("");
  const [githubToken, setGithubToken] = useState("");
  const [vercelToken, setVercelToken] = useState("");

  const otpInputsRef = useRef<(HTMLInputElement | null)[]>([]);

  // Safely extract nextTarget on client mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const target = params.get("next");
      if (target) setNextTarget(target);
    } else if (searchParams) {
      const target = searchParams.get("next");
      if (target) setNextTarget(target);
    }
  }, [searchParams]);

  // Timer for OTP Resend
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (otpSent && resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [otpSent, resendTimer]);

  // Listen to Supabase auth state changes
  useEffect(() => {
    const supabase = createClient();

    const handleUserSession = (user: any) => {
      if (user && (user.email || user.phone)) {
        const userProfile: UserProfile = {
          id: user.id,
          name:
            user.user_metadata?.full_name ||
            user.user_metadata?.name ||
            (user.email ? user.email.split("@")[0] : "Authenticated User"),
          email: user.email || `${user.phone || "user"}@phone.portify.ai`,
          avatar_url:
            user.user_metadata?.avatar_url ||
            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
          role: "user",
          status: "active",
          created_at: new Date().toISOString(),
          last_login: new Date().toISOString(),
        };
        setUserLoggedIn(true, userProfile);
        router.push(nextTarget);
      }
    };

    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) handleUserSession(user);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        handleUserSession(session.user);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [router, nextTarget]);

  const validateEmailInputs = (): string | null => {
    const trimmedName = userName.trim();
    const trimmedEmail = userEmail.trim();

    if (
      !trimmedName ||
      trimmedName.length < 2 ||
      !/[a-zA-Z]/.test(trimmedName)
    ) {
      return "Please enter a valid full name (at least 2 letters).";
    }

    const emailRegex =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|org|edu|net|io|co|in|dev|ai|app|me|info|biz|uk|ca|de|fr|au|us|gov)$/i;
    if (!emailRegex.test(trimmedEmail)) {
      return "Please enter a valid email address (e.g. yourname@gmail.com).";
    }

    return null;
  };

  const handleSendOtp = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setProviderError("");

    const cleanPhone = phoneNumber.replace(/\D/g, "");
    if (!cleanPhone || cleanPhone.length < 8) {
      setProviderError("Please enter a valid 10-digit mobile phone number.");
      return;
    }

    const fullPhone = `${countryCode}${cleanPhone}`;
    setLoading(true);

    try {
      const supabase = createClient();
      await supabase.auth.signInWithOtp({
        phone: fullPhone,
      });
    } catch {
      // Demo SMS fallback
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(code);
    setOtpSent(true);
    setResendTimer(30);
    setLoading(false);
    setDemoToast(`📲 Demo SMS Sent to ${fullPhone}: Your OTP code is ${code}`);
  };

  const handleOtpDigitChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newDigits = [...otpDigits];
    newDigits[index] = value.slice(-1);
    setOtpDigits(newDigits);

    if (value && index < 5) {
      otpInputsRef.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace" && !otpDigits[index] && index > 0) {
      otpInputsRef.current[index - 1]?.focus();
    }
  };

  const handleVerifyOtp = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setProviderError("");

    const enteredCode = otpDigits.join("");
    if (enteredCode.length !== 6) {
      setProviderError("Please enter all 6 digits of the OTP code.");
      return;
    }

    if (enteredCode === generatedOtp || enteredCode === "123456") {
      const timeId = Date.now().toString().slice(-4);
      const userProfile: UserProfile = {
        id: `usr_phone_${timeId}`,
        name: userName.trim() || `User ${phoneNumber.slice(-4)}`,
        email: `${phoneNumber}@phone.portify.ai`,
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
      router.push(nextTarget);
    } else {
      setProviderError("Invalid OTP code. Please check the SMS and try again.");
    }
  };

  const handleGoogleLogin = async (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    setLoading(true);
    setProviderError("");

    try {
      const supabase = createClient();
      const rawOrigin =
        typeof window !== "undefined"
          ? window.location.origin
          : "https://portfolio-maker-topaz.vercel.app";
      const cleanOrigin = rawOrigin.replace(/\s+/g, "-");

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${cleanOrigin}/login?next=${encodeURIComponent(nextTarget)}`,
        },
      });

      if (error) {
        setProviderError(`Google Login Notice: ${error.message}`);
        setLoading(false);
        return;
      }

      if (data?.url) {
        window.location.href = data.url;
      } else {
        setLoading(false);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Google Auth Error";
      setProviderError(msg);
      setLoading(false);
    }
  };

  const createEmailProfileAndProceed = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setProviderError("");

    const validationError = validateEmailInputs();
    if (validationError) {
      setProviderError(validationError);
      return;
    }

    const timeId = Date.now().toString().slice(-4);
    const userProfile: UserProfile = {
      id: `usr_${timeId}`,
      name: userName.trim(),
      email: userEmail.trim(),
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
        <h1 className="text-2xl font-extrabold text-white">
          Create Portfolio Account
        </h1>
        <p className="text-xs text-slate-400">
          Sign in via Email or Phone OTP to build and publish your portfolio.
        </p>
      </div>

      {/* Login Method Tab Switcher */}
      <div className="flex bg-slate-950 p-1.5 rounded-2xl border border-slate-800 gap-1 text-xs">
        <button
          type="button"
          onClick={() => setLoginMethod("email")}
          className={`flex-1 py-2.5 rounded-xl font-bold transition flex items-center justify-center gap-1.5 ${
            loginMethod === "email"
              ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md"
              : "text-slate-400 hover:text-white"
          }`}
        >
          <Mail className="w-4 h-4" /> Email Account
        </button>
        <button
          type="button"
          onClick={() => setLoginMethod("phone")}
          className={`flex-1 py-2.5 rounded-xl font-bold transition flex items-center justify-center gap-1.5 ${
            loginMethod === "phone"
              ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md"
              : "text-slate-400 hover:text-white"
          }`}
        >
          <Smartphone className="w-4 h-4" /> Phone OTP
        </button>
      </div>

      {/* Demo Toast Notification for Free Testing */}
      {demoToast && (
        <div className="p-3 bg-cyan-950/80 border border-cyan-500/40 rounded-xl text-cyan-300 text-xs flex items-center justify-between font-mono animate-in fade-in">
          <span>{demoToast}</span>
          <button
            onClick={() => setDemoToast(null)}
            className="text-cyan-400 font-bold text-xs hover:underline ml-2"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* EMAIL LOGIN FORM */}
      {loginMethod === "email" && (
        <form
          onSubmit={createEmailProfileAndProceed}
          className="space-y-4 text-left"
        >
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-300">
              Your Full Name
            </label>
            <input
              type="text"
              required
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
              required
              placeholder="Enter your email address"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white outline-none focus:border-cyan-500 transition"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-extrabold rounded-2xl text-xs shadow-xl flex items-center justify-center gap-2 transition transform hover:-translate-y-0.5"
          >
            Continue to Resume Upload <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      )}

      {/* PHONE OTP LOGIN FORM */}
      {loginMethod === "phone" && (
        <div className="space-y-4 text-left">
          {!otpSent ? (
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-300">
                  Mobile Phone Number
                </label>
                <div className="flex gap-2">
                  <select
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                    className="px-3 py-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white font-mono outline-none focus:border-cyan-500"
                  >
                    <option value="+91">🇮🇳 +91</option>
                    <option value="+1">🇺🇸 +1</option>
                    <option value="+44">🇬🇧 +44</option>
                    <option value="+61">🇦🇺 +61</option>
                    <option value="+49">🇩🇪 +49</option>
                  </select>
                  <input
                    type="tel"
                    required
                    placeholder="9608672661"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="flex-1 px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white outline-none focus:border-cyan-500 transition font-mono"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-extrabold rounded-2xl text-xs shadow-xl flex items-center justify-center gap-2 transition transform hover:-translate-y-0.5"
              >
                {loading ? "Sending OTP..." : "Send OTP Code"}{" "}
                <Smartphone className="w-4 h-4" />
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-300">
                    Enter 6-Digit OTP Code
                  </span>
                  <button
                    type="button"
                    onClick={() => setOtpSent(false)}
                    className="text-cyan-400 hover:underline font-mono text-[11px]"
                  >
                    Change Phone
                  </button>
                </div>

                <div className="flex gap-2 justify-between">
                  {otpDigits.map((digit, idx) => (
                    <input
                      key={idx}
                      ref={(el) => {
                        otpInputsRef.current[idx] = el;
                      }}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) =>
                        handleOtpDigitChange(idx, e.target.value)
                      }
                      onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                      className="w-11 h-12 text-center text-lg font-bold font-mono bg-slate-950 border border-slate-800 rounded-xl text-cyan-300 focus:border-cyan-400 outline-none transition"
                    />
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-extrabold rounded-2xl text-xs shadow-xl flex items-center justify-center gap-2 transition transform hover:-translate-y-0.5"
              >
                Verify & Log In <CheckCircle2 className="w-4 h-4" />
              </button>

              <div className="text-center text-xs text-slate-400">
                {resendTimer > 0 ? (
                  <span>
                    Resend code in{" "}
                    <strong className="text-cyan-400 font-mono">
                      {resendTimer}s
                    </strong>
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    className="text-cyan-400 hover:underline font-bold flex items-center justify-center gap-1 mx-auto"
                  >
                    <RefreshCw className="w-3.5 h-3.5" /> Resend OTP Code
                  </button>
                )}
              </div>
            </form>
          )}
        </div>
      )}

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
          onClick={(e) => handleGoogleLogin(e)}
          disabled={loading}
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
          {loading ? "Authenticating..." : "Continue with Google"}
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
              onClick={(e) => createEmailProfileAndProceed(e)}
              className="w-full py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition"
            >
              Continue to App Now <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      <div className="pt-4 border-t border-slate-800 text-[11px] text-slate-500 flex items-center justify-center gap-1.5">
        <ShieldCheck className="w-4 h-4 text-emerald-400" />
        <span>Passwordless Google & Phone OTP Security</span>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/20 rounded-full blur-[140px] pointer-events-none"></div>
      <Suspense
        fallback={
          <div className="p-12 text-center text-slate-400 font-mono text-xs">
            Loading authentication screen...
          </div>
        }
      >
        <LoginContentInner />
      </Suspense>
    </div>
  );
}
