'use client'

import { usePathname } from 'next/navigation'
import { Home, BadgeCheck, BarChart2, User } from 'lucide-react'
import Link from 'next/link'

export default function MobileTabs() {
  const pathname = usePathname()

  const tabs = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/brands', label: 'Brands', icon: BadgeCheck  },
    { href: '/compare', label: 'Compare', icon: BarChart2 },
    { href: '/profile', label: 'Profile', icon: User },
  ]

  return (
    <div className="lg:hidden fixed bottom-0 w-full bg-[#F7F7F7] dark:bg-[#1f1f23] 
    border-t border-[#D8D9CF] dark:border-[#404258] z-50">
      <div className="flex justify-between px-6 py-2">
        {tabs.map((tab) => {
          const isActive = pathname === tab.href
          const Icon = tab.icon
          const colorClass = isActive ? 'text-[#F2613F]' : 'text-[#3C3D37] dark:text-[#D0DDD0]'

          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`flex flex-col items-center text-sm ${colorClass}`}
            >
              <Icon size={20} strokeWidth={1.5} className={colorClass} />
              <span className={`pt-1 ${colorClass}`}>{tab.label}</span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}