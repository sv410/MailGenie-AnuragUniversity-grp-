"use client"
import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const isDark = resolvedTheme === "dark"
  const handleToggle = () => setTheme(isDark ? "light" : "dark")

  return (
    <button
      aria-label="Toggle theme"
      className="inline-flex items-center justify-center rounded-md border p-2 border-primary hover:bg-gradient-to-br hover:from-primary hover:to-secondary border-opacity-40 text-primary hover:bg-primary/10 dark:border-secondary dark:text-secondary dark:hover:bg-secondary/20"
      onClick={handleToggle}
      type="button"
    >
      {mounted ? (isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />) : <Moon className="h-4 w-4" />}
    </button>
  )
}


