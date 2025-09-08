'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import Text3D from './Text3D'

const Hero = () => {
    return (
        <section className="hero-bg text-white py-20 lg:py-32 overflow-hidden relative">
            <div className="container-custom relative">
                {/* Floating dots that travel around the entire hero section - bigger and positioned away from image */}
                {/* Dot 1 - Extra Large Yellow - Around text area */}
                <motion.div
                    animate={{
                        x: [0, 100, -50, 150, 0],
                        y: [0, -70, 90, -50, 0],
                        scale: [1, 1.3, 0.8, 1.2, 1],
                    }}
                    transition={{
                        duration: 12,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="absolute top-32 left-16 z-10"
                >
                    <div className="w-16 h-16 bg-yellow-400 rounded-full opacity-50 shadow-xl blur-sm"></div>
                </motion.div>

                {/* Dot 2 - Extra Large Pink - Around welcome text */}
                <motion.div
                    animate={{
                        x: [0, -120, 70, -90, 0],
                        y: [0, 100, -80, 60, 0],
                        scale: [1, 0.9, 1.4, 0.7, 1],
                    }}
                    transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 3,
                    }}
                    className="absolute top-48 right-1/3 z-10"
                >
                    <div className="w-18 h-18 bg-pink-400 rounded-full opacity-45 shadow-xl blur-sm"></div>
                </motion.div>

                {/* Dot 3 - Extra Large Blue - Around Kazutoshi Yoshida text */}
                <motion.div
                    animate={{
                        x: [0, 180, -110, 160, 0],
                        y: [0, -90, 70, -35, 0],
                        scale: [1, 1.5, 0.6, 1.3, 1],
                    }}
                    transition={{
                        duration: 17,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 5,
                    }}
                    className="absolute top-24 left-1/2 z-10"
                >
                    <div className="w-20 h-20 bg-blue-400 rounded-full opacity-40 shadow-xl blur-sm"></div>
                </motion.div>

                {/* Dot 4 - Large Purple - Around description text */}
                <motion.div
                    animate={{
                        x: [0, -140, 90, -70, 0],
                        y: [0, 80, -100, 45, 0],
                        scale: [1, 0.8, 1.6, 0.9, 1],
                    }}
                    transition={{
                        duration: 14,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 7,
                    }}
                    className="absolute top-64 left-24 z-10"
                >
                    <div className="w-14 h-14 bg-purple-400 rounded-full opacity-55 shadow-xl blur-sm"></div>
                </motion.div>

                {/* Dot 5 - Large Green - Around buttons */}
                <motion.div
                    animate={{
                        x: [0, 110, -80, 130, 0],
                        y: [0, -60, 95, -70, 0],
                        scale: [1, 1.2, 0.7, 1.4, 1],
                    }}
                    transition={{
                        duration: 16,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 4,
                    }}
                    className="absolute bottom-24 left-1/3 z-10"
                >
                    <div className="w-12 h-12 bg-green-400 rounded-full opacity-60 shadow-xl blur-sm"></div>
                </motion.div>

                {/* Dot 6 - Large Orange - Top left area */}
                <motion.div
                    animate={{
                        x: [0, -130, 60, -150, 0],
                        y: [0, 75, -85, 65, 0],
                        scale: [1, 0.9, 1.5, 0.8, 1],
                    }}
                    transition={{
                        duration: 13,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 6,
                    }}
                    className="absolute top-16 left-8 z-10"
                >
                    <div className="w-15 h-15 bg-orange-400 rounded-full opacity-65 shadow-xl blur-sm"></div>
                </motion.div>

                {/* Additional Bigger Dots */}
                {/* Dot 7 - Extra Large Cyan - Bottom right text area */}
                <motion.div
                    animate={{
                        x: [0, 160, -120, 140, 0],
                        y: [0, -85, 110, -55, 0],
                        scale: [1, 1.4, 0.7, 1.1, 1],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 10,
                    }}
                    className="absolute bottom-16 right-16 z-10"
                >
                    <div className="w-22 h-22 bg-cyan-400 rounded-full opacity-35 shadow-xl blur-sm"></div>
                </motion.div>

                {/* Dot 8 - Extra Large Red - Top right area */}
                <motion.div
                    animate={{
                        x: [0, -170, 130, -90, 0],
                        y: [0, 95, -75, 85, 0],
                        scale: [1, 0.8, 1.6, 0.9, 1],
                    }}
                    transition={{
                        duration: 22,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 12,
                    }}
                    className="absolute top-20 right-8 z-10"
                >
                    <div className="w-19 h-19 bg-red-400 rounded-full opacity-45 shadow-xl blur-sm"></div>
                </motion.div>

                {/* Dot 9 - Large Indigo - Center left area */}
                <motion.div
                    animate={{
                        x: [0, 140, -100, 120, 0],
                        y: [0, -65, 85, -45, 0],
                        scale: [1, 1.3, 0.8, 1.2, 1],
                    }}
                    transition={{
                        duration: 19,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 9,
                    }}
                    className="absolute top-1/2 left-12 z-10"
                >
                    <div className="w-13 h-13 bg-indigo-400 rounded-full opacity-50 shadow-xl blur-sm"></div>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-6"
                    >
                        <div className="space-y-2">
                            <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                                Welcome to the World of{' '}
                            </h1>
                            <Text3D
                                text="Kazutoshi Yoshida"
                                className="text-4xl lg:text-6xl font-bold leading-tight"
                                depth={4}
                            />
                        </div>
                        <p className="text-xl lg:text-2xl text-gray-200">
                            Bestselling author crafting stories that captivate hearts and minds across the globe.
                        </p>
                        <p className="text-lg text-gray-300">
                            Discover enchanting tales of mystery, romance, and fantasy that have touched millions of readers worldwide.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <Link href="/books" className="btn-primary bg-yellow-500 hover:bg-yellow-600 text-purple-900">
                                View Books
                            </Link>
                            <Link href="/reviews" className="btn-secondary bg-white/20 hover:bg-white/30 text-white border border-white/30">
                                Read Reviews
                            </Link>
                            <Link href="/contact" className="btn-secondary bg-transparent hover:bg-white/10 text-white border border-white">
                                Contact Author
                            </Link>
                        </div>
                    </motion.div>

                    {/* Author Image */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <div className="relative w-full max-w-md mx-auto lg:max-w-lg">
                            <motion.div
                                className="aspect-square rounded-full overflow-hidden border-8 border-white/20 shadow-2xl"
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Image
                                    src="/images/chor.jpg"
                                    alt="Kazutoshi Yoshida - Author"
                                    width={500}
                                    height={500}
                                    className="w-full h-full object-cover object-top"
                                    onError={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAwIiBoZWlnaHQ9IjUwMCIgdmlld0JveD0iMCAwIDUwMCA1MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI1MDAiIGhlaWdodD0iNTAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yMDAgMjAwSDMwMFYzMDBIMjAwVjIwMFoiIGZpbGw9IiM5Q0E0QUIiLz4KPHN2Zz4K';
                                    }}
                                />
                            </motion.div>
                        </div>
                    </motion.div>
                </div>

            </div>
        </section>
    )
}

export default Hero
