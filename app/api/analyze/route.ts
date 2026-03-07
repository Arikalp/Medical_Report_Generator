import { NextRequest, NextResponse } from 'next/server';
import { analyzeImages } from '@/lib/gemini';

export const runtime = 'nodejs';
export const maxDuration = 60;

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const images = formData.getAll('image') as File[];
    const patientInfo = formData.get('patientInfo') as string;

    if (!images || images.length === 0) {
      return NextResponse.json(
        { error: 'No image provided' },
        { status: 400 }
      );
    }

    const processedImages = await Promise.all(
      images.map(async (image) => {
        const arrayBuffer = await image.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        return {
          base64: buffer.toString('base64'),
          mimeType: image.type,
        };
      })
    );

    // Analyze images using Gemini
    const analysisResult = await analyzeImages(processedImages);

    return NextResponse.json({
      success: true,
      analysis: analysisResult,
      patientInfo: patientInfo || 'Anonymous',
    });
  } catch (error) {
    console.error('Analysis error:', error);
    return NextResponse.json(
      {
        error: 'Failed to analyze image',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
