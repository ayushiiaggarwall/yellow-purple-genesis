import { HeroSection } from "@/components/landing/hero-section"
import { WhoItsForSection } from "@/components/landing/who-its-for-section"
import { SyllabusSection } from "@/components/landing/syllabus-section"
import { ToolsSection } from "@/components/landing/tools-section"
import { FeaturesInteractiveSection } from "@/components/landing/features-section-interactive"
import { AboutSection } from "@/components/landing/about-section"
import { TestimonialsInteractive } from "@/components/landing/testimonials-interactive"
import { PricingSection } from "@/components/landing/pricing-section"
import { CTASection } from "@/components/landing/cta-section"
import { Header } from "@/components/landing/header"
import { Footer } from "@/components/landing/footer"
import { ParticlesBackground } from "@/components/ui/particles-background"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background relative">
      {/* Global background effects */}
      <ParticlesBackground particleCount={80} className="fixed inset-0 opacity-20" />
      
      <Header />
      <main className="relative z-10">
        <HeroSection />
        <WhoItsForSection />
        <SyllabusSection />
        <ToolsSection />
        <FeaturesInteractiveSection />
        <AboutSection />
        <TestimonialsInteractive />
        <PricingSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
