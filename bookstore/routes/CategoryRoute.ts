import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/config/database'
import { categoryController } from '@/controllers/CategoryController'
import { roleMiddleware } from '@/middlewares/role'

// GET: Public
export async function GET() {
    try {
        await connectDB()
        const categories = await categoryController.getAll()
        return NextResponse.json(categories)
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
            const category = await categoryController.create(data)
            return NextResponse.json(category, { status: 201 })
        } catch (error: any) {
            return NextResponse.json(
                { message: error.message },
                { status: 500 }
            )
        }
    })
}
