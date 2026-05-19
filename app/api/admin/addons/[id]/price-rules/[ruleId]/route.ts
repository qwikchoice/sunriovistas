import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

function auth(req: NextRequest) {
  return req.headers.get('x-admin-pin') === (process.env.ADMIN_PIN ?? 'admin123')
}

export async function PATCH(req: NextRequest, { params }: { params: { ruleId: string } }) {
  if (!auth(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { label, startDate, endDate, price, active } = await req.json()
  const rule = await db.addOnPriceRule.update({
    where: { id: params.ruleId },
    data:  {
      label,
      startDate: startDate ? new Date(startDate) : undefined,
      endDate:   endDate   ? new Date(endDate)   : undefined,
      price:     price != null ? Number(price) : undefined,
      active,
    },
  })
  return NextResponse.json(rule)
}

export async function DELETE(req: NextRequest, { params }: { params: { ruleId: string } }) {
  if (!auth(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  await db.addOnPriceRule.delete({ where: { id: params.ruleId } })
  return NextResponse.json({ ok: true })
}
