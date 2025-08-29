import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export type EmailTone =
  | 'formal'
  | 'friendly'
  | 'concise'
  | 'empathetic'
  | 'professional'
  | 'casual'
  | 'urgent'
  | 'apologetic'
  | 'persuasive'
  | 'enthusiastic'
  | 'diplomatic'
  | 'analytical'
  | 'supportive'
  | 'reassuring'
  | 'assertive'
  | 'appreciative'
  | 'instructional'
  | 'humorous'
  | 'inspirational'
  | 'neutral'
  | 'technical'
  | 'legal'
  | 'sales'
  | 'clarifying'
  | 'followup'
  | 'celebratory'

export interface EmailReplyRequest {
  emailContent: string
  tone?: EmailTone
  context?: string
  senderName?: string
  recipientName?: string
  // User preference controls
  length?: 'short' | 'medium' | 'long'
  includeBullets?: boolean
  includeSubject?: boolean
  callToAction?: string
  includeReferences?: boolean
  formalityLevel?: 'casual' | 'neutral' | 'formal'
  language?: string // ISO language name or code, e.g., "en", "es"
  includeSignature?: boolean
  customInstructions?: string
}

export interface EmailReplyResponse {
  reply: string
  detectedTone: EmailTone
  confidence: number
}

// Enhanced tone-specific system prompts with better instructions
const TONE_PROMPTS: Record<EmailTone, string> = {
  formal: "You are an expert email assistant specializing in formal business communication. Write a polite, formal, and professional email reply that maintains high standards of business etiquette. Use proper business language, maintain a respectful tone, and ensure the response is well-structured with appropriate greetings and closings. Avoid contractions and use complete sentences. Focus on clarity, professionalism, and maintaining positive business relationships.",
  
  friendly: "You are a warm and approachable email assistant. Write a friendly, personable email reply that builds rapport while remaining professional. Use a conversational tone, include warm greetings, and make the recipient feel comfortable and valued. You can use contractions and casual language appropriately. Show genuine interest and create a positive connection while being helpful and informative.",
  
  concise: "You are an efficient email assistant focused on clarity and brevity. Write a brief, direct, and to-the-point email reply that gets the message across quickly. Focus on the essential information, avoid unnecessary details, keep the response clear and actionable. Be polite but succinct, respecting the recipient's time while ensuring all important points are covered.",
  
  empathetic: "You are a compassionate email assistant with high emotional intelligence. Write an understanding, supportive, and empathetic email reply that shows genuine concern and emotional awareness. Acknowledge the sender's feelings or situation, respond with kindness and emotional intelligence. Use supportive language that validates their experience while offering helpful solutions or support.",
  
  professional: "You are a business-focused email assistant with expertise in professional communication. Write a professional, competent, and authoritative email reply that demonstrates expertise and confidence. Use industry-appropriate language, maintain a confident but respectful tone, and focus on solutions and next steps. Show competence while building trust and credibility.",
  
  casual: "You are a relaxed and informal email assistant. Write a casual, laid-back email reply that feels natural and conversational. Use informal language, contractions, and a conversational style. Keep it friendly and approachable while still being helpful and informative. Make the recipient feel comfortable with a relaxed, easy-going communication style.",
  
  urgent: "You are an action-oriented email assistant for time-sensitive matters. Write an urgent, direct email reply that conveys importance and the need for quick action. Use clear, decisive language and emphasize time-sensitivity while remaining professional and courteous. Make the urgency clear without being pushy or aggressive, and provide clear next steps.",
  
  apologetic: "You are a diplomatic email assistant skilled in handling sensitive situations. Write a sincere, apologetic email reply that acknowledges mistakes or issues with genuine remorse. Express authentic regret, take responsibility where appropriate, and focus on solutions and making things right. Use humble and considerate language that rebuilds trust and shows commitment to resolution."
  ,
  persuasive: "You are a persuasive email assistant. Craft compelling replies that motivate action through clear benefits, credibility, and respectful urgency. Maintain professionalism while using persuasive structure (problem → value → action).",
  enthusiastic: "You are an upbeat, positive assistant. Write replies that convey excitement and momentum while staying professional and clear.",
  diplomatic: "You are tactful and neutral. Write replies that balance competing interests, de-escalate tension, and move conversations forward constructively.",
  analytical: "You are precise and data-driven. Write replies that are structured, specific, and evidence-based, with clear assumptions and next steps.",
  supportive: "You are encouraging and helpful. Write replies that acknowledge effort, offer help, and reinforce confidence while providing practical guidance.",
  reassuring: "You are calm and steady. Write replies that reduce anxiety, set expectations, and communicate reliability and care.",
  assertive: "You are direct and confident. Write replies that set boundaries, clarify expectations, and propose decisive next steps without being rude.",
  appreciative: "You are grateful and warm. Write replies that express thanks clearly and specifically while maintaining professionalism.",
  instructional: "You are step-by-step and clear. Write replies that explain processes with numbered steps, bullets, and clear labels so anyone can follow."
  ,
  humorous: "You are light and tasteful. Write replies with gentle humor that stays professional and never undermines the message.",
  inspirational: "You are motivating and uplifting. Write replies that inspire action and confidence while staying practical.",
  neutral: "You are balanced and objective. Write replies that avoid strong emotional language and stick to clear facts.",
  technical: "You are precise and domain-specific. Write replies with exact terminology, concise definitions, and stepwise instructions.",
  legal: "You are careful and compliant. Write replies that are formal, precise, and risk-aware, avoiding guarantees and adding disclaimers if needed.",
  sales: "You are value-driven and customer-centric. Write replies that highlight benefits, social proof, and clear next steps without pressure.",
  clarifying: "You are focused on understanding. Write replies that ask specific questions and restate assumptions to avoid misalignment.",
  followup: "You are polite and persistent. Write replies that nudge for updates with clear context and an easy action path.",
  celebratory: "You are warm and delighted. Write replies that celebrate milestones and express genuine appreciation and excitement."
}

// Fallback responses for when API is not configured
const FALLBACK_RESPONSES: Record<EmailTone, string[]> = {
  formal: [
    "Dear [Recipient],\n\nThank you for your email. I appreciate you taking the time to reach out.\n\n[Your message content here]\n\nI look forward to hearing from you.\n\nBest regards,\n[Your name]",
    "Dear [Recipient],\n\nI hope this email finds you well. Thank you for your correspondence.\n\n[Your message content here]\n\nPlease let me know if you need any further assistance.\n\nSincerely,\n[Your name]"
  ],
  friendly: [
    "Hi [Recipient]!\n\nThanks so much for your email - I really appreciate you reaching out!\n\n[Your message content here]\n\nLooking forward to hearing back from you!\n\nBest,\n[Your name]",
    "Hey [Recipient],\n\nThanks for getting in touch! I'm glad to hear from you.\n\n[Your message content here]\n\nLet me know if you need anything else!\n\nCheers,\n[Your name]"
  ],
  concise: [
    "Hi [Recipient],\n\n[Your message content here]\n\nThanks,\n[Your name]",
    "Hello [Recipient],\n\n[Your message content here]\n\nBest,\n[Your name]"
  ],
  empathetic: [
    "Dear [Recipient],\n\nI understand how you're feeling, and I want you to know that I'm here to help.\n\n[Your message content here]\n\nPlease don't hesitate to reach out if you need anything.\n\nTake care,\n[Your name]",
    "Hi [Recipient],\n\nI can see this situation is important to you, and I want to make sure we address it properly.\n\n[Your message content here]\n\nI'm here to support you through this.\n\nWarm regards,\n[Your name]"
  ],
  professional: [
    "Dear [Recipient],\n\nThank you for your inquiry. I'm pleased to assist you with this matter.\n\n[Your message content here]\n\nI'm confident we can resolve this efficiently.\n\nBest regards,\n[Your name]",
    "Hello [Recipient],\n\nI appreciate you bringing this to my attention. Let me address your concerns.\n\n[Your message content here]\n\nI'm committed to ensuring a positive outcome.\n\nSincerely,\n[Your name]"
  ],
  casual: [
    "Hey [Recipient],\n\nThanks for the email! Here's what I can help you with:\n\n[Your message content here]\n\nLet me know if you need anything else!\n\nCheers,\n[Your name]",
    "Hi [Recipient],\n\nGot your message - thanks for reaching out!\n\n[Your message content here]\n\nHope that helps!\n\nBest,\n[Your name]"
  ],
  urgent: [
    "Dear [Recipient],\n\nThis matter requires immediate attention.\n\n[Your message content here]\n\nPlease respond as soon as possible.\n\nBest regards,\n[Your name]",
    "Hello [Recipient],\n\nThis is time-sensitive and needs your prompt response.\n\n[Your message content here]\n\nI need your input by [deadline].\n\nThanks,\n[Your name]"
  ],
  apologetic: [
    "Dear [Recipient],\n\nI sincerely apologize for the inconvenience this has caused you.\n\n[Your message content here]\n\nI take full responsibility and am working to resolve this immediately.\n\nBest regards,\n[Your name]",
    "Hello [Recipient],\n\nI want to express my genuine regret for the situation.\n\n[Your message content here]\n\nI understand the impact this has had and am committed to making it right.\n\nSincerely,\n[Your name]"
  ],
  persuasive: [
    "Hi [Recipient],\n\nI'd love to propose a simple approach that delivers clear value: [benefit]. If we proceed this week, we can [outcome].\n\nWould you be open to a quick call on [time options] to confirm next steps?\n\nBest,\n[Your name]"
  ],
  enthusiastic: [
    "Hey [Recipient]!\n\nThis is great news — I'm excited to jump in. Here's what we can do next: [steps].\n\nLet me know what works best for you!\n\nCheers,\n[Your name]"
  ],
  diplomatic: [
    "Hello [Recipient],\n\nThank you for sharing your perspective. I understand the considerations on both sides. Here's a balanced path forward: [proposal].\n\nHappy to adjust based on your thoughts.\n\nBest regards,\n[Your name]"
  ],
  analytical: [
    "Hi [Recipient],\n\nBased on the information provided, here are the key points:\n- [Point 1]\n- [Point 2]\n- [Point 3]\n\nRecommendation: [short recommendation].\n\nBest,\n[Your name]"
  ],
  supportive: [
    "Hi [Recipient],\n\nYou're doing a great job moving this forward. I'm here to help with [support area].\n\nLet's tackle this together — next step: [step].\n\nWarmly,\n[Your name]"
  ],
  reassuring: [
    "Dear [Recipient],\n\nI've got this covered. Here's what will happen next: [steps/timeline].\n\nI'll keep you posted. You're in good hands.\n\nBest,\n[Your name]"
  ],
  assertive: [
    "Hello [Recipient],\n\nTo keep us on track, we will proceed with [decision] unless I hear otherwise by [deadline].\n\nThank you for your collaboration.\n\nBest,\n[Your name]"
  ],
  appreciative: [
    "Hi [Recipient],\n\nThank you for your help with [topic]. Your support made a real difference.\n\nIf I can return the favor, please let me know.\n\nBest regards,\n[Your name]"
  ],
  instructional: [
    "Hi [Recipient],\n\nHere are the steps:\n1) [Step one]\n2) [Step two]\n3) [Step three]\n\nIf anything is unclear, I'm happy to clarify.\n\nBest,\n[Your name]"
  ],
  humorous: [
    "Hi [Recipient],\n\nQuick note — promise to keep it shorter than a terms-and-conditions page. Here's the gist: [point].\n\nCheers,\n[Your name]"
  ],
  inspirational: [
    "Hi [Recipient],\n\nThis is an opportunity to build something meaningful. If we take [next step], we set ourselves up for [benefit].\n\nLet’s make it happen.\n\nBest,\n[Your name]"
  ],
  neutral: [
    "Hello [Recipient],\n\nThank you for the update. Here are the facts as I understand them: [facts].\n\nPlease confirm if this aligns with your view and the next step.\n\nRegards,\n[Your name]"
  ],
  technical: [
    "Hi [Recipient],\n\nImplementation outline:\n- Environment: [env]\n- Endpoint: [url]\n- Payload: [json]\n- Expected result: [result]\n\nLet me know if you prefer a different approach.\n\nBest,\n[Your name]"
  ],
  legal: [
    "Dear [Recipient],\n\nSubject to contract and without prejudice, our current position is as follows: [position].\n\nThis email does not constitute legal advice or a binding agreement.\n\nSincerely,\n[Your name]"
  ],
  sales: [
    "Hi [Recipient],\n\nTeams like [peer/customer] saw [result] after adopting [solution]. If we start with [pilot], we can validate value in [timeframe].\n\nOpen to a 15-minute call this week?\n\nBest,\n[Your name]"
  ],
  clarifying: [
    "Hello [Recipient],\n\nTo make sure I understand correctly: [paraphrase].\n\nCould you confirm [question 1] and [question 2]? This will help us proceed efficiently.\n\nThanks,\n[Your name]"
  ],
  followup: [
    "Hi [Recipient],\n\nJust checking in on the note below. Are you open to [small next step]?\n\nThanks for your time,\n[Your name]"
  ],
  celebratory: [
    "Hey [Recipient],\n\nFantastic work — congratulations on [milestone]!\n\nAppreciate your efforts and excited for what's next.\n\nCheers,\n[Your name]"
  ]
}

/**
 * Detects the tone of an incoming email using AI
 */
export async function detectEmailTone(emailContent: string): Promise<{ tone: EmailTone; confidence: number }> {
  try {
    const { text } = await generateText({
      model: openai("gpt-4o-mini"),
      system: "You are an expert at analyzing email tone and sentiment. Analyze the given email and determine its tone. Consider factors like formality level, emotional content, urgency, and relationship context. Respond with ONLY a JSON object containing 'tone' (one of: formal, friendly, concise, empathetic, professional, casual, urgent, apologetic) and 'confidence' (a number between 0 and 1).",
      prompt: `Analyze the tone of this email:\n\n${emailContent}\n\nConsider the language used, emotional content, formality level, and context to determine the most appropriate tone classification.`,
      maxTokens: 150,
    })

    const result = JSON.parse(text)
    return {
      tone: result.tone as EmailTone,
      confidence: Math.min(Math.max(result.confidence || 0.7, 0), 1)
    }
  } catch (error) {
    console.error('Error detecting email tone:', error)
    // Enhanced fallback logic based on content analysis
    const content = emailContent.toLowerCase()
    
    if (content.includes('urgent') || content.includes('asap') || content.includes('immediately')) {
      return { tone: 'urgent', confidence: 0.8 }
    }
    if (content.includes('sorry') || content.includes('apologize') || content.includes('regret')) {
      return { tone: 'apologetic', confidence: 0.8 }
    }
    if (content.includes('thanks') || content.includes('appreciate') || content.includes('grateful')) {
      return { tone: 'friendly', confidence: 0.7 }
    }
    if (content.length < 100) {
      return { tone: 'concise', confidence: 0.6 }
    }
    
    return { tone: 'professional', confidence: 0.5 }
  }
}

/**
 * Generates an email reply using OpenAI with enhanced prompts
 */
export async function generateEmailReply(request: EmailReplyRequest): Promise<EmailReplyResponse> {
  try {
    // Auto-detect tone if not provided
    let tone = request.tone
    let confidence = 1.0
    
    if (!tone) {
      const detection = await detectEmailTone(request.emailContent)
      tone = detection.tone
      confidence = detection.confidence
    }

    const systemPrompt = TONE_PROMPTS[tone]
    
    // Build comprehensive context-aware prompt
    let prompt = `Please generate an appropriate email reply to the following email content. The reply should be contextually relevant, well-structured, and match the requested tone perfectly.`
    
    if (request.context) {
      prompt += `\n\nAdditional context: ${request.context}`
    }
    
    if (request.senderName) {
      prompt += `\n\nSender's name: ${request.senderName}`
    }
    
    if (request.recipientName) {
      prompt += `\n\nRecipient's name: ${request.recipientName}`
    }
    
    // Apply preference controls
    if (request.formalityLevel) {
      prompt += `\n\nDesired formality level: ${request.formalityLevel}`
    }
    if (request.length) {
      prompt += `\n\nPreferred length: ${request.length}`
    }
    if (request.includeBullets) {
      prompt += `\n\nIf appropriate, include bullet points for clarity.`
    }
    if (request.includeSubject) {
      prompt += `\n\nInclude a subject line at the top (Subject: ...).`
    }
    if (request.callToAction) {
      prompt += `\n\nCall to action to include: ${request.callToAction}`
    }
    if (request.includeReferences) {
      prompt += `\n\nIf relevant, reference prior messages or agreements succinctly.`
    }
    if (request.language) {
      prompt += `\n\nWrite the reply in this language: ${request.language}`
    }
    if (request.includeSignature) {
      prompt += `\n\nInclude a simple professional signature block.`
    }
    if (request.customInstructions) {
      prompt += `\n\nAdditional custom instructions: ${request.customInstructions}`
    }
    
    prompt += `\n\nEmail to reply to:\n${request.emailContent}\n\nPlease ensure the reply is:\n- Contextually appropriate\n- Well-structured with proper greeting and closing\n- Professional yet approachable\n- Clear and actionable\n- Free of spelling and grammar errors`

    const { text } = await generateText({
      model: openai("gpt-4o"),
      system: systemPrompt,
      prompt,
      maxTokens: 1000,
      temperature: 0.7,
    })

    return {
      reply: text.trim(),
      detectedTone: tone,
      confidence
    }
  } catch (error) {
    console.error('Error generating email reply:', error)
    
    // Provide fallback response when API fails
    const fallbackResponses = FALLBACK_RESPONSES[request.tone || 'professional']
    const randomResponse = fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)]
    
    return {
      reply: randomResponse,
      detectedTone: request.tone || 'professional',
      confidence: 0.3
    }
  }
}

/**
 * Validates OpenAI API configuration
 */
export function validateOpenAIConfig(): boolean {
  const apiKey = process.env.OPENAI_API_KEY
  return !!(apiKey && 
    apiKey !== 'your_openai_api_key_here' && 
    apiKey !== 'sk-your_actual_openai_api_key_here' &&
    apiKey.startsWith('sk-'))
}

/**
 * Gets available email tones
 */
export function getAvailableTones(): EmailTone[] {
  return Object.keys(TONE_PROMPTS) as EmailTone[]
}

/**
 * Gets tone description for UI
 */
export function getToneDescription(tone: EmailTone): string {
  const descriptions: Record<EmailTone, string> = {
    formal: "Professional and respectful business communication",
    friendly: "Warm and approachable while maintaining professionalism",
    concise: "Brief and to-the-point responses",
    empathetic: "Understanding and supportive communication",
    professional: "Competent and authoritative business tone",
    casual: "Relaxed and informal communication style",
    urgent: "Direct and action-oriented for time-sensitive matters",
    apologetic: "Sincere and diplomatic for addressing issues"
  }
  
  return descriptions[tone] || "Professional communication style"
}

/**
 * Generates a fallback reply when API is not configured
 */
export function generateFallbackReply(request: EmailReplyRequest): EmailReplyResponse {
  const tone = request.tone || 'professional'
  const fallbackResponses = FALLBACK_RESPONSES[tone]
  const randomResponse = fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)]
  
  return {
    reply: randomResponse,
    detectedTone: tone,
    confidence: 0.3
  }
}