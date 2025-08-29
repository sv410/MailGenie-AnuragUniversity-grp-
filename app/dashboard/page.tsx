"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { Mail, Upload, Wand2, Copy, Download, Loader2, FileText, Sparkles, ArrowLeft, Moon, Sun, LogOut, User } from "lucide-react"
import Link from "next/link"
import { Label } from "@/components/ui/label"

export default function Dashboard() {
  const [emailContent, setEmailContent] = useState("")
  const [selectedTone, setSelectedTone] = useState("")
  const [generatedReply, setGeneratedReply] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [user, setUser] = useState<{ firstName: string; lastName: string; email: string } | null>(null)
  const [historyItems, setHistoryItems] = useState<Array<{ id: string; emailContent: string; tone: string; reply: string; createdAt: string }>>([])
  const [detectedTone, setDetectedTone] = useState("")
  const [isFallbackResponse, setIsFallbackResponse] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  // Check authentication on component mount
  useEffect(() => {
    checkAuth()
    fetchHistory()
  }, [])

  const checkAuth = async () => {
    try {
      const response = await fetch("/api/auth/me")
      if (response.ok) {
        const userData = await response.json()
        setUser(userData.user)
      } else {
        // Redirect to login if not authenticated
        window.location.href = "/auth/login"
      }
    } catch (error) {
      window.location.href = "/auth/login"
    }
  }

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" })
      window.location.href = "/"
    } catch (error) {
      toast({
        title: "Logout failed",
        description: "Please try again.",
        variant: "destructive",
      })
    }
  }

  const fetchHistory = async () => {
    try {
      const res = await fetch("/api/history")
      if (!res.ok) return
      const data = await res.json()
      setHistoryItems(data.items || [])
    } catch {}
  }

  const tones = [
    { value: "formal", label: "Formal" },
    { value: "friendly", label: "Friendly" },
    { value: "concise", label: "Concise" },
    { value: "empathetic", label: "Empathetic" },
    { value: "professional", label: "Professional" },
    { value: "casual", label: "Casual" },
    { value: "urgent", label: "Urgent" },
    { value: "apologetic", label: "Apologetic" },
    { value: "persuasive", label: "Persuasive" },
    { value: "enthusiastic", label: "Enthusiastic" },
    { value: "diplomatic", label: "Diplomatic" },
    { value: "analytical", label: "Analytical" },
    { value: "supportive", label: "Supportive" },
    { value: "reassuring", label: "Reassuring" },
    { value: "assertive", label: "Assertive" },
    { value: "appreciative", label: "Appreciative" },
    { value: "instructional", label: "Instructional" },
    { value: "humorous", label: "Humorous" },
    { value: "inspirational", label: "Inspirational" },
    { value: "neutral", label: "Neutral" },
    { value: "technical", label: "Technical" },
    { value: "legal", label: "Legal" },
    { value: "sales", label: "Sales" },
    { value: "clarifying", label: "Clarifying" },
    { value: "followup", label: "Follow-up" },
    { value: "celebratory", label: "Celebratory" },
  ]

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const content = e.target?.result as string
        setEmailContent(content)
        toast({
          title: "File uploaded successfully",
          description: `${file.name} has been loaded.`,
        })
      }
      reader.readAsText(file)
    }
  }

  const handleGenerateReply = async () => {
    if (!emailContent.trim()) {
      toast({
        title: "Error",
        description: "Please enter email content first.",
        variant: "destructive",
      })
      return
    }

    setIsGenerating(true)
    try {
      const response = await fetch("/api/generate-reply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          emailContent: emailContent.trim(),
          tone: selectedTone || undefined, // Send undefined if no tone selected for auto-detection
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate reply")
      }

      const data = await response.json()
      setGeneratedReply(data.reply)
      setDetectedTone(data.detectedTone || selectedTone)
      setIsFallbackResponse(data.isFallback || false)
      
      // Refresh history after generating new reply
      await fetchHistory()

      // Show appropriate toast based on response type
      if (data.isFallback) {
        toast({
          title: "Fallback Response",
          description: data.message || "Using template response. Configure OpenAI API for AI-powered replies.",
          variant: "default",
        })
      } else {
        toast({
          title: "Success!",
          description: `Generated ${data.detectedTone || selectedTone} reply with AI.`,
        })
      }
    } catch (error) {
      console.error("Error generating reply:", error)
      toast({
        title: "Error",
        description: "Failed to generate reply. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedReply)
      toast({
        title: "Copied to clipboard",
        description: "Reply has been copied to your clipboard.",
      })
    } catch (error) {
      toast({
        title: "Copy failed",
        description: "Failed to copy to clipboard.",
        variant: "destructive",
      })
    }
  }

  const downloadAsEml = async () => {
    try {
      const response = await fetch("/api/download-eml", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          reply: generatedReply,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate EML file")
      }

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = "email-reply.eml"
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)

      toast({
        title: "Download started",
        description: "EML file is being downloaded.",
      })
    } catch (error) {
      toast({
        title: "Download failed",
        description: "Failed to download EML file.",
        variant: "destructive",
      })
    }
  }

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDarkMode
          ? "bg-gradient-to-br from-gradientFrom/80 via-gradientTo/90 to-gradientFrom/80"
          : "bg-gradient-to-br from-gradientFrom/60 via-white to-gradientTo/80"
      }`}
    >
      {/* Header */}
      <header
        className={`border-b backdrop-blur-sm sticky top-0 z-50 transition-colors duration-300 ${
          isDarkMode ? "border-primary/40 bg-gradientFrom/80" : "border-primary/10 bg-white/80"
        }`}
      >
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2">
              <ArrowLeft className={`w-5 h-5 ${isDarkMode ? "text-primary/70" : "text-primary"}`} />
            </Link>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <Mail className="w-5 h-5 text-white" />
              </div>
              <span
                className={`text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent`}
              >
                MailGenie Dashboard
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {user && (
              <div className={`flex items-center space-x-2 mr-4 ${isDarkMode ? "text-primary/70" : "text-primary"}`}> 
                <User className="w-4 h-4" />
                <span className="text-sm font-medium">
                  {user.firstName} {user.lastName}
                </span>
              </div>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`${isDarkMode ? "text-primary/70 hover:text-primary/90" : "text-primary hover:text-secondary"}`}
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLogout}
              className={`${isDarkMode ? "text-primary/70 hover:text-primary/90" : "text-primary hover:text-secondary"}`}
            >
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Main Content */}
        <div className="space-y-6">
          {/* Welcome Section */}
          <Card
            className={`transition-colors duration-300 ${
              isDarkMode ? "bg-gradientFrom/40 border-primary/40" : "bg-white/60 border-primary/10"
            }`}
          >
            <CardHeader>
              <CardTitle className={`text-xl ${isDarkMode ? "text-primary/90" : "text-primary"}`}> 
                Welcome back, {user?.firstName}!
              </CardTitle>
              <p className={`text-sm ${isDarkMode ? "text-primary/70" : "text-primary/70"}`}> 
                Ready to generate intelligent email replies? Let's get started.
              </p>
            </CardHeader>
          </Card>

          {/* AI Email Reply Generator */}
          <Card
            className={`transition-colors duration-300 ${
              isDarkMode ? "bg-gradientFrom/40 border-primary/40" : "bg-white/60 border-primary/10"
            }`}
          >
            <CardHeader>
              <CardTitle className={`text-lg ${isDarkMode ? "text-primary/90" : "text-primary"}`}> 
                AI Email Reply Generator
              </CardTitle>
              <p className={`text-sm ${isDarkMode ? "text-primary/70" : "text-primary/70"}`}> 
                Paste an email and get an instant AI-powered reply. Tone will be auto-detected if not selected.
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="email-content" className={isDarkMode ? "text-primary/80" : "text-primary"}>
                  Email Content
                </Label>
                <Textarea
                  id="email-content"
                  placeholder="Paste the email you want to reply to..."
                  value={emailContent}
                  onChange={(e) => setEmailContent(e.target.value)}
                  className={`mt-1 transition-colors duration-300 ${
                    isDarkMode
                      ? "bg-gradientFrom/30 border-primary/40 text-primary/90 placeholder:text-primary/60"
                      : "bg-white/80 border-primary/20 text-primary placeholder:text-primary/50"
                  }`}
                  rows={6}
                />
              </div>

              <div>
                <Label htmlFor="tone-select" className={isDarkMode ? "text-primary/80" : "text-primary"}>
                  Tone (Optional - Auto-detected if not selected)
                </Label>
                <Select value={selectedTone} onValueChange={setSelectedTone}>
                  <SelectTrigger
                    className={`mt-1 transition-colors duration-300 ${
                      isDarkMode
                        ? "bg-gradientFrom/30 border-primary/40 text-primary/90"
                        : "bg-white/80 border-primary/20 text-primary"
                    }`}
                  >
                    <SelectValue placeholder="Select tone or let AI choose..." />
                  </SelectTrigger>
                  <SelectContent>
                    {tones.map((t) => (
                      <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button
                onClick={handleGenerateReply}
                disabled={isGenerating || !emailContent.trim()}
                className={`w-full transition-colors duration-300 ${
                  isDarkMode
                    ? "bg-primary hover:bg-secondary text-white"
                    : "bg-primary hover:bg-secondary text-white"
                }`}
              >
                {isGenerating ? (
                  <>
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Generating Reply...
                  </>
                ) : (
                  "Generate AI Reply"
                )}
              </Button>

              {detectedTone && (
                <div className="flex items-center gap-2">
                  <Badge className={isDarkMode ? "bg-primary/40 text-primary/90" : "bg-primary/10 text-primary"}>
                    {selectedTone ? "Selected" : "Auto-detected"}: {detectedTone}
                  </Badge>
                </div>
              )}

              {generatedReply && (
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-2">
                    <Label className={isDarkMode ? "text-purple-200" : "text-gray-700"}>Generated Reply</Label>
                    {isFallbackResponse && (
                      <Badge variant="outline" className={isDarkMode ? "border-orange-500 text-orange-400" : "border-orange-400 text-orange-600"}>
                        Template Response
                      </Badge>
                    )}
                  </div>
                  <div
                    className={`mt-1 rounded-md border p-3 transition-colors duration-300 ${
                      isDarkMode
                        ? "bg-gradientFrom/20 border-primary/40 text-primary/90"
                        : "bg-white/60 border-primary/20 text-primary"
                    }`}
                  >
                    <pre className="whitespace-pre-wrap font-sans text-sm">{generatedReply}</pre>
                  </div>
                  <div className="flex flex-col gap-2 mt-2">
                    <Button
                      onClick={() => {
                        navigator.clipboard.writeText(generatedReply)
                        toast({
                          title: "Copied!",
                          description: "Reply copied to clipboard.",
                        })
                      }}
                      variant="outline"
                      size="sm"
                      className={`transition-colors duration-300 ${
                        isDarkMode
                          ? "border-primary/40 text-primary/90 hover:bg-primary/20"
                          : "border-primary/20 text-primary hover:bg-primary/10"
                      }`}
                    >
                      Copy to Clipboard
                    </Button>
                    {isFallbackResponse && (
                      <div className={`text-xs p-2 rounded-md ${
                        isDarkMode 
                          ? "bg-orange-900/20 border border-orange-700/50 text-orange-300" 
                          : "bg-orange-50 border border-orange-200 text-orange-700"
                      }`}>
                        💡 <strong>Tip:</strong> Configure your OpenAI API key in <code>.env.local</code> to get AI-powered responses instead of templates.
                      </div>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Tips Section */}
          <Card
            className={`mt-8 transition-colors duration-300 ${
              isDarkMode ? "bg-gradientFrom/40 border-primary/40" : "bg-white/60 border-primary/10"
            }`}
          >
            <CardHeader>
              <CardTitle className={`text-lg ${isDarkMode ? "text-primary/90" : "text-primary"}`}> 
                💡 Tips for Better Results
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className={`p-4 rounded-lg ${isDarkMode ? "bg-gradientFrom/20" : "bg-primary/5"}`}> 
                  <h4 className={`font-semibold mb-2 ${isDarkMode ? "text-primary/80" : "text-primary"}`}> 
                    📧 Include Context
                  </h4>
                  <p className={`text-sm ${isDarkMode ? "text-primary/70" : "text-primary/70"}`}> 
                    Provide the full email content for better context-aware replies.
                  </p>
                </div>
                <div className={`p-4 rounded-lg ${isDarkMode ? "bg-gray-700/30" : "bg-purple-50/50"}`}>
                  <h4 className={`font-semibold mb-2 ${isDarkMode ? "text-purple-200" : "text-gray-800"}`}>
                    🎯 Tone Selection
                  </h4>
                  <p className={`text-sm ${isDarkMode ? "text-purple-300" : "text-gray-600"}`}>
                    Let AI auto-detect tone or manually select for specific needs.
                  </p>
                </div>
                <div className={`p-4 rounded-lg ${isDarkMode ? "bg-gray-700/30" : "bg-purple-50/50"}`}>
                  <h4 className={`font-semibold mb-2 ${isDarkMode ? "text-purple-200" : "text-gray-800"}`}>
                    ✨ Review & Edit
                  </h4>
                  <p className={`text-sm ${isDarkMode ? "text-purple-300" : "text-gray-600"}`}>
                    Always review generated replies before sending.
                  </p>
                </div>
                <div className={`p-4 rounded-lg ${isDarkMode ? "bg-gray-700/30" : "bg-purple-50/50"}`}>
                  <h4 className={`font-semibold mb-2 ${isDarkMode ? "text-purple-200" : "text-gray-800"}`}>
                    📚 History
                  </h4>
                  <p className={`text-sm ${isDarkMode ? "text-purple-300" : "text-gray-600"}`}>
                    Check your recent replies below for reference.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* History Section */}
          <Card
            className={`mt-8 transition-colors duration-300 ${
              isDarkMode ? "bg-gradientFrom/40 border-primary/40" : "bg-white/60 border-primary/10"
            }`}
          >
            <CardHeader>
              <CardTitle className={`text-lg ${isDarkMode ? "text-primary/90" : "text-primary"}`}> 
                Recent Replies
              </CardTitle>
            </CardHeader>
            <CardContent>
              {historyItems.length === 0 ? (
                <div className={`text-sm ${isDarkMode ? "text-primary/70" : "text-primary/70"}`}>No history yet.</div>
              ) : (
                <div className="space-y-4">
                  {historyItems.slice(0, 5).map((item) => (
                    <div key={item.id} className={`p-4 rounded-lg border ${isDarkMode ? "border-primary/40" : "border-primary/10"}`}>
                      <div className="flex items-center justify-between mb-2">
                        <Badge className={isDarkMode ? "bg-primary/40 text-primary/90" : "bg-primary/10 text-primary"}>{item.tone}</Badge>
                        <div className={`text-xs ${isDarkMode ? "text-primary/70" : "text-primary/50"}`}>{new Date(item.createdAt).toLocaleString()}</div>
                      </div>
                      <div className={`text-xs ${isDarkMode ? "text-primary/70" : "text-primary/50"}`}>Input:</div>
                      <div className={`text-sm mb-2 ${isDarkMode ? "text-primary/90" : "text-primary"}`}>{item.emailContent.slice(0, 160)}{item.emailContent.length > 160 ? "…" : ""}</div>
                      <div className={`text-xs ${isDarkMode ? "text-primary/70" : "text-primary/50"}`}>Reply:</div>
                      <div className={`text-sm ${isDarkMode ? "text-primary/90" : "text-primary"}`}>{item.reply.slice(0, 200)}{item.reply.length > 200 ? "…" : ""}</div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
