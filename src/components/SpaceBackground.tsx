'use client'

import { useRef, useEffect, useMemo, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

// Camera controller component for mouse/touch controls like the HTML example
function CameraController() {
    const { camera } = useThree()
    const [isDragging, setIsDragging] = useState(false)
    const [prevMouse, setPrevMouse] = useState({ x: 0, y: 0 })
    const [cameraAngle, setCameraAngle] = useState({ theta: Math.PI / 4, phi: Math.PI / 12 })
    const [cameraDistance, setCameraDistance] = useState(400)
    const [scrollOffset, setScrollOffset] = useState(0)

    useEffect(() => {
        const handleMouseDown = (e: MouseEvent) => {
            setIsDragging(true)
            setPrevMouse({ x: e.clientX, y: e.clientY })
        }

        const handleMouseMove = (e: MouseEvent) => {
            if (!isDragging) return

            const dx = e.clientX - prevMouse.x
            const dy = e.clientY - prevMouse.y

            setCameraAngle(prev => ({
                theta: prev.theta - dx * 0.005,
                phi: Math.max(-Math.PI / 2 + 0.1, Math.min(Math.PI / 2 - 0.1, prev.phi + dy * 0.005))
            }))

            setPrevMouse({ x: e.clientX, y: e.clientY })
        }

        const handleMouseUp = () => {
            setIsDragging(false)
        }

        const handleWheel = (e: WheelEvent) => {
            // Allow normal page scrolling - don't prevent default
            // Only zoom on Ctrl/Cmd + wheel
            if (e.ctrlKey || e.metaKey) {
                e.preventDefault()
                setCameraDistance(prev => Math.max(50, Math.min(500, prev + e.deltaY * 0.1)))
            }
        }

        const handleScroll = () => {
            setScrollOffset(window.scrollY)
        }

        const canvas = document.querySelector('canvas')
        if (canvas) {
            canvas.addEventListener('mousedown', handleMouseDown)
            canvas.addEventListener('mousemove', handleMouseMove)
            canvas.addEventListener('mouseup', handleMouseUp)
            canvas.addEventListener('wheel', handleWheel)
            window.addEventListener('scroll', handleScroll)

            return () => {
                canvas.removeEventListener('mousedown', handleMouseDown)
                canvas.removeEventListener('mousemove', handleMouseMove)
                canvas.removeEventListener('mouseup', handleMouseUp)
                canvas.removeEventListener('wheel', handleWheel)
                window.removeEventListener('scroll', handleScroll)
            }
        }
    }, [isDragging, prevMouse])

    useFrame(() => {
        // Update camera position like in the HTML example with scroll offset
        const scrollInfluence = scrollOffset * 0.1
        camera.position.x = cameraDistance * Math.sin(cameraAngle.theta) * Math.cos(cameraAngle.phi)
        camera.position.y = cameraDistance * Math.sin(cameraAngle.phi) + scrollInfluence
        camera.position.z = cameraDistance * Math.cos(cameraAngle.theta) * Math.cos(cameraAngle.phi)
        camera.lookAt(0, scrollInfluence * 0.3, 0)
    })

    return null
}

// Stars component with glimmering effect
function Stars() {
    const starsRef = useRef<THREE.Points>(null)
    const materialRef = useRef<THREE.PointsMaterial>(null)

    const { positions, sizes, phases } = useMemo(() => {
        const starCount = 3000
        const positions = new Float32Array(starCount * 3)
        const sizes = new Float32Array(starCount)
        const phases = new Float32Array(starCount)

        for (let i = 0; i < starCount; i++) {
            const x = (Math.random() - 0.5) * 2000
            const y = (Math.random() - 0.5) * 2000
            const z = (Math.random() - 0.5) * 2000
            positions[i * 3] = x
            positions[i * 3 + 1] = y
            positions[i * 3 + 2] = z

            // Random star sizes and phases for twinkling
            sizes[i] = Math.random() * 3 + 1
            phases[i] = Math.random() * Math.PI * 2
        }

        return { positions, sizes, phases }
    }, [])

    useFrame((state) => {
        if (starsRef.current && starsRef.current.geometry.attributes.size) {
            const time = state.clock.elapsedTime
            const sizeArray = starsRef.current.geometry.attributes.size.array as Float32Array

            // Individual star twinkling
            for (let i = 0; i < sizes.length; i++) {
                const baseSize = sizes[i]
                const phase = phases[i]
                const twinkle = Math.sin(time * (2 + Math.random() * 3) + phase) * 0.5 + 0.5
                sizeArray[i] = baseSize * (0.5 + twinkle * 0.8)
            }

            starsRef.current.geometry.attributes.size.needsUpdate = true
        }

        if (materialRef.current) {
            // Overall subtle opacity variation
            materialRef.current.opacity = 0.7 + Math.sin(state.clock.elapsedTime * 0.5) * 0.2
        }

        if (starsRef.current) {
            // Very slow rotation
            starsRef.current.rotation.y += 0.0001
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
                    attach="attributes-size"
                    args={[sizes, 1]}
                />
            </bufferGeometry>
            <pointsMaterial
                ref={materialRef}
                color={0xffffff}
                sizeAttenuation={false}
                transparent
                opacity={0.8}
            />
        </points>
    )
}

function createSunTexture() {
    const canvas = document.createElement('canvas')
    canvas.width = 1024
    canvas.height = 512
    const ctx = canvas.getContext('2d')!

    const grad = ctx.createRadialGradient(512, 256, 0, 512, 256, 400)
    grad.addColorStop(0, '#fff4e6')
    grad.addColorStop(0.3, '#ffe082')
    grad.addColorStop(0.6, '#ffb74d')
    grad.addColorStop(1, '#ff9800')
    ctx.fillStyle = grad
    ctx.fillRect(0, 0, 1024, 512)

    // Solar granulation
    for (let i = 0; i < 500; i++) {
        const x = Math.random() * 1024
        const y = Math.random() * 512
        const r = Math.random() * 8 + 2
        const brightness = Math.random() * 0.3
        ctx.fillStyle = `rgba(255, 200, 100, ${brightness})`
        ctx.beginPath()
        ctx.arc(x, y, r, 0, Math.PI * 2)
        ctx.fill()
    }

    // Sunspots
    for (let i = 0; i < 20; i++) {
        const x = Math.random() * 1024
        const y = Math.random() * 512
        const r = Math.random() * 15 + 5
        const spotGrad = ctx.createRadialGradient(x, y, 0, x, y, r)
        spotGrad.addColorStop(0, 'rgba(100, 50, 0, 0.4)')
        spotGrad.addColorStop(1, 'rgba(100, 50, 0, 0)')
        ctx.fillStyle = spotGrad
        ctx.beginPath()
        ctx.arc(x, y, r, 0, Math.PI * 2)
        ctx.fill()
    }

    return new THREE.CanvasTexture(canvas)
}

function Sun() {
    const sunRef = useRef<THREE.Mesh>(null)
    const sunTexture = useMemo(() => createSunTexture(), [])

    useFrame(() => {
        if (sunRef.current) {
            sunRef.current.rotation.y += 0.001
        }
    })

    return (
        <group>
            <mesh ref={sunRef} position={[0, 0, 0]}>
                <sphereGeometry args={[30.36, 64, 64]} />
                <meshBasicMaterial map={sunTexture} />
            </mesh>
            <mesh position={[0, 0, 0]}>
                <sphereGeometry args={[36.432, 32, 32]} />
                <meshBasicMaterial
                    color={0xffaa00}
                    transparent
                    opacity={0.3}
                />
            </mesh>
        </group>
    )
}

// Spiral galaxies in the background
function SpiralGalaxies() {
    const galaxy1Ref = useRef<THREE.Points>(null)
    const galaxy2Ref = useRef<THREE.Points>(null)
    const galaxy3Ref = useRef<THREE.Points>(null)

    const createGalaxyPoints = (numArms: number, starsPerArm: number, radius: number) => {
        const positions = new Float32Array(numArms * starsPerArm * 3)
        const colors = new Float32Array(numArms * starsPerArm * 3)
        const radialDistances = new Float32Array(numArms * starsPerArm) // Store radial distance for swirl effect
        const armIndices = new Float32Array(numArms * starsPerArm) // Store which arm each star belongs to
        const randomOffsets = new Float32Array(numArms * starsPerArm * 3) // Store random offsets

        for (let arm = 0; arm < numArms; arm++) {
            for (let i = 0; i < starsPerArm; i++) {
                const index = arm * starsPerArm + i
                const t = i / starsPerArm

                // Store data for dynamic rotation
                radialDistances[index] = Math.pow(t, 1.2) * radius
                armIndices[index] = arm

                // Store random offsets
                randomOffsets[index * 3] = (Math.random() - 0.5) * 8
                randomOffsets[index * 3 + 1] = (Math.random() - 0.5) * 3
                randomOffsets[index * 3 + 2] = (Math.random() - 0.5) * 8

                // Initial positions (will be updated in useFrame)
                const armAngle = (arm / numArms) * Math.PI * 2
                const spiralTightness = 3.0 // Tighter spiral to make it more visible
                const spiralAngle = armAngle + t * Math.PI * spiralTightness
                const r = radialDistances[index]

                const x = Math.cos(spiralAngle) * r + randomOffsets[index * 3]
                const y = randomOffsets[index * 3 + 1]
                const z = Math.sin(spiralAngle) * r + randomOffsets[index * 3 + 2]

                positions[index * 3] = x
                positions[index * 3 + 1] = y
                positions[index * 3 + 2] = z

                // Much dimmer colors
                const centerDistance = r / radius
                const intensity = Math.max(0.1, 0.4 - centerDistance * 0.3) // Much lower intensity
                colors[index * 3] = (0.5 + Math.random() * 0.2) * intensity // R
                colors[index * 3 + 1] = (0.6 + Math.random() * 0.2) * intensity // G
                colors[index * 3 + 2] = (0.8 + Math.random() * 0.2) * intensity // B
            }
        }

        return { positions, colors, radialDistances, armIndices, randomOffsets, numArms, starsPerArm, radius }
    }

    const galaxy1Data = useMemo(() => createGalaxyPoints(4, 800, 100), [])
    const galaxy2Data = useMemo(() => createGalaxyPoints(3, 600, 75), [])
    const galaxy3Data = useMemo(() => createGalaxyPoints(5, 400, 50), [])

    useFrame((state) => {
        const time = state.clock.elapsedTime

        // Update galaxy1 with swirling arms
        if (galaxy1Ref.current && galaxy1Ref.current.geometry.attributes.position) {
            const positions = galaxy1Ref.current.geometry.attributes.position.array as Float32Array
            const { radialDistances, armIndices, randomOffsets, numArms, starsPerArm } = galaxy1Data

            for (let i = 0; i < positions.length / 3; i++) {
                const t = (i % starsPerArm) / starsPerArm
                const arm = armIndices[i]
                const r = radialDistances[i]

                // Base arm angle
                const baseArmAngle = (arm / numArms) * Math.PI * 2
                // Add time-based rotation that varies with distance from center (differential rotation)
                const rotationSpeed = 0.05 * (1 - t * 0.5) // Slower, more visible rotation
                const spiralTightness = 3.0
                const spiralAngle = baseArmAngle + t * Math.PI * spiralTightness + time * rotationSpeed

                positions[i * 3] = Math.cos(spiralAngle) * r + randomOffsets[i * 3]
                positions[i * 3 + 1] = randomOffsets[i * 3 + 1] // Keep Y constant
                positions[i * 3 + 2] = Math.sin(spiralAngle) * r + randomOffsets[i * 3 + 2]
            }

            galaxy1Ref.current.geometry.attributes.position.needsUpdate = true
            galaxy1Ref.current.position.x = Math.cos(time * 0.02) * 1200
            galaxy1Ref.current.position.z = Math.sin(time * 0.02) * 1200
        }

        // Update galaxy2 with swirling arms
        if (galaxy2Ref.current && galaxy2Ref.current.geometry.attributes.position) {
            const positions = galaxy2Ref.current.geometry.attributes.position.array as Float32Array
            const { radialDistances, armIndices, randomOffsets, numArms, starsPerArm } = galaxy2Data

            for (let i = 0; i < positions.length / 3; i++) {
                const t = (i % starsPerArm) / starsPerArm
                const arm = armIndices[i]
                const r = radialDistances[i]

                const baseArmAngle = (arm / numArms) * Math.PI * 2
                const rotationSpeed = -0.04 * (1 - t * 0.4) // Counter-clockwise, different speed
                const spiralTightness = 3.0
                const spiralAngle = baseArmAngle + t * Math.PI * spiralTightness + time * rotationSpeed

                positions[i * 3] = Math.cos(spiralAngle) * r + randomOffsets[i * 3]
                positions[i * 3 + 1] = randomOffsets[i * 3 + 1] // Keep Y constant
                positions[i * 3 + 2] = Math.sin(spiralAngle) * r + randomOffsets[i * 3 + 2]
            }

            galaxy2Ref.current.geometry.attributes.position.needsUpdate = true
            galaxy2Ref.current.position.x = Math.cos(time * 0.015 + Math.PI) * 900
            galaxy2Ref.current.position.z = Math.sin(time * 0.015 + Math.PI) * 900
        }

        // Update galaxy3 with swirling arms
        if (galaxy3Ref.current && galaxy3Ref.current.geometry.attributes.position) {
            const positions = galaxy3Ref.current.geometry.attributes.position.array as Float32Array
            const { radialDistances, armIndices, randomOffsets, numArms, starsPerArm } = galaxy3Data

            for (let i = 0; i < positions.length / 3; i++) {
                const t = (i % starsPerArm) / starsPerArm
                const arm = armIndices[i]
                const r = radialDistances[i]

                const baseArmAngle = (arm / numArms) * Math.PI * 2
                const rotationSpeed = 0.06 * (1 - t * 0.6) // Different rotation speed
                const spiralTightness = 3.0
                const spiralAngle = baseArmAngle + t * Math.PI * spiralTightness + time * rotationSpeed

                positions[i * 3] = Math.cos(spiralAngle) * r + randomOffsets[i * 3]
                positions[i * 3 + 1] = randomOffsets[i * 3 + 1] // Keep Y constant
                positions[i * 3 + 2] = Math.sin(spiralAngle) * r + randomOffsets[i * 3 + 2]
            }

            galaxy3Ref.current.geometry.attributes.position.needsUpdate = true
            galaxy3Ref.current.position.x = Math.cos(time * 0.025 + Math.PI * 0.5) * 800
            galaxy3Ref.current.position.z = Math.sin(time * 0.025 + Math.PI * 0.5) * 800
        }
    })

    return (
        <>
            <points ref={galaxy1Ref} position={[1200, 0, 0]}>
                <bufferGeometry>
                    <bufferAttribute attach="attributes-position" args={[galaxy1Data.positions, 3]} />
                    <bufferAttribute attach="attributes-color" args={[galaxy1Data.colors, 3]} />
                </bufferGeometry>
                <pointsMaterial size={1.5} vertexColors transparent opacity={0.15} />
            </points>

            <points ref={galaxy2Ref} position={[-900, 100, -400]}>
                <bufferGeometry>
                    <bufferAttribute attach="attributes-position" args={[galaxy2Data.positions, 3]} />
                    <bufferAttribute attach="attributes-color" args={[galaxy2Data.colors, 3]} />
                </bufferGeometry>
                <pointsMaterial size={1.2} vertexColors transparent opacity={0.12} />
            </points>

            <points ref={galaxy3Ref} position={[0, -150, 1000]}>
                <bufferGeometry>
                    <bufferAttribute attach="attributes-position" args={[galaxy3Data.positions, 3]} />
                    <bufferAttribute attach="attributes-color" args={[galaxy3Data.colors, 3]} />
                </bufferGeometry>
                <pointsMaterial size={1} vertexColors transparent opacity={0.1} />
            </points>
        </>
    )
}

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

function createMercuryTexture() {
    const canvas = document.createElement('canvas')
    canvas.width = 1024
    canvas.height = 512
    const ctx = canvas.getContext('2d')!

    const noise = (x: number, y: number, scale = 50) => {
        return Math.sin(x * scale) * Math.cos(y * scale) * 0.5 + 0.5
    }

    const imgData = ctx.createImageData(1024, 512)
    for (let y = 0; y < 512; y++) {
        for (let x = 0; x < 1024; x++) {
            const idx = (y * 1024 + x) * 4
            const n = noise(x, y, 0.02) * 0.3 + 0.5
            imgData.data[idx] = 110 * n
            imgData.data[idx + 1] = 95 * n
            imgData.data[idx + 2] = 75 * n
            imgData.data[idx + 3] = 255
        }
    }
    ctx.putImageData(imgData, 0, 0)

    for (let i = 0; i < 200; i++) {
        const x = Math.random() * 1024
        const y = Math.random() * 512
        const r = Math.random() * 20 + 3
        const grad = ctx.createRadialGradient(x, y, 0, x, y, r)
        grad.addColorStop(0, 'rgba(40, 35, 30, 0.6)')
        grad.addColorStop(0.7, 'rgba(80, 70, 60, 0.3)')
        grad.addColorStop(1, 'rgba(100, 85, 70, 0)')
        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.arc(x, y, r, 0, Math.PI * 2)
        ctx.fill()
    }

    return new THREE.CanvasTexture(canvas)
}

function createVenusTexture() {
    const canvas = document.createElement('canvas')
    canvas.width = 1024
    canvas.height = 512
    const ctx = canvas.getContext('2d')!

    const noise = (x: number, y: number, scale = 50) => {
        return Math.sin(x * scale) * Math.cos(y * scale) * 0.5 + 0.5
    }

    const imgData = ctx.createImageData(1024, 512)
    for (let y = 0; y < 512; y++) {
        for (let x = 0; x < 1024; x++) {
            const idx = (y * 1024 + x) * 4
            const n = noise(x, y, 0.015) * noise(x * 2, y * 2, 0.03)
            imgData.data[idx] = 220 + n * 35
            imgData.data[idx + 1] = 180 + n * 40
            imgData.data[idx + 2] = 100 + n * 30
            imgData.data[idx + 3] = 255
        }
    }
    ctx.putImageData(imgData, 0, 0)

    for (let i = 0; i < 30; i++) {
        ctx.strokeStyle = `rgba(255, 230, 180, ${Math.random() * 0.2 + 0.1})`
        ctx.lineWidth = Math.random() * 15 + 5
        ctx.beginPath()
        ctx.moveTo(0, i * 20)
        for (let x = 0; x < 1024; x += 20) {
            ctx.lineTo(x, i * 20 + Math.sin(x * 0.02) * 30)
        }
        ctx.stroke()
    }

    return new THREE.CanvasTexture(canvas)
}

function createEarthTexture() {
    const canvas = document.createElement('canvas')
    canvas.width = 1024
    canvas.height = 512
    const ctx = canvas.getContext('2d')!

    ctx.fillStyle = '#0a2f5f'
    ctx.fillRect(0, 0, 1024, 512)

    const continents = [
        { x: 100, y: 200, w: 200, h: 150 },
        { x: 350, y: 150, w: 180, h: 120 },
        { x: 600, y: 250, w: 250, h: 180 },
        { x: 200, y: 50, w: 150, h: 100 },
        { x: 750, y: 100, w: 200, h: 140 }
    ]

    continents.forEach(c => {
        ctx.fillStyle = '#2d5a2d'
        ctx.beginPath()
        for (let i = 0; i < 20; i++) {
            const angle = (i / 20) * Math.PI * 2
            const r = 1 + Math.random() * 0.4
            const x = c.x + Math.cos(angle) * c.w * r * 0.5
            const y = c.y + Math.sin(angle) * c.h * r * 0.5
            if (i === 0) ctx.moveTo(x, y)
            else ctx.lineTo(x, y)
        }
        ctx.closePath()
        ctx.fill()
    })

    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)'
    ctx.fillRect(0, 0, 1024, 40)
    ctx.fillRect(0, 472, 1024, 40)

    for (let i = 0; i < 100; i++) {
        const x = Math.random() * 1024
        const y = Math.random() * 512
        const r = Math.random() * 25 + 10
        const grad = ctx.createRadialGradient(x, y, 0, x, y, r)
        grad.addColorStop(0, 'rgba(255, 255, 255, 0.5)')
        grad.addColorStop(1, 'rgba(255, 255, 255, 0)')
        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.arc(x, y, r, 0, Math.PI * 2)
        ctx.fill()
    }

    return new THREE.CanvasTexture(canvas)
}

function createMarsTexture() {
    const canvas = document.createElement('canvas')
    canvas.width = 1024
    canvas.height = 512
    const ctx = canvas.getContext('2d')!

    const noise = (x: number, y: number, scale = 50) => {
        return Math.sin(x * scale) * Math.cos(y * scale) * 0.5 + 0.5
    }

    const imgData = ctx.createImageData(1024, 512)
    for (let y = 0; y < 512; y++) {
        for (let x = 0; x < 1024; x++) {
            const idx = (y * 1024 + x) * 4
            const n = noise(x, y, 0.025) * 0.4 + 0.6
            imgData.data[idx] = 193 * n
            imgData.data[idx + 1] = 68 * n
            imgData.data[idx + 2] = 39 * n
            imgData.data[idx + 3] = 255
        }
    }
    ctx.putImageData(imgData, 0, 0)

    ctx.strokeStyle = 'rgba(100, 40, 20, 0.6)'
    ctx.lineWidth = 8
    ctx.beginPath()
    ctx.moveTo(200, 256)
    for (let x = 200; x < 800; x += 10) {
        ctx.lineTo(x, 256 + Math.sin(x * 0.05) * 20)
    }
    ctx.stroke()

    const grad = ctx.createRadialGradient(512, 50, 0, 512, 50, 100)
    grad.addColorStop(0, 'rgba(255, 255, 255, 0.8)')
    grad.addColorStop(1, 'rgba(255, 255, 255, 0)')
    ctx.fillStyle = grad
    ctx.fillRect(0, 0, 1024, 100)

    return new THREE.CanvasTexture(canvas)
}

function createJupiterTexture() {
    const canvas = document.createElement('canvas')
    canvas.width = 1024
    canvas.height = 512
    const ctx = canvas.getContext('2d')!

    const bands = [
        { color: '#c88b3a', y: 0 },
        { color: '#b67a2f', y: 60 },
        { color: '#d4a76a', y: 120 },
        { color: '#a67c54', y: 180 },
        { color: '#c89664', y: 240 },
        { color: '#b8895e', y: 300 },
        { color: '#d4a76a', y: 360 },
        { color: '#b67a2f', y: 420 }
    ]

    bands.forEach(band => {
        ctx.fillStyle = band.color
        ctx.fillRect(0, band.y, 1024, 60)

        for (let i = 0; i < 50; i++) {
            ctx.fillStyle = `rgba(200, 150, 100, ${Math.random() * 0.3})`
            const x = Math.random() * 1024
            const y = band.y + Math.random() * 60
            ctx.beginPath()
            ctx.ellipse(x, y, Math.random() * 30 + 10, Math.random() * 15 + 5, Math.random() * Math.PI, 0, Math.PI * 2)
            ctx.fill()
        }
    })

    const grsX = 700
    const grsY = 300
    const grsGrad = ctx.createRadialGradient(grsX, grsY, 0, grsX, grsY, 80)
    grsGrad.addColorStop(0, '#d85a3a')
    grsGrad.addColorStop(0.5, '#c84a2a')
    grsGrad.addColorStop(1, 'rgba(200, 80, 60, 0)')
    ctx.fillStyle = grsGrad
    ctx.beginPath()
    ctx.ellipse(grsX, grsY, 80, 60, 0.3, 0, Math.PI * 2)
    ctx.fill()

    return new THREE.CanvasTexture(canvas)
}

function createSaturnTexture() {
    const canvas = document.createElement('canvas')
    canvas.width = 1024
    canvas.height = 512
    const ctx = canvas.getContext('2d')!

    for (let y = 0; y < 512; y += 20) {
        const brightness = 0.85 + Math.random() * 0.15
        ctx.fillStyle = `rgb(${240 * brightness}, ${220 * brightness}, ${180 * brightness})`
        ctx.fillRect(0, y, 1024, 20)

        ctx.strokeStyle = `rgba(230, 200, 150, ${Math.random() * 0.2})`
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.moveTo(0, y + 10)
        for (let x = 0; x < 1024; x += 20) {
            ctx.lineTo(x, y + 10 + Math.sin(x * 0.05) * 3)
        }
        ctx.stroke()
    }

    return new THREE.CanvasTexture(canvas)
}

function createUranusTexture() {
    const canvas = document.createElement('canvas')
    canvas.width = 1024
    canvas.height = 512
    const ctx = canvas.getContext('2d')!

    const grad = ctx.createLinearGradient(0, 0, 0, 512)
    grad.addColorStop(0, '#a8e6f5')
    grad.addColorStop(0.5, '#7dd3e8')
    grad.addColorStop(1, '#5fc0d8')
    ctx.fillStyle = grad
    ctx.fillRect(0, 0, 1024, 512)

    for (let y = 0; y < 512; y += 50) {
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.1})`
        ctx.fillRect(0, y, 1024, 25)
    }

    return new THREE.CanvasTexture(canvas)
}

function createNeptuneTexture() {
    const canvas = document.createElement('canvas')
    canvas.width = 1024
    canvas.height = 512
    const ctx = canvas.getContext('2d')!

    const grad = ctx.createRadialGradient(512, 256, 0, 512, 256, 400)
    grad.addColorStop(0, '#6a9ff5')
    grad.addColorStop(0.5, '#4166f5')
    grad.addColorStop(1, '#2e4ec4')
    ctx.fillStyle = grad
    ctx.fillRect(0, 0, 1024, 512)

    ctx.fillStyle = 'rgba(20, 30, 80, 0.5)'
    ctx.beginPath()
    ctx.ellipse(300, 250, 70, 50, 0.2, 0, Math.PI * 2)
    ctx.fill()

    for (let i = 0; i < 10; i++) {
        ctx.strokeStyle = `rgba(100, 150, 255, ${Math.random() * 0.2})`
        ctx.lineWidth = Math.random() * 5 + 2
        ctx.beginPath()
        const y = i * 50
        ctx.moveTo(0, y)
        for (let x = 0; x < 1024; x += 30) {
            ctx.lineTo(x, y + Math.sin(x * 0.03) * 15)
        }
        ctx.stroke()
    }

    return new THREE.CanvasTexture(canvas)
}

interface PlanetProps {
    size: number
    distance: number
    speed: number
    textureFunction: () => THREE.CanvasTexture
    initialAngle?: number
    hasRings?: boolean
}

function Planet({ size, distance, speed, textureFunction, initialAngle = 0, hasRings = false }: PlanetProps) {
    const planetRef = useRef<THREE.Mesh>(null)
    const timeRef = useRef(initialAngle)
    const texture = useMemo(() => {
        try {
            return textureFunction()
        } catch (error) {
            console.error('Error creating texture:', error)
            return null
        }
    }, [textureFunction])

    useFrame((state, delta) => {
        timeRef.current += delta * speed

        if (planetRef.current) {
            planetRef.current.position.x = Math.cos(timeRef.current) * distance
            planetRef.current.position.z = Math.sin(timeRef.current) * distance
            planetRef.current.rotation.y += 0.005
        }
    })

    return (
        <group>
            <mesh ref={planetRef}>
                <sphereGeometry args={[size, 64, 64]} />
                <meshStandardMaterial
                    map={texture}
                    color={texture ? 0xffffff : 0x888888}
                    roughness={0.9}
                    metalness={0.1}
                    emissive={new THREE.Color(0x111111)}
                    emissiveIntensity={0.1}
                />
            </mesh>
            {hasRings && <SaturnRings planetSize={size} planetRef={planetRef} />}
        </group>
    )
}

function SaturnRings({ planetSize, planetRef }: { planetSize: number, planetRef: React.RefObject<THREE.Mesh | null> }) {
    const ringRef = useRef<THREE.Mesh>(null)
    const ringTexture = useMemo(() => {
        const canvas = document.createElement('canvas')
        canvas.width = 512
        canvas.height = 512
        const ctx = canvas.getContext('2d')!

        const centerX = 256
        const centerY = 256
        for (let r = 120; r < 256; r++) {
            const alpha = (Math.sin(r * 0.5) * 0.3 + 0.5) * 0.7
            const brightness = 180 + Math.sin(r * 0.2) * 40
            ctx.strokeStyle = `rgba(${brightness}, ${brightness - 20}, ${brightness - 60}, ${alpha})`
            ctx.lineWidth = 2
            ctx.beginPath()
            ctx.arc(centerX, centerY, r, 0, Math.PI * 2)
            ctx.stroke()
        }

        return new THREE.CanvasTexture(canvas)
    }, [])

    useFrame(() => {
        if (ringRef.current && planetRef.current) {
            ringRef.current.position.copy(planetRef.current.position)
        }
    })

    return (
        <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[planetSize + 2, planetSize + 4, 64]} />
            <meshStandardMaterial
                map={ringTexture}
                side={THREE.DoubleSide}
                transparent
                opacity={0.9}
                roughness={0.7}
            />
        </mesh>
    )
}

function OrbitRings() {
    const planetData = [
        { dist: 38.5 }, { dist: 55 }, { dist: 77 }, { dist: 99 },
        { dist: 143 }, { dist: 198 }, { dist: 253 }, { dist: 297 }
    ]

    return (
        <>
            {planetData.map((planet, index) => (
                <mesh key={index} rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
                    <ringGeometry args={[planet.dist - 0.15, planet.dist + 0.15, 128]} />
                    <meshBasicMaterial
                        color="#4488ff"
                        transparent
                        opacity={0.4}
                        side={THREE.DoubleSide}
                    />
                </mesh>
            ))}
        </>
    )
}

function Scene() {
    return (
        <>
            {/* Main sun light */}
            <pointLight
                position={[0, 0, 0]}
                intensity={3.5}
                distance={800}
                decay={0.8}
                color="#ffffff"
            />

            {/* Additional ambient lighting for planet visibility */}
            <ambientLight intensity={0.6} color="#ffffff" />

            {/* Additional directional light to ensure planets are visible */}
            <directionalLight
                position={[100, 100, 100]}
                intensity={0.8}
                color="#ffffff"
            />

            <Stars />
            <SpiralGalaxies />
            <Galaxy
                position={[300, 50, -100]}
                size={60}
                rotationSpeed={0.02}
                color="#ffffff"
            />
            <Sun />
            <OrbitRings />

            <Planet size={2.2} distance={38.5} speed={0.6} textureFunction={createMercuryTexture} initialAngle={0} />
            <Planet size={4.4} distance={55} speed={0.225} textureFunction={createVenusTexture} initialAngle={Math.PI / 3} />
            <Planet size={4.4} distance={77} speed={0.15} textureFunction={createEarthTexture} initialAngle={Math.PI} />
            <Planet size={3.3} distance={99} speed={0.12} textureFunction={createMarsTexture} initialAngle={Math.PI * 1.5} />
            <Planet size={15.4} distance={143} speed={0.03} textureFunction={createJupiterTexture} initialAngle={Math.PI / 6} />
            <Planet size={13.2} distance={198} speed={0.0135} textureFunction={createSaturnTexture} initialAngle={Math.PI * 1.2} hasRings={true} />
            <Planet size={8.8} distance={253} speed={0.006} textureFunction={createUranusTexture} initialAngle={Math.PI * 1.8} />
            <Planet size={8.8} distance={297} speed={0.0015} textureFunction={createNeptuneTexture} initialAngle={Math.PI * 2.1} />
        </>
    )
}

export default function SpaceBackground() {
    return (
        <div className="fixed inset-0 w-full h-full z-30">
            <Canvas
                shadows
                camera={{
                    fov: 75,
                    near: 0.1,
                    far: 2000
                }}
                style={{
                    background: 'transparent',
                    width: '100%',
                    height: '100%',
                    pointerEvents: 'auto'
                }}
                dpr={[0.5, 1.5]}
                performance={{ min: 0.5 }}
                frameloop="always"
                gl={{ alpha: true }}
            >
                <CameraController />
                <Scene />
            </Canvas>
        </div>
    )
}
