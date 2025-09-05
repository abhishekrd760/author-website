'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const Floating3DBooks = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({
                x: (e.clientX / window.innerWidth - 0.5) * 20,
                y: (e.clientY / window.innerHeight - 0.5) * 20,
            })
        }

        window.addEventListener('mousemove', handleMouseMove)
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [])

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
            {/* Spinning Geometric Shapes - Keep existing ones */}
            <motion.div
                className="absolute top-1/4 left-1/2 w-32 h-32"
                animate={{
                    rotateX: [0, 360],
                    rotateY: [0, 360],
                    rotateZ: [0, 180],
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "linear",
                }}
                style={{
                    transform: `translateX(-50%) translateY(-50%) translateX(${mousePosition.x * 0.3}px) translateY(${mousePosition.y * 0.3}px)`,
                    zIndex: -10,
                }}
            >
                <div className="w-full h-full bg-gradient-to-br from-yellow-400/20 to-orange-500/20 rounded-full shadow-lg opacity-30"></div>
            </motion.div>

            <motion.div
                className="absolute top-3/4 right-1/2 w-24 h-24"
                animate={{
                    rotateX: [0, -360],
                    rotateY: [0, 360],
                    rotateZ: [0, -180],
                }}
                transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "linear",
                    delay: 3,
                }}
                style={{
                    transform: `translateX(50%) translateY(-50%) translateX(${mousePosition.x * 0.4}px) translateY(${mousePosition.y * 0.4}px)`,
                    zIndex: -10,
                }}
            >
                <div className="w-full h-full bg-gradient-to-br from-cyan-400/20 to-blue-500/20 transform rotate-45 shadow-lg opacity-25"></div>
            </motion.div>

            <motion.div
                className="absolute top-1/2 right-1/3 w-40 h-40"
                animate={{
                    rotateX: [0, 180, 360],
                    rotateY: [0, -180, -360],
                    scale: [1, 1.2, 0.8, 1],
                }}
                transition={{
                    duration: 18,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 6,
                }}
                style={{
                    transform: `translateX(50%) translateY(-50%) translateX(${mousePosition.x * 0.2}px) translateY(${mousePosition.y * 0.2}px)`,
                    zIndex: -10,
                }}
            >
                <div className="w-full h-full bg-gradient-to-br from-purple-400/15 to-pink-500/15 rounded-lg shadow-xl opacity-20"></div>
            </motion.div>

            {/* Additional Spinning Cards/Shapes */}
            <motion.div
                className="absolute top-1/6 left-1/3 w-48 h-48"
                animate={{
                    rotateX: [0, 360],
                    rotateY: [0, -360],
                    rotateZ: [0, 180],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                    delay: 2,
                }}
                style={{
                    transform: `translateX(-50%) translateY(-50%) translateX(${mousePosition.x * 0.25}px) translateY(${mousePosition.y * 0.25}px)`,
                    zIndex: -10,
                }}
            >
                <div className="w-full h-full bg-gradient-to-br from-red-400/15 to-pink-500/15 rounded-full shadow-lg opacity-25"></div>
            </motion.div>

            <motion.div
                className="absolute bottom-1/4 left-1/2 w-36 h-36"
                animate={{
                    rotateX: [0, -360],
                    rotateY: [0, 360],
                    rotateZ: [0, -180],
                }}
                transition={{
                    duration: 16,
                    repeat: Infinity,
                    ease: "linear",
                    delay: 4,
                }}
                style={{
                    transform: `translateX(-50%) translateY(50%) translateX(${mousePosition.x * 0.35}px) translateY(${mousePosition.y * 0.35}px)`,
                    zIndex: -10,
                }}
            >
                <div className="w-full h-full bg-gradient-to-br from-green-400/20 to-teal-500/20 transform rotate-45 shadow-lg opacity-25"></div>
            </motion.div>

            <motion.div
                className="absolute top-2/3 right-1/4 w-28 h-28"
                animate={{
                    rotateX: [0, 180, 360],
                    rotateY: [0, -180, -360],
                    scale: [1, 1.3, 0.7, 1],
                }}
                transition={{
                    duration: 22,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1,
                }}
                style={{
                    transform: `translateX(50%) translateY(-50%) translateX(${mousePosition.x * 0.15}px) translateY(${mousePosition.y * 0.15}px)`,
                    zIndex: -10,
                }}
            >
                <div className="w-full h-full bg-gradient-to-br from-indigo-400/15 to-purple-500/15 rounded-lg shadow-xl opacity-30"></div>
            </motion.div>

            <motion.div
                className="absolute bottom-1/6 left-2/3 w-44 h-44"
                animate={{
                    rotateX: [0, 360],
                    rotateY: [0, 360],
                    rotateZ: [0, 180],
                }}
                transition={{
                    duration: 14,
                    repeat: Infinity,
                    ease: "linear",
                    delay: 5,
                }}
                style={{
                    transform: `translateX(-50%) translateY(50%) translateX(${mousePosition.x * 0.4}px) translateY(${mousePosition.y * 0.4}px)`,
                    zIndex: -10,
                }}
            >
                <div className="w-full h-full bg-gradient-to-br from-orange-400/20 to-red-500/20 rounded-full shadow-lg opacity-25"></div>
            </motion.div>

            <motion.div
                className="absolute top-1/3 left-1/4 w-32 h-32"
                animate={{
                    rotateX: [0, -360],
                    rotateY: [0, 360],
                    rotateZ: [0, -180],
                }}
                transition={{
                    duration: 18,
                    repeat: Infinity,
                    ease: "linear",
                    delay: 7,
                }}
                style={{
                    transform: `translateX(-50%) translateY(-50%) translateX(${mousePosition.x * 0.3}px) translateY(${mousePosition.y * 0.3}px)`,
                    zIndex: -10,
                }}
            >
                <div className="w-full h-full bg-gradient-to-br from-teal-400/15 to-cyan-500/15 transform rotate-45 shadow-lg opacity-25"></div>
            </motion.div>

            {/* Left Side Elements */}
            <motion.div
                className="absolute top-1/6 left-0 w-36 h-36"
                animate={{
                    rotateX: [0, 360],
                    rotateY: [0, -360],
                    rotateZ: [0, 180],
                }}
                transition={{
                    duration: 22,
                    repeat: Infinity,
                    ease: "linear",
                    delay: 1,
                }}
                style={{
                    transform: `translateX(20px) translateY(-50%) translateX(${mousePosition.x * 0.2}px) translateY(${mousePosition.y * 0.2}px)`,
                    zIndex: -10,
                }}
            >
                <div className="w-full h-full bg-gradient-to-br from-emerald-400/20 to-green-500/20 rounded-full shadow-lg opacity-25"></div>
            </motion.div>

            <motion.div
                className="absolute top-1/2 left-0 w-28 h-28"
                animate={{
                    rotateX: [0, -360],
                    rotateY: [0, 360],
                    rotateZ: [0, -180],
                }}
                transition={{
                    duration: 19,
                    repeat: Infinity,
                    ease: "linear",
                    delay: 4,
                }}
                style={{
                    transform: `translateX(15px) translateY(-50%) translateX(${mousePosition.x * 0.25}px) translateY(${mousePosition.y * 0.25}px)`,
                    zIndex: -10,
                }}
            >
                <div className="w-full h-full bg-gradient-to-br from-violet-400/20 to-purple-500/20 transform rotate-45 shadow-lg opacity-30"></div>
            </motion.div>

            <motion.div
                className="absolute bottom-1/4 left-0 w-40 h-40"
                animate={{
                    rotateX: [0, 360],
                    rotateY: [0, 360],
                    rotateZ: [0, 180],
                    scale: [1, 1.1, 0.9, 1],
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 8,
                }}
                style={{
                    transform: `translateX(25px) translateY(50%) translateX(${mousePosition.x * 0.15}px) translateY(${mousePosition.y * 0.15}px)`,
                    zIndex: -10,
                }}
            >
                <div className="w-full h-full bg-gradient-to-br from-rose-400/15 to-red-500/15 rounded-lg shadow-xl opacity-25"></div>
            </motion.div>

            <motion.div
                className="absolute top-3/4 left-0 w-32 h-32"
                animate={{
                    rotateX: [0, -360],
                    rotateY: [0, -360],
                    rotateZ: [0, -180],
                }}
                transition={{
                    duration: 17,
                    repeat: Infinity,
                    ease: "linear",
                    delay: 11,
                }}
                style={{
                    transform: `translateX(30px) translateY(-50%) translateX(${mousePosition.x * 0.3}px) translateY(${mousePosition.y * 0.3}px)`,
                    zIndex: -10,
                }}
            >
                <div className="w-full h-full bg-gradient-to-br from-amber-400/20 to-yellow-500/20 rounded-full shadow-lg opacity-25"></div>
            </motion.div>

            {/* Right Side Elements */}
            <motion.div
                className="absolute top-1/6 right-0 w-44 h-44"
                animate={{
                    rotateX: [0, 360],
                    rotateY: [0, 360],
                    rotateZ: [0, 180],
                }}
                transition={{
                    duration: 26,
                    repeat: Infinity,
                    ease: "linear",
                    delay: 2,
                }}
                style={{
                    transform: `translateX(-20px) translateY(-50%) translateX(${mousePosition.x * 0.2}px) translateY(${mousePosition.y * 0.2}px)`,
                    zIndex: -10,
                }}
            >
                <div className="w-full h-full bg-gradient-to-br from-sky-400/15 to-blue-500/15 rounded-lg shadow-xl opacity-25"></div>
            </motion.div>

            <motion.div
                className="absolute top-2/5 right-0 w-30 h-30"
                animate={{
                    rotateX: [0, -360],
                    rotateY: [0, 360],
                    rotateZ: [0, -180],
                }}
                transition={{
                    duration: 21,
                    repeat: Infinity,
                    ease: "linear",
                    delay: 6,
                }}
                style={{
                    transform: `translateX(-25px) translateY(-50%) translateX(${mousePosition.x * 0.25}px) translateY(${mousePosition.y * 0.25}px)`,
                    zIndex: -10,
                }}
            >
                <div className="w-full h-full bg-gradient-to-br from-fuchsia-400/20 to-pink-500/20 transform rotate-45 shadow-lg opacity-30"></div>
            </motion.div>

            <motion.div
                className="absolute bottom-1/3 right-0 w-38 h-38"
                animate={{
                    rotateX: [0, 360],
                    rotateY: [0, -360],
                    rotateZ: [0, 180],
                    scale: [1, 1.2, 0.8, 1],
                }}
                transition={{
                    duration: 23,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 9,
                }}
                style={{
                    transform: `translateX(-30px) translateY(50%) translateX(${mousePosition.x * 0.15}px) translateY(${mousePosition.y * 0.15}px)`,
                    zIndex: -10,
                }}
            >
                <div className="w-full h-full bg-gradient-to-br from-lime-400/15 to-green-500/15 rounded-full shadow-lg opacity-25"></div>
            </motion.div>

            <motion.div
                className="absolute top-4/5 right-0 w-34 h-34"
                animate={{
                    rotateX: [0, -360],
                    rotateY: [0, 360],
                    rotateZ: [0, -180],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                    delay: 13,
                }}
                style={{
                    transform: `translateX(-35px) translateY(-50%) translateX(${mousePosition.x * 0.3}px) translateY(${mousePosition.y * 0.3}px)`,
                    zIndex: -10,
                }}
            >
                <div className="w-full h-full bg-gradient-to-br from-slate-400/20 to-gray-500/20 transform rotate-45 shadow-lg opacity-25"></div>
            </motion.div>

            {/* Left Side Rectangular Cuboids */}
            <motion.div
                className="absolute top-1/3 left-0 w-20 h-50"
                animate={{
                    rotateX: [0, 360],
                    rotateY: [0, 360],
                    rotateZ: [0, 180],
                }}
                transition={{
                    duration: 27,
                    repeat: Infinity,
                    ease: "linear",
                    delay: 3,
                }}
                style={{
                    transform: `translateX(10px) translateY(-50%) translateX(${mousePosition.x * 0.2}px) translateY(${mousePosition.y * 0.2}px)`,
                    transformStyle: 'preserve-3d',
                    zIndex: -10,
                }}
            >
                <div className="w-full h-full bg-gradient-to-br from-indigo-500/15 to-blue-600/15 rounded-sm shadow-xl opacity-20 relative">
                    <div className="absolute -top-1 -left-1 w-full h-full bg-gradient-to-br from-indigo-400/10 to-blue-500/10 rounded-sm opacity-25"></div>
                    <div className="absolute top-0 left-0 w-full h-1 bg-white/10 rounded-t-sm"></div>
                </div>
            </motion.div>

            <motion.div
                className="absolute bottom-1/5 left-0 w-24 h-60"
                animate={{
                    rotateX: [0, -360],
                    rotateY: [0, 360],
                    rotateZ: [0, -180],
                }}
                transition={{
                    duration: 32,
                    repeat: Infinity,
                    ease: "linear",
                    delay: 7,
                }}
                style={{
                    transform: `translateX(15px) translateY(50%) translateX(${mousePosition.x * 0.25}px) translateY(${mousePosition.y * 0.25}px)`,
                    transformStyle: 'preserve-3d',
                    zIndex: -10,
                }}
            >
                <div className="w-full h-full bg-gradient-to-br from-emerald-500/15 to-teal-600/15 rounded-sm shadow-xl opacity-18 relative">
                    <div className="absolute -top-1 -left-1 w-full h-full bg-gradient-to-br from-emerald-400/10 to-teal-500/10 rounded-sm opacity-25"></div>
                    <div className="absolute top-0 left-0 w-full h-1 bg-white/10 rounded-t-sm"></div>
                </div>
            </motion.div>

            {/* Right Side Rectangular Cuboids */}
            <motion.div
                className="absolute top-1/4 right-0 w-22 h-55"
                animate={{
                    rotateX: [0, 360],
                    rotateY: [0, -360],
                    rotateZ: [0, 180],
                }}
                transition={{
                    duration: 29,
                    repeat: Infinity,
                    ease: "linear",
                    delay: 5,
                }}
                style={{
                    transform: `translateX(-10px) translateY(-50%) translateX(${mousePosition.x * 0.2}px) translateY(${mousePosition.y * 0.2}px)`,
                    transformStyle: 'preserve-3d',
                    zIndex: -10,
                }}
            >
                <div className="w-full h-full bg-gradient-to-br from-rose-500/15 to-pink-600/15 rounded-sm shadow-xl opacity-20 relative">
                    <div className="absolute -top-1 -left-1 w-full h-full bg-gradient-to-br from-rose-400/10 to-pink-500/10 rounded-sm opacity-25"></div>
                    <div className="absolute top-0 left-0 w-full h-1 bg-white/10 rounded-t-sm"></div>
                </div>
            </motion.div>

            <motion.div
                className="absolute bottom-1/6 right-0 w-26 h-65"
                animate={{
                    rotateX: [0, -360],
                    rotateY: [0, 360],
                    rotateZ: [0, -180],
                }}
                transition={{
                    duration: 31,
                    repeat: Infinity,
                    ease: "linear",
                    delay: 10,
                }}
                style={{
                    transform: `translateX(-20px) translateY(50%) translateX(${mousePosition.x * 0.25}px) translateY(${mousePosition.y * 0.25}px)`,
                    transformStyle: 'preserve-3d',
                    zIndex: -10,
                }}
            >
                <div className="w-full h-full bg-gradient-to-br from-amber-500/15 to-orange-600/15 rounded-sm shadow-xl opacity-18 relative">
                    <div className="absolute -top-1 -left-1 w-full h-full bg-gradient-to-br from-amber-400/10 to-orange-500/10 rounded-sm opacity-25"></div>
                    <div className="absolute top-0 left-0 w-full h-1 bg-white/10 rounded-t-sm"></div>
                </div>
            </motion.div>

            {/* Rectangular Cuboids */}
            <motion.div
                className="absolute top-1/5 left-1/2 w-24 h-48"
                animate={{
                    rotateX: [0, 360],
                    rotateY: [0, 360],
                    rotateZ: [0, 180],
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "linear",
                    delay: 0,
                }}
                style={{
                    transform: `translateX(-50%) translateY(-50%) translateX(${mousePosition.x * 0.2}px) translateY(${mousePosition.y * 0.2}px)`,
                    transformStyle: 'preserve-3d',
                    zIndex: -10,
                }}
            >
                <div className="w-full h-full bg-gradient-to-br from-blue-500/15 to-indigo-600/15 rounded-sm shadow-xl opacity-20 relative">
                    <div className="absolute -top-1 -left-1 w-full h-full bg-gradient-to-br from-blue-400/10 to-indigo-500/10 rounded-sm opacity-30"></div>
                    <div className="absolute top-0 left-0 w-full h-1 bg-white/10 rounded-t-sm"></div>
                </div>
            </motion.div>

            <motion.div
                className="absolute bottom-1/3 right-1/3 w-32 h-64"
                animate={{
                    rotateX: [0, -360],
                    rotateY: [0, 360],
                    rotateZ: [0, -180],
                }}
                transition={{
                    duration: 30,
                    repeat: Infinity,
                    ease: "linear",
                    delay: 3,
                }}
                style={{
                    transform: `translateX(50%) translateY(50%) translateX(${mousePosition.x * 0.25}px) translateY(${mousePosition.y * 0.25}px)`,
                    transformStyle: 'preserve-3d',
                    zIndex: -10,
                }}
            >
                <div className="w-full h-full bg-gradient-to-br from-purple-500/15 to-pink-600/15 rounded-sm shadow-xl opacity-18 relative">
                    <div className="absolute -top-1 -left-1 w-full h-full bg-gradient-to-br from-purple-400/10 to-pink-500/10 rounded-sm opacity-25"></div>
                    <div className="absolute top-0 left-0 w-full h-1 bg-white/10 rounded-t-sm"></div>
                </div>
            </motion.div>

            <motion.div
                className="absolute top-3/4 left-1/3 w-20 h-40"
                animate={{
                    rotateX: [0, 360],
                    rotateY: [0, -360],
                    rotateZ: [0, 180],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                    delay: 6,
                }}
                style={{
                    transform: `translateX(-50%) translateY(-50%) translateX(${mousePosition.x * 0.3}px) translateY(${mousePosition.y * 0.3}px)`,
                    transformStyle: 'preserve-3d',
                    zIndex: -10,
                }}
            >
                <div className="w-full h-full bg-gradient-to-br from-green-500/15 to-teal-600/15 rounded-sm shadow-xl opacity-25 relative">
                    <div className="absolute -top-1 -left-1 w-full h-full bg-gradient-to-br from-green-400/10 to-teal-500/10 rounded-sm opacity-30"></div>
                    <div className="absolute top-0 left-0 w-full h-1 bg-white/10 rounded-t-sm"></div>
                </div>
            </motion.div>

            <motion.div
                className="absolute top-1/2 right-1/4 w-28 h-56"
                animate={{
                    rotateX: [0, -360],
                    rotateY: [0, 360],
                    rotateZ: [0, -180],
                }}
                transition={{
                    duration: 28,
                    repeat: Infinity,
                    ease: "linear",
                    delay: 9,
                }}
                style={{
                    transform: `translateX(50%) translateY(-50%) translateX(${mousePosition.x * 0.2}px) translateY(${mousePosition.y * 0.2}px)`,
                    transformStyle: 'preserve-3d',
                    zIndex: -10,
                }}
            >
                <div className="w-full h-full bg-gradient-to-br from-red-500/15 to-orange-600/15 rounded-sm shadow-xl opacity-20 relative">
                    <div className="absolute -top-1 -left-1 w-full h-full bg-gradient-to-br from-red-400/10 to-orange-500/10 rounded-sm opacity-28"></div>
                    <div className="absolute top-0 left-0 w-full h-1 bg-white/10 rounded-t-sm"></div>
                </div>
            </motion.div>

            <motion.div
                className="absolute bottom-1/5 left-2/3 w-36 h-72"
                animate={{
                    rotateX: [0, 360],
                    rotateY: [0, -360],
                    rotateZ: [0, 180],
                }}
                transition={{
                    duration: 24,
                    repeat: Infinity,
                    ease: "linear",
                    delay: 12,
                }}
                style={{
                    transform: `translateX(-50%) translateY(50%) translateX(${mousePosition.x * 0.25}px) translateY(${mousePosition.y * 0.25}px)`,
                    transformStyle: 'preserve-3d',
                    zIndex: -10,
                }}
            >
                <div className="w-full h-full bg-gradient-to-br from-cyan-500/15 to-blue-600/15 rounded-sm shadow-xl opacity-18 relative">
                    <div className="absolute -top-1 -left-1 w-full h-full bg-gradient-to-br from-cyan-400/10 to-blue-500/10 rounded-sm opacity-25"></div>
                    <div className="absolute top-0 left-0 w-full h-1 bg-white/10 rounded-t-sm"></div>
                </div>
            </motion.div>
        </div>
    )
}

export default Floating3DBooks
