import Navbar from '@/components/layout/Navbar'
import Hero from '@/components/sections/Hero'
import BentoGrid from '@/components/sections/BentoGrid'
import Proceso from '@/components/sections/Proceso'
import QuoteWizard from '@/components/sections/QuoteWizard'
import Footer from '@/components/layout/Footer'
import ScrollProgress from '@/components/ui/ScrollProgress'

export default function Home() {
  return (
    <main className="relative">
      <ScrollProgress />
      <Navbar />
      <Hero />
      <BentoGrid />
      <Proceso />
      <QuoteWizard />
      <Footer />
    </main>
  )
}
