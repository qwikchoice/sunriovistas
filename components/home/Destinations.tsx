import Image from 'next/image'
import Link from 'next/link'
import { MapPin, DollarSign } from 'lucide-react'

const destinations = [
  {
    slug:        'folsom-lake',
    name:        'Beals Point / Folsom Lake',
    short:       'Folsom Lake, CA',
    description: 'Sunrise kayaking, lakeside campfires, and golden-hour evenings you\'ll never forget. The crown jewel of Northern California glamping.',
    activities:  ['Kayaking', 'Biking', 'Swimming', 'Campfire Nights'],
    feeNote:     'Dry camping ~$30/night · Hookups ~$50–60/night',
    image:       'https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=800&q=85',
    featured:    true,
  },
  {
    slug:        'placerville',
    name:        'Placerville RV Resort',
    short:       'Placerville, CA',
    description: 'Premium full-hookup resort in the Sierra foothills. Mountain-town charm meets resort-level comfort.',
    activities:  ['Full Hookups', 'Resort Amenities', 'Mountain Trails', 'Wine Tasting'],
    feeNote:     '~$90/night',
    image:       'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=85',
    featured:    false,
  },
  {
    slug:        'red-hawk',
    name:        'Red Hawk Casino',
    short:       'Placerville, CA',
    description: 'Easy overnight escape with entertainment, dining, and free dry camping. Perfect spontaneous weekend.',
    activities:  ['Dining', 'Entertainment', 'Free Parking', 'Easy Access'],
    feeNote:     'Dry camping ~$0/night',
    image:       'https://images.unsplash.com/photo-1543168256-418811576931?auto=format&fit=crop&w=800&q=85',
    featured:    false,
  },
  {
    slug:        'wine-country',
    name:        'Harvest Hosts / Wineries',
    short:       'Gold Hill, CA',
    description: 'Fall asleep in a vineyard. Wake up to wine-country mornings. The most romantic glamping experience in California.',
    activities:  ['Wine Tasting', 'Vineyard Tours', 'Farm Stays', 'Scenic Drives'],
    feeNote:     '~$0–30/night',
    image:       'https://images.unsplash.com/photo-1474692981400-0f4e40c7de50?auto=format&fit=crop&w=800&q=85',
    featured:    false,
  },
  {
    slug:        'auburn',
    name:        'Auburn / Gold Country',
    short:       'Auburn, CA',
    description: 'Foothill escapes through Gold Rush history, stunning river canyons, and peaceful nature retreats.',
    activities:  ['Hiking', 'River Swims', 'Gold Panning', 'Nature Walks'],
    feeNote:     'Varies by site',
    image:       'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=800&q=85',
    featured:    false,
  },
]

export default function Destinations() {
  const [featured, ...rest] = destinations

  return (
    <section className="py-24 bg-earth-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block text-brand-600 text-sm font-bold uppercase tracking-widest mb-3">
            Where We Go
          </span>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-earth-900 mb-4">
            Five Stunning Destinations
          </h2>
          <p className="text-earth-500 text-lg max-w-xl mx-auto">
            From lakeside sunsets to vineyard evenings — each destination tells a different story.
          </p>
        </div>

        {/* Featured large card */}
        <div className="group relative rounded-3xl overflow-hidden shadow-card-lg mb-6 hover:-translate-y-1 transition-transform duration-500">
          <div className="relative h-96 lg:h-[480px]">
            <Image
              src={featured.image}
              alt={featured.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-card-overlay" />
            <div className="absolute inset-0 bg-gradient-to-r from-earth-950/60 to-transparent" />
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-10">
            <div className="flex items-center gap-2 mb-3">
              <MapPin size={14} className="text-brand-400" />
              <span className="text-brand-300 text-sm font-semibold">{featured.short}</span>
              <span className="inline-block bg-brand-500 text-white text-xs font-bold px-2.5 py-1 rounded-full ml-2">
                Most Popular
              </span>
            </div>
            <h3 className="font-display text-3xl lg:text-4xl font-bold text-white mb-3">
              {featured.name}
            </h3>
            <p className="text-white/75 text-base max-w-xl mb-4 leading-relaxed">{featured.description}</p>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-5">
              <span className="flex items-center gap-1.5 text-earth-300 text-sm">
                <DollarSign size={13} className="text-brand-400" />
                {featured.feeNote}
              </span>
              <div className="flex flex-wrap gap-2">
                {featured.activities.map((a) => (
                  <span key={a} className="text-xs bg-white/15 border border-white/20 text-white px-3 py-1 rounded-full font-medium">
                    {a}
                  </span>
                ))}
              </div>
            </div>
            <Link
              href={`/destinations/${featured.slug}`}
              className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white text-sm font-bold px-6 py-3 rounded-full transition-all hover:shadow-glow"
            >
              Explore Folsom Lake →
            </Link>
          </div>
        </div>

        {/* Grid 4 smaller cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {rest.map((dest) => (
            <Link
              key={dest.slug}
              href={`/destinations/${dest.slug}`}
              className="group relative rounded-2xl overflow-hidden shadow-card hover:shadow-card-lg transition-all duration-500 hover:-translate-y-1"
            >
              <div className="relative h-52">
                <Image
                  src={dest.image}
                  alt={dest.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-card-overlay" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <div className="flex items-center gap-1.5 mb-1">
                  <MapPin size={11} className="text-brand-400" />
                  <span className="text-brand-300 text-xs font-medium">{dest.short}</span>
                </div>
                <h3 className="font-display text-lg font-bold text-white mb-1 leading-tight">{dest.name}</h3>
                <p className="text-earth-300 text-xs flex items-center gap-1">
                  <DollarSign size={11} className="text-brand-400" />
                  {dest.feeNote}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <p className="text-center text-xs text-earth-400 mt-6">
          Campground fees are paid directly to the campground/host and are not included in your booking total.
        </p>
      </div>
    </section>
  )
}
