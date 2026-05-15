import Image from 'next/image'
import Link from 'next/link'

export default function FinalCTA() {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background */}
      <Image
        src="https://images.unsplash.com/photo-1445307806294-bff7f67ff225?auto=format&fit=crop&w=1920&q=85"
        alt="Campfire glamping California"
        fill
        className="object-cover object-center"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-earth-950/90 via-earth-900/80 to-brand-900/50" />
      <div className="absolute inset-0 bg-noise opacity-20" />

      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand-600/10 rounded-full blur-3xl" />

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto px-6 lg:px-8 text-center">

        <span className="inline-block bg-brand-500/20 border border-brand-400/30 text-brand-300 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-8">
          Ready when you are
        </span>

        <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight text-balance">
          Your RV Getaway Should Feel Relaxing{' '}
          <span className="text-brand-400 italic">Before</span>{' '}
          You Even Arrive
        </h2>

        <p className="text-white/75 text-lg leading-relaxed mb-10 max-w-xl mx-auto">
          No insurance paperwork. No gas station stops. No setup headaches.
          Just you, your car, and a fully setup premium RV waiting at the perfect California destination.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
          <Link
            href="/book"
            className="inline-flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-bold text-lg px-10 py-5 rounded-full transition-all hover:shadow-glow hover:-translate-y-0.5 shadow-xl"
          >
            Request Your Weekend Escape →
          </Link>
          <Link
            href="/rvs"
            className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/25 text-white font-semibold text-base px-8 py-5 rounded-full transition-all"
          >
            Browse RVs First
          </Link>
        </div>

        {/* Mini trust row */}
        <div className="flex flex-wrap justify-center gap-6 text-white/50 text-xs">
          {[
            'No RV insurance needed',
            'Manual approval within 24hrs',
            'Secure Stripe payments',
            'Cancel up to 2 weeks out',
          ].map((t) => (
            <span key={t} className="flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-brand-400" />
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
