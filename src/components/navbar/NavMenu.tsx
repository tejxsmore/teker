'use client'
import { useState, useRef, useEffect } from "react"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"

const categories = [
  {
    name: "Electronics",
    img: "📱",
    subItems: ["Smart Phones", "Tablets", "Laptops", "Earbuds","Headphones",
    "Speakers", "Smart Watch", "Smart Rings", "Microphones", "Drones", "E-readers"]
  },
  {
    name: "Computers",
    img:"🖥️",
    subItems: ["Monitors", "Keyboards", "Mice", "Webcams", "External HDD & SSD",
    "Graphic Cards (GPUs)", "Motherboards", "RAM & Storage"]
  },
  {
    name: "Gaming",
    img:"🎮",
    subItems: ["Gaming Laptop", "Consoles", "Controllers", "Games", "Gaming Headsets", 
    "VR Headsets"]
  },
  {
    name: "Cameras",
    img:"📷",
    subItems: ["DSLR", "Mirrorless", "Full Frame", "Action Cameras", "Lenses",
    "Tripods & Mounts", "Memory Cards", "Camera Bags"]
  },
  {
    name: "Car Tech",
    img:"🚗",
    subItems: ["Dash Cams", "GPS Systems", "Car Chargers", 
    "Bluetooth Car Kits", "Smart Tire Sensors"]
  },
  {
    name: "Smart Home",
    img:"🏠",
    subItems: ["Smart Assistants", "Home Audio", "Smart Security","Routers & Modems", 
    "Smart Lights", "Smart Plugs", ]
  },
  {
    name: "Peripherals",
    img:"🛜",
    subItems: ["Solar Chargers","Smart Batteries","Energy Monitors","Cables", 
    "Adapters", "Cooling Pads"]
  },
  {
    name: "Accessory",
    img:"🔌",
    subItems: ["Chargers", "Phone Cases", "Screen Protectors", "Laptop bags", 
    "Camera Bags", "Charging Cables", "Power Banks", "Wireless Chargers", "Screen Cleaners"]
  },
]

const toKebabCase = (str: string) =>
  str.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '')

export default function NavMenu() {
  const [openMenu, setOpenMenu] = useState(false)
  const [menuTop, setMenuTop] = useState(0)
  const [selectedCategory, setSelectedCategory] = useState(categories[0])
  const iconRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  useEffect(() => {
    if (iconRef.current) {
      setMenuTop(iconRef.current.getBoundingClientRect().bottom)
    }
  }, [openMenu])

  useEffect(() => {
    setOpenMenu(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = openMenu ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [openMenu])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenMenu(false)
      }
    }
  
    if (openMenu) {
      document.addEventListener('keydown', handleKeyDown)
    } else {
      document.removeEventListener('keydown', handleKeyDown)
    }
  
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [openMenu])
  
  return (
    <div className="flex items-center relative">
      <div
        onClick={() => setOpenMenu(!openMenu)}
        ref={iconRef}
        className="lg:hidden text-3xl cursor-pointer z-50"
      >
        {openMenu ? <X /> : <Menu />}
      </div>

      <AnimatePresence>
        {openMenu && (
          <>
            <motion.div
              className="fixed inset-0 z-30 bg-black/30"
              onClick={() => setOpenMenu(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

              <motion.div
                className="fixed left-0 mt-7 w-full bg-[#F7F7F7] dark:bg-[#1f1f23] z-40"
                style={{ top: `${menuTop}px`, height: `calc(100vh - ${menuTop}px)` }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="border-t border-[#D8D9CF] dark:border-[#404258] flex h-full pb-22">

                  <div className="w-32 bg-[#F7F7F7] dark:bg-[#1f1f23] overflow-y-auto
                    border-r border-[#D8D9CF] dark:border-[#404258] p-5 space-y-5">
                    {categories.map((cat) => (
                      <button
                        key={cat.name}
                        onClick={() => setSelectedCategory(cat)}
                        className={`w-full rounded-[20px] p-3 flex items-center justify-center 
                          text-center flex border flex-col space-y-3 cursor-pointer
                          ${selectedCategory.name === cat.name ? 
                          "bg-[#F2613F] border-[#D84040] " : 
                          "hover:bg-[#FEF3E2] dark:hover:bg-[#1A1A1D] hover:border-[#F2613F] dark:hover:border-[#F2613F] border-[#D8D9CF] dark:border-[#404258]"}`}
                      >
                        <span className="text-3xl">{cat.img}</span>
                        <span className="text-sm break-words leading-tight">{cat.name}</span>
                      </button>
                    ))}
                  </div>

                  
                  <div className="flex-1 p-5 overflow-y-auto space-y-5">
                    <h2 className="text-xl font-semibold">{selectedCategory.name}</h2>

                    <div className="flex flex-wrap -m-2">
                      {selectedCategory.subItems.map((item) => (
                        <div key={item} className="w-1/2 md:w-1/3 p-2.5">
                          <Link href={`/${toKebabCase(item)}/`}>
                            <div className="h-24 rounded-[20px] p-4 flex items-center justify-center
                              border border-[#D8D9CF] dark:border-[#404258]
                              text-sm text-center leading-snug break-words overflow-hidden
                              dark:hover:bg-[#1A1A1D] hover:border-[#F2613F] 
                              transition hover:scale-102 hover:delay-75 cursor-pointer">
                              <span>{item}</span>
                            </div>
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

              </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}