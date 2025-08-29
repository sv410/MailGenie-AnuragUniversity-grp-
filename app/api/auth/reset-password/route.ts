import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { getUserByEmail, writeUsers, readUsers } from "@/lib/users"

export const runtime = "nodejs"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

/**
 * POST /api/auth/reset-password
 * Initiates password reset process (in a real app, this would send an email)
 */
export async function POST(request: NextRequest) {
  try {
    const { email, newPassword, resetToken } = await request.json()

    if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      )
    }

    // If no resetToken provided, generate one (simulate sending email)
    if (!resetToken) {
      const user = await getUserByEmail(email)
      if (!user) {
        // Don't reveal if user exists or not for security
        return NextResponse.json(
          { message: "If an account with this email exists, a reset link has been sent." },
          { status: 200 }
        )
      }

      // Generate reset token (in real app, this would be sent via email)
      const token = jwt.sign(
        { userId: user.id, type: 'password-reset' },
        JWT_SECRET,
        { expiresIn: '1h' }
      )

      return NextResponse.json({
        message: "Password reset initiated",
        resetToken: token // In real app, this would be sent via email
      })
    }

    // If resetToken and newPassword provided, reset the password
    if (!newPassword) {
      return NextResponse.json(
        { message: "New password is required" },
        { status: 400 }
      )
    }

    if (newPassword.length < 8) {
      return NextResponse.json(
        { message: "Password must be at least 8 characters long" },
        { status: 400 }
      )
    }

    try {
      const decoded = jwt.verify(resetToken, JWT_SECRET) as any
      
      if (decoded.type !== 'password-reset') {
        return NextResponse.json(
          { message: "Invalid reset token" },
          { status: 400 }
        )
      }

      const users = await readUsers()
      const userIndex = users.findIndex(u => u.id === decoded.userId)
      
      if (userIndex === -1) {
        return NextResponse.json(
          { message: "User not found" },
          { status: 404 }
        )
      }

      // Hash new password
      const saltRounds = 12
      const hashedPassword = await bcrypt.hash(newPassword, saltRounds)
      
      // Update user password
      users[userIndex].password = hashedPassword
      await writeUsers(users)

      return NextResponse.json({
        message: "Password reset successfully"
      })

    } catch (tokenError) {
      return NextResponse.json(
        { message: "Invalid or expired reset token" },
        { status: 400 }
      )
    }

  } catch (error) {
    console.error("Password reset error:", error)
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
}