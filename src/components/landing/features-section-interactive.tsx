import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { 
  Code, 
  DollarSign, 
  Users, 
  Lightbulb, 
  Rocket,
  Target,
  Zap,
  Crown,
  Sparkles
} from "lucide-react"
import { FloatingCard3D } from "@/components/ui/floating-card-3d"
import { ParticlesBackground } from "@/components/ui/particles-background"

const features = [
  {
    icon: Code,
    title: "No-Code Mastery",
    description: "Master powerful no-code tools like Bubble, Webflow, Zapier, and Airtable to build complex applications without coding.",
    color: "from-blue-500 to-cyan-500",
    highlight: "Build anything",
    stats: "50+ Tools"
  },
  {
    icon: DollarSign,
    title: "Revenue Generation",
    description: "Learn proven strategies to monetize your products from day one with real-world case studies.",
    color: "from-green-500 to-emerald-500",
    highlight: "Make money fast",
    stats: "$2M+ Generated"
  },
  {
    icon: Users,
    title: "Community Support",
    description: "Join a thriving community of 500+ makers and entrepreneurs sharing knowledge and opportunities.",
    color: "from-purple-500 to-pink-500",
    highlight: "Never alone",
    stats: "500+ Members"
  },
  {
    icon: Lightbulb,
    title: "Idea Validation",
    description: "Discover how to validate your ideas before building, saving time and money with proven frameworks.",
    color: "from-yellow-500 to-orange-500",
    highlight: "Risk-free",
    stats: "95% Success Rate"
  },
  {
    icon: Rocket,
    title: "Product Launch",
    description: "Step-by-step guidance on launching your product successfully with our proven launch checklist.",
    color: "from-red-500 to-rose-500",
    highlight: "Launch ready",
    stats: "200+ Launches"
  },
  {
    icon: Target,
    title: "Market Positioning",
    description: "Learn to position your product in the market for maximum impact and customer acquisition.",
    color: "from-indigo-500 to-blue-500",
    highlight: "Stand out",
    stats: "10x Growth"
  }
]

interface FeatureCardProps {
  feature: typeof features[0]
  index: number
  isInView: boolean
}

function FeatureCard({ feature, index, isInView }: FeatureCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const Icon = feature.icon

  return (
    <FloatingCard3D className="h-full">
      <motion.div
        className="relative p-8 h-full overflow-hidden group cursor-pointer"
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={isInView ? { 
          opacity: 1, 
          y: 0, 
          scale: 1 
        } : {}}
        transition={{ 
          duration: 0.6, 
          delay: index * 0.1,
          ease: [0.16, 1, 0.3, 1]
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Background gradient */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
        />

        {/* Floating particles */}
        <motion.div
          className="absolute top-4 right-4 w-2 h-2 bg-primary rounded-full"
          animate={{
            y: [-5, 5, -5],
            opacity: [0.3, 1, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: index * 0.2,
          }}
        />

        {/* Icon container */}
        <motion.div
          className="relative mb-6"
          animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div 
            className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center relative overflow-hidden`}
            whileHover={{ rotateY: 180 }}
            transition={{ duration: 0.6 }}
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Front side */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              style={{ backfaceVisibility: "hidden" }}
            >
              <Icon className="w-8 h-8 text-white" />
            </motion.div>
            
            {/* Back side */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center bg-white/20"
              style={{ 
                backfaceVisibility: "hidden",
                transform: "rotateY(180deg)"
              }}
            >
              <Sparkles className="w-8 h-8 text-white" />
            </motion.div>
          </motion.div>

          {/* Highlight badge */}
          <motion.div
            className="absolute -top-2 -right-2 px-3 py-1 bg-primary text-primary-foreground text-xs font-bold rounded-full shadow-lg"
            initial={{ scale: 0, rotate: -45 }}
            animate={isInView ? { scale: 1, rotate: 0 } : {}}
            transition={{ delay: index * 0.1 + 0.5, type: "spring" }}
          >
            {feature.highlight}
          </motion.div>
        </motion.div>

        {/* Content */}
        <div className="space-y-4">
          <motion.h3 
            className="text-xl font-bold text-foreground group-hover:text-gradient transition-all duration-300"
            animate={isHovered ? { x: 5 } : { x: 0 }}
          >
            {feature.title}
          </motion.h3>
          
          <motion.p 
            className="text-muted-foreground leading-relaxed"
            animate={isHovered ? { x: 5 } : { x: 0 }}
            transition={{ delay: 0.1 }}
          >
            {feature.description}
          </motion.p>

          {/* Stats */}
          <motion.div
            className="flex items-center justify-between pt-4 border-t border-border/50"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: index * 0.1 + 0.8 }}
          >
            <span className="text-sm text-muted-foreground">Impact</span>
            <motion.span 
              className="text-sm font-bold text-primary"
              animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
            >
              {feature.stats}
            </motion.span>
          </motion.div>
        </div>

        {/* Hover overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ transform: "translateZ(1px)" }}
        />
      </motion.div>
    </FloatingCard3D>
  )
}

export function FeaturesInteractiveSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="relative py-32 px-6 lg:px-8 overflow-hidden">
      {/* Background */}
      <ParticlesBackground particleCount={30} className="opacity-30" />
      
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            <Crown className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Everything You Need</span>
          </motion.div>
          
          <motion.h2 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            Complete{" "}
            <span className="text-gradient">Toolkit</span>
            <br />
            for{" "}
            <span className="text-gradient-purple">Success</span>
          </motion.h2>
          
          <motion.p 
            className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
          >
            From ideation to monetization, our comprehensive curriculum covers all aspects of building successful products. 
            <span className="text-primary font-semibold"> Everything is designed to get you results fast.</span>
          </motion.p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard 
              key={feature.title}
              feature={feature}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1 }}
        >
          <FloatingCard3D>
            <div className="p-8 text-center">
              <motion.div
                className="w-20 h-20 mx-auto mb-6 bg-gradient-primary rounded-3xl flex items-center justify-center"
                animate={{ 
                  rotate: [0, 360],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  rotate: { duration: 10, repeat: Infinity, ease: "linear" },
                  scale: { duration: 2, repeat: Infinity }
                }}
              >
                <Zap className="w-10 h-10 text-white" />
              </motion.div>
              
              <h3 className="text-2xl font-bold mb-4 text-gradient">
                5-Week Intensive Program
              </h3>
              <p className="text-muted-foreground text-lg mb-6 max-w-md mx-auto">
                Designed for busy professionals. Just 2-3 hours per week to transform your ideas into profitable products.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <span className="px-4 py-2 bg-primary/10 text-primary rounded-full border border-primary/20">
                  ✓ Lifetime Access
                </span>
                <span className="px-4 py-2 bg-accent/10 text-accent rounded-full border border-accent/20">
                  ✓ Community Support
                </span>
                <span className="px-4 py-2 bg-success/10 text-success rounded-full border border-success/20">
                  ✓ Money-back Guarantee
                </span>
              </div>
            </div>
          </FloatingCard3D>
        </motion.div>
      </div>
    </section>
  )
}