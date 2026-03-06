import { GoogleGenerativeAI } from '@google/generative-ai';

if (!process.env.GOOGLE_API_KEY) {
  throw new Error('GOOGLE_API_KEY is not set in environment variables');
}

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

export const systemPrompt = `
You are a specialized AI Medical Assistant. Your task is to analyze medical images (like X-rays, CT scans, MRIs) and generate a comprehensive, professional diagnostic report.

**Report Structure:**
1.  **Image Modality:** Identify the type of scan (e.g., Chest X-ray, Brain MRI).
2.  **Findings:** Detail all observations. Describe normal structures and any abnormalities (lesions, fractures, inflammation). Note their size, location, and characteristics precisely.
3.  **Impression:** Provide a summary of the most critical findings and a potential diagnosis or a list of differential diagnoses.
4.  **Recommendations:** Suggest next steps, such as clinical correlation, follow-up imaging, or specific specialist consultations.

**Guidelines:**
- Use clear, professional medical terminology.
- Structure your response using Markdown for headers (e.g., **Findings:**).
- Be objective and base your analysis solely on the visual information in the image.
- **Crucially, end every report with the following disclaimer:**
  ---
  **Disclaimer:** This AI-generated analysis is for informational purposes only and is not a substitute for professional medical advice. A qualified healthcare professional must verify all findings.
`;

export async function analyzeImage(imageBase64: string, mimeType: string): Promise<string> {
  const model = genAI.getGenerativeModel({
    model: 'gemini-2.5-flash',
    generationConfig: {
      temperature: 0.8,
      topP: 0.95,
      topK: 40,
      maxOutputTokens: 8192,
    },
    safetySettings: [
      {
        category: 'HARM_CATEGORY_HARASSMENT',
        threshold: 'BLOCK_MEDIUM_AND_ABOVE',
      },
      {
        category: 'HARM_CATEGORY_HATE_SPEECH',
        threshold: 'BLOCK_MEDIUM_AND_ABOVE',
      },
      {
        category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
        threshold: 'BLOCK_MEDIUM_AND_ABOVE',
      },
      {
        category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
        threshold: 'BLOCK_MEDIUM_AND_ABOVE',
      },
    ],
  });

  const result = await model.generateContent([
    systemPrompt,
    {
      inlineData: {
        data: imageBase64,
        mimeType,
      },
    },
  ]);

  const response = await result.response;
  return response.text();
}
