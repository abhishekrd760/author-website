'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Book, Review, Reply } from '@/types/database'
import { notFound } from 'next/navigation'
import ReviewForm from '@/components/ReviewForm'
import StarryBackground from '@/components/StarryBackground'
import Image from 'next/image'
import { useLanguage } from '@/lib/LanguageProvider'

// Same hardcoded books as in books page
const hardcodedBooks: Book[] = [
    {
        id: '2',
        author_id: '1',
        title: 'Cosmic Awakening: The Science',
        description: 'A groundbreaking synthesis of mystical experiences and scientific understanding. Journey through the quantum field of pure possibility as you learn to navigate multiple dimensions of reality. This book offers practical techniques for transcending ordinary consciousness and stepping into your cosmic nature.',
        cover_image_url: '/images/book2-cover.jpg',
        publication_date: '2022-11-08',
        buy_link: 'https://amazon.com/cosmic-awakening'
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
    const { t, language } = useLanguage()

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
        return new Intl.DateTimeFormat(language === 'ja' ? 'ja-JP' : 'en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }).format(new Date(dateString))
    }

    const averageRating = reviews.length > 0
        ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
        : 0

    const reviewCountLabel = reviews.length === 1
        ? t('{count} cosmic review', { count: reviews.length })
        : t('{count} cosmic reviews', { count: reviews.length })

    const handleReviewSubmitted = (newReview: Review) => {
        setReviews(prev => [{ ...newReview, replies: [] }, ...prev])
        setShowReviewForm(false)
    }

    if (loading) {
        return (
            <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-[#080810]/80 via-[#0a0a12]/60 to-[#06060a]/40">
                <StarryBackground />
                <div className="container-custom py-16 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Book Cover Skeleton */}
                        <div className="lg:col-span-1">
                            <div className="aspect-[3/4] bg-white/5 rounded-lg animate-pulse"></div>
                        </div>

                        {/* Book Info Skeleton */}
                        <div className="lg:col-span-2 space-y-4">
                            <div className="h-8 bg-white/5 rounded animate-pulse"></div>
                            <div className="h-4 bg-white/5 rounded animate-pulse w-1/3"></div>
                            <div className="space-y-2">
                                <div className="h-4 bg-white/5 rounded animate-pulse"></div>
                                <div className="h-4 bg-white/5 rounded animate-pulse"></div>
                                <div className="h-4 bg-white/5 rounded animate-pulse w-3/4"></div>
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
        <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-[#080810]/80 via-[#0a0a12]/60 to-[#06060a]/40">
            <StarryBackground />

            <div className="container-custom py-16 relative z-10">
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
                            <div className="aspect-[3/4] overflow-hidden rounded-lg shadow-2xl bg-white/5 border border-white/10">
                                <Image
                                    src={getRandomBookCover(book.title, book.id)}
                                    alt={book.title}
                                    width={400}
                                    height={533}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Purchase Button */}
                            <div className="mt-6">
                                <a
                                    href={book.buy_link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-gradient-to-r from-blue-600 to-blue-600 text-white rounded-full font-medium text-lg py-4 px-8 w-full block text-center transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25"
                                >
                                    {t('Awaken Your Spirit')}
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
                                <h1 className="text-4xl lg:text-5xl font-extralight tracking-wide mb-4 text-white" style={{ fontFamily: 'var(--font-cinzel)' }}>{book.title}</h1>
                                <p className="text-xl text-blue-300/80 font-light">{t('by {author}', { author: t('Kazutoshi Yoshida') })}</p>
                                <p className="text-lg text-white/60 font-light">
                                    {t('Published: {{date}}', { date: formatDate(book.publication_date) })}
                                </p>
                            </div>

                            {/* Rating Summary */}
                            {reviews.length > 0 && (
                                <div className="flex items-center gap-4 py-4 border-y border-white/10">
                                    <div className="flex items-center gap-2">
                                        {renderStars(Math.round(Number(averageRating)))}
                                        <span className="text-xl font-semibold text-white">{averageRating}</span>
                                    </div>
                                    <span className="text-white/60 font-light">
                                        ({reviewCountLabel})
                                    </span>
                                </div>
                            )}

                            {/* Description */}
                            <div className="prose prose-lg prose-invert">
                                <h2 className="text-2xl font-extralight tracking-wide mb-4 text-white" style={{ fontFamily: 'var(--font-cinzel)' }}>{t('About This Cosmic Journey')}</h2>
                                <p className="text-lg leading-relaxed text-white/80 font-light">{book.description}</p>
                            </div>

                            {/* Additional Info */}
                            <div className="card">
                                <h3 className="text-xl font-extralight tracking-wide mb-4 text-white" style={{ fontFamily: 'var(--font-cinzel)' }}>{t('Cosmic Book Details')}</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <span className="font-semibold text-blue-300/80">{t('Genre')}:</span>
                                        <span className="ml-2 text-white/70 font-light">{t('Consciousness, Spirituality, Science')}</span>
                                    </div>
                                    <div>
                                        <span className="font-semibold text-blue-300/80">{t('Publication Date')}:</span>
                                        <span className="ml-2 text-white/70 font-light">{formatDate(book.publication_date)}</span>
                                    </div>
                                    <div>
                                        <span className="font-semibold text-blue-300/80">{t('Language')}:</span>
                                        <span className="ml-2 text-white/70 font-light">{t('Universal Consciousness')}</span>
                                    </div>
                                    <div>
                                        <span className="font-semibold text-blue-300/80">{t('Format')}:</span>
                                        <span className="ml-2 text-white/70 font-light">{t('Paperback, eBook, Audiobook')}</span>
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
                        <h2 className="text-3xl font-extralight tracking-wide text-white" style={{ fontFamily: 'var(--font-cinzel)' }}>{t('Cosmic Soul Reviews')}</h2>
                        <button
                            onClick={() => setShowReviewForm(!showReviewForm)}
                            className="bg-gradient-to-r from-blue-600 to-blue-600 text-white rounded-full font-medium text-lg py-3 px-6 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25"
                        >
                            {t('Share Your Awakening')}
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
                                                <span className="font-light text-lg text-white">{review.reviewer_name}</span>
                                                <div className="flex">
                                                    {renderStars(review.rating)}
                                                </div>
                                            </div>
                                            <span className="text-sm text-white/60 font-light">
                                                {formatDate(review.created_at)}
                                            </span>
                                        </div>
                                    </div>

                                    <blockquote className="text-white/80 mb-4 text-lg leading-relaxed font-light">
                                        &ldquo;{review.review_text}&rdquo;
                                    </blockquote>

                                    {/* Author Replies */}
                                    {review.replies.length > 0 && (
                                        <div className="mt-4 pl-6 border-l-4 border-blue-400/30 bg-blue-500/10 p-4 rounded-r-lg">
                                            <div className="font-light text-blue-300/80 mb-2">{t('Author\'s Cosmic Response:')}</div>
                                            {review.replies.map((reply) => (
                                                <div key={reply.id} className="text-blue-200/80 font-light">
                                                    <p className="mb-1">{reply.reply_text}</p>
                                                    <span className="text-xs text-blue-300/60">
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
                        <div className="text-center py-12 card">
                            <p className="text-xl text-white/80 mb-4 font-light">{t('No cosmic reviews yet')}</p>
                            <p className="text-white/60 mb-6 font-light">{t('Be the first to share your transformational journey with this book!')}</p>
                            <button
                                onClick={() => setShowReviewForm(true)}
                                className="bg-gradient-to-r from-blue-600 to-blue-600 text-white rounded-full font-medium text-lg py-3 px-6 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25"
                            >
                                {t('Write the First Cosmic Review')}
                            </button>
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    )
}

export default BookDetail
