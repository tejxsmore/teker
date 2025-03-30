import Link from 'next/link';
import { Smartphone } from 'lucide-react';
import { Laptop } from 'lucide-react';
import { Headphones } from 'lucide-react';
import { Camera } from 'lucide-react';
import { Gamepad2 } from 'lucide-react';

export default function Categories(){
    return <div className="p-5 flex gap-5 overflow-x-auto overflow-y-hidden">
        <Link href={'/smartphones'} 
        className='bg-light text-dark border border-[#D8D9CF] 
            hover:bg-light dark:border-[#404258] px-4 py-1.5 rounded-[20px]
            cursor-pointer focus:outline-none flex items-center gap-3 hover:bg-brick'>
            <p><Smartphone size={16} strokeWidth={1.5} /></p>
            <p>Smartphones</p>
        </Link>
        <Link href={'/laptops'}
        className='bg-light text-dark border border-[#D8D9CF] 
            hover:bg-light dark:border-[#404258] px-4 py-1.5 rounded-[20px]
            cursor-pointer focus:outline-none flex items-center gap-3'>
            <Laptop size={18} strokeWidth={1.5} />
            <p>Laptops</p>
        </Link>
        <Link href={'/headphones'}
        className='bg-light text-dark border border-[#D8D9CF] 
            hover:bg-light dark:border-[#404258] px-4 py-1.5 rounded-[20px]
            cursor-pointer focus:outline-none flex items-center gap-3'>
            <Headphones size={16} strokeWidth={1.5} />
            <p>Headphones</p>
        </Link>
        <Link href={'/cameras'}
        className='bg-light text-dark border border-[#D8D9CF] 
            hover:bg-light dark:border-[#404258] px-4 py-1.5 rounded-[20px]
            cursor-pointer focus:outline-none flex items-center gap-3'>
            <Camera size={16} strokeWidth={1.5} />
            <p>Cameras</p>
        </Link>
        <Link href={'/gaming'}
        className='bg-light text-dark border border-[#D8D9CF] 
            hover:bg-light dark:border-[#404258] px-4 py-1.5 rounded-[20px]
            cursor-pointer focus:outline-none flex items-center gap-3'>
            <Gamepad2 size={18} strokeWidth={1.5} />
            <p>Gaming</p>
        </Link>
    </div>
}