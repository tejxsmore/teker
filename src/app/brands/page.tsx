import Link from "next/link";
import Image from "next/image";

const brands = [
  { name: "Apple", href: "/brands/apple", img: "/assets/logos/apple.png" },
  { name: "Samsung", href: "/brands/samsung", img: "/assets/logos/samsung.png" },
  { name: "Google", href: "/brands/google", img: "/assets/logos/google.png" },
  { name: "Oneplus", href: "/brands/oneplus", img: "/assets/logos/oneplus.png" },
  { name: "Xiaomi", href: "/brands/xiaomi", img: "/assets/logos/xiaomi.png" },
  { name: "Sony", href: "/brands/sony", img: "/assets/logos/sony.png" },
  { name: "Dell", href: "/brands/dell", img: "/assets/logos/dell.png" },
  { name: "Asus", href: "/brands/asus", img: "/assets/logos/asus.png" },
  { name: "NVIDIA", href: "/brands/nvidia", img: "/assets/logos/nvidia.png" },
  { name: "AMD", href: "/brands/amd", img: "/assets/logos/amd.png" },
];

export default function Brands() {
  return (
    <div className="p-2.5 min-h-screen">
      <h1 className="text-2xl font-bold p-2.5">
        Top Brands
      </h1>

      <div className="flex flex-wrap">
        {brands.map((brand) => (
          <Link
            key={brand.name}
            href={brand.href}
            className="w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 p-2.5"
          >
            <div className="h-full p-5 rounded-2xl text-center text-xl font-medium 
              bg-[#F7F7F7] dark:bg-[#1f1f23] border border-[#D8D9CF] dark:border-[#404258] 
              hover:scale-102 transition space-y-5 flex flex-col justify-center items-center">
              <Image
                src={brand.img}
                alt={`${brand.name} logo`}
                width={60}
                height={60}
                className="object-contain"
              />
              <p className="text-lg font-normal">{brand.name}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}