import { PortfolioData } from '@/types/portfolio';

export function parseResumeTextHeuristically(rawText: string, filename?: string): PortfolioData {
  const lines = rawText
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean);

  const textLower = rawText.toLowerCase();

  // 1. Contact Details & Social Links (Extracted strictly from resume)
  const emailMatch = rawText.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
  const phoneMatch = rawText.match(/(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/) || rawText.match(/\b\d{10}\b/);
  const githubMatch = rawText.match(/(https?:\/\/)?(www\.)?github\.com\/[a-zA-Z0-9_-]+/i);
  const linkedinMatch = rawText.match(/(https?:\/\/)?(www\.)?linkedin\.com\/in\/[a-zA-Z0-9_-]+/i);

  // 2. Candidate Name (Strict extraction from top of resume)
  let name = '';
  for (const line of lines) {
    if (
      !/resume|curriculum|cv|page|email|phone|github|linkedin|http|contact/i.test(line) &&
      line.length > 2 &&
      line.length < 45 &&
      !line.includes('@') &&
      !line.includes('|') &&
      !line.includes(':')
    ) {
      name = line.replace(/[^a-zA-Z\s.]/g, '').trim();
      if (name.length > 2) break;
    }
  }

  if (!name && filename) {
    name = filename.replace(/\.(pdf|docx?|txt)$/i, '').replace(/[-_]/g, ' ').trim();
  }
  if (!name) name = 'Developer Candidate';

  // 3. Title / Candidate Role (Inferred from resume text or default to Software Engineer)
  let title = 'Software Engineer & Developer';
  if (textLower.includes('b.tech') || textLower.includes('computer science') || textLower.includes('btech')) {
    title = 'Computer Science & Engineering Developer';
  } else if (textLower.includes('full stack') || textLower.includes('fullstack')) {
    title = 'Full Stack Web Developer';
  } else if (textLower.includes('data science') || textLower.includes('data analyst')) {
    title = 'Data Scientist & AI Analyst';
  } else if (textLower.includes('ai/ml') || textLower.includes('machine learning') || textLower.includes('ai engineer')) {
    title = 'AI / Machine Learning Engineer';
  } else if (textLower.includes('backend') || textLower.includes('java')) {
    title = 'Backend Systems Developer';
  } else if (textLower.includes('frontend') || textLower.includes('react')) {
    title = 'Frontend Engineer';
  }

  // 4. About / Summary (Strictly extracted from objective / summary section)
  let summary = '';
  const summaryIndex = lines.findIndex((l) => /objective|summary|about me|profile/i.test(l));
  if (summaryIndex !== -1 && lines[summaryIndex + 1]) {
    const summaryLines = [];
    for (let i = summaryIndex + 1; i < Math.min(summaryIndex + 6, lines.length); i++) {
      if (/education|skills|projects|experience|work|certifications/i.test(lines[i])) break;
      summaryLines.push(lines[i]);
    }
    if (summaryLines.length > 0) summary = summaryLines.join(' ');
  }

  if (!summary) {
    summary = `${name} is a dedicated ${title} focused on building robust applications, solving complex algorithmic problems, and writing clean, scalable code.`;
  }

  // 5. Categorize Skills (Strictly from resume text)
  const skillsList = extractSkillsFromResume(lines, rawText);

  // 6. Extract Projects (Strictly from resume text)
  const projects = extractProjectsFromText(lines);

  // 7. Extract Education (Strictly from resume text)
  const education = extractEducationFromText(lines, rawText);

  // 8. Extract Work Experience (Strictly from resume text)
  const experience = extractExperienceFromText(lines);

  // 9. Generate Slug
  const cleanName = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const slug = `${cleanName || 'candidate'}-portfolio`;

  return {
    id: `port_${Date.now()}`,
    title: `${name} — Professional Portfolio`,
    slug,
    isPublished: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    personal: {
      name,
      title,
      email: emailMatch ? emailMatch[0] : '',
      phone: phoneMatch ? phoneMatch[0] : undefined,
      location: 'Global',
      tagline: `${title} Portfolio`,
      socials: {
        github: githubMatch ? (githubMatch[0].startsWith('http') ? githubMatch[0] : `https://${githubMatch[0]}`) : '',
        linkedin: linkedinMatch ? (linkedinMatch[0].startsWith('http') ? linkedinMatch[0] : `https://${linkedinMatch[0]}`) : '',
      },
    },
    about: {
      summary,
      highlights: [
        `Demonstrated expertise in software engineering and software design`,
        `Proven track record of delivering technical solutions and projects`,
        `Strong analytical problem-solving and algorithmic skills`,
      ],
      openToWork: true,
    },
    skills: skillsList,
    experience: experience.length > 0 ? experience : [],
    projects: projects.length > 0 ? projects : [],
    education: education.length > 0 ? education : [],
    certifications: [],
    achievements: [],
    customization: {
      theme: 'glass',
      primaryColor: '#0c8ee9',
      accentColor: '#8b5cf6',
      fontFamily: 'inter',
      borderRadius: 'lg',
      animationsEnabled: true,
      animationIntensity: 'normal',
    },
    sectionVisibility: {
      about: true,
      skills: skillsList.length > 0,
      experience: experience.length > 0,
      projects: projects.length > 0,
      education: education.length > 0,
      certifications: false,
      achievements: false,
      contact: true,
    },
  };
}

function extractSkillsFromResume(lines: string[], rawText: string) {
  const languagesList = ['java', 'python', 'c++', 'c#', 'javascript', 'typescript', 'go', 'rust', 'html', 'css', 'sql', 'c', 'php', 'ruby', 'kotlin', 'swift'];
  const frameworksList = ['react', 'next.js', 'node.js', 'express', 'spring boot', 'django', 'flask', 'tailwind', 'bootstrap', 'vue', 'angular'];
  const toolsList = ['git', 'github', 'docker', 'kubernetes', 'aws', 'gcp', 'firebase', 'supabase', 'vs code', 'postman', 'mysql', 'postgresql', 'mongodb', 'redis'];

  const foundLanguages: string[] = [];
  const foundFrameworks: string[] = [];
  const foundTools: string[] = [];

  languagesList.forEach((s) => {
    const regex = new RegExp(`\\b${s.replace('+', '\\+')}\\b`, 'i');
    if (regex.test(rawText)) foundLanguages.push(formatSkill(s));
  });

  frameworksList.forEach((s) => {
    if (rawText.toLowerCase().includes(s.toLowerCase())) foundFrameworks.push(formatSkill(s));
  });

  toolsList.forEach((s) => {
    if (rawText.toLowerCase().includes(s.toLowerCase())) foundTools.push(formatSkill(s));
  });

  const categories = [];

  if (foundLanguages.length > 0) {
    categories.push({
      id: 'sk_lang',
      category: 'Languages & Core Stack',
      skills: Array.from(new Set(foundLanguages)),
    });
  }

  if (foundFrameworks.length > 0) {
    categories.push({
      id: 'sk_fw',
      category: 'Frameworks & Libraries',
      skills: Array.from(new Set(foundFrameworks)),
    });
  }

  if (foundTools.length > 0) {
    categories.push({
      id: 'sk_tools',
      category: 'Tools, Databases & Infrastructure',
      skills: Array.from(new Set(foundTools)),
    });
  }

  return categories;
}

function extractProjectsFromText(lines: string[]) {
  const projIdx = lines.findIndex((l) => /^projects?/i.test(l));
  if (projIdx === -1) return [];

  const projects: any[] = [];
  let currentProject: any = null;

  for (let i = projIdx + 1; i < lines.length; i++) {
    const line = lines[i];
    if (/soft skills|additional information|declaration|education|experience|work history|skills/i.test(line)) break;

    if (!line.startsWith('-') && !line.startsWith('•') && !line.toLowerCase().includes('technology used:') && line.length > 3 && line.length < 60) {
      if (currentProject) projects.push(currentProject);
      currentProject = {
        id: `proj_${projects.length + 1}`,
        name: line,
        description: line,
        technologies: [],
        features: [],
        featured: true,
      };
    } else if (line.toLowerCase().includes('technology used:') || line.toLowerCase().includes('tech stack:')) {
      const techStr = line.split(/technology used:|tech stack:/i)[1];
      if (techStr && currentProject) {
        currentProject.technologies = techStr.split(/[,|]/).map((s) => s.trim()).filter(Boolean);
      }
    } else if ((line.startsWith('-') || line.startsWith('•')) && currentProject) {
      const featText = line.replace(/^[-•]/, '').trim();
      if (featText) {
        currentProject.features.push(featText);
        currentProject.description = currentProject.features.join('. ');
      }
    }
  }

  if (currentProject) projects.push(currentProject);
  return projects;
}

function extractEducationFromText(lines: string[], rawText: string) {
  const eduIdx = lines.findIndex((l) => /^education/i.test(l));
  if (eduIdx === -1) return [];

  const education: any[] = [];
  let currentEdu: any = null;

  for (let i = eduIdx + 1; i < Math.min(eduIdx + 12, lines.length); i++) {
    const line = lines[i];
    if (/projects|experience|skills|certifications|work history/i.test(line)) break;

    if (/bachelor|b\.tech|master|m\.tech|bachelor of technology|high school|university|college|degree/i.test(line)) {
      if (currentEdu) education.push(currentEdu);
      currentEdu = {
        id: `edu_${education.length + 1}`,
        institution: line.includes('University') || line.includes('College') ? line : 'University / College',
        degree: line,
        field: line.includes('Computer Science') ? 'Computer Science & Engineering' : 'Engineering / Technology',
        startDate: '2022',
        endDate: '2026',
        gpa: '',
        current: true,
      };
    } else if (currentEdu && /cgpa|gpa|score/i.test(line)) {
      currentEdu.gpa = line;
    } else if (currentEdu && /(\d{4})/.test(line)) {
      const dates = line.match(/\d{4}/g);
      if (dates && dates[0]) currentEdu.startDate = dates[0];
      if (dates && dates[1]) currentEdu.endDate = dates[1];
    }
  }

  if (currentEdu) education.push(currentEdu);
  return education;
}

function extractExperienceFromText(lines: string[]) {
  const expIdx = lines.findIndex((l) => /experience|work history|employment/i.test(l));
  if (expIdx === -1) return [];

  const experiences: any[] = [];
  let currentExp: any = null;

  for (let i = expIdx + 1; i < lines.length; i++) {
    const line = lines[i];
    if (/projects|education|skills|certifications|declaration/i.test(line)) break;

    if (!line.startsWith('-') && !line.startsWith('•') && line.length > 3 && line.length < 50) {
      if (currentExp) experiences.push(currentExp);
      currentExp = {
        id: `exp_${experiences.length + 1}`,
        company: line,
        role: line,
        location: 'Remote / On-site',
        startDate: '2025',
        endDate: 'Present',
        current: true,
        description: line,
        achievements: [],
        technologies: [],
      };
    } else if ((line.startsWith('-') || line.startsWith('•')) && currentExp) {
      const bullet = line.replace(/^[-•]/, '').trim();
      if (bullet) {
        currentExp.achievements.push(bullet);
        currentExp.description = currentExp.achievements.join('. ');
      }
    }
  }

  if (currentExp) experiences.push(currentExp);
  return experiences;
}

function formatSkill(str: string): string {
  if (str === 'vs code' || str === 'vscode') return 'VS Code';
  if (str === 'intellij' || str === 'intellij idea') return 'IntelliJ IDEA';
  if (str === 'c') return 'C';
  if (str === 'c++') return 'C++';
  if (str === 'java') return 'Java';
  if (str === 'python') return 'Python';
  if (str === 'next.js') return 'Next.js';
  if (str === 'node.js') return 'Node.js';
  if (str === 'express') return 'Express.js';
  if (str === 'spring boot') return 'Spring Boot';
  return str.split(' ').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}
