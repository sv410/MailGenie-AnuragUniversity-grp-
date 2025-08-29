"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Mail, Zap, Palette, Chrome, Shield, Download, ArrowRight, Sparkles, MessageSquare, CheckCircle, Menu, X, Star, Users, Clock, TrendingUp } from "lucide-react"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"

export default function HomePage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
  const handleDownload = (os: "mac" | "win") => {
    window.location.href = `/api/download-extension?os=${os}`
  }

  const features = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Generate professional email replies in under 10 seconds",
    color: "from-primary to-secondary"
    },
    {
      icon: Palette,
      title: "Smart Tones",
      description: "AI adapts to your writing style and relationship context",
    color: "from-primary to-secondary"
    },
    {
      icon: Shield,
      title: "Privacy First",
      description: "Your data never leaves your control - end-to-end encrypted",
    color: "from-primary to-secondary"
    },
    {
      icon: Chrome,
      title: "Seamless Integration",
      description: "Works directly in Gmail with our Chrome extension",
    color: "from-primary to-secondary"
    },
    {
      icon: Download,
      title: "Export Ready",
      description: "Download as .eml or copy to clipboard instantly",
    color: "from-primary to-secondary"
    },
    {
      icon: MessageSquare,
      title: "Context Aware",
      description: "Understands email threads and maintains conversation flow",
    color: "from-primary to-secondary"
    }
  ]

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Product Manager",
      company: "TechCorp",
      content: "MailGenie has cut my email response time by 80%. The AI understands context perfectly.",
      rating: 5,
      avatar: "SC"
    },
    {
      name: "Marcus Rodriguez",
      role: "Sales Director",
      company: "Growth Inc",
      content: "The Chrome extension is a game-changer. I can reply to emails without leaving Gmail.",
      rating: 5,
      avatar: "MR"
    },
    {
      name: "Emma Thompson",
      role: "Customer Success",
      company: "StartupXYZ",
      content: "Professional, friendly, concise - MailGenie nails every tone I need for different audiences.",
      rating: 5,
      avatar: "ET"
    }
  ]

  const stats = [
    { number: "50K+", label: "Emails Generated", icon: MessageSquare },
    { number: "95%", label: "Time Saved", icon: Clock },
    { number: "4.9", label: "User Rating", icon: Star },
    { number: "10K+", label: "Active Users", icon: Users }
  ]

  return (
  <div className="min-h-screen bg-gradient-to-br from-gradientFrom/60 to-gradientTo/80">
      {/* Navigation */}
  <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-primary/20 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <Mail className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-primary">MailGenie</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="#why" className="text-primary/70 hover:text-primary transition-colors text-sm font-medium">
                Why MailGenie
              </Link>
              <Link href="#features" className="text-primary/70 hover:text-primary transition-colors text-sm font-medium">
                Features
              </Link>
              <Link href="#pricing" className="text-primary/70 hover:text-primary transition-colors text-sm font-medium">
                Pricing
              </Link>
              <Link href="/auth/login" className="text-primary/70 hover:text-primary transition-colors text-sm font-medium">
                Sign In
              </Link>
              <Link href="/auth/signup">
                <Button className="bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary text-white px-6 py-2 rounded-lg text-sm font-medium transition-all duration-200">
                  Get Started
                </Button>
              </Link>
              <div className="pl-2">
                <ThemeToggle />
              </div>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-primary/70" />
              ) : (
                <Menu className="w-6 h-6 text-primary/70" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-primary/20 shadow-lg">
              <div className="px-4 py-6 space-y-4">
                <Link
                  href="#why"
                  className="block text-primary/70 hover:text-primary transition-colors text-sm font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Why MailGenie
                </Link>
                <Link
                  href="#features"
                  className="block text-primary/70 hover:text-primary transition-colors text-sm font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
              Features
            </Link>
                <Link
                  href="#pricing"
                  className="block text-primary/70 hover:text-primary transition-colors text-sm font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
              Pricing
            </Link>
                <Link
                  href="/auth/login"
                  className="block text-primary/70 hover:text-primary transition-colors text-sm font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/signup"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Button className="w-full bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary text-white py-2 rounded-pill text-sm font-medium">
                    Get Started
                  </Button>
            </Link>
                <div className="pt-2">
                  <ThemeToggle />
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 px-4 py-2 rounded-full text-sm font-medium">
            <Sparkles className="w-4 h-4 mr-2" />
            Minimal, classic, and fast
          </Badge>
          
          <div className="relative rounded-3xl bg-gradient-to-br from-gradientFrom/60 to-gradientTo/80 shadow-sm px-6 py-12 mb-10 flex flex-col items-center overflow-hidden">
            <img 
              src="/genieee.png" 
              alt="Genie mascot" 
              className="absolute left-1/2 top-1/2 w-[420px] max-w-full opacity-10 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none"
              aria-hidden="true"
            />
            <h1 className="relative z-10 text-5xl md:text-6xl font-semibold tracking-tight text-black mb-6 leading-tight text-center">
              Write better emails, faster with MailGenie
            </h1>
            <p className="relative z-10 text-xl text-black max-w-2xl mx-auto leading-relaxed text-center">
              A focused email assistant that keeps things simple: clear replies, classic tone options,
              and a clean interface that gets out of your way.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Link href="/auth/signup">
              <Button className="bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary text-white px-8 py-4 rounded-pill text-lg font-medium transition-all duration-200">
                Get Started Free
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/auth/login">
              <Button variant="outline" className="border-primary text-primary hover:bg-primary/10 px-8 py-4 rounded-pill text-lg font-medium transition-all duration-200">
                Sign In
              </Button>
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="border-primary text-primary hover:bg-primary/10 px-8 py-4 rounded-pill text-lg font-medium transition-all duration-200">
                  <Chrome className="mr-2 w-5 h-5" />
                  Download Extension
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="w-56">
                <DropdownMenuItem onClick={() => handleDownload("mac")}>
                  Download for macOS (.dmg)
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleDownload("win")}>
                  Download for Windows (.exe)
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <stat.icon className="w-5 h-5 text-primary/40 mr-2" />
                  <div className="text-2xl font-bold text-primary">{stat.number}</div>
                </div>
                <div className="text-sm text-primary/70">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why MailGenie (concise value props) */}
  <section id="why" className="py-16 px-4 sm:px-6 lg:px-8 border-t border-primary/10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-semibold text-primary mb-4">Why MailGenie</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Purpose-built for professionals who want fewer clicks, cleaner UX, and consistently
              excellent replies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="group rounded-xl border border-primary/10 bg-white p-6 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-primary to-secondary text-white flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <span className="text-sm font-semibold">01</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Minimal by design</h3>
              <p className="text-gray-600">No clutter. Just the essentials to craft the right reply, every time.</p>
            </div>
            <div className="group rounded-xl border border-primary/10 bg-white p-6 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-primary to-secondary text-white flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <span className="text-sm font-semibold">02</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Classic UX that feels familiar</h3>
              <p className="text-gray-600">Clean typography, intuitive controls, and accessible defaults.</p>
            </div>
            <div className="group rounded-xl border border-primary/10 bg-white p-6 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-primary to-secondary text-white flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <span className="text-sm font-semibold">03</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Built for speed</h3>
              <p className="text-gray-600">From tone selection to copy, everything is optimized for quick flow.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything you need to write better emails
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Powerful features designed to make email communication effortless and professional.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-all duration-300 bg-white">
                <CardContent className="p-6">
                  <div className={`w-12 h-12 bg-gradient-to-br ${feature.color} rounded-lg flex items-center justify-center mb-4`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How it works
            </h2>
            <p className="text-lg text-gray-600">
              Three simple steps to perfect email replies
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Paste your email",
                description: "Copy the email you want to reply to or upload an .eml file",
                icon: MessageSquare
              },
              {
                step: "2",
                title: "Choose your tone",
                description: "Select from formal, friendly, concise, or empathetic styles",
                icon: Palette
              },
              {
                step: "3",
                title: "Get your reply",
                description: "Receive a professional, context-aware response instantly",
                icon: Download
              }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-sm font-semibold text-primary mb-2 uppercase tracking-wide">
                  Step {item.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Loved by professionals worldwide
            </h2>
            <p className="text-lg text-gray-600">
              See what our users have to say about MailGenie
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-sm bg-white">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white font-semibold mr-4">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                      <p className="text-sm text-gray-600">{testimonial.role} at {testimonial.company}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-4 italic">"{testimonial.content}"</p>
                  <div className="flex items-center">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Simple, transparent pricing
            </h2>
            <p className="text-lg text-primary/70">
              Start free and upgrade when you need more
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Free Plan */}
            <Card className="border-2 border-primary/10 bg-white">
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-primary mb-2">Free</h3>
                  <div className="text-4xl font-bold text-primary mb-2">$0</div>
                  <p className="text-primary/70">Perfect for getting started</p>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-gray-700">10 AI-generated replies per month</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-gray-700">Basic tone options</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-gray-700">Email export (.eml)</span>
                  </li>
                </ul>
                <Link href="/auth/signup">
                  <Button className="w-full bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary text-white py-3 rounded-pill font-medium">
                    Get Started Free
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Pro Plan */}
            <Card className="border-2 border-primary bg-white relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-primary text-white px-4 py-1 rounded-full text-sm">
                  Most Popular
                </Badge>
              </div>
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-primary mb-2">Pro</h3>
                  <div className="text-4xl font-bold text-primary mb-2">$9</div>
                  <p className="text-primary/70">per month</p>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-gray-700">Unlimited AI-generated replies</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-gray-700">All tone options</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-gray-700">Chrome extension</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-gray-700">Priority support</span>
                  </li>
                </ul>
                <Link href="/auth/signup">
                  <Button className="w-full bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary text-white py-3 rounded-pill font-medium">
                    Start Pro Trial
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Enterprise Plan */}
            <Card className="border-2 border-primary/10 bg-white">
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-primary mb-2">Enterprise</h3>
                  <div className="text-4xl font-bold text-primary mb-2">Custom</div>
                  <p className="text-primary/70">For large organizations</p>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-gray-700">Everything in Pro</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-gray-700">Custom integrations</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-gray-700">Dedicated support</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-gray-700">SLA guarantees</span>
                  </li>
                </ul>
                <Link href="/contact">
                  <Button className="w-full bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary text-white py-3 rounded-pill font-medium">
                    Contact Sales
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
  <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary to-secondary">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to transform your email workflow?
          </h2>
          <p className="text-xl text-white mb-10">
            Join thousands of professionals who save hours every week with MailGenie.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/signup">
              <Button className="bg-white text-primary hover:bg-primary/10 px-8 py-4 rounded-pill text-lg font-medium transition-all duration-200">
                Start Free Trial
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/auth/login">
              <Button variant="outline" className="bg-white/10 border-white/40 text-white hover:bg-white/20 hover:border-white/50 px-8 py-4 rounded-lg text-lg font-medium">
                Sign In
              </Button>
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="bg-white/10 border-white/40 text-white hover:bg-white/20 hover:border-white/50 px-8 py-4 rounded-lg text-lg font-medium">
                  <Chrome className="mr-2 w-5 h-5" />
                  Download Extension
            </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="w-56">
                <DropdownMenuItem onClick={() => handleDownload("mac")}>
                  Download for macOS (.dmg)
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleDownload("win")}>
                  Download for Windows (.exe)
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <Mail className="w-5 h-5 text-primary" />
              </div>
              <span className="text-xl font-bold text-gray-900">MailGenie</span>
            </div>
            <div className="text-gray-600 text-sm">© 2025 MailGenie. All rights reserved.</div>
          </div>
        </div>
      </footer>
    </div>
  )
}
