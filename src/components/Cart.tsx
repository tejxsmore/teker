'use client';

import { ArrowRight } from 'lucide-react';
import { useCartStore } from '@/stores/cartStore';
import CartCard from '@/components/card/CartCard';

const INRupee = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
});

export default function Cart() {
  const { cart } = useCartStore();
  const cartCount = useCartStore((state) =>
    state.cart.reduce((sum, item) => sum + item.quantity, 0)
  );
  const cartTotal = useCartStore((state) => state.totalAmount());

  if (cart.length === 0) {
    return <div className="p-4 space-y-4 text-lg font-medium min-h-screen">Your cart is empty</div>;
  }

  const itemLabel = cart.length > 1 ? 'items' : 'item';

  return (
    <div className="p-4 lg:flex lg:flex-row-reverse md:gap-4 space-y-4 tracking-wide min-h-screen">
      {/* Summary */}
      <div className="p-4 bg-[#F7F7F7] dark:bg-[#030303] border border-[#D8D9CF] dark:border-[#404258] md:h-full lg:w-1/3 rounded-[20px] space-y-4">
        <h2 className="text-2xl font-semibold pb-4 border-b-2 border-dashed border-[#D8D9CF] dark:border-[#404258]">
          Summary
        </h2>

        <div className="text-lg font-normal flex justify-between">
          <p>{`Price (${cart.length} ${itemLabel})`}</p>
          <p>{INRupee.format(cartTotal)}</p>
        </div>

        <div className="text-lg font-normal flex justify-between">
          <p>Quantity</p>
          <p>{cartCount}</p>
        </div>

        <div className="text-lg font-normal flex justify-between">
          <p>Shipping</p>
          <p className="text-[#1DCD9F] font-semibold">Free</p>
        </div>

        <div className="text-lg font-normal pt-4 border-t-2 border-dashed border-[#D8D9CF] dark:border-[#404258] flex justify-between">
          <p>Total Amount</p>
          <p>{INRupee.format(cartTotal)}</p>
        </div>

        <a
          href="/checkout"
          className="w-full bg-[#1DCD9F] border border-[#169976] px-4 py-1.5 rounded-[20px] cursor-pointer flex justify-between items-center"
        >
          <div className="flex items-center gap-2">
            Checkout Now <ArrowRight size={16} className="text-black" />
          </div>
          <div className="flex items-center gap-2">
            <img src="/assets/logos/gpay.png" alt="GPay" width={20} height={20} className="rounded-lg" />
            <img src="/assets/logos/phonepe.png" alt="PhonePe" width={20} height={20} className="rounded-lg" />
            <img src="/assets/logos/visa.webp" alt="Visa" width={32} height={32} className="rounded-lg" />
          </div>
        </a>

        <div className="text-sm text-gray-600 pt-4 border-t-2 border-dashed border-[#D8D9CF] dark:border-[#404258]">
          <p>
            By placing an order on Teker, you agree to our payment and purchase terms. We support secure
            payments via cards, UPI (Google Pay, PhonePe, Paytm), net banking, and wallets. Prices include
            applicable taxes unless stated otherwise.
          </p>
        </div>
      </div>

      {/* Cart Items */}
      <div className="lg:w-2/3 space-y-4">
        {cart.map((item) => (
          <div
            key={item.id}
            className="p-4 bg-[#F7F7F7] dark:bg-[#030303] border border-[#D8D9CF] dark:border-[#404258] w-full rounded-[20px]"
          >
            <CartCard
              key={item.id}
              id={item.id}
              brand={item.brand}
              name={item.name}
              price={item.price}
              quantity={item.quantity}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
