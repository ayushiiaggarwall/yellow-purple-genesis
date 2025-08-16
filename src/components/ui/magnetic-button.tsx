import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface MagneticButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onDrag' | 'onDragEnd' | 'onDragStart' | 'onAnimationStart' | 'onAnimationEnd'> {
  children: React.ReactNode
  className?: string
  magneticStrength?: number
  variant?: "primary" | "secondary" | "accent"
}

export function MagneticButton({ 
  children, 
  className = "",
  magneticStrength = 0.3,
  variant = "primary",
  ...props
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const springX = useSpring(x, { damping: 20, stiffness: 300 })
  const springY = useSpring(y, { damping: 20, stiffness: 300 })

  const rotateX = useTransform(springY, [-0.5, 0.5], ["5deg", "-5deg"])
  const rotateY = useTransform(springX, [-0.5, 0.5], ["-5deg", "5deg"])

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return

    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const mouseX = e.clientX - centerX
    const mouseY = e.clientY - centerY

    x.set(mouseX * magneticStrength)
    y.set(mouseY * magneticStrength)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    x.set(0)
    y.set(0)
  }

  const variantStyles = {
    primary: "bg-primary text-primary-foreground hover:bg-primary/90",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/90",
    accent: "bg-accent text-accent-foreground hover:bg-accent/90"
  }

  return (
    <motion.button
      ref={ref}
      className={cn(
        "relative px-8 py-4 rounded-2xl font-medium transition-all duration-300",
        "transform-gpu perspective-1000",
        "shadow-lg hover:shadow-xl",
        "overflow-hidden",
        variantStyles[variant],
        className
      )}
      style={{
        x: springX,
        y: springY,
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      {/* Ripple effect on hover */}
      <motion.div
        className="absolute inset-0 bg-white/20 rounded-inherit"
        initial={{ scale: 0, opacity: 1 }}
        animate={{
          scale: isHovered ? 1 : 0,
          opacity: isHovered ? 0 : 1,
        }}
        transition={{ duration: 0.6 }}
        style={{ transform: "translateZ(-1px)" }}
      />

      {/* Shimmer effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        animate={isHovered ? {
          x: ["-100%", "100%"],
        } : {}}
        transition={{
          duration: 0.8,
          ease: "easeInOut",
        }}
        style={{
          transform: "translateZ(1px)",
          skewX: "-20deg",
        }}
      />

      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-inherit blur-md"
        style={{
          background: variant === "primary" 
            ? "linear-gradient(45deg, hsl(var(--primary)), hsl(var(--accent)))"
            : variant === "accent"
            ? "linear-gradient(45deg, hsl(var(--accent)), hsl(var(--primary)))"
            : "linear-gradient(45deg, hsl(var(--secondary)), hsl(var(--muted)))",
          transform: "translateZ(-2px)",
        }}
        animate={{
          opacity: isHovered ? 0.7 : 0,
          scale: isHovered ? 1.1 : 0.9,
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Content */}
      <span 
        className="relative z-10 flex items-center justify-center"
        style={{ transform: "translateZ(2px)" }}
      >
        {children}
      </span>
    </motion.button>
  )
}