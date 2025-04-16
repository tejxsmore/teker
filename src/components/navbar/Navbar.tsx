import {
    SignedIn,
    SignedOut,
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
import Dropdown from './Dropdown';

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

            <Dropdown />

            <Link href={'/compare'} 
            className='hidden lg:block cursor-pointer text-lg font-normal'>
                Compare
            </Link>

            <div className='hidden sm:block '>
                <div className='flex justify-between items-center rounded-[20px] 
                bg-[#F7F7F7] dark:bg-[#1f1f23] border border-[#D8D9CF] 
                dark:border-[#404258]'>
                    <Search size={17} className='ml-4' />
                    <input 
                        type="text" 
                        placeholder='Search anything..'
                        className='px-4 py-1.5 rounded-[20px] w-full bg-[#F7F7F7] focus:outline-none 
                        dark:bg-[#1f1f23]' />
                </div>
            </div>

        </div>
        
        <div className="flex items-center gap-5 lg:gap-10">

            <CartCount />

            <div>
                <SignedOut>
                    <Link href={'/sign-in'}>
                        <div className='bg-[#1DCD9F] border border-[#169976] px-4 py-1.5 
                        rounded-[20px] cursor-pointer flex items-center gap-3'>
                            <span><LogIn size={16} className='my-1 md:my-0 text-[#030303]' /></span>
                            <span className='hidden sm:block text-[#030303]'>Sign In</span>
                        </div>
                    </Link>
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
                            dark:border-[#404258] tracking-wider text-gray-400'>
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
                                        Sign Out
                                    </button> 
                                </SignOutButton>
                            </DropdownMenuItem>      
                        </DropdownMenuContent>
                    </DropdownMenu>
                </SignedIn> 
            </div>
        </div>
    </div>

        <div className='mx-5 mb-5 flex justify-between items-center rounded-[20px] sm:hidden
        bg-[#F7F7F7] dark:bg-[#1f1f23] border border-[#D8D9CF] dark:border-[#404258]'>
            <Search size={17} className='ml-4' />
            <input 
            type="text" 
            placeholder='Search anything..'
            className='px-4 py-1.5 rounded-[20px] w-full bg-[#F7F7F7] focus:outline-none 
            dark:bg-[#1f1f23]' />
        </div>

        <MobileTabs />
    </div>
}