import { motion, useInView, AnimatePresence } from "framer-motion"
import { useRef, useState } from "react"
import { Star, Quote, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react"
import { FloatingCard3D } from "@/components/ui/floating-card-3d"
import { MagneticButton } from "@/components/ui/magnetic-button"

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Product Manager at Google",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b7e2?w=100&h=100&fit=crop&crop=face",
    content: "LearnForge transformed my side project idea into a $50k/month SaaS. The no-code approach let me validate and launch quickly without hiring developers. The community support was incredible!",
    rating: 5,
    revenue: "$50k/month",
    company: "Google",
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    name: "Marcus Thompson",
    role: "Former Software Engineer",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    content: "I left my corporate job after building my marketplace app using the techniques from this course. The structured approach and mentorship made all the difference. Now I'm running a 6-figure business.",
    rating: 5,
    revenue: "$120k/year",
    company: "Microsoft",
    gradient: "from-green-500 to-emerald-500"
  },
  {
    name: "Emily Rodriguez",
    role: "Marketing Director",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    content: "The community aspect is incredible. I found my co-founder through the program, and we've raised $500k in seed funding. The networking opportunities alone were worth the investment.",
    rating: 5,
    revenue: "$500k raised",
    company: "Meta",
    gradient: "from-purple-500 to-pink-500"
  },
  {
    name: "David Kim",
    role: "Freelance Designer",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    content: "Best investment I ever made. The structured approach and mentorship helped me launch 3 successful products in just 6 months. The ROI has been phenomenal.",
    rating: 5,
    revenue: "3 products launched",
    company: "Amazon",
    gradient: "from-orange-500 to-red-500"
  },
  {
    name: "Lisa Park",
    role: "Business Consultant",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
    content: "LearnForge didn't just teach me no-code - it taught me how to think like an entrepreneur. My mindset completely shifted. I now help other consultants transition to product-based businesses.",
    rating: 5,
    revenue: "Mindset transformed",
    company: "Apple",
    gradient: "from-indigo-500 to-purple-500"
  },
  {
    name: "Alex Johnson",
    role: "E-commerce Owner",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
    content: "The practical assignments and real-world projects made all the difference. I was earning revenue before I even finished the course. The support system is unmatched.",
    rating: 5,
    revenue: "Revenue within 4 weeks",
    company: "Shopify",
    gradient: "from-teal-500 to-blue-500"
  }
]

export function TestimonialsInteractive() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  const currentTestimonial = testimonials[currentIndex]

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
      rotateY: direction > 0 ? -45 : 45,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
      rotateY: direction < 0 ? -45 : 45,
    }),
  }

  const swipeConfidenceThreshold = 10000
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity
  }

  const paginate = (newDirection: number) => {
    setDirection(newDirection)
    setCurrentIndex((prevIndex) => {
      if (newDirection === 1) {
        return prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      } else {
        return prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
      }
    })
  }

  return (
    <section ref={ref} className="py-32 px-6 lg:px-8 bg-muted/30 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-primary/5" />
      
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
            <Quote className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Success Stories</span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            What Our{" "}
            <span className="text-gradient">Students</span>
            <br />
            Are{" "}
            <span className="text-gradient-purple">Saying</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Don't just take our word for it. Here's what our students have accomplished after completing the program.
            <span className="text-primary font-semibold"> Real people, real results.</span>
          </p>
        </motion.div>

        {/* Main testimonial display */}
        <div className="relative max-w-5xl mx-auto">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
                scale: { duration: 0.4 },
                rotateY: { duration: 0.4 },
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x)

                if (swipe < -swipeConfidenceThreshold) {
                  paginate(1)
                } else if (swipe > swipeConfidenceThreshold) {
                  paginate(-1)
                }
              }}
              className="absolute inset-0 cursor-grab active:cursor-grabbing"
            >
              <FloatingCard3D className="h-full">
                <div className="relative p-12 text-center overflow-hidden">
                  {/* Background gradient */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${currentTestimonial.gradient} opacity-5`}
                    animate={{ 
                      opacity: [0.05, 0.1, 0.05],
                      scale: [1, 1.02, 1]
                    }}
                    transition={{ 
                      duration: 4, 
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />

                  {/* Quote icon */}
                  <motion.div
                    className="w-16 h-16 mx-auto mb-8 bg-gradient-primary rounded-full flex items-center justify-center"
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  >
                    <Quote className="w-8 h-8 text-white" />
                  </motion.div>

                  {/* Rating */}
                  <div className="flex justify-center mb-6">
                    {[...Array(currentTestimonial.rating)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ 
                          delay: i * 0.1, 
                          type: "spring", 
                          stiffness: 500 
                        }}
                      >
                        <Star className="w-6 h-6 fill-primary text-primary mx-1" />
                      </motion.div>
                    ))}
                  </div>

                  {/* Content */}
                  <blockquote className="text-xl md:text-2xl text-foreground mb-8 leading-relaxed max-w-3xl mx-auto">
                    "{currentTestimonial.content}"
                  </blockquote>

                  {/* Author info */}
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                    <motion.img
                      src={currentTestimonial.image}
                      alt={currentTestimonial.name}
                      className="w-20 h-20 rounded-full object-cover ring-4 ring-primary/20"
                      whileHover={{ scale: 1.1 }}
                    />
                    <div className="text-center sm:text-left">
                      <div className="font-bold text-xl text-foreground">
                        {currentTestimonial.name}
                      </div>
                      <div className="text-muted-foreground mb-2">
                        {currentTestimonial.role}
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-primary font-bold">
                          {currentTestimonial.revenue}
                        </span>
                        <span className="text-muted-foreground">
                          • {currentTestimonial.company}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </FloatingCard3D>
            </motion.div>
          </AnimatePresence>

          {/* Navigation buttons */}
          <div className="absolute inset-y-0 left-0 flex items-center">
            <MagneticButton
              onClick={() => paginate(-1)}
              className="p-4 rounded-full bg-white/10 border border-white/20 backdrop-blur-md hover:bg-white/20"
              magneticStrength={0.5}
            >
              <ChevronLeft className="w-6 h-6" />
            </MagneticButton>
          </div>
          
          <div className="absolute inset-y-0 right-0 flex items-center">
            <MagneticButton
              onClick={() => paginate(1)}
              className="p-4 rounded-full bg-white/10 border border-white/20 backdrop-blur-md hover:bg-white/20"
              magneticStrength={0.5}
            >
              <ChevronRight className="w-6 h-6" />
            </MagneticButton>
          </div>
        </div>

        {/* Indicators */}
        <div className="flex justify-center mt-12 gap-3">
          {testimonials.map((_, index) => (
            <motion.button
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? "bg-primary scale-125" 
                  : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
              }`}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1)
                setCurrentIndex(index)
              }}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>

        {/* Bottom stats */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { number: "500+", label: "Success Stories", icon: "🎉" },
              { number: "$2M+", label: "Revenue Generated", icon: "💰" },
              { number: "95%", label: "Satisfaction Rate", icon: "⭐" }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="glass-card-strong p-6 text-center hover-lift"
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ delay: 1.2 + index * 0.1 }}
              >
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-3xl font-bold text-gradient mb-2">
                  {stat.number}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}