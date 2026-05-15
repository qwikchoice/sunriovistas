import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { MapPin, DollarSign, Zap, Car, Calendar, ArrowRight } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { destinations } from '@/lib/data/destinations'

export const metadata: Metadata = {
  title: 'Destinations — RV Glamping Near Folsom Lake',
  description: 'Five stunning glamping destinations near Sacramento — Folsom Lake, Placerville, Wine Country, Auburn, and Red Hawk. RV delivered fully setup.',
}

export default function DestinationsPage() {
  const [featured, ...rest] = destinations

  return (
    <>
      <Navbar />
      <main>

        {/* Page hero */}
        <section className="relative pt-32 pb-20 bg-earth-950 overflow-hidden">
          <div className="absolute inset-0 bg-noise opacity-20" />
          <div className="absolute -bottom-20 right-0 w-[600px] h-[400px] bg-brand-600/8 rounded-full blur-3xl" />
          <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <span className="inline-block text-brand-400 text-sm font-bold uppercase tracking-widest mb-4">
              5 Destinations · Northern California
            </span>
            <h1 className="font-display text-5xl lg:text-6xl font-bold text-white mb-5 leading-tight">
              Where Do You Want to Wake Up?
            </h1>
            <p className="text-earth-300 text-xl leading-relaxed max-w-2xl mx-auto mb-8">
              Lakeside sunsets. Vineyard mornings. Mountain-town charm. River canyons.
              Choose your backdrop — we deliver the RV.
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-sm">
              {destinations.map((d) => (
                <a
                  key={d.slug}
                  href={`#${d.slug}`}
                  className="bg-white/8 border border-white/12 text-earth-300 hover:text-white hover:border-white/30 px-4 py-2 rounded-full transition-all"
                >
                  {d.short}
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Featured destination */}
        <section className="py-16 bg-white" id={featured.slug}>
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="group relative rounded-3xl overflow-hidden shadow-card-lg">
              <div className="relative h-[520px]">
                <Image
                  src={featured.heroImage}
                  alt={featured.name}
                  fill
                  priority
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="100vw"
                />
                <div className="absolute inset-0 bg-card-overlay" />
                <div className="absolute inset-0 bg-gradient-to-r from-earth-950/70 via-earth-950/30 to-transparent" />
              </div>

              <div className="absolute inset-0 flex items-end">
                <div className="p-10 max-w-2xl">
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className={`${featured.badgeColor} text-white text-xs font-bold px-3 py-1.5 rounded-full`}>
                      ★ Most Popular
                    </span>
                    <span className="bg-white/15 border border-white/20 text-white text-xs font-medium px-3 py-1.5 rounded-full">
                      {featured.region}
                    </span>
                  </div>
                  <h2 className="font-display text-4xl lg:text-5xl font-bold text-white mb-3">
                    {featured.name}
                  </h2>
                  <p className="text-white/80 text-lg italic mb-4">{featured.tagline}</p>
                  <p className="text-white/70 text-base leading-relaxed mb-6 max-w-xl">
                    {featured.shortDesc}
                  </p>

                  <div className="flex flex-wrap gap-4 mb-6">
                    <span className="flex items-center gap-1.5 text-earth-200 text-sm">
                      <DollarSign size={13} className="text-brand-400" />
                      {featured.campFeeType}
                    </span>
                    <span className="flex items-center gap-1.5 text-earth-200 text-sm">
                      <Car size={13} className="text-brand-400" />
                      {featured.distance} from {featured.driveFrom}
                    </span>
                    <span className="flex items-center gap-1.5 text-earth-200 text-sm">
                      <Calendar size={13} className="text-brand-400" />
                      Best: {featured.bestMonths}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-7">
                    {featured.activities.slice(0, 5).map((a) => (
                      <span key={a} className="text-xs bg-white/12 border border-white/20 text-white px-3 py-1 rounded-full font-medium">
                        {a}
                      </span>
                    ))}
                  </div>

                  <Link
                    href={`/destinations/${featured.slug}`}
                    className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-bold px-7 py-3.5 rounded-full transition-all hover:shadow-glow"
                  >
                    Explore Folsom Lake <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Rest of destinations */}
        <section className="pb-20 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-8">
            {rest.map((dest, i) => (
              <div
                key={dest.slug}
                id={dest.slug}
                className={`group grid lg:grid-cols-5 gap-0 rounded-3xl overflow-hidden shadow-card bg-white hover:shadow-card-lg transition-all duration-500 hover:-translate-y-0.5 ${
                  i % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''
                }`}
              >
                {/* Image */}
                <div className="lg:col-span-2 relative h-64 lg:h-auto min-h-[280px]">
                  <Image
                    src={dest.heroImage}
                    alt={dest.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width:1024px) 100vw, 40vw"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-br ${dest.accentGrad}`} />
                  <div className="absolute top-4 left-4">
                    <span className={`${dest.badgeColor} text-white text-xs font-bold px-3 py-1.5 rounded-full shadow`}>
                      {dest.short}
                    </span>
                  </div>
                  {/* Fee badge */}
                  <div className="absolute bottom-4 left-4">
                    <div className="bg-black/40 backdrop-blur-sm border border-white/20 text-white text-xs font-semibold px-3 py-2 rounded-xl">
                      <span className="text-brand-300">Camp fee:</span> {dest.campFeeType}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="lg:col-span-3 p-7 lg:p-9 flex flex-col">
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                    <div>
                      <p className="text-brand-600 text-xs font-bold uppercase tracking-widest mb-1">{dest.region}</p>
                      <h3 className="font-display text-2xl font-bold text-earth-900">{dest.name}</h3>
                      <p className="text-earth-500 italic text-sm mt-1">{dest.tagline}</p>
                    </div>
                    <div className="flex flex-wrap gap-2 shrink-0">
                      {dest.hookups && (
                        <span className="flex items-center gap-1 bg-forest-50 border border-forest-200 text-forest-700 text-xs font-semibold px-2.5 py-1 rounded-full">
                          <Zap size={11} /> Full Hookups
                        </span>
                      )}
                      {!dest.hookups && (
                        <span className="flex items-center gap-1 bg-earth-100 text-earth-600 text-xs font-semibold px-2.5 py-1 rounded-full">
                          Dry Camping
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="text-earth-600 text-sm leading-relaxed mb-5">{dest.shortDesc}</p>

                  {/* Meta row */}
                  <div className="flex flex-wrap gap-4 text-sm text-earth-500 mb-5">
                    <span className="flex items-center gap-1.5">
                      <Car size={13} className="text-brand-500" />
                      {dest.distance} from {dest.driveFrom}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Calendar size={13} className="text-brand-500" />
                      {dest.bestMonths}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin size={13} className="text-brand-500" />
                      {dest.region}
                    </span>
                  </div>

                  {/* Activities */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {dest.activities.slice(0, 5).map((a) => (
                      <span key={a} className="text-xs bg-earth-50 border border-earth-200 text-earth-700 px-2.5 py-1 rounded-full font-medium">
                        {a}
                      </span>
                    ))}
                    {dest.activities.length > 5 && (
                      <span className="text-xs text-earth-400 px-2 py-1">+{dest.activities.length - 5} more</span>
                    )}
                  </div>

                  <div className="flex gap-3 mt-auto">
                    <Link
                      href={`/destinations/${dest.slug}`}
                      className="flex-1 text-center border border-earth-200 hover:border-brand-300 hover:bg-brand-50 text-earth-700 font-semibold py-3 rounded-2xl transition-all text-sm"
                    >
                      Full Details
                    </Link>
                    <Link
                      href={`/book?destination=${dest.slug}`}
                      className="flex-1 text-center bg-brand-600 hover:bg-brand-700 text-white font-semibold py-3 rounded-2xl transition-all text-sm"
                    >
                      Book This Destination →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Campground fee disclaimer */}
        <div className="max-w-4xl mx-auto px-6 pb-8">
          <div className="bg-earth-50 border border-earth-200 rounded-2xl p-4 text-center">
            <p className="text-xs text-earth-500 leading-relaxed">
              <span className="font-semibold text-earth-700">Campground fees</span> are paid directly to the
              campground/host and are <span className="font-semibold">not</span> included in your SunRio Vistas
              booking total. Fees shown are estimates — confirm with the campground directly.
            </p>
          </div>
        </div>

        {/* CTA */}
        <section className="py-20 bg-earth-950 text-center">
          <div className="max-w-2xl mx-auto px-6">
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-white mb-4">
              Pick Your Destination. We Handle the Rest.
            </h2>
            <p className="text-earth-400 text-lg mb-8">
              You do NOT drive the RV. Drive your own car — we deliver it fully setup.
            </p>
            <Link
              href="/book"
              className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-bold text-lg px-10 py-4 rounded-full transition-all hover:shadow-glow"
            >
              Check Availability <ArrowRight size={18} />
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
