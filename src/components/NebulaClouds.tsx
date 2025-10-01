'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function NebulaClouds() {
    const mountRef = useRef<HTMLDivElement>(null)
    const sceneRef = useRef<{
        scene?: THREE.Scene
        camera?: THREE.PerspectiveCamera
        renderer?: THREE.WebGLRenderer
        animationId?: number
        nebulaClouds?: THREE.Mesh[]
        absoluteStartTime?: number
    }>({})

    useEffect(() => {
        if (!mountRef.current) return

        // Initialize Three.js scene
        const scene = new THREE.Scene()

        const camera = new THREE.PerspectiveCamera(
            65,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        )
        camera.position.z = 32

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

        // Initialize variables
        const nebulaClouds: THREE.Mesh[] = []
        const absoluteStartTime = Date.now()

        // Store in ref
        sceneRef.current = {
            scene,
            camera,
            renderer,
            nebulaClouds,
            absoluteStartTime
        }

        // Create nebula clouds
        function createNebulaClouds() {
            const nebulaConfigs = [
                // Regular background nebulae - vibrant cosmic colors
                { color: { r: 138, g: 43, b: 226 }, size: 30, opacity: 0.45, isBackground: false }, // Blue Violet
                { color: { r: 75, g: 0, b: 130 }, size: 27, opacity: 0.4, isBackground: false },   // Indigo
                { color: { r: 186, g: 85, b: 211 }, size: 25, opacity: 0.5, isBackground: false }, // Medium Orchid
                { color: { r: 255, g: 20, b: 147 }, size: 32, opacity: 0.35, isBackground: false }, // Deep Pink
                // Additional nebulae behind text area - deeper cosmic hues
                { color: { r: 25, g: 25, b: 112 }, size: 34, opacity: 0.4, isBackground: true },   // Midnight Blue
                { color: { r: 139, g: 69, b: 19 }, size: 28, opacity: 0.45, isBackground: true },  // Saddle Brown (cosmic dust)
                { color: { r: 148, g: 0, b: 211 }, size: 26, opacity: 0.38, isBackground: true },  // Dark Violet
                // Moving nebula that goes from left to right - dynamic purple
                { color: { r: 128, g: 0, b: 128 }, size: 39, opacity: 0.32, isBackground: false, isMoving: true } // Purple
            ]

            nebulaConfigs.forEach((config) => {
                const canvas = document.createElement('canvas')
                canvas.width = 512
                canvas.height = 512
                const ctx = canvas.getContext('2d')!

                // Create multiple overlapping cloud-like gradients for organic shape
                const numClouds = 10 + Math.floor(Math.random() * 8) // 10-17 cloud puffs per nebula for more density

                for (let j = 0; j < numClouds; j++) {
                    // Create irregular cloud puffs at random positions with better distribution
                    const centerX = 150 + Math.random() * 362 // Better spread across canvas
                    const centerY = 150 + Math.random() * 362
                    const radius = 60 + Math.random() * 140 // Wider size range for more variation

                    // Create elliptical gradient for more organic shape with more variation
                    const angle = Math.random() * Math.PI * 2
                    const scaleX = 0.4 + Math.random() * 1.2 // More elliptical variation
                    const scaleY = 0.4 + Math.random() * 1.2

                    const gradient = ctx.createRadialGradient(
                        centerX, centerY, 0,
                        centerX + Math.cos(angle) * radius * scaleX,
                        centerY + Math.sin(angle) * radius * scaleY,
                        radius
                    )

                    // More sophisticated opacity falloff with cosmic nebula characteristics
                    const baseOpacity = config.opacity * (0.3 + Math.random() * 0.9) // Wider opacity range
                    const intensity = 0.7 + Math.random() * 0.5 // Random intensity variation

                    gradient.addColorStop(0, `rgba(${Math.min(255, config.color.r * intensity)},${Math.min(255, config.color.g * intensity)},${Math.min(255, config.color.b * intensity)},${baseOpacity})`)
                    gradient.addColorStop(0.2, `rgba(${config.color.r},${config.color.g},${config.color.b},${baseOpacity * 0.85})`)
                    gradient.addColorStop(0.5, `rgba(${config.color.r},${config.color.g},${config.color.b},${baseOpacity * 0.6})`)
                    gradient.addColorStop(0.8, `rgba(${config.color.r},${config.color.g},${config.color.b},${baseOpacity * 0.25})`)
                    gradient.addColorStop(1, `rgba(${config.color.r},${config.color.g},${config.color.b},0)`)

                    ctx.fillStyle = gradient
                    ctx.fillRect(0, 0, 512, 512)
                }

                // Add layered density variations for more realistic nebula structure
                for (let layer = 0; layer < 3; layer++) {
                    const layerOpacity = config.opacity * (0.1 + layer * 0.15)
                    const numLayerClouds = 5 + Math.floor(Math.random() * 4)

                    for (let l = 0; l < numLayerClouds; l++) {
                        const centerX = 180 + Math.random() * 322
                        const centerY = 180 + Math.random() * 322
                        const smallRadius = 40 + Math.random() * 80

                        const layerGrad = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, smallRadius)
                        layerGrad.addColorStop(0, `rgba(${config.color.r},${config.color.g},${config.color.b},${layerOpacity * 0.8})`)
                        layerGrad.addColorStop(0.6, `rgba(${config.color.r},${config.color.g},${config.color.b},${layerOpacity * 0.3})`)
                        layerGrad.addColorStop(1, `rgba(${config.color.r},${config.color.g},${config.color.b},0)`)

                        ctx.fillStyle = layerGrad
                        ctx.fillRect(0, 0, 512, 512)
                    }
                }

                // Add enhanced scattered highlights and cosmic dust effects
                for (let k = 0; k < 20; k++) {
                    const x = Math.random() * 512
                    const y = Math.random() * 512
                    const smallRadius = 15 + Math.random() * 45

                    const highlightGrad = ctx.createRadialGradient(x, y, 0, x, y, smallRadius)
                    const highlightOpacity = config.opacity * (0.15 + Math.random() * 0.6)

                    // Create brighter highlights with slight color variation
                    const brightnessBoost = 1.2 + Math.random() * 0.8
                    highlightGrad.addColorStop(0, `rgba(${Math.min(255, config.color.r * brightnessBoost)},${Math.min(255, config.color.g * brightnessBoost)},${Math.min(255, config.color.b * brightnessBoost)},${highlightOpacity})`)
                    highlightGrad.addColorStop(0.4, `rgba(${config.color.r},${config.color.g},${config.color.b},${highlightOpacity * 0.6})`)
                    highlightGrad.addColorStop(1, `rgba(${config.color.r},${config.color.g},${config.color.b},0)`)

                    ctx.fillStyle = highlightGrad
                    ctx.fillRect(0, 0, 512, 512)
                }

                const texture = new THREE.Texture(canvas)
                texture.needsUpdate = true

                const geometry = new THREE.PlaneGeometry(config.size, config.size)
                const material = new THREE.MeshBasicMaterial({
                    map: texture,
                    transparent: true,
                    opacity: 0.5,
                    side: THREE.DoubleSide,
                    blending: THREE.NormalBlending,
                    depthWrite: false,
                    alphaTest: 0.01
                })

                const cloud = new THREE.Mesh(geometry, material)

                // Position clouds in tape-thin horizontal band around "Beyond Time and Space" text
                if (config.isMoving) {
                    // Position moving nebula starting from left side, tape-thin vertical band
                    cloud.position.set(
                        -150,  // Start from left side of screen
                        (Math.random() - 0.5) * 0.002 + 14.5,  // Moved up more (14.499 to 14.501)
                        -160 - Math.random() * 60    // Enhanced depth range for moving nebula
                    )
                } else if (config.isBackground) {
                    // Position behind text area in tape-thin horizontal band
                    const depthVariation = Math.random() * 40
                    cloud.position.set(
                        (Math.random() - 0.5) * 100,  // Wider horizontal spread
                        (Math.random() - 0.5) * 0.0016 + 12.5,  // Moved up more (12.4992 to 12.5008)
                        -180 - depthVariation  // Varied depths behind text (-180 to -220)
                    )
                } else {
                    // Regular nebulae in tape-thin horizontal band
                    const depthVariation = Math.random() * 30
                    cloud.position.set(
                        (Math.random() - 0.5) * 120,
                        (Math.random() - 0.5) * 0.003 + 10.5,  // Moved up more (10.4985 to 10.5015)
                        -170 - depthVariation  // Varied depths (-170 to -200)
                    )
                }

                cloud.rotation.z = Math.random() * Math.PI * 2

                cloud.userData = config.isMoving ? {
                    // Special movement for the left-to-right moving nebula
                    rotationSpeed: 0.0005,  // Much slower rotation
                    driftX: 0.002,         // Much slower consistent rightward movement
                    driftY: 0,             // No vertical drift
                    pulseSpeed: 0.2,
                    pulseOffset: 0,
                    baseOpacity: 0.6,
                    randomDriftSpeed: 0,   // No random movement
                    randomOffsetX: 0,
                    randomOffsetY: 0,
                    baseX: 0,
                    baseY: 0,
                    spinSpeedX: 0,         // No spinning
                    spinSpeedY: 0,
                    spinSpeedZ: 0
                } : {
                    rotationSpeed: (Math.random() - 0.5) * 0.001,  // Much slower rotation speed
                    driftX: (Math.random() - 0.5) * 0.001,         // Much slower horizontal drift
                    driftY: 0,         // No vertical drift
                    pulseSpeed: Math.random() * 0.3 + 0.2,
                    pulseOffset: Math.random() * Math.PI * 2,
                    baseOpacity: config.isBackground ? 0.5 : 0.6,
                    // Additional random movement parameters
                    randomDriftSpeed: Math.random() * 0.05 + 0.02,   // Much slower random movement
                    randomOffsetX: Math.random() * Math.PI * 2,     // Random phase for X movement
                    randomOffsetY: 0,     // No random Y movement
                    baseX: 0,  // Will be set after positioning
                    baseY: 0,  // Will be set after positioning
                    // Spinning motion parameters
                    spinSpeedX: (Math.random() - 0.5) * 0.004,     // Slower X-axis spin
                    spinSpeedY: (Math.random() - 0.5) * 0.003,     // Slower Y-axis spin
                    spinSpeedZ: (Math.random() - 0.5) * 0.002      // Slower Z-axis spin (additional to existing rotation)
                }

                // Store base position for random movement
                cloud.userData.baseX = cloud.position.x
                cloud.userData.baseY = cloud.position.y

                scene.add(cloud)
                nebulaClouds.push(cloud)
            })
        }

        // Animation loop
        function animate() {
            const absoluteTime = (Date.now() - absoluteStartTime) * 0.001

            // Update nebula clouds - enhanced random movement and rotation
            nebulaClouds.forEach((cloud) => {
                const time = absoluteTime * cloud.userData.pulseSpeed + cloud.userData.pulseOffset
                const randomTime = absoluteTime * cloud.userData.randomDriftSpeed

                // Horizontal-only movement patterns (no vertical movement)
                const cosmicTime = absoluteTime
                const enhancedRandomTime = time * 0.3 + cloud.userData.randomOffsetX

                // Only horizontal orbital-like motion
                const orbitalDrift = Math.sin(cosmicTime * 0.1 + cloud.userData.randomOffsetX) * 1.5

                // Only horizontal sinusoidal movement (no vertical component)
                const randomX = Math.sin(enhancedRandomTime) * 2 + Math.sin(enhancedRandomTime * 1.7) * 1
                const randomY = 0  // No vertical random movement

                // Combine horizontal movement components only
                cloud.userData.baseX += cloud.userData.driftX + orbitalDrift * 0.05
                cloud.userData.baseY += 0  // No vertical drifting

                // Apply final position with horizontal oscillation only
                cloud.position.x = cloud.userData.baseX + randomX
                cloud.position.y = cloud.userData.baseY  // Fixed position relative to content

                // Enhanced 3D rotation with multiple axes and frequencies
                cloud.rotation.x += cloud.userData.spinSpeedX + Math.sin(time * 0.5) * 0.002
                cloud.rotation.y += cloud.userData.spinSpeedY + Math.cos(time * 0.7) * 0.0015
                cloud.rotation.z += cloud.userData.rotationSpeed + cloud.userData.spinSpeedZ
                cloud.rotation.z += Math.sin(randomTime * 0.3) * 0.003  // Enhanced random rotation

                // Sophisticated opacity pulsing with multiple harmonics
                const material = cloud.material as THREE.MeshBasicMaterial
                const basePulse = Math.sin(cosmicTime) * 0.25
                const secondaryPulse = Math.sin(cosmicTime * 1.3) * 0.1
                const tertiaryPulse = Math.sin(cosmicTime * 2.1) * 0.05
                material.opacity = cloud.userData.baseOpacity + basePulse + secondaryPulse + tertiaryPulse

                // Enhanced scale pulsing with cosmic breathing effect
                const primaryScale = Math.sin(cosmicTime * 0.6) * 0.2
                const secondaryScale = Math.cos(cosmicTime * 0.9) * 0.08
                const breathingScale = Math.sin(cosmicTime * 0.3) * 0.12
                const scaleVariation = 1 + primaryScale + secondaryScale + breathingScale
                cloud.scale.setScalar(scaleVariation)

                // Keep horizontal base position within bounds by wrapping around
                if (cloud.userData.baseX > 150) cloud.userData.baseX = -150
                if (cloud.userData.baseX < -150) cloud.userData.baseX = 150
                // No vertical boundary wrapping needed since there's no vertical movement
            })

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
        createNebulaClouds()

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
            className="absolute top-0 left-0 w-full h-full pointer-events-none"
            style={{
                zIndex: 3,
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none'
            }}
        />
    )
}