import { PortfolioData } from '@/types/portfolio';
import { parseResumeTextHeuristically } from './heuristic-fallback';
import { parseResumeWithGemini, improveSectionWithGemini } from './gemini';
import { parseResumeWithOpenAI, improveSectionWithOpenAI } from './openai';

export async function parseResumeToPortfolio(resumeText: string, filename?: string): Promise<PortfolioData> {
  const provider = process.env.AI_PROVIDER?.toLowerCase() || 'gemini';
  const geminiKey = process.env.GEMINI_API_KEY;
  const openaiKey = process.env.OPENAI_API_KEY;

  if (provider === 'gemini' && geminiKey && geminiKey !== 'your-gemini-api-key' && geminiKey !== 'placeholder-gemini-key') {
    return parseResumeWithGemini(resumeText, geminiKey);
  }

  if (provider === 'openai' && openaiKey && openaiKey !== 'your-openai-api-key') {
    return parseResumeWithOpenAI(resumeText, openaiKey);
  }

  // If no working API key is provided, use high-precision heuristic fallback engine!
  console.log('[Portify AI] No active AI API key found. Using heuristic resume parsing engine.');
  return parseResumeTextHeuristically(resumeText, filename);
}

export async function improveSectionContent(
  sectionName: string,
  currentContent: string,
  instruction: string
): Promise<string> {
  const provider = process.env.AI_PROVIDER?.toLowerCase() || 'gemini';
  const geminiKey = process.env.GEMINI_API_KEY;
  const openaiKey = process.env.OPENAI_API_KEY;

  if (provider === 'gemini' && geminiKey && geminiKey !== 'your-gemini-api-key' && geminiKey !== 'placeholder-gemini-key') {
    return improveSectionWithGemini(sectionName, currentContent, instruction, geminiKey);
  }

  if (provider === 'openai' && openaiKey && openaiKey !== 'your-openai-api-key') {
    return improveSectionWithOpenAI(sectionName, currentContent, instruction, openaiKey);
  }

  // Quick offline rule-based improver fallback
  return fallbackImproveText(currentContent, instruction);
}

function fallbackImproveText(text: string, instruction: string): string {
  const lowerInst = instruction.toLowerCase();
  if (lowerInst.includes('short') || lowerInst.includes('concise')) {
    const sentences = text.split('. ');
    return sentences.slice(0, Math.max(1, Math.ceil(sentences.length / 2))).join('. ');
  }
  if (lowerInst.includes('professional') || lowerInst.includes('recruiter')) {
    return text.replace(/i worked on/gi, 'Spearheaded development of')
               .replace(/i made/gi, 'Architected and deployed')
               .replace(/good at/gi, 'Proficient in');
  }
  return text;
}
