'use client'

import Link from 'next/link';
import { useCartStore } from '@/stores/cartStore';
import { ShoppingCart } from 'lucide-react';
import { useHydrated } from '@/hooks/useHydrated';
import { motion, useAnimation } from 'framer-motion';
import { useEffect, useRef } from 'react';

export default function CartCount() {
  const hydrated = useHydrated();
  const count = useCartStore((state) =>
    state.cart.reduce((sum, item) => sum + item.quantity, 0)
  );

  const prevCount = useRef(count);
  const controls = useAnimation();

  useEffect(() => {
    if (hydrated && count !== prevCount.current) {
      // Trigger bounce animation
      controls.start({
        scale: [1, 1.2, 1],
        transition: { duration: 0.3, ease: 'easeInOut' },
      });
      prevCount.current = count;
    }
  }, [count, hydrated, controls]);

  if (!hydrated) return null;

  return (
    <div>
      <Link
        href={'/cart'}
        className="bg-[#F7F7F7] dark:bg-[#1f1f23] 
          border border-[#D8D9CF] dark:border-[#404258] px-4 py-1.5 rounded-[20px]
          cursor-pointer focus:outline-none flex items-center gap-3"
      >
        <motion.span animate={controls}>
          <ShoppingCart size={16} />
        </motion.span>
        {count}
      </Link>
    </div>
  );
}