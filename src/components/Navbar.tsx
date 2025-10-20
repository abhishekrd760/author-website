'use client'

import Link from 'next/link'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { useLanguage } from '@/lib/LanguageProvider'

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const pathname = usePathname()
    const { language, toggleLanguage, t } = useLanguage()

    const navItems = [
        { href: '/', label: t('Home') },
        { href: '/about', label: t('About') },
        { href: '/books', label: t('Books') },
        { href: '/reviews', label: t('Reviews') },
        { href: '/contact', label: t('Contact') },
    ]

    return (
        <nav className="bg-black/20 backdrop-blur-lg shadow-lg sticky top-0 z-40 border-b border-white/10">
            <div className="container-custom">
                <div className="flex justify-between items-center py-4">
                    {/* Logo */}
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Link href="/" className="text-2xl font-cinzel tracking-wide text-white cursor-pointer">
                            {t('Beyond Time')}
                        </Link>
                    </motion.div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-6">
                        {navItems.map((item, index) => (
                            <motion.div
                                key={item.href}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                                className="relative"
                            >
                                <Link
                                    href={item.href}
                                    className={`relative text-white/80 hover:text-white font-light transition-all duration-300 group px-4 py-2 rounded-full cursor-pointer ${pathname === item.href ? 'text-white bg-blue-500/20 border border-blue-400/30' : ''
                                        }`}
                                >
                                    {item.label}
                                    <motion.span
                                        className="absolute inset-x-0 -bottom-1 h-0.5 bg-gradient-to-r from-blue-400 to-blue-600 origin-left"
                                        initial={{ scaleX: 0 }}
                                        whileHover={{ scaleX: 1 }}
                                        transition={{ duration: 0.3 }}
                                    />
                                </Link>
                            </motion.div>
                        ))}
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={toggleLanguage}
                            aria-label={t('Toggle language')}
                            className="relative px-4 py-2 rounded-full border border-white/20 text-white/80 hover:text-white hover:border-white/60 transition-all duration-300 flex items-center gap-2"
                        >
                            <span className="text-xs uppercase tracking-widest font-semibold">
                                {language === 'en' ? 'EN' : '日本語'}
                            </span>
                            <span className="text-xs text-white/60">
                                {language === 'en' ? t('Japanese') : t('English')}
                            </span>
                        </motion.button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden flex flex-col space-y-1 cursor-pointer"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label={t('Toggle menu')}
                    >
                        <span className={`w-6 h-0.5 bg-white/80 transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
                        <span className={`w-6 h-0.5 bg-white/80 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`} />
                        <span className={`w-6 h-0.5 bg-white/80 transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
                    </button>
                </div>

                {/* Mobile Navigation */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="md:hidden border-t border-white/10 bg-black/40 backdrop-blur-lg rounded-b-lg"
                        >
                            <div className="py-4 space-y-4">
                                {navItems.map((item, index) => (
                                    <motion.div
                                        key={item.href}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.3, delay: index * 0.1 }}
                                    >
                                        <Link
                                            href={item.href}
                                            className={`block text-white/80 hover:text-white font-light transition-all duration-200 hover:translate-x-2 transform px-6 py-2 cursor-pointer ${pathname === item.href ? 'text-white border-l-2 border-blue-400 bg-blue-500/10' : ''
                                                }`}
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            {item.label}
                                        </Link>
                                    </motion.div>
                                ))}
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.3, delay: navItems.length * 0.1 }}
                                    className="px-6"
                                >
                                    <button
                                        onClick={() => {
                                            toggleLanguage()
                                            setIsMenuOpen(false)
                                        }}
                                        className="w-full flex items-center justify-between px-4 py-2 rounded-full border border-white/20 text-white/80 hover:text-white hover:border-white/60 transition-all duration-300"
                                        aria-label={t('Toggle language')}
                                    >
                                        <span className="text-xs uppercase tracking-widest font-semibold">
                                            {language === 'en' ? 'EN' : '日本語'}
                                        </span>
                                        <span className="text-xs text-white/60">
                                            {language === 'en' ? t('Japanese') : t('English')}
                                        </span>
                                    </button>
                                </motion.div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </nav>
    )
}

export default Navbar
