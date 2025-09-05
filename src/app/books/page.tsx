'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Book } from '@/types/database'
import Image from 'next/image'
import Link from 'next/link'

// Function to generate random book covers (same as FeaturedBooks)
const getRandomBookCover = (title: string, index: number) => {
    const colors = [
        { bg: '#1a1a1a', accent: '#8B5CF6' }, // Dark gray with purple accent
        { bg: '#0f0f0f', accent: '#10B981' }, // Very dark with emerald
        { bg: '#2d1b69', accent: '#F59E0B' }, // Dark purple with amber
        { bg: '#1e3a8a', accent: '#EC4899' }, // Dark blue with pink
        { bg: '#7c2d12', accent: '#06B6D4' }, // Dark red with cyan
        { bg: '#064e3b', accent: '#F97316' }  // Dark green with orange
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
      <text x="150" y="250" text-anchor="middle" fill="${color.accent}" font-family="Arial, sans-serif" font-size="14">Tori Man</text>
      <rect x="40" y="340" width="220" height="2" fill="${color.accent}"/>
    </svg>
  `)}`
}

// Hardcoded books data that will always be available
const hardcodedBooks: Book[] = [
    {
        id: '1',
        author_id: '1',
        title: 'The Midnight Garden',
        description: 'A haunting tale of mystery and romance set in Victorian England. When Sarah inherits her grandmother\'s estate, she discovers secrets that have been buried for generations. As she explores the sprawling mansion and its mysterious gardens, she uncovers a love story that transcends time itself.',
        cover_image_url: '/images/book1-cover.jpg',
        publication_date: '2023-03-15',
        buy_link: 'https://amazon.com/midnight-garden'
    },
    {
        id: '2',
        author_id: '1',
        title: 'Whispers in the Wind',
        description: 'An epic fantasy adventure that follows a young mage on her quest to save her kingdom from an ancient evil. Magic, friendship, and courage collide in this unforgettable story. With breathtaking world-building and characters you\'ll fall in love with, this is fantasy at its finest.',
        cover_image_url: '/images/book2-cover.jpg',
        publication_date: '2022-11-08',
        buy_link: 'https://amazon.com/whispers-wind'
    },
    {
        id: '3',
        author_id: '1',
        title: 'City of Dreams',
        description: 'A contemporary romance set in bustling New York City. Two ambitious professionals find love in the most unexpected places while chasing their dreams. This heartwarming story explores themes of ambition, love, and finding balance in a fast-paced world.',
        cover_image_url: '/images/book3-cover.jpg',
        publication_date: '2024-01-20',
        buy_link: 'https://amazon.com/city-dreams'
    },
    {
        id: '4',
        author_id: '1',
        title: 'Shadows of the Past',
        description: 'A psychological thriller that will keep you on the edge of your seat. Detective Lisa Morgan must confront her own demons while hunting a serial killer who seems to know her every move. Dark secrets and unexpected twists await in this gripping tale.',
        cover_image_url: '/images/book4-cover.jpg',
        publication_date: '2023-08-12',
        buy_link: 'https://amazon.com/shadows-past'
    },
    {
        id: '5',
        author_id: '1',
        title: 'The Ocean\'s Secret',
        description: 'A magical realism novel about a marine biologist who discovers that mermaids are real. As she delves deeper into their world, she must choose between her scientific career and protecting their ancient secrets. A beautiful tale of discovery and wonder.',
        cover_image_url: '/images/book5-cover.jpg',
        publication_date: '2023-12-05',
        buy_link: 'https://amazon.com/oceans-secret'
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
            <div className="min-h-screen bg-gray-900">
                {/* Hero Section */}
                <section className="py-20 bg-gradient-to-r from-gray-800 to-gray-900 text-white">
                    <div className="container-custom text-center">
                        <h1 className="text-4xl lg:text-6xl font-bold mb-6">My Books</h1>
                        <p className="text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto">
                            Explore the collection of stories that have captivated readers worldwide
                        </p>
                    </div>
                </section>

                {/* Loading Books */}
                <section className="py-16">
                    <div className="container-custom">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                                <div key={i} className="bg-gray-800 border border-gray-700 rounded-lg p-6 animate-pulse">
                                    <div className="aspect-[3/4] bg-gray-700 rounded-lg mb-4"></div>
                                    <div className="h-6 bg-gray-700 rounded mb-2"></div>
                                    <div className="h-4 bg-gray-700 rounded mb-2"></div>
                                    <div className="h-4 bg-gray-700 rounded mb-4 w-3/4"></div>
                                    <div className="flex gap-3">
                                        <div className="h-10 bg-gray-700 rounded flex-1"></div>
                                        <div className="h-10 bg-gray-700 rounded w-20"></div>
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
        <div className="min-h-screen bg-gray-900">
            {/* Hero Section */}
            <section className="py-20 bg-gradient-to-r from-gray-800 to-gray-900 text-white">
                <div className="container-custom">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center"
                    >
                        <h1 className="text-4xl lg:text-6xl font-bold mb-6">My Books</h1>
                        <p className="text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto">
                            Explore the collection of stories that have captivated readers worldwide.
                            From mystery to romance, fantasy to contemporary fiction, discover your next favorite read.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Books Grid */}
            <section className="py-16">
                <div className="container-custom">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-white">Complete Collection</h2>
                        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                            Each book is a unique journey. Click on any title to learn more and read reviews from fellow readers.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {books.map((book, index) => (
                            <motion.div
                                key={book.id}
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                                className="bg-gray-800 border border-gray-700 rounded-lg p-6 group hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300"
                            >
                                {/* Book Cover */}
                                <div className="aspect-[3/4] overflow-hidden rounded-lg mb-6 bg-gray-700 relative">
                                    <Image
                                        src={getRandomBookCover(book.title, index)}
                                        alt={book.title}
                                        width={400}
                                        height={533}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />

                                    {/* Overlay with publication date */}
                                    <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                                        {new Date(book.publication_date).getFullYear()}
                                    </div>
                                </div>

                                {/* Book Info */}
                                <div className="space-y-4">
                                    <h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors">
                                        {book.title}
                                    </h3>

                                    <p className="text-gray-400 text-sm mb-2">
                                        Published: {formatDate(book.publication_date)}
                                    </p>

                                    <p className="text-gray-300 line-clamp-4">
                                        {book.description}
                                    </p>

                                    {/* Action Buttons */}
                                    <div className="flex gap-3 pt-4">
                                        <Link
                                            href={`/books/${book.id}`}
                                            className="bg-gray-700 border border-gray-600 text-gray-300 px-4 py-2 rounded-lg flex-1 text-center hover:bg-gray-600 hover:text-white hover:border-gray-500 transition-colors"
                                        >
                                            Learn More
                                        </Link>
                                        <a
                                            href={book.buy_link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                                        >
                                            Buy Now
                                        </a>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Call to Action */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 1.5 }}
                        className="text-center mt-16 bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-700 rounded-lg p-8"
                    >
                        <h3 className="text-2xl font-bold mb-4 text-white">Can&apos;t decide which book to read first?</h3>
                        <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                            Check out what other readers are saying! Reading reviews can help you find the perfect book to match your mood.
                        </p>
                        <Link href="/reviews" className="bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition-colors inline-block">
                            Read Reviews & Recommendations
                        </Link>
                    </motion.div>
                </div>
            </section>
        </div>
    )
}

export default Books
