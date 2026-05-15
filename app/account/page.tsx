'use client'

import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  User, Calendar, MapPin, LogOut, Settings, ArrowRight,
  Clock, CheckCircle, XCircle, CreditCard, ChevronRight, Loader2
} from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

// ── Types & status config ──────────────────────────────────────────────────────

type BookingStatus =
  | 'DRAFT' | 'PENDING_APPROVAL' | 'APPROVED_AWAITING_DEPOSIT'
  | 'DEPOSIT_PAID' | 'CONFIRMED' | 'REJECTED' | 'CANCELED' | 'COMPLETED'

interface Booking {
  id: string
  status: BookingStatus
  checkIn: string
  checkOut: string
  nights: number
  groupSize: number
  totalAmount: string
  depositAmount: string
  createdAt: string
  stripePaymentLinkId?: string
  rv: { name: string; emoji: string }
  destination: { name: string }
}

const STATUS_CONFIG: Record<BookingStatus, { label: string; color: string; icon: typeof Clock }> = {
  DRAFT:                     { label: 'Draft',                   color: 'text-earth-600 bg-earth-50 border-earth-200',        icon: Clock        },
  PENDING_APPROVAL:          { label: 'Pending Approval',        color: 'text-amber-700 bg-amber-50 border-amber-200',        icon: Clock        },
  APPROVED_AWAITING_DEPOSIT: { label: 'Approved — Pay Deposit',  color: 'text-blue-700 bg-blue-50 border-blue-200',           icon: CreditCard   },
  DEPOSIT_PAID:              { label: 'Deposit Paid',            color: 'text-indigo-700 bg-indigo-50 border-indigo-200',     icon: CheckCircle  },
  CONFIRMED:                 { label: 'Confirmed',               color: 'text-forest-700 bg-forest-50 border-forest-200',    icon: CheckCircle  },
  REJECTED:                  { label: 'Rejected',                color: 'text-red-700 bg-red-50 border-red-200',              icon: XCircle      },
  CANCELED:                  { label: 'Canceled',                color: 'text-earth-400 bg-earth-50 border-earth-100',        icon: XCircle      },
  COMPLETED:                 { label: 'Completed',               color: 'text-earth-700 bg-earth-50 border-earth-200',        icon: CheckCircle  },
}

function fmtDate(d: string) {
  return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function BookingCard({ booking }: { booking: Booking }) {
  const status = STATUS_CONFIG[booking.status]
  const Icon = status.icon
  return (
    <div className="bg-white rounded-3xl border border-earth-100 shadow-card overflow-hidden">
      <div className="p-6">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <p className="font-display text-lg font-bold text-earth-900 mb-1">
              {booking.rv.emoji} {booking.rv.name}
            </p>
            <div className="flex items-center gap-1.5 text-sm text-earth-500">
              <MapPin size={13} className="text-brand-500" />
              {booking.destination.name}
            </div>
          </div>
          <span className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full border ${status.color}`}>
            <Icon size={12} />
            {status.label}
          </span>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-4">
          {[
            { label: 'Check-In',  value: fmtDate(booking.checkIn) },
            { label: 'Check-Out', value: fmtDate(booking.checkOut) },
            { label: 'Guests',    value: `${booking.groupSize} guest${booking.groupSize > 1 ? 's' : ''}` },
          ].map((f) => (
            <div key={f.label} className="bg-earth-50 rounded-2xl px-3 py-2.5">
              <p className="text-xs text-earth-400 mb-0.5">{f.label}</p>
              <p className="text-sm font-semibold text-earth-800">{f.value}</p>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-earth-100">
          <div>
            <p className="text-xs text-earth-400">Total</p>
            <p className="font-bold text-earth-900">${Number(booking.totalAmount).toFixed(2)}</p>
          </div>
          {booking.status === 'APPROVED_AWAITING_DEPOSIT' && booking.stripePaymentLinkId && (
            <a
              href={booking.stripePaymentLinkId}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white text-sm font-bold px-5 py-2.5 rounded-full transition-all"
            >
              Pay Deposit (${Number(booking.depositAmount).toFixed(2)}) <ArrowRight size={14} />
            </a>
          )}
          {booking.status === 'CONFIRMED' && (
            <span className="text-xs text-forest-700 font-semibold flex items-center gap-1">
              <CheckCircle size={13} /> All set!
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

// ── Sidebar nav tabs ──────────────────────────────────────────────────────────

type AccountTab = 'bookings' | 'profile' | 'settings'

export default function AccountPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [tab, setTab]           = useState<AccountTab>('bookings')
  const [bookings, setBookings] = useState<Booking[]>([])
  const [bLoading, setBLoading] = useState(false)

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/login?callbackUrl=/account')
  }, [status, router])

  const fetchBookings = useCallback(async () => {
    setBLoading(true)
    try {
      const res = await fetch('/api/bookings')
      if (res.ok) setBookings(await res.json())
    } finally {
      setBLoading(false)
    }
  }, [])

  useEffect(() => {
    if (status === 'authenticated' && tab === 'bookings') fetchBookings()
  }, [status, tab, fetchBookings])

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-earth-50 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-brand-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!session) return null

  const user = session.user

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-earth-50 pt-24 pb-20">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">

          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            {user?.image ? (
              <Image
                src={user.image}
                alt={user.name ?? 'User'}
                width={56}
                height={56}
                className="rounded-full ring-2 ring-brand-200"
              />
            ) : (
              <div className="w-14 h-14 rounded-full bg-brand-100 flex items-center justify-center">
                <User size={24} className="text-brand-600" />
              </div>
            )}
            <div>
              <h1 className="font-display text-2xl font-bold text-earth-900">
                {user?.name ?? 'My Account'}
              </h1>
              <p className="text-earth-500 text-sm">{user?.email}</p>
            </div>
            <button
              onClick={() => signOut({ callbackUrl: '/' })}
              className="ml-auto flex items-center gap-2 text-sm text-earth-500 hover:text-red-600 border border-earth-200 hover:border-red-200 px-4 py-2 rounded-full transition-all"
            >
              <LogOut size={14} /> Sign Out
            </button>
          </div>

          <div className="grid lg:grid-cols-4 gap-6">

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-3xl shadow-card border border-earth-100 p-3">
                {(
                  [
                    { id: 'bookings', label: 'My Bookings',  icon: Calendar },
                    { id: 'profile',  label: 'Profile',       icon: User     },
                    { id: 'settings', label: 'Settings',      icon: Settings },
                  ] as { id: AccountTab; label: string; icon: typeof Calendar }[]
                ).map((item) => {
                  const Icon = item.icon
                  return (
                    <button
                      key={item.id}
                      onClick={() => setTab(item.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all ${
                        tab === item.id
                          ? 'bg-earth-950 text-white'
                          : 'text-earth-700 hover:bg-earth-50'
                      }`}
                    >
                      <Icon size={16} />
                      {item.label}
                      {tab !== item.id && <ChevronRight size={14} className="ml-auto text-earth-300" />}
                    </button>
                  )
                })}

                <div className="border-t border-earth-100 mt-2 pt-2">
                  <Link
                    href="/book"
                    className="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold text-brand-700 bg-brand-50 hover:bg-brand-100 transition-all"
                  >
                    <Calendar size={16} />
                    New Booking
                    <ArrowRight size={14} className="ml-auto" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Main content */}
            <div className="lg:col-span-3">

              {/* ── BOOKINGS ── */}
              {tab === 'bookings' && (
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <h2 className="font-display text-xl font-bold text-earth-900">My Bookings</h2>
                    <Link
                      href="/book"
                      className="text-sm font-semibold text-brand-600 hover:text-brand-700 flex items-center gap-1"
                    >
                      + New Booking
                    </Link>
                  </div>

                  {bLoading ? (
                    <div className="flex items-center gap-2 text-earth-500 py-8 justify-center">
                      <Loader2 size={20} className="animate-spin" /> Loading bookings…
                    </div>
                  ) : bookings.length === 0 ? (
                    <div className="bg-white rounded-3xl border border-dashed border-earth-200 p-12 text-center">
                      <Calendar size={40} className="mx-auto text-earth-300 mb-4" />
                      <h3 className="font-display text-lg font-bold text-earth-900 mb-2">No Bookings Yet</h3>
                      <p className="text-earth-500 text-sm mb-6 max-w-xs mx-auto">
                        When you submit a booking request, it will appear here for tracking.
                      </p>
                      <Link
                        href="/book"
                        className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-bold px-6 py-3 rounded-full transition-all"
                      >
                        Browse Availability <ArrowRight size={14} />
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {bookings.map((b) => <BookingCard key={b.id} booking={b} />)}
                    </div>
                  )}

                  {/* Status legend */}
                  <div className="mt-6 bg-white rounded-2xl border border-earth-100 p-4">
                    <p className="text-xs font-bold text-earth-400 uppercase tracking-wider mb-3">Booking Status Guide</p>
                    <div className="grid sm:grid-cols-2 gap-2">
                      {Object.entries(STATUS_CONFIG).map(([key, val]) => {
                        const Icon = val.icon
                        return (
                          <div key={key} className="flex items-center gap-2">
                            <span className={`flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full border ${val.color}`}>
                              <Icon size={10} /> {val.label}
                            </span>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* ── PROFILE ── */}
              {tab === 'profile' && (
                <div className="bg-white rounded-3xl shadow-card border border-earth-100 p-6">
                  <h2 className="font-display text-xl font-bold text-earth-900 mb-6">Profile Information</h2>
                  <div className="flex items-center gap-4 mb-6 pb-6 border-b border-earth-100">
                    {user?.image ? (
                      <Image src={user.image} alt="" width={72} height={72} className="rounded-full" />
                    ) : (
                      <div className="w-18 h-18 rounded-full bg-brand-100 flex items-center justify-center">
                        <User size={32} className="text-brand-600" />
                      </div>
                    )}
                    <div>
                      <p className="font-bold text-earth-900">{user?.name}</p>
                      <p className="text-earth-500 text-sm">{user?.email}</p>
                      <p className="text-xs text-earth-400 mt-1">Profile info from your SSO provider</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    {[
                      { label: 'Full Name',      value: user?.name  ?? '—' },
                      { label: 'Email Address',  value: user?.email ?? '—' },
                      { label: 'Login Method',   value: 'Google / Apple / Facebook SSO' },
                    ].map((f) => (
                      <div key={f.label} className="flex flex-col gap-1">
                        <p className="text-xs font-bold text-earth-400 uppercase tracking-wider">{f.label}</p>
                        <p className="text-sm font-medium text-earth-800 bg-earth-50 rounded-xl px-4 py-3">{f.value}</p>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-earth-400 mt-6">
                    To update your name or email, change it in your Google/Apple/Facebook account.
                  </p>
                </div>
              )}

              {/* ── SETTINGS ── */}
              {tab === 'settings' && (
                <div className="bg-white rounded-3xl shadow-card border border-earth-100 p-6">
                  <h2 className="font-display text-xl font-bold text-earth-900 mb-6">Account Settings</h2>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between py-4 border-b border-earth-100">
                      <div>
                        <p className="font-semibold text-earth-800 text-sm">Email Notifications</p>
                        <p className="text-xs text-earth-400">Booking updates, approvals, confirmations</p>
                      </div>
                      <div className="w-11 h-6 bg-brand-500 rounded-full relative cursor-pointer">
                        <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5 shadow" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between py-4 border-b border-earth-100">
                      <div>
                        <p className="font-semibold text-earth-800 text-sm">Marketing Emails</p>
                        <p className="text-xs text-earth-400">Seasonal deals, new destinations</p>
                      </div>
                      <div className="w-11 h-6 bg-earth-200 rounded-full relative cursor-pointer">
                        <div className="w-5 h-5 bg-white rounded-full absolute left-0.5 top-0.5 shadow" />
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-earth-100">
                    <p className="text-xs font-bold text-earth-400 uppercase tracking-wider mb-3">Account Actions</p>
                    <button
                      onClick={() => signOut({ callbackUrl: '/' })}
                      className="flex items-center gap-2 text-sm text-red-600 hover:text-red-700 font-semibold border border-red-100 hover:border-red-200 px-5 py-3 rounded-2xl transition-all"
                    >
                      <LogOut size={15} /> Sign Out of All Devices
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
