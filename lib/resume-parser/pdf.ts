import pdfParse from 'pdf-parse';

export async function parsePdfBuffer(buffer: Buffer): Promise<string> {
  if (!buffer || buffer.length === 0) {
    throw new Error('The uploaded PDF file appears to be empty (0 bytes). Please upload a valid resume PDF.');
  }

  // 1. Primary Extraction using pdf-parse
  try {
    const parsed = await pdfParse(buffer);
    const text = (parsed.text || '').trim();
    if (text && text.length > 20) {
      return text;
    }
  } catch (primaryError) {
    console.warn('pdf-parse primary extraction failed, attempting fallback text stream extraction:', primaryError);
  }

  // 2. Fallback Binary Text Stream Extractor (for custom Canva/Word PDF streams & scanned text streams)
  try {
    const rawString = buffer.toString('binary');
    
    // Extract plain text blocks enclosed in PDF text stream operators: BT ... ET, Tj, TJ, ()
    const textBlocks: string[] = [];
    const textOperatorRegex = /\(([^)]+)\)\s*(?:Tj|TJ|\')|\[([^\]]+)\]\s*TJ/g;

    let match;
    while ((match = textOperatorRegex.exec(rawString)) !== null) {
      const extractedSegment = match[1] || match[2] || '';
      // Clean PDF escape sequences
      const cleaned = extractedSegment
        .replace(/\\\( /g, '(')
        .replace(/\\\)/g, ')')
        .replace(/\\n/g, ' ')
        .replace(/\\r/g, ' ')
        .replace(/\\/g, '')
        .trim();
      if (cleaned.length > 1) {
        textBlocks.push(cleaned);
      }
    }

    let fallbackText = textBlocks.join(' ');

    // If text blocks were too sparse, extract printable ASCII character runs (minimum 4 printable characters)
    if (fallbackText.length < 30) {
      const asciiRuns = rawString.match(/[\x20-\x7E\s]{4,}/g) || [];
      fallbackText = asciiRuns
        .map((s) => s.trim())
        .filter((s) => !s.startsWith('/') && !s.startsWith('%') && !s.includes('obj') && !s.includes('endobj') && s.length > 3)
        .join('\n');
    }

    if (fallbackText && fallbackText.trim().length > 15) {
      return fallbackText;
    }
  } catch (fallbackError) {
    console.error('PDF fallback text stream extraction error:', fallbackError);
  }

  // 3. Final Graceful Fallback if PDF text stream is encrypted or unreadable
  throw new Error('We could not read the text inside this PDF file. It may be an image-only scan or encrypted. Try saving your resume as a standard PDF or Word (.docx) file and uploading again.');
}
