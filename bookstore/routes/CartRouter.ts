import { NextResponse } from 'next/server'
import { connectDB } from '@/config/database'
import { cartService } from '@/services/CartService'

export async function GET(req: Request) {
    await connectDB()

    const { searchParams } = new URL(req.url)
    const userId = searchParams.get('userId')

    if (!userId) {
        return NextResponse.json(
            { message: 'Missing userId' },
            { status: 400 }
        )
    }

    const cart = await cartService.getByUser(userId)
    return NextResponse.json(cart)
}


export async function POST(req: Request) {
    await connectDB()

    const data = await req.json()

    if (!data.userId) {
        return NextResponse.json(
            { message: 'Missing userId' },
            { status: 400 }
        )
    }

    const cart = await cartService.create(data.userId)
    return NextResponse.json(cart)
}
