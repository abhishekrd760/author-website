'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Book, Review, Reply } from '@/types/database'
import { notFound } from 'next/navigation'
import ReviewForm from '@/components/ReviewForm'

// Same hardcoded books as in books page
const hardcodedBooks: Book[] = [
    {
        id: '1',
        author_id: '1',
        title: 'The Midnight Garden',
        description: 'A haunting tale of mystery and romance set in Victorian England. When Sarah inherits her grandmother\'s estate, she discovers secrets that have been buried for generations. As she explores the sprawling mansion and its mysterious gardens, she uncovers a love story that transcends time itself.',
        cover_image_url: '/images/book1-cover.jpg',
        publication_date: '2023-03-15',
        buy_link: 'https://amazon.com/midnight-garden'
    },
    {
        id: '2',
        author_id: '1',
        title: 'Whispers in the Wind',
        description: 'An epic fantasy adventure that follows a young mage on her quest to save her kingdom from an ancient evil. Magic, friendship, and courage collide in this unforgettable story. With breathtaking world-building and characters you\'ll fall in love with, this is fantasy at its finest.',
        cover_image_url: '/images/book2-cover.jpg',
        publication_date: '2022-11-08',
        buy_link: 'https://amazon.com/whispers-wind'
    },
    {
        id: '3',
        author_id: '1',
        title: 'City of Dreams',
        description: 'A contemporary romance set in bustling New York City. Two ambitious professionals find love in the most unexpected places while chasing their dreams. This heartwarming story explores themes of ambition, love, and finding balance in a fast-paced world.',
        cover_image_url: '/images/book3-cover.jpg',
        publication_date: '2024-01-20',
        buy_link: 'https://amazon.com/city-dreams'
    },
    {
        id: '4',
        author_id: '1',
        title: 'Shadows of the Past',
        description: 'A psychological thriller that will keep you on the edge of your seat. Detective Lisa Morgan must confront her own demons while hunting a serial killer who seems to know her every move. Dark secrets and unexpected twists await in this gripping tale.',
        cover_image_url: '/images/book4-cover.jpg',
        publication_date: '2023-08-12',
        buy_link: 'https://amazon.com/shadows-past'
    },
    {
        id: '5',
        author_id: '1',
        title: 'The Ocean\'s Secret',
        description: 'A magical realism novel about a marine biologist who discovers that mermaids are real. As she delves deeper into their world, she must choose between her scientific career and protecting their ancient secrets. A beautiful tale of discovery and wonder.',
        cover_image_url: '/images/book5-cover.jpg',
        publication_date: '2023-12-05',
        buy_link: 'https://amazon.com/oceans-secret'
    }
]

// Function to generate random book cover images
const getRandomBookCover = (title: string, id: string) => {
    const colors = [
        { bg: '#374151', accent: '#F59E0B' },
        { bg: '#1F2937', accent: '#10B981' },
        { bg: '#111827', accent: '#3B82F6' },
        { bg: '#581C87', accent: '#EC4899' },
        { bg: '#7C2D12', accent: '#F97316' },
        { bg: '#064E3B', accent: '#6EE7B7' }
    ]

    const index = parseInt(id) - 1
    const color = colors[index % colors.length]

    return `data:image/svg+xml;base64,${btoa(`
    <svg width="300" height="400" viewBox="0 0 300 400" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="300" height="400" fill="${color.bg}"/>
      <rect x="20" y="20" width="260" height="360" fill="none" stroke="${color.accent}" stroke-width="2" opacity="0.5"/>
      <rect x="40" y="40" width="220" height="2" fill="${color.accent}"/>
      <rect x="40" y="60" width="180" height="1" fill="${color.accent}" opacity="0.7"/>
      <text x="150" y="200" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="18" font-weight="bold">
        <tspan x="150" dy="0">${title.split(' ').slice(0, 2).join(' ')}</tspan>
        ${title.split(' ').length > 2 ? `<tspan x="150" dy="25">${title.split(' ').slice(2).join(' ')}</tspan>` : ''}
      </text>
      <text x="150" y="250" text-anchor="middle" fill="${color.accent}" font-family="Arial, sans-serif" font-size="14">Jane Doe</text>
      <rect x="40" y="340" width="220" height="2" fill="${color.accent}"/>
    </svg>
  `)}`
}

interface BookDetailProps {
    params: Promise<{
        id: string
    }>
}

interface ReviewWithReplies extends Review {
    replies: Reply[]
}

const BookDetail = ({ params }: BookDetailProps) => {
    const [book, setBook] = useState<Book | null>(null)
    const [reviews, setReviews] = useState<ReviewWithReplies[]>([])
    const [loading, setLoading] = useState(true)
    const [showReviewForm, setShowReviewForm] = useState(false)
    const [bookId, setBookId] = useState<string>('')

    useEffect(() => {
        const initializeBookId = async () => {
            const resolvedParams = await params
            setBookId(resolvedParams.id)
        }
        initializeBookId()
    }, [params])

    useEffect(() => {
        if (!bookId) return

        const fetchBookData = async () => {
            try {
                // Get hardcoded book data
                const bookData = hardcodedBooks.find(b => b.id === bookId)

                if (!bookData) {
                    notFound()
                    return
                }

                setBook(bookData)

                // Fetch reviews from database using the new API route
                console.log('📖 Fetching reviews for book:', bookId)

                const response = await fetch(`/api/reviews?book_id=${bookId}`)
                const result = await response.json()

                if (result.success && result.data) {
                    console.log('✅ Reviews fetched successfully:', result.data.length)
                    setReviews(result.data)
                } else {
                    console.error('❌ Failed to fetch reviews:', result.error)
                    setReviews([])
                }

            } catch (error) {
                console.error('Error:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchBookData()
    }, [bookId])

    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, i) => (
            <span key={i} className={`text-xl ${i < rating ? 'text-yellow-500' : 'text-gray-300'}`}>
                ★
            </span>
        ))
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
    }

    const averageRating = reviews.length > 0
        ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
        : 0

    const handleReviewSubmitted = (newReview: Review) => {
        setReviews(prev => [{ ...newReview, replies: [] }, ...prev])
        setShowReviewForm(false)
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50">
                <div className="container-custom py-16">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Book Cover Skeleton */}
                        <div className="lg:col-span-1">
                            <div className="aspect-[3/4] bg-gray-300 rounded-lg animate-pulse"></div>
                        </div>

                        {/* Book Info Skeleton */}
                        <div className="lg:col-span-2 space-y-4">
                            <div className="h-8 bg-gray-300 rounded animate-pulse"></div>
                            <div className="h-4 bg-gray-300 rounded animate-pulse w-1/3"></div>
                            <div className="space-y-2">
                                <div className="h-4 bg-gray-300 rounded animate-pulse"></div>
                                <div className="h-4 bg-gray-300 rounded animate-pulse"></div>
                                <div className="h-4 bg-gray-300 rounded animate-pulse w-3/4"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    if (!book) {
        notFound()
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container-custom py-16">
                {/* Book Details */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
                    {/* Book Cover */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="lg:col-span-1"
                    >
                        <div className="sticky top-8">
                            <div className="aspect-[3/4] overflow-hidden rounded-lg shadow-2xl bg-gray-200">
                                <img
                                    src={getRandomBookCover(book.title, book.id)}
                                    alt={book.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Purchase Button */}
                            <div className="mt-6">
                                <a
                                    href={book.buy_link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-primary w-full block text-center text-lg py-4"
                                >
                                    Buy This Book
                                </a>
                            </div>
                        </div>
                    </motion.div>

                    {/* Book Information */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="lg:col-span-2"
                    >
                        <div className="space-y-6">
                            <div>
                                <h1 className="text-4xl lg:text-5xl font-bold mb-4">{book.title}</h1>
                                <p className="text-xl text-gray-600">by Jane Doe</p>
                                <p className="text-lg text-gray-500">
                                    Published: {formatDate(book.publication_date)}
                                </p>
                            </div>

                            {/* Rating Summary */}
                            {reviews.length > 0 && (
                                <div className="flex items-center gap-4 py-4 border-y border-gray-200">
                                    <div className="flex items-center gap-2">
                                        {renderStars(Math.round(Number(averageRating)))}
                                        <span className="text-xl font-semibold">{averageRating}</span>
                                    </div>
                                    <span className="text-gray-600">
                                        ({reviews.length} review{reviews.length !== 1 ? 's' : ''})
                                    </span>
                                </div>
                            )}

                            {/* Description */}
                            <div className="prose prose-lg text-gray-700">
                                <h2 className="text-2xl font-bold mb-4">About This Book</h2>
                                <p className="text-lg leading-relaxed">{book.description}</p>
                            </div>

                            {/* Additional Info */}
                            <div className="bg-white rounded-lg p-6 shadow-md">
                                <h3 className="text-xl font-bold mb-4">Book Details</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <span className="font-semibold">Genre:</span>
                                        <span className="ml-2 text-gray-600">
                                            {book.id === '1' ? 'Mystery, Romance' :
                                                book.id === '2' ? 'Fantasy, Adventure' :
                                                    'Contemporary Romance'}
                                        </span>
                                    </div>
                                    <div>
                                        <span className="font-semibold">Publication Date:</span>
                                        <span className="ml-2 text-gray-600">{formatDate(book.publication_date)}</span>
                                    </div>
                                    <div>
                                        <span className="font-semibold">Language:</span>
                                        <span className="ml-2 text-gray-600">English</span>
                                    </div>
                                    <div>
                                        <span className="font-semibold">Format:</span>
                                        <span className="ml-2 text-gray-600">Paperback, eBook, Audiobook</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Reviews Section */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                >
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-3xl font-bold">Reader Reviews</h2>
                        <button
                            onClick={() => setShowReviewForm(!showReviewForm)}
                            className="btn-primary"
                        >
                            Write a Review
                        </button>
                    </div>

                    {/* Review Form */}
                    {showReviewForm && (
                        <div className="mb-8">
                            <ReviewForm
                                bookId={book.id}
                                onReviewSubmitted={handleReviewSubmitted}
                                onCancel={() => setShowReviewForm(false)}
                            />
                        </div>
                    )}

                    {/* Reviews List */}
                    {reviews.length > 0 ? (
                        <div className="space-y-6">
                            {reviews.map((review) => (
                                <div key={review.id} className="card">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <div className="flex items-center gap-3 mb-2">
                                                <span className="font-semibold text-lg">{review.reviewer_name}</span>
                                                <div className="flex">
                                                    {renderStars(review.rating)}
                                                </div>
                                            </div>
                                            <span className="text-sm text-gray-500">
                                                {formatDate(review.created_at)}
                                            </span>
                                        </div>
                                    </div>

                                    <blockquote className="text-gray-700 mb-4 text-lg leading-relaxed">
                                        &ldquo;{review.review_text}&rdquo;
                                    </blockquote>

                                    {/* Author Replies */}
                                    {review.replies.length > 0 && (
                                        <div className="mt-4 pl-6 border-l-4 border-blue-200 bg-blue-50 p-4 rounded-r-lg">
                                            <div className="font-semibold text-blue-800 mb-2">Author Reply:</div>
                                            {review.replies.map((reply) => (
                                                <div key={reply.id} className="text-blue-700">
                                                    <p className="mb-1">{reply.reply_text}</p>
                                                    <span className="text-xs text-blue-600">
                                                        {formatDate(reply.created_at)}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 bg-white rounded-lg">
                            <p className="text-xl text-gray-600 mb-4">No reviews yet</p>
                            <p className="text-gray-500 mb-6">Be the first to share your thoughts about this book!</p>
                            <button
                                onClick={() => setShowReviewForm(true)}
                                className="btn-primary"
                            >
                                Write the First Review
                            </button>
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    )
}

export default BookDetail
