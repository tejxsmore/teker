"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const categories = [
  {
    name: "Electronics",
    img: "📱",
    subItems: [
      "Smart Phones", "Tablets", "Laptops", "Earbuds", "Headphones",
      "Speakers", "Smart Watch", "Smart Rings", "Microphones", "Drones", "E-readers",
    ],
  },
  {
    name: "Computers",
    img: "🖥️",
    subItems: [
      "Monitors", "Keyboards", "Mice", "Webcams", "External HDD & SSD",
      "Graphic Cards (GPUs)", "Motherboards", "RAM & Storage",
    ],
  },
  {
    name: "Gaming",
    img: "🎮",
    subItems: [
      "Gaming Laptop", "Consoles", "Controllers", "Games", "Gaming Headsets", "VR Headsets",
    ],
  },
  {
    name: "Cameras",
    img: "📷",
    subItems: [
      "DSLR", "Mirrorless", "Full Frame", "Action Cameras",
      "Lenses", "Tripods & Mounts", "Memory Cards", "Camera Bags",
    ],
  },
  {
    name: "Car Tech",
    img: "🚗",
    subItems: [
      "Dash Cams", "GPS Systems", "Car Chargers", "Bluetooth Car Kits", "Smart Tire Sensors",
    ],
  },
  {
    name: "Smart Home",
    img: "🏠",
    subItems: [
      "Smart Assistants", "Home Audio", "Smart Security", "Routers & Modems",
      "Smart Lights", "Smart Plugs",
    ],
  },
  {
    name: "Peripherals",
    img: "🛜",
    subItems: [
      "Solar Chargers", "Smart Batteries", "Energy Monitors", "Cables",
      "Adapters", "Cooling Pads",
    ],
  },
  {
    name: "Accessory",
    img: "🔌",
    subItems: [
      "Chargers", "Phone Cases", "Screen Protectors", "Laptop Bags", "Camera Bags",
      "Charging Cables", "Power Banks", "Wireless Chargers", "Screen Cleaners",
    ],
  },
];

const brandSections = [
    {
      title: "⭐ Top Brands",
      brands: [
        "Apple", "Samsung", "Google", "OnePlus", "Xiaomi",
        "Sony", "Dell", "Asus", "NVIDIA", "AMD",
      ],
    },
    {
      title: "📱 Smartphones",
      brands: [
        "Apple", "Samsung", "Google", "OnePlus", "Xiaomi",
        "Oppo", "Vivo", "Motorola", "Realme", "Nothing",
      ],
    },
    {
      title: "💻 Laptops",
      brands: [
        "Apple", "Dell", "HP", "Lenovo", "Asus",
        "MSI", "Acer", "Razer", "Microsoft", "Samsung",
      ],
    },
    {
      title: "🎧 Audio",
      brands: [
        "Sony", "Bose", "Sennheiser", "JBL", "Beats",
        "Skullcandy", "Anker", "Marshall", "Shure", "Soundcore",
      ],
    },
    {
      title: "⌚ Smartwatches",
      brands: [
        "Apple", "Samsung", "Garmin", "Fitbit", "Huawei",
        "Fossil", "Amazfit", "Mobvoi", "Noise", "boAt",
      ],
    },
];
  

export default function FullScreenDropdown() {
  const [hovered, setHovered] = useState<"categories" | "brands" | null>(null);

  const dropdownAnim = {
    initial: { opacity: 0, y: -10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
    transition: { duration: 0.2, ease: "easeInOut" },
  };

  const formatSlug = (text: string) =>
    text.toLowerCase().replace(/\s+/g, "-");

  const handleLinkClick = () => setHovered(null);

  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", !!hovered);
    return () => document.body.classList.remove("overflow-hidden");
  }, [hovered]);

  return (
    <>
      <div className="relative hidden lg:flex items-center gap-10">

        <div onMouseEnter={() => setHovered("categories")} 
        onMouseLeave={() => setHovered(null)}>
          <Link href="/categories" 
          className="flex items-center gap-2 text-lg font-medium">
            Categories
            <ChevronDown size={18} 
            className={`transition-transform duration-300 
            ${hovered === "categories" ? "rotate-180" : ""}`} />
          </Link>
        </div>

        <div onMouseEnter={() => setHovered("brands")} 
        onMouseLeave={() => setHovered(null)}>
          <Link href="/brands" 
          className="flex items-center gap-2 text-lg font-medium">
            Brands
            <ChevronDown size={18} 
            className={`transition-transform duration-300 
            ${hovered === "brands" ? "rotate-180" : ""}`} />
          </Link>
        </div>

      </div>

      <AnimatePresence>
        {(hovered === "categories" || hovered === "brands") && (
          <motion.div
            {...dropdownAnim}
            onMouseEnter={() => setHovered(hovered)}
            onMouseLeave={() => setHovered(null)}
            className="fixed top-[100px] left-0 w-screen h-screen z-50 
            bg-[#F7F7F7] dark:bg-[#1f1f23] dark:text-white p-12"
          >
            <div className="max-h-[calc(100vh-100px)] overflow-y-auto custom-scrollbar pb-24">
              <div className="grid grid-cols-4 gap-10 max-w-[1400px] mx-auto">
                {hovered === "categories" &&
                  categories.map((cat) => (
                    <div key={cat.name}>
                      <h3 className="text-xl font-semibold flex items-center gap-2 mb-3">
                        <span className="text-2xl">{cat.img}</span>
                        {cat.name}
                      </h3>
                      <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
                        {cat.subItems.map((sub) => (
                          <li key={sub}>
                            <Link
                              href={`/${formatSlug(sub)}`}
                              onClick={handleLinkClick}
                              className="block transition-colors hover:text-[#F2613F]">
                              {sub}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}

                {hovered === "brands" &&
                  brandSections.map((section) => (
                    <div key={section.title}>
                      <h3 className="text-xl font-semibold mb-3">{section.title}</h3>
                      <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
                        {section.brands.map((brand) => (
                          <li key={brand}>
                            <Link
                              href={`/brands/${formatSlug(brand)}`}
                              onClick={handleLinkClick}
                              className="block transition-colors hover:text-[#F2613F]">
                              {brand}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}