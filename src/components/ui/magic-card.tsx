import React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface MagicCardProps {
  children: React.ReactNode
  className?: string
  gradientColor?: string
}

export function MagicCard({ children, className, gradientColor }: MagicCardProps) {
  return (
    <motion.div
      className={cn(
        "relative overflow-hidden rounded-2xl border bg-card p-6 text-card-foreground shadow-2xl",
        className
      )}
      whileHover={{
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
      style={{
        background: `radial-gradient(circle at 50% 50%, ${gradientColor || "rgba(251, 191, 36, 0.1)"} 0%, transparent 50%)`
      }}
    >
      <div className="relative z-10">
        {children}
      </div>
      
      {/* Animated gradient overlay */}
      <div 
        className="absolute inset-0 opacity-30 animate-pulse"
        style={{
          background: `conic-gradient(from 0deg, transparent, ${gradientColor || "rgba(251, 191, 36, 0.3)"}, transparent)`
        }}
      />
    </motion.div>
  )
}