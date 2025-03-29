"use client"
import { ThemeProvider } from "next-themes"

export default function ThemeWrapper({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ThemeProvider 
      attribute="class"
      defaultTheme="system"
      enableSystem={true}
    >
      {children}
    </ThemeProvider>
  )
}