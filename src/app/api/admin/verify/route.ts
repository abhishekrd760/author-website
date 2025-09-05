import { NextRequest, NextResponse } from 'next/server'
import { adminAuth } from '@/lib/admin-api'

export async function GET(request: NextRequest) {
    try {
        const sessionToken = request.cookies.get('admin_session')?.value

        if (!sessionToken) {
            return NextResponse.json(
                { success: false, error: 'No session token' },
                { status: 401 }
            )
        }

        const result = await adminAuth.verifySession(sessionToken)

        if (!result.success) {
            // Clear invalid session cookie
            const response = NextResponse.json(
                { success: false, error: result.error },
                { status: 401 }
            )
            response.cookies.delete('admin_session')
            return response
        }

        return NextResponse.json({
            success: true,
            admin: result.admin
        })
    } catch (error) {
        console.error('Admin verify API error:', error)
        return NextResponse.json(
            { success: false, error: 'Internal server error' },
            { status: 500 }
        )
    }
}
