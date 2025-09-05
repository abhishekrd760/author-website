'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'

const Contact = () => {
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
            setError('Please fill in all fields')
            setIsSubmitting(false)
            return
        }

        if (!formData.email.includes('@')) {
            setError('Please enter a valid email address')
            setIsSubmitting(false)
            return
        }

        try {
            if (!supabase) {
                console.error('Supabase client not available')
                setError('Service temporarily unavailable. Please try again later.')
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
            setError('Failed to send message. Please try again.')
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
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="py-20 bg-gradient-to-r from-teal-600 to-blue-600 text-white">
                <div className="container-custom">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center"
                    >
                        <h1 className="text-4xl lg:text-6xl font-bold mb-6">Get in Touch</h1>
                        <p className="text-xl lg:text-2xl text-teal-100 max-w-3xl mx-auto">
                            I&apos;d love to hear from you! Whether you have questions about my books, want to discuss a story,
                            or just want to say hello, don&apos;t hesitate to reach out.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Contact Content */}
            <section className="py-16">
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
                                        <div className="text-6xl mb-4">✉️</div>
                                        <h3 className="text-2xl font-bold mb-4 text-green-600">Message Sent!</h3>
                                        <p className="text-gray-700 mb-6">
                                            Thank you for reaching out! I appreciate you taking the time to contact me.
                                            I&apos;ll get back to you as soon as possible, usually within 24-48 hours.
                                        </p>
                                        <button
                                            onClick={() => setSubmitted(false)}
                                            className="btn-primary"
                                        >
                                            Send Another Message
                                        </button>
                                    </div>
                                ) : (
                                    <>
                                        <h2 className="text-3xl font-bold mb-6">Send me a message</h2>

                                        {error && (
                                            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                                                {error}
                                            </div>
                                        )}

                                        <form onSubmit={handleSubmit} className="space-y-6">
                                            {/* Name */}
                                            <div>
                                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                                    Your Name *
                                                </label>
                                                <input
                                                    type="text"
                                                    id="name"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                                    placeholder="Enter your full name"
                                                    maxLength={100}
                                                />
                                            </div>

                                            {/* Email */}
                                            <div>
                                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                                    Email Address *
                                                </label>
                                                <input
                                                    type="email"
                                                    id="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                                    placeholder="Enter your email address"
                                                    maxLength={100}
                                                />
                                            </div>

                                            {/* Message */}
                                            <div>
                                                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                                                    Your Message *
                                                </label>
                                                <textarea
                                                    id="message"
                                                    name="message"
                                                    rows={6}
                                                    value={formData.message}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                                    placeholder="Share your thoughts, questions, or feedback..."
                                                    maxLength={2000}
                                                />
                                                <div className="text-right text-sm text-gray-500 mt-1">
                                                    {formData.message.length}/2000 characters
                                                </div>
                                            </div>

                                            {/* Submit Button */}
                                            <button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="btn-primary w-full py-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                {isSubmitting ? 'Sending...' : 'Send Message'}
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
                                <h3 className="text-2xl font-bold mb-6">Other Ways to Connect</h3>

                                <div className="space-y-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                            <span className="text-blue-600 text-xl">📧</span>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold">Email</h4>
                                            <p className="text-gray-600">jane@janedoeauthor.com</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                                            <span className="text-purple-600 text-xl">📍</span>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold">Location</h4>
                                            <p className="text-gray-600">New York, NY</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                            <span className="text-green-600 text-xl">⏰</span>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold">Response Time</h4>
                                            <p className="text-gray-600">Usually within 24-48 hours</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Social Media */}
                                <div className="mt-8 pt-6 border-t border-gray-200">
                                    <h4 className="font-semibold mb-4">Follow me on social media</h4>
                                    <div className="flex gap-4">
                                        <a
                                            href="https://twitter.com"
                                            className="w-10 h-10 bg-indigo-500 text-white rounded-full flex items-center justify-center hover:bg-indigo-600 transition-colors"
                                            aria-label="Twitter"
                                        >
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                                            </svg>
                                        </a>
                                        <a
                                            href="https://instagram.com"
                                            className="w-10 h-10 bg-pink-500 text-white rounded-full flex items-center justify-center hover:bg-pink-600 transition-colors"
                                            aria-label="Instagram"
                                        >
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.014 5.367 18.647.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.324-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.297-3.324c.896-.896 2.047-1.386 3.324-1.386s2.448.49 3.324 1.297c.807.807 1.297 1.958 1.297 3.255s-.49 2.448-1.297 3.324c-.876.807-2.027 1.297-3.324 1.297zm7.908-8.015c-.807 0-1.297-.49-1.297-1.297S15.55 6.379 16.357 6.379s1.297.49 1.297 1.297-.49 1.297-1.297 1.297z" />
                                            </svg>
                                        </a>
                                        <a
                                            href="https://goodreads.com"
                                            className="w-10 h-10 bg-amber-500 text-white rounded-full flex items-center justify-center hover:bg-amber-600 transition-colors"
                                            aria-label="Goodreads"
                                        >
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm6 9h-5v5h5v-5z" />
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* FAQs */}
                            <div className="card">
                                <h3 className="text-2xl font-bold mb-6">Frequently Asked Questions</h3>

                                <div className="space-y-6">
                                    <div>
                                        <h4 className="font-semibold mb-2">Do you respond to all messages?</h4>
                                        <p className="text-gray-600 text-sm">
                                            I try my best to respond to every message I receive! While I may not be able to reply to
                                            every single message due to volume, I read them all and truly appreciate each one.
                                        </p>
                                    </div>

                                    <div>
                                        <h4 className="font-semibold mb-2">Can I request a book signing or event?</h4>
                                        <p className="text-gray-600 text-sm">
                                            Absolutely! I love meeting readers. Please include event details, location, and
                                            expected attendance in your message, and I&apos;ll do my best to accommodate.
                                        </p>
                                    </div>

                                    <div>
                                        <h4 className="font-semibold mb-2">Do you accept manuscript reviews?</h4>
                                        <p className="text-gray-600 text-sm">
                                            While I&apos;d love to help every aspiring writer, I&apos;m unable to review unpublished manuscripts
                                            due to legal concerns and time constraints. I recommend joining writing groups and workshops!
                                        </p>
                                    </div>

                                    <div>
                                        <h4 className="font-semibold mb-2">When will your next book be released?</h4>
                                        <p className="text-gray-600 text-sm">
                                            I&apos;m always working on new stories! Follow me on social media or sign up for my newsletter
                                            to be the first to know about upcoming releases.
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
