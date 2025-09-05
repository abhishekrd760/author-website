// Mock admin data for development when Supabase is not set up
const mockAdminUser = {
    id: '1',
    username: 'admin',
    password_hash: '$2b$10$7gNkSqNgngVPdW2/s5GsWuvg2D2AivYDCDPbrOOKNnj.jjsOZHxtC', // admin123
    full_name: 'Tori Man',
    role: 'super_admin'
}

const mockContactMessages = [
    {
        id: '1',
        name: 'John Reader',
        email: 'john@example.com',
        subject: 'Book Signing Event',
        message: 'Hi Tori, I loved your latest book! Will you be doing any book signing events in New York?',
        is_read: false,
        replied: false,
        created_at: new Date().toISOString()
    },
    {
        id: '2',
        name: 'Sarah Wilson',
        email: 'sarah.w@email.com',
        subject: 'Interview Request',
        message: 'Hello, I\'m a journalist with BookWorld Magazine. Would you be interested in an interview about your writing process?',
        is_read: false,
        replied: false,
        created_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
    },
    {
        id: '3',
        name: 'Mike Thompson',
        email: 'mike.t@bookclub.com',
        subject: 'Book Club Invitation',
        message: 'Our book club has selected your novel for next month. Would you like to join our virtual discussion?',
        is_read: true,
        replied: true,
        created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
    }
]

const mockReviews = [
    {
        id: '1',
        book_id: '1',
        reviewer_name: 'BookLover123',
        review_text: 'Absolutely captivating! I couldn\'t put this book down. The characters were so well-developed and the mystery kept me guessing until the very end.',
        rating: 5,
        created_at: new Date().toISOString(),
        books: {
            id: '1',
            title: 'The Midnight Garden',
            cover_image_url: '/images/book1-cover.jpg'
        },
        replies: []
    },
    {
        id: '2',
        book_id: '1',
        reviewer_name: 'ReadingEnthusiast',
        review_text: 'Beautiful writing and atmospheric setting. The Victorian England backdrop was perfectly researched and brought to life.',
        rating: 4,
        created_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        books: {
            id: '1',
            title: 'The Midnight Garden',
            cover_image_url: '/images/book1-cover.jpg'
        },
        replies: [{
            id: '1',
            reply_text: 'Thank you so much! I spent months researching Victorian England to make it authentic.',
            created_at: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString()
        }]
    }
]

export const mockAdminAPI = {
    // Admin Authentication
    adminAuth: {
        async login(username: string, password: string) {
            try {
                if (username !== 'admin') {
                    return { success: false, error: 'Invalid credentials' }
                }

                const bcrypt = await import('bcryptjs')
                const isPasswordValid = await bcrypt.compare(password, mockAdminUser.password_hash)

                if (!isPasswordValid) {
                    return { success: false, error: 'Invalid credentials' }
                }

                // Generate mock session token
                const sessionToken = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)

                return {
                    success: true,
                    admin: {
                        id: mockAdminUser.id,
                        username: mockAdminUser.username,
                        full_name: mockAdminUser.full_name,
                        role: mockAdminUser.role
                    },
                    sessionToken
                }
            } catch (error) {
                return { success: false, error: 'Login failed' }
            }
        },

        async verifySession(sessionToken: string) {
            // For mock, just check if token exists and is not empty
            if (!sessionToken || sessionToken.length < 10) {
                return { success: false, error: 'Invalid session' }
            }

            return {
                success: true,
                admin: {
                    id: mockAdminUser.id,
                    username: mockAdminUser.username,
                    full_name: mockAdminUser.full_name,
                    role: mockAdminUser.role
                }
            }
        },

        async logout(sessionToken: string) {
            return { success: true }
        }
    },

    // Contact Messages Management
    adminContactMessages: {
        async getMessages(page = 1, limit = 10, filter = 'all') {
            let filteredMessages = [...mockContactMessages]

            if (filter === 'unread') {
                filteredMessages = filteredMessages.filter(m => !m.is_read)
            } else if (filter === 'read') {
                filteredMessages = filteredMessages.filter(m => m.is_read)
            } else if (filter === 'replied') {
                filteredMessages = filteredMessages.filter(m => m.replied)
            }

            const start = (page - 1) * limit
            const paginatedMessages = filteredMessages.slice(start, start + limit)

            return {
                success: true,
                messages: paginatedMessages,
                totalCount: filteredMessages.length,
                totalPages: Math.ceil(filteredMessages.length / limit),
                currentPage: page
            }
        },

        async markAsRead(messageId: string) {
            const message = mockContactMessages.find(m => m.id === messageId)
            if (message) {
                message.is_read = true
            }
            return { success: true }
        },

        async markAsReplied(messageId: string) {
            const message = mockContactMessages.find(m => m.id === messageId)
            if (message) {
                message.replied = true
            }
            return { success: true }
        },

        async getStats() {
            const total = mockContactMessages.length
            const unread = mockContactMessages.filter(m => !m.is_read).length
            const replied = mockContactMessages.filter(m => m.replied).length

            return {
                success: true,
                stats: {
                    total,
                    unread,
                    replied,
                    read: total - unread
                }
            }
        }
    },

    // Reviews Management
    adminReviews: {
        async getReviews(page = 1, limit = 10) {
            const start = (page - 1) * limit
            const paginatedReviews = mockReviews.slice(start, start + limit)

            return {
                success: true,
                reviews: paginatedReviews,
                totalCount: mockReviews.length,
                totalPages: Math.ceil(mockReviews.length / limit),
                currentPage: page
            }
        },

        async replyToReview(reviewId: string, replyText: string) {
            const review = mockReviews.find(r => r.id === reviewId)
            if (review) {
                const newReply = {
                    id: Date.now().toString(),
                    reply_text: replyText,
                    created_at: new Date().toISOString()
                }
                review.replies.push(newReply)
                return { success: true, reply: newReply }
            }
            return { success: false, error: 'Review not found' }
        },

        async getStats() {
            const total = mockReviews.length
            const withReplies = mockReviews.filter(r => r.replies.length > 0).length
            const averageRating = mockReviews.reduce((sum, r) => sum + r.rating, 0) / mockReviews.length

            return {
                success: true,
                stats: {
                    total,
                    withReplies,
                    withoutReplies: total - withReplies,
                    averageRating: Math.round(averageRating * 10) / 10
                }
            }
        }
    },

    // Dashboard Analytics
    adminDashboard: {
        async getOverview() {
            const messageStats = await mockAdminAPI.adminContactMessages.getStats()
            const reviewStats = await mockAdminAPI.adminReviews.getStats()

            return {
                success: true,
                overview: {
                    messages: messageStats.stats,
                    reviews: reviewStats.stats,
                    recentActivity: {
                        newMessages: 2,
                        newReviews: 1
                    }
                }
            }
        }
    }
}
