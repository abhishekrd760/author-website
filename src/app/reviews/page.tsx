'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Review, Book, Reply } from '@/types/database'
import { api } from '@/lib/supabase'
import Link from 'next/link'

interface ReviewWithBook extends Review {
    book: Pick<Book, 'title' | 'id'>
    replies?: Reply[]
}

const Reviews = () => {
    const [reviews, setReviews] = useState<ReviewWithBook[]>([])
    const [loading, setLoading] = useState(true)
    const [filter, setFilter] = useState<'all' | number>('all')

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const data = await api.getReviews()
                setReviews(data as ReviewWithBook[] || [])
            } catch (error) {
                console.error('Error:', error)
                setReviews([])
            } finally {
                setLoading(false)
            }
        }

        fetchReviews()
    }, [])

    const filteredReviews = filter === 'all'
        ? reviews
        : reviews.filter(review => review.rating === filter)

    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, i) => (
            <span key={i} className={`text-lg ${i < rating ? 'text-yellow-500' : 'text-gray-300'}`}>
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

    const getRatingCounts = () => {
        const counts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
        reviews.forEach(review => {
            counts[review.rating as keyof typeof counts]++
        })
        return counts
    }

    const ratingCounts = getRatingCounts()
    const totalReviews = reviews.length
    const averageRating = totalReviews > 0
        ? (reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews).toFixed(1)
        : 0

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-900">
                {/* Hero Section */}
                <section className="py-20 bg-gradient-to-r from-slate-600 to-blue-600 text-white">
                    <div className="container-custom text-center">
                        <h1 className="text-4xl lg:text-6xl font-bold mb-6">Reader Reviews</h1>
                        <p className="text-xl lg:text-2xl text-slate-100 max-w-3xl mx-auto">
                            Discover what readers around the world are saying about these captivating stories
                        </p>
                    </div>
                </section>

                {/* Loading Reviews */}
                <section className="py-16">
                    <div className="container-custom">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                                <div key={i} className="bg-gray-800 border border-gray-700 rounded-lg p-6 animate-pulse">
                                    <div className="flex items-center gap-2 mb-3">
                                        <div className="h-4 bg-gray-600 rounded w-24"></div>
                                        <div className="h-4 bg-gray-600 rounded w-20"></div>
                                    </div>
                                    <div className="h-3 bg-gray-600 rounded mb-2"></div>
                                    <div className="h-3 bg-gray-600 rounded mb-2"></div>
                                    <div className="h-3 bg-gray-600 rounded w-3/4"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-900">
            {/* Hero Section */}
            <section className="py-20 bg-gradient-to-r from-slate-600 to-blue-600 text-white">
                <div className="container-custom">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center"
                    >
                        <h1 className="text-4xl lg:text-6xl font-bold mb-6">Reader Reviews</h1>
                        <p className="text-xl lg:text-2xl text-slate-100 max-w-3xl mx-auto">
                            Discover what readers around the world are saying about these captivating stories
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Reviews Content */}
            <section className="py-16">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                        {/* Sidebar - Rating Filter & Stats */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="lg:col-span-1"
                        >
                            <div className="sticky top-8 space-y-6">
                                {/* Overall Rating */}
                                <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
                                    <h3 className="text-xl font-bold mb-4 text-white">Overall Rating</h3>
                                    <div className="text-center">
                                        <div className="text-4xl font-bold text-yellow-500 mb-2">{averageRating}</div>
                                        <div className="flex justify-center mb-2">
                                            {renderStars(Math.round(Number(averageRating)))}
                                        </div>
                                        <div className="text-sm text-gray-400">Based on {totalReviews} reviews</div>
                                    </div>
                                </div>

                                {/* Rating Breakdown */}
                                <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
                                    <h3 className="text-lg font-bold mb-4 text-white">Rating Breakdown</h3>
                                    <div className="space-y-2">
                                        {[5, 4, 3, 2, 1].map((rating) => (
                                            <div key={rating} className="flex items-center gap-2 text-sm">
                                                <span className="w-8 text-white">{rating}★</span>
                                                <div className="flex-1 bg-gray-700 rounded-full h-2">
                                                    <div
                                                        className="bg-yellow-500 h-2 rounded-full"
                                                        style={{
                                                            width: totalReviews > 0 ? `${(ratingCounts[rating as keyof typeof ratingCounts] / totalReviews) * 100}%` : '0%'
                                                        }}
                                                    />
                                                </div>
                                                <span className="w-8 text-gray-400">{ratingCounts[rating as keyof typeof ratingCounts]}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Filter */}
                                <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
                                    <h3 className="text-lg font-bold mb-4 text-white">Filter by Rating</h3>
                                    <div className="space-y-2">
                                        <button
                                            onClick={() => setFilter('all')}
                                            className={`w-full text-left px-3 py-2 rounded ${filter === 'all' ? 'bg-blue-600 text-white' : 'hover:bg-gray-700 text-gray-300'
                                                }`}
                                        >
                                            All Reviews ({totalReviews})
                                        </button>
                                        {[5, 4, 3, 2, 1].map((rating) => (
                                            <button
                                                key={rating}
                                                onClick={() => setFilter(rating)}
                                                className={`w-full text-left px-3 py-2 rounded flex items-center justify-between ${filter === rating ? 'bg-blue-600 text-white' : 'hover:bg-gray-700 text-gray-300'
                                                    }`}
                                            >
                                                <span>{rating} Stars</span>
                                                <span>({ratingCounts[rating as keyof typeof ratingCounts]})</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Reviews List */}
                        <div className="lg:col-span-3">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                className="mb-8"
                            >
                                <h2 className="text-2xl font-bold mb-4 text-white">
                                    {filter === 'all' ? 'All Reviews' : `${filter} Star Reviews`}
                                    <span className="text-gray-400 text-lg ml-2">
                                        ({filteredReviews.length})
                                    </span>
                                </h2>
                            </motion.div>

                            {filteredReviews.length > 0 ? (
                                <div className="space-y-6">
                                    {filteredReviews.map((review, index) => (
                                        <motion.div
                                            key={review.id}
                                            initial={{ opacity: 0, y: 30 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.6, delay: index * 0.1 }}
                                            className="card hover:shadow-xl transition-shadow duration-300"
                                        >
                                            {/* Header */}
                                            <div className="flex justify-between items-start mb-4">
                                                <div>
                                                    <div className="flex items-center gap-3 mb-2">
                                                        <span className="font-semibold text-lg text-gray-100">{review.reviewer_name}</span>
                                                        <div className="flex">
                                                            {renderStars(review.rating)}
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-sm text-gray-400">
                                                        <span>{formatDate(review.created_at)}</span>
                                                        <span>•</span>
                                                        <Link
                                                            href={`/books/${review.book.id}`}
                                                            className="text-gray-300 hover:text-gray-100 font-medium"
                                                        >
                                                            {review.book.title}
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Review Text */}
                                            <blockquote className="text-gray-300 text-lg leading-relaxed">
                                                &ldquo;{review.review_text}&rdquo;
                                            </blockquote>

                                            {/* Admin Replies */}
                                            {review.replies && review.replies.length > 0 && (
                                                <div className="mt-6 pt-4 border-t border-gray-700">
                                                    <h4 className="text-sm font-semibold text-gray-400 mb-3">Author Reply:</h4>
                                                    {review.replies.map((reply: Reply) => (
                                                        <div key={reply.id} className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                                                            <p className="text-gray-300 leading-relaxed">{reply.reply_text}</p>
                                                            <p className="text-gray-500 text-sm mt-2">
                                                                Replied on {new Date(reply.created_at).toLocaleDateString('en-US', {
                                                                    year: 'numeric',
                                                                    month: 'long',
                                                                    day: 'numeric'
                                                                })}
                                                            </p>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}

                                            {/* Footer */}
                                            <div className="mt-4 pt-4 border-t border-gray-700">
                                                <Link
                                                    href={`/books/${review.book.id}`}
                                                    className="text-gray-400 hover:text-gray-200 text-sm font-medium"
                                                >
                                                    Read more about {review.book.title} →
                                                </Link>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6 }}
                                    className="text-center py-16"
                                >
                                    <div className="max-w-md mx-auto">
                                        <div className="text-6xl mb-6">📚</div>
                                        <h3 className="text-2xl font-bold text-white mb-4">
                                            {reviews.length === 0
                                                ? "No Reviews Yet"
                                                : `No ${filter} Star Reviews`
                                            }
                                        </h3>
                                        <p className="text-gray-400 mb-6">
                                            {reviews.length === 0
                                                ? "Be the first to share your thoughts! Visit any book page and leave a review to help other readers discover their next favorite story."
                                                : `No reviews found with ${filter} star rating. Try viewing all reviews or submit your own!`
                                            }
                                        </p>
                                        <div className="space-y-3">
                                            {reviews.length === 0 ? (
                                                <Link href="/books" className="btn-primary inline-block">
                                                    Browse Books & Write First Review
                                                </Link>
                                            ) : (
                                                <button
                                                    onClick={() => setFilter('all')}
                                                    className="btn-primary"
                                                >
                                                    View All Reviews
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {/* Call to Action */}
                            {filteredReviews.length > 0 && (
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6 }}
                                    viewport={{ once: true }}
                                    className="mt-12 text-center bg-gray-800 border border-gray-700 rounded-lg p-8"
                                >
                                    <h3 className="text-2xl font-bold mb-4 text-white">Ready to Join the Conversation?</h3>
                                    <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
                                        Share your thoughts about these amazing books and help other readers discover their next favorite story.
                                    </p>
                                    <Link href="/books" className="btn-primary">
                                        Explore Books & Leave a Review
                                    </Link>
                                </motion.div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Reviews
