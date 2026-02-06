import { NextResponse } from 'next/server'
import { connectDB } from '@/config/database'
import { userService } from '@/services/UserService'

export async function GET() {
  await connectDB()
  const users = await userService.getAll()
  return NextResponse.json(users)
}

export async function POST(req: Request) {
  await connectDB()

  const data = await req.json()

  if (!data.email || !data.password) {
    return NextResponse.json(
      { message: 'Missing user data' },
      { status: 400 }
    )
  }

  const user = await userService.create(data)
  return NextResponse.json(user)
}
