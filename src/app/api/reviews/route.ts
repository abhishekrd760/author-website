import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { frontendIdToUuid } from '@/lib/book-mapping'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseUrl, supabaseServiceKey)

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { book_id, reviewer_name, review_text, rating } = body

        // Validate required fields
        if (!book_id || !reviewer_name || !review_text || !rating) {
            return NextResponse.json(
                { success: false, error: 'Missing required fields' },
                { status: 400 }
            )
        }

        // Validate rating
        if (rating < 1 || rating > 5) {
            return NextResponse.json(
                { success: false, error: 'Rating must be between 1 and 5' },
                { status: 400 }
            )
        }

        console.log('📝 Submitting review to database:', {
            book_id,
            reviewer_name,
            review_text: review_text.substring(0, 50) + '...',
            rating
        })

        // Convert frontend book ID to database UUID
        const databaseBookId = await frontendIdToUuid(book_id)

        if (!databaseBookId) {
            console.error('❌ Could not find database ID for frontend book ID:', book_id)
            return NextResponse.json(
                { success: false, error: 'Invalid book ID' },
                { status: 400 }
            )
        }

        console.log('🔄 Mapping frontend book ID', book_id, 'to database UUID', databaseBookId)

        // Insert review into database
        const { data, error } = await supabase
            .from('reviews')
            .insert([{
                book_id: databaseBookId, // Use the database UUID
                reviewer_name: reviewer_name.trim(),
                review_text: review_text.trim(),
                rating: parseInt(rating),
                created_at: new Date().toISOString()
            }])
            .select()
            .single()

        if (error) {
            console.error('❌ Database error:', error)
            return NextResponse.json(
                { success: false, error: 'Failed to save review to database' },
                { status: 500 }
            )
        }

        console.log('✅ Review successfully saved:', data.id)

        return NextResponse.json({
            success: true,
            data: data
        })

    } catch (error) {
        console.error('❌ Review submission error:', error)
        return NextResponse.json(
            { success: false, error: 'Internal server error' },
            { status: 500 }
        )
    }
}

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams
        const bookId = searchParams.get('book_id')

        if (!bookId) {
            return NextResponse.json(
                { success: false, error: 'Book ID is required' },
                { status: 400 }
            )
        }

        console.log('📖 Fetching reviews for book:', bookId)

        // Convert frontend book ID to database UUID
        const databaseBookId = await frontendIdToUuid(bookId)

        if (!databaseBookId) {
            console.error('❌ Could not find database ID for frontend book ID:', bookId)
            return NextResponse.json({
                success: true,
                data: [] // Return empty array if book not found
            })
        }

        console.log('🔄 Mapping frontend book ID', bookId, 'to database UUID', databaseBookId)

        // Try to fetch reviews with replies, but fallback to just reviews if replies table doesn't exist
        let { data: reviews, error } = await supabase
            .from('reviews')
            .select(`
                *,
                replies (
                    id,
                    reply_text,
                    created_at
                )
            `)
            .eq('book_id', databaseBookId) // Use the database UUID
            .order('created_at', { ascending: false })

        // If replies table doesn't exist, fetch just reviews
        if (error && error.message.includes('replies')) {
            console.log('⚠️ Replies table not found, fetching reviews only')
            const { data: reviewsOnly, error: reviewsError } = await supabase
                .from('reviews')
                .select('*')
                .eq('book_id', databaseBookId) // Use the database UUID
                .order('created_at', { ascending: false })

            if (reviewsError) {
                console.error('❌ Error fetching reviews:', reviewsError)
                return NextResponse.json(
                    { success: false, error: 'Failed to fetch reviews' },
                    { status: 500 }
                )
            }

            // Add empty replies array to each review
            reviews = reviewsOnly?.map(review => ({ ...review, replies: [] })) || []
            error = null
        }

        if (error) {
            console.error('❌ Error fetching reviews:', error)
            return NextResponse.json(
                { success: false, error: 'Failed to fetch reviews' },
                { status: 500 }
            )
        }

        console.log('✅ Reviews fetched successfully:', reviews?.length || 0)

        return NextResponse.json({
            success: true,
            data: reviews || []
        })

    } catch (error) {
        console.error('❌ Reviews fetch error:', error)
        return NextResponse.json(
            { success: false, error: 'Internal server error' },
            { status: 500 }
        )
    }
}
