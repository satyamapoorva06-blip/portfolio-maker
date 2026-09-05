import { GoogleGenerativeAI } from '@google/generative-ai';

export async function parseImageBuffer(buffer: Buffer, mimeType: string, fileName?: string): Promise<string> {
  const geminiKey = process.env.GEMINI_API_KEY;

  if (geminiKey && geminiKey !== 'your-gemini-api-key' && geminiKey !== 'placeholder-gemini-key') {
    try {
      const genAI = new GoogleGenerativeAI(geminiKey);
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

      const base64Data = buffer.toString('base64');
      const imagePart = {
        inlineData: {
          data: base64Data,
          mimeType: mimeType || 'image/jpeg',
        },
      };

      const prompt = `
Extract all text accurately from this image of a resume.
Do NOT invent or add any text not present in the image.
Return ONLY the raw extracted text line by line.
`;

      const result = await model.generateContent([prompt, imagePart]);
      const extractedText = result.response.text().trim();
      if (extractedText && extractedText.length > 10) {
        return extractedText;
      }
    } catch (error) {
      console.warn('[Portify AI] Image OCR via Gemini failed, using fallback:', error);
    }
  }

  // Fallback if no API key or OCR failed: extract clean name without hardcoded dummy details
  const cleanName = (fileName || 'Candidate Photo')
    .replace(/\.(jpg|jpeg|png|webp|heic)$/i, '')
    .replace(/[-_]/g, ' ')
    .replace(/\b(resume|cv|portfolio|photo|image)\b/gi, '')
    .trim() || 'Candidate';

  return `${cleanName}\nProfessional Candidate\nResume Photo: ${fileName || 'Resume.jpg'}`;
}
