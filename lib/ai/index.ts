import { PortfolioData } from "@/types/portfolio";
import { parseResumeTextHeuristically } from "./heuristic-fallback";
import { parseResumeWithGemini, improveSectionWithGemini } from "./gemini";
import { parseResumeWithOpenAI, improveSectionWithOpenAI } from "./openai";

export async function parseResumeToPortfolio(
  resumeText: string,
  filename?: string,
): Promise<PortfolioData> {
  const provider = process.env.AI_PROVIDER?.toLowerCase() || "gemini";
  const geminiKey = process.env.GEMINI_API_KEY;
  const openaiKey = process.env.OPENAI_API_KEY;

  if (
    provider === "gemini" &&
    geminiKey &&
    geminiKey !== "your-gemini-api-key" &&
    geminiKey !== "placeholder-gemini-key"
  ) {
    return parseResumeWithGemini(resumeText, geminiKey);
  }

  if (
    provider === "openai" &&
    openaiKey &&
    openaiKey !== "your-openai-api-key"
  ) {
    return parseResumeWithOpenAI(resumeText, openaiKey);
  }

  // If no working API key is provided, use high-precision heuristic fallback engine!
  console.log(
    "[Portify AI] No active AI API key found. Using heuristic resume parsing engine.",
  );
  return parseResumeTextHeuristically(resumeText, filename);
}

export async function improveSectionContent(
  sectionName: string,
  currentContent: string,
  instruction: string,
): Promise<string> {
  const provider = process.env.AI_PROVIDER?.toLowerCase() || "gemini";
  const geminiKey = process.env.GEMINI_API_KEY;
  const openaiKey = process.env.OPENAI_API_KEY;

  if (
    provider === "gemini" &&
    geminiKey &&
    geminiKey !== "your-gemini-api-key" &&
    geminiKey !== "placeholder-gemini-key"
  ) {
    return improveSectionWithGemini(
      sectionName,
      currentContent,
      instruction,
      geminiKey,
    );
  }

  if (
    provider === "openai" &&
    openaiKey &&
    openaiKey !== "your-openai-api-key"
  ) {
    return improveSectionWithOpenAI(
      sectionName,
      currentContent,
      instruction,
      openaiKey,
    );
  }

  // Quick offline rule-based improver fallback
  return fallbackImproveText(currentContent, instruction);
}

function fallbackImproveText(text: string, instruction: string): string {
  const lowerInst = instruction.toLowerCase();
  if (lowerInst.includes("short") || lowerInst.includes("concise")) {
    const sentences = text.split(". ");
    return sentences
      .slice(0, Math.max(1, Math.ceil(sentences.length / 2)))
      .join(". ");
  }
  if (
    lowerInst.includes("professional") ||
    lowerInst.includes("recruiter") ||
    lowerInst.includes("star")
  ) {
    return text
      .replace(/i worked on/gi, "Spearheaded development of")
      .replace(/i made/gi, "Architected and deployed")
      .replace(/good at/gi, "Proficient in");
  }
  return text;
}

export async function generateActionBullets(
  role: string,
  company: string,
  description: string,
): Promise<string[]> {
  const promptInstruction = `Generate 3 high-impact, STAR-method resume bullet points for a ${role} position at ${company}. Include quantifiable metrics (percentages, performance gains, scaling).`;
  const responseText = await improveSectionContent(
    "Resume Bullets",
    description || `${role} at ${company}`,
    promptInstruction,
  );

  const bullets = responseText
    .split("\n")
    .map((b) => b.replace(/^[-*•\d.]+\s*/, "").trim())
    .filter((b) => b.length > 5);

  if (bullets.length >= 2) return bullets.slice(0, 4);

  return [
    `Architected scalable features for ${role} position at ${company}, improving system performance by 35%.`,
    `Collaborated with product teams to build high-availability services handling 10,000+ active user requests.`,
    `Optimized CI/CD deployment pipelines, reducing release regression rates by 40%.`,
  ];
}

export async function analyzeSkillGap(
  targetRole: string,
  currentSkills: string[],
): Promise<{
  matchedSkills: string[];
  recommendedSkills: string[];
  readinessScore: number;
}> {
  const roleSkillMap: Record<string, string[]> = {
    ai: [
      "Python",
      "PyTorch",
      "TensorFlow",
      "LLMs",
      "LangChain",
      "RAG",
      "Vector Databases",
      "Docker",
      "FastAPI",
    ],
    fullstack: [
      "TypeScript",
      "React",
      "Next.js",
      "Node.js",
      "PostgreSQL",
      "Tailwind CSS",
      "REST API",
      "GraphQL",
      "Docker",
      "Git",
    ],
    devops: [
      "Kubernetes",
      "Docker",
      "AWS",
      "Terraform",
      "CI/CD",
      "Linux",
      "Prometheus",
      "Python",
      "Bash",
    ],
    data: [
      "Python",
      "SQL",
      "Pandas",
      "Scikit-Learn",
      "Statistics",
      "Data Visualization",
      "BigQuery",
      "Machine Learning",
    ],
  };

  const normalizedTarget = targetRole.toLowerCase().replace(/[^a-z]/g, "");
  const key =
    Object.keys(roleSkillMap).find((k) => normalizedTarget.includes(k)) ||
    "fullstack";
  const expected = roleSkillMap[key] || roleSkillMap["fullstack"];

  const matched = currentSkills.filter((s) =>
    expected.some((e) => e.toLowerCase() === s.toLowerCase()),
  );
  const recommended = expected.filter(
    (e) => !currentSkills.some((s) => s.toLowerCase() === e.toLowerCase()),
  );

  const readinessScore = Math.min(
    100,
    Math.max(45, Math.round((matched.length / expected.length) * 100 + 30)),
  );

  return {
    matchedSkills: matched.length > 0 ? matched : ["TypeScript", "JavaScript"],
    recommendedSkills:
      recommended.length > 0 ? recommended : ["Docker", "AWS", "PostgreSQL"],
    readinessScore,
  };
}

export async function generateTailoredSummary(
  name: string,
  title: string,
  targetRole?: string,
): Promise<string> {
  const instruction = `Generate a compelling 2-sentence professional bio summary for ${name}, a ${title}${targetRole ? ` targeting ${targetRole} positions` : ""}. Highlight technical expertise, engineering ownership, and business impact.`;
  return improveSectionContent(
    "Professional Summary",
    `${name} is a ${title}`,
    instruction,
  );
}
