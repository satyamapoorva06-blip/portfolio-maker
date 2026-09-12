import { NextRequest, NextResponse } from "next/server";
import { generateActionBullets } from "@/lib/ai";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { role, company, description } = body as {
      role?: string;
      company?: string;
      description?: string;
    };

    if (!role || !company) {
      return NextResponse.json(
        { error: "Role and company parameters are required." },
        { status: 400 },
      );
    }

    const bullets = await generateActionBullets(
      role,
      company,
      description || "",
    );

    return NextResponse.json({
      success: true,
      bullets,
    });
  } catch (error: unknown) {
    const message =
      error instanceof Error
        ? error.message
        : "Failed to generate STAR bullet points";
    console.error("AI Bullets API Error:", error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
