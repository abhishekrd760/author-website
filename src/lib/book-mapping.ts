// Mapping between frontend book IDs and database UUIDs
// This will need to be updated with your actual database UUIDs

import { createClient } from '@supabase/supabase-js'
import { Book } from '../types/database'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

export interface BookIdMapping {
    frontendId: string
    databaseId: string | null
}

// This function fetches the actual database books and creates a mapping
export async function getBookIdMapping(): Promise<Record<string, string>> {
    try {
        // Use Supabase client directly instead of fetch
        const supabase = createClient(supabaseUrl, supabaseServiceKey)

        const { data: books, error } = await supabase
            .from('books')
            .select('*')
            .order('created_at', { ascending: false })

        if (error || !books) {
            console.warn('Could not fetch books from database:', error)
            return {}
        }

        // Create mapping based on book titles or order
        // For now, let's assume the database books are in the same order as frontend books
        const mapping: Record<string, string> = {}

        books.forEach((book: Book, index: number) => {
            const frontendId = (index + 1).toString()
            mapping[frontendId] = book.id
        })

        console.log('📖 Book ID mapping created:', mapping)
        return mapping

    } catch (error) {
        console.error('Error creating book ID mapping:', error)
        return {}
    }
}

// Convert frontend book ID to database UUID
export async function frontendIdToUuid(frontendId: string): Promise<string | null> {
    const mapping = await getBookIdMapping()
    return mapping[frontendId] || null
}
