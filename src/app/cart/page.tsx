'use client';

import { useCartStore } from '@/stores/cartStore';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import CartCard from '@/components/card/CartCard';

let INRupee = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
});

export default function Cart() {
  const { cart } = useCartStore();

  const cartCount = useCartStore((state) =>
    state.cart.reduce((sum, item) => sum + item.quantity, 0)
  );
  
  const cartTotal = useCartStore((state) => state.totalAmount());
  
  if (cart.length === 0) {
    return <div className="p-5 space-y-5 text-lg font-medium">Your cart is empty</div>;
  }
  let item = cart.length > 1 ? "items" : "item"

  return (
    <div className="p-5 min-h-screen md:flex md:flex-row-reverse md:gap-5 space-y-5
    tracking-wide">
      {/* <h2 className="text-xl font-semibold">Your Cart</h2> */}

      <div className='p-5 bg-[#F7F7F7] dark:bg-[#030303] border border-[#D8D9CF] 
        dark:border-[#404258] md:h-full md:w-1/3 rounded-[20px] space-y-5'>

          <h2 className='text-2xl font-semibold pb-5 border-b-2 border-dashed 
          border-[#D8D9CF] dark:border-[#404258]'>Summary</h2>

          <div className='text-lg font-normal flex justify-between items-center'>
            <p>{`Price (${cart.length} ${item})`}</p>
            <p>{INRupee.format(cartTotal)}</p>
          </div>

          <div className='text-lg font-normal flex justify-between items-center'>
            <p>Quantity</p>
            <p>{cartCount}</p>
          </div>

          <div className='text-lg font-normal flex justify-between items-center'>
            <p>Shipping</p>
            <p className='text-[#1DCD9F] font-semibold'>Free</p>
          </div>

          <div className='text-lg font-normal pt-5 border-t-2 border-dashed 
          border-[#D8D9CF] dark:border-[#404258] flex justify-between items-center'>
            <p>Total Amount</p>
            <p>{INRupee.format(cartTotal)}</p>
          </div>

          <button 
          className='w-full bg-[#1DCD9F] border border-[#169976] px-4 py-1.5 rounded-[20px]
          cursor-pointer items-center gap-3 text-[#030303] flex items-center justify-between'>
            <div className='flex items-center gap-2'>
              Checkout Now 
              <span><ArrowRight size={16} className='text-black' /></span>
            </div>

            <div className="flex items-center gap-2">
              <div className="">
                <Image 
                  src="/assets/logos/gpay.png"
                  alt="Google Pay logo"
                  width={20}
                  height={20}
                  className="rounded-lg"
                />
              </div>

              <div className=""> {/* 20% overlap (20px of 100px image) */}
                <Image 
                  src="/assets/logos/phonepe.png"
                  alt="PhonePe logo"
                  width={20}
                  height={20}
                  className="rounded-lg"
                />
              </div>

              <div className="">
                <img 
                  src="https://corporate.visa.com/content/dam/VCOM/corporate/about-visa/images/visa-brandmark-blue-1960x622.png"
                  alt="Visa logo"
                  width={32}
                  height={32}
                  className="rounded-lg"
                />
              </div>
            </div>
          </button>

          <div className='p-3 text-sm bg-[#EDE8DC] dark:bg-[#181C14] md:text-justify 
          rounded-[20px] '>
            <p>By placing an order on Teker, you agree to our payment and 
              purchase terms. We support secure payments via cards, UPI (Google Pay, 
              PhonePe, Paytm), net banking, and wallets. Prices include applicable 
              taxes unless stated otherwise. Once payment is confirmed, you’ll receive 
              an order confirmation. Orders can be canceled before shipping, and eligible 
              refunds are processed within 5–7 business days</p>
          </div>
      </div>

      <div className='md:w-2/3 space-y-5'>
      {cart.map((item) => (
        <div key={item.id} className="p-5 bg-[#F7F7F7] dark:bg-[#030303] border 
        border-[#D8D9CF] dark:border-[#404258] w-full rounded-[20px]">
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
