import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/config/database'
import { bookController } from '@/controllers/BookController'
import { roleMiddleware } from '@/middlewares/role'

// GET: Public
export async function GET() {
    try {
        await connectDB()
        const books = await bookController.getAll()
        return NextResponse.json(books)
    } catch (error: any) {
        return NextResponse.json(
            { message: error.message },
            { status: 500 }
        )
    }
}

// POST: ADMIN only
export async function POST(req: NextRequest) {
    return roleMiddleware(req, ['ADMIN'], async () => {
        try {
            await connectDB()
            const data = await req.json()
            const book = await bookController.create(data)
            return NextResponse.json(book, { status: 201 })
        } catch (error: any) {
            return NextResponse.json(
                { message: error.message },
                { status: 500 }
            )
        }
    })
}
