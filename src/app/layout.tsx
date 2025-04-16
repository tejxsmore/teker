import './globals.css'
import { GeistSans } from 'geist/font/sans';
import ThemeWrapper from './ThemeProvider';
import { Toaster } from 'react-hot-toast'
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/next"

import { type Metadata } from 'next'
import { ClerkProvider } from '@clerk/nextjs'

export const metadata: Metadata = {
  title: 'Teker',
  description: 'Indias Number 1 Markeplace for Tech products and Comparison',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className={GeistSans.className} suppressHydrationWarning>
        <body>
          <ThemeWrapper>
              <Toaster
                position="bottom-center"
                toastOptions={{
                  duration: 3000,
                  className: 'mb-16 lg:mb-4',
                  style: {
                    borderRadius: '20px',
                    background: '#222222',
                    border: '1px solid #1DCD9F',
                    padding: '12px 16px',
                    color: '#F1EFEC',
                  },
                }}
              />
              {children}
          </ThemeWrapper>
        </body>
      </html>
    </ClerkProvider>
  )
}