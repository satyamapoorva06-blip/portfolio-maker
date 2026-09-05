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

  // 2. Candidate Name Extraction
  let name = '';
  for (const line of lines) {
    if (
      !/resume|curriculum|cv|page|email|phone|github|linkedin|http|contact|profile|summary|objective/i.test(line) &&
      line.length > 2 &&
      line.length < 45 &&
      !line.includes('@') &&
      !line.includes('|') &&
      !line.includes(':') &&
      !/\d/.test(line)
    ) {
      name = line.replace(/[^a-zA-Z\s.]/g, '').trim();
      if (name.length > 2 && name.split(' ').length <= 4) break;
    }
  }

  if (!name && filename) {
    name = filename
      .replace(/\.(pdf|docx?|txt|jpg|jpeg|png|webp)$/i, '')
      .replace(/[-_]/g, ' ')
      .replace(/\b(resume|cv|portfolio|profile)\b/gi, '')
      .trim();
  }
  if (!name) name = 'Professional Candidate';

  // 3. Title Extraction
  let title = 'Software & Technology Professional';
  if (textLower.includes('full stack') || textLower.includes('fullstack')) {
    title = 'Full Stack Engineer';
  } else if (textLower.includes('data science') || textLower.includes('data analyst')) {
    title = 'Data Scientist & Analyst';
  } else if (textLower.includes('ai/ml') || textLower.includes('machine learning') || textLower.includes('ai engineer')) {
    title = 'AI & Machine Learning Engineer';
  } else if (textLower.includes('backend') || textLower.includes('java')) {
    title = 'Backend Engineer';
  } else if (textLower.includes('frontend') || textLower.includes('react')) {
    title = 'Frontend Developer';
  } else if (textLower.includes('devops') || textLower.includes('cloud')) {
    title = 'DevOps & Cloud Engineer';
  } else if (textLower.includes('cyber') || textLower.includes('security')) {
    title = 'Cybersecurity Specialist';
  } else if (textLower.includes('computer science') || textLower.includes('b.tech') || textLower.includes('btech')) {
    title = 'Computer Science & Software Engineer';
  }

  // 4. About & Summary Extraction
  let summary = '';
  const summaryIndex = lines.findIndex((l) =>
    /^(summary|professional summary|about|about me|objective|career objective|profile)$/i.test(l)
  );
  if (summaryIndex !== -1) {
    const summaryLines: string[] = [];
    for (let i = summaryIndex + 1; i < Math.min(summaryIndex + 7, lines.length); i++) {
      if (/^(education|skills|projects|experience|work history|certifications|achievements)/i.test(lines[i])) break;
      summaryLines.push(lines[i]);
    }
    if (summaryLines.length > 0) summary = summaryLines.join(' ');
  }

  if (!summary) {
    summary = `${name} is an experienced ${title} with a proven track record in technical problem-solving, clean code development, and building scalable solutions.`;
  }

  // 5. Dynamic Skills Extraction
  const skillsList = extractSkillsFromResume(lines, rawText);

  // 6. Dynamic Projects Extraction
  const projects = extractProjectsFromText(lines);

  // 7. Dynamic Education Extraction
  const education = extractEducationFromText(lines);

  // 8. Dynamic Work Experience Extraction
  const experience = extractExperienceFromText(lines);

  // 9. Extract Dynamic Highlights
  const highlights: string[] = [];
  projects.slice(0, 2).forEach((p) => {
    if (p.name && p.description) highlights.push(`Developed ${p.name}: ${p.description.slice(0, 90)}...`);
  });
  experience.slice(0, 2).forEach((e) => {
    if (e.role && e.company) highlights.push(`Worked as ${e.role} at ${e.company}`);
  });
  if (highlights.length === 0) {
    highlights.push(
      `Specialized in ${skillsList[0]?.skills.slice(0, 3).join(', ') || title}`,
      `Delivered software projects and technical solutions`
    );
  }

  const cleanSlug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const slug = `${cleanSlug || 'candidate'}-portfolio`;

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
      location: 'Location available on request',
      tagline: `${title} Portfolio`,
      socials: {
        github: githubMatch ? (githubMatch[0].startsWith('http') ? githubMatch[0] : `https://${githubMatch[0]}`) : '',
        linkedin: linkedinMatch ? (linkedinMatch[0].startsWith('http') ? linkedinMatch[0] : `https://${linkedinMatch[0]}`) : '',
      },
    },
    about: {
      summary,
      highlights,
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
  const categories: Array<{ id: string; category: string; skills: string[] }> = [];

  // Find explicit Skills section lines
  const skillSectionIdx = lines.findIndex((l) =>
    /^(skills|technical skills|skills & tools|technologies|core competencies|skills and frameworks)$/i.test(l)
  );

  const directSkills: string[] = [];

  if (skillSectionIdx !== -1) {
    for (let i = skillSectionIdx + 1; i < lines.length; i++) {
      const line = lines[i];
      if (/^(projects|experience|work history|education|certifications|achievements|declaration)/i.test(line)) break;
      const parts = line.split(/[:•,|-]/).map((s) => s.trim()).filter((s) => s.length > 1 && s.length < 35);
      parts.forEach((p) => {
        if (!/languages|frameworks|tools|databases|libraries|technologies/i.test(p)) {
          directSkills.push(p);
        }
      });
    }
  }

  // Expanded skill keywords dictionary
  const knownSkills = [
    'JavaScript', 'TypeScript', 'Python', 'Java', 'C++', 'C#', 'C', 'Go', 'Rust', 'PHP', 'Ruby', 'Kotlin', 'Swift', 'Dart', 'R', 'SQL', 'HTML', 'CSS',
    'React', 'Next.js', 'Node.js', 'Express', 'Vue.js', 'Angular', 'Svelte', 'Tailwind CSS', 'Bootstrap', 'Flutter', 'Spring Boot', 'Django', 'Flask', 'FastAPI',
    'PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'Firebase', 'Supabase', 'SQLite', 'Oracle',
    'Git', 'GitHub', 'GitLab', 'Docker', 'Kubernetes', 'AWS', 'GCP', 'Azure', 'Linux', 'Vercel', 'Postman', 'VS Code',
    'PyTorch', 'TensorFlow', 'Scikit-learn', 'OpenCV', 'Pandas', 'NumPy', 'Figma', 'Rest API', 'GraphQL', 'Microservices'
  ];

  const matchedSkills: string[] = [];
  knownSkills.forEach((sk) => {
    const regex = new RegExp(`\\b${sk.replace('+', '\\+').replace('.', '\\.')}\\b`, 'i');
    if (regex.test(rawText)) {
      matchedSkills.push(sk);
    }
  });

  const allFound = Array.from(new Set([...directSkills, ...matchedSkills]));

  if (allFound.length > 0) {
    const langs = allFound.filter((s) => /java|python|c\+\+|c#|javascript|typescript|go|rust|html|css|sql|php|ruby|kotlin|swift|dart|r\b/i.test(s));
    const frameworks = allFound.filter((s) => /react|next|node|express|vue|angular|svelte|tailwind|bootstrap|flutter|spring|django|flask|fastapi|pytorch|tensorflow|pandas|numpy/i.test(s));
    const tools = allFound.filter((s) => !langs.includes(s) && !frameworks.includes(s));

    if (langs.length > 0) categories.push({ id: 'sk_1', category: 'Languages & Core Technologies', skills: langs });
    if (frameworks.length > 0) categories.push({ id: 'sk_2', category: 'Frameworks & Libraries', skills: frameworks });
    if (tools.length > 0) categories.push({ id: 'sk_3', category: 'Tools, Databases & Infrastructure', skills: tools });
  }

  return categories.length > 0
    ? categories
    : [{ id: 'sk_default', category: 'Technical Stack', skills: ['Software Development', 'Problem Solving', 'Git'] }];
}

function extractProjectsFromText(lines: string[]) {
  const projIdx = lines.findIndex((l) =>
    /^(projects|featured projects|key projects|academic projects|technical projects|personal projects)$/i.test(l)
  );
  if (projIdx === -1) return [];

  const projects: any[] = [];
  let currentProject: any = null;

  for (let i = projIdx + 1; i < lines.length; i++) {
    const line = lines[i];
    if (/^(education|experience|work history|skills|certifications|declaration|achievements)/i.test(line)) break;

    if (!line.startsWith('-') && !line.startsWith('•') && line.length > 2 && line.length < 60 && !line.toLowerCase().includes('tech stack')) {
      if (currentProject) projects.push(currentProject);
      currentProject = {
        id: `proj_${projects.length + 1}`,
        name: line,
        description: line,
        technologies: [],
        features: [],
        featured: true,
      };
    } else if (currentProject && (line.startsWith('-') || line.startsWith('•'))) {
      const featText = line.replace(/^[-•]/, '').trim();
      if (featText) {
        currentProject.features.push(featText);
        currentProject.description = currentProject.features.join('. ');
      }
    } else if (currentProject && (line.toLowerCase().includes('tech:') || line.toLowerCase().includes('technologies:'))) {
      const techPart = line.split(/tech:|technologies:/i)[1];
      if (techPart) {
        currentProject.technologies = techPart.split(/[,|]/).map((t) => t.trim()).filter(Boolean);
      }
    }
  }

  if (currentProject) projects.push(currentProject);
  return projects;
}

function extractEducationFromText(lines: string[]) {
  const eduIdx = lines.findIndex((l) =>
    /^(education|academic background|academic qualifications|educational qualifications)$/i.test(l)
  );
  if (eduIdx === -1) return [];

  const education: any[] = [];
  let currentEdu: any = null;

  for (let i = eduIdx + 1; i < Math.min(eduIdx + 15, lines.length); i++) {
    const line = lines[i];
    if (/^(projects|experience|skills|certifications|work history|achievements)/i.test(line)) break;

    if (/bachelor|b\.tech|btech|master|m\.tech|degree|university|college|institute|school|b\.e|b\.sc|m\.sc/i.test(line)) {
      if (currentEdu) education.push(currentEdu);

      const yearMatch = line.match(/\b(20\d{2}|19\d{2})\b/g);
      currentEdu = {
        id: `edu_${education.length + 1}`,
        institution: line,
        degree: line,
        field: line.includes('Computer') ? 'Computer Science & Engineering' : 'Higher Education',
        startDate: yearMatch && yearMatch[0] ? yearMatch[0] : 'N/A',
        endDate: yearMatch && yearMatch[1] ? yearMatch[1] : 'Present',
        gpa: '',
        current: !yearMatch || !yearMatch[1],
      };
    } else if (currentEdu && /cgpa|gpa|score|percentage|grade/i.test(line)) {
      currentEdu.gpa = line;
    }
  }

  if (currentEdu) education.push(currentEdu);
  return education;
}

function extractExperienceFromText(lines: string[]) {
  const expIdx = lines.findIndex((l) =>
    /^(experience|work history|employment|professional experience|work experience|internships)$/i.test(l)
  );
  if (expIdx === -1) return [];

  const experiences: any[] = [];
  let currentExp: any = null;

  for (let i = expIdx + 1; i < lines.length; i++) {
    const line = lines[i];
    if (/^(projects|education|skills|certifications|declaration|achievements)/i.test(line)) break;

    if (!line.startsWith('-') && !line.startsWith('•') && line.length > 3 && line.length < 65) {
      if (currentExp) experiences.push(currentExp);
      const dateMatch = line.match(/\b(20\d{2}|19\d{2}|present|current)\b/gi);
      currentExp = {
        id: `exp_${experiences.length + 1}`,
        company: line,
        role: line,
        location: 'Location not specified',
        startDate: dateMatch && dateMatch[0] ? dateMatch[0] : 'N/A',
        endDate: dateMatch && dateMatch[1] ? dateMatch[1] : 'Present',
        current: !dateMatch || dateMatch.some((d) => /present|current/i.test(d)),
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
