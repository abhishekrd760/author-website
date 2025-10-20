'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Book } from '@/types/database'
import Image from 'next/image'
import Link from 'next/link'
import StarryBackground from '@/components/StarryBackground'
import FractalPyramid from '@/components/FractalPyramid'
import DualVideoBackground from '@/components/DualVideoBackground'
import { api } from '@/lib/supabase'
import { useLanguage } from '@/lib/LanguageProvider'

// Function to generate cosmic book covers
const getRandomBookCover = (title: string, index: number) => {
    const colors = [
        { bg: '#0f1419', accent: '#3B82F6' }, // Deep space with blue
        { bg: '#1a0b2e', accent: '#10B981' }, // Dark blue with emerald
        { bg: '#1e3a8a', accent: '#F59E0B' }, // Cosmic blue with amber
        { bg: '#1e3a8a', accent: '#EC4899' }, // Deep blue with pink
        { bg: '#7c2d12', accent: '#06B6D4' }, // Cosmic red with cyan
        { bg: '#064e3b', accent: '#F97316' }  // Deep teal with orange
    ]

    const color = colors[index % colors.length]

    // Sanitize title to remove special characters that btoa can't handle
    const sanitizedTitle = (title || 'Untitled').replace(/[^\x00-\x7F]/g, '')
    const titleParts = sanitizedTitle.split(' ')
    const firstLine = titleParts.slice(0, 2).join(' ')
    const secondLine = titleParts.length > 2 ? titleParts.slice(2).join(' ') : ''

    const svgString = `<svg width="300" height="400" viewBox="0 0 300 400" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="300" height="400" fill="${color.bg}"/>
      <rect x="20" y="20" width="260" height="360" fill="none" stroke="${color.accent}" stroke-width="2" opacity="0.5"/>
      <rect x="40" y="40" width="220" height="2" fill="${color.accent}"/>
      <rect x="40" y="60" width="180" height="1" fill="${color.accent}" opacity="0.7"/>
      <text x="150" y="200" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="18" font-weight="bold">
        <tspan x="150" dy="0">${firstLine}</tspan>
        ${secondLine ? `<tspan x="150" dy="25">${secondLine}</tspan>` : ''}
      </text>
      <text x="150" y="250" text-anchor="middle" fill="${color.accent}" font-family="Arial, sans-serif" font-size="14">Kazutoshi Yoshida</text>
      <rect x="40" y="340" width="220" height="2" fill="${color.accent}"/>
    </svg>`

    try {
        return `data:image/svg+xml;base64,${btoa(svgString)}`
    } catch (error) {
        // Fallback to URL encoding if btoa fails
        return `data:image/svg+xml,${encodeURIComponent(svgString)}`
    }
}

const Books = () => {
    const [books, setBooks] = useState<Book[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const { t, language } = useLanguage()

    useEffect(() => {
        // Fetch books from Supabase
        const fetchBooks = async () => {
            try {
                setLoading(true)
                setError(null)
                const data = await api.getBooks()
                setBooks(data)
            } catch (err) {
                console.error('Error fetching books:', err)
                setError(t('Failed to load books. Please try again later.'))
            } finally {
                setLoading(false)
            }
        }

        fetchBooks()
    }, [t])

    const formatDate = (dateString: string) => {
        return new Intl.DateTimeFormat(language === 'ja' ? 'ja-JP' : 'en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }).format(new Date(dateString))
    }

    if (loading) {
        return (
            <div className="min-h-screen relative overflow-hidden">
                <DualVideoBackground />

                {/* Hero Section */}
                <section className="py-12 text-white relative bg-black/3 backdrop-blur-sm z-10">
                    <div className="container-custom relative">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="text-center"
                        >
                            <h1 className="text-3xl lg:text-5xl font-extralight tracking-wide mb-4 text-cosmic" style={{ fontFamily: 'var(--font-cinzel)' }}>{t('Cosmic Library')}</h1>
                            <p className="text-lg lg:text-xl text-white/80 max-w-3xl mx-auto mb-3 font-light">
                                {t('Discover books that transcend ordinary reality and awaken cosmic consciousness')}
                            </p>
                            <p className="text-lg text-white/70 font-light tracking-wide" style={{ fontFamily: 'var(--font-lora)' }}>
                                {t('Author & Consciousness Explorer')}
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Loading Books */}
                <section className="py-16 relative z-10">
                    <div className="container-custom">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                                <div key={i} className="card animate-pulse">
                                    <div className="aspect-[3/4] bg-white/5 rounded-lg mb-4"></div>
                                    <div className="h-6 bg-white/5 rounded mb-2"></div>
                                    <div className="h-4 bg-white/5 rounded mb-2"></div>
                                    <div className="h-4 bg-white/5 rounded mb-4 w-3/4"></div>
                                    <div className="flex gap-3">
                                        <div className="h-10 bg-white/5 rounded flex-1"></div>
                                        <div className="h-10 bg-white/5 rounded w-20"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-screen relative overflow-hidden">
                <DualVideoBackground />

                {/* Hero Section */}
                <section className="py-12 text-white relative bg-black/3 backdrop-blur-sm z-10">
                    <div className="container-custom relative">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="text-center"
                        >
                            <h1 className="text-3xl lg:text-5xl font-extralight tracking-wide mb-4 text-cosmic" style={{ fontFamily: 'var(--font-cinzel)' }}>{t('Cosmic Library')}</h1>
                            <p className="text-lg lg:text-xl text-white/80 max-w-3xl mx-auto mb-3 font-light">
                                {t('Discover books that transcend ordinary reality and awaken cosmic consciousness')}
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Error Message */}
                <section className="py-16 relative z-10">
                    <div className="container-custom">
                        <div className="text-center">
                            <p className="text-red-400 text-lg mb-4">{error}</p>
                            <button
                                onClick={() => window.location.reload()}
                                className="px-6 py-3 bg-cosmic hover:bg-cosmic-dark text-white rounded-lg transition-colors"
                            >
                                {t('Retry')}
                            </button>
                        </div>
                    </div>
                </section>
            </div>
        )
    }

    return (
        <div className="min-h-screen relative overflow-hidden">
            <DualVideoBackground />
            <StarryBackground />

            {/* Floating Cosmic Elements */}
            {/* Top Right Galaxy */}
            <motion.div
                className="absolute top-32 right-16 w-24 h-24 opacity-30"
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            >
                <svg viewBox="0 0 400 400" className="w-full h-full">
                    <defs>
                        <radialGradient id="floatingGalaxy1" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.8" />
                            <stop offset="60%" stopColor="#00bcd4" stopOpacity="0.4" />
                            <stop offset="100%" stopColor="#1e1b4b" stopOpacity="0.1" />
                        </radialGradient>
                    </defs>
                    <path
                        d="M200,200 Q210,190 220,200 Q210,210 200,200 Q190,210 180,200 Q190,190 200,200 
                           M200,200 Q220,180 240,200 Q220,220 200,200 Q180,220 160,200 Q180,180 200,200"
                        fill="none"
                        stroke="url(#floatingGalaxy1)"
                        strokeWidth="2"
                        opacity="0.6"
                    />
                    <ellipse cx="200" cy="200" rx="6" ry="3" fill="url(#floatingGalaxy1)" opacity="0.8" />
                </svg>
            </motion.div>

            {/* Bottom Left Star Field */}
            <motion.div
                className="absolute bottom-32 left-16 w-32 h-32 opacity-25"
                animate={{
                    y: [0, -15, 0],
                    scale: [1, 1.05, 1]
                }}
                transition={{
                    y: { duration: 8, repeat: Infinity, ease: "easeInOut" },
                    scale: { duration: 6, repeat: Infinity, ease: "easeInOut" }
                }}
            >
                <svg viewBox="0 0 100 100" className="w-full h-full">
                    <defs>
                        <radialGradient id="starField1" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
                            <stop offset="100%" stopColor="#00bcd4" stopOpacity="0.3" />
                        </radialGradient>
                    </defs>
                    {/* Multiple stars */}
                    <circle cx="20" cy="25" r="1.5" fill="url(#starField1)" opacity="0.8" />
                    <circle cx="45" cy="15" r="1" fill="url(#starField1)" opacity="0.6" />
                    <circle cx="70" cy="30" r="1.2" fill="url(#starField1)" opacity="0.7" />
                    <circle cx="80" cy="60" r="0.8" fill="url(#starField1)" opacity="0.5" />
                    <circle cx="35" cy="50" r="1.5" fill="url(#starField1)" opacity="0.9" />
                    <circle cx="15" cy="70" r="1" fill="url(#starField1)" opacity="0.6" />
                    <circle cx="60" cy="75" r="1.3" fill="url(#starField1)" opacity="0.8" />
                    <circle cx="50" cy="40" r="0.9" fill="url(#starField1)" opacity="0.5" />
                </svg>
            </motion.div>

            {/* Middle Right Small Galaxy */}
            <motion.div
                className="absolute top-1/2 right-8 w-20 h-20 opacity-20"
                animate={{
                    rotate: -360,
                    scale: [1, 1.1, 1]
                }}
                transition={{
                    rotate: { duration: 30, repeat: Infinity, ease: "linear" },
                    scale: { duration: 5, repeat: Infinity, ease: "easeInOut" }
                }}
            >
                <svg viewBox="0 0 400 400" className="w-full h-full">
                    <defs>
                        <radialGradient id="floatingGalaxy2" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor="#a855f7" stopOpacity="0.7" />
                            <stop offset="60%" stopColor="#6366f1" stopOpacity="0.3" />
                            <stop offset="100%" stopColor="#1e1b4b" stopOpacity="0.1" />
                        </radialGradient>
                    </defs>
                    <path
                        d="M200,200 Q205,195 210,200 Q205,205 200,200 Q195,205 190,200 Q195,195 200,200 
                           M200,200 Q212,188 224,200 Q212,212 200,200 Q188,212 176,200 Q188,188 200,200"
                        fill="none"
                        stroke="url(#floatingGalaxy2)"
                        strokeWidth="1.5"
                        opacity="0.5"
                    />
                    <ellipse cx="200" cy="200" rx="4" ry="2" fill="url(#floatingGalaxy2)" opacity="0.6" />
                </svg>
            </motion.div>

            {/* Hero Section */}
            <section className="py-12 text-white relative bg-black/3 backdrop-blur-sm z-10">
                <div className="container-custom relative">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center"
                    >
                        <h1 className="text-3xl lg:text-5xl font-extralight tracking-wide mb-4 text-cosmic" style={{ fontFamily: 'var(--font-cinzel)' }}>{t('Cosmic Library')}</h1>
                        <p className="text-lg lg:text-xl text-white/80 max-w-3xl mx-auto mb-3 font-light">
                            {t('Discover books that transcend ordinary reality and awaken cosmic consciousness')}
                        </p>
                        <p className="text-lg text-white/70 font-light tracking-wide" style={{ fontFamily: 'var(--font-lora)' }}>
                            {t('Author & Consciousness Explorer')}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Books Grid */}
            <section className="py-16 relative z-10">
                <div className="container-custom">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl lg:text-4xl font-extralight tracking-wide mb-4 text-white" style={{ fontFamily: 'var(--font-lora)' }}>
                            {t('The Consciousness Collection')}
                        </h2>
                        <p className="text-xl text-white/70 max-w-2xl mx-auto font-light" style={{ fontFamily: 'var(--font-lora)' }}>
                            {t('A transformative journey into the infinite realms of cosmic awareness')}
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {books.map((book, index) => (
                            <motion.div
                                key={book.id}
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                                className="card group hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300"
                            >
                                {/* Book Cover */}
                                <div className="aspect-[3/4] overflow-hidden rounded-lg mb-6 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative shadow-2xl">
                                    <Image
                                        src={
                                            book.id === 'e8b7329c-3f1e-431c-b861-5fc7286a4437'
                                                ? '/images/galactic federation to Japan.jpg'
                                                : book.id === 'cd59d181-8879-461c-9086-2cfcdc06271d'
                                                    ? '/images/ascension beauty.jpg'
                                                    : book.id === '30cda241-8a1e-4a08-b967-fe3a62271864'
                                                        ? '/images/Live in the ecstasy of awakening.jpg'
                                                        : book.id === '7a804c52-58fc-43fa-98ea-ab08b8f8f2ac'
                                                            ? '/images/Transcendent Parallel World.jpg'
                                                            : book.id === 'cf94b790-44fb-4b6c-ae75-56031ab648bb'
                                                                ? '/images/The Galactic Federation.jpg'
                                                                : book.cover_image_url || getRandomBookCover(book.title, index)
                                        }
                                        alt={book.title}
                                        width={400}
                                        height={533}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />                                    {/* Elegant border overlay */}
                                    <div className="absolute inset-0 border-2 border-white/10 rounded-lg pointer-events-none"></div>

                                    {/* Overlay with publication date */}
                                    <div className="absolute top-4 right-4 bg-gradient-to-br from-black/80 to-black/60 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-light shadow-lg border border-white/10">
                                        {new Date(book.publication_date).getFullYear()}
                                    </div>

                                    {/* Elegant cosmic glow overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                                    {/* Shine effect on hover */}
                                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                                </div>

                                {/* Book Info */}
                                <div className="space-y-4">
                                    <h3 className="text-xl font-light text-white group-hover:text-cosmic transition-colors tracking-wide" style={{ fontFamily: 'var(--font-lora)' }}>
                                        {book.title}
                                    </h3>

                                    <p className="text-blue-300/80 text-sm mb-2 font-light">
                                        {t('Published: {{date}}', { date: formatDate(book.publication_date) })}
                                    </p>

                                    <p className="text-white/70 line-clamp-4 font-light leading-relaxed">
                                        {book.description}
                                    </p>

                                    {/* Action Buttons */}
                                    <div className="flex gap-3 pt-4">
                                        <Link
                                            href={`/books/${book.id}`}
                                            className="cosmic-button-secondary flex-1 text-center"
                                        >
                                            {t('Explore Book')}
                                        </Link>
                                        <a
                                            href={book.buy_link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="cosmic-button-secondary flex-1 text-center"
                                        >
                                            {t('Purchase')}
                                        </a>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Cosmic Call to Action */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 1.5 }}
                        className="text-center mt-16 card relative overflow-hidden"
                    >
                        {/* Cosmic Pattern Overlay */}
                        <div className="absolute inset-0 opacity-10">
                            <div className="absolute inset-0" style={{
                                backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E")`,
                                backgroundSize: '40px 40px'
                            }}></div>
                        </div>

                        <div className="relative z-10">
                            {/* 3D Fractal Pyramid */}
                            <div className="mb-6">
                                <FractalPyramid />
                            </div>
                            <h3 className="text-2xl font-extralight mb-4 text-white tracking-wide" style={{ fontFamily: 'var(--font-lora)' }}>
                                {t('Ready to Transcend Ordinary Reality?')}
                            </h3>
                            <p className="text-white/70 mb-6 max-w-2xl mx-auto font-light leading-relaxed">
                                {t('Join thousands of awakened souls who have shared their transformational experiences. Reading cosmic consciousness reviews can guide you to your next evolutionary leap.')}
                            </p>
                            <Link
                                href="/reviews"
                                className="cosmic-button inline-block"
                            >
                                {t('Explore Consciousness Reviews')}
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    )
}

export default Books
