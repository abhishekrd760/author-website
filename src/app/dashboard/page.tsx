'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

interface DashboardReview {
    id: string
    reviewer_name: string
    review_text: string
    rating: number
    book_title: string
    created_at: string
    has_reply: boolean
}

interface DashboardMessage {
    id: string
    name: string
    email: string
    message: string
    created_at: string
}

const Dashboard = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [loginData, setLoginData] = useState({ username: '', password: '' })
    const [isLoggingIn, setIsLoggingIn] = useState(false)
    const [error, setError] = useState('')
    const router = useRouter()

    useEffect(() => {
        checkAuth()
    }, [])

    const checkAuth = async () => {
        try {
            const response = await fetch('/api/auth/me')
            if (response.ok) {
                setIsAuthenticated(true)
            }
        } catch (error) {
            console.error('Auth check failed:', error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoggingIn(true)
        setError('')

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData),
            })

            if (response.ok) {
                setIsAuthenticated(true)
                router.refresh()
            } else {
                const data = await response.json()
                setError(data.error || 'Login failed')
            }
        } catch (error) {
            console.error('Login error:', error)
            setError('Login failed. Please try again.')
        } finally {
            setIsLoggingIn(false)
        }
    }

    const handleLogout = async () => {
        try {
            await fetch('/api/auth/logout', { method: 'POST' })
            setIsAuthenticated(false)
            router.refresh()
        } catch (error) {
            console.error('Logout error:', error)
        }
    }

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading...</p>
                </div>
            </div>
        )
    }

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full mx-4"
                >
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Author Dashboard</h1>
                        <p className="text-gray-600">Please log in to access the dashboard</p>
                    </div>

                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                                Username
                            </label>
                            <input
                                type="text"
                                id="username"
                                value={loginData.username}
                                onChange={(e) => setLoginData(prev => ({ ...prev, username: e.target.value }))}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter your username"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                value={loginData.password}
                                onChange={(e) => setLoginData(prev => ({ ...prev, password: e.target.value }))}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter your password"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoggingIn}
                            className="w-full btn-primary py-3 disabled:opacity-50"
                        >
                            {isLoggingIn ? 'Logging in...' : 'Log In'}
                        </button>
                    </form>

                    <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                        <p className="text-sm text-blue-800 font-medium mb-1">Demo Credentials:</p>
                        <p className="text-sm text-blue-700">Username: <code className="bg-blue-100 px-1 rounded">author</code></p>
                        <p className="text-sm text-blue-700">Password: <code className="bg-blue-100 px-1 rounded">authorpass123</code></p>
                    </div>
                </motion.div>
            </div>
        )
    }

    return <DashboardContent onLogout={handleLogout} />
}

// Dashboard content component (when logged in)
const DashboardContent = ({ onLogout }: { onLogout: () => void }) => {
    const [activeTab, setActiveTab] = useState<'reviews' | 'messages'>('reviews')
    const [reviews, setReviews] = useState<DashboardReview[]>([])
    const [messages, setMessages] = useState<DashboardMessage[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchDashboardData()
    }, [])

    const fetchDashboardData = async () => {
        try {
            // In a real app, these would be protected API routes
            // For demo, we'll use mock data
            setReviews([
                {
                    id: '1',
                    reviewer_name: 'BookLover123',
                    review_text: 'Absolutely captivating! I couldn\'t put this book down.',
                    rating: 5,
                    book_title: 'The Midnight Garden',
                    created_at: '2024-02-15T10:30:00Z',
                    has_reply: false
                },
                {
                    id: '2',
                    reviewer_name: 'FantasyFan',
                    review_text: 'Amazing world-building and magical system.',
                    rating: 5,
                    book_title: 'Whispers in the Wind',
                    created_at: '2024-02-08T09:15:00Z',
                    has_reply: true
                }
            ])

            setMessages([
                {
                    id: '1',
                    name: 'Sarah Johnson',
                    email: 'sarah@example.com',
                    message: 'I absolutely loved your latest book! When will the sequel be available?',
                    created_at: '2024-02-16T14:20:00Z'
                },
                {
                    id: '2',
                    name: 'Michael Chen',
                    email: 'michael@example.com',
                    message: 'Would you be interested in doing a virtual book club discussion?',
                    created_at: '2024-02-14T11:45:00Z'
                }
            ])
        } catch (error) {
            console.error('Error fetching dashboard data:', error)
        } finally {
            setLoading(false)
        }
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, i) => (
            <span key={i} className={`text-lg ${i < rating ? 'text-yellow-500' : 'text-gray-300'}`}>
                ★
            </span>
        ))
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b">
                <div className="container-custom py-4">
                    <div className="flex justify-between items-center">
                        <h1 className="text-2xl font-bold text-gray-900">Author Dashboard</h1>
                        <button
                            onClick={onLogout}
                            className="btn-secondary"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </header>

            {/* Dashboard Content */}
            <div className="container-custom py-8">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="card text-center">
                        <h3 className="text-3xl font-bold text-blue-600 mb-2">{reviews.length}</h3>
                        <p className="text-gray-600">Recent Reviews</p>
                    </div>
                    <div className="card text-center">
                        <h3 className="text-3xl font-bold text-green-600 mb-2">{messages.length}</h3>
                        <p className="text-gray-600">New Messages</p>
                    </div>
                    <div className="card text-center">
                        <h3 className="text-3xl font-bold text-purple-600 mb-2">4.8</h3>
                        <p className="text-gray-600">Avg Rating</p>
                    </div>
                    <div className="card text-center">
                        <h3 className="text-3xl font-bold text-orange-600 mb-2">1M+</h3>
                        <p className="text-gray-600">Books Sold</p>
                    </div>
                </div>

                {/* Tabs */}
                <div className="mb-6">
                    <div className="border-b border-gray-200">
                        <nav className="-mb-px flex space-x-8">
                            <button
                                onClick={() => setActiveTab('reviews')}
                                className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === 'reviews'
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                            >
                                Recent Reviews ({reviews.length})
                            </button>
                            <button
                                onClick={() => setActiveTab('messages')}
                                className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === 'messages'
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                            >
                                Contact Messages ({messages.length})
                            </button>
                        </nav>
                    </div>
                </div>

                {/* Tab Content */}
                {loading ? (
                    <div className="text-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                        <p className="text-gray-600">Loading...</p>
                    </div>
                ) : (
                    <div>
                        {activeTab === 'reviews' && (
                            <div className="space-y-6">
                                {reviews.map((review) => (
                                    <div key={review.id} className="card">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <div className="flex items-center gap-3 mb-2">
                                                    <h3 className="font-semibold text-lg">{review.reviewer_name}</h3>
                                                    <div className="flex">
                                                        {renderStars(review.rating)}
                                                    </div>
                                                    {review.has_reply && (
                                                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                                                            Replied
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-sm text-gray-500">
                                                    {review.book_title} • {formatDate(review.created_at)}
                                                </p>
                                            </div>
                                        </div>

                                        <blockquote className="text-gray-700 mb-4 italic">
                                            &ldquo;{review.review_text}&rdquo;
                                        </blockquote>

                                        {!review.has_reply && (
                                            <button className="btn-primary">
                                                Reply to Review
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}

                        {activeTab === 'messages' && (
                            <div className="space-y-6">
                                {messages.map((message) => (
                                    <div key={message.id} className="card">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <h3 className="font-semibold text-lg">{message.name}</h3>
                                                <p className="text-sm text-gray-500">
                                                    {message.email} • {formatDate(message.created_at)}
                                                </p>
                                            </div>
                                        </div>

                                        <p className="text-gray-700 mb-4">{message.message}</p>

                                        <div className="flex gap-3">
                                            <button className="btn-primary">
                                                Reply
                                            </button>
                                            <button className="btn-secondary">
                                                Mark as Read
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Dashboard
