import { NextRequest, NextResponse } from 'next/server';
import { parsePdfBuffer } from '@/lib/resume-parser/pdf';
import { parseDocxBuffer } from '@/lib/resume-parser/docx';
import { parseResumeToPortfolio } from '@/lib/ai';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No resume file uploaded' }, { status: 400 });
    }

    const fileName = file.name || 'resume';
    const fileSize = file.size;
    const fileType = file.type || '';

    // Max 10MB validation
    if (fileSize > 10 * 1024 * 1024) {
      return NextResponse.json({ error: 'File size exceeds 10MB limit' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    let extractedText = '';

    if (fileName.endsWith('.pdf') || fileType.includes('pdf')) {
      extractedText = await parsePdfBuffer(buffer, fileName);
    } else if (fileName.endsWith('.docx') || fileType.includes('officedocument') || fileName.endsWith('.doc')) {
      extractedText = await parseDocxBuffer(buffer);
    } else {
      // Plain text fallback
      extractedText = buffer.toString('utf-8');
    }

    if (!extractedText || extractedText.trim().length < 1) {
      extractedText = `${fileName.replace(/\.(pdf|docx?|txt)$/i, '')} Resume Portfolio`;
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
