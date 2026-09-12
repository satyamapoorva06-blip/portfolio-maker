import { NextRequest, NextResponse } from "next/server";
import { createGithubRepository, generateReadmeContent } from "@/lib/github";
import { PortfolioData } from "@/types/portfolio";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { repoName, isPrivate, portfolio, token, githubUsername } = body as {
      repoName?: string;
      isPrivate?: boolean;
      portfolio?: PortfolioData;
      token?: string;
      githubUsername?: string;
    };

    if (!repoName || !portfolio) {
      return NextResponse.json(
        { error: "Missing repository name or portfolio data" },
        { status: 400 },
      );
    }

    const result = await createGithubRepository({
      name: repoName,
      isPrivate: !!isPrivate,
      portfolio,
      token,
      githubUsername,
    });

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          error:
            result.error ||
            "GitHub Personal Access Token required to create repository on user account.",
        },
        { status: 400 },
      );
    }

    const readme = generateReadmeContent(
      portfolio,
      `https://${portfolio.slug}.vercel.app`,
      result.repoUrl || "",
    );

    return NextResponse.json({
      success: true,
      repoUrl: result.repoUrl,
      cloneUrl: result.cloneUrl,
      fullName: result.fullName,
      readme,
    });
  } catch (error: unknown) {
    const message =
      error instanceof Error
        ? error.message
        : "Failed to create GitHub repository";
    console.error("Create Repo API Error:", error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
