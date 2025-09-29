'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface Text3DProps {
    text: string
    className?: string
    depth?: number
}

const Text3D: React.FC<Text3DProps> = ({ text, className = "", depth = 3 }) => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({
                x: (e.clientX / window.innerWidth - 0.5) * 10,
                y: (e.clientY / window.innerHeight - 0.5) * 10,
            })
        }

        window.addEventListener('mousemove', handleMouseMove)
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [])

    return (
        <div className={`relative ${className}`}>
            {/* Shadow layers for 3D depth */}
            {Array.from({ length: depth }).map((_, i) => (
                <motion.span
                    key={i}
                    className="absolute inset-0 text-blue-900/20 font-bold select-none"
                    style={{
                        transform: `translate(${i * 2}px, ${i * 2}px)`,
                        zIndex: depth - i,
                    }}
                    animate={{
                        x: mousePosition.x * (i * 0.1),
                        y: mousePosition.y * (i * 0.1),
                    }}
                    transition={{
                        type: "spring",
                        damping: 15,
                        stiffness: 100,
                    }}
                >
                    {text}
                </motion.span>
            ))}

            {/* Main text layer */}
            <motion.span
                className="relative z-10 font-bold bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent"
                animate={{
                    x: mousePosition.x * 0.5,
                    y: mousePosition.y * 0.5,
                }}
                transition={{
                    type: "spring",
                    damping: 20,
                    stiffness: 100,
                }}
                whileHover={{
                    scale: 1.05,
                    transition: { duration: 0.2 }
                }}
            >
                {text}
            </motion.span>

            {/* Highlight effect */}
            <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatDelay: 5,
                    ease: "easeInOut",
                }}
            />
        </div>
    )
}

export default Text3D
