import { motion } from "framer-motion"
import { Star, Quote } from "lucide-react"

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Product Manager at Google",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b7e2?w=100&h=100&fit=crop&crop=face",
    content: "LearnForge transformed my side project idea into a $50k/month SaaS. The no-code approach let me validate and launch quickly without hiring developers.",
    rating: 5,
    revenue: "$50k/month"
  },
  {
    name: "Marcus Thompson",
    role: "Former Software Engineer",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    content: "I left my corporate job after building my marketplace app using the techniques from this course. Now I'm running a 6-figure business.",
    rating: 5,
    revenue: "$120k/year"
  },
  {
    name: "Emily Rodriguez",
    role: "Marketing Director",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    content: "The community aspect is incredible. I found my co-founder through the program, and we've raised $500k in seed funding.",
    rating: 5,
    revenue: "$500k raised"
  },
  {
    name: "David Kim",
    role: "Freelance Designer",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    content: "Best investment I ever made. The structured approach and mentorship helped me launch 3 successful products in just 6 months.",
    rating: 5,
    revenue: "3 products launched"
  },
  {
    name: "Lisa Park",
    role: "Business Consultant",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
    content: "LearnForge didn't just teach me no-code - it taught me how to think like an entrepreneur. My mindset completely shifted.",
    rating: 5,
    revenue: "Mindset transformed"
  },
  {
    name: "Alex Johnson",
    role: "E-commerce Owner",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
    content: "The practical assignments and real-world projects made all the difference. I was earning revenue before I even finished the course.",
    rating: 5,
    revenue: "Revenue within 4 weeks"
  }
]

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-20 px-6 lg:px-8 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Success Stories from{" "}
            <span className="text-gradient">Our Community</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our students have accomplished after completing the program.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`card-elevated bg-card p-6 h-full hover:scale-[1.02] transition-all duration-200 border ${
                index % 2 === 0 ? "border-primary/20" : "border-accent/20"
              }`}
            >
              <div className="flex flex-col h-full">
                {/* Quote icon */}
                <Quote className="w-8 h-8 text-primary mb-4" />
                
                {/* Content */}
                <blockquote className="text-foreground mb-6 flex-grow leading-relaxed">
                  "{testimonial.content}"
                </blockquote>
                
                {/* Rating */}
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current text-primary" />
                  ))}
                </div>
                
                {/* Author info */}
                <div className="flex items-center gap-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold text-foreground">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </div>
                    <div className="text-sm font-medium text-primary">
                      {testimonial.revenue}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="card-elevated bg-card max-w-2xl mx-auto p-8">
            <h3 className="text-2xl font-bold mb-4">
              Ready to Write Your Success Story?
            </h3>
            <p className="text-muted-foreground mb-6">
              Join our community of successful entrepreneurs and start building your product today.
            </p>
            <div className="flex flex-wrap justify-center gap-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">500+</div>
                <div className="text-sm text-muted-foreground">Success Stories</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">$2M+</div>
                <div className="text-sm text-muted-foreground">Revenue Generated</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">95%</div>
                <div className="text-sm text-muted-foreground">Satisfaction Rate</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}