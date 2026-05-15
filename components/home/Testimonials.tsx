import Image from 'next/image'
import { Star } from 'lucide-react'

const testimonials = [
  {
    name:    'Sarah & Mike T.',
    role:    'Family of 4 · Folsom Lake',
    quote:   'We were nervous about camping with toddlers. SunRio Vistas made it completely stress-free. The RV was spotless, fully stocked, and the kids are already asking to go back.',
    stars:   5,
    image:   'https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?auto=format&fit=crop&w=100&q=80',
    stay:    'Lunaris · Beals Point',
  },
  {
    name:    'Priya K.',
    role:    'Solo Traveler · Wine Country',
    quote:   'I did a solo wellness retreat in Stellaris at a vineyard. Woke up to grapevines, meditated outside, had wine at sunset. I\'ve never felt more at peace.',
    stars:   5,
    image:   'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80',
    stay:    'Stellaris · Harvest Hosts',
  },
  {
    name:    'Jake & Friends',
    role:    'Group of 5 · Auburn',
    quote:   'Rented Solaris for a friend group weekend. No RV experience between us — didn\'t matter at all. They literally parked it, set it up, and texted us the address.',
    stars:   5,
    image:   'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80',
    stay:    'Solaris · Auburn Gold Country',
  },
]

const stats = [
  { value: '100%', label: 'No RV driving required' },
  { value: '5★',   label: 'Average guest rating' },
  { value: '2hr',  label: 'From Sacramento / Bay Area' },
  { value: '3',    label: 'Premium RV experiences' },
]

export default function Testimonials() {
  return (
    <section className="py-24 bg-earth-950 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block text-brand-400 text-sm font-bold uppercase tracking-widest mb-3">
            Guest Stories
          </span>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-white mb-4">
            Real People. Real Escapes.
          </h2>
          <p className="text-earth-400 text-lg max-w-xl mx-auto">
            From first-time glampers to seasoned outdoor lovers — here&apos;s what they say.
          </p>
        </div>

        {/* Review cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {testimonials.map((t) => (
            <div key={t.name} className="bg-earth-900 border border-earth-800 rounded-3xl p-7 hover:border-brand-600/40 transition-colors">
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.stars }).map((_, i) => (
                  <Star key={i} size={14} className="fill-brand-400 text-brand-400" />
                ))}
              </div>

              <blockquote className="text-earth-200 text-sm leading-relaxed mb-6 italic">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0">
                  <Image src={t.image} alt={t.name} fill className="object-cover" sizes="40px" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{t.name}</p>
                  <p className="text-earth-500 text-xs">{t.role}</p>
                </div>
                <span className="ml-auto text-xs bg-brand-600/20 border border-brand-600/30 text-brand-300 px-2.5 py-1 rounded-full font-medium whitespace-nowrap">
                  {t.stay}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-10 border-t border-earth-800">
          {stats.map(({ value, label }) => (
            <div key={label} className="text-center">
              <p className="font-display text-4xl font-bold text-brand-400 mb-1">{value}</p>
              <p className="text-earth-400 text-sm">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
