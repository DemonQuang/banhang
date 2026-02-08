import { NextResponse } from 'next/server'
import { connectDB } from '@/config/database'
import { authController } from '@/controllers/AuthController'

export async function POST(req: Request) {
    try {
        await connectDB()
        const { email, password } = await req.json()

        const result = await authController.login(email, password)

        return NextResponse.json(result)
    } catch (error: any) {
        return NextResponse.json(
            { message: error.message },
            { status: 400 }
        )
    }
}

