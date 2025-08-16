import { motion } from "framer-motion"
import { ExternalLink } from "lucide-react"

const tools = [
  {
    name: "Bubble",
    description: "Visual programming platform",
    category: "Development",
    logo: "🫧",
    color: "bg-blue-500/10 border-blue-500/20"
  },
  {
    name: "Supabase",
    description: "Backend as a Service",
    category: "Database",
    logo: "⚡",
    color: "bg-green-500/10 border-green-500/20"
  },
  {
    name: "n8n",
    description: "Workflow automation",
    category: "Automation",
    logo: "🔗",
    color: "bg-purple-500/10 border-purple-500/20"
  },
  {
    name: "Apify",
    description: "Web scraping platform",
    category: "Data",
    logo: "🕷️",
    color: "bg-orange-500/10 border-orange-500/20"
  },
  {
    name: "Stripe",
    description: "Payment processing",
    category: "Payments",
    logo: "💳",
    color: "bg-indigo-500/10 border-indigo-500/20"
  },
  {
    name: "Figma",
    description: "Design and prototyping",
    category: "Design",
    logo: "🎨",
    color: "bg-pink-500/10 border-pink-500/20"
  }
]

export function ToolsSection() {
  return (
    <section className="py-20 px-6 lg:px-8 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Master{" "}
            <span className="text-gradient">Modern Tools</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Learn to use the best no-code tools that power successful products. No complex setups or technical knowledge required.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`card-elevated bg-card p-6 group hover:scale-[1.02] transition-all duration-200 border ${tool.color}`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                  {tool.logo}
                </div>
                <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-foreground">{tool.name}</h3>
                  <span className="text-xs text-muted-foreground px-2 py-1 bg-muted/50 rounded-md">
                    {tool.category}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{tool.description}</p>
              </div>

              <div className="mt-4 pt-4 border-t border-border/50">
                <div className="text-xs text-muted-foreground">
                  ✓ Step-by-step tutorials included
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <div className="card-elevated bg-card p-8 max-w-2xl mx-auto">
            <h3 className="text-xl font-bold mb-3">
              Everything You Need in One Place
            </h3>
            <p className="text-muted-foreground mb-6">
              We&apos;ve curated the best tools and created comprehensive tutorials for each one. 
              No more endless research or trial and error.
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full">Free trials included</span>
              <span className="text-xs bg-accent/10 text-accent px-3 py-1 rounded-full">Setup assistance</span>
              <span className="text-xs bg-muted text-muted-foreground px-3 py-1 rounded-full">Lifetime access</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}