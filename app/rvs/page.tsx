import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Check, Users, Bed, ChefHat, Bath, ArrowRight } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { rvs } from '@/lib/data/rvs'

export const metadata: Metadata = {
  title: 'Our RV Experiences',
  description: 'Choose from Lunaris, Stellaris, or Solaris — three premium stationary RV glamping experiences near Folsom Lake, California.',
}

export default function RVsPage() {
  return (
    <>
      <Navbar />
      <main>

        {/* Page hero */}
        <section className="relative pt-32 pb-20 bg-earth-950 overflow-hidden">
          <div className="absolute inset-0 bg-noise opacity-20" />
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand-600/10 rounded-full blur-3xl" />
          <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <span className="inline-block text-brand-400 text-sm font-bold uppercase tracking-widest mb-4">
              Three RVs · Three Identities
            </span>
            <h1 className="font-display text-5xl lg:text-6xl font-bold text-white mb-5 leading-tight">
              Choose Your Escape Style
            </h1>
            <p className="text-earth-300 text-xl leading-relaxed max-w-2xl mx-auto mb-8">
              Each RV is its own premium experience — designed for a different kind of traveler.
              None require driving. All require zero RV experience.
            </p>
            <div className="inline-flex items-center gap-2 bg-white/8 border border-white/12 text-white/70 text-sm px-5 py-2.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-400 animate-pulse" />
              You do NOT drive the RV — we deliver it fully setup
            </div>
          </div>
        </section>

        {/* RV Cards */}
        <section className="py-20 bg-earth-50">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-10">
            {rvs.map((rv, i) => (
              <div
                key={rv.slug}
                className={`group grid lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden shadow-card-lg bg-white hover:shadow-[0_20px_64px_rgba(0,0,0,0.12)] transition-all duration-500 ${
                  i % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''
                }`}
              >
                {/* Image side */}
                <div className="relative h-72 lg:h-auto min-h-[380px]">
                  <Image
                    src={rv.heroImage}
                    alt={rv.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-102"
                    sizes="(max-width:1024px) 100vw, 50vw"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-br ${rv.accent}`} />

                  {/* Badge */}
                  <div className="absolute top-6 left-6">
                    <span className={`${rv.badgeBg} text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg`}>
                      {rv.emoji} {rv.name}
                    </span>
                  </div>

                  {/* Starting at */}
                  <div className="absolute bottom-6 left-6">
                    <div className="bg-white/15 backdrop-blur-md border border-white/20 text-white rounded-2xl px-4 py-3">
                      <p className="text-white/70 text-xs">Starting at</p>
                      <p className="font-display text-2xl font-bold">{rv.startingAt}<span className="text-sm font-normal">/night</span></p>
                    </div>
                  </div>
                </div>

                {/* Content side */}
                <div className="p-8 lg:p-10 flex flex-col">
                  {/* Header */}
                  <div className="mb-6">
                    <h2 className="font-display text-3xl font-bold text-earth-900 mb-1">{rv.name}</h2>
                    <p className="text-brand-600 font-semibold italic text-base mb-4">{rv.tagline}</p>
                    <p className="text-earth-600 leading-relaxed">{rv.shortDesc}</p>
                  </div>

                  {/* Quick specs */}
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {[
                      { icon: Users,    label: `Sleeps ${rv.sleeps}` },
                      { icon: Bed,      label: rv.beds.split(' ')[0] + ' bed' },
                      { icon: ChefHat,  label: 'Full Kitchen' },
                      { icon: Bath,     label: 'Private Bathroom' },
                    ].map(({ icon: Icon, label }) => (
                      <div key={label} className="flex items-center gap-2.5 bg-earth-50 rounded-xl px-3 py-2.5">
                        <Icon size={14} className="text-brand-600 shrink-0" />
                        <span className="text-sm font-medium text-earth-700">{label}</span>
                      </div>
                    ))}
                  </div>

                  {/* Best for */}
                  <div className="mb-6">
                    <p className="text-xs font-bold text-earth-400 uppercase tracking-wider mb-2.5">Best For</p>
                    <div className="flex flex-wrap gap-2">
                      {rv.bestFor.map((tag) => (
                        <span key={tag} className="text-xs bg-earth-100 text-earth-700 px-3 py-1.5 rounded-full font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Top features */}
                  <div className="mb-8 space-y-2">
                    {rv.features.slice(0, 4).map((f) => (
                      <div key={f} className="flex items-center gap-2.5 text-sm text-earth-700">
                        <Check size={14} className="text-forest-700 shrink-0" />
                        {f}
                      </div>
                    ))}
                  </div>

                  {/* CTAs */}
                  <div className="flex gap-3 mt-auto">
                    <Link
                      href={`/rvs/${rv.slug}`}
                      className="flex-1 text-center bg-earth-950 hover:bg-brand-600 text-white font-semibold py-3.5 rounded-2xl transition-all duration-300 text-sm"
                    >
                      View Full Details
                    </Link>
                    <Link
                      href={`/book?rv=${rv.slug}`}
                      className="flex-1 text-center bg-brand-600 hover:bg-brand-700 text-white font-semibold py-3.5 rounded-2xl transition-all text-sm"
                    >
                      Check Availability →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Side-by-side comparison */}
        <section className="py-20 bg-white">
          <div className="max-w-5xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl lg:text-4xl font-bold text-earth-900 mb-3">
                Quick Comparison
              </h2>
              <p className="text-earth-500">Not sure which RV? Here&apos;s the side-by-side.</p>
            </div>

            <div className="rounded-3xl overflow-hidden border border-earth-100 shadow-card">
              {/* Header row */}
              <div className="grid grid-cols-4 bg-earth-950">
                <div className="px-5 py-4 text-earth-400 text-xs font-semibold uppercase tracking-wide" />
                {rvs.map((rv) => (
                  <div key={rv.slug} className="px-5 py-4 text-center border-l border-earth-800">
                    <span className="text-xl block mb-1">{rv.emoji}</span>
                    <span className="text-white font-bold text-sm">{rv.name}</span>
                  </div>
                ))}
              </div>

              {/* Comparison rows */}
              {[
                { label: 'Starting at',    vals: rvs.map((r) => r.startingAt + '/night') },
                { label: 'Sleeps',         vals: rvs.map((r) => `${r.sleeps} guests`) },
                { label: 'Best vibe',      vals: ['Cozy & Family', 'Calm & Soulful', 'Bold & Social'] },
                { label: 'Ideal for',      vals: ['Families, Couples', 'Wellness, Solo', 'Friends, Couples'] },
                { label: 'Kitchen',        vals: rvs.map(() => 'Full Kitchen ✓') },
                { label: 'Bathroom',       vals: rvs.map(() => 'Private ✓') },
                { label: 'Drive the RV?',  vals: rvs.map(() => '✗ Never') },
              ].map((row, i) => (
                <div
                  key={row.label}
                  className={`grid grid-cols-4 border-b border-earth-100 last:border-0 ${i % 2 === 0 ? 'bg-white' : 'bg-earth-50/50'}`}
                >
                  <div className="px-5 py-3.5 text-sm font-medium text-earth-500">{row.label}</div>
                  {row.vals.map((val, j) => (
                    <div
                      key={j}
                      className={`px-5 py-3.5 text-sm font-semibold text-center border-l border-earth-100 ${
                        val.includes('✗') ? 'text-rust-600' :
                        val.includes('✓') ? 'text-forest-700' : 'text-earth-800'
                      }`}
                    >
                      {val}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-earth-950 text-center">
          <div className="max-w-2xl mx-auto px-6">
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-white mb-4">
              Ready to Pick Yours?
            </h2>
            <p className="text-earth-400 text-lg mb-8">
              Submit a booking request — no payment until we approve and send you a link.
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
