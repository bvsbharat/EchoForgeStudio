import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

// Configure route for dynamic rendering
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// Initialize Nebius client
const nebiusClient = new OpenAI({
  baseURL: 'https://api.studio.nebius.com/v1/',
  apiKey: process.env.NEXT_PUBLIC_NEBIUS_API_KEY || process.env.NEBIUS_API_KEY,
});

// Default model and parameters
const DEFAULT_MODEL = 'meta-llama/Meta-Llama-3.1-70B-Instruct-fast';
const DEFAULT_MAX_TOKENS = 512;
const DEFAULT_TEMPERATURE = 0.6;
const DEFAULT_TOP_P = 0.9;
const DEFAULT_TOP_K = 50;

export async function POST(request: NextRequest) {
  try {
    console.log('API Key:', process.env.NEXT_PUBLIC_NEBIUS_API_KEY ? 'Present' : 'Missing');
    
    // Parse request data
    const requestData = await request.json();
    
    // Extract parameters with defaults
    const {
      messages,
      model = DEFAULT_MODEL,
      temperature = DEFAULT_TEMPERATURE,
      max_tokens = DEFAULT_MAX_TOKENS,
      top_p = DEFAULT_TOP_P,
      stream = false,
      extra_body = { top_k: DEFAULT_TOP_K }
    } = requestData;
    
    console.log('Received chat request:', { 
      model, 
      temperature, 
      max_tokens,
      messageCount: messages?.length,
      firstMessageContent: messages?.length > 0 ? messages[0].content.substring(0, 50) + '...' : 'None',
      stream 
    });
    
    // Check if Nebius client is properly initialized
    if (!nebiusClient) {
      console.error('Nebius client is not initialized');
      return NextResponse.json(
        { error: 'Nebius client is not initialized' },
        { status: 500 }
      );
    }

    // Validate messages
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: 'Messages array is required and must not be empty' },
        { status: 400 }
      );
    }

    // Prepare request parameters
    const params: any = {
      model,
      messages,
      temperature: parseFloat(temperature.toString()),
      max_tokens: parseInt(max_tokens.toString()),
      top_p: parseFloat(top_p.toString()),
      extra_body,
      stream: Boolean(stream)
    };

    // Handle non-streaming response
    if (!stream) {
      try {
        const completion = await nebiusClient.chat.completions.create(params);
        return NextResponse.json(completion);
      } catch (error: any) {
        console.error('Error in chat completion:', error);
        return NextResponse.json(
          { error: `Chat API error: ${error.message}` },
          { status: 500 }
        );
      }
    }
    
    // Handle streaming response
    const responseStream = new ReadableStream({
      async start(controller) {
        try {
          console.log('Creating streaming chat completion with params:', {
            ...params,
            messages: params.messages.map((m: any) => ({
              role: m.role,
              content: m.content.substring(0, 20) + '...'
            }))
          });
          
          try {
            const completion = await nebiusClient.chat.completions.create(params);
            console.log('Streaming completion initiated successfully');
            
            // Handle streaming completions
            for await (const chunk of completion as any) {
              console.log('Received chunk:', JSON.stringify(chunk).substring(0, 100));
              // Format the chunk as SSE
              const text = JSON.stringify(chunk);
              controller.enqueue(new TextEncoder().encode(`data: ${text}\n\n`));
            }
          } catch (innerError: any) {
            console.error('Error in streaming request:', innerError);
            console.error('Error details:', innerError.message);
            if (innerError.response) {
              console.error('Response status:', innerError.response.status);
              console.error('Response data:', innerError.response.data);
            }
            throw innerError;
          }

          // Signal the end of the stream
          controller.enqueue(new TextEncoder().encode('data: [DONE]\n\n'));
          controller.close();
        } catch (error: any) {
          console.error('Streaming error:', error);
          controller.enqueue(
            new TextEncoder().encode(
              `data: ${JSON.stringify({ error: `Streaming error: ${error.message}` })}\n\n`
            )
          );
          controller.close();
        }
      },
    });

    // Return the stream as a response
    return new NextResponse(responseStream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (error: any) {
    console.error('Request processing error:', error);
    return NextResponse.json(
      { error: `Request processing error: ${error.message}` },
      { status: 500 }
    );
  }
}
