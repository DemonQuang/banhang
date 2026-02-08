import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/config/database'
import { userController } from '@/controllers/UserController'
import { authMiddleware } from '@/middlewares/auth'
import { roleMiddleware } from '@/middlewares/role'

// =======================
// GET: ADMIN xem danh sách user
// =======================
export async function GET(req: NextRequest) {
    const auth = authMiddleware(req)
    if (auth) return auth

    return roleMiddleware(req, ['ADMIN'], async () => {
        try {
            await connectDB()
            const users = await userController.getAll()
            return NextResponse.json(users)
        } catch (error: any) {
            return NextResponse.json(
                { message: error.message },
                { status: 500 }
            )
        }
    })
}

// =======================
// POST: Register USER
// =======================
export async function POST(req: NextRequest) {
    try {
        await connectDB()

        const data = await req.json()
        const { name, email, password } = data

        if (!name || !email || !password) {
            return NextResponse.json(
                { message: 'Name, email and password are required' },
                { status: 400 }
            )
        }

        const user = await userController.register({
            name,
            email,
            password
        })

        return NextResponse.json(user, { status: 201 })
    } catch (error: any) {
        return NextResponse.json(
            { message: error.message },
            { status: 400 }
        )
    }
}
