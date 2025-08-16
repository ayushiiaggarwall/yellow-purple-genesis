import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronDown, Clock, Users, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const weeks = [
  {
    week: 1,
    title: "Foundation & Ideation",
    duration: "3 hours",
    lessons: 8,
    description: "Learn the fundamentals of no-code development and validate your business idea.",
    topics: [
      "No-code ecosystem overview",
      "Idea validation frameworks",
      "Market research techniques",
      "Building your first landing page"
    ]
  },
  {
    week: 2,
    title: "Design & User Experience",
    duration: "4 hours",
    lessons: 10,
    description: "Master design principles and create user-friendly interfaces without design experience.",
    topics: [
      "Design thinking fundamentals",
      "User experience best practices",
      "Prototyping with Figma",
      "Creating responsive designs"
    ]
  },
  {
    week: 3,
    title: "Building Your MVP",
    duration: "5 hours",
    lessons: 12,
    description: "Use Bubble to build a functional MVP that you can show to potential customers.",
    topics: [
      "Bubble fundamentals",
      "Database design",
      "Workflows and logic",
      "User authentication systems"
    ]
  },
  {
    week: 4,
    title: "Automation & Integrations",
    duration: "4 hours",
    lessons: 10,
    description: "Connect your product to external services and automate business processes.",
    topics: [
      "Zapier automations",
      "Payment processing setup",
      "Email marketing integration",
      "Analytics and tracking"
    ]
  },
  {
    week: 5,
    title: "Launch & Growth",
    duration: "3 hours",
    lessons: 10,
    description: "Launch your product and implement strategies to acquire your first customers.",
    topics: [
      "Launch strategy planning",
      "Customer acquisition tactics",
      "Feedback collection systems",
      "Scaling your product"
    ]
  }
]

export function SyllabusSection() {
  const [activeWeek, setActiveWeek] = useState(1)

  return (
    <section className="py-20 px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Your{" "}
            <span className="text-gradient">5-Week Journey</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A structured curriculum designed to take you from idea to launched product in just 5 weeks.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Week Tabs */}
          <div className="space-y-3">
            {weeks.map((week, index) => (
              <motion.button
                key={week.week}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                onClick={() => setActiveWeek(week.week)}
                className={`w-full text-left p-4 rounded-xl border transition-all duration-200 ${
                  activeWeek === week.week
                    ? "border-accent bg-accent/5 shadow-md"
                    : "border-border hover:border-accent/50 bg-card"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <Badge variant={activeWeek === week.week ? "accent" : "outline"}>
                    Week {week.week}
                  </Badge>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    {week.duration}
                  </div>
                </div>
                <h3 className="font-semibold text-sm mb-1">{week.title}</h3>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Users className="w-3 h-3" />
                  {week.lessons} lessons
                </div>
              </motion.button>
            ))}
          </div>

          {/* Week Content */}
          <div className="lg:col-span-2">
            <motion.div
              key={activeWeek}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="card-elevated bg-card p-8"
            >
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <Badge variant="accent">Week {activeWeek}</Badge>
                  <Badge variant="outline">{weeks[activeWeek - 1].duration}</Badge>
                  <Badge variant="outline">{weeks[activeWeek - 1].lessons} lessons</Badge>
                </div>
                <h3 className="text-2xl font-bold mb-3">{weeks[activeWeek - 1].title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {weeks[activeWeek - 1].description}
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-foreground">What you&apos;ll learn:</h4>
                <div className="space-y-2">
                  {weeks[activeWeek - 1].topics.map((topic, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
                      <span className="text-foreground">{topic}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-border">
                <Button size="sm" variant="outline">
                  View Full Curriculum
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}