import { NextResponse } from "next/server"
import { getAvailableTones, getToneDescription } from "@/lib/openai-service"

export const runtime = "nodejs"

/**
 * GET /api/tones
 * Returns available email tones with descriptions
 */
export async function GET() {
  try {
    const tones = getAvailableTones().map(tone => ({
      value: tone,
      label: tone.charAt(0).toUpperCase() + tone.slice(1),
      description: getToneDescription(tone)
    }))

    return NextResponse.json({ tones })
  } catch (error) {
    console.error("Error fetching tones:", error)
    return NextResponse.json({ error: "Failed to fetch available tones" }, { status: 500 })
  }
}