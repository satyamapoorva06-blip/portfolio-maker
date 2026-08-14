'use client';

import React from 'react';
import Link from 'next/link';
import { Palette, ArrowUpRight, Sparkles } from 'lucide-react';

const THEME_LIST = [
  { id: 'kuber-ai-creative', name: '1. Kuber Mehta', tagline: 'AI / Creative Studio', badge: 'AI Creative', gradient: 'from-purple-900 via-pink-950 to-slate-950' },
  { id: 'tvnskm-aiml-fullstack', name: '2. Mohan VNSK', tagline: 'AI/ML + Full Stack', badge: 'AI Matrix', gradient: 'from-cyan-950 via-purple-950 to-black' },
  { id: 'priyanshu-creative', name: '3. Priyanshu Patel', tagline: 'AI/ML + Creative', badge: 'Generative AI', gradient: 'from-[#06070c] to-purple-950' },
  { id: 'kirti-aiml', name: '4. Kirti AI/ML', tagline: 'AI/ML Engineer', badge: 'Lovable Glass', gradient: 'from-blue-950 to-purple-950' },
  { id: 'harsh-aiml-mern', name: '5. Harsh Chaudhary', tagline: 'AIML + MERN', badge: 'Cyberpunk', gradient: 'from-zinc-950 to-red-950' },
  { id: 'hari-aiml', name: '6. Hari Varshney', tagline: 'AI/ML Neural', badge: 'Neural Net', gradient: 'from-[#06070c] to-[#11111a]' },
  { id: 'nishil-cloud', name: '7. Nishil Pathak', tagline: 'AI/ML + Cloud', badge: 'Cloud Architect', gradient: 'from-[#080d1a] to-blue-950' },
  { id: 'prince-ai', name: '8. Prince Khunt', tagline: 'AI Developer', badge: 'Dark Minimal', gradient: 'from-[#050505] to-zinc-900' },
  { id: 'sahil-aiml-student', name: '9. Sahil Bhayre', tagline: 'AI/ML Student', badge: 'Academic', gradient: 'from-[#070b12] to-indigo-950' },
  { id: 'suraj-agentic-ai', name: '10. Suraj Kumar', tagline: 'Agentic AI', badge: 'LLM Agents', gradient: 'from-purple-950 to-cyan-950' },
  { id: 'srikhanth-arvr', name: '11. Srikhanth', tagline: 'AI/ML + AR/VR', badge: 'Spatial 3D', gradient: 'from-[#07050d] to-pink-950' },
  { id: 'abhinav-cv-ml', name: '12. Abhinav Atul', tagline: 'ML + Computer Vision', badge: 'Vision ML', gradient: 'from-[#06070c] to-[#0d0f18]' },
  { id: 'sahil-sahu-ai', name: '13. Sahil Sahu', tagline: 'AI/ML Student', badge: 'Clean Dark', gradient: 'from-slate-950 to-slate-900' },
  { id: 'shreya-datascience', name: '14. Shreya Saxena', tagline: 'AI/ML + Data Science', badge: 'Analytics', gradient: 'from-purple-950 to-slate-950' },
  { id: 'aman-genai', name: '15. Aman Thakur', tagline: 'AI/ML + GenAI', badge: 'RAG Prompt', gradient: 'from-[#06070c] to-[#141724]' },
  { id: 'nikhil-fullstack', name: '16. Nikhil Jangid', tagline: 'AI/ML + Full Stack', badge: 'Full Stack', gradient: 'from-[#0a0a0f] to-cyan-950' },
  { id: 'abhay-cs-ai', name: '17. Abhay Gupta', tagline: 'CS + AI', badge: 'CS Algorithms', gradient: 'from-[#070b12] to-blue-950' },
  { id: 'saad-fullstack', name: '18. Saad Inamdar', tagline: 'Full Stack Web', badge: 'Vibrant Web', gradient: 'from-[#0a0a0f] to-emerald-950' },
  { id: 'prashant-cse-aiml', name: '19. Prashant Srivastava', tagline: 'CSE + AI/ML', badge: 'CSE Research', gradient: 'from-[#070b12] to-indigo-950' },
  { id: 'anmol-creative-sys', name: '20. Anmol Tech', tagline: 'Creative / Systems', badge: 'DevOps Sys', gradient: 'from-[#080d1a] to-[#0f172a]' },
  { id: 'abhishek-beginner', name: '21. Abhishek Rana', tagline: 'CS Learner Student', badge: 'Beginner CS', gradient: 'from-[#070b12] to-slate-900' },
  { id: 'harsh-cs-student', name: '22. Harsh CS', tagline: 'CS Student', badge: 'Minimal CS', gradient: 'from-[#070b12] to-slate-950' },
  { id: 'dheeraj-mern', name: '23. Dheeraj Rawandhe', tagline: 'MERN / Full Stack', badge: 'React Node', gradient: 'from-[#0a0a0f] to-[#11111a]' },
  { id: 'rishav-java-backend', name: '24. Rishav Choudhary', tagline: 'Java Backend', badge: 'Spring Boot', gradient: 'from-[#080d14] to-amber-950' },
  { id: 'adil-java-microservices', name: '25. Adil Iqbal', tagline: 'Java Microservices', badge: 'Enterprise Java', gradient: 'from-[#080d14] to-red-950' },
  { id: 'megha-mern', name: '26. Megha Patel', tagline: 'CS + MERN', badge: 'CS MERN', gradient: 'from-[#0a0a0f] to-[#141724]' },
  { id: 'harsh-backend-ai', name: '27. Harsh Pandey', tagline: 'Backend + AI', badge: 'Python FastAPI', gradient: 'from-[#06070c] to-[#0d0f18]' },
  { id: 'karan-webdev', name: '28. Karan Kumar', tagline: 'Web Developer', badge: 'Web Stack', gradient: 'from-[#0a0a0f] to-slate-900' },
  { id: 'shashank-fullstack', name: '29. Shashank Dwivedi', tagline: 'Full Stack SDE', badge: 'Full Stack', gradient: 'from-[#0a0a0f] to-cyan-950' },
  { id: 'suraj-mern', name: '30. Suraj Sharma', tagline: 'MERN Studio', badge: 'MERN Full', gradient: 'from-[#0a0a0f] to-emerald-950' },
  { id: 'abdulhussain-uiux', name: '31. Abdulhussain Jarif', tagline: 'UI/UX + Web', badge: 'Figma Design', gradient: 'from-black to-zinc-950' },
  { id: 'sakesh-fullstack', name: '32. Sakesh Fullstack', tagline: 'Full Stack Architect', badge: 'Full Stack', gradient: 'from-[#0a0a0f] to-blue-950' },
  { id: 'arun-fullstack', name: '33. Arun Kumar', tagline: 'Personal Portfolio', badge: 'Developer', gradient: 'from-[#0a0a0f] to-slate-900' },
  { id: 'ritik-cybersec', name: '34. Ritik Tiwari', tagline: 'Web + Cybersecurity', badge: 'Cyber Sec', gradient: 'from-[#060a08] to-emerald-950' },
  { id: 'shivam-frontend', name: '35. Shivam Tiwari', tagline: 'Frontend Engineer', badge: 'React CSS', gradient: 'from-[#0a0a0f] to-cyan-950' },
  { id: 'vinay-java-fullstack', name: '36. Vinay Kumar', tagline: 'Java Full Stack', badge: 'Java React', gradient: 'from-[#080d14] to-amber-950' },
  { id: 'subhadeep-fullstack', name: '37. Subhadeep', tagline: 'Full Stack Engineer', badge: 'Full Stack', gradient: 'from-[#0a0a0f] to-slate-950' },
  { id: 'wasif-cs-student', name: '38. Wasif Izar', tagline: 'CS Student Simple', badge: 'Student', gradient: 'from-[#070b12] to-slate-900' },
  { id: 'prince-shah-learning', name: '39. Prince U. Shah', tagline: 'Student Learner', badge: 'Learner', gradient: 'from-[#070b12] to-zinc-900' },
  { id: 'dhanaraj-frontend-ai', name: '40. Dhanaraj S', tagline: 'Frontend + AI', badge: 'Next AI', gradient: 'from-[#06070c] to-cyan-950' },
  { id: 'ayush-iot-creative', name: '41. Ayush Srivastava', tagline: 'IoT + Creative', badge: 'Hardware IoT', gradient: 'from-[#0d0d09] to-amber-950' },
  { id: 'priyank-fullstack', name: '42. Priyank Kaushik', tagline: 'Full Stack', badge: 'Web Engineer', gradient: 'from-[#0a0a0f] to-slate-950' },
  { id: 'aadi-neobrutalist', name: '43. Aditya Sharma (Aadi)', tagline: 'Neo-Brutalist', badge: 'Swiss Poster', gradient: 'from-black to-zinc-900' },
  { id: 'cs-student-collection', name: '44. CS Student Showcase', tagline: 'Multiple Styles', badge: 'CS Collection', gradient: 'from-[#070b12] to-indigo-950' },
  { id: 'emma-bostian-curated', name: '45. Emma Bostian 1,800+', tagline: '⭐ 1,800+ Portfolios', badge: 'Starred Collection', gradient: 'from-[#101010] to-[#1a1a1a]' },
  { id: 'github-topic-student', name: '46. GitHub Student Topic', tagline: 'Student Showcase', badge: 'Open Source', gradient: 'from-[#070b12] to-[#0e1626]' },
  { id: 'sitesplaced-examples', name: '47. SitesPlaced Developer', tagline: 'Software Engineer', badge: 'Curated Examples', gradient: 'from-[#0a0a0f] to-[#11111a]' },
  { id: 'nikola-janjic-2025', name: '48. Nikola Janjic 2025', tagline: '1,000+ Collection 2025', badge: '2025 Edition', gradient: 'from-[#0a0a0f] to-cyan-950' },
  { id: 'gist-inspiration', name: '49. GitHub Gist 1,300+', tagline: '1,300+ Inspiration', badge: 'Gist Collection', gradient: 'from-[#101010] to-[#202020]' },
  { id: 'onehour-digital', name: '50. OneHour Digital', tagline: 'Frontend Creative', badge: 'OneHour Showcase', gradient: 'from-[#050505] to-zinc-950' },
];

export default function ThemeShowcase() {
  return (
    <section id="themes" className="py-24 bg-slate-950 relative">
      <div className="max-w-7xl mx-auto px-6 space-y-16">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-400/20 text-xs font-semibold text-purple-300">
            <Palette className="w-4 h-4 text-purple-400" />
            50 UNIQUE HANDCRAFTED PORTFOLIO THEMES
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
            50 Specialized Developer Portfolio Themes
          </h2>
          <p className="text-slate-400 text-base">
            Every single theme is unique! Crafted specifically for AI/ML, GenAI, MERN, Java Enterprise, Cloud DevOps, IoT, CS Students, and Creative Developers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {THEME_LIST.map((t) => (
            <div
              key={t.id}
              className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-4 flex flex-col justify-between hover:border-cyan-500/40 transition group shadow-xl"
            >
              <div className="space-y-3">
                <div className={`h-28 rounded-2xl bg-gradient-to-tr ${t.gradient} p-3 border border-white/10 flex flex-col justify-between relative overflow-hidden`}>
                  <div className="flex justify-between items-center">
                    <span className="text-[9px] font-bold uppercase tracking-wider bg-black/50 px-2 py-0.5 rounded-full text-white backdrop-blur">
                      {t.badge}
                    </span>
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400 opacity-60" />
                  </div>
                  <div className="text-white font-bold text-sm tracking-tight truncate group-hover:text-cyan-400 transition">
                    {t.name}
                  </div>
                </div>

                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-white truncate">{t.name}</h3>
                  <p className="text-[11px] font-medium text-cyan-400 font-mono truncate">{t.tagline}</p>
                </div>
              </div>

              <Link
                href="/upload"
                className="w-full py-2.5 bg-slate-800 hover:bg-cyan-600 text-slate-200 hover:text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition"
              >
                Use Theme <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
