'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAdmin, useDashboard } from '@/lib/admin-context'
import { motion } from 'framer-motion'
import Link from 'next/link'

// Navigation component
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

// Stats card component
function StatsCard({ title, value, subtitle, icon, color = 'cosmic' }: {
    title: string
    value: number | string
    subtitle?: string
    icon: React.ReactNode
    color?: string
}) {
    const colorClasses = {
        cosmic: 'from-purple-500/20 to-blue-500/20 border-purple-400/30',
        green: 'from-green-500/20 to-emerald-500/20 border-green-400/30',
        yellow: 'from-amber-500/20 to-yellow-500/20 border-amber-400/30',
        purple: 'from-purple-500/20 to-violet-500/20 border-purple-400/30',
        red: 'from-red-500/20 to-rose-500/20 border-red-400/30'
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`bg-gradient-to-br ${colorClasses[color as keyof typeof colorClasses]} border rounded-xl p-6 card group hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300`}
        >
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-white/70 text-sm font-light tracking-wide">{title}</p>
                    <p className="text-2xl font-extralight text-white mt-1">{value}</p>
                    {subtitle && (
                        <p className="text-white/50 text-xs mt-1 font-light">{subtitle}</p>
                    )}
                </div>
                <div className="text-purple-300/80 group-hover:text-cosmic transition-colors">
                    {icon}
                </div>
            </div>
        </motion.div>
    )
}

// Quick actions component
function QuickActions() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="card"
        >
            <h3 className="text-lg font-extralight text-white mb-4 tracking-wide">
                Quantum <span className="text-cosmic">Actions</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link
                    href="/admin/reviews"
                    className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-400/30 rounded-lg p-4 text-center hover:from-purple-600/30 hover:to-blue-600/30 transition-all group hover:shadow-lg hover:shadow-purple-500/25"
                >
                    <div className="text-purple-300 mb-2 group-hover:scale-110 transition-transform">
                        <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                    </div>
                    <p className="text-white font-light">Manage Consciousness Reviews</p>
                    <p className="text-white/60 text-sm font-light">Reply to soul experiences</p>
                </Link>

                <Link
                    href="/admin/messages"
                    className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-400/30 rounded-lg p-4 text-center hover:from-blue-600/30 hover:to-purple-600/30 transition-all group hover:shadow-lg hover:shadow-blue-500/25"
                >
                    <div className="text-blue-300 mb-2 group-hover:scale-110 transition-transform">
                        <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <p className="text-white font-light">View Cosmic Transmissions</p>
                    <p className="text-white/60 text-sm font-light">Check consciousness messages</p>
                </Link>
            </div>
        </motion.div>
    )
}

export default function AdminDashboard() {
    const { isAuthenticated, isLoading: authLoading } = useAdmin()
    const { data, isLoading, error } = useDashboard()
    const router = useRouter()

    useEffect(() => {
        if (!authLoading && !isAuthenticated) {
            router.push('/admin/login')
        }
    }, [isAuthenticated, authLoading, router])

    if (authLoading || !isAuthenticated) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white"></div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
                <AdminNav />
                <div className="flex items-center justify-center h-96">
                    <div className="text-center">
                        <p className="text-red-400 text-lg">Error loading dashboard</p>
                        <p className="text-gray-500 mt-2">{error}</p>
                    </div>
                </div>
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
                    <h2 className="text-3xl font-bold text-white mb-2">Dashboard Overview</h2>
                    <p className="text-gray-400">Manage your website content and interactions</p>
                </motion.div>

                {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-6 animate-pulse">
                                <div className="h-16 bg-gray-700 rounded"></div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                            <StatsCard
                                title="Homepage Visitors"
                                value={data?.visitors?.total || 0}
                                subtitle="Total visits"
                                color="cosmic"
                                icon={
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                }
                            />

                            <StatsCard
                                title="Total Messages"
                                value={data?.messages?.total || 0}
                                subtitle="All contact messages"
                                color="blue"
                                icon={
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                }
                            />

                            <StatsCard
                                title="Unread Messages"
                                value={data?.messages?.unread || 0}
                                subtitle="Need attention"
                                color="red"
                                icon={
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                    </svg>
                                }
                            />

                            <StatsCard
                                title="Total Reviews"
                                value={data?.reviews?.total || 0}
                                subtitle={`Avg: ${data?.reviews?.averageRating || 0}★`}
                                color="green"
                                icon={
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                    </svg>
                                }
                            />
                        </div>

                        <QuickActions />
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
