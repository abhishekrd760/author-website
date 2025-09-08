'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Book } from '@/types/database'
import Image from 'next/image'
import Link from 'next/link'

// Function to generate cosmic book covers
const getRandomBookCover = (title: string, index: number) => {
    const colors = [
        { bg: '#0f1419', accent: '#8B5CF6' }, // Deep space with purple
        { bg: '#1a0b2e', accent: '#10B981' }, // Dark purple with emerald
        { bg: '#2d1b69', accent: '#F59E0B' }, // Cosmic purple with amber
        { bg: '#1e3a8a', accent: '#EC4899' }, // Deep blue with pink
        { bg: '#7c2d12', accent: '#06B6D4' }, // Cosmic red with cyan
        { bg: '#064e3b', accent: '#F97316' }  // Deep teal with orange
    ]

    const color = colors[index % colors.length]

    return `data:image/svg+xml;base64,${btoa(`
    <svg width="300" height="400" viewBox="0 0 300 400" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="300" height="400" fill="${color.bg}"/>
      <rect x="20" y="20" width="260" height="360" fill="none" stroke="${color.accent}" stroke-width="2" opacity="0.5"/>
      <rect x="40" y="40" width="220" height="2" fill="${color.accent}"/>
      <rect x="40" y="60" width="180" height="1" fill="${color.accent}" opacity="0.7"/>
      <text x="150" y="200" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="18" font-weight="bold">
        <tspan x="150" dy="0">${title.split(' ').slice(0, 2).join(' ')}</tspan>
        ${title.split(' ').length > 2 ? `<tspan x="150" dy="25">${title.split(' ').slice(2).join(' ')}</tspan>` : ''}
      </text>
      <text x="150" y="250" text-anchor="middle" fill="${color.accent}" font-family="Arial, sans-serif" font-size="14">Kazutoshi Yoshida</text>
      <rect x="40" y="340" width="220" height="2" fill="${color.accent}"/>
    </svg>
  `)}`
}

// Cosmic consciousness books collection
const hardcodedBooks: Book[] = [
    {
        id: '1',
        author_id: '1',
        title: 'Beyond Time: A Journey into Consciousness',
        description: 'A transformative exploration of consciousness beyond the boundaries of linear time. Discover how to access higher dimensions of awareness and unlock the infinite potential that lies dormant within your soul. This book bridges ancient wisdom with quantum physics, revealing the true nature of reality.',
        cover_image_url: '/images/book1-cover.jpg',
        publication_date: '2023-03-15',
        buy_link: 'https://amazon.com/beyond-time-consciousness'
    },
    {
        id: '2',
        author_id: '1',
        title: 'Cosmic Awakening: The Science of Spirit',
        description: 'A groundbreaking synthesis of mystical experiences and scientific understanding. Journey through the quantum field of pure possibility as you learn to navigate multiple dimensions of reality. This book offers practical techniques for transcending ordinary consciousness and stepping into your cosmic nature.',
        cover_image_url: '/images/book2-cover.jpg',
        publication_date: '2022-11-08',
        buy_link: 'https://amazon.com/cosmic-awakening'
    },
    {
        id: '3',
        author_id: '1',
        title: 'The Infinite Field: Meditation Beyond Mind',
        description: 'Dive deep into the vast ocean of consciousness that exists beyond thought and emotion. This profound guide teaches advanced meditation techniques for accessing states of pure awareness, where time dissolves and infinite wisdom emerges. Perfect for serious seekers of truth.',
        cover_image_url: '/images/book3-cover.jpg',
        publication_date: '2024-01-20',
        buy_link: 'https://amazon.com/infinite-field'
    },
    {
        id: '4',
        author_id: '1',
        title: 'Quantum Hearts: Love in the Cosmic Dance',
        description: 'Explore love as the fundamental force that binds the universe together. This beautiful work reveals how consciousness and love are one and the same, showing readers how to embody divine love in everyday life. A spiritual romance with the cosmos itself.',
        cover_image_url: '/images/book4-cover.jpg',
        publication_date: '2023-08-12',
        buy_link: 'https://amazon.com/quantum-hearts'
    },
    {
        id: '5',
        author_id: '1',
        title: 'Starseeds: Awakening to Your Cosmic Origins',
        description: 'A profound journey into the understanding that we are cosmic beings having a human experience. Discover your star origins, learn to communicate with your higher self, and remember why you chose to incarnate on Earth at this pivotal time in human evolution.',
        cover_image_url: '/images/book5-cover.jpg',
        publication_date: '2023-12-05',
        buy_link: 'https://amazon.com/starseeds-cosmic-origins'
    }
]

const Books = () => {
    const [books, setBooks] = useState<Book[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Always use hardcoded books
        setBooks(hardcodedBooks)
        setLoading(false)
    }, [])

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
    }

    if (loading) {
        return (
            <div className="min-h-screen relative overflow-hidden">
                {/* Cosmic Pattern Background */}
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                        backgroundSize: '60px 60px'
                    }}></div>
                </div>

                {/* Hero Section */}
                <section className="py-20 cosmic-gradient text-white relative">
                    <div className="container-custom text-center">
                        <h1 className="text-4xl lg:text-6xl font-extralight tracking-wide mb-6 text-cosmic">Cosmic Library</h1>
                        <p className="text-xl lg:text-2xl text-white/80 max-w-3xl mx-auto font-light">
                            Discover books that transcend ordinary reality and awaken cosmic consciousness
                        </p>
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

    return (
        <div className="min-h-screen relative overflow-hidden">
            {/* Cosmic Pattern Background */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    backgroundSize: '60px 60px'
                }}></div>
            </div>

            {/* Floating Cosmic Elements */}
            <motion.div
                animate={{
                    rotate: 360,
                    scale: [1, 1.1, 1]
                }}
                transition={{
                    rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                    scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                }}
                className="absolute top-40 right-20 text-4xl opacity-20"
            >
                📚
            </motion.div>

            <motion.div
                animate={{
                    rotate: -360,
                    y: [0, -20, 0]
                }}
                transition={{
                    rotate: { duration: 25, repeat: Infinity, ease: "linear" },
                    y: { duration: 6, repeat: Infinity, ease: "easeInOut" }
                }}
                className="absolute bottom-40 left-20 text-3xl opacity-20"
            >
                🌌
            </motion.div>

            {/* Hero Section */}
            <section className="py-20 cosmic-gradient text-white relative">
                <div className="container-custom">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center"
                    >
                        <h1 className="text-4xl lg:text-6xl font-extralight tracking-wide mb-6 text-cosmic">Cosmic Library</h1>
                        <p className="text-xl lg:text-2xl text-white/80 max-w-3xl mx-auto mb-4 font-light">
                            Books that bridge the gap between science and spirit, reality and consciousness
                        </p>
                        <p className="text-lg text-white/70 font-light tracking-wide">
                            Each book is a doorway to expanded awareness
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
                        <h2 className="text-3xl lg:text-4xl font-extralight tracking-wide mb-4 text-white">
                            The <span className="text-cosmic">Consciousness</span> Collection
                        </h2>
                        <p className="text-xl text-white/70 max-w-2xl mx-auto font-light">
                            Five transformative journeys into the infinite realms of cosmic awareness
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {books.map((book, index) => (
                            <motion.div
                                key={book.id}
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                                className="card group hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300"
                            >
                                {/* Book Cover */}
                                <div className="aspect-[3/4] overflow-hidden rounded-lg mb-6 bg-white/5 relative">
                                    <Image
                                        src={getRandomBookCover(book.title, index)}
                                        alt={book.title}
                                        width={400}
                                        height={533}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />

                                    {/* Overlay with publication date */}
                                    <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-light">
                                        {new Date(book.publication_date).getFullYear()}
                                    </div>

                                    {/* Cosmic glow overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-purple-900/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </div>

                                {/* Book Info */}
                                <div className="space-y-4">
                                    <h3 className="text-xl font-light text-white group-hover:text-cosmic transition-colors tracking-wide">
                                        {book.title}
                                    </h3>

                                    <p className="text-purple-300/80 text-sm mb-2 font-light">
                                        Published: {formatDate(book.publication_date)}
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
                                            Explore Book
                                        </Link>
                                        <a
                                            href={book.buy_link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="cosmic-button px-6"
                                        >
                                            Awaken
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
                            <motion.div
                                animate={{
                                    rotate: 360
                                }}
                                transition={{
                                    duration: 20,
                                    repeat: Infinity,
                                    ease: "linear"
                                }}
                                className="text-4xl mb-4 inline-block"
                            >
                                🌟
                            </motion.div>
                            <h3 className="text-2xl font-extralight mb-4 text-white tracking-wide">
                                Ready to <span className="text-cosmic">Transcend</span> Ordinary Reality?
                            </h3>
                            <p className="text-white/70 mb-6 max-w-2xl mx-auto font-light leading-relaxed">
                                Join thousands of awakened souls who have shared their transformational experiences.
                                Reading cosmic consciousness reviews can guide you to your next evolutionary leap.
                            </p>
                            <Link
                                href="/reviews"
                                className="cosmic-button inline-block"
                            >
                                Explore Consciousness Reviews
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    )
}

export default Books
