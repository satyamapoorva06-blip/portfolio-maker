'use client';

import React, { useState } from 'react';
import { PortfolioData, PersonalInfo, AboutInfo, SkillCategory, ExperienceItem, ProjectItem, EducationItem } from '@/types/portfolio';
import StyleCustomizer from './StyleCustomizer';
import AiAssistant from './AiAssistant';
import { User, FileText, Cpu, Briefcase, FolderGit2, GraduationCap, Palette, Eye, Plus, Trash2, ArrowUp, ArrowDown, Sparkles, Wand2 } from 'lucide-react';

interface EditorTabsProps {
  data: PortfolioData;
  onChange: (updated: PortfolioData) => void;
}

export default function EditorTabs({ data, onChange }: EditorTabsProps) {
  const [activeTab, setActiveTab] = useState<'profile' | 'about' | 'skills' | 'experience' | 'projects' | 'education' | 'style' | 'visibility'>('profile');
  const [aiModalState, setAiModalState] = useState<{ open: boolean; sectionName: string; currentContent: string; onApply: (improved: string) => void }>({
    open: false,
    sectionName: '',
    currentContent: '',
    onApply: () => {},
  });

  const openAiModal = (sectionName: string, currentContent: string, onApply: (improved: string) => void) => {
    setAiModalState({ open: true, sectionName, currentContent, onApply });
  };

  return (
    <div className="flex flex-col h-full bg-slate-950 text-slate-100 border-r border-slate-800">
      {/* Top Tab Bar */}
      <div className="flex overflow-x-auto bg-slate-900/80 border-b border-slate-800 p-2 gap-1 shrink-0 scrollbar-none">
        {[
          { id: 'profile', label: 'Profile', icon: User },
          { id: 'about', label: 'About', icon: FileText },
          { id: 'skills', label: 'Skills', icon: Cpu },
          { id: 'experience', label: 'Experience', icon: Briefcase },
          { id: 'projects', label: 'Projects', icon: FolderGit2 },
          { id: 'education', label: 'Education', icon: GraduationCap },
          { id: 'style', label: 'Style', icon: Palette },
          { id: 'visibility', label: 'Visibility', icon: Eye },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition whitespace-nowrap ${
                isActive ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Main Tab Content Panel */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Tab 1: Profile */}
        {activeTab === 'profile' && (
          <div className="space-y-4">
            <h3 className="font-bold text-sm text-slate-200">Personal Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-slate-400">Full Name</label>
                <input
                  type="text"
                  value={data.personal.name}
                  onChange={(e) => onChange({ ...data, personal: { ...data.personal, name: e.target.value } })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-sm text-slate-100 mt-1 focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-xs text-slate-400">Professional Title</label>
                <input
                  type="text"
                  value={data.personal.title}
                  onChange={(e) => onChange({ ...data, personal: { ...data.personal, title: e.target.value } })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-sm text-slate-100 mt-1 focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-xs text-slate-400">Email Address</label>
                <input
                  type="email"
                  value={data.personal.email}
                  onChange={(e) => onChange({ ...data, personal: { ...data.personal, email: e.target.value } })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-sm text-slate-100 mt-1 focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-xs text-slate-400">Location</label>
                <input
                  type="text"
                  value={data.personal.location || ''}
                  onChange={(e) => onChange({ ...data, personal: { ...data.personal, location: e.target.value } })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-sm text-slate-100 mt-1 focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="text-xs text-slate-400">Profile Image / Avatar URL</label>
                <input
                  type="text"
                  value={data.personal.avatarUrl || ''}
                  onChange={(e) => onChange({ ...data, personal: { ...data.personal, avatarUrl: e.target.value } })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-sm text-slate-100 mt-1 focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <h4 className="font-semibold text-xs text-slate-400 pt-4 border-t border-slate-800">Social Links</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-slate-400">GitHub URL</label>
                <input
                  type="text"
                  value={data.personal.socials.github || ''}
                  onChange={(e) => onChange({ ...data, personal: { ...data.personal, socials: { ...data.personal.socials, github: e.target.value } } })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-sm text-slate-100 mt-1 focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-xs text-slate-400">LinkedIn URL</label>
                <input
                  type="text"
                  value={data.personal.socials.linkedin || ''}
                  onChange={(e) => onChange({ ...data, personal: { ...data.personal, socials: { ...data.personal.socials, linkedin: e.target.value } } })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-sm text-slate-100 mt-1 focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: About */}
        {activeTab === 'about' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-sm text-slate-200">About & Bio Summary</h3>
              <button
                onClick={() =>
                  openAiModal('About Summary', data.about.summary, (improved) =>
                    onChange({ ...data, about: { ...data.about, summary: improved } })
                  )
                }
                className="px-3 py-1 bg-cyan-600/20 hover:bg-cyan-600/30 text-cyan-300 rounded-lg border border-cyan-500/30 text-xs flex items-center gap-1.5 transition"
              >
                <Sparkles className="w-3.5 h-3.5" /> ✨ AI Improve
              </button>
            </div>
            <textarea
              rows={5}
              value={data.about.summary}
              onChange={(e) => onChange({ ...data, about: { ...data.about, summary: e.target.value } })}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-sm text-slate-100 focus:border-blue-500 focus:outline-none leading-relaxed"
            />
          </div>
        )}

        {/* Tab 3: Skills */}
        {activeTab === 'skills' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-sm text-slate-200">Skills Categories</h3>
              <button
                onClick={() => {
                  const newCat: SkillCategory = { id: `sk_${Date.now()}`, category: 'New Category', skills: ['Skill 1'] };
                  onChange({ ...data, skills: [...data.skills, newCat] });
                }}
                className="px-3 py-1 bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium rounded-lg flex items-center gap-1 transition"
              >
                <Plus className="w-3.5 h-3.5" /> Add Category
              </button>
            </div>

            {data.skills.map((cat, idx) => (
              <div key={cat.id} className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-3">
                <div className="flex justify-between items-center">
                  <input
                    type="text"
                    value={cat.category}
                    onChange={(e) => {
                      const updated = [...data.skills];
                      updated[idx].category = e.target.value;
                      onChange({ ...data, skills: updated });
                    }}
                    className="bg-slate-950 border border-slate-800 rounded px-2.5 py-1 text-sm font-semibold text-cyan-300"
                  />
                  <button
                    onClick={() => {
                      const filtered = data.skills.filter((_, i) => i !== idx);
                      onChange({ ...data, skills: filtered });
                    }}
                    className="text-rose-400 hover:text-rose-300 p-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div>
                  <label className="text-xs text-slate-400">Skills (Comma separated)</label>
                  <input
                    type="text"
                    value={cat.skills.join(', ')}
                    onChange={(e) => {
                      const updated = [...data.skills];
                      updated[idx].skills = e.target.value.split(',').map((s) => s.trim()).filter(Boolean);
                      onChange({ ...data, skills: updated });
                    }}
                    className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-xs text-slate-200 mt-1"
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 4: Experience */}
        {activeTab === 'experience' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-sm text-slate-200">Work Experience</h3>
              <button
                onClick={() => {
                  const newExp: ExperienceItem = {
                    id: `exp_${Date.now()}`,
                    company: 'Company Name',
                    role: 'Software Engineer',
                    startDate: '2023',
                    endDate: 'Present',
                    current: true,
                    description: 'Described key role responsibilities and achievements.',
                  };
                  onChange({ ...data, experience: [newExp, ...data.experience] });
                }}
                className="px-3 py-1 bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium rounded-lg flex items-center gap-1 transition"
              >
                <Plus className="w-3.5 h-3.5" /> Add Experience
              </button>
            </div>

            {data.experience.map((exp, idx) => (
              <div key={exp.id} className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-400">Experience #{idx + 1}</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        openAiModal(`Experience: ${exp.role}`, exp.description, (improved) => {
                          const updated = [...data.experience];
                          updated[idx].description = improved;
                          onChange({ ...data, experience: updated });
                        })
                      }
                      className="px-2 py-1 bg-cyan-950 text-cyan-300 text-xs rounded border border-cyan-800 flex items-center gap-1"
                    >
                      <Sparkles className="w-3 h-3" /> AI
                    </button>
                    <button
                      onClick={() => {
                        const filtered = data.experience.filter((_, i) => i !== idx);
                        onChange({ ...data, experience: filtered });
                      }}
                      className="text-rose-400 hover:text-rose-300 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-slate-400">Role Title</label>
                    <input
                      type="text"
                      value={exp.role}
                      onChange={(e) => {
                        const updated = [...data.experience];
                        updated[idx].role = e.target.value;
                        onChange({ ...data, experience: updated });
                      }}
                      className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-xs text-slate-100"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-400">Company</label>
                    <input
                      type="text"
                      value={exp.company}
                      onChange={(e) => {
                        const updated = [...data.experience];
                        updated[idx].company = e.target.value;
                        onChange({ ...data, experience: updated });
                      }}
                      className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-xs text-slate-100"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs text-slate-400">Description</label>
                  <textarea
                    rows={3}
                    value={exp.description}
                    onChange={(e) => {
                      const updated = [...data.experience];
                      updated[idx].description = e.target.value;
                      onChange({ ...data, experience: updated });
                    }}
                    className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-xs text-slate-100 leading-relaxed"
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 5: Projects */}
        {activeTab === 'projects' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-sm text-slate-200">Projects</h3>
              <button
                onClick={() => {
                  const newProj: ProjectItem = {
                    id: `proj_${Date.now()}`,
                    name: 'New Project',
                    description: 'Project description showcasing skills and impact.',
                    technologies: ['React', 'TypeScript'],
                  };
                  onChange({ ...data, projects: [newProj, ...data.projects] });
                }}
                className="px-3 py-1 bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium rounded-lg flex items-center gap-1 transition"
              >
                <Plus className="w-3.5 h-3.5" /> Add Project
              </button>
            </div>

            {data.projects.map((proj, idx) => (
              <div key={proj.id} className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-400">Project #{idx + 1}</span>
                  <button
                    onClick={() => {
                      const filtered = data.projects.filter((_, i) => i !== idx);
                      onChange({ ...data, projects: filtered });
                    }}
                    className="text-rose-400 p-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div>
                  <label className="text-xs text-slate-400">Project Name</label>
                  <input
                    type="text"
                    value={proj.name}
                    onChange={(e) => {
                      const updated = [...data.projects];
                      updated[idx].name = e.target.value;
                      onChange({ ...data, projects: updated });
                    }}
                    className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-xs text-slate-100"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400">Description</label>
                  <textarea
                    rows={2}
                    value={proj.description}
                    onChange={(e) => {
                      const updated = [...data.projects];
                      updated[idx].description = e.target.value;
                      onChange({ ...data, projects: updated });
                    }}
                    className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-xs text-slate-100"
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 6: Education */}
        {activeTab === 'education' && (
          <div className="space-y-4">
            <h3 className="font-bold text-sm text-slate-200">Education Details</h3>
            {data.education.map((edu, idx) => (
              <div key={edu.id} className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-slate-400">Institution</label>
                    <input
                      type="text"
                      value={edu.institution}
                      onChange={(e) => {
                        const updated = [...data.education];
                        updated[idx].institution = e.target.value;
                        onChange({ ...data, education: updated });
                      }}
                      className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-xs text-slate-100"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-400">Degree & Field</label>
                    <input
                      type="text"
                      value={edu.degree}
                      onChange={(e) => {
                        const updated = [...data.education];
                        updated[idx].degree = e.target.value;
                        onChange({ ...data, education: updated });
                      }}
                      className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-xs text-slate-100"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 7: Style Customizer */}
        {activeTab === 'style' && (
          <StyleCustomizer
            customization={data.customization}
            onChange={(customization) => onChange({ ...data, customization })}
          />
        )}

        {/* Tab 8: Section Visibility */}
        {activeTab === 'visibility' && (
          <div className="space-y-4">
            <h3 className="font-bold text-sm text-slate-200">Toggle Section Visibility</h3>
            <div className="space-y-2">
              {Object.entries(data.sectionVisibility).map(([key, isVisible]) => (
                <div key={key} className="flex justify-between items-center p-3 bg-slate-900 border border-slate-800 rounded-xl">
                  <span className="text-xs capitalize font-medium text-slate-200">{key} Section</span>
                  <button
                    onClick={() =>
                      onChange({
                        ...data,
                        sectionVisibility: { ...data.sectionVisibility, [key]: !isVisible },
                      })
                    }
                    className={`px-3 py-1 rounded-full text-xs font-semibold transition ${
                      isVisible ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {isVisible ? 'Visible' : 'Hidden'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* AI Assistant Drawer Modal */}
      {aiModalState.open && (
        <AiAssistant
          sectionName={aiModalState.sectionName}
          currentContent={aiModalState.currentContent}
          onApply={aiModalState.onApply}
          onClose={() => setAiModalState({ ...aiModalState, open: false })}
        />
      )}
    </div>
  );
}
