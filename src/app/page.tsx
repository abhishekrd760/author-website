'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import SpaceBackground from '@/components/SpaceBackground'
import { ChevronDownIcon } from '@heroicons/react/24/outline'

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

export default function Home() {
  const router = useRouter()

  // Track visitor when component mounts
  useEffect(() => {
    trackVisitor()
  }, [])

  return (
    <div className="relative" style={{
      background: 'linear-gradient(to bottom, #1a0a2a 0%, #0a0010 25%, #000000 50%, #000000 75%, #000000 100%)',
      minHeight: '100vh'
    }}>
      {/* Three.js Space Background */}
      <SpaceBackground />

      {/* Full-screen Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden -mt-2 md:-mt-0.1 lg:-mt-0.1">
        <div className="container-custom text-center relative z-20">
          {/* Main Header with Rainbow Animation - behind sun */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="rainbow-text-slow mb-12 relative z-10"
            style={{
              fontFamily: 'var(--font-cinzel)',
              fontSize: 'clamp(2rem, 4vw, 6rem)',
              fontWeight: 500,
              letterSpacing: '0.02em',
              lineHeight: 1.1,
              position: 'relative',
              top: '-6rem',
              pointerEvents: 'none'
            }}
          >
            Beyond Time and Space
          </motion.h1>

          {/* Call to Action Buttons */}
        </div>

        {/* Call to Action Buttons - Positioned absolutely in front of everything */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute flex flex-col sm:flex-row gap-6 justify-center items-center"
          style={{
            left: '40%',
            top: 'calc(50vh + 12rem)',
            transform: 'translateX(-50%)',
            zIndex: 999999,
            pointerEvents: 'auto'
          }}
        >
          <a
            href="/books"
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full font-medium text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 cursor-pointer inline-block no-underline"
            style={{
              pointerEvents: 'all',
              cursor: 'pointer',
              textDecoration: 'none'
            }}
          >
            Explore Books
          </a>
          <a
            href="/about"
            className="px-8 py-4 border-2 border-white/30 text-white rounded-full font-medium text-lg transition-all duration-300 hover:scale-105 hover:bg-white/10 bg-transparent cursor-pointer inline-block no-underline"
            style={{
              pointerEvents: 'all',
              cursor: 'pointer',
              textDecoration: 'none'
            }}
          >
            About the Author
          </a>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDownIcon className="w-8 h-8 text-white/60" />
        </motion.div>
      </section>

      {/* Subtitle positioned in front of sun */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute w-full flex justify-center"
        style={{
          pointerEvents: 'none',
          zIndex: 50,
          top: 'calc(50vh + 2rem)',
          left: 0
        }}
      >
        <p
          className="text-xl md:text-2xl lg:text-3xl text-center"
          style={{
            fontFamily: 'var(--font-lora)',
            color: '#F4F4F4',
            fontWeight: 400,
            letterSpacing: '0.01em'
          }}
        >
          An artistic journey through the universe.
        </p>
      </motion.div>

      {/* Stats Section */}
      <section className="relative py-32 px-6" style={{ backgroundColor: 'rgba(10, 10, 15, 0.9)' }}>
        <div className="max-w-7xl mx-auto">
          {/* Section Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2
              className="text-4xl md:text-5xl lg:text-6xl mb-6 text-transparent bg-clip-text"
              style={{
                fontFamily: 'var(--font-cinzel)',
                backgroundImage: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                fontWeight: 600
              }}
            >
              Cosmic Impact
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto rounded-full"></div>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Stat 1: Books Published */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="bg-gradient-to-br from-purple-600/20 to-blue-600/20 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center transition-all duration-500 hover:scale-105 hover:border-purple-400/30 hover:shadow-2xl hover:shadow-purple-500/20">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-blue-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="text-5xl mb-4">📚</div>
                  <div
                    className="text-4xl md:text-5xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400"
                    style={{ fontFamily: 'var(--font-cinzel)' }}
                  >
                    7
                  </div>
                  <div
                    className="text-lg text-gray-300"
                    style={{ fontFamily: 'var(--font-lora)' }}
                  >
                    Books Published
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Stat 2: Lives Touched */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="bg-gradient-to-br from-indigo-600/20 to-purple-600/20 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center transition-all duration-500 hover:scale-105 hover:border-indigo-400/30 hover:shadow-2xl hover:shadow-indigo-500/20">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/5 to-purple-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="text-5xl mb-4">✨</div>
                  <div
                    className="text-4xl md:text-5xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400"
                    style={{ fontFamily: 'var(--font-cinzel)' }}
                  >
                    50K+
                  </div>
                  <div
                    className="text-lg text-gray-300"
                    style={{ fontFamily: 'var(--font-lora)' }}
                  >
                    Lives Touched
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Stat 3: Cosmic Journeys */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="bg-gradient-to-br from-blue-600/20 to-cyan-600/20 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center transition-all duration-500 hover:scale-105 hover:border-blue-400/30 hover:shadow-2xl hover:shadow-blue-500/20">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-cyan-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="text-5xl mb-4">🌌</div>
                  <div
                    className="text-4xl md:text-5xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400"
                    style={{ fontFamily: 'var(--font-cinzel)' }}
                  >
                    ∞
                  </div>
                  <div
                    className="text-lg text-gray-300"
                    style={{ fontFamily: 'var(--font-lora)' }}
                  >
                    Cosmic Journeys
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Stat 4: Years of Wisdom */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="bg-gradient-to-br from-violet-600/20 to-pink-600/20 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center transition-all duration-500 hover:scale-105 hover:border-violet-400/30 hover:shadow-2xl hover:shadow-violet-500/20">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-600/5 to-pink-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="text-5xl mb-4">⏳</div>
                  <div
                    className="text-4xl md:text-5xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-pink-400"
                    style={{ fontFamily: 'var(--font-cinzel)' }}
                  >
                    15+
                  </div>
                  <div
                    className="text-lg text-gray-300"
                    style={{ fontFamily: 'var(--font-lora)' }}
                  >
                    Years of Wisdom
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Inspirational Quote */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="mt-24 text-center"
          >
            <div className="max-w-4xl mx-auto">
              <blockquote
                className="text-2xl md:text-3xl lg:text-4xl text-gray-200 italic leading-relaxed mb-8"
                style={{ fontFamily: 'var(--font-lora)' }}
              >
                "In the vastness of space and time, every story matters, every journey transforms, and every reader becomes part of the infinite cosmic dance."
              </blockquote>
              <div className="flex items-center justify-center space-x-4">
                <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-purple-400"></div>
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-purple-400"></div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}