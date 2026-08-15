'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Navbar from '@/components/landing/Navbar';
import ProgressStepper from '@/components/navigation/ProgressStepper';
import { getStoredPortfolio, saveStoredPortfolio } from '@/lib/storage/local-store';
import { PortfolioData } from '@/types/portfolio';
import { Sparkles, CheckCircle2, User, Code2, Briefcase, GraduationCap, ArrowRight, ArrowLeft, Save, Plus, Trash2 } from 'lucide-react';

export default function ParseReviewPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  const [data, setData] = useState<PortfolioData | null>(null);
  const [activeTab, setActiveTab] = useState<'personal' | 'skills' | 'projects' | 'experience' | 'education'>('personal');
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    const p = getStoredPortfolio(id || undefined);
    if (p) {
      setData(p);
    } else {
      router.push('/upload');
    }
  }, [id, router]);

  if (!data) return null;

  const handleSave = () => {
    saveStoredPortfolio(data);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleProceed = () => {
    saveStoredPortfolio(data);
    router.push(`/customize?id=${data.id}`);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      <Navbar />
      <ProgressStepper currentStep={2} />

      <main className="max-w-5xl mx-auto px-6 py-12 space-y-10">
        {/* Header Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800 pb-6">
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold bg-emerald-950 px-3 py-1 rounded-full border border-emerald-800 flex items-center gap-1.5 w-fit">
              <CheckCircle2 className="w-3.5 h-3.5" /> Step 2 of 4 — AI Extraction Verification
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Review & Edit Parsed Data</h1>
            <p className="text-slate-400 text-sm font-light">
              Verify your parsed resume info before choosing your portfolio theme.
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleSave}
              className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-bold rounded-xl border border-slate-700 flex items-center gap-1.5 transition"
            >
              <Save className="w-4 h-4 text-emerald-400" /> {savedSuccess ? 'Saved!' : 'Save Changes'}
            </button>
            <button
              onClick={handleProceed}
              className="px-6 py-2.5 bg-[#e50914] hover:bg-[#ff1f2d] text-white text-xs font-extrabold rounded-xl shadow-lg shadow-[#e50914]/25 flex items-center gap-1.5 transition"
            >
              Looks Great! Choose Theme <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tab Selection Navigation */}
        <div className="flex gap-2 border-b border-slate-800 overflow-x-auto scrollbar-none pb-2">
          {[
            { id: 'personal', label: 'Personal & Contact', icon: User },
            { id: 'skills', label: 'Skills & Stack', icon: Code2 },
            { id: 'projects', label: 'Projects', icon: Sparkles },
            { id: 'experience', label: 'Experience', icon: Briefcase },
            { id: 'education', label: 'Education', icon: GraduationCap },
          ].map((tab) => {
            const IconComp = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2.5 rounded-xl text-xs font-mono font-bold flex items-center gap-2 transition shrink-0 ${
                  activeTab === tab.id
                    ? 'bg-[#e50914] text-white shadow-lg'
                    : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                <IconComp className="w-4 h-4" /> {tab.label}
              </button>
            );
          })}
        </div>

        {/* TAB 1: PERSONAL & CONTACT */}
        {activeTab === 'personal' && (
          <div className="p-8 bg-slate-900/90 border border-slate-800 rounded-3xl space-y-6">
            <h3 className="text-sm font-bold font-mono text-cyan-400 uppercase tracking-wider">Personal Profile & Bio</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-300">Full Name</label>
                <input
                  type="text"
                  value={data.personal.name || ''}
                  onChange={(e) => setData({ ...data, personal: { ...data.personal, name: e.target.value } })}
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white outline-none focus:border-[#e50914]"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-300">Professional Title</label>
                <input
                  type="text"
                  value={data.personal.title || ''}
                  onChange={(e) => setData({ ...data, personal: { ...data.personal, title: e.target.value } })}
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white outline-none focus:border-[#e50914]"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-300">Email Address</label>
                <input
                  type="email"
                  value={data.personal.email || ''}
                  onChange={(e) => setData({ ...data, personal: { ...data.personal, email: e.target.value } })}
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white outline-none focus:border-[#e50914]"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-300">Location</label>
                <input
                  type="text"
                  value={data.personal.location || ''}
                  onChange={(e) => setData({ ...data, personal: { ...data.personal, location: e.target.value } })}
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white outline-none focus:border-[#e50914]"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-300">GitHub Profile URL</label>
                <input
                  type="text"
                  value={data.personal.socials?.github || ''}
                  onChange={(e) =>
                    setData({
                      ...data,
                      personal: { ...data.personal, socials: { ...data.personal.socials, github: e.target.value } },
                    })
                  }
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white outline-none focus:border-[#e50914]"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-300">LinkedIn Profile URL</label>
                <input
                  type="text"
                  value={data.personal.socials?.linkedin || ''}
                  onChange={(e) =>
                    setData({
                      ...data,
                      personal: { ...data.personal, socials: { ...data.personal.socials, linkedin: e.target.value } },
                    })
                  }
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white outline-none focus:border-[#e50914]"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300">About Summary & Bio</label>
              <textarea
                rows={4}
                value={data.about.summary || ''}
                onChange={(e) => setData({ ...data, about: { ...data.about, summary: e.target.value } })}
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white outline-none focus:border-[#e50914]"
              />
            </div>
          </div>
        )}

        {/* TAB 2: SKILLS */}
        {activeTab === 'skills' && (
          <div className="p-8 bg-slate-900/90 border border-slate-800 rounded-3xl space-y-6">
            <h3 className="text-sm font-bold font-mono text-cyan-400 uppercase tracking-wider">Technical Skills & Categories</h3>
            <div className="space-y-6">
              {data.skills.map((grp, idx) => (
                <div key={grp.id} className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-3">
                  <div className="flex justify-between items-center">
                    <input
                      type="text"
                      value={grp.category}
                      onChange={(e) => {
                        const newSkills = [...data.skills];
                        newSkills[idx].category = e.target.value;
                        setData({ ...data, skills: newSkills });
                      }}
                      className="px-3 py-1 bg-slate-900 border border-slate-800 rounded-lg text-xs font-bold text-[#e50914]"
                    />
                    <button
                      onClick={() => {
                        const newSkills = data.skills.filter((_, i) => i !== idx);
                        setData({ ...data, skills: newSkills });
                      }}
                      className="p-1.5 text-rose-400 hover:bg-rose-950/50 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] text-slate-400 font-mono">Skills (comma-separated):</label>
                    <input
                      type="text"
                      value={grp.skills.join(', ')}
                      onChange={(e) => {
                        const newSkills = [...data.skills];
                        newSkills[idx].skills = e.target.value.split(',').map((s) => s.trim());
                        setData({ ...data, skills: newSkills });
                      }}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-200 outline-none focus:border-[#e50914]"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: PROJECTS */}
        {activeTab === 'projects' && (
          <div className="p-8 bg-slate-900/90 border border-slate-800 rounded-3xl space-y-6">
            <h3 className="text-sm font-bold font-mono text-cyan-400 uppercase tracking-wider">Projects Showcase</h3>
            <div className="space-y-6">
              {data.projects.map((proj, idx) => (
                <div key={proj.id} className="p-5 bg-slate-950 border border-slate-800 rounded-2xl space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Project Name"
                      value={proj.name}
                      onChange={(e) => {
                        const newProjects = [...data.projects];
                        newProjects[idx].name = e.target.value;
                        setData({ ...data, projects: newProjects });
                      }}
                      className="px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white font-bold"
                    />
                    <input
                      type="text"
                      placeholder="Live URL / Demo Link"
                      value={proj.liveUrl || ''}
                      onChange={(e) => {
                        const newProjects = [...data.projects];
                        newProjects[idx].liveUrl = e.target.value;
                        setData({ ...data, projects: newProjects });
                      }}
                      className="px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-300"
                    />
                  </div>
                  <textarea
                    rows={2}
                    placeholder="Description"
                    value={proj.description}
                    onChange={(e) => {
                      const newProjects = [...data.projects];
                      newProjects[idx].description = e.target.value;
                      setData({ ...data, projects: newProjects });
                    }}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-300"
                  />
                  <input
                    type="text"
                    placeholder="Technologies (comma-separated)"
                    value={proj.technologies.join(', ')}
                    onChange={(e) => {
                      const newProjects = [...data.projects];
                      newProjects[idx].technologies = e.target.value.split(',').map((t) => t.trim());
                      setData({ ...data, projects: newProjects });
                    }}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs font-mono text-cyan-300"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Navigation Action Footer */}
        <div className="flex justify-between items-center pt-4 border-t border-slate-800">
          <button
            onClick={() => router.push('/upload')}
            className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-bold rounded-xl border border-slate-800 flex items-center gap-2 transition"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Upload
          </button>
          <button
            onClick={handleProceed}
            className="px-8 py-3.5 bg-[#e50914] hover:bg-[#ff1f2d] text-white text-xs font-extrabold rounded-2xl shadow-xl shadow-[#e50914]/25 flex items-center gap-2 transition transform hover:-translate-y-0.5"
          >
            Looks Great! Choose Theme <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </main>
    </div>
  );
}
