'use client';

import { useCartStore } from "@/stores/cartStore";
import { ShoppingCart } from "lucide-react";

interface ProductCardProps {
  id: string;
  name: string;
  brand: string;
  price: number;
  image: string;
  slug: string;
}

const INRupee = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
});

export default function ProductCard({
  id,
  brand,
  name,
  price,
  image,
  slug,
}: ProductCardProps) {
  const addToCart = useCartStore((state) => state.addToCart);

  function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    addToCart({ name, brand, price, slug });
  }

  function handleBuy(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    console.log(
      `Buy order processed: ${brand} ${name} worth ₹${price}, id:#${id}`
    );
  }

  return (
    <div
      className="p-4 bg-[#F7F7F7] dark:bg-[#030303] border border-[#D8D9CF] 
      dark:border-[#404258] rounded-[20px] flex flex-col justify-between 
      transition-colors hover:bg-gray-100 dark:hover:bg-[#0a0a0a] cursor-pointer h-full"
    >
      <a href={`/product/${slug}`} className="flex flex-col flex-grow">
        <div>
          <p className="text-sm text-gray-500">{brand}</p>
          <p className="text-lg font-normal">{name}</p>
        </div>

        <div className="flex items-center justify-center my-4 h-40">
          <img
            src={image}
            alt={`Image of ${name}`}
            className="max-h-full object-contain"
            loading="lazy"
          />
        </div>

        <p className="text-lg font-normal">{INRupee.format(price)}</p>
      </a>

      <div className="mt-4 flex flex-col md:flex-row justify-between gap-2.5">
        <button
          type="button"
          onClick={handleAddToCart}
          className="w-full border border-[#D8D9CF] dark:border-[#404258] px-4
          py-1.5 rounded-[20px] flex justify-center items-center cursor-pointer"
        >
          <ShoppingCart className="sm:hidden m-[2.25px]" size={16} />
          <span className="hidden sm:inline">Add to Cart</span>
        </button>

        <button
          type="button"
          onClick={handleBuy}
          className="w-full bg-[#1DCD9F] border border-[#169976] px-4 py-1.5 rounded-[20px]
          flex justify-center items-center gap-1.5 text-[#030303] cursor-pointer"
        >
          Buy
        </button>
      </div>
    </div>
  );
}