import { NextResponse } from 'next/server'
import { connectDB } from '@/config/database'
import { wishlistController } from '@/controllers/WishlistController'

export async function GET(req: Request) {
    try {
        await connectDB()
        const { searchParams } = new URL(req.url)
        const userId = searchParams.get('userId')

        const wishlist = await wishlistController.getByUser(userId!)
        return NextResponse.json(wishlist)
    } catch (error: any) {
        return NextResponse.json(
            { message: error.message },
            { status: 400 }
        )
    }
}

export async function PUT(req: Request) {
    try {
        await connectDB()
        const data = await req.json()
        const wishlist = await wishlistController.update(
            data.userId,
            data.books
        )
        return NextResponse.json(wishlist)
    } catch (error: any) {
        return NextResponse.json(
            { message: error.message },
            { status: 400 }
        )
    }
}
