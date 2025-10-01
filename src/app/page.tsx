'use client'

import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import { useEffect, useRef } from 'react'
import GlowingDust from '@/components/GlowingDust'
import NebulaClouds from '@/components/NebulaClouds'
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
  // Refs for animation triggers
  const authorRef = useRef(null)
  const booksRef = useRef(null)
  const connectRef = useRef(null)

  // Animation triggers
  const authorInView = useInView(authorRef, { once: true, amount: 0.3 })
  const booksInView = useInView(booksRef, { once: true, amount: 0.3 })
  const connectInView = useInView(connectRef, { once: true, amount: 0.3 })

  // Track visitor when component mounts
  useEffect(() => {
    trackVisitor()
  }, [])

  return (
    <div className="relative" style={{
      minHeight: '100vh'
    }}>
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="fixed top-0 left-0 w-full h-full object-cover"
        style={{
          zIndex: 1,
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover'
        }}
      >
        <source src="/spacebkg.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Dark overlay to ensure text readability */}
      <div
        className="fixed top-0 left-0 w-full h-full"
        style={{
          zIndex: 2,
          background: 'rgba(0, 0, 0, 0.3)',
          pointerEvents: 'none'
        }}
      ></div>

      {/* Nebula Clouds - positioned above video but behind dust */}
      <div style={{ zIndex: 3 }}>
        <NebulaClouds />
      </div>

      {/* Glowing Dust Particles - positioned behind text but above video */}
      <div style={{ zIndex: 5 }}>
        <GlowingDust />
      </div>

      {/* Full-screen Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden -mt-2 md:-mt-0.1 lg:-mt-0.1" style={{ zIndex: 10 }}>
        <div className="container-custom text-center relative" style={{ zIndex: 20 }}>
          {/* Yoshida Universe Theory subtitle */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-white/80 mb-6 relative z-10"
            style={{
              fontFamily: 'var(--font-lora)',
              fontSize: 'clamp(1.25rem, 2.5vw, 2rem)',
              fontWeight: 400,
              letterSpacing: '0.02em',
              fontStyle: 'italic',
              position: 'relative',
              top: '-4rem',
              pointerEvents: 'none'
            }}
          >
            Yoshida Universe Theory
          </motion.h2>

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
              top: '-4rem',
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
          className="absolute flex flex-col sm:flex-row gap-6 justify-center items-center w-full"
          style={{
            top: 'calc(50vh + 12rem)',
            left: 0,
            zIndex: 30,
            pointerEvents: 'auto'
          }}
        >
          <Link
            href="/books"
            className="bg-gradient-to-r from-blue-600 to-blue-600 text-white rounded-full font-medium text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25 cursor-pointer inline-flex items-center justify-center no-underline h-[56px] w-[220px]"
            style={{
              pointerEvents: 'all',
              cursor: 'pointer',
              textDecoration: 'none'
            }}
          >
            Explore Books
          </Link>
          <a
            href="/about"
            className="border-2 border-white/40 bg-white/5 text-white rounded-full font-medium text-lg transition-all duration-300 hover:scale-105 hover:bg-white/10 hover:border-white/60 cursor-pointer inline-flex items-center justify-center no-underline h-[56px] w-[220px]"
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
          style={{ zIndex: 25 }}
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
          zIndex: 25,
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
      <section className="relative py-32 px-6 bg-slate-900/60" style={{ zIndex: 15 }}>
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
              className="text-4xl md:text-5xl lg:text-6xl mb-6 text-white"
              style={{
                fontFamily: 'var(--font-cinzel)',
                fontWeight: 600
              }}
            >
              Cosmic Impact
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#1F6FEB] to-[#6C63FF] mx-auto rounded-full"></div>
          </motion.div>

          {/* Navigation Tiles */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Author Tile */}
            <motion.div
              ref={authorRef}
              initial={{ opacity: 0, y: 50, scale: 0.8, rotateY: -15 }}
              animate={authorInView ? { opacity: 1, y: 0, scale: 1, rotateY: 0 } : { opacity: 0, y: 50, scale: 0.8, rotateY: -15 }}
              transition={{
                duration: 0.8,
                delay: 0.1,
                type: "spring",
                stiffness: 100,
                damping: 15
              }}
              className="relative group"
            >
              <Link href="/about" className="block">
                <div className="backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center transition-all duration-500 hover:scale-105 hover:border-[#1F6FEB]/30 hover:shadow-2xl hover:shadow-[#1F6FEB]/20 cursor-pointer">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#1F6FEB]/5 to-[#6C63FF]/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10">
                    <div className="text-5xl mb-4">�</div>
                    <div
                      className="text-2xl md:text-3xl font-bold mb-4 text-white"
                      style={{ fontFamily: 'var(--font-cinzel)' }}
                    >
                      The Author
                    </div>
                    <div
                      className="text-lg text-[#C5C6C7] mb-4"
                      style={{ fontFamily: 'var(--font-lora)' }}
                    >
                      Discover the visionary mind behind the cosmic tales
                    </div>
                    <div className="text-[#1F6FEB] font-semibold text-lg hover:text-[#6C63FF] transition-colors duration-300">
                      Learn more →
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Books Tile */}
            <motion.div
              ref={booksRef}
              initial={{ opacity: 0, y: 50, scale: 0.8, rotateY: 15 }}
              animate={booksInView ? { opacity: 1, y: 0, scale: 1, rotateY: 0 } : { opacity: 0, y: 50, scale: 0.8, rotateY: 15 }}
              transition={{
                duration: 0.8,
                delay: 0.3,
                type: "spring",
                stiffness: 100,
                damping: 15
              }}
              className="relative group"
            >
              <Link href="/books" className="block">
                <div className="backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center transition-all duration-500 hover:scale-105 hover:border-[#1F6FEB]/30 hover:shadow-2xl hover:shadow-[#1F6FEB]/20 cursor-pointer">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#1F6FEB]/5 to-[#6C63FF]/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10">
                    <div className="text-5xl mb-4">📚</div>
                    <div
                      className="text-2xl md:text-3xl font-bold mb-4 text-white"
                      style={{ fontFamily: 'var(--font-cinzel)' }}
                    >
                      The Books
                    </div>
                    <div
                      className="text-lg text-[#C5C6C7] mb-4"
                      style={{ fontFamily: 'var(--font-lora)' }}
                    >
                      Journey through captivating stories of space and time
                    </div>
                    <div className="text-[#1F6FEB] font-semibold text-lg hover:text-[#6C63FF] transition-colors duration-300">
                      Read more →
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Connect Tile */}
            <motion.div
              ref={connectRef}
              initial={{ opacity: 0, y: 50, scale: 0.8, rotateX: -10 }}
              animate={connectInView ? { opacity: 1, y: 0, scale: 1, rotateX: 0 } : { opacity: 0, y: 50, scale: 0.8, rotateX: -10 }}
              transition={{
                duration: 0.8,
                delay: 0.5,
                type: "spring",
                stiffness: 100,
                damping: 15
              }}
              className="relative group"
            >
              <Link href="/contact" className="block">
                <div className="backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center transition-all duration-500 hover:scale-105 hover:border-[#1F6FEB]/30 hover:shadow-2xl hover:shadow-[#1F6FEB]/20 cursor-pointer">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#1F6FEB]/5 to-[#6C63FF]/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10">
                    <div className="text-5xl mb-4">✉️</div>
                    <div
                      className="text-2xl md:text-3xl font-bold mb-4 text-white"
                      style={{ fontFamily: 'var(--font-cinzel)' }}
                    >
                      Connect
                    </div>
                    <div
                      className="text-lg text-[#C5C6C7] mb-4"
                      style={{ fontFamily: 'var(--font-lora)' }}
                    >
                      Join the conversation and share your cosmic thoughts
                    </div>
                    <div className="text-[#1F6FEB] font-semibold text-lg hover:text-[#6C63FF] transition-colors duration-300">
                      Get in touch →
                    </div>
                  </div>
                </div>
              </Link>
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
                className="text-2xl md:text-3xl lg:text-4xl text-[#F4F4F4] italic leading-relaxed mb-8"
                style={{ fontFamily: 'var(--font-lora)' }}
              >
                &ldquo;In the vastness of space and time, every story matters, every journey transforms, and every reader becomes part of the infinite cosmic dance.&rdquo;
              </blockquote>
              <div className="flex items-center justify-center space-x-4">
                <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-[#1F6FEB]"></div>
                <div className="w-2 h-2 bg-[#1F6FEB] rounded-full"></div>
                <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-[#1F6FEB]"></div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}