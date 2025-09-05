export interface Author {
    id: string
    name: string
    bio: string
    photo_url: string
}

export interface Book {
    id: string
    author_id: string
    title: string
    description: string
    cover_image_url: string
    publication_date: string
    buy_link: string
}

export interface Review {
    id: string
    book_id: string
    reviewer_name: string
    review_text: string
    rating: number
    created_at: string
    admin_reply?: string | null
    admin_reply_date?: string | null
}

export interface Reply {
    id: string
    review_id: string
    reply_text: string
    created_at: string
}

export interface ContactMessage {
    id: string
    name: string
    email: string
    subject: string
    message: string
    created_at: string
    is_read: boolean
}

export interface ReviewWithBook extends Review {
    book: { title: string }
}

export interface User {
    id: string
    username: string
    password_hash: string
}

export interface BookWithReviews extends Book {
    reviews: (Review & { replies: Reply[] })[]
}
