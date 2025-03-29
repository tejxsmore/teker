import {
    SignInButton,
    SignOutButton,
    SignedIn,
    SignedOut,
  } from '@clerk/nextjs'
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  
import ThemeToggle from "@/components/ThemeToggle"
import { currentUser } from '@clerk/nextjs/server'

import { ShoppingCart } from 'lucide-react';
import { User } from 'lucide-react';
import Link from 'next/link'

export default async function Navbar(){
    const user = await currentUser()
    const userFullName = user?.fullName
    const userEmail = user?.emailAddresses[0].emailAddress

    return <div className="flex justify-between items-center p-5 
    border-b border-[#D8D9CF] dark:border-[#404258]">
        <div className="flex items-center gap-5">
            <h1 className="text-3xl font-bold">TEKER</h1>
        </div>
        <div className="flex items-center gap-5">
            <ThemeToggle />

            <Link href={'/cart'} className="bg-light text-dark border border-[#D8D9CF] 
            hover:bg-light dark:border-[#404258] px-4 py-1.5 rounded-[20px]
            cursor-pointer focus:outline-none flex items-center gap-3">
                <span><ShoppingCart size={16} /></span>
                Cart
            </Link>

            <div>
                <SignedOut>
                    <SignInButton>
                        Login
                    </SignInButton>
                </SignedOut>

                <SignedIn>
                    <DropdownMenu>
                        <DropdownMenuTrigger className="bg-light text-dark border border-[#D8D9CF] 
                        hover:bg-light dark:border-[#404258] px-4 py-1.5 rounded-[20px]
                        cursor-pointer focus:outline-none flex items-center gap-3">
                            <span><User size={16} /></span>
                            Profile
                        </DropdownMenuTrigger>

                        <DropdownMenuContent className='m-5 dark:bg-dark dark:text-white border 
                        border-[#D8D9CF] dark:border-[#404258] rounded-[16px] tracking-wide'>
                            <DropdownMenuLabel>{userFullName}</DropdownMenuLabel>
                            <DropdownMenuLabel 
                            className='pb-2 border-b border-[#D8D9CF] 
                            dark:border-[#404258] tracking-wider'>
                                {userEmail}
                            </DropdownMenuLabel>

                            <DropdownMenuItem className='pt-[8px]'>Settings</DropdownMenuItem>                            
                            <DropdownMenuItem className='rounded-b-[10px]'>Help and Support</DropdownMenuItem>                            
                        </DropdownMenuContent>
                    </DropdownMenu>
                </SignedIn>
            </div>
        </div>
    </div>
}