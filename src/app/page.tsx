'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useEffect } from 'react'
import SpaceBackground from '@/components/SpaceBackground'

// Track homepage visit
const trackVisitor = async () => {
  try {
    await fetch('/api/visitors', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
  } catch (error) {
    console.error('Failed to track visitor:', error)
  }
}

const ChevronDownIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
)

const ArrowRightIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
)

export default function Home() {
  // Track visitor when component mounts
  useEffect(() => {
    trackVisitor()
  }, [])

  return (
    <div className="relative">
      {/* Three.js Space Background */}
      <SpaceBackground />

      {/* Full-screen Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden -mt-4 md:-mt-6 lg:-mt-8">
        <div className="container-custom text-center relative z-10">
          {/* Yoshida Universe Theory subtitle */}
          <motion.p
            className="text-xl md:text-2xl lg:text-3xl font-light text-white/70 mb-4 tracking-wide italic"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            Yoshida Universe Theory
          </motion.p>

          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-extralight tracking-widest mb-8 rainbow-text"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Beyond Time & Space
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl font-light text-white/80 max-w-4xl mx-auto mb-12 tracking-wide leading-relaxed mt-16 md:mt-20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
          >
            A journey through the infinite cosmos of consciousness where spirit meets science
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-24 md:mt-32"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.5 }}
          >
            <Link href="/books" className="btn-primary">
              Discover the Book
            </Link>
            <Link href="/about" className="btn-secondary">
              Meet the Author
            </Link>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDownIcon className="w-8 h-8 text-white/60" />
        </motion.div>
      </section>

      {/* Preview Cards Section */}
      <section className="py-20 relative z-10">
        <div className="container-custom">
          <motion.h2
            className="text-4xl md:text-5xl font-extralight tracking-wide text-center mb-16 text-white"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            Explore the Journey
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* About Card */}
            <motion.div
              className="card group cursor-pointer"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <Link href="/about" className="block">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full flex items-center justify-center">
                    <span className="text-2xl">🌟</span>
                  </div>
                  <h3 className="text-2xl font-light mb-4 text-white">The Author</h3>
                  <p className="text-white/70 mb-6 leading-relaxed">
                    Discover the mind behind the cosmic journey and the spiritual insights that shaped this transformative work.
                  </p>
                  <div className="flex items-center justify-center text-purple-300 group-hover:text-purple-200 transition-colors">
                    <span className="mr-2">Learn More</span>
                    <ArrowRightIcon className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Book Card */}
            <motion.div
              className="card group cursor-pointer"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              whileHover={{ scale: 1.05 }}
            >
              <Link href="/books" className="block">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center">
                    <span className="text-2xl">📚</span>
                  </div>
                  <h3 className="text-2xl font-light mb-4 text-white">The Book</h3>
                  <p className="text-white/70 mb-6 leading-relaxed">
                    Explore the revolutionary concepts that bridge ancient wisdom with modern consciousness research.
                  </p>
                  <div className="flex items-center justify-center text-purple-300 group-hover:text-purple-200 transition-colors">
                    <span className="mr-2">Read More</span>
                    <ArrowRightIcon className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Contact Card */}
            <motion.div
              className="card group cursor-pointer"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              whileHover={{ scale: 1.05 }}
            >
              <Link href="/contact" className="block">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full flex items-center justify-center">
                    <span className="text-2xl">💫</span>
                  </div>
                  <h3 className="text-2xl font-light mb-4 text-white">Connect</h3>
                  <p className="text-white/70 mb-6 leading-relaxed">
                    Join the conversation about consciousness, spirituality, and the infinite possibilities of human potential.
                  </p>
                  <div className="flex items-center justify-center text-purple-300 group-hover:text-purple-200 transition-colors">
                    <span className="mr-2">Get in Touch</span>
                    <ArrowRightIcon className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
