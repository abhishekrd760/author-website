'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface Star {
    id: number
    x: number
    y: number
    size: number
    duration: number
    delay: number
}

const CosmicBackground = () => {
    const [stars, setStars] = useState<Star[]>([])

    useEffect(() => {
        const generateStars = () => {
            const newStars: Star[] = []
            for (let i = 0; i < 50; i++) {
                newStars.push({
                    id: i,
                    x: Math.random() * 100,
                    y: Math.random() * 100,
                    size: Math.random() * 3 + 1,
                    duration: Math.random() * 3 + 2,
                    delay: Math.random() * 2
                })
            }
            setStars(newStars)
        }

        generateStars()
    }, [])

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
            {/* Animated Stars */}
            {stars.map((star) => (
                <motion.div
                    key={star.id}
                    className="absolute bg-white rounded-full opacity-60"
                    style={{
                        left: `${star.x}%`,
                        top: `${star.y}%`,
                        width: `${star.size}px`,
                        height: `${star.size}px`,
                    }}
                    animate={{
                        opacity: [0.2, 1, 0.2],
                        scale: [1, 1.2, 1],
                    }}
                    transition={{
                        duration: star.duration,
                        repeat: Infinity,
                        delay: star.delay,
                        ease: "easeInOut",
                    }}
                />
            ))}

            {/* Floating Cosmic Particles */}
            <motion.div
                className="absolute top-1/4 left-1/4 w-8 h-8 bg-purple-500/30 rounded-full"
                animate={{
                    y: [-20, 20, -20],
                    x: [-10, 10, -10],
                    scale: [1, 1.1, 1],
                    opacity: [0.3, 0.7, 0.3],
                }}
                transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            <motion.div
                className="absolute top-1/3 right-1/4 w-6 h-6 bg-blue-500/40 rounded-full"
                animate={{
                    y: [20, -20, 20],
                    x: [10, -10, 10],
                    scale: [1, 1.2, 1],
                    opacity: [0.4, 0.8, 0.4],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1,
                }}
            />

            <motion.div
                className="absolute bottom-1/3 left-1/3 w-10 h-10 bg-purple-400/20 rounded-full"
                animate={{
                    y: [-15, 15, -15],
                    x: [-15, 15, -15],
                    scale: [1, 1.3, 1],
                    opacity: [0.2, 0.6, 0.2],
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2,
                }}
            />

            <motion.div
                className="absolute top-2/3 right-1/3 w-4 h-4 bg-blue-400/50 rounded-full"
                animate={{
                    y: [10, -25, 10],
                    x: [-5, 15, -5],
                    scale: [1, 1.4, 1],
                    opacity: [0.5, 0.9, 0.5],
                }}
                transition={{
                    duration: 7,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5,
                }}
            />

            <motion.div
                className="absolute bottom-1/4 right-1/2 w-12 h-12 bg-purple-300/15 rounded-full"
                animate={{
                    y: [-30, 30, -30],
                    x: [20, -20, 20],
                    scale: [1, 1.1, 1],
                    opacity: [0.15, 0.5, 0.15],
                }}
                transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 3,
                }}
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/10 to-transparent" />
        </div>
    )
}

export default CosmicBackground
