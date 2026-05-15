import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

export default function BookPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-earth-50 flex items-center justify-center pt-24 pb-16 px-6">
        <div className="text-center max-w-lg">
          <span className="text-5xl mb-6 block">🚐</span>
          <h1 className="font-display text-4xl font-bold text-earth-900 mb-4">Booking Coming Soon</h1>
          <p className="text-earth-500 text-lg mb-8">
            The full booking flow is being built. In the meantime, contact us to reserve your dates.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-bold px-8 py-4 rounded-full transition-all"
          >
            Contact Us to Book →
          </Link>
        </div>
      </main>
      <Footer />
    </>
  )
}
