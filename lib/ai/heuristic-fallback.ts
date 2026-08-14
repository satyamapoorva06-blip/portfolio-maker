import { PortfolioData } from '@/types/portfolio';

export function parseResumeTextHeuristically(rawText: string, filename?: string): PortfolioData {
  const lines = rawText
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean);

  // Extract Basic Details via Regex
  const emailMatch = rawText.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
  const phoneMatch = rawText.match(/(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/);
  const githubMatch = rawText.match(/(https?:\/\/)?(www\.)?github\.com\/[a-zA-Z0-9_-]+/i);
  const linkedinMatch = rawText.match(/(https?:\/\/)?(www\.)?linkedin\.com\/in\/[a-zA-Z0-9_-]+/i);

  // Detect Candidate Name (Usually first non-empty line or headline)
  let name = lines[0] || 'Portfolio Owner';
  if (name.toLowerCase().includes('resume') || name.toLowerCase().includes('curriculum')) {
    name = lines[1] || 'Portfolio Owner';
  }

  // Detect Candidate Title
  let title = 'Software Engineer & Technology Professional';
  if (lines.length > 1 && lines[1].length < 60 && !lines[1].includes('@')) {
    title = lines[1];
  }

  // Categorize Skills based on keyword detection
  const textLower = rawText.toLowerCase();
  const languagesList = ['typescript', 'javascript', 'python', 'java', 'c++', 'c#', 'go', 'golang', 'rust', 'html', 'css', 'sql', 'php', 'ruby', 'kotlin', 'swift'];
  const frameworksList = ['react', 'next.js', 'nextjs', 'vue', 'angular', 'tailwind', 'express', 'node.js', 'fastapi', 'django', 'flask', 'spring boot', 'flutter'];
  const cloudList = ['aws', 'google cloud', 'gcp', 'azure', 'docker', 'kubernetes', 'postgresql', 'postgres', 'mongodb', 'supabase', 'redis', 'firebase'];
  const toolsList = ['git', 'github', 'vscode', 'postman', 'jira', 'figma', 'webpack', 'vite', 'linux'];

  const foundLanguages = languagesList.filter((s) => textLower.includes(s));
  const foundFrameworks = frameworksList.filter((s) => textLower.includes(s));
  const foundCloud = cloudList.filter((s) => textLower.includes(s));
  const foundTools = toolsList.filter((s) => textLower.includes(s));

  // Extract Summary / About
  let summary = `Driven software professional passionate about building reliable web systems, scalable architectures, and modern user experiences.`;
  const summaryIndex = lines.findIndex((l) => /summary|objective|about me|profile/i.test(l));
  if (summaryIndex !== -1 && lines[summaryIndex + 1]) {
    summary = lines.slice(summaryIndex + 1, summaryIndex + 4).join(' ');
  }

  // Generate unique slug
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
      tagline: `Welcome to my professional portfolio`,
      socials: {
        github: githubMatch ? (githubMatch[0].startsWith('http') ? githubMatch[0] : `https://${githubMatch[0]}`) : '',
        linkedin: linkedinMatch ? (linkedinMatch[0].startsWith('http') ? linkedinMatch[0] : `https://${linkedinMatch[0]}`) : '',
      },
    },
    about: {
      summary,
      highlights: [
        'Demonstrated expertise in modern software engineering principles',
        'Experience building & deploying web applications',
      ],
      openToWork: true,
    },
    skills: [
      {
        id: 'sk_lang',
        category: 'Programming Languages',
        skills: foundLanguages.length > 0 ? foundLanguages.map(capitalize) : ['TypeScript', 'JavaScript', 'Python', 'SQL'],
      },
      {
        id: 'sk_fw',
        category: 'Frameworks & Frontend',
        skills: foundFrameworks.length > 0 ? foundFrameworks.map(capitalize) : ['React', 'Next.js', 'Tailwind CSS', 'Node.js'],
      },
      {
        id: 'sk_cloud',
        category: 'Databases & Cloud',
        skills: foundCloud.length > 0 ? foundCloud.map(capitalize) : ['PostgreSQL', 'Docker', 'Vercel', 'AWS'],
      },
      {
        id: 'sk_tools',
        category: 'Tools & Ecosystem',
        skills: foundTools.length > 0 ? foundTools.map(capitalize) : ['Git', 'GitHub', 'VS Code'],
      },
    ],
    experience: [
      {
        id: 'exp_1',
        company: 'Technology Solutions Corp',
        role: title || 'Software Engineer',
        location: 'Remote',
        startDate: '2022',
        endDate: 'Present',
        current: true,
        description: 'Developed core features for client projects and internal web applications.',
        achievements: [
          'Improved application load speeds and user interface responsiveness',
          'Collaborated in agile team sprints to deliver software releases on schedule',
        ],
        technologies: foundLanguages.slice(0, 4).map(capitalize),
      },
    ],
    projects: [
      {
        id: 'proj_1',
        name: 'Portfolio Web Application',
        description: 'Full-stack web application designed with modern responsive UI and clean architecture.',
        technologies: ['Next.js', 'React', 'Tailwind CSS', 'TypeScript'],
        features: ['Responsive UI layout', 'Structured component architecture', 'Dynamic visual theme rendering'],
        featured: true,
      },
    ],
    education: [
      {
        id: 'edu_1',
        institution: 'University Degree',
        degree: 'Bachelor of Science / Technology',
        field: 'Computer Science & Software Engineering',
        startDate: '2018',
        endDate: '2022',
        current: false,
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

function capitalize(str: string): string {
  if (str.toLowerCase() === 'next.js' || str.toLowerCase() === 'nextjs') return 'Next.js';
  if (str.toLowerCase() === 'node.js') return 'Node.js';
  if (str.toLowerCase() === 'vue') return 'Vue.js';
  if (str.toLowerCase() === 'aws') return 'AWS';
  if (str.toLowerCase() === 'gcp') return 'GCP';
  if (str.toLowerCase() === 'sql') return 'SQL';
  if (str.toLowerCase() === 'html') return 'HTML5';
  if (str.toLowerCase() === 'css') return 'CSS3';
  return str.charAt(0).toUpperCase() + str.slice(1);
}
