import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/config/database'
import { paymentController } from '@/controllers/PaymentController'
import { authMiddleware } from '@/middlewares/auth'

// =======================
// POST: USER thanh toán đơn hàng
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

        if (!data.orderId || !data.amount || !data.method) {
            return NextResponse.json(
                { message: 'Missing payment data' },
                { status: 400 }
            )
        }

        const payment = await paymentController.create({
            ...data,
            user: userId
        })

        return NextResponse.json(payment, { status: 201 })
    } catch (error: any) {
        return NextResponse.json(
            { message: error.message },
            { status: 500 }
        )
    }
}
