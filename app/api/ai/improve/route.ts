import { NextRequest, NextResponse } from "next/server";
import { improveSectionContent } from "@/lib/ai";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { sectionName, currentContent, instruction } = body as {
      sectionName?: string;
      currentContent?: string;
      instruction?: string;
    };

    if (!sectionName || !currentContent || !instruction) {
      return NextResponse.json(
        { error: "Missing sectionName, currentContent, or instruction" },
        { status: 400 },
      );
    }

    const improvedText = await improveSectionContent(
      sectionName,
      currentContent,
      instruction,
    );

    return NextResponse.json({
      success: true,
      improvedText,
    });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Failed to improve content";
    console.error("AI Improve API Error:", error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
