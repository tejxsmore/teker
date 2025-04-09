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
import { Search, User, LogIn, ChevronDown } from 'lucide-react';
import CartCount from "./CartCount"
import NavMenu from './NavMenu';
import MobileTabs from './MobileTabs';

export default async function Navbar(){

    const user = await currentUser()
    const userFullName = user?.fullName
    const userEmail = user?.emailAddresses[0].emailAddress

    return <div className='border-b border-[#D8D9CF] dark:border-[#404258]'>
        <div className="flex justify-between items-center p-5 gap-5 lg:gap-10">
        <div className="flex items-center gap-5 lg:gap-10">

            <div className='lg:hidden'>
                <NavMenu />
            </div>

            <Link href={'/'} className="text-4xl font-bold">TEKER</Link>

            <div className="hidden lg:block relative flex items-center lg:gap-10">
                <div className="relative flex lg:gap-10">
                    
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
            className='hidden lg:block cursor-pointer text-lg font-normal'>
                Compare
            </Link>

            <div className='hidden sm:block'>
                <div className='flex items-center bg-[#F7F7F7] dark:bg-[#1f1f23]
                rounded-[20px] border border-[#D8D9CF] dark:border-[#404258]'>
                    <input type="text" 
                    placeholder='Search anything...'
                    className='px-4 py-1.5 focus:outline-none bg-[#F7F7F7] 
                    dark:bg-[#1f1f23] rounded-l-[20px]' />
                    <Search size={17} className='mr-4 rounded-r-[20px]' />
                </div>
            </div>

        </div>
        
        <div className="flex items-center gap-5 lg:gap-10">

            <CartCount />

            <div>
                <SignedOut>
                    <SignInButton>
                        <div className='bg-[#1DCD9F] border border-[#169976] px-4 py-1.5 
                        rounded-[20px] cursor-pointer flex items-center gap-3'>
                            <span><LogIn size={16} className='my-1 md:my-0 text-[#030303]' /></span>
                            <span className='hidden sm:block text-[#030303]'>Login</span>
                        </div>
                    </SignInButton>
                </SignedOut>


                <SignedIn>
                    <DropdownMenu>
                        <DropdownMenuTrigger 
                        className="bg-[#1DCD9F] border border-[#169976] px-4 py-1.5 rounded-[20px]
                        cursor-pointer flex items-center gap-3 text-[#030303] focus:outline-none">
                            <span><User size={16} className='text-[#030303] my-1 md:my-0' /></span>
                            <span className='text-[#030303] hidden md:block'>Profile</span>
                        </DropdownMenuTrigger>

                        {/* border border-[#D8D9CF] dark:border-[#404258] */}

                        <DropdownMenuContent 
                        className='mx-5 my-2 bg-[#F7F7F7] dark:bg-[#1f1f23] dark:text-white
                        border-0 rounded-[16px] tracking-wide p-2 '>
                            <DropdownMenuLabel>{userFullName}</DropdownMenuLabel>
                            <DropdownMenuLabel 
                            className='pb-[11px] border-b border-[#D8D9CF] 
                            dark:border-[#404258] tracking-wider'>
                                {userEmail}
                            </DropdownMenuLabel>

                            <DropdownMenuItem 
                            className='mt-1 pt-[6px] dark:hover:bg-[#1f1f23] 
                            dark:hover:text-white cursor-pointer'
                            asChild>
                                <Link href="/profile">Profile</Link>
                            </DropdownMenuItem>

                            <DropdownMenuItem 
                            className='dark:hover:bg-[#1f1f23] 
                            dark:hover:text-white cursor-pointer'
                            asChild>
                                <Link href="/settings">Settings</Link>
                            </DropdownMenuItem>

                            <DropdownMenuItem 
                            className='dark:hover:bg-[#1f1f23] dark:hover:text-white 
                            cursor-pointer'
                            asChild>
                                <Link href="/support">Help and Support</Link>
                            </DropdownMenuItem>
                            
                            <DropdownMenuItem
                            className='rounded-b-[10px] dark:hover:bg-[#1f1f23] 
                            dark:hover:text-white'>
                                <SignOutButton>
                                    <button className="cursor-pointer w-full text-left">
                                        Sign out
                                    </button> 
                                </SignOutButton>
                            </DropdownMenuItem>      
                        </DropdownMenuContent>
                    </DropdownMenu>
                </SignedIn> 
            </div>
        </div>
    </div>

        <div className='mx-5 mb-5 flex justify-between items-center gap-5 rounded-[20px] sm:hidden
        bg-[#F7F7F7] dark:bg-[#1f1f23] border border-[#D8D9CF] dark:border-[#404258]'>
                <input 
                type="text" 
                placeholder='Search anything..'
                className='px-4 py-1.5 rounded-[20px] w-full bg-[#F7F7F7] focus:outline-none 
                dark:bg-[#1f1f23]' />
                <Search size={17} className='mr-4' />
        </div>

        <MobileTabs />
    </div>
}