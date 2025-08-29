import { type NextRequest, NextResponse } from "next/server"
import { appendHistoryItem } from "@/lib/history"
import { generateEmailReply, validateOpenAIConfig, getAvailableTones, getToneDescription, generateFallbackReply, type EmailTone } from "@/lib/openai-service"
import jwt from "jsonwebtoken"

export const runtime = "nodejs"

export async function POST(request: NextRequest) {
  try {
    const { emailContent, tone, context, senderName, recipientName } = await request.json()

    if (!emailContent) {
      return NextResponse.json({ error: "Email content is required" }, { status: 400 })
    }

    // Validate tone if provided
    if (tone && !getAvailableTones().includes(tone)) {
      return NextResponse.json({ 
        error: `Invalid tone. Available tones: ${getAvailableTones().join(', ')}` 
      }, { status: 400 })
    }

    let result: any
    let isFallback = false

    // Check if OpenAI is configured
    if (!validateOpenAIConfig()) {
      // Use fallback response when API is not configured
      result = generateFallbackReply({
        emailContent,
        tone: tone as EmailTone,
        context,
        senderName,
        recipientName
      })
      isFallback = true
    } else {
      // Generate AI reply using the enhanced service
      result = await generateEmailReply({
        emailContent,
        tone: tone as EmailTone,
        context,
        senderName,
        recipientName
      })
    }

    // Save to history if user is authenticated
    const userId = getUserIdFromRequest(request)
    if (userId) {
      await appendHistoryItem({ 
        userId, 
        emailContent, 
        tone: result.detectedTone, 
        reply: result.reply 
      })
    }

    return NextResponse.json({
      reply: result.reply,
      detectedTone: result.detectedTone,
      confidence: result.confidence,
      isFallback,
      availableTones: getAvailableTones().map(t => ({
        value: t,
        label: t.charAt(0).toUpperCase() + t.slice(1),
        description: getToneDescription(t)
      })),
      ...(isFallback && {
        message: "Using fallback response. To get AI-powered replies, please configure your OpenAI API key in .env.local file."
      })
    })
  } catch (error) {
    console.error("Error generating reply:", error)
    
    // Provide a basic fallback even if everything fails
    const fallbackResult = generateFallbackReply({
      emailContent: "Error occurred",
      tone: 'professional'
    })
    
    return NextResponse.json({
      reply: fallbackResult.reply,
      detectedTone: fallbackResult.detectedTone,
      confidence: 0.1,
      isFallback: true,
      availableTones: getAvailableTones().map(t => ({
        value: t,
        label: t.charAt(0).toUpperCase() + t.slice(1),
        description: getToneDescription(t)
      })),
      message: "An error occurred. Using fallback response. Please check your configuration and try again."
    })
  }
}

function getUserIdFromRequest(request: NextRequest): string | null {
  try {
    const token = request.cookies.get("auth-token")?.value
    if (!token) return null
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "your-secret-key") as any
    return decoded.userId ?? null
  } catch {
    return null
  }
}
