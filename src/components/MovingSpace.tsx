'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function MovingSpace() {
    const mountRef = useRef<HTMLDivElement>(null)
    const sceneRef = useRef<{
        scene?: THREE.Scene
        camera?: THREE.PerspectiveCamera
        renderer?: THREE.WebGLRenderer
        animationId?: number
        planets?: THREE.Mesh[]
        asteroids?: THREE.Mesh[]
        nebulaClouds?: THREE.Mesh[]
        stars?: THREE.Points[]
        speedLines?: THREE.Line[]
        absoluteStartTime?: number
        warpSpeed?: number
        targetSpeed?: number
        currentSpeed?: number
        warpDuration?: number
        warpStartTime?: number
    }>({})

    useEffect(() => {
        if (!mountRef.current) return

        // Initialize Three.js scene
        const scene = new THREE.Scene()
        scene.fog = new THREE.FogExp2(0x000000, 0.0012)

        const camera = new THREE.PerspectiveCamera(
            65,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        )
        camera.position.z = 32

        const renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: false,
            powerPreference: 'high-performance'
        })
        renderer.setSize(window.innerWidth, window.innerHeight)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        renderer.setClearColor(0x000000, 1)
        mountRef.current.appendChild(renderer.domElement)

        // Initialize variables
        const planets: THREE.Mesh[] = []
        const asteroids: THREE.Mesh[] = []
        const nebulaClouds: THREE.Mesh[] = []
        const stars: THREE.Points[] = []
        const speedLines: THREE.Line[] = []
        const absoluteStartTime = Date.now()
        const warpSpeed = 4.0
        const targetSpeed = 1.0
        let currentSpeed = warpSpeed
        const warpDuration = 3800
        const warpStartTime = Date.now()

        // Store in ref
        sceneRef.current = {
            scene,
            camera,
            renderer,
            planets,
            asteroids,
            nebulaClouds,
            stars,
            speedLines,
            absoluteStartTime,
            warpSpeed,
            targetSpeed,
            currentSpeed,
            warpDuration,
            warpStartTime
        }

        // Create starfield
        function createStarfield() {
            const starGeometry = new THREE.BufferGeometry()
            const starCount = 3500
            const positions = new Float32Array(starCount * 3)
            const colors = new Float32Array(starCount * 3)
            const sizes = new Float32Array(starCount)

            for (let i = 0; i < starCount; i++) {
                positions[i * 3] = (Math.random() - 0.5) * 350
                positions[i * 3 + 1] = (Math.random() - 0.5) * 350
                positions[i * 3 + 2] = (Math.random() - 0.5) * 350

                const colorChoice = Math.random()
                if (colorChoice > 0.97) {
                    colors[i * 3] = 0.7
                    colors[i * 3 + 1] = 0.85
                    colors[i * 3 + 2] = 1.0
                    sizes[i] = Math.random() * 0.8 + 0.4
                } else if (colorChoice > 0.94) {
                    colors[i * 3] = 1.0
                    colors[i * 3 + 1] = 0.95
                    colors[i * 3 + 2] = 0.8
                    sizes[i] = Math.random() * 0.7 + 0.3
                } else {
                    const brightness = 0.85 + Math.random() * 0.15
                    colors[i * 3] = brightness
                    colors[i * 3 + 1] = brightness
                    colors[i * 3 + 2] = brightness
                    sizes[i] = Math.random() * 0.5 + 0.2
                }
            }

            starGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
            starGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
            starGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1))

            const starMaterial = new THREE.PointsMaterial({
                size: 0.35,
                sizeAttenuation: true,
                transparent: true,
                opacity: 0.8,
                vertexColors: true,
                blending: THREE.AdditiveBlending,
                depthWrite: false
            })

            const starField = new THREE.Points(starGeometry, starMaterial)
            scene.add(starField)
            stars.push(starField)
        }

        // Create planet texture
        function createPlanetTexture(type: string) {
            const canvas = document.createElement('canvas')
            canvas.width = 512
            canvas.height = 512
            const ctx = canvas.getContext('2d')!

            if (type === 'earth') {
                const gradient = ctx.createLinearGradient(0, 0, 512, 512)
                gradient.addColorStop(0, '#3a6f8a')
                gradient.addColorStop(0.5, '#4d9bca')
                gradient.addColorStop(1, '#359ba5')
                ctx.fillStyle = gradient
                ctx.fillRect(0, 0, 512, 512)

                ctx.fillStyle = 'rgba(90, 160, 100, 0.9)'
                for (let i = 0; i < 10; i++) {
                    ctx.beginPath()
                    ctx.arc(Math.random() * 512, Math.random() * 512, Math.random() * 65 + 30, 0, Math.PI * 2)
                    ctx.fill()
                }
            } else if (type === 'mars') {
                const gradient = ctx.createRadialGradient(256, 256, 0, 256, 256, 512)
                gradient.addColorStop(0, '#e87c7c')
                gradient.addColorStop(0.5, '#c0724d')
                gradient.addColorStop(1, '#ab6533')
                ctx.fillStyle = gradient
                ctx.fillRect(0, 0, 512, 512)

                ctx.fillStyle = 'rgba(159, 89, 39, 0.4)'
                for (let i = 0; i < 22; i++) {
                    ctx.beginPath()
                    ctx.arc(Math.random() * 512, Math.random() * 512, Math.random() * 22 + 14, 0, Math.PI * 2)
                    ctx.fill()
                }
            } else if (type === 'gas') {
                for (let y = 0; y < 512; y += 16) {
                    const hue = 38 + Math.random() * 22
                    const lightness = 48 + Math.random() * 12
                    ctx.fillStyle = `hsl(${hue}, 60%, ${lightness}%)`
                    ctx.fillRect(0, y, 512, 16 + Math.random() * 10)
                }
            } else if (type === 'ice') {
                const gradient = ctx.createRadialGradient(256, 256, 0, 256, 256, 512)
                gradient.addColorStop(0, '#fafcff')
                gradient.addColorStop(0.5, '#a7d8f0')
                gradient.addColorStop(1, '#6aa2d4')
                ctx.fillStyle = gradient
                ctx.fillRect(0, 0, 512, 512)
            }

            const texture = new THREE.Texture(canvas)
            texture.needsUpdate = true
            return texture
        }

        // Create planets
        function createPlanets() {
            const planetConfigs = [
                { radius: 2.0, type: 'earth', x: -22, y: 8, z: -60, freq: 0.11 },
                { radius: 2.0, type: 'mars', x: 20, y: -12, z: -70, freq: 0.09 },
                { radius: 2.0, type: 'ice', x: -18, y: -9, z: -55, freq: 0.14 },
                { radius: 2.0, type: 'gas', x: 8, y: 16, z: -65, freq: 0.10 }
            ]

            planetConfigs.forEach((config) => {
                const geometry = new THREE.SphereGeometry(config.radius, 64, 64)
                const texture = createPlanetTexture(config.type)
                const material = new THREE.MeshPhongMaterial({
                    map: texture,
                    shininess: 30,
                    specular: 0x444444,
                    emissive: 0x111111,
                    emissiveIntensity: 0.2
                })

                const planet = new THREE.Mesh(geometry, material)
                planet.position.set(config.x, config.y, config.z)

                const glowGeometry = new THREE.SphereGeometry(config.radius * 1.18, 32, 32)
                const glowMaterial = new THREE.MeshBasicMaterial({
                    color: 0x6699ff,
                    transparent: true,
                    opacity: 0.06,
                    side: THREE.BackSide,
                    blending: THREE.AdditiveBlending
                })
                const glow = new THREE.Mesh(glowGeometry, glowMaterial)
                planet.add(glow)

                planet.userData = {
                    frequency: config.freq,
                    rotationSpeed: Math.random() * 0.005 + 0.003,
                    offset: Math.random() * Math.PI * 2,
                    startZ: config.z,
                    baseX: config.x,
                    baseY: config.y
                }

                scene.add(planet)
                planets.push(planet)
            })
        }

        // Create asteroids
        function createAsteroids() {
            for (let i = 0; i < 12; i++) {
                const size = Math.random() * 0.4 + 0.22

                const geometry = new THREE.SphereGeometry(size, 12, 12)
                const positions = geometry.attributes.position.array as Float32Array

                for (let j = 0; j < positions.length; j += 3) {
                    const noise = 0.7 + Math.random() * 0.5
                    positions[j] *= noise
                    positions[j + 1] *= noise
                    positions[j + 2] *= noise
                }
                geometry.computeVertexNormals()

                const grayValue = 0.24 + Math.random() * 0.1
                const material = new THREE.MeshPhongMaterial({
                    color: new THREE.Color(grayValue * 1.5, grayValue * 1.4, grayValue * 1.3),
                    shininess: 10,
                    emissive: new THREE.Color(grayValue * 0.3, grayValue * 0.25, grayValue * 0.2)
                })

                const asteroid = new THREE.Mesh(geometry, material)
                asteroid.position.set(
                    (Math.random() - 0.5) * 60,
                    (Math.random() - 0.5) * 60,
                    -90 - Math.random() * 30
                )

                asteroid.userData = {
                    speed: Math.random() * 0.22 + 0.10,
                    rotationX: (Math.random() - 0.5) * 0.015,
                    rotationY: (Math.random() - 0.5) * 0.015,
                    rotationZ: (Math.random() - 0.5) * 0.015
                }

                scene.add(asteroid)
                asteroids.push(asteroid)
            }
        }

        // Create nebula clouds
        function createNebulaClouds() {
            const nebulaConfigs = [
                // Regular background nebulae - increased brightness and visibility
                { color: { r: 113, g: 56, b: 165 }, size: 35, opacity: 0.17, isBackground: false },
                { color: { r: 60, g: 103, b: 173 }, size: 40, opacity: 0.15, isBackground: false },
                { color: { r: 167, g: 68, b: 117 }, size: 32, opacity: 0.27, isBackground: false },
                // Additional nebulae behind text area - increased brightness and visibility
                { color: { r: 70, g: 25, b: 103 }, size: 45, opacity: 0.17, isBackground: true },
                { color: { r: 108, g: 51, b: 161 }, size: 38, opacity: 0.19, isBackground: true },
                { color: { r: 40, g: 40, b: 92 }, size: 42, opacity: 0.15, isBackground: true },
                // Moving nebula that goes from left to right
                { color: { r: 100, g: 80, b: 180 }, size: 50, opacity: 0.13, isBackground: false, isMoving: true }
            ]

            nebulaConfigs.forEach((config) => {
                const canvas = document.createElement('canvas')
                canvas.width = 512
                canvas.height = 512
                const ctx = canvas.getContext('2d')!

                const gradient = ctx.createRadialGradient(256, 256, 0, 256, 256, 256)
                gradient.addColorStop(0, `rgba(${config.color.r},${config.color.g},${config.color.b},${config.opacity})`)
                gradient.addColorStop(0.3, `rgba(${config.color.r},${config.color.g},${config.color.b},${config.opacity * 0.7})`)
                gradient.addColorStop(0.6, `rgba(${config.color.r},${config.color.g},${config.color.b},${config.opacity * 0.3})`)
                gradient.addColorStop(1, `rgba(${config.color.r},${config.color.g},${config.color.b},0)`)
                ctx.fillStyle = gradient
                ctx.fillRect(0, 0, 512, 512)

                for (let j = 0; j < 8; j++) {
                    const x = Math.random() * 512
                    const y = Math.random() * 512
                    const size = Math.random() * 160 + 110
                    const localGrad = ctx.createRadialGradient(x, y, 0, x, y, size)
                    localGrad.addColorStop(0, `rgba(${config.color.r},${config.color.g},${config.color.b},${config.opacity * 0.65})`)
                    localGrad.addColorStop(1, `rgba(${config.color.r},${config.color.g},${config.color.b},0)`)
                    ctx.fillStyle = localGrad
                    ctx.fillRect(0, 0, 512, 512)
                }

                const texture = new THREE.Texture(canvas)
                texture.needsUpdate = true

                const geometry = new THREE.PlaneGeometry(config.size, config.size)
                const material = new THREE.MeshBasicMaterial({
                    map: texture,
                    transparent: true,
                    opacity: 0.1,
                    side: THREE.DoubleSide,
                    blending: THREE.NormalBlending,
                    depthWrite: false,
                    alphaTest: 0.01
                })

                const cloud = new THREE.Mesh(geometry, material)

                // Position clouds - special positioning for background clouds behind text
                if (config.isMoving) {
                    // Position moving nebula starting from left side
                    cloud.position.set(
                        -150,  // Start from left side of screen
                        (Math.random() - 0.5) * 80 - 15,  // Random vertical position, moved down
                        -180 - Math.random() * 40    // Middle depth
                    )
                } else if (config.isBackground) {
                    // Position behind text area (center screen, further back)
                    cloud.position.set(
                        (Math.random() - 0.5) * 80,  // Narrower spread horizontally
                        (Math.random() - 0.5) * 60 + 5,  // Narrower spread vertically around text area, moved down
                        -200 - Math.random() * 50    // Further back, behind regular nebulae
                    )
                } else {
                    // Regular nebula positioning
                    cloud.position.set(
                        (Math.random() - 0.5) * 120,
                        (Math.random() - 0.5) * 120 + 5,  // Moved down
                        -170 - Math.random() * 80
                    )
                }

                cloud.rotation.z = Math.random() * Math.PI * 2

                cloud.userData = config.isMoving ? {
                    // Special movement for the left-to-right moving nebula
                    rotationSpeed: 0.001,  // Very slow rotation
                    driftX: 0.015,         // Consistent rightward movement
                    driftY: 0,             // No vertical drift
                    pulseSpeed: 0.4,
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
                    rotationSpeed: (Math.random() - 0.5) * 0.002,  // Slower rotation speed
                    driftX: (Math.random() - 0.5) * 0.010,         // Slower horizontal drift
                    driftY: 0,         // No vertical drift
                    pulseSpeed: Math.random() * 0.5 + 0.3,
                    pulseOffset: Math.random() * Math.PI * 2,
                    baseOpacity: config.isBackground ? 0.4 : 0.6,
                    // Additional random movement parameters
                    randomDriftSpeed: Math.random() * 0.3 + 0.2,   // Slower random movement
                    randomOffsetX: Math.random() * Math.PI * 2,     // Random phase for X movement
                    randomOffsetY: 0,     // No random Y movement
                    baseX: 0,  // Will be set after positioning
                    baseY: 0,  // Will be set after positioning
                    // Spinning motion parameters
                    spinSpeedX: (Math.random() - 0.5) * 0.008,     // X-axis spin
                    spinSpeedY: (Math.random() - 0.5) * 0.006,     // Y-axis spin
                    spinSpeedZ: (Math.random() - 0.5) * 0.004      // Z-axis spin (additional to existing rotation)
                }

                // Store base position for random movement
                cloud.userData.baseX = cloud.position.x
                cloud.userData.baseY = cloud.position.y

                scene.add(cloud)
                nebulaClouds.push(cloud)
            })
        }

        // Create speed lines
        function createSpeedLines() {
            for (let i = 0; i < 100; i++) {
                const geometry = new THREE.BufferGeometry()
                const length = Math.random() * 3 + 5
                const positions = new Float32Array([
                    0, 0, 0,
                    0, 0, -length
                ])
                geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

                const material = new THREE.LineBasicMaterial({
                    color: 0xffffff,
                    transparent: true,
                    opacity: 0.4
                })

                const line = new THREE.Line(geometry, material)
                line.position.set(
                    (Math.random() - 0.5) * 120,
                    (Math.random() - 0.5) * 120,
                    -Math.random() * 120 - 30
                )

                line.userData = {
                    speed: Math.random() * 1.2 + 0.6,
                    initialOpacity: 0.4
                }

                scene.add(line)
                speedLines.push(line)
            }
        }

        // Easing function
        function easeOutQuint(x: number) {
            return 1 - Math.pow(1 - x, 5)
        }

        // Animation loop
        function animate() {
            const absoluteTime = (Date.now() - absoluteStartTime) * 0.001

            const warpElapsed = Date.now() - warpStartTime
            if (warpElapsed < warpDuration) {
                currentSpeed = warpSpeed
            } else {
                const transitionTime = 4000
                const transitionElapsed = warpElapsed - warpDuration
                if (transitionElapsed < transitionTime) {
                    const progress = transitionElapsed / transitionTime
                    const eased = easeOutQuint(progress)
                    currentSpeed = warpSpeed + (targetSpeed - warpSpeed) * eased
                } else {
                    currentSpeed = targetSpeed
                }
            }

            const speedLineOpacity = Math.max(0, (currentSpeed - 1) / (warpSpeed - 1))

            // Update speed lines
            speedLines.forEach((line) => {
                line.position.z += line.userData.speed * currentSpeed * 1.7
                const material = line.material as THREE.LineBasicMaterial
                material.opacity = speedLineOpacity * line.userData.initialOpacity

                if (line.position.z > 35) {
                    line.position.z = -140
                    line.position.x = (Math.random() - 0.5) * 120
                    line.position.y = (Math.random() - 0.5) * 120
                }
            })

            // Update planets
            planets.forEach((planet) => {
                const cycleTime = absoluteTime * planet.userData.frequency
                const zProgress = (Math.sin(cycleTime + planet.userData.offset) + 1) / 2
                planet.position.z = planet.userData.startZ + (zProgress * 80)

                const distanceFromCamera = camera.position.z - planet.position.z
                const scaleFactor = Math.max(0.5, Math.min(3.5, 55 / distanceFromCamera))
                planet.scale.set(scaleFactor, scaleFactor, scaleFactor)

                planet.position.y = planet.userData.baseY + Math.sin(absoluteTime * 0.22 + planet.userData.offset) * 2.4
                planet.position.x = planet.userData.baseX + Math.sin(absoluteTime * 0.19 + planet.userData.offset) * 1.8

                planet.rotation.y += planet.userData.rotationSpeed
                planet.rotation.x += planet.userData.rotationSpeed * 0.25
            })

            // Update asteroids
            asteroids.forEach((asteroid) => {
                asteroid.position.z += asteroid.userData.speed * currentSpeed

                const distanceFromCamera = camera.position.z - asteroid.position.z
                const scaleFactor = Math.max(0.4, Math.min(2.2, 38 / distanceFromCamera))
                asteroid.scale.set(scaleFactor, scaleFactor, scaleFactor)

                if (asteroid.position.z > 35) {
                    asteroid.position.z = -130
                    asteroid.position.x = (Math.random() - 0.5) * 60
                    asteroid.position.y = (Math.random() - 0.5) * 60
                }

                asteroid.rotation.x += asteroid.userData.rotationX * currentSpeed
                asteroid.rotation.y += asteroid.userData.rotationY * currentSpeed
                asteroid.rotation.z += asteroid.userData.rotationZ * currentSpeed
            })

            // Update nebula clouds - enhanced random movement and rotation
            nebulaClouds.forEach((cloud) => {
                const time = absoluteTime * cloud.userData.pulseSpeed + cloud.userData.pulseOffset
                const randomTime = absoluteTime * cloud.userData.randomDriftSpeed

                // Random sinusoidal movement around base position (slower)
                const randomX = Math.sin(randomTime + cloud.userData.randomOffsetX) * 15
                const randomY = 0  // No vertical random movement

                // Combine linear drift with random movement
                cloud.userData.baseX += cloud.userData.driftX
                cloud.userData.baseY += cloud.userData.driftY

                // Apply final position with random oscillation
                cloud.position.x = cloud.userData.baseX + randomX
                cloud.position.y = cloud.userData.baseY + randomY

                // Enhanced 3D spinning motion
                cloud.rotation.x += cloud.userData.spinSpeedX
                cloud.rotation.y += cloud.userData.spinSpeedY
                cloud.rotation.z += cloud.userData.rotationSpeed + cloud.userData.spinSpeedZ
                cloud.rotation.z += Math.sin(randomTime * 0.5) * 0.001  // Slower additional random rotation

                // Pulsing opacity animation
                const material = cloud.material as THREE.MeshBasicMaterial
                material.opacity = cloud.userData.baseOpacity + Math.sin(time) * 0.2

                // Gentle scale pulsing with slight random variation
                const scaleVariation = 1 + Math.sin(time * 0.7) * 0.15 + Math.cos(randomTime * 0.3) * 0.05
                cloud.scale.set(scaleVariation, scaleVariation, 1)

                // Keep base position within bounds by wrapping around
                if (cloud.userData.baseX > 150) cloud.userData.baseX = -150
                if (cloud.userData.baseX < -150) cloud.userData.baseX = 150
                if (cloud.userData.baseY > 150) cloud.userData.baseY = -150
                if (cloud.userData.baseY < -150) cloud.userData.baseY = 150
            })

            // Update stars
            stars.forEach((starField) => {
                starField.rotation.y += 0.00005 * currentSpeed
                starField.rotation.x += 0.000025 * currentSpeed
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
        createStarfield()
        createNebulaClouds()
        createPlanets()
        createAsteroids()
        createSpeedLines()

        // Add enhanced lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.8)
        scene.add(ambientLight)

        const pointLight1 = new THREE.PointLight(0xffffff, 2.5, 200)
        pointLight1.position.set(30, 30, 30)
        scene.add(pointLight1)

        const pointLight2 = new THREE.PointLight(0x7c3aed, 1.2, 150)
        pointLight2.position.set(-25, -20, 20)
        scene.add(pointLight2)

        const pointLight3 = new THREE.PointLight(0x00aaff, 1.0, 120)
        pointLight3.position.set(0, 50, -10)
        scene.add(pointLight3)

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5)
        directionalLight.position.set(50, 50, 50)
        scene.add(directionalLight)

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
            className="w-full h-full"
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
        />
    )
}