import { GoogleGenerativeAI } from "@google/generative-ai";
import { PortfolioData } from "@/types/portfolio";
import { parseResumeTextHeuristically } from "./heuristic-fallback";

export async function parseResumeWithGemini(
  resumeText: string,
  apiKey: string,
): Promise<PortfolioData> {
  const genAI = new GoogleGenerativeAI(apiKey);
  let resultText = "";

  // Try modern Gemini models with fallback
  const modelsToTry = [
    "gemini-2.0-flash",
    "gemini-1.5-flash",
    "gemini-1.5-pro",
  ];

  const prompt = `
You are an expert resume parser for Portify AI.
Extract structured portfolio data from the following resume text into a strict JSON object.

RULES:
1. NEVER invent jobs, degrees, projects, skills, or certifications not mentioned in the resume.
2. If information is missing, leave the field as an empty string or empty array.
3. Categorize skills logically based on the resume text (e.g. Programming Languages, Frameworks & Libraries, Databases & Infrastructure, Tools & Platforms, Domain Expertise). Include ALL technical and professional skills mentioned.
4. Extract exact highlights/bullet points from the candidate's projects and experience into "about.highlights".
5. Return ONLY raw valid JSON (no markdown triple backticks, no explanatory text).

EXPECTED JSON SCHEMA:
{
  "personal": {
    "name": "string",
    "title": "string",
    "email": "string",
    "phone": "string",
    "location": "string",
    "tagline": "string",
    "socials": {
      "github": "string",
      "linkedin": "string",
      "twitter": "string",
      "website": "string"
    }
  },
  "about": {
    "summary": "string",
    "highlights": ["string"],
    "openToWork": true
  },
  "skills": [
    {
      "id": "sk_1",
      "category": "string",
      "skills": ["string"]
    }
  ],
  "experience": [
    {
      "id": "exp_1",
      "company": "string",
      "role": "string",
      "location": "string",
      "startDate": "string",
      "endDate": "string",
      "current": false,
      "description": "string",
      "achievements": ["string"],
      "technologies": ["string"]
    }
  ],
  "projects": [
    {
      "id": "proj_1",
      "name": "string",
      "description": "string",
      "technologies": ["string"],
      "features": ["string"],
      "githubUrl": "string",
      "liveUrl": "string"
    }
  ],
  "education": [
    {
      "id": "edu_1",
      "institution": "string",
      "degree": "string",
      "field": "string",
      "startDate": "string",
      "endDate": "string",
      "gpa": "string"
    }
  ],
  "certifications": [
    {
      "id": "cert_1",
      "name": "string",
      "organization": "string",
      "issueDate": "string",
      "credentialUrl": "string"
    }
  ],
  "achievements": [
    {
      "id": "ach_1",
      "title": "string",
      "organization": "string",
      "date": "string",
      "description": "string"
    }
  ]
}

RESUME TEXT:
${resumeText}
`;

  for (const modelName of modelsToTry) {
    try {
      const model = genAI.getGenerativeModel({ model: modelName });
      const result = await model.generateContent(prompt);
      resultText = result.response.text().trim();
      if (resultText && resultText.length > 20) break;
    } catch (err) {
      console.warn(
        `[Portify AI] Gemini model ${modelName} call failed, trying fallback model:`,
        err,
      );
    }
  }

  if (!resultText) {
    console.warn(
      "[Portify AI] All Gemini API models failed. Using heuristic parser fallback.",
    );
    return parseResumeTextHeuristically(resumeText);
  }

  try {
    const cleanJson = resultText
      .replace(/^```json/i, "")
      .replace(/^```/, "")
      .replace(/```$/, "")
      .trim();
    const parsed = JSON.parse(cleanJson);

    // Merge with baseline structure strictly preserving AI parsed fields
    const base = parseResumeTextHeuristically(resumeText);

    const mergedPersonal = {
      ...base.personal,
      name: parsed.personal?.name || base.personal.name,
      title: parsed.personal?.title || base.personal.title,
      email: parsed.personal?.email || base.personal.email,
      phone: parsed.personal?.phone || base.personal.phone,
      location: parsed.personal?.location || base.personal.location,
      tagline: parsed.personal?.tagline || base.personal.tagline,
      socials: {
        github:
          parsed.personal?.socials?.github ||
          base.personal.socials?.github ||
          "",
        linkedin:
          parsed.personal?.socials?.linkedin ||
          base.personal.socials?.linkedin ||
          "",
        twitter:
          parsed.personal?.socials?.twitter ||
          base.personal.socials?.twitter ||
          "",
        website:
          parsed.personal?.socials?.website ||
          base.personal.socials?.website ||
          "",
      },
    };

    const mergedAbout = {
      summary: parsed.about?.summary || base.about.summary,
      highlights:
        Array.isArray(parsed.about?.highlights) &&
        parsed.about.highlights.length > 0
          ? parsed.about.highlights
          : base.about.highlights,
      openToWork: parsed.about?.openToWork ?? true,
    };

    return {
      ...base,
      personal: mergedPersonal,
      about: mergedAbout,
      skills:
        Array.isArray(parsed.skills) && parsed.skills.length > 0
          ? parsed.skills
          : base.skills,
      experience:
        Array.isArray(parsed.experience) && parsed.experience.length > 0
          ? parsed.experience
          : base.experience,
      projects:
        Array.isArray(parsed.projects) && parsed.projects.length > 0
          ? parsed.projects
          : base.projects,
      education:
        Array.isArray(parsed.education) && parsed.education.length > 0
          ? parsed.education
          : base.education,
      certifications: Array.isArray(parsed.certifications)
        ? parsed.certifications
        : [],
      achievements: Array.isArray(parsed.achievements)
        ? parsed.achievements
        : [],
    };
  } catch (error) {
    console.error(
      "Gemini JSON parsing error, using heuristic fallback:",
      error,
    );
    return parseResumeTextHeuristically(resumeText);
  }
}

export async function improveSectionWithGemini(
  sectionName: string,
  currentContent: string,
  instruction: string,
  apiKey: string,
): Promise<string> {
  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
You are an expert AI resume editor for Portify AI.
Improve the following content from a user's portfolio section "${sectionName}".

USER INSTRUCTION: "${instruction}"
CURRENT CONTENT: "${currentContent}"

RULES:
1. Do NOT invent new job titles, companies, metrics, or degrees that are not implied in the current content.
2. Return ONLY the improved text directly without conversational preamble or markdown backticks.
`;

    const result = await model.generateContent(prompt);
    return result.response.text().trim();
  } catch (error) {
    console.error("Gemini section improvement error:", error);
    return currentContent;
  }
}
