import React from "react";
import Image from "next/image";
import Link from "next/link";

const categories = [
  { name: "Smartphone", image: "/assets/category/smartphone.png" },
  { name: "Tablet", image: "/assets/category/tablet.png" },
  { name: "Laptop", image: "/assets/category/laptop.png" },
  { name: "Earbuds", image: "/assets/category/earbuds.png" },
  { name: "Headphones", image: "/assets/category/headphones.png" },
  { name: "Speakers", image: "/assets/category/speaker.png" },
  { name: "Smart Watch", image: "/assets/category/smartwatch.png" },
  { name: "Microphones", image: "/assets/category/microphone.png" },
  { name: "Drones", image: "/assets/category/drone.png" },
  { name: "Mice", image: "/assets/category/mice.png" },
  { name: "Smart Rings", image: "/assets/category/smartring.png" },
  { name: "E-readers", image: "/assets/category/e-reader.png" },
];

const slugify = (text: string) =>
  text.toLowerCase().replace(/ /g, "-").replace(/[^a-z0-9-]/g, "");

export default function Categories () {
  return (
    <div className="p-5 overflow-x-auto">
      <div className="flex gap-5 min-w-max">
        {categories.map((category) => (
          <Link
            href={`/${slugify(category.name)}`}
            key={category.name}
            className="flex flex-col items-center flex-shrink-0 w-24 sm:w-28 
            p-3 bg-[#F7F7F7] dark:bg-[#030303] rounded-[20px] transition hover:scale-102"
          >
            <div className="w-20 h-20 sm:w-16 sm:h-16 relative mb-2">
              <Image
                src={category.image}
                alt={category.name}
                layout="fill"
                objectFit="contain"
              />
            </div>
            <span className="text-xs sm:text-sm text-center font-medium">
              {category.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};