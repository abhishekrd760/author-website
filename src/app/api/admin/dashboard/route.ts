import { NextRequest, NextResponse } from 'next/server'
import { adminAuth, adminDashboard } from '@/lib/admin-api'

export async function GET(request: NextRequest) {
    try {
        const sessionToken = request.cookies.get('admin_session')?.value

        if (!sessionToken) {
            return NextResponse.json(
                { success: false, error: 'Unauthorized' },
                { status: 401 }
            )
        }

        const authResult = await adminAuth.verifySession(sessionToken)
        if (!authResult.success) {
            return NextResponse.json(
                { success: false, error: 'Invalid session' },
                { status: 401 }
            )
        }

        const result = await adminDashboard.getOverview()

        if (!result.success) {
            return NextResponse.json(
                { success: false, error: result.error },
                { status: 500 }
            )
        }

        return NextResponse.json({
            success: true,
            overview: result.overview
        })
    } catch (error) {
        console.error('Admin dashboard API error:', error)
        return NextResponse.json(
            { success: false, error: 'Internal server error' },
            { status: 500 }
        )
    }
}
