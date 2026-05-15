'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    q: 'Do I drive the RV?',
    a: 'Absolutely not. This is our #1 rule. You drive your own car to the campsite. We deliver the RV fully setup and ready before you arrive. When your stay ends, we come pick it up.',
  },
  {
    q: 'Is RV insurance required?',
    a: 'No. Because you never drive the RV, you need zero RV insurance. Your regular car insurance covers your drive to the campsite — that\'s it.',
  },
  {
    q: 'Are campground fees included in my booking?',
    a: 'No — campground fees are paid directly to the campground or host. We display estimated fees on each destination page for transparency. Our booking total covers the RV, cleaning fee, and any add-ons you select.',
  },
  {
    q: 'What is the Solar Battery package?',
    a: 'The solar battery add-on provides a high-capacity portable power station for charging devices, running fans, and powering small appliances off-grid — great for dry camping or locations without electrical hookups.',
  },
  {
    q: 'Can beginners do this?',
    a: '100% yes. That\'s exactly who we designed this for. No RV experience needed. The RV arrives setup. We provide a quick orientation guide. You just show up and enjoy.',
  },
  {
    q: 'Can I bring kids?',
    a: 'Absolutely. Lunaris is especially family-friendly with comfortable sleeping for small families. All RVs are safe, clean, and stocked with everything you need for a great family weekend.',
  },
  {
    q: 'Can I drive my own car to get there?',
    a: 'Yes — that\'s the whole point. You drive your car to the campground address we provide. The RV will already be parked, leveled, and setup when you arrive.',
  },
  {
    q: 'Why do bookings require approval?',
    a: 'We personally review every booking to ensure the best experience for you and to coordinate RV delivery logistics. Approval typically happens within 24 hours. Once approved, you\'ll receive a secure payment link.',
  },
  {
    q: 'Are pets allowed?',
    a: 'Yes! We love pets. Add the Pet Fee during booking checkout. A configurable pet fee applies per stay to cover additional cleaning. Please let us know your pet\'s size and breed when submitting your request.',
  },
  {
    q: 'What is your cancellation policy?',
    a: 'Full refund 14+ days before check-in. 50% refund 7–13 days before. 25% refund 48 hours to 6 days before. No refund under 48 hours. All terms displayed at booking.',
  },
]

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border-b border-earth-100 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start justify-between gap-4 py-5 text-left group"
        aria-expanded={open}
      >
        <span className="font-semibold text-earth-900 text-base group-hover:text-brand-600 transition-colors">
          {q}
        </span>
        <ChevronDown
          size={18}
          className={`shrink-0 text-earth-400 transition-transform duration-300 mt-0.5 ${open ? 'rotate-180 text-brand-600' : ''}`}
        />
      </button>
      {open && (
        <p className="text-earth-600 text-sm leading-relaxed pb-5 pr-8">
          {a}
        </p>
      )}
    </div>
  )
}

export default function FAQSection() {
  const half = Math.ceil(faqs.length / 2)

  return (
    <section className="py-24 bg-earth-50">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block text-brand-600 text-sm font-bold uppercase tracking-widest mb-3">
            FAQ
          </span>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-earth-900 mb-4">
            Questions Answered
          </h2>
          <p className="text-earth-500 text-lg max-w-xl mx-auto">
            Everything you need to know before your first glamping weekend.
          </p>
        </div>

        {/* Two-col FAQ */}
        <div className="grid lg:grid-cols-2 gap-x-16">
          <div className="bg-white rounded-3xl px-8 py-2 shadow-card">
            {faqs.slice(0, half).map((faq) => (
              <FAQItem key={faq.q} {...faq} />
            ))}
          </div>
          <div className="bg-white rounded-3xl px-8 py-2 shadow-card">
            {faqs.slice(half).map((faq) => (
              <FAQItem key={faq.q} {...faq} />
            ))}
          </div>
        </div>

        {/* CTA below FAQ */}
        <p className="text-center text-earth-500 text-sm mt-8">
          Still have questions?{' '}
          <a href="/contact" className="text-brand-600 font-semibold hover:underline">
            Message us directly →
          </a>
        </p>
      </div>
    </section>
  )
}
