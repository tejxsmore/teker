import {Trash2, Plus, Minus} from 'lucide-react'
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
  quantity
}: {
  id: string;
  brand: string;
  name: string;
  price: number;
  quantity: number;
}){

    const { cart, removeFromCart, increaseQty, decreaseQty } = useCartStore();

    return <div className="space-y-5">
                <div className='flex justify-between'>
                <div>
                    <div className="text-sm text-gray-500">{brand}</div>
                    <div className="text-lg font-medium">{name}</div>
                </div>
                <div 
                className='flex gap-3'>
                    <div className="text-sm text-gray-500">Quantity</div>
                    <div className="text-4xl font-normal">{quantity}</div>
                </div>
                </div>

                <div className="flex gap-2 items-end">
                    <p className="text-2xl font-medium">{INRupee.format(price)}</p>
                </div>

                <div className='flex justify-between gap-5'>
                <div className='flex w-full gap-5'>
                    <button onClick={() => removeFromCart(id)}
                    className='bg-[#F2613F] border border-[#E83F25] 
                    rounded-[20px] px-4 py-1.5 cursor-pointer items-center text-[#030303]'>
                        <Trash2 size={16} strokeWidth={1.5} />
                    </button>

                    <div className='w-full border border-[#D8D9CF] dark:border-[#404258] 
                    rounded-[20px] flex'>

                    <button onClick={() => decreaseQty(id)} 
                    className='w-1/2 rounded-l-[20px] cursor-pointer'>
                        <Minus size={16} className='mx-auto' />
                    </button>

                    <button onClick={() => increaseQty(id)}
                    className='w-1/2 rounded-r-[20px] border-l border-[#D8D9CF] 
                    dark:border-[#404258] cursor-pointer'>
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
}