// src/components/ProductCard.tsx
import React from 'react';

type Props = {
  brandName: string;
  name: string;
  slug: string;
  imageUrl: string;
  price: number;
};

const INRupee = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
});

const ProductCard: React.FC<Props> = ({ brandName, name, slug, imageUrl, price }) => {
  const handleAddToCart = async () => {
    const product = { brandName, name, slug, imageUrl, price };

    // LocalStorage
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const index = cart.findIndex((p: any) => p.slug === product.slug);
    if (index > -1) cart[index].quantity += 1;
    else cart.push({ ...product, quantity: 1 });
    localStorage.setItem("cart", JSON.stringify(cart));

    // Redis Sync
    await fetch("/api/cart/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ product }),
    });
  };

  return (
    <div className="block rounded-[20px] overflow-hidden border">
      <a href={`/product/${slug}`}>
        <div className="aspect-w-3 aspect-h-3">
          <img src={imageUrl} alt={`Image of ${name}`} className="w-full h-full object-cover" loading="lazy" />
        </div>

        <div className="p-4 pt-0 space-y-2">
          <p className="text-sm text-gray-500">{brandName}</p>
          <h2 className="text-lg font-normal line-clamp-2">{name}</h2>
          <p className="text-lg font-bold text-indigo-500">{INRupee.format(price)}</p>
        </div>
      </a>

      <div className="p-4 pt-0 sm:flex space-y-2 sm:space-y-0 justify-between gap-4">
        <button
          onClick={handleAddToCart}
          className="w-full border border-[#D8D9CF] dark:border-[#404258] px-4 py-1.5 rounded-[20px] cursor-pointer flex justify-center items-center"
        >
          Add to Cart
        </button>
        <button className="w-full bg-[#1DCD9F] border border-[#169976] px-4 py-1.5 rounded-[20px] cursor-pointer flex justify-center items-center gap-1.5 text-[#030303]">
          Buy
        </button>
      </div>
    </div>
  );
};

export default ProductCard;