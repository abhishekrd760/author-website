'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAdmin, useMessages } from '@/lib/admin-context'
import { motion } from 'framer-motion'
import Link from 'next/link'

interface Message {
    id: string
    name: string
    email: string
    subject?: string
    message: string
    is_read: boolean
    replied: boolean
    created_at: string
}

// Navigation component (reused)
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
                            className="text-white/80 hover:text-cosmic transition-colors font-light cursor-pointer"
                        >
                            Consciousness Reviews
                        </Link>
                        <Link
                            href="/admin/messages"
                            className="text-cosmic font-light cursor-pointer"
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

// Message card component
function MessageCard({ message, onMarkRead, onMarkReplied }: {
    message: Message
    onMarkRead: (id: string) => void
    onMarkReplied: (id: string) => void
}) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    const handleEmailReply = () => {
        // This would typically integrate with an email service
        // For now, we'll show a placeholder alert
        alert(`Email reply functionality would open here for ${message.email}`)
        onMarkReplied(message.id)
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`card ${message.is_read ? 'border-blue-400/20' : 'border-blue-400/40 bg-blue-500/5'
                } hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300`}
        >
            {/* Message header */}
            <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-extralight text-white tracking-wide">{message.name}</h3>
                        {!message.is_read && (
                            <span className="bg-gradient-to-r from-blue-500 to-blue-500 text-white text-xs px-2 py-1 rounded-full font-light">
                                New Transmission
                            </span>
                        )}
                        {message.replied && (
                            <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs px-2 py-1 rounded-full font-light">
                                Replied
                            </span>
                        )}
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-white/60 font-light">
                        <span>{message.email}</span>
                        <span>•</span>
                        <span>{formatDate(message.created_at)}</span>
                    </div>
                    {message.subject && (
                        <p className="text-white/80 font-light mt-2">Subject: {message.subject}</p>
                    )}
                </div>

                <div className="flex space-x-2">
                    {!message.is_read && (
                        <button
                            onClick={() => onMarkRead(message.id)}
                            className="bg-gradient-to-r from-blue-600/20 to-blue-600/20 border border-blue-400/30 text-blue-300 hover:text-white hover:from-blue-600/30 hover:to-blue-600/30 px-3 py-1 rounded text-sm transition-all font-light hover:shadow-lg hover:shadow-blue-500/25"
                        >
                            Mark Read
                        </button>
                    )}
                    <button
                        onClick={handleEmailReply}
                        className="bg-gradient-to-r from-green-600/20 to-emerald-600/20 border border-green-400/30 text-green-300 hover:text-white hover:from-green-600/30 hover:to-emerald-600/30 px-3 py-1 rounded text-sm transition-all font-light hover:shadow-lg hover:shadow-green-500/25"
                    >
                        Email Reply
                    </button>
                </div>
            </div>

            {/* Message content */}
            <div className="bg-white/5 border border-blue-400/20 rounded-lg p-4 backdrop-blur-sm">
                <p className="text-white/80 leading-relaxed whitespace-pre-wrap font-light">
                    {message.message}
                </p>
            </div>

            {/* Message metadata */}
            <div className="mt-4 flex items-center justify-between text-xs text-white/50 font-light">
                <span>Transmission ID: {message.id}</span>
                <span>
                    Status: {message.replied ? 'Replied' : message.is_read ? 'Read' : 'Unread'}
                </span>
            </div>
        </motion.div>
    )
}

export default function AdminMessages() {
    const { isAuthenticated, isLoading: authLoading } = useAdmin()
    const { messages, isLoading, error, pagination, fetchMessages, markAsRead, markAsReplied } = useMessages()
    const [currentFilter, setCurrentFilter] = useState('all')
    const router = useRouter()

    useEffect(() => {
        if (!authLoading && !isAuthenticated) {
            router.push('/admin/login')
        }
    }, [isAuthenticated, authLoading, router])

    const handleFilterChange = (filter: string) => {
        setCurrentFilter(filter)
        fetchMessages(1, filter)
    }

    const handlePageChange = (page: number) => {
        fetchMessages(page, currentFilter)
    }

    const handleMarkRead = (messageId: string) => {
        markAsRead(messageId)
    }

    const handleMarkReplied = (messageId: string) => {
        markAsReplied(messageId)
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
                        Cosmic <span className="text-cosmic">Transmissions</span>
                    </h2>
                    <p className="text-white/60 font-light">Manage consciousness messages from seekers</p>
                </motion.div>

                {/* Filter tabs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="flex space-x-4 mb-8"
                >
                    {[
                        { key: 'all', label: 'All Messages' },
                        { key: 'unread', label: 'Unread' },
                        { key: 'read', label: 'Read' },
                        { key: 'replied', label: 'Replied' }
                    ].map((filter) => (
                        <button
                            key={filter.key}
                            onClick={() => handleFilterChange(filter.key)}
                            className={`px-6 py-3 rounded-lg font-light transition-all duration-300 ${currentFilter === filter.key
                                ? 'bg-gradient-to-r from-blue-600 to-blue-600 text-white shadow-lg shadow-blue-500/25'
                                : 'bg-white/5 border border-blue-400/20 text-white/70 hover:text-white hover:bg-white/10 hover:border-blue-400/40'
                                }`}
                        >
                            {filter.label}
                        </button>
                    ))}
                </motion.div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="card">
                        <h3 className="text-lg font-extralight text-white mb-2 tracking-wide">Total</h3>
                        <p className="text-3xl font-extralight text-cosmic">{pagination.totalCount}</p>
                    </div>
                    <div className="card">
                        <h3 className="text-lg font-extralight text-white mb-2 tracking-wide">Unread</h3>
                        <p className="text-3xl font-extralight text-red-400">
                            {messages.filter(m => !m.is_read).length}
                        </p>
                    </div>
                    <div className="card">
                        <h3 className="text-lg font-extralight text-white mb-2 tracking-wide">Read</h3>
                        <p className="text-3xl font-extralight text-yellow-400">
                            {messages.filter(m => m.is_read && !m.replied).length}
                        </p>
                    </div>
                    <div className="card">
                        <h3 className="text-lg font-extralight text-white mb-2 tracking-wide">Replied</h3>
                        <p className="text-3xl font-extralight text-green-400">
                            {messages.filter(m => m.replied).length}
                        </p>
                    </div>
                </div>

                {/* Messages list */}
                {isLoading ? (
                    <div className="space-y-6">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-6 animate-pulse">
                                <div className="h-32 bg-gray-700 rounded"></div>
                            </div>
                        ))}
                    </div>
                ) : error ? (
                    <div className="text-center py-12">
                        <p className="text-red-400 text-lg">{error}</p>
                    </div>
                ) : messages.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-400 text-lg">
                            {currentFilter === 'all' ? 'No messages found' : `No ${currentFilter} messages found`}
                        </p>
                    </div>
                ) : (
                    <>
                        <div className="space-y-6 mb-8">
                            {messages.map((message) => (
                                <MessageCard
                                    key={message.id}
                                    message={message}
                                    onMarkRead={handleMarkRead}
                                    onMarkReplied={handleMarkReplied}
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
