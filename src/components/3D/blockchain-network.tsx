"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

interface BlockchainNetworkProps {
  onNodeClick?: (nodeId: string) => void
  activeNode?: string | null
}

export default function BlockchainNetwork({ onNodeClick, activeNode }: BlockchainNetworkProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * window.devicePixelRatio
      canvas.height = rect.height * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Network nodes
    const nodes = [
      { id: "web3", x: 0.2, y: 0.3, size: 8, color: "#00FFFF", label: "Web3" },
      { id: "blockchain", x: 0.8, y: 0.2, size: 10, color: "#007FFF", label: "Blockchain" },
      { id: "dapp", x: 0.6, y: 0.7, size: 9, color: "#4F46E5", label: "DApps" },
      { id: "defi", x: 0.3, y: 0.8, size: 8, color: "#10B981", label: "DeFi" },
      { id: "smart-contracts", x: 0.7, y: 0.4, size: 7, color: "#F59E0B", label: "Smart Contracts" },
      { id: "research", x: 0.4, y: 0.5, size: 6, color: "#8B5CF6", label: "Research" },
    ]

    // Connections between nodes
    const connections = [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 0],
      [1, 4],
      [4, 2],
      [0, 5],
      [5, 4],
    ]

    let animationFrame: number
    let time = 0

    const animate = () => {
      time += 0.02

      const rect = canvas.getBoundingClientRect()
      const width = rect.width
      const height = rect.height

      // Clear canvas
      ctx.clearRect(0, 0, width, height)

      // Draw connections
      ctx.strokeStyle = "rgba(0, 255, 255, 0.3)"
      ctx.lineWidth = 1
      connections.forEach(([startIdx, endIdx]) => {
        const start = nodes[startIdx]
        const end = nodes[endIdx]

        ctx.beginPath()
        ctx.moveTo(start.x * width, start.y * height)
        ctx.lineTo(end.x * width, end.y * height)
        ctx.stroke()

        // Animated particles along connections
        const progress = (Math.sin(time + startIdx) + 1) / 2
        const particleX = start.x + (end.x - start.x) * progress
        const particleY = start.y + (end.y - start.y) * progress

        ctx.fillStyle = "rgba(0, 255, 255, 0.8)"
        ctx.beginPath()
        ctx.arc(particleX * width, particleY * height, 2, 0, Math.PI * 2)
        ctx.fill()
      })

      // Draw nodes
      nodes.forEach((node, index) => {
        const x = node.x * width
        const y = node.y * height
        const isActive = activeNode === node.id
        const pulseSize = isActive ? node.size + Math.sin(time * 4) * 2 : node.size

        // Outer glow
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, pulseSize * 2)
        gradient.addColorStop(0, `${node.color}40`)
        gradient.addColorStop(1, "transparent")
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(x, y, pulseSize * 2, 0, Math.PI * 2)
        ctx.fill()

        // Main node
        ctx.fillStyle = isActive ? "#FFFFFF" : node.color
        ctx.beginPath()
        ctx.arc(x, y, pulseSize, 0, Math.PI * 2)
        ctx.fill()

        // Inner core
        ctx.fillStyle = isActive ? node.color : "#FFFFFF"
        ctx.beginPath()
        ctx.arc(x, y, pulseSize * 0.4, 0, Math.PI * 2)
        ctx.fill()
      })

      // Floating particles
      for (let i = 0; i < 20; i++) {
        const particleX = (Math.sin(time * 0.5 + i) * 0.3 + 0.5) * width
        const particleY = (Math.cos(time * 0.3 + i * 0.5) * 0.3 + 0.5) * height
        const alpha = ((Math.sin(time + i) + 1) / 2) * 0.5

        ctx.fillStyle = `rgba(0, 255, 255, ${alpha})`
        ctx.beginPath()
        ctx.arc(particleX, particleY, 1, 0, Math.PI * 2)
        ctx.fill()
      }

      animationFrame = requestAnimationFrame(animate)
    }

    animate()

    // Handle clicks
    const handleClick = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const x = (event.clientX - rect.left) / rect.width
      const y = (event.clientY - rect.top) / rect.height

      nodes.forEach((node) => {
        const distance = Math.sqrt((x - node.x) ** 2 + (y - node.y) ** 2)
        if (distance < 0.05 && onNodeClick) {
          onNodeClick(node.id)
        }
      })
    }

    canvas.addEventListener("click", handleClick)

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      canvas.removeEventListener("click", handleClick)
      cancelAnimationFrame(animationFrame)
    }
  }, [activeNode, onNodeClick])

  return (
    <div className="relative w-full h-full">
      <canvas ref={canvasRef} className="w-full h-full cursor-pointer" style={{ background: "transparent" }} />

      {/* Node labels */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[30%] left-[20%] transform -translate-x-1/2 -translate-y-1/2">
          <span className="text-xs text-cyan-400 font-medium bg-slate-900/80 px-2 py-1 rounded">Web3</span>
        </div>
        <div className="absolute top-[20%] left-[80%] transform -translate-x-1/2 -translate-y-1/2">
          <span className="text-xs text-blue-400 font-medium bg-slate-900/80 px-2 py-1 rounded">Blockchain</span>
        </div>
        <div className="absolute top-[70%] left-[60%] transform -translate-x-1/2 -translate-y-1/2">
          <span className="text-xs text-indigo-400 font-medium bg-slate-900/80 px-2 py-1 rounded">DApps</span>
        </div>
        <div className="absolute top-[80%] left-[30%] transform -translate-x-1/2 -translate-y-1/2">
          <span className="text-xs text-green-400 font-medium bg-slate-900/80 px-2 py-1 rounded">DeFi</span>
        </div>
        <div className="absolute top-[40%] left-[70%] transform -translate-x-1/2 -translate-y-1/2">
          <span className="text-xs text-yellow-400 font-medium bg-slate-900/80 px-2 py-1 rounded">Smart Contracts</span>
        </div>
        <div className="absolute top-[50%] left-[40%] transform -translate-x-1/2 -translate-y-1/2">
          <span className="text-xs text-purple-400 font-medium bg-slate-900/80 px-2 py-1 rounded">Research</span>
        </div>
      </div>

      {/* Interaction hint */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 2 }}
        className="absolute bottom-4 left-4 glass-card px-3 py-2"
      >
        <p className="text-slate-300 text-xs">
          <span className="text-cyan-400 font-medium">Interactive:</span> Click nodes to explore projects
        </p>
      </motion.div>
    </div>
  )
}
