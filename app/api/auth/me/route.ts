import { NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import { getUserById } from "@/lib/users"
export const runtime = "nodejs"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

export async function GET(request: NextRequest) {
  try {
    // Get the auth token from cookies
    const token = request.cookies.get("auth-token")?.value

    if (!token) {
      return NextResponse.json(
        { message: "No authentication token" },
        { status: 401 }
      )
    }

    // Verify the token
    const decoded = jwt.verify(token, JWT_SECRET) as any

    // Find the user
    const user = await getUserById(decoded.userId)

    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 401 }
      )
    }

    return NextResponse.json({
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    })
  } catch (error) {
    console.error("Auth check error:", error)
    return NextResponse.json(
      { message: "Invalid authentication token" },
      { status: 401 }
    )
  }
}
