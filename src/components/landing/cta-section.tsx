import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { ArrowRight, Clock, Users, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MagicCard } from "@/components/ui/magic-card"

export function CTASection() {
  return (
    <section className="py-24 px-6 lg:px-8 bg-muted/50">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <MagicCard className="p-12" gradientColor="rgba(251, 191, 36, 0.1)">
            {/* Urgency badge */}
            <Badge variant="destructive" className="mb-6 px-4 py-2">
              <Clock className="w-4 h-4 mr-2" />
              Limited Enrollment - Only 50 Spots Left
            </Badge>

            {/* Main heading */}
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Ready to Transform Your
              <span className="text-gradient-primary"> Ideas into Reality?</span>
            </h2>

            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of successful entrepreneurs who started with just an idea. 
              Your product journey begins with a single step.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-2">5 Weeks</div>
                <div className="text-sm text-muted-foreground">To Launch</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent mb-2">500+</div>
                <div className="text-sm text-muted-foreground">Success Stories</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary mb-2">95%</div>
                <div className="text-sm text-muted-foreground">Success Rate</div>
              </div>
            </div>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link to="/auth/signup">
                <Button size="lg" className="px-8 py-4 text-lg">
                  <Zap className="mr-2 h-5 w-5" />
                  Start Your Journey Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/auth/login">
                <Button variant="outline" size="lg" className="px-8 py-4 text-lg">
                  <Users className="mr-2 h-5 w-5" />
                  Join the Community
                </Button>
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="text-sm text-muted-foreground space-y-2">
              <p>✓ 30-day money-back guarantee</p>
              <p>✓ Lifetime access to course materials</p>
              <p>✓ Join 500+ successful entrepreneurs</p>
            </div>
          </MagicCard>
        </motion.div>

        {/* Secondary CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-12"
        >
          <div className="grid md:grid-cols-2 gap-6">
            <MagicCard className="p-6" gradientColor="rgba(168, 85, 247, 0.1)">
              <h3 className="text-xl font-bold mb-2">Not Ready to Commit?</h3>
              <p className="text-muted-foreground mb-4">
                Get our free "No-Code Starter Guide" and begin your journey today.
              </p>
              <Button variant="outline" className="w-full">
                Download Free Guide
              </Button>
            </MagicCard>

            <MagicCard className="p-6" gradientColor="rgba(251, 191, 36, 0.1)">
              <h3 className="text-xl font-bold mb-2">Have Questions?</h3>
              <p className="text-muted-foreground mb-4">
                Book a free 15-minute consultation with our team.
              </p>
              <Button variant="outline" className="w-full">
                Schedule a Call
              </Button>
            </MagicCard>
          </div>
        </motion.div>
      </div>
    </section>
  )
}