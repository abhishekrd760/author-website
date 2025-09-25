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
          className="fixed flex flex-col sm:flex-row gap-6 justify-center items-center"
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
    </div>
  )
}