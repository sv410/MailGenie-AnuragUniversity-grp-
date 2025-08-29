import { NextResponse } from "next/server"
import { validateOpenAIConfig } from "@/lib/openai-service"

export const runtime = "nodejs"

/**
 * GET /api/test-config
 * Tests the OpenAI API configuration
 */
export async function GET() {
  try {
    const isValid = validateOpenAIConfig()
    const apiKey = process.env.OPENAI_API_KEY
    
    return NextResponse.json({
      openaiConfigured: isValid,
      apiKeyPresent: !!apiKey,
      apiKeyFormat: apiKey ? (apiKey.startsWith('sk-') ? 'valid_format' : 'invalid_format') : 'missing',
      environment: process.env.NODE_ENV,
      message: isValid 
        ? 'OpenAI API is properly configured' 
        : 'OpenAI API key is missing or invalid. Please set a valid OPENAI_API_KEY in your .env.local file.'
    })
  } catch (error) {
    console.error("Config test error:", error)
    return NextResponse.json(
      { error: "Failed to test configuration" },
      { status: 500 }
    )
  }
}