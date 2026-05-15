export type Destination = {
  slug:          string
  name:          string
  short:         string
  region:        string
  tagline:       string
  shortDesc:     string
  longDesc:      string[]
  heroImage:     string
  gallery:       { src: string; alt: string }[]
  activities:    string[]
  atmosphere:    string[]
  campFeeNote:   string
  campFeeMin:    number | null
  campFeeMax:    number | null
  campFeeType:   string
  distance:      string
  driveFrom:     string
  hookups:       boolean
  petFriendly:   boolean
  bestMonths:    string
  compatibleRVs: string[]
  nearbyAttractions: string[]
  whatToBring:   string[]
  insiderTip:    string
  accentGrad:    string
  badgeColor:    string
  featured:      boolean
}

export const destinations: Destination[] = [
  {
    slug:        'folsom-lake',
    name:        'Beals Point / Folsom Lake',
    short:       'Folsom Lake, CA',
    region:      'Sacramento Foothills',
    tagline:     'California\'s Premier Lakeside Glamping',
    shortDesc:   'Sunrise kayaking, campfire evenings, and golden-hour sunsets over Folsom Lake. The crown jewel of Northern California glamping.',
    longDesc: [
      'Folsom Lake is where Northern California comes to exhale. Stretching across 11,000 acres of blue water surrounded by oak-studded hills, this is a landscape that transforms ordinary weekends into something you talk about for years.',
      'Beals Point sits at the western edge of the lake — perfectly positioned for evening sunsets that paint the water in shades of amber and rose. In the mornings, the lake is glassy calm, ideal for kayaking before the day hikers arrive.',
      'Whether you\'re biking the American River Parkway trail, swimming in sheltered coves, or simply sitting by the water with coffee in hand, Folsom Lake delivers the kind of restorative outdoor experience that\'s nearly impossible to find this close to Sacramento.',
      'Your RV arrives fully setup. You drive your own car — about 30 minutes from Sacramento — and step into a premium glamping experience that\'s already waiting for you.',
    ],
    heroImage:  'https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=1920&q=85',
    gallery: [
      { src: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=800&q=80', alt: 'Camping at Folsom Lake' },
      { src: 'https://images.unsplash.com/photo-1445307806294-bff7f67ff225?auto=format&fit=crop&w=800&q=80', alt: 'Evening campfire at the lake' },
      { src: 'https://images.unsplash.com/photo-1476041800959-2f6bb412c8ce?auto=format&fit=crop&w=800&q=80', alt: 'Morning kayaking on calm water' },
      { src: 'https://images.unsplash.com/photo-1533760881669-80db4d7b341c?auto=format&fit=crop&w=800&q=80', alt: 'Cozy lakeside evenings' },
    ],
    activities:  ['Kayaking', 'Swimming', 'Biking (American River Trail)', 'Fishing', 'Hiking', 'Campfire Nights', 'Birdwatching', 'Stargazing'],
    atmosphere:  ['Lakeside', 'Family-Friendly', 'Golden Hour Views', 'Peaceful Mornings', 'Outdoor Recreation'],
    campFeeNote: 'Campground fees paid directly to California State Parks at checkout.',
    campFeeMin:  30,
    campFeeMax:  60,
    campFeeType: 'Dry camping ~$30/night · Water & electric hookups ~$50–60/night',
    distance:    '28 miles',
    driveFrom:   'Sacramento',
    hookups:     true,
    petFriendly: true,
    bestMonths:  'April – October',
    compatibleRVs: ['lunaris', 'stellaris', 'solaris'],
    nearbyAttractions: [
      'Folsom Historic District (5 min)',
      'American River Bike Trail (on-site)',
      'Folsom Lake Marina',
      'Old Town Folsom restaurants',
      'Granite Bay Beach (15 min)',
    ],
    whatToBring: [
      'Kayak or canoe (or rent at marina)',
      'Bikes for the trail',
      'Fishing gear',
      'Sunscreen & lake shoes',
      'Extra firewood',
    ],
    insiderTip: 'Book the lakefront spots at Beals Point for direct water views. Arrive Thursday to avoid weekend crowds — the lake is magical on a quiet Friday morning.',
    accentGrad:  'from-blue-950/85 to-sky-700/50',
    badgeColor:  'bg-sky-500',
    featured:    true,
  },
  {
    slug:        'placerville',
    name:        'Placerville RV Resort',
    short:       'Placerville, CA',
    region:      'El Dorado County Foothills',
    tagline:     'Mountain-Town Luxury Meets Resort Comfort',
    shortDesc:   'Premium full-hookup resort in the Sierra foothills. Placerville\'s historic Gold Rush charm pairs perfectly with resort-level amenities.',
    longDesc: [
      'Placerville — once called "Hangtown" in the rowdy Gold Rush era — has reinvented itself as one of the Sierra foothills\' most charming towns. Tree-lined streets, farm-to-table restaurants, and boutique wineries make it a destination in its own right.',
      'The Placerville RV Resort sits at the edge of town where the foothills start to climb in earnest. Full hookups mean your RV runs on full power — no need to ration energy or worry about battery levels. This is glamping with all the comforts running.',
      'Spend your days exploring Apple Hill\'s orchards, tasting wine at nearby Gold Hill Vineyard, or hiking into the El Dorado National Forest. Come evening, the mountain air cools the patio and the stars come out early in the foothills.',
    ],
    heroImage:   'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1920&q=85',
    gallery: [
      { src: 'https://images.unsplash.com/photo-1476041800959-2f6bb412c8ce?auto=format&fit=crop&w=800&q=80', alt: 'Mountain forest morning' },
      { src: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=800&q=80', alt: 'Placerville wine country' },
      { src: 'https://images.unsplash.com/photo-1533760881669-80db4d7b341c?auto=format&fit=crop&w=800&q=80', alt: 'Cozy mountain RV evening' },
      { src: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=800&q=80', alt: 'El Dorado foothills forest' },
    ],
    activities:  ['Wine Tasting', 'Apple Hill Orchards', 'Hiking El Dorado Forest', 'Fly Fishing', 'Mountain Biking', 'Historic Town Walks', 'Farm Visits'],
    atmosphere:  ['Mountain Town', 'Premium Hookups', 'Wine Country Adjacent', 'Resort-Level Comfort', 'Sierra Foothills'],
    campFeeNote: 'Resort fees paid directly to Placerville RV Resort at booking.',
    campFeeMin:  90,
    campFeeMax:  90,
    campFeeType: '~$90/night (full hookups)',
    distance:    '45 miles',
    driveFrom:   'Sacramento',
    hookups:     true,
    petFriendly: true,
    bestMonths:  'March – November',
    compatibleRVs: ['lunaris', 'stellaris', 'solaris'],
    nearbyAttractions: [
      'Apple Hill (seasonal harvest)',
      'Gold Hill Vineyard (10 min)',
      'Historic Placerville Downtown',
      'El Dorado National Forest',
      'American River (South Fork — whitewater)',
    ],
    whatToBring: [
      'Hiking boots',
      'Wine carrier & glasses',
      'Camera for fall foliage',
      'Light layers for cool evenings',
      'Cash for farm stands',
    ],
    insiderTip: 'Visit in late September – October for Apple Hill harvest season. The combination of apple picking, wine tasting, and cool mountain air is one of NorCal\'s great seasonal experiences.',
    accentGrad:  'from-forest-950/85 to-forest-700/55',
    badgeColor:  'bg-forest-700',
    featured:    false,
  },
  {
    slug:        'red-hawk',
    name:        'Red Hawk Casino',
    short:       'Shingle Springs, CA',
    region:      'El Dorado County',
    tagline:     'The Easiest Overnight Escape in NorCal',
    shortDesc:   'Entertainment, dining, and free dry camping. Red Hawk is the spontaneous weekend escape that requires zero planning.',
    longDesc: [
      'Not every glamping weekend needs to be a wilderness expedition. Sometimes you want good food, easy entertainment, a comfortable night\'s sleep, and zero effort — that\'s Red Hawk Casino.',
      'Red Hawk\'s casino campus offers complimentary overnight RV parking, which means your base camp cost is essentially zero. Dinner at one of the property\'s restaurants, an evening of entertainment, and a comfortable night in your fully-equipped RV — total cost of admission: the drive.',
      'It\'s the perfect solution for last-minute weekend plans, a halfway point before heading deeper into the foothills, or a low-key escape when you need to get out of the house without going full wilderness mode. The RV does the heavy lifting — you just show up.',
    ],
    heroImage:   'https://images.unsplash.com/photo-1543168256-418811576931?auto=format&fit=crop&w=1920&q=85',
    gallery: [
      { src: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=800&q=80', alt: 'Evening entertainment escape' },
      { src: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=800&q=80', alt: 'Easy overnight camping' },
      { src: 'https://images.unsplash.com/photo-1445307806294-bff7f67ff225?auto=format&fit=crop&w=800&q=80', alt: 'Outdoor RV evening' },
      { src: 'https://images.unsplash.com/photo-1476041800959-2f6bb412c8ce?auto=format&fit=crop&w=800&q=80', alt: 'Relaxed weekend escape' },
    ],
    activities:  ['Casino Gaming', 'Restaurant Dining', 'Live Entertainment', 'Spa (on property)', 'Easy Hiking Nearby', 'Shopping'],
    atmosphere:  ['Entertainment', 'Low-Effort', 'Spontaneous Getaway', 'Free Parking', 'Everything On-Site'],
    campFeeNote: 'Dry camping at Red Hawk Casino is complimentary — no campground fee.',
    campFeeMin:  0,
    campFeeMax:  0,
    campFeeType: '~$0/night dry camping (complimentary)',
    distance:    '24 miles',
    driveFrom:   'Sacramento',
    hookups:     false,
    petFriendly: false,
    bestMonths:  'Year-round',
    compatibleRVs: ['lunaris', 'solaris'],
    nearbyAttractions: [
      'Red Hawk Casino (on-site)',
      'Folsom Premium Outlets (10 min)',
      'Folsom Lake (15 min)',
      'El Dorado Hills Town Center',
      'Shingle Springs Trails',
    ],
    whatToBring: [
      'Solar battery pack (no hookups)',
      'Entertainment budget',
      'Comfortable evening clothes',
      'Breakfast supplies for morning',
    ],
    insiderTip: 'Add the Solar Battery add-on since there are no electrical hookups. The free overnight parking plus a great dinner makes this one of the best value escapes in our lineup.',
    accentGrad:  'from-slate-950/88 to-slate-700/55',
    badgeColor:  'bg-slate-600',
    featured:    false,
  },
  {
    slug:        'wine-country',
    name:        'Harvest Hosts / Wine Country',
    short:       'Gold Hill & Amador, CA',
    region:      'Sierra Foothills Wine Country',
    tagline:     'Fall Asleep in a Vineyard. Wake Up to Wine.',
    shortDesc:   'Spend the night at California\'s most beautiful working wineries, farms, and ranches through the Harvest Hosts program.',
    longDesc: [
      'Imagine falling asleep to the sound of a vineyard settling into night — rows of vines lit by a half-moon, a glass of the winery\'s own wine in your hand, the day\'s last light fading over the Sierra foothills. That\'s Harvest Hosts.',
      'The Harvest Hosts network connects RV travelers with working farms, wineries, breweries, and scenic ranches that open their land for overnight stays. Our Gold Hill and Amador County locations put you inside some of California\'s most storied wine country — foothill AVAs that produce world-class Zinfandel and Barbera.',
      'Wake up to a private vineyard breakfast, spend the morning doing a tasting flight before the crowds arrive, then take a slow drive through the foothill backroads. This is glamping at its most atmospheric — and most romantic.',
      'Prices range from complimentary (with Harvest Hosts membership) to a small host fee. Either way, it\'s one of the most unique overnight experiences available in Northern California.',
    ],
    heroImage:   'https://images.unsplash.com/photo-1474692981400-0f4e40c7de50?auto=format&fit=crop&w=1920&q=85',
    gallery: [
      { src: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=800&q=80', alt: 'Vineyard at golden hour' },
      { src: 'https://images.unsplash.com/photo-1474293397961-0f0d41a9f0b1?auto=format&fit=crop&w=800&q=80', alt: 'Wine country California' },
      { src: 'https://images.unsplash.com/photo-1527786356703-4b100091cd2c?auto=format&fit=crop&w=800&q=80', alt: 'Outdoor wine tasting' },
      { src: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=800&q=80', alt: 'Morning coffee in the vineyard' },
    ],
    activities:  ['Wine Tasting', 'Vineyard Tours', 'Farm-to-Table Experiences', 'Scenic Drives', 'Photography', 'Peaceful Morning Walks', 'Cheese & Charcuterie'],
    atmosphere:  ['Romantic', 'Vineyard Views', 'Agricultural Beauty', 'Cinematic Sunsets', 'Boutique & Intimate'],
    campFeeNote: 'Host fees paid directly to the Harvest Hosts property. Harvest Hosts membership may be required.',
    campFeeMin:  0,
    campFeeMax:  30,
    campFeeType: '~$0–30/night depending on host',
    distance:    '35–55 miles',
    driveFrom:   'Sacramento',
    hookups:     false,
    petFriendly: true,
    bestMonths:  'March – November (peak: Sep – Oct harvest)',
    compatibleRVs: ['stellaris', 'solaris'],
    nearbyAttractions: [
      'Drytown Cellars',
      'Gold Hill Vineyard',
      'Shenandoah Valley (Amador County)',
      'Sutter Creek Old Town',
      'Cosumnes River Nature Preserve',
    ],
    whatToBring: [
      'Harvest Hosts membership (if required)',
      'Solar battery (no hookups)',
      'Nice dinner for winery etiquette',
      'Camera for golden hour shots',
      'Wine carrier for bottles to take home',
    ],
    insiderTip: 'Book Stellaris for this destination — its calm, intentional vibe pairs perfectly with vineyard mornings. September harvest weekends are magical but book 6–8 weeks out.',
    accentGrad:  'from-purple-950/85 to-rose-800/55',
    badgeColor:  'bg-rose-600',
    featured:    false,
  },
  {
    slug:        'auburn',
    name:        'Auburn / Gold Country',
    short:       'Auburn, CA',
    region:      'Placer County Gold Country',
    tagline:     'Where the Sierra Foothills Open Up',
    shortDesc:   'Historic Gold Rush trails, river canyons, and peaceful foothill nature. Auburn is Northern California\'s best-kept glamping secret.',
    longDesc: [
      'Auburn sits at the perfect elevation — high enough for cool breezes and ponderosa pines, low enough to avoid the Sierra snow. The surrounding Gold Country landscape is dramatic: river canyons dropping 1,200 feet, rolling oak grasslands, and granite outcroppings that glow amber in the afternoon sun.',
      'The Auburn State Recreation Area offers some of the most diverse outdoor experiences in California — miles of mountain biking and hiking trails, the American River\'s best whitewater sections, and some of the most scenic camping terrain in the foothills.',
      'Old Town Auburn is a treasure: brick storefronts dating to the 1850s, excellent restaurants, independent shops, and a Saturday farmers market that sources from some of the best foothill farms in the region.',
      'This is the destination for travelers who want genuine outdoor immersion without driving four hours. An hour from Sacramento — a world away from everything else.',
    ],
    heroImage:   'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1920&q=85',
    gallery: [
      { src: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=80', alt: 'Gold Country forest trails' },
      { src: 'https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?auto=format&fit=crop&w=800&q=80', alt: 'American River canyon views' },
      { src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80', alt: 'Peaceful foothill mornings' },
      { src: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=800&q=80', alt: 'Pine forest in Placer County' },
    ],
    activities:  ['Hiking (Auburn SRA)', 'Mountain Biking', 'Whitewater Kayaking', 'Gold Panning', 'Old Town Dining', 'Farmers Market', 'Rock Climbing', 'Swimming Holes'],
    atmosphere:  ['Rugged & Scenic', 'Adventure-Forward', 'Historic Gold Rush', 'River Canyons', 'Hidden Gem'],
    campFeeNote: 'Campground fees vary by site — paid directly to Auburn SRA or private host.',
    campFeeMin:  null,
    campFeeMax:  null,
    campFeeType: 'Varies by site · Auburn SRA day-use fees apply',
    distance:    '35 miles',
    driveFrom:   'Sacramento',
    hookups:     false,
    petFriendly: true,
    bestMonths:  'April – June, September – November',
    compatibleRVs: ['lunaris', 'stellaris', 'solaris'],
    nearbyAttractions: [
      'Auburn State Recreation Area',
      'Old Town Auburn',
      'Confluence Overlook (American River)',
      'Cool-Foresthill Road (scenic drive)',
      'Robie Point Firehouse Trail',
    ],
    whatToBring: [
      'Hiking boots (trails can be rocky)',
      'Mountain bikes if you have them',
      'River shoes for swimming holes',
      'Extra layers (evenings cool fast)',
      'Gold panning pan (novelty + fun)',
    ],
    insiderTip: 'The Confluence Overlook at the North and Middle Fork of the American River is one of the most spectacular views in NorCal — and almost nobody knows about it. Hike down early morning.',
    accentGrad:  'from-amber-950/85 to-yellow-700/50',
    badgeColor:  'bg-yellow-600',
    featured:    false,
  },
]

export function getDestinationBySlug(slug: string): Destination | undefined {
  return destinations.find((d) => d.slug === slug)
}
