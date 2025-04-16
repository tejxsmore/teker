'use client'

import { useState, useRef, useEffect } from "react"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

const categories = [
  {
    name: "Electronics",
    img: "📱",
    subItems: [
      { name: "Smart Phones", image: "/assets/category/smartphone.png" },
      { name: "Tablets", image: "/assets/category/tablet.png" },
      { name: "Laptops", image: "/assets/category/laptop.png" },
      { name: "Earbuds", image: "/assets/category/earbuds.png" },
      { name: "Headphones", image: "/assets/category/headphones.png" },
      { name: "Speakers", image: "/assets/category/speaker.png" },
      { name: "Smart Watch", image: "/assets/category/smartwatch.png" },
      { name: "Smart Rings", image: "/assets/category/smartring.png" },
      { name: "Microphones", image: "/assets/category/microphone.png" },
      { name: "Drones", image: "/assets/category/drone.png" },
      { name: "E-readers", image: "/assets/category/e-reader.png" },
    ]
  },
  {
    name: "Computers",
    img: "🖥️",
    subItems: [
      { name: "Monitors", image: "/assets/category/monitor.png" },
      { name: "Keyboards", image: "/assets/category/keyboard.png" },
      { name: "Mice", image: "/assets/category/mice.png" },
      { name: "Webcams", image: "/assets/category/webcam.png" },
      { name: "External HDD & SSD", image: "/assets/category/ssd.png" },
      { name: "Graphic Cards", image: "/assets/category/gpu.png" },
      { name: "Motherboards", image: "/assets/category/motherboard.png" },
      { name: "RAM & Storage", image: "/assets/category/ram.png" },
    ]
  },
  {
    name: "Gaming",
    img: "🎮",
    subItems: [
      { name: "Gaming Laptop", image: "/assets/category/gaming-laptop.png" },
      { name: "Consoles", image: "/assets/category/console.png" },
      { name: "Controllers", image: "/assets/category/controller.png" },
      { name: "Games", image: "/assets/category/game.png" },
      { name: "Gaming Headsets", image: "/assets/category/gaming-headset.png" },
      { name: "VR Headsets", image: "/assets/category/vr.png" },
    ]
  },
  {
    name: "Cameras",
    img: "📷",
    subItems: [
      { name: "DSLR", image: "/assets/category/dslr.png" },
      { name: "Mirrorless", image: "/assets/category/mirrorless.png" },
      { name: "Full Frame", image: "/assets/category/fullframe.png" },
      { name: "Action Cameras", image: "/assets/category/action-camera.png" },
      { name: "Lenses", image: "/assets/category/lens.png" },
      { name: "Tripods & Mounts", image: "/assets/category/tripod.png" },
      { name: "Memory Cards", image: "/assets/category/memory-card.png" },
      { name: "Camera Bags", image: "/assets/category/camera-bag.png" },
    ]
  },
  {
    name: "Car Tech",
    img: "🚗",
    subItems: [
      { name: "Dash Cams", image: "/assets/category/dashcam.png" },
      { name: "GPS Systems", image: "/assets/category/gps.png" },
      { name: "Car Chargers", image: "/assets/category/car-charger.png" },
      { name: "Bluetooth Car Kits", image: "/assets/category/bluetooth-kit.png" },
      { name: "Smart Tire Sensors", image: "/assets/category/tire-sensor.png" },
    ]
  },
  {
    name: "Smart Home",
    img: "🏠",
    subItems: [
      { name: "Smart Assistants", image: "/assets/category/assistant.png" },
      { name: "Home Audio", image: "/assets/category/home-audio.png" },
      { name: "Smart Security", image: "/assets/category/security.png" },
      { name: "Routers & Modems", image: "/assets/category/router.png" },
      { name: "Smart Plugs", image: "/assets/category/smartplug.png" },
    ]
  },
  // {
  //   name: "Peripherals",
  //   img: "🛜",
  //   subItems: [
  //     { name: "Smart Batteries", image: "/assets/category/battery.png" },
  //     { name: "Energy Monitors", image: "/assets/category/energymonitor.png" },
  //     { name: "Cables", image: "/assets/category/cable.png" },
  //     { name: "Adapters", image: "/assets/category/adapter.png" },
  //     { name: "Cooling Pads", image: "/assets/category/cooler.png" },
  //   ]
  // },
  {
    name: "Accessory",
    img: "🔌",
    subItems: [
      { name: "Chargers", image: "/assets/category/charger.png" },
      { name: "Phone Cases", image: "/assets/category/phone-case.png" },
      { name: "Screen Protectors", image: "/assets/category/screen-protector.png" },
      { name: "Laptop bags", image: "/assets/category/laptop-bag.png" },
      // { name: "Camera Bags", image: "/assets/category/camera-bag.png" },
      // { name: "Charging Cables", image: "/assets/category/charging-cable.png" },
      // { name: "Power Banks", image: "/assets/category/powerbank.png" },
      // { name: "Wireless Chargers", image: "/assets/category/wireless-charger.png" },
      // { name: "Screen Cleaners", image: "/assets/category/screen-cleaner.png" },
    ]
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

                {/* Category Buttons */}
                <div className="w-32 bg-[#F7F7F7] dark:bg-[#1f1f23] overflow-y-auto
                  border-r border-[#D8D9CF] dark:border-[#404258] p-5 space-y-5">
                  {categories.map((cat) => (
                    <button
                      key={cat.name}
                      onClick={() => setSelectedCategory(cat)}
                      className={`w-full rounded-[20px] p-3 flex items-center justify-center 
                        text-center flex border flex-col space-y-3 cursor-pointer
                        ${selectedCategory.name === cat.name ?
                          "bg-[#F2613F] border-[#D84040]" :
                          "bg-[#FFFFFF] dark:bg-[#030303] hover:bg-[#FEF3E2] dark:hover:bg-[#1A1A1D] hover:border-[#F2613F] dark:hover:border-[#F2613F] border-[#D8D9CF] dark:border-[#404258]"}`}
                    >
                      <span className="text-3xl">{cat.img}</span>
                      <span className="text-sm break-words leading-tight">{cat.name}</span>
                    </button>
                  ))}
                </div>

                {/* Subcategory Items with Images */}
                <div className="flex-1 p-5 overflow-y-auto space-y-5">
                  <h2 className="text-xl font-semibold">{selectedCategory.name}</h2>

                  <div className="flex flex-wrap -m-2">
                    {selectedCategory.subItems.map((item) => (
                      <div key={item.name} className="w-1/2 md:w-1/3 p-2.5">
                        <Link href={`/${toKebabCase(item.name)}/`}>
                          <div className="h-28 rounded-[20px] p-3 flex flex-col items-center justify-center
                            text-sm text-center leading-snug break-words overflow-hidden
                            dark:hover:bg-[#1A1A1D] hover:border-[#F2613F] 
                            transition hover:scale-102 hover:delay-75 cursor-pointer bg-[#FFFFFF] 
                            dark:bg-[#030303]">

                            <div className="w-12 h-12 mb-3">
                              <Image
                                src={item.image}
                                alt={item.name}
                                width={50}
                                height={50}
                              />
                            </div>
                            <span className="text-xs sm:text-sm font-medium">{item.name}</span>
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