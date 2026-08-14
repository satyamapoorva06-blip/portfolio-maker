'use client';

import React from 'react';
import { VisualCustomization, ThemeType } from '@/types/portfolio';
import { Palette, Type, Layout, Sparkles, Check } from 'lucide-react';

interface StyleCustomizerProps {
  customization: VisualCustomization;
  onChange: (customization: VisualCustomization) => void;
}

const THEMES: { id: ThemeType; name: string; desc: string }[] = [
  { id: 'kuber-ai-creative', name: '1. Kuber Mehta — AI Creative', desc: 'AI Spatial & Generative Creative Studio' },
  { id: 'tvnskm-aiml-fullstack', name: '2. Mohan VNSK — AI/ML + Full Stack', desc: 'Neural Network Matrix & Full Stack' },
  { id: 'priyanshu-creative', name: '3. Priyanshu Patel — AI/ML Creative', desc: 'Generative AI & Interactive Visuals' },
  { id: 'kirti-aiml', name: '4. Kirti — AI/ML Engineer', desc: 'Lovable Glass & Deep Learning Models' },
  { id: 'harsh-aiml-mern', name: '5. Harsh Chaudhary — AIML + MERN', desc: 'MERN Stack & AI Cyberpunk' },
  { id: 'hari-aiml', name: '6. Hari Varshney — AI/ML', desc: 'AI Intelligence & Data Models' },
  { id: 'nishil-cloud', name: '7. Nishil Pathak — AI/ML + Cloud', desc: 'AWS/GCP Cloud Architecture & Terraform' },
  { id: 'prince-ai', name: '8. Prince Khunt — AI Developer', desc: 'Dark Minimalist AI Developer' },
  { id: 'sahil-aiml-student', name: '9. Sahil Bhayre — AI/ML Student', desc: 'University AI Student & Research' },
  { id: 'suraj-agentic-ai', name: '10. Suraj Kumar — Agentic AI', desc: 'Autonomous LLM Agents & System Workflows' },
  { id: 'srikhanth-arvr', name: '11. Srikhanth — AI/ML + AR/VR', desc: 'Vision OS Spatial Glass & WebGL 3D' },
  { id: 'abhinav-cv-ml', name: '12. Abhinav Atul — Computer Vision', desc: 'PyTorch, OpenCV & Neural Vision' },
  { id: 'sahil-sahu-ai', name: '13. Sahil Sahu — AI/ML Student', desc: 'Clean Dark AI Student Showcase' },
  { id: 'shreya-datascience', name: '14. Shreya Saxena — Data Science', desc: 'Pandas, Scikit & AI Data Analytics' },
  { id: 'aman-genai', name: '15. Aman Thakur — GenAI', desc: 'LLM Prompt Engineering & RAG Systems' },
  { id: 'nikhil-fullstack', name: '16. Nikhil Jangid — AI + Full Stack', desc: 'React, Node.js & AI Integrations' },
  { id: 'abhay-cs-ai', name: '17. Abhay Gupta — CS + AI', desc: 'Computer Science & AI Algorithms' },
  { id: 'saad-fullstack', name: '18. Saad Inamdar — Full Stack', desc: 'Vibrant Full Stack Web Developer' },
  { id: 'prashant-cse-aiml', name: '19. Prashant Srivastava — CSE + AI', desc: 'CSE Academic & Machine Learning' },
  { id: 'anmol-creative-sys', name: '20. Anmol — Systems Engineer', desc: 'Creative Systems & DevOps' },
  { id: 'abhishek-beginner', name: '21. Abhishek Rana — CS Learner', desc: 'Clean Beginner CS Student' },
  { id: 'harsh-cs-student', name: '22. Harsh — CS Student', desc: 'Minimal CS Student Showcase' },
  { id: 'dheeraj-mern', name: '23. Dheeraj Rawandhe — MERN', desc: 'MongoDB, Express, React, Node' },
  { id: 'rishav-java-backend', name: '24. Rishav Choudhary — Java', desc: 'Spring Boot & Microservices' },
  { id: 'adil-java-microservices', name: '25. Adil Iqbal — Java Microservices', desc: 'Enterprise Java & Database Systems' },
  { id: 'megha-mern', name: '26. Megha Patel — CS + MERN', desc: 'MERN Stack & Computer Science' },
  { id: 'harsh-backend-ai', name: '27. Harsh Pandey — Backend + AI', desc: 'Python, FastAPI & AI Pipelines' },
  { id: 'karan-webdev', name: '28. Karan Kumar — Web Developer', desc: 'Responsive Web Developer' },
  { id: 'shashank-fullstack', name: '29. Shashank Dwivedi — Full Stack', desc: 'Full Stack Software Engineer' },
  { id: 'suraj-mern', name: '30. Suraj Sharma — MERN Studio', desc: 'High-Impact MERN Developer' },
  { id: 'abdulhussain-uiux', name: '31. Abdulhussain Jarif — UI/UX', desc: 'Figma UI/UX & Web Design' },
  { id: 'sakesh-fullstack', name: '32. Sakesh — Full Stack', desc: 'Modern Full Stack Architect' },
  { id: 'arun-fullstack', name: '33. Arun Kumar — Full Stack', desc: 'Personal Developer Portfolio' },
  { id: 'ritik-cybersec', name: '34. Ritik Tiwari — Cybersecurity', desc: 'Penetration Testing & CTF Badges' },
  { id: 'shivam-frontend', name: '35. Shivam Tiwari — Frontend', desc: 'React & Tailwind CSS Specialist' },
  { id: 'vinay-java-fullstack', name: '36. Vinay Kumar — Java Full Stack', desc: 'Java, Spring Boot & React' },
  { id: 'subhadeep-fullstack', name: '37. Subhadeep — Full Stack', desc: 'Clean Full Stack Showcase' },
  { id: 'wasif-cs-student', name: '38. Wasif Izar — Simple CS', desc: 'Minimalist Student Portfolio' },
  { id: 'prince-shah-learning', name: '39. Prince U. Shah — Student', desc: 'Student Learner Portfolio' },
  { id: 'dhanaraj-frontend-ai', name: '40. Dhanaraj S — Frontend + AI', desc: 'Next.js, Tailwind & AI Tools' },
  { id: 'ayush-iot-creative', name: '41. Ayush Srivastava — IoT', desc: 'Circuit Board & Hardware Telemetry' },
  { id: 'priyank-fullstack', name: '42. Priyank Kaushik — Full Stack', desc: 'Full Stack Web Software' },
  { id: 'aadi-neobrutalist', name: '43. Aditya Sharma (Aadi) — Neo-Brutalist', desc: 'Bold Swiss Neo-Brutalist Poster' },
  { id: 'cs-student-collection', name: '44. CS Student Collection', desc: 'Academic University Coursework & GPA' },
  { id: 'emma-bostian-curated', name: '45. Emma Bostian Curated 1,800+', desc: 'Top Starred Developer Collection' },
  { id: 'github-topic-student', name: '46. GitHub Student Topic Showcase', desc: 'Open Source Student Showcase' },
  { id: 'sitesplaced-examples', name: '47. SitesPlaced Developer Examples', desc: 'Curated Software Engineer Showcase' },
  { id: 'nikola-janjic-2025', name: '48. Nikola Janjic 2025 Collection', desc: '1,000+ Developer Portfolio 2025' },
  { id: 'gist-inspiration', name: '49. GitHub Gist 1,300+ Inspiration', desc: 'Curated Gist Developer Showcase' },
  { id: 'onehour-digital', name: '50. OneHour Digital Frontend Showcase', desc: 'High-Converting Frontend Showcase' },
];

const COLOR_PRESETS = [
  { primary: '#0c8ee9', accent: '#8b5cf6', name: 'Ocean Cyan & Violet' },
  { primary: '#e50914', accent: '#dc2626', name: 'Obsidian Red & Crimson' },
  { primary: '#00ff66', accent: '#10b981', name: 'Cyber Matrix Neon Green' },
  { primary: '#facc15', accent: '#f59e0b', name: 'Canary Yellow Poster' },
  { primary: '#8b5cf6', accent: '#f43f5e', name: 'Purple & Rose' },
];

export default function StyleCustomizer({ customization, onChange }: StyleCustomizerProps) {
  return (
    <div className="space-y-8 text-slate-200 text-sm p-4">
      {/* Theme Selector */}
      <div className="space-y-4">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
          <Palette className="w-4 h-4 text-cyan-400" /> Select Portfolio Theme ({THEMES.length} Unique Themes)
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[450px] overflow-y-auto pr-1">
          {THEMES.map((t) => (
            <button
              key={t.id}
              onClick={() => onChange({ ...customization, theme: t.id })}
              className={`p-4 rounded-xl border text-left transition flex flex-col justify-between space-y-2 ${
                customization.theme === t.id
                  ? 'bg-blue-600/20 border-blue-500 text-white shadow-lg'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-white'
              }`}
            >
              <div className="flex justify-between items-center w-full">
                <span className="font-bold text-xs text-slate-100">{t.name}</span>
                {customization.theme === t.id && <Check className="w-4 h-4 text-blue-400 shrink-0" />}
              </div>
              <span className="text-[11px] text-slate-400 leading-normal">{t.desc}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Color Palette Tokens */}
      <div className="space-y-4 pt-4 border-t border-slate-800">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-purple-400" /> Color Accent Presets
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {COLOR_PRESETS.map((cp, idx) => (
            <button
              key={idx}
              onClick={() => onChange({ ...customization, primaryColor: cp.primary, accentColor: cp.accent })}
              className="p-3 bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-xl flex items-center gap-3 transition"
            >
              <div className="flex gap-1.5 shrink-0">
                <span className="w-5 h-5 rounded-full border border-white/20" style={{ backgroundColor: cp.primary }}></span>
                <span className="w-5 h-5 rounded-full border border-white/20" style={{ backgroundColor: cp.accent }}></span>
              </div>
              <span className="text-xs font-medium text-slate-300">{cp.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Typography */}
      <div className="space-y-4 pt-4 border-t border-slate-800">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
          <Type className="w-4 h-4 text-emerald-400" /> Font Style
        </h3>
        <div className="flex gap-3">
          {[
            { id: 'inter', label: 'Inter (Sans)' },
            { id: 'jetbrains', label: 'JetBrains (Mono)' },
            { id: 'playfair', label: 'Playfair (Serif)' },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => onChange({ ...customization, fontFamily: f.id as any })}
              className={`flex-1 py-2.5 px-3 rounded-xl border text-xs font-medium transition ${
                customization.fontFamily === f.id
                  ? 'bg-emerald-600/20 border-emerald-500 text-emerald-300'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
