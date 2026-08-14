import pdfParse from 'pdf-parse';

export async function parsePdfBuffer(buffer: Buffer): Promise<string> {
  try {
    const parsed = await pdfParse(buffer);
    return parsed.text || '';
  } catch (error) {
    console.error('PDF parsing error:', error);
    throw new Error('Failed to parse PDF file. Ensure the file is not password protected or corrupted.');
  }
}
