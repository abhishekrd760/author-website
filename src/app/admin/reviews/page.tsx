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
        <nav className="cosmic-nav">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-8">
                    <h1 className="text-xl font-extralight text-white tracking-wide">
                        Cosmic <span className="text-cosmic">Admin</span>
                    </h1>
                    <div className="flex space-x-6">
                        <Link
                            href="/admin/dashboard"
                            className="text-white/80 hover:text-cosmic transition-colors font-light cursor-pointer"
                        >
                            Overview
                        </Link>
                        <Link
                            href="/admin/reviews"
                            className="text-cosmic font-light cursor-pointer"
                        >
                            Consciousness Reviews
                        </Link>
                        <Link
                            href="/admin/messages"
                            className="text-white/80 hover:text-cosmic transition-colors font-light cursor-pointer"
                        >
                            Cosmic Transmissions
                        </Link>
                    </div>
                </div>
                <div className="flex items-center space-x-4">
                    <span className="text-white/70 font-light">Welcome, {admin?.full_name}</span>
                    <button
                        onClick={handleLogout}
                        className="cosmic-button-secondary cursor-pointer"
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
            className="card hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300"
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
                        <h3 className="text-lg font-extralight text-white tracking-wide">{review.books?.title || 'Unknown Book'}</h3>
                        <div className="flex items-center space-x-2 mt-1">
                            {renderStars(review.rating)}
                            <span className="text-white/60 text-sm font-light">({review.rating}/5)</span>
                        </div>
                        <p className="text-white/50 text-sm mt-1 font-light">
                            by {review.reviewer_name} • {formatDate(review.created_at)}
                        </p>
                    </div>
                </div>
                <div className="flex space-x-2">
                    <button
                        onClick={() => setIsReplyOpen(!isReplyOpen)}
                        className="bg-gradient-to-r from-blue-600/20 to-blue-600/20 border border-blue-400/30 text-blue-300 hover:text-white hover:from-blue-600/30 hover:to-blue-600/30 px-4 py-2 rounded-lg text-sm transition-all font-light hover:shadow-lg hover:shadow-blue-500/25"
                    >
                        {review.replies && review.replies.length > 0 ? 'View Reply' : 'Reply'}
                    </button>
                </div>
            </div>

            {/* Review content */}
            <div className="mb-4">
                <p className="text-white/80 leading-relaxed font-light">{review.review_text}</p>
            </div>

            {/* Existing replies */}
            {review.replies && review.replies.length > 0 && (
                <div className="border-t border-blue-400/20 pt-4 mb-4">
                    <h4 className="text-sm font-extralight text-white/70 mb-2 tracking-wide">Admin Reply:</h4>
                    {review.replies.map((reply: ReviewReply) => (
                        <div key={reply.id} className="bg-gradient-to-r from-blue-500/10 to-blue-500/10 border border-blue-400/30 rounded-lg p-4 backdrop-blur-sm">
                            <p className="text-white/80 font-light">{reply.reply_text}</p>
                            <p className="text-white/50 text-xs mt-2 font-light">
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
                            className="w-full px-4 py-3 bg-white/5 border border-blue-400/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 transition-all backdrop-blur-sm resize-none"
                        />
                        <div className="flex space-x-3">
                            <button
                                onClick={handleSubmitReply}
                                disabled={!replyText.trim() || isSubmitting}
                                className="btn-primary disabled:from-gray-600 disabled:to-gray-600 disabled:scale-100 disabled:cursor-not-allowed font-light"
                            >
                                {isSubmitting ? 'Sending...' : 'Send Reply'}
                            </button>
                            <button
                                onClick={() => {
                                    setIsReplyOpen(false)
                                    setReplyText('')
                                }}
                                className="bg-white/5 border border-blue-400/30 text-white/70 hover:text-white hover:bg-white/10 hover:border-blue-400/40 px-6 py-2 rounded-lg transition-all font-light"
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
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
            <AdminNav />

            <div className="p-6">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <h2 className="text-3xl font-extralight text-white mb-2 tracking-wide">
                        Consciousness <span className="text-cosmic">Reviews</span>
                    </h2>
                    <p className="text-white/60 font-light">Engage with soul experiences and cosmic feedback</p>
                </motion.div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="card">
                        <h3 className="text-lg font-extralight text-white mb-2 tracking-wide">Total Reviews</h3>
                        <p className="text-3xl font-extralight text-cosmic">{pagination.totalCount}</p>
                    </div>
                    <div className="card">
                        <h3 className="text-lg font-extralight text-white mb-2 tracking-wide">With Replies</h3>
                        <p className="text-3xl font-extralight text-green-400">
                            {reviews.filter(r => r.replies && r.replies.length > 0).length}
                        </p>
                    </div>
                    <div className="card">
                        <h3 className="text-lg font-extralight text-white mb-2 tracking-wide">Need Reply</h3>
                        <p className="text-3xl font-extralight text-yellow-400">
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
                                        className={`px-4 py-2 rounded-lg transition-all duration-300 font-light ${page === pagination.currentPage
                                            ? 'bg-gradient-to-r from-blue-600 to-blue-600 text-white shadow-lg shadow-blue-500/25'
                                            : 'bg-white/5 border border-blue-400/20 text-white/70 hover:text-white hover:bg-white/10 hover:border-blue-400/40'
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
                <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-blue-500/10 to-blue-500/10 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-blue-500/10 to-blue-500/10 rounded-full blur-3xl"></div>
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/5 to-blue-400/5 rounded-full blur-2xl animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-l from-blue-400/5 to-blue-400/5 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
            </div>
        </div>
    )
}
