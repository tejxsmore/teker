'use client'

import Link from 'next/link';
import { useCartStore } from '@/stores/cartStore';
import { ShoppingCart } from 'lucide-react';
import { useHydrated } from '@/hooks/useHydrated';

export default function CartCount(){
    const hydrated = useHydrated();
    const count = useCartStore((state) =>
        state.cart.reduce((sum, item) => sum + item.quantity, 0)
    );

    if (!hydrated) return null;

    return <div>
        <Link href={'/cart'} className="bg-[#F7F7F7] dark:bg-[#1f1f23] 
        border border-[#D8D9CF] dark:border-[#404258] px-4 py-1.5 rounded-[20px]
        cursor-pointer focus:outline-none flex items-center gap-3">
            <span><ShoppingCart size={16} /></span>
            {count}
        </Link> 
    </div>
}