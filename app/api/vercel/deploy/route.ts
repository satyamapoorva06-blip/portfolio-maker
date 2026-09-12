import { NextRequest, NextResponse } from "next/server";
import { deployToVercel } from "@/lib/vercel";
import { PortfolioData } from "@/types/portfolio";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { portfolio, repoFullName, token } = body as {
      portfolio?: PortfolioData;
      repoFullName?: string;
      token?: string;
    };

    if (!portfolio) {
      return NextResponse.json(
        { error: "Missing portfolio data" },
        { status: 400 },
      );
    }

    const origin =
      req.headers.get("origin") ||
      (req.headers.get("referer")
        ? new URL(req.headers.get("referer")!).origin
        : undefined);

    const result = await deployToVercel({
      portfolio,
      repoFullName: repoFullName || `github/${portfolio.slug}`,
      token,
      appOrigin: origin,
    });

    return NextResponse.json(result);
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Failed to deploy to Vercel";
    console.error("Vercel Deploy API Error:", error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
