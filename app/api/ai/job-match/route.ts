import { NextRequest, NextResponse } from "next/server";
import { improveSectionContent } from "@/lib/ai";
import { PortfolioData } from "@/types/portfolio";

const TECH_KEYWORDS = [
  "Python",
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Docker",
  "Kubernetes",
  "AWS",
  "PostgreSQL",
  "GraphQL",
  "REST API",
  "Machine Learning",
  "PyTorch",
  "TensorFlow",
  "LLMs",
  "RAG",
  "Tailwind CSS",
  "SQL",
  "CI/CD",
  "Git",
  "FastAPI",
  "System Design",
];

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { jobDescription, portfolio } = body as {
      jobDescription?: string;
      portfolio?: PortfolioData;
    };

    if (!jobDescription || !jobDescription.trim()) {
      return NextResponse.json(
        { error: "Job description text is required." },
        { status: 400 },
      );
    }

    const currentSkills = (portfolio?.skills || []).flatMap((s) => s.skills);
    const jdLower = jobDescription.toLowerCase();

    const matchedKeywords = TECH_KEYWORDS.filter(
      (k) =>
        jdLower.includes(k.toLowerCase()) &&
        currentSkills.some((s) => s.toLowerCase() === k.toLowerCase()),
    );
    const missingKeywords = TECH_KEYWORDS.filter(
      (k) =>
        jdLower.includes(k.toLowerCase()) &&
        !currentSkills.some((s) => s.toLowerCase() === k.toLowerCase()),
    );

    const totalKeywords = matchedKeywords.length + missingKeywords.length;
    const baseScore =
      totalKeywords > 0
        ? Math.min(
            95,
            Math.max(
              50,
              Math.round((matchedKeywords.length / totalKeywords) * 100),
            ),
          )
        : 75;

    const suggestedHeadline = `${portfolio?.personal?.title || "Engineer"} | Specialized in ${matchedKeywords.slice(0, 3).join(", ") || "Modern Systems"}`;
    const summaryPrompt = `Tailor the following bio summary specifically for a job position requiring: ${missingKeywords.slice(0, 4).join(", ")}. Keep factual accuracy without inventing work history. Original Bio: ${portfolio?.about?.summary || ""}`;

    const suggestedSummary = await improveSectionContent(
      "About",
      portfolio?.about?.summary || "",
      summaryPrompt,
    );

    return NextResponse.json({
      success: true,
      matchScore: baseScore,
      matchedKeywords,
      missingKeywords,
      suggestedHeadline,
      suggestedSummary,
    });
  } catch (error: unknown) {
    const message =
      error instanceof Error
        ? error.message
        : "Failed to match job description";
    console.error("Job Match API Error:", error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
