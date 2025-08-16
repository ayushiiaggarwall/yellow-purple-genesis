import { motion, useScroll, useTransform } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { ArrowRight, Play, Star, Trophy, Sparkles, Zap, Target } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface FloatingElementProps {
  children: React.ReactNode
  delay?: number
  duration?: number
  className?: string
}

function FloatingElement({ children, delay = 0, duration = 6, className = "" }: FloatingElementProps) {
  return (
    <motion.div
      className={className}
      animate={{
        y: [-10, 10, -10],
        rotate: [-2, 2, -2],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  )
}

function InteractiveOrb({ className = "", size = "w-32 h-32" }: { className?: string; size?: string }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <motion.div
      className={`${size} rounded-full opacity-30 blur-3xl ${className}`}
      animate={{
        x: mousePosition.x * 0.02,
        y: mousePosition.y * 0.02,
      }}
      transition={{ type: "spring", stiffness: 50, damping: 30 }}
    />
  )
}

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        setMousePosition({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height
        })
      }
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener("mousemove", handleMouseMove)
      return () => container.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center px-6 lg:px-8 overflow-hidden"
      style={{
        background: `
          radial-gradient(ellipse at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, 
            hsl(var(--primary) / 0.15) 0%, 
            hsl(var(--accent) / 0.1) 25%, 
            transparent 50%
          ),
          linear-gradient(135deg, 
            hsl(var(--background)) 0%, 
            hsl(var(--muted) / 0.5) 100%
          )
        `
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Interactive Orbs */}
        <InteractiveOrb className="absolute top-20 left-20 bg-gradient-to-r from-primary to-accent" />
        <InteractiveOrb 
          className="absolute bottom-32 right-32 bg-gradient-to-r from-accent to-purple-500" 
          size="w-48 h-48" 
        />
        <InteractiveOrb 
          className="absolute top-1/2 left-1/4 bg-gradient-to-r from-yellow-400 to-primary" 
          size="w-24 h-24" 
        />

        {/* Floating Shapes */}
        <FloatingElement delay={0} className="absolute top-32 right-1/4">
          <div className="w-4 h-4 bg-primary/20 rounded-full blur-sm" />
        </FloatingElement>
        <FloatingElement delay={2} className="absolute bottom-1/4 left-1/3">
          <div className="w-6 h-6 bg-accent/20 rounded-full blur-sm" />
        </FloatingElement>
        <FloatingElement delay={4} className="absolute top-1/3 right-1/3">
          <div className="w-3 h-3 bg-yellow-400/20 rounded-full blur-sm" />
        </FloatingElement>

        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)
            `,
            backgroundSize: "50px 50px"
          }}
        />
      </div>

      <motion.div 
        style={{ y, opacity }}
        className="relative z-10 max-w-7xl mx-auto w-full"
      >
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-10"
          >
            {/* Animated Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-block"
            >
              <Badge 
                variant="purple" 
                className="px-6 py-3 text-sm font-medium hover-glow cursor-pointer group"
              >
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                >
                  <Star className="w-4 h-4 mr-2 fill-current" />
                </motion.div>
                <span className="group-hover:text-gradient">5-Week Intensive Course</span>
                <Sparkles className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Badge>
            </motion.div>

            {/* Main Heading with Staggered Animation */}
            <div className="space-y-6">
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1]"
              >
                <motion.span
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  From{" "}
                </motion.span>
                <motion.span 
                  className="text-gradient block sm:inline"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                >
                  No-Code
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.9 }}
                  className="block sm:inline"
                >
                  {" "}to{" "}
                </motion.span>
                <motion.span 
                  className="text-gradient-purple block sm:inline"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 1.1 }}
                >
                  Product
                </motion.span>
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.3 }}
                className="text-xl md:text-2xl text-muted-foreground max-w-2xl leading-relaxed"
              >
                Master the art of building{" "}
                <span className="text-primary font-semibold">profitable products</span>{" "}
                without writing code. Join{" "}
                <span className="text-accent font-semibold">500+ successful entrepreneurs</span>{" "}
                who launched their ideas in just 5 weeks.
              </motion.p>
            </div>

            {/* Value Propositions with Icons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.5 }}
              className="space-y-4"
            >
              {[
                { text: "Build your MVP in 5 weeks", icon: Target },
                { text: "No coding experience required", icon: Zap },
                { text: "Get paying customers fast", icon: Trophy }
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 1.7 + index * 0.1 }}
                  className="flex items-center gap-4 group cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                    <item.icon className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-foreground font-medium text-lg group-hover:text-primary transition-colors">
                    {item.text}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 2 }}
              className="flex flex-col sm:flex-row gap-6"
            >
              <Link to="/auth/signup">
                <Button 
                  size="lg" 
                  className="px-10 py-4 text-lg button-3d hover-glow relative overflow-hidden group"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-primary via-yellow-400 to-primary opacity-0 group-hover:opacity-100 transition-opacity"
                    initial={false}
                    animate={{
                      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                  <span className="relative z-10 flex items-center">
                    Apply Now
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ArrowRight className="ml-3 h-5 w-5" />
                    </motion.div>
                  </span>
                </Button>
              </Link>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="px-10 py-4 text-lg button-3d hover-lift glass-card border-white/20"
              >
                <Play className="mr-3 h-5 w-5" />
                See Syllabus
              </Button>
            </motion.div>
          </motion.div>

          {/* Right: Interactive Hero Card */}
          <motion.div
            initial={{ opacity: 0, x: 50, rotateY: -15 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative perspective-1000"
          >
            <div className="relative">
              {/* Floating decorative elements */}
              <FloatingElement delay={1} className="absolute -top-8 -right-8 z-10">
                <div className="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center shadow-2xl">
                  <Sparkles className="w-8 h-8 text-white animate-pulse-glow" />
                </div>
              </FloatingElement>

              <FloatingElement delay={3} className="absolute -bottom-6 -left-6 z-10">
                <div className="w-12 h-12 rounded-full bg-gradient-accent flex items-center justify-center shadow-xl">
                  <Star className="w-6 h-6 text-white fill-current" />
                </div>
              </FloatingElement>

              {/* Main Card */}
              <motion.div
                className="glass-card-strong p-8 rounded-3xl hover-lift transform-gpu"
                whileHover={{ 
                  scale: 1.05,
                  rotateY: 5,
                  rotateX: 5,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                style={{
                  transformStyle: "preserve-3d",
                }}
              >
                <div className="space-y-8">
                  <div className="text-center">
                    <motion.div 
                      className="w-20 h-20 mx-auto mb-6 bg-gradient-primary rounded-3xl flex items-center justify-center shadow-2xl"
                      animate={isHovered ? { scale: 1.1, rotate: 360 } : {}}
                      transition={{ duration: 0.6 }}
                    >
                      <Trophy className="w-10 h-10 text-white" />
                    </motion.div>
                    <h3 className="text-2xl font-bold mb-3 text-gradient">Success Guaranteed</h3>
                    <p className="text-muted-foreground text-lg">
                      Join 500+ entrepreneurs who built profitable products
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-6">
                    <motion.div 
                      className="p-6 rounded-2xl glass-card text-center hover-glow"
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <motion.div 
                        className="text-3xl font-bold text-primary mb-2"
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        95%
                      </motion.div>
                      <div className="text-sm text-muted-foreground">Success Rate</div>
                    </motion.div>
                    
                    <motion.div 
                      className="p-6 rounded-2xl glass-card text-center hover-glow"
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <motion.div 
                        className="text-3xl font-bold text-accent mb-2"
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                      >
                        $2M+
                      </motion.div>
                      <div className="text-sm text-muted-foreground">Revenue Generated</div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2.5 }}
          className="mt-32 text-center"
        >
          <motion.p 
            className="text-sm text-muted-foreground mb-8"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Trusted by entrepreneurs from
          </motion.p>
          
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-60 mb-16">
            {["Google", "Microsoft", "Amazon", "Meta", "Apple"].map((company, index) => (
              <motion.div 
                key={company} 
                className="text-xl font-semibold hover:opacity-100 hover:text-primary transition-all cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 0.6, y: 0 }}
                transition={{ duration: 0.6, delay: 2.7 + index * 0.1 }}
                whileHover={{ scale: 1.1, opacity: 1 }}
              >
                {company}
              </motion.div>
            ))}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-4xl mx-auto">
            {[
              { number: "500+", label: "Active Students" },
              { number: "50+", label: "Video Lessons" },
              { number: "95%", label: "Success Rate" }
            ].map((stat, index) => (
              <motion.div 
                key={stat.label}
                className="text-center group cursor-pointer"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 3 + index * 0.2 }}
                whileHover={{ scale: 1.05 }}
              >
                <motion.div 
                  className="text-4xl md:text-5xl font-bold text-gradient mb-3 group-hover:scale-110 transition-transform"
                  animate={{ 
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] 
                  }}
                  transition={{ 
                    duration: 4, 
                    repeat: Infinity, 
                    delay: index * 0.5 
                  }}
                >
                  {stat.number}
                </motion.div>
                <div className="text-muted-foreground text-lg group-hover:text-foreground transition-colors">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}