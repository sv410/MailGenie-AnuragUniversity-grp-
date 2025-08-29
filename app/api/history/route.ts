import { NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import { getUserHistory, deleteHistoryItem } from "@/lib/history"

export const runtime = "nodejs"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

/**
 * GET /api/history
 * Retrieves user's email history with optional filtering and pagination
 */
export async function GET(request: NextRequest) {
  try {
    // Get the auth token from cookies
    const token = request.cookies.get("auth-token")?.value

    if (!token) {
      return NextResponse.json(
        { message: "Authentication required" },
        { status: 401 }
      )
    }

    // Verify the token
    const decoded = jwt.verify(token, JWT_SECRET) as any
    const userId = decoded.userId

    // Get query parameters
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const tone = searchParams.get('tone')
    const search = searchParams.get('search')

    // Get user's email history
    let history = await getUserHistory(userId)

    // Apply filters
    if (tone) {
      history = history.filter(item => item.tone === tone)
    }

    if (search) {
      const searchLower = search.toLowerCase()
      history = history.filter(item => 
        item.emailContent.toLowerCase().includes(searchLower) ||
        item.reply.toLowerCase().includes(searchLower)
      )
    }

    // Sort by timestamp (newest first)
    history.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

    // Apply pagination
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedHistory = history.slice(startIndex, endIndex)

    return NextResponse.json({ 
      history: paginatedHistory,
      pagination: {
        page,
        limit,
        total: history.length,
        totalPages: Math.ceil(history.length / limit)
      }
    })
  } catch (error) {
    console.error("History fetch error:", error)
    return NextResponse.json(
      { message: "Failed to fetch history" },
      { status: 500 }
    )
  }
}

/**
 * DELETE /api/history
 * Deletes a specific history item
 */
export async function DELETE(request: NextRequest) {
  try {
    // Get the auth token from cookies
    const token = request.cookies.get("auth-token")?.value

    if (!token) {
      return NextResponse.json(
        { message: "Authentication required" },
        { status: 401 }
      )
    }

    // Verify the token
    const decoded = jwt.verify(token, JWT_SECRET) as any
    const userId = decoded.userId

    const { itemId } = await request.json()

    if (!itemId) {
      return NextResponse.json(
        { message: "Item ID is required" },
        { status: 400 }
      )
    }

    // Delete the history item
    const success = await deleteHistoryItem(userId, itemId)

    if (!success) {
      return NextResponse.json(
        { message: "History item not found" },
        { status: 404 }
      )
    }

    return NextResponse.json({ message: "History item deleted successfully" })
  } catch (error) {
    console.error("History delete error:", error)
    return NextResponse.json(
      { message: "Failed to delete history item" },
      { status: 500 }
    )
  }
}



