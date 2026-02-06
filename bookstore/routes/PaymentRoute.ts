import { NextResponse } from 'next/server'
import { connectDB } from '@/config/database'
import { paymentController } from '@/controllers/PaymentController'

export async function POST(req: Request) {
    try {
        await connectDB()
        const data = await req.json()
        const payment = await paymentController.create(data)
        return NextResponse.json(payment, { status: 201 })
    } catch (error: any) {
        return NextResponse.json(
            { message: error.message },
            { status: 400 }
        )
    }
}
