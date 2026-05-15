import Link from 'next/link'
import Image from 'next/image'
import { Shield, Fuel, Truck, CheckCircle2 } from 'lucide-react'

const badges = [
  { icon: Shield,       label: 'No RV Insurance' },
  { icon: Fuel,         label: 'No Gas Costs' },
  { icon: Truck,        label: 'No Towing' },
  { icon: CheckCircle2, label: 'Beginner Friendly' },
]

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background image */}
      <Image
        src="https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=1920&q=85"
        alt="Luxury glamping at Folsom Lake California"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-earth-950/88 via-earth-900/72 to-brand-900/40" />

      {/* Noise texture */}
      <div className="absolute inset-0 bg-noise opacity-30" />

      {/* Ambient glow */}
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-brand-600/10 rounded-full blur-3xl" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 py-32 pt-40">
        <div className="max-w-3xl">

          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-xs font-semibold tracking-widest uppercase px-4 py-2 rounded-full mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-400 animate-pulse-soft" />
            Folsom Lake · Northern California
          </div>

          {/* Headline */}
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.05] tracking-tight mb-6 text-balance">
            Luxury RV Glamping{' '}
            <span className="text-brand-400 italic">Without</span>{' '}
            Driving an RV
          </h1>

          {/* Sub */}
          <p className="text-lg sm:text-xl text-white/80 leading-relaxed mb-10 max-w-2xl">
            Skip RV insurance, gas costs, towing, and stressful driving.
            Arrive in <strong className="text-white font-semibold">your own car</strong> to a fully setup
            premium RV experience near Folsom Lake.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 mb-14">
            <Link
              href="/book"
              className="inline-flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-bold text-base px-8 py-4 rounded-full transition-all hover:shadow-glow hover:-translate-y-0.5 shadow-lg"
            >
              Check Availability →
            </Link>
            <Link
              href="/rvs"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white font-semibold text-base px-8 py-4 rounded-full transition-all"
            >
              Explore RV Experiences
            </Link>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap gap-3">
            {badges.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/15 text-white/90 text-sm font-medium px-4 py-2 rounded-full"
              >
                <Icon size={14} className="text-brand-400" />
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-white/40 text-xs">
        <span>Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-white/30 to-transparent" />
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-white to-transparent" />
    </section>
  )
}
