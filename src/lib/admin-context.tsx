'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { DashboardData, ContactMessage, ReviewWithBook } from '../types/database'

interface AdminUser {
    id: string
    username: string
    full_name: string
    role: string
}

interface AdminContextType {
    admin: AdminUser | null
    isLoading: boolean
    isAuthenticated: boolean
    login: (username: string, password: string) => Promise<{ success: boolean; error?: string }>
    logout: () => Promise<void>
    checkAuth: () => Promise<void>
}

const AdminContext = createContext<AdminContextType | undefined>(undefined)

export function AdminProvider({ children }: { children: React.ReactNode }) {
    const [admin, setAdmin] = useState<AdminUser | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    const checkAuth = async () => {
        try {
            const response = await fetch('/api/admin/verify', {
                credentials: 'include'
            })

            if (response.ok) {
                const data = await response.json()
                if (data.success) {
                    setAdmin(data.admin)
                } else {
                    setAdmin(null)
                }
            } else {
                setAdmin(null)
            }
        } catch (error) {
            console.error('Auth check error:', error)
            setAdmin(null)
        } finally {
            setIsLoading(false)
        }
    }

    const login = async (username: string, password: string) => {
        try {
            const response = await fetch('/api/admin/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
                credentials: 'include'
            })

            const data = await response.json()

            if (data.success) {
                setAdmin(data.admin)
                return { success: true }
            } else {
                return { success: false, error: data.error }
            }
        } catch (error) {
            console.error('Login error:', error)
            return { success: false, error: 'Login failed' }
        }
    }

    const logout = async () => {
        try {
            await fetch('/api/admin/logout', {
                method: 'POST',
                credentials: 'include'
            })
        } catch (error) {
            console.error('Logout error:', error)
        } finally {
            setAdmin(null)
        }
    }

    useEffect(() => {
        checkAuth()
    }, [])

    const value = {
        admin,
        isLoading,
        isAuthenticated: !!admin,
        login,
        logout,
        checkAuth
    }

    return (
        <AdminContext.Provider value={value}>
            {children}
        </AdminContext.Provider>
    )
}

export function useAdmin() {
    const context = useContext(AdminContext)
    if (context === undefined) {
        throw new Error('useAdmin must be used within an AdminProvider')
    }
    return context
}

// Hook for fetching dashboard data
export function useDashboard() {
    const [data, setData] = useState<DashboardData | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const fetchDashboard = async () => {
        try {
            setIsLoading(true)
            const response = await fetch('/api/admin/dashboard', {
                credentials: 'include'
            })

            if (response.ok) {
                const result = await response.json()
                if (result.success) {
                    setData(result.overview)
                    setError(null)
                } else {
                    setError(result.error)
                }
            } else {
                setError('Failed to fetch dashboard data')
            }
        } catch (err) {
            setError('Network error')
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchDashboard()
    }, [])

    return { data, isLoading, error, refetch: fetchDashboard }
}

// Hook for managing contact messages
export function useMessages() {
    const [messages, setMessages] = useState<ContactMessage[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        totalCount: 0
    })

    const fetchMessages = async (page = 1, filter = 'all') => {
        try {
            setIsLoading(true)
            const response = await fetch(`/api/admin/messages?page=${page}&filter=${filter}`, {
                credentials: 'include'
            })

            if (response.ok) {
                const result = await response.json()
                if (result.success) {
                    setMessages(result.messages)
                    setPagination({
                        currentPage: result.currentPage,
                        totalPages: result.totalPages,
                        totalCount: result.totalCount
                    })
                    setError(null)
                } else {
                    setError(result.error)
                }
            } else {
                setError('Failed to fetch messages')
            }
        } catch (err) {
            setError('Network error')
        } finally {
            setIsLoading(false)
        }
    }

    const markAsRead = async (messageId: string) => {
        try {
            const response = await fetch('/api/admin/messages', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ messageId, action: 'mark_read' }),
                credentials: 'include'
            })

            if (response.ok) {
                // Update local state
                setMessages(prev => prev.map(msg =>
                    msg.id === messageId ? { ...msg, is_read: true } : msg
                ))
            }
        } catch (err) {
            console.error('Mark as read error:', err)
        }
    }

    const markAsReplied = async (messageId: string) => {
        try {
            const response = await fetch('/api/admin/messages', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ messageId, action: 'mark_replied' }),
                credentials: 'include'
            })

            if (response.ok) {
                // Update local state
                setMessages(prev => prev.map(msg =>
                    msg.id === messageId ? { ...msg, replied: true } : msg
                ))
            }
        } catch (err) {
            console.error('Mark as replied error:', err)
        }
    }

    useEffect(() => {
        fetchMessages()
    }, [])

    return {
        messages,
        isLoading,
        error,
        pagination,
        fetchMessages,
        markAsRead,
        markAsReplied
    }
}

// Hook for managing reviews
export function useReviews() {
    const [reviews, setReviews] = useState<ReviewWithBook[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        totalCount: 0
    })

    const fetchReviews = async (page = 1) => {
        try {
            setIsLoading(true)
            const response = await fetch(`/api/admin/reviews?page=${page}`, {
                credentials: 'include'
            })

            if (response.ok) {
                const result = await response.json()
                if (result.success) {
                    setReviews(result.reviews)
                    setPagination({
                        currentPage: result.currentPage,
                        totalPages: result.totalPages,
                        totalCount: result.totalCount
                    })
                    setError(null)
                } else {
                    setError(result.error)
                }
            } else {
                setError('Failed to fetch reviews')
            }
        } catch (err) {
            setError('Network error')
        } finally {
            setIsLoading(false)
        }
    }

    const replyToReview = async (reviewId: string, replyText: string) => {
        try {
            const response = await fetch('/api/admin/reviews', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ reviewId, replyText }),
                credentials: 'include'
            })

            if (response.ok) {
                const result = await response.json()
                if (result.success) {
                    // Update local state
                    setReviews(prev => prev.map(review =>
                        review.id === reviewId
                            ? { ...review, replies: [...(review.replies || []), result.reply] }
                            : review
                    ))
                    return { success: true }
                } else {
                    return { success: false, error: result.error }
                }
            } else {
                return { success: false, error: 'Failed to send reply' }
            }
        } catch (err) {
            return { success: false, error: 'Network error' }
        }
    }

    useEffect(() => {
        fetchReviews()
    }, [])

    return {
        reviews,
        isLoading,
        error,
        pagination,
        fetchReviews,
        replyToReview
    }
}
