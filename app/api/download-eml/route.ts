import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { reply } = await request.json()

    if (!reply) {
      return NextResponse.json({ error: "Reply content is required" }, { status: 400 })
    }

    // Generate EML format
    const emlContent = `From: user@mailgenie.com
To: recipient@example.com
Subject: Re: Email Reply
Date: ${new Date().toUTCString()}
Content-Type: text/plain; charset=UTF-8

${reply}
`

    // Create response with EML file
    const response = new NextResponse(emlContent)
    response.headers.set("Content-Type", "message/rfc822")
    response.headers.set("Content-Disposition", 'attachment; filename="email-reply.eml"')

    return response
  } catch (error) {
    console.error("Error generating EML file:", error)
    return NextResponse.json({ error: "Failed to generate EML file" }, { status: 500 })
  }
}
