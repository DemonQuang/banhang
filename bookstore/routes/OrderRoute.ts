import { NextResponse } from 'next/server'
import { connectDB } from '@/config/database'
import { orderController } from '@/controllers/OrderController'

export async function GET(req: Request) {
    try {
        await connectDB()
        const { searchParams } = new URL(req.url)
        const userId = searchParams.get('userId')

        const orders = await orderController.getByUser(userId!)
        return NextResponse.json(orders)
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
        const order = await orderController.create(data)
        return NextResponse.json(order, { status: 201 })
    } catch (error: any) {
        return NextResponse.json(
            { message: error.message },
            { status: 400 }
        )
    }
}
