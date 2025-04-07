'use client';

import { useCartStore } from '@/stores/cartStore';
import { Trash2, Plus, Minus } from 'lucide-react';

export default function Cart() {
  const { cart, removeFromCart, increaseQty, decreaseQty } = useCartStore();

  if (cart.length === 0) {
    return <div className="p-5 space-y-5 text-lg font-normal">🛒 Your cart is empty</div>;
  }

  return (
    <div className="p-5 space-y-5">
      <h2 className="text-xl font-semibold">Your Cart</h2>

      {cart.map((item) => (
        <div key={item.id} className="p-5 bg-[#F7F7F7] dark:bg-[#030303] border border-[#D8D9CF] 
        dark:border-[#404258] max-w-md rounded-[20px] space-y-5">
            <div className="space-y-5">
              <div className='flex justify-between'>
                <div>
                  <div className="text-sm text-gray-500">{item.brand}</div>
                  <div className="text-lg font-medium">{item.name}</div>
                </div>
                <div className=''>
                  Qty : {item.quantity}
                </div>
              </div>

              <div className='flex justify-between gap-5'>
                <div className='flex w-full gap-5'>
                  <button onClick={() => removeFromCart(item.id)}
                  className='bg-[#D84040] border border-[#A31D1D] px-4 py-1.5 
                  rounded-[20px] cursor-pointer items-center gap-3 text-[#030303]'>
                    <Trash2 size={16} strokeWidth={1.5} />
                  </button>

                  <div className='w-full border border-[#D8D9CF] dark:border-[#404258] 
                  rounded-[20px] flex'>

                    <button onClick={() => decreaseQty(item.id)} 
                    className='w-1/2 rounded-l-[20px]'>
                      <Minus size={16} className='mx-auto' />
                    </button>

                    <button onClick={() => increaseQty(item.id)}
                    className='w-1/2 rounded-r-[20px] border-l border-[#D8D9CF] dark:border-[#404258]'>
                      <Plus size={16} className='mx-auto' />
                    </button>
                  </div>

                </div>

                <button 
                className='w-full bg-[#1DCD9F] border border-[#169976] px-4 py-1.5 rounded-[20px]
                cursor-pointer items-center gap-3 text-[#030303]'>
                  Buy
                </button>
              </div>
            </div>
          </div>
      ))}
    </div>
  );
}
