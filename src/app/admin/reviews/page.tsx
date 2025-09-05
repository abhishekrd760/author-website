'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAdmin, useReviews } from '@/lib/admin-context'
import { motion } from 'framer-motion'
import Link from 'next/link'

interface Book {
    title: string
    cover_image_url?: string
}

interface ReviewReply {
    id: string
    reply_text: string
    created_at: string
}

interface Review {
    id: string
    rating: number
    review_text: string
    reviewer_name: string
    created_at: string
    books?: Book
    replies?: ReviewReply[]
}

// Navigation component (reused from dashboard)
function AdminNav() {
    const { admin, logout } = useAdmin()
    const router = useRouter()

    const handleLogout = async () => {
        await logout()
        router.push('/admin/login')
    }

    return (
        <nav className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700/50 px-6 py-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-8">
                    <h1 className="text-xl font-bold text-white">Admin Dashboard</h1>
                    <div className="flex space-x-6">
                        <Link
                            href="/admin/dashboard"
                            className="text-gray-300 hover:text-white transition-colors"
                        >
                            Overview
                        </Link>
                        <Link
                            href="/admin/reviews"
                            className="text-white font-semibold"
                        >
                            Reviews
                        </Link>
                        <Link
                            href="/admin/messages"
                            className="text-gray-300 hover:text-white transition-colors"
                        >
                            Messages
                        </Link>
                    </div>
                </div>
                <div className="flex items-center space-x-4">
                    <span className="text-gray-300">Welcome, {admin?.full_name}</span>
                    <button
                        onClick={handleLogout}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    )
}

// Review card component
function ReviewCard({ review, onReply }: { review: Review, onReply: (id: string, text: string) => void }) {
    const [isReplyOpen, setIsReplyOpen] = useState(false)
    const [replyText, setReplyText] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleSubmitReply = async () => {
        if (!replyText.trim()) return

        setIsSubmitting(true)
        try {
            await onReply(review.id, replyText.trim())
            setReplyText('')
            setIsReplyOpen(false)
        } catch (error) {
            console.error('Reply submission error:', error)
        } finally {
            setIsSubmitting(false)
        }
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, i) => (
            <svg
                key={i}
                className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-gray-600'}`}
                fill="currentColor"
                viewBox="0 0 20 20"
            >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
        ))
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6"
        >
            {/* Review header */}
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-4">
                    {review.books?.cover_image_url && (
                        <img
                            src={review.books.cover_image_url}
                            alt={review.books.title}
                            className="w-16 h-20 object-cover rounded-lg"
                        />
                    )}
                    <div>
                        <h3 className="text-lg font-semibold text-white">{review.books?.title || 'Unknown Book'}</h3>
                        <div className="flex items-center space-x-2 mt-1">
                            {renderStars(review.rating)}
                            <span className="text-gray-400 text-sm">({review.rating}/5)</span>
                        </div>
                        <p className="text-gray-400 text-sm mt-1">
                            by {review.reviewer_name} • {formatDate(review.created_at)}
                        </p>
                    </div>
                </div>
                <div className="flex space-x-2">
                    <button
                        onClick={() => setIsReplyOpen(!isReplyOpen)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                    >
                        {review.replies && review.replies.length > 0 ? 'View Reply' : 'Reply'}
                    </button>
                </div>
            </div>

            {/* Review content */}
            <div className="mb-4">
                <p className="text-gray-300 leading-relaxed">{review.review_text}</p>
            </div>

            {/* Existing replies */}
            {review.replies && review.replies.length > 0 && (
                <div className="border-t border-gray-700/50 pt-4 mb-4">
                    <h4 className="text-sm font-semibold text-gray-400 mb-2">Admin Reply:</h4>
                    {review.replies.map((reply: ReviewReply) => (
                        <div key={reply.id} className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                            <p className="text-gray-300">{reply.reply_text}</p>
                            <p className="text-gray-500 text-xs mt-2">
                                Replied on {formatDate(reply.created_at)}
                            </p>
                        </div>
                    ))}
                </div>
            )}

            {/* Reply form */}
            {isReplyOpen && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="border-t border-gray-700/50 pt-4"
                >
                    <div className="space-y-4">
                        <textarea
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            placeholder="Write your reply to this review..."
                            rows={4}
                            className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                        />
                        <div className="flex space-x-3">
                            <button
                                onClick={handleSubmitReply}
                                disabled={!replyText.trim() || isSubmitting}
                                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white px-6 py-2 rounded-lg transition-colors disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? 'Sending...' : 'Send Reply'}
                            </button>
                            <button
                                onClick={() => {
                                    setIsReplyOpen(false)
                                    setReplyText('')
                                }}
                                className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg transition-colors"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </motion.div>
    )
}

export default function AdminReviews() {
    const { isAuthenticated, isLoading: authLoading } = useAdmin()
    const { reviews, isLoading, error, pagination, fetchReviews, replyToReview } = useReviews()
    const router = useRouter()

    useEffect(() => {
        if (!authLoading && !isAuthenticated) {
            router.push('/admin/login')
        }
    }, [isAuthenticated, authLoading, router])

    const handleReply = async (reviewId: string, replyText: string) => {
        const result = await replyToReview(reviewId, replyText)
        if (!result.success) {
            alert(result.error || 'Failed to send reply')
        }
    }

    const handlePageChange = (page: number) => {
        fetchReviews(page)
    }

    if (authLoading || !isAuthenticated) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white"></div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
            <AdminNav />

            <div className="p-6">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <h2 className="text-3xl font-bold text-white mb-2">Review Management</h2>
                    <p className="text-gray-400">Reply to customer reviews and manage feedback</p>
                </motion.div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                        <h3 className="text-lg font-semibold text-white mb-2">Total Reviews</h3>
                        <p className="text-3xl font-bold text-blue-400">{pagination.totalCount}</p>
                    </div>
                    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                        <h3 className="text-lg font-semibold text-white mb-2">With Replies</h3>
                        <p className="text-3xl font-bold text-green-400">
                            {reviews.filter(r => r.replies && r.replies.length > 0).length}
                        </p>
                    </div>
                    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                        <h3 className="text-lg font-semibold text-white mb-2">Need Reply</h3>
                        <p className="text-3xl font-bold text-yellow-400">
                            {reviews.filter(r => !r.replies || r.replies.length === 0).length}
                        </p>
                    </div>
                </div>

                {/* Reviews list */}
                {isLoading ? (
                    <div className="space-y-6">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-6 animate-pulse">
                                <div className="h-24 bg-gray-700 rounded"></div>
                            </div>
                        ))}
                    </div>
                ) : error ? (
                    <div className="text-center py-12">
                        <p className="text-red-400 text-lg">{error}</p>
                    </div>
                ) : reviews.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-400 text-lg">No reviews found</p>
                    </div>
                ) : (
                    <>
                        <div className="space-y-6 mb-8">
                            {reviews.map((review) => (
                                <ReviewCard
                                    key={review.id}
                                    review={review}
                                    onReply={handleReply}
                                />
                            ))}
                        </div>

                        {/* Pagination */}
                        {pagination.totalPages > 1 && (
                            <div className="flex justify-center space-x-2">
                                {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => (
                                    <button
                                        key={page}
                                        onClick={() => handlePageChange(page)}
                                        className={`px-4 py-2 rounded-lg transition-colors ${page === pagination.currentPage
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                            }`}
                                    >
                                        {page}
                                    </button>
                                ))}
                            </div>
                        )}
                    </>
                )}
            </div>

            {/* Background decoration */}
            <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
                <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-green-500/5 to-blue-500/5 rounded-full blur-3xl"></div>
            </div>
        </div>
    )
}
