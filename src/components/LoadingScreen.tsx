'use client'

import { motion } from 'framer-motion'
import { useLanguage } from '@/lib/LanguageProvider'

const LoadingScreen = () => {
    const { t } = useLanguage()

    return (
        <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-b from-slate-900 via-blue-900 to-slate-900"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 1, delay: 2 }}
            style={{ pointerEvents: 'none' }}
        >
            <div className="text-center">
                <motion.div
                    className="w-16 h-16 mx-auto mb-6 border-4 border-blue-400/30 border-t-blue-400 rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
                <motion.p
                    className="text-white/80 font-light tracking-wide"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                >
                    {t('Loading the cosmos...')}
                </motion.p>
            </div>
        </motion.div>
    )
}

export default LoadingScreen
