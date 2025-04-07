import {
    SignedIn,
    SignedOut,
    SignInButton,
    SignOutButton,
  } from '@clerk/nextjs'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  
import Link from 'next/link'
import { currentUser } from '@clerk/nextjs/server'
import { Search, User, ChevronDown } from 'lucide-react';
import CartCount from "./CartCount"

export default async function Navbar(){

    const user = await currentUser()
    const userFullName = user?.fullName
    const userEmail = user?.emailAddresses[0].emailAddress

    return <div className="flex justify-between items-center p-5 gap-10
    border-b border-[#D8D9CF] dark:border-[#404258]">
        <div className="flex items-center gap-10">
            <Link href={'/'} className="text-4xl font-bold">TEKER</Link>

            <div className="relative flex items-center gap-10">
                <div className="relative flex gap-10">
                    
                    {/* Link 1: Categories */}
                    <div className="group/cat relative">
                        <Link href={'/categories'}
                        className="flex items-center gap-2 text-lg font-normal 
                        cursor-pointer">
                            Categories
                        <ChevronDown className="transition-transform duration-300 
                        group-hover/cat:rotate-180" size={18} />
                        </Link>

                        {/* Dropdown for Categories */}
                        <div
                        className="absolute top-full left-0 w-64 bg-[#F7F7F7] dark:bg-[#1f1f23] 
                        dark:text-white p-4 rounded-[20px] shadow opacity-0 pointer-events-none 
                        translate-y-2 transition-all duration-300 group-hover/cat:opacity-100 
                        group-hover/cat:pointer-events-auto group-hover/cat:translate-y-0">
                            <p>🧾 Categories dropdown content</p>  
                        </div>
                    </div>

                    {/* Link 2: Brands */}
                    <div className="group/brand relative">
                    <Link href={'/brands'}
                    className="flex items-center gap-2 text-lg font-normal cursor-pointer" >
                        Brands
                        <ChevronDown className="transition-transform duration-300 
                        group-hover/brand:rotate-180" size={18} />
                    </Link>

                    {/* Dropdown for Brands */}
                    <div
                        className="absolute top-full left-0 w-64 bg-[#F7F7F7] dark:bg-[#1f1f23] 
                        dark:text-white p-4 rounded-[20px] shadow opacity-0 pointer-events-none 
                        translate-y-2 transition-all duration-300 
                        group-hover/brand:opacity-100 group-hover/brand:pointer-events-auto 
                        group-hover/brand:translate-y-0"
                    >
                        <p>🏷️ Brands dropdown content</p>
                    </div>
                    </div>
                    
                </div>
            </div>


            <Link href={'/compare'} 
            className=' cursor-pointer text-lg font-normal'>
                Compare
            </Link>

            <div 
            className='flex items-center gap-5 px-4 py-1.5 rounded-[20px] 
            bg-[#F7F7F7] dark:bg-[#1f1f23] border border-[#D8D9CF] dark:border-[#404258]'>
                <input 
                    type="text" 
                    placeholder='Search anything..'
                    className='bg-[#F7F7F7] dark:bg-[#1f1f23] focus:outline-none' />
                <Search size={16} className='' />
            </div>
        </div>
        
        <div className="flex items-center gap-10">

            <CartCount />

            <div>
                <SignedOut>
                    <div className='bg-[#1DCD9F] border border-[#169976] px-4 py-1.5 rounded-[20px]
                    cursor-pointer flex items-center gap-3 text-[#030303]'>
                        <span><User size={16} className='text-[#030303]' /></span>
                        <SignInButton>Login</SignInButton>
                    </div>
                </SignedOut>

                <SignedIn>
                    <DropdownMenu>
                        <DropdownMenuTrigger 
                        className="bg-[#1DCD9F] border border-[#169976] px-4 py-1.5 rounded-[20px]
                        cursor-pointer flex items-center gap-3 text-[#030303] focus:outline-none">
                            <span><User size={16} className='text-[#030303]' /></span>
                            Profile
                        </DropdownMenuTrigger>

                        {/* border border-[#D8D9CF] dark:border-[#404258] */}

                        <DropdownMenuContent 
                        className='mx-5 my-2 bg-[#F7F7F7] dark:bg-[#1f1f23] dark:text-white
                        border-0 rounded-[16px] tracking-wide p-2'>
                            <DropdownMenuLabel>{userFullName}</DropdownMenuLabel>
                            <DropdownMenuLabel 
                            className='pb-[11px] border-b border-[#D8D9CF] 
                            dark:border-[#404258] tracking-wider'>
                                {userEmail}
                            </DropdownMenuLabel>

                            <DropdownMenuItem 
                            className='mt-1 pt-[6px] dark:hover:bg-[#1f1f23] 
                            dark:hover:text-white cursor-pointer'>
                                <Link href={'/settings'}>Settings</Link>
                            </DropdownMenuItem>                            
                            <DropdownMenuItem 
                            className='dark:hover:bg-[#1f1f23] 
                            dark:hover:text-white cursor-pointer'>
                                <Link href={'/support'}>Help and Support</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                            className='rounded-b-[10px] dark:hover:bg-[#1f1f23] 
                            dark:hover:text-white'>
                                <SignOutButton>Logout</SignOutButton>
                            </DropdownMenuItem>      
                        </DropdownMenuContent>
                    </DropdownMenu>
                </SignedIn> 
            </div>
        </div>
    </div>
}