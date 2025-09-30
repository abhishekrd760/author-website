'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function GlowingDust() {
    const mountRef = useRef<HTMLDivElement>(null)
    const sceneRef = useRef<{
        scene?: THREE.Scene
        camera?: THREE.PerspectiveCamera
        renderer?: THREE.WebGLRenderer
        animationId?: number
        dustParticles?: THREE.Points
        absoluteStartTime?: number
    }>({})

    useEffect(() => {
        if (!mountRef.current) return

        // Initialize Three.js scene
        const scene = new THREE.Scene()

        const camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        )
        camera.position.z = 5

        const renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance'
        })
        renderer.setSize(window.innerWidth, window.innerHeight)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        renderer.setClearColor(0x000000, 0) // Transparent background
        renderer.domElement.style.pointerEvents = 'none'
        mountRef.current.appendChild(renderer.domElement)

        const absoluteStartTime = Date.now()

        // Store in ref
        sceneRef.current = {
            scene,
            camera,
            renderer,
            absoluteStartTime
        }

        // Create glowing dust particles
        function createGlowingDust() {
            const particleCount = 100  // Reduced by another 20% for optimal density
            const geometry = new THREE.BufferGeometry()

            const positions = new Float32Array(particleCount * 3)
            const colors = new Float32Array(particleCount * 3)
            const sizes = new Float32Array(particleCount)
            const velocities = new Float32Array(particleCount * 3)
            const phases = new Float32Array(particleCount)

            // Create particles in a wider horizontal area around the text
            for (let i = 0; i < particleCount; i++) {
                // Position particles in a wider horizontal area around where the text would be
                positions[i * 3] = (Math.random() - 0.5) * 8     // X: wider spread horizontally
                positions[i * 3 + 1] = (Math.random() - 0.5) * 2 // Y: spread vertically
                positions[i * 3 + 2] = (Math.random() - 0.5) * 1 // Z: slight depth variation

                // Velocity for floating motion (extremely slow movement)
                velocities[i * 3] = (Math.random() - 0.5) * 0.0025     // X velocity - extremely slow
                velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.001875 // Y velocity - extremely slow
                velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.00125  // Z velocity - extremely slow

                // Random phase for pulsing animation
                phases[i] = Math.random() * Math.PI * 2

                // Size variation - small glowing dust
                sizes[i] = Math.random() * 0.03 + 0.015  // A bit bigger dust particles

                // Color variation - brighter golden, white, and blue glowing particles
                const colorChoice = Math.random()
                if (colorChoice > 0.7) {
                    // Bright golden particles
                    colors[i * 3] = 1.0     // R
                    colors[i * 3 + 1] = 0.9 // G
                    colors[i * 3 + 2] = 0.5 // B
                } else if (colorChoice > 0.4) {
                    // Bright white particles
                    colors[i * 3] = 1.0     // R
                    colors[i * 3 + 1] = 1.0 // G
                    colors[i * 3 + 2] = 1.0 // B
                } else {
                    // Bright blue particles
                    colors[i * 3] = 0.6     // R
                    colors[i * 3 + 1] = 0.8 // G
                    colors[i * 3 + 2] = 1.0 // B
                }
            }

            geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
            geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
            geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1))

            // Store velocities and phases for animation
            geometry.userData = {
                velocities: velocities,
                phases: phases,
                originalPositions: positions.slice() // Keep original positions for bounds checking
            }

            const material = new THREE.PointsMaterial({
                size: 1.8916264375,  // 15% larger - enhanced visibility
                sizeAttenuation: false,  // Don't scale with distance
                transparent: true,
                opacity: 1.0,  // Full opacity for brightness
                vertexColors: true,
                blending: THREE.AdditiveBlending,
                depthWrite: false
            })

            const dustParticles = new THREE.Points(geometry, material)
            scene.add(dustParticles)
            sceneRef.current.dustParticles = dustParticles

            return dustParticles
        }

        // Animation loop
        function animate() {
            const absoluteTime = (Date.now() - absoluteStartTime) * 0.001

            if (sceneRef.current.dustParticles) {
                const geometry = sceneRef.current.dustParticles.geometry
                const positions = geometry.attributes.position.array as Float32Array
                const sizes = geometry.attributes.size.array as Float32Array
                const velocities = geometry.userData.velocities
                const phases = geometry.userData.phases
                const originalPositions = geometry.userData.originalPositions

                // Update each particle
                for (let i = 0; i < positions.length / 3; i++) {
                    const i3 = i * 3

                    // Floating motion
                    positions[i3] += velocities[i3]
                    positions[i3 + 1] += velocities[i3 + 1]
                    positions[i3 + 2] += velocities[i3 + 2]

                    // Add sinusoidal movement for more organic motion (extremely slow)
                    const time = absoluteTime + phases[i]
                    positions[i3] += Math.sin(time * 0.0625) * 0.000375
                    positions[i3 + 1] += Math.cos(time * 0.0375) * 0.00025

                    // Pulsing size animation - subtle but visible (extremely slow)
                    const baseSizeIndex = i % sizes.length
                    const baseSize = 0.015 + Math.random() * 0.02
                    sizes[baseSizeIndex] = baseSize + Math.sin(time * 0.25) * 0.008

                    // Wrap particles around full screen bounds
                    if (positions[i3] > 10) positions[i3] = -10
                    if (positions[i3] < -10) positions[i3] = 10
                    if (positions[i3 + 1] > 5) positions[i3 + 1] = -5
                    if (positions[i3 + 1] < -5) positions[i3 + 1] = 5
                    if (positions[i3 + 2] > 2) positions[i3 + 2] = -2
                    if (positions[i3 + 2] < -0.5) positions[i3 + 2] = 0.5

                    // Occasionally change direction for more dynamic movement
                    if (Math.random() < 0.001) {
                        velocities[i3] = (Math.random() - 0.5) * 0.02
                        velocities[i3 + 1] = (Math.random() - 0.5) * 0.015
                        velocities[i3 + 2] = (Math.random() - 0.5) * 0.01
                    }
                }

                geometry.attributes.position.needsUpdate = true
                geometry.attributes.size.needsUpdate = true
            }

            renderer.render(scene, camera)
            sceneRef.current.animationId = requestAnimationFrame(animate)
        }

        // Window resize handler
        function onWindowResize() {
            if (camera && renderer) {
                camera.aspect = window.innerWidth / window.innerHeight
                camera.updateProjectionMatrix()
                renderer.setSize(window.innerWidth, window.innerHeight)
            }
        }

        // Initialize everything
        createGlowingDust()

        window.addEventListener('resize', onWindowResize)
        animate()

        // Cleanup function
        return () => {
            window.removeEventListener('resize', onWindowResize)
            if (sceneRef.current.animationId) {
                cancelAnimationFrame(sceneRef.current.animationId)
            }
            if (sceneRef.current.renderer && mountRef.current) {
                mountRef.current.removeChild(sceneRef.current.renderer.domElement)
                sceneRef.current.renderer.dispose()
            }
        }
    }, [])

    return (
        <div
            ref={mountRef}
            className="fixed top-0 left-0 w-full h-full pointer-events-none"
            style={{
                zIndex: 15,
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none'
            }}
        />
    )
}