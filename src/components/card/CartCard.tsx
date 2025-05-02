import { Trash2, Plus, Minus } from 'lucide-react';
import { useCartStore } from '@/stores/cartStore';

let INRupee = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
});

export default function CartCard({
  id,
  brand,
  name,
  price,
  quantity,
}: {
  id: string;
  brand: string;
  name: string;
  price: number;
  quantity: number;
}) {
  const { cart, removeFromCart, increaseQty, decreaseQty } = useCartStore();

  // Function to update the cart in Redis via the API
  const updateCartInRedis = async (itemId: string, action: 'increase' | 'decrease' | 'remove') => {
    try {
      const user = await fetch('/api/user'); // Assume you're getting user info from your app
      const userData = await user.json();
      const { userId, userEmail } = userData;

      const res = await fetch("/api/cart/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          itemId,
          action,
          userId,
          userEmail,
        }),
      });

      if (!res.ok) {
        console.error("Failed to update Redis:", await res.text());
      }
    } catch (err) {
      console.error("Error sending to Redis:", err);
    }
  };

  const handleRemoveFromCart = async () => {
    removeFromCart(id); // Update Zustand
    await updateCartInRedis(id, 'remove'); // Update Redis
  };

  const handleIncreaseQty = async () => {
    increaseQty(id); // Update Zustand
    await updateCartInRedis(id, 'increase'); // Update Redis
  };

  const handleDecreaseQty = async () => {
    decreaseQty(id); // Update Zustand
    await updateCartInRedis(id, 'decrease'); // Update Redis
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <div>
          <div className="text-sm text-gray-500">{brand}</div>
          <div className="text-lg font-medium">{name}</div>
        </div>
        <div className="flex gap-3">
          <div className="text-sm text-gray-500">Quantity</div>
          <div className="text-4xl font-normal">{quantity}</div>
        </div>
      </div>

      <div className="flex gap-2 items-end">
        <p className="text-2xl font-medium">{INRupee.format(price)}</p>
      </div>

      <div className="flex justify-between gap-4">
        <div className="flex w-full gap-4">
          <button
            onClick={handleRemoveFromCart}
            className="border border-[#D8D9CF] dark:border-[#404258] rounded-[20px] px-4 py-1.5 cursor-pointer items-center text-[#030303]"
          >
            <Trash2 size={16} strokeWidth={1.5} className="text-[#F2613F]" />
          </button>

          <div className="w-full border border-[#D8D9CF] dark:border-[#404258] rounded-[20px] flex">
            <button onClick={handleDecreaseQty} className="w-1/2 rounded-l-[20px] cursor-pointer">
              <Minus size={16} className="mx-auto" />
            </button>

            <button onClick={handleIncreaseQty} className="w-1/2 rounded-r-[20px] border-l border-[#D8D9CF] dark:border-[#404258] cursor-pointer">
              <Plus size={16} className="mx-auto" />
            </button>
          </div>
        </div>

        <button className="w-full bg-[#1DCD9F] border border-[#169976] px-4 py-1.5 rounded-[20px] cursor-pointer items-center gap-3 text-[#030303]">
          Buy
        </button>
      </div>
    </div>
  );
}