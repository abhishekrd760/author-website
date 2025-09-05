'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { ReviewWithBook } from '@/types/database'
import { api } from '@/lib/supabase'

const RecentReviews = () => {
    const [reviews, setReviews] = useState<ReviewWithBook[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const data = await api.getReviews()
                setReviews(data.slice(0, 6)) // Get first 6 reviews
            } catch (error) {
                console.error('Error fetching reviews:', error)
                setReviews([])
            } finally {
                setLoading(false)
            }
        }

        fetchReviews()
    }, [])

    if (loading) {
        return (
            <section className="py-16 bg-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-gray-100 text-center mb-12">
                        What Readers Are Saying
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="bg-gray-700 animate-pulse rounded-lg h-48"></div>
                        ))}
                    </div>
                </div>
            </section>
        )
    }

    const renderStars = (rating: number) => {
        return [...Array(5)].map((_, i) => (
            <span
                key={i}
                className={`text-xl ${i < rating ? 'text-yellow-400' : 'text-gray-600'
                    }`}
            >
                ★
            </span>
        ))
    }

    return (
        <section className="py-16 bg-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.h2
                    className="text-3xl font-bold text-gray-100 text-center mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    What Readers Are Saying
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {reviews.map((review, index) => (
                        <motion.div
                            key={review.id}
                            className="bg-gray-900 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 border border-gray-700"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                        >
                            <div className="flex items-center mb-4">
                                <div className="flex">{renderStars(review.rating)}</div>
                                <span className="ml-2 text-sm text-gray-400">
                                    {review.rating}/5
                                </span>
                            </div>

                            <blockquote className="text-gray-300 mb-4 italic">
                                &ldquo;{review.review_text}&rdquo;
                            </blockquote>

                            <div className="border-t border-gray-700 pt-4">
                                <p className="font-semibold text-gray-100">
                                    {review.reviewer_name}
                                </p>
                                <p className="text-sm text-gray-400">
                                    Review for &ldquo;{review.book.title}&rdquo;
                                </p>
                                <p className="text-xs text-gray-500 mt-1">
                                    {new Date(review.created_at).toLocaleDateString()}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    className="text-center mt-12"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    <a
                        href="/reviews"
                        className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gray-700 hover:bg-gray-600 transition-colors"
                    >
                        Read All Reviews
                    </a>
                </motion.div>
            </div>
        </section>
    )
}

export default RecentReviews
