import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { CLEANING_FEE, resolveNightlyRate, calcNights, resolveAddOnPrice } from '@/lib/pricing'

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    const body = await req.json()

    const {
      rvId,
      destinationId,
      checkIn: checkInStr,
      checkOut: checkOutStr,
      guestName,
      guestEmail,
      guestPhone,
      groupSize,
      specialRequests,
      addOnIds = [] as string[],
      termsVersion,
      termsUrl,
    } = body

    if (!rvId || !destinationId || !checkInStr || !checkOutStr || !guestName || !guestEmail) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const checkIn  = new Date(checkInStr)
    const checkOut = new Date(checkOutStr)
    const nights   = calcNights(checkIn, checkOut)

    if (nights < 2) {
      return NextResponse.json({ error: 'Minimum 2-night stay required' }, { status: 400 })
    }

    // Accept either DB id or slug for RV + destination
    const [rv, destination] = await Promise.all([
      db.rV.findFirst({ where: { OR: [{ id: rvId }, { slug: rvId }], active: true } }),
      db.destination.findFirst({ where: { OR: [{ id: destinationId }, { slug: destinationId }], active: true } }),
    ])
    if (!rv)          return NextResponse.json({ error: 'RV not found' }, { status: 404 })
    if (!destination) return NextResponse.json({ error: 'Destination not found' }, { status: 404 })

    const resolvedRvId   = rv.id
    const resolvedDestId = destination.id

    // Check blockouts
    const conflict = await db.calendarBlockout.findFirst({
      where: {
        OR: [{ rvId: resolvedRvId }, { rvId: null }],
        startDate: { lte: checkOut },
        endDate:   { gte: checkIn },
      },
    })
    if (conflict) {
      return NextResponse.json({ error: 'Selected dates are not available' }, { status: 409 })
    }

    // Check existing bookings
    const bookingConflict = await db.booking.findFirst({
      where: {
        rvId:   resolvedRvId,
        status: { in: ['PENDING_APPROVAL', 'APPROVED_AWAITING_DEPOSIT', 'DEPOSIT_PAID', 'CONFIRMED'] },
        checkIn:  { lt: checkOut },
        checkOut: { gt: checkIn },
      },
    })
    if (bookingConflict) {
      return NextResponse.json({ error: 'Selected dates are not available' }, { status: 409 })
    }

    // Pricing
    const nightlyRate = await resolveNightlyRate(resolvedRvId, checkIn, checkOut)
    if (nightlyRate === 0) {
      return NextResponse.json({ error: 'Pricing not available for selected dates' }, { status: 400 })
    }

    // Add-ons (accept id or slug)
    const addOnDetails: { addOnId: string; label: string; price: number }[] = []
    for (const addOnIdOrSlug of addOnIds) {
      const addOn = await db.addOn.findFirst({
        where: { OR: [{ id: addOnIdOrSlug }, { slug: addOnIdOrSlug }], active: true },
      })
      if (!addOn) continue
      const price = await resolveAddOnPrice(addOn.id, checkIn)
      addOnDetails.push({ addOnId: addOn.id, label: addOn.label, price })
    }
    const addOnsTotal = addOnDetails.reduce((s, a) => s + a.price, 0)

    const subtotal     = nightlyRate * nights + CLEANING_FEE + addOnsTotal
    const totalAmount  = subtotal
    const depositAmount = Math.round(totalAmount * 0.3 * 100) / 100
    const balanceAmount = Math.round((totalAmount - depositAmount) * 100) / 100

    const ip = req.headers.get('x-forwarded-for')?.split(',')[0] ?? req.headers.get('x-real-ip') ?? undefined

    // Create booking
    const booking = await db.booking.create({
      data: {
        status:        'PENDING_APPROVAL',
        userId:        session?.user ? (session.user as { id?: string }).id : undefined,
        rvId:          resolvedRvId,
        destinationId: resolvedDestId,
        checkIn,
        checkOut,
        nights,
        guestName,
        guestEmail,
        guestPhone,
        groupSize:     groupSize ?? 2,
        specialRequests,
        nightlyRate,
        cleaningFee:   CLEANING_FEE,
        addOnsTotal,
        subtotal,
        taxAmount:     0,
        totalAmount,
        depositAmount,
        balanceAmount,
        termsAcceptedAt: termsVersion ? new Date() : undefined,
        termsVersion,
        termsUrl,
        termsGuestIp:  ip,
        lineItems: {
          create: addOnDetails.map((a) => ({
            addOnId:  a.addOnId,
            label:    a.label,
            price:    a.price,
            quantity: 1,
          })),
        },
      },
      include: { lineItems: true },
    })

    return NextResponse.json({ bookingId: booking.id, status: booking.status }, { status: 201 })
  } catch (err) {
    console.error('[POST /api/bookings]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const userId = (session.user as { id?: string }).id
  const bookings = await db.booking.findMany({
    where:   { userId },
    include: { rv: true, destination: true, lineItems: true, payments: true },
    orderBy: { createdAt: 'desc' },
  })
  return NextResponse.json(bookings)
}
