import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Check, Users, Bed, ChefHat, Bath, MapPin, Plus, ArrowLeft, Star } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { rvs, getRVBySlug } from '@/lib/data/rvs'

type Props = { params: { slug: string } }

export async function generateStaticParams() {
  return rvs.map((rv) => ({ slug: rv.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const rv = getRVBySlug(params.slug)
  if (!rv) return {}
  return {
    title: `${rv.emoji} ${rv.name} — ${rv.tagline}`,
    description: rv.shortDesc,
  }
}

export default function RVDetailPage({ params }: Props) {
  const rv = getRVBySlug(params.slug)
  if (!rv) notFound()

  const otherRVs = rvs.filter((r) => r.slug !== rv.slug)

  return (
    <>
      <Navbar />
      <main>

        {/* HERO */}
        <section className="relative min-h-[85vh] flex items-end overflow-hidden">
          <Image
            src={rv.heroImage}
            alt={rv.name}
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className={`absolute inset-0 bg-gradient-to-br ${rv.accent}`} />
          <div className="absolute inset-0 bg-gradient-to-t from-earth-950/80 via-transparent to-earth-950/20" />

          {/* Back link */}
          <div className="absolute top-24 left-6 lg:left-12 z-10">
            <Link
              href="/rvs"
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-medium px-4 py-2 rounded-full hover:bg-white/20 transition-all"
            >
              <ArrowLeft size={14} /> All RVs
            </Link>
          </div>

          {/* Hero content */}
          <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 pb-14 pt-32">
            <div className="max-w-3xl">
              <div className="flex flex-wrap items-center gap-3 mb-5">
                <span className={`${rv.badgeBg} text-white text-sm font-bold px-4 py-1.5 rounded-full`}>
                  {rv.emoji} {rv.name}
                </span>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className="fill-brand-400 text-brand-400" />
                  ))}
                </div>
              </div>
              <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-4 leading-tight">
                {rv.name}
              </h1>
              <p className="text-white/80 text-xl italic mb-6 font-medium">{rv.tagline}</p>
              <p className="text-white/70 text-lg leading-relaxed max-w-2xl">{rv.shortDesc}</p>
            </div>
          </div>
        </section>

        {/* QUICK SPECS BAR */}
        <section className="bg-earth-950 border-b border-earth-800">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="flex flex-wrap items-center justify-between gap-y-4 py-5">
              {[
                { icon: Users,   label: `Sleeps ${rv.sleeps}` },
                { icon: Bed,     label: rv.beds },
                { icon: ChefHat, label: rv.kitchen },
                { icon: Bath,    label: rv.bathroom },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2.5 text-earth-300">
                  <Icon size={16} className="text-brand-400 shrink-0" />
                  <span className="text-sm font-medium">{label}</span>
                </div>
              ))}
              <Link
                href={`/book?rv=${rv.slug}`}
                className="bg-brand-600 hover:bg-brand-700 text-white text-sm font-bold px-6 py-2.5 rounded-full transition-all hover:shadow-glow"
              >
                Check Availability →
              </Link>
            </div>
          </div>
        </section>

        {/* MAIN CONTENT */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="grid lg:grid-cols-3 gap-12">

              {/* LEFT COLUMN — story + features */}
              <div className="lg:col-span-2 space-y-12">

                {/* Story */}
                <div>
                  <span className="inline-block text-brand-600 text-xs font-bold uppercase tracking-widest mb-3">
                    The Experience
                  </span>
                  <h2 className="font-display text-3xl font-bold text-earth-900 mb-6">
                    What Makes {rv.name} Special
                  </h2>
                  <div className="space-y-4">
                    {rv.longDesc.map((para, i) => (
                      <p key={i} className="text-earth-600 leading-relaxed text-base">
                        {para}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Photo gallery */}
                <div>
                  <span className="inline-block text-brand-600 text-xs font-bold uppercase tracking-widest mb-4">
                    Gallery
                  </span>
                  <div className="grid grid-cols-2 gap-3">
                    {rv.gallery.map((img, i) => (
                      <div
                        key={i}
                        className={`relative rounded-2xl overflow-hidden ${i === 0 ? 'col-span-2 h-64' : 'h-44'}`}
                      >
                        <Image
                          src={img.src}
                          alt={img.alt}
                          fill
                          className="object-cover hover:scale-105 transition-transform duration-500"
                          sizes="(max-width:768px) 100vw, (max-width:1024px) 66vw, 50vw"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Features */}
                <div>
                  <span className="inline-block text-brand-600 text-xs font-bold uppercase tracking-widest mb-4">
                    What&apos;s Inside
                  </span>
                  <h3 className="font-display text-2xl font-bold text-earth-900 mb-5">Features & Amenities</h3>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {rv.features.map((f) => (
                      <div key={f} className="flex items-start gap-2.5 p-3 bg-earth-50 rounded-xl">
                        <Check size={14} className="text-forest-700 shrink-0 mt-0.5" />
                        <span className="text-sm text-earth-700 font-medium">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* What's included */}
                <div>
                  <span className="inline-block text-brand-600 text-xs font-bold uppercase tracking-widest mb-4">
                    Every Stay Includes
                  </span>
                  <div className="bg-earth-50 rounded-3xl p-6 space-y-3">
                    {rv.included.map((item) => (
                      <div key={item} className="flex items-center gap-2.5 text-sm text-earth-700">
                        <Check size={14} className="text-brand-600 shrink-0" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Vibes */}
                <div>
                  <span className="inline-block text-brand-600 text-xs font-bold uppercase tracking-widest mb-4">
                    Experience Vibe
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {rv.vibes.map((v) => (
                      <span
                        key={v}
                        className="bg-brand-50 border border-brand-200 text-brand-700 text-sm font-semibold px-4 py-2 rounded-full"
                      >
                        {v}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Add-ons */}
                <div>
                  <span className="inline-block text-brand-600 text-xs font-bold uppercase tracking-widest mb-4">
                    Optional Add-ons
                  </span>
                  <h3 className="font-display text-2xl font-bold text-earth-900 mb-5">Customize Your Stay</h3>
                  <div className="grid sm:grid-cols-2 gap-2.5">
                    {rv.addons.map((a) => (
                      <div key={a} className="flex items-center gap-2.5 border border-earth-200 rounded-xl px-4 py-3 hover:border-brand-300 hover:bg-brand-50 transition-colors group">
                        <Plus size={14} className="text-earth-400 group-hover:text-brand-600 transition-colors shrink-0" />
                        <span className="text-sm text-earth-700 font-medium">{a}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-earth-400 mt-3">
                    Add-ons are selected during booking checkout. Pricing configurable by season.
                  </p>
                </div>

                {/* Destinations */}
                <div>
                  <span className="inline-block text-brand-600 text-xs font-bold uppercase tracking-widest mb-4">
                    Available Destinations
                  </span>
                  <h3 className="font-display text-2xl font-bold text-earth-900 mb-5">
                    Where {rv.name} Goes
                  </h3>
                  <div className="space-y-3">
                    {rv.destinations.map((dest) => (
                      <div key={dest} className="flex items-center gap-3 p-4 bg-earth-50 rounded-2xl border border-earth-100">
                        <MapPin size={16} className="text-brand-600 shrink-0" />
                        <span className="text-sm font-semibold text-earth-800">{dest}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* RIGHT COLUMN — sticky booking card */}
              <div className="lg:col-span-1">
                <div className="sticky top-24 space-y-4">

                  {/* Booking card */}
                  <div className="bg-white border-2 border-earth-100 rounded-3xl p-6 shadow-card-lg">
                    <div className="flex items-baseline gap-1 mb-1">
                      <span className="font-display text-4xl font-bold text-earth-900">{rv.startingAt}</span>
                      <span className="text-earth-500 text-sm">/night</span>
                    </div>
                    <p className="text-earth-400 text-xs mb-5">2-night minimum · Before campground fees</p>

                    <div className="space-y-2.5 mb-6">
                      {[
                        'No RV insurance needed',
                        'No gas or mileage fees',
                        'RV delivered & setup',
                        '$60 cleaning fee applies',
                        'Manual approval within 24hrs',
                      ].map((item) => (
                        <div key={item} className="flex items-center gap-2 text-sm text-earth-600">
                          <Check size={13} className="text-forest-700 shrink-0" />
                          {item}
                        </div>
                      ))}
                    </div>

                    <Link
                      href={`/book?rv=${rv.slug}`}
                      className="block text-center bg-brand-600 hover:bg-brand-700 text-white font-bold py-4 rounded-2xl transition-all hover:shadow-glow mb-3"
                    >
                      Check Availability
                    </Link>
                    <Link
                      href="/contact"
                      className="block text-center border border-earth-200 hover:border-brand-300 text-earth-700 font-semibold py-3.5 rounded-2xl transition-all text-sm"
                    >
                      Ask a Question
                    </Link>

                    <p className="text-center text-xs text-earth-400 mt-4">
                      No charge until approval · Secure Stripe payments
                    </p>
                  </div>

                  {/* Campground fee note */}
                  <div className="bg-earth-50 border border-earth-200 rounded-2xl p-4">
                    <p className="text-xs text-earth-500 leading-relaxed">
                      <span className="font-semibold text-earth-700">Campground fees</span> are paid directly
                      to the campground/host and are not included in your booking total.
                    </p>
                  </div>

                  {/* Best for */}
                  <div className="bg-earth-50 rounded-2xl p-4">
                    <p className="text-xs font-bold text-earth-400 uppercase tracking-wider mb-3">Best For</p>
                    <div className="flex flex-wrap gap-2">
                      {rv.bestFor.map((tag) => (
                        <span key={tag} className="text-xs bg-white border border-earth-200 text-earth-700 px-3 py-1.5 rounded-full font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* OTHER RVS */}
        <section className="py-20 bg-earth-50">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <h2 className="font-display text-3xl font-bold text-earth-900 mb-8 text-center">
              Explore Other Experiences
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {otherRVs.map((other) => (
                <Link
                  key={other.slug}
                  href={`/rvs/${other.slug}`}
                  className="group flex gap-5 bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-lg transition-all duration-300 hover:-translate-y-0.5"
                >
                  <div className="relative w-32 shrink-0">
                    <Image
                      src={other.heroImage}
                      alt={other.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="128px"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-r ${other.accent} opacity-60`} />
                  </div>
                  <div className="py-5 pr-5 flex-1">
                    <p className="text-lg font-bold text-earth-900 mb-1">
                      {other.emoji} {other.name}
                    </p>
                    <p className="text-earth-500 text-sm italic mb-2">{other.tagline}</p>
                    <p className="text-brand-600 text-sm font-semibold group-hover:underline">
                      View details →
                    </p>
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
