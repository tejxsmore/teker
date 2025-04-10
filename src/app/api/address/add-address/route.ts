import { NextResponse } from 'next/server'
import { neon } from '@neondatabase/serverless'
import { currentUser } from '@clerk/nextjs/server'

const sql = neon(process.env.DATABASE_URL!)

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const user = await currentUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { title, line1, line2, city, state, pincode } = body

    await sql`
      INSERT INTO address (user_id, address_title, address_line1, address_line2, city, state, pincode)
      VALUES (${user.id}, ${title},${line1}, ${line2}, ${city}, ${state}, ${pincode})
    `
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('DB Insert Error:', err)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}