'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import DualVideoBackground from '@/components/DualVideoBackground'
import { ArrowPathRoundedSquareIcon, BeakerIcon, SparklesIcon } from '@heroicons/react/24/outline'

const About = () => {
    const achievements = [
        { year: '1991-2025', event: 'Presented private peace messages to four presidents (Sri Lanka, Ukraine, Nepal, Indonesia) and numerous world leaders' },
        { year: '1995-1998', event: 'Produced enlightening documentary film "Peace Stars" and festival screened in Australia, Croatia, Ukraine, and Japan' },
        { year: '2003-2015', event: 'Participated in soil and water purification activities and well digging in Chernobyl and Sri Lanka' },
        { year: '2011', event: 'Developed Silver Elepha - radiation protective clothing processing technology for Chernobyl' },
        { year: '2014-2016', event: 'Donated medical equipment to Chernobyl and Sri Lanka' },
        { year: '2003-2005', event: 'Received honors from Ukrainian Minister of Interior and Mayor of Kyiv for Chernobyl support' },
        { year: '2011-2015', event: 'Invented quantum technologies: Fractal Pyramid, Healing Wave, Jomon Sacred Water, Motsuto Miracle' },
        { year: '2020', event: 'Published "From the Galactic Federation to Japan"' },
        { year: '2020-2025', event: 'Gave "Awakening Challenge" lectures globally, including at Tribhuvan University, Nepal' },
        { year: '2022', event: 'Published "Galactic Federation GOMQ" and "Living the Galactic Age in Awakening Ecstasy"' },
        { year: '2023', event: 'Published "Transcendent Parallel World"' },
        { year: '2024', event: 'Published "Ascension Beauty"' },
        { year: '2025', event: 'Published "Automatic Freedom" in Nepal' },
        { year: '1991-2025', event: 'Hosted 20 peace ceremonies worldwide with 35,000+ participants; provided Peace School certifications to 80,000+ people' }
    ]

    return (
        <div className="min-h-screen relative overflow-hidden">
            {/* Dual Video Background */}
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
                        <h1 className="text-3xl lg:text-5xl font-extralight tracking-wide mb-4 text-cosmic" style={{ fontFamily: 'var(--font-cinzel)' }}>
                            Beyond the Veil of Time
                        </h1>
                        <p className="text-lg lg:text-xl text-white/80 max-w-3xl mx-auto mb-3 font-light">
                            Where consciousness meets cosmos, spirit meets science
                        </p>
                        <p className="text-lg text-white/70 font-light tracking-wide" style={{ fontFamily: 'var(--font-lora)' }}>
                            Author & Consciousness Explorer
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-16 relative z-10">
                <div className="container-custom">
                    <div className="mb-16">
                        {/* Combined Author Photo and Text in Single Tile */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            whileHover={{
                                scale: 1.02,
                                boxShadow: '0 0 30px rgba(56, 189, 248, 0.6), 0 0 60px rgba(56, 189, 248, 0.4)',
                                transition: { duration: 0.3 }
                            }}
                            className="card backdrop-blur-sm relative cursor-pointer overflow-hidden"
                        >
                            {/* Gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-l from-sky-300/40 via-sky-400/20 via-sky-500/8 via-sky-600/3 to-transparent pointer-events-none"></div>

                            {/* Bottom right fade overlay */}
                            <div className="absolute bottom-0 right-0 w-full h-1/3 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
                                {/* Author Photo */}
                                <div className="relative">
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
                                </div>

                                {/* About Text */}
                                <div className="space-y-6">
                                    <h2 className="text-3xl lg:text-4xl font-extralight tracking-wide text-white mb-6" style={{ fontFamily: 'var(--font-cinzel)' }}>
                                        The Journey
                                    </h2>

                                    <p className="text-white/80 leading-relaxed font-light text-lg" style={{ fontFamily: 'var(--font-lora)' }}>
                                        For over three decades, Kazutoshi Yoshida has dedicated his life to bridging science and spirituality,
                                        working tirelessly for world peace and human consciousness evolution. From presenting private peace
                                        messages to four presidents and Arab royal families, to hosting peace ceremonies across 20 locations
                                        with over 35,000 participants, his mission has touched countless lives globally.
                                    </p>

                                    <p className="text-white/70 leading-relaxed font-light text-lg" style={{ fontFamily: 'var(--font-lora)' }}>
                                        His humanitarian work spans from developing radiation protective technology for Chernobyl survivors
                                        to leading soil and water purification projects in affected regions. Recognized by the Ukrainian
                                        government and international organizations, Yoshida&apos;s contributions have earned him honors from
                                        world leaders for his tireless support of communities in need.
                                    </p>

                                    <p className="text-white/70 leading-relaxed font-light text-lg" style={{ fontFamily: 'var(--font-lora)' }}>
                                        As an inventor and visionary, he has pioneered quantum technologies including the Fractal Pyramid and
                                        Healing Wave, while authoring groundbreaking books that integrate galactic wisdom with earthly awakening.
                                        Through his "Awakening Challenge" lectures at prestigious institutions worldwide, including Tribhuvan
                                        University in Nepal, Yoshida continues to inspire a global movement toward conscious evolution and universal peace.
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Cosmic Journey Timeline */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="card bg-slate-900/10 backdrop-blur-sm mb-16"
                    >
                        <h3 className="text-3xl font-extralight tracking-wide text-white mb-12 text-center" style={{ fontFamily: 'var(--font-cinzel)' }}>
                            Milestones & Achievements
                        </h3>

                        {/* Vertical Timeline - Centered with Alternating Sides */}
                        <div className="relative max-w-6xl mx-auto">
                            {/* Timeline Line - Centered */}
                            <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-400 via-blue-500 to-blue-600"></div>

                            {/* Timeline Items */}
                            <div className="space-y-6">
                                {achievements.map((achievement, index) => {
                                    const isLeft = index % 2 === 0;
                                    return (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, x: isLeft ? -200 : 200, y: 50 }}
                                            whileInView={{ opacity: 1, x: 0, y: 0 }}
                                            viewport={{ once: true, amount: 0.3, margin: "0px 0px -50px 0px" }}
                                            transition={{
                                                duration: 0.8,
                                                delay: index * 0.08,
                                                ease: "easeOut"
                                            }}
                                            className={`relative flex ${isLeft ? 'justify-start' : 'justify-end'}`}
                                        >
                                            {/* Content Card */}
                                            <div className={`w-5/12 relative`}>
                                                <div className={`bg-white/5 rounded-lg p-6 border border-white/10 hover:border-blue-400/30 transition-all duration-300 hover:bg-white/10 group relative ${isLeft ? 'mr-4' : 'ml-4'}`}>
                                                    <div className="flex items-baseline gap-3 mb-2">
                                                        <span className="text-blue-300 font-semibold text-lg tracking-wide" style={{ fontFamily: 'var(--font-cinzel)' }}>
                                                            {achievement.year}
                                                        </span>
                                                    </div>
                                                    <p className="text-white/90 font-light leading-relaxed text-base" style={{ fontFamily: 'var(--font-lora)' }}>
                                                        {achievement.event}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Timeline Dot - Centered */}
                                            <div className="absolute left-1/2 transform -translate-x-1/2 top-6 w-5 h-5 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full border-4 border-slate-900 z-10 hover:scale-125 transition-transform duration-300"></div>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </div>
                    </motion.div>

                    {/* Cosmic Philosophy */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1.2 }}
                        className="card bg-slate-900/10 backdrop-blur-sm"
                    >
                        <h3 className="text-3xl font-extralight tracking-wide text-white mb-8 text-center" style={{ fontFamily: 'var(--font-cinzel)' }}>
                            The <span className="text-cosmic">Cosmic Philosophy</span>
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="text-center group">
                                <motion.div
                                    whileHover={{ scale: 1.2, rotate: 180 }}
                                    className="w-16 h-16 mx-auto mb-4 flex items-center justify-center"
                                    transition={{ duration: 0.3 }}
                                >
                                    <ArrowPathRoundedSquareIcon className="w-16 h-16 text-white" />
                                </motion.div>
                                <h4 className="text-xl font-light text-white mb-3" style={{ fontFamily: 'var(--font-cinzel)' }}>Infinite Consciousness</h4>
                                <p className="text-white/70 font-light leading-relaxed" style={{ fontFamily: 'var(--font-lora)' }}>
                                    Consciousness is not produced by the brain—it&apos;s the fundamental fabric of reality itself.
                                </p>
                            </div>

                            <div className="text-center group">
                                <motion.div
                                    whileHover={{ scale: 1.2, rotate: 360 }}
                                    className="w-16 h-16 mx-auto mb-4 flex items-center justify-center"
                                    transition={{ duration: 0.3 }}
                                >
                                    <BeakerIcon className="w-16 h-16 text-white" />
                                </motion.div>
                                <h4 className="text-xl font-light text-white mb-3" style={{ fontFamily: 'var(--font-cinzel)' }}>Sacred Science</h4>
                                <p className="text-white/70 font-light leading-relaxed" style={{ fontFamily: 'var(--font-lora)' }}>
                                    Where quantum physics meets ancient wisdom, revealing the unity of all existence.
                                </p>
                            </div>

                            <div className="text-center group">
                                <motion.div
                                    whileHover={{ scale: 1.2, rotate: -180 }}
                                    className="w-16 h-16 mx-auto mb-4 flex items-center justify-center"
                                    transition={{ duration: 0.3 }}
                                >
                                    <SparklesIcon className="w-16 h-16 text-white" />
                                </motion.div>
                                <h4 className="text-xl font-light text-white mb-3" style={{ fontFamily: 'var(--font-cinzel)' }}>Cosmic Awakening</h4>
                                <p className="text-white/70 font-light leading-relaxed" style={{ fontFamily: 'var(--font-lora)' }}>
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
