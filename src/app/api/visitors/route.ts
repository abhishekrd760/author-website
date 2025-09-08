import { NextRequest, NextResponse } from 'next/server'

// Global visitor count variable
declare global {
    var visitorCount: number | undefined
}

// Initialize visitor count if not set
if (global.visitorCount === undefined) {
    global.visitorCount = 0
}

export async function POST(request: NextRequest) {
    try {
        // Increment visitor count
        global.visitorCount = (global.visitorCount || 0) + 1

        return NextResponse.json({
            success: true,
            count: global.visitorCount
        })
    } catch (error) {
        console.error('Error tracking visitor:', error)
        return NextResponse.json(
            { success: false, error: 'Failed to track visitor' },
            { status: 500 }
        )
    }
}

export async function GET() {
    try {
        return NextResponse.json({
            success: true,
            count: global.visitorCount || 0
        })
    } catch (error) {
        console.error('Error getting visitor count:', error)
        return NextResponse.json(
            { success: false, error: 'Failed to get visitor count' },
            { status: 500 }
        )
    }
}
