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
                            className="text-gray-300 hover:text-white transition-colors"
                        >
                            Reviews
                        </Link>
                        <Link
                            href="/admin/messages"
                            className="text-white font-semibold"
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
            className={`bg-gray-800/50 backdrop-blur-sm border rounded-xl p-6 ${message.is_read ? 'border-gray-700/50' : 'border-blue-500/30 bg-blue-500/5'
                }`}
        >
            {/* Message header */}
            <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-white">{message.name}</h3>
                        {!message.is_read && (
                            <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                                New
                            </span>
                        )}
                        {message.replied && (
                            <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                                Replied
                            </span>
                        )}
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                        <span>{message.email}</span>
                        <span>•</span>
                        <span>{formatDate(message.created_at)}</span>
                    </div>
                    {message.subject && (
                        <p className="text-gray-300 font-medium mt-2">Subject: {message.subject}</p>
                    )}
                </div>

                <div className="flex space-x-2">
                    {!message.is_read && (
                        <button
                            onClick={() => onMarkRead(message.id)}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm transition-colors"
                        >
                            Mark Read
                        </button>
                    )}
                    <button
                        onClick={handleEmailReply}
                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm transition-colors"
                    >
                        Email Reply
                    </button>
                </div>
            </div>

            {/* Message content */}
            <div className="bg-gray-700/30 rounded-lg p-4">
                <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                    {message.message}
                </p>
            </div>

            {/* Message metadata */}
            <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
                <span>Message ID: {message.id}</span>
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
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
            <AdminNav />

            <div className="p-6">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <h2 className="text-3xl font-bold text-white mb-2">Message Management</h2>
                    <p className="text-gray-400">Review and respond to contact messages</p>
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
                            className={`px-6 py-3 rounded-lg font-medium transition-all ${currentFilter === filter.key
                                ? 'bg-blue-600 text-white shadow-lg'
                                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                }`}
                        >
                            {filter.label}
                        </button>
                    ))}
                </motion.div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                        <h3 className="text-lg font-semibold text-white mb-2">Total</h3>
                        <p className="text-3xl font-bold text-blue-400">{pagination.totalCount}</p>
                    </div>
                    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                        <h3 className="text-lg font-semibold text-white mb-2">Unread</h3>
                        <p className="text-3xl font-bold text-red-400">
                            {messages.filter(m => !m.is_read).length}
                        </p>
                    </div>
                    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                        <h3 className="text-lg font-semibold text-white mb-2">Read</h3>
                        <p className="text-3xl font-bold text-yellow-400">
                            {messages.filter(m => m.is_read && !m.replied).length}
                        </p>
                    </div>
                    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                        <h3 className="text-lg font-semibold text-white mb-2">Replied</h3>
                        <p className="text-3xl font-bold text-green-400">
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
