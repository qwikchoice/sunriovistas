import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

function adminAuthed(req: NextRequest) {
  const pin = req.headers.get('x-admin-pin')
  return pin === (process.env.ADMIN_PIN ?? 'admin123')
}

export async function GET(req: NextRequest) {
  if (!adminAuthed(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { searchParams } = new URL(req.url)
  const status = searchParams.get('status')

  const bookings = await db.booking.findMany({
    where:   status ? { status: status as never } : undefined,
    include: { rv: true, destination: true, user: true, payments: true },
    orderBy: { createdAt: 'desc' },
  })
  return NextResponse.json(bookings)
}
