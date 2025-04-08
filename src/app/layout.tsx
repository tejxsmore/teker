import './globals.css'
import { GeistSans } from 'geist/font/sans';
import ThemeWrapper from './ThemeProvider';

import { type Metadata } from 'next'
import { ClerkProvider } from '@clerk/nextjs'
import Navbar from '@/components/navbar/Navbar';
import Footer from '@/components/Footer';

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
            <div className="bg-[#F2613F] h-6"></div>
              <Navbar />
              {children}
              <Footer />
          </ThemeWrapper>
        </body>
      </html>
    </ClerkProvider>
  )
}