import type { Metadata } from 'next'
import Link from 'next/link'
import { Check, ArrowRight, Info, Zap } from 'lucide-react'
import StripeBadge from '@/components/shared/StripeBadge'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { rvs } from '@/lib/data/rvs'

export const metadata: Metadata = {
  title: 'Pricing — SunRio Vistas RV Glamping',
  description: 'Transparent RV glamping pricing near Folsom Lake. No RV insurance, no gas costs, no mileage fees. Starting at $149/night with optional add-ons.',
}

const addons = [
  { name: 'Early Check-In (before 3pm)', price: 'Ask at booking', note: 'Subject to availability' },
  { name: 'Late Checkout (after 11am)', price: 'Ask at booking', note: 'Subject to availability' },
  { name: 'Solar Battery Package', price: 'Seasonal rate', note: 'Extend off-grid power' },
  { name: 'Bedding & Towels', price: 'Seasonal rate', note: 'Fresh linens delivered' },
  { name: 'Chairs (4-pack, flat)', price: 'Flat fee', note: 'Camp chairs for the group' },
  { name: 'Firepit Package', price: 'Seasonal rate', note: 'Firewood + starter kit' },
  { name: 'Outdoor Movie Package', price: 'Seasonal rate', note: 'Projector + screen setup' },
  { name: 'Couples Package', price: 'Seasonal rate', note: 'Romantic extras' },
  { name: 'Family Package', price: 'Seasonal rate', note: 'Kid-friendly add-ons' },
  { name: 'Pre-fill Propane', price: 'Flat fee', note: 'Full tank on arrival' },
  { name: 'Pre-fill Gas (generator)', price: 'Flat fee', note: 'Ready to run' },
  { name: 'Septic Tank Cleanup', price: 'Flat fee', note: 'We handle the dirty work' },
  { name: 'Pet Fee', price: 'Per stay', note: 'Configurable by admin' },
  { name: 'RV Delivery (extended range)', price: 'Per mile', note: 'Varies by destination' },
]

const campgroundFees = [
  { dest: 'Beals Point / Folsom Lake', dry: '~$30/night', hookup: '~$50–$60/night', note: 'State park fees' },
  { dest: 'Placerville RV Resort', dry: '—', hookup: '~$90/night', note: 'Full hookup resort' },
  { dest: 'Red Hawk Casino', dry: '~$0/night', hookup: '—', note: 'Self-contained stays only' },
  { dest: 'Wine Country / Harvest Hosts', dry: '~$0–$30/night', hookup: '—', note: 'Host fee varies' },
  { dest: 'Auburn / Gold Country', dry: 'Varies', hookup: 'Varies', note: 'Confirm with host' },
]

export default function PricingPage() {
  return (
    <>
      <Navbar />
      <main>

        {/* Hero */}
        <section className="relative pt-32 pb-20 bg-earth-950 overflow-hidden">
          <div className="absolute inset-0 bg-noise opacity-20" />
          <div className="absolute -top-40 right-0 w-[700px] h-[500px] bg-brand-600/8 rounded-full blur-3xl" />
          <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <span className="inline-block text-brand-400 text-sm font-bold uppercase tracking-widest mb-4">
              Transparent Pricing
            </span>
            <h1 className="font-display text-5xl lg:text-6xl font-bold text-white mb-5 leading-tight">
              What You Pay. What You Don&apos;t.
            </h1>
            <p className="text-earth-300 text-xl leading-relaxed max-w-2xl mx-auto">
              No RV insurance. No gas. No mileage. Just a flat glamping rate, a $60 cleaning fee, and your choice of add-ons.
            </p>
          </div>
        </section>

        {/* RV Pricing cards */}
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl lg:text-4xl font-bold text-earth-900 mb-3">
                Choose Your RV Experience
              </h2>
              <p className="text-earth-500 text-lg">2-night minimum · Deposit required at booking · Balance auto-charged on arrival</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {rvs.map((rv, i) => (
                <div
                  key={rv.slug}
                  className={`relative rounded-3xl border-2 overflow-hidden flex flex-col ${
                    i === 1
                      ? 'border-brand-400 shadow-glow'
                      : 'border-earth-100 shadow-card hover:shadow-card-lg transition-shadow'
                  }`}
                >
                  {i === 1 && (
                    <div className="bg-brand-600 text-white text-xs font-bold text-center py-2 tracking-widest uppercase">
                      Most Popular
                    </div>
                  )}

                  {/* Header */}
                  <div className={`p-6 ${i === 1 ? 'bg-brand-50' : 'bg-earth-50'}`}>
                    <p className="text-2xl mb-2">{rv.emoji}</p>
                    <h3 className="font-display text-2xl font-bold text-earth-900 mb-1">{rv.name}</h3>
                    <p className="text-earth-500 text-sm italic mb-4">{rv.tagline}</p>
                    <div className="flex items-baseline gap-1">
                      <span className="font-display text-4xl font-bold text-earth-900">{rv.startingAt}</span>
                      <span className="text-earth-400 text-sm">/night</span>
                    </div>
                    <p className="text-earth-400 text-xs mt-1">Starting price · Seasonal rates apply</p>
                  </div>

                  {/* Features */}
                  <div className="p-6 flex-1 space-y-3">
                    {[
                      `Sleeps ${rv.sleeps} guests`,
                      rv.beds,
                      rv.kitchen,
                      rv.bathroom,
                      'RV delivered & fully setup',
                      'No RV driving required',
                      'No RV insurance needed',
                    ].map((item) => (
                      <div key={item} className="flex items-center gap-2.5 text-sm text-earth-700">
                        <Check size={13} className="text-forest-700 shrink-0" />
                        {item}
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="p-6 pt-0">
                    <Link
                      href={`/book?rv=${rv.slug}`}
                      className={`block text-center font-bold py-3.5 rounded-2xl transition-all text-sm ${
                        i === 1
                          ? 'bg-brand-600 hover:bg-brand-700 text-white hover:shadow-glow'
                          : 'bg-earth-950 hover:bg-brand-600 text-white'
                      }`}
                    >
                      Check Availability →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mandatory fees */}
        <section className="py-20 bg-earth-50">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="font-display text-3xl font-bold text-earth-900 mb-3">What Every Booking Includes</h2>
              <p className="text-earth-500">No hidden charges. Two mandatory line items.</p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div className="bg-white rounded-3xl p-7 shadow-card border border-earth-100">
                <div className="w-11 h-11 bg-brand-100 rounded-2xl flex items-center justify-center mb-4">
                  <span className="text-xl">🏕️</span>
                </div>
                <h3 className="font-display text-xl font-bold text-earth-900 mb-2">RV Nightly Rate</h3>
                <p className="text-earth-600 text-sm leading-relaxed mb-4">
                  Pricing starts at $149/night for Lunaris. Rates vary by RV, season, and dates selected. All pricing is configurable — peak summer and holiday weekends may be higher.
                </p>
                <div className="bg-earth-50 rounded-2xl p-3">
                  <p className="text-xs text-earth-500">2-night minimum on all bookings</p>
                </div>
              </div>

              <div className="bg-white rounded-3xl p-7 shadow-card border border-earth-100">
                <div className="w-11 h-11 bg-brand-100 rounded-2xl flex items-center justify-center mb-4">
                  <span className="text-xl">🧹</span>
                </div>
                <h3 className="font-display text-xl font-bold text-earth-900 mb-2">Cleaning Fee</h3>
                <p className="text-earth-600 text-sm leading-relaxed mb-4">
                  A flat $60 cleaning fee applies to every booking — no exceptions. This covers deep cleaning of the RV between guests to maintain our premium standards.
                </p>
                <div className="bg-brand-50 rounded-2xl p-3">
                  <p className="text-xs text-brand-700 font-semibold">Flat $60 · Always included</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Cancellation policy */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="font-display text-3xl font-bold text-earth-900 mb-3">Cancellation Policy</h2>
              <p className="text-earth-500">We use a tiered refund policy based on how far in advance you cancel.</p>
            </div>

            <div className="rounded-3xl overflow-hidden border border-earth-100 shadow-card">
              {[
                { timing: '14+ days before check-in', refund: 'Full refund', color: 'text-forest-700', bg: 'bg-forest-50' },
                { timing: '7–13 days before check-in', refund: '50% refund', color: 'text-brand-700', bg: 'bg-brand-50' },
                { timing: '48 hours – 6 days before', refund: '25% refund', color: 'text-rust-600', bg: 'bg-orange-50' },
                { timing: 'Less than 48 hours', refund: 'No refund', color: 'text-red-600', bg: 'bg-red-50' },
              ].map((row, i) => (
                <div key={i} className={`grid sm:grid-cols-2 items-center gap-4 px-6 py-5 border-b border-earth-100 last:border-0 ${i % 2 === 1 ? 'bg-earth-50/50' : 'bg-white'}`}>
                  <p className="text-sm font-semibold text-earth-800">{row.timing}</p>
                  <div className={`inline-flex items-center gap-2 ${row.bg} ${row.color} text-sm font-bold px-4 py-2 rounded-full w-fit`}>
                    {row.refund}
                  </div>
                </div>
              ))}
            </div>

            <p className="text-center text-xs text-earth-400 mt-4">
              Refunds apply to the RV booking total. Campground fees are paid directly to the campground and are subject to their own cancellation policies.
            </p>
          </div>
        </section>

        {/* Add-ons */}
        <section className="py-20 bg-earth-50">
          <div className="max-w-5xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="font-display text-3xl font-bold text-earth-900 mb-3">Optional Add-ons</h2>
              <p className="text-earth-500 max-w-xl mx-auto">
                Customize your stay. Add-ons are selected during booking checkout. Pricing is seasonal and configurable.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {addons.map((addon) => (
                <div key={addon.name} className="bg-white rounded-2xl p-4 border border-earth-100 shadow-card hover:border-brand-200 hover:shadow-card-lg transition-all group">
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <p className="text-sm font-semibold text-earth-800 leading-snug group-hover:text-brand-700 transition-colors">{addon.name}</p>
                  </div>
                  <p className="text-xs text-earth-400">{addon.note}</p>
                  <div className="mt-2 inline-block bg-earth-50 text-earth-500 text-xs font-medium px-2.5 py-1 rounded-full">
                    {addon.price}
                  </div>
                </div>
              ))}
            </div>

            <p className="text-center text-xs text-earth-400 mt-6">
              All add-on prices are set by season in Admin. Exact pricing shown at checkout after selecting your dates.
            </p>
          </div>
        </section>

        {/* Campground fees */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="font-display text-3xl font-bold text-earth-900 mb-3">Campground Fees</h2>
              <p className="text-earth-500 max-w-xl mx-auto">
                Paid directly to the campground — NOT collected by SunRio Vistas. Estimates shown for planning purposes only.
              </p>
            </div>

            <div className="rounded-3xl overflow-hidden border border-earth-100 shadow-card mb-5">
              <div className="grid grid-cols-4 bg-earth-950 px-5 py-3">
                {['Destination', 'Dry Camping', 'Full Hookups', 'Notes'].map((h) => (
                  <p key={h} className="text-earth-400 text-xs font-semibold uppercase tracking-wider">{h}</p>
                ))}
              </div>
              {campgroundFees.map((row, i) => (
                <div key={i} className={`grid grid-cols-4 px-5 py-4 border-b border-earth-100 last:border-0 ${i % 2 === 1 ? 'bg-earth-50/40' : 'bg-white'}`}>
                  <p className="text-sm font-semibold text-earth-800">{row.dest}</p>
                  <p className="text-sm text-earth-600">{row.dry}</p>
                  <p className="text-sm text-earth-600">{row.hookup}</p>
                  <p className="text-xs text-earth-400">{row.note}</p>
                </div>
              ))}
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex gap-3">
              <Info size={16} className="text-amber-600 shrink-0 mt-0.5" />
              <p className="text-sm text-amber-800 leading-relaxed">
                <span className="font-semibold">Campground fees are estimates only.</span> Confirm current rates directly with the campground or host before your stay. SunRio Vistas does not collect or guarantee campground pricing.
              </p>
            </div>
          </div>
        </section>

        {/* Payment flow */}
        <section className="py-20 bg-earth-50">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="font-display text-3xl font-bold text-earth-900 mb-3">How Payment Works</h2>
              <p className="text-earth-500">Simple, secure, no surprises.</p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {[
                {
                  step: '01',
                  title: 'Submit Booking Request',
                  desc: 'No payment at this step. Your request goes to our team for manual review.',
                  icon: '📋',
                },
                {
                  step: '02',
                  title: 'We Approve & Send Payment Link',
                  desc: 'Within 24 hours you receive a secure Stripe payment link for your deposit.',
                  icon: '✅',
                },
                {
                  step: '03',
                  title: 'Pay Deposit to Confirm',
                  desc: 'Deposit amount is configurable (set by admin). This locks your booking.',
                  icon: '💳',
                },
                {
                  step: '04',
                  title: 'Balance Auto-Charged',
                  desc: 'Remaining balance is automatically charged to your stored card on arrival day.',
                  icon: '🔒',
                },
              ].map((s) => (
                <div key={s.step} className="bg-white rounded-3xl p-6 border border-earth-100 shadow-card flex gap-4">
                  <div className="w-10 h-10 bg-earth-950 text-white rounded-2xl flex items-center justify-center text-xs font-bold shrink-0">
                    {s.step}
                  </div>
                  <div>
                    <p className="text-lg font-bold text-earth-900 mb-1">{s.icon} {s.title}</p>
                    <p className="text-sm text-earth-600 leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 bg-white border border-earth-100 rounded-2xl p-4 flex items-center justify-between gap-3 shadow-card flex-wrap">
              <div className="flex items-center gap-3">
                <Zap size={16} className="text-brand-600 shrink-0" />
                <p className="text-sm text-earth-700">
                  All payments secure. Card details encrypted — we never see your full card number.
                </p>
              </div>
              <StripeBadge />
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-earth-950 text-center">
          <div className="max-w-2xl mx-auto px-6">
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-white mb-4">
              Ready to Book?
            </h2>
            <p className="text-earth-400 text-lg mb-8">
              No charge until we approve. Submit a request in under 3 minutes.
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
