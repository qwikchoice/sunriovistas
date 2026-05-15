import Image from 'next/image'
import Link from 'next/link'

const rvs = [
  {
    slug:     'lunaris',
    emoji:    '🌙',
    name:     'Lunaris',
    tagline:  'Cozy Couples & Family-Friendly Getaways',
    desc:     'Warm, inviting, and perfectly sized for couples or small families. Think campfire mornings, lakeside sunsets, and cozy nights under the stars.',
    bestFor:  ['Couples', 'Small Families', 'Beginner Campers'],
    vibe:     ['Campfires', 'Family Memories', 'Cozy Interiors', 'Lakeside Mornings'],
    image:    'https://images.unsplash.com/photo-1533760881669-80db4d7b341c?auto=format&fit=crop&w=900&q=85',
    accent:   'from-amber-900/90 to-amber-700/70',
    badge:    'bg-amber-500',
  },
  {
    slug:     'stellaris',
    emoji:    '✨',
    name:     'Stellaris',
    tagline:  'Spiritual & Soulful Journeys',
    desc:     'A sanctuary on wheels for the soul-seeking traveler. Designed for deep rest, intentional living, and reconnecting with what matters most.',
    bestFor:  ['Wellness Travelers', 'Couples Retreats', 'Solo Travelers'],
    vibe:     ['Digital Detox', 'Nature Healing', 'Mindfulness', 'Slow Mornings'],
    image:    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=900&q=85',
    accent:   'from-indigo-950/90 to-purple-800/70',
    badge:    'bg-purple-500',
  },
  {
    slug:     'solaris',
    emoji:    '☀️',
    name:     'Solaris',
    tagline:  'For Free Spirits & Young Explorers',
    desc:     'Built for adventure, wine-country escapes, and unforgettable social weekends. Vibrant energy meets California\'s golden outdoors.',
    bestFor:  ['Young Couples', 'Friend Groups', 'Adventurous Travelers'],
    vibe:     ['Wine-Country Sunsets', 'Exploration', 'Scenic Escapes', 'Social Weekends'],
    image:    'https://images.unsplash.com/photo-1474293397961-0f0d41a9f0b1?auto=format&fit=crop&w=900&q=85',
    accent:   'from-orange-950/90 to-rose-700/70',
    badge:    'bg-orange-400',
  },
]

export default function RVBrands() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block text-brand-600 text-sm font-bold uppercase tracking-widest mb-3">
            Choose Your Escape
          </span>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-earth-900 mb-4">
            Three RVs. Three Identities.
          </h2>
          <p className="text-earth-500 text-lg max-w-xl mx-auto">
            Each RV is its own lifestyle experience — designed for a different kind of traveler.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {rvs.map((rv) => (
            <div
              key={rv.slug}
              className="group relative rounded-3xl overflow-hidden shadow-card hover:shadow-card-lg transition-all duration-500 hover:-translate-y-1.5"
            >
              {/* Image */}
              <div className="relative h-72">
                <Image
                  src={rv.image}
                  alt={rv.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width:768px) 100vw, 33vw"
                />
                {/* Gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t ${rv.accent}`} />

                {/* Emoji badge */}
                <div className="absolute top-4 left-4">
                  <span className={`inline-flex items-center gap-1.5 ${rv.badge} text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg`}>
                    {rv.emoji} {rv.name}
                  </span>
                </div>

                {/* Tagline on image */}
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="font-display text-2xl font-bold text-white mb-1">{rv.name}</h3>
                  <p className="text-white/80 text-sm font-medium italic">{rv.tagline}</p>
                </div>
              </div>

              {/* Body */}
              <div className="bg-white p-6">
                <p className="text-earth-600 text-sm leading-relaxed mb-4">{rv.desc}</p>

                {/* Best for */}
                <div className="mb-4">
                  <p className="text-xs font-bold text-earth-400 uppercase tracking-wider mb-2">Best For</p>
                  <div className="flex flex-wrap gap-1.5">
                    {rv.bestFor.map((tag) => (
                      <span key={tag} className="text-xs bg-earth-100 text-earth-700 px-2.5 py-1 rounded-full font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Vibes */}
                <div className="mb-5">
                  <p className="text-xs font-bold text-earth-400 uppercase tracking-wider mb-2">Experience Vibe</p>
                  <div className="flex flex-wrap gap-1.5">
                    {rv.vibe.map((v) => (
                      <span key={v} className="text-xs bg-brand-50 text-brand-700 border border-brand-100 px-2.5 py-1 rounded-full font-medium">
                        {v}
                      </span>
                    ))}
                  </div>
                </div>

                <Link
                  href={`/rvs/${rv.slug}`}
                  className="block text-center bg-earth-950 hover:bg-brand-600 text-white text-sm font-semibold py-3 rounded-2xl transition-all duration-300"
                >
                  Explore {rv.name} →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
