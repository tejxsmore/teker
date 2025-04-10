import { auth, currentUser } from '@clerk/nextjs/server'
import Link from 'next/link'
import { ArrowRight, Box, CircleArrowRight, ListCheck, Settings } from 'lucide-react'

let INRupee = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
});

export default async function Profile() {
  const { userId } = await auth()

  if (!userId) {
    return <div className='p-5 min-h-screen'>
        <p className=''>Please login to view this page</p>
    </div>
  }

  const user = await currentUser()
  const userFullName = user?.fullName
  const userEmail = user?.emailAddresses[0].emailAddress

  return <div className='p-5 space-y-5 min-h-screen md:flex md:gap-5'>
    <div className='space-y-5 md:w-1/2'>
    <div className='rounded-[20px] bg-[#F7F7F7] dark:bg-[#1f1f23] 
      border border-[#D8D9CF] dark:border-[#404258]'>
      <div className='p-5 space-y-2.5 '>
        <h2 className='text-2xl font-semibold'>{userFullName}</h2>
        <h2>{userEmail}</h2>
      </div>
      <Link 
      href={'/profile/details'} 
      className='p-5 flex items-center gap-3 border-t border-[#D8D9CF] 
      dark:border-[#404258] group'>
        <p>Your details</p> 
        <span className='transition-transform duration-200 ease-in-out group-hover:translate-x-1'>
          <ArrowRight size={17} />
        </span>
      </Link>
    </div>

    <div className='grid grid-cols-2 md:grid-cols-4 gap-5'>
      <Link 
        href={'/profile/orders'} 
        className='flex items-center gap-3 p-5 rounded-[20px] bg-[#F7F7F7] dark:bg-[#1f1f23]
        border border-[#D8D9CF] dark:border-[#404258]'
      >
        <Box size={17} />
        Your Orders
      </Link>

      <Link 
        href={'/profile/buy-again'} 
        className='flex items-center gap-3 p-5 rounded-[20px] bg-[#F7F7F7] dark:bg-[#1f1f23]
        border border-[#D8D9CF] dark:border-[#404258]'
      >
        <CircleArrowRight size={17} />
        Buy Again
      </Link>

      <Link 
        href={'/profile/list'} 
        className='flex items-center gap-3 p-5 rounded-[20px] bg-[#F7F7F7] dark:bg-[#1f1f23]
        border border-[#D8D9CF] dark:border-[#404258]'
      >
        <ListCheck size={17} />
        List
      </Link>

      <Link 
        href={'/profile/settings'} 
        className='flex items-center gap-3 p-5 rounded-[20px] bg-[#F7F7F7] dark:bg-[#1f1f23]
        border border-[#D8D9CF] dark:border-[#404258]'
      >
        <Settings size={17} />
        Settings
      </Link>
    </div>
    </div>

    <div className='p-5 md:w-1/2 md:h-full rounded-[20px] bg-[#F7F7F7] dark:bg-[#1f1f23] 
      border border-[#D8D9CF] dark:border-[#404258] space-y-5'>

        <h2 className='text-2xl font-semibold'> Teker Money </h2>
        
        <div className='space-y-3'>
          <p className='text-gray-500'>Balance</p>
          <p className='text-4xl font-semibold'>{INRupee.format(2700)}</p>
        </div>

        <button 
        className='w-full bg-[#1DCD9F] border border-[#169976] px-4 py-1.5 rounded-[20px]
        cursor-pointer items-center gap-3 text-[#030303]'>Withdraw</button>

        <div className='text-gray-500 pt-5 border-t-2 border-dashed 
        border-[#D8D9CF] dark:border-[#404258]'>
          <p>Teker money will be used for all your orders accross categories and brands. 
            You can withdraw it anytime into your bank account</p>
        </div>
    </div>


  </div>
}