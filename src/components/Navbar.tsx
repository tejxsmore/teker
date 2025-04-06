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
import { ShoppingCart, Search, User } from 'lucide-react';

export default async function Navbar(){

    const user = await currentUser()
    const userFullName = user?.fullName
    const userEmail = user?.emailAddresses[0].emailAddress

    return <div className="flex justify-between items-center p-5 gap-10
    border-b border-[#D8D9CF] dark:border-[#404258]">
        <div className="flex items-center gap-10">
            <Link href={'/'} className="text-4xl font-bold">TEKER</Link>

            <Link href={'/categories'} className="text-lg font-normal hover:text-[#F2613F]">Categories</Link>

            <Link href={'/brands'} className="text-lg font-normal hover:text-[#F2613F]">Brands</Link>

            <div 
            className='flex items-center gap-5 px-4 py-1.5 rounded-[20px] 
            bg-[#F7F7F7] dark:bg-[#030303] border border-[#D8D9CF] dark:border-[#404258]'>
                <input 
                    type="text" 
                    placeholder='Search anything...'
                    className='bg-[#F7F7F7] dark:bg-[#030303] focus:outline-none' />
                <Search size={16} className='' />
            </div>

        </div>
        
        <div className="flex items-center gap-10">

            <Link href={'/cart'} className="bg-[#F7F7F7] dark:bg-[#030303] 
            border border-[#D8D9CF] dark:border-[#404258] px-4 py-1.5 rounded-[20px]
            cursor-pointer focus:outline-none flex items-center gap-3">
                <span><ShoppingCart size={16} /></span>
                0
            </Link>

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

                        <DropdownMenuContent 
                        className='mx-5 my-2 bg-[#F7F7F7] dark:bg-[#030303] dark:text-white border 
                        border-[#D8D9CF] dark:border-[#404258] rounded-[16px] tracking-wide'>
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