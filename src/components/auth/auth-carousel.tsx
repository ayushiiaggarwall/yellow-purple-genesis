"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Star, TrendingUp, Users, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"

const carouselItems = [
  {
    id: 1,
    title: "Build Without Code",
    description: "Create powerful applications using no-code tools like Bubble, Webflow, and more. No programming experience required.",
    image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800",
    icon: <Zap className="w-8 h-8" />,
    stats: "50+ Tools Mastered",
    color: "from-blue-500 to-cyan-500"
  },
  {
    id: 2,
    title: "Launch Your Product",
    description: "From idea to profitable product in just 5 weeks. Join 500+ successful entrepreneurs who built their dreams.",
    image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800",
    icon: <TrendingUp className="w-8 h-8" />,
    stats: "95% Success Rate",
    color: "from-green-500 to-emerald-500"
  },
  {
    id: 3,
    title: "Join the Community",
    description: "Connect with like-minded entrepreneurs, get mentorship, and access exclusive resources for your journey.",
    image: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800",
    icon: <Users className="w-8 h-8" />,
    stats: "500+ Active Members",
    color: "from-purple-500 to-pink-500"
  },
  {
    id: 4,
    title: "Real Success Stories",
    description: "Our students have generated over $2M in revenue. See how they transformed their ideas into profitable businesses.",
    image: "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=800",
    icon: <Star className="w-8 h-8" />,
    stats: "$2M+ Generated",
    color: "from-yellow-500 to-orange-500"
  }
]

export function AuthCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1)
      setCurrentIndex((prevIndex) => 
        prevIndex === carouselItems.length - 1 ? 0 : prevIndex + 1
      )
    }, 5000)

    return () => clearInterval(timer)
  }, [])

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  }

  const paginate = (newDirection: number) => {
    setDirection(newDirection)
    setCurrentIndex((prevIndex) => {
      if (newDirection === 1) {
        return prevIndex === carouselItems.length - 1 ? 0 : prevIndex + 1
      } else {
        return prevIndex === 0 ? carouselItems.length - 1 : prevIndex - 1
      }
    })
  }

  const currentItem = carouselItems[currentIndex]

  return (
    <div className="relative h-full flex flex-col justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
        style={{ 
          backgroundImage: `url(${currentItem.image})`,
        }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className={`absolute inset-0 bg-gradient-to-br ${currentItem.color} opacity-20`} />
      </div>

      {/* Content */}
      <div className="relative z-10 p-12 text-white">
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
            }}
            className="space-y-8"
          >
            {/* Icon */}
            <motion.div
              className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${currentItem.color} flex items-center justify-center shadow-2xl`}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: "spring" }}
            >
              <div className="text-white">
                {currentItem.icon}
              </div>
            </motion.div>

            {/* Title */}
            <motion.h2
              className="text-4xl md:text-5xl font-bold leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {currentItem.title}
            </motion.h2>

            {/* Description */}
            <motion.p
              className="text-xl text-white/90 leading-relaxed max-w-md"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {currentItem.description}
            </motion.p>

            {/* Stats */}
            <motion.div
              className="inline-flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
              <span className="font-semibold">{currentItem.stats}</span>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="absolute bottom-8 left-12 right-12 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {carouselItems.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? "bg-white scale-125" 
                    : "bg-white/40 hover:bg-white/60"
                }`}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1)
                  setCurrentIndex(index)
                }}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="w-10 h-10 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20"
              onClick={() => paginate(-1)}
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="w-10 h-10 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20"
              onClick={() => paginate(1)}
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}