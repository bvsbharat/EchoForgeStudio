import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { text, voice, model, language } = await request.json();

    // Validate required parameters
    if (!text || !voice) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      );
    }

    // LMNT API key from environment variables
    const apiKey = process.env.LMNT_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'LMNT API key is not configured' },
        { status: 500 }
      );
    }

    // Call LMNT API for text-to-speech
    const lmntResponse = await fetch('https://api.lmnt.com/v1/ai/speech/synthesis', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': apiKey,
      },
      body: JSON.stringify({
        text,
        voice,
        model: model || 'aurora',
        language: language || 'en',
        format: 'mp3',
        sample_rate: 24000,
      }),
    });

    if (!lmntResponse.ok) {
      const errorData = await lmntResponse.json().catch(() => ({}));
      console.error('LMNT API error:', errorData);
      return NextResponse.json(
        { error: `LMNT API error: ${lmntResponse.status}` },
        { status: lmntResponse.status }
      );
    }

    // Get audio data as array buffer
    const audioBuffer = await lmntResponse.arrayBuffer();

    // Return audio data
    return new NextResponse(audioBuffer, {
      headers: {
        'Content-Type': 'audio/mpeg',
        'Content-Length': audioBuffer.byteLength.toString(),
      },
    });
  } catch (error) {
    console.error('Error processing TTS request:', error);
    return NextResponse.json(
      { error: 'Error processing text-to-speech request' },
      { status: 500 }
    );
  }
}
