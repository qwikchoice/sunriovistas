import Link from 'next/link'
import { Mail, MapPin, Instagram, Facebook } from 'lucide-react'

const rvLinks     = [
  { href: '/rvs/lunaris',   label: '🌙 Lunaris' },
  { href: '/rvs/stellaris', label: '✨ Stellaris' },
  { href: '/rvs/solaris',   label: '☀️ Solaris' },
]
const destLinks   = [
  { href: '/destinations/folsom-lake', label: 'Folsom Lake / Beals Point' },
  { href: '/destinations/placerville', label: 'Placerville RV Resort' },
  { href: '/destinations/red-hawk',    label: 'Red Hawk Casino' },
  { href: '/destinations/wine-country',label: 'Wine Country / Harvest Hosts' },
  { href: '/destinations/auburn',      label: 'Auburn / Gold Country' },
]
const infoLinks   = [
  { href: '/gallery',  label: 'Photo Gallery' },
  { href: '/pricing',  label: 'Pricing' },
  { href: '/faq',      label: 'FAQ' },
  { href: '/contact',  label: 'Contact Us' },
  { href: '/terms',    label: 'Terms & Conditions' },
]

export default function Footer() {
  return (
    <footer className="bg-earth-950 text-earth-300">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🌄</span>
              <span className="font-display text-xl font-bold text-white">SunRio Vistas</span>
            </div>
            <p className="text-sm text-earth-400 leading-relaxed mb-5">
              Luxury RV glamping without driving an RV. Arrive in your own car — we handle the rest.
            </p>
            <div className="flex items-center gap-2 text-sm text-earth-400 mb-2">
              <MapPin size={14} className="text-brand-500 shrink-0" />
              <span>Folsom, CA 95630</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-earth-400 mb-5">
              <Mail size={14} className="text-brand-500 shrink-0" />
              <a href="mailto:sunriovistas@gmail.com" className="hover:text-brand-400 transition-colors">
                sunriovistas@gmail.com
              </a>
            </div>
            <div className="flex gap-3">
              <a href="#" aria-label="Instagram" className="w-9 h-9 rounded-full bg-earth-800 flex items-center justify-center text-earth-400 hover:text-brand-400 hover:bg-earth-700 transition-all">
                <Instagram size={16} />
              </a>
              <a href="#" aria-label="Facebook" className="w-9 h-9 rounded-full bg-earth-800 flex items-center justify-center text-earth-400 hover:text-brand-400 hover:bg-earth-700 transition-all">
                <Facebook size={16} />
              </a>
            </div>
          </div>

          {/* RVs */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Our RVs</h4>
            <ul className="space-y-2.5">
              {rvLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-earth-400 hover:text-brand-400 transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Destinations */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Destinations</h4>
            <ul className="space-y-2.5">
              {destLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-earth-400 hover:text-brand-400 transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Information</h4>
            <ul className="space-y-2.5">
              {infoLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-earth-400 hover:text-brand-400 transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6 p-3 bg-earth-900 rounded-xl">
              <p className="text-xs text-earth-400 leading-relaxed">
                <span className="text-brand-400 font-semibold">You do NOT drive the RV.</span>{' '}
                We deliver it fully set up to your destination.
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-earth-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-earth-500">
          <p>© {new Date().getFullYear()} SunRio Vistas. All rights reserved.</p>
          <p>Folsom, CA · Northern California Glamping</p>
        </div>
      </div>
    </footer>
  )
}
