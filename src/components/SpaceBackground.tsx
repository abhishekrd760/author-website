'use client'

import { useRef, useEffect, useMemo, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

// Camera controller component for scroll-based movement
function CameraController() {
    const { camera } = useThree()
    const [scrollY, setScrollY] = useState(0)
    
    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY)
        }
        
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])
    
    useFrame(() => {
        // Calculate camera movement based on scroll
        const scrollProgress = scrollY * 0.001 // Adjust sensitivity
        
        // Original camera position (same as before scroll feature)
        const baseX = 0
        const baseY = 35
        const baseZ = 65
        
        // Smooth transition from the beginning - no abrupt changes
        // Adjust the functions so they start at 0 when scrollProgress is 0
        camera.position.x = baseX + Math.sin(scrollProgress * 0.5) * 6
        camera.position.y = baseY + scrollProgress * 10
        camera.position.z = baseZ + (Math.cos(scrollProgress * 0.3) - 1) * 8
        
        // Always look at the solar system center (new sun position)
        camera.lookAt(0, 16, 0)
    })
    
    return null
}

// Stars component with random group twinkling
function Stars() {
    const starsRef = useRef<THREE.Points>(null)
    const timeRef = useRef(0)

    const { positions, scales, colors, groups } = useMemo(() => {
        const starCount = 1200
        const positions = new Float32Array(starCount * 3)
        const scales = new Float32Array(starCount)
        const colors = new Float32Array(starCount * 3)
        const groups = new Float32Array(starCount) // Group assignment for each star

        for (let i = 0; i < starCount; i++) {
            // Spread stars in a large sphere around the scene
            const radius = 150 + Math.random() * 150
            const theta = Math.random() * Math.PI * 2
            const phi = Math.random() * Math.PI

            positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
            positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
            positions[i * 3 + 2] = radius * Math.cos(phi)

            scales[i] = Math.random() * 0.8 + 0.4

            // Assign random groups (0-5) for twinkling patterns
            groups[i] = Math.floor(Math.random() * 6)

            // Slight color variation for stars
            const colorVariation = 0.8 + Math.random() * 0.2
            colors[i * 3] = colorVariation     // R
            colors[i * 3 + 1] = colorVariation // G
            colors[i * 3 + 2] = 1.0            // B (slightly blue-tinted)
        }

        return { positions, scales, colors, groups }
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
                size={1.4}
                vertexColors
                transparent
                opacity={0.6}
                sizeAttenuation={true}
                blending={THREE.AdditiveBlending}
            />
        </points>
    )
}

// Enhanced Sun component with true 3D spherical appearance
function Sun() {
    const sunRef = useRef<THREE.Mesh>(null)
    const glowRef = useRef<THREE.Mesh>(null)
    const outerGlowRef = useRef<THREE.Mesh>(null)
    const timeRef = useRef(0)

    useFrame((state, delta) => {
        timeRef.current += delta

        if (sunRef.current) {
            sunRef.current.rotation.y += delta * 0.1
            sunRef.current.rotation.x += delta * 0.05
            const material = sunRef.current.material as THREE.MeshPhongMaterial
            // Gentle pulsing intensity
            material.emissiveIntensity = 0.6 + Math.sin(timeRef.current * 0.6) * 0.3
        }

        if (glowRef.current) {
            glowRef.current.rotation.z += delta * 0.05
            const material = glowRef.current.material as THREE.MeshBasicMaterial
            material.opacity = 0.12 + Math.sin(timeRef.current * 0.4) * 0.03
        }

        if (outerGlowRef.current) {
            outerGlowRef.current.rotation.x += delta * 0.03
            const material = outerGlowRef.current.material as THREE.MeshBasicMaterial
            material.opacity = 0.06 + Math.sin(timeRef.current * 0.8) * 0.02
        }
    })

    return (
        <group>
            {/* Directional light to create 3D shading on the sun */}
            <directionalLight
                position={[5, 20, 8]}
                intensity={2.0}
                color="#ffffff"
                target-position={[0, 16, 0]}
            />
            
            {/* Main sun body - True 3D with proper shading */}
            <mesh ref={sunRef} position={[0, 16, 0]} receiveShadow>
                <sphereGeometry args={[3.5, 128, 128]} />
                <meshPhongMaterial
                    color="#ffdd66"
                    emissive="#ff6611"
                    emissiveIntensity={0.9}
                    shininess={5}
                    specular="#ffaa44"
                    transparent={false}
                />
            </mesh>

            {/* Inner corona glow effect */}
            <mesh ref={glowRef} position={[0, 16, 0]}>
                <sphereGeometry args={[6, 32, 32]} />
                <meshBasicMaterial
                    color="#ffaa33"
                    transparent
                    opacity={0.12}
                    blending={THREE.AdditiveBlending}
                />
            </mesh>

            {/* Outer corona glow effect */}
            <mesh ref={outerGlowRef} position={[0, 16, 0]}>
                <sphereGeometry args={[9, 32, 32]} />
                <meshBasicMaterial
                    color="#ff9911"
                    transparent
                    opacity={0.06}
                    blending={THREE.AdditiveBlending}
                />
            </mesh>
        </group>
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
        const starsPerArm = 60
        const armCount = 3 // Three spiral arms for more realistic galaxy
        const totalStars = starsPerArm * armCount
        const positions = new Float32Array(totalStars * 3)
        const scales = new Float32Array(totalStars)

        let starIndex = 0

        for (let arm = 0; arm < armCount; arm++) {
            const armOffset = (arm / armCount) * Math.PI * 2

            for (let i = 0; i < starsPerArm; i++) {
                // Linear spiral pattern - proper logarithmic spiral
                const t = i / starsPerArm // 0 to 1
                const radius = t * size * 0.9 // Linear increase in radius
                const angle = armOffset + t * Math.PI * 3.5 // 1.75 turns per arm
                
                // Linear spiral arms with slight random variation
                const x = Math.cos(angle) * radius + (Math.random() - 0.5) * size * 0.05
                const z = Math.sin(angle) * radius + (Math.random() - 0.5) * size * 0.05
                const y = (Math.random() - 0.5) * size * 0.02 // Very thin disk

                positions[starIndex * 3] = x
                positions[starIndex * 3 + 1] = y
                positions[starIndex * 3 + 2] = z

                // Brighter stars towards center, dimmer towards edges
                scales[starIndex] = (0.8 - t * 0.6) * (Math.random() * 0.4 + 0.3)
                
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
                    size={1.0}
                    color="#ccddff"
                    transparent
                    opacity={0.35}
                    sizeAttenuation={true}
                    blending={THREE.AdditiveBlending}
                />
            </points>
        </group>
    )
}

// Enhanced Planet component with realistic shading
interface PlanetProps {
    size: number
    color: string
    distance: number
    speed: number
    rotationSpeed: number
    initialAngle?: number
}

function Planet({ size, color, distance, speed, rotationSpeed, initialAngle = 0 }: PlanetProps) {
    const planetRef = useRef<THREE.Mesh>(null)
    const orbitRef = useRef<THREE.Group>(null)
    const timeRef = useRef(initialAngle)

    useFrame((state, delta) => {
        timeRef.current += delta

        if (orbitRef.current) {
            orbitRef.current.rotation.y = timeRef.current * speed
        }

        if (planetRef.current) {
            planetRef.current.rotation.y += delta * rotationSpeed
        }
    })

    return (
        <group ref={orbitRef} position={[0, 16, 0]}>
            <mesh ref={planetRef} position={[distance, 0, 0]} castShadow receiveShadow>
                <sphereGeometry args={[size, 128, 128]} />
                <meshStandardMaterial
                    color={color}
                    transparent
                    opacity={0.98}
                    roughness={0.7}
                    metalness={0.1}
                    emissive={color}
                    emissiveIntensity={0.05}
                />
            </mesh>
        </group>
    )
}

// Enhanced Orbit rings component
function OrbitRings() {
    const orbits = [
        { radius: 15, opacity: 0.20 },
        { radius: 22, opacity: 0.18 },
        { radius: 30, opacity: 0.16 },
        { radius: 38, opacity: 0.14 },
        { radius: 47, opacity: 0.12 },
        { radius: 56, opacity: 0.10 },
    ]

    return (
        <>
            {orbits.map((orbit, index) => (
                <mesh key={index} rotation={[Math.PI / 2, 0, 0]} position={[0, 16, 0]}>
                    <ringGeometry args={[orbit.radius - 0.15, orbit.radius + 0.15, 128]} />
                    <meshBasicMaterial
                        color="#ffffff"
                        transparent
                        opacity={orbit.opacity}
                        side={THREE.DoubleSide}
                    />
                </mesh>
            ))}
        </>
    )
}

// Main scene component with enhanced 3D lighting and shadows
function Scene() {
    return (
        <>
            {/* Enhanced 3D lighting setup */}
            <directionalLight
                position={[-15, 15, 10]}
                intensity={1.5}
                color="#ffffff"
                castShadow
                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}
            />
            <pointLight
                position={[0, 16, 0]}
                intensity={3.0}
                color="#ffcc77"
                distance={180}
                decay={1.8}
                castShadow
                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}
                shadow-camera-near={0.5}
                shadow-camera-far={200}
            />
            <pointLight
                position={[0, 16, 0]}
                intensity={1.5}
                color="#ffaa55"
                distance={100}
                decay={2}
            />
            <ambientLight intensity={0.12} color="#ffffff" />
            <hemisphereLight
                args={["#ffffff", "#333333", 0.2]}
            />

            <Stars />
            <Sun />
            <OrbitRings />

            {/* Distant background galaxies with linear spiral patterns */}
            <Galaxy
                position={[-120, 50, -90]}
                size={30}
                rotationSpeed={0.02}
                color="#ccddff"
            />

            <Galaxy
                position={[110, -35, -100]}
                size={24}
                rotationSpeed={-0.015}
                color="#ccddff"
            />

            <Galaxy
                position={[95, 65, -85]}
                size={22}
                rotationSpeed={0.025}
                color="#ccddff"
            />

            <Galaxy
                position={[-105, -55, -80]}
                size={27}
                rotationSpeed={-0.018}
                color="#ccddff"
            />

            {/* Inner rocky planets with realistic natural colors */}
            <Planet
                size={0.6}
                color="#8B7355"
                distance={15}
                speed={0.4}
                rotationSpeed={0.8}
                initialAngle={0}
            />

            <Planet
                size={0.9}
                color="#FFC649"
                distance={22}
                speed={0.3}
                rotationSpeed={0.6}
                initialAngle={Math.PI / 3}
            />

            <Planet
                size={1.0}
                color="#6B93D6"
                distance={30}
                speed={0.22}
                rotationSpeed={0.4}
                initialAngle={Math.PI}
            />

            <Planet
                size={0.8}
                color="#CD5C5C"
                distance={38}
                speed={0.18}
                rotationSpeed={0.3}
                initialAngle={Math.PI * 1.5}
            />

            {/* Outer gas giants with realistic natural colors */}
            <Planet
                size={2.0}
                color="#D2691E"
                distance={47}
                speed={0.12}
                rotationSpeed={0.2}
                initialAngle={Math.PI / 6}
            />

            <Planet
                size={1.7}
                color="#4FD0E3"
                distance={56}
                speed={0.08}
                rotationSpeed={0.15}
                initialAngle={Math.PI * 1.2}
            />
        </>
    )
}

// Main component with better performance settings
export default function SpaceBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const handleResize = () => {
            if (canvasRef.current) {
                canvasRef.current.style.width = '100vw'
                canvasRef.current.style.height = '100vh'
            }
        }

        window.addEventListener('resize', handleResize)
        handleResize()

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    return (
        <div className="fixed inset-0 w-full h-full z-0">
            <Canvas
                ref={canvasRef}
                shadows
                camera={{
                    position: [0, 35, 65],
                    fov: 50,
                    near: 0.1,
                    far: 1000
                }}
                style={{
                    background: 'linear-gradient(to bottom, #1a0a2a 0%, #0a0010 25%, #000000 50%, #000000 75%, #000000 100%)',
                    width: '100%',
                    height: '100%'
                }}
                dpr={[0.5, 1.5]}
                performance={{ min: 0.5 }}
                frameloop="always"
            >
                <CameraController />
                <Scene />
            </Canvas>
        </div>
    )
}
