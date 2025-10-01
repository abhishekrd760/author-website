'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Book } from '@/types/database'
import { api } from '@/lib/supabase'
import Image from 'next/image'
import Link from 'next/link'

// Function to generate random book cover images
const getRandomBookCover = (title: string, index: number) => {
    const colors = [
        { bg: '#374151', accent: '#F59E0B' },
        { bg: '#1F2937', accent: '#10B981' },
        { bg: '#111827', accent: '#3B82F6' },
        { bg: '#1E40AF', accent: '#EC4899' },
        { bg: '#7C2D12', accent: '#F97316' },
        { bg: '#064E3B', accent: '#6EE7B7' }
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
      <text x="150" y="250" text-anchor="middle" fill="${color.accent}" font-family="Arial, sans-serif" font-size="14">Jane Doe</text>
      <rect x="40" y="340" width="220" height="2" fill="${color.accent}"/>
    </svg>
  `)}`
}

const FeaturedBooks = () => {
    const [books, setBooks] = useState<Book[]>([])
    const [loading, setLoading] = useState(true)

    // Container variants for staggered animation
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3,
                delayChildren: 0.2,
            }
        }
    }

    // Item variants for individual book animations
    const itemVariants = {
        hidden: {
            opacity: 0,
            y: 60,
            scale: 0.9
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.8,
                ease: [0.215, 0.61, 0.355, 1] // Custom cubic-bezier for elegant easing
            }
        }
    }

    // Section entrance animation
    const sectionVariants = {
        hidden: {
            opacity: 0,
            y: 100,
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 1.2,
                ease: [0.25, 0.46, 0.45, 0.94], // Elegant ease-out curve
            }
        }
    }

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const data = await api.getFeaturedBooks()
                setBooks(data.slice(0, 3)) // Get first 3 books
            } catch (error) {
                console.error('Error:', error)
                // Use fallback data
                setBooks([
                    {
                        id: '1',
                        author_id: '1',
                        title: 'The Midnight Garden',
                        description: 'A haunting tale of mystery and romance set in Victorian England.',
                        cover_image_url: '/images/book1-cover.jpg',
                        publication_date: '2023-03-15',
                        buy_link: 'https://amazon.com/midnight-garden'
                    },
                    {
                        id: '2',
                        author_id: '1',
                        title: 'Whispers in the Wind',
                        description: 'An epic fantasy adventure that follows a young mage on her quest.',
                        cover_image_url: '/images/book2-cover.jpg',
                        publication_date: '2022-11-08',
                        buy_link: 'https://amazon.com/whispers-wind'
                    },
                    {
                        id: '3',
                        author_id: '1',
                        title: 'City of Dreams',
                        description: 'A contemporary romance set in bustling New York City.',
                        cover_image_url: '/images/book3-cover.jpg',
                        publication_date: '2024-01-20',
                        buy_link: 'https://amazon.com/city-dreams'
                    }
                ])
            } finally {
                setLoading(false)
            }
        }

        fetchBooks()
    }, [])

    // Enhanced animation variants for elegant scroll transitions
    const enhancedContainerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.4,
                delayChildren: 0.8
            }
        }
    }

    const enhancedItemVariants = {
        hidden: {
            opacity: 0,
            y: 100,
            scale: 0.8,
            rotateX: 15
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            rotateX: 0
        }
    }

    // Section entrance animation with elegant slide-up effect
    const sectionEntranceVariants = {
        hidden: {
            opacity: 0,
            y: 100,
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 1.2,
                ease: "easeOut"
            }
        }
    }

    if (loading) {
        return (
            <section className="py-16 bg-gray-900">
                <div className="container-custom">
                    <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12 text-gray-100" style={{ fontFamily: 'var(--font-cinzel)' }}>Featured Books</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="card animate-pulse">
                                <div className="aspect-[3/4] bg-gray-700 rounded-lg mb-4"></div>
                                <div className="h-4 bg-gray-700 rounded mb-2"></div>
                                <div className="h-3 bg-gray-700 rounded mb-4"></div>
                                <div className="h-8 bg-gray-700 rounded"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        )
    }

    return (
        <motion.section
            className="py-16 bg-gray-900"
            initial={{ opacity: 0, y: 150 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
                duration: 1.5,
                ease: [0.25, 0.46, 0.45, 0.94],
                type: "spring",
                damping: 20,
                stiffness: 60
            }}
            viewport={{ once: true, margin: "-200px" }}
        >
            <div className="container-custom">
                <motion.div
                    initial={{ opacity: 0, y: 80 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                        duration: 1.0,
                        delay: 0.5,
                        ease: [0.25, 0.46, 0.45, 0.94]
                    }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-gray-100" style={{ fontFamily: 'var(--font-cinzel)' }}>Featured Books</h2>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                        Discover the latest captivating stories that have enchanted readers worldwide
                    </p>
                </motion.div>

                <motion.div
                    variants={enhancedContainerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-150px", amount: 0.3 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {books.map((book, index) => (
                        <motion.div
                            key={book.id}
                            variants={enhancedItemVariants}
                            className="card group"
                            whileHover={{
                                scale: 1.05,
                                y: -10,
                                transition: { duration: 0.3 }
                            }}
                            transition={{
                                duration: 1.2,
                                ease: [0.25, 0.46, 0.45, 0.94],
                                type: "spring",
                                damping: 15,
                                stiffness: 50
                            }}
                        >
                            <div className="aspect-[3/4] overflow-hidden rounded-lg mb-4 bg-gray-700">
                                <Image
                                    src={getRandomBookCover(book.title, index)}
                                    alt={book.title}
                                    width={300}
                                    height={400}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                            </div>

                            <h3 className="text-xl font-bold mb-2 group-hover:text-gray-300 transition-colors text-gray-100" style={{ fontFamily: 'var(--font-cinzel)' }}>
                                {book.title}
                            </h3>

                            <p className="text-gray-400 mb-4 line-clamp-3">
                                {book.description}
                            </p>

                            <div className="flex gap-3">
                                <Link
                                    href={`/books/${book.id}`}
                                    className="btn-secondary flex-1 text-center"
                                >
                                    Learn More
                                </Link>
                                <a
                                    href={book.buy_link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-primary px-4"
                                >
                                    Buy Now
                                </a>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="text-center mt-12"
                >
                    <Link href="/books" className="btn-primary">
                        View All Books
                    </Link>
                </motion.div>
            </div>
        </motion.section>
    )
}

export default FeaturedBooks
