"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { Mail, Lock, Eye, EyeOff, ArrowRight, Sparkles, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      if (response.ok) {
        toast({
          title: "Login successful",
          description: "Welcome back to MailGenie!",
        })
        // Redirect to dashboard
        window.location.href = "/dashboard"
      } else {
        const error = await response.json()
        toast({
          title: "Login failed",
          description: error.message || "Invalid credentials",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Login failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
  <div className="min-h-screen bg-primary flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2 mb-6 text-purple-600 hover:text-purple-700 transition-colors">
            <ArrowLeft className="w-4 h-4 text-white" />
            <span className="text-white">Back to Home</span>
          </Link>
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Mail className="w-6 h-6 text-secondary" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
              <span className="text-2xl font-bold text-white">MailGenie</span>
            </span>
          </div>
          <Badge className="mb-4 bg-purple-100 text-purple-700 hover:bg-purple-200 transition-colors">
            <Sparkles className="w-4 h-4 mr-1 text-secondary" />
            <span className="text-secondary">AI-Powered Email Assistant</span>
          </Badge>
          <h1 className="text-3xl font-bold text-white mb-2">Welcome back</h1>
          <p className="text-secondary">Sign in to your MailGenie account</p>
        </div>

        {/* Login Form */}
  <Card className="border-0 shadow-xl bg-primary/90">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center text-white">Sign In</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white font-medium">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-secondary/70" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 border-secondary/40 focus:border-secondary focus:ring-secondary bg-primary/30 text-white placeholder:text-secondary/60"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-white font-medium">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-secondary/70" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10 border-secondary/40 focus:border-secondary focus:ring-secondary bg-primary/30 text-white placeholder:text-secondary/60"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-secondary/70 hover:text-secondary"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="remember"
                    className="rounded border-secondary/40 text-secondary focus:ring-secondary"
                  />
                  <Label htmlFor="remember" className="text-sm text-secondary/80">
                    Remember me
                  </Label>
                </div>
                <Link href="/auth/forgot-password" className="text-sm text-secondary hover:text-white font-medium">
                  Forgot password?
                </Link>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-secondary to-primary hover:from-primary hover:to-secondary text-white py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:transform-none disabled:opacity-50"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Signing in...
                  </div>
                ) : (
                  <div className="flex items-center">
                    Sign In
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </div>
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-secondary/80">
                Don't have an account?{" "}
                <Link href="/auth/signup" className="text-secondary hover:text-white font-medium">
                  Sign up
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Features Preview */}
        <div className="mt-8 text-center">
          <p className="text-sm text-secondary/80 mb-4">Trusted by professionals worldwide</p>
          <div className="flex justify-center space-x-6 text-xs text-secondary/60">
            <span>✓ AI-Powered Replies</span>
            <span>✓ Privacy First</span>
            <span>✓ Chrome Extension</span>
          </div>
        </div>
      </div>
    </div>
  )
}
