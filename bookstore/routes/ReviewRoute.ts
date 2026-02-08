import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/config/database'
import { reviewController } from '@/controllers/ReviewController'
import { authMiddleware } from '@/middlewares/auth'

// =======================
// GET: Public – xem review theo book
// =======================
export async function GET(req: NextRequest) {
    try {
        await connectDB()

        const { searchParams } = new URL(req.url)
        const bookId = searchParams.get('bookId')

        if (!bookId) {
            return NextResponse.json(
                { message: 'Missing bookId' },
                { status: 400 }
            )
        }

        const reviews = await reviewController.getByBook(bookId)
        return NextResponse.json(reviews)
    } catch (error: any) {
        return NextResponse.json(
            { message: error.message },
            { status: 500 }
        )
    }
}

// =======================
// POST: USER đăng nhập mới được review
// =======================
export async function POST(req: NextRequest) {
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

        const data = await req.json()

        if (!data.book || !data.rating || !data.comment) {
            return NextResponse.json(
                { message: 'Invalid review data' },
                { status: 400 }
            )
        }

        const review = await reviewController.create({
            ...data,
            user: userId
        })

        return NextResponse.json(review, { status: 201 })
    } catch (error: any) {
        return NextResponse.json(
            { message: error.message },
            { status: 500 }
        )
    }
}
