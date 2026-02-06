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
        const decoded = verifyToken(token) as any

        // Gắn userId vào headers để controller dùng
        const requestHeaders = new Headers(req.headers)
        requestHeaders.set('userId', decoded.id)

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
