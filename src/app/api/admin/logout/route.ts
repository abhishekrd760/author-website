import { NextRequest, NextResponse } from 'next/server'
import { adminAuth } from '@/lib/admin-api'

export async function POST(request: NextRequest) {
    try {
        const sessionToken = request.cookies.get('admin_session')?.value

        if (sessionToken) {
            await adminAuth.logout(sessionToken)
        }

        // Clear session cookie
        const response = NextResponse.json({ success: true })
        response.cookies.delete('admin_session')

        return response
    } catch (error) {
        console.error('Admin logout API error:', error)
        return NextResponse.json(
            { success: false, error: 'Internal server error' },
            { status: 500 }
        )
    }
}
