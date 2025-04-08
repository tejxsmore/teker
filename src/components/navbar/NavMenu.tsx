'use client'
import { useState, useRef, useEffect } from "react"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"

export default function NavMenu() {
  const [openMenu, setOpenMenu] = useState(false)
  const [menuTop, setMenuTop] = useState(0)
  const iconRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  useEffect(() => {
    if (iconRef.current) {
      setMenuTop(iconRef.current.getBoundingClientRect().bottom)
    }
  }, [openMenu])

  // Close menu when route/path changes
  useEffect(() => {
    setOpenMenu(false)
  }, [pathname])

  // Optional: lock scroll when menu is open
  useEffect(() => {
    if (openMenu) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [openMenu])

  return (
    <div className="flex items-center relative">
      <div
        onClick={() => setOpenMenu(!openMenu)}
        ref={iconRef}
        id="openModal"
        className="lg:hidden text-3xl cursor-pointer z-50"
      >
        {!openMenu ? <Menu /> : <X />}
      </div>

      <AnimatePresence>
        {openMenu && (
          <>
            {/* Invisible interaction blocker */}
            <motion.div
              className="fixed inset-0 z-30 pointer-events-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <motion.div
              className="p-5 space-y-5 fixed left-0 mt-7 w-full bg-[#F7F7F7] dark:bg-[#1f1f23] 
              z-40"
              style={{ top: `${menuTop}px`, height: `calc(100vh - ${menuTop}px)` }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-col space-y-5">
                <div className="flex flex-col space-y-1.5">
                  <Link href="/categories" className="text-xl font-bold">Categories</Link>
                  <Link href="/categories/smartphones">Smartphones</Link>
                  <Link href="/categories/tablets">Tablets</Link>
                  <Link href="/categories/laptops">Laptops</Link>
                  <Link href="/categories/headphones">Headphones</Link>
                  <Link href="/categories/home-audio">Home Audio</Link>
                </div>

                <div className="flex flex-col space-y-1.5">
                  <Link href="/brands" className="text-xl font-bold">Brands</Link>
                  <Link href="/brands/apple">Apple</Link>
                  <Link href="/brands/samsung">Samsung</Link>
                  <Link href="/brands/google">Google</Link>
                  <Link href="/brands/xiaomi">Xiaomi</Link>
                  <Link href="/brands/oneplus">Oneplus</Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
