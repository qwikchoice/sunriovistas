'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, User } from 'lucide-react'
import { useSession, signIn } from 'next-auth/react'

const links = [
  { href: '/rvs',          label: 'Our RVs' },
  { href: '/destinations', label: 'Destinations' },
  { href: '/gallery',      label: 'Gallery' },
  { href: '/pricing',      label: 'Pricing' },
  { href: '/faq',          label: 'FAQ' },
  { href: '/contact',      label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)
  const { data: session }         = useSession()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-earth-100'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-2xl">🌄</span>
            <span
              className={`font-display text-xl font-bold tracking-tight transition-colors ${
                scrolled ? 'text-earth-900' : 'text-white'
              }`}
            >
              SunRio Vistas
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-6">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`text-sm font-medium transition-colors hover:text-brand-600 ${
                  scrolled ? 'text-earth-700' : 'text-white/90'
                }`}
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/book"
              className="inline-flex items-center gap-1.5 bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-all hover:shadow-glow hover:-translate-y-px"
            >
              Check Availability
            </Link>
            {/* Account / Login */}
            {session ? (
              <Link
                href="/account"
                className={`w-8 h-8 rounded-full overflow-hidden border-2 border-brand-400 hover:border-brand-500 transition-all shrink-0 ${scrolled ? '' : ''}`}
                title={session.user?.name ?? 'Account'}
              >
                {session.user?.image ? (
                  <Image src={session.user.image} alt="" width={32} height={32} className="object-cover" />
                ) : (
                  <div className="w-full h-full bg-brand-100 flex items-center justify-center">
                    <User size={14} className="text-brand-700" />
                  </div>
                )}
              </Link>
            ) : (
              <button
                onClick={() => signIn()}
                className={`text-sm font-medium transition-colors hover:text-brand-600 ${scrolled ? 'text-earth-700' : 'text-white/90'}`}
              >
                Sign In
              </button>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            className={`md:hidden p-2 rounded-lg transition-colors ${
              scrolled ? 'text-earth-800' : 'text-white'
            }`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-earth-100 px-6 py-4 space-y-3">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="block text-earth-700 font-medium py-2 hover:text-brand-600 transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/book"
            className="block text-center bg-brand-600 text-white font-semibold py-3 rounded-full mt-2 hover:bg-brand-700 transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            Check Availability
          </Link>
          {session ? (
            <Link
              href="/account"
              className="block text-center border border-earth-200 text-earth-700 font-semibold py-3 rounded-full mt-2 hover:border-brand-300 transition-colors text-sm"
              onClick={() => setMenuOpen(false)}
            >
              My Account
            </Link>
          ) : (
            <button
              onClick={() => { setMenuOpen(false); signIn() }}
              className="block w-full text-center border border-earth-200 text-earth-700 font-semibold py-3 rounded-full mt-2 hover:border-brand-300 transition-colors text-sm"
            >
              Sign In
            </button>
          )}
        </div>
      )}
    </nav>
  )
}
