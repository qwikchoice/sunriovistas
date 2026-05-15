'use client'

import { useEffect, useState, useCallback } from 'react'
import { CheckCircle, XCircle, Clock, ChevronDown, ChevronUp, Loader2 } from 'lucide-react'

type BookingStatus =
  | 'DRAFT' | 'PENDING_APPROVAL' | 'APPROVED_AWAITING_DEPOSIT'
  | 'DEPOSIT_PAID' | 'CONFIRMED' | 'REJECTED' | 'CANCELED' | 'COMPLETED'

interface Booking {
  id: string
  status: BookingStatus
  guestName: string
  guestEmail: string
  guestPhone?: string
  checkIn: string
  checkOut: string
  nights: number
  totalAmount: string
  depositAmount: string
  createdAt: string
  rv: { name: string; emoji: string }
  destination: { name: string }
  adminNotes?: string
}

const STATUS_CONFIG: Record<BookingStatus, { label: string; color: string }> = {
  DRAFT:                     { label: 'Draft',              color: 'bg-earth-700 text-earth-300' },
  PENDING_APPROVAL:          { label: 'Pending Approval',   color: 'bg-amber-900/60 text-amber-300' },
  APPROVED_AWAITING_DEPOSIT: { label: 'Awaiting Deposit',   color: 'bg-blue-900/60 text-blue-300' },
  DEPOSIT_PAID:              { label: 'Deposit Paid',       color: 'bg-indigo-900/60 text-indigo-300' },
  CONFIRMED:                 { label: 'Confirmed',          color: 'bg-green-900/60 text-green-300' },
  REJECTED:                  { label: 'Rejected',           color: 'bg-red-900/60 text-red-300' },
  CANCELED:                  { label: 'Canceled',           color: 'bg-earth-700 text-earth-400' },
  COMPLETED:                 { label: 'Completed',          color: 'bg-forest-900/60 text-forest-300' },
}

function getPin() {
  if (typeof window !== 'undefined') return sessionStorage.getItem('admin-pin') ?? ''
  return ''
}

export default function AdminBookingsPage() {
  const [bookings, setBookings]       = useState<Booking[]>([])
  const [loading, setLoading]         = useState(true)
  const [filter, setFilter]           = useState<BookingStatus | 'ALL'>('PENDING_APPROVAL')
  const [expanded, setExpanded]       = useState<string | null>(null)
  const [actionLoading, setActLoading] = useState<string | null>(null)
  const [notes, setNotes]             = useState('')
  const [rejectReason, setRejectReason] = useState('')

  const fetchBookings = useCallback(async () => {
    setLoading(true)
    const qs = filter !== 'ALL' ? `?status=${filter}` : ''
    const res = await fetch(`/api/admin/bookings${qs}`, {
      headers: { 'x-admin-pin': getPin() },
    })
    const data = await res.json()
    setBookings(Array.isArray(data) ? data : [])
    setLoading(false)
  }, [filter])

  useEffect(() => { fetchBookings() }, [fetchBookings])

  async function handleAction(bookingId: string, action: 'approve' | 'reject') {
    setActLoading(bookingId)
    await fetch(`/api/admin/bookings/${bookingId}`, {
      method:  'PATCH',
      headers: { 'Content-Type': 'application/json', 'x-admin-pin': getPin() },
      body: JSON.stringify({ action, notes, rejectedReason: rejectReason }),
    })
    setActLoading(null)
    setExpanded(null)
    setNotes('')
    setRejectReason('')
    fetchBookings()
  }

  const fmt = (d: string) => new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  const fmtMoney = (n: string) => `$${Number(n).toFixed(2)}`

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">Bookings</h1>

      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {(['ALL', 'PENDING_APPROVAL', 'APPROVED_AWAITING_DEPOSIT', 'CONFIRMED', 'REJECTED'] as const).map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors ${
              filter === s
                ? 'bg-brand-600 text-white'
                : 'bg-earth-800 text-earth-400 hover:bg-earth-700'
            }`}
          >
            {s === 'ALL' ? 'All' : STATUS_CONFIG[s].label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex items-center gap-2 text-earth-400"><Loader2 size={18} className="animate-spin" /> Loading…</div>
      ) : bookings.length === 0 ? (
        <p className="text-earth-400">No bookings found.</p>
      ) : (
        <div className="space-y-3">
          {bookings.map((b) => {
            const isOpen = expanded === b.id
            const cfg = STATUS_CONFIG[b.status]
            return (
              <div key={b.id} className="bg-earth-900 border border-earth-800 rounded-xl overflow-hidden">
                <button
                  className="w-full text-left p-4 flex items-center gap-4"
                  onClick={() => setExpanded(isOpen ? null : b.id)}
                >
                  <span className="text-lg">{b.rv.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-white font-medium text-sm">{b.guestName}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${cfg.color}`}>{cfg.label}</span>
                    </div>
                    <p className="text-earth-400 text-xs mt-0.5">
                      {b.rv.name} · {b.destination.name} · {fmt(b.checkIn)} – {fmt(b.checkOut)} ({b.nights}n)
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-white font-semibold text-sm">{fmtMoney(b.totalAmount)}</p>
                    <p className="text-earth-500 text-xs">dep {fmtMoney(b.depositAmount)}</p>
                  </div>
                  {isOpen ? <ChevronUp size={16} className="text-earth-500 shrink-0" /> : <ChevronDown size={16} className="text-earth-500 shrink-0" />}
                </button>

                {isOpen && (
                  <div className="border-t border-earth-800 p-4 space-y-4">
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <p className="text-earth-500 text-xs mb-0.5">Email</p>
                        <p className="text-earth-200">{b.guestEmail}</p>
                      </div>
                      {b.guestPhone && (
                        <div>
                          <p className="text-earth-500 text-xs mb-0.5">Phone</p>
                          <p className="text-earth-200">{b.guestPhone}</p>
                        </div>
                      )}
                      <div>
                        <p className="text-earth-500 text-xs mb-0.5">Submitted</p>
                        <p className="text-earth-200">{fmt(b.createdAt)}</p>
                      </div>
                      <div>
                        <p className="text-earth-500 text-xs mb-0.5">Booking ID</p>
                        <p className="text-earth-400 font-mono text-xs">{b.id.slice(0, 12)}…</p>
                      </div>
                    </div>

                    {b.status === 'PENDING_APPROVAL' && (
                      <div className="space-y-3 pt-2">
                        <textarea
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                          placeholder="Internal admin notes (optional)…"
                          rows={2}
                          className="w-full bg-earth-800 text-earth-200 text-sm rounded-lg px-3 py-2 resize-none border border-earth-700 focus:border-brand-500 outline-none"
                        />
                        <textarea
                          value={rejectReason}
                          onChange={(e) => setRejectReason(e.target.value)}
                          placeholder="Rejection reason (required if rejecting)…"
                          rows={2}
                          className="w-full bg-earth-800 text-earth-200 text-sm rounded-lg px-3 py-2 resize-none border border-earth-700 focus:border-red-500 outline-none"
                        />
                        <div className="flex gap-3">
                          <button
                            onClick={() => handleAction(b.id, 'approve')}
                            disabled={actionLoading === b.id}
                            className="flex-1 flex items-center justify-center gap-2 bg-green-700 hover:bg-green-600 text-white text-sm font-semibold py-2 rounded-lg transition-colors disabled:opacity-50"
                          >
                            {actionLoading === b.id ? <Loader2 size={14} className="animate-spin" /> : <CheckCircle size={14} />}
                            Approve
                          </button>
                          <button
                            onClick={() => handleAction(b.id, 'reject')}
                            disabled={actionLoading === b.id || !rejectReason.trim()}
                            className="flex-1 flex items-center justify-center gap-2 bg-red-800 hover:bg-red-700 text-white text-sm font-semibold py-2 rounded-lg transition-colors disabled:opacity-50"
                          >
                            {actionLoading === b.id ? <Loader2 size={14} className="animate-spin" /> : <XCircle size={14} />}
                            Reject
                          </button>
                        </div>
                      </div>
                    )}
                    {b.adminNotes && (
                      <div className="bg-earth-800 rounded-lg p-3">
                        <p className="text-earth-500 text-xs mb-1">Admin notes</p>
                        <p className="text-earth-300 text-sm">{b.adminNotes}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
