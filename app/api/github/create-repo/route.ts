import { NextRequest, NextResponse } from 'next/server';
import { createGithubRepository, generateReadmeContent } from '@/lib/github';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { repoName, isPrivate, portfolio, token, githubUsername } = body;

    if (!repoName || !portfolio) {
      return NextResponse.json({ error: 'Missing repository name or portfolio data' }, { status: 400 });
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
          error: result.error || 'GitHub Personal Access Token required to create repository on user account.',
        },
        { status: 400 }
      );
    }

    const readme = generateReadmeContent(portfolio, `https://${portfolio.slug}.vercel.app`, result.repoUrl || '');

    return NextResponse.json({
      success: true,
      repoUrl: result.repoUrl,
      cloneUrl: result.cloneUrl,
      fullName: result.fullName,
      readme,
    });
  } catch (err: any) {
    console.error('Create Repo API Error:', err);
    return NextResponse.json({ error: err.message || 'Failed to create GitHub repository' }, { status: 500 });
  }
}
