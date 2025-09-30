'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAdmin } from '@/lib/admin-context'
import { motion } from 'framer-motion'
import StarryBackground from '@/components/StarryBackground'

export default function AdminLogin() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const { login, isAuthenticated } = useAdmin()
    const router = useRouter()

    useEffect(() => {
        if (isAuthenticated) {
            router.push('/admin/dashboard')
        }
    }, [isAuthenticated, router])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setIsLoading(true)

        try {
            const result = await login(username, password)

            if (result.success) {
                router.push('/admin/dashboard')
            } else {
                setError(result.error || 'Login failed')
            }
        } catch (_err) {
            setError('An unexpected error occurred')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen relative flex items-center justify-center p-4">
            {/* Starry Background */}
            <div className="fixed inset-0" style={{ zIndex: 1 }}>
                <StarryBackground />
            </div>

            {/* Overlay to ensure content is readable */}
            <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-slate-900/20 to-black/20" style={{ zIndex: 2 }}></div>
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="card w-full max-w-md relative z-10"
            >
                <div className="text-center mb-8">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-3xl font-extralight text-white mb-2 tracking-wide"
                    >
                        Cosmic <span className="text-cosmic">Access</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-white/60 font-light"
                    >
                        Enter the quantum realm
                    </motion.p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className="w-full px-4 py-3 bg-white/5 border border-blue-400/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 transition-all backdrop-blur-sm"
                            placeholder="Enter your username"
                        />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 }}
                    >
                        <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-4 py-3 bg-white/5 border border-blue-400/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 transition-all backdrop-blur-sm"
                            placeholder="Enter your password"
                        />
                    </motion.div>

                    {error && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-red-500/10 border border-red-500/30 rounded-lg p-4"
                        >
                            <p className="text-red-400 text-sm">{error}</p>
                        </motion.div>
                    )}

                    <motion.button
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        type="submit"
                        disabled={isLoading}
                        className="w-full btn-primary disabled:from-gray-600 disabled:to-gray-600 disabled:scale-100 disabled:cursor-not-allowed font-light"
                    >
                        {isLoading ? (
                            <div className="flex items-center justify-center">
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                Signing in...
                            </div>
                        ) : (
                            'Sign In'
                        )}
                    </motion.button>
                </form>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="mt-8 text-center"
                >
                    <p className="text-white/50 text-sm font-light">
                        Quantum consciousness access only
                    </p>
                </motion.div>
            </motion.div>

            {/* Background decoration - subtle enhancement */}
            <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
                <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-blue-500/5 to-blue-500/5 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-blue-500/5 to-blue-500/5 rounded-full blur-3xl"></div>
            </div>
        </div>
    )
}
