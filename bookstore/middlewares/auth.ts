import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from '@/config/jwt'

export function authMiddleware(req: NextRequest) {
    const authHeader = req.headers.get('authorization')

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return NextResponse.json(
            { message: 'Unauthorized - Missing token' },
            { status: 401 }
        )
    }

    const token = authHeader.split(' ')[1]

    try {
        const decoded = verifyToken(token) as {
            id: string
            role: string
            email: string
        }

        // Gắn user info vào headers
        const requestHeaders = new Headers(req.headers)
        requestHeaders.set('x-user-id', decoded.id)
        requestHeaders.set('x-user-role', decoded.role)


        return NextResponse.next({
            request: {
                headers: requestHeaders
            }
        })
    } catch (error) {
        return NextResponse.json(
            { message: 'Invalid or expired token' },
            { status: 401 }
        )
    }
}
