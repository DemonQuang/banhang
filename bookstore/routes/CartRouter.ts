import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/config/database'
import { cartService } from '@/services/CartService'
import { authMiddleware } from '@/middlewares/auth'

export async function GET(req: NextRequest) {
    const auth = authMiddleware(req)
    if (auth) return auth

    try {
        await connectDB()

        const userId = (req as any).user.id
        const cart = await cartService.getByUser(userId)

        return NextResponse.json(cart)
    } catch (error: any) {
        return NextResponse.json(
            { message: error.message },
            { status: 500 }
        )
    }
}

export async function PUT(req: NextRequest) {
    const auth = authMiddleware(req)
    if (auth) return auth

    try {
        await connectDB()

        const userId = (req as any).user.id
        const { items } = await req.json()

        if (!Array.isArray(items)) {
            return NextResponse.json(
                { message: 'Invalid items' },
                { status: 400 }
            )
        }

        const cart = await cartService.update(userId, items)
        return NextResponse.json(cart)
    } catch (error: any) {
        return NextResponse.json(
            { message: error.message },
            { status: 500 }
        )
    }
}
