"use client"
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" aria-label="Loading theme">
        <span className="sr-only">Loading theme...</span>
      </Button>
    )
  }

  return (
    <Button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      variant={"outline"}
      size="icon"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      className="rounded-full dark:bg-transparent dark:hover:bg-[#3C4048] 
      dark:hover:text-white dark:border dark:border-[#404258]"
    >
      {theme === 'dark' ? (
        <Sun className="h-5 w-5 text-light" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
      <span className="sr-only">{theme === 'dark' ? 'Light' : 'Dark'} mode</span>
    </Button>
  )
}