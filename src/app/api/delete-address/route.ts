// app/api/delete-address/route.ts
import { NextResponse } from 'next/server'
import { neon } from '@neondatabase/serverless'
import { currentUser } from '@clerk/nextjs/server'

export async function DELETE(req: Request) {
  const user = await currentUser()
  const userId = user?.id
  const { id } = await req.json()

  if (!userId || !id) {
    return NextResponse.json({ error: 'Missing user or address ID' }, { status: 400 })
  }

  const sql = neon(process.env.DATABASE_URL as string)

  try {
    await sql`DELETE FROM addresses WHERE address_id = ${id} AND user_id = ${userId}`
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Failed to delete address' }, { status: 500 })
  }
}
