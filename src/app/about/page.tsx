'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const About = () => {
    const achievements = [
        { year: '2020', event: 'Published "Beyond Time" - A journey into consciousness' },
        { year: '2021', event: 'Reached spiritual bestseller list' },
        { year: '2022', event: 'Founded the Cosmic Consciousness Institute' },
        { year: '2023', event: 'Won the Transcendental Literature Award' },
        { year: '2024', event: 'Launched global meditation movement' },
        { year: '2024', event: 'Over 1 million souls awakened worldwide' }
    ]

    return (
        <div className="min-h-screen relative overflow-hidden">
            {/* Cosmic Pattern Background */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.08'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6zM50 50v-2h-2v2h-2v2h2v2h2v-2h2v-2h-2zM20 10v-2h-2v2h-2v2h2v2h2v-2h2v-2h-2zM45 15v-2h-2v2h-2v2h2v2h2v-2h2v-2h-2zM10 45v-2h-2v2h-2v2h2v2h2v-2h2v-2h-2zM30 20v-2h-2v2h-2v2h2v2h2v-2h2v-2h-2zM40 40v-2h-2v2h-2v2h2v2h2v-2h2v-2h-2zM15 25v-2h-2v2h-2v2h2v2h2v-2h2v-2h-2zM55 5v-2h-2v2h-2v2h2v2h2v-2h2v-2h-2zM25 55v-2h-2v2h-2v2h2v2h2v-2h2v-2h-2zM5 15v-2h-2v2H1v2h2v2h2v-2h2v-2H5zM35 45v-2h-2v2h-2v2h2v2h2v-2h2v-2h-2zM50 25v-2h-2v2h-2v2h2v2h2v-2h2v-2h-2zM12 35v-2h-2v2h-2v2h2v2h2v-2h2v-2h-2zM28 8v-2h-2v2h-2v2h2v2h2v-2h2v-2h-2zM42 52v-2h-2v2h-2v2h2v2h2v-2h2v-2h-2zM8 50v-2H6v2H4v2h2v2h2v-2h2v-2H8zM52 12v-2h-2v2h-2v2h2v2h2v-2h2v-2h-2zM18 42v-2h-2v2h-2v2h2v2h2v-2h2v-2h-2zM38 18v-2h-2v2h-2v2h2v2h2v-2h2v-2h-2zM22 28v-2h-2v2h-2v2h2v2h2v-2h2v-2h-2zM48 38v-2h-2v2h-2v2h2v2h2v-2h2v-2h-2zM2 22v-2H0v2H-2v2h2v2h2v-2h2v-2H2zM32 32v-2h-2v2h-2v2h2v2h2v-2h2v-2h-2zM58 28v-2h-2v2h-2v2h2v2h2v-2h2v-2h-2zM14 2v-2h-2v2h-2v2h2v2h2v-2h2v-2h-2zM26 48v-2h-2v2h-2v2h2v2h2v-2h2v-2h-2zM44 8v-2h-2v2h-2v2h2v2h2v-2h2v-2h-2zM6 28v-2H4v2H2v2h2v2h2v-2h2v-2H6zM54 42v-2h-2v2h-2v2h2v2h2v-2h2v-2h-2zM16 12v-2h-2v2h-2v2h2v2h2v-2h2v-2h-2zM34 58v-2h-2v2h-2v2h2v2h2v-2h2v-2h-2zM24 16v-2h-2v2h-2v2h2v2h2v-2h2v-2h-2zM46 22v-2h-2v2h-2v2h2v2h2v-2h2v-2h-2zM4 38v-2H2v2H0v2h2v2h2v-2h2v-2H4zM56 18v-2h-2v2h-2v2h2v2h2v-2h2v-2h-2zM12 52v-2h-2v2h-2v2h2v2h2v-2h2v-2h-2zM28 2v-2h-2v2h-2v2h2v2h2v-2h2v-2h-2zM40 48v-2h-2v2h-2v2h2v2h2v-2h2v-2h-2zM8 8v-2H6v2H4v2h2v2h2v-2h2v-2H8zM52 32v-2h-2v2h-2v2h2v2h2v-2h2v-2h-2zM18 58v-2h-2v2h-2v2h2v2h2v-2h2v-2h-2zM30 12v-2h-2v2h-2v2h2v2h2v-2h2v-2h-2zM42 28v-2h-2v2h-2v2h2v2h2v-2h2v-2h-2zM2 48v-2H0v2H-2v2h2v2h2v-2h2v-2H2zM58 8v-2h-2v2h-2v2h2v2h2v-2h2v-2h-2zM10 18v-2h-2v2h-2v2h2v2h2v-2h2v-2h-2zM38 38v-2h-2v2h-2v2h2v2h2v-2h2v-2h-2zM22 4v-2h-2v2h-2v2h2v2h2v-2h2v-2h-2zM48 58v-2h-2v2h-2v2h2v2h2v-2h2v-2h-2zM6 42v-2H4v2H2v2h2v2h2v-2h2v-2H6zM54 2v-2h-2v2h-2v2h2v2h2v-2h2v-2h-2zM14 28v-2h-2v2h-2v2h2v2h2v-2h2v-2h-2zM26 38v-2h-2v2h-2v2h2v2h2v-2h2v-2h-2zM44 12v-2h-2v2h-2v2h2v2h2v-2h2v-2h-2zM1 30v-2h-2v2h-2v2h2v2h2v-2h2v-2H1zM53 20v-2h-2v2h-2v2h2v2h2v-2h2v-2h-2zM19 50v-2h-2v2h-2v2h2v2h2v-2h2v-2h-2zM41 6v-2h-2v2h-2v2h2v2h2v-2h2v-2h-2zM7 20v-2h-2v2h-2v2h2v2h2v-2h2v-2H7zM49 30v-2h-2v2h-2v2h2v2h2v-2h2v-2h-2zM33 50v-2h-2v2h-2v2h2v2h2v-2h2v-2h-2zM11 6v-2h-2v2h-2v2h2v2h2v-2h2v-2h-2zM57 40v-2h-2v2h-2v2h2v2h2v-2h2v-2h-2zM29 16v-2h-2v2h-2v2h2v2h2v-2h2v-2h-2zM47 46v-2h-2v2h-2v2h2v2h2v-2h2v-2h-2zM3 40v-2h-2v2h-2v2h2v2h2v-2h2v-2H3zM51 10v-2h-2v2h-2v2h2v2h2v-2h2v-2h-2zM17 30v-2h-2v2h-2v2h2v2h2v-2h2v-2h-2zM39 20v-2h-2v2h-2v2h2v2h2v-2h2v-2h-2zM9 50v-2h-2v2h-2v2h2v2h2v-2h2v-2H9zM55 0v-2h-2v2h-2v2h2v2h2v-2h2v-2h-2zM27 40v-2h-2v2h-2v2h2v2h2v-2h2v-2h-2zM45 16v-2h-2v2h-2v2h2v2h2v-2h2v-2h-2zM13 10v-2h-2v2h-2v2h2v2h2v-2h2v-2h-2zM59 50v-2h-2v2h-2v2h2v2h2v-2h2v-2h-2zM31 26v-2h-2v2h-2v2h2v2h2v-2h2v-2h-2zM49 36v-2h-2v2h-2v2h2v2h2v-2h2v-2h-2zM5 10v-2h-2v2h-2v2h2v2h2v-2h2v-2H5zM53 50v-2h-2v2h-2v2h2v2h2v-2h2v-2h-2z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    backgroundSize: '60px 60px'
                }}></div>
            </div>

            {/* Elegant Floating Star Field */}
            {/* Large Central Stars */}
            <motion.div
                animate={{
                    rotate: [0, 360],
                    scale: [1, 1.2, 0.8, 1.1, 1],
                    x: [0, 20, -15, 10, 0],
                    y: [0, -25, 15, -10, 0]
                }}
                transition={{
                    rotate: { duration: 25, repeat: Infinity, ease: "linear" },
                    scale: { duration: 6, repeat: Infinity, ease: "easeInOut" },
                    x: { duration: 18, repeat: Infinity, ease: "easeInOut" },
                    y: { duration: 22, repeat: Infinity, ease: "easeInOut" }
                }}
                className="absolute top-20 left-1/4 text-5xl opacity-15 text-yellow-200"
            >
                ✨
            </motion.div>

            <motion.div
                animate={{
                    rotate: [360, 0],
                    scale: [1, 0.7, 1.3, 0.9, 1],
                    x: [0, -30, 20, -10, 0],
                    y: [0, 20, -30, 15, 0]
                }}
                transition={{
                    rotate: { duration: 30, repeat: Infinity, ease: "linear" },
                    scale: { duration: 7, repeat: Infinity, ease: "easeInOut" },
                    x: { duration: 20, repeat: Infinity, ease: "easeInOut" },
                    y: { duration: 25, repeat: Infinity, ease: "easeInOut" }
                }}
                className="absolute top-32 right-1/3 text-4xl opacity-20 text-blue-200"
            >
                ⭐
            </motion.div>

            {/* Medium Stars with Complex Paths */}
            <motion.div
                animate={{
                    rotate: [0, 180, 360],
                    scale: [1, 1.4, 0.6, 1.2, 1],
                    x: [0, 25, -20, 15, 0],
                    y: [0, -18, 22, -12, 0]
                }}
                transition={{
                    rotate: { duration: 20, repeat: Infinity, ease: "easeInOut" },
                    scale: { duration: 5, repeat: Infinity, ease: "easeInOut" },
                    x: { duration: 15, repeat: Infinity, ease: "easeInOut" },
                    y: { duration: 17, repeat: Infinity, ease: "easeInOut" }
                }}
                className="absolute top-48 left-16 text-3xl opacity-25 text-purple-300"
            >
                *
            </motion.div>

            <motion.div
                animate={{
                    rotate: [360, 180, 0],
                    scale: [1, 0.8, 1.5, 0.7, 1],
                    x: [0, -22, 18, -8, 0],
                    y: [0, 16, -24, 12, 0]
                }}
                transition={{
                    rotate: { duration: 22, repeat: Infinity, ease: "easeInOut" },
                    scale: { duration: 6, repeat: Infinity, ease: "easeInOut" },
                    x: { duration: 19, repeat: Infinity, ease: "easeInOut" },
                    y: { duration: 21, repeat: Infinity, ease: "easeInOut" }
                }}
                className="absolute top-64 right-20 text-3xl opacity-18 text-pink-300"
            >
                *
            </motion.div>

            <motion.div
                animate={{
                    rotate: [0, 270, 180, 90, 0],
                    scale: [1, 1.3, 0.5, 1.1, 1],
                    x: [0, 18, -25, 12, 0],
                    y: [0, -20, 16, -8, 0]
                }}
                transition={{
                    rotate: { duration: 28, repeat: Infinity, ease: "easeInOut" },
                    scale: { duration: 8, repeat: Infinity, ease: "easeInOut" },
                    x: { duration: 16, repeat: Infinity, ease: "easeInOut" },
                    y: { duration: 20, repeat: Infinity, ease: "easeInOut" }
                }}
                className="absolute top-80 left-1/3 text-4xl opacity-12 text-cyan-300"
            >
                *
            </motion.div>

            {/* Small Twinkling Stars */}
            <motion.div
                animate={{
                    rotate: [0, 360],
                    scale: [1, 1.8, 0.3, 1.2, 1],
                    opacity: [0.1, 0.4, 0.1, 0.3, 0.1]
                }}
                transition={{
                    rotate: { duration: 15, repeat: Infinity, ease: "linear" },
                    scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                    opacity: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                }}
                className="absolute top-1/4 left-12 text-2xl opacity-20 text-yellow-100"
            >
                *
            </motion.div>

            <motion.div
                animate={{
                    rotate: [360, 0],
                    scale: [1, 0.4, 1.5, 0.6, 1],
                    opacity: [0.15, 0.5, 0.15, 0.35, 0.15]
                }}
                transition={{
                    rotate: { duration: 18, repeat: Infinity, ease: "linear" },
                    scale: { duration: 5, repeat: Infinity, ease: "easeInOut" },
                    opacity: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                }}
                className="absolute top-1/3 right-16 text-2xl opacity-18 text-blue-100"
            >
                *
            </motion.div>

            <motion.div
                animate={{
                    rotate: [0, 180, 360],
                    scale: [1, 1.6, 0.2, 1.3, 1],
                    opacity: [0.12, 0.45, 0.12, 0.28, 0.12]
                }}
                transition={{
                    rotate: { duration: 12, repeat: Infinity, ease: "easeInOut" },
                    scale: { duration: 3.5, repeat: Infinity, ease: "easeInOut" },
                    opacity: { duration: 2.5, repeat: Infinity, ease: "easeInOut" }
                }}
                className="absolute top-1/2 left-20 text-xl opacity-25 text-purple-100"
            >
                *
            </motion.div>

            <motion.div
                animate={{
                    rotate: [360, 180, 0],
                    scale: [1, 0.5, 1.7, 0.4, 1],
                    opacity: [0.18, 0.6, 0.18, 0.4, 0.18]
                }}
                transition={{
                    rotate: { duration: 16, repeat: Infinity, ease: "easeInOut" },
                    scale: { duration: 4.5, repeat: Infinity, ease: "easeInOut" },
                    opacity: { duration: 3.5, repeat: Infinity, ease: "easeInOut" }
                }}
                className="absolute top-2/3 right-12 text-xl opacity-22 text-pink-100"
            >
                *
            </motion.div>

            <motion.div
                animate={{
                    rotate: [0, 270, 180, 90, 0],
                    scale: [1, 1.4, 0.3, 1.1, 1],
                    opacity: [0.14, 0.5, 0.14, 0.32, 0.14]
                }}
                transition={{
                    rotate: { duration: 20, repeat: Infinity, ease: "easeInOut" },
                    scale: { duration: 6, repeat: Infinity, ease: "easeInOut" },
                    opacity: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                }}
                className="absolute bottom-32 left-16 text-2xl opacity-20 text-cyan-100"
            >
                ✯
            </motion.div>

            {/* Additional Elegant Stars */}
            <motion.div
                animate={{
                    rotate: [0, 360],
                    scale: [1, 1.2, 0.8, 1.1, 1],
                    x: [0, 12, -8, 6, 0],
                    y: [0, -10, 8, -4, 0],
                    opacity: [0.2, 0.4, 0.2, 0.35, 0.2]
                }}
                transition={{
                    rotate: { duration: 26, repeat: Infinity, ease: "linear" },
                    scale: { duration: 5, repeat: Infinity, ease: "easeInOut" },
                    x: { duration: 14, repeat: Infinity, ease: "easeInOut" },
                    y: { duration: 16, repeat: Infinity, ease: "easeInOut" },
                    opacity: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                }}
                className="absolute top-40 left-2/3 text-2xl opacity-15 text-indigo-200"
            >
                ★
            </motion.div>

            <motion.div
                animate={{
                    rotate: [360, 0],
                    scale: [1, 0.9, 1.3, 0.7, 1],
                    x: [0, -14, 10, -6, 0],
                    y: [0, 12, -16, 8, 0],
                    opacity: [0.18, 0.42, 0.18, 0.3, 0.18]
                }}
                transition={{
                    rotate: { duration: 19, repeat: Infinity, ease: "linear" },
                    scale: { duration: 6.5, repeat: Infinity, ease: "easeInOut" },
                    x: { duration: 17, repeat: Infinity, ease: "easeInOut" },
                    y: { duration: 19, repeat: Infinity, ease: "easeInOut" },
                    opacity: { duration: 5, repeat: Infinity, ease: "easeInOut" }
                }}
                className="absolute top-56 right-2/3 text-3xl opacity-12 text-violet-200"
            >
                ✦
            </motion.div>

            <motion.div
                animate={{
                    rotate: [0, 180, 360],
                    scale: [1, 1.5, 0.4, 1.2, 1],
                    x: [0, 16, -12, 8, 0],
                    y: [0, -14, 18, -6, 0],
                    opacity: [0.15, 0.48, 0.15, 0.33, 0.15]
                }}
                transition={{
                    rotate: { duration: 23, repeat: Infinity, ease: "easeInOut" },
                    scale: { duration: 7, repeat: Infinity, ease: "easeInOut" },
                    x: { duration: 18, repeat: Infinity, ease: "easeInOut" },
                    y: { duration: 21, repeat: Infinity, ease: "easeInOut" },
                    opacity: { duration: 4.5, repeat: Infinity, ease: "easeInOut" }
                }}
                className="absolute bottom-24 left-2/3 text-2xl opacity-18 text-orange-200"
            >
                ✧
            </motion.div>

            <motion.div
                animate={{
                    rotate: [360, 180, 0],
                    scale: [1, 0.7, 1.4, 0.8, 1],
                    x: [0, -18, 14, -10, 0],
                    y: [0, 16, -12, 8, 0],
                    opacity: [0.2, 0.45, 0.2, 0.35, 0.2]
                }}
                transition={{
                    rotate: { duration: 21, repeat: Infinity, ease: "easeInOut" },
                    scale: { duration: 6, repeat: Infinity, ease: "easeInOut" },
                    x: { duration: 20, repeat: Infinity, ease: "easeInOut" },
                    y: { duration: 18, repeat: Infinity, ease: "easeInOut" },
                    opacity: { duration: 4.2, repeat: Infinity, ease: "easeInOut" }
                }}
                className="absolute bottom-40 right-1/3 text-3xl opacity-14 text-teal-200"
            >
                ✩
            </motion.div>

            {/* Cosmic Symbols with Elegant Movement */}
            <motion.div
                animate={{
                    rotate: [0, 360],
                    scale: [1, 1.1, 0.9, 1.05, 1],
                    opacity: [0.1, 0.25, 0.1, 0.2, 0.1]
                }}
                transition={{
                    rotate: { duration: 40, repeat: Infinity, ease: "linear" },
                    scale: { duration: 8, repeat: Infinity, ease: "easeInOut" },
                    opacity: { duration: 6, repeat: Infinity, ease: "easeInOut" }
                }}
                className="absolute top-16 right-12 text-4xl opacity-15 text-white"
            >
                ∞
            </motion.div>

            <motion.div
                animate={{
                    rotate: [360, 0],
                    scale: [1, 0.95, 1.15, 0.85, 1],
                    opacity: [0.12, 0.28, 0.12, 0.22, 0.12]
                }}
                transition={{
                    rotate: { duration: 35, repeat: Infinity, ease: "linear" },
                    scale: { duration: 9, repeat: Infinity, ease: "easeInOut" },
                    opacity: { duration: 7, repeat: Infinity, ease: "easeInOut" }
                }}
                className="absolute bottom-16 left-12 text-3xl opacity-18 text-white"
            >
                ॐ
            </motion.div>

            {/* Hero Section */}
            <section className="py-20 cosmic-gradient text-white relative">
                <div className="container-custom relative">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center"
                    >
                        <h1 className="text-4xl lg:text-6xl font-extralight tracking-wide mb-6 text-cosmic">
                            Beyond the Veil of Time
                        </h1>
                        <p className="text-xl lg:text-2xl text-white/80 max-w-3xl mx-auto mb-4 font-light">
                            Where consciousness meets cosmos, spirit meets science
                        </p>
                        <p className="text-lg text-white/70 font-light tracking-wide">
                            Author & Consciousness Explorer
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-16 relative z-10">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
                        {/* Author Photo */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="relative"
                        >
                            <div className="aspect-square max-w-md mx-auto rounded-2xl overflow-hidden shadow-2xl border border-purple-400/30 relative glow-purple">
                                <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-purple-400"></div>
                                <div className="absolute -top-2 -right-2 w-6 h-6 border-t-2 border-r-2 border-purple-400"></div>
                                <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-2 border-l-2 border-purple-400"></div>
                                <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-purple-400"></div>

                                <Image
                                    src="/images/chor.jpg"
                                    alt="Kazutoshi Yoshida - Author"
                                    width={500}
                                    height={500}
                                    className="w-full h-full object-cover object-top"
                                    unoptimized={true}
                                    onError={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        console.error('Image failed to load:', target.src);
                                        // Fallback to direct img tag
                                        target.style.display = 'none';
                                        const fallbackImg = document.createElement('img');
                                        fallbackImg.src = '/images/chor.jpg';
                                        fallbackImg.alt = 'Kazutoshi Yoshida - Author';
                                        fallbackImg.className = 'w-full h-full object-cover object-top';
                                        target.parentNode?.appendChild(fallbackImg);
                                    }}
                                />

                                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/50 via-transparent to-transparent"></div>
                            </div>
                        </motion.div>

                        {/* About Text */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="space-y-6"
                        >
                            <h2 className="text-3xl lg:text-4xl font-extralight tracking-wide text-white mb-6">
                                About <span className="text-cosmic font-semibold">Kazutoshi Yoshida</span>
                            </h2>

                            <p className="text-white/80 leading-relaxed font-light text-lg">
                                Welcome to a realm where ancient wisdom converges with quantum consciousness,
                                where the infinite expanse of the cosmos mirrors the boundless potential within
                                each soul. This is not merely about books—it&apos;s about awakening to the eternal
                                dance between spirit and science.
                            </p>

                            <p className="text-white/70 leading-relaxed font-light">
                                Through decades of meditation, scientific research, and transcendental experiences,
                                I have discovered that time is not linear—it&apos;s a spiral, a cosmic dance that allows
                                us to step beyond our perceived limitations into the infinite field of pure possibility.
                            </p>

                            <p className="text-white/70 leading-relaxed font-light">
                                My work bridges the gap between mystical experiences and scientific understanding,
                                offering readers a pathway to transcend ordinary consciousness and step into their
                                true cosmic nature.
                            </p>
                        </motion.div>
                    </div>

                    {/* Cosmic Journey Timeline */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="card mb-16"
                    >
                        <h3 className="text-3xl font-extralight tracking-wide text-white mb-8 text-center">
                            Milestones in the <span className="text-cosmic">Cosmic Journey</span>
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {achievements.map((achievement, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                                    className="relative p-6 bg-white/5 rounded-xl border border-white/10 hover:border-purple-400/30 transition-all duration-300 group"
                                >
                                    <div className="absolute -top-3 -left-3 w-8 h-8 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full flex items-center justify-center text-white text-sm font-light">
                                        {achievement.year.slice(-2)}
                                    </div>
                                    <div className="text-sm text-purple-300 font-light mb-2 tracking-wide">{achievement.year}</div>
                                    <div className="text-white/90 font-light leading-relaxed">{achievement.event}</div>

                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-blue-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                        whileHover={{ scale: 1.02 }}
                                    />
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Cosmic Philosophy */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1.2 }}
                        className="card"
                    >
                        <h3 className="text-3xl font-extralight tracking-wide text-white mb-8 text-center">
                            The <span className="text-cosmic">Cosmic Philosophy</span>
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="text-center group">
                                <motion.div
                                    whileHover={{ scale: 1.1, rotate: 180 }}
                                    className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full flex items-center justify-center text-2xl"
                                >
                                    ∞
                                </motion.div>
                                <h4 className="text-xl font-light text-white mb-3">Infinite Consciousness</h4>
                                <p className="text-white/70 font-light leading-relaxed">
                                    Consciousness is not produced by the brain—it&apos;s the fundamental fabric of reality itself.
                                </p>
                            </div>

                            <div className="text-center group">
                                <motion.div
                                    whileHover={{ scale: 1.1, rotate: 360 }}
                                    className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center text-2xl"
                                >
                                    ॐ
                                </motion.div>
                                <h4 className="text-xl font-light text-white mb-3">Sacred Science</h4>
                                <p className="text-white/70 font-light leading-relaxed">
                                    Where quantum physics meets ancient wisdom, revealing the unity of all existence.
                                </p>
                            </div>

                            <div className="text-center group">
                                <motion.div
                                    whileHover={{ scale: 1.1, rotate: -180 }}
                                    className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full flex items-center justify-center text-2xl"
                                >
                                    🌌
                                </motion.div>
                                <h4 className="text-xl font-light text-white mb-3">Cosmic Awakening</h4>
                                <p className="text-white/70 font-light leading-relaxed">
                                    Awakening to our true nature as cosmic beings experiencing temporary human form.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    )
}

export default About
