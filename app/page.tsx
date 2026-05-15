import Navbar       from '@/components/layout/Navbar'
import Footer       from '@/components/layout/Footer'
import Hero         from '@/components/home/Hero'
import TrustBar     from '@/components/home/TrustBar'
import WhyDifferent from '@/components/home/WhyDifferent'
import SavingsAnchor from '@/components/home/SavingsAnchor'
import RVBrands     from '@/components/home/RVBrands'
import Destinations from '@/components/home/Destinations'
import HowItWorks   from '@/components/home/HowItWorks'
import Testimonials from '@/components/home/Testimonials'
import FAQSection   from '@/components/home/FAQSection'
import Scarcity     from '@/components/home/Scarcity'
import FinalCTA     from '@/components/home/FinalCTA'

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TrustBar />
        <WhyDifferent />
        <SavingsAnchor />
        <RVBrands />
        <Destinations />
        <HowItWorks />
        <Testimonials />
        <FAQSection />
        <Scarcity />
        <FinalCTA />
      </main>
      <Footer />
    </>
  )
}
