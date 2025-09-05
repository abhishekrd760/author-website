'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import LoadingSpinner from './LoadingSpinner'

interface PageTransitionProps {
    children: React.ReactNode
}

const pageVariants = {
    initial: (pathname: string) => ({
        opacity: 0,
        y: pathname === '/' ? 30 : -30,
        scale: 0.98,
        rotateX: pathname === '/books' ? 10 : 0
    }),
    in: {
        opacity: 1,
        y: 0,
        scale: 1,
        rotateX: 0
    },
    out: (pathname: string) => ({
        opacity: 0,
        y: pathname === '/' ? -30 : 30,
        scale: 1.02,
        rotateX: pathname === '/books' ? -10 : 0
    })
}

const pageTransition = {
    duration: 0.6
}

const PageTransition = ({ children }: PageTransitionProps) => {
    const pathname = usePathname()
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        const timer = setTimeout(() => setIsLoading(false), 300)
        return () => clearTimeout(timer)
    }, [pathname])

    return (
        <>
            <AnimatePresence>
                {isLoading && <LoadingSpinner />}
            </AnimatePresence>
            <AnimatePresence mode="wait" initial={false}>
                <motion.div
                    key={pathname}
                    custom={pathname}
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={pageTransition}
                    className="w-full"
                >
                    {children}
                </motion.div>
            </AnimatePresence>
        </>
    )
}

export default PageTransition
