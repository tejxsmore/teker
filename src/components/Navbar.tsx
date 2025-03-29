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
  
import { Button } from "@/components/ui/button"
import ThemeToggle from "@/components/ThemeToggle"
import { currentUser } from '@clerk/nextjs/server'
import Link from 'next/link'

import { ShoppingCart } from 'lucide-react';
import { User } from 'lucide-react';

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

            <Button className="rounded-full bg-light text-dark border border-[#D8D9CF] 
            hover:bg-light dark:border-[#404258] cursor-pointer">
                <span><ShoppingCart size={10} /></span>
                <p>Cart</p>
            </Button>

            <div className='flex items-center'>
                <SignedOut>
                    <div className="py-[7px] px-5 border border-[#D8D9CF] flex items-center gap-2
                        dark:border-[#404258] rounded-full cursor-pointer text-sm font-medium">
                        <span><User size={16} /></span>
                        <SignInButton>Login</SignInButton>
                    </div>
                </SignedOut>

                <SignedIn>
                    <DropdownMenu>
                        <DropdownMenuTrigger className='focus:outline-none'>
                            <Button className="rounded-full bg-light text-dark border border-[#D8D9CF] 
                            hover:bg-light dark:border-[#404258] cursor-pointer">
                                <span><User size={15} /></span>
                                <p>Profile</p>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className='m-5 dark:bg-dark dark:text-white border 
                        border-[#D8D9CF] dark:border-[#404258] rounded-[16px] tracking-wide'>
                            <DropdownMenuLabel>{userFullName}</DropdownMenuLabel>
                            <DropdownMenuLabel 
                            className='pb-2 border-b border-[#D8D9CF] 
                            dark:border-[#404258] tracking-wider'>
                                {userEmail}
                            </DropdownMenuLabel>

                            <DropdownMenuItem className='pt-[8px] rounded-lg'>Settings</DropdownMenuItem>
                            <DropdownMenuItem className=''>Help and Support</DropdownMenuItem>                            
                        </DropdownMenuContent>
                    </DropdownMenu>
                </SignedIn>
            </div>
        </div>
    </div>
}