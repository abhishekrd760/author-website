'use client'

import { useState } from 'react'
import { Review } from '@/types/database'

interface ReviewFormProps {
    bookId: string
    onReviewSubmitted: (review: Review) => void
    onCancel: () => void
}

const ReviewForm = ({ bookId, onReviewSubmitted, onCancel }: ReviewFormProps) => {
    const [formData, setFormData] = useState({
        reviewer_name: '',
        review_text: '',
        rating: 5
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        setError('')

        if (!formData.reviewer_name.trim() || !formData.review_text.trim()) {
            setError('Please fill in all fields')
            setIsSubmitting(false)
            return
        }

        try {
            const reviewData = {
                book_id: bookId,
                reviewer_name: formData.reviewer_name.trim(),
                review_text: formData.review_text.trim(),
                rating: formData.rating
            }

            console.log('📝 Submitting review:', reviewData)

            const response = await fetch('/api/reviews', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(reviewData)
            })

            const result = await response.json()

            if (result.success && result.data) {
                console.log('✅ Review submitted successfully')
                onReviewSubmitted(result.data)
                setFormData({ reviewer_name: '', review_text: '', rating: 5 })
            } else {
                console.error('❌ Review submission failed:', result.error)
                setError(result.error || 'Failed to submit review. Please try again.')
            }
        } catch (error) {
            console.error('❌ Error submitting review:', error)
            setError('Failed to submit review. Please try again.')
        } finally {
            setIsSubmitting(false)
        }
    }

    const renderStars = (currentRating: number) => {
        return Array.from({ length: 5 }, (_, i) => (
            <button
                key={i}
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, rating: i + 1 }))}
                className={`text-2xl ${i < currentRating ? 'text-yellow-500' : 'text-gray-300'} hover:text-yellow-400 transition-colors`}
            >
                ★
            </button>
        ))
    }

    return (
        <div className="card">
            <h3 className="text-2xl font-bold mb-6">Write a Review</h3>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Input */}
                <div>
                    <label htmlFor="reviewer_name" className="block text-sm font-medium text-gray-700 mb-2">
                        Your Name
                    </label>
                    <input
                        type="text"
                        id="reviewer_name"
                        value={formData.reviewer_name}
                        onChange={(e) => setFormData(prev => ({ ...prev, reviewer_name: e.target.value }))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter your name"
                        maxLength={100}
                    />
                </div>

                {/* Rating */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Rating
                    </label>
                    <div className="flex items-center gap-2">
                        {renderStars(formData.rating)}
                        <span className="ml-2 text-gray-600">({formData.rating}/5 stars)</span>
                    </div>
                </div>

                {/* Review Text */}
                <div>
                    <label htmlFor="review_text" className="block text-sm font-medium text-gray-700 mb-2">
                        Your Review
                    </label>
                    <textarea
                        id="review_text"
                        rows={5}
                        value={formData.review_text}
                        onChange={(e) => setFormData(prev => ({ ...prev, review_text: e.target.value }))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Share your thoughts about this book..."
                        maxLength={1000}
                    />
                    <div className="text-right text-sm text-gray-500 mt-1">
                        {formData.review_text.length}/1000 characters
                    </div>
                </div>

                {/* Submit Buttons */}
                <div className="flex gap-4">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? 'Submitting...' : 'Submit Review'}
                    </button>
                    <button
                        type="button"
                        onClick={onCancel}
                        className="btn-secondary"
                        disabled={isSubmitting}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    )
}

export default ReviewForm
