import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

function auth(req: NextRequest) {
  return req.headers.get('x-admin-pin') === (process.env.ADMIN_PIN ?? 'admin123')
}

export async function GET(req: NextRequest) {
  if (!auth(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const addons = await db.addOn.findMany({
    include:  { priceRules: true },
    orderBy:  { label: 'asc' },
  })
  return NextResponse.json(addons)
}
