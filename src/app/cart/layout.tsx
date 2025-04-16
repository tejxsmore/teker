import "../globals.css"
import { ReactNode } from 'react'
import Navbar from '@/components/navbar/Navbar'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Profile',
  description: 'User profile in Teker',
}

export default function CartLayout({ children }: { children: ReactNode }) {
  return (
      <div>
        <div className="bg-[#F2613F] h-6"></div>
        <Navbar />
        {children}
        <Footer />
    </div>
  )
}