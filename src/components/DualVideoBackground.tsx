'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Stars component with random group twinkling
function Stars() {
    const starsRef = useRef<THREE.Points>(null)
    const timeRef = useRef(0)

    const { positions, scales, colors } = useMemo(() => {
        const starCount = 8000 // Ultimate starfield density
        const positions = new Float32Array(starCount * 3)
        const scales = new Float32Array(starCount)
        const colors = new Float32Array(starCount * 3)

        for (let i = 0; i < starCount; i++) {
            // Spread stars in a large sphere around the scene
            const radius = 120 + Math.random() * 180
            const theta = Math.random() * Math.PI * 2
            const phi = Math.random() * Math.PI

            positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
            positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
            positions[i * 3 + 2] = radius * Math.cos(phi)

            scales[i] = Math.random() * 0.9 + 0.5

            // Slight color variation for stars
            const colorVariation = 0.8 + Math.random() * 0.2
            colors[i * 3] = colorVariation     // R
            colors[i * 3 + 1] = colorVariation // G
            colors[i * 3 + 2] = 1.0            // B (slightly blue-tinted)
        }

        return { positions, scales, colors }
    }, [])

    useFrame((state, delta) => {
        if (starsRef.current && starsRef.current.material) {
            timeRef.current += delta
            const material = starsRef.current.material as THREE.PointsMaterial

            // Faster global twinkling for all stars
            const globalTwinkle = Math.sin(timeRef.current * 1.5) * 0.15 +
                Math.cos(timeRef.current * 2.2) * 0.1 +
                Math.sin(timeRef.current * 1.8) * 0.2
            material.opacity = Math.max(0.2, 0.5 + globalTwinkle)
        }
    })

    return (
        <points ref={starsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    args={[positions, 3]}
                />
                <bufferAttribute
                    attach="attributes-scale"
                    args={[scales, 1]}
                />
                <bufferAttribute
                    attach="attributes-color"
                    args={[colors, 3]}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.4}
                vertexColors
                transparent
                opacity={0.7}
                sizeAttenuation={true}
                blending={THREE.AdditiveBlending}
            />
        </points>
    )
}

// Main starry scene component
function StarryScene() {
    return (
        <>
            {/* Ambient lighting for subtle illumination */}
            <ambientLight intensity={0.1} color="#4f46e5" />

            {/* Stars scattered throughout the scene */}
            <Stars />
        </>
    )
}

export default function DualVideoBackground() {
    return (
        <div className="absolute inset-0 w-full h-full pointer-events-none bg-black" style={{ zIndex: 0 }}>
            {/* Subtle Blue tint overlay for minimal cosmic atmosphere */}
            <div
                className="absolute inset-0"
                style={{
                    background: `
                        radial-gradient(circle at center, rgba(5, 10, 75, 0.08) 0%, rgba(5, 10, 75, 0.02) 70%, transparent 100%),
                        radial-gradient(circle at 100% 50%, rgba(5, 10, 75, 0.06) 0%, rgba(5, 10, 75, 0.01) 60%, transparent 100%),
                        radial-gradient(circle at 0% 50%, rgba(5, 10, 75, 0.06) 0%, rgba(5, 10, 75, 0.01) 60%, transparent 100%)
                    `,
                    zIndex: 0
                }}
            />

            {/* Top Right Video - galaxy.mp4 */}
            <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute w-3/5 h-3/5 object-contain"
                style={{
                    filter: 'brightness(1.1) contrast(1.1)',
                    opacity: 1.0,
                    right: '0%',
                    top: '-10%'
                }}
            >
                <source src="/galaxy.mp4" type="video/mp4" />
            </video>
            {/* Bottom Left Video - spacenebula.mp4 */}
            <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute left-0 w-2/5 h-2/5 object-contain"
                style={{
                    filter: 'brightness(0.8) contrast(1.3)',
                    opacity: 0.8,
                    top: '70vh'
                }}
            >
                <source src="/spacenebula.mp4" type="video/mp4" />
            </video>

            {/* Glowing Stars Canvas */}
            <Canvas
                camera={{
                    position: [0, 60, 20],
                    fov: 60,
                    near: 0.1,
                    far: 1000
                }}
                dpr={[1, 2]}
                performance={{ min: 0.5 }}
                style={{
                    background: 'transparent',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: 1
                }}
            >
                <StarryScene />
            </Canvas>
        </div>
    )
}
