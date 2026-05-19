import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

function auth(req: NextRequest) {
  return req.headers.get('x-admin-pin') === (process.env.ADMIN_PIN ?? 'admin123')
}

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  if (!auth(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { label, startDate, endDate, nightlyRate, minNights, active } = await req.json()
  const rule = await db.rVPriceRule.create({
    data: {
      rvId: params.id,
      label,
      startDate: new Date(startDate),
      endDate:   new Date(endDate),
      nightlyRate: Number(nightlyRate),
      minNights:   Number(minNights ?? 2),
      active:      active ?? true,
    },
  })
  return NextResponse.json(rule, { status: 201 })
}
