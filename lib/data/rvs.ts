export type RV = {
  slug:        string
  name:        string
  emoji:       string
  tagline:     string
  shortDesc:   string
  longDesc:    string[]
  heroImage:   string
  gallery:     { src: string; alt: string }[]
  accent:      string
  accentLight: string
  badgeBg:     string
  bestFor:     string[]
  vibes:       string[]
  sleeps:      number
  beds:        string
  kitchen:     string
  bathroom:    string
  features:    string[]
  included:    string[]
  addons:      string[]
  destinations: string[]
  startingAt:  string
}

export const rvs: RV[] = [
  {
    slug:     'lunaris',
    name:     'Lunaris',
    emoji:    '🌙',
    tagline:  'Cozy Couples & Family-Friendly Getaways',
    shortDesc:'Warm, inviting, and perfectly sized for couples or small families. Think campfire mornings, lakeside sunsets, and cozy nights under the stars.',
    longDesc: [
      'Lunaris was designed for the family that deserves a real break — where the only agenda is being together. Named after the moon that lights up Folsom Lake, this RV wraps you in warmth the moment you step inside.',
      'With a cozy queen bed, comfortable sleeping for kids, a fully equipped kitchen, and a welcoming living area, Lunaris has everything you need and nothing you don\'t. The exterior is just as inviting — perfect for stringing lights, setting up chairs, and watching the sun melt into the lake.',
      'No RV experience required. No insurance paperwork. No gas stops. You drive your own car to the campsite, and Lunaris is already there — leveled, stocked, and waiting to become the backdrop to your best family memory yet.',
    ],
    heroImage: 'https://images.unsplash.com/photo-1533760881669-80db4d7b341c?auto=format&fit=crop&w=1920&q=85',
    gallery: [
      { src: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=800&q=80', alt: 'Lakeside camping at Folsom Lake' },
      { src: 'https://images.unsplash.com/photo-1445307806294-bff7f67ff225?auto=format&fit=crop&w=800&q=80', alt: 'Family campfire evening' },
      { src: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=800&q=80', alt: 'Golden hour at the lake' },
      { src: 'https://images.unsplash.com/photo-1476041800959-2f6bb412c8ce?auto=format&fit=crop&w=800&q=80', alt: 'Cozy outdoor morning' },
    ],
    accent:      'from-amber-900/85 to-amber-600/60',
    accentLight: 'bg-amber-50',
    badgeBg:     'bg-amber-500',
    bestFor:     ['Couples', 'Small Families', 'Beginner Campers', 'Weekend Getaways'],
    vibes:       ['Campfires', 'Family Memories', 'Cozy Interiors', 'Lakeside Mornings', 'Stargazing'],
    sleeps:      4,
    beds:        'Queen bed + convertible dinette',
    kitchen:     'Full kitchen — fridge, stove, microwave, sink',
    bathroom:    'Private bathroom with shower & toilet',
    features: [
      'Climate control (AC & heating)',
      'Full kitchen with all cookware',
      'Outdoor awning with string lights',
      'Outdoor folding table & seating',
      'Bluetooth speaker system',
      'USB charging ports throughout',
      'Premium bedding included',
      'Blackout curtains for great sleep',
      'Starter pack: coffee, s\'mores kit, firewood',
    ],
    included: [
      'RV delivered & setup at campsite',
      'Professional cleaning after stay',
      'Bedding & towels (add-on)',
      'Welcome orientation guide',
      'Emergency contact support',
      '24hr check-in flexibility (add-on)',
    ],
    addons: [
      'Bedding & Towels Package',
      'Firepit Package',
      'Chairs Package (4 chairs)',
      'Solar Battery',
      'Outdoor Movie Night',
      'Early Check-in',
      'Late Checkout',
      'Pets Welcome',
      'Septic Tank Cleanup',
    ],
    destinations: ['Folsom Lake / Beals Point', 'Placerville RV Resort', 'Red Hawk Casino', 'Auburn / Gold Country'],
    startingAt: '$149',
  },
  {
    slug:     'stellaris',
    name:     'Stellaris',
    emoji:    '✨',
    tagline:  'Spiritual & Soulful Journeys',
    shortDesc: 'A sanctuary on wheels. Designed for deep rest, intentional living, and reconnecting with what matters most.',
    longDesc: [
      'Stellaris was built for the traveler who arrives full and needs to empty — to breathe, to slow down, to remember what silence feels like. Named after the stars that appear when you finally stop moving, this RV is a sanctuary you\'ll never want to leave.',
      'Inside, the atmosphere is intentionally calm: soft neutrals, layered textures, and thoughtful touches that invite meditation, journaling, and long breakfasts. Outside, Stellaris opens to whatever landscape you\'ve chosen — vineyard, forest, or lakeshore.',
      'Whether you\'re doing a solo digital detox, a couples\' healing retreat, or a mindfulness weekend, Stellaris holds the space for all of it. No driving required. Just arrive, exhale, and begin.',
    ],
    heroImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1920&q=85',
    gallery: [
      { src: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=800&q=80', alt: 'Peaceful forest morning' },
      { src: 'https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?auto=format&fit=crop&w=800&q=80', alt: 'Wellness retreat in nature' },
      { src: 'https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?auto=format&fit=crop&w=800&q=80', alt: 'Serene lakeside at dawn' },
      { src: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=800&q=80', alt: 'Slow morning coffee outside' },
    ],
    accent:      'from-indigo-950/88 to-purple-700/55',
    accentLight: 'bg-purple-50',
    badgeBg:     'bg-purple-500',
    bestFor:     ['Solo Travelers', 'Couples Retreats', 'Wellness Seekers', 'Digital Detox'],
    vibes:       ['Digital Detox', 'Nature Healing', 'Mindfulness', 'Slow Mornings', 'Intentional Living'],
    sleeps:      2,
    beds:        'King bed with premium mattress',
    kitchen:     'Full kitchen — designed for mindful cooking',
    bathroom:    'Spa-inspired bathroom with rainfall shower',
    features: [
      'Blackout curtains for restorative sleep',
      'Aromatherapy diffuser included',
      'Yoga mat & meditation cushion',
      'Journaling kit in every stay',
      'Curated playlist preloaded on Bluetooth speaker',
      'Morning ritual kit: pour-over coffee, herbal teas',
      'Soft mood lighting',
      'Noise-reducing insulation',
      'Outdoor hammock (seasonal)',
    ],
    included: [
      'RV delivered & setup at campsite',
      'Spa-quality bedding & towels',
      'Welcome wellness kit',
      'Guided silence protocol available',
      'Emergency contact support',
      'Digital detox mode (WiFi off) option',
    ],
    addons: [
      'Solar Battery',
      'Firepit Package',
      'Chairs Package (4 chairs)',
      'Early Check-in',
      'Late Checkout',
      'Couples Package',
      'Pets Welcome',
      'Pre-fill Propane',
      'Generator Package',
    ],
    destinations: ['Folsom Lake / Beals Point', 'Harvest Hosts / Wine Country', 'Placerville RV Resort', 'Auburn / Gold Country'],
    startingAt: '$169',
  },
  {
    slug:     'solaris',
    name:     'Solaris',
    emoji:    '☀️',
    tagline:  'For Free Spirits & Young Explorers',
    shortDesc: 'Built for adventure, wine-country escapes, and unforgettable social weekends. California\'s golden outdoors, fully unlocked.',
    longDesc: [
      'Solaris is the RV for people who want to explore, celebrate, and do it all without the stress of actually driving an RV. Bold, modern, and energetic — it\'s designed for the weekend that becomes a story you\'ll tell for years.',
      'Inside: a smart layout for friend groups or adventurous couples, with everything needed for long days outside and great nights in. Think pre-sunset wine on the patio, stargazing from lawn chairs, and waking up with a view that earns its own Instagram story.',
      'Wine country, lake weekends, Auburn foothill adventures — Solaris goes wherever the plan takes you. You just drive your car. We handle the rest.',
    ],
    heroImage: 'https://images.unsplash.com/photo-1474293397961-0f0d41a9f0b1?auto=format&fit=crop&w=1920&q=85',
    gallery: [
      { src: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=800&q=80', alt: 'Wine country vineyard sunset' },
      { src: 'https://images.unsplash.com/photo-1527786356703-4b100091cd2c?auto=format&fit=crop&w=800&q=80', alt: 'Adventure friends in California' },
      { src: 'https://images.unsplash.com/photo-1541518763669-27fef04b14ea?auto=format&fit=crop&w=800&q=80', alt: 'Outdoor social gathering' },
      { src: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=800&q=80', alt: 'Golden California hills' },
    ],
    accent:      'from-orange-950/88 to-rose-700/55',
    accentLight: 'bg-orange-50',
    badgeBg:     'bg-orange-400',
    bestFor:     ['Young Couples', 'Friend Groups', 'Adventurous Travelers', 'Wine Country Explorers'],
    vibes:       ['Wine-Country Sunsets', 'Social Weekends', 'Scenic Escapes', 'Exploration', 'Golden Hour'],
    sleeps:      4,
    beds:        'Queen bed + bunk / convertible for 2 more',
    kitchen:     'Full kitchen + outdoor prep area',
    bathroom:    'Full bathroom with skylight',
    features: [
      'Extra-large outdoor awning for entertaining',
      'Outdoor string lights included',
      'Upgraded Bluetooth party speaker',
      'Wine & cocktail glasses provided',
      'Portable outdoor kitchen extension',
      'Bike rack (upon request)',
      'Outdoor rug & entertaining setup',
      'Action cam mount points',
      'Portable bluetooth speaker for outdoors',
    ],
    included: [
      'RV delivered & setup at campsite',
      'Professional cleaning after stay',
      'Welcome party kit: local snacks & drinks',
      'Outdoor movie setup ready (add-on)',
      'Emergency contact support',
      'Instagram-worthy exterior lighting',
    ],
    addons: [
      'Outdoor Movie Night Package',
      'Firepit Package',
      'Chairs Package (4 chairs)',
      'Solar Battery',
      'Generator Package',
      'Early Check-in',
      'Late Checkout',
      'Pets Welcome',
      'Pre-fill Gas',
      'Pre-fill Propane',
    ],
    destinations: ['Harvest Hosts / Wine Country', 'Folsom Lake / Beals Point', 'Auburn / Gold Country', 'Red Hawk Casino'],
    startingAt: '$159',
  },
]

export function getRVBySlug(slug: string): RV | undefined {
  return rvs.find((rv) => rv.slug === slug)
}
