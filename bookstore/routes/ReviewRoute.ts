import { NextResponse } from 'next/server'
import { connectDB } from '@/config/database'
import { reviewController } from '@/controllers/ReviewController'

export async function GET(req: Request) {
    try {
        await connectDB()
        const { searchParams } = new URL(req.url)
        const bookId = searchParams.get('bookId')

        const reviews = await reviewController.getByBook(bookId!)
        return NextResponse.json(reviews)
    } catch (error: any) {
        return NextResponse.json(
            { message: error.message },
            { status: 400 }
        )
    }
}

export async function POST(req: Request) {
    try {
        await connectDB()
        const data = await req.json()
        const review = await reviewController.create(data)
        return NextResponse.json(review, { status: 201 })
    } catch (error: any) {
        return NextResponse.json(
            { message: error.message },
            { status: 400 }
        )
    }
}
