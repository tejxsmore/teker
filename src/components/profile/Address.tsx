// components/Address.tsx
import { currentUser } from '@clerk/nextjs/server'
import { neon } from '@neondatabase/serverless'
import AddressForm from './AddressForm'

async function getData() {
    const user = await currentUser()
    const userId = user?.id

    const sql = neon(process.env.DATABASE_URL as string)
    const response = await sql`SELECT * FROM addresses WHERE user_id=${userId}`

    if (response.length === 0) {
        return null
    }

    return response[0]
}

export default async function Address() {
    const data = await getData()

    if (!data) {
        return <AddressForm />
    }

    return (
        <div className="p-5 rounded-[20px] bg-[#F7F7F7] dark:bg-[#1f1f23] border 
        border-[#D8D9CF] dark:border-[#404258]">
            <h3 className="text-lg font-normal pb-5">Saved Address</h3>
            <p>{data.line1}</p>
            <p>{data.line2}</p>
            <p>{data.city}, {data.state} - {data.pincode}</p>
        </div>
    )
}
