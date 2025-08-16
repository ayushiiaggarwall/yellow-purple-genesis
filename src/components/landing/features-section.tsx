import { motion } from "framer-motion"
import { 
  Zap, 
  Code, 
  DollarSign, 
  Users, 
  Lightbulb, 
  Rocket,
  Target,
  Shield,
  Clock
} from "lucide-react"

const features = [
  {
    icon: <Code className="h-8 w-8" />,
    title: "No-Code Mastery",
    description: "Master powerful no-code tools like Bubble, Webflow, Zapier, and Airtable to build complex applications without coding.",
    color: "bg-primary/10 border-primary/20"
  },
  {
    icon: <DollarSign className="h-8 w-8" />,
    title: "Revenue Generation",
    description: "Learn proven strategies to monetize your products from day one.",
    color: "bg-accent/10 border-accent/20"
  },
  {
    icon: <Users className="h-8 w-8" />,
    title: "Community Support",
    description: "Join a thriving community of makers and entrepreneurs.",
    color: "bg-accent/10 border-accent/20"
  },
  {
    icon: <Lightbulb className="h-8 w-8" />,
    title: "Idea Validation",
    description: "Discover how to validate your ideas before building, saving time and money.",
    color: "bg-primary/10 border-primary/20"
  },
  {
    icon: <Rocket className="h-8 w-8" />,
    title: "Product Launch",
    description: "Step-by-step guidance on launching your product successfully.",
    color: "bg-primary/10 border-primary/20"
  },
  {
    icon: <Target className="h-8 w-8" />,
    title: "Market Positioning",
    description: "Learn to position your product in the market for maximum impact.",
    color: "bg-accent/10 border-accent/20"
  }
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Everything You Need to{" "}
            <span className="text-gradient">Succeed</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From ideation to monetization, our comprehensive curriculum covers all aspects of building successful products.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`card-elevated bg-card p-6 group hover:scale-[1.02] transition-all duration-200 border ${feature.color}`}
            >
              <div className="w-12 h-12 mb-4 bg-gradient-primary rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <div className="text-white">
                  {feature.icon}
                </div>
              </div>
              
              <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Additional feature highlight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="card-elevated bg-card p-8 max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex items-center justify-center w-20 h-20 bg-gradient-primary rounded-full flex-shrink-0">
                <Clock className="w-10 h-10 text-white" />
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-2xl font-bold mb-2">5-Week Intensive Program</h3>
                <p className="text-muted-foreground text-lg">
                  Designed for busy professionals. Just 2-3 hours per week to transform your ideas into profitable products.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}