'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'
import StripeBadge from '@/components/shared/StripeBadge'
import Link from 'next/link'
import {
  Check, ChevronRight, ChevronLeft, Calendar, Users,
  MapPin, Plus, Minus, ArrowRight, Lock, Star, Info
} from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { rvs } from '@/lib/data/rvs'
import { destinations } from '@/lib/data/destinations'

// ── Types ────────────────────────────────────────────────────────────────────

const ADDONS = [
  { id: 'early-checkin',    label: 'Early Check-In',          desc: 'Before 3pm · Subject to availability',  price: 'Ask at booking' },
  { id: 'late-checkout',    label: 'Late Checkout',            desc: 'After 11am · Subject to availability', price: 'Ask at booking' },
  { id: 'solar-battery',    label: 'Solar Battery Package',    desc: 'Extended off-grid power',              price: 'Seasonal rate' },
  { id: 'bedding',          label: 'Bedding & Towels',         desc: 'Fresh linens delivered',               price: 'Seasonal rate' },
  { id: 'chairs',           label: 'Chairs (4-pack)',          desc: 'Flat camping chairs',                  price: 'Flat fee' },
  { id: 'firepit',          label: 'Firepit Package',          desc: 'Firewood + starter kit',               price: 'Seasonal rate' },
  { id: 'movie',            label: 'Outdoor Movie Package',    desc: 'Projector + screen setup',             price: 'Seasonal rate' },
  { id: 'couples',          label: 'Couples Package',          desc: 'Romantic extras included',             price: 'Seasonal rate' },
  { id: 'family',           label: 'Family Package',           desc: 'Kid-friendly add-ons',                 price: 'Seasonal rate' },
  { id: 'propane',          label: 'Pre-fill Propane',         desc: 'Full tank on arrival',                 price: 'Flat fee' },
  { id: 'gas',              label: 'Pre-fill Gas (generator)', desc: 'Ready to run',                        price: 'Flat fee' },
  { id: 'septic',           label: 'Septic Tank Cleanup',      desc: 'We handle the dirty work',            price: 'Flat fee' },
  { id: 'pet',              label: 'Pet Fee',                   desc: 'Declare your pet',                    price: 'Per stay' },
]

type Step = 1 | 2 | 3 | 4 | 5 | 6 | 7

interface BookingState {
  rvSlug: string
  destSlug: string
  checkIn: string
  checkOut: string
  guests: number
  addons: string[]
  name: string
  email: string
  phone: string
  specialRequests: string
  termsAccepted: boolean
}

const STEPS = [
  'Choose RV',
  'Destination',
  'Dates',
  'Add-ons',
  'Your Info',
  'Review',
  'Submitted',
]

// ── Helpers ──────────────────────────────────────────────────────────────────

function nightsBetween(a: string, b: string): number {
  if (!a || !b) return 0
  const diff = new Date(b).getTime() - new Date(a).getTime()
  return Math.round(diff / 86400000)
}

function formatDate(d: string): string {
  if (!d) return ''
  return new Date(d + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function today(): string {
  return new Date().toISOString().slice(0, 10)
}

// ── Step components ───────────────────────────────────────────────────────────

function StepChooseRV({ state, set }: { state: BookingState; set: (k: keyof BookingState, v: string | number | boolean | string[]) => void }) {
  return (
    <div className="space-y-4">
      <p className="text-earth-500 text-sm mb-6">Pick the RV experience that fits your style. All RVs are delivered fully setup — you never drive.</p>
      {rvs.map((rv) => (
        <button
          key={rv.slug}
          onClick={() => set('rvSlug', rv.slug)}
          className={`w-full flex gap-4 items-center rounded-2xl border-2 p-4 text-left transition-all group ${
            state.rvSlug === rv.slug
              ? 'border-brand-500 bg-brand-50 shadow-glow'
              : 'border-earth-200 bg-white hover:border-brand-300 hover:shadow-card'
          }`}
        >
          <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0">
            <Image src={rv.heroImage} alt={rv.name} fill className="object-cover" sizes="80px" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-display text-lg font-bold text-earth-900">{rv.emoji} {rv.name}</span>
              <span className="text-xs text-earth-500 italic">{rv.tagline}</span>
            </div>
            <p className="text-xs text-earth-600 mb-2 line-clamp-2">{rv.shortDesc}</p>
            <div className="flex flex-wrap gap-1.5">
              <span className="text-xs bg-earth-100 text-earth-600 px-2 py-0.5 rounded-full">Sleeps {rv.sleeps}</span>
              {rv.bestFor.slice(0, 2).map((tag) => (
                <span key={tag} className="text-xs bg-earth-100 text-earth-600 px-2 py-0.5 rounded-full">{tag}</span>
              ))}
            </div>
          </div>
          <div className="shrink-0 text-right">
            <p className="font-display text-xl font-bold text-earth-900">{rv.startingAt}</p>
            <p className="text-xs text-earth-400">/night</p>
            <div className={`w-5 h-5 rounded-full border-2 mt-2 ml-auto flex items-center justify-center ${
              state.rvSlug === rv.slug ? 'border-brand-500 bg-brand-500' : 'border-earth-300'
            }`}>
              {state.rvSlug === rv.slug && <Check size={11} className="text-white" />}
            </div>
          </div>
        </button>
      ))}
    </div>
  )
}

function StepChooseDestination({ state, set }: { state: BookingState; set: (k: keyof BookingState, v: string | number | boolean | string[]) => void }) {
  return (
    <div className="space-y-3">
      <p className="text-earth-500 text-sm mb-6">Pick where you want to wake up. We deliver the RV there.</p>
      {destinations.map((dest) => (
        <button
          key={dest.slug}
          onClick={() => set('destSlug', dest.slug)}
          className={`w-full flex gap-4 items-start rounded-2xl border-2 p-4 text-left transition-all ${
            state.destSlug === dest.slug
              ? 'border-brand-500 bg-brand-50 shadow-glow'
              : 'border-earth-200 bg-white hover:border-brand-300 hover:shadow-card'
          }`}
        >
          <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0">
            <Image src={dest.heroImage} alt={dest.name} fill className="object-cover" sizes="64px" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-earth-900 mb-0.5">{dest.name}</p>
            <p className="text-xs text-earth-500 italic mb-2">{dest.tagline}</p>
            <div className="flex flex-wrap gap-2 text-xs text-earth-500">
              <span className="flex items-center gap-1"><MapPin size={11} /> {dest.region}</span>
              <span>·</span>
              <span>{dest.distance} from {dest.driveFrom}</span>
              <span>·</span>
              <span>Camp fee: {dest.campFeeType}</span>
            </div>
          </div>
          <div className={`w-5 h-5 rounded-full border-2 shrink-0 mt-1 flex items-center justify-center ${
            state.destSlug === dest.slug ? 'border-brand-500 bg-brand-500' : 'border-earth-300'
          }`}>
            {state.destSlug === dest.slug && <Check size={11} className="text-white" />}
          </div>
        </button>
      ))}
    </div>
  )
}

function StepDates({ state, set }: { state: BookingState; set: (k: keyof BookingState, v: string | number | boolean | string[]) => void }) {
  const nights = nightsBetween(state.checkIn, state.checkOut)
  const tooShort = nights > 0 && nights < 2
  return (
    <div className="space-y-6">
      <p className="text-earth-500 text-sm">Minimum stay is 2 nights. All bookings are subject to manual approval within 24 hours.</p>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-earth-500 uppercase tracking-wider mb-2">
            <Calendar size={12} className="inline mr-1" /> Check-In Date
          </label>
          <input
            type="date"
            min={today()}
            value={state.checkIn}
            onChange={(e) => set('checkIn', e.target.value)}
            className="w-full border-2 border-earth-200 rounded-2xl px-4 py-3 text-sm text-earth-900 focus:outline-none focus:border-brand-400 transition"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-earth-500 uppercase tracking-wider mb-2">
            <Calendar size={12} className="inline mr-1" /> Check-Out Date
          </label>
          <input
            type="date"
            min={state.checkIn || today()}
            value={state.checkOut}
            onChange={(e) => set('checkOut', e.target.value)}
            className="w-full border-2 border-earth-200 rounded-2xl px-4 py-3 text-sm text-earth-900 focus:outline-none focus:border-brand-400 transition"
          />
        </div>
      </div>

      {tooShort && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-3 text-sm text-red-700 flex gap-2">
          <Info size={15} className="shrink-0 mt-0.5" />
          Minimum stay is 2 nights. Please extend your checkout date.
        </div>
      )}

      {nights >= 2 && (
        <div className="bg-brand-50 border border-brand-200 rounded-2xl p-4">
          <p className="text-sm font-semibold text-brand-800">
            ✓ {nights} nights selected · {formatDate(state.checkIn)} → {formatDate(state.checkOut)}
          </p>
        </div>
      )}

      <div>
        <label className="block text-xs font-bold text-earth-500 uppercase tracking-wider mb-2">
          <Users size={12} className="inline mr-1" /> Number of Guests
        </label>
        <div className="flex items-center gap-4 border-2 border-earth-200 rounded-2xl px-4 py-3 w-fit">
          <button
            onClick={() => set('guests', Math.max(1, state.guests - 1))}
            className="w-7 h-7 rounded-full border border-earth-200 flex items-center justify-center hover:border-brand-400 hover:text-brand-600 transition"
          >
            <Minus size={14} />
          </button>
          <span className="font-bold text-earth-900 w-8 text-center">{state.guests}</span>
          <button
            onClick={() => {
              const rv = rvs.find((r) => r.slug === state.rvSlug)
              const max = rv?.sleeps ?? 8
              set('guests', Math.min(max, state.guests + 1))
            }}
            className="w-7 h-7 rounded-full border border-earth-200 flex items-center justify-center hover:border-brand-400 hover:text-brand-600 transition"
          >
            <Plus size={14} />
          </button>
        </div>
        {state.rvSlug && (
          <p className="text-xs text-earth-400 mt-2">
            Max: {rvs.find((r) => r.slug === state.rvSlug)?.sleeps} guests for {rvs.find((r) => r.slug === state.rvSlug)?.name}
          </p>
        )}
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3 text-xs text-amber-800 flex gap-2">
        <Info size={13} className="shrink-0 mt-0.5" />
        Campground fees are paid directly to the campground and are not included in your SunRio Vistas booking.
      </div>
    </div>
  )
}

function StepAddons({ state, set }: { state: BookingState; set: (k: keyof BookingState, v: string | number | boolean | string[]) => void }) {
  function toggle(id: string) {
    const current = state.addons
    set('addons', current.includes(id) ? current.filter((a) => a !== id) : [...current, id])
  }
  return (
    <div className="space-y-3">
      <p className="text-earth-500 text-sm mb-6">All optional. Exact pricing is seasonal and will be shown at checkout. Select what interests you.</p>
      {ADDONS.map((addon) => {
        const selected = state.addons.includes(addon.id)
        return (
          <button
            key={addon.id}
            onClick={() => toggle(addon.id)}
            className={`w-full flex items-center gap-4 rounded-2xl border-2 p-4 text-left transition-all ${
              selected
                ? 'border-brand-500 bg-brand-50'
                : 'border-earth-200 bg-white hover:border-brand-300'
            }`}
          >
            <div className={`w-5 h-5 rounded border-2 shrink-0 flex items-center justify-center transition-all ${
              selected ? 'border-brand-500 bg-brand-500' : 'border-earth-300'
            }`}>
              {selected && <Check size={11} className="text-white" />}
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-earth-900">{addon.label}</p>
              <p className="text-xs text-earth-500">{addon.desc}</p>
            </div>
            <span className="text-xs text-earth-400 shrink-0">{addon.price}</span>
          </button>
        )
      })}
    </div>
  )
}

function StepYourInfo({ state, set }: { state: BookingState; set: (k: keyof BookingState, v: string | number | boolean | string[]) => void }) {
  return (
    <div className="space-y-5">
      <p className="text-earth-500 text-sm mb-6">Your info is used to contact you about your booking. No payment is collected yet.</p>

      {/* SSO buttons */}
      <div className="space-y-3">
        <p className="text-xs font-bold text-earth-500 uppercase tracking-wider">Sign In or Continue As Guest</p>
        <div className="grid sm:grid-cols-3 gap-3">
          {[
            { label: 'Continue with Google', icon: '🇬', color: 'border-earth-200 hover:border-blue-300 hover:bg-blue-50' },
            { label: 'Continue with Apple',  icon: '🍎', color: 'border-earth-200 hover:border-gray-400 hover:bg-gray-50' },
            { label: 'Continue with Facebook', icon: '📘', color: 'border-earth-200 hover:border-blue-400 hover:bg-blue-50' },
          ].map((s) => (
            <button
              key={s.label}
              className={`flex items-center justify-center gap-2 border-2 rounded-2xl py-3 text-sm font-semibold text-earth-700 transition-all ${s.color}`}
            >
              <span>{s.icon}</span>
              <span className="hidden sm:inline">{s.label.replace('Continue with ', '')}</span>
              <span className="sm:hidden">{s.label}</span>
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3 text-xs text-earth-400">
          <div className="flex-1 h-px bg-earth-200" />
          or fill in manually
          <div className="flex-1 h-px bg-earth-200" />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-earth-500 uppercase tracking-wider mb-2">Full Name *</label>
          <input
            type="text"
            required
            value={state.name}
            onChange={(e) => set('name', e.target.value)}
            placeholder="First & last name"
            className="w-full border-2 border-earth-200 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-brand-400 transition"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-earth-500 uppercase tracking-wider mb-2">Email Address *</label>
          <input
            type="email"
            required
            value={state.email}
            onChange={(e) => set('email', e.target.value)}
            placeholder="you@example.com"
            className="w-full border-2 border-earth-200 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-brand-400 transition"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-earth-500 uppercase tracking-wider mb-2">Phone Number (optional)</label>
        <input
          type="tel"
          value={state.phone}
          onChange={(e) => set('phone', e.target.value)}
          placeholder="(555) 000-0000"
          className="w-full border-2 border-earth-200 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-brand-400 transition"
        />
      </div>

      <div>
        <label className="block text-xs font-bold text-earth-500 uppercase tracking-wider mb-2">Special Requests (optional)</label>
        <textarea
          rows={3}
          value={state.specialRequests}
          onChange={(e) => set('specialRequests', e.target.value)}
          placeholder="Pets, accessibility needs, anniversary, questions..."
          className="w-full border-2 border-earth-200 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-brand-400 transition resize-none"
        />
      </div>
    </div>
  )
}

function StepReview({
  state,
  set,
  onSubmit,
  submitting,
}: {
  state: BookingState
  set: (k: keyof BookingState, v: string | number | boolean | string[]) => void
  onSubmit: () => void
  submitting: boolean
}) {
  const rv = rvs.find((r) => r.slug === state.rvSlug)
  const dest = destinations.find((d) => d.slug === state.destSlug)
  const nights = nightsBetween(state.checkIn, state.checkOut)
  const selectedAddons = ADDONS.filter((a) => state.addons.includes(a.id))

  return (
    <div className="space-y-5">
      <p className="text-earth-500 text-sm">Review your booking request. No payment is collected now — we send a payment link after approval.</p>

      {/* Summary card */}
      <div className="bg-earth-50 rounded-3xl p-5 border border-earth-100 space-y-4">
        {rv && (
          <div className="flex gap-3 items-center border-b border-earth-200 pb-4">
            <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0">
              <Image src={rv.heroImage} alt={rv.name} fill className="object-cover" sizes="48px" />
            </div>
            <div>
              <p className="font-bold text-earth-900">{rv.emoji} {rv.name}</p>
              <p className="text-xs text-earth-500 italic">{rv.tagline}</p>
            </div>
          </div>
        )}

        <div className="grid sm:grid-cols-2 gap-3 text-sm">
          <div>
            <p className="text-xs font-bold text-earth-400 uppercase tracking-wider mb-1">Destination</p>
            <p className="font-semibold text-earth-800">{dest?.name ?? '—'}</p>
            <p className="text-xs text-earth-500">{dest?.region}</p>
          </div>
          <div>
            <p className="text-xs font-bold text-earth-400 uppercase tracking-wider mb-1">Dates</p>
            <p className="font-semibold text-earth-800">{formatDate(state.checkIn)} → {formatDate(state.checkOut)}</p>
            <p className="text-xs text-earth-500">{nights} nights · {state.guests} guest{state.guests > 1 ? 's' : ''}</p>
          </div>
          <div>
            <p className="text-xs font-bold text-earth-400 uppercase tracking-wider mb-1">Contact</p>
            <p className="font-semibold text-earth-800">{state.name}</p>
            <p className="text-xs text-earth-500">{state.email}</p>
          </div>
          <div>
            <p className="text-xs font-bold text-earth-400 uppercase tracking-wider mb-1">Cleaning Fee</p>
            <p className="font-semibold text-earth-800">$60.00</p>
            <p className="text-xs text-earth-500">Mandatory · All bookings</p>
          </div>
        </div>

        {selectedAddons.length > 0 && (
          <div className="border-t border-earth-200 pt-3">
            <p className="text-xs font-bold text-earth-400 uppercase tracking-wider mb-2">Add-ons Selected</p>
            <div className="flex flex-wrap gap-2">
              {selectedAddons.map((a) => (
                <span key={a.id} className="text-xs bg-brand-100 text-brand-700 px-2.5 py-1 rounded-full font-medium">{a.label}</span>
              ))}
            </div>
          </div>
        )}

        <div className="border-t border-earth-200 pt-3 bg-brand-50 -mx-5 -mb-5 px-5 pb-5 rounded-b-3xl">
          <p className="text-xs text-brand-700 font-semibold">
            💳 Payment not collected yet. You&apos;ll receive a Stripe link after we approve your request.
          </p>
        </div>
      </div>

      {/* Terms */}
      <label className="flex gap-3 items-start cursor-pointer group">
        <div
          onClick={() => set('termsAccepted', !state.termsAccepted)}
          className={`w-5 h-5 rounded border-2 shrink-0 mt-0.5 flex items-center justify-center transition-all ${
            state.termsAccepted ? 'border-brand-500 bg-brand-500' : 'border-earth-300 group-hover:border-brand-400'
          }`}
        >
          {state.termsAccepted && <Check size={11} className="text-white" />}
        </div>
        <span className="text-sm text-earth-700 leading-snug">
          I have read and agree to the{' '}
          <Link href="/terms" target="_blank" className="text-brand-600 hover:underline font-semibold">
            RV Glamping Terms & Conditions
          </Link>
          . I understand campground fees are paid directly to the campground and are not included in this booking.
        </span>
      </label>

      <button
        onClick={onSubmit}
        disabled={!state.termsAccepted || submitting}
        className="w-full bg-brand-600 hover:bg-brand-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 rounded-2xl transition-all hover:shadow-glow flex items-center justify-center gap-2 text-base"
      >
        <Lock size={16} />
        {submitting ? 'Submitting...' : 'Submit Booking Request'}
      </button>

      <div className="flex items-center justify-center gap-4 flex-wrap">
        <p className="text-xs text-earth-400">No charge until approval · Manual review within 24 hours</p>
        <StripeBadge />
      </div>
    </div>
  )
}

function StepSubmitted({ state }: { state: BookingState }) {
  const rv = rvs.find((r) => r.slug === state.rvSlug)
  const dest = destinations.find((d) => d.slug === state.destSlug)
  return (
    <div className="text-center space-y-6">
      <div className="w-20 h-20 bg-forest-100 rounded-full flex items-center justify-center mx-auto">
        <Check size={36} className="text-forest-700" />
      </div>
      <div>
        <h2 className="font-display text-3xl font-bold text-earth-900 mb-2">Request Received!</h2>
        <p className="text-earth-500 text-lg">
          Thanks {state.name.split(' ')[0]}! We&apos;ll review your request and respond within 24 hours.
        </p>
      </div>

      <div className="bg-earth-50 rounded-3xl p-5 border border-earth-100 text-left space-y-3">
        <p className="text-xs font-bold text-earth-400 uppercase tracking-wider">Booking Summary</p>
        <p className="text-sm font-semibold text-earth-800">{rv?.emoji} {rv?.name} · {dest?.name}</p>
        <p className="text-sm text-earth-600">{formatDate(state.checkIn)} → {formatDate(state.checkOut)}</p>
        <p className="text-sm text-earth-500">Confirmation email sent to {state.email}</p>
      </div>

      <div className="bg-brand-50 border border-brand-200 rounded-3xl p-5 text-left space-y-2">
        <p className="text-sm font-bold text-brand-800">What happens next?</p>
        {[
          'We review your request (within 24 hours)',
          'If approved, you receive a Stripe payment link',
          'Pay deposit to confirm your booking',
          'Balance auto-charged on check-in day',
          'We deliver the RV — you just arrive & relax',
        ].map((step, i) => (
          <div key={i} className="flex items-start gap-2.5">
            <span className="w-5 h-5 bg-brand-600 text-white rounded-full text-xs flex items-center justify-center shrink-0 font-bold">{i + 1}</span>
            <p className="text-sm text-earth-700">{step}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link
          href="/"
          className="border-2 border-earth-200 hover:border-brand-300 text-earth-700 font-semibold py-3 px-6 rounded-2xl transition-all text-sm"
        >
          Back to Home
        </Link>
        <Link
          href="/destinations"
          className="bg-brand-600 hover:bg-brand-700 text-white font-bold py-3 px-6 rounded-2xl transition-all text-sm flex items-center gap-2 justify-center"
        >
          Explore Destinations <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  )
}

// ── Main page ─────────────────────────────────────────────────────────────────

function BookingWizard() {
  const searchParams = useSearchParams()
  const [step, setStep] = useState<Step>(1)
  const [submitting, setSubmitting] = useState(false)
  const [booking, setBooking] = useState<BookingState>({
    rvSlug: searchParams.get('rv') ?? '',
    destSlug: searchParams.get('destination') ?? '',
    checkIn: '',
    checkOut: '',
    guests: 2,
    addons: [],
    name: '',
    email: '',
    phone: '',
    specialRequests: '',
    termsAccepted: false,
  })

  function set(k: keyof BookingState, v: string | number | boolean | string[]) {
    setBooking((prev) => ({ ...prev, [k]: v }))
  }

  function canAdvance(): boolean {
    if (step === 1) return !!booking.rvSlug
    if (step === 2) return !!booking.destSlug
    if (step === 3) {
      const n = nightsBetween(booking.checkIn, booking.checkOut)
      return n >= 2
    }
    if (step === 4) return true
    if (step === 5) return !!booking.name && !!booking.email
    if (step === 6) return booking.termsAccepted
    return false
  }

  function next() {
    if (step < 6) setStep((s) => (s + 1) as Step)
  }
  function back() {
    if (step > 1) setStep((s) => (s - 1) as Step)
  }

  async function submit() {
    setSubmitting(true)
    // Placeholder — wire to /api/bookings later
    await new Promise((r) => setTimeout(r, 1200))
    setSubmitting(false)
    setStep(7)
  }

  // Summary sidebar data
  const rv = rvs.find((r) => r.slug === booking.rvSlug)
  const dest = destinations.find((d) => d.slug === booking.destSlug)
  const nights = nightsBetween(booking.checkIn, booking.checkOut)

  return (
    <div className="min-h-screen bg-earth-50 pt-24 pb-20">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">

        {/* Progress bar (hidden on step 7) */}
        {step < 7 && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-3">
              {STEPS.slice(0, 6).map((label, i) => {
                const s = (i + 1) as Step
                return (
                  <div key={label} className="flex items-center gap-1 flex-1 last:flex-none">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-all ${
                      s < step ? 'bg-brand-600 text-white' :
                      s === step ? 'bg-earth-950 text-white' :
                      'bg-earth-200 text-earth-400'
                    }`}>
                      {s < step ? <Check size={13} /> : s}
                    </div>
                    {i < 5 && <div className={`flex-1 h-0.5 mx-1 ${s < step ? 'bg-brand-400' : 'bg-earth-200'}`} />}
                  </div>
                )
              })}
            </div>
            <div className="flex justify-between">
              {STEPS.slice(0, 6).map((label, i) => (
                <p key={label} className={`text-xs font-medium ${(i + 1) === step ? 'text-earth-900' : 'text-earth-400'}`}>
                  {label}
                </p>
              ))}
            </div>
          </div>
        )}

        <div className={`grid gap-8 ${step < 7 ? 'lg:grid-cols-3' : ''}`}>

          {/* Main card */}
          <div className={`bg-white rounded-3xl shadow-card-lg p-6 lg:p-8 ${step < 7 ? 'lg:col-span-2' : 'max-w-2xl mx-auto w-full'}`}>
            {step < 7 && (
              <div className="mb-6">
                <p className="text-brand-600 text-xs font-bold uppercase tracking-widest mb-1">
                  Step {step} of 6
                </p>
                <h2 className="font-display text-2xl font-bold text-earth-900">{STEPS[step - 1]}</h2>
              </div>
            )}

            {step === 1 && <StepChooseRV state={booking} set={set} />}
            {step === 2 && <StepChooseDestination state={booking} set={set} />}
            {step === 3 && <StepDates state={booking} set={set} />}
            {step === 4 && <StepAddons state={booking} set={set} />}
            {step === 5 && <StepYourInfo state={booking} set={set} />}
            {step === 6 && <StepReview state={booking} set={set} onSubmit={submit} submitting={submitting} />}
            {step === 7 && <StepSubmitted state={booking} />}

            {/* Nav buttons */}
            {step < 6 && (
              <div className="flex gap-3 mt-8 pt-6 border-t border-earth-100">
                {step > 1 && (
                  <button
                    onClick={back}
                    className="flex items-center gap-2 border-2 border-earth-200 hover:border-brand-300 text-earth-700 font-semibold py-3 px-5 rounded-2xl transition-all text-sm"
                  >
                    <ChevronLeft size={16} /> Back
                  </button>
                )}
                <button
                  onClick={next}
                  disabled={!canAdvance()}
                  className="flex-1 flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 rounded-2xl transition-all hover:shadow-glow text-sm"
                >
                  {step === 5 ? 'Review Booking' : 'Continue'} <ChevronRight size={16} />
                </button>
              </div>
            )}

            {step === 6 && (
              <div className="mt-6 pt-4 border-t border-earth-100">
                <button
                  onClick={back}
                  className="flex items-center gap-2 text-sm text-earth-500 hover:text-brand-600 transition-colors"
                >
                  <ChevronLeft size={14} /> Edit booking details
                </button>
              </div>
            )}
          </div>

          {/* Sidebar summary */}
          {step < 7 && (
            <div className="lg:col-span-1 space-y-4">

              {/* Booking summary */}
              <div className="bg-white rounded-3xl shadow-card p-5 border border-earth-100 space-y-4">
                <p className="text-xs font-bold text-earth-400 uppercase tracking-wider">Your Selection</p>

                {rv ? (
                  <div className="flex gap-3 items-center">
                    <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0">
                      <Image src={rv.heroImage} alt={rv.name} fill className="object-cover" sizes="48px" />
                    </div>
                    <div>
                      <p className="font-bold text-earth-900 text-sm">{rv.emoji} {rv.name}</p>
                      <p className="text-xs text-earth-500">Starting at {rv.startingAt}/night</p>
                    </div>
                  </div>
                ) : (
                  <p className="text-xs text-earth-400 italic">No RV selected yet</p>
                )}

                {dest && (
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin size={13} className="text-brand-500 shrink-0" />
                    <span className="text-earth-700 font-medium">{dest.name}</span>
                  </div>
                )}

                {nights >= 2 && (
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar size={13} className="text-brand-500 shrink-0" />
                    <span className="text-earth-700">{formatDate(booking.checkIn)} · {nights} nights</span>
                  </div>
                )}

                {booking.guests > 0 && (
                  <div className="flex items-center gap-2 text-sm">
                    <Users size={13} className="text-brand-500 shrink-0" />
                    <span className="text-earth-700">{booking.guests} guest{booking.guests > 1 ? 's' : ''}</span>
                  </div>
                )}

                {booking.addons.length > 0 && (
                  <div className="border-t border-earth-100 pt-3">
                    <p className="text-xs text-earth-400 mb-2">Add-ons:</p>
                    <div className="flex flex-wrap gap-1.5">
                      {booking.addons.map((id) => {
                        const a = ADDONS.find((x) => x.id === id)
                        return <span key={id} className="text-xs bg-brand-50 text-brand-700 px-2 py-0.5 rounded-full">{a?.label}</span>
                      })}
                    </div>
                  </div>
                )}

                <div className="border-t border-earth-100 pt-3 space-y-1">
                  <div className="flex justify-between text-xs text-earth-500">
                    <span>Cleaning fee</span>
                    <span className="font-semibold text-earth-700">$60.00</span>
                  </div>
                  <div className="flex justify-between text-xs text-earth-400">
                    <span>RV rate</span>
                    <span>Seasonal · at approval</span>
                  </div>
                </div>
              </div>

              {/* Trust signals */}
              <div className="bg-earth-50 rounded-3xl p-4 border border-earth-100 space-y-2.5">
                {[
                  { icon: '🚗', text: 'You drive YOUR car. We drive the RV.' },
                  { icon: '✅', text: 'Manual approval within 24 hrs' },
                  { icon: '💳', text: 'No charge until approved' },
                  { icon: '🔒', text: 'Secure Stripe payments' },
                ].map((t) => (
                  <div key={t.text} className="flex items-center gap-2 text-xs text-earth-600">
                    <span>{t.icon}</span>
                    <span>{t.text}</span>
                  </div>
                ))}
              </div>

              {/* Stars */}
              <div className="bg-white rounded-3xl p-4 border border-earth-100 shadow-card text-center">
                <div className="flex justify-center gap-0.5 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className="fill-brand-400 text-brand-400" />
                  ))}
                </div>
                <p className="text-xs font-semibold text-earth-700">100% 5-star reviews</p>
                <p className="text-xs text-earth-400">No driving required · Ever</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function BookPage() {
  return (
    <>
      <Navbar />
      <Suspense fallback={<div className="min-h-screen bg-earth-50 pt-24 flex items-center justify-center"><p className="text-earth-500">Loading...</p></div>}>
        <BookingWizard />
      </Suspense>
      <Footer />
    </>
  )
}
