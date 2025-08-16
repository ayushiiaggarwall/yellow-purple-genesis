import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface FloatingCard3DProps {
  children: React.ReactNode
  className?: string
  intensity?: number
  rotationIntensity?: number
  floatIntensity?: number
}

export function FloatingCard3D({ 
  children, 
  className = "",
  intensity = 0.1,
  rotationIntensity = 10,
  floatIntensity = 20
}: FloatingCard3DProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x, { damping: 30, stiffness: 200 })
  const mouseYSpring = useSpring(y, { damping: 30, stiffness: 200 })

  const rotateX = useTransform(
    mouseYSpring,
    [-0.5, 0.5],
    [`${rotationIntensity}deg`, `-${rotationIntensity}deg`]
  )
  const rotateY = useTransform(
    mouseXSpring,
    [-0.5, 0.5],
    [`-${rotationIntensity}deg`, `${rotationIntensity}deg`]
  )

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return

    const rect = ref.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height

    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top

    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5

    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      animate={{
        y: [-floatIntensity/4, floatIntensity/4, -floatIntensity/4],
        scale: isHovered ? 1.05 : 1,
      }}
      transition={{
        y: {
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        },
        scale: {
          duration: 0.3,
        },
      }}
      className={cn(
        "relative transform-gpu transition-all duration-300",
        "hover:shadow-2xl",
        className
      )}
    >
      {/* Backdrop glow effect */}
      <motion.div
        className="absolute inset-0 rounded-inherit bg-gradient-to-r from-primary/20 to-accent/20 blur-xl"
        animate={{
          opacity: isHovered ? 0.6 : 0,
          scale: isHovered ? 1.1 : 0.9,
        }}
        transition={{ duration: 0.3 }}
        style={{ transform: "translateZ(-1px)" }}
      />
      
      {/* Main content */}
      <div
        className="relative z-10 glass-card-strong"
        style={{ transform: "translateZ(0px)" }}
      >
        {children}
      </div>

      {/* Inner shadow for depth */}
      <motion.div
        className="absolute inset-0 rounded-inherit"
        style={{
          background: `linear-gradient(
            135deg, 
            rgba(255, 255, 255, ${intensity}) 0%, 
            transparent 50%, 
            rgba(0, 0, 0, ${intensity * 0.5}) 100%
          )`,
          transform: "translateZ(1px)",
        }}
        animate={{
          opacity: isHovered ? 1 : 0.7,
        }}
      />
    </motion.div>
  )
}