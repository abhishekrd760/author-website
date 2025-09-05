import { NextRequest, NextResponse } from 'next/server'
import { adminAuth, adminReviews } from '@/lib/admin-api'

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

        const result = await adminReviews.getReviews(page, limit)

        if (!result.success) {
            return NextResponse.json(
                { success: false, error: result.error },
                { status: 500 }
            )
        }

        return NextResponse.json({
            success: true,
            reviews: result.reviews,
            totalCount: result.totalCount,
            totalPages: result.totalPages,
            currentPage: result.currentPage
        })
    } catch (error) {
        console.error('Admin reviews API error:', error)
        return NextResponse.json(
            { success: false, error: 'Internal server error' },
            { status: 500 }
        )
    }
}

export async function POST(request: NextRequest) {
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

        const { reviewId, replyText } = await request.json()

        if (!reviewId || !replyText) {
            return NextResponse.json(
                { success: false, error: 'Review ID and reply text are required' },
                { status: 400 }
            )
        }

        const result = await adminReviews.replyToReview(reviewId, replyText)

        if (!result.success) {
            return NextResponse.json(
                { success: false, error: result.error },
                { status: 500 }
            )
        }

        return NextResponse.json({
            success: true,
            reply: result.reply
        })
    } catch (error) {
        console.error('Admin review reply API error:', error)
        return NextResponse.json(
            { success: false, error: 'Internal server error' },
            { status: 500 }
        )
    }
}
