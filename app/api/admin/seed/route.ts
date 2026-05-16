import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

function adminAuthed(req: NextRequest) {
  const pin = req.headers.get('x-admin-pin')
  return pin === (process.env.ADMIN_PIN ?? 'admin123')
}

const RVS = [
  { slug: 'lunaris',   name: 'Lunaris',   emoji: '🌙', tagline: 'Cozy Couples & Family-Friendly Getaways', sleeps: 4, nightlyRate: 149 },
  { slug: 'stellaris', name: 'Stellaris', emoji: '✨', tagline: 'Spiritual & Soulful Journeys',            sleeps: 2, nightlyRate: 169 },
  { slug: 'solaris',   name: 'Solaris',   emoji: '☀️', tagline: 'For Free Spirits & Young Explorers',      sleeps: 4, nightlyRate: 159 },
]

const DESTINATIONS = [
  { slug: 'folsom-lake',  name: 'Beals Point / Folsom Lake',    region: 'Sacramento Foothills',          campFeeNote: '~$30–60/night paid directly to California State Parks' },
  { slug: 'placerville',  name: 'Placerville RV Resort',        region: 'El Dorado County Foothills',    campFeeNote: '~$90/night paid directly to resort' },
  { slug: 'red-hawk',     name: 'Red Hawk Casino',              region: 'El Dorado County',              campFeeNote: '~$0/night (complimentary dry camping)' },
  { slug: 'wine-country', name: 'Harvest Hosts / Wine Country', region: 'Sierra Foothills Wine Country', campFeeNote: '~$0–30/night paid directly to host' },
  { slug: 'auburn',       name: 'Auburn / Gold Country',        region: 'Placer County Gold Country',    campFeeNote: 'Varies by site — paid directly to campground' },
]

const ADDONS = [
  { slug: 'early-checkin', label: 'Early Check-In',          price: 35 },
  { slug: 'late-checkout', label: 'Late Checkout',           price: 35 },
  { slug: 'solar-battery', label: 'Solar Battery Package',   price: 49 },
  { slug: 'generator',     label: 'Generator Package',       price: 59 },
  { slug: 'bedding',       label: 'Bedding & Towels',        price: 45 },
  { slug: 'chairs',        label: 'Chairs (4-pack)',         price: 25 },
  { slug: 'firepit',       label: 'Firepit Package',         price: 39 },
  { slug: 'movie',         label: 'Outdoor Movie Package',   price: 75 },
  { slug: 'couples',       label: 'Couples Package',         price: 89 },
  { slug: 'family',        label: 'Family Package',          price: 55 },
  { slug: 'propane',       label: 'Pre-fill Propane',        price: 30 },
  { slug: 'gas',           label: 'Pre-fill Gas',            price: 25 },
  { slug: 'septic',        label: 'Septic Tank Cleanup',     price: 45 },
  { slug: 'pet',           label: 'Pet Fee',                 price: 40 },
]

export async function POST(req: NextRequest) {
  if (!adminAuthed(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const results: string[] = []

  for (const rv of RVS) {
    const { nightlyRate, ...rvFields } = rv
    const created = await db.rV.upsert({
      where:  { slug: rv.slug },
      update: rvFields,
      create: { ...rvFields, active: true },
    })
    await db.rVPriceRule.upsert({
      where:  { id: `seed-${rv.slug}-default` },
      update: { nightlyRate, active: true },
      create: {
        id: `seed-${rv.slug}-default`, rvId: created.id,
        label: 'Standard Rate',
        startDate: new Date('2025-01-01'), endDate: new Date('2030-12-31'),
        nightlyRate, minNights: 2, active: true,
      },
    })
    // Peak summer
    await db.rVPriceRule.upsert({
      where:  { id: `seed-${rv.slug}-peak` },
      update: { nightlyRate: nightlyRate + 30, active: true },
      create: {
        id: `seed-${rv.slug}-peak`, rvId: created.id,
        label: 'Peak Summer Rate',
        startDate: new Date('2026-06-01'), endDate: new Date('2026-08-31'),
        nightlyRate: nightlyRate + 30, minNights: 2, active: true,
      },
    })
    results.push(`RV: ${rv.emoji} ${rv.name}`)
  }

  for (const dest of DESTINATIONS) {
    await db.destination.upsert({
      where:  { slug: dest.slug },
      update: dest,
      create: { ...dest, active: true },
    })
    results.push(`Destination: ${dest.name}`)
  }

  for (const addOn of ADDONS) {
    const { price, ...rest } = addOn
    const created = await db.addOn.upsert({
      where:  { slug: addOn.slug },
      update: rest,
      create: { ...rest, active: true },
    })
    await db.addOnPriceRule.upsert({
      where:  { id: `seed-addon-${addOn.slug}` },
      update: { price, active: true },
      create: {
        id: `seed-addon-${addOn.slug}`, addOnId: created.id,
        label: 'Standard Rate',
        startDate: new Date('2025-01-01'), endDate: new Date('2030-12-31'),
        price, active: true,
      },
    })
    results.push(`Add-on: ${addOn.label}`)
  }

  await db.termsDocument.upsert({
    where:  { version: '1.0' },
    update: { active: true },
    create: { version: '1.0', url: '/terms', active: true, publishedAt: new Date('2025-01-01') },
  })
  results.push('Terms document: v1.0')

  return NextResponse.json({ seeded: results.length, results })
}
