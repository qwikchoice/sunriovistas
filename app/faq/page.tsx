'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronDown, ArrowRight } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

type FAQ = { q: string; a: string }

const categories: { title: string; emoji: string; faqs: FAQ[] }[] = [
  {
    title: 'The Basics',
    emoji: '🏕️',
    faqs: [
      {
        q: 'Do I drive the RV?',
        a: 'No — never. You drive your own car to the campsite. We deliver the RV fully setup before you arrive. This is the entire point of SunRio Vistas: all the luxury of an RV without any of the driving stress.',
      },
      {
        q: 'Is RV experience or a license required?',
        a: 'Zero experience needed. You never touch the steering wheel. We handle delivery, setup, and pickup — you just show up, relax, and enjoy.',
      },
      {
        q: 'Do I need RV insurance?',
        a: 'No. Because you never drive the RV, you don\'t need any RV-specific insurance. Your standard auto insurance for your own car is all you need to get to the campsite.',
      },
      {
        q: 'Are campground fees included in my booking?',
        a: 'No — campground fees are paid directly to the campground or host. They are not collected by SunRio Vistas. We show estimated fees on each destination page, but you should confirm current rates with the campground directly.',
      },
    ],
  },
  {
    title: 'Booking & Payment',
    emoji: '💳',
    faqs: [
      {
        q: 'How does the booking process work?',
        a: 'Submit a booking request (no payment required). Our team reviews within 24 hours. If approved, you receive a secure Stripe payment link for your deposit. Once paid, your booking is confirmed. The remaining balance is auto-charged to your stored card on the day of arrival.',
      },
      {
        q: 'Why does my booking need manual approval?',
        a: 'We personally review every booking to ensure the dates, destination, and RV configuration work — and to confirm we can deliver the RV to your chosen campground. This also helps us catch any scheduling conflicts and guarantee a seamless experience.',
      },
      {
        q: 'What is the minimum stay?',
        a: 'All bookings require a minimum of 2 nights. This is required because of the logistics involved in delivering and setting up the RV at your campsite.',
      },
      {
        q: 'Is there a cleaning fee?',
        a: 'Yes — a mandatory $60 cleaning fee is added to every booking. This covers thorough professional cleaning of the RV between guests.',
      },
      {
        q: 'What payment methods do you accept?',
        a: 'All major credit and debit cards via Stripe. Payment is secure and encrypted. We never store your full card number — Stripe handles all payment processing.',
      },
    ],
  },
  {
    title: 'Cancellations & Refunds',
    emoji: '📅',
    faqs: [
      {
        q: 'What is your cancellation policy?',
        a: '14+ days before check-in: full refund. 7–13 days before: 50% refund. 48 hours to 6 days before: 25% refund. Less than 48 hours: no refund. Campground fees are subject to the campground\'s own cancellation policy.',
      },
      {
        q: 'Can I modify my booking dates?',
        a: 'Date modifications are subject to availability and require a new approval. Contact us as early as possible if you need to change your dates.',
      },
    ],
  },
  {
    title: 'The RV Experience',
    emoji: '🌙',
    faqs: [
      {
        q: 'What is included in the RV?',
        a: 'Every RV comes fully equipped: full kitchen (fridge, stovetop, microwave, cookware), private bathroom with hot shower, heating and air conditioning, all sleeping arrangements, USB charging ports, and basic kitchen supplies. See each RV\'s detail page for the full list.',
      },
      {
        q: 'Do the RVs have electricity?',
        a: 'Yes — at campgrounds with hookups, you\'ll have full shore power. For dry camping sites (like Beals Point or Red Hawk), we offer a Solar Battery Package or Generator Package as optional add-ons. Ask about these when booking.',
      },
      {
        q: 'What is the Solar Battery Package?',
        a: 'An optional add-on that provides extended off-grid power via a portable solar battery system. Ideal for campsites without electrical hookups. Great for charging devices, running lights, and powering small appliances.',
      },
      {
        q: 'Can I bring my own food and cook in the RV?',
        a: 'Absolutely — that\'s the point. Every RV has a full kitchen with stovetop, microwave, fridge, and basic cookware. We also have a Pre-fill Propane add-on to make sure you\'re ready to cook from the moment you arrive.',
      },
    ],
  },
  {
    title: 'Guests & Pets',
    emoji: '👨‍👩‍👧‍👦',
    faqs: [
      {
        q: 'Can beginners use this? We\'ve never camped before.',
        a: 'This is specifically designed for people who want the outdoor experience without the complexity. You don\'t need to know anything about RVs, camping, or outdoor cooking. We handle all setup, and you just enjoy nature.',
      },
      {
        q: 'Can I bring kids?',
        a: 'Yes — all three of our RVs are family-friendly. Lunaris is particularly popular with families. We also offer a Family Package add-on with kid-friendly extras. Just note the maximum guest count for the RV you select.',
      },
      {
        q: 'Are pets allowed?',
        a: 'Pets are welcome for an additional pet fee (set per booking). Please declare your pets during booking. Note that campground pet policies vary by location — confirm with your chosen campground before arrival.',
      },
    ],
  },
  {
    title: 'Destinations & Logistics',
    emoji: '📍',
    faqs: [
      {
        q: 'How does check-in and check-out work?',
        a: 'Standard check-in is 3:00 PM. Check-out is 11:00 AM. We deliver and set up the RV before your check-in time, and collect it after your check-out. Early check-in and late checkout may be available as add-ons, subject to availability.',
      },
      {
        q: 'What if I want to go to a campground not on your list?',
        a: 'Contact us — we\'re happy to discuss custom destinations. We operate primarily near Folsom Lake and Northern California, and can often accommodate nearby sites on a case-by-case basis.',
      },
      {
        q: 'Do I need to dump the tanks or do any cleanup?',
        a: 'No — we handle all of that. We pick up the RV after checkout and take care of all tank dumping and maintenance. That\'s part of the glamping experience: you do nothing except enjoy and then leave.',
      },
    ],
  },
]

function FAQItem({ faq }: { faq: FAQ }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-earth-100 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start justify-between gap-4 py-5 text-left group"
      >
        <span className="text-sm font-semibold text-earth-900 group-hover:text-brand-700 transition-colors leading-snug">
          {faq.q}
        </span>
        <ChevronDown
          size={18}
          className={`text-earth-400 shrink-0 mt-0.5 transition-transform duration-200 ${open ? 'rotate-180 text-brand-600' : ''}`}
        />
      </button>
      {open && (
        <div className="pb-5">
          <p className="text-sm text-earth-600 leading-relaxed">{faq.a}</p>
        </div>
      )}
    </div>
  )
}

export default function FAQPage() {
  return (
    <>
      <Navbar />
      <main>

        {/* Hero */}
        <section className="relative pt-32 pb-20 bg-earth-950 overflow-hidden">
          <div className="absolute inset-0 bg-noise opacity-20" />
          <div className="absolute -bottom-20 left-0 w-[500px] h-[400px] bg-brand-600/8 rounded-full blur-3xl" />
          <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <span className="inline-block text-brand-400 text-sm font-bold uppercase tracking-widest mb-4">
              Frequently Asked Questions
            </span>
            <h1 className="font-display text-5xl lg:text-6xl font-bold text-white mb-5 leading-tight">
              Everything You Need to Know
            </h1>
            <p className="text-earth-300 text-xl leading-relaxed max-w-2xl mx-auto">
              New to RV glamping? Have questions about how it works? We&apos;ve got answers.
            </p>
          </div>
        </section>

        {/* FAQ categories */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">

            {/* Jump links */}
            <div className="flex flex-wrap gap-2 justify-center mb-14">
              {categories.map((cat) => (
                <a
                  key={cat.title}
                  href={`#${cat.title.toLowerCase().replace(/\s+/g, '-')}`}
                  className="bg-earth-50 border border-earth-200 text-earth-700 hover:border-brand-300 hover:text-brand-700 text-sm font-medium px-4 py-2 rounded-full transition-all"
                >
                  {cat.emoji} {cat.title}
                </a>
              ))}
            </div>

            <div className="space-y-12">
              {categories.map((cat) => (
                <div key={cat.title} id={cat.title.toLowerCase().replace(/\s+/g, '-')}>
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-2xl">{cat.emoji}</span>
                    <h2 className="font-display text-2xl font-bold text-earth-900">{cat.title}</h2>
                  </div>
                  <div className="bg-earth-50 rounded-3xl px-6 divide-y divide-earth-100">
                    {cat.faqs.map((faq) => (
                      <FAQItem key={faq.q} faq={faq} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Still have questions */}
        <section className="py-20 bg-earth-50">
          <div className="max-w-2xl mx-auto px-6 text-center">
            <div className="text-4xl mb-5">💬</div>
            <h2 className="font-display text-3xl font-bold text-earth-900 mb-4">
              Still Have Questions?
            </h2>
            <p className="text-earth-500 text-lg mb-8">
              We&apos;re a small team and we actually answer emails. Reach out — we&apos;ll respond within a few hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-bold px-8 py-3.5 rounded-full transition-all hover:shadow-glow"
              >
                Ask a Question <ArrowRight size={16} />
              </Link>
              <Link
                href="/book"
                className="inline-flex items-center justify-center gap-2 border-2 border-earth-200 hover:border-brand-300 text-earth-700 font-semibold px-8 py-3.5 rounded-full transition-all"
              >
                Check Availability
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
