import { createClient } from '@supabase/supabase-js'

// Type definitions
interface StatsResult<T> {
    success: boolean
    stats?: T
    error?: string
}

interface MessageStats {
    total: number
    unread: number
    read: number
    replied: number
}

interface ReviewStats {
    total: number
    withReplies: number
    withoutReplies: number
    averageRating: number
}

// Admin-specific database interface
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

console.log('🔧 Admin API Configuration:', {
    hasUrl: !!supabaseUrl,
    hasServiceKey: !!supabaseServiceKey,
    urlPreview: supabaseUrl?.substring(0, 20) + '...',
    serviceKeyPreview: supabaseServiceKey?.substring(0, 10) + '...'
})

const adminSupabase = createClient(supabaseUrl, supabaseServiceKey)

// Admin Authentication
export const adminAuth = {
    /**
     * Login admin user with username and password
     */
    async login(username: string, password: string) {
        try {
            console.log('🔐 Admin login attempt for username:', username)

            // Get admin user by username
            const { data: adminUser, error } = await adminSupabase
                .from('admin_users')
                .select('*')
                .eq('username', username)
                .single()

            console.log('📊 Database query result:', { adminUser, error })

            if (error || !adminUser) {
                console.log('❌ Admin user not found or database error:', error)
                return { success: false, error: 'Invalid credentials' }
            }

            // Verify password
            const bcrypt = await import('bcryptjs')
            const isPasswordValid = await bcrypt.compare(password, adminUser.password_hash)

            console.log('🔑 Password validation:', { isPasswordValid, providedPassword: password, storedHash: adminUser.password_hash })

            if (!isPasswordValid) {
                console.log('❌ Password verification failed')
                return { success: false, error: 'Invalid credentials' }
            }

            // Generate session token
            const sessionToken = await generateSessionToken()
            const expiresAt = new Date()
            expiresAt.setHours(expiresAt.getHours() + 24) // 24 hour session

            // Create session
            const { error: sessionError } = await adminSupabase
                .from('admin_sessions')
                .insert({
                    admin_id: adminUser.id,
                    session_token: sessionToken,
                    expires_at: expiresAt.toISOString()
                })

            console.log('📝 Session creation result:', { sessionError, sessionToken })

            if (sessionError) {
                console.error('❌ Session creation failed:', sessionError)
                return { success: false, error: 'Failed to create session' }
            }

            // Update last login
            await adminSupabase
                .from('admin_users')
                .update({ last_login: new Date().toISOString() })
                .eq('id', adminUser.id)

            return {
                success: true,
                admin: {
                    id: adminUser.id,
                    username: adminUser.username,
                    full_name: adminUser.full_name,
                    role: adminUser.role
                },
                sessionToken
            }
        } catch (error) {
            console.error('Admin login error:', error)
            return { success: false, error: 'Login failed' }
        }
    },

    /**
     * Verify admin session token
     */
    async verifySession(sessionToken: string) {
        try {
            console.log('🔍 Verifying admin session:', sessionToken)

            // Check if session exists and is valid
            const { data: session, error } = await adminSupabase
                .from('admin_sessions')
                .select('*, admin_users(*)')
                .eq('session_token', sessionToken)
                .gte('expires_at', new Date().toISOString())
                .single()

            console.log('📊 Session verification result:', { session, error, currentTime: new Date().toISOString() })

            if (error || !session) {
                console.log('❌ Session not found or expired')
                return { success: false, error: 'Invalid session' }
            }

            console.log('✅ Session verified successfully')
            return {
                success: true,
                admin: session.admin_users,
                sessionToken: session.session_token
            }
        } catch (error) {
            console.error('❌ Session verification error:', error)
            return { success: false, error: 'Session verification failed' }
        }
    },

    /**
     * Logout admin user
     */
    async logout(sessionToken: string) {
        try {
            console.log('🚪 Admin logout for session:', sessionToken)

            // Delete session (since we don't have is_active column)
            const { error } = await adminSupabase
                .from('admin_sessions')
                .delete()
                .eq('session_token', sessionToken)

            if (error) {
                console.error('❌ Logout error:', error)
                return { success: false, error: 'Logout failed' }
            }

            console.log('✅ Admin logged out successfully')
            return { success: true }
        } catch (error) {
            console.error('❌ Logout error:', error)
            return { success: false, error: 'Logout failed' }
        }
    }
}

// Contact Messages Management
export const adminContactMessages = {
    /**
     * Get all contact messages with pagination
     */
    async getMessages(page: number = 1, limit: number = 10, filter?: 'all' | 'unread' | 'read' | 'replied') {
        try {
            console.log('📧 Getting contact messages:', { page, limit, filter })

            let query = adminSupabase
                .from('contact_messages')
                .select('*', { count: 'exact' })
                .order('created_at', { ascending: false })

            // Apply filter
            if (filter && filter !== 'all') {
                switch (filter) {
                    case 'unread':
                        query = query.eq('is_read', false)
                        break
                    case 'read':
                        query = query.eq('is_read', true)
                        break
                    case 'replied':
                        query = query.eq('has_reply', true)
                        break
                }
            }

            // Apply pagination
            const from = (page - 1) * limit
            const to = from + limit - 1
            query = query.range(from, to)

            const { data: messages, error, count } = await query

            if (error) {
                console.error('❌ Error fetching messages:', error)
                return {
                    success: false,
                    error: 'Failed to fetch messages',
                    messages: [],
                    totalCount: 0,
                    totalPages: 0
                }
            }

            const totalPages = Math.ceil((count || 0) / limit)

            console.log('✅ Messages fetched successfully:', { count: messages?.length, totalCount: count })
            return {
                success: true,
                messages: messages || [],
                totalCount: count || 0,
                totalPages,
                currentPage: page
            }
        } catch (error) {
            console.error('❌ Error in getMessages:', error)
            return {
                success: false,
                error: 'Failed to fetch messages',
                messages: [],
                totalCount: 0,
                totalPages: 0
            }
        }
    },

    /**
     * Mark message as read
     */
    async markAsRead(messageId: string) {
        try {
            console.log('📖 Marking message as read:', messageId)

            const { error } = await adminSupabase
                .from('contact_messages')
                .update({
                    is_read: true,
                    read_at: new Date().toISOString()
                })
                .eq('id', messageId)

            if (error) {
                console.error('❌ Error marking message as read:', error)
                return { success: false, error: 'Failed to mark message as read' }
            }

            console.log('✅ Message marked as read successfully')
            return { success: true }
        } catch (error) {
            console.error('❌ Error in markAsRead:', error)
            return { success: false, error: 'Failed to mark message as read' }
        }
    },

    /**
     * Mark message as replied
     */
    async markAsReplied(messageId: string) {
        try {
            console.log('📝 Marking message as replied:', messageId)

            const { error } = await adminSupabase
                .from('contact_messages')
                .update({
                    has_reply: true,
                    reply_sent_at: new Date().toISOString()
                })
                .eq('id', messageId)

            if (error) {
                console.error('❌ Error marking message as replied:', error)
                return { success: false, error: 'Failed to mark message as replied' }
            }

            console.log('✅ Message marked as replied successfully')
            return { success: true }
        } catch (error) {
            console.error('❌ Error in markAsReplied:', error)
            return { success: false, error: 'Failed to mark message as replied' }
        }
    },

    /**
     * Get message statistics
     */
    async getStats(): Promise<StatsResult<MessageStats>> {
        try {
            console.log('📊 Getting contact message stats')

            // Get total count
            const { count: totalCount } = await adminSupabase
                .from('contact_messages')
                .select('*', { count: 'exact', head: true })

            // Get unread count
            const { count: unreadCount } = await adminSupabase
                .from('contact_messages')
                .select('*', { count: 'exact', head: true })
                .eq('is_read', false)

            // Get replied count
            const { count: repliedCount } = await adminSupabase
                .from('contact_messages')
                .select('*', { count: 'exact', head: true })
                .eq('has_reply', true)

            console.log('✅ Message stats fetched successfully')
            return {
                success: true,
                stats: {
                    total: totalCount || 0,
                    unread: unreadCount || 0,
                    read: (totalCount || 0) - (unreadCount || 0),
                    replied: repliedCount || 0
                }
            }
        } catch (error) {
            console.error('❌ Error in getStats:', error)
            return {
                success: false,
                error: 'Failed to fetch stats',
                stats: { total: 0, unread: 0, read: 0, replied: 0 }
            }
        }
    }
}

// Reviews Management
export const adminReviews = {
    /**
     * Get all reviews with book information
     */
    async getReviews(page = 1, limit = 10) {
        try {
            const from = (page - 1) * limit
            const to = from + limit - 1

            const { data, error, count } = await adminSupabase
                .from('reviews')
                .select(`
          *,
          books (
            id,
            title,
            cover_image_url
          ),
          replies (
            id,
            reply_text,
            created_at
          )
        `, { count: 'exact' })
                .order('created_at', { ascending: false })
                .range(from, to)

            if (error) {
                return { success: false, error: error.message }
            }

            return {
                success: true,
                reviews: data,
                totalCount: count,
                totalPages: Math.ceil((count || 0) / limit),
                currentPage: page
            }
        } catch (error) {
            console.error('Get reviews error:', error)
            return { success: false, error: 'Failed to fetch reviews' }
        }
    },

    /**
     * Reply to a review
     */
    async replyToReview(reviewId: string, replyText: string) {
        try {
            const { data, error } = await adminSupabase
                .from('replies')
                .insert({
                    review_id: reviewId,
                    reply_text: replyText
                })
                .select()
                .single()

            if (error) {
                return { success: false, error: error.message }
            }

            return { success: true, reply: data }
        } catch (error) {
            console.error('Reply to review error:', error)
            return { success: false, error: 'Failed to reply to review' }
        }
    },

    /**
     * Get review statistics
     */
    async getStats(): Promise<StatsResult<ReviewStats>> {
        try {
            const { data: total } = await adminSupabase
                .from('reviews')
                .select('*', { count: 'exact', head: true })

            const { data: withReplies } = await adminSupabase
                .from('reviews')
                .select(`
          id,
          replies!inner (id)
        `, { count: 'exact', head: true })

            // Get average rating
            const { data: ratings } = await adminSupabase
                .from('reviews')
                .select('rating')

            const averageRating = ratings?.length
                ? ratings.reduce((sum, review) => sum + review.rating, 0) / ratings.length
                : 0

            return {
                success: true,
                stats: {
                    total: total?.length || 0,
                    withReplies: withReplies?.length || 0,
                    withoutReplies: (total?.length || 0) - (withReplies?.length || 0),
                    averageRating: Math.round(averageRating * 10) / 10
                }
            }
        } catch (error) {
            console.error('Get review stats error:', error)
            return { success: false, error: 'Failed to fetch review stats' }
        }
    }
}

// Dashboard Analytics
export const adminDashboard = {
    /**
     * Get dashboard overview data
     */
    async getOverview() {
        try {
            // Get contact message stats
            const messageStats = await adminContactMessages.getStats()

            // Get review stats
            const reviewStats = await adminReviews.getStats()

            // Get visitor count (import from visitor API logic)
            const visitorCount = await this.getVisitorCount()

            // Get recent activity (last 7 days)
            const sevenDaysAgo = new Date()
            sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

            const { data: recentMessages } = await adminSupabase
                .from('contact_messages')
                .select('*', { count: 'exact', head: true })
                .gte('created_at', sevenDaysAgo.toISOString())

            const { data: recentReviews } = await adminSupabase
                .from('reviews')
                .select('*', { count: 'exact', head: true })
                .gte('created_at', sevenDaysAgo.toISOString())

            return {
                success: true,
                overview: {
                    messages: messageStats.success ? messageStats.stats : null,
                    reviews: reviewStats.success ? reviewStats.stats : null,
                    visitors: {
                        total: visitorCount
                    },
                    recentActivity: {
                        newMessages: recentMessages?.length || 0,
                        newReviews: recentReviews?.length || 0
                    }
                }
            }
        } catch (error) {
            console.error('Get dashboard overview error:', error)
            return { success: false, error: 'Failed to fetch dashboard overview' }
        }
    },

    /**
     * Get visitor count - interface with the visitor API
     */
    async getVisitorCount() {
        // For simplicity, we'll read from the same global storage used by the visitors API
        // In a real application, this would be stored in the database
        try {
            // Access the global visitor count
            const globalAny = global as { visitorCount?: number }
            return globalAny.visitorCount || 0
        } catch (error) {
            console.error('Error getting visitor count:', error)
            return 0
        }
    }
}

// Utility function to generate session token
async function generateSessionToken(): Promise<string> {
    // Use Web Crypto API for client-side, Node.js crypto for server-side
    if (typeof window !== 'undefined') {
        const array = new Uint8Array(32)
        window.crypto.getRandomValues(array)
        return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('')
    } else {
        const crypto = await import('crypto')
        return crypto.default.randomBytes(32).toString('hex')
    }
}

const adminAPI = {
    adminAuth,
    adminContactMessages,
    adminReviews,
    adminDashboard
}

export default adminAPI
