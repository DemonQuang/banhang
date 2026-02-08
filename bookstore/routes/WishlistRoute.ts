import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/config/database'
import { wishlistController } from '@/controllers/WishlistController'
import { authMiddleware } from '@/middlewares/auth'

// =======================
// GET: USER lấy wishlist của mình
// =======================
export async function GET(req: NextRequest) {
    const auth = authMiddleware(req)
    if (auth) return auth

    try {
        await connectDB()

        const userId = req.headers.get('user-id')
        if (!userId) {
            return NextResponse.json(
                { message: 'Unauthorized' },
                { status: 401 }
            )
        }

        const wishlist = await wishlistController.getByUser(userId)
        return NextResponse.json(wishlist)
    } catch (error: any) {
        return NextResponse.json(
            { message: error.message },
            { status: 500 }
        )
    }
}

// =======================
// PUT: USER cập nhật wishlist
// =======================
export async function PUT(req: NextRequest) {
    const auth = authMiddleware(req)
    if (auth) return auth

    try {
        await connectDB()

        const userId = req.headers.get('user-id')
        if (!userId) {
            return NextResponse.json(
                { message: 'Unauthorized' },
                { status: 401 }
            )
        }

        const { books } = await req.json()

        if (!Array.isArray(books)) {
            return NextResponse.json(
                { message: 'Books must be an array' },
                { status: 400 }
            )
        }

        const wishlist = await wishlistController.update(userId, books)
        return NextResponse.json(wishlist)
    } catch (error: any) {
        return NextResponse.json(
            { message: error.message },
            { status: 500 }
        )
    }
}
