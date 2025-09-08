// Mock data service to replace Supabase functionality
import { Author, Book, Review, Reply, ContactMessage, ReviewWithBook } from '@/types/database'

// Sample data
export const mockAuthors: Author[] = [
    {
        id: '550e8400-e29b-41d4-a716-446655440000',
        name: 'Jane Doe',
        bio: 'Jane Doe is a bestselling author with over 10 years of experience writing captivating fiction novels. Her works have been translated into multiple languages and have touched the hearts of readers worldwide.',
        photo_url: '/images/author-photo.jpg'
    }
]

export const mockBooks: Book[] = [
    {
        id: '1',
        author_id: '550e8400-e29b-41d4-a716-446655440000',
        title: 'The Midnight Garden',
        description: 'A haunting tale of mystery and romance set in Victorian England. When Sarah inherits her grandmother\'s estate, she discovers secrets that have been buried for generations. As she explores the sprawling mansion and its mysterious gardens, she uncovers a love story that transcends time itself.',
        cover_image_url: '/images/book1-cover.jpg',
        publication_date: '2023-03-15',
        buy_link: 'https://amazon.com/midnight-garden'
    },
    {
        id: '2',
        author_id: '550e8400-e29b-41d4-a716-446655440000',
        title: 'Whispers in the Wind',
        description: 'An epic fantasy adventure that follows a young mage on her quest to save her kingdom from an ancient evil. Magic, friendship, and courage collide in this unforgettable story. With breathtaking world-building and characters you\'ll fall in love with, this is fantasy at its finest.',
        cover_image_url: '/images/book2-cover.jpg',
        publication_date: '2022-11-08',
        buy_link: 'https://amazon.com/whispers-wind'
    },
    {
        id: '3',
        author_id: '550e8400-e29b-41d4-a716-446655440000',
        title: 'City of Dreams',
        description: 'A contemporary romance set in bustling New York City. Two ambitious professionals find love in the most unexpected places while chasing their dreams. This heartwarming story explores themes of ambition, love, and finding balance in a fast-paced world.',
        cover_image_url: '/images/book3-cover.jpg',
        publication_date: '2024-01-20',
        buy_link: 'https://amazon.com/city-dreams'
    }
]

export const mockReviews: Review[] = [
    // No hardcoded reviews - only real submitted reviews will appear
]

export const mockReplies: Reply[] = [
    {
        id: '1',
        review_id: '1',
        reply_text: 'Thank you so much for this wonderful review! It means the world to me to know that the atmosphere came through so vividly. The gardens were inspired by a real Victorian estate I visited.',
        created_at: '2024-02-16T09:15:00Z'
    }
]

export const mockContactMessages: ContactMessage[] = [
    {
        id: '1',
        name: 'John Smith',
        email: 'john@example.com',
        subject: 'Book signing event',
        message: 'I loved your latest book! Are you planning any book signing events in New York?',
        created_at: '2024-02-15T10:30:00Z',
        is_read: false,
        replied: false
    },
    {
        id: '2',
        name: 'Sarah Johnson',
        email: 'sarah@example.com',
        subject: 'Writing advice',
        message: 'I am an aspiring writer and would love some advice on getting started.',
        created_at: '2024-02-10T14:20:00Z',
        is_read: true,
        replied: false
    }
]

// Mock storage for new reviews and messages
const newReviews: Review[] = []
const reviewIdCounter = 9

// Mock API functions
export const mockAPI = {
    async getBooks(): Promise<Book[]> {
        return mockBooks
    },

    async getBookById(id: string): Promise<Book | null> {
        return mockBooks.find(book => book.id === id) || null
    },

    async getReviews(): Promise<ReviewWithBook[]> {
        // Transform reviews to include book information
        return mockReviews.map(review => ({
            ...review,
            book: mockBooks.find(book => book.id === review.book_id)
        })).filter(review => review.book) as ReviewWithBook[]
    },

    async getReviewsForBook(bookId: string): Promise<ReviewWithBook[]> {
        const reviews = mockReviews.filter(review => review.book_id === bookId)
        return reviews.map(review => ({
            ...review,
            book: mockBooks.find(book => book.id === review.book_id)
        })).filter(review => review.book) as ReviewWithBook[]
    },

    async addReview(reviewData: Partial<Review>): Promise<Review> {
        const newReview: Review = {
            id: Date.now().toString(),
            book_id: reviewData.book_id || '',
            reviewer_name: reviewData.reviewer_name || '',
            review_text: reviewData.review_text || '',
            rating: reviewData.rating || 5,
            created_at: new Date().toISOString(),
            admin_reply: null,
            admin_reply_date: null
        }
        mockReviews.unshift(newReview)
        return newReview
    },

    async addContactMessage(messageData: Partial<ContactMessage>): Promise<ContactMessage> {
        const newMessage: ContactMessage = {
            id: Date.now().toString(),
            name: messageData.name || '',
            email: messageData.email || '',
            subject: messageData.subject || '',
            message: messageData.message || '',
            created_at: new Date().toISOString(),
            is_read: false,
            replied: false
        }
        mockContactMessages.unshift(newMessage)
        return newMessage
    },

    async getContactMessages(): Promise<ContactMessage[]> {
        return mockContactMessages
    }
}
