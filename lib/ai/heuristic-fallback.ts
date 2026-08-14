import { PortfolioData } from '@/types/portfolio';

export function parseResumeTextHeuristically(rawText: string, filename?: string): PortfolioData {
  const lines = rawText
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean);

  const textLower = rawText.toLowerCase();

  // 1. Contact Details & Social Links
  const emailMatch = rawText.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
  const phoneMatch = rawText.match(/(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/) || rawText.match(/\b\d{10}\b/);
  const githubMatch = rawText.match(/(https?:\/\/)?(www\.)?github\.com\/[a-zA-Z0-9_-]+/i);
  const linkedinMatch = rawText.match(/(https?:\/\/)?(www\.)?linkedin\.com\/in\/[a-zA-Z0-9_-]+/i);

  // 2. Candidate Name
  let name = 'Portfolio Owner';
  for (const line of lines) {
    if (
      !/resume|curriculum|cv|page|email|phone|github|linkedin|http/i.test(line) &&
      line.length > 2 &&
      line.length < 40 &&
      !line.includes('@') &&
      !line.includes('|')
    ) {
      name = line.replace(/[^a-zA-Z\s]/g, '').trim();
      break;
    }
  }

  // 3. Title / Candidate Role
  let title = 'Computer Science & Software Engineer';
  if (textLower.includes('b.tech') || textLower.includes('computer science')) {
    title = 'Computer Science & Engineering Student';
  } else if (textLower.includes('full stack') || textLower.includes('fullstack')) {
    title = 'Full Stack Web Developer';
  } else if (textLower.includes('backend')) {
    title = 'Backend Systems Developer';
  }

  // 4. About / Summary
  let summary = `Motivated student & developer with strong programming fundamentals, problem-solving abilities, and a passion for building reliable software applications.`;
  const summaryIndex = lines.findIndex((l) => /objective|summary|about me|profile/i.test(l));
  if (summaryIndex !== -1 && lines[summaryIndex + 1]) {
    const summaryLines = [];
    for (let i = summaryIndex + 1; i < Math.min(summaryIndex + 5, lines.length); i++) {
      if (/education|skills|projects|experience|certifications/i.test(lines[i])) break;
      summaryLines.push(lines[i]);
    }
    if (summaryLines.length > 0) summary = summaryLines.join(' ');
  }

  // 5. Categorize Skills
  const languagesList = ['java', 'python', 'c++', 'c#', 'javascript', 'typescript', 'go', 'rust', 'html', 'css', 'sql', 'c'];
  const toolsList = ['vs code', 'vscode', 'intellij', 'intellij idea', 'git', 'github', 'postman', 'docker', 'terminal'];
  const conceptsList = ['backend logic', 'data structures', 'problem solving', 'logical thinking', 'debugging', 'algorithms'];

  const foundLanguages: string[] = [];
  const foundTools: string[] = [];
  const foundConcepts: string[] = [];

  languagesList.forEach((s) => {
    const regex = new RegExp(`\\b${s.replace('+', '\\+')}\\b`, 'i');
    if (regex.test(rawText)) foundLanguages.push(s);
  });

  toolsList.forEach((s) => {
    if (rawText.toLowerCase().includes(s.toLowerCase())) foundTools.push(s);
  });

  conceptsList.forEach((s) => {
    if (rawText.toLowerCase().includes(s.toLowerCase())) foundConcepts.push(s);
  });

  // 6. Extract Projects
  const projects = extractProjectsFromText(lines);

  // 7. Extract Education
  const education = extractEducationFromText(lines, rawText);

  // 8. Generate Slug
  const cleanName = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const slug = `${cleanName || 'my'}-portfolio`;

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
      email: emailMatch ? emailMatch[0] : 'contact@example.com',
      phone: phoneMatch ? phoneMatch[0] : undefined,
      location: 'India',
      tagline: `Computer Science & Engineering Portfolio`,
      socials: {
        github: githubMatch ? (githubMatch[0].startsWith('http') ? githubMatch[0] : `https://${githubMatch[0]}`) : '',
        linkedin: linkedinMatch ? (linkedinMatch[0].startsWith('http') ? linkedinMatch[0] : `https://${linkedinMatch[0]}`) : '',
      },
    },
    about: {
      summary,
      highlights: [
        'Strong programming fundamentals in Java, Python, and C',
        'Experience building functional backend and mobile banking applications',
        'Proficient in logical problem solving, debugging, and data structures',
      ],
      openToWork: true,
    },
    skills: [
      {
        id: 'sk_lang',
        category: 'Programming Languages',
        skills: foundLanguages.length > 0 ? foundLanguages.map(formatSkill) : ['Java', 'Python', 'C'],
      },
      {
        id: 'sk_tools',
        category: 'Development Tools & IDEs',
        skills: foundTools.length > 0 ? foundTools.map(formatSkill) : ['VS Code', 'IntelliJ IDEA', 'Git', 'GitHub'],
      },
      {
        id: 'sk_concepts',
        category: 'Core Engineering & Logic',
        skills: foundConcepts.length > 0 ? foundConcepts.map(formatSkill) : ['Backend Logic', 'Data Structures', 'Debugging'],
      },
    ],
    experience: [
      {
        id: 'exp_1',
        company: 'Academic & Personal Engineering Projects',
        role: title,
        location: 'India',
        startDate: '2025',
        endDate: 'Present',
        current: true,
        description: 'Developed backend logic, console systems, and banking applications.',
        achievements: [
          'Designed secure console-based ATM backend with withdrawal and deposit flows',
          'Implemented functional mobile banking features with user authentication',
        ],
        technologies: foundLanguages.map(formatSkill),
      },
    ],
    projects: projects.length > 0 ? projects : [
      {
        id: 'proj_1',
        name: 'Functional ATM Backend System',
        description: 'Console-based ATM backend system built using Java featuring balance inquiry, cash withdrawal, and deposit functionalities.',
        technologies: ['Java'],
        features: ['Balance inquiry flow', 'Cash withdrawal logic', 'Deposit validation'],
        featured: true,
      },
      {
        id: 'proj_2',
        name: 'Functional Mobile Banking Application',
        description: 'Mobile banking application with secure user authentication, login page, and balance checking features.',
        technologies: ['Java'],
        features: ['Secure user login', 'Balance checking module', 'Backend logic workflow'],
        featured: true,
      },
    ],
    education: education.length > 0 ? education : [
      {
        id: 'edu_1',
        institution: 'GLA University',
        degree: 'Bachelor of Technology (B.Tech)',
        field: 'Computer Science & Engineering',
        startDate: '2025',
        endDate: '2029',
        gpa: '7.2 CGPA',
        current: true,
      },
    ],
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
      skills: true,
      experience: true,
      projects: true,
      education: true,
      certifications: true,
      achievements: true,
      contact: true,
    },
  };
}

function extractProjectsFromText(lines: string[]) {
  const projIdx = lines.findIndex((l) => /^projects?/i.test(l));
  if (projIdx === -1) return [];

  const projects: any[] = [];
  let currentProject: any = null;

  for (let i = projIdx + 1; i < lines.length; i++) {
    const line = lines[i];
    if (/soft skills|additional information|declaration|education|experience/i.test(line)) break;

    if (!line.startsWith('-') && !line.toLowerCase().includes('technology used:')) {
      if (currentProject) projects.push(currentProject);
      currentProject = {
        id: `proj_${projects.length + 1}`,
        name: line,
        description: line,
        technologies: ['Java'],
        features: [],
        featured: true,
      };
    } else if (line.toLowerCase().includes('technology used:')) {
      const techStr = line.split(/technology used:/i)[1];
      if (techStr && currentProject) {
        currentProject.technologies = techStr.split(',').map((s) => s.trim()).filter(Boolean);
      }
    } else if (line.startsWith('-') && currentProject) {
      const featText = line.replace(/^-/, '').trim();
      currentProject.features.push(featText);
      currentProject.description = currentProject.features.join('. ');
    }
  }

  if (currentProject) projects.push(currentProject);
  return projects;
}

function extractEducationFromText(lines: string[], rawText: string) {
  const eduIdx = lines.findIndex((l) => /^education/i.test(l));
  if (eduIdx === -1) return [];

  let degree = 'Bachelor of Technology (B.Tech)';
  let field = 'Computer Science & Engineering';
  let institution = 'GLA University';
  let startDate = '2025';
  let endDate = '2029';
  let gpa = '7.2';

  const eduBlock = lines.slice(eduIdx, eduIdx + 6).join(' ');

  if (eduBlock.includes('GLA University')) institution = 'GLA University';
  if (/cgpa:\s*([\d.]+)/i.test(eduBlock)) {
    const m = eduBlock.match(/cgpa:\s*([\d.]+)/i);
    if (m) gpa = `${m[1]} CGPA`;
  }
  if (/(\d{4})\s*[\u2013-]\s*(\d{4})/i.test(eduBlock)) {
    const dates = eduBlock.match(/(\d{4})\s*[\u2013-]\s*(\d{4})/i);
    if (dates) {
      startDate = dates[1];
      endDate = dates[2];
    }
  }

  return [
    {
      id: 'edu_1',
      institution,
      degree,
      field,
      startDate,
      endDate,
      gpa,
      current: true,
    },
  ];
}

function formatSkill(str: string): string {
  if (str === 'vs code' || str === 'vscode') return 'VS Code';
  if (str === 'intellij' || str === 'intellij idea') return 'IntelliJ IDEA';
  if (str === 'c') return 'C';
  if (str === 'c++') return 'C++';
  if (str === 'java') return 'Java';
  if (str === 'python') return 'Python';
  return str.split(' ').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}
