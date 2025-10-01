'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const CallToAction = () => {
    return (
        <section className="py-16 bg-gradient-to-r from-gray-800 to-gray-900 text-white">
            <div className="container-custom text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto"
                >
                    <h2 className="text-3xl lg:text-5xl font-bold mb-6" style={{ fontFamily: 'var(--font-cinzel)' }}>
                        Ready to Embark on Your Next Literary Adventure?
                    </h2>

                    <p className="text-xl lg:text-2xl mb-8 text-gray-300">
                        Join thousands of readers who have discovered the magic within these pages.
                        Your next favorite book is just a click away.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            viewport={{ once: true }}
                            className="bg-white/10 backdrop-blur-sm rounded-lg p-6"
                        >
                            <div className="text-4xl mb-3">📚</div>
                            <h3 className="text-xl font-semibold mb-2" style={{ fontFamily: 'var(--font-cinzel)' }}>Explore Books</h3>
                            <p className="text-gray-300">
                                Browse through a collection of captivating stories across multiple genres
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            viewport={{ once: true }}
                            className="bg-white/10 backdrop-blur-sm rounded-lg p-6"
                        >
                            <div className="text-4xl mb-3">⭐</div>
                            <h3 className="text-xl font-semibold mb-2" style={{ fontFamily: 'var(--font-cinzel)' }}>Read Reviews</h3>
                            <p className="text-gray-300">
                                See what other readers are saying and share your own thoughts
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                            viewport={{ once: true }}
                            className="bg-white/10 backdrop-blur-sm rounded-lg p-6"
                        >
                            <div className="text-4xl mb-3">💌</div>
                            <h3 className="text-xl font-semibold mb-2" style={{ fontFamily: 'var(--font-cinzel)' }}>Connect</h3>
                            <p className="text-gray-300">
                                Get in touch with the author and be part of the literary community
                            </p>
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                        viewport={{ once: true }}
                        className="flex flex-col sm:flex-row gap-4 justify-center"
                    >
                        <Link
                            href="/books"
                            className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-4 px-8 rounded-lg transition-colors duration-200 inline-block"
                        >
                            Start Reading Now
                        </Link>
                        <Link
                            href="/about"
                            className="bg-transparent border-2 border-gray-500 hover:bg-gray-700 hover:border-gray-600 text-white font-bold py-4 px-8 rounded-lg transition-colors duration-200 inline-block"
                        >
                            Meet the Author
                        </Link>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    )
}

export default CallToAction
