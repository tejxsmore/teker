import { currentUser } from '@clerk/nextjs/server'
import Address from '@/components/profile/Address'

export default async function Details(){

    const user = await currentUser()
    const userFullName = user?.fullName
    const username = user?.username
    const userPhone = user?.phoneNumbers[0].phoneNumber
    const userEmail = user?.emailAddresses[0].emailAddress

    return <div className='p-5 space-y-5 min-h-screen md:flex md:gap-5'>
        <div className='p-5 md:w-1/2 h-full rounded-[20px] bg-[#F7F7F7] dark:bg-[#1f1f23] 
        border border-[#D8D9CF] dark:border-[#404258]'>
            <div className='border-b-2 border-dashed border-[#D8D9CF] 
            dark:border-[#404258] pb-5 '>
                <p className='text-sm text-gray-500'>Name</p>
                <h2 className='text-lg font-normal'>{userFullName}</h2>
            </div>
            <div className='border-b-2 border-dashed border-[#D8D9CF] 
            dark:border-[#404258] py-5'>
                <p className='text-sm text-gray-500'>Phone</p>
                <h2 className='text-lg font-normal'>{userPhone?.slice(3)}</h2>
            </div>
            <div className='border-b-2 border-dashed border-[#D8D9CF] 
            dark:border-[#404258] py-5'>
                <p className='text-sm text-gray-500'>Username</p>
                <h2 className='text-lg font-normal'>@{username}</h2>
            </div>
            <div className='pt-5'>
                <p className='text-sm text-gray-500'>Email</p>
                <h2 className='text-lg font-normal'>{userEmail}</h2>
            </div>
        </div>

        <Address />
    </div>
}