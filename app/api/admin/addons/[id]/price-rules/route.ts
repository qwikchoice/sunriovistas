import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

function auth(req: NextRequest) {
  return req.headers.get('x-admin-pin') === (process.env.ADMIN_PIN ?? 'admin123')
}

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  if (!auth(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { label, startDate, endDate, price, active } = await req.json()
  const rule = await db.addOnPriceRule.create({
    data: {
      addOnId:   params.id,
      label,
      startDate: new Date(startDate),
      endDate:   new Date(endDate),
      price:     Number(price),
      active:    active ?? true,
    },
  })
  return NextResponse.json(rule, { status: 201 })
}
