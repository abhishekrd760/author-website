'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const About = () => {
    const achievements = [
        { year: '2020', event: 'Published first novel "The Midnight Garden"' },
        { year: '2021', event: 'Reached New York Times Bestseller List' },
        { year: '2022', event: 'Published "Whispers in the Wind" - Fantasy debut' },
        { year: '2023', event: 'Won Literary Excellence Award' },
        { year: '2024', event: 'Published "City of Dreams" - Contemporary romance' },
        { year: '2024', event: 'Over 1 million books sold worldwide' }
    ]

    return (
        <div className="min-h-screen bg-gradient-to-br from-red-900 via-gray-900 to-black relative overflow-hidden">
            {/* Japanese Pattern Background */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    backgroundSize: '60px 60px'
                }}></div>
            </div>

            {/* Floating Japanese Elements */}
            <motion.div
                animate={{
                    rotate: 360,
                    scale: [1, 1.1, 1]
                }}
                transition={{
                    rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                    scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                }}
                className="absolute top-20 right-20 text-6xl opacity-10"
            >
                桜
            </motion.div>

            <motion.div
                animate={{
                    rotate: -360,
                    scale: [1, 0.9, 1]
                }}
                transition={{
                    rotate: { duration: 25, repeat: Infinity, ease: "linear" },
                    scale: { duration: 5, repeat: Infinity, ease: "easeInOut" }
                }}
                className="absolute bottom-20 left-20 text-4xl opacity-10"
            >
                書
            </motion.div>
            {/* Hero Section */}
            <section className="py-20 bg-gradient-to-r from-red-800 via-red-900 to-black text-white relative">
                <div className="container-custom relative">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center"
                    >
                        <h1 className="text-4xl lg:text-6xl font-bold mb-6" style={{ fontFamily: "'Noto Sans JP', 'MS Gothic', 'Hiragino Kaku Gothic Pro', sans-serif" }}>
                            作家 トリ・マンの世界
                        </h1>
                        <p className="text-xl lg:text-2xl text-red-100 max-w-3xl mx-auto mb-4" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>
                            言葉の旅、物語の世界、無限の可能性
                        </p>
                        <p className="text-lg text-red-200" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>
                            Tori Man - ベストセラー作家
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-16">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
                        {/* Author Photo */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            <div className="aspect-square max-w-md mx-auto rounded-lg overflow-hidden shadow-2xl border-4 border-red-600 relative">
                                {/* Japanese Corner Decorations */}
                                <div className="absolute -top-2 -left-2 w-6 h-6 border-t-4 border-l-4 border-red-400"></div>
                                <div className="absolute -top-2 -right-2 w-6 h-6 border-t-4 border-r-4 border-red-400"></div>
                                <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-4 border-l-4 border-red-400"></div>
                                <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-4 border-r-4 border-red-400"></div>

                                <Image
                                    src="/images/chor.jpeg"
                                    alt="Tori Man - Author"
                                    width={500}
                                    height={500}
                                    className="w-full h-full object-cover object-top"
                                    onError={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAwIiBoZWlnaHQ9IjUwMCIgdmlld0JveD0iMCAwIDUwMCA1MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI1MDAiIGhlaWdodD0iNTAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxjaXJjbGUgY3g9IjI1MCIgY3k9IjIwMCIgcj0iNTAiIGZpbGw9IiM5Q0E0QUIiLz4KPHBhdGggZD0iTTE3NSAzNTBIMzI1QzMyNSAzMTUgMjkwIDI4MCAyNTAgMjgwUzE3NSAzMTUgMTc1IDM1MEgiIGZpbGw9IiM5Q0E0QUIiLz4KPHN2Zz4K';
                                    }}
                                />
                            </div>
                        </motion.div>

                        {/* Bio */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="space-y-6"
                        >
                            <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-red-400" style={{ fontFamily: "'Noto Sans JP', 'MS Gothic', sans-serif" }}>
                                私の物語 <span className="text-lg text-red-300">My Story</span>
                            </h2>

                            <div className="prose prose-lg text-gray-300 space-y-4" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>
                                <p>
                                    私の世界へようこそ！私はトリ・マン、言葉の変革力を信じる情熱的なストーリーテラーです。
                                    私の作家としての旅は10年以上前に始まり、人間性とフィクションが提供する無限の可能性への insatiable curiosity に駆り立てられました。
                                </p>

                                <p>
                                    丘陵地帯とささやく森に囲まれた小さな町で生まれ育ち、私は幼い頃から本に安らぎを見出しました。
                                    地元の図書館は私の第二の家となり、古典文学から現代フィクションまであらゆるものを読み漁り、
                                    それぞれの本が世界とその中の私の位置づけについての理解を形作りました。
                                </p>

                                <p>
                                    コロンビア大学の英文学の学位を取得した後、私はさまざまな出版社で編集者として数年間働きました。
                                    この経験は、執筆の技術と出版業界についての貴重な洞察を与え、最終的に自分のストーリーテリングの夢を追求することをインスパイアしました。
                                </p>

                                <p>
                                    今日、私は世界中の読者と私の物語を共有することを祝福しています。私の小説は複数のジャンルに及び、
                                    大気のあるミステリーから壮大なファンタジー、心温まるロマンスまで。各本は愛の結晶であり、
                                    読者を新しい世界に運び、心に触れるように丁寧に作られています。
                                </p>
                            </div>

                            {/* Social Links */}
                            <div className="flex space-x-4 pt-6">
                                <motion.a
                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                    whileTap={{ scale: 0.95 }}
                                    href="https://twitter.com"
                                    className="text-red-400 hover:text-red-300 transition-colors p-2 bg-red-900/20 rounded-lg border border-red-800"
                                    aria-label="Twitter"
                                >
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                                    </svg>
                                </motion.a>
                                <motion.a
                                    whileHover={{ scale: 1.1, rotate: -5 }}
                                    whileTap={{ scale: 0.95 }}
                                    href="https://instagram.com"
                                    className="text-red-400 hover:text-red-300 transition-colors p-2 bg-red-900/20 rounded-lg border border-red-800"
                                    aria-label="Instagram"
                                >
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.014 5.367 18.647.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.324-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.297-3.324c.896-.896 2.047-1.386 3.324-1.386s2.448.49 3.324 1.297c.807.807 1.297 1.958 1.297 3.255s-.49 2.448-1.297 3.324c-.876.807-2.027 1.297-3.324 1.297zm7.908-8.015c-.807 0-1.297-.49-1.297-1.297S15.55 6.379 16.357 6.379s1.297.49 1.297 1.297-.49 1.297-1.297 1.297z" />
                                    </svg>
                                </motion.a>
                                <motion.a
                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                    whileTap={{ scale: 0.95 }}
                                    href="https://goodreads.com"
                                    className="text-red-400 hover:text-red-300 transition-colors p-2 bg-red-900/20 rounded-lg border border-red-800"
                                    aria-label="Goodreads"
                                >
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm6 9h-5v5h5v-5z" />
                                    </svg>
                                </motion.a>
                            </div>
                        </motion.div>
                    </div>

                    {/* Timeline */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="mb-16"
                    >
                        <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12 text-red-400" style={{ fontFamily: "'Noto Sans JP', 'MS Gothic', sans-serif" }}>
                            私の旅 <span className="text-lg text-red-300">My Journey</span>
                        </h2>

                        <div className="relative">
                            {/* Timeline line with Japanese styling */}
                            <div className="absolute left-4 md:left-1/2 md:transform md:-translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-red-600 via-red-500 to-red-800 shadow-lg"></div>

                            <div className="space-y-8">
                                {achievements.map((achievement, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.6, delay: index * 0.1 }}
                                        viewport={{ once: true }}
                                        className={`relative flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                                            }`}
                                    >
                                        {/* Timeline dot with Japanese styling */}
                                        <div className="absolute left-4 md:left-1/2 md:transform md:-translate-x-1/2 w-6 h-6 bg-red-500 rounded-full border-4 border-gray-800 shadow-lg z-10">
                                            <div className="w-full h-full bg-red-600 rounded-full animate-pulse"></div>
                                        </div>

                                        {/* Content with Japanese styling */}
                                        <div className={`ml-12 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}`}>
                                            <div className="bg-gradient-to-br from-red-900/80 to-gray-800/80 border border-red-700/50 rounded-lg p-6 shadow-xl backdrop-blur-sm">
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="text-2xl font-bold text-red-400" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>{achievement.year}</span>
                                                    <span className="text-red-500 text-sm" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>年</span>
                                                </div>
                                                <p className="text-gray-300" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>{achievement.event}</p>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="bg-gradient-to-br from-red-900/90 to-gray-800/90 border border-red-700/50 rounded-lg p-8 shadow-2xl backdrop-blur-sm"
                    >
                        <h2 className="text-3xl font-bold text-center mb-8 text-red-400" style={{ fontFamily: "'Noto Sans JP', 'MS Gothic', sans-serif" }}>
                            数字で見る <span className="text-lg text-red-300">By the Numbers</span>
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                className="p-4 bg-red-900/20 rounded-lg border border-red-700/30"
                            >
                                <div className="text-4xl font-bold text-red-400 mb-2" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>100万+</div>
                                <div className="text-gray-300" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>販売部数</div>
                            </motion.div>
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                className="p-4 bg-red-900/20 rounded-lg border border-red-700/30"
                            >
                                <div className="text-4xl font-bold text-red-400 mb-2" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>15+</div>
                                <div className="text-gray-300" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>言語</div>
                            </motion.div>
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                className="p-4 bg-red-900/20 rounded-lg border border-red-700/30"
                            >
                                <div className="text-4xl font-bold text-red-400 mb-2" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>50+</div>
                                <div className="text-gray-300" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>国々</div>
                            </motion.div>
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                className="p-4 bg-red-900/20 rounded-lg border border-red-700/30"
                            >
                                <div className="text-4xl font-bold text-red-400 mb-2" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>5</div>
                                <div className="text-gray-300" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>出版書籍</div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    )
}

export default About
