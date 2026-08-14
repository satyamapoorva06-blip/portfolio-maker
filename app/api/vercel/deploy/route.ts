import { NextRequest, NextResponse } from 'next/server';
import { deployToVercel } from '@/lib/vercel';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { portfolio, repoFullName, token } = body;

    if (!portfolio) {
      return NextResponse.json({ error: 'Missing portfolio data' }, { status: 400 });
    }

    const origin = req.headers.get('origin') || (req.headers.get('referer') ? new URL(req.headers.get('referer')!).origin : undefined);

    const result = await deployToVercel({
      portfolio,
      repoFullName: repoFullName || `github/${portfolio.slug}`,
      token,
      appOrigin: origin,
    });

    return NextResponse.json(result);
  } catch (err: any) {
    console.error('Vercel Deploy API Error:', err);
    return NextResponse.json({ error: err.message || 'Failed to deploy to Vercel' }, { status: 500 });
  }
}
