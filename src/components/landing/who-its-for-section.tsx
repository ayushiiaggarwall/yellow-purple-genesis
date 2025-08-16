import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Briefcase, Lightbulb, Code, Rocket, Users, TrendingUp } from "lucide-react"
import { FloatingCard3D } from "@/components/ui/floating-card-3d"

const targetAudience = [
  {
    icon: Briefcase,
    title: "Working Professionals",
    description: "Build side projects while keeping your day job",
    stats: "85% of students",
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: Lightbulb,
    title: "Idea Owners",
    description: "Turn your business ideas into real products",
    stats: "200+ ideas launched",
    color: "from-yellow-500 to-orange-500"
  },
  {
    icon: Code,
    title: "Non-Technical Founders",
    description: "Launch without learning to code or hiring developers",
    stats: "Zero coding needed",
    color: "from-purple-500 to-pink-500"
  },
  {
    icon: Rocket,
    title: "Aspiring Entrepreneurs",
    description: "Start your entrepreneurial journey with confidence",
    stats: "95% success rate",
    color: "from-green-500 to-emerald-500"
  }
]

export function WhoItsForSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-32 px-6 lg:px-8 bg-muted/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
      
      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            <Users className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-accent">For Everyone</span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Perfect for{" "}
            <span className="text-gradient">Everyone</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Whether you're a complete beginner or have some experience, our course is designed to help you succeed. 
            <span className="text-primary font-semibold"> Join entrepreneurs from all backgrounds.</span>
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {targetAudience.map((item, index) => {
            const Icon = item.icon

            return (
              <FloatingCard3D key={index} className="h-full">
                <motion.div
                  className="p-8 text-center h-full flex flex-col relative overflow-hidden group"
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  animate={isInView ? { 
                    opacity: 1, 
                    y: 0, 
                    scale: 1 
                  } : {}}
                  transition={{ 
                    duration: 0.6, 
                    delay: index * 0.15,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                >
                  {/* Background gradient */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                  />

                  {/* Icon with 3D effect */}
                  <motion.div
                    className="relative mb-6"
                  >
                    <motion.div 
                      className={`w-20 h-20 mx-auto bg-gradient-to-br ${item.color} rounded-3xl flex items-center justify-center shadow-2xl relative overflow-hidden`}
                      whileHover={{ 
                        boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
                        y: -5
                      }}
                    >
                      <Icon className="w-10 h-10 text-white relative z-10" />
                      
                      {/* Shimmer effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100"
                        style={{ skewX: "-20deg" }}
                      />
                    </motion.div>
                  </motion.div>

                  <div className="flex-grow space-y-4">
                    <h3 className="text-xl font-bold text-foreground group-hover:text-gradient transition-all duration-300">
                      {item.title}
                    </h3>
                    
                    <p className="text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Stats footer */}
                  <motion.div
                    className="mt-6 pt-4 border-t border-border/50"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: index * 0.15 + 0.5 }}
                  >
                    <div className="flex items-center justify-center gap-2">
                      <TrendingUp className="w-4 h-4 text-primary" />
                      <span className="text-sm font-semibold text-primary">
                        {item.stats}
                      </span>
                    </div>
                  </motion.div>
                </motion.div>
              </FloatingCard3D>
            )
          })}
        </div>

        {/* Bottom highlight */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1 }}
        >
          <div className="inline-flex items-center gap-6 px-8 py-4 glass-card-strong rounded-2xl">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">500+</div>
              <div className="text-sm text-muted-foreground">Students</div>
            </div>
            <div className="w-px h-8 bg-border" />
            <div className="text-center">
              <div className="text-2xl font-bold text-accent">50+</div>
              <div className="text-sm text-muted-foreground">Countries</div>
            </div>
            <div className="w-px h-8 bg-border" />
            <div className="text-center">
              <div className="text-2xl font-bold text-success">95%</div>
              <div className="text-sm text-muted-foreground">Success Rate</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}