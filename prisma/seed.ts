import { PrismaClient } from '@prisma/client'

const db = new PrismaClient()

async function main() {
  console.log('Seeding database…')

  // ── RVs ──────────────────────────────────────────────────────────────────────
  const rvData = [
    { slug: 'lunaris',   name: 'Lunaris',   emoji: '🌙', tagline: 'Cozy Couples & Family-Friendly Getaways', sleeps: 4 },
    { slug: 'stellaris', name: 'Stellaris', emoji: '✨', tagline: 'Spiritual & Soulful Journeys',            sleeps: 2 },
    { slug: 'solaris',   name: 'Solaris',   emoji: '☀️', tagline: 'For Free Spirits & Young Explorers',      sleeps: 4 },
  ]

  for (const rv of rvData) {
    const created = await db.rV.upsert({
      where:  { slug: rv.slug },
      update: rv,
      create: { ...rv, active: true },
    })
    console.log(`  RV: ${rv.emoji} ${rv.name} (${created.id})`)

    // Default price rule: $149–$169/night, year-round, 2-night min
    const nightlyRate = rv.slug === 'stellaris' ? 169 : rv.slug === 'solaris' ? 159 : 149
    await db.rVPriceRule.upsert({
      where: { id: `seed-${rv.slug}-default` },
      update: { nightlyRate, active: true },
      create: {
        id:          `seed-${rv.slug}-default`,
        rvId:        created.id,
        label:       'Standard Rate',
        startDate:   new Date('2025-01-01'),
        endDate:     new Date('2030-12-31'),
        nightlyRate,
        minNights:   2,
        active:      true,
      },
    })

    // Peak summer pricing (June–August): +$30/night
    const peakRate = nightlyRate + 30
    await db.rVPriceRule.upsert({
      where: { id: `seed-${rv.slug}-peak` },
      update: { nightlyRate: peakRate, active: true },
      create: {
        id:          `seed-${rv.slug}-peak`,
        rvId:        created.id,
        label:       'Peak Summer Rate',
        startDate:   new Date('2026-06-01'),
        endDate:     new Date('2026-08-31'),
        nightlyRate: peakRate,
        minNights:   2,
        active:      true,
      },
    })
  }

  // ── Destinations ─────────────────────────────────────────────────────────────
  const destData = [
    { slug: 'folsom-lake',  name: 'Beals Point / Folsom Lake',     region: 'Sacramento Foothills',        campFeeNote: '~$30–60/night paid directly to California State Parks' },
    { slug: 'placerville',  name: 'Placerville RV Resort',         region: 'El Dorado County Foothills',  campFeeNote: '~$90/night paid directly to resort' },
    { slug: 'red-hawk',     name: 'Red Hawk Casino',               region: 'El Dorado County',            campFeeNote: '~$0/night (complimentary dry camping)' },
    { slug: 'wine-country', name: 'Harvest Hosts / Wine Country',  region: 'Sierra Foothills Wine Country', campFeeNote: '~$0–30/night paid directly to host property' },
    { slug: 'auburn',       name: 'Auburn / Gold Country',         region: 'Placer County Gold Country',  campFeeNote: 'Varies by site — paid directly to campground or host' },
  ]

  for (const dest of destData) {
    const created = await db.destination.upsert({
      where:  { slug: dest.slug },
      update: dest,
      create: { ...dest, active: true },
    })
    console.log(`  Destination: ${dest.name} (${created.id})`)
  }

  // ── Add-ons ──────────────────────────────────────────────────────────────────
  const addOnData = [
    { slug: 'early-checkin',  label: 'Early Check-In',          description: 'Before 3pm — subject to availability',  price: 35 },
    { slug: 'late-checkout',  label: 'Late Checkout',            description: 'After 11am — subject to availability', price: 35 },
    { slug: 'solar-battery',  label: 'Solar Battery Package',   description: 'Extended off-grid power for no-hookup sites', price: 49 },
    { slug: 'generator',      label: 'Generator Package',        description: 'Quiet generator for full power anywhere',    price: 59 },
    { slug: 'bedding',        label: 'Bedding & Towels',         description: 'Fresh premium linens delivered to RV',       price: 45 },
    { slug: 'chairs',         label: 'Chairs (4-pack)',          description: 'Comfortable flat camping chairs',            price: 25 },
    { slug: 'firepit',        label: 'Firepit Package',          description: 'Firewood + fire starter kit',               price: 39 },
    { slug: 'movie',          label: 'Outdoor Movie Package',    description: 'Projector + screen + popcorn setup',        price: 75 },
    { slug: 'couples',        label: 'Couples Package',          description: 'Rose petals, candles, local wine & chocolates', price: 89 },
    { slug: 'family',         label: 'Family Package',           description: 'Kid games, s\'mores kit, activity bag',    price: 55 },
    { slug: 'propane',        label: 'Pre-fill Propane',         description: 'Full tank ready on arrival',               price: 30 },
    { slug: 'gas',            label: 'Pre-fill Gas (generator)', description: 'Generator fuel ready to run',              price: 25 },
    { slug: 'septic',         label: 'Septic Tank Cleanup',      description: 'We handle tank dumping after your stay',   price: 45 },
    { slug: 'pet',            label: 'Pet Fee',                  description: 'Bring your furry friend along',            price: 40 },
  ]

  for (const addOn of addOnData) {
    const { price, ...rest } = addOn
    const created = await db.addOn.upsert({
      where:  { slug: addOn.slug },
      update: rest,
      create: { ...rest, active: true },
    })

    await db.addOnPriceRule.upsert({
      where: { id: `seed-addon-${addOn.slug}` },
      update: { price, active: true },
      create: {
        id:        `seed-addon-${addOn.slug}`,
        addOnId:   created.id,
        label:     'Standard Rate',
        startDate: new Date('2025-01-01'),
        endDate:   new Date('2030-12-31'),
        price,
        active:    true,
      },
    })

    console.log(`  Add-on: ${addOn.label} ($${price})`)
  }

  // ── Terms document ────────────────────────────────────────────────────────────
  await db.termsDocument.upsert({
    where:  { version: '1.0' },
    update: { active: true },
    create: {
      version:     '1.0',
      url:         '/terms',
      active:      true,
      publishedAt: new Date('2025-01-01'),
    },
  })
  console.log('  Terms document: v1.0')

  console.log('\nSeed complete!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => db.$disconnect())
