import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function withAuth(
    req: NextRequest,
    roles: string[] | null,
    handler: () => Promise<NextResponse>
) {
    const authResult = authMiddleware(req)
    if (authResult instanceof NextResponse) return authResult

    if (roles) {
        const role = req.headers.get('user-role')
        if (!role || !roles.includes(role)) {
            return NextResponse.json(
                { message: 'Forbidden - No permission' },
                { status: 403 }
            )
        }
    }

    return handler()
}

