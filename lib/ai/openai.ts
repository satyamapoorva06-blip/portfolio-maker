import OpenAI from 'openai';
import { PortfolioData } from '@/types/portfolio';
import { parseResumeTextHeuristically } from './heuristic-fallback';

export async function parseResumeWithOpenAI(resumeText: string, apiKey: string): Promise<PortfolioData> {
  try {
    const openai = new OpenAI({ apiKey });
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'You are an expert resume parser extracting clean structured portfolio JSON.',
        },
        {
          role: 'user',
          content: `Extract structured portfolio data from the following resume text into JSON format:\n\n${resumeText}`,
        },
      ],
      response_format: { type: 'json_object' },
    });

    const content = response.choices[0]?.message?.content || '{}';
    const parsed = JSON.parse(content);
    const base = parseResumeTextHeuristically(resumeText);

    return {
      ...base,
      personal: { ...base.personal, ...parsed.personal },
      about: { ...base.about, ...parsed.about },
      skills: Array.isArray(parsed.skills) && parsed.skills.length > 0 ? parsed.skills : base.skills,
      experience: Array.isArray(parsed.experience) && parsed.experience.length > 0 ? parsed.experience : base.experience,
      projects: Array.isArray(parsed.projects) && parsed.projects.length > 0 ? parsed.projects : base.projects,
      education: Array.isArray(parsed.education) && parsed.education.length > 0 ? parsed.education : base.education,
    };
  } catch (error) {
    console.error('OpenAI parsing error, falling back:', error);
    return parseResumeTextHeuristically(resumeText);
  }
}

export async function improveSectionWithOpenAI(
  sectionName: string,
  currentContent: string,
  instruction: string,
  apiKey: string
): Promise<string> {
  try {
    const openai = new OpenAI({ apiKey });
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `You are an AI resume editor. Improve section "${sectionName}" per instructions without fabricating ungrounded facts.`,
        },
        {
          role: 'user',
          content: `Instruction: ${instruction}\nCurrent text: ${currentContent}`,
        },
      ],
    });

    return response.choices[0]?.message?.content?.trim() || currentContent;
  } catch (error) {
    console.error('OpenAI improvement error:', error);
    return currentContent;
  }
}
