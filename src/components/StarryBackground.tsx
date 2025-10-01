'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Stars component with random group twinkling
function Stars() {
    const starsRef = useRef<THREE.Points>(null)
    const timeRef = useRef(0)

    const { positions, scales, colors } = useMemo(() => {
        const starCount = 1500
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
                size={0.8}
                vertexColors
                transparent
                opacity={0.7}
                sizeAttenuation={true}
                blending={THREE.AdditiveBlending}
            />
        </points>
    )
}

// Galaxy component for distant background galaxies with linear spiral pattern
function Galaxy({ position, size, rotationSpeed, color }: {
    position: [number, number, number],
    size: number,
    rotationSpeed: number,
    color: string
}) {
    const galaxyRef = useRef<THREE.Group>(null)
    const timeRef = useRef(Math.random() * Math.PI * 2)

    const galaxyGeometry = useMemo(() => {
        const starsPerArm = 200  // Increased for denser spirals
        const armCount = 4       // Four spiral arms for more detailed galaxy
        const totalStars = starsPerArm * armCount
        const positions = new Float32Array(totalStars * 3)
        const scales = new Float32Array(totalStars)

        let starIndex = 0

        for (let arm = 0; arm < armCount; arm++) {
            const armOffset = (arm / armCount) * Math.PI * 2

            for (let i = 0; i < starsPerArm; i++) {
                // More detailed logarithmic spiral pattern
                const t = i / starsPerArm // 0 to 1
                const radius = Math.pow(t, 0.8) * size * 0.95 // Logarithmic increase in radius
                const angle = armOffset + t * Math.PI * 4.5 // 2.25 turns per arm for tighter spiral

                // More pronounced spiral arms with better distribution
                const spiralTightness = 0.7
                const armWidth = size * 0.03
                const x = Math.cos(angle) * radius + (Math.random() - 0.5) * armWidth
                const z = Math.sin(angle) * radius + (Math.random() - 0.5) * armWidth
                const y = (Math.random() - 0.5) * size * 0.015 // Even thinner disk

                positions[starIndex * 3] = x
                positions[starIndex * 3 + 1] = y
                positions[starIndex * 3 + 2] = z

                // More dramatic brightness variation - brighter center, dimmer edges
                const centerBrightness = Math.pow(1 - t, 1.5)
                scales[starIndex] = centerBrightness * (Math.random() * 0.6 + 0.4)

                starIndex++
            }
        }

        return { positions, scales }
    }, [size])

    useFrame((state, delta) => {
        if (galaxyRef.current) {
            timeRef.current += delta
            // Slow, steady rotation like a real galaxy
            galaxyRef.current.rotation.y += delta * rotationSpeed

            // Very subtle wobble to simulate distant perspective
            galaxyRef.current.rotation.z = Math.sin(timeRef.current * 0.1) * 0.03
            galaxyRef.current.rotation.x = Math.cos(timeRef.current * 0.08) * 0.02
        }
    })

    return (
        <group ref={galaxyRef} position={position}>
            <points>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        args={[galaxyGeometry.positions, 3]}
                    />
                    <bufferAttribute
                        attach="attributes-scale"
                        args={[galaxyGeometry.scales, 1]}
                    />
                </bufferGeometry>
                <pointsMaterial
                    size={0.8}
                    color={color}
                    transparent
                    opacity={0.9}
                    sizeAttenuation={true}
                    blending={THREE.AdditiveBlending}
                />
            </points>
        </group>
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

            {/* First prominent spiral galaxy */}
            <Galaxy
                position={[-200, -240, -80]}
                size={35}
                rotationSpeed={0.03}
                color="#e6f3ff"
            />

            {/* Second spiral galaxy with different position and properties */}
            <Galaxy
                position={[160, -180, -120]}
                size={28}
                rotationSpeed={0.025}
                color="#ffeef3"
            />
        </>
    )
}

// Main component export
export default function StarryBackground() {
    return (
        <div className="fixed inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
            <Canvas
                camera={{
                    position: [0, 60, 20],  // Adjusted view to better see spiral arms
                    fov: 60,
                    near: 0.1,
                    far: 1000
                }}
                dpr={[1, 2]}
                performance={{ min: 0.5 }}
                style={{ background: 'transparent' }}
            >
                <StarryScene />
            </Canvas>
        </div>
    )
}