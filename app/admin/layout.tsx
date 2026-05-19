'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Camera, LayoutDashboard, Calendar, Settings, Lock, Eye, EyeOff, Truck, MapPin, DollarSign, Image } from 'lucide-react'

const NAV = [
  { href: '/admin',              label: 'Dashboard',    icon: LayoutDashboard },
  { href: '/admin/bookings',     label: 'Bookings',     icon: Calendar        },
  { href: '/admin/rvs',          label: 'RVs',          icon: Truck           },
  { href: '/admin/destinations', label: 'Destinations', icon: MapPin          },
  { href: '/admin/pricing',      label: 'Pricing',      icon: DollarSign      },
  { href: '/admin/photos',       label: 'Gallery',      icon: Image           },
  { href: '/admin/settings',     label: 'Settings',     icon: Settings, disabled: true },
]

const ADMIN_PIN = process.env.NEXT_PUBLIC_ADMIN_PIN ?? 'admin123'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [authed, setAuthed]   = useState(false)
  const [pin, setPin]         = useState('')
  const [error, setError]     = useState(false)
  const [showPin, setShowPin] = useState(false)

  useEffect(() => {
    const stored = sessionStorage.getItem('admin-authed')
    if (stored === 'yes') setAuthed(true)
  }, [])

  function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    if (pin === ADMIN_PIN) {
      sessionStorage.setItem('admin-authed', 'yes')
      sessionStorage.setItem('admin-pin', pin)
      setAuthed(true)
      setError(false)
    } else {
      setError(true)
    }
  }

  if (!authed) {
    return (
      <div className="min-h-screen bg-earth-950 flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <span className="text-4xl block mb-3">🌄</span>
            <h1 className="font-display text-2xl font-bold text-white">SunRio Admin</h1>
            <p className="text-earth-400 text-sm mt-1">Enter admin PIN to continue</p>
          </div>
          <form onSubmit={handleLogin} className="bg-earth-900 border border-earth-800 rounded-3xl p-6 space-y-4">
            <div>
              <label className="block text-xs font-bold text-earth-400 uppercase tracking-wider mb-2">Admin PIN</label>
              <div className="relative">
                <input
                  type={showPin ? 'text' : 'password'}
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  placeholder="Enter PIN"
                  autoFocus
                  className={`w-full bg-earth-800 border rounded-2xl px-4 py-3 text-white text-sm focus:outline-none focus:border-brand-500 pr-10 transition ${
                    error ? 'border-red-500' : 'border-earth-700'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPin(!showPin)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-earth-400 hover:text-white"
                >
                  {showPin ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {error && <p className="text-red-400 text-xs mt-1">Incorrect PIN</p>}
            </div>
            <button
              type="submit"
              className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-3 rounded-2xl transition-all flex items-center justify-center gap-2"
            >
              <Lock size={15} /> Enter Admin
            </button>
          </form>
          <p className="text-center mt-4">
            <a href="/" className="text-earth-500 hover:text-earth-300 text-xs transition-colors">← Back to site</a>
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-earth-50 flex">
      {/* Sidebar */}
      <aside className="w-56 bg-earth-950 flex flex-col shrink-0">
        <div className="px-5 py-6 border-b border-earth-800">
          <div className="flex items-center gap-2">
            <span className="text-xl">🌄</span>
            <span className="font-display text-base font-bold text-white">SunRio Admin</span>
          </div>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {NAV.map((item) => {
            const Icon = item.icon
            const active = pathname === item.href
            if ((item as { disabled?: boolean }).disabled) {
              return (
                <div key={item.href} className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-earth-600 text-sm cursor-not-allowed">
                  <Icon size={15} />
                  {item.label}
                  <span className="ml-auto text-xs bg-earth-800 text-earth-500 px-1.5 py-0.5 rounded-full">soon</span>
                </div>
              )
            }
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition-all ${
                  active
                    ? 'bg-brand-600 text-white font-semibold'
                    : 'text-earth-400 hover:text-white hover:bg-earth-800'
                }`}
              >
                <Icon size={15} />
                {item.label}
              </Link>
            )
          })}
        </nav>
        <div className="p-3 border-t border-earth-800">
          <a href="/" className="flex items-center gap-2 text-earth-500 hover:text-earth-300 text-xs px-4 py-2 transition-colors">
            ← View Site
          </a>
          <button
            onClick={() => { sessionStorage.removeItem('admin-authed'); setAuthed(false) }}
            className="flex items-center gap-2 text-earth-600 hover:text-red-400 text-xs px-4 py-2 transition-colors w-full"
          >
            <Lock size={12} /> Lock Admin
          </button>
        </div>
      </aside>

      {/* Content */}
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  )
}
