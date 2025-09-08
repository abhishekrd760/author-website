'use client'

import { useEffect, useState } from 'react'

const CosmicCursor = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY })
            setIsVisible(true)
        }

        const handleMouseLeave = () => {
            setIsVisible(false)
        }

        document.addEventListener('mousemove', handleMouseMove)
        document.addEventListener('mouseleave', handleMouseLeave)

        return () => {
            document.removeEventListener('mousemove', handleMouseMove)
            document.removeEventListener('mouseleave', handleMouseLeave)
        }
    }, [])

    if (!isVisible) return null

    return (
        <div
            className="fixed pointer-events-none z-[9999] select-none"
            style={{
                left: mousePosition.x,
                top: mousePosition.y,
                transform: 'translate(-50%, -50%)',
                willChange: 'transform',
            }}
        >
            <div
                className="w-6 h-6 rounded-full animate-pulse"
                style={{
                    background: 'radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(168,85,247,0.8) 30%, rgba(59,130,246,0.6) 70%, rgba(147,51,234,0.4) 100%)',
                    boxShadow: `
                        0 0 10px rgba(168,85,247,0.6),
                        0 0 20px rgba(168,85,247,0.4),
                        0 0 30px rgba(168,85,247,0.3),
                        0 0 40px rgba(168,85,247,0.2)
                    `,
                    border: '1px solid rgba(255,255,255,0.3)'
                }}
            />
        </div>
    )
}

export default CosmicCursor
