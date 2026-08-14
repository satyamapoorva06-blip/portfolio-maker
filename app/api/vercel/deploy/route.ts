import { NextRequest, NextResponse } from 'next/server';
import { deployToVercel } from '@/lib/vercel';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { portfolio, repoFullName } = body;

    if (!portfolio) {
      return NextResponse.json({ error: 'Missing portfolio data' }, { status: 400 });
    }

    const result = await deployToVercel({
      portfolio,
      repoFullName: repoFullName || `satyam-dev/${portfolio.slug}`,
    });

    return NextResponse.json(result);
  } catch (err: any) {
    console.error('Vercel Deploy API Error:', err);
    return NextResponse.json({ error: err.message || 'Failed to deploy to Vercel' }, { status: 500 });
  }
}
