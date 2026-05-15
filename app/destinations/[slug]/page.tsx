import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import {
  MapPin, DollarSign, Car, Calendar, Zap,
  Check, Info, ArrowLeft, ArrowRight, Lightbulb, Backpack
} from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { destinations, getDestinationBySlug } from '@/lib/data/destinations'
import { rvs } from '@/lib/data/rvs'
import DynamicGallery from '@/components/shared/DynamicGallery'

type Props = { params: { slug: string } }

export async function generateStaticParams() {
  return destinations.map((d) => ({ slug: d.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const dest = getDestinationBySlug(params.slug)
  if (!dest) return {}
  return {
    title: `${dest.name} RV Glamping — ${dest.tagline}`,
    description: dest.shortDesc,
  }
}

export default function DestinationDetailPage({ params }: Props) {
  const dest = getDestinationBySlug(params.slug)
  if (!dest) notFound()

  const compatibleRVList = rvs.filter((r) => dest.compatibleRVs.includes(r.slug))
  const otherDests = destinations.filter((d) => d.slug !== dest.slug).slice(0, 3)

  return (
    <>
      <Navbar />
      <main>

        {/* HERO */}
        <section className="relative min-h-[80vh] flex items-end overflow-hidden">
          <Image
            src={dest.heroImage}
            alt={dest.name}
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className={`absolute inset-0 bg-gradient-to-br ${dest.accentGrad}`} />
          <div className="absolute inset-0 bg-gradient-to-t from-earth-950/95 via-earth-950/20 to-earth-950/60" />
          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/55 to-transparent" />

          {/* Back */}
          <div className="absolute top-24 left-6 lg:left-12 z-10">
            <Link
              href="/destinations"
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-medium px-4 py-2 rounded-full hover:bg-white/20 transition-all"
            >
              <ArrowLeft size={14} /> All Destinations
            </Link>
          </div>

          <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 pb-14 pt-32">
            <div className="max-w-3xl">
              <div className="flex flex-wrap items-center gap-3 mb-5">
                <span className={`${dest.badgeColor} text-white text-sm font-bold px-4 py-1.5 rounded-full`}>
                  <MapPin size={12} className="inline mr-1" />
                  {dest.region}
                </span>
                {dest.hookups && (
                  <span className="bg-forest-700 text-white text-xs font-bold px-3 py-1.5 rounded-full">
                    <Zap size={11} className="inline mr-1" />Full Hookups
                  </span>
                )}
              </div>
              <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-4 leading-tight">
                {dest.name}
              </h1>
              <p className="text-white/80 text-xl italic mb-5 font-medium">{dest.tagline}</p>
              <p className="text-white/70 text-lg leading-relaxed max-w-2xl">{dest.shortDesc}</p>
            </div>
          </div>
        </section>

        {/* QUICK INFO BAR */}
        <section className="bg-earth-950 border-b border-earth-800">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="flex flex-wrap items-center justify-between gap-y-4 py-5">
              <div className="flex flex-wrap gap-6">
                <span className="flex items-center gap-2 text-earth-300 text-sm">
                  <DollarSign size={14} className="text-brand-400" />
                  {dest.campFeeType}
                </span>
                <span className="flex items-center gap-2 text-earth-300 text-sm">
                  <Car size={14} className="text-brand-400" />
                  {dest.distance} from {dest.driveFrom}
                </span>
                <span className="flex items-center gap-2 text-earth-300 text-sm">
                  <Calendar size={14} className="text-brand-400" />
                  Best: {dest.bestMonths}
                </span>
                <span className="flex items-center gap-2 text-earth-300 text-sm">
                  <Zap size={14} className={dest.hookups ? 'text-forest-400' : 'text-earth-500'} />
                  {dest.hookups ? 'Full Hookups Available' : 'Dry Camping'}
                </span>
              </div>
              <Link
                href={`/book?destination=${dest.slug}`}
                className="bg-brand-600 hover:bg-brand-700 text-white text-sm font-bold px-6 py-2.5 rounded-full transition-all hover:shadow-glow"
              >
                Book This Destination →
              </Link>
            </div>
          </div>
        </section>

        {/* MAIN */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="grid lg:grid-cols-3 gap-12">

              {/* LEFT: content */}
              <div className="lg:col-span-2 space-y-14">

                {/* Story */}
                <div>
                  <span className="inline-block text-brand-600 text-xs font-bold uppercase tracking-widest mb-3">
                    About This Destination
                  </span>
                  <h2 className="font-display text-3xl font-bold text-earth-900 mb-6">
                    Why {dest.name}?
                  </h2>
                  <div className="space-y-4">
                    {dest.longDesc.map((para, i) => (
                      <p key={i} className="text-earth-600 leading-relaxed">{para}</p>
                    ))}
                  </div>
                </div>

                {/* Gallery */}
                <div>
                  <span className="inline-block text-brand-600 text-xs font-bold uppercase tracking-widest mb-4">
                    Gallery
                  </span>
                  <DynamicGallery
                    category="destination"
                    entitySlug={dest.slug}
                    fallbackGallery={dest.gallery}
                  />
                </div>

                {/* Activities */}
                <div>
                  <span className="inline-block text-brand-600 text-xs font-bold uppercase tracking-widest mb-4">
                    Things to Do
                  </span>
                  <h3 className="font-display text-2xl font-bold text-earth-900 mb-5">Activities & Experiences</h3>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {dest.activities.map((a) => (
                      <div key={a} className="flex items-center gap-2.5 p-3 bg-earth-50 rounded-xl">
                        <Check size={13} className="text-brand-600 shrink-0" />
                        <span className="text-sm text-earth-700 font-medium">{a}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Atmosphere */}
                <div>
                  <span className="inline-block text-brand-600 text-xs font-bold uppercase tracking-widest mb-3">
                    The Vibe
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {dest.atmosphere.map((v) => (
                      <span key={v} className="bg-brand-50 border border-brand-200 text-brand-700 text-sm font-semibold px-4 py-2 rounded-full">
                        {v}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Nearby attractions */}
                <div>
                  <span className="inline-block text-brand-600 text-xs font-bold uppercase tracking-widest mb-4">
                    Nearby
                  </span>
                  <h3 className="font-display text-2xl font-bold text-earth-900 mb-5">Around the Area</h3>
                  <div className="space-y-2.5">
                    {dest.nearbyAttractions.map((a) => (
                      <div key={a} className="flex items-center gap-3 p-3.5 bg-earth-50 rounded-xl">
                        <MapPin size={14} className="text-brand-600 shrink-0" />
                        <span className="text-sm text-earth-700 font-medium">{a}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* What to bring */}
                <div>
                  <span className="inline-block text-brand-600 text-xs font-bold uppercase tracking-widest mb-4">
                    Pack Smart
                  </span>
                  <h3 className="font-display text-2xl font-bold text-earth-900 mb-5">What to Bring</h3>
                  <div className="grid sm:grid-cols-2 gap-2.5">
                    {dest.whatToBring.map((item) => (
                      <div key={item} className="flex items-start gap-2.5 border border-earth-100 rounded-xl px-4 py-3">
                        <Backpack size={13} className="text-earth-400 shrink-0 mt-0.5" />
                        <span className="text-sm text-earth-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Insider tip */}
                <div className="bg-gradient-to-br from-brand-50 to-amber-50 border border-brand-200 rounded-3xl p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Lightbulb size={16} className="text-brand-600" />
                    <span className="text-brand-700 font-bold text-sm uppercase tracking-wider">Insider Tip</span>
                  </div>
                  <p className="text-earth-700 leading-relaxed italic">&ldquo;{dest.insiderTip}&rdquo;</p>
                </div>

                {/* Compatible RVs */}
                <div>
                  <span className="inline-block text-brand-600 text-xs font-bold uppercase tracking-widest mb-4">
                    Available RVs
                  </span>
                  <h3 className="font-display text-2xl font-bold text-earth-900 mb-5">
                    RVs for This Destination
                  </h3>
                  <div className="grid sm:grid-cols-3 gap-4">
                    {compatibleRVList.map((rv) => (
                      <Link
                        key={rv.slug}
                        href={`/rvs/${rv.slug}`}
                        className="group relative rounded-2xl overflow-hidden shadow-card hover:shadow-card-lg transition-all duration-300 hover:-translate-y-0.5"
                      >
                        <div className="relative h-36">
                          <Image
                            src={rv.heroImage}
                            alt={rv.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                            sizes="(max-width:640px) 100vw, 33vw"
                          />
                          <div className={`absolute inset-0 bg-gradient-to-t ${rv.accent}`} />
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 p-3">
                          <p className="text-white font-bold text-sm">{rv.emoji} {rv.name}</p>
                          <p className="text-white/70 text-xs">{rv.startingAt}/night</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

              </div>

              {/* RIGHT: sticky sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-24 space-y-4">

                  {/* Booking card */}
                  <div className="bg-white border-2 border-earth-100 rounded-3xl p-6 shadow-card-lg">
                    <h3 className="font-display text-xl font-bold text-earth-900 mb-1">{dest.name}</h3>
                    <p className="text-earth-500 text-sm mb-4">{dest.short}</p>

                    <div className="space-y-2.5 mb-5 pb-5 border-b border-earth-100">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-earth-500 flex items-center gap-1.5">
                          <DollarSign size={12} className="text-brand-500" /> Camp fee (est.)
                        </span>
                        <span className="font-semibold text-earth-800">
                          {dest.campFeeMin === 0 && dest.campFeeMax === 0 ? 'Free' :
                           dest.campFeeMin === null ? 'Varies' :
                           dest.campFeeMin === dest.campFeeMax ? `$${dest.campFeeMin}/night` :
                           `$${dest.campFeeMin}–${dest.campFeeMax}/night`}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-earth-500 flex items-center gap-1.5">
                          <Car size={12} className="text-brand-500" /> Drive time
                        </span>
                        <span className="font-semibold text-earth-800">{dest.distance}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-earth-500 flex items-center gap-1.5">
                          <Zap size={12} className="text-brand-500" /> Hookups
                        </span>
                        <span className={`font-semibold ${dest.hookups ? 'text-forest-700' : 'text-earth-500'}`}>
                          {dest.hookups ? 'Full hookups ✓' : 'Dry camping'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-earth-500 flex items-center gap-1.5">
                          <Calendar size={12} className="text-brand-500" /> Best season
                        </span>
                        <span className="font-semibold text-earth-800 text-right text-xs">{dest.bestMonths}</span>
                      </div>
                    </div>

                    <Link
                      href={`/book?destination=${dest.slug}`}
                      className="block text-center bg-brand-600 hover:bg-brand-700 text-white font-bold py-4 rounded-2xl transition-all hover:shadow-glow mb-3"
                    >
                      Book This Destination
                    </Link>
                    <Link
                      href="/contact"
                      className="block text-center border border-earth-200 hover:border-brand-300 text-earth-700 font-semibold py-3.5 rounded-2xl transition-all text-sm"
                    >
                      Ask a Question
                    </Link>
                  </div>

                  {/* Fee disclaimer */}
                  <div className="bg-earth-50 border border-earth-200 rounded-2xl p-4">
                    <div className="flex items-start gap-2">
                      <Info size={13} className="text-earth-400 shrink-0 mt-0.5" />
                      <p className="text-xs text-earth-500 leading-relaxed">
                        Campground fees are paid <strong className="text-earth-700">directly to the campground/host</strong> and
                        are not included in your SunRio Vistas booking total.
                      </p>
                    </div>
                  </div>

                  {/* You don't drive callout */}
                  <div className="bg-brand-600 rounded-2xl p-4 text-white text-center">
                    <p className="font-bold text-sm mb-1">You do NOT drive the RV.</p>
                    <p className="text-brand-100 text-xs leading-relaxed">
                      Drive your own car here. We deliver the RV fully setup before you arrive.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Other destinations */}
        <section className="py-16 bg-earth-50">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <h2 className="font-display text-3xl font-bold text-earth-900 mb-8 text-center">
              Explore Other Destinations
            </h2>
            <div className="grid md:grid-cols-3 gap-5">
              {otherDests.map((d) => (
                <Link
                  key={d.slug}
                  href={`/destinations/${d.slug}`}
                  className="group relative rounded-2xl overflow-hidden shadow-card hover:shadow-card-lg transition-all duration-300 hover:-translate-y-0.5"
                >
                  <div className="relative h-48">
                    <Image
                      src={d.heroImage}
                      alt={d.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width:768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-card-overlay" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-white font-bold text-base">{d.name}</p>
                    <p className="text-white/60 text-xs flex items-center gap-1 mt-0.5">
                      <Car size={10} /> {d.distance} · {d.campFeeType.split('·')[0].trim()}
                    </p>
                    <span className="text-brand-300 text-xs font-semibold group-hover:underline mt-1 block">
                      View details <ArrowRight size={10} className="inline" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
