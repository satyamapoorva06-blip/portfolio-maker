import { NextRequest, NextResponse } from "next/server";
import { deployToNetlify } from "@/lib/netlify";
import { PortfolioData } from "@/types/portfolio";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { portfolio, repoFullName } = body as {
      portfolio?: PortfolioData;
      repoFullName?: string;
    };

    if (!portfolio) {
      return NextResponse.json(
        { error: "Missing portfolio data" },
        { status: 400 },
      );
    }

    const result = await deployToNetlify({
      portfolio,
      repoFullName: repoFullName || `satyam-dev/${portfolio.slug}`,
    });

    return NextResponse.json(result);
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Failed to deploy to Netlify";
    console.error("Netlify Deploy API Error:", error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
