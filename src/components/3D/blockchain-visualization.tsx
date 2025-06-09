"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import * as THREE from "three"

interface BlockchainVisualizationProps {
  onBlockClick: (category: string) => void
  activeBlock: string | null
}

export default function BlockchainVisualization({ onBlockClick, activeBlock }: BlockchainVisualizationProps) {
  const mountRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<THREE.Scene>()
  const rendererRef = useRef<THREE.WebGLRenderer>()
  const cameraRef = useRef<THREE.PerspectiveCamera>()
  const blocksRef = useRef<THREE.Mesh[]>([])
  const connectionsRef = useRef<THREE.Line[]>([])
  const particlesRef = useRef<THREE.Points[]>([])
  const [isMobile, setIsMobile] = useState(false)

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    if (!mountRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    sceneRef.current = scene

    // Responsive camera setup
    const camera = new THREE.PerspectiveCamera(
      isMobile ? 70 : 60, // Wider FOV for mobile
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000,
    )

    // Adjust camera position for mobile
    if (isMobile) {
      camera.position.set(0, 0, 15) // Further back for mobile
    } else {
      camera.position.set(0, 0, 12)
    }
    cameraRef.current = camera

    // Renderer setup with mobile optimizations
    const renderer = new THREE.WebGLRenderer({
      antialias: !isMobile, // Disable antialiasing on mobile for performance
      alpha: true,
      powerPreference: isMobile ? "low-power" : "high-performance",
    })

    // Set pixel ratio for mobile
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 2 : 3))
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight)
    renderer.setClearColor(0x000000, 0)
    rendererRef.current = renderer
    mountRef.current.appendChild(renderer.domElement)

    // Create digital pattern texture with mobile optimization
    const createDigitalTexture = (isActive = false) => {
      const canvas = document.createElement("canvas")
      // Smaller texture size for mobile
      const textureSize = isMobile ? 64 : 128
      canvas.width = textureSize
      canvas.height = textureSize
      const ctx = canvas.getContext("2d")!

      // Background
      ctx.fillStyle = isActive ? "#ffffff" : "#000000"
      ctx.fillRect(0, 0, textureSize, textureSize)

      // Digital grid pattern
      ctx.fillStyle = isActive ? "#000000" : "#00ffff"
      const gridSize = isMobile ? 6 : 8
      for (let x = 0; x < textureSize; x += gridSize) {
        for (let y = 0; y < textureSize; y += gridSize) {
          if (Math.random() > 0.7) {
            ctx.fillRect(x + 1, y + 1, gridSize - 2, gridSize - 2)
          }
        }
      }

      // Corner accents
      const cornerSize = isMobile ? 6 : 8
      ctx.fillStyle = isActive ? "#ffffff" : "#00ffff"
      ctx.fillRect(0, 0, cornerSize, cornerSize)
      ctx.fillRect(textureSize - cornerSize, 0, cornerSize, cornerSize)
      ctx.fillRect(0, textureSize - cornerSize, cornerSize, cornerSize)
      ctx.fillRect(textureSize - cornerSize, textureSize - cornerSize, cornerSize, cornerSize)

      const texture = new THREE.CanvasTexture(canvas)
      texture.magFilter = THREE.NearestFilter
      texture.minFilter = THREE.NearestFilter
      return texture
    }

    // Responsive block positioning
    const getBlockData = () => {
      if (isMobile) {
        // Tighter spacing for mobile
        return [
          { id: "blockchain", position: [0, 3, 0], label: "Blockchain" },
          { id: "smart-contracts", position: [0, 1.5, 0], label: "Smart Contracts" },
          { id: "dapp", position: [0, 0, 0], label: "DApps" },
          { id: "defi", position: [0, -1.5, 0], label: "DeFi" },
          { id: "web3", position: [-3, 1.5, 0], label: "Web3" },
          { id: "research", position: [3, 0, 0], label: "Research" },
        ]
      } else {
        // Original spacing for desktop
        return [
          { id: "blockchain", position: [0, 4, 0], label: "Blockchain" },
          { id: "smart-contracts", position: [0, 2, 0], label: "Smart Contracts" },
          { id: "dapp", position: [0, 0, 0], label: "DApps" },
          { id: "defi", position: [0, -2, 0], label: "DeFi" },
          { id: "web3", position: [-4, 2, 0], label: "Web3" },
          { id: "research", position: [4, 0, 0], label: "Research" },
        ]
      }
    }

    const blockData = getBlockData()

    // Create blocks with responsive sizing
    const blocks: THREE.Mesh[] = []
    blockData.forEach((data, index) => {
      const blockSize = isMobile ? 0.8 : 1 // Smaller blocks on mobile
      const geometry = new THREE.BoxGeometry(blockSize, blockSize, blockSize)
      const texture = createDigitalTexture(false)
      const material = new THREE.MeshBasicMaterial({ map: texture })
      const materials = [material, material, material, material, material, material]

      const cube = new THREE.Mesh(geometry, materials)
      cube.position.set(data.position[0], data.position[1], data.position[2])
      cube.userData = { id: data.id, label: data.label, originalPosition: [...data.position] }

      // Add glowing edges
      const edges = new THREE.EdgesGeometry(geometry)
      const lineMaterial = new THREE.LineBasicMaterial({
        color: 0x00ffff,
        transparent: true,
        opacity: 0.8,
      })
      const wireframe = new THREE.LineSegments(edges, lineMaterial)
      cube.add(wireframe)

      scene.add(cube)
      blocks.push(cube)
    })

    blocksRef.current = blocks

    // Create connections with mobile optimization
    const connections = [
      [0, 1],
      [1, 2],
      [2, 3],
      [0, 4],
      [1, 5],
      [4, 2],
      [5, 3],
    ]

    const connectionLines: THREE.Line[] = []
    const dataParticles: THREE.Points[] = []

    connections.forEach(([startIdx, endIdx], connectionIndex) => {
      const start = blocks[startIdx].position
      const end = blocks[endIdx].position

      // Create connection line
      const geometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(start.x, start.y, start.z),
        new THREE.Vector3(end.x, end.y, end.z),
      ])

      const material = new THREE.LineBasicMaterial({
        color: 0x00ffff,
        transparent: true,
        opacity: 0.6,
        linewidth: isMobile ? 1 : 2, // Thinner lines on mobile
      })

      const line = new THREE.Line(geometry, material)
      scene.add(line)
      connectionLines.push(line)

      // Fewer particles on mobile for performance
      const particleCount = isMobile ? 4 : 8
      const particleGeometry = new THREE.BufferGeometry()
      const positions = new Float32Array(particleCount * 3)
      const colors = new Float32Array(particleCount * 3)

      for (let i = 0; i < particleCount; i++) {
        const t = i / (particleCount - 1)
        const position = new THREE.Vector3().lerpVectors(start, end, t)

        positions[i * 3] = position.x
        positions[i * 3 + 1] = position.y
        positions[i * 3 + 2] = position.z

        colors[i * 3] = 0
        colors[i * 3 + 1] = 1
        colors[i * 3 + 2] = 1
      }

      particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))
      particleGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3))

      const particleMaterial = new THREE.PointsMaterial({
        size: isMobile ? 0.08 : 0.1, // Smaller particles on mobile
        transparent: true,
        opacity: 0.8,
        vertexColors: true,
        blending: THREE.AdditiveBlending,
      })

      const particles = new THREE.Points(particleGeometry, particleMaterial)
      particles.userData = {
        startPos: start.clone(),
        endPos: end.clone(),
        connectionIndex,
        particleCount,
      }
      scene.add(particles)
      dataParticles.push(particles)
    })

    connectionsRef.current = connectionLines
    particlesRef.current = dataParticles

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6)
    scene.add(ambientLight)

    const pointLight = new THREE.PointLight(0x00ffff, 1, 100)
    pointLight.position.set(10, 10, 10)
    scene.add(pointLight)

    // Animation loop with mobile optimization
    let animationId: number
    let lastTime = 0
    const targetFPS = isMobile ? 30 : 60 // Lower FPS on mobile
    const frameInterval = 1000 / targetFPS

    const animate = (currentTime: number) => {
      animationId = requestAnimationFrame(animate)

      if (currentTime - lastTime < frameInterval) return
      lastTime = currentTime

      const time = currentTime * 0.001

      // Slower rotation on mobile to save battery
      const rotationSpeed = isMobile ? 0.003 : 0.005

      // Rotate blocks
      blocks.forEach((block, index) => {
        block.rotation.x += rotationSpeed
        block.rotation.y += rotationSpeed

        // Pulse active block
        if (activeBlock === block.userData.id) {
          const scale = 1.2 + Math.sin(time * 4) * 0.1
          block.scale.setScalar(scale)
        } else {
          block.scale.setScalar(1)
        }
      })

      // Animate data particles (reduced frequency on mobile)
      if (!isMobile || Math.floor(currentTime / 100) % 2 === 0) {
        dataParticles.forEach((particles, index) => {
          const { startPos, endPos, connectionIndex, particleCount } = particles.userData
          const positions = particles.geometry.attributes.position.array as Float32Array

          for (let i = 0; i < particleCount; i++) {
            const baseT = i / (particleCount - 1)
            const animationOffset = (time * 0.5 + connectionIndex * 0.3) % 1
            const t = (baseT + animationOffset) % 1

            const wave = Math.sin(t * Math.PI * 4 + time * 2) * (isMobile ? 0.05 : 0.1)
            const position = new THREE.Vector3().lerpVectors(startPos, endPos, t)

            const perpendicular = new THREE.Vector3()
              .subVectors(endPos, startPos)
              .normalize()
              .cross(new THREE.Vector3(0, 0, 1))
              .multiplyScalar(wave)

            position.add(perpendicular)

            positions[i * 3] = position.x
            positions[i * 3 + 1] = position.y
            positions[i * 3 + 2] = position.z
          }

          particles.geometry.attributes.position.needsUpdate = true
        })
      }

      // Pulse connection lines
      connectionLines.forEach((line, index) => {
        const material = line.material as THREE.LineBasicMaterial
        material.opacity = 0.4 + Math.sin(time * 2 + index * 0.5) * 0.2
      })

      renderer.render(scene, camera)
    }

    animate(0)

    // Handle clicks and touch events
    const raycaster = new THREE.Raycaster()
    const mouse = new THREE.Vector2()

    const handleInteraction = (event: MouseEvent | TouchEvent) => {
      event.preventDefault()

      const rect = renderer.domElement.getBoundingClientRect()
      let clientX: number, clientY: number

      if ("touches" in event && event.touches.length > 0) {
        clientX = event.touches[0].clientX
        clientY = event.touches[0].clientY
      } else if ("clientX" in event) {
        clientX = event.clientX
        clientY = event.clientY
      } else {
        return
      }

      mouse.x = ((clientX - rect.left) / rect.width) * 2 - 1
      mouse.y = -((clientY - rect.top) / rect.height) * 2 + 1

      raycaster.setFromCamera(mouse, camera)
      const intersects = raycaster.intersectObjects(blocks)

      if (intersects.length > 0) {
        const clickedBlock = intersects[0].object as THREE.Mesh
        onBlockClick(clickedBlock.userData.id)
      }
    }

    // Add both mouse and touch event listeners
    renderer.domElement.addEventListener("click", handleInteraction)
    renderer.domElement.addEventListener("touchend", handleInteraction)

    // Handle resize
    const handleResize = () => {
      if (!mountRef.current) return

      const newIsMobile = window.innerWidth < 768

      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight)

      // Update pixel ratio on resize
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, newIsMobile ? 2 : 3))
    }

    window.addEventListener("resize", handleResize)

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener("resize", handleResize)
      renderer.domElement.removeEventListener("click", handleInteraction)
      renderer.domElement.removeEventListener("touchend", handleInteraction)

      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement)
      }

      // Dispose of resources
      blocks.forEach((block) => {
        if (block.geometry) block.geometry.dispose()
        if (Array.isArray(block.material)) {
          block.material.forEach((mat) => mat.dispose())
        } else if (block.material) {
          block.material.dispose()
        }
      })

      connectionLines.forEach((line) => {
        if (line.geometry) line.geometry.dispose()
        if (line.material && !Array.isArray(line.material)) {
          line.material.dispose()
        }
      })

      dataParticles.forEach((particles) => {
        if (particles.geometry) particles.geometry.dispose()
        if (particles.material && !Array.isArray(particles.material)) {
          particles.material.dispose()
        }
      })

      renderer.dispose()
    }
  }, [isMobile]) // Re-run when mobile state changes

  // Update active block materials
  useEffect(() => {
    if (!blocksRef.current) return

    blocksRef.current.forEach((block) => {
      const isActive = activeBlock === block.userData.id

      const canvas = document.createElement("canvas")
      const textureSize = isMobile ? 64 : 128
      canvas.width = textureSize
      canvas.height = textureSize
      const ctx = canvas.getContext("2d")!

      ctx.fillStyle = isActive ? "#ffffff" : "#000000"
      ctx.fillRect(0, 0, textureSize, textureSize)

      ctx.fillStyle = isActive ? "#000000" : "#00ffff"
      const gridSize = isMobile ? 6 : 8
      for (let x = 0; x < textureSize; x += gridSize) {
        for (let y = 0; y < textureSize; y += gridSize) {
          if (Math.random() > 0.7) {
            ctx.fillRect(x + 1, y + 1, gridSize - 2, gridSize - 2)
          }
        }
      }

      const cornerSize = isMobile ? 6 : 8
      ctx.fillStyle = isActive ? "#ffffff" : "#00ffff"
      ctx.fillRect(0, 0, cornerSize, cornerSize)
      ctx.fillRect(textureSize - cornerSize, 0, cornerSize, cornerSize)
      ctx.fillRect(0, textureSize - cornerSize, cornerSize, cornerSize)
      ctx.fillRect(textureSize - cornerSize, textureSize - cornerSize, cornerSize, cornerSize)

      const texture = new THREE.CanvasTexture(canvas)
      texture.magFilter = THREE.NearestFilter
      texture.minFilter = THREE.NearestFilter

      if (Array.isArray(block.material)) {
        block.material.forEach((material) => {
          if (material instanceof THREE.MeshBasicMaterial) {
            material.map = texture
            material.needsUpdate = true
          }
        })
      }

      const wireframe = block.children[0] as THREE.LineSegments
      if (wireframe && wireframe.material instanceof THREE.LineBasicMaterial) {
        wireframe.material.color.setHex(isActive ? 0xffffff : 0x00ffff)
        wireframe.material.opacity = isActive ? 1 : 0.8
      }
    })
  }, [activeBlock, isMobile])

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 rounded-lg overflow-hidden">
      <div ref={mountRef} className="w-full h-full" />

      {/* Responsive block labels */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className={`absolute ${isMobile ? "top-[12%]" : "top-[8%]"} left-1/2 transform -translate-x-1/2 -translate-y-1/2`}
        >
          <span
            className={`${isMobile ? "text-xs" : "text-xs"} text-cyan-400 font-medium bg-slate-900/80 px-2 py-1 rounded`}
          >
            Blockchain
          </span>
        </div>
        <div
          className={`absolute ${isMobile ? "top-[30%]" : "top-[25%]"} left-1/2 transform -translate-x-1/2 -translate-y-1/2`}
        >
          <span
            className={`${isMobile ? "text-xs" : "text-xs"} text-cyan-400 font-medium bg-slate-900/80 px-2 py-1 rounded`}
          >
            {isMobile ? "Contracts" : "Smart Contracts"}
          </span>
        </div>
        <div className="absolute top-[50%] left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <span
            className={`${isMobile ? "text-xs" : "text-xs"} text-cyan-400 font-medium bg-slate-900/80 px-2 py-1 rounded`}
          >
            DApps
          </span>
        </div>
        <div
          className={`absolute ${isMobile ? "top-[70%]" : "top-[75%]"} left-1/2 transform -translate-x-1/2 -translate-y-1/2`}
        >
          <span
            className={`${isMobile ? "text-xs" : "text-xs"} text-cyan-400 font-medium bg-slate-900/80 px-2 py-1 rounded`}
          >
            DeFi
          </span>
        </div>
        <div
          className={`absolute ${isMobile ? "top-[30%] left-[5%]" : "top-[25%] left-[8%]"} transform -translate-x-1/2 -translate-y-1/2`}
        >
          <span
            className={`${isMobile ? "text-xs" : "text-xs"} text-cyan-400 font-medium bg-slate-900/80 px-2 py-1 rounded`}
          >
            Web3
          </span>
        </div>
        <div
          className={`absolute ${isMobile ? "top-[50%] left-[95%]" : "top-[50%] left-[92%]"} transform -translate-x-1/2 -translate-y-1/2`}
        >
          <span
            className={`${isMobile ? "text-xs" : "text-xs"} text-cyan-400 font-medium bg-slate-900/80 px-2 py-1 rounded`}
          >
            Research
          </span>
        </div>
      </div>

      {/* Responsive technical data overlay */}
      <div className={`absolute ${isMobile ? "bottom-2 left-2" : "bottom-4 left-4"} pointer-events-none`}>
        <div
          className={`bg-slate-900/70 backdrop-blur-sm rounded-lg ${isMobile ? "px-2 py-1" : "px-3 py-2"} ${isMobile ? "text-xs" : "text-xs"} text-cyan-400 font-mono`}
        >
          <div className="mb-1">HEIGHT: {isMobile ? "18234567" : "18234567"}</div>
          <div className="mb-1">HASH: 0x7f3a21e8...</div>
          <div className="mb-1">TX: 142</div>
          <div className="text-green-400">TRANSFER: ACTIVE</div>
        </div>
      </div>

      {/* Responsive interaction hint */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
        className={`absolute ${isMobile ? "bottom-2 right-2" : "bottom-4 right-4"} bg-slate-900/70 backdrop-blur-sm rounded-lg ${isMobile ? "px-2 py-1" : "px-3 py-2"}`}
      >
        <p className={`text-slate-300 ${isMobile ? "text-xs" : "text-xs"}`}>
          <span className="text-cyan-400 font-medium">{isMobile ? "Tap" : "Click"}:</span>{" "}
          {isMobile ? "Explore" : "Explore projects"}
        </p>
      </motion.div>
    </div>
  )
}
