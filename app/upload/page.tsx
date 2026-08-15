'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/landing/Navbar';
import { saveStoredPortfolio, isUserLoggedIn } from '@/lib/storage/local-store';
import { UploadCloud, CheckCircle2, Loader2, AlertCircle, ArrowRight } from 'lucide-react';

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} Bytes`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export default function UploadPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isUserLoggedIn()) {
      router.push('/login?next=/upload');
    }
  }, [router]);

  const [file, setFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [progressStep, setProgressStep] = useState(0);

  const progressSteps = [
    'Reading resume file...',
    'Extracting personal details & contact info...',
    'Categorizing technical skills & domain expertise...',
    'Parsing work experience & key achievements...',
    'Structuring projects & academic education...',
    'Finalizing structured portfolio JSON...',
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const validateAndSetFile = (f: File) => {
    setError('');
    const validExtensions = ['.pdf', '.docx', '.doc'];
    const name = f.name.toLowerCase();
    const isValidExt = validExtensions.some((ext) => name.endsWith(ext));

    if (!isValidExt) {
      setError('Please upload a valid PDF (.pdf) or Word document (.docx).');
      return;
    }

    if (f.size === 0) {
      setError('The selected file appears to be empty (0 bytes). Please select your actual resume file.');
      return;
    }

    if (f.size > 10 * 1024 * 1024) {
      setError('File size exceeds the 10MB maximum limit.');
      return;
    }

    setFile(f);
  };

  const handleAnalyze = async () => {
    if (!file) return;

    setLoading(true);
    setError('');
    setProgressStep(0);

    const interval = setInterval(() => {
      setProgressStep((prev) => {
        if (prev < progressSteps.length - 1) return prev + 1;
        clearInterval(interval);
        return prev;
      });
    }, 600);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/resume/parse', {
        method: 'POST',
        body: formData,
      });

      const json = await res.json();
      clearInterval(interval);

      if (!res.ok) throw new Error(json.error || 'Failed to parse resume');

      const portfolioData = json.data;
      saveStoredPortfolio(portfolioData);
      router.push(`/themes?id=${portfolioData.id}`);
    } catch (err: any) {
      clearInterval(interval);
      setError(err.message || "We couldn't analyze your resume. Please check that your file is a valid PDF or DOCX and try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      <Navbar />

      <main className="max-w-4xl mx-auto px-6 py-16 space-y-12">
        {/* Onboarding Header */}
        <div className="text-center space-y-4">
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold bg-cyan-950 px-3 py-1 rounded-full border border-cyan-800">
            Step 01 of 05 — Upload Resume
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white">Upload Your Resume</h1>
          <p className="text-slate-400 text-base max-w-xl mx-auto">
            Our AI will parse your skills, experience, and projects into a structured portfolio data model.
          </p>
        </div>

        {/* Drag & Drop Card */}
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragActive(true);
          }}
          onDragLeave={() => setDragActive(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`p-12 border-2 border-dashed rounded-3xl text-center space-y-6 cursor-pointer transition duration-300 ${
            dragActive
              ? 'border-cyan-400 bg-cyan-950/30'
              : file
              ? 'border-emerald-500/50 bg-emerald-950/20'
              : 'border-slate-800 bg-slate-900/60 hover:border-slate-700'
          }`}
        >
          <input ref={fileInputRef} type="file" accept=".pdf,.docx,.doc" onChange={handleFileChange} className="hidden" />

          <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-400/20 flex items-center justify-center text-cyan-400 mx-auto">
            <UploadCloud className="w-8 h-8" />
          </div>

          {file ? (
            <div className="space-y-2">
              <span className="inline-flex items-center gap-2 text-emerald-400 font-bold text-base">
                <CheckCircle2 className="w-5 h-5" /> {file.name}
              </span>
              <p className="text-xs text-slate-400 font-mono">{formatFileSize(file.size)} • Ready to analyze</p>
            </div>
          ) : (
            <div className="space-y-2">
              <p className="text-lg font-semibold text-white">Drag & drop your resume here, or <span className="text-cyan-400 underline">browse</span></p>
              <p className="text-xs text-slate-500">Supports PDF or DOCX (1 KB to 10 MB)</p>
            </div>
          )}
        </div>

        {error && (
          <div className="p-4 bg-rose-950/60 border border-rose-800 rounded-xl text-rose-300 text-xs flex items-center gap-3">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* AI Progress Tracker */}
        {loading && (
          <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-4">
            <div className="flex items-center justify-between text-xs text-slate-300">
              <span className="flex items-center gap-2 font-medium">
                <Loader2 className="w-4 h-4 text-cyan-400 animate-spin" />
                {progressSteps[progressStep]}
              </span>
              <span className="font-mono text-cyan-400">{Math.round(((progressStep + 1) / progressSteps.length) * 100)}%</span>
            </div>
            <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
              <div
                className="bg-gradient-to-r from-cyan-500 to-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((progressStep + 1) / progressSteps.length) * 100}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Action Button */}
        <div className="flex justify-center pt-4">
          <button
            onClick={handleAnalyze}
            disabled={!file || loading}
            className="px-10 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:opacity-50 text-white font-bold rounded-2xl text-base shadow-xl shadow-cyan-500/25 flex items-center gap-3 transition transform hover:-translate-y-0.5"
          >
            {loading ? 'Analyzing Resume...' : 'Analyze Resume'} <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </main>
    </div>
  );
}
