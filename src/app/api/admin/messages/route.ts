import { NextRequest, NextResponse } from 'next/server'
import { adminAuth, adminContactMessages } from '@/lib/admin-api'

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

        const searchParams = request.nextUrl.searchParams
        const page = parseInt(searchParams.get('page') || '1')
        const limit = parseInt(searchParams.get('limit') || '10')
        const filter = (searchParams.get('filter') || 'all') as 'all' | 'unread' | 'read' | 'replied'

        const result = await adminContactMessages.getMessages(page, limit, filter)

        if (!result.success) {
            return NextResponse.json(
                { success: false, error: result.error },
                { status: 500 }
            )
        }

        return NextResponse.json({
            success: true,
            messages: result.messages,
            totalCount: result.totalCount,
            totalPages: result.totalPages,
            currentPage: result.currentPage
        })
    } catch (error) {
        console.error('Admin messages API error:', error)
        return NextResponse.json(
            { success: false, error: 'Internal server error' },
            { status: 500 }
        )
    }
}

export async function PATCH(request: NextRequest) {
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

        const { messageId, action } = await request.json()

        if (!messageId || !action) {
            return NextResponse.json(
                { success: false, error: 'Message ID and action are required' },
                { status: 400 }
            )
        }

        let result
        if (action === 'mark_read') {
            result = await adminContactMessages.markAsRead(messageId)
        } else if (action === 'mark_replied') {
            result = await adminContactMessages.markAsReplied(messageId)
        } else {
            return NextResponse.json(
                { success: false, error: 'Invalid action' },
                { status: 400 }
            )
        }

        if (!result.success) {
            return NextResponse.json(
                { success: false, error: result.error },
                { status: 500 }
            )
        }

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Admin messages update API error:', error)
        return NextResponse.json(
            { success: false, error: 'Internal server error' },
            { status: 500 }
        )
    }
}
