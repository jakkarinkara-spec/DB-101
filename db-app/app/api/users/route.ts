// app/api/users/route.ts
import { NextResponse } from 'next/server'
import sql from '@/lib/db'

export async function GET() {
  const users = await sql`SELECT * FROM users LIMIT 10`
  return NextResponse.json(users)
}