'use client'
import { useCartStore } from "@/stores/cartStore";

interface PhoneCardProps {
    id: number;
    name: string;
    brand: string;
}

export default function PhoneCard({ id, brand, name } : PhoneCardProps){
    const addToCart = useCartStore((state) => state.addToCart)

    function handleBuy(id : any, brand : any, name : any){
        console.log(`Buy order processed : ${brand} ${name}, #${id}`)
    }
    return <div 
    className="p-5 bg-[#F7F7F7] dark:bg-[#030303] border border-[#D8D9CF] 
    dark:border-[#404258] max-w-md rounded-[20px] space-y-5">
        <div>
            <div className="text-sm text-gray-500">{brand}</div>
            <div className="text-lg font-medium">{name}</div>
        </div>
        <div className="flex justify-between gap-5">
            <button onClick={() => addToCart({ name, brand })}
            className="w-full border border-[#D8D9CF] dark:border-[#404258] px-4 
            py-1.5 rounded-[20px] cursor-pointer items-center gap-3">
                Add to Cart
            </button>
            <button onClick={() => handleBuy(id, brand, name)}
            className="w-full bg-[#1DCD9F] border border-[#169976] px-4 py-1.5 rounded-[20px]
            cursor-pointer items-center gap-3 text-[#030303]">
                Buy
            </button>
        </div>
    </div>
}