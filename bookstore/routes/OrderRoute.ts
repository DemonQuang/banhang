import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/config/database'
import { orderController } from '@/controllers/OrderController'
import { authMiddleware } from '@/middlewares/auth'

// =======================
// GET: USER xem đơn hàng của mình
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

        const orders = await orderController.getByUser(userId)
        return NextResponse.json(orders)
    } catch (error: any) {
        return NextResponse.json(
            { message: error.message },
            { status: 500 }
        )
    }
}

// =======================
// POST: USER tạo đơn hàng
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

        if (!Array.isArray(data.items) || data.items.length === 0) {
            return NextResponse.json(
                { message: 'Invalid order items' },
                { status: 400 }
            )
        }

        const order = await orderController.create({
            ...data,
            user: userId
        })

        return NextResponse.json(order, { status: 201 })
    } catch (error: any) {
        return NextResponse.json(
            { message: error.message },
            { status: 500 }
        )
    }
}
