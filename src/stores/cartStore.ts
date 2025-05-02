'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type CartItem = {
  id: string;
  name: string;
  brand: string;
  slug:string;
  price: number;
  quantity: number;
};

type CartStore = {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, 'id' | 'quantity'>) => void;
  removeFromCart: (id: string) => void;
  increaseQty: (id: string) => void;
  decreaseQty: (id: string) => void;
  totalAmount: () => number;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: [],
      addToCart: (item) => {
        const found = get().cart.find(
          (i) => i.name === item.name && i.brand === item.brand && i.price === item.price
        );
        if (found) {
          set({
            cart: get().cart.map((i) =>
              i.name === item.name && i.brand === item.brand && i.price === item.price
                ? { ...i, quantity: i.quantity + 1 }
                : i
            ),
          });
        } else {
          set({
            cart: [
              ...get().cart,
              {
                ...item,
                id: `${item.name}-${item.brand}-${Date.now()}`,
                quantity: 1,
              },
            ],
          });
        }
      },
      removeFromCart: (id) =>
        set({ cart: get().cart.filter((item) => item.id !== id) }),
      increaseQty: (id) =>
        set({
          cart: get().cart.map((item) =>
            item.id === id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        }),
      decreaseQty: (id) =>
        set({
          cart: get().cart
            .map((item) =>
              item.id === id
                ? { ...item, quantity: item.quantity - 1 }
                : item
            )
            .filter((item) => item.quantity > 0),
        }),
      totalAmount: () => {
        return get().cart.reduce((total, item) => total + item.price * item.quantity, 0);
      },
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);