'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Review, Book, Reply } from '@/types/database'
import { api } from '@/lib/supabase'
import Link from 'next/link'
import StarryBackground from '@/components/StarryBackground'
import FractalPyramid from '@/components/FractalPyramid'

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
            <span key={i} className={`text-lg ${i < rating ? 'text-amber-400' : 'text-white/30'}`}>
                ✦
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
            <div className="min-h-screen relative overflow-hidden">
                {/* Cosmic Pattern Background */}
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                        backgroundSize: '60px 60px'
                    }}></div>
                </div>

                {/* Hero Section */}
                <section className="py-20 cosmic-gradient text-white relative">
                    <div className="container-custom text-center">
                        <h1 className="text-4xl lg:text-6xl font-extralight tracking-wide mb-6 text-cosmic" style={{ fontFamily: 'var(--font-cinzel)' }}>Consciousness Reviews</h1>
                        <p className="text-xl lg:text-2xl text-white/80 max-w-3xl mx-auto font-light">
                            Shared experiences from souls awakening to cosmic consciousness
                        </p>
                    </div>
                </section>

                {/* Loading Reviews */}
                <section className="py-16 relative z-10">
                    <div className="container-custom">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                                <div key={i} className="card animate-pulse">
                                    <div className="flex items-center gap-2 mb-3">
                                        <div className="h-4 bg-white/5 rounded w-24"></div>
                                        <div className="h-4 bg-white/5 rounded w-20"></div>
                                    </div>
                                    <div className="h-3 bg-white/5 rounded mb-2"></div>
                                    <div className="h-3 bg-white/5 rounded mb-2"></div>
                                    <div className="h-3 bg-white/5 rounded w-3/4"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        )
    }

    return (
        <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-[#080810]/80 via-[#0a0a12]/60 to-[#06060a]/40">
            <StarryBackground />

            {/* Floating Cosmic Elements */}
            <motion.div
                animate={{
                    rotate: 360,
                    scale: [1, 1.2, 1]
                }}
                transition={{
                    rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                    scale: { duration: 5, repeat: Infinity, ease: "easeInOut" }
                }}
                className="absolute top-40 right-20 text-3xl opacity-20"
            >
                ✦
            </motion.div>

            <motion.div
                animate={{
                    rotate: -360,
                    y: [0, -15, 0]
                }}
                transition={{
                    rotate: { duration: 25, repeat: Infinity, ease: "linear" },
                    y: { duration: 7, repeat: Infinity, ease: "easeInOut" }
                }}
                className="absolute bottom-40 left-20 text-2xl opacity-20"
            >
                💫
            </motion.div>

            {/* Hero Section */}
            <section className="py-20 cosmic-gradient text-white relative">
                <div className="container-custom">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center"
                    >
                        <h1 className="text-4xl lg:text-6xl font-extralight tracking-wide mb-6 text-cosmic" style={{ fontFamily: 'var(--font-cinzel)' }}>Consciousness Reviews</h1>
                        <p className="text-xl lg:text-2xl text-white/80 max-w-3xl mx-auto mb-4 font-light">
                            Transformational experiences shared by awakened souls worldwide
                        </p>
                        <p className="text-lg text-white/70 font-light tracking-wide">
                            Each review is a testament to consciousness expansion
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Reviews Content */}
            <section className="py-16 relative z-10">
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
                                <div className="card">
                                    <h3 className="text-xl font-extralight mb-4 text-white tracking-wide">Cosmic Resonance</h3>
                                    <div className="text-center">
                                        <div className="text-4xl font-light text-amber-400 mb-2">{averageRating}</div>
                                        <div className="flex justify-center mb-2">
                                            {renderStars(Math.round(Number(averageRating)))}
                                        </div>
                                        <div className="text-sm text-white/60 font-light">Based on {totalReviews} soul experiences</div>
                                    </div>
                                </div>

                                {/* Rating Breakdown */}
                                <div className="card">
                                    <h3 className="text-lg font-extralight mb-4 text-white tracking-wide">Readers Ratings</h3>
                                    <div className="space-y-2">
                                        {[5, 4, 3, 2, 1].map((rating) => (
                                            <div key={rating} className="flex items-center gap-2 text-sm">
                                                <span className="w-8 text-white font-light">{rating}✦</span>
                                                <div className="flex-1 bg-white/10 rounded-full h-2">
                                                    <div
                                                        className="bg-gradient-to-r from-amber-400 to-blue-400 h-2 rounded-full transition-all duration-300"
                                                        style={{
                                                            width: totalReviews > 0 ? `${(ratingCounts[rating as keyof typeof ratingCounts] / totalReviews) * 100}%` : '0%'
                                                        }}
                                                    />
                                                </div>
                                                <span className="w-8 text-white/60 font-light">{ratingCounts[rating as keyof typeof ratingCounts]}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Filter */}
                                <div className="card">
                                    <h3 className="text-lg font-extralight mb-4 text-white tracking-wide">Filter Experiences</h3>
                                    <div className="space-y-2">
                                        <button
                                            onClick={() => setFilter('all')}
                                            className={`w-full text-left px-3 py-2 rounded-lg font-light transition-all duration-300 ${filter === 'all'
                                                ? 'bg-gradient-to-r from-blue-600 to-blue-600 text-white'
                                                : 'hover:bg-white/10 text-white/80 hover:text-white'
                                                }`}
                                        >
                                            All Experiences ({totalReviews})
                                        </button>
                                        {[5, 4, 3, 2, 1].map((rating) => (
                                            <button
                                                key={rating}
                                                onClick={() => setFilter(rating)}
                                                className={`w-full text-left px-3 py-2 rounded-lg flex items-center justify-between font-light transition-all duration-300 ${filter === rating
                                                    ? 'bg-gradient-to-r from-blue-600 to-blue-600 text-white'
                                                    : 'hover:bg-white/10 text-white/80 hover:text-white'
                                                    }`}
                                            >
                                                <span>{rating} Stars of Awakening</span>
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
                                <h2 className="text-2xl font-extralight tracking-wide mb-4 text-white" style={{ fontFamily: 'var(--font-lora)' }}>
                                    {filter === 'all' ? 'All Soul Experiences' : `${filter} Star Awakening Experiences`}
                                    <span className="text-white/60 text-lg ml-2 font-light">
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
                                            className="card hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 group"
                                        >
                                            {/* Header */}
                                            <div className="flex justify-between items-start mb-4">
                                                <div>
                                                    <div className="flex items-center gap-3 mb-2">
                                                        <span className="font-light text-lg text-white">{review.reviewer_name}</span>
                                                        <div className="flex">
                                                            {renderStars(review.rating)}
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-sm text-white/60 font-light">
                                                        <span>{formatDate(review.created_at)}</span>
                                                        <span>•</span>
                                                        <Link
                                                            href={`/books/${review.book.id}`}
                                                            className="text-blue-300 hover:text-blue-200 font-light transition-colors"
                                                        >
                                                            {review.book.title}
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Review Text */}
                                            <blockquote className="text-white/80 text-lg leading-relaxed font-light relative pl-6">
                                                <div className="absolute left-0 top-0 text-blue-400/60 text-2xl">&ldquo;</div>
                                                {review.review_text}
                                                <div className="absolute bottom-0 right-0 text-blue-400/60 text-2xl">&rdquo;</div>
                                            </blockquote>

                                            {/* Admin Replies */}
                                            {review.replies && review.replies.length > 0 && (
                                                <div className="mt-6 pt-4 border-t border-white/10">
                                                    <h4 className="text-sm font-light text-blue-300/80 mb-3">Author&apos;s Cosmic Response:</h4>
                                                    {review.replies.map((reply: Reply) => (
                                                        <div key={reply.id} className="bg-blue-500/10 border border-blue-400/30 rounded-lg p-4">
                                                            <p className="text-white/80 leading-relaxed font-light">{reply.reply_text}</p>
                                                            <p className="text-white/50 text-sm mt-2 font-light">
                                                                Shared on {new Date(reply.created_at).toLocaleDateString('en-US', {
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
                                            <div className="mt-4 pt-4 border-t border-white/10">
                                                <Link
                                                    href={`/books/${review.book.id}`}
                                                    className="text-white/60 hover:text-blue-300 text-sm font-light transition-colors"
                                                >
                                                    Explore more about {review.book.title} →
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
                                        <motion.div
                                            animate={{
                                                scale: [1, 1.1, 1],
                                                rotate: [0, 10, -10, 0]
                                            }}
                                            transition={{
                                                duration: 4,
                                                repeat: Infinity,
                                                ease: "easeInOut"
                                            }}
                                            className="text-6xl mb-6"
                                        >
                                            🌌
                                        </motion.div>
                                        <h3 className="text-2xl font-extralight text-white mb-4 tracking-wide">
                                            {reviews.length === 0
                                                ? "Awaiting First Cosmic Experience"
                                                : `No ${filter} Star Awakenings Yet`
                                            }
                                        </h3>
                                        <p className="text-white/70 mb-6 font-light leading-relaxed">
                                            {reviews.length === 0
                                                ? "Be the first soul to share your transformational journey! Visit any book and leave your consciousness expansion experience to guide other seekers."
                                                : `No experiences found with ${filter} star awakening level. Try viewing all experiences or share your own cosmic journey!`
                                            }
                                        </p>
                                        <div className="space-y-3">
                                            {reviews.length === 0 ? (
                                                <Link href="/books" className="cosmic-button inline-block">
                                                    Explore Cosmic Library & Share First Experience
                                                </Link>
                                            ) : (
                                                <button
                                                    onClick={() => setFilter('all')}
                                                    className="cosmic-button"
                                                    style={{ fontFamily: 'var(--font-lora)' }}
                                                >
                                                    View All Soul Experiences
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {/* Cosmic Call to Action */}
                            {filteredReviews.length > 0 && (
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6 }}
                                    viewport={{ once: true }}
                                    className="mt-12 text-center card relative overflow-hidden"
                                >
                                    {/* Cosmic Pattern Overlay */}
                                    <div className="absolute inset-0 opacity-10">
                                        <div className="absolute inset-0" style={{
                                            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E")`,
                                            backgroundSize: '40px 40px'
                                        }}></div>
                                    </div>

                                    <div className="relative z-10">
                                        <div className="mb-4 flex justify-center">
                                            <FractalPyramid />
                                        </div>
                                        <h3 className="text-2xl font-extralight mb-4 text-white tracking-wide">
                                            Ready to Share Your <span className="text-cosmic">Cosmic Journey?</span>
                                        </h3>
                                        <p className="text-white/70 mb-6 max-w-2xl mx-auto font-light leading-relaxed">
                                            Add your voice to the chorus of awakened souls. Share your transformational experience
                                            and help guide other seekers on their path to cosmic consciousness.
                                        </p>
                                        <Link href="/books" className="cosmic-button">
                                            Explore Books & Share Your Awakening
                                        </Link>
                                    </div>
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
