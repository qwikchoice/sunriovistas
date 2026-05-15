'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Mail, MessageSquare, ArrowRight, Check } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { destinations } from '@/lib/data/destinations'
import { rvs } from '@/lib/data/rvs'

type FormState = 'idle' | 'submitting' | 'success' | 'error'

export default function ContactPage() {
  const [formState, setFormState] = useState<FormState>('idle')
  const [form, setForm] = useState({
    name: '',
    email: '',
    type: 'general',
    destination: '',
    rv: '',
    groupSize: '',
    dates: '',
    message: '',
  })

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setFormState('submitting')
    // Placeholder — will connect to API route
    await new Promise((r) => setTimeout(r, 1000))
    setFormState('success')
  }

  return (
    <>
      <Navbar />
      <main>

        {/* Hero */}
        <section className="relative pt-32 pb-20 bg-earth-950 overflow-hidden">
          <div className="absolute inset-0 bg-noise opacity-20" />
          <div className="absolute -top-20 right-0 w-[600px] h-[400px] bg-brand-600/8 rounded-full blur-3xl" />
          <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <span className="inline-block text-brand-400 text-sm font-bold uppercase tracking-widest mb-4">
              Get in Touch
            </span>
            <h1 className="font-display text-5xl lg:text-6xl font-bold text-white mb-5 leading-tight">
              We&apos;d Love to Hear From You
            </h1>
            <p className="text-earth-300 text-xl leading-relaxed max-w-2xl mx-auto">
              Questions, custom requests, group bookings — we&apos;re a small team and we actually read every message.
            </p>
          </div>
        </section>

        {/* Main content */}
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-12">

              {/* LEFT: form */}
              <div className="lg:col-span-2">
                {formState === 'success' ? (
                  <div className="bg-forest-50 border border-forest-200 rounded-3xl p-10 text-center">
                    <div className="w-16 h-16 bg-forest-100 rounded-full flex items-center justify-center mx-auto mb-5">
                      <Check size={28} className="text-forest-700" />
                    </div>
                    <h2 className="font-display text-2xl font-bold text-earth-900 mb-3">Message Received!</h2>
                    <p className="text-earth-600 mb-6">
                      Thanks for reaching out. We typically respond within a few hours during business hours.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <button
                        onClick={() => { setFormState('idle'); setForm({ name: '', email: '', type: 'general', destination: '', rv: '', groupSize: '', dates: '', message: '' }) }}
                        className="border border-earth-200 hover:border-brand-300 text-earth-700 font-semibold py-3 px-6 rounded-2xl transition-all text-sm"
                      >
                        Send Another
                      </button>
                      <Link
                        href="/book"
                        className="bg-brand-600 hover:bg-brand-700 text-white font-bold py-3 px-6 rounded-2xl transition-all text-sm flex items-center gap-2 justify-center"
                      >
                        Check Availability <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <h2 className="font-display text-2xl font-bold text-earth-900 mb-6">Send Us a Message</h2>
                    </div>

                    {/* Inquiry type */}
                    <div>
                      <label className="block text-xs font-bold text-earth-500 uppercase tracking-wider mb-2">
                        What can we help with?
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {[
                          { val: 'general', label: '💬 General Question' },
                          { val: 'booking', label: '📅 Booking Help' },
                          { val: 'custom', label: '✨ Custom Request' },
                          { val: 'group', label: '👨‍👩‍👧‍👦 Group Booking' },
                        ].map((opt) => (
                          <button
                            key={opt.val}
                            type="button"
                            onClick={() => setForm((p) => ({ ...p, type: opt.val }))}
                            className={`text-sm font-semibold px-4 py-2 rounded-full border transition-all ${
                              form.type === opt.val
                                ? 'bg-brand-600 text-white border-brand-600'
                                : 'bg-white text-earth-700 border-earth-200 hover:border-brand-300'
                            }`}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Name + Email */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-xs font-bold text-earth-500 uppercase tracking-wider mb-2">
                          Your Name *
                        </label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          required
                          value={form.name}
                          onChange={handleChange}
                          placeholder="First & last name"
                          className="w-full border border-earth-200 rounded-2xl px-4 py-3 text-sm text-earth-900 placeholder:text-earth-400 focus:outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-xs font-bold text-earth-500 uppercase tracking-wider mb-2">
                          Email Address *
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={form.email}
                          onChange={handleChange}
                          placeholder="you@example.com"
                          className="w-full border border-earth-200 rounded-2xl px-4 py-3 text-sm text-earth-900 placeholder:text-earth-400 focus:outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition"
                        />
                      </div>
                    </div>

                    {/* Destination + RV */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="destination" className="block text-xs font-bold text-earth-500 uppercase tracking-wider mb-2">
                          Destination (optional)
                        </label>
                        <select
                          id="destination"
                          name="destination"
                          value={form.destination}
                          onChange={handleChange}
                          className="w-full border border-earth-200 rounded-2xl px-4 py-3 text-sm text-earth-900 focus:outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition bg-white"
                        >
                          <option value="">Not sure yet</option>
                          {destinations.map((d) => (
                            <option key={d.slug} value={d.slug}>{d.name}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label htmlFor="rv" className="block text-xs font-bold text-earth-500 uppercase tracking-wider mb-2">
                          Preferred RV (optional)
                        </label>
                        <select
                          id="rv"
                          name="rv"
                          value={form.rv}
                          onChange={handleChange}
                          className="w-full border border-earth-200 rounded-2xl px-4 py-3 text-sm text-earth-900 focus:outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition bg-white"
                        >
                          <option value="">Not sure yet</option>
                          {rvs.map((r) => (
                            <option key={r.slug} value={r.slug}>{r.emoji} {r.name}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Dates + Group size */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="dates" className="block text-xs font-bold text-earth-500 uppercase tracking-wider mb-2">
                          Preferred Dates (optional)
                        </label>
                        <input
                          id="dates"
                          name="dates"
                          type="text"
                          value={form.dates}
                          onChange={handleChange}
                          placeholder="e.g. July 18–21"
                          className="w-full border border-earth-200 rounded-2xl px-4 py-3 text-sm text-earth-900 placeholder:text-earth-400 focus:outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition"
                        />
                      </div>
                      <div>
                        <label htmlFor="groupSize" className="block text-xs font-bold text-earth-500 uppercase tracking-wider mb-2">
                          Group Size (optional)
                        </label>
                        <input
                          id="groupSize"
                          name="groupSize"
                          type="text"
                          value={form.groupSize}
                          onChange={handleChange}
                          placeholder="e.g. 2 adults, 2 kids"
                          className="w-full border border-earth-200 rounded-2xl px-4 py-3 text-sm text-earth-900 placeholder:text-earth-400 focus:outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition"
                        />
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label htmlFor="message" className="block text-xs font-bold text-earth-500 uppercase tracking-wider mb-2">
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={5}
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Tell us what you're looking for, any questions you have, or special requests..."
                        className="w-full border border-earth-200 rounded-2xl px-4 py-3 text-sm text-earth-900 placeholder:text-earth-400 focus:outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={formState === 'submitting'}
                      className="w-full bg-brand-600 hover:bg-brand-700 disabled:opacity-60 text-white font-bold py-4 rounded-2xl transition-all hover:shadow-glow text-base"
                    >
                      {formState === 'submitting' ? 'Sending...' : 'Send Message →'}
                    </button>
                  </form>
                )}
              </div>

              {/* RIGHT: sidebar */}
              <div className="lg:col-span-1 space-y-5">

                <div className="bg-earth-50 rounded-3xl p-6 border border-earth-100">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-9 h-9 bg-brand-100 rounded-xl flex items-center justify-center">
                      <Mail size={16} className="text-brand-700" />
                    </div>
                    <h3 className="font-semibold text-earth-900">Email Us</h3>
                  </div>
                  <p className="text-sm text-earth-600 mb-2">
                    Prefer email? Reach us directly at:
                  </p>
                  <a
                    href="mailto:sunriovistas@gmail.com"
                    className="text-brand-600 font-semibold text-sm hover:underline"
                  >
                    sunriovistas@gmail.com
                  </a>
                </div>

                <div className="bg-earth-50 rounded-3xl p-6 border border-earth-100">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-9 h-9 bg-brand-100 rounded-xl flex items-center justify-center">
                      <MessageSquare size={16} className="text-brand-700" />
                    </div>
                    <h3 className="font-semibold text-earth-900">Response Time</h3>
                  </div>
                  <p className="text-sm text-earth-600 leading-relaxed">
                    We typically respond within a few hours during business hours. For booking inquiries, you can also go straight to the booking flow.
                  </p>
                </div>

                <div className="bg-brand-50 border border-brand-200 rounded-3xl p-6">
                  <p className="text-xs font-bold text-brand-700 uppercase tracking-wider mb-3">Ready to Book?</p>
                  <p className="text-sm text-earth-700 mb-4">
                    Skip the form — submit a booking request directly. No payment until we approve.
                  </p>
                  <Link
                    href="/book"
                    className="block text-center bg-brand-600 hover:bg-brand-700 text-white font-bold py-3 rounded-2xl transition-all text-sm hover:shadow-glow"
                  >
                    Check Availability →
                  </Link>
                </div>

                <div className="bg-white border border-earth-100 rounded-3xl p-6 shadow-card">
                  <p className="text-xs font-bold text-earth-400 uppercase tracking-wider mb-4">Quick Links</p>
                  <div className="space-y-2">
                    {[
                      { href: '/faq', label: 'Read our FAQ' },
                      { href: '/rvs', label: 'Browse RV Experiences' },
                      { href: '/destinations', label: 'Explore Destinations' },
                      { href: '/pricing', label: 'View Pricing' },
                    ].map((l) => (
                      <Link
                        key={l.href}
                        href={l.href}
                        className="flex items-center justify-between text-sm text-earth-700 hover:text-brand-700 py-2 border-b border-earth-100 last:border-0 transition-colors group"
                      >
                        {l.label}
                        <ArrowRight size={13} className="text-earth-300 group-hover:text-brand-500 transition-colors" />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
