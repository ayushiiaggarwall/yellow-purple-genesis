import { motion } from "framer-motion"
import { CheckCircle, Award, Users2, TrendingUp } from "lucide-react"
import { MagicCard } from "@/components/ui/magic-card"

const highlights = [
  "Learn from industry experts with 10+ years experience",
  "Hands-on projects with real-world applications", 
  "1-on-1 mentorship and career guidance",
  "Lifetime access to course materials and updates",
  "Certificate of completion from LearnForge",
  "Access to exclusive alumni network"
]

const stats = [
  {
    icon: <Users2 className="w-8 h-8" />,
    number: "500+",
    label: "Successful Graduates",
    description: "Students who launched profitable products"
  },
  {
    icon: <TrendingUp className="w-8 h-8" />,
    number: "$2M+",
    label: "Revenue Generated",
    description: "Combined revenue by our alumni"
  },
  {
    icon: <Award className="w-8 h-8" />,
    number: "95%",
    label: "Success Rate",
    description: "Students who complete the program"
  }
]

export function AboutSection() {
  return (
    <section id="about" className="py-24 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                Why Choose
                <span className="text-gradient-primary"> LearnForge?</span>
              </h2>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                We've helped hundreds of aspiring entrepreneurs transform their ideas into profitable products. 
                Our proven methodology combines practical skills with real-world experience.
              </p>

              <div className="space-y-4">
                {highlights.map((highlight, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle className="w-6 h-6 text-primary flex-shrink-0" />
                    <span className="text-foreground">{highlight}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right side - Stats Cards */}
          <div className="space-y-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <MagicCard 
                  className="p-6"
                  gradientColor={index % 2 === 0 ? "rgba(251, 191, 36, 0.1)" : "rgba(168, 85, 247, 0.1)"}
                >
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-primary">
                      <div className="text-white">
                        {stat.icon}
                      </div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-foreground mb-1">
                        {stat.number}
                      </div>
                      <div className="font-semibold text-foreground mb-1">
                        {stat.label}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {stat.description}
                      </div>
                    </div>
                  </div>
                </MagicCard>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom section - Mission */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <MagicCard className="max-w-4xl mx-auto p-12">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Our Mission</h3>
            <p className="text-lg text-muted-foreground leading-relaxed">
              To democratize entrepreneurship by empowering everyone with the tools and knowledge 
              to build successful products without technical barriers. We believe that great ideas 
              shouldn't be limited by coding ability.
            </p>
          </MagicCard>
        </motion.div>
      </div>
    </section>
  )
}