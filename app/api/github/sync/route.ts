import { NextRequest, NextResponse } from "next/server";
import { syncPortfolioToGitHub } from "@/lib/github/sync";
import { PortfolioData } from "@/types/portfolio";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { portfolio, githubUsername, repoName, token } = body as {
      portfolio?: PortfolioData;
      githubUsername?: string;
      repoName?: string;
      token?: string;
    };

    if (!portfolio || !githubUsername || !repoName) {
      return NextResponse.json(
        {
          error: "Portfolio data, GitHub username, and repo name are required.",
        },
        { status: 400 },
      );
    }

    const result = await syncPortfolioToGitHub(
      portfolio,
      githubUsername,
      repoName,
      token,
    );

    return NextResponse.json(result);
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Failed to sync with GitHub";
    console.error("GitHub Sync API Error:", error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
