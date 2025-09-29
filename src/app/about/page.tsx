'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import StarryBackground from '@/components/StarryBackground'

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
        <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-[#050110] via-[#080218] to-[#060114]">
            <StarryBackground />
            {/* Decorative moving star elements removed per request */}

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
                            <div className="aspect-square max-w-md mx-auto rounded-2xl overflow-hidden shadow-2xl border border-blue-400/30 relative glow-blue">
                                <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-blue-400"></div>
                                <div className="absolute -top-2 -right-2 w-6 h-6 border-t-2 border-r-2 border-blue-400"></div>
                                <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-2 border-l-2 border-blue-400"></div>
                                <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-blue-400"></div>

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

                                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 via-transparent to-transparent"></div>
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
                                    className="relative p-6 bg-white/5 rounded-xl border border-white/10 hover:border-blue-400/30 transition-all duration-300 group"
                                >
                                    <div className="absolute -top-3 -left-3 w-8 h-8 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white text-sm font-light">
                                        {achievement.year.slice(-2)}
                                    </div>
                                    <div className="text-sm text-blue-300 font-light mb-2 tracking-wide">{achievement.year}</div>
                                    <div className="text-white/90 font-light leading-relaxed">{achievement.event}</div>

                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-blue-600/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
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
                                    className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-2xl"
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
                                    className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-2xl"
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
                                    className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-2xl"
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
