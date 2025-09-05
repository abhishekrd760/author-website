import { NextRequest, NextResponse } from 'next/server'
import { adminAuth } from '@/lib/admin-api'

export async function POST(request: NextRequest) {
    try {
        const { username, password } = await request.json()

        if (!username || !password) {
            return NextResponse.json(
                { success: false, error: 'Username and password are required' },
                { status: 400 }
            )
        }

        const result = await adminAuth.login(username, password)

        if (!result.success) {
            return NextResponse.json(
                { success: false, error: result.error },
                { status: 401 }
            )
        }

        // Set session cookie
        const response = NextResponse.json({
            success: true,
            admin: result.admin
        })

        response.cookies.set('admin_session', result.sessionToken!, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 60 * 24 // 24 hours
        })

        return response
    } catch (error) {
        console.error('Admin login API error:', error)
        return NextResponse.json(
            { success: false, error: 'Internal server error' },
            { status: 500 }
        )
    }
}
