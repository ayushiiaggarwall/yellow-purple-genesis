import { motion } from "framer-motion"
import { Check, Star, Crown, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { PaymentButton } from "@/components/payments/payment-button"

const pricingPlans = [
  {
    name: "Starter",
    price: 4999,
    originalPrice: 7999,
    icon: <Zap className="w-6 h-6" />,
    badge: "Most Popular",
    description: "Perfect for beginners ready to start their no-code journey",
    features: [
      "5-week intensive program",
      "50+ video lessons",
      "Community access",
      "Basic project templates",
      "Email support",
      "Certificate of completion"
    ],
    highlights: []
  },
  {
    name: "Pro",
    price: 9999,
    originalPrice: 15999,
    icon: <Star className="w-6 h-6" />,
    badge: "Best Value",
    description: "For serious entrepreneurs who want premium guidance",
    features: [
      "Everything in Starter",
      "1-on-1 mentorship sessions (4 sessions)",
      "Priority community access",
      "Advanced project templates",
      "Live Q&A sessions",
      "Lifetime course updates",
      "Guest expert workshops",
      "Product launch checklist"
    ],
    highlights: ["1-on-1 Mentorship", "Live Sessions"]
  },
  {
    name: "Enterprise",
    price: 19999,
    originalPrice: 29999,
    icon: <Crown className="w-6 h-6" />,
    badge: "Premium",
    description: "Complete package with personal guidance and exclusive benefits",
    features: [
      "Everything in Pro",
      "Weekly 1-on-1 mentorship",
      "Personal Slack channel",
      "Code review & feedback",
      "Product launch support",
      "Investor pitch deck template",
      "Access to alumni network",
      "6-month post-course support",
      "Revenue sharing opportunities"
    ],
    highlights: ["Weekly Mentorship", "Launch Support", "Alumni Network"]
  }
]

export function PricingSection() {
  return (
    <section id="pricing" className="py-20 px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Choose Your{" "}
            <span className="text-gradient">Learning Path</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Invest in your future with our comprehensive no-code to product programs. 
            All plans include lifetime access and our success guarantee.
          </p>
          <Badge variant="secondary" className="px-4 py-2">
            <Crown className="w-4 h-4 mr-2" />
            Limited Time: 40% Off All Plans
          </Badge>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={index === 1 ? "lg:scale-105" : ""}
            >
              <div
                className={`relative h-full card-elevated bg-card p-8 border ${
                  index === 1 ? 'border-primary/30 border-2' : 'border-border/50'
                }`}
              >
                {/* Badge */}
                {plan.badge && (
                  <Badge 
                    className={`absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 ${
                      index === 1 ? 'bg-primary text-primary-foreground' : 'bg-accent text-accent-foreground'
                    }`}
                  >
                    {plan.badge}
                  </Badge>
                )}

                <div className="text-center mb-8">
                  {/* Icon */}
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 ${
                    index === 1 ? 'bg-gradient-primary' : 'bg-gradient-accent'
                  }`}>
                    <div className="text-white">
                      {plan.icon}
                    </div>
                  </div>

                  {/* Plan name */}
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-muted-foreground mb-4">{plan.description}</p>

                  {/* Price */}
                  <div className="mb-6">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <span className="text-3xl md:text-4xl font-bold">
                        ₹{plan.price.toLocaleString()}
                      </span>
                      <span className="text-lg text-muted-foreground line-through">
                        ₹{plan.originalPrice.toLocaleString()}
                      </span>
                    </div>
                    <div className="text-sm text-muted-foreground">One-time payment</div>
                    <div className="text-xs text-primary font-medium">
                      Save ₹{(plan.originalPrice - plan.price).toLocaleString()}
                    </div>
                  </div>

                  {/* Highlights */}
                  {plan.highlights.length > 0 && (
                    <div className="flex flex-wrap gap-2 justify-center mb-6">
                      {plan.highlights.map((highlight, highlightIndex) => (
                        <Badge 
                          key={highlightIndex} 
                          variant="accent" 
                          className="text-xs"
                        >
                          {highlight}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                {/* Features */}
                <div className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-3">
                      <Check className="w-4 h-4 text-primary flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <PaymentButton
                  amount={plan.price}
                  courseName={`${plan.name} Plan - No-Code to Product Course`}
                  className="w-full"
                  variant={index === 1 ? "default" : "outline"}
                  size="lg"
                  preferredProvider="razorpay"
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Money back guarantee */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="card-elevated bg-card max-w-2xl mx-auto p-8">
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-success/10 rounded-full">
              <Check className="w-8 h-8 text-success" />
            </div>
            <h3 className="text-2xl font-bold mb-2">30-Day Money Back Guarantee</h3>
            <p className="text-muted-foreground">
              Not satisfied with the course? Get a full refund within 30 days, no questions asked. 
              We're confident you'll love the program and see real results.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}