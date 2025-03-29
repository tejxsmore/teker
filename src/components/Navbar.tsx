import {
    SignIn,
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
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  
import { Button } from "@/components/ui/button"
import ThemeToggle from "@/components/ThemeToggle"
import { currentUser } from '@clerk/nextjs/server'

import { Link, ShoppingCart } from 'lucide-react';
import { User } from 'lucide-react';
import { LogOut } from 'lucide-react';

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
            hover:bg-light dark:border-[#404258]">
                <span><ShoppingCart size={10} /></span>
                <p>Cart</p>
            </Button>

            <div>
                <SignedOut>
                    <SignInButton className="py-[7px] px-5 border border-[#D8D9CF]
                    dark:border-[#404258] rounded-full cursor-pointer text-sm font-medium">Login</SignInButton>
                </SignedOut>

                <SignedIn>
                    <DropdownMenu>
                        <DropdownMenuTrigger className='focus:outline-none'>
                            <Button className="rounded-full bg-light text-dark border border-[#D8D9CF] 
                            hover:bg-light dark:border-[#404258] cursor-pointer">
                                <span><User size={10} /></span>
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

                            <DropdownMenuItem className='pt-[8px]'>Settings</DropdownMenuItem>
                            <DropdownMenuItem className='pb-[9px]'>Help and Support</DropdownMenuItem>

                            <SignOutButton className='p-2 pt-2.5 text-start text-sm border-t border-[#D8D9CF] 
                            dark:border-[#404258] tracking-wider w-full cursor-pointer'>
                                Logout
                            </SignOutButton>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </SignedIn>
            </div>
        </div>
    </div>
}