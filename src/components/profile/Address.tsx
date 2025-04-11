// components/Address.tsx
import { currentUser } from '@clerk/nextjs/server'
import { neon } from '@neondatabase/serverless'
import AddressForm from './AddressForm'
import DeleteAddress from './DeleteAddress'

async function getData() {
    const user = await currentUser()
    const userId = user?.id

    const sql = neon(process.env.DATABASE_URL as string)
    const response = await sql`SELECT * FROM address WHERE user_id=${userId}`
 
    if (response.length === 0) {
        return null
    }

    return response
}

export default async function Address() {
    const data = await getData()

    if (!data) {
        return <AddressForm hasSavedAddress={false} />
    }

    return ( 
        <div className='flex flex-col space-y-5 md:w-1/2 h-full'>
            <div className='p-5 rounded-[20px] bg-[#F7F7F7] dark:bg-[#1f1f23] border 
            border-[#D8D9CF] dark:border-[#404258] space-y-5'>

                        <h2 className="text-lg font-normal">Saved Address</h2>

                        {data.map((address, counter)=>(
                            <div key={address.address_id} className='border-t-2 border-dashed 
                            border-[#D8D9CF] dark:border-[#404258] pt-5 space-y-5'>
                                <div className='flex justify-between items-center'>
                                    <h3 className="text-lg font-normal">{address.address_title || `Address ${counter + 1}`}</h3>
                                    
                                    <DeleteAddress id={address.address_id} />
                                </div>

                                <div className='space-y-1'>
                                    <p className='text-lg font-semibold'>{address.address_line1}</p>
                                    <p>{address.address_line2}</p>
                                    <p>{address.city}, {address.state}</p>
                                    <p>{address.pincode}</p>
                                </div>
                            </div>
                        ))}
            </div>

            <AddressForm hasSavedAddress={true} />
        </div>
    )
}
