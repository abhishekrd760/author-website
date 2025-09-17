'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Individual tetrahedron component
function Tetrahedron({ vertices, faceIndex }: { vertices: THREE.Vector3[], faceIndex: number }) {
    const geometry = useMemo(() => {
        const geom = new THREE.BufferGeometry()

        const positions: number[] = []
        const colors: number[] = []

        // Define the 4 triangular faces
        const faces = [
            [0, 1, 2], [0, 2, 3], [0, 3, 1], [1, 3, 2]
        ]

        faces.forEach((face, index) => {
            face.forEach(vertexIndex => {
                const vertex = vertices[vertexIndex]
                positions.push(vertex.x, vertex.y, vertex.z)

                // Different color for each face with better brightness
                const hue = index * 0.25
                const color = new THREE.Color().setHSL(hue, 0.7, 0.8)  // Increased lightness from 0.7 to 0.8
                colors.push(color.r, color.g, color.b)
            })
        })

        geom.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
        geom.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))
        geom.computeVertexNormals()

        return geom
    }, [vertices])

    return (
        <mesh geometry={geometry}>
            <meshPhongMaterial
                vertexColors
                transparent
                opacity={0.8}
                side={THREE.DoubleSide}
            />
        </mesh>
    )
}

// Fractal pyramid generator
function FractalPyramid() {
    const groupRef = useRef<THREE.Group>(null)

    const tetrahedra = useMemo(() => {
        const size = 4  // Increased from 3 to 4 for even larger pyramid
        const height = size * Math.sqrt(2 / 3)
        const radius = size * Math.sqrt(3) / 3

        // Create a perfectly symmetrical tetrahedron
        const vertices = [
            new THREE.Vector3(0, height / 2, 0), // top vertex
            new THREE.Vector3(radius, -height / 2, 0), // bottom front
            new THREE.Vector3(-radius / 2, -height / 2, radius * Math.sqrt(3) / 2), // bottom left
            new THREE.Vector3(-radius / 2, -height / 2, -radius * Math.sqrt(3) / 2)  // bottom right
        ]

        // Generate Sierpinski tetrahedron at depth 1
        const tetrahedraList: THREE.Vector3[][] = []

        function generateSierpinski(verts: THREE.Vector3[], depth: number) {
            if (depth === 0) {
                tetrahedraList.push([...verts])
                return
            }

            // Calculate midpoints of edges
            const midpoints: THREE.Vector3[] = []
            for (let i = 0; i < 4; i++) {
                for (let j = i + 1; j < 4; j++) {
                    const mid = new THREE.Vector3().addVectors(verts[i], verts[j]).multiplyScalar(0.5)
                    midpoints.push(mid)
                }
            }

            // Create 4 smaller tetrahedra at corners
            const newTetrahedra = [
                [verts[0], midpoints[0], midpoints[1], midpoints[2]], // top
                [verts[1], midpoints[0], midpoints[3], midpoints[4]], // front left
                [verts[2], midpoints[1], midpoints[3], midpoints[5]], // front right
                [verts[3], midpoints[2], midpoints[4], midpoints[5]]  // back
            ]

            newTetrahedra.forEach(tetra => {
                generateSierpinski(tetra, depth - 1)
            })
        }

        generateSierpinski(vertices, 1)
        return tetrahedraList
    }, [])

    useFrame((state, delta) => {
        if (groupRef.current) {
            groupRef.current.rotation.y += delta * 0.5
        }
    })

    return (
        <group ref={groupRef}>
            {/* Lighting - enhanced for better face illumination */}
            <ambientLight intensity={0.8} color="#404040" />
            <directionalLight
                position={[10, 10, 5]}
                intensity={1.2}
                color="#ffffff"
            />
            {/* Additional fill light to reduce dark faces */}
            <directionalLight
                position={[-10, -5, 5]}
                intensity={0.4}
                color="#ffffff"
            />

            {/* Tetrahedra */}
            {tetrahedra.map((vertices, index) => (
                <Tetrahedron key={index} vertices={vertices} faceIndex={index} />
            ))}
        </group>
    )
}

// Main fractal pyramid component
export default function FractalPyramidComponent() {
    return (
        <div className="w-48 h-48 mx-auto">
            <Canvas
                camera={{
                    position: [0, 0, 7],  // Moved camera back to zoom out
                    fov: 50,
                    near: 0.1,
                    far: 100
                }}
                style={{ background: 'transparent' }}
            >
                <FractalPyramid />
            </Canvas>
        </div>
    )
}