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

            {/* Removed floating cosmic particles for cleaner background */}

            {/* Removed gradient overlay for transparent background */}
        </div>
    )
}

export default CosmicBackground
