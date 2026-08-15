import { NextRequest, NextResponse } from 'next/server';
import { parsePdfBuffer } from '@/lib/resume-parser/pdf';
import { parseDocxBuffer } from '@/lib/resume-parser/docx';
import { parseImageBuffer } from '@/lib/resume-parser/image';
import { parseResumeToPortfolio } from '@/lib/ai';
import { checkRateLimit } from '@/lib/rate-limit';

export async function POST(req: NextRequest) {
  try {
    // 1. IP-Based Rate Limiting (Max 10 resume parsing requests per minute per IP)
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim() || '127.0.0.1';
    const rateLimit = checkRateLimit(ip, 10, 60 * 1000);

    if (!rateLimit.success) {
      const waitSec = Math.ceil(rateLimit.resetMs / 1000);
      return NextResponse.json(
        { error: `Too many upload requests. Please wait ${waitSec} seconds before analyzing another resume.` },
        { status: 429 }
      );
    }

    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No resume file uploaded' }, { status: 400 });
    }

    const fileName = file.name || 'resume';
    const fileSize = file.size;
    const fileType = file.type || '';
    const nameLower = fileName.toLowerCase();

    // Max 10MB validation
    if (fileSize > 10 * 1024 * 1024) {
      return NextResponse.json({ error: 'File size exceeds 10MB limit' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    let extractedText = '';

    if (nameLower.endsWith('.pdf') || fileType.includes('pdf')) {
      extractedText = await parsePdfBuffer(buffer, fileName);
    } else if (nameLower.endsWith('.docx') || fileType.includes('officedocument') || nameLower.endsWith('.doc')) {
      extractedText = await parseDocxBuffer(buffer);
    } else if (
      fileType.startsWith('image/') ||
      nameLower.endsWith('.jpg') ||
      nameLower.endsWith('.jpeg') ||
      nameLower.endsWith('.png') ||
      nameLower.endsWith('.webp')
    ) {
      const mimeType = fileType || (nameLower.endsWith('.png') ? 'image/png' : 'image/jpeg');
      extractedText = await parseImageBuffer(buffer, mimeType, fileName);
    } else {
      // Plain text fallback
      extractedText = buffer.toString('utf-8');
    }

    if (!extractedText || extractedText.trim().length < 1) {
      extractedText = `${fileName.replace(/\.(pdf|docx?|txt|jpg|jpeg|png|webp)$/i, '')} Resume Portfolio`;
    }

    // Pass to AI / Heuristic Extractor
    const portfolioData = await parseResumeToPortfolio(extractedText, fileName);

    return NextResponse.json({
      success: true,
      data: portfolioData,
      extractedLength: extractedText.length,
    });
  } catch (error: any) {
    console.error('Resume Parse API Error:', error);
    return NextResponse.json(
      { error: error.message || 'An error occurred while analyzing your resume. Please try again.' },
      { status: 500 }
    );
  }
}
