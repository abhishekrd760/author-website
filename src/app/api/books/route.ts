import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseUrl, supabaseServiceKey)

export async function GET() {
    try {
        console.log('📚 Fetching books from database...')

        const { data: books, error } = await supabase
            .from('books')
            .select('*')
            .order('created_at', { ascending: false })

        if (error) {
            console.error('❌ Error fetching books:', error)
            return NextResponse.json({
                success: false,
                error: error.message,
                books: []
            })
        }

        console.log('✅ Books found:', books?.length || 0)

        return NextResponse.json({
            success: true,
            books: books || []
        })

    } catch (error) {
        console.error('❌ Books fetch error:', error)
        return NextResponse.json({
            success: false,
            error: 'Internal server error',
            books: []
        })
    }
}
