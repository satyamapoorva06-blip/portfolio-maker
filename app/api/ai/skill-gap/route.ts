import { NextRequest, NextResponse } from "next/server";
import { analyzeSkillGap } from "@/lib/ai";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { targetRole, currentSkills } = body as {
      targetRole?: string;
      currentSkills?: string[];
    };

    if (!targetRole) {
      return NextResponse.json(
        { error: "Target role parameter is required." },
        { status: 400 },
      );
    }

    const skillsArray = Array.isArray(currentSkills) ? currentSkills : [];
    const analysis = await analyzeSkillGap(targetRole, skillsArray);

    return NextResponse.json({
      success: true,
      analysis,
    });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Failed to analyze skill gap";
    console.error("AI Skill Gap API Error:", error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
