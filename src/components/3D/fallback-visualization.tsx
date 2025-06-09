"use client"

import { motion } from "framer-motion"
import { Shield, Zap, Globe, Code, Database, FileText } from "lucide-react"

interface FallbackVisualizationProps {
  onBlockClick: (category: string) => void
  activeBlock: string | null
}

export default function FallbackVisualization({ onBlockClick, activeBlock }: FallbackVisualizationProps) {
  const blocks = [
    { icon: Globe, label: "Web3", category: "web3", color: "#00ffff", position: "top-[30%] left-[20%]" },
    { icon: Code, label: "Blockchain", category: "blockchain", color: "#007fff", position: "top-[20%] left-[80%]" },
    { icon: Zap, label: "DApps", category: "dapp", color: "#4f46e5", position: "top-[70%] left-[60%]" },
    { icon: Database, label: "DeFi", category: "defi", color: "#10b981", position: "top-[80%] left-[30%]" },
    {
      icon: FileText,
      label: "Smart Contracts",
      category: "smart-contracts",
      color: "#f59e0b",
      position: "top-[40%] left-[70%]",
    },
    { icon: Shield, label: "Research", category: "research", color: "#8b5cf6", position: "top-[50%] left-[40%]" },
  ]

  return (
    <div className="w-full h-full relative bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-20">
        <div className="grid-background animate-pulse"></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Connection lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00ffff" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#007fff" stopOpacity="0.2" />
          </linearGradient>
        </defs>

        {/* Draw connecting lines between blocks */}
        <motion.line
          x1="20%"
          y1="30%"
          x2="80%"
          y2="20%"
          stroke="url(#lineGradient)"
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 0.5 }}
        />
        <motion.line
          x1="80%"
          y1="20%"
          x2="60%"
          y2="70%"
          stroke="url(#lineGradient)"
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 1 }}
        />
        <motion.line
          x1="60%"
          y1="70%"
          x2="30%"
          y2="80%"
          stroke="url(#lineGradient)"
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 1.5 }}
        />
        <motion.line
          x1="30%"
          y1="80%"
          x2="20%"
          y2="30%"
          stroke="url(#lineGradient)"
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 2 }}
        />
        <motion.line
          x1="40%"
          y1="50%"
          x2="70%"
          y2="40%"
          stroke="url(#lineGradient)"
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 2.5 }}
        />
      </svg>

      {/* Blockchain blocks */}
      {blocks.map((block, index) => (
        <motion.div
          key={index}
          className={`absolute ${block.position} transform -translate-x-1/2 -translate-y-1/2 cursor-pointer`}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: index * 0.2 }}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onBlockClick(block.category)}
        >
          {/* Glowing background */}
          <motion.div
            className="absolute inset-0 rounded-xl blur-lg opacity-50"
            style={{ backgroundColor: block.color }}
            animate={{
              scale: activeBlock === block.category ? [1, 1.2, 1] : 1,
            }}
            transition={{
              duration: 2,
              repeat: activeBlock === block.category ? Number.POSITIVE_INFINITY : 0,
            }}
          />

          {/* Main block */}
          <motion.div
            className={`relative w-16 h-16 lg:w-20 lg:h-20 rounded-xl border-2 backdrop-blur-sm flex items-center justify-center ${
              activeBlock === block.category
                ? "bg-white/20 border-white shadow-lg"
                : "bg-slate-900/40 border-slate-700 hover:border-slate-500"
            }`}
            style={{
              borderColor: activeBlock === block.category ? "#ffffff" : block.color,
              boxShadow: activeBlock === block.category ? `0 0 20px ${block.color}` : "none",
            }}
            animate={{
              rotateY: [0, 360],
            }}
            transition={{
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          >
            <block.icon
              className="w-8 h-8 lg:w-10 lg:h-10"
              style={{ color: activeBlock === block.category ? "#ffffff" : block.color }}
            />
          </motion.div>

          {/* Label */}
          <motion.div
            className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-1 bg-slate-900/80 backdrop-blur-sm border border-slate-700 rounded-lg"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 + 0.5 }}
          >
            <span className="text-xs font-medium text-white">{block.label}</span>
          </motion.div>
        </motion.div>
      ))}

      {/* Center title */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 2 }}
      >
        <h3 className="text-lg font-bold text-slate-300 mb-2">Blockchain Ecosystem</h3>
        <p className="text-sm text-slate-500">Click blocks to explore projects</p>
      </motion.div>

      {/* Interaction hint */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 3 }}
        className="absolute top-4 left-4 glass-card px-3 py-2"
      >
        <p className="text-slate-300 text-xs">
          <span className="text-cyan-400 font-medium">Interactive:</span> Click blocks to explore
        </p>
      </motion.div>
    </div>
  )
}
