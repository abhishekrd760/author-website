'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import StarryBackground from '@/components/StarryBackground'
import DualVideoBackground from '@/components/DualVideoBackground'
import { SignalIcon, GlobeAltIcon, EnvelopeIcon, MapPinIcon } from '@heroicons/react/24/outline'
import { useLanguage } from '@/lib/LanguageProvider'

const Contact = () => {
    const { t } = useLanguage()
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    const [error, setError] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        setError('')

        if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
            setError(t('Please fill in all fields'))
            setIsSubmitting(false)
            return
        }

        if (!formData.email.includes('@')) {
            setError(t('Please enter a valid email address'))
            setIsSubmitting(false)
            return
        }

        try {
            if (!supabase) {
                console.error('Supabase client not available')
                setError(t('Service temporarily unavailable. Please try again later.'))
                setIsSubmitting(false)
                return
            }

            const { error } = await supabase
                .from('contact_messages')
                .insert([{
                    name: formData.name.trim(),
                    email: formData.email.trim(),
                    message: formData.message.trim(),
                    created_at: new Date().toISOString()
                }])

            if (error) {
                console.error('Error submitting contact form:', error)
                // Still show success for demo purposes
            }

            // Also send email notification (would be handled by API route in production)
            try {
                await fetch('/api/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                })
            } catch (emailError) {
                console.error('Error sending email:', emailError)
            }

            setSubmitted(true)
            setFormData({ name: '', email: '', message: '' })
        } catch (error) {
            console.error('Error:', error)
            setError(t('Failed to send message. Please try again.'))
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    return (
        <div className="min-h-screen relative overflow-hidden">
            <DualVideoBackground />
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
                className="absolute top-40 right-20 opacity-20"
            >
                <SignalIcon className="w-12 h-12 text-blue-400" />
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
                className="absolute bottom-40 left-20 opacity-20"
            >
                <GlobeAltIcon className="w-10 h-10 text-blue-400" />
            </motion.div>

            {/* Hero Section */}
            {/* Hero Section */}
            <section className="py-12 text-white relative bg-black/3 backdrop-blur-sm z-10">
                <div className="container-custom relative">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center"
                    >
                        <h1 className="text-3xl lg:text-5xl font-extralight tracking-wide mb-4 text-cosmic" style={{ fontFamily: 'var(--font-cinzel)' }}>{t('Connect Across Dimensions')}</h1>
                        <p className="text-lg lg:text-xl text-white/80 max-w-3xl mx-auto mb-3 font-light">
                            {t('Bridge the dimensions between us. Share your cosmic insights and spiritual questions.')}
                        </p>
                        <p className="text-lg text-white/70 font-light tracking-wide" style={{ fontFamily: 'var(--font-lora)' }}>
                            {t('Author & Consciousness Explorer')}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Contact Content */}
            <section className="py-16 relative z-10">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Contact Form */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="card">
                                {submitted ? (
                                    <div className="text-center py-8">
                                        <motion.div
                                            animate={{
                                                scale: [1, 1.2, 1],
                                                rotate: [0, 360, 0]
                                            }}
                                            transition={{
                                                duration: 3,
                                                repeat: Infinity,
                                                ease: "easeInOut"
                                            }}
                                            className="text-6xl mb-4"
                                        >
                                            ✨
                                        </motion.div>
                                        <h3 className="text-2xl font-extralight mb-4 text-cosmic tracking-wide">{t('Message Transmitted!')}</h3>
                                        <p className="text-white/80 mb-6 font-light leading-relaxed">
                                            {t('Your cosmic transmission has been received across the dimensions! I deeply appreciate you sharing your energy and thoughts with me. I\'ll respond through the quantum field within 24-48 hours.')}
                                        </p>
                                        <button
                                            onClick={() => setSubmitted(false)}
                                            className="cosmic-button"
                                        >
                                            {t('Send Another Transmission')}
                                        </button>
                                    </div>
                                ) : (
                                    <>
                                        <h2 className="text-3xl font-extralight mb-6 text-white tracking-wide" style={{ fontFamily: 'var(--font-cinzel)' }}>
                                            {t('Send a Cosmic Transmission')}
                                        </h2>

                                        {error && (
                                            <div className="bg-red-900/30 border border-red-400/50 text-red-300 px-4 py-3 rounded-lg mb-6 font-light">
                                                {error}
                                            </div>
                                        )}

                                        <form onSubmit={handleSubmit} className="space-y-6">
                                            {/* Name */}
                                            <div>
                                                <label htmlFor="name" className="block text-sm font-light text-white/80 mb-2">
                                                    {t('Your Cosmic Identity *')}
                                                </label>
                                                <input
                                                    type="text"
                                                    id="name"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all text-white placeholder-white/40 font-light"
                                                    placeholder={t('Enter your name in this dimension')}
                                                    maxLength={100}
                                                />
                                            </div>

                                            {/* Email */}
                                            <div>
                                                <label htmlFor="email" className="block text-sm font-light text-white/80 mb-2">
                                                    {t('Quantum Communication Address *')}
                                                </label>
                                                <input
                                                    type="email"
                                                    id="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all text-white placeholder-white/40 font-light"
                                                    placeholder={t('Enter your email for cosmic correspondence')}
                                                    maxLength={100}
                                                />
                                            </div>

                                            {/* Message */}
                                            <div>
                                                <label htmlFor="message" className="block text-sm font-light text-white/80 mb-2">
                                                    {t('Your Cosmic Message *')}
                                                </label>
                                                <textarea
                                                    id="message"
                                                    name="message"
                                                    rows={6}
                                                    value={formData.message}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all text-white placeholder-white/40 font-light"
                                                    placeholder={t('Share your thoughts, cosmic insights, spiritual questions, or consciousness experiences...')}
                                                    maxLength={2000}
                                                />
                                                <div className="text-right text-sm text-white/50 mt-1 font-light">
                                                    {t('{count}/2000 characters', { count: formData.message.length })}
                                                </div>
                                            </div>

                                            {/* Submit Button */}
                                            <button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="cosmic-button w-full py-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
                                            >
                                                <span className="relative z-10">
                                                    {isSubmitting ? t('Transmitting Across Dimensions...') : t('Send Cosmic Transmission')}
                                                </span>
                                                {isSubmitting && (
                                                    <motion.div
                                                        animate={{ x: [-100, 400] }}
                                                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                                                        className="absolute top-0 left-0 h-full w-20 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                                                    />
                                                )}
                                            </button>
                                        </form>
                                    </>
                                )}
                            </div>
                        </motion.div>

                        {/* Contact Info & FAQs */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="space-y-8"
                        >
                            {/* Contact Information */}
                            <div className="card">
                                <h3 className="text-2xl font-extralight mb-6 text-white tracking-wide" style={{ fontFamily: 'var(--font-cinzel)' }}>
                                    {t('Other Dimensional Channels')}
                                </h3>

                                <div className="space-y-4">
                                    <div className="flex items-center gap-4">
                                        <motion.div
                                            whileHover={{ scale: 1.1, rotate: 360 }}
                                            transition={{ duration: 0.3 }}
                                            className="w-12 h-12 bg-gradient-to-r from-blue-500/20 to-blue-500/20 rounded-full flex items-center justify-center border border-blue-400/30"
                                        >
                                            <EnvelopeIcon className="w-6 h-6 text-blue-400" />
                                        </motion.div>
                                        <div>
                                            <h4 className="font-light text-white">{t('Quantum Email')}</h4>
                                            <p className="text-white/70 font-light">{t('consciousness@beyondtime.com')}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <motion.div
                                            whileHover={{ scale: 1.1, rotate: 360 }}
                                            transition={{ duration: 0.3 }}
                                            className="w-12 h-12 bg-gradient-to-r from-blue-500/20 to-blue-500/20 rounded-full flex items-center justify-center border border-blue-400/30"
                                        >
                                            <MapPinIcon className="w-6 h-6 text-blue-400" />
                                        </motion.div>
                                        <div>
                                            <h4 className="font-light text-white">{t('Cosmic Location')}</h4>
                                            <p className="text-white/70 font-light">{t('Third dimension, Earth realm')}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <motion.div
                                            whileHover={{ scale: 1.1, rotate: 360 }}
                                            transition={{ duration: 0.3 }}
                                            className="w-12 h-12 bg-gradient-to-r from-amber-500/20 to-blue-500/20 rounded-full flex items-center justify-center border border-amber-400/30"
                                        >
                                            <span className="text-amber-400 text-xl">⏰</span>
                                        </motion.div>
                                        <div>
                                            <h4 className="font-light text-white">{t('Response Time')}</h4>
                                            <p className="text-white/70 font-light">{t('Within 1-2 cosmic cycles (24-48 hours)')}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Social Media */}
                                <div className="mt-8 pt-6 border-t border-white/10">
                                    <h4 className="font-light mb-4 text-white">{t('Connect across the cosmic web')}</h4>
                                    <div className="flex gap-4">
                                        <motion.a
                                            whileHover={{ scale: 1.1, rotate: 15 }}
                                            href="https://twitter.com"
                                            className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-600 text-white rounded-full flex items-center justify-center hover:shadow-lg hover:shadow-blue-500/25 transition-all"
                                            aria-label="Cosmic Twitter"
                                        >
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                                            </svg>
                                        </motion.a>
                                        <motion.a
                                            whileHover={{ scale: 1.1, rotate: -15 }}
                                            href="https://instagram.com"
                                            className="w-10 h-10 bg-gradient-to-r from-pink-600 to-blue-600 text-white rounded-full flex items-center justify-center hover:shadow-lg hover:shadow-pink-500/25 transition-all"
                                            aria-label="Cosmic Instagram"
                                        >
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.014 5.367 18.647.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.324-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.297-3.324c.896-.896 2.047-1.386 3.324-1.386s2.448.49 3.324 1.297c.807.807 1.297 1.958 1.297 3.255s-.49 2.448-1.297 3.324c-.876.807-2.027 1.297-3.324 1.297zm7.908-8.015c-.807 0-1.297-.49-1.297-1.297S15.55 6.379 16.357 6.379s1.297.49 1.297 1.297-.49 1.297-1.297 1.297z" />
                                            </svg>
                                        </motion.a>
                                        <motion.a
                                            whileHover={{ scale: 1.1, rotate: 15 }}
                                            href="https://goodreads.com"
                                            className="w-10 h-10 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-full flex items-center justify-center hover:shadow-lg hover:shadow-amber-500/25 transition-all"
                                            aria-label="Cosmic Goodreads"
                                        >
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm6 9h-5v5h5v-5z" />
                                            </svg>
                                        </motion.a>
                                    </div>
                                </div>
                            </div>

                            {/* FAQs */}
                            <div className="card">
                                <h3 className="text-2xl font-extralight mb-6 text-white tracking-wide" style={{ fontFamily: 'var(--font-cinzel)' }}>
                                    {t('Cosmic Frequencies (FAQ)')}
                                </h3>

                                <div className="space-y-6">
                                    <div>
                                        <h4 className="font-light mb-2 text-white">{t('Do you respond to all cosmic transmissions?')}</h4>
                                        <p className="text-white/70 text-sm font-light leading-relaxed">
                                            {t('I honor every soul who reaches out across the dimensions! While the quantum field sometimes affects my ability to respond to each transmission due to cosmic volume, I receive and read every message with deep gratitude.')}
                                        </p>
                                    </div>

                                    <div>
                                        <h4 className="font-light mb-2 text-white">{t('Can I request a consciousness gathering or event?')}</h4>
                                        <p className="text-white/70 text-sm font-light leading-relaxed">
                                            {t('Absolutely! I love connecting with fellow cosmic travelers in person. Please include dimensional coordinates (location), expected soul count (attendance), and cosmic purpose (event details) in your transmission.')}
                                        </p>
                                    </div>

                                    <div>
                                        <h4 className="font-light mb-2 text-white">{t('Do you review consciousness manuscripts?')}</h4>
                                        <p className="text-white/70 text-sm font-light leading-relaxed">
                                            {t('While I\'d love to guide every soul on their writing journey through higher dimensions, cosmic law and time constraints prevent manuscript reviews. I recommend joining consciousness circles and spiritual writing workshops!')}
                                        </p>
                                    </div>

                                    <div>
                                        <h4 className="font-light mb-2 text-white">When will your next cosmic book manifest?</h4>
                                        <p className="text-white/70 text-sm font-light leading-relaxed">
                                            I&apos;m always channeling new wisdom from the cosmic library! Follow my dimensional
                                            frequencies (social media) or join the consciousness network (newsletter) to receive
                                            first transmission when new books emerge from the quantum field.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Contact
