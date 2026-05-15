import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

function adminAuthed(req: NextRequest) {
  const pin = req.headers.get('x-admin-pin')
  return pin === (process.env.ADMIN_PIN ?? 'admin123')
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  if (!adminAuthed(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { action, notes, rejectedReason } = await req.json()
  const { id } = params

  const booking = await db.booking.findUnique({ where: { id } })
  if (!booking) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  if (action === 'approve') {
    const updated = await db.booking.update({
      where: { id },
      data: {
        status:     'APPROVED_AWAITING_DEPOSIT',
        approvedAt: new Date(),
        adminNotes: notes,
      },
    })
    return NextResponse.json(updated)
  }

  if (action === 'reject') {
    const updated = await db.booking.update({
      where: { id },
      data: {
        status:          'REJECTED',
        rejectedAt:      new Date(),
        rejectedReason,
        adminNotes:      notes,
      },
    })
    return NextResponse.json(updated)
  }

  return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
}

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  if (!adminAuthed(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const booking = await db.booking.findUnique({
    where:   { id: params.id },
    include: { rv: true, destination: true, lineItems: true, payments: true, user: true },
  })
  if (!booking) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(booking)
}
