import { createClient } from '@supabase/supabase-js'
import { mockAPI } from './mockData'
import { Review, ReviewSubmissionData, ContactMessageSubmissionData } from '../types/database'

// Supabase configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Check if we have valid Supabase credentials
const hasValidSupabaseConfig = supabaseUrl &&
    supabaseKey &&
    supabaseUrl !== 'your_supabase_url_here' &&
    supabaseKey !== 'your_supabase_anon_key_here' &&
    supabaseUrl.includes('supabase.co')

// Create Supabase client
export const supabase = hasValidSupabaseConfig
    ? createClient(supabaseUrl, supabaseKey)
    : null

// Enhanced API functions that work with both Supabase and mock data
export const api = {
    // Books
    async getBooks() {
        if (supabase) {
            try {
                const { data, error } = await supabase
                    .from('books')
                    .select('*')
                    .order('created_at', { ascending: false })

                if (error) throw error
                return data || []
            } catch (error) {
                console.error('Supabase error, falling back to mock data:', error)
                const mockData = await mockAPI.getBooks()
                return mockData
            }
        }
        return mockAPI.getBooks()
    },

    async getBookById(id: string) {
        if (supabase) {
            try {
                const { data, error } = await supabase
                    .from('books')
                    .select('*')
                    .eq('id', id)
                    .single()

                if (error) throw error
                return data
            } catch (error) {
                console.error('Supabase error, falling back to mock data:', error)
                return mockAPI.getBookById(id)
            }
        }
        return mockAPI.getBookById(id)
    },

    async getFeaturedBooks() {
        if (supabase) {
            try {
                const { data, error } = await supabase
                    .from('books')
                    .select('*')
                    .eq('is_featured', true)
                    .order('created_at', { ascending: false })
                    .limit(3)

                if (error) throw error
                return data || []
            } catch (error) {
                console.error('Supabase error, falling back to mock data:', error)
                const mockData = await mockAPI.getBooks()
                return mockData.slice(0, 3)
            }
        }
        const mockData = await mockAPI.getBooks()
        return mockData.slice(0, 3)
    },

    // Reviews
    async getReviews() {
        if (supabase) {
            try {
                const { data, error } = await supabase
                    .from('reviews')
                    .select(`
                        *,
                        book:books(*)
                    `)
                    .eq('is_approved', true)
                    .order('created_at', { ascending: false })

                if (error) throw error
                return data || []
            } catch (error) {
                console.error('Supabase error, falling back to mock data:', error)
                return mockAPI.getReviews()
            }
        }
        return mockAPI.getReviews()
    },

    async getReviewsByBookId(bookId: string) {
        if (supabase) {
            try {
                const { data, error } = await supabase
                    .from('reviews')
                    .select('*')
                    .eq('book_id', bookId)
                    .eq('is_approved', true)
                    .order('created_at', { ascending: false })

                if (error) throw error
                return data || []
            } catch (error) {
                console.error('Supabase error, falling back to mock data:', error)
                const mockData = await mockAPI.getReviews()
                return mockData.filter((r: Review) => r.book_id === bookId)
            }
        }
        const mockData = await mockAPI.getReviews()
        return mockData.filter((r: Review) => r.book_id === bookId)
    },

    async submitReview(reviewData: ReviewSubmissionData) {
        if (supabase) {
            try {
                const { data, error } = await supabase
                    .from('reviews')
                    .insert([{
                        ...reviewData,
                        is_approved: false // Reviews need approval
                    }])
                    .select()
                    .single()

                if (error) throw error
                return { success: true, data }
            } catch (error) {
                console.error('Supabase error:', error)
                return { success: false, error: 'Failed to submit review' }
            }
        }
        // Mock submission
        return { success: true, data: reviewData }
    },

    // Contact
    async submitContactMessage(messageData: ContactMessageSubmissionData) {
        if (supabase) {
            try {
                const { data, error } = await supabase
                    .from('contact_messages')
                    .insert([messageData])
                    .select()
                    .single()

                if (error) throw error
                return { success: true, data }
            } catch (error) {
                console.error('Supabase error:', error)
                return { success: false, error: 'Failed to send message' }
            }
        }
        // Mock submission
        return { success: true, data: messageData }
    },

    // Authors
    async getAuthor() {
        if (supabase) {
            try {
                const { data, error } = await supabase
                    .from('authors')
                    .select('*')
                    .limit(1)
                    .single()

                if (error) throw error
                return data
            } catch (error) {
                console.error('Supabase error, falling back to mock data:', error)
                // Return mock author data
                return {
                    id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
                    name: 'Jane Doe',
                    bio: 'Jane Doe is a bestselling author known for her captivating stories that blend mystery, romance, and fantasy.',
                    email: 'jane@janedoeauthor.com',
                    website: 'https://janedoeauthor.com',
                    social_links: {
                        twitter: 'https://twitter.com/janedoe',
                        instagram: 'https://instagram.com/janedoeauthor',
                        goodreads: 'https://goodreads.com/janedoe'
                    },
                    profile_image_url: '/images/author-photo.jpg'
                }
            }
        }
        // Return mock author data
        return {
            id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
            name: 'Jane Doe',
            bio: 'Jane Doe is a bestselling author known for her captivating stories that blend mystery, romance, and fantasy.',
            email: 'jane@janedoeauthor.com',
            website: 'https://janedoeauthor.com',
            social_links: {
                twitter: 'https://twitter.com/janedoe',
                instagram: 'https://instagram.com/janedoeauthor',
                goodreads: 'https://goodreads.com/janedoe'
            },
            profile_image_url: '/images/author-photo.jpg'
        }
    }
}

// Export for backward compatibility
export { api as mockAPI }
